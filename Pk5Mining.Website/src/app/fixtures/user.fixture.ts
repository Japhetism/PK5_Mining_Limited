import { User } from "../interfaces/user";

export const mockAuthenticationResonsePayload = {
  responseMessage: "Login Successful",
  responseData: {
    id: 10,
    email: "admin@admin.com",
    firstName: "Administrator",
    lastName: "Administrator",
    username: "Administrator",
    role: "Super Admin",
    hasChangedPassword: false,
    isActive: true,
    isDeleted: false,
    dT_Created: "2026-03-16T08:04:20.25",
    jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9naXZlbm5hbWUiOiJBZG1pbmlzdHJhdG9yIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiYWRtaW5AYWRtaW4uY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3VybmFtZSI6IkFkbWluaXN0cmF0b3IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlciBBZG1pbiIsImV4cCI6MTc3Mzc0MDk1NSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzAyOCIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcwMjgifQ.JySEyFwa1GOGX_Ba2TY4hE-Zoh_soJDywFVhYxbVgeU"
  },
  responseStatus: "SUCCESS"
}

export const mockUsers: User[] = [
  {
    id: "usr_001",
    firstName: "Babatunde",
    lastName: "Ojo",
    email: "babatunde.ojo@company.com",
    phone: "07053579784",
    role: "Super Admin",
    isActive: true,
    dT_Created: "2026-01-10T08:30:00Z",
    dT_Updated: "2026-02-01T10:15:00Z",
  },
  {
    id: "usr_002",
    firstName: "Chioma",
    lastName: "Adeyemi",
    email: "chioma.adeyemi@company.com",
    phone: "07053579785",
    role: "HR Manager",
    isActive: true,
    dT_Created: "2026-01-12T09:45:00Z",
    dT_Updated: "2026-01-12T09:45:00Z",
  },
  {
    id: "usr_003",
    firstName: "David",
    lastName: "Okonkwo",
    email: "david.okonkwo@company.com",
    phone: "07053579786",
    role: "Recruiter",
    isActive: false,
    dT_Created: "2026-01-15T11:20:00Z",
    dT_Updated: "2026-02-18T14:00:00Z",
  },
  {
    id: "usr_004",
    firstName: "Aisha",
    lastName: "Balogun",
    email: "aisha.balogun@company.com",
    phone: "07053579787",
    role: "Admin",
    isActive: true,
    dT_Created: "2026-01-20T13:10:00Z",
    dT_Updated: "2026-01-20T13:10:00Z",
  },
  {
    id: "usr_005",
    firstName: "Emeka",
    lastName: "Nwosu",
    email: "emeka.nwosu@company.com",
    phone: "07053579788",
    role: "Viewer",
    isActive: false,
    dT_Created: "2026-01-25T15:05:00Z",
    dT_Updated: "2026-02-10T09:30:00Z",
  },
];