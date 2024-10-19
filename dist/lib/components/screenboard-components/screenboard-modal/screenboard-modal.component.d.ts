import { OnInit, OnDestroy, ElementRef, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { Producer } from 'mediasoup-client/lib/types';
import { ConnectSendTransportScreenType, CreateSendTransportType, DisconnectSendTransportScreenType, PrepopulateUserMediaType, StopShareScreenType, SleepType, ConnectSendTransportScreenParameters, CreateSendTransportParameters, DisconnectSendTransportScreenParameters, PrepopulateUserMediaParameters, StopShareScreenParameters } from '../../../@types/types';
import * as i0 from "@angular/core";
export interface ScreenboardModalParameters extends ConnectSendTransportScreenParameters, CreateSendTransportParameters, DisconnectSendTransportScreenParameters, PrepopulateUserMediaParameters, StopShareScreenParameters {
    localStreamScreen: MediaStream | null;
    shared: boolean;
    hostLabel: string;
    annotateScreenStream: boolean;
    processedScreenStream: MediaStream | null;
    mainScreenCanvas: HTMLCanvasElement | null;
    canvasScreenboard: HTMLCanvasElement | null;
    transportCreated: boolean;
    screenProducer: Producer | null;
    updateLocalStreamScreen: (stream: MediaStream | null) => void;
    updateProcessedScreenStream: (stream: MediaStream | null) => void;
    updateMainScreenCanvas: (canvas: HTMLCanvasElement | null) => void;
    sleep: SleepType;
    createSendTransport: CreateSendTransportType;
    disconnectSendTransportScreen: DisconnectSendTransportScreenType;
    connectSendTransportScreen: ConnectSendTransportScreenType;
    stopShareScreen: StopShareScreenType;
    prepopulateUserMedia: PrepopulateUserMediaType;
    getUpdatedAllParams: () => ScreenboardModalParameters;
}
export interface ScreenboardModalOptions {
    parameters: ScreenboardModalParameters;
    isVisible: boolean;
    onClose: () => void;
    position: string;
    backgroundColor: string;
}
export type ScreenboardModalType = (options: ScreenboardModalOptions) => HTMLElement;
/**
 * @fileoverview ScreenboardModal component for handling screen annotation and modal visibility.
 *
 * @component
 * @selector app-screenboard-modal
 * @standalone true
 * @templateUrl ./screenboard-modal.component.html
 * @styleUrls ./screenboard-modal.component.css
 * @imports CommonModule, FormsModule, FontAwesomeModule
 *
 * @class ScreenboardModal
 * @implements OnInit, OnDestroy, OnChanges, AfterViewInit
 *
 * @description
 * This component is responsible for managing the screen annotation modal, including showing and hiding the modal,
 * handling screen annotations, and managing media streams.
 *
 * @property {ScreenboardModalParameters} parameters - Input parameter for screen annotation modal.
 * @property {boolean} isVisible - Input flag to control the visibility of the modal.
 * @property {() => void} onClose - Input callback function to be called when the modal is closed.
 * @property {string} position - Input string to set the position of the modal.
 * @property {string} backgroundColor - Input string to set the background color of the modal.
 *
 * @property {ElementRef<HTMLVideoElement>} screenVideoRef - ViewChild reference to the screen video element.
 * @property {ElementRef<HTMLCanvasElement>} screenCanvasRef - ViewChild reference to the screen canvas element.
 *
 * @property {IconDefinition} faTimes - FontAwesome icon for the close button.
 *
 * @property {any} annotationInterval - Interval for annotation updates.
 * @property {any} annotationCheckInterval - Interval for checking annotation updates.
 * @property {MediaStream | null} clonedStreamScreen - Cloned media stream for screen sharing.
 * @property {CanvasRenderingContext2D | null} ctx - Canvas rendering context.
 *
 * @method ngOnInit - Initialization logic that does not depend on the view.
 * @method ngOnDestroy - Cleanup logic when the component is destroyed.
 * @method ngOnChanges - Logic to handle changes in input properties.
 * @method ngAfterViewInit - Logic that requires view access.
 * @method showModal - Method to show the modal and handle screen annotation setup.
 * @method hideModal - Method to hide the modal and cleanup screen annotation.
 * @method annotatationPreview - Method to handle the preview of screen annotations.
 * @method handleScreenTransport - Method to handle screen transport logic.
 * @method stopAnnotation - Method to stop the screen annotation.
 * @method stopAllTracks - Method to stop all media tracks.
 */
export declare class ScreenboardModal implements OnInit, OnDestroy, OnChanges, AfterViewInit {
    parameters: ScreenboardModalParameters;
    isVisible: boolean;
    onClose: () => void;
    position: string;
    backgroundColor: string;
    screenVideoRef: ElementRef<HTMLVideoElement>;
    screenCanvasRef: ElementRef<HTMLCanvasElement>;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    private annotationInterval;
    private annotationCheckInterval;
    private clonedStreamScreen;
    private ctx;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    showModal: () => Promise<void>;
    hideModal: () => Promise<void>;
    annotatationPreview: () => Promise<void>;
    handleScreenTransport: () => Promise<void>;
    stopAnnotation: () => Promise<void>;
    stopAllTracks: () => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScreenboardModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ScreenboardModal, "app-screenboard-modal", never, { "parameters": { "alias": "parameters"; "required": false; }; "isVisible": { "alias": "isVisible"; "required": false; }; "onClose": { "alias": "onClose"; "required": false; }; "position": { "alias": "position"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; }, {}, never, never, true, never>;
}
