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
import { deleteExperience } from 'src/app/core/store/experience/experience.actions';
import { ComponentWithModal } from 'src/app/dashboard/common/dashboard-modal/dashboard-modal.abstract';

@Component({
  selector: 'app-experience-table',
  templateUrl: './experience-table.component.html',
  styleUrls: ['./experience-table.component.scss'],
})
export class ExperienceTableComponent
  extends ComponentWithModal
  implements OnInit {
  constructor(private store: Store<AppState>) {
    super();
  }

  experiences$: Observable<Experience[]>;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;

  ngOnInit(): void {
    this.experiences$ = this.store.select(selectAllExperiences);
    this.loaded$ = this.store.select(selectExperienceLoaded);
    this.loading$ = this.store.select(selectExperienceLoading);
  }

  onConfirmHandler(id: any): void {
    this.store.dispatch(deleteExperience({ id }));
  }
  question(): string {
    return 'Are you sure you want to delete this experience?';
  }
}
