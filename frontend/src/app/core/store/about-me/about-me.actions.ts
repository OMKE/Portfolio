import {createAction, props} from '@ngrx/store';
import {AboutMe} from './about-me.model';
import {AboutMeRequest} from "./about-me.request";


export const loadAboutMe = createAction(
  '[AboutMe] Load AboutMe'
);

export const loadAboutMeSuccess = createAction(
  '[AboutMe] Load AboutMe Success',
  props<{ data: AboutMe }>()
);

export const loadAboutMeFailure = createAction(
  '[AboutMe] Load AboutMe Failure',
  props<{ error: any }>()
);

export const updateAboutMe = createAction(
  '[Dashboard/AboutMe] Update About Me',
  props<{ data: AboutMeRequest }>()
);

export const updateAboutMeSuccess = createAction(
  '[Dashboard/AboutMe] Update About Me Success',
  props<{data: any}>()
);

export const updateAboutMeFailure = createAction(
  '[Dashboard/AboutMe] Update About Me Failure',
  props<{error: any}>()
);



