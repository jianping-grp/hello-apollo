import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './activities/activities.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ActivitiesComponent],
  exports: [
    ActivitiesComponent
  ]
})
export class ChemblModule { }
