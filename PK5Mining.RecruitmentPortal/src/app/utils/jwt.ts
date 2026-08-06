import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  exp?: number; // seconds since epoch
  [key: string]: unknown;
};

export function decodeJwt(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}

export function isJwtExpired(token: string, skewSeconds = 30): boolean {
  const payload = decodeJwt(token);

  if (!payload?.exp) return false;

  const now = Math.floor(Date.now() / 1000);

  return now >= payload.exp - skewSeconds;
}
