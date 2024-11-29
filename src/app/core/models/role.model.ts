import {PermissionForList} from './permission.model';

export interface IRole {
  id: number;
  name: string;
  title: string;
}



export class RoleForSave implements IRole {
  id: number = 0;
  name: string;
  title: string;
  permissions: number[];
  constructor(name: string = '',
              title: string = '',
              permissions: number[] = []) {
    this.name = name;
    this.title = title;
    this.permissions = permissions;
  }
}

export class RoleForReceive implements IRole {
  id: number = 0;
  name: string;
  title: string;
  permissions: PermissionForList[];
  constructor(name: string = '',
              title: string = '',
              permissions: PermissionForList[] = []) {
    this.name = name;
    this.title = title;
    this.permissions = permissions;
  }
}

export class RoleForList implements IRole {
  id: number = 0;
  name: string = '';
  title: string = '';
}


