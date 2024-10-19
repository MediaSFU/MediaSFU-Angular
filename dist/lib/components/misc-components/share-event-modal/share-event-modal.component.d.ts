import { EventType } from '../../../@types/types';
import * as i0 from "@angular/core";
export interface ShareEventModalOptions {
    backgroundColor?: string;
    isShareEventModalVisible: boolean;
    onShareEventClose: () => void;
    shareButtons?: boolean;
    position?: string;
    roomName: string;
    adminPasscode?: string;
    islevel?: string;
    eventType: EventType;
}
export type ShareEventModalType = (options: ShareEventModalOptions) => void;
/**
 * Component for displaying a modal to share event details.
 *
 * @component
 * @selector app-share-event-modal
 * @templateUrl ./share-event-modal.component.html
 * @styleUrls ./share-event-modal.component.css
 *
 * @imports CommonModule, FontAwesomeModule, MeetingIdComponent, MeetingPasscodeComponent, ShareButtonsComponent
 *
 * @property {string} backgroundColor - Background color of the modal content.
 * @property {boolean} isShareEventModalVisible - Visibility state of the share event modal.
 * @property {Function} onShareEventClose - Callback function to handle modal close event.
 * @property {string} roomName - Name of the room to be shared.
 * @property {string} adminPasscode - Admin passcode for the room.
 * @property {string} islevel - Level of the event (e.g., admin, user).
 * @property {string} position - Position of the modal on the screen (e.g., topRight, bottomLeft).
 * @property {boolean} shareButtons - Flag to display share buttons in the modal.
 * @property {EventType} eventType - Type of event (e.g., chat, broadcast, webinar).
 *
 * @method handleClose - Closes the share event modal by invoking the onShareEventClose callback.
 *
 * @getter modalContainerStyle - Returns the style object for the modal container.
 * @getter modalContentStyle - Returns the style object for the modal content.
 */
export declare class ShareEventModal {
    backgroundColor: string;
    isShareEventModalVisible: boolean;
    onShareEventClose: () => void;
    roomName: string;
    adminPasscode: string;
    islevel: string;
    position: string;
    shareButtons: boolean;
    eventType: EventType;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    handleClose(): void;
    get modalContainerStyle(): {
        position: string;
        top: number;
        left: number;
        width: string;
        height: string;
        backgroundColor: string;
        display: string;
        zIndex: number;
    };
    get modalContentStyle(): {
        position: string;
        backgroundColor: string;
        borderRadius: string;
        padding: string;
        width: string;
        maxHeight: string;
        overflowY: string;
        top: string;
        bottom: string;
        left: string;
        right: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<ShareEventModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ShareEventModal, "app-share-event-modal", never, { "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "isShareEventModalVisible": { "alias": "isShareEventModalVisible"; "required": false; }; "onShareEventClose": { "alias": "onShareEventClose"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "adminPasscode": { "alias": "adminPasscode"; "required": false; }; "islevel": { "alias": "islevel"; "required": false; }; "position": { "alias": "position"; "required": false; }; "shareButtons": { "alias": "shareButtons"; "required": false; }; "eventType": { "alias": "eventType"; "required": false; }; }, {}, never, never, true, never>;
}
