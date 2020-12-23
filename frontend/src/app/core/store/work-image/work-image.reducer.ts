import { loadWorkImagesSuccess, loadWorkImagesFailure } from './work-image.actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { EntityAdapter } from '@ngrx/entity/src/models';
import { createReducer, on } from '@ngrx/store';
import { WorkImage } from './work-image.model';


const adapter: EntityAdapter<WorkImage> = createEntityAdapter<WorkImage>();

export interface WorkImageState extends EntityState<WorkImage> {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
}

export const initialState = adapter.getInitialState({
  loading: false,
  loaded: false,
  failed: false
});


export const workImageReducer = createReducer(
  initialState,
  on(loadWorkImagesSuccess, (state, { data}) => {
    return adapter.addMany(data, {...state, loaded: false, loading: false});
  }),
  on(loadWorkImagesFailure, (state, { error }) => ({...state, loading: false, loaded: false, failed: true}))
);


export const {
  selectAll
} = adapter.getSelectors();
