import { Component, EventEmitter, HostListener, Input, Output, forwardRef } from '@angular/core';
import { NgxSuperSelectOptions, NgxSuperSelectOptionsDefulats } from './ngx-super-select-options';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ngx-super-select',
  templateUrl: './ngx-super-select.component.html',
  styleUrls: ['./ngx-super-select.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgxSuperSelectComponent), multi: true }],
})
export class NgxSuperSelectComponent implements ControlValueAccessor {
  //#region ControlValueAccessor
  private _onTouch: any;
  private _onChange: any;

  writeValue(obj: any): void {
    if (Array.isArray(obj)) {
      this.selectedItemValues = obj;
    }
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  //#endregion ControlValueAccessor

  @HostListener('document:click') onDocumentClicked() {
    this.isOpen = false;
  }

  @Input()
  dataSource: any[] = [];

  @Input()
  disabled: boolean = false;

  _options: NgxSuperSelectOptions = NgxSuperSelectOptionsDefulats;
  @Input()
  set options(value: NgxSuperSelectOptions) {
    this._options = { ...NgxSuperSelectOptionsDefulats, ...value };
  };
  get options(): NgxSuperSelectOptions {
    return this._options;
  }

  @Input()
  selectedItemValues: any[] = [];

  @Output()
  selectionChanged = new EventEmitter<any[]>();

  isOpen = false;
  searchText = '';

  onBoxClicked(e: any) {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
    e.stopPropagation();
    e.preventDefault();
    this.searchText = '';
  }

  onItemClicked(e: any, item: any) {
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
    this.handleActionButtonEvent(e);
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

    if (this._onTouch) {
      this._onTouch();
    }

    if (this._onChange) {
      this._onChange(this.selectedItemValues);
    }
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
    return obj[this.options.displayExpr] || obj;
  }

  getValue(obj: any): number {
    return obj[this.options.valueExpr] || obj;
  }
}
