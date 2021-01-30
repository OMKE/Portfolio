import { Router } from '@angular/router';
import { LoginResponseSuccess } from './models/auth.response';
import { Store, select, Action } from '@ngrx/store';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, switchMap } from 'rxjs/operators';
import { of, pipe } from 'rxjs';

import * as AuthActions from './auth.actions';
import { AppState } from '../core/store';



@Injectable()
export class AuthEffects implements OnInitEffects {


  loadAuth$ = createEffect((): any => this.actions$.pipe(
      ofType(AuthActions.requestAuth),
      switchMap(action => {
        return this.authService.login(action.data).pipe(
          map((response: LoginResponseSuccess) => {
          // Set token to Local Storage
          this.authService.setToken(response);
          // Dispatch new action for getting user data
          this.store.dispatch(AuthActions.requestUser());
          // Dispatch new action for redirect to dashboard
          this.store.dispatch(AuthActions.requestAuthSuccessRedirect({ route: '/dashboard'}));
          // Return Auth Success Action
          return AuthActions.requestAuthSuccess({ data: response});
        }),
        catchError(error => of(AuthActions.requestAuthFailure({ error })))
        );
      })
    )
  );

  // Effect which reacts when authentication is successfull, redirects to given route
  loginSuccess$ = createEffect((): any => this.actions$.pipe(
    ofType(AuthActions.requestAuthSuccessRedirect),
    tap((action) => this.router.navigate([action.route]))
  ), { dispatch: false });

  // Loads user data
  loadUser$ = createEffect((): any => this.actions$.pipe(
    ofType(AuthActions.requestUser),
    switchMap(action => this.authService.getUser().pipe(
      map(user => {
        this.authService.setUserToLS(user);
        return AuthActions.requestUserSuccess({ data: user });
      }),
      catchError(error => of(AuthActions.requestUserFailure({ error })))
    ))
  ));

  logoutUser$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.requestAuthLogoutUser),
    tap(action => {
      this.authService.logout().subscribe();
      this.authService.clearLS();
      this.router.navigate(['/auth']);
    })
  ), { dispatch: false });

  // Initial effect, we check if user is logged in
  ngrxOnInitEffects(): Action {
    const user = this.authService.getUserFromLS();
    if (user) {
      return AuthActions.requestUserSuccess({ data: user});
    } else {
      return AuthActions.requestAuthLogout();
    }
  }


  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
    ) {}


}
