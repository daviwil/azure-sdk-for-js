/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import * as Parameters from "./models/parameters";
import * as operations from "./operations";
import { FeatureClientContext } from "./featureClientContext";


class FeatureClient extends FeatureClientContext {
  // Operation groups
  features: operations.Features;

  /**
   * Initializes a new instance of the FeatureClient class.
   * @param credentials Credentials needed for the client to connect to Azure.
   * @param subscriptionId The ID of the target subscription.
   * @param [options] The parameter options
   */
  constructor(credentials: coreHttp.ServiceClientCredentials | coreHttp.TokenCredential, subscriptionId: string, options?: Models.FeatureClientOptions) {
    super(credentials, subscriptionId, options);
    this.features = new operations.Features(this);
  }

  /**
   * Lists all of the available Microsoft.Features REST API operations.
   * @param [options] The optional parameters
   * @returns Promise<Models.ListOperationsResponse>
   */
  listOperations(options?: coreHttp.RequestOptionsBase): Promise<Models.ListOperationsResponse>;
  /**
   * @param callback The callback
   */
  listOperations(callback: coreHttp.ServiceCallback<Models.OperationListResult>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  listOperations(options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.OperationListResult>): void;
  listOperations(options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.OperationListResult>, callback?: coreHttp.ServiceCallback<Models.OperationListResult>): Promise<Models.ListOperationsResponse> {
    return this.sendOperationRequest(
      {
        options
      },
      listOperationsOperationSpec,
      callback) as Promise<Models.ListOperationsResponse>;
  }

  /**
   * Lists all of the available Microsoft.Features REST API operations.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.ListOperationsNextResponse>
   */
  listOperationsNext(nextPageLink: string, options?: coreHttp.RequestOptionsBase): Promise<Models.ListOperationsNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listOperationsNext(nextPageLink: string, callback: coreHttp.ServiceCallback<Models.OperationListResult>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listOperationsNext(nextPageLink: string, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.OperationListResult>): void;
  listOperationsNext(nextPageLink: string, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.OperationListResult>, callback?: coreHttp.ServiceCallback<Models.OperationListResult>): Promise<Models.ListOperationsNextResponse> {
    return this.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listOperationsNextOperationSpec,
      callback) as Promise<Models.ListOperationsNextResponse>;
  }
}

// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers);
const listOperationsOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "providers/Microsoft.Features/operations",
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.OperationListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const listOperationsNextOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  baseUrl: "https://management.azure.com",
  path: "{nextLink}",
  urlParameters: [
    Parameters.nextPageLink
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.OperationListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

export {
  FeatureClient,
  FeatureClientContext,
  Models as FeatureModels,
  Mappers as FeatureMappers
};
export * from "./operations";
