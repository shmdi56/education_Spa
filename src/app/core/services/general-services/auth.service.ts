import {inject, Injectable, signal} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
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
  private notification  = inject(NotificationService);
  private httpClient = inject(HttpClient);
  public authenticated = signal(false);
  public authLoading = signal(false);
  private router = inject(Router);
  jwtHelper = new JwtHelperService();
  private authControllerUrl = environment.BASE_URL + '/Auth';

  constructor() {
    this.authLoading.set(false);
  }


  login(loginInfo: UserForLogin) {
    this.authLoading.set(true);
    return this.httpClient.post<ITokenModel>(this.authControllerUrl + '/login', loginInfo).subscribe({
      next: (token) => {
        this.authenticate(token);
        const familyName = this.getCurrentUserNameFamily();
        this.notification.showSuccess(familyName + '! خوش آمدید', 'ورود موفق')
        this.authLoading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        switch (err.status) {
          case 401:
            this.notification.showError('نام کاربری و یا رمز عبور اشتباه است. لطفا مجددا تلاش کنید', 'کاربر نامعتبر'); break;
          case 0:
            this.notification.showError('ارتباط شبکه شما قطع می باشد', 'مشکل شبکه', 3000); break;
          default:
            this.notification.showError('خطای ناشناخته ای رخ داده است', 'کد حطا ' + err.statusText, 3000)
        }
        this.authLoading.set(false);
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
    const decodedToken = this.jwtHelper.decodeToken(result.token);
    if (+this.getCurrentUserMainModule() === ModulesEnum.ADMIN) {
      localStorage.setItem('currentUserId', decodedToken.nameid);
      this.authenticated.set(true);
      this.router.navigate(['/administration']).then(() => {
        this.authLoading.set(false);
      });

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
