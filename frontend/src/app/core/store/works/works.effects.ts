import { selectWorksLoaded, selectWorkById } from './works.selectors';
import { filter, mergeMap, map, catchError, withLatestFrom} from 'rxjs/operators';
import {pipe, of } from 'rxjs';
import { loadWorks, loadWorksSuccess, loadWorksFailure, loadWork, loadWorkSuccess, loadWorkFailure } from './works.actions';
import { Store, select } from '@ngrx/store';
import { WorksService } from './../../services/works.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '..';



@Injectable()
export class WorksEffects {

  loadWorks$ = createEffect((): any => this.actions$.pipe(
    ofType(loadWorks),
    withLatestFrom(this.store.pipe(select(selectWorksLoaded))),
    filter(([action, selectWorksLoaded]) => {
      return !selectWorksLoaded;
    }),
    mergeMap(action => this.worksService.getAll()),
    pipe(
      map(works => loadWorksSuccess({data: works})),
      catchError(err => of(loadWorksFailure({error: err})))
    )
  ));

  loadWork$ = createEffect((): any => this.actions$.pipe(
    ofType(loadWork),
    mergeMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(select(selectWorkById(action.workId)))),
      filter(([action, work]) => {
        return !work;
      }),

      mergeMap(([action, work]) => this.worksService.getOne(action.workId)),
      pipe(
        map(work => loadWorkSuccess({ data: work })),
        catchError(error => of(loadWorkFailure({ error })))
        )
      )
    ),
  ));


  constructor(private actions$: Actions, private worksService: WorksService, private store: Store<AppState>) {}

}
