import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { SharedModule } from './shared/shared.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';

import { reducers, metaReducers } from './core/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { IndexComponent } from './landing/index/index.component';
import { HeaderComponent } from './landing/index/header/header.component';
import { AboutmeComponent } from './landing/aboutme/aboutme.component';
import { ExperienceComponent } from './landing/index/experience/experience.component';
import { ExperienceItemComponent } from './landing/index/experience/experience-item/experience-item.component';
import { ContactComponent } from './landing/index/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { AboutMeHeaderComponent } from './landing/aboutme/about-me-header/about-me-header.component';
import { AboutMeContentComponent } from './landing/aboutme/about-me-content/about-me-content.component';
import { AboutMeEffects } from './core/store/about-me/about-me.effects';
import { AboutMeBiographyComponent } from './landing/aboutme/about-me-biography/about-me-biography.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    AboutmeComponent,
    ExperienceComponent,
    ExperienceItemComponent,
    ContactComponent,
    AboutMeHeaderComponent,
    AboutMeContentComponent,
    AboutMeBiographyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([AboutMeEffects]),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
