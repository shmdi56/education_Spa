import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from "../../../environments/environment";

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const token = '';
  if (req.url.includes(environment.BASE_URL)) {
    const modifiedReq = req.clone({
      params: req.params.append("token", token)
    });

    return next(modifiedReq);
  }
  return next(req);
};
