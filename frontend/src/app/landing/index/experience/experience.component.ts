import { Experience } from './../../../core/models/Experience';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  constructor() { }


  experiences: Experience[] = [
    {
      id: 1,
      title: 'Software Engineering',
      date: '2017-2021',
      company: 'Singidunum University',
      createdAt: new Date('2020-11-17 21:40:13'),
      updatedAt: new Date('2020-11-17 21:40:13')
    },
    {
      id: 2,
      title: 'Internship',
      date: 'February 2019',
      company: 'Schneider Electric DMS',
      createdAt: new Date('2020-11-17 21:40:13'),
      updatedAt: new Date('2020-11-17 21:40:13')
    },
  ];

  ngOnInit(): void {}

}
