import { Router } from '@angular/router';
import { selectExperienceLoaded } from './experience.selectors';
import { Store, select } from '@ngrx/store';
import { ExperienceService } from './../../services/experience.service';
import {
  mergeMap,
  map,
  catchError,
  withLatestFrom,
  filter,
  tap,
} from 'rxjs/operators';
import {
  loadExperiences,
  loadExperiencesSuccess,
  loadExperiencesFailure,
} from './experience.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { pipe, of } from 'rxjs';
import { AppState } from '..';
import * as ExperienceActions from './experience.actions';

@Injectable()
export class ExperienceEffects {
  loadExperiences$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(loadExperiences),
      withLatestFrom(this.store.pipe(select(selectExperienceLoaded))),
      filter(([action, selectExperienceLoaded]) => {
        return !selectExperienceLoaded;
      }),
      mergeMap((action) => this.experienceService.getAll()),
      pipe(
        map((experiences) => loadExperiencesSuccess({ data: experiences })),
        catchError((err) => of(loadExperiencesFailure({ error: err })))
      )
    )
  );

  addExperience = createEffect(() => {
    return this.actions$.pipe(
      ofType(ExperienceActions.addExperience),
      mergeMap((action) => this.experienceService.add(action.data)),
      pipe(
        map((res) => {
          this.store.dispatch(ExperienceActions.addExperienceSuccessRedirect());
          return ExperienceActions.addExperienceSuccess({ data: res.data });
        }),
        catchError((error) =>
          of(ExperienceActions.addExperienceFailure({ error }))
        )
      )
    );
  });

  addExperienceRedirect = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ExperienceActions.addExperienceSuccessRedirect),
        tap((action) => {
          this.router.navigate(['dashboard/experiences']);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private experienceService: ExperienceService,
    private store: Store<AppState>,
    private router: Router
  ) {}
}
