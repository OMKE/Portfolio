import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { SharedModule } from './shared/shared.module';

import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';

import { reducers, metaReducers } from './core/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { IndexComponent } from './landing/index/index.component';
import { HeaderComponent } from './landing/index/header/header.component';
import { AboutMeComponent } from './landing/about-me/about-me.component';
import { ExperienceComponent } from './landing/index/experience/experience.component';
import { ExperienceItemComponent } from './landing/index/experience/experience-item/experience-item.component';
import { ContactComponent } from './landing/index/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { AboutMeHeaderComponent } from './landing/about-me/about-me-header/about-me-header.component';
import { AboutMeContentComponent } from './landing/about-me/about-me-content/about-me-content.component';
import { AboutMeEffects } from './core/store/about-me/about-me.effects';
import { AboutMeBiographyComponent } from './landing/about-me/about-me-biography/about-me-biography.component';
import { ExperienceEffects } from './core/store/experience/experience.effects';
import { MessageEffects } from './core/store/message/message.effects';
import { WorksComponent } from './landing/works/works.component';
import { WorksHeaderComponent } from './landing/works/works-header/works-header.component';
import { WorksListComponent } from './landing/works/works-list/works-list.component';
import { WorksListItemComponent } from './landing/works/works-list-item/works-list-item.component';
import { WorksListMainItemComponent } from './landing/works/works-list-main-item/works-list-main-item.component';
import { WorksEffects } from './core/store/works/works.effects';
import { WorkComponent } from './landing/work/work.component';
import { WorkHeaderComponent } from './landing/work/work-header/work-header.component';
import { WorkDescriptionComponent } from './landing/work/work-description/work-description.component';
import { WorkImageComponent } from './landing/work/work-image/work-image.component';
import { WorkImageEffects } from './core/store/work-image/work-image.effects';
import { WorkImagesComponent } from './landing/work/work-images/work-images.component';
import { WorkLinksComponent } from './landing/work/work-links/work-links.component';
import { TransferHttpCacheModule } from '@nguniversal/common';



/*
 Docs for Angular Universal, to stop double http calls
 @link - https://github.com/angular/universal/blob/master/docs/transfer-http.md
*/


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    AboutMeComponent,
    ExperienceComponent,
    ExperienceItemComponent,
    ContactComponent,
    AboutMeHeaderComponent,
    AboutMeContentComponent,
    AboutMeBiographyComponent,
    WorksComponent,
    WorksHeaderComponent,
    WorksListComponent,
    WorksListItemComponent,
    WorksListMainItemComponent,
    WorkComponent,
    WorkHeaderComponent,
    WorkDescriptionComponent,
    WorkImageComponent,
    WorkImagesComponent,
    WorkLinksComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'frontend' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([AboutMeEffects, ExperienceEffects, MessageEffects, WorksEffects, WorkImageEffects]),
    StoreRouterConnectingModule.forRoot(),
    TransferHttpCacheModule,
    BrowserTransferStateModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
