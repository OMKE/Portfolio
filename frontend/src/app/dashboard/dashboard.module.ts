import { AuthInterceptorProvider } from './../auth/auth.module';
import { DashboardGuard } from './dashboard.guard';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardNavbarComponent } from './common/dashboard-navbar/dashboard-navbar.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { DashboardHeadingComponent } from './common/dashboard-heading/dashboard-heading.component';
import { ExperiencesComponent } from './pages/experiences/experiences.component';





@NgModule({
  declarations: [DashboardComponent, DashboardNavbarComponent, MessagesComponent, DashboardHeadingComponent, ExperiencesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ],
  providers: [DashboardGuard, AuthInterceptorProvider]
})
export class DashboardModule { }
