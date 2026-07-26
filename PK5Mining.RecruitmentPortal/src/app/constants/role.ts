export const USERROLES = {
  superAdmin: "Super Admin",
  
} as const;

export type UserRole =
  (typeof USERROLES)[keyof typeof USERROLES];