import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { SharedModule } from './../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import * as fromAuth from './auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';



const AuthInterceptorProvider = {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
};


@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [AuthComponent],
  providers: [AuthInterceptorProvider, AuthGuard]

})
export class AuthModule { }
