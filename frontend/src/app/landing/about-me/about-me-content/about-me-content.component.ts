import { fadeIn } from './../../../core/abstract/animations';
import { state, trigger, style } from '@angular/animations';
import { selectAboutMeHeading, selectAboutMePosition, selectAboutMeLocation, selectAboutMeBiography, selectAboutMeLoading, selectAboutMeLoaded } from './../../../core/store/about-me/about-me.selectors';
import { environment } from './../../../../environments/environment';
import { LoadAboutMe } from './../../../core/store/about-me/about-me.actions';
import { AboutMe } from '../../../core/store/about-me/about-me.model';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/core/store';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-about-me-content',
  templateUrl: './about-me-content.component.html',
  styleUrls: ['./about-me-content.component.scss'],
  animations: [fadeIn]
})
export class AboutMeContentComponent implements OnInit {

  constructor() { }

  @Input() heading$: Observable<string>;
  @Input() position$: Observable<string>;
  @Input() location$: Observable<string>;
  @Input() biography$: Observable<string>;

  @Input() loaded$: Observable<boolean>;

  ngOnInit(): void {}
}
