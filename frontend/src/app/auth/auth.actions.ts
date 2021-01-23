import { LoginResponseSuccess, LoginResponseFailure } from './models/auth.response';
import { LoginRequest } from './models/auth.request';
import { createAction, props } from '@ngrx/store';

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
