import { PaginationInfo } from ".";
import { PERMISSIONS } from "../constants/permissions";

export type Role = {
  id: string;
  name: string;
  description?: string;
  subsidiaryId?: string;
  isSystem?: boolean;
  isActive?: boolean;
  permissions?: Array<string>;
  dT_Created: string;
  dT_Updated: string;
};

export type RoleResponsePayload = {
  data: Role[];
} & PaginationInfo;

export type CreateRolePayload = Omit<Role, "id" | "dT_Created" | "dT_Updated">;

export type UpdateRolePayload = Partial<CreateRolePayload>;

export type RoleErrors = {
  [K in keyof CreateRolePayload]?: string;
};

export type RolesQuery = {
  pageNumber: number;
  pageSize: number;
  isActive?: boolean | string;
};

export type Permission =
  (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export type PermissionGroup = {
  name: string;
  key: string;
  permissions: Permission[];
};