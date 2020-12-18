import { selectAllWorks, selectLatestWork } from './../../../core/store/works/works.selectors';
import { loadWorks } from './../../../core/store/works/works.actions';
import { Store, select } from '@ngrx/store';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Work } from 'src/app/core/store/works/work.model';
import { AppState } from 'src/app/core/store';

@Component({
  selector: 'app-works-list',
  templateUrl: './works-list.component.html',
  styleUrls: ['./works-list.component.scss']
})
export class WorksListComponent implements OnInit {

  constructor(private store: Store<AppState>) { }


  works$: Observable<Work[]>;

  latestWork$: Observable<Work>;

  ngOnInit(): void {
    this.store.dispatch(loadWorks());

    this.works$ = this.store.pipe(select(selectAllWorks));
    this.latestWork$ = this.store.pipe(select(selectLatestWork));
  }

}
