import { Role } from "../interfaces/role";

export const mock_roles: Role[] = [
  {
    id: "role_001",
    name: "Super Admin",
    description: "Full access to the entire company",
    isSystem: true,
    isActive: true,
    permissions: [
      "user.read",
      "user.create",
      "user.update"
    ],
    dT_Created: "2026-03-05T10:00:00Z",
    dT_Updated: "2026-03-05T10:00:00Z"
  },
  {
    id: "role_002",
    name: "HR Manager",
    description: "Manages HR operations for a subsidiary",
    subsidiaryId: "sub_001",
    isActive: true,
    dT_Created: "2026-03-05T10:00:00Z",
    dT_Updated: "2026-03-05T10:00:00Z"
  },
  {
    id: "role_003",
    name: "Recruiter",
    description: "Handles recruitment processes",
    subsidiaryId: "sub_002",
    isActive: false,
    dT_Created: "2026-03-05T10:00:00Z",
    dT_Updated: "2026-03-05T10:00:00Z"
  }
];