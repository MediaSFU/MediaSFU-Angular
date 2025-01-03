import { OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CaptureCanvasStreamParameters, CaptureCanvasStreamType, EventType, OnScreenChangesParameters, OnScreenChangesType, Participant, PrepopulateUserMediaParameters, PrepopulateUserMediaType, RePortParameters, RePortType, ShowAlert, WhiteboardUser } from '../../../@types/types';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface ConfigureWhiteboardModalParameters extends OnScreenChangesParameters, CaptureCanvasStreamParameters, PrepopulateUserMediaParameters, RePortParameters {
    participants: Participant[];
    showAlert?: ShowAlert;
    socket: Socket;
    itemPageLimit: number;
    islevel: string;
    roomName: string;
    eventType: EventType;
    shareScreenStarted: boolean;
    shared: boolean;
    breakOutRoomStarted: boolean;
    breakOutRoomEnded: boolean;
    recordStarted: boolean;
    recordResumed: boolean;
    recordPaused: boolean;
    recordStopped: boolean;
    recordingMediaOptions: string;
    canStartWhiteboard: boolean;
    whiteboardStarted: boolean;
    whiteboardEnded: boolean;
    hostLabel: string;
    updateWhiteboardStarted: (started: boolean) => void;
    updateWhiteboardEnded: (ended: boolean) => void;
    updateWhiteboardUsers: (users: WhiteboardUser[]) => void;
    updateCanStartWhiteboard: (canStart: boolean) => void;
    updateIsConfigureWhiteboardModalVisible: (isVisible: boolean) => void;
    onScreenChanges: OnScreenChangesType;
    captureCanvasStream: CaptureCanvasStreamType;
    prepopulateUserMedia: PrepopulateUserMediaType;
    rePort: RePortType;
    getUpdatedAllParams: () => ConfigureWhiteboardModalParameters;
    [key: string]: any;
}
export interface ConfigureWhiteboardModalOptions {
    isConfigureWhiteboardModalVisible: boolean;
    onClose: () => void;
    position?: string;
    backgroundColor?: string;
    parameters: ConfigureWhiteboardModalParameters;
}
export type ConfigureWhiteboardModalType = (options: ConfigureWhiteboardModalOptions) => HTMLElement;
/**
 * @component ConfigureWhiteboardModal
 * @description A modal component to configure and manage whiteboard settings and participants.
 *
 * @selector app-configure-whiteboard-modal
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule]
 * @templateUrl ./configure-whiteboard-modal.component.html
 * @styleUrls ./configure-whiteboard-modal.component.css
 *
 * @example
 * ```html
 * <app-configure-whiteboard-modal
 *   [isVisible]="isWhiteboardModalVisible"
 *   [parameters]="whiteboardParameters"
 *   [backgroundColor]="'#83c0e9'"
 *   [position]="'topRight'"
 *   (onConfigureWhiteboardClose)="handleCloseModal()">
 * </app-configure-whiteboard-modal>
 * ```
 */
export declare class ConfigureWhiteboardModal implements OnInit, OnChanges {
    isVisible: boolean;
    parameters: ConfigureWhiteboardModalParameters;
    backgroundColor: string;
    position: string;
    onConfigureWhiteboardClose: () => void;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faCheck: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faSyncAlt: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faPlay: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faSave: import("@fortawesome/fontawesome-common-types").IconDefinition;
    participantsCopy: Participant[];
    whiteboardLimit: number;
    isEditing: boolean;
    canStartWhiteboard: boolean;
    assignedParticipants: any[];
    unassignedParticipants: any[];
    whiteboardStarted: boolean;
    whiteboardEnded: boolean;
    private socket;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    setupSocketListeners: () => void;
    toggleParticipant: (participant: any, add: boolean) => void;
    validateWhiteboard(): boolean;
    checkCanStartWhiteboard(): void;
    handleSaveWhiteboard(): void;
    handleStartWhiteboard(): Promise<void>;
    handleStopWhiteboard(): Promise<void>;
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
        position: string;
        backgroundColor: string;
        borderRadius: string;
        padding: string;
        width: string;
        maxWidth: string;
        maxHeight: string;
        overflowY: string;
        overflowX: string;
        top: string;
        bottom: string;
        left: string;
        right: string;
    };
    updateParticipantsLists: () => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfigureWhiteboardModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfigureWhiteboardModal, "app-configure-whiteboard-modal", never, { "isVisible": { "alias": "isVisible"; "required": false; }; "parameters": { "alias": "parameters"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "position": { "alias": "position"; "required": false; }; "onConfigureWhiteboardClose": { "alias": "onConfigureWhiteboardClose"; "required": false; }; }, {}, never, never, true, never>;
}
