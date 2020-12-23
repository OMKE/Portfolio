import * as fromExperience from './experience/experience.reducer';
import { AboutMe } from './about-me/about-me.model';
import { routerReducer } from '@ngrx/router-store';
import * as fromMessage from './message/message.reducer';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromWorks from './works/works.reducer';
import * as fromAboutMe from './about-me/about-me.reducer';
import * as fromWorkImage from './work-image/work-image.reducer';

import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';




export interface AppState {
  experiences: fromExperience.ExperienceState;
  aboutMe: fromAboutMe.AboutMeState;
  sendMessage: fromMessage.SendMessageState;
  works: fromWorks.WorksState;
  workImages: fromWorkImage.WorkImageState;
  router: any;
}

export const reducers: ActionReducerMap<AppState> = {
  experiences: fromExperience.experienceReducer,
  aboutMe: fromAboutMe.aboutMeReducer,
  sendMessage: fromMessage.sendMessageReducer,
  works: fromWorks.worksReducer,
  workImages: fromWorkImage.workImageReducer,
  router: routerReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
