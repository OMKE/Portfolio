import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../core/store";
import {loadAboutMe} from "../../../core/store/about-me/about-me.actions";
import {Observable} from "rxjs";
import {AboutMe} from "../../../core/store/about-me/about-me.model";
import {selectAboutMeLoaded, selectAboutMeProps} from "../../../core/store/about-me/about-me.selectors";

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements OnInit {

  aboutMe$: Observable<AboutMe>;

  loaded$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadAboutMe())
    this.aboutMe$ = this.store.select(selectAboutMeProps);
    this.loaded$ = this.store.select(selectAboutMeLoaded);
  }


}
