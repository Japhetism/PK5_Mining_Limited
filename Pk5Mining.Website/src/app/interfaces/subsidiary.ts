import { PaginationInfo } from ".";

export type SubsidiaryStatus = "active" | "inactive";

export type Subsidiary = {
  id: string;
  name: string;
  code: string;
  country: string;
  timezone: string;
  address?: string;
  email?: string;
  isActive?: boolean;
  dT_Created: string;
  dT_Updated?: string | null;
}

export type SubsidiaryResponsePayload = {
  data: Subsidiary[];
} & PaginationInfo;

export type CreateSubsidiaryPayload = Omit<Subsidiary, "id" | "dT_Created" | "dT_Updated">;

export type UpdateSubsidiaryPayload = Partial<CreateSubsidiaryPayload>;

export type SubsidiariesQuery = {
  pageNumber: number;
  pageSize: number;
  isActive?: boolean | string;
};

export type SubsidiaryErrors = {
  [K in keyof CreateSubsidiaryPayload]?: string;
};