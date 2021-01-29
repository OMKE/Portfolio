import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.authService.getToken();
    if (token !== null) {
      const newRequest = request.clone({ headers: request.headers.set('Authorization', token) });
      return next.handle(newRequest).pipe(
        tap(response => {
          if (response instanceof HttpResponse) {
            if (response.status === 401) {
              // @TODO Should be tested
              this.authService.refreshToken().pipe(
                tap(res => this.authService.setToken(res))
              ).subscribe();
            }
          }
        })
      );
    }

    return next.handle(request);
  }
}
