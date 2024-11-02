import { OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export interface AlertComponentOptions {
    visible: boolean;
    message: string;
    type: 'success' | 'danger';
    duration?: number;
    onHide?: () => void;
    textColor?: string;
}
export type AlertComponentType = (options: AlertComponentOptions) => HTMLElement;
/**
 * AlertComponent displays an alert message of type 'success' or 'danger' with customizable options.
 * It can automatically hide after a set duration and includes a manual dismiss option.
 *
 * @selector app-alert-component
 * @standalone true
 * @imports CommonModule
 *
 * @inputs
 * - `visible` (boolean): Determines if the alert is visible. Default is false.
 * - `message` (string): The message displayed in the alert.
 * - `type` ('success' | 'danger'): Type of alert, either 'success' or 'danger'. Default is 'success'.
 * - `duration` (number): Duration in milliseconds for the alert to remain visible before hiding. Default is 4000 ms.
 * - `textColor` (string): Optional color for alert text. Default is 'black'.
 * - `onHide` (function): Optional callback invoked when the alert is hidden.
 *
 * @methods
 * - `ngOnChanges(changes: SimpleChanges)`: Lifecycle hook invoked on input changes; initiates auto-hide based on duration if `visible` is true.
 * - `handlePress()`: Manually hides the alert by invoking the `onHide` callback.
 *
 * @example
 * ```html
 * <app-alert-component
 *  [visible]="showAlert"
 * [message]="alertMessage"
 * [type]="alertType"
 * [duration]="5000"
 * [textColor]="alertTextColor"
 * [onHide]="onAlertHide">
 * </app-alert-component>
 * ```
 **/
export declare class AlertComponent implements OnChanges {
    visible: boolean;
    message: string;
    type: 'success' | 'danger';
    duration: number;
    textColor: string;
    onHide: () => void;
    alertType: 'success' | 'danger';
    ngOnChanges(changes: SimpleChanges): void;
    handlePress(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AlertComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AlertComponent, "app-alert-component", never, { "visible": { "alias": "visible"; "required": false; }; "message": { "alias": "message"; "required": false; }; "type": { "alias": "type"; "required": false; }; "duration": { "alias": "duration"; "required": false; }; "textColor": { "alias": "textColor"; "required": false; }; "onHide": { "alias": "onHide"; "required": false; }; }, {}, never, never, true, never>;
}
