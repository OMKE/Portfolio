import { WorksState } from './works.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromWorks from './works.reducer';

export const selectWorksState = createFeatureSelector<WorksState>('works');


export const selectWorksLoading = createSelector(
    selectWorksState,
    state => state.loading
);

export const selectAllWorks = createSelector(
    selectWorksState,
    fromWorks.selectAll,
);

export const selectWorkById = (workId: number) => createSelector(
    selectWorksState,
    state => state.entities[workId]
);

export const selectLatestWork = createSelector(
    selectWorksState,
    state => state.entities[state.ids[0]]
);

export const selectWorksLoaded = createSelector(
    selectWorksState,
    state => state.loaded
);

export const selectWorksFailed = createSelector(
    selectWorksState,
    state => state.failed
);

export const selectWorkByIdLoaded = (workId: number) => createSelector(
    selectWorkById(workId),
    work => work ? true : false
);
