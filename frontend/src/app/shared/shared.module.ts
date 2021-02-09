import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { StripHtmlPipe } from './pipes/strip-html.pipe';
import { WordLimitPipe } from './pipes/word-limit.pipe';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ChasingDotsLoaderComponent } from './components/chasing-dots-loader/chasing-dots-loader.component';
import { ThrottleClickDirective } from './directives/throttle-click.directive';
import { OvalLoaderComponent } from './components/oval-loader/oval-loader.component';
import { StatusIconComponent } from './components/status-icon/status-icon.component';
import { EnumeratePipe } from './pipes/enumerate.pipe';




@NgModule({
  declarations: [NavbarComponent, FooterComponent, StripHtmlPipe, WordLimitPipe, NotFoundComponent, ChasingDotsLoaderComponent, ThrottleClickDirective, OvalLoaderComponent, StatusIconComponent, EnumeratePipe],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    StripHtmlPipe,
    WordLimitPipe,
    ChasingDotsLoaderComponent,
    ThrottleClickDirective,
    OvalLoaderComponent,
    StatusIconComponent,
    EnumeratePipe
  ]
})
export class SharedModule { }
