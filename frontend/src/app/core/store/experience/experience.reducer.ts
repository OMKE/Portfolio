import { deleteExperience } from 'src/app/core/store/experience/experience.actions';
import {
  loadExperiences,
  loadExperiencesSuccess,
  loadExperiencesFailure,
  addExperience,
  addExperienceSuccess,
  addExperienceFailure,
  updateExperience,
  updateExperienceSuccess,
  updateExperienceFailure,
} from './experience.actions';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on, State } from '@ngrx/store';
import { Experience } from './experience.model';
import { state } from '@angular/animations';

export const adapter: EntityAdapter<Experience> = createEntityAdapter<Experience>();

export const experiencesFeatureKey = 'experiences';

export interface ExperienceState extends EntityState<Experience> {
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

export const experienceReducer = createReducer(
  initialState,
  on(loadExperiencesSuccess, (state, { data }) => {
    return adapter.addMany(data, {
      ...state,
      loading: false,
      loaded: true,
      failed: false,
    });
  }),
  on(loadExperiencesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    failed: true,
  })),
  on(addExperience, (state) => {
    return {
      ...state,
      add: true,
      addSuccess: false,
      addFailure: false,
    };
  }),
  on(addExperienceSuccess, (state, { data }) => {
    return adapter.addOne(data, {
      ...state,
      add: false,
      addSuccess: true,
      addFailure: false,
    });
  }),
  on(addExperienceFailure, (state, { error }) => ({
    ...state,
    add: false,
    addFailure: true,
    addSuccess: false,
  })),
  on(updateExperience, (state, { data }) => ({
    ...state,
    update: true,
    updateSuccess: false,
    updateFailure: false,
  })),
  on(updateExperienceSuccess, (state, { data }) => {
    return adapter.updateOne(
      { id: data.id, changes: data },
      {
        ...state,
        update: false,
        updateSuccess: true,
        updateFailure: false,
      }
    );
  }),
  on(updateExperienceFailure, (state, { error }) => ({
    ...state,
    update: false,
    updateSuccess: false,
    updateFailure: true,
  })),
  on(deleteExperience, (state, { id }) => adapter.removeOne(id, state))
);

export const { selectAll } = adapter.getSelectors();
