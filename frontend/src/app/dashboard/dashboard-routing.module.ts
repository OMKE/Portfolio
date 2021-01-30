import { ExperiencesComponent } from './pages/experiences/experiences.component';
import { MessagesComponent } from './pages/messages/messages.component';


import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'messages',
        pathMatch: 'full'
      },
      {
        path: 'messages',
        component: MessagesComponent
      },
      {
        path: 'experiences',
        component: ExperiencesComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
