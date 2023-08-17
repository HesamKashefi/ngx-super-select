import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxSuperSelectModule } from 'ngx-super-select';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSuperSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
