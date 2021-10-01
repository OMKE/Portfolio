import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { EntityAdapter } from '@ngrx/entity/src/models';
import { createReducer, on } from '@ngrx/store';
import { WorkImage } from './work-image.model';

import * as WorkImageActions from './work-image.actions';
import { state } from '@angular/animations';

const adapter: EntityAdapter<WorkImage> = createEntityAdapter<WorkImage>();

export interface WorkImageState extends EntityState<WorkImage> {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  add: boolean;
  addSuccess: boolean;
  addFailure: boolean;
  update: boolean;
  updateSuccess: boolean;
  updateFailure: boolean;
}

export const initialState = adapter.getInitialState({
  loading: false,
  loaded: false,
  failed: false,
  add: false,
  addSuccess: false,
  addFailure: false,
  update: false,
  updateSuccess: false,
  updateFailure: false,
});

export const workImageReducer = createReducer(
  initialState,
  on(WorkImageActions.loadWorkImagesSuccess, (state, { data }) => {
    return adapter.addMany(data, { ...state, loaded: false, loading: false });
  }),
  on(WorkImageActions.loadWorkImagesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    failed: true,
  })),
  on(WorkImageActions.addWorkImage, (state) => {
    return {
      ...state,
      add: true,
    };
  }),
  on(WorkImageActions.addWorkImageSuccess, (state, { data }) => {
    return adapter.addOne(data, {
      ...state,
      add: false,
      addSuccess: true,
    });
  }),
  on(WorkImageActions.addWorkImageFailure, (state, { error }) => {
    return {
      ...state,
      add: false,
      addFailure: true,
    };
  }),
  on(WorkImageActions.updateWorkImage, (state, { data }) => ({
    ...state,
    update: true,
    updateSuccess: false,
    updateFailure: false,
  })),
  on(WorkImageActions.updateWorkImageSuccess, (state, workImage) => {
    return adapter.updateOne(
      { id: workImage.id, changes: workImage },
      {
        ...state,
        update: false,
        updateSuccess: true,
        updateFailure: false,
      }
    );
  }),
  on(WorkImageActions.deleteWorkImage, (state, { workImageId }) => {
    return adapter.removeOne(workImageId, state);
  })
);

export const { selectAll } = adapter.getSelectors();
