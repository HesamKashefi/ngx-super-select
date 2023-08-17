import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgxSuperSelectOptions, NgxSuperSelectOptionsDefulats } from './ngx-super-select-options';

@Component({
  selector: 'ngx-super-select',
  templateUrl: './ngx-super-select.component.html',
  styleUrls: ['./ngx-super-select.component.scss']
})
export class NgxSuperSelectComponent {

  @HostListener('document:click') onDocumentClicked() {
    this.isOpen = false;
  }

  @Input()
  dataSource: any[] = [];

  _options: NgxSuperSelectOptions = NgxSuperSelectOptionsDefulats;
  @Input()
  set options(value: NgxSuperSelectOptions) {
    this._options = { ...NgxSuperSelectOptionsDefulats, ...value };
  };
  get options(): NgxSuperSelectOptions {
    return this._options;
  }

  @Input()
  selectedItemValues: number[] = [];

  @Output()
  selectionChanged = new EventEmitter<any[]>();

  isOpen = false;
  searchText = '';

  onBoxClicked(e: any) {
    this.isOpen = !this.isOpen;
    e.stopPropagation();
    e.preventDefault();
    this.searchText = '';
  }

  onItemClicked(e: any, item: any) {
    e.stopPropagation();
    e.preventDefault();

    const index = this.selectedItemValues.findIndex(x => x === this.getValue(item));
    if (index < 0) {
      const a = [...this.selectedItemValues];
      a.push(this.getValue(item));
      this.selectedItemValues = a;
    }
    else {
      const a = [...this.selectedItemValues];
      a.splice(index, 1);
      this.selectedItemValues = a;
    }

    this.selectionChanged.emit(this.selectedItemValues);
  }

  onSelectAllClicked(e: any) {
    this.selectedItemValues = this.dataSource.map(x => this.getValue(x));
    this.handleActionButtonEvent(e);
  }

  onInvertSelectionClicked(e: any) {
    this.selectedItemValues = this.dataSource.filter(i => !this.isSelected(i)).map(x => this.getValue(x));
    this.handleActionButtonEvent(e);
  }

  onClearClicked(e: any) {
    this.selectedItemValues = [];
    this.handleActionButtonEvent(e);
  }

  handleActionButtonEvent(e: any) {
    e.stopPropagation();
    e.preventDefault();
    this.selectionChanged.emit(this.selectedItemValues);
  }

  onPopupClicked(e: any) {
    e.stopPropagation();
    e.preventDefault();
  }

  isSelected(item: any) {
    return this.selectedItemValues.findIndex(x => x === this.getValue(item)) >= 0;
  }

  getFilteredItems() {
    const val = this.searchText.trim().toLocaleLowerCase();
    if (val === '') {
      return this.dataSource;
    }
    else {
      return this.dataSource.filter(x => this.getName(x).toLocaleLowerCase().indexOf(val) >= 0);
    }
  }

  getName(obj: any): string {
    return Object.getOwnPropertyDescriptors(obj)[this.options.displayExpr]?.value || obj;
  }

  getValue(obj: any): number {
    return +Object.getOwnPropertyDescriptors(obj)[this.options.valueExpr]?.value || obj;
  }
}
