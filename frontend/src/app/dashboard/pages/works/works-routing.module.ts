import { WorksListComponent } from './works-list/works-list.component';
import { WorkComponent } from './work/work.component';
import { AddWorkComponent } from './add-work/add-work.component';
import { WorksComponent } from './works.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: WorksComponent,
    children: [
      {
        path: '',
        component: WorksListComponent,
      },
      {
        path: 'add',
        component: AddWorkComponent,
      },
      {
        path: ':id',
        component: WorkComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorksRoutingModule {}
