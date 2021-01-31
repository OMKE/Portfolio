import { LoginResponseSuccess, LoginResponseFailure } from './models/auth.response';
import { LoginRequest } from './models/auth.request';
import { createAction, props } from '@ngrx/store';
import { User } from './models/user.model';

export const requestAuth = createAction(
  '[Auth] Request Auth',
  props<{data: LoginRequest }>()
);

export const requestAuthSuccess = createAction(
  '[Auth] Request Auth Success',
  props<{ data: LoginResponseSuccess }>()
);

export const requestAuthFailure = createAction(
  '[Auth] Request Auth Failure',
  props<{ error: LoginResponseFailure }>()
);

export const requestAuthSuccessRedirect = createAction(
  '[Auth] Request Auth Success Redirect',
  props<{ route: string }>()
);

export const requestUser = createAction(
  '[Auth] Request User'
);

export const requestUserSuccess = createAction(
  '[Auth] Request User Success',
  props<{data: User}>()
);
export const requestUserFailure = createAction(
  '[Auth] Request User Failure',
  props<{error: string}>()
);
// If user logs in and immediately clicks on logout, we should dispatch requestUserCancel action
export const requestUserCancel = createAction(
  '[Auth] Request User Cancel'
);

// Action for initial user logout if token is not present
export const requestAuthLogoutInitial = createAction(
  '[Auth] Request Auth Logout'
);
// User initiated logout action
export const requestAuthLogoutUser = createAction(
  '[Auth] Request Auth Logout User'
);
