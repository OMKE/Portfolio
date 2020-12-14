import { Experience } from './experience.model';


import { createAction, props } from '@ngrx/store';


export const loadExperiences = createAction(
  '[Experience] Load Experiences'
);

export const loadExperiencesSuccess = createAction(
  '[Experience] Load Experiences Success',
  props<{ data: Experience[] }>()
);

export const loadExperiencesFailure = createAction(
  '[Experience] Load Experiences Failure',
  props<{ error: any }>()
);
