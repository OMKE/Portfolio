import { setTitle } from './../../../../core/utilities/misc.utils';
import { Title } from '@angular/platform-browser';
import {
  selectAddExperience,
  selectAddExperienceSuccess,
  selectAddExperienceFailure,
} from './../../../../core/store/experience/experience.selectors';
import { Observable } from 'rxjs';
import { addExperience } from './../../../../core/store/experience/experience.actions';
import { Store } from '@ngrx/store';
import { ExperienceRequest } from './../../../../core/store/experience/experience.request';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/core/store';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.scss'],
})
export class AddExperienceComponent implements OnInit {
  addForm: FormGroup;

  creating$: Observable<boolean>;
  created$: Observable<boolean>;
  failed$: Observable<boolean>;

  constructor(private fb: FormBuilder, private store: Store<AppState>, private titleHead: Title) {}

  ngOnInit(): void {

    setTitle(this.titleHead, 'Experiences - Add');


    this.creating$ = this.store.select(selectAddExperience);
    this.created$ = this.store.select(selectAddExperienceSuccess);
    this.failed$ = this.store.select(selectAddExperienceFailure);

    this.addForm = this.fb.group({
      date: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(64),
        ],
      ],
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(64),
        ],
      ],
      company: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ],
      ],
    });
  }

  addHandler(): void {
    if (this.addForm.valid) {
      const data: ExperienceRequest = { ...this.addForm.value };
      this.store.dispatch(addExperience({ data }));
    } else {
      console.error('Add form is invalid');
    }
  }

  get date(): AbstractControl {
    return this.addForm.get('date');
  }
  get title(): AbstractControl {
    return this.addForm.get('title');
  }
  get company(): AbstractControl {
    return this.addForm.get('company');
  }
}
