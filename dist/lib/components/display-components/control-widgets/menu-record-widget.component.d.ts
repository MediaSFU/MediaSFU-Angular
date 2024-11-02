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
/**
 * MenuRecordWidget is a configurable widget that displays a set of record control buttons, with customizable icon, color, and actions.
 *
 * @selector app-menu-record-widget
 * @standalone true
 * @imports CommonModule, FontAwesomeModule, ControlButtonsAltComponent
 *
 * @inputs
 * - `buttons` (RecordButton[]): Array of record button configurations, each with properties for icon, active state, colors, and actions.
 * - `direction` ('horizontal' | 'vertical'): Layout direction for the buttons. Default is 'horizontal'.
 *
 * @example
 * ```html
 * <app-menu-record-widget
 *   [buttons]="[
 *     { icon: faCircle, text: 'Record', onPress: startRecording, activeColor: 'red' },
 *     { icon: faStop, text: 'Stop', onPress: stopRecording, inActiveColor: 'gray' }
 *   ]"
 *   direction="horizontal"
 * ></app-menu-record-widget>
 * ```
 **/
export declare class MenuRecordWidget {
    buttons: RecordButton[];
    direction: 'horizontal' | 'vertical';
    constructor(buttons: RecordButton[], direction: 'horizontal' | 'vertical');
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuRecordWidget, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenuRecordWidget, "app-menu-record-widget", never, {}, {}, never, never, true, never>;
}
export {};
