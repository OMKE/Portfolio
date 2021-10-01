import { ActivatedRoute } from '@angular/router';
import {
  selectWorkById,
  selectWorksLoaded,
} from './../../../../core/store/works/works.selectors';
import {select, Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { Work } from './../../../../core/store/works/work.model';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, HostListener, OnInit} from '@angular/core';
import { AppState } from 'src/app/core/store';
import {WorkImage} from "../../../../core/store/work-image/work-image.model";
import {
  selectWorkImagesByWorkId,
  selectWorkImagesByWorkIdLoaded
} from "../../../../core/store/work-image/work-image.selectors";
import {loadWorkImages} from "../../../../core/store/work-image/work-image.actions";
import {Event} from "../../../common/dashboard-modal/dashboard-modal.component";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
})
export class WorkComponent implements OnInit {

  updateWorkImageFormGroup: FormGroup;

  work$: Observable<Work>;
  image$: Observable<WorkImage[]>;
  imagesLoaded$: Observable<boolean>;
  loaded$: Observable<boolean>;
  isModalShown: boolean = false;
  modalWorkImage: WorkImage = null;

  quillStyles = {
    height: '30rem',
  };

  config = {
    toolbar: [[], [{ header: [1, false] }]],
  };

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    const workId = this.route.snapshot.params.id;
    this.loaded$ = this.store.select(selectWorksLoaded);
    this.store.dispatch(loadWorkImages({ workId }));
    this.work$ = this.store.select(
      selectWorkById(workId)
    );
    this.imagesLoaded$ = this.store.pipe(select(selectWorkImagesByWorkIdLoaded(workId)));
    this.image$ = this.store.pipe(select(selectWorkImagesByWorkId(workId)));

    this.updateWorkImageFormGroup = this.fb.group({
      image: [
        '',
        [
          Validators.required,
        ]
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(32)
        ]
      ]
    })
  }

  showUpdateImageModal(workImage: WorkImage) : void {
    this.isModalShown = true;
    this.modalWorkImage = workImage;

    this.updateWorkImageFormGroup.patchValue({ description: workImage.description, image: workImage.image });
  }

  hideModal(event): void {
    // console.log(event.target);
    if (event.target.classList.contains('update-work-image-modal--active')) {
      this.cancelUpdateWorkImage();
    }
  }

  /*
    Used for file change when Work image is selected from FS
   */
  onFileChange(event): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.updateWorkImageFormGroup.patchValue({ image: reader.result });
      };
    }
  }

  updateWorkImageHandler(): void {
    this.isModalShown = false;
    console.log(this.updateWorkImageFormGroup.value);
  }
  deleteUpdateWorkImage(): void {
    this.isModalShown = false;
    console.log('to delete image');
  }

  cancelUpdateWorkImage(): void {
    this.isModalShown = false;
  }


  get image(): AbstractControl {
    return this.updateWorkImageFormGroup.get('image');
  }
  get description(): AbstractControl {
    return this.updateWorkImageFormGroup.get('description');
  }

}
