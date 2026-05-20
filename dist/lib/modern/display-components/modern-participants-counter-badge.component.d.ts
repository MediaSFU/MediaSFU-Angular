import * as i0 from "@angular/core";
export type ModernBadgePosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
export declare class ModernParticipantsCounterBadgeComponent {
    participantsCount: number;
    position: ModernBadgePosition;
    showBadge: boolean;
    backgroundColor?: string;
    textColor?: string;
    isDarkMode: boolean;
    customStyle: Record<string, string | number>;
    readonly faUsers: import("@fortawesome/fontawesome-common-types").IconDefinition;
    get containerStyle(): Record<string, string | number>;
    get badgeStyle(): Record<string, string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModernParticipantsCounterBadgeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModernParticipantsCounterBadgeComponent, "app-modern-participants-counter-badge", never, { "participantsCount": { "alias": "participantsCount"; "required": false; }; "position": { "alias": "position"; "required": false; }; "showBadge": { "alias": "showBadge"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "textColor": { "alias": "textColor"; "required": false; }; "isDarkMode": { "alias": "isDarkMode"; "required": false; }; "customStyle": { "alias": "customStyle"; "required": false; }; }, {}, never, never, true, never>;
}
