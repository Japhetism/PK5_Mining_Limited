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
} as const;

export type Permission =
  (typeof PERMISSIONS)[keyof typeof PERMISSIONS];