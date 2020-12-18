import { ApiResponse } from '../../utilities/api.utils';
import { sendMessage, sendMessageSuccess, sendMessageFailure } from './message.actions';
import { createReducer, on } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { Message } from './message.model';




export const adapter: EntityAdapter<Message> = createEntityAdapter<Message>();


export interface SendMessageState extends EntityState<Message> {
    sending: boolean;
    success: boolean;
    failed: boolean;
    data: Message;
    props: ApiResponse; // Backend response
}

export const initialSendMessageState = adapter.getInitialState({
    sending: false,
    success: false,
    failed: false,
    data: undefined,
    props: { message: ''},
});

export const sendMessageReducer = createReducer(
    initialSendMessageState,
    on(sendMessage, (state, { data }) => ({...state, sending: true, success: false, failed: false, data})),
    on(sendMessageSuccess, (state, {data}) => ({...state, sending: false, success: true, props: {message: data.message }, failed: false})),
    on(sendMessageFailure, (state, {error}) => ({...state, sending: false, success: false, props: error, failed: true}))
);