import { SendMessageState } from './message.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export const selectSendMessageState = createFeatureSelector<SendMessageState>('sendMessage');


export const selectSendMessageSending = createSelector(
    selectSendMessageState,
    state => state.sending
);

export const selectSendMessageSuccess = createSelector(
    selectSendMessageState,
    state => state.success
);

export const selectSendMessageFailed = createSelector(
    selectSendMessageState,
    state => state.failed
);

export const selectSendMessageProps = createSelector(
    selectSendMessageState,
    state => state.props
);
export const selectSendMessagePropsMessage = createSelector(
    selectSendMessageProps,
    props => props?.message
);