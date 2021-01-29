import { take, tap } from 'rxjs/operators';
import { selectIsLoggedIn } from './auth.selectors';
import { AppState } from './../core/store/index';
import { Store, select } from '@ngrx/store';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.authService.getToken()) {
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
  }

}
