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
  overlayStyle?: Partial<CSSStyleDeclaration>;
  contentStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: any;
}

export type MediaSettingsModalType = (options: MediaSettingsModalOptions) => HTMLElement;

/**
 * MediaSettingsModal - Modal for selecting audio/video devices and virtual backgrounds
 * 
 * @component
 * @description
 * Provides device selection controls for camera, microphone, and audio output.
 * Includes camera switching (front/back), device dropdown selectors, and virtual background access.
 * 
 * Supports three levels of customization:
 * 1. **Basic Usage**: Use default modal UI with device dropdowns and switch buttons
 * 2. **Style Customization**: Override modal appearance with overlayStyle and contentStyle
 * 3. **Full Override**: Provide a custom template via customTemplate for complete control
 * 
 * Key Features:
 * - Camera device selection dropdown
 * - Microphone device selection dropdown
 * - Front/back camera toggle (mobile)
 * - Virtual background button
 * - Real-time device switching
 * - Default device persistence
 * 
 * @example
 * Basic Usage:
 * ```html
 * <app-media-settings-modal
 *   [isMediaSettingsModalVisible]="showMediaSettings"
 *   [parameters]="mediaParams"
 *   [switchCameraOnPress]="switchCamera"
 *   [switchVideoOnPress]="switchVideo"
 *   [switchAudioOnPress]="switchAudio"
 *   [onMediaSettingsClose]="closeMediaSettings">
 * </app-media-settings-modal>
 * ```
 * 
 * @example
 * Style Customization:
 * ```html
 * <app-media-settings-modal
 *   [isMediaSettingsModalVisible]="showMediaSettings"
 *   [parameters]="mediaParams"
 *   [overlayStyle]="{
 *     backgroundColor: 'rgba(0, 0, 0, 0.75)'
 *   }"
 *   [contentStyle]="{
 *     backgroundColor: '#ffffff',
 *     borderRadius: '16px',
 *     padding: '30px',
 *     minWidth: '400px'
 *   }"
 *   [position]="'center'"
 *   [backgroundColor]="'#f5f5f5'"
 *   [onMediaSettingsClose]="closeMediaSettings">
 * </app-media-settings-modal>
 * ```
 * 
 * @example
 * Custom Template Override:
 * ```html
 * <app-media-settings-modal
 *   [isMediaSettingsModalVisible]="showMediaSettings"
 *   [customTemplate]="customMediaTemplate"
 *   [onMediaSettingsClose]="closeMediaSettings">
 * </app-media-settings-modal>
 * 
 * <ng-template #customMediaTemplate let-videoInputs="videoInputs" let-audioInputs="audioInputs" let-onVideoSwitch="onVideoSwitch">
 *   <div class="custom-media-settings">
 *     <h3>Device Settings</h3>
 *     <label>
 *       Camera:
 *       <select (change)="onVideoSwitch($event)">
 *         <option *ngFor="let device of videoInputs" [value]="device.deviceId">
 *           {{ device.label }}
 *         </option>
 *       </select>
 *     </label>
 *     <label>
 *       Microphone:
 *       <select (change)="onAudioSwitch($event)">
 *         <option *ngFor="let device of audioInputs" [value]="device.deviceId">
 *           {{ device.label }}
 *         </option>
 *       </select>
 *     </label>
 *   </div>
 * </ng-template>
 * ```
 * 
 * @selector app-media-settings-modal
 * @standalone true
 * @imports CommonModule, FontAwesomeModule, FormsModule
 * 
 * @input isMediaSettingsModalVisible - Whether the modal is currently visible. Default: `false`
 * @input onMediaSettingsClose - Callback function to close the modal. Default: `() => {}`
 * @input switchCameraOnPress - Function to switch front/back camera. Default: `switchVideoAltService.switchVideoAlt`
 * @input switchVideoOnPress - Function to switch video input device. Default: `switchVideoService.switchVideo`
 * @input switchAudioOnPress - Function to switch audio input device. Default: `switchAudioService.switchAudio`
 * @input parameters - Object containing videoInputs, audioInputs, default devices, and update functions. Default: `{}`
 * @input position - Modal position on screen ('topRight', 'center', etc.). Default: `'topRight'`
 * @input backgroundColor - Background color of the modal content. Default: `'#83c0e9'`
 * @input overlayStyle - Custom CSS styles for the modal overlay backdrop. Default: `undefined`
 * @input contentStyle - Custom CSS styles for the modal content container. Default: `undefined`
 * @input customTemplate - Custom TemplateRef to completely replace default modal template. Default: `undefined`
 * 
 * @method ngOnInit - Initializes component, sets up default services, and ensures default device selections
 * @method ngOnChanges - Updates modal settings when visibility or parameters change
 * @method setupDefaultServices - Configures default device switching services if not provided
 * @method updateParameters - Refreshes parameters from getUpdatedAllParams
 * @method ensureDefaultSelections - Sets default selected devices if none selected
 * @method initializeModalSettings - Initializes selected device states
 * @method handleSwitchCamera - Handles front/back camera toggle
 * @method handleVideoSwitch - Handles video device selection change
 * @method handleAudioSwitch - Handles audio device selection change
 * @method handleModalClose - Closes modal via onMediaSettingsClose callback
 * @method showVirtual - Opens virtual background modal
 * @method getCombinedOverlayStyle - Merges default and custom overlay styles
 * @method getCombinedContentStyle - Merges default and custom content styles
 * @method modalContentStyle - Returns computed content styles with positioning
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
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: any;

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

  getCombinedOverlayStyle() {
    return {
      ...(this.overlayStyle || {})
    };
  }

  getCombinedContentStyle() {
    return {
      ...this.modalContentStyle(),
      ...(this.contentStyle || {})
    };
  }
}
