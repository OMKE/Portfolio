import { Work } from './../../../../core/store/works/work.model';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-item',
  templateUrl: './work-item.component.html',
  styleUrls: ['./work-item.component.scss'],
})
export class WorkItemComponent implements OnInit {
  @Input()
  work: Work = {
    id: null,
    themeId: null,
    title: '',
    description: '',
    image: 'https://via.placeholder.com/800x600',
    websiteUrl: '',
    sourceCodeUrl: '',
    videoUrl: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  constructor() {}

  ngOnInit(): void {}
}
