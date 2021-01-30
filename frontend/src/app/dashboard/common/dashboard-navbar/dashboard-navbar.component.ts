import { requestAuthLogoutUser } from './../../../auth/auth.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/core/store';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.scss']
})
export class DashboardNavbarComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.store.dispatch(requestAuthLogoutUser());
  }

}
