
import {createReducer, on} from '@ngrx/store';
import { AboutMe } from './about-me.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  loadAboutMeFailure,
  loadAboutMeSuccess,
  updateAboutMe,
  updateAboutMeFailure,
  updateAboutMeSuccess
} from "./about-me.actions";


export const adapter: EntityAdapter<AboutMe>  = createEntityAdapter<AboutMe>();

export interface AboutMeState extends EntityState<AboutMe> {
  loading: boolean,
  loaded: boolean,
  props: AboutMe,
  failed: boolean,
  updating: boolean,
  updateSuccess: boolean,
  updateFailed: boolean,
}

export const initialAboutMeState: AboutMeState = adapter.getInitialState({
  loading: true,
  loaded: false,
  props: {id: null, heading: '', position: '', location: '', biography: '', createdAt: null, updatedAt: null},
  failed: false,
  updating: false,
  updateSuccess: false,
  updateFailed: false,
});


export const aboutMeReducer = createReducer(
  initialAboutMeState,
  on(loadAboutMeSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    loaded: true,
    props: data,
    failed: false,
  })),
  on(loadAboutMeFailure, (state, { error }) => ({
    ...state,
    loaded: false,
    loading: false,
    failed: true,
  })),
  on(updateAboutMe, (state) => ({
    ...state,
    updating: true,
    updateSuccess: false,
    updateFailed: false
  })),
  on(updateAboutMeSuccess, (state, { data }) => ({
    ...state,
    props: data,
    loaded: true,
    loading: false,
    failed: false,
    updating: false,
    updateSuccess: true,
    updateFailed: false,
  })),
  on(updateAboutMeFailure, (state, { error }) => ({
    ...state,
    props: { id: null, heading: '', position: '', location: '', biography: '', createdAt: null, updatedAt: null},
    loaded: false,
    loading: false,
    failed: true,
    updating: false,
    updateSuccess: false,
    updateFailed: true
  }))
)





