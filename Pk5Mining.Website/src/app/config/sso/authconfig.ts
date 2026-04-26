import { Configuration, PopupRequest } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: "YOUR_CLIENT_ID", // From Entra Admin Center
    authority: "https://login.microsoftonline.com/common", // or your Tenant ID
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage",
    // storeAuthStateInCookie: false,
  }
};

// Scopes for the ID token / Graph API
export const loginRequest: PopupRequest = {
  scopes: ["User.Read"]
};