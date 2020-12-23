import { WorkImage } from './work-image.model';
import { createAction, props } from '@ngrx/store';

export const loadWorkImages = createAction(
  '[WorkImage] Load WorkImages',
  props<{workId: number}>()
);

export const loadWorkImagesSuccess = createAction(
  '[WorkImage] Load WorkImages Success',
  props<{ data: WorkImage[] }>()
);

export const loadWorkImagesFailure = createAction(
  '[WorkImage] Load WorkImages Failure',
  props<{ error: any }>()
);
