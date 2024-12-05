import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventType } from '../../../@types/types';

export interface StandardPanelParameters {
  recordingMediaOptions: string;
  recordingAudioOptions: string;
  recordingVideoOptions: string;
  recordingAddHLS: boolean;
  updateRecordingMediaOptions: (mediaOptions: string) => void;
  updateRecordingAudioOptions: (audioOptions: string) => void;
  updateRecordingVideoOptions: (videoOptions: string) => void;
  updateRecordingAddHLS: (addHLS: boolean) => void;
  eventType: EventType;
}

export type StandardPanelType = (options: StandardPanelParameters) => HTMLElement;

/**
 * @component StandardPanelComponent
 * @description This component represents a standard panel for recording options.
 * It allows users to select media, audio, and video options, as well as toggle HLS recording.
 *
 * @selector app-standard-panel-component
 * @standalone true
 * @templateUrl ./standard-panel-component.component.html
 * @styleUrls ./standard-panel-component.component.css
 * @imports [CommonModule, FormsModule]
 *
 * @input {StandardPanelParameters} parameters - The parameters for the standard panel component.
 *
 * @property {string} selectedRecordingMediaOptions - The selected media options for recording.
 * @property {string} selectedRecordingAudioOptions - The selected audio options for recording.
 * @property {string} selectedRecordingVideoOptions - The selected video options for recording.
 * @property {boolean} selectedRecordingAddHLS - The flag indicating whether HLS recording is enabled.
 *
 * @method ngOnInit - Initializes the component and sets the initial values for recording options.
 * @method ngOnChanges - Handles changes to the input parameters and updates the recording options accordingly.
 * @method handleMediaOptionsChange - Handles changes to the media options and updates the parameters.
 * @method handleAudioOptionsChange - Handles changes to the audio options and updates the parameters.
 * @method handleVideoOptionsChange - Handles changes to the video options and updates the parameters.
 * @method handleAddHLSChange - Handles changes to the HLS recording option and updates the parameters.
 *
 * @param {SimpleChanges} changes - The changes to the input properties.
 * @param {any} event - The event object from the change event.
 *
 * @example
 * ```html
 * <app-standard-panel-component [parameters]="standardPanelParameters"></app-standard-panel-component>
 * ```
 */
@Component({
    selector: 'app-standard-panel-component',
    templateUrl: './standard-panel-component.component.html',
    styleUrls: ['./standard-panel-component.component.css'],
    imports: [CommonModule, FormsModule]
})
export class StandardPanelComponent implements OnInit, OnChanges {
  @Input() parameters: StandardPanelParameters = {} as StandardPanelParameters;

  selectedRecordingMediaOptions!: string;
  selectedRecordingAudioOptions!: string;
  selectedRecordingVideoOptions!: string;
  selectedRecordingAddHLS!: boolean;

  ngOnInit() {
    this.selectedRecordingMediaOptions = this.parameters.recordingMediaOptions;
    this.selectedRecordingAudioOptions = this.parameters.recordingAudioOptions;
    this.selectedRecordingVideoOptions = this.parameters.recordingVideoOptions;
    this.selectedRecordingAddHLS = this.parameters.recordingAddHLS;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['parameters']) {
      this.parameters = changes['parameters'].currentValue;
      this.selectedRecordingMediaOptions = this.parameters.recordingMediaOptions;
      this.selectedRecordingAudioOptions = this.parameters.recordingAudioOptions;
      this.selectedRecordingVideoOptions = this.parameters.recordingVideoOptions;
      this.selectedRecordingAddHLS = this.parameters.recordingAddHLS;
    }
  }

  handleMediaOptionsChange(event: any) {
    const value = event.target.value;
    this.selectedRecordingMediaOptions = value;
    this.parameters.updateRecordingMediaOptions(value);
  }

  handleAudioOptionsChange(event: any) {
    const value = event.target.value;
    this.selectedRecordingAudioOptions = value;
    this.parameters.updateRecordingAudioOptions(value);
  }

  handleVideoOptionsChange(event: any) {
    const value = event.target.value;
    this.selectedRecordingVideoOptions = value;
    this.parameters.updateRecordingVideoOptions(value);
  }

  handleAddHLSChange(event: any) {
    const value = event.target.value === 'true';
    this.selectedRecordingAddHLS = value;
    this.parameters.updateRecordingAddHLS(value);
  }
}
