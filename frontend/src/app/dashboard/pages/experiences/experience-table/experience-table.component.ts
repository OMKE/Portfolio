import {
  selectAllExperiences,
  selectExperienceLoaded,
  selectExperienceLoading,
} from './../../../../core/store/experience/experience.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/core/store/experience/experience.model';
import { AppState } from 'src/app/core/store';

@Component({
  selector: 'app-experience-table',
  templateUrl: './experience-table.component.html',
  styleUrls: ['./experience-table.component.scss'],
})
export class ExperienceTableComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  experiences$: Observable<Experience[]>;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;

  ngOnInit(): void {
    this.experiences$ = this.store.select(selectAllExperiences);
    this.loaded$ = this.store.select(selectExperienceLoaded);
    this.loading$ = this.store.select(selectExperienceLoading);
  }
}
