export class NgxSuperSelectOptions {
    actionsEnabled: boolean = true;
    searchEnabled: boolean = true;
    placeholder: string = '';
    displayExpr: string = '';
    valueExpr: string = '';
    enableDarkMode = false;
    selectionMode: 'single' | 'multiple' = 'multiple';
    enableChips: boolean = true;
    searchEventDelay: number = 500;

    /**
     * this value will be used when there is no item selected in single selection mode
     */
    singleSelectionModeDefaultValue: any = undefined;
}

export const NgxSuperSelectOptionsDefaults: NgxSuperSelectOptions = {
    actionsEnabled: true,
    displayExpr: '',
    valueExpr: '',
    placeholder: 'Select',
    searchEnabled: true,
    enableDarkMode: false,
    selectionMode: 'multiple',
    singleSelectionModeDefaultValue: undefined,
    enableChips: true,
    searchEventDelay:500,
};