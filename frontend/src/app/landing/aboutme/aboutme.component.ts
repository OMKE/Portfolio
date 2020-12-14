import { selectAboutMeLoaded } from './../../core/store/about-me/about-me.selectors';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/core/store';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.scss'],
})
export class AboutmeComponent implements OnInit {

  constructor(private store: Store<AppState>, private title: Title) { }


  loaded$: Observable<boolean>;

  ngOnInit(): void {

    this.title.setTitle('Omar Iriskic — About me');

    this.loaded$ = this.store.pipe(select(selectAboutMeLoaded));
  }

}
