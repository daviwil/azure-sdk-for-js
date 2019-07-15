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

export const acceptLanguage: coreHttp.OperationParameter = {
  parameterPath: "acceptLanguage",
  mapper: {
    serializedName: "accept-language",
    defaultValue: 'en-US',
    type: {
      name: "String"
    }
  }
};
export const apiVersion: coreHttp.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    required: true,
    serializedName: "api-version",
    type: {
      name: "String"
    }
  }
};
export const filter: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "filter"
  ],
  mapper: {
    serializedName: "$filter",
    type: {
      name: "String"
    }
  }
};
export const lockName: coreHttp.OperationURLParameter = {
  parameterPath: "lockName",
  mapper: {
    required: true,
    serializedName: "lockName",
    type: {
      name: "String"
    }
  }
};
export const nextPageLink: coreHttp.OperationURLParameter = {
  parameterPath: "nextPageLink",
  mapper: {
    required: true,
    serializedName: "nextLink",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const parentResourcePath: coreHttp.OperationURLParameter = {
  parameterPath: "parentResourcePath",
  mapper: {
    required: true,
    serializedName: "parentResourcePath",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const resourceGroupName: coreHttp.OperationURLParameter = {
  parameterPath: "resourceGroupName",
  mapper: {
    required: true,
    serializedName: "resourceGroupName",
    constraints: {
      MaxLength: 90,
      MinLength: 1,
      Pattern: /^[-\w\._\(\)]+$/
    },
    type: {
      name: "String"
    }
  }
};
export const resourceName: coreHttp.OperationURLParameter = {
  parameterPath: "resourceName",
  mapper: {
    required: true,
    serializedName: "resourceName",
    type: {
      name: "String"
    }
  }
};
export const resourceProviderNamespace: coreHttp.OperationURLParameter = {
  parameterPath: "resourceProviderNamespace",
  mapper: {
    required: true,
    serializedName: "resourceProviderNamespace",
    type: {
      name: "String"
    }
  }
};
export const resourceType: coreHttp.OperationURLParameter = {
  parameterPath: "resourceType",
  mapper: {
    required: true,
    serializedName: "resourceType",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const scope: coreHttp.OperationURLParameter = {
  parameterPath: "scope",
  mapper: {
    required: true,
    serializedName: "scope",
    type: {
      name: "String"
    }
  }
};
export const subscriptionId: coreHttp.OperationURLParameter = {
  parameterPath: "subscriptionId",
  mapper: {
    required: true,
    serializedName: "subscriptionId",
    type: {
      name: "String"
    }
  }
};
