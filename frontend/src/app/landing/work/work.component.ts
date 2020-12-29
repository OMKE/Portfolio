import { tap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { setTitle } from './../../core/utilities/misc.utils';
import { selectWorkImagesByWorkId, selectWorkImagesByWorkIdLoaded } from './../../core/store/work-image/work-image.selectors';
import { loadWork } from './../../core/store/works/works.actions';
import { selectWorkById, selectWorkByIdLoaded } from './../../core/store/works/works.selectors';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/core/store';
import { Work } from 'src/app/core/store/works/work.model';
import { ActivatedRoute } from '@angular/router';
import { loadWorkImages } from 'src/app/core/store/work-image/work-image.actions';
import { WorkImage } from 'src/app/core/store/work-image/work-image.model';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit{

  work$: Observable<Work>;
  images$: Observable<WorkImage[]>;

  loaded$: Observable<boolean>;

  loadedImages$: Observable<boolean>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private title: Title) { }


  ngOnInit(): void {
    setTitle(this.title, '');

    const workId = this.route.snapshot.params.id;

    this.store.dispatch(loadWork({ workId}));
    this.store.dispatch(loadWorkImages( { workId }));
    this.work$ = this.store.pipe(select(selectWorkById(workId)));
    this.images$ = this.store.pipe(select(selectWorkImagesByWorkId(workId)));
    this.loaded$ = this.store.pipe(select(selectWorkByIdLoaded(workId)));
    this.loadedImages$ = this.store.pipe(select(selectWorkImagesByWorkIdLoaded(workId)));


    this.loaded$.subscribe(res => {
      if (res === false) {
        setTitle(this.title, `Work #${this.route.snapshot.params.id}`);
      } else {
        this.work$.subscribe(res => {
          setTitle(this.title, res.title);
        });
      }
    });
  }



}
