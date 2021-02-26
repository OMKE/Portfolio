import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-heading',
  templateUrl: './dashboard-heading.component.html',
  styleUrls: ['./dashboard-heading.component.scss'],
})
export class DashboardHeadingComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  @Input() text = '';

  ngOnInit(): void {}
}
