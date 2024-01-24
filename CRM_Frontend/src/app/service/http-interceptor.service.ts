import { Injectable } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";
import {User} from "../model/user";
@Injectable({
  providedIn: "root",
})
export class HttpInterceptorService {
  constructor(private auth: AuthenticationService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>>
  {
    console.log("intercepted");
    // @ts-ignore
    let user:User = JSON.parse( window.sessionStorage.getItem('SNVA_CRM_USER') );
    if ((this.auth.authenticated && req.url.indexOf("basicauth") === -1 )|| user != null)
    {
      console.log("authenticated");
      const authReq = req.clone(
        {
        headers: new HttpHeaders(
          {
          Authorization: `${this.auth.getAuthenticatedUser()}`,
        }),
      });
      return next.handle(authReq);
    }
    else
    {
      return next.handle(req);
    }
  }
}
