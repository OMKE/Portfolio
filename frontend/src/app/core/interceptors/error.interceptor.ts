import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        event => {},
        err => {
          if (err.status === 404) {
            this.router.navigate(['/404']);
          }
        }
      )
    );
  }
}
