export class NgxSuperSelectOptions {
    actionsEnabled = true;
    searchEnabled = true;
    placeholder = '';
    displayExpr = '';
    valueExpr = '';
    enableDarkMode = false;
    selectionMode: 'single' | 'multiple' = 'multiple';

    /**
     * this value will be used when there is no item selected in single selection mode
     */
    singleSelectionModeDefaultValue: any = undefined;
}

export const NgxSuperSelectOptionsDefulats: NgxSuperSelectOptions = {
    actionsEnabled: true,
    displayExpr: '',
    valueExpr: '',
    placeholder: 'Select',
    searchEnabled: true,
    enableDarkMode: false,
    selectionMode: 'multiple',
    singleSelectionModeDefaultValue: undefined
};