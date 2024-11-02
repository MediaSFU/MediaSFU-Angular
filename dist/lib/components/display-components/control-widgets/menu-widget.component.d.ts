import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import * as i0 from "@angular/core";
/**
 * MenuWidget displays an icon with an optional badge counter, used for notifications or alerts.
 *
 * @selector app-menu-widget
 * @standalone true
 * @imports CommonModule, FontAwesomeModule
 *
 * @inputs
 * - `icon` (IconDefinition): FontAwesome icon to display.
 * - `iconColor` (string): Color of the icon. Default is 'black'.
 * - `badgeValue` (number): The numeric value displayed within the badge.
 * - `showBadge` (boolean): Controls the visibility of the badge. Default is false.
 *
 * @example
 * ```html
 * <app-menu-widget
 *   [icon]="faBell"
 *   iconColor="blue"
 *   [badgeValue]="5"
 *   [showBadge]="true"
 * ></app-menu-widget>
 * ```
 **/
export declare class MenuWidget {
    icon: IconDefinition;
    iconColor: string;
    badgeValue: number;
    showBadge: boolean;
    constructor(icon: IconDefinition, iconColor: string, badgeValue: number, showBadge: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuWidget, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenuWidget, "app-menu-widget", never, { "icon": { "alias": "icon"; "required": false; }; "iconColor": { "alias": "iconColor"; "required": false; }; "badgeValue": { "alias": "badgeValue"; "required": false; }; "showBadge": { "alias": "showBadge"; "required": false; }; }, {}, never, never, true, never>;
}
