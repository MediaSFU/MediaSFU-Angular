import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import * as i0 from "@angular/core";
interface RecordButton {
    icon?: IconDefinition;
    active?: boolean;
    onPress?: () => void;
    activeColor?: string;
    inActiveColor?: string;
    text?: string;
}
export declare class MenuRecordWidget {
    buttons: RecordButton[];
    direction: 'horizontal' | 'vertical';
    constructor(buttons: RecordButton[], direction: 'horizontal' | 'vertical');
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuRecordWidget, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenuRecordWidget, "app-menu-record-widget", never, {}, {}, never, never, true, never>;
}
export {};
