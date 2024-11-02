/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, Input, ViewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
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
export class BackgroundModal {
    isVisible = false;
    parameters = {};
    position = 'topLeft';
    backgroundColor = '#f5f5f5';
    onClose = () => {
        console.log('onClose');
    };
    defaultImagesContainerRef;
    uploadImageInputRef;
    backgroundCanvasRef;
    videoPreviewRef;
    captureVideoRef;
    loadingOverlayRef;
    applyBackgroundButtonRef;
    saveBackgroundButtonRef;
    faTimes = faTimes;
    customImage = '';
    selectedImage = '';
    segmentVideo = null;
    selfieSegmentation = null;
    pauseSegmentation = false;
    processedStream = null;
    keepBackground = false;
    backgroundHasChanged = false;
    virtualStream = null;
    mainCanvas;
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
    vidCons = {};
    frameRate = 5;
    targetResolution = '1280x720';
    videoParams = {};
    autoClickBackground = false;
    localStreamVideo = null;
    clonedStream = null;
    clonedTrack = null;
    updateCustomImage;
    updateSelectedImage;
    updateSegmentVideo;
    updateSelfieSegmentation;
    updatePauseSegmentation;
    updateProcessedStream;
    updateKeepBackground;
    updateBackgroundHasChanged;
    updateVirtualStream;
    updateMainCanvas;
    updatePrevKeepBackground;
    updateAppliedBackground;
    updateVideoParams;
    updateAutoClickBackground;
    // Media functions
    createSendTransport;
    connectSendTransportVideo;
    disconnectSendTransportVideo;
    onScreenChanges;
    sleep;
    ngOnInit() {
        // Initialize local properties from the parameters
        if (this.parameters) {
            try {
                this.updateVariables();
            }
            catch {
                /* handle error */
            }
        }
    }
    ngOnChanges(changes) {
        if (changes['isVisible']) {
            this.onVisibilityChange();
        }
        if (changes['autoClickBackground']) {
            console.log('Auto click background changed:', this.autoClickBackground, changes['autoClickBackground']);
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
            }
            else {
                this.clearCanvas();
                this.backgroundCanvasRef.nativeElement.classList.remove('d-none');
            }
            this.saveBackgroundButtonRef.nativeElement.classList.add('d-none');
            this.saveBackgroundButtonRef.nativeElement.disabled = true;
            this.applyBackgroundButtonRef.nativeElement.classList.remove('d-none');
            this.applyBackgroundButtonRef.nativeElement.disabled = false;
            if (this.processedStream &&
                this.prevKeepBackground == this.keepBackground &&
                this.keepBackground &&
                this.appliedBackground) {
                this.applyBackgroundButtonRef.nativeElement.innerText = 'Apply Background';
            }
            else {
                this.applyBackgroundButtonRef.nativeElement.innerText = 'Preview Background';
            }
            if (this.autoClickBackground) {
                await this.applyBackground();
                await this.saveBackground();
                this.autoClickBackground = false;
                this.updateAutoClickBackground(this.autoClickBackground);
            }
        }
        else {
            try {
                // If no background is applied or the applied background should not be kept
                if (!this.appliedBackground ||
                    (this.appliedBackground && !this.keepBackground) ||
                    (this.appliedBackground && !this.videoAlreadyOn)) {
                    const refVideo = this.captureVideoRef.nativeElement;
                    this.pauseSegmentation = true;
                    this.updatePauseSegmentation(this.pauseSegmentation);
                    if (!this.videoAlreadyOn) {
                        // Stop video tracks and clear the video element's srcObject
                        if (refVideo && refVideo.srcObject) {
                            refVideo.srcObject.getTracks().forEach((track) => track.stop());
                            refVideo.srcObject = null;
                        }
                        // Stop segmentVideo tracks
                        if (this.segmentVideo) {
                            this.segmentVideo.getTracks().forEach((track) => track.stop());
                            this.segmentVideo = null;
                            this.updateSegmentVideo(this.segmentVideo);
                        }
                        // Stop virtualStream tracks
                        if (this.virtualStream) {
                            this.virtualStream.getTracks().forEach((track) => track.stop());
                            this.virtualStream = null;
                            this.updateVirtualStream(this.virtualStream);
                        }
                    }
                }
                // Hide the video preview and show the canvas
                this.videoPreviewRef.nativeElement.classList.add('d-none');
                this.backgroundCanvasRef.nativeElement.classList.remove('d-none');
            }
            catch {
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
                }
                else {
                    await this.loadImageToCanvas(small, full);
                }
            });
            defaultImagesContainer.appendChild(img);
        });
        const noBackgroundImg = document.createElement('div');
        noBackgroundImg.classList.add('img-thumbnail', 'm-1', 'd-flex', 'align-items-center', 'justify-content-center');
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
    async handleImageUpload(event) {
        let minWidth = 1280;
        let minHeight = 1280;
        let maxWidth = 2560;
        let maxHeight = 2560;
        if (this.targetResolution == 'fhd') {
            minWidth = 1920;
            minHeight = 1920;
        }
        else if (this.targetResolution == 'qhd') {
            minWidth = 2560;
            minHeight = 2560;
        } // For other resolutions, stick to the default 1280x1280
        const input = event.target;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = async () => {
                if (img.width < minWidth ||
                    img.height < minHeight ||
                    img.width > maxWidth ||
                    img.height > maxHeight) {
                    this.customImage = img.src;
                    this.updateCustomImage(this.customImage);
                    await this.loadImageToCanvas(img.src, img.src);
                }
            };
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    img.src = e.target.result;
                }
            };
            reader.readAsDataURL(file);
        }
    }
    clearCanvas() {
        const ctx = this.backgroundCanvasRef.nativeElement.getContext('2d');
        ctx.clearRect(0, 0, this.backgroundCanvasRef.nativeElement.width, this.backgroundCanvasRef.nativeElement.height);
        ctx.font = '30px Arial';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('No Background', this.backgroundCanvasRef.nativeElement.width / 2, this.backgroundCanvasRef.nativeElement.height / 2);
        this.applyBackgroundButtonRef.nativeElement.classList.remove('d-none');
        this.applyBackgroundButtonRef.nativeElement.disabled = false;
        if (this.processedStream &&
            this.prevKeepBackground == this.keepBackground &&
            this.keepBackground &&
            this.appliedBackground) {
            this.applyBackgroundButtonRef.nativeElement.innerText = 'Apply Background';
        }
        else {
            this.applyBackgroundButtonRef.nativeElement.innerText = 'Preview Background';
        }
    }
    async loadImageToCanvas(src, fullSrc) {
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
        if (this.processedStream &&
            this.prevKeepBackground == this.keepBackground &&
            this.keepBackground &&
            this.appliedBackground) {
            this.applyBackgroundButtonRef.nativeElement.innerText = 'Apply Background';
        }
        else {
            this.applyBackgroundButtonRef.nativeElement.innerText = 'Preview Background';
        }
    }
    removeBackground(img) {
        const ctx = this.backgroundCanvasRef.nativeElement.getContext('2d');
        ctx.clearRect(0, 0, this.backgroundCanvasRef.nativeElement.width, this.backgroundCanvasRef.nativeElement.height);
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
            if (this.processedStream &&
                this.prevKeepBackground == this.keepBackground &&
                this.keepBackground &&
                this.appliedBackground) {
                this.saveBackgroundButtonRef.nativeElement.classList.add('d-none');
                this.saveBackgroundButtonRef.nativeElement.disabled = true;
            }
            else {
                this.saveBackgroundButtonRef.nativeElement.classList.remove('d-none');
                this.saveBackgroundButtonRef.nativeElement.disabled = false;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async selfieSegmentationPreview(doSegmentation) {
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
                tracks.forEach((track) => track.stop());
            }
            this.processedStream = null;
            this.keepBackground = false;
            this.updateProcessedStream(null);
            this.updateKeepBackground(false);
            previewVideo.classList.remove('d-none');
        }
        const segmentImage = async (videoElement) => {
            const processFrame = () => {
                if (!this.selfieSegmentation ||
                    this.pauseSegmentation ||
                    !videoElement ||
                    videoElement.videoWidth == 0 ||
                    videoElement.videoHeight == 0) {
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
                    }
                    catch {
                        /* handle error */
                    }
                }
            }, 100);
        };
        if (this.videoAlreadyOn) {
            if (this.clonedTrack &&
                this.clonedTrack.readyState == 'live' &&
                this.localStreamVideo?.getVideoTracks()[0].label == this.clonedTrack.label) {
                // Use existing clonedTrack
            }
            else {
                const localTracks = this.localStreamVideo?.getVideoTracks()[0];
                this.clonedTrack = localTracks.clone();
                this.clonedStream = new MediaStream([this.clonedTrack]);
                this.segmentVideo = this.clonedStream;
            }
            this.updateSegmentVideo(this.segmentVideo);
            refVideo.srcObject = this.segmentVideo;
            if (refVideo.paused) {
                refVideo.play();
            }
            refVideo.width = this.segmentVideo.getVideoTracks()[0].getSettings().width;
            refVideo.height = this.segmentVideo.getVideoTracks()[0].getSettings().height;
            mediaCanvas.width = refVideo.width;
            mediaCanvas.height = refVideo.height;
            ctx = mediaCanvas.getContext('2d');
            try {
                doSegmentation
                    ? await segmentImage(refVideo)
                    : (previewVideo.srcObject = this.clonedStream
                        ? this.clonedStream
                        : this.localStreamVideo);
            }
            catch (error) {
                console.log('Error segmenting image:', error);
            }
        }
        else {
            if (this.segmentVideo && this.segmentVideo.getVideoTracks()[0].readyState == 'live') {
                // Use existing segmentVideo
            }
            else {
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
                }
                catch (error) {
                    console.log('Error getting user media:', error);
                }
                refVideo.width = this.segmentVideo.getVideoTracks()[0].getSettings().width;
                refVideo.height = this.segmentVideo.getVideoTracks()[0].getSettings().height;
                mediaCanvas.width = refVideo.width;
                mediaCanvas.height = refVideo.height;
                ctx = mediaCanvas.getContext('2d');
            }
            try {
                doSegmentation
                    ? await segmentImage(refVideo)
                    : (previewVideo.srcObject = refVideo.srcObject);
            }
            catch (error) {
                console.log(error);
            }
        }
        let repeatPattern = 'no-repeat';
        try {
            if (virtualImage.width < mediaCanvas.width || virtualImage.height < mediaCanvas.height) {
                repeatPattern = 'repeat';
            }
        }
        catch {
            /* handle error */
        }
        const onResults = (results) => {
            try {
                if (!this.pauseSegmentation &&
                    mediaCanvas &&
                    mediaCanvas.width > 0 &&
                    mediaCanvas.height > 0 &&
                    virtualImage.width > 0 &&
                    virtualImage.height > 0) {
                    ctx.clearRect(0, 0, mediaCanvas.width, mediaCanvas.height);
                    ctx.drawImage(results.segmentationMask, 0, 0, mediaCanvas.width, mediaCanvas.height);
                    ctx.globalCompositeOperation = 'source-out';
                    const pat = ctx.createPattern(virtualImage, repeatPattern);
                    ctx.fillStyle = pat;
                    ctx.fillRect(0, 0, mediaCanvas.width, mediaCanvas.height);
                    ctx.globalCompositeOperation = 'destination-atop';
                    ctx.drawImage(results.image, 0, 0, mediaCanvas.width, mediaCanvas.height);
                }
            }
            catch (error) {
                console.log('Error processing results:', error);
            }
        };
        if (!this.selfieSegmentation) {
            await this.preloadModel().catch(() => console.log('Error preloading model:'));
        }
        try {
            this.selfieSegmentation.onResults(onResults);
        }
        catch (error) {
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
                }
                else {
                    if (this.localStreamVideo?.getVideoTracks()[0].readyState == 'live') {
                        this.videoParams = { track: this.localStreamVideo.getVideoTracks()[0] };
                        this.updateVideoParams(this.videoParams);
                    }
                    else {
                        try {
                            if (this.localStreamVideo?.getVideoTracks()[0].readyState !== 'live') {
                                this.localStreamVideo?.removeTrack(this.localStreamVideo.getVideoTracks()[0]);
                                this.localStreamVideo?.addTrack(this.segmentVideo.getVideoTracks()[0].clone());
                            }
                        }
                        catch (error) {
                            console.log('Error handling local stream video:', error);
                        }
                        this.videoParams = { track: this.segmentVideo.getVideoTracks()[0] };
                        this.updateVideoParams(this.videoParams);
                    }
                }
                if (this.keepBackground) {
                    this.appliedBackground = true;
                    this.updateAppliedBackground(this.appliedBackground);
                }
                else {
                    this.appliedBackground = false;
                    this.updateAppliedBackground(this.appliedBackground);
                }
                if (!this.parameters.transportCreated) {
                    await this.createSendTransport({
                        option: 'video',
                        parameters: { ...this.parameters, videoParams: this.videoParams },
                    });
                }
                else {
                    try {
                        if (this.parameters.videoProducer?.id &&
                            this.parameters.videoProducer.track?.id !== this.videoParams?.track?.id) {
                            await this.disconnectSendTransportVideo({ parameters: this.parameters });
                            await this.sleep({ ms: 500 });
                        }
                        await this.connectSendTransportVideo({
                            videoParams: this.videoParams,
                            parameters: this.parameters,
                        });
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
                await this.onScreenChanges({ changed: true, parameters: this.parameters });
            }
        }
        if (this.keepBackground) {
            this.appliedBackground = true;
            this.updateAppliedBackground(this.appliedBackground);
        }
        else {
            this.appliedBackground = false;
            this.updateAppliedBackground(this.appliedBackground);
        }
        this.saveBackgroundButtonRef.nativeElement.classList.add('d-none');
        this.saveBackgroundButtonRef.nativeElement.disabled = true;
    };
    handleModalClose = () => {
        try {
            // If no background is applied or the applied background should not be kept
            if (!this.appliedBackground ||
                (this.appliedBackground && !this.keepBackground) ||
                (this.appliedBackground && !this.videoAlreadyOn)) {
                console.log('No background applied or applied background should not be kept');
                const refVideo = this.captureVideoRef.nativeElement;
                this.pauseSegmentation = true;
                this.updatePauseSegmentation(this.pauseSegmentation);
                if (!this.videoAlreadyOn) {
                    // Stop video tracks and clear the video element's srcObject
                    if (refVideo && refVideo.srcObject) {
                        refVideo.srcObject.getTracks().forEach((track) => track.stop());
                        refVideo.srcObject = null;
                    }
                    // Stop segmentVideo tracks
                    if (this.segmentVideo) {
                        this.segmentVideo.getTracks().forEach((track) => track.stop());
                        this.segmentVideo = null;
                        this.updateSegmentVideo(this.segmentVideo);
                    }
                    // Stop virtualStream tracks
                    if (this.virtualStream) {
                        this.virtualStream.getTracks().forEach((track) => track.stop());
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
        }
        catch (error) {
            console.log('Error during modal close:', error);
        }
    };
    showLoading() {
        this.loadingOverlayRef.nativeElement.classList.remove('d-none');
    }
    hideLoading() {
        this.loadingOverlayRef.nativeElement.classList.add('d-none');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: BackgroundModal, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: BackgroundModal, isStandalone: true, selector: "app-background-modal", inputs: { isVisible: "isVisible", parameters: "parameters", position: "position", backgroundColor: "backgroundColor", onClose: "onClose" }, viewQueries: [{ propertyName: "defaultImagesContainerRef", first: true, predicate: ["defaultImagesContainer"], descendants: true }, { propertyName: "uploadImageInputRef", first: true, predicate: ["uploadImageInput"], descendants: true }, { propertyName: "backgroundCanvasRef", first: true, predicate: ["backgroundCanvas"], descendants: true }, { propertyName: "videoPreviewRef", first: true, predicate: ["videoPreview"], descendants: true }, { propertyName: "captureVideoRef", first: true, predicate: ["captureVideo"], descendants: true }, { propertyName: "loadingOverlayRef", first: true, predicate: ["loadingOverlay"], descendants: true }, { propertyName: "applyBackgroundButtonRef", first: true, predicate: ["applyBackgroundButton"], descendants: true }, { propertyName: "saveBackgroundButtonRef", first: true, predicate: ["saveBackgroundButton"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div [ngStyle]=\"{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: isVisible ? 'block' : 'none', zIndex: 999 }\">\r\n    <div [ngStyle]=\"{ position: 'fixed', backgroundColor: backgroundColor, borderRadius: '10px', padding: '10px', width: '80%', maxWidth: '500px', maxHeight: '75%', overflowY: 'auto', overflowX: 'hidden', top: position.includes('top') ? '10px' : 'auto', bottom: position.includes('bottom') ? '10px' : 'auto', left: position.includes('Left') ? '10px' : 'auto', right: position.includes('Right') ? '10px' : 'auto' }\">\r\n      <div style=\"display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;\">\r\n        <h2 style=\"font-size: x-large; font-weight: bold; color: black;\">Background Settings</h2>\r\n        <button (click)=\"onClose()\" style=\"border: none; background: none; cursor: pointer;\">\r\n          <fa-icon [icon]=\"faTimes\" size=\"xl\" style=\"font-size: 20px; color: black;\"></fa-icon>\r\n        </button>\r\n      </div>\r\n      <hr style=\"height: 1px; background-color: black; margin-top: 5px; margin-bottom: 5px;\" />\r\n      <div style=\"max-width: 95%; overflow-x: auto;\">\r\n        <div id=\"defaultImages\" #defaultImagesContainer></div>\r\n        <div class=\"form-group\" style=\"max-width: 70%; overflow-x: auto;\">\r\n          <label for=\"uploadImage\">Upload Custom Image</label>\r\n          <input type=\"file\" class=\"form-control\" id=\"uploadImage\" #uploadImageInput (change)=\"handleImageUpload($event)\" />\r\n        </div>\r\n        <canvas id=\"mainCanvas\" #mainCanvas class=\"d-none\"></canvas>\r\n        <canvas id=\"backgroundCanvas\" #backgroundCanvas class=\"d-none\" style=\"width: 100%; max-width: 400px; height: auto; background-color: transparent; border: 1px solid black;\"></canvas>\r\n        <video id=\"captureVideo\" #captureVideo class=\"d-none\" muted autoplay playsinline></video>\r\n        <video id=\"previewVideo\" #videoPreview class=\"d-none\" muted autoplay playsinline style=\"width: 100%; max-width: 400px; height: auto; background-color: transparent; border: 1px solid black;\"></video>\r\n        <div id=\"loadingOverlay\" #loadingOverlay class=\"d-none\" [ngStyle]=\"{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', 'justify-content': 'center', 'align-items': 'center', zIndex: 1000 }\">\r\n          <div [ngStyle]=\"{ width: '50px', height: '50px', border: '5px solid rgba(255, 255, 255, 0.3)', borderRadius: '50%', borderTop: '5px solid white', animation: 'spin 1s linear infinite' }\"></div>\r\n        </div>\r\n        <br />\r\n        <button id=\"applyBackgroundButton\" #applyBackgroundButton class=\"btn btn-primary\" (click)=\"applyBackground()\">Preview Background</button>\r\n        <button id=\"saveBackgroundButton\" #saveBackgroundButton class=\"btn btn-success d-none\" (click)=\"saveBackground()\">Save Background</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n", styles: ["@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i2.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: BackgroundModal, decorators: [{
            type: Component,
            args: [{ selector: 'app-background-modal', standalone: true, imports: [CommonModule, FontAwesomeModule], template: "<div [ngStyle]=\"{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: isVisible ? 'block' : 'none', zIndex: 999 }\">\r\n    <div [ngStyle]=\"{ position: 'fixed', backgroundColor: backgroundColor, borderRadius: '10px', padding: '10px', width: '80%', maxWidth: '500px', maxHeight: '75%', overflowY: 'auto', overflowX: 'hidden', top: position.includes('top') ? '10px' : 'auto', bottom: position.includes('bottom') ? '10px' : 'auto', left: position.includes('Left') ? '10px' : 'auto', right: position.includes('Right') ? '10px' : 'auto' }\">\r\n      <div style=\"display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;\">\r\n        <h2 style=\"font-size: x-large; font-weight: bold; color: black;\">Background Settings</h2>\r\n        <button (click)=\"onClose()\" style=\"border: none; background: none; cursor: pointer;\">\r\n          <fa-icon [icon]=\"faTimes\" size=\"xl\" style=\"font-size: 20px; color: black;\"></fa-icon>\r\n        </button>\r\n      </div>\r\n      <hr style=\"height: 1px; background-color: black; margin-top: 5px; margin-bottom: 5px;\" />\r\n      <div style=\"max-width: 95%; overflow-x: auto;\">\r\n        <div id=\"defaultImages\" #defaultImagesContainer></div>\r\n        <div class=\"form-group\" style=\"max-width: 70%; overflow-x: auto;\">\r\n          <label for=\"uploadImage\">Upload Custom Image</label>\r\n          <input type=\"file\" class=\"form-control\" id=\"uploadImage\" #uploadImageInput (change)=\"handleImageUpload($event)\" />\r\n        </div>\r\n        <canvas id=\"mainCanvas\" #mainCanvas class=\"d-none\"></canvas>\r\n        <canvas id=\"backgroundCanvas\" #backgroundCanvas class=\"d-none\" style=\"width: 100%; max-width: 400px; height: auto; background-color: transparent; border: 1px solid black;\"></canvas>\r\n        <video id=\"captureVideo\" #captureVideo class=\"d-none\" muted autoplay playsinline></video>\r\n        <video id=\"previewVideo\" #videoPreview class=\"d-none\" muted autoplay playsinline style=\"width: 100%; max-width: 400px; height: auto; background-color: transparent; border: 1px solid black;\"></video>\r\n        <div id=\"loadingOverlay\" #loadingOverlay class=\"d-none\" [ngStyle]=\"{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', 'justify-content': 'center', 'align-items': 'center', zIndex: 1000 }\">\r\n          <div [ngStyle]=\"{ width: '50px', height: '50px', border: '5px solid rgba(255, 255, 255, 0.3)', borderRadius: '50%', borderTop: '5px solid white', animation: 'spin 1s linear infinite' }\"></div>\r\n        </div>\r\n        <br />\r\n        <button id=\"applyBackgroundButton\" #applyBackgroundButton class=\"btn btn-primary\" (click)=\"applyBackground()\">Preview Background</button>\r\n        <button id=\"saveBackgroundButton\" #saveBackgroundButton class=\"btn btn-success d-none\" (click)=\"saveBackground()\">Save Background</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n", styles: ["@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"] }]
        }], propDecorators: { isVisible: [{
                type: Input
            }], parameters: [{
                type: Input
            }], position: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], onClose: [{
                type: Input
            }], defaultImagesContainerRef: [{
                type: ViewChild,
                args: ['defaultImagesContainer']
            }], uploadImageInputRef: [{
                type: ViewChild,
                args: ['uploadImageInput']
            }], backgroundCanvasRef: [{
                type: ViewChild,
                args: ['backgroundCanvas']
            }], videoPreviewRef: [{
                type: ViewChild,
                args: ['videoPreview']
            }], captureVideoRef: [{
                type: ViewChild,
                args: ['captureVideo']
            }], loadingOverlayRef: [{
                type: ViewChild,
                args: ['loadingOverlay']
            }], applyBackgroundButtonRef: [{
                type: ViewChild,
                args: ['applyBackgroundButton']
            }], saveBackgroundButtonRef: [{
                type: ViewChild,
                args: ['saveBackgroundButton']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC1tb2RhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9iYWNrZ3JvdW5kLWNvbXBvbmVudHMvYmFja2dyb3VuZC1tb2RhbC9iYWNrZ3JvdW5kLW1vZGFsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2JhY2tncm91bmQtY29tcG9uZW50cy9iYWNrZ3JvdW5kLW1vZGFsL2JhY2tncm91bmQtbW9kYWwuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNkRBQTZEO0FBQzdELE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUdMLFNBQVMsR0FHVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzVELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7O0FBdUZwRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ0c7QUFVSCxNQUFNLE9BQU8sZUFBZTtJQUNqQixTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ2xCLFVBQVUsR0FBOEIsRUFBK0IsQ0FBQztJQUN4RSxRQUFRLEdBQUcsU0FBUyxDQUFDO0lBQ3JCLGVBQWUsR0FBRyxTQUFTLENBQUM7SUFDNUIsT0FBTyxHQUFlLEdBQUcsRUFBRTtRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pCLENBQUMsQ0FBQztJQUVtQyx5QkFBeUIs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LFlBQVksbUhBQUUsaUJBQWlCOzsyRkFJOUIsZUFBZTtrQkFQM0IsU0FBUzsrQkFDRSxzQkFBc0IsY0FDcEIsSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDOzhCQUtqQyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFJK0IseUJBQXlCO3NCQUE3RCxTQUFTO3VCQUFDLHdCQUF3QjtnQkFDSixtQkFBbUI7c0JBQWpELFNBQVM7dUJBQUMsa0JBQWtCO2dCQUNFLG1CQUFtQjtzQkFBakQsU0FBUzt1QkFBQyxrQkFBa0I7Z0JBQ0YsZUFBZTtzQkFBekMsU0FBUzt1QkFBQyxjQUFjO2dCQUNFLGVBQWU7c0JBQXpDLFNBQVM7dUJBQUMsY0FBYztnQkFDSSxpQkFBaUI7c0JBQTdDLFNBQVM7dUJBQUMsZ0JBQWdCO2dCQUNTLHdCQUF3QjtzQkFBM0QsU0FBUzt1QkFBQyx1QkFBdUI7Z0JBQ0MsdUJBQXVCO3NCQUF6RCxTQUFTO3VCQUFDLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb24gKi9cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHsgZmFUaW1lcyB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XG5pbXBvcnQgeyBTZWxmaWVTZWdtZW50YXRpb24gfSBmcm9tICdAbWVkaWFwaXBlL3NlbGZpZV9zZWdtZW50YXRpb24nO1xuaW1wb3J0IHtcbiAgQ29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb1BhcmFtZXRlcnMsXG4gIENvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW9UeXBlLFxuICBDcmVhdGVTZW5kVHJhbnNwb3J0UGFyYW1ldGVycyxcbiAgQ3JlYXRlU2VuZFRyYW5zcG9ydFR5cGUsXG4gIERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW9QYXJhbWV0ZXJzLFxuICBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvVHlwZSxcbiAgT25TY3JlZW5DaGFuZ2VzUGFyYW1ldGVycyxcbiAgT25TY3JlZW5DaGFuZ2VzVHlwZSxcbiAgU2hvd0FsZXJ0LFxuICBTbGVlcFR5cGUsXG4gIFZpZENvbnMsXG59IGZyb20gJy4uLy4uLy4uL0B0eXBlcy90eXBlcyc7XG5pbXBvcnQgeyBQcm9kdWNlciwgUHJvZHVjZXJPcHRpb25zIH0gZnJvbSAnbWVkaWFzb3VwLWNsaWVudC9saWIvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJhY2tncm91bmRNb2RhbFBhcmFtZXRlcnNcbiAgZXh0ZW5kcyBDcmVhdGVTZW5kVHJhbnNwb3J0UGFyYW1ldGVycyxcbiAgICBDb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvUGFyYW1ldGVycyxcbiAgICBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvUGFyYW1ldGVycyxcbiAgICBPblNjcmVlbkNoYW5nZXNQYXJhbWV0ZXJzIHtcbiAgY3VzdG9tSW1hZ2U6IHN0cmluZztcbiAgc2VsZWN0ZWRJbWFnZTogc3RyaW5nO1xuICBzZWdtZW50VmlkZW86IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgc2VsZmllU2VnbWVudGF0aW9uOiBTZWxmaWVTZWdtZW50YXRpb24gfCBudWxsO1xuICBwYXVzZVNlZ21lbnRhdGlvbjogYm9vbGVhbjtcbiAgcHJvY2Vzc2VkU3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGw7XG4gIGtlZXBCYWNrZ3JvdW5kOiBib29sZWFuO1xuICBiYWNrZ3JvdW5kSGFzQ2hhbmdlZDogYm9vbGVhbjtcbiAgdmlydHVhbFN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsO1xuICBtYWluQ2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw7XG4gIHByZXZLZWVwQmFja2dyb3VuZDogYm9vbGVhbjtcbiAgYXBwbGllZEJhY2tncm91bmQ6IGJvb2xlYW47XG4gIHZpZGVvQWxyZWFkeU9uOiBib29sZWFuO1xuICBhdWRpb09ubHlSb29tOiBib29sZWFuO1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIHJlY29yZFN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHJlY29yZFJlc3VtZWQ6IGJvb2xlYW47XG4gIHJlY29yZFBhdXNlZDogYm9vbGVhbjtcbiAgcmVjb3JkU3RvcHBlZDogYm9vbGVhbjtcbiAgcmVjb3JkaW5nTWVkaWFPcHRpb25zOiBzdHJpbmc7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgbG9jYWxTdHJlYW1WaWRlbzogTWVkaWFTdHJlYW0gfCBudWxsO1xuICB2aWRDb25zOiBWaWRDb25zO1xuICBmcmFtZVJhdGU6IG51bWJlcjtcbiAgdGFyZ2V0UmVzb2x1dGlvbjogc3RyaW5nO1xuICB1cGRhdGVDdXN0b21JbWFnZTogKGltYWdlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZVNlbGVjdGVkSW1hZ2U6IChpbWFnZTogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVTZWdtZW50VmlkZW86IChzdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlU2VsZmllU2VnbWVudGF0aW9uOiAoc2VnbWVudGF0aW9uOiBTZWxmaWVTZWdtZW50YXRpb24gfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVQYXVzZVNlZ21lbnRhdGlvbjogKHBhdXNlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVQcm9jZXNzZWRTdHJlYW06IChzdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlS2VlcEJhY2tncm91bmQ6IChrZWVwOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVCYWNrZ3JvdW5kSGFzQ2hhbmdlZDogKGNoYW5nZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVZpcnR1YWxTdHJlYW06IChzdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlUHJldktlZXBCYWNrZ3JvdW5kOiAocHJldjogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlQXBwbGllZEJhY2tncm91bmQ6IChhcHBsaWVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB2aWRlb1Byb2R1Y2VyOiBQcm9kdWNlciB8IG51bGw7XG4gIHRyYW5zcG9ydENyZWF0ZWQ6IGJvb2xlYW47XG4gIHZpZGVvUGFyYW1zOiBQcm9kdWNlck9wdGlvbnM7XG4gIHVwZGF0ZVZpZGVvUGFyYW1zOiAocGFyYW1zOiBQcm9kdWNlck9wdGlvbnMpID0+IHZvaWQ7XG4gIGF1dG9DbGlja0JhY2tncm91bmQ6IGJvb2xlYW47XG4gIHVwZGF0ZUF1dG9DbGlja0JhY2tncm91bmQ6IChhdXRvQ2xpY2s6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZU1haW5DYW52YXM6IChjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBjcmVhdGVTZW5kVHJhbnNwb3J0OiBDcmVhdGVTZW5kVHJhbnNwb3J0VHlwZTtcbiAgY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbzogQ29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb1R5cGU7XG4gIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW86IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW9UeXBlO1xuICBvblNjcmVlbkNoYW5nZXM6IE9uU2NyZWVuQ2hhbmdlc1R5cGU7XG4gIHNsZWVwOiBTbGVlcFR5cGU7XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gQmFja2dyb3VuZE1vZGFsUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJhY2tncm91bmRNb2RhbE9wdGlvbnMge1xuICBpc1Zpc2libGU6IGJvb2xlYW47XG4gIHBhcmFtZXRlcnM6IEJhY2tncm91bmRNb2RhbFBhcmFtZXRlcnM7XG4gIHBvc2l0aW9uOiBzdHJpbmc7XG4gIGJhY2tncm91bmRDb2xvcjogc3RyaW5nO1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xufVxuXG4vLyBleHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGNvbXBvbmVudFxuZXhwb3J0IHR5cGUgQmFja2dyb3VuZE1vZGFsVHlwZSA9IChvcHRpb25zOiBCYWNrZ3JvdW5kTW9kYWxPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuLyoqXG4gKiBCYWNrZ3JvdW5kTW9kYWwgLSBDb21wb25lbnQgdG8gbWFuYWdlIGJhY2tncm91bmQgc2VsZWN0aW9uIGFuZCBtYW5pcHVsYXRpb24gaW4gbWVkaWEgc3RyZWFtcy5cbiAqXG4gKiBUaGlzIGNvbXBvbmVudCBhbGxvd3MgdXNlcnMgdG8gY2hvb3NlLCBhcHBseSwgYW5kIG1hbmlwdWxhdGUgdmlydHVhbCBiYWNrZ3JvdW5kcyBmb3IgbWVkaWEgc3RyZWFtcywgbGV2ZXJhZ2luZyBNZWRpYVBpcGXigJlzIFNlbGZpZSBTZWdtZW50YXRpb24gYW5kIE1lZGlhU291cCBmdW5jdGlvbmFsaXRpZXMuXG4gKlxuICogQGNvbXBvbmVudFxuICogQG5hbWUgQmFja2dyb3VuZE1vZGFsXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogPGFwcC1iYWNrZ3JvdW5kLW1vZGFsXG4gKiAgIFtpc1Zpc2libGVdPVwiaXNNb2RhbFZpc2libGVcIlxuICogICBbcGFyYW1ldGVyc109XCJtb2RhbFBhcmFtZXRlcnNcIlxuICogICBwb3NpdGlvbj1cInRvcExlZnRcIlxuICogICBiYWNrZ3JvdW5kQ29sb3I9XCIjZjVmNWY1XCJcbiAqICAgKG9uQ2xvc2UpPVwiaGFuZGxlTW9kYWxDbG9zZSgpXCJcbiAqID48L2FwcC1iYWNrZ3JvdW5kLW1vZGFsPlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtib29sZWFufSBpc1Zpc2libGUgLSBWaXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBtb2RhbC5cbiAqIEBwYXJhbSB7QmFja2dyb3VuZE1vZGFsUGFyYW1ldGVyc30gcGFyYW1ldGVycyAtIFBhcmFtZXRlcnMgaW5jbHVkaW5nIHNldHRpbmdzIGFuZCBtZXRob2RzIGZvciBtZWRpYSBhbmQgYmFja2dyb3VuZCBtYW5hZ2VtZW50LlxuICogQHBhcmFtIHtzdHJpbmd9IHBvc2l0aW9uIC0gVGhlIHBvc2l0aW9uIG9mIHRoZSBtb2RhbCwgZS5nLiwgJ3RvcExlZnQnLlxuICogQHBhcmFtIHtzdHJpbmd9IGJhY2tncm91bmRDb2xvciAtIEJhY2tncm91bmQgY29sb3Igb2YgdGhlIG1vZGFsLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb25DbG9zZSAtIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gdGhlIG1vZGFsIGlzIGNsb3NlZC5cbiAqXG4gKiBAcHJvcGVydHkge2ZhVGltZXN9IGZhVGltZXMgLSBJY29uIHVzZWQgZm9yIGNsb3NpbmcgdGhlIG1vZGFsLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGN1c3RvbUltYWdlIC0gQ3VzdG9tIGltYWdlIFVSTCBmb3IgYmFja2dyb3VuZC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzZWxlY3RlZEltYWdlIC0gU2VsZWN0ZWQgaW1hZ2UgVVJMIGZvciBiYWNrZ3JvdW5kLlxuICogQHByb3BlcnR5IHtNZWRpYVN0cmVhbSB8IG51bGx9IHNlZ21lbnRWaWRlbyAtIE1lZGlhIHN0cmVhbSBmb3IgdmlkZW8gc2VnbWVudGF0aW9uLlxuICogQHByb3BlcnR5IHtTZWxmaWVTZWdtZW50YXRpb24gfCBudWxsfSBzZWxmaWVTZWdtZW50YXRpb24gLSBTZWxmaWVTZWdtZW50YXRpb24gaW5zdGFuY2UuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHBhdXNlU2VnbWVudGF0aW9uIC0gUGF1c2Ugc3RhdGUgZm9yIHNlZ21lbnRhdGlvbi5cbiAqIEBwcm9wZXJ0eSB7TWVkaWFTdHJlYW0gfCBudWxsfSBwcm9jZXNzZWRTdHJlYW0gLSBQcm9jZXNzZWQgbWVkaWEgc3RyZWFtIHdpdGggYXBwbGllZCBiYWNrZ3JvdW5kLlxuICogQHByb3BlcnR5IHtib29sZWFufSBrZWVwQmFja2dyb3VuZCAtIFN0YXRlIHRvIGtlZXAgb3IgcmVzZXQgYmFja2dyb3VuZC5cbiAqXG4gKiBAbWV0aG9kXG4gKiBuZ09uSW5pdCAtIEluaXRpYWxpemVzIHRoZSBtb2RhbCBjb21wb25lbnQgYnkgdXBkYXRpbmcgcHJvcGVydGllcyBiYXNlZCBvbiBwYXJhbWV0ZXJzLlxuICovXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWJhY2tncm91bmQtbW9kYWwnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZV0sXG4gIHRlbXBsYXRlVXJsOiAnLi9iYWNrZ3JvdW5kLW1vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYmFja2dyb3VuZC1tb2RhbC5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEJhY2tncm91bmRNb2RhbCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgQElucHV0KCkgaXNWaXNpYmxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIHBhcmFtZXRlcnM6IEJhY2tncm91bmRNb2RhbFBhcmFtZXRlcnMgPSB7fSBhcyBCYWNrZ3JvdW5kTW9kYWxQYXJhbWV0ZXJzO1xuICBASW5wdXQoKSBwb3NpdGlvbiA9ICd0b3BMZWZ0JztcbiAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yID0gJyNmNWY1ZjUnO1xuICBASW5wdXQoKSBvbkNsb3NlOiAoKSA9PiB2b2lkID0gKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdvbkNsb3NlJyk7XG4gIH07XG5cbiAgQFZpZXdDaGlsZCgnZGVmYXVsdEltYWdlc0NvbnRhaW5lcicpIGRlZmF1bHRJbWFnZXNDb250YWluZXJSZWYhOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCd1cGxvYWRJbWFnZUlucHV0JykgdXBsb2FkSW1hZ2VJbnB1dFJlZiE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2JhY2tncm91bmRDYW52YXMnKSBiYWNrZ3JvdW5kQ2FudmFzUmVmITogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgndmlkZW9QcmV2aWV3JykgdmlkZW9QcmV2aWV3UmVmITogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnY2FwdHVyZVZpZGVvJykgY2FwdHVyZVZpZGVvUmVmITogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnbG9hZGluZ092ZXJsYXknKSBsb2FkaW5nT3ZlcmxheVJlZiE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2FwcGx5QmFja2dyb3VuZEJ1dHRvbicpIGFwcGx5QmFja2dyb3VuZEJ1dHRvblJlZiE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3NhdmVCYWNrZ3JvdW5kQnV0dG9uJykgc2F2ZUJhY2tncm91bmRCdXR0b25SZWYhOiBFbGVtZW50UmVmO1xuXG4gIGZhVGltZXMgPSBmYVRpbWVzO1xuXG4gIGN1c3RvbUltYWdlID0gJyc7XG4gIHNlbGVjdGVkSW1hZ2UgPSAnJztcbiAgc2VnbWVudFZpZGVvOiBNZWRpYVN0cmVhbSB8IG51bGwgPSBudWxsO1xuICBzZWxmaWVTZWdtZW50YXRpb246IFNlbGZpZVNlZ21lbnRhdGlvbiB8IG51bGwgPSBudWxsO1xuICBwYXVzZVNlZ21lbnRhdGlvbiA9IGZhbHNlO1xuICBwcm9jZXNzZWRTdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbCA9IG51bGw7XG4gIGtlZXBCYWNrZ3JvdW5kID0gZmFsc2U7XG4gIGJhY2tncm91bmRIYXNDaGFuZ2VkID0gZmFsc2U7XG4gIHZpcnR1YWxTdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbCA9IG51bGw7XG4gIG1haW5DYW52YXMhOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgcHJldktlZXBCYWNrZ3JvdW5kID0gZmFsc2U7XG4gIGFwcGxpZWRCYWNrZ3JvdW5kID0gZmFsc2U7XG4gIHZpZGVvQWxyZWFkeU9uID0gZmFsc2U7XG4gIGF1ZGlvT25seVJvb20gPSBmYWxzZTtcbiAgaXNsZXZlbCA9ICcwJztcbiAgcmVjb3JkU3RhcnRlZCA9IGZhbHNlO1xuICByZWNvcmRSZXN1bWVkID0gZmFsc2U7XG4gIHJlY29yZFBhdXNlZCA9IGZhbHNlO1xuICByZWNvcmRTdG9wcGVkID0gZmFsc2U7XG4gIHJlY29yZGluZ01lZGlhT3B0aW9ucyA9ICcnO1xuICB2aWRDb25zOiBhbnkgPSB7fTtcbiAgZnJhbWVSYXRlID0gNTtcbiAgdGFyZ2V0UmVzb2x1dGlvbiA9ICcxMjgweDcyMCc7XG4gIHZpZGVvUGFyYW1zOiBQcm9kdWNlck9wdGlvbnMgPSB7fTtcbiAgYXV0b0NsaWNrQmFja2dyb3VuZCA9IGZhbHNlO1xuICBsb2NhbFN0cmVhbVZpZGVvOiBNZWRpYVN0cmVhbSB8IG51bGwgPSBudWxsO1xuXG4gIGNsb25lZFN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsID0gbnVsbDtcbiAgY2xvbmVkVHJhY2s6IE1lZGlhU3RyZWFtVHJhY2sgfCBudWxsID0gbnVsbDtcblxuICB1cGRhdGVDdXN0b21JbWFnZSE6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVTZWxlY3RlZEltYWdlITogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZVNlZ21lbnRWaWRlbyE6ICh2YWx1ZTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVTZWxmaWVTZWdtZW50YXRpb24hOiAodmFsdWU6IFNlbGZpZVNlZ21lbnRhdGlvbiB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZVBhdXNlU2VnbWVudGF0aW9uITogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVQcm9jZXNzZWRTdHJlYW0hOiAodmFsdWU6IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlS2VlcEJhY2tncm91bmQhOiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUJhY2tncm91bmRIYXNDaGFuZ2VkITogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVWaXJ0dWFsU3RyZWFtITogKHZhbHVlOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZU1haW5DYW52YXMhOiAodmFsdWU6IEhUTUxDYW52YXNFbGVtZW50KSA9PiB2b2lkO1xuICB1cGRhdGVQcmV2S2VlcEJhY2tncm91bmQhOiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUFwcGxpZWRCYWNrZ3JvdW5kITogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVWaWRlb1BhcmFtcyE6ICh2YWx1ZTogUHJvZHVjZXJPcHRpb25zKSA9PiB2b2lkO1xuICB1cGRhdGVBdXRvQ2xpY2tCYWNrZ3JvdW5kITogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xuXG4gIC8vIE1lZGlhIGZ1bmN0aW9uc1xuICBjcmVhdGVTZW5kVHJhbnNwb3J0ITogQ3JlYXRlU2VuZFRyYW5zcG9ydFR5cGU7XG4gIGNvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8hOiBDb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvVHlwZTtcbiAgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyE6IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW9UeXBlO1xuICBvblNjcmVlbkNoYW5nZXMhOiBPblNjcmVlbkNoYW5nZXNUeXBlO1xuICBzbGVlcCE6IFNsZWVwVHlwZTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBJbml0aWFsaXplIGxvY2FsIHByb3BlcnRpZXMgZnJvbSB0aGUgcGFyYW1ldGVyc1xuICAgIGlmICh0aGlzLnBhcmFtZXRlcnMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMudXBkYXRlVmFyaWFibGVzKCk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWydpc1Zpc2libGUnXSkge1xuICAgICAgdGhpcy5vblZpc2liaWxpdHlDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1snYXV0b0NsaWNrQmFja2dyb3VuZCddKSB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgJ0F1dG8gY2xpY2sgYmFja2dyb3VuZCBjaGFuZ2VkOicsXG4gICAgICAgIHRoaXMuYXV0b0NsaWNrQmFja2dyb3VuZCxcbiAgICAgICAgY2hhbmdlc1snYXV0b0NsaWNrQmFja2dyb3VuZCddLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVWYXJpYWJsZXMoKSB7XG4gICAgdGhpcy5jdXN0b21JbWFnZSA9IHRoaXMucGFyYW1ldGVycy5jdXN0b21JbWFnZSB8fCAnJztcbiAgICB0aGlzLnNlbGVjdGVkSW1hZ2UgPSB0aGlzLnBhcmFtZXRlcnMuc2VsZWN0ZWRJbWFnZSB8fCAnJztcbiAgICB0aGlzLnNlZ21lbnRWaWRlbyA9IHRoaXMucGFyYW1ldGVycy5zZWdtZW50VmlkZW8gfHwgbnVsbDtcbiAgICB0aGlzLnNlbGZpZVNlZ21lbnRhdGlvbiA9IHRoaXMucGFyYW1ldGVycy5zZWxmaWVTZWdtZW50YXRpb24gfHwgbnVsbDtcbiAgICB0aGlzLnBhdXNlU2VnbWVudGF0aW9uID0gdGhpcy5wYXJhbWV0ZXJzLnBhdXNlU2VnbWVudGF0aW9uIHx8IGZhbHNlO1xuICAgIHRoaXMucHJvY2Vzc2VkU3RyZWFtID0gdGhpcy5wYXJhbWV0ZXJzLnByb2Nlc3NlZFN0cmVhbSB8fCBudWxsO1xuICAgIHRoaXMua2VlcEJhY2tncm91bmQgPSB0aGlzLnBhcmFtZXRlcnMua2VlcEJhY2tncm91bmQgfHwgZmFsc2U7XG4gICAgdGhpcy5iYWNrZ3JvdW5kSGFzQ2hhbmdlZCA9IHRoaXMucGFyYW1ldGVycy5iYWNrZ3JvdW5kSGFzQ2hhbmdlZCB8fCBmYWxzZTtcbiAgICB0aGlzLnZpcnR1YWxTdHJlYW0gPSB0aGlzLnBhcmFtZXRlcnMudmlydHVhbFN0cmVhbSB8fCBudWxsO1xuICAgIHRoaXMubWFpbkNhbnZhcyA9IHRoaXMucGFyYW1ldGVycy5tYWluQ2FudmFzIHx8IHRoaXMuYmFja2dyb3VuZENhbnZhc1JlZj8ubmF0aXZlRWxlbWVudCB8fCBudWxsO1xuICAgIHRoaXMucHJldktlZXBCYWNrZ3JvdW5kID0gdGhpcy5wYXJhbWV0ZXJzLnByZXZLZWVwQmFja2dyb3VuZCB8fCBmYWxzZTtcbiAgICB0aGlzLmFwcGxpZWRCYWNrZ3JvdW5kID0gdGhpcy5wYXJhbWV0ZXJzLmFwcGxpZWRCYWNrZ3JvdW5kIHx8IGZhbHNlO1xuICAgIHRoaXMudmlkZW9BbHJlYWR5T24gPSB0aGlzLnBhcmFtZXRlcnMudmlkZW9BbHJlYWR5T24gfHwgZmFsc2U7XG4gICAgdGhpcy5hdWRpb09ubHlSb29tID0gdGhpcy5wYXJhbWV0ZXJzLmF1ZGlvT25seVJvb20gfHwgZmFsc2U7XG4gICAgdGhpcy5pc2xldmVsID0gdGhpcy5wYXJhbWV0ZXJzLmlzbGV2ZWwgfHwgJzAnO1xuICAgIHRoaXMucmVjb3JkU3RhcnRlZCA9IHRoaXMucGFyYW1ldGVycy5yZWNvcmRTdGFydGVkIHx8IGZhbHNlO1xuICAgIHRoaXMucmVjb3JkUmVzdW1lZCA9IHRoaXMucGFyYW1ldGVycy5yZWNvcmRSZXN1bWVkIHx8IGZhbHNlO1xuICAgIHRoaXMucmVjb3JkUGF1c2VkID0gdGhpcy5wYXJhbWV0ZXJzLnJlY29yZFBhdXNlZCB8fCBmYWxzZTtcbiAgICB0aGlzLnJlY29yZFN0b3BwZWQgPSB0aGlzLnBhcmFtZXRlcnMucmVjb3JkU3RvcHBlZCB8fCBmYWxzZTtcbiAgICB0aGlzLnJlY29yZGluZ01lZGlhT3B0aW9ucyA9IHRoaXMucGFyYW1ldGVycy5yZWNvcmRpbmdNZWRpYU9wdGlvbnMgfHwgJyc7XG4gICAgdGhpcy52aWRDb25zID0gdGhpcy5wYXJhbWV0ZXJzLnZpZENvbnMgfHwge307XG4gICAgdGhpcy5mcmFtZVJhdGUgPSB0aGlzLnBhcmFtZXRlcnMuZnJhbWVSYXRlIHx8IDU7XG4gICAgdGhpcy52aWRlb1BhcmFtcyA9IHRoaXMucGFyYW1ldGVycy52aWRlb1BhcmFtcyB8fCBudWxsO1xuICAgIHRoaXMuYXV0b0NsaWNrQmFja2dyb3VuZCA9IHRoaXMucGFyYW1ldGVycy5hdXRvQ2xpY2tCYWNrZ3JvdW5kIHx8IGZhbHNlO1xuICAgIHRoaXMubG9jYWxTdHJlYW1WaWRlbyA9IHRoaXMucGFyYW1ldGVycy5sb2NhbFN0cmVhbVZpZGVvIHx8IG51bGw7XG5cbiAgICAvLyBBc3NpZ24gbWV0aG9kIHJlZmVyZW5jZXNcbiAgICB0aGlzLnVwZGF0ZUN1c3RvbUltYWdlID0gdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZUN1c3RvbUltYWdlO1xuICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRJbWFnZSA9IHRoaXMucGFyYW1ldGVycy51cGRhdGVTZWxlY3RlZEltYWdlO1xuICAgIHRoaXMudXBkYXRlU2VnbWVudFZpZGVvID0gdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVNlZ21lbnRWaWRlbztcbiAgICB0aGlzLnVwZGF0ZVNlbGZpZVNlZ21lbnRhdGlvbiA9IHRoaXMucGFyYW1ldGVycy51cGRhdGVTZWxmaWVTZWdtZW50YXRpb247XG4gICAgdGhpcy51cGRhdGVQYXVzZVNlZ21lbnRhdGlvbiA9IHRoaXMucGFyYW1ldGVycy51cGRhdGVQYXVzZVNlZ21lbnRhdGlvbjtcbiAgICB0aGlzLnVwZGF0ZVByb2Nlc3NlZFN0cmVhbSA9IHRoaXMucGFyYW1ldGVycy51cGRhdGVQcm9jZXNzZWRTdHJlYW07XG4gICAgdGhpcy51cGRhdGVLZWVwQmFja2dyb3VuZCA9IHRoaXMucGFyYW1ldGVycy51cGRhdGVLZWVwQmFja2dyb3VuZDtcbiAgICB0aGlzLnVwZGF0ZUJhY2tncm91bmRIYXNDaGFuZ2VkID0gdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZUJhY2tncm91bmRIYXNDaGFuZ2VkO1xuICAgIHRoaXMudXBkYXRlVmlydHVhbFN0cmVhbSA9IHRoaXMucGFyYW1ldGVycy51cGRhdGVWaXJ0dWFsU3RyZWFtO1xuICAgIHRoaXMudXBkYXRlTWFpbkNhbnZhcyA9IHRoaXMucGFyYW1ldGVycy51cGRhdGVNYWluQ2FudmFzO1xuICAgIHRoaXMudXBkYXRlUHJldktlZXBCYWNrZ3JvdW5kID0gdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVByZXZLZWVwQmFja2dyb3VuZDtcbiAgICB0aGlzLnVwZGF0ZUFwcGxpZWRCYWNrZ3JvdW5kID0gdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZUFwcGxpZWRCYWNrZ3JvdW5kO1xuICAgIHRoaXMudXBkYXRlVmlkZW9QYXJhbXMgPSB0aGlzLnBhcmFtZXRlcnMudXBkYXRlVmlkZW9QYXJhbXM7XG4gICAgdGhpcy51cGRhdGVBdXRvQ2xpY2tCYWNrZ3JvdW5kID0gdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZUF1dG9DbGlja0JhY2tncm91bmQ7XG5cbiAgICB0aGlzLmNyZWF0ZVNlbmRUcmFuc3BvcnQgPSB0aGlzLnBhcmFtZXRlcnMuY3JlYXRlU2VuZFRyYW5zcG9ydDtcbiAgICB0aGlzLmNvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8gPSB0aGlzLnBhcmFtZXRlcnMuY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbztcbiAgICB0aGlzLmRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8gPSB0aGlzLnBhcmFtZXRlcnMuZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbztcbiAgICB0aGlzLm9uU2NyZWVuQ2hhbmdlcyA9IHRoaXMucGFyYW1ldGVycy5vblNjcmVlbkNoYW5nZXM7XG4gICAgdGhpcy5zbGVlcCA9IHRoaXMucGFyYW1ldGVycy5zbGVlcDtcbiAgfVxuXG4gIG9uVmlzaWJpbGl0eUNoYW5nZSA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAodGhpcy5wYXJhbWV0ZXJzKSB7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMgPSB0aGlzLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuICAgICAgdGhpcy51cGRhdGVWYXJpYWJsZXMoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcbiAgICAgIGlmICghdGhpcy5zZWxmaWVTZWdtZW50YXRpb24pIHtcbiAgICAgICAgYXdhaXQgdGhpcy5wcmVsb2FkTW9kZWwoKS5jYXRjaCgoKSA9PiBjb25zb2xlLmxvZygnRXJyb3IgcHJlbG9hZGluZyBtb2RlbDonKSk7XG4gICAgICB9XG4gICAgICB0aGlzLnJlbmRlckRlZmF1bHRJbWFnZXMoKTtcblxuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJbWFnZSkge1xuICAgICAgICBhd2FpdCB0aGlzLmxvYWRJbWFnZVRvQ2FudmFzKHRoaXMuc2VsZWN0ZWRJbWFnZSwgdGhpcy5zZWxlY3RlZEltYWdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2xlYXJDYW52YXMoKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2F2ZUJhY2tncm91bmRCdXR0b25SZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgICAgIHRoaXMuc2F2ZUJhY2tncm91bmRCdXR0b25SZWYubmF0aXZlRWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB0aGlzLmFwcGx5QmFja2dyb3VuZEJ1dHRvblJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICAgICAgdGhpcy5hcHBseUJhY2tncm91bmRCdXR0b25SZWYubmF0aXZlRWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMucHJvY2Vzc2VkU3RyZWFtICYmXG4gICAgICAgIHRoaXMucHJldktlZXBCYWNrZ3JvdW5kID09IHRoaXMua2VlcEJhY2tncm91bmQgJiZcbiAgICAgICAgdGhpcy5rZWVwQmFja2dyb3VuZCAmJlxuICAgICAgICB0aGlzLmFwcGxpZWRCYWNrZ3JvdW5kXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5hcHBseUJhY2tncm91bmRCdXR0b25SZWYubmF0aXZlRWxlbWVudC5pbm5lclRleHQgPSAnQXBwbHkgQmFja2dyb3VuZCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFwcGx5QmFja2dyb3VuZEJ1dHRvblJlZi5uYXRpdmVFbGVtZW50LmlubmVyVGV4dCA9ICdQcmV2aWV3IEJhY2tncm91bmQnO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5hdXRvQ2xpY2tCYWNrZ3JvdW5kKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuYXBwbHlCYWNrZ3JvdW5kKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuc2F2ZUJhY2tncm91bmQoKTtcbiAgICAgICAgdGhpcy5hdXRvQ2xpY2tCYWNrZ3JvdW5kID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlQXV0b0NsaWNrQmFja2dyb3VuZCh0aGlzLmF1dG9DbGlja0JhY2tncm91bmQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBJZiBubyBiYWNrZ3JvdW5kIGlzIGFwcGxpZWQgb3IgdGhlIGFwcGxpZWQgYmFja2dyb3VuZCBzaG91bGQgbm90IGJlIGtlcHRcbiAgICAgICAgaWYgKFxuICAgICAgICAgICF0aGlzLmFwcGxpZWRCYWNrZ3JvdW5kIHx8XG4gICAgICAgICAgKHRoaXMuYXBwbGllZEJhY2tncm91bmQgJiYgIXRoaXMua2VlcEJhY2tncm91bmQpIHx8XG4gICAgICAgICAgKHRoaXMuYXBwbGllZEJhY2tncm91bmQgJiYgIXRoaXMudmlkZW9BbHJlYWR5T24pXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IHJlZlZpZGVvID0gdGhpcy5jYXB0dXJlVmlkZW9SZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICB0aGlzLnBhdXNlU2VnbWVudGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhdXNlU2VnbWVudGF0aW9uKHRoaXMucGF1c2VTZWdtZW50YXRpb24pO1xuXG4gICAgICAgICAgaWYgKCF0aGlzLnZpZGVvQWxyZWFkeU9uKSB7XG4gICAgICAgICAgICAvLyBTdG9wIHZpZGVvIHRyYWNrcyBhbmQgY2xlYXIgdGhlIHZpZGVvIGVsZW1lbnQncyBzcmNPYmplY3RcbiAgICAgICAgICAgIGlmIChyZWZWaWRlbyAmJiByZWZWaWRlby5zcmNPYmplY3QpIHtcbiAgICAgICAgICAgICAgcmVmVmlkZW8uc3JjT2JqZWN0LmdldFRyYWNrcygpLmZvckVhY2goKHRyYWNrOiBhbnkpID0+IHRyYWNrLnN0b3AoKSk7XG4gICAgICAgICAgICAgIHJlZlZpZGVvLnNyY09iamVjdCA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFN0b3Agc2VnbWVudFZpZGVvIHRyYWNrc1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VnbWVudFZpZGVvKSB7XG4gICAgICAgICAgICAgIHRoaXMuc2VnbWVudFZpZGVvLmdldFRyYWNrcygpLmZvckVhY2goKHRyYWNrOiBhbnkpID0+IHRyYWNrLnN0b3AoKSk7XG4gICAgICAgICAgICAgIHRoaXMuc2VnbWVudFZpZGVvID0gbnVsbDtcbiAgICAgICAgICAgICAgdGhpcy51cGRhdGVTZWdtZW50VmlkZW8odGhpcy5zZWdtZW50VmlkZW8pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTdG9wIHZpcnR1YWxTdHJlYW0gdHJhY2tzXG4gICAgICAgICAgICBpZiAodGhpcy52aXJ0dWFsU3RyZWFtKSB7XG4gICAgICAgICAgICAgIHRoaXMudmlydHVhbFN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKCh0cmFjazogYW55KSA9PiB0cmFjay5zdG9wKCkpO1xuICAgICAgICAgICAgICB0aGlzLnZpcnR1YWxTdHJlYW0gPSBudWxsO1xuICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZpcnR1YWxTdHJlYW0odGhpcy52aXJ0dWFsU3RyZWFtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIaWRlIHRoZSB2aWRlbyBwcmV2aWV3IGFuZCBzaG93IHRoZSBjYW52YXNcbiAgICAgICAgdGhpcy52aWRlb1ByZXZpZXdSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGFzeW5jIHByZWxvYWRNb2RlbCgpIHtcbiAgICB0aGlzLnNlbGZpZVNlZ21lbnRhdGlvbiA9IG5ldyBTZWxmaWVTZWdtZW50YXRpb24oe1xuICAgICAgbG9jYXRlRmlsZTogKGZpbGUpID0+IGBodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL0BtZWRpYXBpcGUvc2VsZmllX3NlZ21lbnRhdGlvbi8ke2ZpbGV9YCxcbiAgICB9KTtcbiAgICB0aGlzLnNlbGZpZVNlZ21lbnRhdGlvbi5zZXRPcHRpb25zKHtcbiAgICAgIG1vZGVsU2VsZWN0aW9uOiAxLFxuICAgICAgc2VsZmllTW9kZTogZmFsc2UsXG4gICAgfSk7XG4gICAgYXdhaXQgdGhpcy5zZWxmaWVTZWdtZW50YXRpb24uaW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMudXBkYXRlU2VsZmllU2VnbWVudGF0aW9uKHRoaXMuc2VsZmllU2VnbWVudGF0aW9uKTtcbiAgfVxuXG4gIHJlbmRlckRlZmF1bHRJbWFnZXMoKSB7XG4gICAgY29uc3QgZGVmYXVsdEltYWdlcyA9IFsnd2FsbCcsICd3YWxsMicsICdzaGVsZicsICdjbG9jaycsICdkZXNlcnQnLCAnZmxvd2VyJ107XG4gICAgY29uc3QgZGVmYXVsdEltYWdlc0NvbnRhaW5lciA9IHRoaXMuZGVmYXVsdEltYWdlc0NvbnRhaW5lclJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGRlZmF1bHRJbWFnZXNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG5cbiAgICBkZWZhdWx0SW1hZ2VzLmZvckVhY2goKGJhc2VOYW1lKSA9PiB7XG4gICAgICBjb25zdCB0aHVtYiA9IGBodHRwczovL21lZGlhc2Z1LmNvbS9pbWFnZXMvYmFja2dyb3VuZHMvJHtiYXNlTmFtZX1fdGh1bWJuYWlsLmpwZ2A7XG4gICAgICBjb25zdCBzbWFsbCA9IGBodHRwczovL21lZGlhc2Z1LmNvbS9pbWFnZXMvYmFja2dyb3VuZHMvJHtiYXNlTmFtZX1fc21hbGwuanBnYDtcbiAgICAgIGNvbnN0IGxhcmdlID0gYGh0dHBzOi8vbWVkaWFzZnUuY29tL2ltYWdlcy9iYWNrZ3JvdW5kcy8ke2Jhc2VOYW1lfV9sYXJnZS5qcGdgO1xuICAgICAgY29uc3QgZnVsbCA9IGBodHRwczovL21lZGlhc2Z1LmNvbS9pbWFnZXMvYmFja2dyb3VuZHMvJHtiYXNlTmFtZX0uanBnYDtcbiAgICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgaW1nLnNyYyA9IHRodW1iO1xuICAgICAgaW1nLmNsYXNzTGlzdC5hZGQoJ2ltZy10aHVtYm5haWwnLCAnbS0xJyk7XG4gICAgICBpbWcuc3R5bGUud2lkdGggPSAnODBweCc7XG4gICAgICBpbWcuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy50YXJnZXRSZXNvbHV0aW9uID09ICdmaGQnIHx8IHRoaXMudGFyZ2V0UmVzb2x1dGlvbiA9PSAncWhkJykge1xuICAgICAgICAgIGF3YWl0IHRoaXMubG9hZEltYWdlVG9DYW52YXMoc21hbGwsIGxhcmdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRJbWFnZVRvQ2FudmFzKHNtYWxsLCBmdWxsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBkZWZhdWx0SW1hZ2VzQ29udGFpbmVyLmFwcGVuZENoaWxkKGltZyk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBub0JhY2tncm91bmRJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBub0JhY2tncm91bmRJbWcuY2xhc3NMaXN0LmFkZChcbiAgICAgICdpbWctdGh1bWJuYWlsJyxcbiAgICAgICdtLTEnLFxuICAgICAgJ2QtZmxleCcsXG4gICAgICAnYWxpZ24taXRlbXMtY2VudGVyJyxcbiAgICAgICdqdXN0aWZ5LWNvbnRlbnQtY2VudGVyJyxcbiAgICApO1xuICAgIG5vQmFja2dyb3VuZEltZy5zdHlsZS53aWR0aCA9ICc3NnB4JztcbiAgICBub0JhY2tncm91bmRJbWcuc3R5bGUubWluSGVpZ2h0ID0gJzYwcHgnO1xuICAgIG5vQmFja2dyb3VuZEltZy5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgbm9CYWNrZ3JvdW5kSW1nLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZjhmOWZhJztcbiAgICBub0JhY2tncm91bmRJbWcuc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCAjZGVlMmU2JztcbiAgICBub0JhY2tncm91bmRJbWcuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgIG5vQmFja2dyb3VuZEltZy5pbm5lckhUTUwgPVxuICAgICAgJzxzcGFuIHN0eWxlPVwicG9zaXRpb246YWJzb2x1dGU7IHRvcDo1MCU7IGxlZnQ6NTAlOyB0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsIC01MCUpOyBjb2xvcjojMDAwO1wiPk5vbmU8L3NwYW4+JztcbiAgICBub0JhY2tncm91bmRJbWcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgICB0aGlzLnNlbGVjdGVkSW1hZ2UgPSAnJztcbiAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRJbWFnZSh0aGlzLnNlbGVjdGVkSW1hZ2UpO1xuICAgICAgdGhpcy51cGRhdGVDdXN0b21JbWFnZSgnJyk7XG4gICAgICB0aGlzLnNob3dMb2FkaW5nKCk7XG4gICAgICB0aGlzLnZpZGVvUHJldmlld1JlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XG4gICAgICB0aGlzLmNsZWFyQ2FudmFzKCk7XG4gICAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XG4gICAgfSk7XG4gICAgZGVmYXVsdEltYWdlc0NvbnRhaW5lci5hcHBlbmRDaGlsZChub0JhY2tncm91bmRJbWcpO1xuXG4gICAgaWYgKHRoaXMuY3VzdG9tSW1hZ2UpIHtcbiAgICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgaW1nLnNyYyA9IHRoaXMuY3VzdG9tSW1hZ2U7XG4gICAgICBpbWcuY2xhc3NMaXN0LmFkZCgnaW1nLXRodW1ibmFpbCcsICdtLTEnKTtcbiAgICAgIGltZy5zdHlsZS53aWR0aCA9ICc4MHB4JztcbiAgICAgIGltZy5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMubG9hZEltYWdlVG9DYW52YXModGhpcy5jdXN0b21JbWFnZSwgdGhpcy5jdXN0b21JbWFnZSk7XG4gICAgICB9KTtcbiAgICAgIGRlZmF1bHRJbWFnZXNDb250YWluZXIuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBoYW5kbGVJbWFnZVVwbG9hZChldmVudDogRXZlbnQpIHtcbiAgICBsZXQgbWluV2lkdGggPSAxMjgwO1xuICAgIGxldCBtaW5IZWlnaHQgPSAxMjgwO1xuICAgIGxldCBtYXhXaWR0aCA9IDI1NjA7XG4gICAgbGV0IG1heEhlaWdodCA9IDI1NjA7XG5cbiAgICBpZiAodGhpcy50YXJnZXRSZXNvbHV0aW9uID09ICdmaGQnKSB7XG4gICAgICBtaW5XaWR0aCA9IDE5MjA7XG4gICAgICBtaW5IZWlnaHQgPSAxOTIwO1xuICAgIH0gZWxzZSBpZiAodGhpcy50YXJnZXRSZXNvbHV0aW9uID09ICdxaGQnKSB7XG4gICAgICBtaW5XaWR0aCA9IDI1NjA7XG4gICAgICBtaW5IZWlnaHQgPSAyNTYwO1xuICAgIH0gLy8gRm9yIG90aGVyIHJlc29sdXRpb25zLCBzdGljayB0byB0aGUgZGVmYXVsdCAxMjgweDEyODBcblxuICAgIGNvbnN0IGlucHV0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgaWYgKGlucHV0LmZpbGVzICYmIGlucHV0LmZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGZpbGUgPSBpbnB1dC5maWxlc1swXTtcbiAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1nLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG4gICAgICBpbWcub25sb2FkID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgaW1nLndpZHRoIDwgbWluV2lkdGggfHxcbiAgICAgICAgICBpbWcuaGVpZ2h0IDwgbWluSGVpZ2h0IHx8XG4gICAgICAgICAgaW1nLndpZHRoID4gbWF4V2lkdGggfHxcbiAgICAgICAgICBpbWcuaGVpZ2h0ID4gbWF4SGVpZ2h0XG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY3VzdG9tSW1hZ2UgPSBpbWcuc3JjO1xuICAgICAgICAgIHRoaXMudXBkYXRlQ3VzdG9tSW1hZ2UodGhpcy5jdXN0b21JbWFnZSk7XG4gICAgICAgICAgYXdhaXQgdGhpcy5sb2FkSW1hZ2VUb0NhbnZhcyhpbWcuc3JjLCBpbWcuc3JjKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIub25sb2FkID0gKGU6IFByb2dyZXNzRXZlbnQ8RmlsZVJlYWRlcj4pID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0KSB7XG4gICAgICAgICAgaW1nLnNyYyA9IGUudGFyZ2V0LnJlc3VsdCBhcyBzdHJpbmc7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICB9XG4gIH1cblxuICBjbGVhckNhbnZhcygpIHtcbiAgICBjb25zdCBjdHggPSB0aGlzLmJhY2tncm91bmRDYW52YXNSZWYubmF0aXZlRWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5jbGVhclJlY3QoXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIHRoaXMuYmFja2dyb3VuZENhbnZhc1JlZi5uYXRpdmVFbGVtZW50LndpZHRoLFxuICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuaGVpZ2h0LFxuICAgICk7XG4gICAgY3R4LmZvbnQgPSAnMzBweCBBcmlhbCc7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcbiAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgY3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgIGN0eC5maWxsVGV4dChcbiAgICAgICdObyBCYWNrZ3JvdW5kJyxcbiAgICAgIHRoaXMuYmFja2dyb3VuZENhbnZhc1JlZi5uYXRpdmVFbGVtZW50LndpZHRoIC8gMixcbiAgICAgIHRoaXMuYmFja2dyb3VuZENhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmhlaWdodCAvIDIsXG4gICAgKTtcblxuICAgIHRoaXMuYXBwbHlCYWNrZ3JvdW5kQnV0dG9uUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XG4gICAgdGhpcy5hcHBseUJhY2tncm91bmRCdXR0b25SZWYubmF0aXZlRWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9jZXNzZWRTdHJlYW0gJiZcbiAgICAgIHRoaXMucHJldktlZXBCYWNrZ3JvdW5kID09IHRoaXMua2VlcEJhY2tncm91bmQgJiZcbiAgICAgIHRoaXMua2VlcEJhY2tncm91bmQgJiZcbiAgICAgIHRoaXMuYXBwbGllZEJhY2tncm91bmRcbiAgICApIHtcbiAgICAgIHRoaXMuYXBwbHlCYWNrZ3JvdW5kQnV0dG9uUmVmLm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0ID0gJ0FwcGx5IEJhY2tncm91bmQnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFwcGx5QmFja2dyb3VuZEJ1dHRvblJlZi5uYXRpdmVFbGVtZW50LmlubmVyVGV4dCA9ICdQcmV2aWV3IEJhY2tncm91bmQnO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGxvYWRJbWFnZVRvQ2FudmFzKHNyYzogc3RyaW5nLCBmdWxsU3JjOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNob3dMb2FkaW5nKCk7XG4gICAgYXdhaXQgdGhpcy5iYWNrZ3JvdW5kQ2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XG4gICAgYXdhaXQgdGhpcy52aWRlb1ByZXZpZXdSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcblxuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5jcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xuICAgIGltZy5vbmxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBjdHggPSBhd2FpdCB0aGlzLmJhY2tncm91bmRDYW52YXNSZWYubmF0aXZlRWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQud2lkdGggPSBpbWcud2lkdGg7XG4gICAgICB0aGlzLmJhY2tncm91bmRDYW52YXNSZWYubmF0aXZlRWxlbWVudC5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xuICAgICAgYXdhaXQgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xuICAgICAgdGhpcy5yZW1vdmVCYWNrZ3JvdW5kKGltZyk7XG4gICAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XG4gICAgfTtcbiAgICBpbWcuc3JjID0gc3JjO1xuICAgIHRoaXMuc2VsZWN0ZWRJbWFnZSA9IGZ1bGxTcmM7XG4gICAgdGhpcy51cGRhdGVTZWxlY3RlZEltYWdlKHRoaXMuc2VsZWN0ZWRJbWFnZSk7XG5cbiAgICB0aGlzLnNhdmVCYWNrZ3JvdW5kQnV0dG9uUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XG4gICAgdGhpcy5zYXZlQmFja2dyb3VuZEJ1dHRvblJlZi5uYXRpdmVFbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcbiAgICB0aGlzLmFwcGx5QmFja2dyb3VuZEJ1dHRvblJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICAgIHRoaXMuYXBwbHlCYWNrZ3JvdW5kQnV0dG9uUmVmLm5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIGlmIChcbiAgICAgIHRoaXMucHJvY2Vzc2VkU3RyZWFtICYmXG4gICAgICB0aGlzLnByZXZLZWVwQmFja2dyb3VuZCA9PSB0aGlzLmtlZXBCYWNrZ3JvdW5kICYmXG4gICAgICB0aGlzLmtlZXBCYWNrZ3JvdW5kICYmXG4gICAgICB0aGlzLmFwcGxpZWRCYWNrZ3JvdW5kXG4gICAgKSB7XG4gICAgICB0aGlzLmFwcGx5QmFja2dyb3VuZEJ1dHRvblJlZi5uYXRpdmVFbGVtZW50LmlubmVyVGV4dCA9ICdBcHBseSBCYWNrZ3JvdW5kJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hcHBseUJhY2tncm91bmRCdXR0b25SZWYubmF0aXZlRWxlbWVudC5pbm5lclRleHQgPSAnUHJldmlldyBCYWNrZ3JvdW5kJztcbiAgICB9XG4gIH1cblxuICByZW1vdmVCYWNrZ3JvdW5kKGltZzogSFRNTEltYWdlRWxlbWVudCkge1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuYmFja2dyb3VuZENhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4LmNsZWFyUmVjdChcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQud2lkdGgsXG4gICAgICB0aGlzLmJhY2tncm91bmRDYW52YXNSZWYubmF0aXZlRWxlbWVudC5oZWlnaHQsXG4gICAgKTtcbiAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XG4gIH1cblxuICBhc3luYyBhcHBseUJhY2tncm91bmQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLmF1ZGlvT25seVJvb20pIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHtcbiAgICAgICAgICBtZXNzYWdlOiAnWW91IGNhbm5vdCB1c2UgYSBiYWNrZ3JvdW5kIGluIGFuIGF1ZGlvIG9ubHkgZXZlbnQuJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zaG93TG9hZGluZygpO1xuXG4gICAgICB0aGlzLnZpZGVvUHJldmlld1JlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XG5cbiAgICAgIGNvbnN0IGRvU2VnbWVudGF0aW9uID0gdGhpcy5zZWxlY3RlZEltYWdlID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgdGhpcy5wYXVzZVNlZ21lbnRhdGlvbiA9IGZhbHNlO1xuICAgICAgdGhpcy51cGRhdGVQYXVzZVNlZ21lbnRhdGlvbih0aGlzLnBhdXNlU2VnbWVudGF0aW9uKTtcbiAgICAgIGF3YWl0IHRoaXMuc2VsZmllU2VnbWVudGF0aW9uUHJldmlldyhkb1NlZ21lbnRhdGlvbik7XG5cbiAgICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcblxuICAgICAgdGhpcy5hcHBseUJhY2tncm91bmRCdXR0b25SZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgICAgIHRoaXMuYXBwbHlCYWNrZ3JvdW5kQnV0dG9uUmVmLm5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMucHJvY2Vzc2VkU3RyZWFtICYmXG4gICAgICAgIHRoaXMucHJldktlZXBCYWNrZ3JvdW5kID09IHRoaXMua2VlcEJhY2tncm91bmQgJiZcbiAgICAgICAgdGhpcy5rZWVwQmFja2dyb3VuZCAmJlxuICAgICAgICB0aGlzLmFwcGxpZWRCYWNrZ3JvdW5kXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5zYXZlQmFja2dyb3VuZEJ1dHRvblJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICAgICAgICB0aGlzLnNhdmVCYWNrZ3JvdW5kQnV0dG9uUmVmLm5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zYXZlQmFja2dyb3VuZEJ1dHRvblJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICAgICAgICB0aGlzLnNhdmVCYWNrZ3JvdW5kQnV0dG9uUmVmLm5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHNlbGZpZVNlZ21lbnRhdGlvblByZXZpZXcoZG9TZWdtZW50YXRpb246IGJvb2xlYW4pIHtcbiAgICBjb25zdCByZWZWaWRlbyA9IHRoaXMuY2FwdHVyZVZpZGVvUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgcHJldmlld1ZpZGVvID0gdGhpcy52aWRlb1ByZXZpZXdSZWYubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCB2aXJ0dWFsSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICB2aXJ0dWFsSW1hZ2UuY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJztcbiAgICB2aXJ0dWFsSW1hZ2Uuc3JjID0gdGhpcy5zZWxlY3RlZEltYWdlO1xuXG4gICAgaWYgKCF0aGlzLm1haW5DYW52YXMpIHtcbiAgICAgIHRoaXMubWFpbkNhbnZhcyA9IGF3YWl0IHRoaXMuYmFja2dyb3VuZENhbnZhc1JlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIGxldCBtZWRpYUNhbnZhcyA9IHRoaXMubWFpbkNhbnZhcztcbiAgICBtZWRpYUNhbnZhcy53aWR0aCA9IHJlZlZpZGVvLnZpZGVvV2lkdGg7XG4gICAgbWVkaWFDYW52YXMuaGVpZ2h0ID0gcmVmVmlkZW8udmlkZW9IZWlnaHQ7XG4gICAgbGV0IGN0eCA9IG1lZGlhQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICB0aGlzLmJhY2tncm91bmRIYXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICB0aGlzLnVwZGF0ZUJhY2tncm91bmRIYXNDaGFuZ2VkKHRoaXMuYmFja2dyb3VuZEhhc0NoYW5nZWQpO1xuICAgIHRoaXMucHJldktlZXBCYWNrZ3JvdW5kID0gdGhpcy5rZWVwQmFja2dyb3VuZDtcbiAgICB0aGlzLnVwZGF0ZVByZXZLZWVwQmFja2dyb3VuZCh0aGlzLmtlZXBCYWNrZ3JvdW5kKTtcblxuICAgIGlmICghZG9TZWdtZW50YXRpb24pIHtcbiAgICAgIGNvbnN0IHRyYWNrcyA9IHRoaXMucHJvY2Vzc2VkU3RyZWFtPy5nZXRWaWRlb1RyYWNrcygpO1xuICAgICAgaWYgKHRyYWNrcykge1xuICAgICAgICB0cmFja3MuZm9yRWFjaCgodHJhY2s6IE1lZGlhU3RyZWFtVHJhY2spID0+IHRyYWNrLnN0b3AoKSk7XG4gICAgICB9XG4gICAgICB0aGlzLnByb2Nlc3NlZFN0cmVhbSA9IG51bGw7XG4gICAgICB0aGlzLmtlZXBCYWNrZ3JvdW5kID0gZmFsc2U7XG4gICAgICB0aGlzLnVwZGF0ZVByb2Nlc3NlZFN0cmVhbShudWxsKTtcbiAgICAgIHRoaXMudXBkYXRlS2VlcEJhY2tncm91bmQoZmFsc2UpO1xuICAgICAgcHJldmlld1ZpZGVvLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICAgIH1cblxuICAgIGNvbnN0IHNlZ21lbnRJbWFnZSA9IGFzeW5jICh2aWRlb0VsZW1lbnQ6IEhUTUxWaWRlb0VsZW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHByb2Nlc3NGcmFtZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICF0aGlzLnNlbGZpZVNlZ21lbnRhdGlvbiB8fFxuICAgICAgICAgIHRoaXMucGF1c2VTZWdtZW50YXRpb24gfHxcbiAgICAgICAgICAhdmlkZW9FbGVtZW50IHx8XG4gICAgICAgICAgdmlkZW9FbGVtZW50LnZpZGVvV2lkdGggPT0gMCB8fFxuICAgICAgICAgIHZpZGVvRWxlbWVudC52aWRlb0hlaWdodCA9PSAwXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbGZpZVNlZ21lbnRhdGlvbi5zZW5kKHsgaW1hZ2U6IHZpZGVvRWxlbWVudCB9KTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHByb2Nlc3NGcmFtZSk7XG4gICAgICB9O1xuXG4gICAgICB2aWRlb0VsZW1lbnQub25sb2FkZWRkYXRhID0gKCkgPT4ge1xuICAgICAgICBwcm9jZXNzRnJhbWUoKTtcbiAgICAgIH07XG5cbiAgICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2FwdHVyaW5nIHN0cmVhbTonLCB0aGlzLmZyYW1lUmF0ZSB8fCA1KTtcbiAgICAgICAgdGhpcy5wcm9jZXNzZWRTdHJlYW0gPSBtZWRpYUNhbnZhcy5jYXB0dXJlU3RyZWFtKHRoaXMuZnJhbWVSYXRlIHx8IDUpO1xuICAgICAgICB0aGlzLnVwZGF0ZVByb2Nlc3NlZFN0cmVhbSh0aGlzLnByb2Nlc3NlZFN0cmVhbSk7XG4gICAgICAgIHByZXZpZXdWaWRlby5zcmNPYmplY3QgPSB0aGlzLnByb2Nlc3NlZFN0cmVhbTtcbiAgICAgICAgcHJldmlld1ZpZGVvLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICAgICAgICB0aGlzLmtlZXBCYWNrZ3JvdW5kID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVLZWVwQmFja2dyb3VuZCh0aGlzLmtlZXBCYWNrZ3JvdW5kKTtcblxuICAgICAgICBpZiAocHJldmlld1ZpZGVvLnBhdXNlZCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBwbGF5IHRoZSB2aWRlb1xuICAgICAgICAgICAgcHJldmlld1ZpZGVvLnBsYXkoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgLyogaGFuZGxlIHN1Y2Nlc3MgKi9cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCAxMDApO1xuICAgIH07XG5cbiAgICBpZiAodGhpcy52aWRlb0FscmVhZHlPbikge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmNsb25lZFRyYWNrICYmXG4gICAgICAgIHRoaXMuY2xvbmVkVHJhY2sucmVhZHlTdGF0ZSA9PSAnbGl2ZScgJiZcbiAgICAgICAgdGhpcy5sb2NhbFN0cmVhbVZpZGVvPy5nZXRWaWRlb1RyYWNrcygpWzBdLmxhYmVsID09IHRoaXMuY2xvbmVkVHJhY2subGFiZWxcbiAgICAgICkge1xuICAgICAgICAvLyBVc2UgZXhpc3RpbmcgY2xvbmVkVHJhY2tcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGxvY2FsVHJhY2tzID0gdGhpcy5sb2NhbFN0cmVhbVZpZGVvPy5nZXRWaWRlb1RyYWNrcygpWzBdO1xuICAgICAgICB0aGlzLmNsb25lZFRyYWNrID0gbG9jYWxUcmFja3MhLmNsb25lKCk7XG4gICAgICAgIHRoaXMuY2xvbmVkU3RyZWFtID0gbmV3IE1lZGlhU3RyZWFtKFt0aGlzLmNsb25lZFRyYWNrIV0pO1xuICAgICAgICB0aGlzLnNlZ21lbnRWaWRlbyA9IHRoaXMuY2xvbmVkU3RyZWFtO1xuICAgICAgfVxuICAgICAgdGhpcy51cGRhdGVTZWdtZW50VmlkZW8odGhpcy5zZWdtZW50VmlkZW8pO1xuICAgICAgcmVmVmlkZW8uc3JjT2JqZWN0ID0gdGhpcy5zZWdtZW50VmlkZW87XG4gICAgICBpZiAocmVmVmlkZW8ucGF1c2VkKSB7XG4gICAgICAgIHJlZlZpZGVvLnBsYXkoKTtcbiAgICAgIH1cblxuICAgICAgcmVmVmlkZW8ud2lkdGggPSB0aGlzLnNlZ21lbnRWaWRlbyEuZ2V0VmlkZW9UcmFja3MoKVswXS5nZXRTZXR0aW5ncygpLndpZHRoITtcbiAgICAgIHJlZlZpZGVvLmhlaWdodCA9IHRoaXMuc2VnbWVudFZpZGVvIS5nZXRWaWRlb1RyYWNrcygpWzBdLmdldFNldHRpbmdzKCkuaGVpZ2h0ITtcbiAgICAgIG1lZGlhQ2FudmFzLndpZHRoID0gcmVmVmlkZW8ud2lkdGg7XG4gICAgICBtZWRpYUNhbnZhcy5oZWlnaHQgPSByZWZWaWRlby5oZWlnaHQ7XG4gICAgICBjdHggPSBtZWRpYUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBkb1NlZ21lbnRhdGlvblxuICAgICAgICAgID8gYXdhaXQgc2VnbWVudEltYWdlKHJlZlZpZGVvKVxuICAgICAgICAgIDogKHByZXZpZXdWaWRlby5zcmNPYmplY3QgPSB0aGlzLmNsb25lZFN0cmVhbVxuICAgICAgICAgICAgICA/IHRoaXMuY2xvbmVkU3RyZWFtXG4gICAgICAgICAgICAgIDogdGhpcy5sb2NhbFN0cmVhbVZpZGVvISk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3Igc2VnbWVudGluZyBpbWFnZTonLCBlcnJvcik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnNlZ21lbnRWaWRlbyAmJiB0aGlzLnNlZ21lbnRWaWRlby5nZXRWaWRlb1RyYWNrcygpWzBdLnJlYWR5U3RhdGUgPT0gJ2xpdmUnKSB7XG4gICAgICAgIC8vIFVzZSBleGlzdGluZyBzZWdtZW50VmlkZW9cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3Qgc3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoe1xuICAgICAgICAgICAgdmlkZW86IHsgLi4udGhpcy52aWRDb25zLCBmcmFtZVJhdGU6IHsgaWRlYWw6IHRoaXMuZnJhbWVSYXRlIHx8IDUgfSB9LFxuICAgICAgICAgICAgYXVkaW86IGZhbHNlLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuc2VnbWVudFZpZGVvID0gc3RyZWFtO1xuICAgICAgICAgIHRoaXMudXBkYXRlU2VnbWVudFZpZGVvKHRoaXMuc2VnbWVudFZpZGVvKTtcbiAgICAgICAgICByZWZWaWRlby5zcmNPYmplY3QgPSB0aGlzLnNlZ21lbnRWaWRlbztcbiAgICAgICAgICBpZiAocmVmVmlkZW8ucGF1c2VkKSB7XG4gICAgICAgICAgICByZWZWaWRlby5wbGF5KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBnZXR0aW5nIHVzZXIgbWVkaWE6JywgZXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVmVmlkZW8ud2lkdGggPSB0aGlzLnNlZ21lbnRWaWRlbyEuZ2V0VmlkZW9UcmFja3MoKVswXS5nZXRTZXR0aW5ncygpLndpZHRoITtcbiAgICAgICAgcmVmVmlkZW8uaGVpZ2h0ID0gdGhpcy5zZWdtZW50VmlkZW8hLmdldFZpZGVvVHJhY2tzKClbMF0uZ2V0U2V0dGluZ3MoKS5oZWlnaHQhO1xuICAgICAgICBtZWRpYUNhbnZhcy53aWR0aCA9IHJlZlZpZGVvLndpZHRoO1xuICAgICAgICBtZWRpYUNhbnZhcy5oZWlnaHQgPSByZWZWaWRlby5oZWlnaHQ7XG4gICAgICAgIGN0eCA9IG1lZGlhQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGRvU2VnbWVudGF0aW9uXG4gICAgICAgICAgPyBhd2FpdCBzZWdtZW50SW1hZ2UocmVmVmlkZW8pXG4gICAgICAgICAgOiAocHJldmlld1ZpZGVvLnNyY09iamVjdCA9IHJlZlZpZGVvLnNyY09iamVjdCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHJlcGVhdFBhdHRlcm4gPSAnbm8tcmVwZWF0JztcbiAgICB0cnkge1xuICAgICAgaWYgKHZpcnR1YWxJbWFnZS53aWR0aCA8IG1lZGlhQ2FudmFzLndpZHRoIHx8IHZpcnR1YWxJbWFnZS5oZWlnaHQgPCBtZWRpYUNhbnZhcy5oZWlnaHQpIHtcbiAgICAgICAgcmVwZWF0UGF0dGVybiA9ICdyZXBlYXQnO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgfVxuXG4gICAgY29uc3Qgb25SZXN1bHRzID0gKHJlc3VsdHM6IGFueSkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICF0aGlzLnBhdXNlU2VnbWVudGF0aW9uICYmXG4gICAgICAgICAgbWVkaWFDYW52YXMgJiZcbiAgICAgICAgICBtZWRpYUNhbnZhcy53aWR0aCA+IDAgJiZcbiAgICAgICAgICBtZWRpYUNhbnZhcy5oZWlnaHQgPiAwICYmXG4gICAgICAgICAgdmlydHVhbEltYWdlLndpZHRoID4gMCAmJlxuICAgICAgICAgIHZpcnR1YWxJbWFnZS5oZWlnaHQgPiAwXG4gICAgICAgICkge1xuICAgICAgICAgIGN0eCEuY2xlYXJSZWN0KDAsIDAsIG1lZGlhQ2FudmFzLndpZHRoLCBtZWRpYUNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgIGN0eCEuZHJhd0ltYWdlKHJlc3VsdHMuc2VnbWVudGF0aW9uTWFzaywgMCwgMCwgbWVkaWFDYW52YXMud2lkdGgsIG1lZGlhQ2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgICBjdHghLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3V0JztcbiAgICAgICAgICBjb25zdCBwYXQgPSBjdHghLmNyZWF0ZVBhdHRlcm4odmlydHVhbEltYWdlLCByZXBlYXRQYXR0ZXJuKTtcbiAgICAgICAgICBjdHghLmZpbGxTdHlsZSA9IHBhdCE7XG4gICAgICAgICAgY3R4IS5maWxsUmVjdCgwLCAwLCBtZWRpYUNhbnZhcy53aWR0aCwgbWVkaWFDYW52YXMuaGVpZ2h0KTtcblxuICAgICAgICAgIGN0eCEuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLWF0b3AnO1xuICAgICAgICAgIGN0eCEuZHJhd0ltYWdlKHJlc3VsdHMuaW1hZ2UsIDAsIDAsIG1lZGlhQ2FudmFzLndpZHRoLCBtZWRpYUNhbnZhcy5oZWlnaHQpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgcHJvY2Vzc2luZyByZXN1bHRzOicsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKCF0aGlzLnNlbGZpZVNlZ21lbnRhdGlvbikge1xuICAgICAgYXdhaXQgdGhpcy5wcmVsb2FkTW9kZWwoKS5jYXRjaCgoKSA9PiBjb25zb2xlLmxvZygnRXJyb3IgcHJlbG9hZGluZyBtb2RlbDonKSk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuc2VsZmllU2VnbWVudGF0aW9uIS5vblJlc3VsdHMob25SZXN1bHRzKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIHNhdmVCYWNrZ3JvdW5kID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICh0aGlzLmF1ZGlvT25seVJvb20pIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdZb3UgY2Fubm90IHVzZSBhIGJhY2tncm91bmQgaW4gYW4gYXVkaW8tb25seSBldmVudC4nLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmJhY2tncm91bmRIYXNDaGFuZ2VkKSB7XG4gICAgICBpZiAodGhpcy52aWRlb0FscmVhZHlPbikge1xuICAgICAgICBpZiAodGhpcy5pc2xldmVsID09ICcyJyAmJiAodGhpcy5yZWNvcmRTdGFydGVkIHx8IHRoaXMucmVjb3JkUmVzdW1lZCkpIHtcbiAgICAgICAgICBpZiAoISh0aGlzLnJlY29yZFBhdXNlZCB8fCB0aGlzLnJlY29yZFN0b3BwZWQpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZWNvcmRpbmdNZWRpYU9wdGlvbnMgPT0gJ3ZpZGVvJykge1xuICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdQbGVhc2UgcGF1c2UgdGhlIHJlY29yZGluZyBiZWZvcmUgY2hhbmdpbmcgdGhlIGJhY2tncm91bmQuJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5rZWVwQmFja2dyb3VuZCAmJiB0aGlzLnNlbGVjdGVkSW1hZ2UgJiYgdGhpcy5wcm9jZXNzZWRTdHJlYW0pIHtcbiAgICAgICAgICB0aGlzLnZpcnR1YWxTdHJlYW0gPSB0aGlzLnByb2Nlc3NlZFN0cmVhbTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVZpcnR1YWxTdHJlYW0odGhpcy52aXJ0dWFsU3RyZWFtKTtcbiAgICAgICAgICB0aGlzLnZpZGVvUGFyYW1zID0geyB0cmFjazogdGhpcy52aXJ0dWFsU3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF0gfTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVZpZGVvUGFyYW1zKHRoaXMudmlkZW9QYXJhbXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLmxvY2FsU3RyZWFtVmlkZW8/LmdldFZpZGVvVHJhY2tzKClbMF0ucmVhZHlTdGF0ZSA9PSAnbGl2ZScpIHtcbiAgICAgICAgICAgIHRoaXMudmlkZW9QYXJhbXMgPSB7IHRyYWNrOiB0aGlzLmxvY2FsU3RyZWFtVmlkZW8uZ2V0VmlkZW9UcmFja3MoKVswXSB9O1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWaWRlb1BhcmFtcyh0aGlzLnZpZGVvUGFyYW1zKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMubG9jYWxTdHJlYW1WaWRlbz8uZ2V0VmlkZW9UcmFja3MoKVswXS5yZWFkeVN0YXRlICE9PSAnbGl2ZScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsU3RyZWFtVmlkZW8/LnJlbW92ZVRyYWNrKHRoaXMubG9jYWxTdHJlYW1WaWRlby5nZXRWaWRlb1RyYWNrcygpWzBdKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsU3RyZWFtVmlkZW8/LmFkZFRyYWNrKHRoaXMuc2VnbWVudFZpZGVvIS5nZXRWaWRlb1RyYWNrcygpWzBdLmNsb25lKCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgaGFuZGxpbmcgbG9jYWwgc3RyZWFtIHZpZGVvOicsIGVycm9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy52aWRlb1BhcmFtcyA9IHsgdHJhY2s6IHRoaXMuc2VnbWVudFZpZGVvIS5nZXRWaWRlb1RyYWNrcygpWzBdIH07XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZGVvUGFyYW1zKHRoaXMudmlkZW9QYXJhbXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmtlZXBCYWNrZ3JvdW5kKSB7XG4gICAgICAgICAgdGhpcy5hcHBsaWVkQmFja2dyb3VuZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy51cGRhdGVBcHBsaWVkQmFja2dyb3VuZCh0aGlzLmFwcGxpZWRCYWNrZ3JvdW5kKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmFwcGxpZWRCYWNrZ3JvdW5kID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy51cGRhdGVBcHBsaWVkQmFja2dyb3VuZCh0aGlzLmFwcGxpZWRCYWNrZ3JvdW5kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5wYXJhbWV0ZXJzLnRyYW5zcG9ydENyZWF0ZWQpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVNlbmRUcmFuc3BvcnQoe1xuICAgICAgICAgICAgb3B0aW9uOiAndmlkZW8nLFxuICAgICAgICAgICAgcGFyYW1ldGVyczogeyAuLi50aGlzLnBhcmFtZXRlcnMsIHZpZGVvUGFyYW1zOiB0aGlzLnZpZGVvUGFyYW1zIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnZpZGVvUHJvZHVjZXI/LmlkICYmXG4gICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy52aWRlb1Byb2R1Y2VyLnRyYWNrPy5pZCAhPT0gdGhpcy52aWRlb1BhcmFtcz8udHJhY2s/LmlkXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5kaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvKHsgcGFyYW1ldGVyczogdGhpcy5wYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLnNsZWVwKHsgbXM6IDUwMCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyh7XG4gICAgICAgICAgICAgIHZpZGVvUGFyYW1zOiB0aGlzLnZpZGVvUGFyYW1zLFxuICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB0aGlzLnBhcmFtZXRlcnMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLm9uU2NyZWVuQ2hhbmdlcyh7IGNoYW5nZWQ6IHRydWUsIHBhcmFtZXRlcnM6IHRoaXMucGFyYW1ldGVycyB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5rZWVwQmFja2dyb3VuZCkge1xuICAgICAgdGhpcy5hcHBsaWVkQmFja2dyb3VuZCA9IHRydWU7XG4gICAgICB0aGlzLnVwZGF0ZUFwcGxpZWRCYWNrZ3JvdW5kKHRoaXMuYXBwbGllZEJhY2tncm91bmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFwcGxpZWRCYWNrZ3JvdW5kID0gZmFsc2U7XG4gICAgICB0aGlzLnVwZGF0ZUFwcGxpZWRCYWNrZ3JvdW5kKHRoaXMuYXBwbGllZEJhY2tncm91bmQpO1xuICAgIH1cblxuICAgIHRoaXMuc2F2ZUJhY2tncm91bmRCdXR0b25SZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgICB0aGlzLnNhdmVCYWNrZ3JvdW5kQnV0dG9uUmVmLm5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xuICB9O1xuXG4gIGhhbmRsZU1vZGFsQ2xvc2UgPSAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIElmIG5vIGJhY2tncm91bmQgaXMgYXBwbGllZCBvciB0aGUgYXBwbGllZCBiYWNrZ3JvdW5kIHNob3VsZCBub3QgYmUga2VwdFxuICAgICAgaWYgKFxuICAgICAgICAhdGhpcy5hcHBsaWVkQmFja2dyb3VuZCB8fFxuICAgICAgICAodGhpcy5hcHBsaWVkQmFja2dyb3VuZCAmJiAhdGhpcy5rZWVwQmFja2dyb3VuZCkgfHxcbiAgICAgICAgKHRoaXMuYXBwbGllZEJhY2tncm91bmQgJiYgIXRoaXMudmlkZW9BbHJlYWR5T24pXG4gICAgICApIHtcbiAgICAgICAgY29uc29sZS5sb2coJ05vIGJhY2tncm91bmQgYXBwbGllZCBvciBhcHBsaWVkIGJhY2tncm91bmQgc2hvdWxkIG5vdCBiZSBrZXB0Jyk7XG4gICAgICAgIGNvbnN0IHJlZlZpZGVvID0gdGhpcy5jYXB0dXJlVmlkZW9SZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5wYXVzZVNlZ21lbnRhdGlvbiA9IHRydWU7XG4gICAgICAgIHRoaXMudXBkYXRlUGF1c2VTZWdtZW50YXRpb24odGhpcy5wYXVzZVNlZ21lbnRhdGlvbik7XG5cbiAgICAgICAgaWYgKCF0aGlzLnZpZGVvQWxyZWFkeU9uKSB7XG4gICAgICAgICAgLy8gU3RvcCB2aWRlbyB0cmFja3MgYW5kIGNsZWFyIHRoZSB2aWRlbyBlbGVtZW50J3Mgc3JjT2JqZWN0XG4gICAgICAgICAgaWYgKHJlZlZpZGVvICYmIHJlZlZpZGVvLnNyY09iamVjdCkge1xuICAgICAgICAgICAgcmVmVmlkZW8uc3JjT2JqZWN0LmdldFRyYWNrcygpLmZvckVhY2goKHRyYWNrOiBhbnkpID0+IHRyYWNrLnN0b3AoKSk7XG4gICAgICAgICAgICByZWZWaWRlby5zcmNPYmplY3QgPSBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFN0b3Agc2VnbWVudFZpZGVvIHRyYWNrc1xuICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRWaWRlbykge1xuICAgICAgICAgICAgdGhpcy5zZWdtZW50VmlkZW8uZ2V0VHJhY2tzKCkuZm9yRWFjaCgodHJhY2s6IGFueSkgPT4gdHJhY2suc3RvcCgpKTtcbiAgICAgICAgICAgIHRoaXMuc2VnbWVudFZpZGVvID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2VnbWVudFZpZGVvKHRoaXMuc2VnbWVudFZpZGVvKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBTdG9wIHZpcnR1YWxTdHJlYW0gdHJhY2tzXG4gICAgICAgICAgaWYgKHRoaXMudmlydHVhbFN0cmVhbSkge1xuICAgICAgICAgICAgdGhpcy52aXJ0dWFsU3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goKHRyYWNrOiBhbnkpID0+IHRyYWNrLnN0b3AoKSk7XG4gICAgICAgICAgICB0aGlzLnZpcnR1YWxTdHJlYW0gPSBudWxsO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWaXJ0dWFsU3RyZWFtKHRoaXMudmlydHVhbFN0cmVhbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEhpZGUgdGhlIHZpZGVvIHByZXZpZXcgYW5kIHNob3cgdGhlIGNhbnZhc1xuICAgICAgdGhpcy52aWRlb1ByZXZpZXdSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgICAgIHRoaXMuYmFja2dyb3VuZENhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuXG4gICAgICAvLyBIaWRlIHRoZSBtb2RhbFxuICAgICAgLy8gdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcbiAgICAgIHRoaXMub25DbG9zZSgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgZHVyaW5nIG1vZGFsIGNsb3NlOicsIGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgc2hvd0xvYWRpbmcoKSB7XG4gICAgdGhpcy5sb2FkaW5nT3ZlcmxheVJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICB9XG5cbiAgaGlkZUxvYWRpbmcoKSB7XG4gICAgdGhpcy5sb2FkaW5nT3ZlcmxheVJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICB9XG59XG4iLCI8ZGl2IFtuZ1N0eWxlXT1cInsgcG9zaXRpb246ICdmaXhlZCcsIHRvcDogMCwgbGVmdDogMCwgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJScsIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC41KScsIGRpc3BsYXk6IGlzVmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZScsIHpJbmRleDogOTk5IH1cIj5cclxuICAgIDxkaXYgW25nU3R5bGVdPVwieyBwb3NpdGlvbjogJ2ZpeGVkJywgYmFja2dyb3VuZENvbG9yOiBiYWNrZ3JvdW5kQ29sb3IsIGJvcmRlclJhZGl1czogJzEwcHgnLCBwYWRkaW5nOiAnMTBweCcsIHdpZHRoOiAnODAlJywgbWF4V2lkdGg6ICc1MDBweCcsIG1heEhlaWdodDogJzc1JScsIG92ZXJmbG93WTogJ2F1dG8nLCBvdmVyZmxvd1g6ICdoaWRkZW4nLCB0b3A6IHBvc2l0aW9uLmluY2x1ZGVzKCd0b3AnKSA/ICcxMHB4JyA6ICdhdXRvJywgYm90dG9tOiBwb3NpdGlvbi5pbmNsdWRlcygnYm90dG9tJykgPyAnMTBweCcgOiAnYXV0bycsIGxlZnQ6IHBvc2l0aW9uLmluY2x1ZGVzKCdMZWZ0JykgPyAnMTBweCcgOiAnYXV0bycsIHJpZ2h0OiBwb3NpdGlvbi5pbmNsdWRlcygnUmlnaHQnKSA/ICcxMHB4JyA6ICdhdXRvJyB9XCI+XHJcbiAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IGFsaWduLWl0ZW1zOiBjZW50ZXI7IG1hcmdpbi1ib3R0b206IDE1cHg7XCI+XHJcbiAgICAgICAgPGgyIHN0eWxlPVwiZm9udC1zaXplOiB4LWxhcmdlOyBmb250LXdlaWdodDogYm9sZDsgY29sb3I6IGJsYWNrO1wiPkJhY2tncm91bmQgU2V0dGluZ3M8L2gyPlxyXG4gICAgICAgIDxidXR0b24gKGNsaWNrKT1cIm9uQ2xvc2UoKVwiIHN0eWxlPVwiYm9yZGVyOiBub25lOyBiYWNrZ3JvdW5kOiBub25lOyBjdXJzb3I6IHBvaW50ZXI7XCI+XHJcbiAgICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVRpbWVzXCIgc2l6ZT1cInhsXCIgc3R5bGU9XCJmb250LXNpemU6IDIwcHg7IGNvbG9yOiBibGFjaztcIj48L2ZhLWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8aHIgc3R5bGU9XCJoZWlnaHQ6IDFweDsgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7IG1hcmdpbi10b3A6IDVweDsgbWFyZ2luLWJvdHRvbTogNXB4O1wiIC8+XHJcbiAgICAgIDxkaXYgc3R5bGU9XCJtYXgtd2lkdGg6IDk1JTsgb3ZlcmZsb3cteDogYXV0bztcIj5cclxuICAgICAgICA8ZGl2IGlkPVwiZGVmYXVsdEltYWdlc1wiICNkZWZhdWx0SW1hZ2VzQ29udGFpbmVyPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJtYXgtd2lkdGg6IDcwJTsgb3ZlcmZsb3cteDogYXV0bztcIj5cclxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ1cGxvYWRJbWFnZVwiPlVwbG9hZCBDdXN0b20gSW1hZ2U8L2xhYmVsPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cInVwbG9hZEltYWdlXCIgI3VwbG9hZEltYWdlSW5wdXQgKGNoYW5nZSk9XCJoYW5kbGVJbWFnZVVwbG9hZCgkZXZlbnQpXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8Y2FudmFzIGlkPVwibWFpbkNhbnZhc1wiICNtYWluQ2FudmFzIGNsYXNzPVwiZC1ub25lXCI+PC9jYW52YXM+XHJcbiAgICAgICAgPGNhbnZhcyBpZD1cImJhY2tncm91bmRDYW52YXNcIiAjYmFja2dyb3VuZENhbnZhcyBjbGFzcz1cImQtbm9uZVwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IG1heC13aWR0aDogNDAwcHg7IGhlaWdodDogYXV0bzsgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7IGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1wiPjwvY2FudmFzPlxyXG4gICAgICAgIDx2aWRlbyBpZD1cImNhcHR1cmVWaWRlb1wiICNjYXB0dXJlVmlkZW8gY2xhc3M9XCJkLW5vbmVcIiBtdXRlZCBhdXRvcGxheSBwbGF5c2lubGluZT48L3ZpZGVvPlxyXG4gICAgICAgIDx2aWRlbyBpZD1cInByZXZpZXdWaWRlb1wiICN2aWRlb1ByZXZpZXcgY2xhc3M9XCJkLW5vbmVcIiBtdXRlZCBhdXRvcGxheSBwbGF5c2lubGluZSBzdHlsZT1cIndpZHRoOiAxMDAlOyBtYXgtd2lkdGg6IDQwMHB4OyBoZWlnaHQ6IGF1dG87IGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcIj48L3ZpZGVvPlxyXG4gICAgICAgIDxkaXYgaWQ9XCJsb2FkaW5nT3ZlcmxheVwiICNsb2FkaW5nT3ZlcmxheSBjbGFzcz1cImQtbm9uZVwiIFtuZ1N0eWxlXT1cInsgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogMCwgbGVmdDogMCwgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJScsIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC41KScsIGRpc3BsYXk6ICdmbGV4JywgJ2p1c3RpZnktY29udGVudCc6ICdjZW50ZXInLCAnYWxpZ24taXRlbXMnOiAnY2VudGVyJywgekluZGV4OiAxMDAwIH1cIj5cclxuICAgICAgICAgIDxkaXYgW25nU3R5bGVdPVwieyB3aWR0aDogJzUwcHgnLCBoZWlnaHQ6ICc1MHB4JywgYm9yZGVyOiAnNXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKScsIGJvcmRlclJhZGl1czogJzUwJScsIGJvcmRlclRvcDogJzVweCBzb2xpZCB3aGl0ZScsIGFuaW1hdGlvbjogJ3NwaW4gMXMgbGluZWFyIGluZmluaXRlJyB9XCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cImFwcGx5QmFja2dyb3VuZEJ1dHRvblwiICNhcHBseUJhY2tncm91bmRCdXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiAoY2xpY2spPVwiYXBwbHlCYWNrZ3JvdW5kKClcIj5QcmV2aWV3IEJhY2tncm91bmQ8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIGlkPVwic2F2ZUJhY2tncm91bmRCdXR0b25cIiAjc2F2ZUJhY2tncm91bmRCdXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgZC1ub25lXCIgKGNsaWNrKT1cInNhdmVCYWNrZ3JvdW5kKClcIj5TYXZlIEJhY2tncm91bmQ8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuIl19