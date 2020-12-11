import { Action } from '@ngrx/store';
import { AboutMe } from './about-me.model';

export enum AboutMeActionTypes {
  LoadAboutMe = '[AboutMe] Load AboutMe',
  LoadAboutMeSuccess = '[AboutMe] Load AboutMe Success',
  LoadAboutMeFailure = '[AboutMe] Load AboutMe Failure',
}

export class LoadAboutMe implements Action {
  readonly type = AboutMeActionTypes.LoadAboutMe;
}

export class LoadAboutMeSuccess implements Action {
  readonly type = AboutMeActionTypes.LoadAboutMeSuccess;
  constructor(public payload: { data: AboutMe}) { }
}

export class LoadAboutMeFailure implements Action {
  readonly type = AboutMeActionTypes.LoadAboutMeFailure;
  constructor(public payload: { error: any }) { }
}

export type AboutMeActions = LoadAboutMe | LoadAboutMeSuccess | LoadAboutMeFailure;

