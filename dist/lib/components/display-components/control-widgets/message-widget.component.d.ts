import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import * as i0 from "@angular/core";
/**
 * MessageWidget displays an icon with an optional badge counter, useful for unread message notifications.
 *
 * @selector app-message-widget
 * @standalone true
 * @imports CommonModule, FontAwesomeModule
 *
 * @inputs
 * - `icon` (IconDefinition): FontAwesome icon to represent the message feature.
 * - `iconColor` (string): Color of the icon. Default is 'black'.
 * - `badgeValue` (number): Numeric value displayed in the badge, e.g., unread message count.
 * - `showBadge` (boolean): Controls the visibility of the badge. Default is false.
 *
 * @example
 * ```html
 * <app-message-widget
 *   [icon]="faEnvelope"
 *   iconColor="blue"
 *   [badgeValue]="3"
 *   [showBadge]="true"
 * ></app-message-widget>
 * ```
 **/
export declare class MessageWidget {
    icon: IconDefinition;
    iconColor: string;
    badgeValue: number;
    showBadge: boolean;
    constructor(icon: IconDefinition, iconColor: string, badgeValue: number, showBadge: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageWidget, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MessageWidget, "app-message-widget", never, { "icon": { "alias": "icon"; "required": false; }; "iconColor": { "alias": "iconColor"; "required": false; }; "badgeValue": { "alias": "badgeValue"; "required": false; }; "showBadge": { "alias": "showBadge"; "required": false; }; }, {}, never, never, true, never>;
}
