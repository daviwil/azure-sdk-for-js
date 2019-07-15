/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { CloudErrorMapper, BaseResourceMapper } from "@azure/core-arm";
import * as coreHttp from "@azure/core-http";

export const CloudError = CloudErrorMapper;
export const BaseResource = BaseResourceMapper;

export const ManagementLockOwner: coreHttp.CompositeMapper = {
  serializedName: "ManagementLockOwner",
  type: {
    name: "Composite",
    className: "ManagementLockOwner",
    modelProperties: {
      applicationId: {
        serializedName: "applicationId",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ManagementLockObject: coreHttp.CompositeMapper = {
  serializedName: "ManagementLockObject",
  type: {
    name: "Composite",
    className: "ManagementLockObject",
    modelProperties: {
      level: {
        required: true,
        serializedName: "properties.level",
        type: {
          name: "String"
        }
      },
      notes: {
        serializedName: "properties.notes",
        type: {
          name: "String"
        }
      },
      owners: {
        serializedName: "properties.owners",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "ManagementLockOwner"
            }
          }
        }
      },
      id: {
        readOnly: true,
        serializedName: "id",
        type: {
          name: "String"
        }
      },
      type: {
        readOnly: true,
        serializedName: "type",
        type: {
          name: "String"
        }
      },
      name: {
        readOnly: true,
        serializedName: "name",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const OperationDisplay: coreHttp.CompositeMapper = {
  serializedName: "Operation_display",
  type: {
    name: "Composite",
    className: "OperationDisplay",
    modelProperties: {
      provider: {
        serializedName: "provider",
        type: {
          name: "String"
        }
      },
      resource: {
        serializedName: "resource",
        type: {
          name: "String"
        }
      },
      operation: {
        serializedName: "operation",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Operation: coreHttp.CompositeMapper = {
  serializedName: "Operation",
  type: {
    name: "Composite",
    className: "Operation",
    modelProperties: {
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      display: {
        serializedName: "display",
        type: {
          name: "Composite",
          className: "OperationDisplay"
        }
      }
    }
  }
};

export const OperationListResult: coreHttp.CompositeMapper = {
  serializedName: "OperationListResult",
  type: {
    name: "Composite",
    className: "OperationListResult",
    modelProperties: {
      value: {
        serializedName: "",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "Operation"
            }
          }
        }
      },
      nextLink: {
        serializedName: "nextLink",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ManagementLockListResult: coreHttp.CompositeMapper = {
  serializedName: "ManagementLockListResult",
  type: {
    name: "Composite",
    className: "ManagementLockListResult",
    modelProperties: {
      value: {
        serializedName: "",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "ManagementLockObject"
            }
          }
        }
      },
      nextLink: {
        serializedName: "nextLink",
        type: {
          name: "String"
        }
      }
    }
  }
};
