import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export interface ModernFieldOption {
    label: string;
    value: string;
}
export declare class ModernFieldComponent implements ControlValueAccessor {
    controlType: 'input' | 'select' | 'textarea';
    type: string;
    label: string;
    hint: string;
    placeholder: string;
    inputMode: string;
    autocomplete: string;
    rows: number;
    options: ReadonlyArray<ModernFieldOption>;
    blurred: EventEmitter<void>;
    internalValue: string;
    isDisabled: boolean;
    private onChange;
    private onTouched;
    writeValue(value: string | null | undefined): void;
    registerOnChange(fn: (value: string) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    handleValueChange(event: Event): void;
    handleBlur(): void;
    trackOption: (_index: number, option: ModernFieldOption) => string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModernFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModernFieldComponent, "app-modern-field", never, { "controlType": { "alias": "controlType"; "required": false; }; "type": { "alias": "type"; "required": false; }; "label": { "alias": "label"; "required": false; }; "hint": { "alias": "hint"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "inputMode": { "alias": "inputMode"; "required": false; }; "autocomplete": { "alias": "autocomplete"; "required": false; }; "rows": { "alias": "rows"; "required": false; }; "options": { "alias": "options"; "required": false; }; }, { "blurred": "blurred"; }, never, never, true, never>;
}
