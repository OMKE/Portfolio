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
  selectedMessage: number;
}

export const initialState: MessagesState = adapter.getInitialState({
  loading: true,
  loaded: false,
  failed: false,
  selectedMessage: null,
});


export const reducer = createReducer(
  initialState,

  on(MessagesActions.loadMessagess, state => state),
  on(MessagesActions.loadMessagessSuccess, (state, { data }) =>  {
    return adapter.addMany(data, { ...state, loading: false, loaded: true, failed: false, selectedMessage: data[0].id });
  }),
  on(MessagesActions.loadMessagessFailure, (state, action) => ({...state, loading: false, loaded: false, failed: true })),
  on(MessagesActions.showMessage, (state, action) => ({...state, selectedMessage: action.id })),
);

export const {
  selectAll,
} = adapter.getSelectors();


