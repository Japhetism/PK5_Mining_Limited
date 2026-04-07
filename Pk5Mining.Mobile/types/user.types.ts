export type User = {
  id: string;
  name: string;
  role: "worker" | "supervisor" | "hod" | "director" | "admin";
  employeeId: string;
  email: string;
};
