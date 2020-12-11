
import { AboutMeActions, AboutMeActionTypes } from './about-me.actions';
import { Action, createReducer } from '@ngrx/store';
import { AboutMe } from './about-me.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';


export const adapter: EntityAdapter<AboutMe>  = createEntityAdapter<AboutMe>();

export interface AboutMeState extends EntityState<AboutMe> {
  loading: boolean,
  loaded: boolean,
  props: AboutMe,
  failed: boolean
}

export const initialAboutMeState: AboutMeState = adapter.getInitialState({
  loading: true,
  loaded: false,
  props: {id: null, heading: '', position: '', location: '', biography: '', createdAt: null, updatedAt: null},
  failed: false,
});

export const aboutMeReducer = (state: AboutMeState = initialAboutMeState, action: AboutMeActions): AboutMeState => {
  switch (action.type) {
    case AboutMeActionTypes.LoadAboutMeSuccess:
      return {
        ...state,
        loading: false,
        loaded: true,
        props: action.payload.data,
        failed: false
      }
      case AboutMeActionTypes.LoadAboutMeFailure:
        return {
          ...state,
          loading: false,
          loaded: false,
          props: undefined,
          failed: true
        }
  
    default:
      return state;
  }
}




