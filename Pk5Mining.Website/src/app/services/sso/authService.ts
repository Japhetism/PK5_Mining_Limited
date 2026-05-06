import {
  PublicClientApplication,
  AuthenticationResult,
  AccountInfo,
  LogLevel,
  Configuration,
} from "@azure/msal-browser";
import { loginRequest, msalConfig } from "@/app/config/sso/authconfig";

class AuthService {
  private static instance: AuthService;
  private msalInstance: PublicClientApplication;
  private isInitialized: boolean = false;

  private constructor() {
    this.msalInstance = new PublicClientApplication(msalConfig);
  }

  // Ensures only one instance of MSAL exists in your app
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Initializes the MSAL library and handles the redirect response.
   * This MUST be called on the landing page/layout.
   */
  // authservice.ts
  public async initialize(): Promise<AuthenticationResult | null> {
    await this.msalInstance.initialize();

    try {
      // 1. Manually check if there is a hash in the URL before processing
      console.log(
        "Current URL Hash:",
        window.location.hash ? "Found hash" : "No hash found",
      );

      const response = await this.msalInstance.handleRedirectPromise();

      if (response) {
        console.log("✅ Response found in URL!");
        this.msalInstance.setActiveAccount(response.account);
        return response;
      }

      // 2. If no response, check if the browser has it in storage
      const accounts = this.msalInstance.getAllAccounts();
      console.log("Accounts in storage count:", accounts.length);

      if (accounts.length > 0) {
        this.msalInstance.setActiveAccount(accounts[0]);
        return { account: accounts[0] } as AuthenticationResult;
      }

      return null;
    } catch (error) {
      console.error("MSAL initialization failed:", error);
      return null;
    }
  }

  /**
   * Triggers the redirect to Microsoft Login
   */
  public async login(): Promise<void> {
    try {
      // Ensure initialized before login
      if (!this.isInitialized) await this.msalInstance.initialize();

      await this.msalInstance.loginRedirect(loginRequest);
    } catch (error) {
      console.error("❌ Login Trigger Error:", error);
    }
  }

  /**
   * Returns the currently logged-in user
   */
  public getAccount(): AccountInfo | null {
    return (
      this.msalInstance.getActiveAccount() ||
      (this.msalInstance.getAllAccounts().length > 0
        ? this.msalInstance.getAllAccounts()[0]
        : null)
    );
  }

  /**
   * Logs out the user and clears the session
   */
  public async logout(): Promise<void> {
    await this.msalInstance.logoutRedirect({
      postLogoutRedirectUri: window.location.origin,
    });
  }

  /**
   * Helper to get the access token for API calls
   */
  public async getToken(): Promise<string | null> {
    const account = this.getAccount();
    if (!account) return null;

    try {
      const response = await this.msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account,
      });
      return response.accessToken;
    } catch (error) {
      console.warn(
        "Silent token acquisition failed, acquiring via popup",
        error,
      );
      return null;
    }
  }
}

// Export a single instance to be used throughout the app
export const authService = AuthService.getInstance();
