import { WorkImageService } from './../../services/work-image.service';
import { selectWorkImagesByWorkId } from './work-image.selectors';
import { AppState } from '..';
import { Store, select } from '@ngrx/store';
import { withLatestFrom, filter, map, mergeMap, catchError} from 'rxjs/operators';
import { loadWorkImages, loadWorkImagesSuccess, loadWorkImagesFailure } from './work-image.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { pipe, of } from 'rxjs';



@Injectable()
export class WorkImageEffects {

  loadWorkImage = createEffect((): any => this.actions$.pipe(
    ofType(loadWorkImages),
    mergeMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(select(selectWorkImagesByWorkId(Number(action.workId))))),
      filter(([action, selectWorkImagesByWorkId]) => {
        return selectWorkImagesByWorkId.length === 0;
      }),
      mergeMap(([action, work]) => this.workImageService.getAll(action.workId)),
      pipe(
        map(workImages => loadWorkImagesSuccess({ data: workImages })),
        catchError(err => of(loadWorkImagesFailure({error: err})))
      )
    ))
  ));

  constructor(private actions$: Actions, private store: Store<AppState>, private workImageService: WorkImageService) {}

}
