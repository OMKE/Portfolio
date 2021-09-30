import { QuillModule } from 'ngx-quill';
import { ExperienceEffects } from './../core/store/experience/experience.effects';
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
import { StoreModule } from '@ngrx/store';
import * as fromMessages from './store/messages/messages.reducer';
import * as fromExperiences from '../core/store/experience/experience.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MessagesEffects } from './store/messages/messages.effects';
import { MessagesListComponent } from './pages/messages/messages-list/messages-list.component';
import { MessagesListItemComponent } from './pages/messages/messages-list-item/messages-list-item.component';
import { MessageComponent } from './pages/messages/message/message.component';
import { ModalComponent } from './common/dashboard-modal/dashboard-modal.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutMeFormComponent } from './pages/about-me/about-me-form/about-me-form.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardNavbarComponent,
    MessagesComponent,
    DashboardHeadingComponent,
    MessagesListComponent,
    MessagesListItemComponent,
    MessageComponent,
    ModalComponent,
    AboutMeComponent,
    AboutMeFormComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    QuillModule.forRoot(),
    StoreModule.forFeature(
      fromMessages.messagesFeatureKey,
      fromMessages.reducer
    ),
    EffectsModule.forFeature([MessagesEffects, ExperienceEffects]),
    StoreModule.forFeature(
      fromExperiences.experiencesFeatureKey,
      fromExperiences.experienceReducer
    ),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [DashboardGuard, AuthInterceptorProvider],
  exports: [ModalComponent, DashboardHeadingComponent],
})
export class DashboardModule {}
