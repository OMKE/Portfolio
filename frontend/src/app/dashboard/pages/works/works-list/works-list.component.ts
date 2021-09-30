import {
  selectAllWorks,
  selectWorksLoaded,
} from './../../../../core/store/works/works.selectors';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/core/store';
import { Work } from 'src/app/core/store/works/work.model';

@Component({
  selector: 'app-works-list',
  templateUrl: './works-list.component.html',
  styleUrls: ['./works-list.component.scss'],
})
export class WorksListComponent implements OnInit {
  works$: Observable<Work[]>;
  loaded$: Observable<boolean>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loaded$ = this.store.select(selectWorksLoaded);
    this.works$ = this.store.pipe(select(selectAllWorks));
  }
}
