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
 * AlertComponent is a standalone Angular component that displays an alert message.
 * It supports different types of alerts such as 'success' and 'danger', and can be configured
 * to automatically hide after a specified duration.
 *
 * @selector app-alert-component
 * @standalone true
 * @imports CommonModule
 * @templateUrl ./alert.component.html
 * @styleUrls ./alert.component.css
 *
 * @class AlertComponent
 * @implements OnChanges
 *
 * @property {boolean} visible - Determines if the alert is visible.
 * @property {string} message - The message to be displayed in the alert.
 * @property {'success' | 'danger'} type - The type of alert, either 'success' or 'danger'.
 * @property {number} duration - The duration (in milliseconds) for which the alert is visible before hiding.
 * @property {string} textColor - The color of the text in the alert.
 * @property {() => void} onHide - A callback function that is called when the alert is hidden.
 *
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property of a directive changes.
 * @param {SimpleChanges} changes - An object of changes to the data-bound properties.
 *
 * @method handlePress - Manually hides the alert by calling the onHide callback.
 */
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
