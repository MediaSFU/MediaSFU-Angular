import { OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SwitchAudio, SwitchAudioOptions, SwitchAudioParameters } from '../../../methods/stream-methods/switch-audio.service';
import { SwitchVideo, SwitchVideoOptions, SwitchVideoParameters } from '../../../methods/stream-methods/switch-video.service';
import { SwitchVideoAlt, SwitchVideoAltOptions, SwitchVideoAltParameters } from '../../../methods/stream-methods/switch-video-alt.service';
import * as i0 from "@angular/core";
export interface MediaSettingsModalParameters extends SwitchAudioParameters, SwitchVideoParameters, SwitchVideoAltParameters {
    userDefaultVideoInputDevice: string;
    videoInputs: MediaDeviceInfo[];
    audioInputs: MediaDeviceInfo[];
    userDefaultAudioInputDevice: string;
    isBackgroundModalVisible: boolean;
    updateIsBackgroundModalVisible: (visible: boolean) => void;
    getUpdatedAllParams: () => MediaSettingsModalParameters;
}
export interface MediaSettingsModalOptions {
    isMediaSettingsModalVisible: boolean;
    onMediaSettingsClose: () => void;
    switchCameraOnPress?: (options: SwitchVideoAltOptions) => Promise<void>;
    switchVideoOnPress?: (options: SwitchVideoOptions) => Promise<void>;
    switchAudioOnPress?: (options: SwitchAudioOptions) => Promise<void>;
    parameters: MediaSettingsModalParameters;
    position: string;
    backgroundColor: string;
}
export type MediaSettingsModalType = (options: MediaSettingsModalOptions) => HTMLElement;
/**
 * Component for displaying and managing media settings in a modal.
 *
 * @selector app-media-settings-modal
 * @templateUrl ./media-settings-modal.component.html
 * @styleUrls ./media-settings-modal.component.css
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule, FormsModule]
 *
 * @class MediaSettingsModal
 * @implements OnInit, OnChanges
 *
 * @property {boolean} isMediaSettingsModalVisible - Determines if the media settings modal is visible.
 * @property {() => void} onMediaSettingsClose - Callback function to close the media settings modal.
 * @property {(params: any) => Promise<void>} switchCameraOnPress - Callback function to switch the camera.
 * @property {(params: any) => Promise<void>} switchVideoOnPress - Callback function to switch the video.
 * @property {(params: any) => Promise<void>} switchAudioOnPress - Callback function to switch the audio.
 * @property {MediaSettingsModalParameters} parameters - Parameters for the media settings modal.
 * @property {string} position - Position of the modal on the screen. Default is 'topRight'.
 * @property {string} backgroundColor - Background color of the modal. Default is '#83c0e9'.
 *
 * @property {IconDefinition} faTimes - FontAwesome icon for closing the modal.
 * @property {IconDefinition} faSyncAlt - FontAwesome icon for sync.
 * @property {IconDefinition} faCamera - FontAwesome icon for camera.
 * @property {IconDefinition} faMicrophone - FontAwesome icon for microphone.
 * @property {IconDefinition} faPhotoFilm - FontAwesome icon for photo film.
 *
 * @property {string} selectedVideoInput - Currently selected video input device ID.
 * @property {string} selectedAudioInput - Currently selected audio input device ID.
 * @property {string} prevSelectedVideoInput - Previously selected video input device ID.
 * @property {string} prevSelectedAudioInput - Previously selected audio input device ID.
 *
 * @constructor
 * @param {SwitchAudio} switchAudioService - Service for switching audio.
 * @param {SwitchVideo} switchVideoService - Service for switching video.
 * @param {SwitchVideoAlt} switchVideoAltService - Alternative service for switching video.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @method setupDefaultServices - Sets up default services for switching camera, video, and audio if not provided.
 * @method updateParameters - Updates the parameters for the modal.
 * @method ensureDefaultSelections - Ensures that default selections for video and audio inputs are set.
 * @method initializeModalSettings - Initializes settings for the modal.
 * @method modalContentStyle - Returns the style object for the modal content.
 * @method handleSwitchCamera - Handles the action to switch the camera.
 * @method handleVideoSwitch - Handles the action to switch the video input.
 * @method handleAudioSwitch - Handles the action to switch the audio input.
 * @method handleModalClose - Handles the action to close the modal.
 * @method showVirtual - Toggles the visibility of the virtual background modal.
 */
export declare class MediaSettingsModal implements OnInit, OnChanges {
    private switchAudioService;
    private switchVideoService;
    private switchVideoAltService;
    isMediaSettingsModalVisible: boolean;
    onMediaSettingsClose: () => void;
    switchCameraOnPress: (params: any) => Promise<void>;
    switchVideoOnPress: (params: any) => Promise<void>;
    switchAudioOnPress: (params: any) => Promise<void>;
    parameters: MediaSettingsModalParameters;
    position: string;
    backgroundColor: string;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faSyncAlt: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faCamera: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faMicrophone: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faPhotoFilm: import("@fortawesome/fontawesome-common-types").IconDefinition;
    selectedVideoInput: string;
    selectedAudioInput: string;
    prevSelectedVideoInput: string;
    prevSelectedAudioInput: string;
    constructor(switchAudioService: SwitchAudio, switchVideoService: SwitchVideo, switchVideoAltService: SwitchVideoAlt);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    setupDefaultServices(): void;
    updateParameters(): void;
    ensureDefaultSelections(): void;
    initializeModalSettings(): void;
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
    handleSwitchCamera: () => Promise<void>;
    handleVideoSwitch: (event: Event) => Promise<void>;
    handleAudioSwitch: (event: Event) => Promise<void>;
    handleModalClose(): void;
    showVirtual(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MediaSettingsModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MediaSettingsModal, "app-media-settings-modal", never, { "isMediaSettingsModalVisible": { "alias": "isMediaSettingsModalVisible"; "required": false; }; "onMediaSettingsClose": { "alias": "onMediaSettingsClose"; "required": false; }; "switchCameraOnPress": { "alias": "switchCameraOnPress"; "required": false; }; "switchVideoOnPress": { "alias": "switchVideoOnPress"; "required": false; }; "switchAudioOnPress": { "alias": "switchAudioOnPress"; "required": false; }; "parameters": { "alias": "parameters"; "required": false; }; "position": { "alias": "position"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; }, {}, never, never, true, never>;
}
