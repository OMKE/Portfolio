import { fadeIn } from './../../../core/abstract/animations';
import { state, trigger, style } from '@angular/animations';
import { selectAboutMeHeading, selectAboutMePosition, selectAboutMeLocation, selectAboutMeBiography, selectAboutMeLoading, selectAboutMeLoaded } from './../../../core/store/about-me/about-me.selectors';
import { environment } from './../../../../environments/environment';
import { LoadAboutMe } from './../../../core/store/about-me/about-me.actions';
import { AboutMe } from '../../../core/store/about-me/about-me.model';
import { Component, OnInit } from '@angular/core';
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

  constructor(private store: Store<AppState>) { }

  heading$: Observable<string>;
  position$: Observable<string>;
  location$: Observable<string>;
  biography$: Observable<string>;

  loaded$: Observable<boolean>;    

  ngOnInit(): void {
    this.store.dispatch(new LoadAboutMe());
    
    this.loaded$ = this.store.pipe(select(selectAboutMeLoaded));
    
    this.heading$ = this.store.pipe(select(selectAboutMeHeading));
    this.position$ = this.store.pipe(select(selectAboutMePosition));
    this.location$ = this.store.pipe(select(selectAboutMeLocation));
    this.biography$ = this.store.pipe(select(selectAboutMeBiography));
  }

  
}
