import { aboutMeLoaded } from './../../core/store/about-me/about-me.selectors';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/core/store';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.scss'],
})
export class AboutmeComponent implements OnInit {

  constructor(private store: Store<AppState>) { }
  

  loaded$: Observable<boolean>;

  ngOnInit(): void {
    this.loaded$ = this.store.pipe(select(aboutMeLoaded));
  }

}
