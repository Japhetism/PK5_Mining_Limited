import { PaginationInfo } from ".";
import { Subsidiary } from "./subsidiary";

export type Department = {
  id: string;
  name: string;
  description?: string;
  subsidiaryId?: string;
  subsidiary?: Subsidiary | null;
  isActive?: boolean;
  status: "Active" | "Inactive";
  dT_Created: string;
  dT_Modified: string;
  dT_Updated: string,
};

export type DepartmentResponsePayload = {
  data: Department[];
} & PaginationInfo;

export type CreateDepartmentPayload = Omit<Department, "id" | "dT_Created" | "dT_Modified">;

export type UpdateDepartmentPayload = Partial<CreateDepartmentPayload>;

export type DepartmentErrors = {
  [K in keyof CreateDepartmentPayload]?: string;
};

export type DepartmentsQuery = {
  pageNumber: number;
  pageSize: number;
  name?: string;
  search?: string;
  isActive?: boolean | string;
};