import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSuperSelectOptions } from 'ngx-super-select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: { id: number, name: string }[] = [
    { id: 1, name: 'hesam' },
    { id: 2, name: 'kashefi' }
  ];

  //#region multiple selection mode form

  options: Partial<NgxSuperSelectOptions> = {
    actionsEnabled: true,
    displayExpr: 'name',
    valueExpr: 'id',
    placeholder: 'Names',
    searchEnabled: true,
    enableDarkMode: false,
    selectionMode: 'multiple',
    singleSelectionModeDefaultValue: undefined
  };

  form = new FormGroup({
    names: new FormControl([])
  });

  onFormSubmit() {
    alert(this.form.value.names?.join(', '));
  }

  //#region multiple selection mode form

  //#region single selection mode form

  formSingleModeOptions: Partial<NgxSuperSelectOptions> = {
    selectionMode: 'single',
    singleSelectionModeDefaultValue: null
  };

  formSingleMode = new FormGroup({
    item: new FormControl(null)
  });

  onFormSingleModeSubmit() {
    alert(this.formSingleMode.value.item);
  }

  //#endregion single selection mode form

  searchedTerm = '';
  onSearchChanged(searchedTerm: string) {
    this.searchedTerm = searchedTerm;
  }
}
