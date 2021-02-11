import { selectMessagesLoaded } from './messages.selectors';
import { Store, select } from '@ngrx/store';
import { MessagesService } from './../../services/messages.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, withLatestFrom, filter, mergeMap } from 'rxjs/operators';
import { EMPTY, of, pipe } from 'rxjs';

import * as MessagesActions from './messages.actions';
import { AppState } from 'src/app/core/store';



@Injectable()
export class MessagesEffects {

  loadMessagess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MessagesActions.loadMessagess),
      withLatestFrom(this.store.pipe(select(selectMessagesLoaded))),
      filter(([_, selectMessagesLoaded]) => {
        return !selectMessagesLoaded;
      }),
      mergeMap(action => this.messagesService.getAll()),
      pipe(
        map(data => MessagesActions.loadMessagessSuccess({ data})),
        catchError(error => of(MessagesActions.loadMessagessFailure({ error })))
      )
    );
  });

  deleteMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MessagesActions.deleteMessage),
      mergeMap(action => this.messagesService.deleteMessage(action.id)),
      pipe(
        map(res => MessagesActions.loadMessagess()),
        catchError(error => of(MessagesActions.deleteMessageFailure({ error })))
      )
    );
  });



  constructor(private actions$: Actions, private messagesService: MessagesService, private store: Store<AppState>) {}

}
