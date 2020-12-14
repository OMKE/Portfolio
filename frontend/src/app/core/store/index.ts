import { AboutMe } from './about-me/about-me.model';
import { routerReducer } from '@ngrx/router-store';

import { storeFreeze } from 'ngrx-store-freeze';

import * as fromAboutMe from './about-me/about-me.reducer';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';




export interface AppState {
  aboutMe: fromAboutMe.AboutMeState
  experiences: fromExperience.ExperienceState,
  aboutMe: fromAboutMe.AboutMeState,
  router: any
}

export const reducers: ActionReducerMap<AppState> = { 
  experiences: fromExperience.experienceReducer,
  aboutMe: fromAboutMe.aboutMeReducer,
  router: routerReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
