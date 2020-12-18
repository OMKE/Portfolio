import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { IndexComponent } from './landing/index/index.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutMeComponent } from './landing/about-me/about-me.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: { animation: 'HomePage' }
  },
  {
    path: 'about-me',
    component: AboutMeComponent,
    data: { animation: 'AboutMePage' }
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
