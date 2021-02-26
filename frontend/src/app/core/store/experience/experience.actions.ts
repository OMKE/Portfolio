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
