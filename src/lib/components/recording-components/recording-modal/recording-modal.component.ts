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
}

export type RecordingModalType = (options: RecordingModalOptions) => HTMLElement;

/**
 * Component representing a recording modal.
 *
 * @selector app-recording-modal
 * @standalone true
 * @imports CommonModule, FontAwesomeModule, StandardPanelComponent, AdvancedPanelComponent
 * @templateUrl ./recording-modal.component.html
 * @styleUrls ./recording-modal.component.css
 *
 * @class RecordingModal
 * @implements OnChanges
 *
 * @property {boolean} isRecordingModalVisible - Determines if the recording modal is visible.
 * @property {() => void} onClose - Callback function to close the modal.
 * @property {string} backgroundColor - Background color of the modal.
 * @property {string} position - Position of the modal on the screen.
 * @property {(options: ConfirmRecordingOptions) => void} confirmRecording - Callback function to confirm recording.
 * @property {(options: StartRecordingOptions) => void} startRecording - Callback function to start recording.
 * @property {RecordingModalParameters} parameters - Parameters for the recording modal.
 *
 * @property {IconDefinition} faTimes - FontAwesome icon for times (close).
 * @property {IconDefinition} faCheck - FontAwesome icon for check (confirm).
 * @property {IconDefinition} faPlay - FontAwesome icon for play (start).
 *
 * @method modalContainerStyle - Returns the style object for the modal container.
 * @method modalContentStyle - Returns the style object for the modal content.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property of a directive changes.
 * @method confirm - Calls the confirmRecording callback with the current parameters.
 * @method start - Calls the startRecording callback with the current parameters.
 * @example
 * ```html
 * <app-recording-modal
 *   [isRecordingModalVisible]="true"
 *   [onClose]="closeRecordingModal"
 *   [backgroundColor]="'#83c0e9'"
 *   [position]="'bottomRight'"
 *   [confirmRecording]="confirmRecording"
 *   [startRecording]="startRecording"
 *   [parameters]="recordingModalParams"
 * ></app-recording-modal>
 * ```
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
}
