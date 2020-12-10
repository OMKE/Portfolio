import { Experience } from './../../../../core/models/Experience';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
  styleUrls: ['./experience-item.component.scss']
})
export class ExperienceItemComponent implements OnInit {

  constructor() { }

  @Input() experience: Experience = {
    id: null,
    date: '',
    title: '',
    company: '',
    createdAt: null,
    updatedAt: null
  };

  ngOnInit(): void {
  }

}
