import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-header',
  templateUrl: './work-header.component.html',
  styleUrls: ['./work-header.component.scss']
})
export class WorkHeaderComponent implements OnInit {

  constructor() { }

  @Input() name: string;

  @Input() image: string;


  ngOnInit(): void {
  }

}
