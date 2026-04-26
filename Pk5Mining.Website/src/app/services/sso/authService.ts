import { PublicClientApplication, AuthenticationResult } from "@azure/msal-browser";
import { loginRequest, msalConfig } from "@/app/config/sso/authconfig";

class AuthService {
  private msalInstance: PublicClientApplication;

  constructor() {
    this.msalInstance = new PublicClientApplication(msalConfig);
  }

  // Ensure instance is ready before use
  public async initialize(): Promise<void> {
    await this.msalInstance.initialize();
  }

  public async login(): Promise<AuthenticationResult | null> {
    try {
      const response = await this.msalInstance.loginPopup(loginRequest);
      return response;
    } catch (error) {
      console.error("Auth Error:", error);
      return null;
    }
  }

  public getAccount() {
    return this.msalInstance.getAllAccounts()[0] || null;
  }
}

export const authService = new AuthService();