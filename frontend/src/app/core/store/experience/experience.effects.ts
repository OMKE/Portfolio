import { selectExperienceLoaded } from './experience.selectors';
import { Store, select } from '@ngrx/store';
import { ExperienceService } from './../../services/experience.service';
import { mergeMap, map, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { loadExperiences, loadExperiencesSuccess, loadExperiencesFailure } from './experience.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { pipe, EMPTY, of } from 'rxjs';
import { AppState } from '..';



@Injectable()
export class ExperienceEffects {

  laodExperiences$ = createEffect((): any => this.actions$.pipe(
    ofType(loadExperiences),
    withLatestFrom(this.store.pipe(select(selectExperienceLoaded))),
    filter(([action, selectExperienceLoaded]) => {
      return !selectExperienceLoaded;
    }),
    mergeMap(action => this.experienceService.getAll()),
    pipe(
      map(experiences => loadExperiencesSuccess({data: experiences})),
      catchError(err => of(loadExperiencesFailure({error: err})))
    )
  ));

  constructor(private actions$: Actions, private experienceService: ExperienceService, private store: Store<AppState>) {}

}
