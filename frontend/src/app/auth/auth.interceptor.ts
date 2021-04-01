import { requestAuthLogoutUser } from './auth.actions';
import { Store } from '@ngrx/store';
import {
  LoginResponseSuccess,
  LoginResponseFailure,
} from './models/auth.response';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppState } from '../core/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    if (token) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', token),
      });
      return next.handle(newRequest).pipe(
        tap(
          () => {},
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status !== 401) {
                return;
              }
              this.store.dispatch(requestAuthLogoutUser());
              this.router.navigate(['auth']);
            }
          }
        )
      );
    }

    return next.handle(request);
  }
}
