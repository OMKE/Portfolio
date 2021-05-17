import {fadeIn} from '../../../core/abstract/animations';
import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-about-me-content',
  templateUrl: './about-me-content.component.html',
  styleUrls: ['./about-me-content.component.scss'],
  animations: [fadeIn]
})
export class AboutMeContentComponent implements OnInit {

  constructor() {
  }

  @Input() heading$: Observable<string>;
  @Input() position$: Observable<string>;
  @Input() location$: Observable<string>;
  @Input() biography$: Observable<string>;

  @Input() loaded$: Observable<boolean>;

  ngOnInit(): void {
  }
}
