import { WorkComponent } from './pages/works/work/work.component';
import { AddWorkComponent } from './pages/works/add-work/add-work.component';
import { WorksComponent } from './pages/works/works.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagesComponent } from './pages/messages/messages.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'messages',
        pathMatch: 'full',
      },
      {
        path: 'messages',
        component: MessagesComponent,
      },
      {
        path: 'experiences',
        loadChildren: () =>
          import('./pages/experiences/experiences.module').then(
            (m) => m.ExperienceModule
          ),
      },
      {
        path: 'about-me',
        component: AboutMeComponent,
      },
      {
        path: 'works',
        loadChildren: () =>
          import('./pages/works/works.module').then((m) => m.WorksModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
