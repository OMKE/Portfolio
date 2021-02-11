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
  on(MessagesActions.deleteMessage, (state, action) => {
    /*
      After delete action is performed, we want to set first message as selected one.
      If first is deleted, we want selectedMessage to be next item in collection, else we will set the first one as selected
    */
    const selectedMessageIndex = state.ids[0] === state.entities[action.id].id ? 1 : 0;
    return adapter.removeOne(action.id, {...state, selectedMessage: state.entities[state.ids[selectedMessageIndex]].id});
  }),
);

export const {
  selectAll,
} = adapter.getSelectors();


