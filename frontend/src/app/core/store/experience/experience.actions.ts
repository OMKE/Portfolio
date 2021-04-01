import { ExperienceRequest } from './experience.request';
import { Experience } from './experience.model';

import { createAction, props } from '@ngrx/store';

export const loadExperiences = createAction('[Experience] Load Experiences');

export const loadExperiencesSuccess = createAction(
  '[Experience] Load Experiences Success',
  props<{ data: Experience[] }>()
);

export const loadExperiencesFailure = createAction(
  '[Experience] Load Experiences Failure',
  props<{ error: any }>()
);

export const addExperience = createAction(
  '[Dashboard/Experience] Add Experience',
  props<{ data: ExperienceRequest }>()
);
export const addExperienceSuccess = createAction(
  '[Dashboard/Experience] Add Experience Success',
  props<{ data: Experience }>()
);

export const addExperienceSuccessRedirect = createAction(
  '[Dashboard/Experience] Add Experience Success Redirect'
);

export const addExperienceFailure = createAction(
  '[Dashboard/Experience] Add Experience Failure',
  props<{ error: any }>()
);

export const updateExperience = createAction(
  '[Dashboard/Experience] Update Experience',
  props<{ id: number; data: ExperienceRequest }>()
);

export const updateExperienceSuccess = createAction(
  '[Dashboard/Experience] Update Experience Success',
  props<{ data: Experience }>()
);

export const updateExperienceFailure = createAction(
  '[Dashboard/Experience] Update Experience Failure',
  props<{ error: any }>()
);

export const deleteExperience = createAction(
  '[Dashboard/Experience] Delete Experience',
  props<{ id: number }>()
);

export const deleteExperienceSuccess = createAction(
  '[Dashboard/Experience] Delete Experience Success',
  props<{ data: any }>()
);
export const deleteExperienceFailure = createAction(
  '[Dashboard/Experience] Delete Experience Failure',
  props<{ error: any }>()
);
