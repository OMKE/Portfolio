import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMessages from './messages.reducer';

export const selectMessagesState = createFeatureSelector<fromMessages.MessagesState>(
  fromMessages.messagesFeatureKey
);

export const selectMessagesLoading = createSelector(
  selectMessagesState,
  (state) => state.loading
);

export const selectMessagesLoaded = createSelector(
  selectMessagesState,
  (state) => state.loaded
);

export const selectMessagesFailed = createSelector(
  selectMessagesState,
  (state) => state.failed
);

export const selectMessageEmpty = createSelector(
  selectMessagesState,
  (state) => state.empty
);

export const selectAllMessages = createSelector(
  selectMessagesState,
  fromMessages.selectAll
);

export const selectMessageById = (messageId: number) =>
  createSelector(selectAllMessages, (entities) => entities[messageId]);

export const selectSelectedMessages = createSelector(
  selectMessagesState,
  (state) => state.entities[state.selectedMessage]
);

export const selectSelectedMessageLoaded = createSelector(
  selectMessagesState,
  (state) => state.entities[state.selectedMessage] != null
);
