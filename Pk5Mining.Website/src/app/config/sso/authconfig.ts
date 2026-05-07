import { Configuration, LogLevel, BrowserCacheLocation } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: "f1bf005d-f0d5-4013-9faf-63bce3f7fb1e",
    authority: "https://login.microsoftonline.com/pk5miningltd.com",
    redirectUri: `${window.location.origin}/admin/sso`,
    postLogoutRedirectUri: `${window.location.origin}/admin/login`,
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage, 
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
      },
      logLevel: LogLevel.Info,
    },
  },
};

export const loginRequest = {
  scopes: ["User.Read", "api://a2dc2f0c-99a4-4708-bd36-835cc0f77382/pk5.Read"],
  extraQueryParameters: { domain_hint: "pk5miningltd.com" }
};