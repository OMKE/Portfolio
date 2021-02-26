import { ExperienceState } from './experience.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromExperience from './experience.reducer';

export const selectExperienceState = createFeatureSelector<ExperienceState>(
  'experiences'
);

export const selectExperienceById = (experienceId: number) =>
  createSelector(
    selectExperienceState,
    (experienceState) => experienceState.entities[experienceId]
  );

export const selectAllExperiences = createSelector(
  selectExperienceState,
  fromExperience.selectAll
);

export const selectExperienceLoading = createSelector(
  selectExperienceState,
  (state) => state.loading
);

export const selectExperienceLoaded = createSelector(
  selectExperienceState,
  (state) => state.loaded
);
export const selectExperienceFailed = createSelector(
  selectExperienceState,
  (state) => state.failed
);

export const selectAddExperience = createSelector(
  selectExperienceState,
  (state) => state.add
);

export const selectAddExperienceSuccess = createSelector(
  selectExperienceState,
  (state) => state.addSuccess
);

export const selectAddExperienceFailure = createSelector(
  selectExperienceState,
  (state) => state.addFailure
);
