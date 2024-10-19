import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import * as i0 from "@angular/core";
export declare class MenuWidget {
    icon: IconDefinition;
    iconColor: string;
    badgeValue: number;
    showBadge: boolean;
    constructor(icon: IconDefinition, iconColor: string, badgeValue: number, showBadge: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuWidget, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenuWidget, "app-menu-widget", never, { "icon": { "alias": "icon"; "required": false; }; "iconColor": { "alias": "iconColor"; "required": false; }; "badgeValue": { "alias": "badgeValue"; "required": false; }; "showBadge": { "alias": "showBadge"; "required": false; }; }, {}, never, never, true, never>;
}
