import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { EventType } from '../../../@types/types';
import * as i0 from "@angular/core";
export interface ShareButton {
    icon: IconDefinition;
    action: () => void;
    show: boolean;
    color?: string;
    iconColor?: string;
}
export interface ShareButtonsComponentOptions {
    meetingID: string;
    shareButtons?: ShareButton[];
    eventType: EventType;
}
export type ShareButtonsComponentType = (options: ShareButtonsComponentOptions) => HTMLElement;
/**
 * @component ShareButtonsComponent
 * @description This component provides a set of share buttons for different social media platforms and email.
 * It allows users to share a meeting link via various channels.
 *
 * @selector app-share-buttons-component
 * @templateUrl ./share-buttons-component.component.html
 * @styleUrls ./share-buttons-component.component.css
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule]
 *
 * @input {string} meetingID - The ID of the meeting to be shared.
 * @input {ShareButton[]} shareButtons - An array of custom share buttons.
 * @input {string} eventType - The type of event (e.g., 'chat', 'broadcast', 'webinar').
 *
 * @property {ShareButton[]} defaultShareButtons - The default set of share buttons.
 *
 * @getter {string} shareName - Determines the share name based on the event type.
 * @getter {ShareButton[]} filteredShareButtons - Returns the filtered share buttons based on visibility.
 */
export declare class ShareButtonsComponent {
    meetingID: string;
    shareButtons: ShareButton[];
    eventType: EventType;
    defaultShareButtons: ShareButton[];
    get shareName(): "chat" | "broadcast" | "meeting";
    get filteredShareButtons(): ShareButton[];
    static ɵfac: i0.ɵɵFactoryDeclaration<ShareButtonsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ShareButtonsComponent, "app-share-buttons-component", never, { "meetingID": { "alias": "meetingID"; "required": false; }; "shareButtons": { "alias": "shareButtons"; "required": false; }; "eventType": { "alias": "eventType"; "required": false; }; }, {}, never, never, true, never>;
}
