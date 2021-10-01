import { WorkImageService } from './../../services/work-image.service';
import { selectWorkImagesByWorkId } from './work-image.selectors';
import { AppState } from '..';
import { Store, select } from '@ngrx/store';
import {
  withLatestFrom,
  filter,
  map,
  mergeMap,
  catchError,
} from 'rxjs/operators';
import {
  loadWorkImages,
  loadWorkImagesSuccess,
  loadWorkImagesFailure,
} from './work-image.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { pipe, of } from 'rxjs';
import * as WorkImageActions from './work-image.actions';

@Injectable()
export class WorkImageEffects {
  loadWorkImage = createEffect((): any =>
    this.actions$.pipe(
      ofType(loadWorkImages),
      mergeMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(
              select(selectWorkImagesByWorkId(Number(action.workId)))
            )
          ),
          filter(([action, selectWorkImagesByWorkId]) => {
            return selectWorkImagesByWorkId.length === 0;
          }),
          mergeMap(([action, work]) =>
            this.workImageService.getAll(action.workId)
          ),
          pipe(
            map((workImages) => loadWorkImagesSuccess({ data: workImages })),
            catchError((err) => of(loadWorkImagesFailure({ error: err })))
          )
        )
      )
    )
  );

  addWorkImage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WorkImageActions.addWorkImage),
      mergeMap((action) => {
        return this.workImageService.add(action.workId, action.data);
      }),
      pipe(
        map((res) => {
          return WorkImageActions.addWorkImageSuccess({
            message: res.message,
            data: res.data,
          });
        }),
        catchError((error) =>
          of(WorkImageActions.addWorkImageFailure({ error }))
        )
      )
    );
  });

  updateWorkImage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WorkImageActions.updateWorkImage),
      mergeMap((action) =>
        this.workImageService.update(
          action.workId,
          action.workImageId,
          action.data
        )
      ),
      pipe(
        map((res) => {
          return WorkImageActions.updateWorkImageSuccess(res.data);
        }),
        catchError((error) =>
          of(WorkImageActions.updateWorkImageFailure({ error }))
        )
      )
    );
  });

  deleteWorkImage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WorkImageActions.deleteWorkImage),
      mergeMap((action) =>
        this.workImageService.delete(action.workId, action.workImageId)
      ),
      pipe(
        map((res) => {
          return WorkImageActions.deleteWorkImageSuccess({
            message: res.message,
          });
        }),
        catchError((error) =>
          of(WorkImageActions.deleteWorkImageFailure({ error }))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private workImageService: WorkImageService
  ) {}
}
