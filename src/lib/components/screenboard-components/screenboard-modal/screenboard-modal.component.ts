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
import { types } from 'mediasoup-client';
type Producer = types.Producer;
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
  overlayStyle?: Partial<CSSStyleDeclaration>;
  contentStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: any;
}

export type ScreenboardModalType = (options: ScreenboardModalOptions) => HTMLElement;

/**
 * ScreenboardModal - Modal for annotating on shared screen in real-time
 * 
 * @component
 * @description
 * Provides drawing/annotation tools for marking up a shared screen during screen sharing.
 * Displays canvas overlay for annotations that are visible to all participants.
 * 
 * Supports three levels of customization:
 * 1. **Basic Usage**: Use default modal UI with canvas annotation tools
 * 2. **Style Customization**: Override modal appearance with overlayStyle and contentStyle
 * 3. **Full Override**: Provide a custom template via customTemplate for complete control
 * 
 * Key Features:
 * - Canvas-based screen annotation
 * - Real-time annotation preview
 * - Drawing tools (pen, highlighter, shapes)
 * - Clear/undo annotations
 * - Screen transport management
 * - Annotation interval updates
 * 
 * @selector app-screenboard-modal
 * @standalone true
 * @imports CommonModule, FormsModule, FontAwesomeModule
 * 
 * @input parameters - Object containing screen stream, annotation settings, and MediaSoup transport methods. Default: `{}`
 * @input isVisible - Whether the modal is currently visible. Default: `false`
 * @input onClose - Callback function to close the modal. Default: `() => {}`
 * @input position - Modal position on screen ('topRight', 'fullscreen', etc.). Default: `'topRight'`
 * @input backgroundColor - Background color of the modal content. Default: `'#83c0e9'`
 * @input overlayStyle - Custom CSS styles for the modal overlay backdrop. Default: `undefined`
 * @input contentStyle - Custom CSS styles for the modal content container. Default: `undefined`
 * @input customTemplate - Custom TemplateRef to completely replace default modal template. Default: `undefined`
 * 
 * @method ngOnInit - Initializes component (non-view dependent logic)
 * @method ngOnDestroy - Cleanup: stops annotations and removes intervals
 * @method ngOnChanges - Updates modal state when visibility changes
 * @method ngAfterViewInit - Sets up canvas and video elements after view init
 * @method showModal - Shows modal and initializes screen annotation
 * @method hideModal - Hides modal and cleans up annotation resources
 * @method annotationPreview - Handles real-time annotation preview rendering
 * @method handleScreenTransport - Manages screen share transport logic
 * @method stopAnnotation - Stops annotation intervals and resets canvas
 * @method stopAllTracks - Stops all media tracks in cloned screen stream
 * @method getCombinedOverlayStyle - Merges default and custom overlay styles
 * @method getCombinedContentStyle - Merges default and custom content styles
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
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: any;

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

  getCombinedOverlayStyle() {
    return {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: this.isVisible ? 'flex' : 'none',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
      ...(this.overlayStyle || {})
    };
  }

  getCombinedContentStyle() {
    return {
      backgroundColor: this.backgroundColor,
      borderRadius: '10px',
      padding: '10px',
      maxWidth: '90%',
      maxHeight: '85%',
      overflowY: 'auto',
      position: 'fixed',
      top: this.position.includes('top') ? '10px' : 'auto',
      bottom: this.position.includes('bottom') ? '10px' : 'auto',
      left: this.position.includes('Left') ? '10px' : 'auto',
      right: this.position.includes('Right') ? '10px' : 'auto',
      ...(this.contentStyle || {})
    };
  }
}
