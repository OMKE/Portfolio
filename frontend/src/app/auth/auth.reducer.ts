import { User } from './models/user.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  loggedIn: boolean;
  user: User;
}

export const initialState: AuthState = {
  loggedIn: false,
  user: null
};


export const reducer = createReducer(
  initialState,

  on(AuthActions.requestAuth, state => state),
  on(AuthActions.requestAuthSuccess, (state, action) => ({...state, loggedIn: true })),
  on(AuthActions.requestAuthFailure, (state, action) => ({...state, loggedIn: false })),
  on(AuthActions.requestUserSuccess, (state, action) => ({...state, user: action.data, loggedIn: true })),
  on(AuthActions.requestUserFailure, (state, action) => ({...state, user: null, loggedIn: false})),
  on(AuthActions.requestAuthLogout, (state, action) => ({...state, user: null, loggedIn: false})),
);

