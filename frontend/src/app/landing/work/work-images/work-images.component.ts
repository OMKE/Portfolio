import { fadeIn } from './../../../core/abstract/animations';
import { Observable } from 'rxjs';
import { WorkImage } from './../../../core/store/work-image/work-image.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-images',
  templateUrl: './work-images.component.html',
  styleUrls: ['./work-images.component.scss'],
  animations: [fadeIn]
})
export class WorkImagesComponent implements OnInit {

  constructor() { }

  @Input() workImages: WorkImage[] = [];

  @Input() projectName = '';

  @Input()
  loaded$: Observable<boolean>;

  ngOnInit(): void {}

}
