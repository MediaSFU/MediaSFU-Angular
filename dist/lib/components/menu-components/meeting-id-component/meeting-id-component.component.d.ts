import * as i0 from "@angular/core";
export interface MeetingIdComponentOptions {
    meetingID?: string;
}
export type MeetingIdComponentType = (options: MeetingIdComponentOptions) => HTMLElement;
/**
 * Component representing a meeting ID.
 *
 * @selector app-meeting-id-component
 * @templateUrl ./meeting-id-component.component.html
 * @styleUrls ./meeting-id-component.component.css
 * @standalone true
 */
export declare class MeetingIdComponent {
    meetingID: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MeetingIdComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MeetingIdComponent, "app-meeting-id-component", never, { "meetingID": { "alias": "meetingID"; "required": false; }; }, {}, never, never, true, never>;
}
