import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {
  faTimes,
  faSyncAlt,
  faCamera,
  faMicrophone,
  faPhotoFilm,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import {
  SwitchAudio,
  SwitchAudioOptions,
  SwitchAudioParameters,
} from '../../../methods/stream-methods/switch-audio.service';
import {
  SwitchVideo,
  SwitchVideoOptions,
  SwitchVideoParameters,
} from '../../../methods/stream-methods/switch-video.service';
import {
  SwitchVideoAlt,
  SwitchVideoAltOptions,
  SwitchVideoAltParameters,
} from '../../../methods/stream-methods/switch-video-alt.service';

export interface MediaSettingsModalParameters
  extends SwitchAudioParameters,
    SwitchVideoParameters,
    SwitchVideoAltParameters {
  userDefaultVideoInputDevice: string;
  videoInputs: MediaDeviceInfo[];
  audioInputs: MediaDeviceInfo[];
  userDefaultAudioInputDevice: string;
  isBackgroundModalVisible: boolean;
  updateIsBackgroundModalVisible: (visible: boolean) => void;

  // mediasfu functions
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

@Component({
    selector: 'app-media-settings-modal',
    templateUrl: './media-settings-modal.component.html',
    styleUrls: ['./media-settings-modal.component.css'],
    imports: [CommonModule, FontAwesomeModule, FormsModule]
})
export class MediaSettingsModal implements OnInit, OnChanges {
  @Input() isMediaSettingsModalVisible = false;
  @Input() onMediaSettingsClose!: () => void;
  @Input() switchCameraOnPress!: (params: any) => Promise<void>;
  @Input() switchVideoOnPress!: (params: any) => Promise<void>;
  @Input() switchAudioOnPress!: (params: any) => Promise<void>;
  @Input() parameters!: MediaSettingsModalParameters;
  @Input() position = 'topRight';
  @Input() backgroundColor = '#83c0e9';

  faTimes = faTimes;
  faSyncAlt = faSyncAlt;
  faCamera = faCamera;
  faMicrophone = faMicrophone;
  faPhotoFilm = faPhotoFilm;

  selectedVideoInput!: string;
  selectedAudioInput!: string;
  prevSelectedVideoInput!: string;
  prevSelectedAudioInput!: string;

  constructor(
    private switchAudioService: SwitchAudio,
    private switchVideoService: SwitchVideo,
    private switchVideoAltService: SwitchVideoAlt,
  ) {}

  ngOnInit() {
    if (this.isMediaSettingsModalVisible) {
      this.updateParameters();
      this.setupDefaultServices();
      this.initializeModalSettings();
      this.ensureDefaultSelections();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['isMediaSettingsModalVisible'] &&
      this.isMediaSettingsModalVisible &&
      this.parameters
    ) {
      this.updateParameters();
      this.setupDefaultServices();
      this.ensureDefaultSelections();
    }
  }

  setupDefaultServices() {
    if (!this.switchCameraOnPress) {
      this.switchCameraOnPress = (params: any) => this.switchVideoAltService.switchVideoAlt(params);
    }

    if (!this.switchVideoOnPress) {
      this.switchVideoOnPress = (params: any) => this.switchVideoService.switchVideo(params);
    }

    if (!this.switchAudioOnPress) {
      this.switchAudioOnPress = (params: any) => this.switchAudioService.switchAudio(params);
    }
  }

  updateParameters() {
    this.parameters = {
      ...this.parameters,
      ...this.parameters.getUpdatedAllParams(),
    };
  }

  ensureDefaultSelections() {
    if (!this.selectedVideoInput && this.parameters.videoInputs.length > 0) {
      this.selectedVideoInput = this.parameters.videoInputs[0].deviceId;
      this.prevSelectedVideoInput = this.selectedVideoInput;
      this.handleVideoSwitch({ target: { value: this.selectedVideoInput } } as any);
    }

    if (!this.selectedAudioInput && this.parameters.audioInputs.length > 0) {
      this.selectedAudioInput = this.parameters.audioInputs[0].deviceId;
      this.prevSelectedAudioInput = this.selectedAudioInput;
      this.handleAudioSwitch({ target: { value: this.selectedAudioInput } } as any);
    }
  }

  initializeModalSettings() {
    const screenWidth = window.innerWidth;
    let modalWidth = 0.7 * screenWidth;
    if (modalWidth > 350) {
      modalWidth = 350;
    }
  }

  modalContentStyle() {
    const screenWidth = window.innerWidth;
    let modalWidth = 0.8 * screenWidth;
    if (modalWidth > 350) {
      modalWidth = 350;
    }

    return {
      backgroundColor: this.backgroundColor,
      borderRadius: '10px',
      padding: '10px',
      width: `${modalWidth}px`,
      maxHeight: '65%',
      overflowY: 'auto',
      top: this.position.includes('top') ? '10px' : 'auto',
      bottom: this.position.includes('bottom') ? '10px' : 'auto',
      left: this.position.includes('Left') ? '10px' : 'auto',
      right: this.position.includes('Right') ? '10px' : 'auto',
    };
  }

  handleSwitchCamera = async () => {
    await this.switchCameraOnPress({ parameters: this.parameters });
  };

  handleVideoSwitch = async (event: Event) => {
    const value = (event.target as HTMLSelectElement).value;
    if (value !== this.prevSelectedVideoInput) {
      this.selectedVideoInput = value;
      this.prevSelectedVideoInput = this.selectedVideoInput;
      await this.switchVideoOnPress({ videoPreference: value, parameters: this.parameters });
    }
  };

  handleAudioSwitch = async (event: Event) => {
    const value = (event.target as HTMLSelectElement).value;
    if (value !== this.prevSelectedAudioInput) {
      this.selectedAudioInput = value;
      this.prevSelectedAudioInput = this.selectedAudioInput;
      await this.switchAudioOnPress({ audioPreference: value, parameters: this.parameters });
    }
  };

  handleModalClose() {
    this.onMediaSettingsClose();
  }

  showVirtual() {
    this.parameters.updateIsBackgroundModalVisible(!this.parameters.isBackgroundModalVisible);
  }
}
