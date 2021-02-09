import { User } from './models/user.model';
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  loggedIn: boolean;
  user: User;
  requestingAuth: boolean;
  requestingAuthFailure: boolean;
}

export const initialState: AuthState = {
  loggedIn: false,
  user: null,
  requestingAuth: false,
  requestingAuthFailure: false,
};


export const reducer = createReducer(
  initialState,

  on(AuthActions.requestAuth, state => ({...state, requestingAuth: true, requestingAuthFailure: false})),
  on(AuthActions.requestAuthSuccess, (state, action) => ({ ...state, loggedIn: true, requestingAuth: false, requestingAuthFailure: false })),
  on(AuthActions.requestAuthFailure, (state, action ) => ({ ...state, loggedIn: false, requestingAuth: false, requestingAuthFailure: true })),
  on(AuthActions.requestAuthFormValueChanged, (state) => ({...state, requestingAuth: false, requestingAuthFailure: false})),
  on(AuthActions.requestUserSuccess, (state, action) => ({ ...state, user: action.data, loggedIn: true })),
  on(AuthActions.requestUserFailure, (state, action ) => ({ ...state, user: null, loggedIn: false })),
  on(AuthActions.requestUserCancel, (state) => ({ ...state, user: null, loggedIn: false })),
  on(AuthActions.requestAuthLogoutInitial, (state, action) => ({ ...state, user: null, loggedIn: false })),
  on(AuthActions.requestAuthLogoutUser, (state, action) => ({ ...state, user: null, loggedIn: false }))
);

