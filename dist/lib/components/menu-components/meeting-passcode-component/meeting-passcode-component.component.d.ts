import * as i0 from "@angular/core";
export interface MeetingPasscodeComponentOptions {
    meetingPasscode: string;
}
export type MeetingPasscodeComponentType = (options: MeetingPasscodeComponentOptions) => HTMLElement;
/**
 * Component for displaying and managing a meeting passcode.
 *
 * @selector app-meeting-passcode-component
 * @standalone true
 * @templateUrl ./meeting-passcode-component.component.html
 * @styleUrls ./meeting-passcode-component.component.css
 *
 * @example
 * ```html
 * <app-meeting-passcode-component [meetingPasscode]="'ABC123'"></app-meeting-passcode-component>
 * ```
 */
export declare class MeetingPasscodeComponent {
    meetingPasscode: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MeetingPasscodeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MeetingPasscodeComponent, "app-meeting-passcode-component", never, { "meetingPasscode": { "alias": "meetingPasscode"; "required": false; }; }, {}, never, never, true, never>;
}
