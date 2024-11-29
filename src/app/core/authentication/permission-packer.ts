import {RoutePermissions} from './permissions';

export class PermissionPacker {
  static readonly PackType: string = 'H';
  static readonly PackSize: string = '4';

  static FormDefaultPackPrefix(): string {
    return this.PackType.concat(this.PackSize, '-');
  }

  static UnpackPermissionValuesFromString(packedPermissions: string): number[] {
    const packPrefix = PermissionPacker.FormDefaultPackPrefix();
    if (packedPermissions == null) {
      return [];
    }
    if (!packedPermissions.startsWith(packPrefix)) {
      return [];
    }
    const packedSize = parseInt(this.PackSize, 10);

    let index = packPrefix.length;
    const permissionNumbers: number[] = [];
    while (index < packedPermissions.length) {

      permissionNumbers.push(parseInt(packedPermissions.substr(index, packedSize), 16));
      index += packedSize;
    }

    return permissionNumbers;

  }

  static UnpackPermissionsFromString(packedPermissions: string): RoutePermissions[] {
    const permissionNumbers = this.UnpackPermissionValuesFromString(packedPermissions);
    const permissions: RoutePermissions[] = [];
    permissionNumbers.forEach(permission => {
      permissions.push(permission as RoutePermissions);
    });
    return permissions;
  }


}
