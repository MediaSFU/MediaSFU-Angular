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
 * MediaSettingsModal component renders a modal interface for managing media settings.
 * Users can switch between different audio and video input devices and adjust other settings.
 *
 * @component
 * @selector app-media-settings-modal
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule, FormsModule]
 *
 * @example
 * ```html
 * <app-media-settings-modal
 *   [isMediaSettingsModalVisible]="true"
 *   [onMediaSettingsClose]="closeModal"
 *   [switchCameraOnPress]="handleCameraSwitch"
 *   [switchVideoOnPress]="handleVideoSwitch"
 *   [switchAudioOnPress]="handleAudioSwitch"
 *   [parameters]="mediaSettingsParams"
 *   position="topRight"
 *   backgroundColor="#83c0e9">
 * </app-media-settings-modal>
 * ```
 *
 * @input {boolean} isMediaSettingsModalVisible - Indicates whether the modal is visible.
 * @input {() => void} onMediaSettingsClose - Function to close the modal.
 * @input {(params: SwitchVideoAltOptions) => Promise<void>} switchCameraOnPress - Function to handle camera switching.
 * @input {(params: SwitchVideoOptions) => Promise<void>} switchVideoOnPress - Function to handle video switching.
 * @input {(params: SwitchAudioOptions) => Promise<void>} switchAudioOnPress - Function to handle audio switching.
 * @input {MediaSettingsModalParameters} parameters - Parameters for the modal.
 * @input {string} position - Position of the modal on the screen (default: 'topRight').
 * @input {string} backgroundColor - Background color of the modal (default: '#83c0e9').
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
 * @method ngOnInit - Initializes the component and sets up default selections and services.
 * @method ngOnChanges - Updates component state based on input changes.
 * @method setupDefaultServices - Configures default services for switching camera, video, and audio.
 * @method updateParameters - Updates the modal parameters.
 * @method ensureDefaultSelections - Ensures default selections for video and audio inputs.
 * @method initializeModalSettings - Initializes the modal settings.
 * @method modalContentStyle - Returns the style object for the modal content.
 * @method handleSwitchCamera - Initiates camera switching.
 * @method handleVideoSwitch - Initiates video input switching.
 * @method handleAudioSwitch - Initiates audio input switching.
 * @method handleModalClose - Closes the modal.
 * @method showVirtual - Toggles the virtual background modal.
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
