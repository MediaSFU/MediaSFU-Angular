/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation';
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
type Producer = types.Producer;
type ProducerOptions = types.ProducerOptions;

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
  updateMainCanvas: (canvas: HTMLCanvasElement) => void;

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
export class BackgroundModal implements OnChanges, OnInit {
  @Input() isVisible = false;
  @Input() parameters: BackgroundModalParameters = {} as BackgroundModalParameters;
  @Input() position = 'topLeft';
  @Input() backgroundColor = '#f5f5f5';
  @Input() onClose: () => void = () => {
    console.log('onClose');
  };
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: any;

  @ViewChild('defaultImagesContainer') defaultImagesContainerRef!: ElementRef;
  @ViewChild('uploadImageInput') uploadImageInputRef!: ElementRef;
  @ViewChild('backgroundCanvas') backgroundCanvasRef!: ElementRef;
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

  updateCustomImage!: (value: string) => void;
  updateSelectedImage!: (value: string) => void;
  updateSegmentVideo!: (value: MediaStream | null) => void;
  updateSelfieSegmentation!: (value: SelfieSegmentation | null) => void;
  updatePauseSegmentation!: (value: boolean) => void;
  updateProcessedStream!: (value: MediaStream | null) => void;
  updateKeepBackground!: (value: boolean) => void;
  updateBackgroundHasChanged!: (value: boolean) => void;
  updateVirtualStream!: (value: MediaStream | null) => void;
  updateMainCanvas!: (value: HTMLCanvasElement) => void;
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

  updateVariables() {
    this.customImage = this.parameters.customImage || '';
    this.selectedImage = this.parameters.selectedImage || '';
    this.segmentVideo = this.parameters.segmentVideo || null;
    this.selfieSegmentation = this.parameters.selfieSegmentation || null;
    this.pauseSegmentation = this.parameters.pauseSegmentation || false;
    this.processedStream = this.parameters.processedStream || null;
    this.keepBackground = this.parameters.keepBackground || false;
    this.backgroundHasChanged = this.parameters.backgroundHasChanged || false;
    this.virtualStream = this.parameters.virtualStream || null;
    this.mainCanvas = this.parameters.mainCanvas || this.backgroundCanvasRef?.nativeElement || null;
    this.prevKeepBackground = this.parameters.prevKeepBackground || false;
    this.appliedBackground = this.parameters.appliedBackground || false;
    this.videoAlreadyOn = this.parameters.videoAlreadyOn || false;
    this.audioOnlyRoom = this.parameters.audioOnlyRoom || false;
    this.islevel = this.parameters.islevel || '0';
    this.recordStarted = this.parameters.recordStarted || false;
    this.recordResumed = this.parameters.recordResumed || false;
    this.recordPaused = this.parameters.recordPaused || false;
    this.recordStopped = this.parameters.recordStopped || false;
    this.recordingMediaOptions = this.parameters.recordingMediaOptions || '';
    this.vidCons = this.parameters.vidCons || {};
    this.frameRate = this.parameters.frameRate || 5;
    this.videoParams = this.parameters.videoParams || null;
    this.autoClickBackground = this.parameters.autoClickBackground || false;
    this.localStreamVideo = this.parameters.localStreamVideo || null;

    // Assign method references
    this.updateCustomImage = this.parameters.updateCustomImage;
    this.updateSelectedImage = this.parameters.updateSelectedImage;
    this.updateSegmentVideo = this.parameters.updateSegmentVideo;
    this.updateSelfieSegmentation = this.parameters.updateSelfieSegmentation;
    this.updatePauseSegmentation = this.parameters.updatePauseSegmentation;
    this.updateProcessedStream = this.parameters.updateProcessedStream;
    this.updateKeepBackground = this.parameters.updateKeepBackground;
    this.updateBackgroundHasChanged = this.parameters.updateBackgroundHasChanged;
    this.updateVirtualStream = this.parameters.updateVirtualStream;
    this.updateMainCanvas = this.parameters.updateMainCanvas;
    this.updatePrevKeepBackground = this.parameters.updatePrevKeepBackground;
    this.updateAppliedBackground = this.parameters.updateAppliedBackground;
    this.updateVideoParams = this.parameters.updateVideoParams;
    this.updateAutoClickBackground = this.parameters.updateAutoClickBackground;

    this.createSendTransport = this.parameters.createSendTransport;
    this.connectSendTransportVideo = this.parameters.connectSendTransportVideo;
    this.disconnectSendTransportVideo = this.parameters.disconnectSendTransportVideo;
    this.onScreenChanges = this.parameters.onScreenChanges;
    this.sleep = this.parameters.sleep;
  }

  onVisibilityChange = async () => {
    if (this.parameters) {
      this.parameters = this.parameters.getUpdatedAllParams();
      this.updateVariables();
    }

    if (this.isVisible) {
      if (!this.selfieSegmentation) {
        await this.preloadModel().catch(() => console.log('Error preloading model:'));
      }
      this.renderDefaultImages();

      if (this.selectedImage) {
        await this.loadImageToCanvas(this.selectedImage, this.selectedImage);
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
        await this.applyBackground();
        await this.saveBackground();
        this.autoClickBackground = false;
        this.updateAutoClickBackground(this.autoClickBackground);
      }
    } else {
      try {
        // If no background is applied or the applied background should not be kept
        if (
          !this.appliedBackground ||
          (this.appliedBackground && !this.keepBackground) ||
          (this.appliedBackground && !this.videoAlreadyOn)
        ) {
          const refVideo = this.captureVideoRef.nativeElement;
          this.pauseSegmentation = true;
          this.updatePauseSegmentation(this.pauseSegmentation);

          if (!this.videoAlreadyOn) {
            // Stop video tracks and clear the video element's srcObject
            if (refVideo && refVideo.srcObject) {
              refVideo.srcObject.getTracks().forEach((track: any) => track.stop());
              refVideo.srcObject = null;
            }

            // Stop segmentVideo tracks
            if (this.segmentVideo) {
              this.segmentVideo.getTracks().forEach((track: any) => track.stop());
              this.segmentVideo = null;
              this.updateSegmentVideo(this.segmentVideo);
            }

            // Stop virtualStream tracks
            if (this.virtualStream) {
              this.virtualStream.getTracks().forEach((track: any) => track.stop());
              this.virtualStream = null;
              this.updateVirtualStream(this.virtualStream);
            }
          }
        }

        // Hide the video preview and show the canvas
        this.videoPreviewRef.nativeElement.classList.add('d-none');
        this.backgroundCanvasRef.nativeElement.classList.remove('d-none');
      } catch {
        /* handle error */
      }
    }
  };

  async preloadModel() {
    this.selfieSegmentation = new SelfieSegmentation({
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
    const defaultImagesContainer = this.defaultImagesContainerRef.nativeElement;
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
      if (this.audioOnlyRoom) {
        this.parameters.showAlert?.({
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
    const virtualImage = new Image();
    virtualImage.crossOrigin = 'anonymous';
    virtualImage.src = this.selectedImage;

    if (!this.mainCanvas) {
      this.mainCanvas = await this.backgroundCanvasRef.nativeElement;
    }

    let mediaCanvas = this.mainCanvas;
    mediaCanvas.width = refVideo.videoWidth;
    mediaCanvas.height = refVideo.videoHeight;
    let ctx = mediaCanvas.getContext('2d');

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

    const segmentImage = async (videoElement: HTMLVideoElement) => {
      const processFrame = () => {
        if (
          !this.selfieSegmentation ||
          this.pauseSegmentation ||
          !videoElement ||
          videoElement.videoWidth == 0 ||
          videoElement.videoHeight == 0
        ) {
          return;
        }
        this.selfieSegmentation.send({ image: videoElement });
        requestAnimationFrame(processFrame);
      };

      videoElement.onloadeddata = () => {
        processFrame();
      };

      setTimeout(async () => {
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

    let repeatPattern = 'no-repeat';
    try {
      if (virtualImage.width < mediaCanvas.width || virtualImage.height < mediaCanvas.height) {
        repeatPattern = 'repeat';
      }
    } catch {
      /* handle error */
    }

    const onResults = (results: any) => {
      try {
        if (
          !this.pauseSegmentation &&
          mediaCanvas &&
          mediaCanvas.width > 0 &&
          mediaCanvas.height > 0 &&
          virtualImage.width > 0 &&
          virtualImage.height > 0
        ) {
          ctx!.clearRect(0, 0, mediaCanvas.width, mediaCanvas.height);
          ctx!.drawImage(results.segmentationMask, 0, 0, mediaCanvas.width, mediaCanvas.height);

          ctx!.globalCompositeOperation = 'source-out';
          const pat = ctx!.createPattern(virtualImage, repeatPattern);
          ctx!.fillStyle = pat!;
          ctx!.fillRect(0, 0, mediaCanvas.width, mediaCanvas.height);

          ctx!.globalCompositeOperation = 'destination-atop';
          ctx!.drawImage(results.image, 0, 0, mediaCanvas.width, mediaCanvas.height);
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
  }

  saveBackground = async () => {
    if (this.audioOnlyRoom) {
      this.parameters.showAlert?.({
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
              this.parameters.showAlert?.({
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

        if (!this.parameters.transportCreated) {
          await this.createSendTransport({
            option: 'video',
            parameters: { ...this.parameters, videoParams: this.videoParams },
          });
        } else {
          try {
            if (
              this.parameters.videoProducer?.id &&
              this.parameters.videoProducer.track?.id !== this.videoParams?.track?.id
            ) {
              await this.disconnectSendTransportVideo({ parameters: this.parameters });
              await this.sleep({ ms: 500 });
            }
            await this.connectSendTransportVideo({
              videoParams: this.videoParams,
              parameters: this.parameters,
            });
          } catch (error) {
            console.log(error);
          }
        }
        await this.onScreenChanges({ changed: true, parameters: this.parameters });
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
      // If no background is applied or the applied background should not be kept
      if (
        !this.appliedBackground ||
        (this.appliedBackground && !this.keepBackground) ||
        (this.appliedBackground && !this.videoAlreadyOn)
      ) {
        console.log('No background applied or applied background should not be kept');
        const refVideo = this.captureVideoRef.nativeElement;
        this.pauseSegmentation = true;
        this.updatePauseSegmentation(this.pauseSegmentation);

        if (!this.videoAlreadyOn) {
          // Stop video tracks and clear the video element's srcObject
          if (refVideo && refVideo.srcObject) {
            refVideo.srcObject.getTracks().forEach((track: any) => track.stop());
            refVideo.srcObject = null;
          }

          // Stop segmentVideo tracks
          if (this.segmentVideo) {
            this.segmentVideo.getTracks().forEach((track: any) => track.stop());
            this.segmentVideo = null;
            this.updateSegmentVideo(this.segmentVideo);
          }

          // Stop virtualStream tracks
          if (this.virtualStream) {
            this.virtualStream.getTracks().forEach((track: any) => track.stop());
            this.virtualStream = null;
            this.updateVirtualStream(this.virtualStream);
          }
        }
      }

      // Hide the video preview and show the canvas
      this.videoPreviewRef.nativeElement.classList.add('d-none');
      this.backgroundCanvasRef.nativeElement.classList.remove('d-none');

      // Hide the modal
      // this.isVisible = false;
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
    return {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: this.isVisible ? 'block' : 'none',
      zIndex: 999,
      ...(this.overlayStyle || {})
    };
  }

  getCombinedContentStyle() {
    return {
      position: 'fixed',
      backgroundColor: this.backgroundColor,
      borderRadius: '10px',
      padding: '10px',
      width: '80%',
      maxWidth: '500px',
      maxHeight: '75%',
      overflowY: 'auto',
      overflowX: 'hidden',
      top: this.position.includes('top') ? '10px' : 'auto',
      bottom: this.position.includes('bottom') ? '10px' : 'auto',
      left: this.position.includes('Left') ? '10px' : 'auto',
      right: this.position.includes('Right') ? '10px' : 'auto',
      ...(this.contentStyle || {})
    };
  }
}
