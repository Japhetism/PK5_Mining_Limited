import { 
  PublicClientApplication, 
  AuthenticationResult, 
  AccountInfo, 
  IPublicClientApplication 
} from "@azure/msal-browser";
import { loginRequest, msalConfig } from "@/app/config/sso/authconfig";

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

  public async initialize(): Promise<AuthenticationResult | null> {
    // 1. Initialize MSAL if not already done
    if (!this.isInitialized) {
      if (!this.initializingPromise) {
        this.initializingPromise = this.msalInstance.initialize();
      }
      await this.initializingPromise;
      this.isInitialized = true;
    }

    try {
      // 2. Capture the result from the redirect
      const response = await this.msalInstance.handleRedirectPromise();

      if (response) {
        console.log("✅ MSAL: Redirect response captured");
        this.msalInstance.setActiveAccount(response.account);
        return response;
      }

      // 3. Fallback: If no response, but we have accounts in storage
      const accounts = this.msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        if (!this.msalInstance.getActiveAccount()) {
          this.msalInstance.setActiveAccount(accounts[0]);
        }
        console.log("✅ MSAL: Session restored from storage");
      }

      return null;
    } catch (error) {
      console.error("❌ MSAL: Initialization error", error);
      return null;
    }
  }

  public async login(): Promise<void> {
    try {
      if (!this.isInitialized) await this.initialize();
      await this.msalInstance.loginRedirect(loginRequest);
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
      console.warn("Silent token acquisition failed", error);
      return null;
    }
  }
}

export const authService = AuthService.getInstance();