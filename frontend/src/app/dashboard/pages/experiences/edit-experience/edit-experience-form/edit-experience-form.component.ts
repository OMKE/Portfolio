import {
  selectUpdateExperience,
  selectUpdateExperienceFailure,
} from './../../../../../core/store/experience/experience.selectors';
import { ActivatedRoute } from '@angular/router';
import { updateExperience } from './../../../../../core/store/experience/experience.actions';
import { Store } from '@ngrx/store';
import { ExperienceRequest } from './../../../../../core/store/experience/experience.request';
import { Observable } from 'rxjs';
import { Experience } from './../../../../../core/store/experience/experience.model';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { AppState } from 'src/app/core/store';

@Component({
  selector: 'app-edit-experience-form',
  templateUrl: './edit-experience-form.component.html',
  styleUrls: ['./edit-experience-form.component.scss'],
})
export class EditExperienceFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {}

  editForm: FormGroup;

  updating$: Observable<boolean>;
  failed$: Observable<boolean>;

  @Input() experience: Experience;

  ngOnInit(): void {
    this.updating$ = this.store.select(selectUpdateExperience);
    this.failed$ = this.store.select(selectUpdateExperienceFailure);

    this.editForm = this.fb.group({
      date: [
        this.experience.date,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(64),
        ],
      ],
      title: [
        this.experience.title,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(64),
        ],
      ],
      company: [
        this.experience.company,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ],
      ],
    });
  }

  get date(): AbstractControl {
    return this.editForm.get('date');
  }
  get title(): AbstractControl {
    return this.editForm.get('title');
  }
  get company(): AbstractControl {
    return this.editForm.get('company');
  }

  editHandler(): void {
    if (this.editForm.valid) {
      const data: ExperienceRequest = { ...this.editForm.value };
      const id = this.route.snapshot.params.id;
      this.store.dispatch(updateExperience({ id, data }));
    } else {
      console.error('Edit form is invalid');
    }
  }
}
