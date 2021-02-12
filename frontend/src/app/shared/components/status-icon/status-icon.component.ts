import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.scss'],
})
export class StatusIconComponent implements OnInit {
  constructor() {}

  @Input() invert = false;

  @Input() success: Observable<boolean>;

  @Input() error: Observable<boolean>;

  ngOnInit(): void {}
}
