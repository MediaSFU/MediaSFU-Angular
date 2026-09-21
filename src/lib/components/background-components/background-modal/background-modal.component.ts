/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import * as SelfieSegmentationPackage from '@mediapipe/selfie_segmentation';
import type { SelfieSegmentation } from '@mediapipe/selfie_segmentation';
import {
  compositeVirtualBackgroundFrame,
  DEFAULT_BACKGROUND_BLUR_PIXELS,
  isVirtualBackgroundBlur,
  VIRTUAL_BACKGROUND_BLUR,
} from 'mediasfu-shared';
import {
  ConnectSendTransportVideoParameters,
  ConnectSendTransportVideoType,
  CreateSendTransportParameters,
  CreateSendTransportType,
  DisconnectSendTransportVideoParameters,
  DisconnectSendTransportVideoType,
  OnScreenChangesParameters,
  OnScreenChangesType,
  ShowAlert,
  SleepType,
  VidCons,
} from '../../../@types/types';
import { types } from 'mediasoup-client';
import { ModernRenderMode, isEmbeddedRenderMode } from '../../../modern/utils/render-mode.utils';
type Producer = types.Producer;
type ProducerOptions = types.ProducerOptions;
const SelfieSegmentationConstructor =
  SelfieSegmentationPackage.SelfieSegmentation ??
  (SelfieSegmentationPackage as typeof SelfieSegmentationPackage & {
    default?: typeof SelfieSegmentationPackage;
  }).default?.SelfieSegmentation;

export interface BackgroundModalParameters
  extends CreateSendTransportParameters,
    ConnectSendTransportVideoParameters,
    DisconnectSendTransportVideoParameters,
    OnScreenChangesParameters {
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
  updateMainCanvas: (canvas: HTMLCanvasElement | null) => void;

  // mediasfu functions
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
  isDarkMode?: boolean;
  onClose: () => void;
  overlayStyle?: Partial<CSSStyleDeclaration>;
  contentStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: any;
}

// export the type definition for the component
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


@Component({
    selector: 'app-background-modal',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './background-modal.component.html',
    styleUrls: ['./background-modal.component.css']
})
export class BackgroundModal implements OnChanges, OnInit, OnDestroy {
  @Input() isVisible = false;
  @Input() parameters: BackgroundModalParameters = {} as BackgroundModalParameters;
  @Input() position = 'topLeft';
  @Input() backgroundColor = '#f5f5f5';
  @Input() isDarkMode?: boolean;
  @Input() onClose: () => void = () => {
    console.log('onClose');
  };
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: any;
  @Input() renderMode: ModernRenderMode = 'modal';
  @Input() showHeader = true;

  @ViewChild('defaultImagesContainer') defaultImagesContainerRef!: ElementRef;
  @ViewChild('uploadImageInput') uploadImageInputRef!: ElementRef;
  @ViewChild('backgroundCanvas') backgroundCanvasRef!: ElementRef;
  @ViewChild('mainCanvas') mainCanvasRef!: ElementRef;
  @ViewChild('videoPreview') videoPreviewRef!: ElementRef;
  @ViewChild('captureVideo') captureVideoRef!: ElementRef;
  @ViewChild('loadingOverlay') loadingOverlayRef!: ElementRef;
  @ViewChild('applyBackgroundButton') applyBackgroundButtonRef!: ElementRef;
  @ViewChild('saveBackgroundButton') saveBackgroundButtonRef!: ElementRef;

  faTimes = faTimes;

  customImage = '';
  selectedImage = '';
  segmentVideo: MediaStream | null = null;
  selfieSegmentation: SelfieSegmentation | null = null;
  pauseSegmentation = false;
  processedStream: MediaStream | null = null;
  keepBackground = false;
  backgroundHasChanged = false;
  virtualStream: MediaStream | null = null;
  mainCanvas!: HTMLCanvasElement;
  prevKeepBackground = false;
  appliedBackground = false;
  videoAlreadyOn = false;
  audioOnlyRoom = false;
  islevel = '0';
  recordStarted = false;
  recordResumed = false;
  recordPaused = false;
  recordStopped = false;
  recordingMediaOptions = '';
  vidCons: any = {};
  frameRate = 5;
  targetResolution = '1280x720';
  videoParams: ProducerOptions = {};
  autoClickBackground = false;
  localStreamVideo: MediaStream | null = null;

  clonedStream: MediaStream | null = null;
  clonedTrack: MediaStreamTrack | null = null;
  private previewLoopVersion = 0;
  private previewAnimationFrameId: number | null = null;
  private previewCaptureTimeoutId: ReturnType<typeof setTimeout> | null = null;

  updateCustomImage!: (value: string) => void;
  updateSelectedImage!: (value: string) => void;
  updateSegmentVideo!: (value: MediaStream | null) => void;
  updateSelfieSegmentation!: (value: SelfieSegmentation | null) => void;
  updatePauseSegmentation!: (value: boolean) => void;
  updateProcessedStream!: (value: MediaStream | null) => void;
  updateKeepBackground!: (value: boolean) => void;
  updateBackgroundHasChanged!: (value: boolean) => void;
  updateVirtualStream!: (value: MediaStream | null) => void;
  updateMainCanvas!: (value: HTMLCanvasElement | null) => void;
  updatePrevKeepBackground!: (value: boolean) => void;
  updateAppliedBackground!: (value: boolean) => void;
  updateVideoParams!: (value: ProducerOptions) => void;
  updateAutoClickBackground!: (value: boolean) => void;

  // Media functions
  createSendTransport!: CreateSendTransportType;
  connectSendTransportVideo!: ConnectSendTransportVideoType;
  disconnectSendTransportVideo!: DisconnectSendTransportVideoType;
  onScreenChanges!: OnScreenChangesType;
  sleep!: SleepType;

  get resolvedIsDarkMode(): boolean {
    if (typeof this.isDarkMode === 'boolean') {
      return this.isDarkMode;
    }

    return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  }

  private resolveParameters(): BackgroundModalParameters {
    if (this.parameters?.getUpdatedAllParams) {
      return this.parameters.getUpdatedAllParams();
    }

    return this.parameters;
  }

  isVisibleState(): boolean {
    return this.isEmbedded() || this.isVisible;
  }

  shouldRetainProcessingSurface(): boolean {
    return !!(
      this.videoAlreadyOn &&
      this.keepBackground &&
      this.appliedBackground &&
      this.processedStream?.getVideoTracks().some((track) => track.readyState === 'live')
    );
  }

  shouldRenderState(): boolean {
    return this.isVisibleState() || this.shouldRetainProcessingSurface();
  }

  isEmbedded(): boolean {
    return isEmbeddedRenderMode(this.renderMode);
  }

  hasSelectedBackground(): boolean {
    return !!(this.selectedImage || this.customImage);
  }

  stageStatusCopy(): string {
    if (!this.videoAlreadyOn) {
      return this.hasSelectedBackground() ? 'Saved for camera on' : 'Camera off';
    }

    if (this.keepBackground && this.appliedBackground) {
      return 'Ready to save';
    }

    if (this.hasSelectedBackground()) {
      return 'Selection loaded';
    }

    return 'Choose a background';
  }

  guidanceCopy(): string {
    if (!this.videoAlreadyOn && this.hasSelectedBackground()) {
      return 'Background saved - it will apply when your camera turns on.';
    }

    if (!this.videoAlreadyOn) {
      return 'Camera is currently off. Turn video on to preview your background live.';
    }

    if (this.keepBackground && this.appliedBackground) {
      return 'Preview looks ready. Save to keep this background in the active stream.';
    }

    if (this.hasSelectedBackground()) {
      return 'Background selected. Preview it here before saving it to the room.';
    }

    return 'Choose a built-in backdrop or upload a custom image to start.';
  }

  guidanceTone(): 'info' | 'success' {
    return !this.videoAlreadyOn && this.hasSelectedBackground()
      ? 'success'
      : this.keepBackground && this.appliedBackground
        ? 'success'
        : 'info';
  }

  ngOnInit() {
    // Initialize local properties from the parameters
    if (this.parameters) {
      try {
        this.updateVariables();
      } catch {
        /* handle error */
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isVisible']) {
      this.onVisibilityChange();
    }

    if (changes['autoClickBackground']) {
      console.log(
        'Auto click background changed:',
        this.autoClickBackground,
        changes['autoClickBackground'],
      );
    }
  }

  ngOnDestroy() {
    this.cleanupPreviewLifecycle(true);
  }

  private previewSurfaceReady(): boolean {
    return !!(
      this.backgroundCanvasRef?.nativeElement &&
      this.videoPreviewRef?.nativeElement &&
      this.captureVideoRef?.nativeElement
    );
  }

  private interactiveViewReady(): boolean {
    return !!(
      this.defaultImagesContainerRef?.nativeElement &&
      this.backgroundCanvasRef?.nativeElement &&
      this.mainCanvasRef?.nativeElement &&
      this.videoPreviewRef?.nativeElement &&
      this.captureVideoRef?.nativeElement &&
      this.applyBackgroundButtonRef?.nativeElement &&
      this.saveBackgroundButtonRef?.nativeElement &&
      this.loadingOverlayRef?.nativeElement
    );
  }

  private async waitForInteractiveView(): Promise<boolean> {
    for (let attempt = 0; attempt < 20; attempt += 1) {
      if (this.interactiveViewReady()) {
        return true;
      }

      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 100);
      });
    }

    return this.interactiveViewReady();
  }

  private syncMainCanvasRef() {
    const mainCanvasElement = this.mainCanvasRef?.nativeElement ?? null;

    if (!this.mainCanvas && mainCanvasElement) {
      this.mainCanvas = mainCanvasElement;
      this.updateMainCanvas?.(mainCanvasElement);
    }
  }

  private async waitForProcessedStream(): Promise<void> {
    for (let attempt = 0; !this.processedStream && attempt < 30; attempt += 1) {
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 100);
      });

      const updatedParams = this.parameters?.getUpdatedAllParams?.();
      this.processedStream = updatedParams?.processedStream || this.processedStream;
    }
  }

  private cleanupPreviewLifecycle(force = false) {
    if (!this.previewSurfaceReady()) {
      return;
    }

    try {
      if (force) {
        this.stopPreviewProcessing();
      }

      if (!force && this.shouldRetainProcessingSurface()) {
        this.hideLoading();
        return;
      }

      this.stopPreviewProcessing();

      if (
        !this.appliedBackground ||
        (this.appliedBackground && !this.keepBackground) ||
        (this.appliedBackground && !this.videoAlreadyOn)
      ) {
        const refVideo = this.captureVideoRef.nativeElement;
        this.pauseSegmentation = true;
        this.updatePauseSegmentation(this.pauseSegmentation);

        if (!this.videoAlreadyOn) {
          if (refVideo?.srcObject) {
            refVideo.srcObject.getTracks().forEach((track: any) => track.stop());
            refVideo.srcObject = null;
          }

          if (this.segmentVideo) {
            this.segmentVideo.getTracks().forEach((track: any) => track.stop());
            this.segmentVideo = null;
            this.updateSegmentVideo(this.segmentVideo);
          }

          if (this.virtualStream) {
            this.virtualStream.getTracks().forEach((track: any) => track.stop());
            this.virtualStream = null;
            this.updateVirtualStream(this.virtualStream);
          }
        }
      }

      this.hideLoading();
      this.videoPreviewRef.nativeElement.classList.add('d-none');
      this.backgroundCanvasRef.nativeElement.classList.remove('d-none');
    } catch {
      /* handle error */
    }
  }

  private stopPreviewProcessing() {
    this.previewLoopVersion += 1;

    if (this.previewAnimationFrameId !== null) {
      cancelAnimationFrame(this.previewAnimationFrameId);
      this.previewAnimationFrameId = null;
    }

    if (this.previewCaptureTimeoutId !== null) {
      clearTimeout(this.previewCaptureTimeoutId);
      this.previewCaptureTimeoutId = null;
    }
  }

  updateVariables() {
    const params = this.resolveParameters();

    this.customImage = params.customImage || '';
    this.selectedImage = params.selectedImage || '';
    this.segmentVideo = params.segmentVideo || null;
    this.selfieSegmentation = params.selfieSegmentation || null;
    this.pauseSegmentation = params.pauseSegmentation || false;
    this.processedStream = params.processedStream || null;
    this.keepBackground = params.keepBackground || false;
    this.backgroundHasChanged = params.backgroundHasChanged || false;
    this.virtualStream = params.virtualStream || null;
    this.mainCanvas = params.mainCanvas || this.mainCanvasRef?.nativeElement || null;
    this.prevKeepBackground = params.prevKeepBackground || false;
    this.appliedBackground = params.appliedBackground || false;
    this.videoAlreadyOn = params.videoAlreadyOn || false;
    this.audioOnlyRoom = params.audioOnlyRoom || false;
    this.islevel = params.islevel || '0';
    this.recordStarted = params.recordStarted || false;
    this.recordResumed = params.recordResumed || false;
    this.recordPaused = params.recordPaused || false;
    this.recordStopped = params.recordStopped || false;
    this.recordingMediaOptions = params.recordingMediaOptions || '';
    this.vidCons = params.vidCons || {};
    this.frameRate = params.frameRate || 5;
    this.videoParams = params.videoParams || null;
    this.autoClickBackground = params.autoClickBackground || false;
    this.localStreamVideo = params.localStreamVideo || null;

    // Assign method references
    this.updateCustomImage = params.updateCustomImage;
    this.updateSelectedImage = params.updateSelectedImage;
    this.updateSegmentVideo = params.updateSegmentVideo;
    this.updateSelfieSegmentation = params.updateSelfieSegmentation;
    this.updatePauseSegmentation = params.updatePauseSegmentation;
    this.updateProcessedStream = params.updateProcessedStream;
    this.updateKeepBackground = params.updateKeepBackground;
    this.updateBackgroundHasChanged = params.updateBackgroundHasChanged;
    this.updateVirtualStream = params.updateVirtualStream;
    this.updateMainCanvas = params.updateMainCanvas;
    this.updatePrevKeepBackground = params.updatePrevKeepBackground;
    this.updateAppliedBackground = params.updateAppliedBackground;
    this.updateVideoParams = params.updateVideoParams;
    this.updateAutoClickBackground = params.updateAutoClickBackground;

    this.createSendTransport = params.createSendTransport;
    this.connectSendTransportVideo = params.connectSendTransportVideo;
    this.disconnectSendTransportVideo = params.disconnectSendTransportVideo;
    this.onScreenChanges = params.onScreenChanges;
    this.sleep = params.sleep;
  }

  onVisibilityChange = async () => {
    if (this.parameters) {
      this.updateVariables();
    }

    if (this.isVisible) {
      if (!this.selfieSegmentation) {
        await this.preloadModel().catch(() => console.log('Error preloading model:'));
      }

      if (!(await this.waitForInteractiveView())) {
        return;
      }

      this.syncMainCanvasRef();

      this.renderDefaultImages();

      if (this.selectedImage && !isVirtualBackgroundBlur(this.selectedImage)) {
        await this.loadImageToCanvas(this.selectedImage, this.selectedImage);
      } else if (isVirtualBackgroundBlur(this.selectedImage)) {
        this.selectBlurBackground();
      } else {
        this.clearCanvas();
        this.backgroundCanvasRef.nativeElement.classList.remove('d-none');
      }

      this.saveBackgroundButtonRef.nativeElement.classList.add('d-none');
      this.saveBackgroundButtonRef.nativeElement.disabled = true;
      this.applyBackgroundButtonRef.nativeElement.classList.remove('d-none');
      this.applyBackgroundButtonRef.nativeElement.disabled = false;

      if (
        this.processedStream &&
        this.prevKeepBackground == this.keepBackground &&
        this.keepBackground &&
        this.appliedBackground
      ) {
        this.applyBackgroundButtonRef.nativeElement.innerText = 'Apply Background';
      } else {
        this.applyBackgroundButtonRef.nativeElement.innerText = 'Preview Background';
      }

      if (this.autoClickBackground) {
        if (!(await this.waitForInteractiveView())) {
          console.error('Background modal refs not ready after waiting');
          this.autoClickBackground = false;
          this.updateAutoClickBackground(false);
          this.handleModalClose();
          return;
        }

        try {
          await this.applyBackground();
          await this.saveBackground();
        } catch (error) {
          console.error('Error auto-applying background:', error);
        } finally {
          this.autoClickBackground = false;
          this.updateAutoClickBackground(this.autoClickBackground);
          this.handleModalClose();
        }
      }
    } else {
      this.cleanupPreviewLifecycle();
    }
  };

  async preloadModel() {
    if (!SelfieSegmentationConstructor) {
      throw new Error('MediaPipe SelfieSegmentation is unavailable.');
    }

    this.selfieSegmentation = new SelfieSegmentationConstructor({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
    });
    this.selfieSegmentation.setOptions({
      modelSelection: 1,
      selfieMode: false,
    });
    await this.selfieSegmentation.initialize();
    this.updateSelfieSegmentation(this.selfieSegmentation);
  }

  renderDefaultImages() {
    const defaultImages = ['wall', 'wall2', 'shelf', 'clock', 'desert', 'flower'];
    const defaultImagesContainer = this.defaultImagesContainerRef?.nativeElement;
    if (!defaultImagesContainer) {
      return;
    }

    defaultImagesContainer.innerHTML = '';

    defaultImages.forEach((baseName) => {
      const thumb = `https://mediasfu.com/images/backgrounds/${baseName}_thumbnail.jpg`;
      const small = `https://mediasfu.com/images/backgrounds/${baseName}_small.jpg`;
      const large = `https://mediasfu.com/images/backgrounds/${baseName}_large.jpg`;
      const full = `https://mediasfu.com/images/backgrounds/${baseName}.jpg`;
      const img = document.createElement('img');
      img.src = thumb;
      img.classList.add('img-thumbnail', 'm-1');
      img.style.width = '80px';
      img.style.cursor = 'pointer';
      img.addEventListener('click', async () => {
        if (this.targetResolution == 'fhd' || this.targetResolution == 'qhd') {
          await this.loadImageToCanvas(small, large);
        } else {
          await this.loadImageToCanvas(small, full);
        }
      });
      defaultImagesContainer.appendChild(img);
    });

    const blurBackground = document.createElement('div');
    blurBackground.classList.add('img-thumbnail', 'm-1', 'd-flex', 'align-items-center', 'justify-content-center');
    blurBackground.setAttribute('role', 'button');
    blurBackground.setAttribute('aria-label', 'Blur background');
    blurBackground.style.width = '76px';
    blurBackground.style.minHeight = '60px';
    blurBackground.style.cursor = 'pointer';
    blurBackground.style.color = '#e2e8f0';
    blurBackground.style.fontWeight = '600';
    blurBackground.style.background = 'linear-gradient(135deg, rgba(96,165,250,.45), rgba(15,23,42,.92))';
    blurBackground.textContent = 'Blur';
    blurBackground.addEventListener('click', () => this.selectBlurBackground());
    defaultImagesContainer.appendChild(blurBackground);

    const noBackgroundImg = document.createElement('div');
    noBackgroundImg.classList.add(
      'img-thumbnail',
      'm-1',
      'd-flex',
      'align-items-center',
      'justify-content-center',
    );
    noBackgroundImg.style.width = '76px';
    noBackgroundImg.style.minHeight = '60px';
    noBackgroundImg.style.cursor = 'pointer';
    noBackgroundImg.style.backgroundColor = '#f8f9fa';
    noBackgroundImg.style.border = '1px solid #dee2e6';
    noBackgroundImg.style.position = 'relative';
    noBackgroundImg.innerHTML =
      '<span style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); color:#000;">None</span>';
    noBackgroundImg.addEventListener('click', async () => {
      this.selectedImage = '';
      this.updateSelectedImage(this.selectedImage);
      this.updateCustomImage('');
      this.showLoading();
      this.videoPreviewRef.nativeElement.classList.add('d-none');
      this.backgroundCanvasRef.nativeElement.classList.remove('d-none');
      this.clearCanvas();
      this.hideLoading();
    });
    defaultImagesContainer.appendChild(noBackgroundImg);

    if (this.customImage) {
      const img = document.createElement('img');
      img.src = this.customImage;
      img.classList.add('img-thumbnail', 'm-1');
      img.style.width = '80px';
      img.style.cursor = 'pointer';
      img.addEventListener('click', async () => {
        await this.loadImageToCanvas(this.customImage, this.customImage);
      });
      defaultImagesContainer.appendChild(img);
    }
  }

  selectBlurBackground() {
    this.selectedImage = VIRTUAL_BACKGROUND_BLUR;
    this.customImage = '';
    this.updateSelectedImage(VIRTUAL_BACKGROUND_BLUR);
    this.updateCustomImage('');
    this.clearCanvas();
    const canvas = this.backgroundCanvasRef?.nativeElement as HTMLCanvasElement | undefined;
    const context = canvas?.getContext('2d');
    if (canvas && context) {
      context.fillStyle = '#1e293b';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = '#e2e8f0';
      context.font = '600 26px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText('Blur', canvas.width / 2, canvas.height / 2);
      canvas.classList.remove('d-none');
      this.videoPreviewRef?.nativeElement.classList.add('d-none');
    }
  }

  async handleImageUpload(event: Event) {
    let minWidth = 1280;
    let minHeight = 1280;
    let maxWidth = 2560;
    let maxHeight = 2560;

    if (this.targetResolution == 'fhd') {
      minWidth = 1920;
      minHeight = 1920;
    } else if (this.targetResolution == 'qhd') {
      minWidth = 2560;
      minHeight = 2560;
    } // For other resolutions, stick to the default 1280x1280

    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = async () => {
        if (
          img.width < minWidth ||
          img.height < minHeight ||
          img.width > maxWidth ||
          img.height > maxHeight
        ) {
          this.customImage = img.src;
          this.updateCustomImage(this.customImage);
          await this.loadImageToCanvas(img.src, img.src);
        }
      };
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          img.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  clearCanvas() {
    const ctx = this.backgroundCanvasRef.nativeElement.getContext('2d');
    ctx.clearRect(
      0,
      0,
      this.backgroundCanvasRef.nativeElement.width,
      this.backgroundCanvasRef.nativeElement.height,
    );
    ctx.font = '30px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      'No Background',
      this.backgroundCanvasRef.nativeElement.width / 2,
      this.backgroundCanvasRef.nativeElement.height / 2,
    );

    this.applyBackgroundButtonRef.nativeElement.classList.remove('d-none');
    this.applyBackgroundButtonRef.nativeElement.disabled = false;

    if (
      this.processedStream &&
      this.prevKeepBackground == this.keepBackground &&
      this.keepBackground &&
      this.appliedBackground
    ) {
      this.applyBackgroundButtonRef.nativeElement.innerText = 'Apply Background';
    } else {
      this.applyBackgroundButtonRef.nativeElement.innerText = 'Preview Background';
    }
  }

  async loadImageToCanvas(src: string, fullSrc: string) {
    this.showLoading();
    await this.backgroundCanvasRef.nativeElement.classList.remove('d-none');
    await this.videoPreviewRef.nativeElement.classList.add('d-none');

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      const ctx = await this.backgroundCanvasRef.nativeElement.getContext('2d');
      this.backgroundCanvasRef.nativeElement.width = img.width;
      this.backgroundCanvasRef.nativeElement.height = img.height;
      await ctx.drawImage(img, 0, 0);
      this.removeBackground(img);
      this.hideLoading();
    };
    img.src = src;
    this.selectedImage = fullSrc;
    this.updateSelectedImage(this.selectedImage);

    this.saveBackgroundButtonRef.nativeElement.classList.add('d-none');
    this.saveBackgroundButtonRef.nativeElement.disabled = true;
    this.applyBackgroundButtonRef.nativeElement.classList.remove('d-none');
    this.applyBackgroundButtonRef.nativeElement.disabled = false;

    if (
      this.processedStream &&
      this.prevKeepBackground == this.keepBackground &&
      this.keepBackground &&
      this.appliedBackground
    ) {
      this.applyBackgroundButtonRef.nativeElement.innerText = 'Apply Background';
    } else {
      this.applyBackgroundButtonRef.nativeElement.innerText = 'Preview Background';
    }
  }

  removeBackground(img: HTMLImageElement) {
    const ctx = this.backgroundCanvasRef.nativeElement.getContext('2d');
    ctx.clearRect(
      0,
      0,
      this.backgroundCanvasRef.nativeElement.width,
      this.backgroundCanvasRef.nativeElement.height,
    );
    ctx.drawImage(img, 0, 0);
  }

  async applyBackground() {
    try {
      const params = this.resolveParameters();

      if (this.audioOnlyRoom) {
        params.showAlert?.({
          message: 'You cannot use a background in an audio only event.',
          type: 'danger',
        });
        return;
      }

      this.showLoading();

      this.videoPreviewRef.nativeElement.classList.remove('d-none');
      this.backgroundCanvasRef.nativeElement.classList.add('d-none');

      const doSegmentation = this.selectedImage ? true : false;
      this.pauseSegmentation = false;
      this.updatePauseSegmentation(this.pauseSegmentation);
      await this.selfieSegmentationPreview(doSegmentation);
      if (doSegmentation) {
        await this.waitForProcessedStream();
      }

      this.hideLoading();

      this.applyBackgroundButtonRef.nativeElement.classList.add('d-none');
      this.applyBackgroundButtonRef.nativeElement.disabled = true;

      if (
        this.processedStream &&
        this.prevKeepBackground == this.keepBackground &&
        this.keepBackground &&
        this.appliedBackground
      ) {
        this.saveBackgroundButtonRef.nativeElement.classList.add('d-none');
        this.saveBackgroundButtonRef.nativeElement.disabled = true;
      } else {
        this.saveBackgroundButtonRef.nativeElement.classList.remove('d-none');
        this.saveBackgroundButtonRef.nativeElement.disabled = false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async selfieSegmentationPreview(doSegmentation: boolean) {
    const refVideo = this.captureVideoRef.nativeElement;
    const previewVideo = this.videoPreviewRef.nativeElement;
    const useBlur = isVirtualBackgroundBlur(this.selectedImage);
    const virtualImage = new Image();
    virtualImage.crossOrigin = 'anonymous';
    virtualImage.src = useBlur ? '' : this.selectedImage;

    if (doSegmentation && this.selectedImage && !useBlur) {
      await new Promise<void>((resolve) => {
        if (virtualImage.complete && virtualImage.naturalWidth > 0) {
          resolve();
          return;
        }

        virtualImage.onload = () => resolve();
        virtualImage.onerror = () => resolve();
      });
    }

    if (!this.mainCanvas) {
      this.mainCanvas = this.mainCanvasRef?.nativeElement || this.backgroundCanvasRef.nativeElement;
      this.updateMainCanvas?.(this.mainCanvas);
    }

    let mediaCanvas = this.mainCanvas;
    mediaCanvas.width = refVideo.videoWidth;
    mediaCanvas.height = refVideo.videoHeight;
    let ctx = mediaCanvas.getContext('2d');
    let firstFrameResolved = !doSegmentation;
    let resolveFirstFrame: (() => void) | null = null;
    const firstFrameRendered = new Promise<void>((resolve) => {
      resolveFirstFrame = resolve;
    });

    const markFirstFrameRendered = () => {
      if (firstFrameResolved) {
        return;
      }

      firstFrameResolved = true;
      resolveFirstFrame?.();
      resolveFirstFrame = null;
    };

    this.backgroundHasChanged = true;
    this.updateBackgroundHasChanged(this.backgroundHasChanged);
    this.prevKeepBackground = this.keepBackground;
    this.updatePrevKeepBackground(this.keepBackground);

    if (!doSegmentation) {
      const tracks = this.processedStream?.getVideoTracks();
      if (tracks) {
        tracks.forEach((track: MediaStreamTrack) => track.stop());
      }
      this.processedStream = null;
      this.keepBackground = false;
      this.updateProcessedStream(null);
      this.updateKeepBackground(false);
      previewVideo.classList.remove('d-none');
    }

    const onResults = (results: any) => {
      try {
        if (
          !this.pauseSegmentation &&
          mediaCanvas &&
          mediaCanvas.width > 0 &&
          mediaCanvas.height > 0 &&
          (useBlur || (virtualImage.width > 0 && virtualImage.height > 0))
        ) {
          const repeatPattern = !useBlur &&
            (virtualImage.width < mediaCanvas.width || virtualImage.height < mediaCanvas.height)
              ? 'repeat'
              : 'no-repeat';
          compositeVirtualBackgroundFrame({
            ctx: ctx!,
            segmentationMask: results.segmentationMask,
            sourceImage: results.image,
            backgroundImage: useBlur ? null : virtualImage,
            width: mediaCanvas.width,
            height: mediaCanvas.height,
            repeatPattern,
            blurFallbackPixels: useBlur ? DEFAULT_BACKGROUND_BLUR_PIXELS : 0,
          });
          markFirstFrameRendered();
        }
      } catch (error) {
        console.log('Error processing results:', error);
      }
    };

    if (!this.selfieSegmentation) {
      await this.preloadModel().catch(() => console.log('Error preloading model:'));
    }

    try {
      this.selfieSegmentation!.onResults(onResults);
    } catch (error) {
      console.log(error);
    }

    const segmentImage = async (videoElement: HTMLVideoElement) => {
      this.stopPreviewProcessing();

      const previewLoopVersion = this.previewLoopVersion;
      let startedProcessing = false;

      const startProcessing = () => {
        if (startedProcessing) {
          return;
        }

        startedProcessing = true;
        void processFrame();
      };

      const processFrame = () => {
        if (
          previewLoopVersion !== this.previewLoopVersion ||
          !this.selfieSegmentation ||
          this.pauseSegmentation ||
          !videoElement ||
          videoElement.videoWidth == 0 ||
          videoElement.videoHeight == 0
        ) {
          return;
        }

        void this.selfieSegmentation.send({ image: videoElement }).catch(() => undefined);

        this.previewAnimationFrameId = requestAnimationFrame(() => {
          processFrame();
        });
      };

      videoElement.onloadeddata = () => {
        startProcessing();
      };

      if (videoElement.readyState >= 2 && videoElement.videoWidth > 0 && videoElement.videoHeight > 0) {
        startProcessing();
      }

      this.previewCaptureTimeoutId = setTimeout(async () => {
        if (previewLoopVersion !== this.previewLoopVersion) {
          return;
        }

        await Promise.race([
          firstFrameRendered,
          new Promise<void>((resolve) => {
            setTimeout(() => resolve(), 1200);
          }),
        ]);

        if (previewLoopVersion !== this.previewLoopVersion) {
          return;
        }

        console.log('Capturing stream:', this.frameRate || 5);
        this.processedStream = mediaCanvas.captureStream(this.frameRate || 5);
        this.updateProcessedStream(this.processedStream);
        previewVideo.srcObject = this.processedStream;
        previewVideo.classList.remove('d-none');
        this.keepBackground = true;
        this.updateKeepBackground(this.keepBackground);

        if (previewVideo.paused) {
          try {
            // play the video
            previewVideo.play().then(() => {
              /* handle success */
            });
          } catch {
            /* handle error */
          }
        }
      }, 100);
    };

    if (this.videoAlreadyOn) {
      if (
        this.clonedTrack &&
        this.clonedTrack.readyState == 'live' &&
        this.localStreamVideo?.getVideoTracks()[0].label == this.clonedTrack.label
      ) {
        // Use existing clonedTrack
      } else {
        const localTracks = this.localStreamVideo?.getVideoTracks()[0];
        this.clonedTrack = localTracks!.clone();
        this.clonedStream = new MediaStream([this.clonedTrack!]);
        this.segmentVideo = this.clonedStream;
      }
      this.updateSegmentVideo(this.segmentVideo);
      refVideo.srcObject = this.segmentVideo;
      if (refVideo.paused) {
        refVideo.play();
      }

      refVideo.width = this.segmentVideo!.getVideoTracks()[0].getSettings().width!;
      refVideo.height = this.segmentVideo!.getVideoTracks()[0].getSettings().height!;
      mediaCanvas.width = refVideo.width;
      mediaCanvas.height = refVideo.height;
      ctx = mediaCanvas.getContext('2d');

      try {
        doSegmentation
          ? await segmentImage(refVideo)
          : (previewVideo.srcObject = this.clonedStream
              ? this.clonedStream
              : this.localStreamVideo!);
      } catch (error) {
        console.log('Error segmenting image:', error);
      }
    } else {
      if (this.segmentVideo && this.segmentVideo.getVideoTracks()[0].readyState == 'live') {
        // Use existing segmentVideo
      } else {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { ...this.vidCons, frameRate: { ideal: this.frameRate || 5 } },
            audio: false,
          });
          this.segmentVideo = stream;
          this.updateSegmentVideo(this.segmentVideo);
          refVideo.srcObject = this.segmentVideo;
          if (refVideo.paused) {
            refVideo.play();
          }
        } catch (error) {
          // remove the frameRate constraint and try again
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: { ...this.vidCons },
              audio: false,
            });
            this.segmentVideo = stream;
            this.updateSegmentVideo(this.segmentVideo);
            refVideo.srcObject = this.segmentVideo;
            if (refVideo.paused) {
              refVideo.play();
            }
          } catch (error) {
          console.log('Error getting user media:', error);
          }
        }

        refVideo.width = this.segmentVideo!.getVideoTracks()[0].getSettings().width!;
        refVideo.height = this.segmentVideo!.getVideoTracks()[0].getSettings().height!;
        mediaCanvas.width = refVideo.width;
        mediaCanvas.height = refVideo.height;
        ctx = mediaCanvas.getContext('2d');
      }

      try {
        doSegmentation
          ? await segmentImage(refVideo)
          : (previewVideo.srcObject = refVideo.srcObject);
      } catch (error) {
        console.log(error);
      }
    }
  }

  saveBackground = async () => {
    const params = this.resolveParameters();

    if (this.audioOnlyRoom) {
      params.showAlert?.({
        message: 'You cannot use a background in an audio-only event.',
        type: 'danger',
      });
      return;
    }

    if (this.backgroundHasChanged) {
      if (this.videoAlreadyOn) {
        if (this.islevel == '2' && (this.recordStarted || this.recordResumed)) {
          if (!(this.recordPaused || this.recordStopped)) {
            if (this.recordingMediaOptions == 'video') {
              params.showAlert?.({
                message: 'Please pause the recording before changing the background.',
                type: 'danger',
              });
              return;
            }
          }
        }

        if (this.keepBackground && this.selectedImage && this.processedStream) {
          this.virtualStream = this.processedStream;
          this.updateVirtualStream(this.virtualStream);
          this.videoParams = { track: this.virtualStream.getVideoTracks()[0] };
          this.updateVideoParams(this.videoParams);
        } else {
          if (this.localStreamVideo?.getVideoTracks()[0].readyState == 'live') {
            this.videoParams = { track: this.localStreamVideo.getVideoTracks()[0] };
            this.updateVideoParams(this.videoParams);
          } else {
            try {
              if (this.localStreamVideo?.getVideoTracks()[0].readyState !== 'live') {
                this.localStreamVideo?.removeTrack(this.localStreamVideo.getVideoTracks()[0]);
                this.localStreamVideo?.addTrack(this.segmentVideo!.getVideoTracks()[0].clone());
              }
            } catch (error) {
              console.log('Error handling local stream video:', error);
            }

            this.videoParams = { track: this.segmentVideo!.getVideoTracks()[0] };
            this.updateVideoParams(this.videoParams);
          }
        }

        if (this.keepBackground) {
          this.appliedBackground = true;
          this.updateAppliedBackground(this.appliedBackground);
        } else {
          this.appliedBackground = false;
          this.updateAppliedBackground(this.appliedBackground);
        }

        if (!params.transportCreated) {
          await this.createSendTransport({
            option: 'video',
            parameters: { ...params, videoParams: this.videoParams },
          });
        } else {
          try {
            if (
              params.videoProducer?.id &&
              params.videoProducer.track?.id !== this.videoParams?.track?.id
            ) {
              await this.disconnectSendTransportVideo({ parameters: params });
              await this.sleep({ ms: 500 });
            }
            await this.connectSendTransportVideo({
              videoParams: this.videoParams,
              parameters: params,
            });
          } catch (error) {
            console.log(error);
          }
        }
        await this.onScreenChanges({ changed: true, parameters: params });
      }
    }

    if (this.keepBackground) {
      this.appliedBackground = true;
      this.updateAppliedBackground(this.appliedBackground);
    } else {
      this.appliedBackground = false;
      this.updateAppliedBackground(this.appliedBackground);
    }

    this.saveBackgroundButtonRef.nativeElement.classList.add('d-none');
    this.saveBackgroundButtonRef.nativeElement.disabled = true;
  };

  handleModalClose = () => {
    try {
      this.cleanupPreviewLifecycle();
      this.onClose();
    } catch (error) {
      console.log('Error during modal close:', error);
    }
  };

  showLoading() {
    this.loadingOverlayRef.nativeElement.classList.remove('d-none');
  }

  hideLoading() {
    this.loadingOverlayRef.nativeElement.classList.add('d-none');
  }

  getCombinedOverlayStyle() {
    const isDarkMode = this.resolvedIsDarkMode;
    return {
      position: this.isEmbedded() ? 'static' : 'fixed',
      top: this.isEmbedded() ? 'auto' : 0,
      left: this.isEmbedded() ? 'auto' : 0,
      width: '100%',
      height: '100%',
      minHeight: this.isEmbedded() ? 0 : undefined,
      backgroundColor: this.isEmbedded()
        ? 'transparent'
        : isDarkMode
          ? 'rgba(2, 6, 23, 0.62)'
          : 'rgba(15, 23, 42, 0.18)',
      backdropFilter: this.isEmbedded() ? 'none' : 'blur(10px)',
      display: this.isEmbedded() ? 'block' : this.isVisible ? 'flex' : 'none',
      alignItems: this.isEmbedded()
        ? undefined
        : this.position.includes('top')
          ? 'flex-start'
          : this.position.includes('bottom')
            ? 'flex-end'
            : 'center',
      justifyContent: this.isEmbedded()
        ? undefined
        : this.position.includes('Left')
          ? 'flex-start'
          : this.position.includes('Right')
            ? 'flex-end'
            : 'center',
      padding: this.isEmbedded() ? '0' : '18px',
      zIndex: this.isEmbedded() ? 'auto' : 999,
      ...(this.overlayStyle || {})
    };
  }

  getCombinedContentStyle() {
    const isDarkMode = this.resolvedIsDarkMode;
    return {
      background: this.isEmbedded()
        ? 'transparent'
        : typeof this.isDarkMode === 'boolean'
          ? isDarkMode
            ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(30, 41, 59, 0.94) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(241, 245, 249, 0.96) 100%)'
          : this.backgroundColor,
      borderRadius: this.isEmbedded() ? '0' : '24px',
      border: this.isEmbedded()
        ? 'none'
        : isDarkMode
          ? '1px solid rgba(148, 163, 184, 0.18)'
          : '1px solid rgba(148, 163, 184, 0.22)',
      boxShadow: this.isEmbedded() ? 'none' : '0 24px 48px rgba(15, 23, 42, 0.18)',
      padding: this.isEmbedded() ? '0' : '20px',
      width: this.isEmbedded() ? '100%' : 'min(500px, calc(100vw - 36px))',
      maxWidth: this.isEmbedded() ? 'none' : undefined,
      height: this.isEmbedded() ? '100%' : undefined,
      maxHeight: this.isEmbedded() ? 'none' : '84vh',
      overflowY: 'auto',
      overflowX: 'hidden',
      color: isDarkMode ? '#e2e8f0' : '#0f172a',
      ...(this.contentStyle || {})
    };
  }
}
