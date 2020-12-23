import { loadWorksSuccess, loadWorksFailure, loadWorkSuccess, loadWork } from './works.actions';
import { Work } from './work.model';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

const adapter: EntityAdapter<Work> = createEntityAdapter<Work>();


export interface WorksState extends EntityState<Work> {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
}

export const initialState = adapter.getInitialState({
  loading: true,
  loaded: false,
  failed: false
});


export const worksReducer = createReducer(
  initialState,
  on(loadWorksSuccess, (state, { data }) => {
    return adapter.setAll(data, {...state, loading: false, loaded: true});
  }),
  on(loadWorksFailure, (state, {error}) => ({...state, loading: false, failed: true})),
  on(loadWorkSuccess, (state, { data }) => {
    return adapter.addOne(data, { ...state});
  })
);


export const {
  selectAll
} = adapter.getSelectors();
