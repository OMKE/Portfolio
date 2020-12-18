import { Observable } from 'rxjs';
import { Work } from './../../../core/store/works/work.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-works-list-main-item',
  templateUrl: './works-list-main-item.component.html',
  styleUrls: ['./works-list-main-item.component.scss']
})
export class WorksListMainItemComponent implements OnInit {


  @Input() work: Work;

  constructor() { }

  ngOnInit(): void {
  }

}
