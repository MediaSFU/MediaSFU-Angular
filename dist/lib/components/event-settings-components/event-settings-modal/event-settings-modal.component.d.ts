import { OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ModifySettings, ModifySettingsOptions } from '../../../methods/settings-methods/modify-settings.service';
import { Socket } from 'socket.io-client';
import { ShowAlert } from '../../../@types/types';
import * as i0 from "@angular/core";
export interface EventSettingsModalOptions {
    isEventSettingsModalVisible: boolean;
    onEventSettingsClose: () => void;
    onModifyEventSettings?: (options: ModifySettingsOptions) => Promise<void>;
    position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    backgroundColor?: string;
    audioSetting: string;
    videoSetting: string;
    screenshareSetting: string;
    chatSetting: string;
    updateAudioSetting: (setting: string) => void;
    updateVideoSetting: (setting: string) => void;
    updateScreenshareSetting: (setting: string) => void;
    updateChatSetting: (setting: string) => void;
    updateIsSettingsModalVisible: (isVisible: boolean) => void;
    roomName: string;
    socket: Socket;
    showAlert?: ShowAlert;
}
export type EventSettingsModalType = (options: EventSettingsModalOptions) => HTMLElement;
/**
 * EventSettingsModal component provides a modal interface to manage and update event settings like audio, video, screenshare, and chat settings.
 *
 * @component
 * @selector app-event-settings-modal
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule, FormsModule]
 *
 * @example
 * ```html
 * <app-event-settings-modal
 *   [isEventSettingsModalVisible]="true"
 *   [onEventSettingsClose]="closeModal"
 *   [onModifyEventSettings]="saveSettings"
 *   [audioSetting]="audio"
 *   [videoSetting]="video"
 *   [screenshareSetting]="screenshare"
 *   [chatSetting]="chat"
 *   [position]="'topRight'"
 *   [backgroundColor]="'#83c0e9'"
 * ></app-event-settings-modal>
 * ```
 *
 * @input {boolean} isEventSettingsModalVisible - Indicates if the event settings modal is visible.
 * @input {() => void} onEventSettingsClose - Callback to close the modal.
 * @input {(options: ModifySettingsOptions) => Promise<void>} onModifyEventSettings - Callback to handle event settings modifications.
 * @input {string} position - Position of the modal on the screen, default is 'topRight'.
 * @input {string} backgroundColor - Background color of the modal, default is '#83c0e9'.
 * @input {string} audioSetting - Current audio setting.
 * @input {string} videoSetting - Current video setting.
 * @input {string} screenshareSetting - Current screenshare setting.
 * @input {string} chatSetting - Current chat setting.
 * @input {(setting: string) => void} updateAudioSetting - Function to update audio setting.
 * @input {(setting: string) => void} updateVideoSetting - Function to update video setting.
 * @input {(setting: string) => void} updateScreenshareSetting - Function to update screenshare setting.
 * @input {(setting: string) => void} updateChatSetting - Function to update chat setting.
 * @input {(isVisible: boolean) => void} updateIsSettingsModalVisible - Function to update modal visibility.
 * @input {string} roomName - Room name associated with the settings.
 * @input {Socket} socket - Socket for real-time communication.
 * @input {ShowAlert} [showAlert] - Optional alert function.
 *
 * @property {string} audioState - Internal state for audio setting.
 * @property {string} videoState - Internal state for video setting.
 * @property {string} screenshareState - Internal state for screenshare setting.
 * @property {string} chatState - Internal state for chat setting.
 * @property {IconDefinition} faTimes - FontAwesome icon for the close button.
 *
 * @constructor
 * @param {ModifySettings} modifySettingsService - Service for modifying settings.
 *
 * @method ngOnInit - Initializes the component and binds the settings modification service.
 * @method ngOnChanges - Updates internal states when `isEventSettingsModalVisible` changes.
 * @param {SimpleChanges} changes - Object containing previous and current values of bound properties.
 *
 * @method updateStatesFromParameters - Sets internal state variables based on input parameters.
 * @method getModalContentStyle - Returns style object for modal content with dynamic positioning and size.
 * @returns {Object} Style object for modal content.
 *
 * @method handleSaveSettings - Invokes the settings modification function with updated values.
 * @returns {Promise<void>} Promise that resolves after saving settings.
 *
 * @method closeModal - Closes the modal.
 */
export declare class EventSettingsModal implements OnInit, OnChanges {
    private modifySettingsService;
    isEventSettingsModalVisible: boolean;
    onEventSettingsClose: () => void;
    onModifyEventSettings: (options: ModifySettingsOptions) => Promise<void>;
    position: string;
    backgroundColor: string;
    audioSetting: string;
    videoSetting: string;
    screenshareSetting: string;
    chatSetting: string;
    updateAudioSetting: (setting: string) => void;
    updateVideoSetting: (setting: string) => void;
    updateScreenshareSetting: (setting: string) => void;
    updateChatSetting: (setting: string) => void;
    updateIsSettingsModalVisible: (isVisible: boolean) => void;
    roomName: string;
    socket: Socket;
    showAlert?: ShowAlert;
    audioState: string;
    videoState: string;
    screenshareState: string;
    chatState: string;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    constructor(modifySettingsService: ModifySettings);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    updateStatesFromParameters(): void;
    getModalContentStyle(): {
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
    handleSaveSettings(): Promise<void>;
    closeModal(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<EventSettingsModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EventSettingsModal, "app-event-settings-modal", never, { "isEventSettingsModalVisible": { "alias": "isEventSettingsModalVisible"; "required": false; }; "onEventSettingsClose": { "alias": "onEventSettingsClose"; "required": false; }; "onModifyEventSettings": { "alias": "onModifyEventSettings"; "required": false; }; "position": { "alias": "position"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "audioSetting": { "alias": "audioSetting"; "required": false; }; "videoSetting": { "alias": "videoSetting"; "required": false; }; "screenshareSetting": { "alias": "screenshareSetting"; "required": false; }; "chatSetting": { "alias": "chatSetting"; "required": false; }; "updateAudioSetting": { "alias": "updateAudioSetting"; "required": false; }; "updateVideoSetting": { "alias": "updateVideoSetting"; "required": false; }; "updateScreenshareSetting": { "alias": "updateScreenshareSetting"; "required": false; }; "updateChatSetting": { "alias": "updateChatSetting"; "required": false; }; "updateIsSettingsModalVisible": { "alias": "updateIsSettingsModalVisible"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "socket": { "alias": "socket"; "required": false; }; "showAlert": { "alias": "showAlert"; "required": false; }; }, {}, never, never, true, never>;
}
