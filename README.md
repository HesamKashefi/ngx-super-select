# NgxSuperSelect

This is a single/multiple choice drop down for Angular with search and other features!

---
### [Live Demo on Stackblitz](https://stackblitz.com/edit/ngxsuperselect-demo)

---
## Features

* Multiple Selection Mode
* Single Selection Mode With Custom Default Value!
* Supports Primitive Data Types (number, string) And Complex Objects
* Search
* Select All | Invert Selection | Clear All
* Angular Forms Support
* Dark Theme And Light Theme Support


## Build Status

|  Build |  NPM Publish  |
|:---:|:---:|
| [![Build](https://github.com/HesamKashefi/ngx-super-select/actions/workflows/build.yml/badge.svg)](https://github.com/HesamKashefi/ngx-super-select/actions/workflows/build.yml) | [![publish-npm-package](https://github.com/HesamKashefi/ngx-super-select/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/HesamKashefi/ngx-super-select/actions/workflows/npm-publish.yml) |


## Install

```
> npm i ngx-super-select
```

## Add Imports

in the `app.module.ts` file import `NgxSuperSelectModule` like this:

```

  imports: [
    ...
    NgxSuperSelectModule
  ]

```

## Usage

You can use it as simple as this:
```
 <ngx-super-select [dataSource]="[1,2,3]">
 </ngx-super-select>
```

if you have complex object data then you need to set options:

in your component.ts file
```

data: { name: string }[] = [
    { name: 'hesam' },
    { name: 'kashefi' }
];

options: Partial<NgxSuperSelectOptions> = {
    actionsEnabled: true,
    displayExpr: 'name',
    valueExpr: 'name',
    placeholder: 'select',
    searchEnabled: true,
    enableDarkMode: false
}

```
in your component.html file:
```
<ngx-super-select [dataSource]="data"
                  [options]="options">

</ngx-super-select>

  ```

### Use in a form:
```

data: { name: string }[] = [
    { name: 'hesam' },
    { name: 'kashefi' }
];

options: Partial<NgxSuperSelectOptions> = {
    actionsEnabled: true,
    displayExpr: 'name',
    valueExpr: 'name',
    placeholder: 'select',
    searchEnabled: true,
    enableDarkMode: false
}

form = new FormGroup({
  names: new FormControl([])
});

onFormSubmit() {
  console.log(this.form.value);
}

```

```
  <form [formGroup]="form"
        (submit)="onFormSubmit()">
    <ngx-super-select [dataSource]="data"
                      [options]="options"
                      formControlName="names">

    </ngx-super-select>
    <button type="submit"
            class="btn btn-primary my-2">Submit</button>
  </form>
  ```

  
### Single Selection Mode:

Set selectionMode: 'single' in the options to enable single selection.

You can also use `singleSelectionModeDefaultValue` option to specify the empty value for no selection!

```

 <ngx-super-select formControlName="item"
                   [dataSource]="[1,2,3]"
                   [options]="{ selectionMode: 'single', singleSelectionModeDefaultValue: 0}">

  </ngx-super-select>
    
```
