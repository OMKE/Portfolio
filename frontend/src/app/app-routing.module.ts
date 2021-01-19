import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './landing/index/index.component';
import { AboutMeComponent } from './landing/about-me/about-me.component';
import { WorksComponent } from './landing/works/works.component';
import { WorkComponent } from './landing/work/work.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';




const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: { page: 'HomePage' }
  },
  {
    path: 'about-me',
    component: AboutMeComponent,
    data: { page: 'AboutMePage' }
  },
  {
    path: 'works',
    component: WorksComponent,
    data: { page: 'WorksPage' }
  },
  {
    path: 'works/:id',
    component: WorkComponent,
    data: { page: 'WorkPage' },
  },
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
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', initialNavigation: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
