// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
import dotenv from "dotenv";
dotenv.config();
chai.use(chaiAsPromised);
import { Namespace, delay } from "../lib";
import * as msrestAzure from "ms-rest-azure";
const aadServiceBusAudience = "https://servicebus.azure.net/";

function testFalsyValues(testFn: Function): void {
  [undefined, "", 0].forEach(function(value: string | number | undefined): void {
    testFn(value);
  });
}

function getEnvVars(): { [key: string]: string } {
  if (!process.env.ARM_SERVICEBUS_CLIENT_ID) {
    throw new Error(
      "Define ARM_SERVICEBUS_CLIENT_ID in your environment before running integration tests."
    );
  }
  if (!process.env.ARM_SERVICEBUS_TENANT_ID) {
    throw new Error(
      "Define ARM_SERVICEBUS_TENANT_ID in your environment before running integration tests."
    );
  }
  if (!process.env.ARM_SERVICEBUS_SECRET) {
    throw new Error(
      "Define ARM_SERVICEBUS_SECRET in your environment before running integration tests."
    );
  }
  if (!process.env.SERVICEBUS_END_POINT) {
    throw new Error(
      "Define SERVICEBUS_END_POINT in your environment before running integration tests."
    );
  }
  return {
    clientId: process.env.ARM_SERVICEBUS_CLIENT_ID,
    tenantId: process.env.ARM_SERVICEBUS_TENANT_ID,
    secret: process.env.ARM_SERVICEBUS_SECRET,
    servicebusEndpoint: process.env.SERVICEBUS_END_POINT
  };
}

describe("Create Namespace", function(): void {
  it("throws error when there is no connection string", function(): void {
    testFalsyValues(function(value: any): void {
      const test = function(): void {
        Namespace.createFromConnectionString(value);
      };
      test.should.throw(
        Error,
        "'connectionString' is a required parameter and must be of type: 'string'."
      );
    });
  });

  it("creates an Namespace from a connection string", function(): void {
    const namespace = Namespace.createFromConnectionString(
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
    );
    namespace.should.be.an.instanceof(Namespace);
    should.equal(namespace.name, "sb://a/");
  });
});

describe("Create Queue/Topic/Subscription Clients with no name", function(): void {
  let namespace: Namespace;
  beforeEach(() => {
    namespace = Namespace.createFromConnectionString(
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
    );
  });
  afterEach(() => {
    return namespace.close();
  });

  it("throws error when creating queue client with no name", function(): void {
    testFalsyValues(function(value: any): void {
      const test = function(): void {
        namespace.createQueueClient(value);
      };
      test.should.throw(Error, "'queueName' is a required parameter and must be of type 'string'.");
    });
  });

  it("throws error when creating topic client with no name", function(): void {
    testFalsyValues(function(value: any): void {
      const test = function(): void {
        namespace.createTopicClient(value);
      };
      test.should.throw(Error, "'topicName' is a required parameter and must be of type 'string'.");
    });
  });

  it("throws error when creating subscription client with no topic name", function(): void {
    testFalsyValues(function(value: any): void {
      const test = function(): void {
        namespace.createSubscriptionClient(value, "some-name");
      };
      test.should.throw(Error, "'topicName' is a required parameter and must be of type 'string'.");
    });
  });

  it("throws error when creating subscription client with no subscription name", function(): void {
    testFalsyValues(function(value: any): void {
      const test = function(): void {
        namespace.createSubscriptionClient("some-name", value);
      };
      test.should.throw(
        Error,
        "'subscriptionName' is a required parameter and must be of type 'string'."
      );
    });
  });
});

describe("Errors when send/receive to/from non existing Namespace", function(): void {
  let namespace: Namespace;
  let errorWasThrown: boolean;
  beforeEach(() => {
    namespace = Namespace.createFromConnectionString(
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
    );
    errorWasThrown = false;
  });
  afterEach(() => {
    return namespace.close();
  });

  const testError = (err: Error) => {
    should.equal(err.name, "ServiceCommunicationError");
    should.equal(err.message, "getaddrinfo ENOTFOUND a a:5671");
    errorWasThrown = true;
  };

  it("throws error when sending data via a queueClient to a non existing namespace", async function(): Promise<
    void
  > {
    const client = namespace.createQueueClient("some-name");
    await client
      .getSender()
      .send({ body: "hello" })
      .catch(testError);

    should.equal(errorWasThrown, true);
  });

  it("throws error when sending data via a topicClient to a non existing namespace", async function(): Promise<
    void
  > {
    const client = namespace.createTopicClient("some-name");
    await client
      .getSender()
      .send({ body: "hello" })
      .catch(testError);

    should.equal(errorWasThrown, true);
  });

  it("throws error when sending batch data via a queueClient to a non existing namespace", async function(): Promise<
    void
  > {
    const client = namespace.createQueueClient("some-name");
    await client
      .getSender()
      .send({ body: "hello" })
      .catch(testError);
    should.equal(errorWasThrown, true);
  });

  it("throws error when sending batch data via a topicClient to a non existing namespace", async function(): Promise<
    void
  > {
    const client = namespace.createTopicClient("some-name");
    await client
      .getSender()
      .send({ body: "hello" })
      .catch(testError);

    should.equal(errorWasThrown, true);
  });

  it("throws error when receving batch data via a queueClient from a non existing namespace", async function(): Promise<
    void
  > {
    const client = namespace.createQueueClient("some-name");
    await client
      .getReceiver()
      .receiveBatch(10)
      .catch(testError);

    should.equal(errorWasThrown, true);
  });

  it("throws error when receving batch data via a subscriptionClient from a non existing namespace", async function(): Promise<
    void
  > {
    const client = namespace.createSubscriptionClient("some-topic-name", "some-subscription-name");
    await client
      .getReceiver()
      .receiveBatch(10)
      .catch(testError);

    should.equal(errorWasThrown, true);
  });

  it("throws error when receving streaming data via a queueClient from a non existing namespace", async function(): Promise<
    void
  > {
    const client = namespace.createQueueClient("some-name");
    const onMessage = async () => {
      throw "onMessage should not have been called when receive call is made from a non existing namespace";
    };

    client.getReceiver().receive(onMessage, testError);

    await delay(3000);
    await client.close();
    should.equal(errorWasThrown, true);
  });
});

describe("Errors when send/receive to/from non existing Queue/Topic/Subscription", async function(): Promise<
  void
> {
  let namespace: Namespace;
  let errorWasThrown: boolean;
  beforeEach(() => {
    if (!process.env.SERVICEBUS_CONNECTION_STRING) {
      throw "define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests.";
    }
    namespace = Namespace.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);
    errorWasThrown = false;
  });
  afterEach(() => {
    return namespace.close();
  });

  const testError = (err: Error, entityPath: string) => {
    should.equal(err.name, "MessagingEntityNotFoundError");
    should.equal(
      err.message.startsWith(
        `The messaging entity '${namespace.name}${entityPath}' could not be found.`
      ),
      true
    );
    errorWasThrown = true;
  };

  it("throws error when sending data to a non existing queue", async function(): Promise<void> {
    const client = namespace.createQueueClient("some-name");
    await client
      .getSender()
      .send({ body: "hello" })
      .catch((err) => testError(err, "some-name"));

    should.equal(errorWasThrown, true);
  });

  it("throws error when sending data to a non existing topic", async function(): Promise<void> {
    const client = namespace.createTopicClient("some-name");
    await client
      .getSender()
      .send({ body: "hello" })
      .catch((err) => testError(err, "some-name"));

    should.equal(errorWasThrown, true);
  });

  it("throws error when sending batch data to a non existing queue", async function(): Promise<
    void
  > {
    const client = namespace.createQueueClient("some-name");
    await client
      .getSender()
      .send({ body: "hello" })
      .catch((err) => testError(err, "some-name"));

    should.equal(errorWasThrown, true);
  });

  it("throws error when sending batch data to a non existing topic", async function(): Promise<
    void
  > {
    const client = namespace.createTopicClient("some-name");
    await client
      .getSender()
      .send({ body: "hello" })
      .catch((err) => testError(err, "some-name"));

    should.equal(errorWasThrown, true);
  });

  it("throws error when receiving batch data from a non existing queue", async function(): Promise<
    void
  > {
    const client = namespace.createQueueClient("some-name");
    await client
      .getReceiver()
      .receiveBatch(1)
      .catch((err) => testError(err, "some-name"));

    should.equal(errorWasThrown, true);
  });

  it("throws error when receiving batch data from a non existing subscription", async function(): Promise<
    void
  > {
    const client = namespace.createSubscriptionClient("some-topic-name", "some-subscription-name");
    await client
      .getReceiver()
      .receiveBatch(1)
      .catch((err) => testError(err, "some-topic-name/Subscriptions/some-subscription-name"));

    should.equal(errorWasThrown, true);
  });

  it("throws error when receving streaming data from a non existing queue", async function(): Promise<
    void
  > {
    const client = namespace.createQueueClient("some-name");
    const onMessage = async () => {
      throw "onMessage should not have been called when receive call is made from a non existing namespace";
    };
    client.getReceiver().receive(onMessage, (err) => testError(err, "some-name"));

    await delay(3000);
    await client.close();
    should.equal(errorWasThrown, true);
  });

  it("throws error when receving streaming data from a non existing subscription", async function(): Promise<
    void
  > {
    const client = namespace.createSubscriptionClient("some-topic-name", "some-subscription-name");
    const onMessage = async () => {
      throw "onMessage should not have been called when receive call is made from a non existing namespace";
    };
    client
      .getReceiver()
      .receive(onMessage, (err) =>
        testError(err, "some-topic-name/Subscriptions/some-subscription-name")
      );

    await delay(3000);
    await client.close();
    should.equal(errorWasThrown, true);
  });
});

describe("Test createFromAadTokenCredentials", function(): void {
  it.only("creates an Namespace from a AADTokenCredentials", async function(): Promise<void> {
    const env = getEnvVars();
    const tokenCreds = await msrestAzure.loginWithServicePrincipalSecret(
      env.clientId,
      env.secret,
      env.tenantId,
      { tokenAudience: aadServiceBusAudience }
    );
    const namespace = Namespace.createFromAadTokenCredentials(env.servicebusEndpoint, tokenCreds);
    namespace.should.be.an.instanceof(Namespace);
  });
});
