export const PERMISSIONS = {
  dashboardView: "dashboard.view",
  jobView: "job.view",
  jobCreate: "job.create",
  jobUpdate: "job.update",
  applicationView: "application.view",
  applicationUpdate: "application.update",
  contactMessageView: "contact-message.view",
  contactMessageUpdate: "contact-message.update",
  userView: "user.view",
  userCreate: "user.create",
  userUpdate: "user.update",
  subsidiarView: "subsidiary.view",
  subsidiaryCreate: "subsidiary.create",
  subsidiaryUpdate: "subsidiary.update",
  roleView: "role.view",
  roleCreate: "role.create",
  roleUpdate: "role.update",
  departmentView: "department.view",
  departmentCreate: "department.create",
  departmentUpdate: "department.update",
} as const;

export const PERMISSION_DETAILS = {
  [PERMISSIONS.dashboardView]: {
    name: "View Dashboard",
    description: "Ability to view the dashboard.",
  },

  [PERMISSIONS.jobView]: {
    name: "View Jobs",
    description: "Ability to view jobs.",
  },

  [PERMISSIONS.jobCreate]: {
    name: "Create Jobs",
    description: "Ability to create jobs.",
  },

  [PERMISSIONS.jobUpdate]: {
    name: "Update Jobs",
    description: "Ability to update jobs.",
  },

  [PERMISSIONS.applicationView]: {
    name: "View Applications",
    description: "Ability to view applications.",
  },

  [PERMISSIONS.applicationUpdate]: {
    name: "Update Applications",
    description: "Ability to update applications.",
  },

  [PERMISSIONS.contactMessageView]: {
    name: "View Contact Messages",
    description: "Ability to view contact messages.",
  },

  [PERMISSIONS.contactMessageUpdate]: {
    name: "Update Contact Messages",
    description: "Ability to update contact messages.",
  },

  [PERMISSIONS.userView]: {
    name: "View Users",
    description: "Ability to view users.",
  },

  [PERMISSIONS.userCreate]: {
    name: "Create Users",
    description: "Ability to create users.",
  },

  [PERMISSIONS.userUpdate]: {
    name: "Update Users",
    description: "Ability to update users.",
  },

  [PERMISSIONS.subsidiarView]: {
    name: "View Subsidiaries",
    description: "Ability to view subsidiaries.",
  },

  [PERMISSIONS.subsidiaryCreate]: {
    name: "Create Subsidiaries",
    description: "Ability to create subsidiaries.",
  },

  [PERMISSIONS.subsidiaryUpdate]: {
    name: "Update Subsidiaries",
    description: "Ability to update subsidiaries.",
  },

  [PERMISSIONS.roleView]: {
    name: "View Roles",
    description: "Ability to view roles.",
  },

  [PERMISSIONS.roleCreate]: {
    name: "Create Roles",
    description: "Ability to create roles.",
  },

  [PERMISSIONS.roleUpdate]: {
    name: "Update Roles",
    description: "Ability to update roles.",
  },

  [PERMISSIONS.departmentView]: {
    name: "View Departments",
    description: "Ability to view departments.",
  },

  [PERMISSIONS.departmentCreate]: {
    name: "Create Departments",
    description: "Ability to create departments.",
  },

  [PERMISSIONS.departmentUpdate]: {
    name: "Update Departments",
    description: "Ability to update departments.",
  },
} as const;