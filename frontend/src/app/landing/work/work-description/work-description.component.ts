import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-description',
  templateUrl: './work-description.component.html',
  styleUrls: ['./work-description.component.scss']
})
export class WorkDescriptionComponent implements OnInit {


  @Input() description: string;

  constructor() { }

  ngOnInit(): void {
  }

}
