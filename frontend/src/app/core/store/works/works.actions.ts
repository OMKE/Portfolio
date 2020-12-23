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

// Single resource
export const loadWork = createAction(
  '[Work] Load Work',
  props<{workId: number}>()
);
export const loadWorkSuccess = createAction(
  '[Work] Load Work Success',
  props<{data: Work}>()
);
export const loadWorkFailure = createAction(
  '[Work] Load Work Failure',
  props<{error: any}>()
);

