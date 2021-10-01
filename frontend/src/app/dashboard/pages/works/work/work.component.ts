import { ComponentWithModal } from 'src/app/dashboard/common/dashboard-modal/dashboard-modal.abstract';
import { AddWorkImageRequest } from './../../../../core/services/work-image.service';
import {
  addWorkImage,
  deleteWorkImage,
  updateWorkImage,
} from './../../../../core/store/work-image/work-image.actions';
import { ActivatedRoute } from '@angular/router';
import {
  selectWorkById,
  selectWorksLoaded,
} from './../../../../core/store/works/works.selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Work } from './../../../../core/store/works/work.model';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, HostListener, OnInit } from '@angular/core';
import { AppState } from 'src/app/core/store';
import { WorkImage } from '../../../../core/store/work-image/work-image.model';
import {
  selectWorkImagesByWorkId,
  selectWorkImagesByWorkIdLoaded,
} from '../../../../core/store/work-image/work-image.selectors';
import { loadWorkImages } from '../../../../core/store/work-image/work-image.actions';
import { UpdateWorkImageRequest } from 'src/app/core/services/work-image.service';
import { deleteWork } from 'src/app/core/store/works/works.actions';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
})
export class WorkComponent extends ComponentWithModal implements OnInit {
  addWorkImageFormGroup: FormGroup;
  updateWorkImageFormGroup: FormGroup;

  work$: Observable<Work>;
  image$: Observable<WorkImage[]>;
  imagesLoaded$: Observable<boolean>;
  loaded$: Observable<boolean>;
  isAddModalShown = false;
  isUpdateModalShown = false;
  // work image shown in update modal
  modalWorkImage: WorkImage = null;

  quillStyles = {
    height: '30rem',
  };

  config = {
    toolbar: [[], [{ header: [1, false] }]],
  };

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    const workId = this.route.snapshot.params.id;
    this.loaded$ = this.store.select(selectWorksLoaded);
    this.store.dispatch(loadWorkImages({ workId }));
    this.work$ = this.store.select(selectWorkById(workId));
    this.imagesLoaded$ = this.store.pipe(
      select(selectWorkImagesByWorkIdLoaded(workId))
    );
    this.image$ = this.store.pipe(select(selectWorkImagesByWorkId(workId)));

    this.updateWorkImageFormGroup = this.fb.group({
      image: ['', []],
      description: ['', [Validators.required, Validators.minLength(32)]],
    });

    this.addWorkImageFormGroup = this.fb.group({
      image: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(32)]],
    });
  }

  showAddImageModal(): void {
    this.isAddModalShown = true;
  }

  showUpdateImageModal(workImage: WorkImage): void {
    this.isUpdateModalShown = true;
    this.modalWorkImage = workImage;

    this.updateWorkImageFormGroup.patchValue({
      description: workImage.description,
    });
  }

  hideAddModal(event): void {
    if (event.target.classList.contains('add-work-image-modal--active')) {
      this.cancelAddWorkImage();
    }
  }

  hideUpdateModal(event): void {
    // console.log(event.target);
    if (event.target.classList.contains('update-work-image-modal--active')) {
      this.cancelUpdateWorkImage();
    }
  }

  /*
    Used for file change when Work image is selected from FS
   */
  onFileChange(event, formGroup: FormGroup): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        formGroup.patchValue({ image: reader.result });
      };
    }
  }

  addWorkImageHandler(): void {
    this.isAddModalShown = false;
    if (this.addWorkImageFormGroup.valid) {
      const requestData: AddWorkImageRequest = {
        ...this.addWorkImageFormGroup.value,
      };
      let workId = null;
      this.work$.subscribe((res) => (workId = res.id));
      this.store.dispatch(addWorkImage({ workId, data: requestData }));
    }
  }

  updateWorkImageHandler(): void {
    this.isUpdateModalShown = false;
    if (this.updateWorkImageFormGroup.valid) {
      // Check if image is changed, else delete image field from request
      this.updateWorkImageFormGroup.get('image').value === '' &&
        this.updateWorkImageFormGroup.removeControl('image');

      const requestData: UpdateWorkImageRequest = {
        ...this.updateWorkImageFormGroup.value,
      };

      this.store.dispatch(
        updateWorkImage({
          workId: this.modalWorkImage.projectId,
          workImageId: this.modalWorkImage.id,
          data: requestData,
        })
      );
    }
  }

  deleteWorkAction(): void {}

  onConfirmHandler(id: any): void {
    let workId = null;
    this.work$.subscribe((work) => (workId = work.id));

    this.store.dispatch(deleteWork({ workId }));
  }
  question(): string {
    return 'Are you sure you want to delete this project?';
  }

  deleteUpdateWorkImage(): void {
    this.isUpdateModalShown = false;
    this.store.dispatch(
      deleteWorkImage({
        workId: this.modalWorkImage.projectId,
        workImageId: this.modalWorkImage.id,
      })
    );
  }

  cancelAddWorkImage(): void {
    this.isAddModalShown = false;
  }

  cancelUpdateWorkImage(): void {
    this.isUpdateModalShown = false;
  }

  get image(): AbstractControl {
    return this.updateWorkImageFormGroup.get('image');
  }
  get description(): AbstractControl {
    return this.updateWorkImageFormGroup.get('description');
  }
}
