/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as Models from "../models";
import * as Mappers from "../models/billingAccountsMappers";
import * as Parameters from "../models/parameters";
import { BillingManagementClientContext } from "../billingManagementClientContext";

/** Class representing a BillingAccounts. */
export class BillingAccounts {
  private readonly client: BillingManagementClientContext;

  /**
   * Create a BillingAccounts.
   * @param {BillingManagementClientContext} client Reference to the service client.
   */
  constructor(client: BillingManagementClientContext) {
    this.client = client;
  }

  /**
   * Lists all billing accounts for a user which he has access to.
   * @param [options] The optional parameters
   * @returns Promise<Models.BillingAccountsListResponse>
   */
  list(options?: Models.BillingAccountsListOptionalParams): Promise<Models.BillingAccountsListResponse>;
  /**
   * @param callback The callback
   */
  list(callback: msRest.ServiceCallback<Models.BillingAccountListResult>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  list(options: Models.BillingAccountsListOptionalParams, callback: msRest.ServiceCallback<Models.BillingAccountListResult>): void;
  list(options?: Models.BillingAccountsListOptionalParams | msRest.ServiceCallback<Models.BillingAccountListResult>, callback?: msRest.ServiceCallback<Models.BillingAccountListResult>): Promise<Models.BillingAccountsListResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      listOperationSpec,
      callback) as Promise<Models.BillingAccountsListResponse>;
  }

  /**
   * Get the billing account by id.
   * @param billingAccountName billing Account Id.
   * @param [options] The optional parameters
   * @returns Promise<Models.BillingAccountsGetResponse>
   */
  get(billingAccountName: string, options?: Models.BillingAccountsGetOptionalParams): Promise<Models.BillingAccountsGetResponse>;
  /**
   * @param billingAccountName billing Account Id.
   * @param callback The callback
   */
  get(billingAccountName: string, callback: msRest.ServiceCallback<Models.BillingAccount>): void;
  /**
   * @param billingAccountName billing Account Id.
   * @param options The optional parameters
   * @param callback The callback
   */
  get(billingAccountName: string, options: Models.BillingAccountsGetOptionalParams, callback: msRest.ServiceCallback<Models.BillingAccount>): void;
  get(billingAccountName: string, options?: Models.BillingAccountsGetOptionalParams | msRest.ServiceCallback<Models.BillingAccount>, callback?: msRest.ServiceCallback<Models.BillingAccount>): Promise<Models.BillingAccountsGetResponse> {
    return this.client.sendOperationRequest(
      {
        billingAccountName,
        options
      },
      getOperationSpec,
      callback) as Promise<Models.BillingAccountsGetResponse>;
  }

  /**
   * The operation to update a billing account.
   * @param billingAccountName billing Account Id.
   * @param parameters Parameters supplied to the update billing account operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.BillingAccountsUpdateResponse>
   */
  update(billingAccountName: string, parameters: Models.BillingAccountUpdateProperties, options?: msRest.RequestOptionsBase): Promise<Models.BillingAccountsUpdateResponse> {
    return this.beginUpdate(billingAccountName,parameters,options)
      .then(lroPoller => lroPoller.pollUntilFinished()) as Promise<Models.BillingAccountsUpdateResponse>;
  }

  /**
   * The operation to update a billing account.
   * @param billingAccountName billing Account Id.
   * @param parameters Parameters supplied to the update billing account operation.
   * @param [options] The optional parameters
   * @returns Promise<msRestAzure.LROPoller>
   */
  beginUpdate(billingAccountName: string, parameters: Models.BillingAccountUpdateProperties, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller> {
    return this.client.sendLRORequest(
      {
        billingAccountName,
        parameters,
        options
      },
      beginUpdateOperationSpec,
      options);
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const listOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "providers/Microsoft.Billing/billingAccounts",
  queryParameters: [
    Parameters.apiVersion,
    Parameters.expand
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.BillingAccountListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const getOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "providers/Microsoft.Billing/billingAccounts/{billingAccountName}",
  urlParameters: [
    Parameters.billingAccountName
  ],
  queryParameters: [
    Parameters.apiVersion,
    Parameters.expand
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.BillingAccount
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const beginUpdateOperationSpec: msRest.OperationSpec = {
  httpMethod: "PATCH",
  path: "providers/Microsoft.Billing/billingAccounts/{billingAccountName}",
  urlParameters: [
    Parameters.billingAccountName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "parameters",
    mapper: {
      ...Mappers.BillingAccountUpdateProperties,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.BillingAccount
    },
    202: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};
