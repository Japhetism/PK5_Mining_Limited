import {
  PublicClientApplication,
  AuthenticationResult,
  AccountInfo,
  IPublicClientApplication,
} from "@azure/msal-browser";
import { loginRequest, msalConfig } from "@/app/config/sso/authconfig";
import { tokenStore } from "@/app/auth/token";
import { setAuthToken } from "@/app/api/http";

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
    if (!this.isInitialized) {
      if (!this.initializingPromise) {
        this.initializingPromise = this.msalInstance.initialize();
      }
      await this.initializingPromise;
      this.isInitialized = true;
    }

    try {
      const response = await this.msalInstance.handleRedirectPromise();

      if (response) {
        this.msalInstance.setActiveAccount(response.account);
        return response;
      }

      const accounts = this.msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        const activeAccount =
          this.msalInstance.getActiveAccount() || accounts[0];
        this.msalInstance.setActiveAccount(activeAccount);
      }

      return null;
    } catch (error) {
      console.error("❌ MSAL: Initialization error", error);
      return null;
    }
  }

  public async login(email?: string): Promise<void> {
    try {
      if (!this.isInitialized) await this.initialize();

      const request = {
        ...loginRequest,
        loginHint: email,
        extraQueryParameters: {
          ...(loginRequest as any).extraQueryParameters,
          // domain_hint: "pk5miningltd.com",
        },
      };

      await this.msalInstance.loginRedirect(request);
    } catch (error) {
      console.error("❌ MSAL: Login trigger error", error);
    }
  }

  public getAccount(): AccountInfo | null {
    return this.msalInstance.getActiveAccount();
  }

  public async logout(): Promise<boolean> {
    try {
      const account = this.getAccount();
      if (account) {
        await this.msalInstance.logoutRedirect({
          account: account,
          logoutHint: account.username,
          postLogoutRedirectUri: `${window.location.origin}/login`,
        });
      } else {
        await this.msalInstance.logoutRedirect();
      }

      return true;
    } catch (error) {
      console.error("Logout failed", error);
      return false;
    } finally {
      tokenStore.clear();
      setAuthToken(undefined);
    }
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

  public async getGraphToken(): Promise<string | null> {
    const account = this.getAccount();
    if (!account) return null;

    try {
      const response = await this.msalInstance.acquireTokenSilent({
        scopes: ["https://graph.microsoft.com/User.Read"],
        account: account,
      });
      return response.accessToken;
    } catch (error) {
      console.warn("⚠️ MSAL: Silent graph token acquisition failed, attempting popup/redirect", error);
      try {
        const response = await this.msalInstance.acquireTokenPopup({
          scopes: ["https://graph.microsoft.com/User.Read"],
          account: account,
        });
        return response.accessToken;
      } catch (popupError) {
        console.error("❌ MSAL: Failed to acquire Graph token", popupError);
        return null;
      }
    }
  }
}

export const authService = AuthService.getInstance();