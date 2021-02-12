import { loadExperiences } from '../../../core/store/experience/experience.actions';

import { Store } from '@ngrx/store';
import { setTitle } from './../../../core/utilities/misc.utils';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/core/store';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss'],
})
export class ExperiencesComponent implements OnInit {
  constructor(private title: Title, private store: Store<AppState>) {}

  ngOnInit(): void {
    setTitle(this.title, 'Experiences');
    this.store.dispatch(loadExperiences());
  }
}
