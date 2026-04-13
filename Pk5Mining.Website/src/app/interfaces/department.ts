import { PaginationInfo } from ".";

export type Department = {
  id: string;
  name: string;
  description?: string;
  subsidiaryId?: string;
  isActive?: boolean;
  dT_Created: string;
  dT_Updated: string;
};

export type DepartmentResponsePayload = {
  data: Department[];
} & PaginationInfo;

export type CreateDepartmentPayload = Omit<Department, "id" | "dT_Created" | "dT_Updated">;

export type UpdateDepartmentPayload = Partial<CreateDepartmentPayload>;

export type DepartmentErrors = {
  [K in keyof CreateDepartmentPayload]?: string;
};

export type DepartmentsQuery = {
  pageNumber: number;
  pageSize: number;
  isActive?: boolean | string;
};