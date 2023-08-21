import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSuperSelectOptions } from 'ngx-super-select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: { name: string }[] = [
    { name: 'hesam' },
    { name: 'kashefi' },
  ];

  options: NgxSuperSelectOptions = {
    actionsEnabled: true,
    displayExpr: 'name',
    valueExpr: 'name',
    placeholder: 'select',
    searchEnabled: true,
    enableDarkMode: false
  };

  form = new FormGroup({
    names: new FormControl([])
  });

  onFormSubmit() {
    console.log(this.form.value);
  }
}
