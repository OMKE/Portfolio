import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {AboutMeRequest} from "../../../../core/store/about-me/about-me.request";
import {AboutMe} from "../../../../core/store/about-me/about-me.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../core/store";
import {updateAboutMe} from "../../../../core/store/about-me/about-me.actions";
import {
  selectAboutMeUpdateFailed,
  selectAboutMeUpdateSuccess,
  selectAboutMeUpdating
} from "../../../../core/store/about-me/about-me.selectors";


@Component({
  selector: 'app-about-me-form',
  templateUrl: './about-me-form.component.html',
  styleUrls: ['./about-me-form.component.scss']
})
export class AboutMeFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  @Input() aboutMe: AboutMe;

  aboutMeForm: FormGroup;

  updating$: Observable<boolean>;
  updated$: Observable<boolean>;
  failed$: Observable<boolean>;

  quillStyles = {
    height: '30rem',
  };

  config = {
    toolbar: [[], [{ header: [1, 2, 3, 5, 6, false] }]],
  };


  ngOnInit(): void {

    this.updating$ = this.store.select(selectAboutMeUpdating);
    this.updated$ = this.store.select(selectAboutMeUpdateSuccess);
    this.failed$ = this.store.select(selectAboutMeUpdateFailed);

    this.aboutMeForm = this.fb.group({
      heading: [
        this.aboutMe.heading,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(64)
        ],
      ],
      position: [
        this.aboutMe.position,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(64)
        ],
      ],
      location: [
        this.aboutMe.location,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(64)
        ],
      ],
      biography: [
        this.aboutMe.biography,
        [
          Validators.required,
          Validators.minLength(5),
        ],
      ]
    })
  }


  addHandler(): void {
    if (this.aboutMeForm.valid) {
      const data: AboutMeRequest = { ...this.aboutMeForm.value };
      this.store.dispatch(updateAboutMe({ data }));
    } else {
      console.error('About me form is invalid');
    }

  }

  get heading(): AbstractControl {
    return this.aboutMeForm.get('heading');
  }
  get position(): AbstractControl {
    return this.aboutMeForm.get('position');
  }
  get location(): AbstractControl {
    return this.aboutMeForm.get('location');
  }

  get biography(): AbstractControl {
    return this.aboutMeForm.get('biography');
  }
}
