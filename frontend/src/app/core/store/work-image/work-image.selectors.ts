import { WorkImageState } from './work-image.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromWorkImageReducer from './work-image.reducer';

export const selectWorkImageState = createFeatureSelector<WorkImageState>('workImages');


export const selectWorkImageLoading = createSelector(
    selectWorkImageState,
    state => state.loading
);

export const selectAllWorkImages = createSelector(
    selectWorkImageState,
    fromWorkImageReducer.selectAll
);

export const selectWorkImagesByWorkId = (workId: number) => createSelector(
    selectAllWorkImages,
    allWorkImages => allWorkImages.filter(workImage => workImage.projectId == workId)
);

export const selectWorkImagesByWorkIdLoaded = (workId: number) => createSelector(
    selectWorkImagesByWorkId(workId),
    workImages => workImages.length !== 0 ? true : false
);
