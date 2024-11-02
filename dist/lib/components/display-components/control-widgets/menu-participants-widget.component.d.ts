import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import * as i0 from "@angular/core";
/**
 * MenuParticipantsWidget displays an icon and a counter for participants in a compact, customizable widget.
 *
 * @selector app-menu-participants-widget
 * @standalone true
 * @imports CommonModule, FontAwesomeModule
 *
 * @inputs
 * - `icon` (IconDefinition): The FontAwesome icon to display.
 * - `iconColor` (string): The color of the icon. Default is 'black'.
 * - `participantsCounter` (number): The number of participants displayed next to the icon.
 *
 * @example
 * ```html
 * <app-menu-participants-widget
 *   [icon]="faUsers"
 *   iconColor="blue"
 *   [participantsCounter]="10"
 * ></app-menu-participants-widget>
 * ```
 **/
export declare class MenuParticipantsWidget {
    icon: IconDefinition;
    iconColor: string;
    participantsCounter: number;
    constructor(icon: IconDefinition, iconColor: string, participantsCounter: number);
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuParticipantsWidget, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenuParticipantsWidget, "app-menu-participants-widget", never, { "icon": { "alias": "icon"; "required": false; }; "iconColor": { "alias": "iconColor"; "required": false; }; "participantsCounter": { "alias": "participantsCounter"; "required": false; }; }, {}, never, never, true, never>;
}
