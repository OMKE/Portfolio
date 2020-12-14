import { aboutMeLoading, aboutMeLoaded } from './about-me.selectors';
import { Store, select } from '@ngrx/store';
import { AboutMeService } from './../../services/about-me.service';
import { AboutMeActions, LoadAboutMe, AboutMeActionTypes, LoadAboutMeSuccess, LoadAboutMeFailure } from './about-me.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { defer, EMPTY, of, pipe } from 'rxjs';
import { AppState } from '..';


@Injectable()
export class AboutMeEffects {

  
  loadAboutMe$ = createEffect(() => this.actions$.pipe(
    ofType(AboutMeActionTypes.LoadAboutMe),
    withLatestFrom(this.store.pipe(select(aboutMeLoaded))),
    filter(([action, aboutMeLoaded]) => {
      return !aboutMeLoaded
    }),
    mergeMap(action => this.aboutMeService.get()),
    // map(aboutMe => new LoadAboutMeSuccess({data: aboutMe}))
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
