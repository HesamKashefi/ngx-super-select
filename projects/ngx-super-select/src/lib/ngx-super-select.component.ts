import { Component, EventEmitter, HostListener, Input, Output, forwardRef } from '@angular/core';
import { NgxSuperSelectOptions, NgxSuperSelectOptionsDefaults } from './ngx-super-select-options';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxSuperSelectService } from './ngx-super-select.service';

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
    if (Array.isArray(obj) && this.options.selectionMode === 'multiple') {
      this.selectedItemValues = obj;
    }
    else if (this.options.selectionMode === 'single' && obj !== this.options.singleSelectionModeDefaultValue) {
      this.selectedItemValues = [obj];
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

  _options: NgxSuperSelectOptions = NgxSuperSelectOptionsDefaults;
  @Input()
  set options(value: Partial<NgxSuperSelectOptions>) {
    this._options = { ...NgxSuperSelectOptionsDefaults, ...value };
  };
  get options(): NgxSuperSelectOptions {
    return this._options;
  }

  /**
   * the list of the selected values
   * these values get checked againts valueExpr of the items in dataSource
   * e.g. disabledItemValues[0] === dataSource[0][valueExpr]
   */
  @Input()
  selectedItemValues: any[] = [];

  /**
   * the list of the disabled item values
   * these values get checked againts valueExpr of the items in dataSource
   * e.g. disabledItemValues[0] === dataSource[0][valueExpr]
   */
  @Input()
  disabledItemValues: any[] = [];

  @Output()
  selectionChanged = new EventEmitter<any[]>();

  /**
   * The state of the popup
   */
  isOpen = false;

  /**
   * the current searched phrase
   */
  searchText = '';

  /**
   * unique id of this instance
   */
  private selectId: string = '';

  constructor(private ngxSuperSelectService: NgxSuperSelectService) {
    this.registerSelect();
  }

  /**
   * register this instance for a central control over all instances
   */
  private registerSelect() {
    this.selectId = new Date().getTime().toString() + '_' + Math.random();
    this.ngxSuperSelectService.register(this.selectId);
    this.ngxSuperSelectService.popupOpened$.subscribe(id => {
      if (id !== this.selectId) {
        this.isOpen = false;
      }
    });
  }

  onBoxClicked(e: any) {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      if (this.isOpen)
        this.ngxSuperSelectService.onOpenedSelectPopup(this.selectId);
    }
    e.stopPropagation();
    e.preventDefault();
    this.searchText = '';
  }

  onItemClicked(e: any, item: any) {
    if (!this.isItemDisabled(item)) {
      const value = this.getValue(item);
      if (this.options.selectionMode === 'multiple') {
        const index = this.selectedItemValues.findIndex(x => x === value);
        if (index < 0) {
          const item = [...this.selectedItemValues];
          item.push(value);
          this.selectedItemValues = item;
        }
        else {
          const item = [...this.selectedItemValues];
          item.splice(index, 1);
          this.selectedItemValues = item;
        }
      }
      else {
        this.selectedItemValues = [value];
      }
    }
    this.handleActionButtonEvent(e);
  }

  onSelectAllClicked(e: any) {
    this.selectedItemValues = this.dataSource
      .filter(x => !this.isItemDisabled(x) || this.isItemSelected(x))
      .map(x => this.getValue(x));
    this.handleActionButtonEvent(e);
  }

  onInvertSelectionClicked(e: any) {
    this.selectedItemValues = this.dataSource
      .filter(x => {
        if (this.isItemDisabled(x)) return this.isItemSelected(x);
        return !this.isItemSelected(x);
      })
      .map(x => this.getValue(x));
    this.handleActionButtonEvent(e);
  }

  onClearClicked(e: any) {
    this.selectedItemValues = this.dataSource
      .filter(x => this.isItemDisabled(x) && this.isItemSelected(x))
      .map(x => this.getValue(x));
    this.handleActionButtonEvent(e);
  }

  handleActionButtonEvent(e: any) {
    e.stopPropagation();
    e.preventDefault();

    if (this._onTouch) {
      this._onTouch();
    }

    if (this.options.selectionMode === 'multiple') {
      if (this._onChange) {
        this._onChange(this.selectedItemValues);
      }
      this.selectionChanged.emit(this.selectedItemValues);

    }
    else {
      const value = this.selectedItemValues.length > 0 ? this.selectedItemValues[0] : this.options.singleSelectionModeDefaultValue;

      if (this._onChange) {
        this._onChange(value);
      }
      this.selectionChanged.emit(value);
    }
  }

  onPopupClicked(e: any) {
    e.stopPropagation();
    e.preventDefault();
  }

  isItemSelected(item: any) {
    return this.selectedItemValues.findIndex(x => x === this.getValue(item)) >= 0;
  }

  isItemDisabled(item: any) {
    return this.disabledItemValues.findIndex(x => x === this.getValue(item)) >= 0
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

  getNameForValue(obj: any): string {
    if (this.options.displayExpr?.trim() === '') {
      return obj + '';
    }
    const index = this.dataSource.findIndex(x => this.getValue(x) === obj);
    if (index < 0) {
      return obj + '';
    }
    const value = this.dataSource[index][this.options.displayExpr];
    if (value !== undefined)
      return value + '';
    return obj + '';
  }

  getName(obj: any): string {
    if (this.options.displayExpr?.trim() === '') {
      return obj + '';
    }
    const value = obj[this.options.displayExpr];
    if (value !== undefined)
      return value + '';
    return obj + '';
  }

  getValue(obj: any): number {
    if (this.options.valueExpr?.trim() === '') {
      return obj;
    }
    const value = obj[this.options.valueExpr];
    if (value !== undefined)
      return value;
    return obj;
  }
}
