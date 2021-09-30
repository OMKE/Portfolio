import { addWork } from './../../../../core/store/works/works.actions';
import { Store } from '@ngrx/store';
import { WorkRequest } from './../../../../core/store/works/work.request';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { setTitle } from './../../../../core/utilities/misc.utils';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/core/store';

@Component({
  selector: 'app-add-work',
  templateUrl: './add-work.component.html',
  styleUrls: ['./add-work.component.scss'],
})
export class AddWorkComponent implements OnInit {
  addForm: FormGroup;

  quillStyles = {
    height: '30rem',
  };

  config = {
    toolbar: [[], []],
  };

  constructor(
    private titleHead: Title,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    setTitle(this.titleHead, 'Works - Add');

    this.addForm = this.fb.group({
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
      image: ['', [Validators.required]],
    });
  }

  addHandler(): void {
    if (this.addForm.valid) {
      const data: WorkRequest = { ...this.addForm.value };
      data.themeId = 1;
      this.store.dispatch(addWork({ data }));
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
        this.addForm.patchValue({ image: reader.result });
      };
    }
  }

  get title(): AbstractControl {
    return this.addForm.get('title');
  }
  get description(): AbstractControl {
    return this.addForm.get('description');
  }
  get websiteUrl(): AbstractControl {
    return this.addForm.get('websiteUrl');
  }
  get sourceCodeUrl(): AbstractControl {
    return this.addForm.get('sourceCodeUrl');
  }
  get videoUrl(): AbstractControl {
    return this.addForm.get('videoUrl');
  }
  get image(): AbstractControl {
    return this.addForm.get('image');
  }
}
