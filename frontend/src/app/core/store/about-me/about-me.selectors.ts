import { AboutMeState } from './about-me.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAboutMeState = createFeatureSelector<AboutMeState>("aboutMe");


export const selectAboutMeLoading = createSelector(
    selectAboutMeState,
    aboutMeState => aboutMeState.loading
);

export const selectAboutMeLoaded = createSelector(
    selectAboutMeState,
    aboutMeState => aboutMeState.loaded
);

export const selectAboutMeProps = createSelector(
    selectAboutMeState,
    aboutMeState => aboutMeState.props
);

export const selectAboutMeHeading = createSelector(
    selectAboutMeProps,
    props => props.heading
);

export const selectAboutMePosition = createSelector(
    selectAboutMeProps,
    props => props.position
);

export const selectAboutMeLocation = createSelector(
    selectAboutMeProps,
    props => props.location
);

export const selectAboutMeBiography = createSelector(
    selectAboutMeProps,
    props => props.biography
);

export const selectAboutMeFailed = createSelector(
    selectAboutMeState,
    aboutMeState => aboutMeState.failed
);