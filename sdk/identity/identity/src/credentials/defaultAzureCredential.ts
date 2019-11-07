// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isNode, TokenCredential } from '@azure/core-http';
import { TokenCredentialOptions } from "../client/identityClient";
import { ChainedTokenCredential } from "./chainedTokenCredential";
import { EnvironmentCredential } from "./environmentCredential";
import { ManagedIdentityCredential } from "./managedIdentityCredential";
import { InteractiveBrowserCredential, BrowserLoginStyle } from '..';

export interface DefaultAzureCredentialOptions extends TokenCredentialOptions {
  /**
   * Specifies the client ID of the user-assigned managed identity.  This
   * option is not needed when using a system-assigned managed identity.
   */
  managedIdentityClientId?: string;

  /**
   * Specifies whether the {@link EnvironmentCredential} will be excluded from
   * the authentication flow.  Setting to true disables reading authentication
   * details from the process' environment variables.  Defaults to false.
   */
  excludeEnvironmentCredential?: boolean;

  /**
   * Specifies whether the {@link ManagedIdentityCredential} will be excluded
   * from the {@link DefaultAzureCredential} authentication flow. Setting to
   * true disables authenticating with managed identity endpoints.  Defaults to
   * false.
   */
  excludeManagedIdentityCredential?: boolean;


  /**
   * Specifies the {@link BrowserLoginStyle} to use when authentication is
   * attempted with the {@link InteractiveBrowserCredential}.  Defaults to
   * "popup".
   */
  interactiveBrowserCredentialLoginStyle?: BrowserLoginStyle,

  /**
   * Specifies whether the {@link InteractiveBrowserCredential} will be excluded
   * from the {@link DefaultAzureCredential} authentication flow.  Setting to
   * true disables launching the default system browser to authenticate in
   * developement environments.  Defaults to true.
   */
  excludeInteractiveBrowserCredential?: boolean;
}

const DefaultCredentialOptions: DefaultAzureCredentialOptions = {
  excludeEnvironmentCredential: false,
  excludeManagedIdentityCredential: false,
  interactiveBrowserCredentialLoginStyle: "popup",
  excludeInteractiveBrowserCredential: true
};

/**
 * Provides a default {@link ChainedTokenCredential} configuration for
 * applications that will be deployed to Azure.  The following credential
 * types will be tried, in order:
 *
 * - {@link EnvironmentCredential}
 * - {@link ManagedIdentityCredential}
 * - {@link InteractiveBrowserCredential} (only in browser builds)
 *
 * Consult the documentation of these credential types for more information
 * on how they attempt authentication.
 *
 * You may also customize the inclusion and behavior of these credentials by
 * settings the fields of the `options` parameter.  The {@link
 * DefaultAzureCredentialOptions} interface documents the available options.
 */
export class DefaultAzureCredential extends ChainedTokenCredential {
  /**
   * Creates an instance of the DefaultAzureCredential class.
   *
   * @param options Options for configuring the client which makes the authentication request.
   */
  constructor(options?: DefaultAzureCredentialOptions) {
    const credentials: TokenCredential[] = [];

    options = {
      ...DefaultCredentialOptions,
      ...options
    }

    if (!options.excludeManagedIdentityCredential) {
      credentials.push(new ManagedIdentityCredential(options.managedIdentityClientId as any, options));
    }

    if (!options.excludeEnvironmentCredential) {
      credentials.push(new EnvironmentCredential(options));
    }

    if (!isNode && !options.excludeInteractiveBrowserCredential) {
      credentials.push(new InteractiveBrowserCredential({
        ...options,
        loginStyle: options.interactiveBrowserCredentialLoginStyle
      }));
    }

    super(...credentials);
  }
}
