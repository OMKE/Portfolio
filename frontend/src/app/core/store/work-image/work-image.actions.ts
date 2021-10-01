import { AddWorkImageResponse } from './../../services/work-image.service';
import { WorkImage } from './work-image.model';
import { createAction, props } from '@ngrx/store';
import {
  AddWorkImageRequest,
  UpdateWorkImageRequest,
} from '../../services/work-image.service';

export const loadWorkImages = createAction(
  '[WorkImage] Load WorkImages',
  props<{ workId: number }>()
);

export const loadWorkImagesSuccess = createAction(
  '[WorkImage] Load WorkImages Success',
  props<{ data: WorkImage[] }>()
);

export const loadWorkImagesFailure = createAction(
  '[WorkImage] Load WorkImages Failure',
  props<{ error: any }>()
);

export const addWorkImage = createAction(
  '[WorkImage] Add WorkImage',
  props<{ workId: number; data: AddWorkImageRequest }>()
);

export const addWorkImageSuccess = createAction(
  '[WorkImage] Add WorkImage Success',
  props<AddWorkImageResponse>()
);

export const addWorkImageFailure = createAction(
  '[WorkImage] Add WorkImage Failure',
  props<{ error: string }>()
);

export const updateWorkImage = createAction(
  '[WorkImage] Update WorkImage',
  props<{ workId: number; workImageId: number; data: UpdateWorkImageRequest }>()
);

export const updateWorkImageSuccess = createAction(
  '[WorkImage] Update WorkImage Success',
  props<WorkImage>()
);
export const updateWorkImageFailure = createAction(
  '[WorkImage] Update WorkImage Failure',
  props<{ error: string }>()
);

export const deleteWorkImage = createAction(
  '[WorkImage] Delete WorkImage',
  props<{ workId: number; workImageId: number }>()
);

export const deleteWorkImageSuccess = createAction(
  '[WorkImage] Delete WorkImage Success',
  props<{ message: string }>()
);
export const deleteWorkImageFailure = createAction(
  '[WorkImage] Delete WorkImage Failure',
  props<{ error: string }>()
);
