import { selectAboutMeLoaded } from './about-me.selectors';
import { Store, select } from '@ngrx/store';
import { AboutMeService } from '../../services/about-me.service';
import {
  loadAboutMeSuccess,
  loadAboutMeFailure,
  updateAboutMe,
  loadAboutMe,
  updateAboutMeSuccess, updateAboutMeFailure
} from './about-me.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { of, pipe } from 'rxjs';
import { AppState } from '..';


@Injectable()
export class AboutMeEffects {

  loadAboutMe$ = createEffect(() => this.actions$.pipe(
    ofType(loadAboutMe),
    withLatestFrom(this.store.pipe(select(selectAboutMeLoaded))),
    filter(([action, selectAboutMeLoaded]) => {
      return !selectAboutMeLoaded;
    }),
    mergeMap(action => this.aboutMeService.get()),
    pipe(
      map(aboutMe => loadAboutMeSuccess({ data: aboutMe })),
      catchError((error) => of(loadAboutMeFailure({ error }))))
    )
  );

  updateAboutMe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateAboutMe),
      mergeMap(action => this.aboutMeService.update(action.data)),
      pipe(
        map(res => updateAboutMeSuccess({ data: res.data })),
        catchError(error => of(updateAboutMeFailure({ error })))
      )
    )
  });



  constructor(private actions$: Actions, private aboutMeService: AboutMeService, private store: Store<AppState>) {}

}
