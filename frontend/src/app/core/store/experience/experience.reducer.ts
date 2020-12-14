


import { loadExperiences, loadExperiencesSuccess, loadExperiencesFailure } from './experience.actions';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on, State } from '@ngrx/store';
import { Experience } from './experience.model';


export const adapter: EntityAdapter<Experience> = createEntityAdapter<Experience>();

export interface ExperienceState extends EntityState<Experience> {
  loading: boolean,
  loaded: boolean,
  failed: boolean
}

export const initialState = adapter.getInitialState({
  loading: true,
  loaded: false,
  failed: false
});


export const experienceReducer = createReducer(
  initialState,
  on(loadExperiencesSuccess, (state, { data }) => {
    return adapter.addMany(data, {...state, loading: false, loaded: true, failed: false});
  }),
  on(loadExperiencesFailure, (state, { error}) => ({...state, loading: false, loaded: false, failed: true}))

)

export const {
  selectAll,
  
} = adapter.getSelectors()