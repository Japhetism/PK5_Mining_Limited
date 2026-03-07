import { PaginationInfo } from ".";

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

export type Permission = { id: string; key: string; description?: string };