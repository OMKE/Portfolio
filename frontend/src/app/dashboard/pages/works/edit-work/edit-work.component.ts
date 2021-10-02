import { updateWork } from './../../../../core/store/works/works.actions';
import { Work } from './../../../../core/store/works/work.model';
import { Observable } from 'rxjs';
import {
  selectWorkById,
  selectWorksUpdate,
  selectWorksUpdateSuccess,
  selectWorksUpdateFailure,
} from './../../../../core/store/works/works.selectors';
import { ActivatedRoute } from '@angular/router';
import { WorkRequest } from './../../../../core/store/works/work.request';
import { setTitle } from './../../../../core/utilities/misc.utils';
import { AppState } from './../../../../core/store/index';
import { Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-work',
  templateUrl: './edit-work.component.html',
  styleUrls: ['./edit-work.component.scss'],
})
export class EditWorkComponent implements OnInit {
  editForm: FormGroup;
  work$: Observable<Work>;
  quillStyles = {
    height: '30rem',
  };

  updating$: Observable<boolean>;
  updated$: Observable<boolean>;
  failed$: Observable<boolean>;

  config = {
    toolbar: [[], []],
  };

  constructor(
    private titleHead: Title,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    setTitle(this.titleHead, 'Works - Add');

    const workId = this.route.snapshot.params.id;

    this.work$ = this.store.select(selectWorkById(workId));

    this.editForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ],
      ],
      description: ['', [Validators.required, Validators.minLength(32)]],
      websiteUrl: ['', [Validators.minLength(4), Validators.maxLength(255)]],
      sourceCodeUrl: ['', [Validators.minLength(4), Validators.maxLength(255)]],
      videoUrl: ['', [Validators.minLength(4), Validators.maxLength(255)]],
      image: ['', []],
      themeId: ['', [Validators.required]],
    });

    this.updating$ = this.store.select(selectWorksUpdate);
    this.updated$ = this.store.select(selectWorksUpdateSuccess);
    this.failed$ = this.store.select(selectWorksUpdateFailure);
  }

  editHandler(): void {
    if (this.editForm.valid) {
      this.editForm.get('image').value === '' &&
        this.editForm.removeControl('image');

      let workId: number = null;
      this.work$.subscribe((data) => (workId = data.id));
      const data: WorkRequest = { ...this.editForm.value };
      data.themeId = 1;
      this.store.dispatch(updateWork({ workId, data }));
    } else {
      console.error('Add form is invalid');
    }
  }

  onFileChange(event): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.editForm.patchValue({ image: reader.result });
      };
    }
  }

  onEditorCreated(event): void {
    this.work$.subscribe((data) => {
      this.editForm.patchValue({
        description: data.description,
        title: data.title,
        websiteUrl: data.websiteUrl,
        sourceCodeUrl: data.sourceCodeUrl,
        videoUrl: data.videoUrl,
        themeId: data.themeId,
      });
    });
  }

  get title(): AbstractControl {
    return this.editForm.get('title');
  }
  get description(): AbstractControl {
    return this.editForm.get('description');
  }
  get websiteUrl(): AbstractControl {
    return this.editForm.get('websiteUrl');
  }
  get sourceCodeUrl(): AbstractControl {
    return this.editForm.get('sourceCodeUrl');
  }
  get videoUrl(): AbstractControl {
    return this.editForm.get('videoUrl');
  }
  get image(): AbstractControl {
    return this.editForm.get('image');
  }
}
