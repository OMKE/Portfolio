import { Work } from './work.model';
import { createAction, props } from '@ngrx/store';

export const loadWorks = createAction(
  '[Works] Load Works'
);

export const loadWorksSuccess = createAction(
  '[Works] Load Works Success',
  props<{ data: Work[] }>()
);

export const loadWorksFailure = createAction(
  '[Works] Load Works Failure',
  props<{ error: any }>()
);
