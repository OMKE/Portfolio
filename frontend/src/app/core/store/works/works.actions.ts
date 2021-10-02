import { WorkResponse } from './work.response';
import { WorkRequest } from './work.request';
import { Work } from './work.model';
import { createAction, props } from '@ngrx/store';

export const loadWorks = createAction('[Works] Load Works');

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
  props<{ workId: number }>()
);
export const loadWorkSuccess = createAction(
  '[Work] Load Work Success',
  props<{ data: Work }>()
);
export const loadWorkFailure = createAction(
  '[Work] Load Work Failure',
  props<{ error: any }>()
);

export const addWork = createAction(
  '[Dashboard/Work] Add work',
  props<{ data: WorkRequest }>()
);

export const addWorkRedirect = createAction(
  '[Dashboard/Work] Add work redirect'
);

export const addWorkSuccess = createAction(
  '[Dashboard/Work] Add work success',
  props<{ data: Work }>()
);

export const addWorkFailure = createAction(
  '[Dashboard/Work] Add work failure',
  props<{ error: any }>()
);

export const updateWork = createAction(
  '[Dashboard/Work] Update work',
  props<{ workId: number; data: WorkRequest }>()
);

export const updateWorkSuccess = createAction(
  '[Dashboard/Work] Update work success',
  props<{ data: Work }>()
);

export const updateWorkFailure = createAction(
  '[Dashboard/Work] Update work failure',
  props<{ error: any }>()
);

export const deleteWork = createAction(
  '[Dashboard/Work] Delete work',
  props<{ workId: number }>()
);

export const deleteWorkSuccess = createAction(
  '[Dashboard/Work] Delete work success',
  props<{ message: string }>()
);

export const deleteWorkFailure = createAction(
  '[Dashboard/Work] Delete work failure',
  props<{ error: any }>()
);

export const deleteWorkSuccessRedirect = createAction(
  '[Dashboard/Work] Delete work success redirect'
);
