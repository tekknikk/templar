import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {


    // let authToken = this.auth.clientToken
    const authReq = req.clone({ setHeaders: { Authorization: this.auth.clientToken } })
    return next.handle(authReq)




    // if(this.auth.clientToken) {
    //   const authToken = this.auth.clientToken;
    //   const authReq = req.clone({ setHeaders: { Authorization: authToken } });
    //   return next.handle(authReq)
    // }

  }
}
