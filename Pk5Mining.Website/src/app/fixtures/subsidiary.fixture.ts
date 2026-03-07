import { Subsidiary } from "../interfaces/subsidiary";

export const mock_subsidiaries: Subsidiary[] = [
  {
    id: "PK5-001",
    name: "PK5 Mining",
    code: "PK5-Mining",
    country: "Nigeria",
    timezone: "Africa/Lagos",
    address: "Enugu, Nigeria",
    email: "info@pk5miningltd.com",
    isActive: true,
    dT_Created: "2026-03-02T09:00:00Z",
    dT_Updated: "2026-03-02T09:00:00Z"
  },
  {
    id: "PK5-002",
    name: "PK5 Agro-allied",
    code: "PK5-Afro",
    country: "United State",
    timezone: "Eastern Standard Time (EST)",
    address: "Atlanta, USA",
    email: "info@agroallied.com",
    isActive: true,
    dT_Created: "2026-03-04T09:00:00Z",
    dT_Updated: "2026-03-04T09:00:00Z"
  },
  {
    id: "PK5-003",
    name: "PK5 Real Estate",
    code: "PK5-Real-Estate",
    country: "United State",
    timezone: "Eastern Standard Time (EST)",
    address: "Atlanta, United State",
    email: "info@pk5realestate.com",
    isActive: false,
    dT_Created: "2026-03-06T09:00:00Z",
    dT_Updated: "2026-03-06T09:00:00Z"
  }
];