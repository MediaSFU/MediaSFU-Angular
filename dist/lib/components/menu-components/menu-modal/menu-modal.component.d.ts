import { CustomButton } from '../custom-buttons/custom-buttons.component';
import { EventType } from '../../../@types/types';
import * as i0 from "@angular/core";
export interface MenuModalOptions {
    backgroundColor?: string;
    isVisible: boolean;
    customButtons?: CustomButton[];
    shareButtons?: boolean;
    position?: string;
    roomName: string;
    adminPasscode: string;
    islevel: string;
    eventType: EventType;
    onClose: () => void;
}
export type MenuModalType = (options: MenuModalOptions) => HTMLElement;
/**
 * @component MenuModal
 *
 * @description
 * The MenuModal component is a standalone Angular component that displays a modal dialog.
 * It includes various customizable properties and imports necessary modules and components.
 *
 * @selector app-menu-modal
 * @templateUrl ./menu-modal.component.html
 * @styleUrls ./menu-modal.component.css
 *
 * @inputs
 * @input {string} backgroundColor - The background color of the modal content. Default is '#83c0e9'.
 * @input {boolean} isVisible - Determines whether the modal is visible.
 * @input {CustomButton[]} customButtons - An array of custom buttons to be displayed in the modal.
 * @input {boolean} shareButtons - Determines whether share buttons are displayed. Default is true.
 * @input {string} position - The position of the modal on the screen. Default is 'bottomRight'.
 * @input {string} roomName - The name of the room.
 * @input {string} adminPasscode - The admin passcode for the room.
 * @input {string} islevel - The level of the user.
 * @input {() => void} onClose - A function to be called when the modal is closed.
 *
 * @methods
 * @method modalContainerStyle - Returns the style object for the modal container.
 * @method modalContentStyle - Returns the style object for the modal content.
 * @method handleClose - Calls the onClose function to handle closing the modal.
 *
 * @dependencies
 * - CommonModule
 * - FontAwesomeModule
 * - FormsModule
 * - CustomButtons
 * - MeetingIdComponent
 * - MeetingPasscodeComponent
 * - ShareButtonsComponent
 */
export declare class MenuModal {
    backgroundColor: string;
    isVisible: boolean;
    customButtons: CustomButton[];
    shareButtons: boolean;
    position: string;
    roomName: string;
    adminPasscode: string;
    islevel: string;
    eventType: EventType;
    onClose: () => void;
    faBars: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    modalContainerStyle(): {
        position: string;
        top: number;
        left: number;
        width: string;
        height: string;
        backgroundColor: string;
        display: string;
        zIndex: number;
    };
    modalContentStyle(): {
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
    handleClose(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenuModal, "app-menu-modal", never, { "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "isVisible": { "alias": "isVisible"; "required": false; }; "customButtons": { "alias": "customButtons"; "required": false; }; "shareButtons": { "alias": "shareButtons"; "required": false; }; "position": { "alias": "position"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "adminPasscode": { "alias": "adminPasscode"; "required": false; }; "islevel": { "alias": "islevel"; "required": false; }; "eventType": { "alias": "eventType"; "required": false; }; "onClose": { "alias": "onClose"; "required": false; }; }, {}, never, never, true, never>;
}
