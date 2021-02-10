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
import { StoreModule } from '@ngrx/store';
import * as fromMessages from './store/messages/messages.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MessagesEffects } from './store/messages/messages.effects';
import { MessagesListComponent } from './pages/messages/messages-list/messages-list.component';
import { MessagesListItemComponent } from './pages/messages/messages-list-item/messages-list-item.component';
import { MessageComponent } from './pages/messages/message/message.component';
import { ModalComponent } from './common/modal/modal.component';






@NgModule({
  declarations: [DashboardComponent, DashboardNavbarComponent, MessagesComponent, DashboardHeadingComponent, ExperiencesComponent, MessagesListComponent, MessagesListItemComponent, MessageComponent, ModalComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromMessages.messagesFeatureKey, fromMessages.reducer),
    EffectsModule.forFeature([MessagesEffects]),
  ],
  providers: [DashboardGuard, AuthInterceptorProvider],
  exports: [ModalComponent]

})
export class DashboardModule { }
