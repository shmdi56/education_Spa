export interface IPermission {
  groupName: string;
  shortName: string;
  description: string;
  permission: number;
  moduleName: string;
}

export class Permission implements IPermission {
  groupName: string = '';
  shortName: string = '';
  description: string = '';
  permission: number = 0;
  moduleName: string = '';
}

export class PermissionForSave implements IPermission{
  groupName: string;
  shortName: string;
  description: string;
  permission: number;
  moduleName: string;
  constructor(groupName: string = '',
              shortName: string = '',
              description: string = '',
              permission: number = 0,
              moduleName: string = '') {
    this.groupName = groupName;
    this.shortName = shortName;
    this.description = description;
    this.permission = permission;
    this.moduleName = moduleName;
  }
}

export class PermissionForList implements IPermission {
  groupName: string = '';
  shortName: string = '';
  description: string = '';
  permission: number = 0;
  moduleName: string = '';
}



export class ModuleWithGroups {
  moduleName: string = '';
  groups: GroupWithPermissions[] = [];
}

export class GroupWithPermissions {
  group: string = '';
  permissionsArray: PermissionForList[] = [];
}

