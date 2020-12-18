import { ApiResponse } from '../../utilities/api.utils';
import { Message } from './message.model';


import { createAction, props } from '@ngrx/store';


export const sendMessage = createAction(
    '[Message] Send Message',
    props<{data: Message }>()
);

export const sendMessageSuccess = createAction(
    '[Message] Send Message Success',
    props<{ data: ApiResponse}>()
);
export const sendMessageFailure = createAction(
    '[Message] Send Message Failure',
    props<{error: any }>()
);
