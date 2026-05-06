import { Configuration, PopupRequest } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: "f1bf005d-f0d5-4013-9faf-63bce3f7fb1e", // From Entra Admin Center
    authority: "https://login.microsoftonline.com/common", // or your Tenant ID
    redirectUri: "https://pk5miningltd.local:5173/admin",
    // authority: "https://login.microsoftonline.com/b01b2107-79a7-4edf-8e08-06012176f58f", // or your Tenant ID
    /// redirectUri: "https://localhost:5173",
  },
  cache: {
    cacheLocation: "localStorage", // More persistent than sessionStorage
    // storeAuthStateInCookie: true,   // Recommended for IE11/Safari or .local domains
    // secureCookies: true,
  }
};

// Scopes for the ID token / Graph API
export const loginRequest: PopupRequest = {
  scopes: ["User.Read"]
};