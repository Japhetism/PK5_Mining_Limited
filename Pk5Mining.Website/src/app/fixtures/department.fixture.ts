import { Department } from "../interfaces/department";

export const mock_departments: Department[] = [
  {
    id: "role_001",
    name: "Software Engineering",
    description: "Responsible for software development and maintenance",
    subsidiaryId: "sub_001",
    isActive: true,
    dT_Created: "2026-03-05T10:00:00Z",
    dT_Updated: "2026-03-05T10:00:00Z"
  },
  {
    id: "role_002",
    name: "Mining Operations",
    description: "Specializes in mining operations and management",
    subsidiaryId: "sub_001",
    isActive: true,
    dT_Created: "2026-03-05T10:00:00Z",
    dT_Updated: "2026-03-05T10:00:00Z"
  },
  {
    id: "role_003",
    name: "Human Resources",
    description: "Handles recruitment processes",
    subsidiaryId: "sub_002",
    isActive: false,
    dT_Created: "2026-03-05T10:00:00Z",
    dT_Updated: "2026-03-05T10:00:00Z"
  }
];