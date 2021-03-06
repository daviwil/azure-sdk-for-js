import * as assert from "assert";

import {
  AccountSASPermissions,
  AccountSASResourceTypes,
  AccountSASServices,
  AnonymousCredential,
  QueueSASPermissions,
  QueueClient,
  generateAccountSASQueryParameters,
  generateQueueSASQueryParameters,
  QueueServiceClient,
  SharedKeyCredential,
  newPipeline
} from "../../src";
import { SASProtocol } from "../../src/SASQueryParameters";
import { getQSU } from "../utils/index";
import { record, delay } from "../utils/recorder";

describe("Shared Access Signature (SAS) generation Node.js only", () => {
  const queueServiceClient = getQSU();

  let recorder: any;

  beforeEach(function() {
    recorder = record(this);
  });

  afterEach(function() {
    recorder.stop();
  });

  it("generateAccountSASQueryParameters should work", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (queueServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiryTime: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        startTime: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as SharedKeyCredential
    ).toString();

    const sasURL = `${queueServiceClient.url}?${sas}`;
    const queueServiceClientwithSAS = new QueueServiceClient(
      sasURL,
      newPipeline(new AnonymousCredential())
    );

    await queueServiceClientwithSAS.getProperties();
  });

  it("generateAccountSASQueryParameters should not work with invalid permission", async () => {
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (queueServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiryTime: tmr,
        permissions: AccountSASPermissions.parse("wdlcup"),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString()
      },
      sharedKeyCredential as SharedKeyCredential
    ).toString();

    const sasURL = `${queueServiceClient.url}?${sas}`;
    const queueServiceClientwithSAS = new QueueServiceClient(
      sasURL,
      newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await queueServiceClientwithSAS.getProperties();
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid service", async () => {
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (queueServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiryTime: tmr,
        permissions: AccountSASPermissions.parse("rwdlacup"),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("b").toString()
      },
      sharedKeyCredential as SharedKeyCredential
    ).toString();

    const sasURL = `${queueServiceClient.url}?${sas}`;
    const queueServiceClientwithSAS = new QueueServiceClient(
      sasURL,
      newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await queueServiceClientwithSAS.getProperties();
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid resource type", async () => {
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (queueServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiryTime: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("co").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        version: "2016-05-31"
      },
      sharedKeyCredential as SharedKeyCredential
    ).toString();

    const sasURL = `${queueServiceClient.url}?${sas}`;
    const queueServiceClientwithSAS = new QueueServiceClient(
      sasURL,
      newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await queueServiceClientwithSAS.getProperties();
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateQueueSASQueryParameters should work for queue", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (queueServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const queueName = recorder.getUniqueName("queue");
    const queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();

    const queueSAS = generateQueueSASQueryParameters(
      {
        queueName: queueClient.name,
        expiryTime: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: QueueSASPermissions.parse("raup"),
        protocol: SASProtocol.HttpsAndHttp,
        startTime: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as SharedKeyCredential
    );

    const sasURL = `${queueClient.url}?${queueSAS}`;
    const queueClientwithSAS = new QueueClient(sasURL, newPipeline(new AnonymousCredential()));

    await queueClientwithSAS.getProperties();
    await queueClient.delete();
  });

  it("generateQueueSASQueryParameters should work for messages", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (queueServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const queueName = recorder.getUniqueName("queue");
    const queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();

    const queueSAS = generateQueueSASQueryParameters(
      {
        queueName: queueClient.name,
        expiryTime: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: QueueSASPermissions.parse("raup"),
        protocol: SASProtocol.HttpsAndHttp,
        startTime: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as SharedKeyCredential
    );

    const messageContent = "Hello World!";

    const sasURLForMessages = `${queueClient.url}?${queueSAS}`;
    const messagesClientWithSAS = new QueueClient(
      sasURLForMessages,
      newPipeline(new AnonymousCredential())
    );
    const enqueueResult = await messagesClientWithSAS.sendMessage(messageContent);

    let pResult = await queueClient.peekMessages();
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 1);

    const sasURLForMessageId = `${queueClient.url}?${queueSAS}`;
    const messageIdClientWithSAS = new QueueClient(sasURLForMessageId);

    await messageIdClientWithSAS.deleteMessage(enqueueResult.messageId, enqueueResult.popReceipt);

    pResult = await queueClient.peekMessages();
    assert.deepStrictEqual(pResult.peekedMessageItems.length, 0);

    await queueClient.delete();
  });

  it("generateQueueSASQueryParameters should work for queue with access policy", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);

    // By default, credential is always the last element of pipeline factories
    const factories = (queueServiceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const queueName = recorder.getUniqueName("queue");
    const queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();

    const id = "unique-id";
    await queueClient.setAccessPolicy([
      {
        accessPolicy: {
          expiry: tmr,
          permissions: QueueSASPermissions.parse("raup").toString(),
          start: now
        },
        id
      }
    ]);

    const queueSAS = generateQueueSASQueryParameters(
      {
        queueName: queueClient.name,
        identifier: id
      },
      sharedKeyCredential as SharedKeyCredential
    );

    const sasURL = `${queueClient.url}?${queueSAS}`;
    const messagesClientwithSAS = new QueueClient(sasURL);

    const messageContent = "hello";

    const eResult = await messagesClientwithSAS.sendMessage(messageContent);
    assert.ok(eResult.messageId);
    const pResult = await messagesClientwithSAS.peekMessages();
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, messageContent);
    const dResult = await messagesClientwithSAS.receiveMessages({
      visibilityTimeout: 1
    });
    assert.deepStrictEqual(dResult.receivedMessageItems[0].messageText, messageContent);

    await delay(2 * 1000);

    const sasURLForMessage = `${queueClient.url}?${queueSAS}`;
    const messageIdClientwithSAS = new QueueClient(sasURLForMessage);
    const deleteResult = await messageIdClientwithSAS.deleteMessage(
      dResult.receivedMessageItems[0].messageId,
      dResult.receivedMessageItems[0].popReceipt
    );
    assert.ok(deleteResult.requestId);
    assert.ok(deleteResult.clientRequestId);

    //const cResult = await messagesClientwithSAS.clear(); //This request is not authorized to perform this operation. As testing, this is service's current behavior.
  });
});
