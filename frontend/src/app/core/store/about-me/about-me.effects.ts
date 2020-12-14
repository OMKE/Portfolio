import { selectAboutMeLoaded } from './about-me.selectors';
import { Store, select } from '@ngrx/store';
import { AboutMeService } from './../../services/about-me.service';
import { AboutMeActionTypes, LoadAboutMeSuccess, LoadAboutMeFailure } from './about-me.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { of, pipe } from 'rxjs';
import { AppState } from '..';


@Injectable()
export class AboutMeEffects {


  loadAboutMe$ = createEffect(() => this.actions$.pipe(
    ofType(AboutMeActionTypes.LoadAboutMe),
    withLatestFrom(this.store.pipe(select(selectAboutMeLoaded))),
    filter(([action, selectAboutMeLoaded]) => {
      return !selectAboutMeLoaded;
    }),
    mergeMap(action => this.aboutMeService.get()),
    pipe(
      map(aboutMe => new LoadAboutMeSuccess({data: aboutMe})),
      catchError((err) => of(new LoadAboutMeFailure({error: err}))))
    )
  );

  // init$ = createEffect(() => defer(() => {
  //   return of(new LoadAboutMe())
  // }));




  constructor(private actions$: Actions, private aboutMeService: AboutMeService, private store: Store<AppState>) {}

}
