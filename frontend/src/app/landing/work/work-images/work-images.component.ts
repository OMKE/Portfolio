import { WorkImage } from './../../../core/store/work-image/work-image.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-images',
  templateUrl: './work-images.component.html',
  styleUrls: ['./work-images.component.scss']
})
export class WorkImagesComponent implements OnInit {

  constructor() { }

  @Input() workImages: WorkImage[] = [];

  @Input() projectName = '';

  ngOnInit(): void {
  }

}
