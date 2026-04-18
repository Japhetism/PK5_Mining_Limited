export type Permission = {
  id: number,
  name: string;
}

export type PermissionResponsePayload = Permission[]

export type BackendPermissionGroup = {
  name: string;
  key: string;
  permissions: Permission[];
};