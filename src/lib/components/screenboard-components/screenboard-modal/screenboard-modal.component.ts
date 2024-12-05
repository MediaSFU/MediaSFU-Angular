/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Producer } from 'mediasoup-client/lib/types';
import {
  ConnectSendTransportScreenType,
  CreateSendTransportType,
  DisconnectSendTransportScreenType,
  PrepopulateUserMediaType,
  StopShareScreenType,
  SleepType,
  ConnectSendTransportScreenParameters,
  CreateSendTransportParameters,
  DisconnectSendTransportScreenParameters,
  PrepopulateUserMediaParameters,
  StopShareScreenParameters,
} from '../../../@types/types';

export interface ScreenboardModalParameters
  extends ConnectSendTransportScreenParameters,
    CreateSendTransportParameters,
    DisconnectSendTransportScreenParameters,
    PrepopulateUserMediaParameters,
    StopShareScreenParameters {
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

  // mediasfu functions
  sleep: SleepType;
  createSendTransport: CreateSendTransportType;
  disconnectSendTransportScreen: DisconnectSendTransportScreenType;
  connectSendTransportScreen: ConnectSendTransportScreenType;
  stopShareScreen: StopShareScreenType;
  prepopulateUserMedia: PrepopulateUserMediaType;

  getUpdatedAllParams: () => ScreenboardModalParameters;
  // [key: string]: any;
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
 * @returns {HTMLElement} The screenboard modal component.
 * @example
 * ```html
 * <app-screenboard-modal
 *  [parameters]="screenboardModalParams"
 * [isVisible]="isModalVisible"
 * [onClose]="closeModal"
 * [position]="'topRight'"
 * [backgroundColor]="'#83c0e9'">
 * </app-screenboard-modal>
 * ```
 */
@Component({
    selector: 'app-screenboard-modal',
    templateUrl: './screenboard-modal.component.html',
    styleUrls: ['./screenboard-modal.component.css'],
    imports: [CommonModule, FormsModule, FontAwesomeModule]
})
export class ScreenboardModal implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() parameters: ScreenboardModalParameters = {} as ScreenboardModalParameters;
  @Input() isVisible = false;
  @Input() onClose!: () => void;
  @Input() position = 'topRight';
  @Input() backgroundColor = '#83c0e9';

  @ViewChild('screenVideo') screenVideoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('screenCanvas') screenCanvasRef!: ElementRef<HTMLCanvasElement>;

  faTimes = faTimes;

  private annotationInterval: any;
  private annotationCheckInterval: any;
  private clonedStreamScreen: MediaStream | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  ngOnInit() {
    // Initialization logic that does not depend on the view
  }

  ngOnDestroy() {
    this.stopAnnotation();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isVisible']) {
      this.isVisible = changes['isVisible'].currentValue;
      if (this.isVisible) {
        // In case isVisible changes after view init
        if (this.screenCanvasRef && this.screenVideoRef) {
          this.showModal();
        } else {
          setTimeout(() => {
            if (this.screenCanvasRef && this.screenVideoRef) {
              this.showModal();
            }
          }, 100);
        }
      } else {
        if (this.screenCanvasRef && this.screenVideoRef) {
          this.hideModal();
        }
      }
    }
  }

  ngAfterViewInit() {
    // Move logic that requires view access here
  }

  showModal = async () => {
    try {
      this.parameters = this.parameters.getUpdatedAllParams();
      const { annotateScreenStream, shared, createSendTransport, prepopulateUserMedia, hostLabel } =
        this.parameters;
      const annotate = annotateScreenStream;
      const screenVideo = this.screenVideoRef!.nativeElement;

      if (annotate && shared) {
        screenVideo.classList.remove('d-none');
        await this.annotatationPreview();
        setTimeout(async () => {
          if (!this.parameters.transportCreated) {
            await createSendTransport({ option: 'screen', parameters: this.parameters });
          } else {
            try {
              await this.handleScreenTransport();
              await this.parameters.sleep({ ms: 250 });
            } catch {
              /* handle error */
            }
          }
          await this.parameters.connectSendTransportScreen({
            stream: this.parameters.processedScreenStream,
            parameters: this.parameters,
          });
          await prepopulateUserMedia!({ name: hostLabel, parameters: this.parameters });
        }, 100);
      } else {
        screenVideo.classList.add('d-none');
      }
    } catch {
      /* handle error */
    }
  };

  hideModal = async () => {
    this.parameters = this.parameters.getUpdatedAllParams();
    const {
      annotateScreenStream,
      shared,
      createSendTransport,
      disconnectSendTransportScreen,
      stopShareScreen,
      prepopulateUserMedia,
      hostLabel,
    } = this.parameters;
    const annotate = annotateScreenStream;
    const screenVideo = this.screenVideoRef && this.screenVideoRef!.nativeElement;

    try {
      if (!annotate) {
        try {
          await this.stopAnnotation();
        } catch {
          /* handle error */
        }
        if (shared) {
          if (!this.parameters.transportCreated) {
            await createSendTransport({ option: 'screen', parameters: this.parameters });
          } else {
            try {
              await disconnectSendTransportScreen({ parameters: this.parameters });
              await this.parameters.sleep({ ms: 500 });
            } catch {
              /* handle error */
            }
            if (
              this.parameters.localStreamScreen &&
              this.parameters.localStreamScreen.getVideoTracks().length > 0 &&
              this.parameters.localStreamScreen.getVideoTracks()[0].readyState === 'ended'
            ) {
              this.parameters.localStreamScreen.removeTrack(
                this.parameters.localStreamScreen.getVideoTracks()[0],
              );
              if (this.clonedStreamScreen) {
                this.parameters.localStreamScreen.addTrack(
                  this.clonedStreamScreen.getVideoTracks()[0].clone(),
                );
              }
              this.parameters.updateLocalStreamScreen(this.parameters.localStreamScreen);
            }
            if (this.clonedStreamScreen) {
              this.clonedStreamScreen.getVideoTracks()[0].onended = async () => {
                await disconnectSendTransportScreen({ parameters: this.parameters });
                await stopShareScreen({ parameters: this.parameters });
              };
            }
            await this.parameters.connectSendTransportScreen({
              stream: this.parameters.localStreamScreen,
              parameters: this.parameters,
            });
          }
        } else {
          await this.stopAllTracks();
        }

        await prepopulateUserMedia!({ name: hostLabel, parameters: this.parameters });
      }
      screenVideo && screenVideo.classList.add('d-none');
      if (this.parameters.mainScreenCanvas && this.screenCanvasRef) {
        this.screenCanvasRef.nativeElement.classList.add('d-none');
      }
      this.onClose();
    } catch {
      /* handle error */
    }
  };

  annotatationPreview = async () => {
    const screenVideo = this.screenVideoRef!.nativeElement;
    if (!this.parameters.mainScreenCanvas) {
      this.parameters.mainScreenCanvas = this.screenCanvasRef.nativeElement;
      this.parameters.updateMainScreenCanvas(this.parameters.mainScreenCanvas);
    }
    const annotate = this.parameters.annotateScreenStream;

    if (
      annotate &&
      (!this.clonedStreamScreen ||
        (this.clonedStreamScreen &&
          this.clonedStreamScreen.getVideoTracks().length > 0 &&
          this.clonedStreamScreen.getVideoTracks()[0].readyState === 'ended'))
    ) {
      const originalTrack = this.parameters.localStreamScreen!.getVideoTracks()[0];
      const originalSettings = originalTrack.getSettings();
      const cloned = originalTrack.clone();
      await cloned.applyConstraints({
        width: originalSettings.width,
        height: originalSettings.height,
        frameRate: originalSettings.frameRate,
        aspectRatio: originalSettings.aspectRatio,
      });
      this.clonedStreamScreen = new MediaStream([cloned]);
    }

    if (
      this.clonedStreamScreen &&
      this.parameters.localStreamScreen &&
      this.parameters.localStreamScreen.getVideoTracks().length > 0 &&
      this.parameters.localStreamScreen.getVideoTracks()[0].readyState === 'ended'
    ) {
      this.parameters.localStreamScreen.removeTrack(
        this.parameters.localStreamScreen.getVideoTracks()[0],
      );
      this.parameters.localStreamScreen.addTrack(
        this.clonedStreamScreen.getVideoTracks()[0].clone(),
      );
    }

    if (this.clonedStreamScreen) {
      this.clonedStreamScreen.getVideoTracks()[0].onended = async () => {
        await this.parameters.disconnectSendTransportScreen({ parameters: this.parameters });
        await this.parameters.stopShareScreen({ parameters: this.parameters });
      };
    }

    const mediaCanvas = this.parameters.mainScreenCanvas;
    const ctx = mediaCanvas.getContext('2d');
    mediaCanvas.width = this.parameters.localStreamScreen!.getVideoTracks()[0].getSettings().width!;
    mediaCanvas.height = this.parameters
      .localStreamScreen!.getVideoTracks()[0]
      .getSettings().height!;

    if (!annotate) {
      this.parameters.processedScreenStream = null;
      this.parameters.updateProcessedScreenStream(null);
    }

    const captureStream = () => {
      const stream = mediaCanvas.captureStream(30);
      this.annotationCheckInterval = setInterval(() => {
        const params = this.parameters.getUpdatedAllParams();
        canvasElement = params.canvasScreenboard;
        const height = canvasElement!.height;
        const width = canvasElement!.width;
        const refHeight = params.localStreamScreen!.getVideoTracks()[0].getSettings().height!;
        const refWidth = params.localStreamScreen!.getVideoTracks()[0].getSettings().width!;
        if (height !== refHeight || width !== refWidth) {
          canvasElement!.width = refWidth;
          canvasElement!.height = refHeight;
          mediaCanvas.width = refWidth;
          mediaCanvas.height = refHeight;
        }
      }, 1000);
      this.annotationInterval = setInterval(() => {
        drawCombined();
      }, 30);
      return stream;
    };

    const annotateImage = async () => {
      this.parameters.processedScreenStream = await captureStream();
      this.parameters.updateProcessedScreenStream(this.parameters.processedScreenStream);
    };

    const annotateVideo = this.clonedStreamScreen;
    if (annotateVideo && annotate) {
      screenVideo.style.width = `${annotateVideo.getVideoTracks()[0].getSettings().width}px`;
      screenVideo.style.height = `${annotateVideo.getVideoTracks()[0].getSettings().height}px`;
      screenVideo.srcObject = annotateVideo;
      await annotateImage();
    }

    let canvasElement = this.parameters.getUpdatedAllParams().canvasScreenboard;
    canvasElement!.width = mediaCanvas.width;
    canvasElement!.height = mediaCanvas.height;

    const drawCombined = () => {
      ctx!.clearRect(0, 0, canvasElement!.width, canvasElement!.height);
      ctx!.drawImage(screenVideo, 0, 0, canvasElement!.width, canvasElement!.height);
      ctx!.drawImage(canvasElement!, 0, 0, canvasElement!.width, canvasElement!.height);
      ctx!.restore();
    };
  };

  handleScreenTransport = async () => {
    if (
      this.parameters.localStreamScreen!.getVideoTracks().length > 0 &&
      this.parameters.localStreamScreen!.getVideoTracks()[0].id ===
        this.parameters.screenProducer?.track!.id
    ) {
      if (
        this.clonedStreamScreen &&
        this.clonedStreamScreen.getVideoTracks().length > 0 &&
        this.clonedStreamScreen.getVideoTracks()[0].readyState === 'ended'
      ) {
        this.clonedStreamScreen.removeTrack(this.clonedStreamScreen.getVideoTracks()[0]);
        this.clonedStreamScreen.addTrack(
          this.parameters.localStreamScreen!.getVideoTracks()[0].clone(),
        );
      }
      this.parameters.localStreamScreen!.removeTrack(
        this.parameters.localStreamScreen!.getVideoTracks()[0],
      );
      this.parameters.localStreamScreen!.addTrack(
        this.clonedStreamScreen!.getVideoTracks()[0].clone(),
      );
    }
    await this.parameters.disconnectSendTransportScreen({ parameters: this.parameters });
  };

  stopAnnotation = async () => {
    if (this.annotationInterval) {
      clearInterval(this.annotationInterval);
      clearInterval(this.annotationCheckInterval);
      this.annotationInterval = null;
      this.annotationCheckInterval = null;
    }

    if (this.parameters.processedScreenStream) {
      this.parameters.processedScreenStream
        .getTracks()
        .forEach((track: MediaStreamTrack) => track.stop());
      this.parameters.processedScreenStream = null;
      this.parameters.updateProcessedScreenStream(null);
    }

    if (this.parameters.mainScreenCanvas) {
      this.parameters.mainScreenCanvas
        ?.getContext('2d')!
        .clearRect(
          0,
          0,
          this.parameters.mainScreenCanvas.width,
          this.parameters.mainScreenCanvas.height,
        );
    }
  };

  stopAllTracks = async () => {
    try {
      if (
        this.parameters.localStreamScreen &&
        this.parameters.localStreamScreen.getVideoTracks().length > 0
      ) {
        this.parameters.localStreamScreen
          .getVideoTracks()
          .forEach((track: MediaStreamTrack) => track.stop());
        this.parameters.updateLocalStreamScreen(null);
      } else {
        this.parameters.updateLocalStreamScreen(null);
      }
    } catch {
      /* handle error */
    }

    try {
      if (this.clonedStreamScreen && this.clonedStreamScreen.getVideoTracks().length > 0) {
        this.clonedStreamScreen.getVideoTracks().forEach((track) => track.stop());
      }
    } catch {
      /* handle error */
    }

    try {
      if (this.parameters.processedScreenStream) {
        this.parameters.processedScreenStream
          .getTracks()
          .forEach((track: MediaStreamTrack) => track.stop());
        this.parameters.updateProcessedScreenStream(null);
      }
    } catch {
      /* handle error */
    }

    this.clonedStreamScreen = null;
  };
}
