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
import * as Models from "../models";
import * as Mappers from "../models/resourceLinksMappers";
import * as Parameters from "../models/parameters";
import { ManagementLinkClientContext } from "../managementLinkClientContext";

/** Class representing a ResourceLinks. */
export class ResourceLinks {
  private readonly client: ManagementLinkClientContext;

  /**
   * Create a ResourceLinks.
   * @param {ManagementLinkClientContext} client Reference to the service client.
   */
  constructor(client: ManagementLinkClientContext) {
    this.client = client;
  }

  /**
   * Deletes a resource link with the specified ID.
   * @param linkId The fully qualified ID of the resource link. Use the format,
   * /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/{provider-namespace}/{resource-type}/{resource-name}/Microsoft.Resources/links/{link-name}.
   * For example,
   * /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myGroup/Microsoft.Web/sites/mySite/Microsoft.Resources/links/myLink
   * @param [options] The optional parameters
   * @returns Promise<coreHttp.RestResponse>
   */
  deleteMethod(linkId: string, options?: coreHttp.RequestOptionsBase): Promise<coreHttp.RestResponse>;
  /**
   * @param linkId The fully qualified ID of the resource link. Use the format,
   * /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/{provider-namespace}/{resource-type}/{resource-name}/Microsoft.Resources/links/{link-name}.
   * For example,
   * /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myGroup/Microsoft.Web/sites/mySite/Microsoft.Resources/links/myLink
   * @param callback The callback
   */
  deleteMethod(linkId: string, callback: coreHttp.ServiceCallback<void>): void;
  /**
   * @param linkId The fully qualified ID of the resource link. Use the format,
   * /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/{provider-namespace}/{resource-type}/{resource-name}/Microsoft.Resources/links/{link-name}.
   * For example,
   * /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myGroup/Microsoft.Web/sites/mySite/Microsoft.Resources/links/myLink
   * @param options The optional parameters
   * @param callback The callback
   */
  deleteMethod(linkId: string, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<void>): void;
  deleteMethod(linkId: string, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<void>, callback?: coreHttp.ServiceCallback<void>): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      {
        linkId,
        options
      },
      deleteMethodOperationSpec,
      callback);
  }

  /**
   * Creates or updates a resource link between the specified resources.
   * @param linkId The fully qualified ID of the resource link. Use the format,
   * /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/{provider-namespace}/{resource-type}/{resource-name}/Microsoft.Resources/links/{link-name}.
   * For example,
   * /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myGroup/Microsoft.Web/sites/mySite/Microsoft.Resources/links/myLink
   * @param parameters Parameters for creating or updating a resource link.
   * @param [options] The optional parameters
   * @returns Promise<Models.ResourceLinksCreateOrUpdateResponse>
   */
  createOrUpdate(linkId: string, parameters: Models.ResourceLink, options?: coreHttp.RequestOptionsBase): Promise<Models.ResourceLinksCreateOrUpdateResponse>;
  /**
   * @param linkId The fully qualified ID of the resource link. Use the format,
   * /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/{provider-namespace}/{resource-type}/{resource-name}/Microsoft.Resources/links/{link-name}.
   * For example,
   * /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myGroup/Microsoft.Web/sites/mySite/Microsoft.Resources/links/myLink
   * @param parameters Parameters for creating or updating a resource link.
   * @param callback The callback
   */
  createOrUpdate(linkId: string, parameters: Models.ResourceLink, callback: coreHttp.ServiceCallback<Models.ResourceLink>): void;
  /**
   * @param linkId The fully qualified ID of the resource link. Use the format,
   * /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/{provider-namespace}/{resource-type}/{resource-name}/Microsoft.Resources/links/{link-name}.
   * For example,
   * /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myGroup/Microsoft.Web/sites/mySite/Microsoft.Resources/links/myLink
   * @param parameters Parameters for creating or updating a resource link.
   * @param options The optional parameters
   * @param callback The callback
   */
  createOrUpdate(linkId: string, parameters: Models.ResourceLink, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.ResourceLink>): void;
  createOrUpdate(linkId: string, parameters: Models.ResourceLink, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.ResourceLink>, callback?: coreHttp.ServiceCallback<Models.ResourceLink>): Promise<Models.ResourceLinksCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        linkId,
        parameters,
        options
      },
      createOrUpdateOperationSpec,
      callback) as Promise<Models.ResourceLinksCreateOrUpdateResponse>;
  }

  /**
   * Gets a resource link with the specified ID.
   * @param linkId The fully qualified Id of the resource link. For example,
   * /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myGroup/Microsoft.Web/sites/mySite/Microsoft.Resources/links/myLink
   * @param [options] The optional parameters
   * @returns Promise<Models.ResourceLinksGetResponse>
   */
  get(linkId: string, options?: coreHttp.RequestOptionsBase): Promise<Models.ResourceLinksGetResponse>;
  /**
   * @param linkId The fully qualified Id of the resource link. For example,
   * /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myGroup/Microsoft.Web/sites/mySite/Microsoft.Resources/links/myLink
   * @param callback The callback
   */
  get(linkId: string, callback: coreHttp.ServiceCallback<Models.ResourceLink>): void;
  /**
   * @param linkId The fully qualified Id of the resource link. For example,
   * /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myGroup/Microsoft.Web/sites/mySite/Microsoft.Resources/links/myLink
   * @param options The optional parameters
   * @param callback The callback
   */
  get(linkId: string, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.ResourceLink>): void;
  get(linkId: string, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.ResourceLink>, callback?: coreHttp.ServiceCallback<Models.ResourceLink>): Promise<Models.ResourceLinksGetResponse> {
    return this.client.sendOperationRequest(
      {
        linkId,
        options
      },
      getOperationSpec,
      callback) as Promise<Models.ResourceLinksGetResponse>;
  }

  /**
   * Gets all the linked resources for the subscription.
   * @param [options] The optional parameters
   * @returns Promise<Models.ResourceLinksListAtSubscriptionResponse>
   */
  listAtSubscription(options?: Models.ResourceLinksListAtSubscriptionOptionalParams): Promise<Models.ResourceLinksListAtSubscriptionResponse>;
  /**
   * @param callback The callback
   */
  listAtSubscription(callback: coreHttp.ServiceCallback<Models.ResourceLinkResult>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  listAtSubscription(options: Models.ResourceLinksListAtSubscriptionOptionalParams, callback: coreHttp.ServiceCallback<Models.ResourceLinkResult>): void;
  listAtSubscription(options?: Models.ResourceLinksListAtSubscriptionOptionalParams | coreHttp.ServiceCallback<Models.ResourceLinkResult>, callback?: coreHttp.ServiceCallback<Models.ResourceLinkResult>): Promise<Models.ResourceLinksListAtSubscriptionResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      listAtSubscriptionOperationSpec,
      callback) as Promise<Models.ResourceLinksListAtSubscriptionResponse>;
  }

  /**
   * Gets a list of resource links at and below the specified source scope.
   * @param scope The fully qualified ID of the scope for getting the resource links. For example, to
   * list resource links at and under a resource group, set the scope to
   * /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myGroup.
   * @param [options] The optional parameters
   * @returns Promise<Models.ResourceLinksListAtSourceScopeResponse>
   */
  listAtSourceScope(scope: string, options?: Models.ResourceLinksListAtSourceScopeOptionalParams): Promise<Models.ResourceLinksListAtSourceScopeResponse>;
  /**
   * @param scope The fully qualified ID of the scope for getting the resource links. For example, to
   * list resource links at and under a resource group, set the scope to
   * /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myGroup.
   * @param callback The callback
   */
  listAtSourceScope(scope: string, callback: coreHttp.ServiceCallback<Models.ResourceLinkResult>): void;
  /**
   * @param scope The fully qualified ID of the scope for getting the resource links. For example, to
   * list resource links at and under a resource group, set the scope to
   * /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myGroup.
   * @param options The optional parameters
   * @param callback The callback
   */
  listAtSourceScope(scope: string, options: Models.ResourceLinksListAtSourceScopeOptionalParams, callback: coreHttp.ServiceCallback<Models.ResourceLinkResult>): void;
  listAtSourceScope(scope: string, options?: Models.ResourceLinksListAtSourceScopeOptionalParams | coreHttp.ServiceCallback<Models.ResourceLinkResult>, callback?: coreHttp.ServiceCallback<Models.ResourceLinkResult>): Promise<Models.ResourceLinksListAtSourceScopeResponse> {
    return this.client.sendOperationRequest(
      {
        scope,
        options
      },
      listAtSourceScopeOperationSpec,
      callback) as Promise<Models.ResourceLinksListAtSourceScopeResponse>;
  }

  /**
   * Gets all the linked resources for the subscription.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.ResourceLinksListAtSubscriptionNextResponse>
   */
  listAtSubscriptionNext(nextPageLink: string, options?: coreHttp.RequestOptionsBase): Promise<Models.ResourceLinksListAtSubscriptionNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listAtSubscriptionNext(nextPageLink: string, callback: coreHttp.ServiceCallback<Models.ResourceLinkResult>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listAtSubscriptionNext(nextPageLink: string, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.ResourceLinkResult>): void;
  listAtSubscriptionNext(nextPageLink: string, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.ResourceLinkResult>, callback?: coreHttp.ServiceCallback<Models.ResourceLinkResult>): Promise<Models.ResourceLinksListAtSubscriptionNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listAtSubscriptionNextOperationSpec,
      callback) as Promise<Models.ResourceLinksListAtSubscriptionNextResponse>;
  }

  /**
   * Gets a list of resource links at and below the specified source scope.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.ResourceLinksListAtSourceScopeNextResponse>
   */
  listAtSourceScopeNext(nextPageLink: string, options?: coreHttp.RequestOptionsBase): Promise<Models.ResourceLinksListAtSourceScopeNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listAtSourceScopeNext(nextPageLink: string, callback: coreHttp.ServiceCallback<Models.ResourceLinkResult>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listAtSourceScopeNext(nextPageLink: string, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.ResourceLinkResult>): void;
  listAtSourceScopeNext(nextPageLink: string, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.ResourceLinkResult>, callback?: coreHttp.ServiceCallback<Models.ResourceLinkResult>): Promise<Models.ResourceLinksListAtSourceScopeNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listAtSourceScopeNextOperationSpec,
      callback) as Promise<Models.ResourceLinksListAtSourceScopeNextResponse>;
  }
}

// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers);
const deleteMethodOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "DELETE",
  path: "{linkId}",
  urlParameters: [
    Parameters.linkId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "PUT",
  path: "{linkId}",
  urlParameters: [
    Parameters.linkId
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
      ...Mappers.ResourceLink,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.ResourceLink
    },
    201: {
      bodyMapper: Mappers.ResourceLink
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const getOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "{linkId}",
  urlParameters: [
    Parameters.linkId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ResourceLink
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const listAtSubscriptionOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/providers/Microsoft.Resources/links",
  urlParameters: [
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.filter,
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ResourceLinkResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const listAtSourceScopeOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "{scope}/providers/Microsoft.Resources/links",
  urlParameters: [
    Parameters.scope
  ],
  queryParameters: [
    Parameters.filter,
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ResourceLinkResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const listAtSubscriptionNextOperationSpec: coreHttp.OperationSpec = {
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
      bodyMapper: Mappers.ResourceLinkResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const listAtSourceScopeNextOperationSpec: coreHttp.OperationSpec = {
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
      bodyMapper: Mappers.ResourceLinkResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};
