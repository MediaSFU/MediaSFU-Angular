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
 * Component for managing event settings modal.
 *
 * @selector app-event-settings-modal
 * @standalone true
 * @imports CommonModule, FontAwesomeModule, FormsModule
 * @templateUrl ./event-settings-modal.component.html
 * @styleUrls ./event-settings-modal.component.css
 *
 * @class EventSettingsModal
 * @implements OnInit, OnChanges
 *
 * @property {boolean} isEventSettingsModalVisible - Indicates if the event settings modal is visible.
 * @property {() => void} onEventSettingsClose - Callback function to close the event settings modal.
 * @property {(options: ModifySettingsOptions) => Promise<void>} onModifyEventSettings - Callback function to modify event settings.
 * @property {string} position - Position of the modal on the screen.
 * @property {string} backgroundColor - Background color of the modal.
 * @property {string} audioSetting - Current audio setting.
 * @property {string} videoSetting - Current video setting.
 * @property {string} screenshareSetting - Current screenshare setting.
 * @property {string} chatSetting - Current chat setting.
 * @property {(setting: string) => void} updateAudioSetting - Callback function to update audio setting.
 * @property {(setting: string) => void} updateVideoSetting - Callback function to update video setting.
 * @property {(setting: string) => void} updateScreenshareSetting - Callback function to update screenshare setting.
 * @property {(setting: string) => void} updateChatSetting - Callback function to update chat setting.
 * @property {(isVisible: boolean) => void} updateIsSettingsModalVisible - Callback function to update modal visibility.
 * @property {string} roomName - Name of the room.
 * @property {Socket} socket - Socket instance for communication.
 * @property {ShowAlert} [showAlert] - Optional alert function.
 *
 * @property {string} audioState - State of the audio setting.
 * @property {string} videoState - State of the video setting.
 * @property {string} screenshareState - State of the screenshare setting.
 * @property {string} chatState - State of the chat setting.
 *
 * @property {IconDefinition} faTimes - FontAwesome icon for close button.
 *
 * @constructor
 * @param {ModifySettings} modifySettingsService - Service for modifying settings.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @param {SimpleChanges} changes - Object of current and previous property values.
 *
 * @method updateStatesFromParameters - Updates the state variables from the input parameters.
 *
 * @method getModalContentStyle - Returns the style object for the modal content.
 * @returns {Object} Style object for the modal content.
 *
 * @method handleSaveSettings - Handles the save settings action.
 * @returns {Promise<void>} Promise that resolves when settings are saved.
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
