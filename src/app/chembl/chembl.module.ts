import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './activities/activities.component';
import {PaginationModule} from "ng2-bootstrap";
import {FormsModule} from "@angular/forms";
import {ShareModule} from "../share/share.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShareModule,
    PaginationModule.forRoot()
  ],
  declarations: [ActivitiesComponent],
  exports: [
    ActivitiesComponent
  ]
})
export class ChemblModule { }
