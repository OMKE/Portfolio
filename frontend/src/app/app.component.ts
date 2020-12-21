import { fadeInRouteAnimation } from './core/abstract/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeInRouteAnimation
  ]
})
export class AppComponent {

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
  getPage(outlet: RouterOutlet): string {
    return outlet.activatedRouteData.page || 'HomePage';
  }
}
