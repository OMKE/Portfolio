import { Message } from './../../models/Message';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as MessagesActions from './messages.actions';


export const adapter: EntityAdapter<Message> = createEntityAdapter<Message>();

export const messagesFeatureKey = 'messages';

export interface MessagesState extends EntityState<Message> {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
}

export const initialState: MessagesState = adapter.getInitialState({
  loading: true,
  loaded: false,
  failed: false
});


export const reducer = createReducer(
  initialState,

  on(MessagesActions.loadMessagess, state => state),
  on(MessagesActions.loadMessagessSuccess, (state, { data }) =>  {
    return adapter.addMany(data, { ...state, loading: false, loaded: true, failed: false });
  }),
  on(MessagesActions.loadMessagessFailure, (state, action) => ({...state, loading: false, loaded: false, failed: true })),

);

export const {
  selectAll,
} = adapter.getSelectors();


