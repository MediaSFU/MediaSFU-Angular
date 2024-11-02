import { OnChanges, SimpleChanges, ElementRef, OnInit } from '@angular/core';
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation';
import { ConnectSendTransportVideoParameters, ConnectSendTransportVideoType, CreateSendTransportParameters, CreateSendTransportType, DisconnectSendTransportVideoParameters, DisconnectSendTransportVideoType, OnScreenChangesParameters, OnScreenChangesType, ShowAlert, SleepType, VidCons } from '../../../@types/types';
import { Producer, ProducerOptions } from 'mediasoup-client/lib/types';
import * as i0 from "@angular/core";
export interface BackgroundModalParameters extends CreateSendTransportParameters, ConnectSendTransportVideoParameters, DisconnectSendTransportVideoParameters, OnScreenChangesParameters {
    customImage: string;
    selectedImage: string;
    segmentVideo: MediaStream | null;
    selfieSegmentation: SelfieSegmentation | null;
    pauseSegmentation: boolean;
    processedStream: MediaStream | null;
    keepBackground: boolean;
    backgroundHasChanged: boolean;
    virtualStream: MediaStream | null;
    mainCanvas: HTMLCanvasElement | null;
    prevKeepBackground: boolean;
    appliedBackground: boolean;
    videoAlreadyOn: boolean;
    audioOnlyRoom: boolean;
    islevel: string;
    recordStarted: boolean;
    recordResumed: boolean;
    recordPaused: boolean;
    recordStopped: boolean;
    recordingMediaOptions: string;
    showAlert?: ShowAlert;
    localStreamVideo: MediaStream | null;
    vidCons: VidCons;
    frameRate: number;
    targetResolution: string;
    updateCustomImage: (image: string) => void;
    updateSelectedImage: (image: string) => void;
    updateSegmentVideo: (stream: MediaStream | null) => void;
    updateSelfieSegmentation: (segmentation: SelfieSegmentation | null) => void;
    updatePauseSegmentation: (pause: boolean) => void;
    updateProcessedStream: (stream: MediaStream | null) => void;
    updateKeepBackground: (keep: boolean) => void;
    updateBackgroundHasChanged: (changed: boolean) => void;
    updateVirtualStream: (stream: MediaStream | null) => void;
    updatePrevKeepBackground: (prev: boolean) => void;
    updateAppliedBackground: (applied: boolean) => void;
    videoProducer: Producer | null;
    transportCreated: boolean;
    videoParams: ProducerOptions;
    updateVideoParams: (params: ProducerOptions) => void;
    autoClickBackground: boolean;
    updateAutoClickBackground: (autoClick: boolean) => void;
    updateMainCanvas: (canvas: HTMLCanvasElement) => void;
    createSendTransport: CreateSendTransportType;
    connectSendTransportVideo: ConnectSendTransportVideoType;
    disconnectSendTransportVideo: DisconnectSendTransportVideoType;
    onScreenChanges: OnScreenChangesType;
    sleep: SleepType;
    getUpdatedAllParams: () => BackgroundModalParameters;
    [key: string]: any;
}
export interface BackgroundModalOptions {
    isVisible: boolean;
    parameters: BackgroundModalParameters;
    position: string;
    backgroundColor: string;
    onClose: () => void;
}
export type BackgroundModalType = (options: BackgroundModalOptions) => HTMLElement;
/**
 * BackgroundModal - Component to manage background selection and manipulation in media streams.
 *
 * This component allows users to choose, apply, and manipulate virtual backgrounds for media streams, leveraging MediaPipe’s Selfie Segmentation and MediaSoup functionalities.
 *
 * @component
 * @name BackgroundModal
 * @example
 * ```typescript
 * <app-background-modal
 *   [isVisible]="isModalVisible"
 *   [parameters]="modalParameters"
 *   position="topLeft"
 *   backgroundColor="#f5f5f5"
 *   (onClose)="handleModalClose()"
 * ></app-background-modal>
 * ```
 *
 * @param {boolean} isVisible - Visibility state of the modal.
 * @param {BackgroundModalParameters} parameters - Parameters including settings and methods for media and background management.
 * @param {string} position - The position of the modal, e.g., 'topLeft'.
 * @param {string} backgroundColor - Background color of the modal.
 * @param {Function} onClose - Callback function when the modal is closed.
 *
 * @property {faTimes} faTimes - Icon used for closing the modal.
 * @property {string} customImage - Custom image URL for background.
 * @property {string} selectedImage - Selected image URL for background.
 * @property {MediaStream | null} segmentVideo - Media stream for video segmentation.
 * @property {SelfieSegmentation | null} selfieSegmentation - SelfieSegmentation instance.
 * @property {boolean} pauseSegmentation - Pause state for segmentation.
 * @property {MediaStream | null} processedStream - Processed media stream with applied background.
 * @property {boolean} keepBackground - State to keep or reset background.
 *
 * @method
 * ngOnInit - Initializes the modal component by updating properties based on parameters.
 */
export declare class BackgroundModal implements OnChanges, OnInit {
    isVisible: boolean;
    parameters: BackgroundModalParameters;
    position: string;
    backgroundColor: string;
    onClose: () => void;
    defaultImagesContainerRef: ElementRef;
    uploadImageInputRef: ElementRef;
    backgroundCanvasRef: ElementRef;
    videoPreviewRef: ElementRef;
    captureVideoRef: ElementRef;
    loadingOverlayRef: ElementRef;
    applyBackgroundButtonRef: ElementRef;
    saveBackgroundButtonRef: ElementRef;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    customImage: string;
    selectedImage: string;
    segmentVideo: MediaStream | null;
    selfieSegmentation: SelfieSegmentation | null;
    pauseSegmentation: boolean;
    processedStream: MediaStream | null;
    keepBackground: boolean;
    backgroundHasChanged: boolean;
    virtualStream: MediaStream | null;
    mainCanvas: HTMLCanvasElement;
    prevKeepBackground: boolean;
    appliedBackground: boolean;
    videoAlreadyOn: boolean;
    audioOnlyRoom: boolean;
    islevel: string;
    recordStarted: boolean;
    recordResumed: boolean;
    recordPaused: boolean;
    recordStopped: boolean;
    recordingMediaOptions: string;
    vidCons: any;
    frameRate: number;
    targetResolution: string;
    videoParams: ProducerOptions;
    autoClickBackground: boolean;
    localStreamVideo: MediaStream | null;
    clonedStream: MediaStream | null;
    clonedTrack: MediaStreamTrack | null;
    updateCustomImage: (value: string) => void;
    updateSelectedImage: (value: string) => void;
    updateSegmentVideo: (value: MediaStream | null) => void;
    updateSelfieSegmentation: (value: SelfieSegmentation | null) => void;
    updatePauseSegmentation: (value: boolean) => void;
    updateProcessedStream: (value: MediaStream | null) => void;
    updateKeepBackground: (value: boolean) => void;
    updateBackgroundHasChanged: (value: boolean) => void;
    updateVirtualStream: (value: MediaStream | null) => void;
    updateMainCanvas: (value: HTMLCanvasElement) => void;
    updatePrevKeepBackground: (value: boolean) => void;
    updateAppliedBackground: (value: boolean) => void;
    updateVideoParams: (value: ProducerOptions) => void;
    updateAutoClickBackground: (value: boolean) => void;
    createSendTransport: CreateSendTransportType;
    connectSendTransportVideo: ConnectSendTransportVideoType;
    disconnectSendTransportVideo: DisconnectSendTransportVideoType;
    onScreenChanges: OnScreenChangesType;
    sleep: SleepType;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    updateVariables(): void;
    onVisibilityChange: () => Promise<void>;
    preloadModel(): Promise<void>;
    renderDefaultImages(): void;
    handleImageUpload(event: Event): Promise<void>;
    clearCanvas(): void;
    loadImageToCanvas(src: string, fullSrc: string): Promise<void>;
    removeBackground(img: HTMLImageElement): void;
    applyBackground(): Promise<void>;
    selfieSegmentationPreview(doSegmentation: boolean): Promise<void>;
    saveBackground: () => Promise<void>;
    handleModalClose: () => void;
    showLoading(): void;
    hideLoading(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BackgroundModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BackgroundModal, "app-background-modal", never, { "isVisible": { "alias": "isVisible"; "required": false; }; "parameters": { "alias": "parameters"; "required": false; }; "position": { "alias": "position"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "onClose": { "alias": "onClose"; "required": false; }; }, {}, never, never, true, never>;
}
