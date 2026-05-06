import { Configuration, LogLevel, BrowserCacheLocation } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: "f1bf005d-f0d5-4013-9faf-63bce3f7fb1e", // From Entra Admin Center
    //authority: "https://login.microsoftonline.com/common",
    authority: "https://login.microsoftonline.com/pk5miningltd.com",
    redirectUri: `${window.location.origin}/admin`,
    postLogoutRedirectUri: `${window.location.origin}/admin/login`,
    // redirectUri: "https://pk5miningltd.local:5173/admin",
    // postLogoutRedirectUri: "https://pk5miningltd.local:5173/admin/login",
    // REMOVE navigateToLoginRequestUrl if it causes an error. 
    // Default is true. If you need it false, MSAL v5+ usually
    // prefers you handle this in the handleRedirectPromise logic.
  },
  cache: {
    // Use the enum for better type safety
    cacheLocation: BrowserCacheLocation.LocalStorage, 
    // REMOVE storeAuthStateInCookie (Deprecated/Removed in strict types)
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        console.log(`MSAL [${level}]: ${message}`);
      },
      logLevel: LogLevel.Info,
    },
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
  extraQueryParameters: { domain_hint: "pk5miningltd.com" }
  // forceRefresh: false // optional
};