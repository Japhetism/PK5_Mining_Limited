const AUTH_KEY = "pk5_admin_authed";

export type AdminCredentials = {
  username: string;
  password: string;
};

function getConfiguredCredentials(): AdminCredentials | null {
  // Optional Vite env overrides (recommended for real use).
  // If not provided, we fall back to default demo credentials.
  const username = import.meta.env.VITE_ADMIN_USERNAME as string | undefined;
  const password = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;

  if (username && password) {
    return { username, password };
  }

  return { username: "", password: "" };
}

export function isAdminAuthed(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

export function adminLogin(creds: AdminCredentials): boolean {
  const configured = getConfiguredCredentials();
  if (!configured) return false;

  const ok =
    creds.username.trim() === configured.username &&
    creds.password === configured.password;

  if (ok) {
    sessionStorage.setItem(AUTH_KEY, "true");
  }

  return ok;
}

export function adminLogout() {
  sessionStorage.removeItem(AUTH_KEY);
}

