import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authFeatureKey
);

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  state => state.loggedIn
);
export const selectUser = createSelector(
  selectAuthState,
  state => state.user
);
export const selectRequestingAuth = createSelector(
  selectAuthState,
  state => state.requestingAuth
);
export const selectRequestingAuthFailure = createSelector(
  selectAuthState,
  state => state.requestingAuthFailure
);
