import { SharedModule } from './shared/shared.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
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


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    AboutmeComponent,
    ExperienceComponent,
    ExperienceItemComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
