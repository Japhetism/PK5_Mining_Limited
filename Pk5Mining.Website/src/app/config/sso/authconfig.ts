import { Configuration, LogLevel, BrowserCacheLocation } from "@azure/msal-browser";

const CLIENT_ID = import.meta.env.VITE_AUTH_CLIENT_ID ?? "";
const CLIENT_SCOPE = import.meta.env.VITE_AUTH_CLIENT_SCOPE ?? "";
const CLIENT_AUTHORITY = import.meta.env.VITE_CLIENT_AUTHORITY ?? "";

export const msalConfig: Configuration = {
  auth: {
    clientId: CLIENT_ID,
    authority: CLIENT_AUTHORITY,
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
  scopes: [CLIENT_SCOPE],
};