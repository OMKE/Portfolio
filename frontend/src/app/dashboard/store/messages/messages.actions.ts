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
