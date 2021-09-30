import {Component, Input, OnInit} from '@angular/core';
import {WorkImage} from "../../../../../core/store/work-image/work-image.model";

@Component({
  selector: 'app-work-image-container',
  templateUrl: './work-image-container.component.html',
  styleUrls: ['./work-image-container.component.scss']
})
export class WorkImageContainerComponent implements OnInit {

  @Input()
  workImage: WorkImage;

  constructor() { }

  ngOnInit(): void {
  }

}
