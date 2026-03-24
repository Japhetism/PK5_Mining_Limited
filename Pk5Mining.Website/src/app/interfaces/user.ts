import { PaginationInfo } from ".";

export type UserStatus = "active" | "inactive";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  role?: string;
  password?: string;
  isActive?: boolean;
  dT_Created: string;
}

export type UsersResponsePayload = {
  data: User[];
} & PaginationInfo;

export type CreateUserPayload = Omit<User, "id" | "dT_Created" | "dT_Updated">;

export type UpdateUserPayload = Partial<CreateUserPayload> & {
    id: string;
};

export type UsersQuery = {
  pageNumber: number;
  pageSize: number;
  name?: string;
  email?: string;
  userName?: string;
  isActive?: boolean | string;
};

export type UserErrors = {
  [K in keyof CreateUserPayload]?: string;
};

export type ResetPasswordResponse = {
  tempPassword?: string;
  message?: string;
};

export interface IChangePasswordPayload {
  userId: string;
  newPassword: string;
}