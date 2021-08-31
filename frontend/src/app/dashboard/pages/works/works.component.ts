import { setTitle } from './../../../core/utilities/misc.utils';
import { Title } from '@angular/platform-browser';
import { selectAllWorks } from './../../../core/store/works/works.selectors';
import { loadWorks } from './../../../core/store/works/works.actions';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/core/store';
import { Work } from 'src/app/core/store/works/work.model';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent implements OnInit {

  works$: Observable<Work[]>;

  constructor(private store: Store<AppState>, private title: Title) { }

  ngOnInit(): void {
    setTitle(this.title, 'Works');

    this.store.dispatch(loadWorks());
    this.works$ = this.store.pipe(select(selectAllWorks));

  }

}
