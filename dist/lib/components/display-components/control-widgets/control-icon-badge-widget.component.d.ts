import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import * as i0 from "@angular/core";
export declare class ControlIconBadgeWidgetComponent {
    icon: IconDefinition;
    iconColor: string;
    badgeValue: number | string;
    showBadge: boolean;
    get normalizedBadgeValue(): string;
    get isDotBadge(): boolean;
    get shouldRenderBadge(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ControlIconBadgeWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ControlIconBadgeWidgetComponent, "app-control-icon-badge-widget", never, { "icon": { "alias": "icon"; "required": false; }; "iconColor": { "alias": "iconColor"; "required": false; }; "badgeValue": { "alias": "badgeValue"; "required": false; }; "showBadge": { "alias": "showBadge"; "required": false; }; }, {}, never, never, true, never>;
}
