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
  empty: boolean;
  selectedMessage: number;
}

export const initialState: MessagesState = adapter.getInitialState({
  loading: true,
  loaded: false,
  failed: false,
  empty: false,
  selectedMessage: null,
});

export const reducer = createReducer(
  initialState,

  on(MessagesActions.loadMessagess, (state) => state),
  on(MessagesActions.loadMessagessSuccess, (state, { data }) => {
    return adapter.addMany(data, {
      ...state,
      loading: false,
      loaded: true,
      failed: false,
      empty: false,
      selectedMessage: data[0].id,
    });
  }),
  on(MessagesActions.loadMessagesEmpty, (state, action) => ({
    ...state,
    loading: false,
    loaded: true,
    failed: false,
    empty: true,
    selectedMessage: null,
  })),
  on(MessagesActions.loadMessagessFailure, (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    failed: true,
  })),
  on(MessagesActions.showMessage, (state, action) => ({
    ...state,
    selectedMessage: action.id,
  })),
  on(MessagesActions.deleteMessage, (state, action) => {
    /*
      After delete action is performed, we want to set first message as selected one.
      If first is deleted, we want selectedMessage to be next item in collection, else we will set the first one as selected
    */

    let selectedMessageIndex =
      state.entities[action.id] != null &&
      state.ids[0] === state.entities[action.id].id
        ? 1
        : 0;

    // If there is just one message in the inbox, we will set the index to 0,
    let selectedMessage;
    let empty = false;
    if (state.ids.length === 1) {
      selectedMessageIndex = 0;
      empty = true;
      selectedMessage = null;
    } else {
      selectedMessage = state.entities[state.ids[selectedMessageIndex]].id;
    }

    return adapter.removeOne(action.id, {
      ...state,
      selectedMessage,
      empty,
    });
  })
);

export const { selectAll } = adapter.getSelectors();
