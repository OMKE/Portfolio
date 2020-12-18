import { Work } from './../../../core/store/works/work.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-works-list-item',
  templateUrl: './works-list-item.component.html',
  styleUrls: ['./works-list-item.component.scss']
})
export class WorksListItemComponent implements OnInit {


  @Input() work: Work = {
    id: null,
    themeId: null,
    title: '',
    description: '',
    image: 'https://via.placeholder.com/800x600',
    websiteUrl: '',
    sourceCodeUrl: '',
    videoUrl: '',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  @Input() isLast = false;

  constructor() { }

  ngOnInit(): void {
  }

}
