import { QuillModule } from 'ngx-quill';
import { WorksRoutingModule } from './works-routing.module';
import { SharedModule } from './../../../shared/shared.module';
import { DashboardModule } from './../../dashboard.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkItemComponent } from './work-item/work-item.component';
import { AddWorkComponent } from './add-work/add-work.component';
import { WorkComponent } from './work/work.component';
import { WorksComponent } from './works.component';
import { NgModule } from '@angular/core';
import { WorksListComponent } from './works-list/works-list.component';
import { WorkImageContainerComponent } from './work/work-image-container/work-image-container.component';
import { EditWorkComponent } from './edit-work/edit-work.component';

@NgModule({
  declarations: [
    WorksComponent,
    WorkComponent,
    AddWorkComponent,
    WorkItemComponent,
    WorksListComponent,
    WorkImageContainerComponent,
    EditWorkComponent,
  ],
  imports: [
    CommonModule,
    WorksRoutingModule,
    ReactiveFormsModule,
    DashboardModule,
    SharedModule,
    QuillModule.forRoot(),
  ],
  exports: [],
})
export class WorksModule {}
