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
@Component({
  selector: 'app-media-settings-modal',
  templateUrl: './media-settings-modal.component.html',
  styleUrls: ['./media-settings-modal.component.css'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
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
