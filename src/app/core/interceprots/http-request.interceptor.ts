import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from "rxjs";
import {inject} from "@angular/core";
import {NotificationService} from "../services/notification.service";

export class httpRequestInterceptor implements HttpInterceptor {
  private notification = inject(NotificationService);
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string | null = localStorage.getItem('token');
    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    if (req.method === 'POST' || req.method === 'PUT') {
      this.shiftDates(req.body);
    }
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error && error.status === 403) {
            this.notification.showError('شما مجوز انجام این عملیات را ندارید', 'عملیات نامعتبر');
          }
          return throwError(error); // any further errors are returned to frontend
        })
      );
  }
  shiftDates(body: any) {
    if (body === null || body === undefined) {
      return body;
    }

    if (typeof body !== 'object') {
      return body;
    }

    for (const key of Object.keys(body)) {
      const value = body[key];
      if (value instanceof Date) {
        body[key] = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate(), value.getHours(), value.getMinutes()
          , value.getSeconds()));
      } else if (typeof value === 'object') {
        this.shiftDates(value);
      }
    }
  }
}
