import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxSuperSelectComponent } from './ngx-super-select.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    NgxSuperSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NgxSuperSelectComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class NgxSuperSelectModule { }
