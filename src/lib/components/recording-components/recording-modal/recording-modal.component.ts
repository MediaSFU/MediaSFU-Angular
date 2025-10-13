import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes, faCheck, faPlay } from '@fortawesome/free-solid-svg-icons';
import { StandardPanelComponent } from '../standard-panel-component/standard-panel-component.component';
import { AdvancedPanelComponent } from '../advanced-panel-component/advanced-panel-components.component';
import {
  EventType,
  ConfirmRecordingParameters,
  StartRecordingParameters,
  ConfirmRecordingOptions,
  StartRecordingOptions,
} from '../../../@types/types';

export interface RecordingModalParameters
  extends ConfirmRecordingParameters,
    StartRecordingParameters {
  recordPaused: boolean;
  recordingVideoType: string;
  recordingDisplayType: 'video' | 'media' | 'all';
  recordingBackgroundColor: string;
  recordingNameTagsColor: string;
  recordingOrientationVideo: string;
  recordingNameTags: boolean;
  recordingAddText: boolean;
  recordingCustomText: string;
  recordingCustomTextPosition: string;
  recordingCustomTextColor: string;
  recordingMediaOptions: string;
  recordingAudioOptions: string;
  recordingVideoOptions: string;
  recordingAddHLS: boolean;
  eventType: EventType;
  updateRecordingVideoType: (value: string) => void;
  updateRecordingDisplayType: (value: 'video' | 'media' | 'all') => void;
  updateRecordingBackgroundColor: (value: string) => void;
  updateRecordingNameTagsColor: (value: string) => void;
  updateRecordingOrientationVideo: (value: string) => void;
  updateRecordingNameTags: (value: boolean) => void;
  updateRecordingAddText: (value: boolean) => void;
  updateRecordingCustomText: (value: string) => void;
  updateRecordingCustomTextPosition: (value: string) => void;
  updateRecordingCustomTextColor: (value: string) => void;
  updateRecordingMediaOptions: (value: string) => void;
  updateRecordingAudioOptions: (value: string) => void;
  updateRecordingVideoOptions: (value: string) => void;
  updateRecordingAddHLS: (value: boolean) => void;

  // mediasfu functions
  getUpdatedAllParams: () => RecordingModalParameters;
  [key: string]: any;
}

export interface RecordingModalOptions {
  isRecordingModalVisible: boolean;
  onClose: () => void;
  backgroundColor: string;
  position: string;

  confirmRecording: (options: ConfirmRecordingOptions) => void;
  startRecording: (options: StartRecordingOptions) => void;
  parameters: RecordingModalParameters;
  overlayStyle?: Partial<CSSStyleDeclaration>;
  contentStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: any;
}

export type RecordingModalType = (options: RecordingModalOptions) => HTMLElement;

/**
 * RecordingModal - Modal for configuring and controlling session recording
 * 
 * @component
 * @description
 * Provides recording configuration controls including record type (video/audio/both), format, text overlay, and HLS streaming.
 * Includes Standard (quick start) and Advanced (detailed settings) panels.
 * 
 * Supports three levels of customization:
 * 1. **Basic Usage**: Use default modal UI with Standard/Advanced panels
 * 2. **Style Customization**: Override modal appearance with overlayStyle and contentStyle
 * 3. **Full Override**: Provide a custom template via customTemplate for complete control
 * 
 * Key Features:
 * - Recording type selection (video, audio, all)
 * - Custom text overlay with positioning and color
 * - HLS streaming toggle
 * - Pause/resume recording
 * - Standard vs Advanced configuration modes
 * 
 * @selector app-recording-modal
 * @standalone true
 * @imports CommonModule, FontAwesomeModule, StandardPanelComponent, AdvancedPanelComponent
 * 
 * @input isRecordingModalVisible - Whether the modal is currently visible. Default: `false`
 * @input onClose - Callback function to close the modal. Default: `() => {}`
 * @input backgroundColor - Background color of the modal content. Default: `'#83c0e9'`
 * @input position - Modal position on screen ('topRight', 'bottomRight', etc.). Default: `'bottomRight'`
 * @input confirmRecording - Callback to confirm and start recording. Default: `() => {}`
 * @input startRecording - Callback to initiate recording with current settings. Default: `() => {}`
 * @input parameters - Object containing recording settings and update functions. Default: `{}`
 * @input overlayStyle - Custom CSS styles for the modal overlay backdrop. Default: `undefined`
 * @input contentStyle - Custom CSS styles for the modal content container. Default: `undefined`
 * @input customTemplate - Custom TemplateRef to completely replace default modal template. Default: `undefined`
 * 
 * @method ngOnChanges - Updates recording parameters when modal visibility changes
 * @method confirm - Validates and confirms recording settings
 * @method start - Initiates recording with configured settings
 * @method getCombinedOverlayStyle - Merges default and custom overlay styles
 * @method getCombinedContentStyle - Merges default and custom content styles
 * @method modalContainerStyle - Returns computed overlay styles
 * @method modalContentStyle - Returns computed content styles
 */
@Component({
    selector: 'app-recording-modal',
    imports: [CommonModule, FontAwesomeModule, StandardPanelComponent, AdvancedPanelComponent],
    templateUrl: './recording-modal.component.html',
    styleUrls: ['./recording-modal.component.css']
})
export class RecordingModal implements OnChanges {
  @Input() isRecordingModalVisible = false;
  @Input() onClose!: () => void;
  @Input() backgroundColor = '#83c0e9';
  @Input() position = 'bottomRight';
  @Input() confirmRecording!: (options: ConfirmRecordingOptions) => void;
  @Input() startRecording!: (options: StartRecordingOptions) => void;
  @Input() parameters: RecordingModalParameters = {} as RecordingModalParameters;
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: any;

  faTimes = faTimes;
  faCheck = faCheck;
  faPlay = faPlay;

  get modalContainerStyle() {
    return {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: this.isRecordingModalVisible ? 'block' : 'none',
      zIndex: 999,
    };
  }

  get modalContentStyle() {
    const screenWidth = window.innerWidth;
    let modalWidth = 0.8 * screenWidth;
    if (modalWidth > 350) {
      modalWidth = 350;
    }
    return {
      position: 'fixed',
      backgroundColor: this.backgroundColor,
      borderRadius: '10px',
      padding: '10px',
      width: `${modalWidth}px`,
      maxHeight: '85%',
      overflowY: 'auto',
      top: this.position.includes('top') ? '10px' : 'auto',
      bottom: this.position.includes('bottom') ? '10px' : 'auto',
      left: this.position.includes('Left') ? '10px' : 'auto',
      right: this.position.includes('Right') ? '10px' : 'auto',
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isRecordingModalVisible']) {
      if (this.parameters) {
        this.parameters = this.parameters.getUpdatedAllParams();
      }
    }
  }

  confirm() {
    this.confirmRecording({
      parameters: { ...this.parameters },
    });
  }

  start() {
    this.startRecording({
      parameters: { ...this.parameters },
    });
  }

  getCombinedOverlayStyle() {
    return {
      ...this.modalContainerStyle,
      ...(this.overlayStyle || {})
    };
  }

  getCombinedContentStyle() {
    return {
      ...this.modalContentStyle,
      ...(this.contentStyle || {})
    };
  }
}
