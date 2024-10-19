import { OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EventType } from '../../../@types/types';
import * as i0 from "@angular/core";
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
 */
export declare class StandardPanelComponent implements OnInit, OnChanges {
    parameters: StandardPanelParameters;
    selectedRecordingMediaOptions: string;
    selectedRecordingAudioOptions: string;
    selectedRecordingVideoOptions: string;
    selectedRecordingAddHLS: boolean;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    handleMediaOptionsChange(event: any): void;
    handleAudioOptionsChange(event: any): void;
    handleVideoOptionsChange(event: any): void;
    handleAddHLSChange(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StandardPanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StandardPanelComponent, "app-standard-panel-component", never, { "parameters": { "alias": "parameters"; "required": false; }; }, {}, never, never, true, never>;
}
