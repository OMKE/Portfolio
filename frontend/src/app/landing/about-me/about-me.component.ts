import { environment } from './../../../environments/environment';
import { SeoComponent } from 'src/app/shared/abstracts/seo.abstract';
import {
  selectAboutMeHeading,
  selectAboutMePosition,
  selectAboutMeLocation,
  selectAboutMeBiography,
} from './../../core/store/about-me/about-me.selectors';
import { LoadAboutMe } from './../../core/store/about-me/about-me.actions';
import { setTitle, stripHtml } from './../../core/utilities/misc.utils';
import { selectAboutMeLoaded } from '../../core/store/about-me/about-me.selectors';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/core/store';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent extends SeoComponent implements OnInit {
  constructor(private store: Store<AppState>) {
    super();
  }

  loaded$: Observable<boolean>;

  heading$: Observable<string>;
  position$: Observable<string>;
  location$: Observable<string>;
  biography$: Observable<string>;

  ngOnInit(): void {
    this.store.dispatch(new LoadAboutMe());

    this.loaded$ = this.store.pipe(select(selectAboutMeLoaded));
    this.heading$ = this.store.pipe(select(selectAboutMeHeading));
    this.position$ = this.store.pipe(select(selectAboutMePosition));
    this.location$ = this.store.pipe(select(selectAboutMeLocation));
    this.biography$ = this.store.pipe(select(selectAboutMeBiography));

    this.loaded$.subscribe((res) => {
      this.biography$.subscribe((res) => {
        this.seo('About me', [
          {
            name: 'keywords',
            content: `${environment.appName}, Full stack, Web Developer, Software Engineer, Angular, React, Github, Portfolio, About me, Biography, Position, Location`,
          },
          { name: 'description', content: stripHtml(res) },
          { name: 'author', content: `${environment.appName}` },
          { name: 'robots', content: 'index, follow' },
        ]);
      });
    });
  }
}
