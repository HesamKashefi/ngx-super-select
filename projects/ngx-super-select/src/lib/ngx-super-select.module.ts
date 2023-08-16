import { NgModule } from '@angular/core';
import { NgxSuperSelectComponent } from './ngx-super-select.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NgxSuperSelectComponent
  ],
  imports: [
    FormsModule
  ],
  exports: [
    NgxSuperSelectComponent
  ]
})
export class NgxSuperSelectModule { }
