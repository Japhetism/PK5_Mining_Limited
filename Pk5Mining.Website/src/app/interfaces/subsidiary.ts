import { PaginationInfo } from ".";

export type SubsidiaryStatus = "active" | "inactive";

export type Subsidiary = {
  id: string | number;
  name: string;
  code: string;
  country: string;
  address?: string;
  email?: string;
  status?: "Active" | "Inactive";
  dT_Created: string;
  dT_Modified?: string | null;
}

export type SubsidiaryResponsePayload = {
  data: Subsidiary[];
} & PaginationInfo;

export type CreateSubsidiaryPayload = Omit<Subsidiary, "id" | "dT_Created" | "dT_Modified">;

export type UpdateSubsidiaryPayload = Partial<CreateSubsidiaryPayload>;

export type SubsidiariesQuery = {
  pageNumber: number;
  pageSize: number;
  name?: string;
  email?: string;
  country?: string;
  isActive?: boolean | string;
};

export type SubsidiaryErrors = {
  [K in keyof CreateSubsidiaryPayload]?: string;
};