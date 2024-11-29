export enum RoutePermissions {
  NotSet = 0x0000, // error condition
  AdministrationModuleAccess = 0x1000,
  UserMenuAccess = 0x1010,
  UserRead = 0x1011,
  UserEdit = 0x1012,
  UserDelete = 0x1013,
  RoleRead = 0x1021,
  RoleEdit = 0x1022,
  RoleDelete = 0x1023,
}
