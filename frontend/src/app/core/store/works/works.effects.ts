import { Router } from '@angular/router';
import { selectWorksLoaded, selectWorkById } from './works.selectors';
import {
  filter,
  mergeMap,
  map,
  catchError,
  withLatestFrom,
  tap,
} from 'rxjs/operators';
import { pipe, of } from 'rxjs';
import {
  loadWorks,
  loadWorksSuccess,
  loadWorksFailure,
  loadWork,
  loadWorkSuccess,
  loadWorkFailure,
} from './works.actions';
import { Store, select } from '@ngrx/store';
import { WorksService } from './../../services/works.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '..';
import * as WorkActions from './works.actions';

@Injectable()
export class WorksEffects {
  loadWorks$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(loadWorks),
      withLatestFrom(this.store.pipe(select(selectWorksLoaded))),
      filter(([action, selectWorksLoaded]) => {
        return !selectWorksLoaded;
      }),
      mergeMap((action) => this.worksService.getAll()),
      pipe(
        map((works) => loadWorksSuccess({ data: works })),
        catchError((err) => of(loadWorksFailure({ error: err })))
      )
    )
  );

  loadWork$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(loadWork),
      mergeMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(selectWorkById(action.workId)))
          ),
          filter(([action, work]) => {
            return !work;
          }),

          mergeMap(([action, work]) => this.worksService.getOne(action.workId)),
          pipe(
            map((work) => loadWorkSuccess({ data: work })),
            catchError((error) => of(loadWorkFailure({ error })))
          )
        )
      )
    )
  );

  addWork$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WorkActions.addWork),
      mergeMap((action) => this.worksService.addWork(action.data)),
      pipe(
        map((res) => {
          this.store.dispatch(WorkActions.addWorkRedirect());
          return WorkActions.addWorkSuccess({ data: res.data });
        }),
        catchError((error) => of(WorkActions.addWorkFailure({ error })))
      )
    );
  });

  addWorkRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(WorkActions.addWorkRedirect),
        tap((action) => {
          this.router.navigate(['dashboard/works']);
        })
      );
    },
    { dispatch: false }
  );

  deleteWork$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WorkActions.deleteWork),
      mergeMap((action) => {
        this.store.dispatch(WorkActions.deleteWorkSuccessRedirect());
        return this.worksService.deleteWork(action.workId);
      }),
      pipe(
        map(({ message }) => {
          return WorkActions.deleteWorkSuccess({ message });
        }),
        catchError((error) => of(WorkActions.deleteWorkFailure({ error })))
      )
    );
  });

  deleteWorkRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(WorkActions.deleteWorkSuccessRedirect),
        tap((action) => {
          this.router.navigate(['dashboard/works']);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private worksService: WorksService,
    private store: Store<AppState>,
    private router: Router
  ) {}
}
