import { AboutMeState } from './about-me.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAboutMeState = createFeatureSelector<AboutMeState>("aboutMe");


export const aboutMeLoading = createSelector(
    selectAboutMeState,
    aboutMeState => aboutMeState.loading
);

export const aboutMeLoaded = createSelector(
    selectAboutMeState,
    aboutMeState => aboutMeState.loaded
);

export const aboutMeProps = createSelector(
    selectAboutMeState,
    aboutMeState => aboutMeState.props
);

export const getAboutMeHeading = createSelector(
    aboutMeProps,
    props => props.heading
);

export const getAboutMePosition = createSelector(
    aboutMeProps,
    props => props.position
);

export const getAboutMeLocation = createSelector(
    aboutMeProps,
    props => props.location
);

export const getAboutMeBiography = createSelector(
    aboutMeProps,
    props => props.biography
);

export const AboutMeFailed = createSelector(
    selectAboutMeState,
    aboutMeState => aboutMeState.failed
);