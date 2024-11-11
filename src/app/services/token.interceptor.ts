/* import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService : AuthService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler):
  Observable<HttpEvent<unknown>> {
    const toExclude = "/login";
    //tester s'il sagit de login, on n'ajoute pas le header Authorization
    //puisqu'on a pas encode de JWT (il est null)
    if(request.url.search(toExclude) === -1){
      let jwt = this.authService.getToken();
      let reqWithToken = request.clone( {
        setHeaders: { Authorization : "Bearer "+jwt}
      })
      return next.handle(reqWithToken);
    }
    return next.handle(request);
  }
} */



import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  // Array of URLs to exclude from adding the Authorization header
  exclude_array: string[] = ['/login', '/register', '/verifyEmail'];

  constructor(private authService: AuthService) {}

  // Method to check if the URL should be excluded
  toExclude(url: string) {
    var length = this.exclude_array.length;
      for(var i = 0; i < length; i++) {
        if( url.search(this.exclude_array[i]) != -1 )
        return true;
      }
      return false;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Only add the Authorization header if the URL is not in the exclusion list
    if (!this.toExclude(request.url))
      {
        let jwt = this.authService.getToken();
        let reqWithToken = request.clone({ setHeaders: { Authorization : "Bearer "+jwt} })
        return next.handle(reqWithToken);
      }
      // If the URL is in the exclusion list, proceed with the request without modifying it
      return next.handle(request);
      }
}
