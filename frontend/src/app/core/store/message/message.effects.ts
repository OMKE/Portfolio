import { MessageService } from './../../services/message.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { sendMessage, sendMessageSuccess, sendMessageFailure } from './message.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { pipe, of } from 'rxjs';


@Injectable()
export class MessageEffects {


  $sendMessage = createEffect((): any => this.actions$.pipe(
    ofType(sendMessage.type),
    mergeMap(action => {
      return this.messageService.sendMessage(action.data)
    }),
    pipe(
      map(response => sendMessageSuccess({data: response})),
      catchError(err => of(sendMessageFailure({error: err})))
    )
  ));

  constructor(private actions$: Actions, private messageService: MessageService) {}

}
