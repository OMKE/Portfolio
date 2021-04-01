import { ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from './../../dashboard.module';
import { ExperienceRoutingModule } from './experience-routing.module';
import { SharedModule } from './../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ExperienceTableComponent } from './experience-table/experience-table.component';
import { ExperiencesComponent } from './experiences.component';
import { AddExperienceComponent } from './add-experience/add-experience.component';

import { NgModule } from '@angular/core';
import { EditExperienceComponent } from './edit-experience/edit-experience.component';
import { EditExperienceFormComponent } from './edit-experience/edit-experience-form/edit-experience-form.component';

@NgModule({
  declarations: [
    ExperiencesComponent,
    ExperienceTableComponent,
    AddExperienceComponent,
    EditExperienceComponent,
    EditExperienceFormComponent,
  ],
  imports: [
    CommonModule,
    ExperienceRoutingModule,
    ReactiveFormsModule,
    DashboardModule,
    SharedModule,
  ],
  exports: [],
})
export class ExperienceModule {}
