import {Injectable, signal} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {ITokenModel, UserForLogin} from "../../models/user.model";
import {ModulesEnum} from "../../enums/enums";
import {RoutePermissions} from "../../authentication/permissions";
import {PermissionPacker} from "../../authentication/permission-packer";
import {NotificationService} from "../notification.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  private authenticated = signal(false);
  private loading = signal(false);
  private authControllerUrl = environment.BASE_URL + '/Auth';

  constructor(private httpClient: HttpClient,
              private router: Router,
              public notification: NotificationService) {
    this.loading.set(false);
  }


  login(loginInfo: UserForLogin) {
    this.loading.set(true);
    return this.httpClient.post<ITokenModel>(this.authControllerUrl + '/login', loginInfo).subscribe({
      next: (res) => {
        this.authenticate(res);
        this.notification.showSuccess('خوش آمدید', 'ورود موفق')
        this.loading.set(false);
      },
      error: err => {
        console.log(err);
        this.loading.set(false);
      },
      complete: () => console.log("completed")
    });
  }

  public logout() {
    const userName = this.getCurrentUsername();
    const userForLogout = new UserForLogin();
    userForLogout.userName = userName;
    localStorage.removeItem('token');
    this.authenticated.set(false);
    this.httpClient.post<ITokenModel>(environment.BASE_URL + '/Auth/logout', userForLogout).subscribe(() => {
      console.log('logout');
    });
    location.reload();
  }

  // In case of incorrect login details.
  public authenticationError() {
    this.authenticated.set(false);
  }


  public hasPermission(permission: RoutePermissions): boolean {
    if (permission === undefined) {
      return true;
    }
    return this.userPermissions().some(r => r === permission);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public userPermissions(): RoutePermissions[] {
    if (!this.isAuthenticated) {
      return [];
    }
    const token = this.getToken() ?? '';
    const decodedToken = this.jwtHelper.decodeToken(token);
    return PermissionPacker.UnpackPermissionsFromString(decodedToken.Permissions);

  }


  // This method submits authentication.
  public authenticate(result: ITokenModel) {
    localStorage.setItem('token', result.token);
    if (+this.getCurrentUserMainModule() === ModulesEnum.ADMIN) {
      const decodedToken = this.jwtHelper.decodeToken(result.token);
      localStorage.setItem('currentUserId', decodedToken.nameid);
      this.authenticated.set(true);
      this.router.navigate(['/administration']).then(() => {
        this.loading.set(false);
      });

    } else if (+this.getCurrentUserMainModule() === ModulesEnum.MINING) {

    } else if (+this.getCurrentUserMainModule() === ModulesEnum.MANAGEMENT) {

    }
  }

  isAuthenticated() {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

  getCurrentUserId() {
    const token = this.getToken() ?? '';
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.nameid;
  }

  getCurrentUsername() {
    const token = this.getToken() ?? '';
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.unique_name;
  }

  getCurrentUserPositionId() {
    const token = this.getToken() ?? '';
    const decodedToken = this.jwtHelper.decodeToken(token);
    return +decodedToken.PositionId;
  }

  getCurrentUserPositionTitle() {
    const token = this.getToken() ?? '';
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.PositionTitle;
  }

  getCurrentUserNameFamily() {
    const token = this.getToken() ?? '';
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.family_name;
  }

  getCurrentRole() {
    const token = this.getToken() ?? '';
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.role;
  }

  getCurrentUserMainModule(): ModulesEnum {
    const token = this.getToken() ?? '';
    const decodedToken = this.jwtHelper.decodeToken(token);
    return +decodedToken.MainModule;
  }
}
