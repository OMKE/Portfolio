import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-image',
  templateUrl: './work-image.component.html',
  styleUrls: ['./work-image.component.scss']
})
export class WorkImageComponent implements OnInit {

  constructor() { }

  @Input() image: string;
  @Input() description: string;
  @Input() projectName: string;

  ngOnInit(): void {
  }

}
