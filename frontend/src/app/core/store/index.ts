import * as fromExperience from './experience/experience.reducer';
import { AboutMe } from './about-me/about-me.model';
import { routerReducer } from '@ngrx/router-store';
import * as fromMessage from './message/message.reducer';
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
  experiences: fromExperience.ExperienceState,
  aboutMe: fromAboutMe.AboutMeState,
  sendMessage: fromMessage.SendMessageState
  router: any
}

export const reducers: ActionReducerMap<AppState> = { 
  experiences: fromExperience.experienceReducer,
  aboutMe: fromAboutMe.aboutMeReducer,
  sendMessage: fromMessage.sendMessageReducer,
  router: routerReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
