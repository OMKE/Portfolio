import { AuthInterceptorProvider } from './../auth/auth.module';
import { DashboardGuard } from './dashboard.guard';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';





@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ],
  providers: [DashboardGuard, AuthInterceptorProvider]
})
export class DashboardModule { }
