import { distinctUntilChanged } from 'rxjs/operators';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import {
  selectExperienceById,
  selectExperienceLoaded,
} from './../../../../core/store/experience/experience.selectors';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/core/store/experience/experience.model';
import { AppState } from 'src/app/core/store';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.scss'],
})
export class EditExperienceComponent implements OnInit {
  experience$: Observable<Experience>;
  loaded$: Observable<boolean>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loaded$ = this.store.select(selectExperienceLoaded);

    this.experience$ = this.store.select(
      selectExperienceById(this.route.snapshot.params.id)
    );
  }

  editHandler(): void {}
}
