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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
