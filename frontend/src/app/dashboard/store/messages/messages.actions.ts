import { Message } from './../../models/Message';
import { createAction, props } from '@ngrx/store';

export const loadMessagess = createAction(
  '[Messages] Load Messagess'
);

export const loadMessagessSuccess = createAction(
  '[Messages] Load Messagess Success',
  props<{ data: Message[] }>()
);

export const loadMessagessFailure = createAction(
  '[Messages] Load Messagess Failure',
  props<{ error: any }>()
);

export const showMessage = createAction(
  '[Message] Show Message',
  props<{id: number }>()
);

export const deleteMessage = createAction(
  '[Messages] Delete Message',
  props<{id: number}>()
);
export const deleteMessageFailure = createAction(
  '[Messages] Delete Message Failure',
  props<{ error: string}>()
);
