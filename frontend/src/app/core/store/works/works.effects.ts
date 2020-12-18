import { selectWorksLoaded } from './works.selectors';
import { withLatestFrom, filter, mergeMap, map, catchError } from 'rxjs/operators';
import {pipe, of } from 'rxjs';
import { loadWorks, loadWorksSuccess, loadWorksFailure } from './works.actions';
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

  constructor(private actions$: Actions, private worksService: WorksService, private store: Store<AppState>) {}

}
