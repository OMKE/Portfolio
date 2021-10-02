import {
  deleteWork,
  updateWork,
  updateWorkSuccess,
} from 'src/app/core/store/works/works.actions';
import {
  loadWorksSuccess,
  loadWorksFailure,
  loadWorkSuccess,
  loadWork,
  addWork,
  addWorkSuccess,
  addWorkFailure,
} from './works.actions';
import { Work } from './work.model';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

const adapter: EntityAdapter<Work> = createEntityAdapter<Work>();

export interface WorksState extends EntityState<Work> {
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
  loading: true,
  loaded: false,
  failed: false,
  add: false,
  addSuccess: false,
  addFailure: false,
  update: false,
  updateSuccess: false,
  updateFailure: false,
});

export const worksReducer = createReducer(
  initialState,
  on(loadWorksSuccess, (state, { data }) => {
    return adapter.setAll(data, { ...state, loading: false, loaded: true });
  }),
  on(loadWorksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    failed: true,
  })),
  on(loadWorkSuccess, (state, { data }) => {
    return adapter.addOne(data, { ...state });
  }),
  on(addWork, (state) => {
    return {
      ...state,
      add: true,
      addSuccess: false,
      addFailure: false,
    };
  }),
  on(addWorkSuccess, (state, { data }) => {
    return adapter.addOne(data, {
      ...state,
      add: false,
      addSuccess: true,
      addFailure: false,
    });
  }),
  on(addWorkFailure, (state, { error }) => {
    return {
      ...state,
      add: false,
      addSuccess: false,
      addFailure: true,
    };
  }),
  on(updateWork, (state) => {
    return {
      ...state,
      update: true,
    };
  }),
  on(updateWorkSuccess, (state, { data }) => {
    return adapter.updateOne(
      { id: data.id, changes: data },
      {
        ...state,
        update: false,
        updateSuccess: true,
      }
    );
  }),
  on(deleteWork, (state, { workId }) => {
    return adapter.removeOne(workId, state);
  })
);

export const { selectAll } = adapter.getSelectors();
