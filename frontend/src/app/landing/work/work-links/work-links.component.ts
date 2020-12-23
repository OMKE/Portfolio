import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-links',
  templateUrl: './work-links.component.html',
  styleUrls: ['./work-links.component.scss']
})
export class WorkLinksComponent implements OnInit {

  constructor() { }

  @Input() sourceCodeUrl = '';
  @Input() websiteUrl = '';
  @Input() videoUrl = '';

  ngOnInit(): void {
  }

}
