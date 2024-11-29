import {ModulesEnum} from "../enums/enums";
import {RoleForList} from "./role.model";

export interface IUser {
  personnelCode: string;
  firstName: string;
  lastName: string;
  mainModule: ModulesEnum;
}

export class User implements IUser {
  id?: number;
  userName: string;
  password: string;
  personnelCode: string;
  firstName: string;
  lastName: string;
  roleName: string;
  phoneNumber: string;
  mobileNumber: string;
  mainModule: ModulesEnum;
  photoUrl: string;

}

export class UserWithPositions implements IUser {
  id?: number;
  userName: string;
  password: string;
  personnelCode: string;
  firstName: string;
  lastName: string;
  roleName: string;
  phoneNumber: string;
  mobileNumber: string;
  mainModule: ModulesEnum;
  photoUrl: string;
  userPositions: UserPositionForSave[];

}

export class UserForSave implements IUser {
  id?: number;
  userName: string;
  password: string;
  roleName: string;
  personnelCode: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  mainModule: ModulesEnum | null;
  userRoles: UserRoleForSave[];
  constructor(id: number = 0,
              userName: string = '',
              password: string = '',
              roleName: string = '',
              personnelCode: string = '',
              firstName: string = '',
              lastName: string = '',
              mobileNumber: string = '',
              mainModule: ModulesEnum = ModulesEnum.ADMIN) {
    this.id = id;
    this.userName = userName;
    this.password = password;
    this.roleName = roleName;
    this.personnelCode = personnelCode;
    this.firstName = firstName;
    this.lastName = lastName;
    this.mobileNumber = mobileNumber;
    this.mainModule = mainModule;
  }
}

export class UserForList implements IUser {
  id: number;
  userName: string;
  personnelCode: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userDescription: string;
  mainModule: ModulesEnum;
  positionId: number;
  positionTitle: string;
  progress: number;
  roles: RoleForList[];
  userRoles: UserRoleForList[];
  constructor(id: number = 0,
              userName: string = '',
              personnelCode: string = '',
              firstName: string = '',
              lastName: string = '',
              photoUrl: string = '',
              userDescription: string = '',
              mainModule: ModulesEnum = ModulesEnum.ADMIN,
              positionId: number = 0,
              positionTitle: string = '') {
    this.id = id;
    this.userName = userName;
    this.personnelCode = personnelCode;
    this.firstName = firstName;
    this.lastName = lastName;
    this.photoUrl = photoUrl;
    this.userDescription = userDescription;
    this.mainModule = mainModule;
    this.positionId = positionId;
    this.positionTitle = positionTitle;
  }
}

export class UserStashed {
  id: number;
  userName: string;
  name: string;
  mainModule: ModulesEnum | null;
  role: string;
  positionId: number;
  positionTitle: string;
  photoUrl: string;
  constructor(id: number = 0,
              userName: string = '',
              name: string = '',
              mainModule: ModulesEnum = null,
              role: string = '',
              positionId: number = 0,
              photoUrl: string = '',
              positionTitle: string = '') {
    this.id = id;
    this.userName = userName;
    this.name = name;
    this.mainModule = mainModule;
    this.role = role;
    this.positionId = positionId;
    this.positionTitle = positionTitle;
    this.photoUrl = photoUrl;
  }
}

export class UserForLogin {
  userName: string;
  password: string;
}

export class UserForChangePassword {
  userName: string;
  currentPassword: string;
  newPassword: string;
  constructor(userName: string = '', currentPassword: string = '', newPassword: string = '') {
    this.userName = userName;
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
  }
}

export class UserPositionForSave {
  fromDate: Date;
  toDate: Date;
  positionId: number;
  userId: number;
  constructor(fromDate: Date = null, toDate: Date = null, positionId: number = 0, userId: number = 0, ) {
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.positionId = positionId;
    this.userId = userId;
  }
}

export interface ITokenModel {
  token: string;
}
export class UserRoleForSave {
  userId?: number;
  roleId: number;
}

export class UserRoleForList {
  userId: number;
  roleId: number;
  roleTitle: string;
}


