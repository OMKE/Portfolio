import { ActivatedRoute } from '@angular/router';
import {
  selectWorkById,
  selectWorksLoaded,
} from './../../../../core/store/works/works.selectors';
import {select, Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { Work } from './../../../../core/store/works/work.model';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/core/store';
import {WorkImage} from "../../../../core/store/work-image/work-image.model";
import {
  selectWorkImagesByWorkId,
  selectWorkImagesByWorkIdLoaded
} from "../../../../core/store/work-image/work-image.selectors";
import {loadWorkImages} from "../../../../core/store/work-image/work-image.actions";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
})
export class WorkComponent implements OnInit {
  work$: Observable<Work>;
  image$: Observable<WorkImage[]>;
  imagesLoaded$: Observable<boolean>;
  loaded$: Observable<boolean>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const workId = this.route.snapshot.params.id;
    this.loaded$ = this.store.select(selectWorksLoaded);
    this.store.dispatch(loadWorkImages({ workId }));
    this.work$ = this.store.select(
      selectWorkById(workId)
    );
    this.imagesLoaded$ = this.store.pipe(select(selectWorkImagesByWorkIdLoaded(workId)));
    this.image$ = this.store.pipe(select(selectWorkImagesByWorkId(workId)));
  }

  editHandler(): void {}
}
