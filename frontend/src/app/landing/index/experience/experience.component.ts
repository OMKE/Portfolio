import { fadeIn } from './../../../core/abstract/animations';
import { selectAllExperiences, selectExperienceLoaded } from './../../../core/store/experience/experience.selectors';
import { loadExperiences } from './../../../core/store/experience/experience.actions';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Experience } from '../../../core/store/experience/experience.model';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/core/store';


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  animations: [fadeIn]
})
export class ExperienceComponent implements OnInit {


  experiences$: Observable<Experience[]>;

  loaded$ : Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadExperiences());

    this.experiences$ = this.store.pipe(
      select(selectAllExperiences)
    );
    this.loaded$ = this.store.pipe(
      select(selectExperienceLoaded)
    );
  }
}
