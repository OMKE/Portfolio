import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExperienceTableComponent } from './experience-table/experience-table.component';
import { ExperiencesComponent } from './experiences.component';
import { AddExperienceComponent } from './add-experience/add-experience.component';

const routes: Routes = [
  {
    path: '',
    component: ExperiencesComponent,
    children: [
      {
        path: '',
        component: ExperienceTableComponent,
      },
      {
        path: 'add',
        component: AddExperienceComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExperienceRoutingModule {}
