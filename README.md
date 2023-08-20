# NgxSuperSelect

This is a multi choice drop down for Angular


## Build Status

[![Build](https://github.com/HesamKashefi/ngx-super-select/actions/workflows/build.yml/badge.svg)](https://github.com/HesamKashefi/ngx-super-select/actions/workflows/build.yml)

---
### [Live Demo on Stackblitz](https://stackblitz.com/edit/ngxsuperselect-demo)

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

options: NgxSuperSelectOptions = {
    actionsEnabled: true,
    displayExpr: 'name',
    valueExpr: 'name',
    placeholder: 'select',
    searchEnabled: true
}

```
in your component.html file:
```
<ngx-super-select [dataSource]="data"
                  [options]="options">

</ngx-super-select>

  ```

or use it in a form:
```

data: { name: string }[] = [
    { name: 'hesam' },
    { name: 'kashefi' }
];

options: NgxSuperSelectOptions = {
    actionsEnabled: true,
    displayExpr: 'name',
    valueExpr: 'name',
    placeholder: 'select',
    searchEnabled: true
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
