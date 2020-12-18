import { setTitle } from './../../core/utilities/misc.utils';
import { selectAboutMeLoaded } from '../../core/store/about-me/about-me.selectors';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/core/store';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements OnInit {

  constructor(private store: Store<AppState>, private title: Title) { }


  loaded$: Observable<boolean>;

  ngOnInit(): void {
    setTitle(this.title, 'About me');

    this.loaded$ = this.store.pipe(select(selectAboutMeLoaded));
  }

}
