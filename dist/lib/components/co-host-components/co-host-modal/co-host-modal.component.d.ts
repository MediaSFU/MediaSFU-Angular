import { OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { ModifyCoHostSettings } from '../../../methods/co-host-methods/modify-co-host-settings.service';
import { Participant, CoHostResponsibility, ModifyCoHostSettingsOptions, ShowAlert } from '../../../@types/types';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface CoHostModalOptions {
    isCoHostModalVisible: boolean;
    currentCohost?: string;
    participants: Participant[];
    coHostResponsibility: CoHostResponsibility[];
    position?: string;
    backgroundColor?: string;
    roomName: string;
    showAlert?: ShowAlert;
    updateCoHostResponsibility: (coHostResponsibility: CoHostResponsibility[]) => void;
    updateCoHost: (coHost: string) => void;
    updateIsCoHostModalVisible: (isCoHostModalVisible: boolean) => void;
    socket: Socket;
    onCoHostClose: () => void;
    onModifyEventSettings?: (settings: ModifyCoHostSettingsOptions) => void;
}
export type CoHostModalType = (options: CoHostModalOptions) => HTMLElement;
/**
 * CoHostModal component allows managing co-host settings for an event.
 *
 * @selector app-co-host-modal
 * @inputs
 * - `isCoHostModalVisible` (boolean): A boolean value that determines whether the modal is visible. Default is false.
 * - `currentCohost` (string): The current co-host for the event. Default is 'No coHost'.
 * - `participants` (Participant[]): An array of participants in the event.
 * - `coHostResponsibility` (CoHostResponsibility[]): An array of co-host responsibilities.
 * - `position` (string): The position of the modal. Default is 'topRight'.
 * - `backgroundColor` (string): The background color of the modal. Default is '#83c0e9'.
 * - `roomName` (string): The name of the room.
 * - `showAlert` (ShowAlert): A function to show alerts.
 *
 * @outputs
 * - `updateCoHostResponsibility` (coHostResponsibility: CoHostResponsibility[]): A function to update co-host responsibilities.
 * - `updateCoHost` (coHost: string): A function to update the co-host.
 * - `updateIsCoHostModalVisible` (isCoHostModalVisible: boolean): A function to update the visibility of the modal.
 * - `socket` (Socket): The socket object.
 *
 * @methods
 * - `ngOnInit()`: Lifecycle hook that is called after the component is initialized. It sets the default value for `onModifyCoHost` if not provided.
 * - `ngOnChanges(changes: SimpleChanges)`: Lifecycle hook that is called when any data-bound property of the component changes. It initializes the responsibilities and calculates the modal width.
 * - `initializeResponsibilities()`: Initializes the responsibilities.
 * - `get filteredParticipants()`: Returns the filtered participants.
 * - `handleToggleSwitch(key: string)`: Handles the toggle switch for the given key.
 * - `handleSave()`: Handles the save action.
 * - `handleClose()`: Handles the close action.
 * - `calculateModalWidth()`: Calculates the modal width.
 * - `modalContainerStyle()`: Returns the modal container style.
 * - `modalContentStyle()`: Returns the modal content style.
 *
 * @dependencies
 * - `CommonModule`: Angular's common module is imported for common directives.
 * - `FontAwesomeModule`: Angular's font awesome module is imported for icons.
 * - `FormsModule`: Angular's forms module is imported for form-related directives.
 * - `ModifyCoHostSettings`: The ModifyCoHostSettings service is used to modify co-host settings.
 *
 * @styles
 * - `.container`: The container style.
 *
 * @example
 * ```html
 * <app-co-host-modal
 *  [isCoHostModalVisible]="isCoHostModalVisible"
 * [currentCohost]="currentCohost"
 * [participants]="participants"
 * [coHostResponsibility]="coHostResponsibility"
 * [position]="position"
 * [backgroundColor]="backgroundColor"
 * [roomName]="roomName"
 * [showAlert]="showAlert"
 * [updateCoHostResponsibility]="updateCoHostResponsibility"
 * [updateCoHost]="updateCoHost"
 * [updateIsCoHostModalVisible]="updateIsCoHostModalVisible"
 * [socket]="socket"
 * [onCoHostClose]="onCoHostClose"
 * [onModifyCoHost]="onModifyCoHost">
 * </app-co-host-modal>
 * ```
 *
 **/
export declare class CoHostModal implements OnChanges, OnInit {
    private modifyCoHostSettingsService;
    isCoHostModalVisible: boolean;
    currentCohost: string;
    participants: Participant[];
    coHostResponsibility: CoHostResponsibility[];
    position: string;
    backgroundColor: string;
    roomName: string;
    showAlert: ShowAlert;
    updateCoHostResponsibility: (coHostResponsibility: CoHostResponsibility[]) => void;
    updateCoHost: (coHost: string) => void;
    updateIsCoHostModalVisible: (isCoHostModalVisible: boolean) => void;
    socket: Socket;
    onCoHostClose: () => void;
    onModifyCoHost: (settings: ModifyCoHostSettingsOptions) => void;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    selectedCohost: string;
    CoHostResponsibilityCopy: any[];
    CoHostResponsibilityCopyAlt: any[];
    responsibilities: {
        [key: string]: boolean;
    };
    responsibilityKeys: {
        manageKey: string;
        dedicateKey: string;
    }[];
    modalWidth: number;
    constructor(modifyCoHostSettingsService: ModifyCoHostSettings);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    initializeResponsibilities(): void;
    get filteredParticipants(): Participant[];
    handleToggleSwitch(key: string): void;
    handleSave(): void;
    handleClose(): void;
    calculateModalWidth(): void;
    modalContainerStyle(): {
        display: string;
        position: string;
        top: string;
        left: string;
        width: string;
        height: string;
        backgroundColor: string;
        zIndex: string;
    };
    modalContentStyle(): {
        backgroundColor: string;
        borderRadius: string;
        padding: string;
        width: string;
        maxHeight: string;
        overflowX: string;
        overflowY: string;
        position: string;
        top: string;
        bottom: string;
        left: string;
        right: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<CoHostModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CoHostModal, "app-co-host-modal", never, { "isCoHostModalVisible": { "alias": "isCoHostModalVisible"; "required": false; }; "currentCohost": { "alias": "currentCohost"; "required": false; }; "participants": { "alias": "participants"; "required": false; }; "coHostResponsibility": { "alias": "coHostResponsibility"; "required": false; }; "position": { "alias": "position"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "showAlert": { "alias": "showAlert"; "required": false; }; "updateCoHostResponsibility": { "alias": "updateCoHostResponsibility"; "required": false; }; "updateCoHost": { "alias": "updateCoHost"; "required": false; }; "updateIsCoHostModalVisible": { "alias": "updateIsCoHostModalVisible"; "required": false; }; "socket": { "alias": "socket"; "required": false; }; "onCoHostClose": { "alias": "onCoHostClose"; "required": false; }; "onModifyCoHost": { "alias": "onModifyCoHost"; "required": false; }; }, {}, never, never, true, never>;
}
