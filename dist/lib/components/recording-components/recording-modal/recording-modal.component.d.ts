import { OnChanges, SimpleChanges } from '@angular/core';
import { EventType, ConfirmRecordingParameters, StartRecordingParameters, ConfirmRecordingOptions, StartRecordingOptions } from '../../../@types/types';
import * as i0 from "@angular/core";
export interface RecordingModalParameters extends ConfirmRecordingParameters, StartRecordingParameters {
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
export declare class RecordingModal implements OnChanges {
    isRecordingModalVisible: boolean;
    onClose: () => void;
    backgroundColor: string;
    position: string;
    confirmRecording: (options: ConfirmRecordingOptions) => void;
    startRecording: (options: StartRecordingOptions) => void;
    parameters: RecordingModalParameters;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faCheck: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faPlay: import("@fortawesome/fontawesome-common-types").IconDefinition;
    get modalContainerStyle(): {
        position: string;
        top: number;
        left: number;
        width: string;
        height: string;
        backgroundColor: string;
        display: string;
        zIndex: number;
    };
    get modalContentStyle(): {
        position: string;
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
    ngOnChanges(changes: SimpleChanges): void;
    confirm(): void;
    start(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordingModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RecordingModal, "app-recording-modal", never, { "isRecordingModalVisible": { "alias": "isRecordingModalVisible"; "required": false; }; "onClose": { "alias": "onClose"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "position": { "alias": "position"; "required": false; }; "confirmRecording": { "alias": "confirmRecording"; "required": false; }; "startRecording": { "alias": "startRecording"; "required": false; }; "parameters": { "alias": "parameters"; "required": false; }; }, {}, never, never, true, never>;
}
