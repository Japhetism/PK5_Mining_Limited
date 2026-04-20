import { PaginationInfo } from ".";
import { PERMISSIONS } from "../constants/permissions";
import { Permission as BackendPermission } from "./permission";
import { Subsidiary } from "./subsidiary";

export type Role = {
  id: string;
  name: string;
  description?: string;
  subsidiaryId?: number;
  subsidiary?: Subsidiary | null;
  systemRole?: string;
  isSystem?: boolean;
  isActive?: boolean;
  permissions?: BackendPermission[];
  permissionIds?: Array<number>;
  status: "Active" | "Inactive";
  dT_Created: string;
  dT_Modified: string;
};

export type RoleResponsePayload = {
  data: Role[];
} & PaginationInfo;

export type CreateRolePayload = Omit<Role, "id" | "dT_Created" | "dT_Modified">;

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