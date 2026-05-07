import { 
  PublicClientApplication, 
  AuthenticationResult, 
  AccountInfo, 
  IPublicClientApplication 
} from "@azure/msal-browser";
import { loginRequest, msalConfig } from "@/app/config/sso/authconfig";
import { microsoftLogin } from "@/app/api/auth";

class AuthService {
  private static instance: AuthService;
  private msalInstance: IPublicClientApplication;
  private isInitialized: boolean = false;
  private initializingPromise: Promise<void> | null = null;

  private constructor() {
    this.msalInstance = new PublicClientApplication(msalConfig);
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Initializes MSAL and handles the redirect back from Microsoft.
   * Returns the backend user data if a successful handshake occurs.
   */
  public async initialize(): Promise<any | null> {
    if (!this.isInitialized) {
      if (!this.initializingPromise) {
        this.initializingPromise = this.msalInstance.initialize();
      }
      await this.initializingPromise;
      this.isInitialized = true;
    }

    try {
      const response = await this.msalInstance.handleRedirectPromise();

      // Case 1: Just returned from a successful Microsoft Redirect
      if (response) {
        this.msalInstance.setActiveAccount(response.account);
        // Call your backend handshake immediately
        return await microsoftLogin();
      }

      // Case 2: Checking for existing session on page refresh
      const accounts = this.msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        const activeAccount = this.msalInstance.getActiveAccount() || accounts[0];
        this.msalInstance.setActiveAccount(activeAccount);
        
        // Optional: Call microsoftLogin() here if you want to verify 
        // the session with your backend on every refresh.
      }

      return null;
    } catch (error) {
      console.error("❌ MSAL: Initialization/Handshake error", error);
      return null;
    }
  }

  /**
   * Core login logic. Supports optional email pre-fill.
   */
  public async login(email?: string): Promise<void> {
    try {
      if (!this.isInitialized) await this.initialize();

      const request = {
        ...loginRequest,
        loginHint: email, 
        extraQueryParameters: { 
          ...loginRequest.extraQueryParameters,
          domain_hint: "pk5miningltd.com" 
        }
      };

      await this.msalInstance.loginRedirect(request);
    } catch (error) {
      console.error("❌ MSAL: Login trigger error", error);
    }
  }

  public getAccount(): AccountInfo | null {
    return this.msalInstance.getActiveAccount();
  }

  public async logout(): Promise<void> {
    const account = this.getAccount();
    await this.msalInstance.logoutRedirect({
      account: account,
    });
  }

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
      console.warn("⚠️ MSAL: Silent token acquisition failed", error);
      return null;
    }
  }
}

export const authService = AuthService.getInstance();