/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, Input, ViewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
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
export class ScreenboardModal {
    parameters = {};
    isVisible = false;
    onClose;
    position = 'topRight';
    backgroundColor = '#83c0e9';
    screenVideoRef;
    screenCanvasRef;
    faTimes = faTimes;
    annotationInterval;
    annotationCheckInterval;
    clonedStreamScreen = null;
    ctx = null;
    ngOnInit() {
        // Initialization logic that does not depend on the view
    }
    ngOnDestroy() {
        this.stopAnnotation();
    }
    ngOnChanges(changes) {
        if (changes['isVisible']) {
            this.isVisible = changes['isVisible'].currentValue;
            if (this.isVisible) {
                // In case isVisible changes after view init
                if (this.screenCanvasRef && this.screenVideoRef) {
                    this.showModal();
                }
                else {
                    setTimeout(() => {
                        if (this.screenCanvasRef && this.screenVideoRef) {
                            this.showModal();
                        }
                    }, 100);
                }
            }
            else {
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
            const { annotateScreenStream, shared, createSendTransport, prepopulateUserMedia, hostLabel } = this.parameters;
            const annotate = annotateScreenStream;
            const screenVideo = this.screenVideoRef.nativeElement;
            if (annotate && shared) {
                screenVideo.classList.remove('d-none');
                await this.annotatationPreview();
                setTimeout(async () => {
                    if (!this.parameters.transportCreated) {
                        await createSendTransport({ option: 'screen', parameters: this.parameters });
                    }
                    else {
                        try {
                            await this.handleScreenTransport();
                            await this.parameters.sleep({ ms: 250 });
                        }
                        catch {
                            /* handle error */
                        }
                    }
                    await this.parameters.connectSendTransportScreen({
                        stream: this.parameters.processedScreenStream,
                        parameters: this.parameters,
                    });
                    await prepopulateUserMedia({ name: hostLabel, parameters: this.parameters });
                }, 100);
            }
            else {
                screenVideo.classList.add('d-none');
            }
        }
        catch {
            /* handle error */
        }
    };
    hideModal = async () => {
        this.parameters = this.parameters.getUpdatedAllParams();
        const { annotateScreenStream, shared, createSendTransport, disconnectSendTransportScreen, stopShareScreen, prepopulateUserMedia, hostLabel, } = this.parameters;
        const annotate = annotateScreenStream;
        const screenVideo = this.screenVideoRef && this.screenVideoRef.nativeElement;
        try {
            if (!annotate) {
                try {
                    await this.stopAnnotation();
                }
                catch {
                    /* handle error */
                }
                if (shared) {
                    if (!this.parameters.transportCreated) {
                        await createSendTransport({ option: 'screen', parameters: this.parameters });
                    }
                    else {
                        try {
                            await disconnectSendTransportScreen({ parameters: this.parameters });
                            await this.parameters.sleep({ ms: 500 });
                        }
                        catch {
                            /* handle error */
                        }
                        if (this.parameters.localStreamScreen &&
                            this.parameters.localStreamScreen.getVideoTracks().length > 0 &&
                            this.parameters.localStreamScreen.getVideoTracks()[0].readyState === 'ended') {
                            this.parameters.localStreamScreen.removeTrack(this.parameters.localStreamScreen.getVideoTracks()[0]);
                            if (this.clonedStreamScreen) {
                                this.parameters.localStreamScreen.addTrack(this.clonedStreamScreen.getVideoTracks()[0].clone());
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
                }
                else {
                    await this.stopAllTracks();
                }
                await prepopulateUserMedia({ name: hostLabel, parameters: this.parameters });
            }
            screenVideo && screenVideo.classList.add('d-none');
            if (this.parameters.mainScreenCanvas && this.screenCanvasRef) {
                this.screenCanvasRef.nativeElement.classList.add('d-none');
            }
            this.onClose();
        }
        catch {
            /* handle error */
        }
    };
    annotatationPreview = async () => {
        const screenVideo = this.screenVideoRef.nativeElement;
        if (!this.parameters.mainScreenCanvas) {
            this.parameters.mainScreenCanvas = this.screenCanvasRef.nativeElement;
            this.parameters.updateMainScreenCanvas(this.parameters.mainScreenCanvas);
        }
        const annotate = this.parameters.annotateScreenStream;
        if (annotate &&
            (!this.clonedStreamScreen ||
                (this.clonedStreamScreen &&
                    this.clonedStreamScreen.getVideoTracks().length > 0 &&
                    this.clonedStreamScreen.getVideoTracks()[0].readyState === 'ended'))) {
            const originalTrack = this.parameters.localStreamScreen.getVideoTracks()[0];
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
        if (this.clonedStreamScreen &&
            this.parameters.localStreamScreen &&
            this.parameters.localStreamScreen.getVideoTracks().length > 0 &&
            this.parameters.localStreamScreen.getVideoTracks()[0].readyState === 'ended') {
            this.parameters.localStreamScreen.removeTrack(this.parameters.localStreamScreen.getVideoTracks()[0]);
            this.parameters.localStreamScreen.addTrack(this.clonedStreamScreen.getVideoTracks()[0].clone());
        }
        if (this.clonedStreamScreen) {
            this.clonedStreamScreen.getVideoTracks()[0].onended = async () => {
                await this.parameters.disconnectSendTransportScreen({ parameters: this.parameters });
                await this.parameters.stopShareScreen({ parameters: this.parameters });
            };
        }
        const mediaCanvas = this.parameters.mainScreenCanvas;
        const ctx = mediaCanvas.getContext('2d');
        mediaCanvas.width = this.parameters.localStreamScreen.getVideoTracks()[0].getSettings().width;
        mediaCanvas.height = this.parameters
            .localStreamScreen.getVideoTracks()[0]
            .getSettings().height;
        if (!annotate) {
            this.parameters.processedScreenStream = null;
            this.parameters.updateProcessedScreenStream(null);
        }
        const captureStream = () => {
            const stream = mediaCanvas.captureStream(30);
            this.annotationCheckInterval = setInterval(() => {
                const params = this.parameters.getUpdatedAllParams();
                canvasElement = params.canvasScreenboard;
                const height = canvasElement.height;
                const width = canvasElement.width;
                const refHeight = params.localStreamScreen.getVideoTracks()[0].getSettings().height;
                const refWidth = params.localStreamScreen.getVideoTracks()[0].getSettings().width;
                if (height !== refHeight || width !== refWidth) {
                    canvasElement.width = refWidth;
                    canvasElement.height = refHeight;
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
        canvasElement.width = mediaCanvas.width;
        canvasElement.height = mediaCanvas.height;
        const drawCombined = () => {
            ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            ctx.drawImage(screenVideo, 0, 0, canvasElement.width, canvasElement.height);
            ctx.drawImage(canvasElement, 0, 0, canvasElement.width, canvasElement.height);
            ctx.restore();
        };
    };
    handleScreenTransport = async () => {
        if (this.parameters.localStreamScreen.getVideoTracks().length > 0 &&
            this.parameters.localStreamScreen.getVideoTracks()[0].id ===
                this.parameters.screenProducer?.track.id) {
            if (this.clonedStreamScreen &&
                this.clonedStreamScreen.getVideoTracks().length > 0 &&
                this.clonedStreamScreen.getVideoTracks()[0].readyState === 'ended') {
                this.clonedStreamScreen.removeTrack(this.clonedStreamScreen.getVideoTracks()[0]);
                this.clonedStreamScreen.addTrack(this.parameters.localStreamScreen.getVideoTracks()[0].clone());
            }
            this.parameters.localStreamScreen.removeTrack(this.parameters.localStreamScreen.getVideoTracks()[0]);
            this.parameters.localStreamScreen.addTrack(this.clonedStreamScreen.getVideoTracks()[0].clone());
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
                .forEach((track) => track.stop());
            this.parameters.processedScreenStream = null;
            this.parameters.updateProcessedScreenStream(null);
        }
        if (this.parameters.mainScreenCanvas) {
            this.parameters.mainScreenCanvas
                ?.getContext('2d')
                .clearRect(0, 0, this.parameters.mainScreenCanvas.width, this.parameters.mainScreenCanvas.height);
        }
    };
    stopAllTracks = async () => {
        try {
            if (this.parameters.localStreamScreen &&
                this.parameters.localStreamScreen.getVideoTracks().length > 0) {
                this.parameters.localStreamScreen
                    .getVideoTracks()
                    .forEach((track) => track.stop());
                this.parameters.updateLocalStreamScreen(null);
            }
            else {
                this.parameters.updateLocalStreamScreen(null);
            }
        }
        catch {
            /* handle error */
        }
        try {
            if (this.clonedStreamScreen && this.clonedStreamScreen.getVideoTracks().length > 0) {
                this.clonedStreamScreen.getVideoTracks().forEach((track) => track.stop());
            }
        }
        catch {
            /* handle error */
        }
        try {
            if (this.parameters.processedScreenStream) {
                this.parameters.processedScreenStream
                    .getTracks()
                    .forEach((track) => track.stop());
                this.parameters.updateProcessedScreenStream(null);
            }
        }
        catch {
            /* handle error */
        }
        this.clonedStreamScreen = null;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ScreenboardModal, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: ScreenboardModal, isStandalone: true, selector: "app-screenboard-modal", inputs: { parameters: "parameters", isVisible: "isVisible", onClose: "onClose", position: "position", backgroundColor: "backgroundColor" }, viewQueries: [{ propertyName: "screenVideoRef", first: true, predicate: ["screenVideo"], descendants: true }, { propertyName: "screenCanvasRef", first: true, predicate: ["screenCanvas"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div *ngIf=\"isVisible\" class=\"modal-container\">\r\n  <div class=\"modal-content\">\r\n    <div class=\"modal-header\">\r\n      <div class=\"modal-title\">Screen Annotation</div>\r\n      <div class=\"modal-close\" (click)=\"hideModal()\">\r\n        <fa-icon [icon]=\"faTimes\"></fa-icon>\r\n      </div>\r\n    </div>\r\n    <hr />\r\n    <div class=\"modal-body\">\r\n      <video #screenVideo id=\"screenVideo\" class=\"d-none\" autoplay></video>\r\n      <canvas #screenCanvas id=\"screenCanvas\"></canvas>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".modal-container{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;display:block;z-index:999}.modal-content{position:fixed;background-color:#83c0e9;border-radius:10px;padding:10px;width:80%;max-width:500px;max-height:75%;overflow-y:auto;overflow-x:hidden;top:10px;right:10px}.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px}.modal-title{font-size:18px;font-weight:700;color:#000}.modal-close{padding:5px}.modal-body{flex:1}#screenCanvas{width:100%;height:auto}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i2.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ScreenboardModal, decorators: [{
            type: Component,
            args: [{ selector: 'app-screenboard-modal', standalone: true, imports: [CommonModule, FormsModule, FontAwesomeModule], template: "<div *ngIf=\"isVisible\" class=\"modal-container\">\r\n  <div class=\"modal-content\">\r\n    <div class=\"modal-header\">\r\n      <div class=\"modal-title\">Screen Annotation</div>\r\n      <div class=\"modal-close\" (click)=\"hideModal()\">\r\n        <fa-icon [icon]=\"faTimes\"></fa-icon>\r\n      </div>\r\n    </div>\r\n    <hr />\r\n    <div class=\"modal-body\">\r\n      <video #screenVideo id=\"screenVideo\" class=\"d-none\" autoplay></video>\r\n      <canvas #screenCanvas id=\"screenCanvas\"></canvas>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".modal-container{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;display:block;z-index:999}.modal-content{position:fixed;background-color:#83c0e9;border-radius:10px;padding:10px;width:80%;max-width:500px;max-height:75%;overflow-y:auto;overflow-x:hidden;top:10px;right:10px}.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px}.modal-title{font-size:18px;font-weight:700;color:#000}.modal-close{padding:5px}.modal-body{flex:1}#screenCanvas{width:100%;height:auto}\n"] }]
        }], propDecorators: { parameters: [{
                type: Input
            }], isVisible: [{
                type: Input
            }], onClose: [{
                type: Input
            }], position: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], screenVideoRef: [{
                type: ViewChild,
                args: ['screenVideo']
            }], screenCanvasRef: [{
                type: ViewChild,
                args: ['screenCanvas']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyZWVuYm9hcmQtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvc2NyZWVuYm9hcmQtY29tcG9uZW50cy9zY3JlZW5ib2FyZC1tb2RhbC9zY3JlZW5ib2FyZC1tb2RhbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9zY3JlZW5ib2FyZC1jb21wb25lbnRzL3NjcmVlbmJvYXJkLW1vZGFsL3NjcmVlbmJvYXJkLW1vZGFsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDZEQUE2RDtBQUM3RCxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFHTCxTQUFTLEdBS1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7QUEwRDVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkNHO0FBUUgsTUFBTSxPQUFPLGdCQUFnQjtJQUNsQixVQUFVLEdBQStCLEVBQWdDLENBQUM7SUFDMUUsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUNsQixPQUFPLENBQWM7SUFDckIsUUFBUSxHQUFHLFVBQVUsQ0FBQztJQUN0QixlQUFlLEdBQUcsU0FBUyxDQUFDO0lBRVgsY0FBYyxDQUFnQztJQUM3QyxlQUFlLENBQWlDO0lBRTNFLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFFVixrQkFBa0IsQ0FBTTtJQUN4Qix1QkFBdUIsQ0FBTTtJQUM3QixrQkFBa0IsR0FBdUIsSUFBSSxDQUFDO0lBQzlDLEdBQUcsR0FBb0MsSUFBSSxDQUFDO0lBRXBELFFBQVE7UUFDTix3REFBd0Q7SUFDMUQsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksQ0FBQztZQUNuRCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDbkIsNENBQTRDO2dCQUM1QyxJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNoRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ25CLENBQUM7cUJBQU0sQ0FBQztvQkFDTixVQUFVLENBQUMsR0FBRyxFQUFFO3dCQUNkLElBQUksSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7NEJBQ2hELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzt3QkFDbkIsQ0FBQztvQkFDSCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ1YsQ0FBQztZQUNILENBQUM7aUJBQU0sQ0FBQztnQkFDTixJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNoRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ25CLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxlQUFlO1FBQ2IsNENBQTRDO0lBQzlDLENBQUM7SUFFRCxTQUFTLEdBQUcsS0FBSyxJQUFJLEVBQUU7UUFDckIsSUFBSSxDQUFDO1lBQ0gsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDeEQsTUFBTSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsR0FDMUYsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNsQixNQUFNLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQztZQUN0QyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBZSxDQUFDLGFBQWEsQ0FBQztZQUV2RCxJQUFJLFFBQVEsSUFBSSxNQUFNLEVBQUUsQ0FBQztnQkFDdkIsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3ZDLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQ2pDLFVBQVUsQ0FBQyxLQUFLLElBQUksRUFBRTtvQkFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzt3QkFDdEMsTUFBTSxtQkFBbUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO29CQUMvRSxDQUFDO3lCQUFNLENBQUM7d0JBQ04sSUFBSSxDQUFDOzRCQUNILE1BQU0sSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7NEJBQ25DLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQzt3QkFDM0MsQ0FBQzt3QkFBQyxNQUFNLENBQUM7NEJBQ1Asa0JBQWtCO3dCQUNwQixDQUFDO29CQUNILENBQUM7b0JBQ0QsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLDBCQUEwQixDQUFDO3dCQUMvQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUI7d0JBQzdDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtxQkFDNUIsQ0FBQyxDQUFDO29CQUNILE1BQU0sb0JBQXFCLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDaEYsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ1YsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RDLENBQUM7UUFDSCxDQUFDO1FBQUMsTUFBTSxDQUFDO1lBQ1Asa0JBQWtCO1FBQ3BCLENBQUM7SUFDSCxDQUFDLENBQUM7SUFFRixTQUFTLEdBQUcsS0FBSyxJQUFJLEVBQUU7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDeEQsTUFBTSxFQUNKLG9CQUFvQixFQUNwQixNQUFNLEVBQ04sbUJBQW1CLEVBQ25CLDZCQUE2QixFQUM3QixlQUFlLEVBQ2Ysb0JBQW9CLEVBQ3BCLFNBQVMsR0FDVixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDcEIsTUFBTSxRQUFRLEdBQUcsb0JBQW9CLENBQUM7UUFDdEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBZSxDQUFDLGFBQWEsQ0FBQztRQUU5RSxJQUFJLENBQUM7WUFDSCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2QsSUFBSSxDQUFDO29CQUNILE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUM5QixDQUFDO2dCQUFDLE1BQU0sQ0FBQztvQkFDUCxrQkFBa0I7Z0JBQ3BCLENBQUM7Z0JBQ0QsSUFBSSxNQUFNLEVBQUUsQ0FBQztvQkFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO3dCQUN0QyxNQUFNLG1CQUFtQixDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7b0JBQy9FLENBQUM7eUJBQU0sQ0FBQzt3QkFDTixJQUFJLENBQUM7NEJBQ0gsTUFBTSw2QkFBNkIsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQzs0QkFDckUsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO3dCQUMzQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQzs0QkFDUCxrQkFBa0I7d0JBQ3BCLENBQUM7d0JBQ0QsSUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQjs0QkFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQzs0QkFDN0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEtBQUssT0FBTyxFQUM1RSxDQUFDOzRCQUNELElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUN0RCxDQUFDOzRCQUNGLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0NBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUN4QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQ3BELENBQUM7NEJBQ0osQ0FBQzs0QkFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQzt3QkFDN0UsQ0FBQzt3QkFDRCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDOzRCQUM1QixJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssSUFBSSxFQUFFO2dDQUMvRCxNQUFNLDZCQUE2QixDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO2dDQUNyRSxNQUFNLGVBQWUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQzs0QkFDekQsQ0FBQyxDQUFDO3dCQUNKLENBQUM7d0JBQ0QsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLDBCQUEwQixDQUFDOzRCQUMvQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUI7NEJBQ3pDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTt5QkFDNUIsQ0FBQyxDQUFDO29CQUNMLENBQUM7Z0JBQ0gsQ0FBQztxQkFBTSxDQUFDO29CQUNOLE1BQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUM3QixDQUFDO2dCQUVELE1BQU0sb0JBQXFCLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUNoRixDQUFDO1lBQ0QsV0FBVyxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25ELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQzdELElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0QsQ0FBQztZQUNELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqQixDQUFDO1FBQUMsTUFBTSxDQUFDO1lBQ1Asa0JBQWtCO1FBQ3BCLENBQUM7SUFDSCxDQUFDLENBQUM7SUFFRixtQkFBbUIsR0FBRyxLQUFLLElBQUksRUFBRTtRQUMvQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBZSxDQUFDLGFBQWEsQ0FBQztRQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUM7WUFDdEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUNELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUM7UUFFdEQsSUFDRSxRQUFRO1lBQ1IsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0I7Z0JBQ3ZCLENBQUMsSUFBSSxDQUFDLGtCQUFrQjtvQkFDdEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDO29CQUNuRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxLQUFLLE9BQU8sQ0FBQyxDQUFDLEVBQ3hFLENBQUM7WUFDRCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdFLE1BQU0sZ0JBQWdCLEdBQUcsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3JELE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNyQyxNQUFNLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDNUIsS0FBSyxFQUFFLGdCQUFnQixDQUFDLEtBQUs7Z0JBQzdCLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNO2dCQUMvQixTQUFTLEVBQUUsZ0JBQWdCLENBQUMsU0FBUztnQkFDckMsV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVc7YUFDMUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBRUQsSUFDRSxJQUFJLENBQUMsa0JBQWtCO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCO1lBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDN0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEtBQUssT0FBTyxFQUM1RSxDQUFDO1lBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQ3RELENBQUM7WUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FDeEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUNwRCxDQUFDO1FBQ0osQ0FBQztRQUVELElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLElBQUksRUFBRTtnQkFDL0QsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLDZCQUE2QixDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO2dCQUNyRixNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQ3pFLENBQUMsQ0FBQztRQUNKLENBQUM7UUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDO1FBQ3JELE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsV0FBVyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQU0sQ0FBQztRQUNoRyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVO2FBQ2pDLGlCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUN0QyxXQUFXLEVBQUUsQ0FBQyxNQUFPLENBQUM7UUFFekIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7WUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBRUQsTUFBTSxhQUFhLEdBQUcsR0FBRyxFQUFFO1lBQ3pCLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLHVCQUF1QixHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7Z0JBQzlDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDckQsYUFBYSxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztnQkFDekMsTUFBTSxNQUFNLEdBQUcsYUFBYyxDQUFDLE1BQU0sQ0FBQztnQkFDckMsTUFBTSxLQUFLLEdBQUcsYUFBYyxDQUFDLEtBQUssQ0FBQztnQkFDbkMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLGlCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU8sQ0FBQztnQkFDdEYsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLGlCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQU0sQ0FBQztnQkFDcEYsSUFBSSxNQUFNLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxRQUFRLEVBQUUsQ0FBQztvQkFDL0MsYUFBYyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7b0JBQ2hDLGFBQWMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO29CQUNsQyxXQUFXLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztvQkFDN0IsV0FBVyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLENBQUM7WUFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDVCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtnQkFDekMsWUFBWSxFQUFFLENBQUM7WUFDakIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ1AsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDO1FBRUYsTUFBTSxhQUFhLEdBQUcsS0FBSyxJQUFJLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsR0FBRyxNQUFNLGFBQWEsRUFBRSxDQUFDO1lBQzlELElBQUksQ0FBQyxVQUFVLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3JGLENBQUMsQ0FBQztRQUVGLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUM5QyxJQUFJLGFBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUM5QixXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLElBQUksQ0FBQztZQUN2RixXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQztZQUN6RixXQUFXLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztZQUN0QyxNQUFNLGFBQWEsRUFBRSxDQUFDO1FBQ3hCLENBQUM7UUFFRCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUMsaUJBQWlCLENBQUM7UUFDNUUsYUFBYyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO1FBQ3pDLGFBQWMsQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUUzQyxNQUFNLFlBQVksR0FBRyxHQUFHLEVBQUU7WUFDeEIsR0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLGFBQWMsQ0FBQyxLQUFLLEVBQUUsYUFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xFLEdBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsYUFBYyxDQUFDLEtBQUssRUFBRSxhQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDL0UsR0FBSSxDQUFDLFNBQVMsQ0FBQyxhQUFjLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxhQUFjLENBQUMsS0FBSyxFQUFFLGFBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsRixHQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakIsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0lBRUYscUJBQXFCLEdBQUcsS0FBSyxJQUFJLEVBQUU7UUFDakMsSUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQzlELElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWtCLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDdkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsS0FBTSxDQUFDLEVBQUUsRUFDM0MsQ0FBQztZQUNELElBQ0UsSUFBSSxDQUFDLGtCQUFrQjtnQkFDdkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxLQUFLLE9BQU8sRUFDbEUsQ0FBQztnQkFDRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRixJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUMvRCxDQUFDO1lBQ0osQ0FBQztZQUNELElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWtCLENBQUMsV0FBVyxDQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUN2RCxDQUFDO1lBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBa0IsQ0FBQyxRQUFRLENBQ3pDLElBQUksQ0FBQyxrQkFBbUIsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FDckQsQ0FBQztRQUNKLENBQUM7UUFDRCxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsNkJBQTZCLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDdkYsQ0FBQyxDQUFDO0lBRUYsY0FBYyxHQUFHLEtBQUssSUFBSSxFQUFFO1FBQzFCLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDNUIsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3ZDLGFBQWEsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1lBQy9CLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUM7UUFDdEMsQ0FBQztRQUVELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCO2lCQUNsQyxTQUFTLEVBQUU7aUJBQ1gsT0FBTyxDQUFDLENBQUMsS0FBdUIsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7WUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0I7Z0JBQzlCLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBRTtpQkFDbEIsU0FBUyxDQUNSLENBQUMsRUFDRCxDQUFDLEVBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUN4QyxDQUFDO1FBQ04sQ0FBQztJQUNILENBQUMsQ0FBQztJQUVGLGFBQWEsR0FBRyxLQUFLLElBQUksRUFBRTtRQUN6QixJQUFJLENBQUM7WUFDSCxJQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCO2dCQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQzdELENBQUM7Z0JBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUI7cUJBQzlCLGNBQWMsRUFBRTtxQkFDaEIsT0FBTyxDQUFDLENBQUMsS0FBdUIsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEQsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEQsQ0FBQztRQUNILENBQUM7UUFBQyxNQUFNLENBQUM7WUFDUCxrQkFBa0I7UUFDcEIsQ0FBQztRQUVELElBQUksQ0FBQztZQUNILElBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ25GLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzVFLENBQUM7UUFDSCxDQUFDO1FBQUMsTUFBTSxDQUFDO1lBQ1Asa0JBQWtCO1FBQ3BCLENBQUM7UUFFRCxJQUFJLENBQUM7WUFDSCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUI7cUJBQ2xDLFNBQVMsRUFBRTtxQkFDWCxPQUFPLENBQUMsQ0FBQyxLQUF1QixFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwRCxDQUFDO1FBQ0gsQ0FBQztRQUFDLE1BQU0sQ0FBQztZQUNQLGtCQUFrQjtRQUNwQixDQUFDO1FBRUQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztJQUNqQyxDQUFDLENBQUM7dUdBdFdTLGdCQUFnQjsyRkFBaEIsZ0JBQWdCLG1jQzVIN0IsNmlCQWVBLGlsQkQyR1ksWUFBWSxrSUFBRSxXQUFXLDhCQUFFLGlCQUFpQjs7MkZBRTNDLGdCQUFnQjtrQkFQNUIsU0FBUzsrQkFDRSx1QkFBdUIsY0FDckIsSUFBSSxXQUdQLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQzs4QkFHOUMsVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBRW9CLGNBQWM7c0JBQXZDLFNBQVM7dUJBQUMsYUFBYTtnQkFDRyxlQUFlO3NCQUF6QyxTQUFTO3VCQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uICovXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIEFmdGVyVmlld0luaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9udEF3ZXNvbWVNb2R1bGUgfSBmcm9tICdAZm9ydGF3ZXNvbWUvYW5ndWxhci1mb250YXdlc29tZSc7XG5pbXBvcnQgeyBmYVRpbWVzIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IFByb2R1Y2VyIH0gZnJvbSAnbWVkaWFzb3VwLWNsaWVudC9saWIvdHlwZXMnO1xuaW1wb3J0IHtcbiAgQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5UeXBlLFxuICBDcmVhdGVTZW5kVHJhbnNwb3J0VHlwZSxcbiAgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5UeXBlLFxuICBQcmVwb3B1bGF0ZVVzZXJNZWRpYVR5cGUsXG4gIFN0b3BTaGFyZVNjcmVlblR5cGUsXG4gIFNsZWVwVHlwZSxcbiAgQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5QYXJhbWV0ZXJzLFxuICBDcmVhdGVTZW5kVHJhbnNwb3J0UGFyYW1ldGVycyxcbiAgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5QYXJhbWV0ZXJzLFxuICBQcmVwb3B1bGF0ZVVzZXJNZWRpYVBhcmFtZXRlcnMsXG4gIFN0b3BTaGFyZVNjcmVlblBhcmFtZXRlcnMsXG59IGZyb20gJy4uLy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2NyZWVuYm9hcmRNb2RhbFBhcmFtZXRlcnNcbiAgZXh0ZW5kcyBDb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblBhcmFtZXRlcnMsXG4gICAgQ3JlYXRlU2VuZFRyYW5zcG9ydFBhcmFtZXRlcnMsXG4gICAgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5QYXJhbWV0ZXJzLFxuICAgIFByZXBvcHVsYXRlVXNlck1lZGlhUGFyYW1ldGVycyxcbiAgICBTdG9wU2hhcmVTY3JlZW5QYXJhbWV0ZXJzIHtcbiAgbG9jYWxTdHJlYW1TY3JlZW46IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgc2hhcmVkOiBib29sZWFuO1xuICBob3N0TGFiZWw6IHN0cmluZztcbiAgYW5ub3RhdGVTY3JlZW5TdHJlYW06IGJvb2xlYW47XG4gIHByb2Nlc3NlZFNjcmVlblN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsO1xuICBtYWluU2NyZWVuQ2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw7XG4gIGNhbnZhc1NjcmVlbmJvYXJkOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw7XG4gIHRyYW5zcG9ydENyZWF0ZWQ6IGJvb2xlYW47XG4gIHNjcmVlblByb2R1Y2VyOiBQcm9kdWNlciB8IG51bGw7XG5cbiAgdXBkYXRlTG9jYWxTdHJlYW1TY3JlZW46IChzdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlUHJvY2Vzc2VkU2NyZWVuU3RyZWFtOiAoc3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZU1haW5TY3JlZW5DYW52YXM6IChjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbCkgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgc2xlZXA6IFNsZWVwVHlwZTtcbiAgY3JlYXRlU2VuZFRyYW5zcG9ydDogQ3JlYXRlU2VuZFRyYW5zcG9ydFR5cGU7XG4gIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuOiBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblR5cGU7XG4gIGNvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuOiBDb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblR5cGU7XG4gIHN0b3BTaGFyZVNjcmVlbjogU3RvcFNoYXJlU2NyZWVuVHlwZTtcbiAgcHJlcG9wdWxhdGVVc2VyTWVkaWE6IFByZXBvcHVsYXRlVXNlck1lZGlhVHlwZTtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBTY3JlZW5ib2FyZE1vZGFsUGFyYW1ldGVycztcbiAgLy8gW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNjcmVlbmJvYXJkTW9kYWxPcHRpb25zIHtcbiAgcGFyYW1ldGVyczogU2NyZWVuYm9hcmRNb2RhbFBhcmFtZXRlcnM7XG4gIGlzVmlzaWJsZTogYm9vbGVhbjtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgcG9zaXRpb246IHN0cmluZztcbiAgYmFja2dyb3VuZENvbG9yOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFNjcmVlbmJvYXJkTW9kYWxUeXBlID0gKG9wdGlvbnM6IFNjcmVlbmJvYXJkTW9kYWxPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IFNjcmVlbmJvYXJkTW9kYWwgY29tcG9uZW50IGZvciBoYW5kbGluZyBzY3JlZW4gYW5ub3RhdGlvbiBhbmQgbW9kYWwgdmlzaWJpbGl0eS5cbiAqXG4gKiBAY29tcG9uZW50XG4gKiBAc2VsZWN0b3IgYXBwLXNjcmVlbmJvYXJkLW1vZGFsXG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAdGVtcGxhdGVVcmwgLi9zY3JlZW5ib2FyZC1tb2RhbC5jb21wb25lbnQuaHRtbFxuICogQHN0eWxlVXJscyAuL3NjcmVlbmJvYXJkLW1vZGFsLmNvbXBvbmVudC5jc3NcbiAqIEBpbXBvcnRzIENvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlXG4gKlxuICogQGNsYXNzIFNjcmVlbmJvYXJkTW9kYWxcbiAqIEBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXRcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoaXMgY29tcG9uZW50IGlzIHJlc3BvbnNpYmxlIGZvciBtYW5hZ2luZyB0aGUgc2NyZWVuIGFubm90YXRpb24gbW9kYWwsIGluY2x1ZGluZyBzaG93aW5nIGFuZCBoaWRpbmcgdGhlIG1vZGFsLFxuICogaGFuZGxpbmcgc2NyZWVuIGFubm90YXRpb25zLCBhbmQgbWFuYWdpbmcgbWVkaWEgc3RyZWFtcy5cbiAqXG4gKiBAcHJvcGVydHkge1NjcmVlbmJvYXJkTW9kYWxQYXJhbWV0ZXJzfSBwYXJhbWV0ZXJzIC0gSW5wdXQgcGFyYW1ldGVyIGZvciBzY3JlZW4gYW5ub3RhdGlvbiBtb2RhbC5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNWaXNpYmxlIC0gSW5wdXQgZmxhZyB0byBjb250cm9sIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBtb2RhbC5cbiAqIEBwcm9wZXJ0eSB7KCkgPT4gdm9pZH0gb25DbG9zZSAtIElucHV0IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBtb2RhbCBpcyBjbG9zZWQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcG9zaXRpb24gLSBJbnB1dCBzdHJpbmcgdG8gc2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgbW9kYWwuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYmFja2dyb3VuZENvbG9yIC0gSW5wdXQgc3RyaW5nIHRvIHNldCB0aGUgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgbW9kYWwuXG4gKlxuICogQHByb3BlcnR5IHtFbGVtZW50UmVmPEhUTUxWaWRlb0VsZW1lbnQ+fSBzY3JlZW5WaWRlb1JlZiAtIFZpZXdDaGlsZCByZWZlcmVuY2UgdG8gdGhlIHNjcmVlbiB2aWRlbyBlbGVtZW50LlxuICogQHByb3BlcnR5IHtFbGVtZW50UmVmPEhUTUxDYW52YXNFbGVtZW50Pn0gc2NyZWVuQ2FudmFzUmVmIC0gVmlld0NoaWxkIHJlZmVyZW5jZSB0byB0aGUgc2NyZWVuIGNhbnZhcyBlbGVtZW50LlxuICpcbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhVGltZXMgLSBGb250QXdlc29tZSBpY29uIGZvciB0aGUgY2xvc2UgYnV0dG9uLlxuICpcbiAqIEBwcm9wZXJ0eSB7YW55fSBhbm5vdGF0aW9uSW50ZXJ2YWwgLSBJbnRlcnZhbCBmb3IgYW5ub3RhdGlvbiB1cGRhdGVzLlxuICogQHByb3BlcnR5IHthbnl9IGFubm90YXRpb25DaGVja0ludGVydmFsIC0gSW50ZXJ2YWwgZm9yIGNoZWNraW5nIGFubm90YXRpb24gdXBkYXRlcy5cbiAqIEBwcm9wZXJ0eSB7TWVkaWFTdHJlYW0gfCBudWxsfSBjbG9uZWRTdHJlYW1TY3JlZW4gLSBDbG9uZWQgbWVkaWEgc3RyZWFtIGZvciBzY3JlZW4gc2hhcmluZy5cbiAqIEBwcm9wZXJ0eSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHwgbnVsbH0gY3R4IC0gQ2FudmFzIHJlbmRlcmluZyBjb250ZXh0LlxuICpcbiAqIEBtZXRob2QgbmdPbkluaXQgLSBJbml0aWFsaXphdGlvbiBsb2dpYyB0aGF0IGRvZXMgbm90IGRlcGVuZCBvbiB0aGUgdmlldy5cbiAqIEBtZXRob2QgbmdPbkRlc3Ryb3kgLSBDbGVhbnVwIGxvZ2ljIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuXG4gKiBAbWV0aG9kIG5nT25DaGFuZ2VzIC0gTG9naWMgdG8gaGFuZGxlIGNoYW5nZXMgaW4gaW5wdXQgcHJvcGVydGllcy5cbiAqIEBtZXRob2QgbmdBZnRlclZpZXdJbml0IC0gTG9naWMgdGhhdCByZXF1aXJlcyB2aWV3IGFjY2Vzcy5cbiAqIEBtZXRob2Qgc2hvd01vZGFsIC0gTWV0aG9kIHRvIHNob3cgdGhlIG1vZGFsIGFuZCBoYW5kbGUgc2NyZWVuIGFubm90YXRpb24gc2V0dXAuXG4gKiBAbWV0aG9kIGhpZGVNb2RhbCAtIE1ldGhvZCB0byBoaWRlIHRoZSBtb2RhbCBhbmQgY2xlYW51cCBzY3JlZW4gYW5ub3RhdGlvbi5cbiAqIEBtZXRob2QgYW5ub3RhdGF0aW9uUHJldmlldyAtIE1ldGhvZCB0byBoYW5kbGUgdGhlIHByZXZpZXcgb2Ygc2NyZWVuIGFubm90YXRpb25zLlxuICogQG1ldGhvZCBoYW5kbGVTY3JlZW5UcmFuc3BvcnQgLSBNZXRob2QgdG8gaGFuZGxlIHNjcmVlbiB0cmFuc3BvcnQgbG9naWMuXG4gKiBAbWV0aG9kIHN0b3BBbm5vdGF0aW9uIC0gTWV0aG9kIHRvIHN0b3AgdGhlIHNjcmVlbiBhbm5vdGF0aW9uLlxuICogQG1ldGhvZCBzdG9wQWxsVHJhY2tzIC0gTWV0aG9kIHRvIHN0b3AgYWxsIG1lZGlhIHRyYWNrcy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLXNjcmVlbmJvYXJkLW1vZGFsJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgdGVtcGxhdGVVcmw6ICcuL3NjcmVlbmJvYXJkLW1vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2NyZWVuYm9hcmQtbW9kYWwuY29tcG9uZW50LmNzcyddLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBTY3JlZW5ib2FyZE1vZGFsIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIHBhcmFtZXRlcnM6IFNjcmVlbmJvYXJkTW9kYWxQYXJhbWV0ZXJzID0ge30gYXMgU2NyZWVuYm9hcmRNb2RhbFBhcmFtZXRlcnM7XG4gIEBJbnB1dCgpIGlzVmlzaWJsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBvbkNsb3NlITogKCkgPT4gdm9pZDtcbiAgQElucHV0KCkgcG9zaXRpb24gPSAndG9wUmlnaHQnO1xuICBASW5wdXQoKSBiYWNrZ3JvdW5kQ29sb3IgPSAnIzgzYzBlOSc7XG5cbiAgQFZpZXdDaGlsZCgnc2NyZWVuVmlkZW8nKSBzY3JlZW5WaWRlb1JlZiE6IEVsZW1lbnRSZWY8SFRNTFZpZGVvRWxlbWVudD47XG4gIEBWaWV3Q2hpbGQoJ3NjcmVlbkNhbnZhcycpIHNjcmVlbkNhbnZhc1JlZiE6IEVsZW1lbnRSZWY8SFRNTENhbnZhc0VsZW1lbnQ+O1xuXG4gIGZhVGltZXMgPSBmYVRpbWVzO1xuXG4gIHByaXZhdGUgYW5ub3RhdGlvbkludGVydmFsOiBhbnk7XG4gIHByaXZhdGUgYW5ub3RhdGlvbkNoZWNrSW50ZXJ2YWw6IGFueTtcbiAgcHJpdmF0ZSBjbG9uZWRTdHJlYW1TY3JlZW46IE1lZGlhU3RyZWFtIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgfCBudWxsID0gbnVsbDtcblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBJbml0aWFsaXphdGlvbiBsb2dpYyB0aGF0IGRvZXMgbm90IGRlcGVuZCBvbiB0aGUgdmlld1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdG9wQW5ub3RhdGlvbigpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWydpc1Zpc2libGUnXSkge1xuICAgICAgdGhpcy5pc1Zpc2libGUgPSBjaGFuZ2VzWydpc1Zpc2libGUnXS5jdXJyZW50VmFsdWU7XG4gICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcbiAgICAgICAgLy8gSW4gY2FzZSBpc1Zpc2libGUgY2hhbmdlcyBhZnRlciB2aWV3IGluaXRcbiAgICAgICAgaWYgKHRoaXMuc2NyZWVuQ2FudmFzUmVmICYmIHRoaXMuc2NyZWVuVmlkZW9SZWYpIHtcbiAgICAgICAgICB0aGlzLnNob3dNb2RhbCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NyZWVuQ2FudmFzUmVmICYmIHRoaXMuc2NyZWVuVmlkZW9SZWYpIHtcbiAgICAgICAgICAgICAgdGhpcy5zaG93TW9kYWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5zY3JlZW5DYW52YXNSZWYgJiYgdGhpcy5zY3JlZW5WaWRlb1JlZikge1xuICAgICAgICAgIHRoaXMuaGlkZU1vZGFsKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gTW92ZSBsb2dpYyB0aGF0IHJlcXVpcmVzIHZpZXcgYWNjZXNzIGhlcmVcbiAgfVxuXG4gIHNob3dNb2RhbCA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzID0gdGhpcy5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcbiAgICAgIGNvbnN0IHsgYW5ub3RhdGVTY3JlZW5TdHJlYW0sIHNoYXJlZCwgY3JlYXRlU2VuZFRyYW5zcG9ydCwgcHJlcG9wdWxhdGVVc2VyTWVkaWEsIGhvc3RMYWJlbCB9ID1cbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzO1xuICAgICAgY29uc3QgYW5ub3RhdGUgPSBhbm5vdGF0ZVNjcmVlblN0cmVhbTtcbiAgICAgIGNvbnN0IHNjcmVlblZpZGVvID0gdGhpcy5zY3JlZW5WaWRlb1JlZiEubmF0aXZlRWxlbWVudDtcblxuICAgICAgaWYgKGFubm90YXRlICYmIHNoYXJlZCkge1xuICAgICAgICBzY3JlZW5WaWRlby5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcbiAgICAgICAgYXdhaXQgdGhpcy5hbm5vdGF0YXRpb25QcmV2aWV3KCk7XG4gICAgICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGlmICghdGhpcy5wYXJhbWV0ZXJzLnRyYW5zcG9ydENyZWF0ZWQpIHtcbiAgICAgICAgICAgIGF3YWl0IGNyZWF0ZVNlbmRUcmFuc3BvcnQoeyBvcHRpb246ICdzY3JlZW4nLCBwYXJhbWV0ZXJzOiB0aGlzLnBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMuaGFuZGxlU2NyZWVuVHJhbnNwb3J0KCk7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMucGFyYW1ldGVycy5zbGVlcCh7IG1zOiAyNTAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGF3YWl0IHRoaXMucGFyYW1ldGVycy5jb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbih7XG4gICAgICAgICAgICBzdHJlYW06IHRoaXMucGFyYW1ldGVycy5wcm9jZXNzZWRTY3JlZW5TdHJlYW0sXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB0aGlzLnBhcmFtZXRlcnMsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYXdhaXQgcHJlcG9wdWxhdGVVc2VyTWVkaWEhKHsgbmFtZTogaG9zdExhYmVsLCBwYXJhbWV0ZXJzOiB0aGlzLnBhcmFtZXRlcnMgfSk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY3JlZW5WaWRlby5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgIH1cbiAgfTtcblxuICBoaWRlTW9kYWwgPSBhc3luYyAoKSA9PiB7XG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gdGhpcy5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcbiAgICBjb25zdCB7XG4gICAgICBhbm5vdGF0ZVNjcmVlblN0cmVhbSxcbiAgICAgIHNoYXJlZCxcbiAgICAgIGNyZWF0ZVNlbmRUcmFuc3BvcnQsXG4gICAgICBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbixcbiAgICAgIHN0b3BTaGFyZVNjcmVlbixcbiAgICAgIHByZXBvcHVsYXRlVXNlck1lZGlhLFxuICAgICAgaG9zdExhYmVsLFxuICAgIH0gPSB0aGlzLnBhcmFtZXRlcnM7XG4gICAgY29uc3QgYW5ub3RhdGUgPSBhbm5vdGF0ZVNjcmVlblN0cmVhbTtcbiAgICBjb25zdCBzY3JlZW5WaWRlbyA9IHRoaXMuc2NyZWVuVmlkZW9SZWYgJiYgdGhpcy5zY3JlZW5WaWRlb1JlZiEubmF0aXZlRWxlbWVudDtcblxuICAgIHRyeSB7XG4gICAgICBpZiAoIWFubm90YXRlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5zdG9wQW5ub3RhdGlvbigpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2hhcmVkKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLnBhcmFtZXRlcnMudHJhbnNwb3J0Q3JlYXRlZCkge1xuICAgICAgICAgICAgYXdhaXQgY3JlYXRlU2VuZFRyYW5zcG9ydCh7IG9wdGlvbjogJ3NjcmVlbicsIHBhcmFtZXRlcnM6IHRoaXMucGFyYW1ldGVycyB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgYXdhaXQgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4oeyBwYXJhbWV0ZXJzOiB0aGlzLnBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMucGFyYW1ldGVycy5zbGVlcCh7IG1zOiA1MDAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5sb2NhbFN0cmVhbVNjcmVlbiAmJlxuICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1TY3JlZW4uZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5sb2NhbFN0cmVhbVNjcmVlbi5nZXRWaWRlb1RyYWNrcygpWzBdLnJlYWR5U3RhdGUgPT09ICdlbmRlZCdcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1TY3JlZW4ucmVtb3ZlVHJhY2soXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKClbMF0sXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmNsb25lZFN0cmVhbVNjcmVlbikge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5sb2NhbFN0cmVhbVNjcmVlbi5hZGRUcmFjayhcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKClbMF0uY2xvbmUoKSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVMb2NhbFN0cmVhbVNjcmVlbih0aGlzLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1TY3JlZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKClbMF0ub25lbmRlZCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbih7IHBhcmFtZXRlcnM6IHRoaXMucGFyYW1ldGVycyB9KTtcbiAgICAgICAgICAgICAgICBhd2FpdCBzdG9wU2hhcmVTY3JlZW4oeyBwYXJhbWV0ZXJzOiB0aGlzLnBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBhcmFtZXRlcnMuY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4oe1xuICAgICAgICAgICAgICBzdHJlYW06IHRoaXMucGFyYW1ldGVycy5sb2NhbFN0cmVhbVNjcmVlbixcbiAgICAgICAgICAgICAgcGFyYW1ldGVyczogdGhpcy5wYXJhbWV0ZXJzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IHRoaXMuc3RvcEFsbFRyYWNrcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgcHJlcG9wdWxhdGVVc2VyTWVkaWEhKHsgbmFtZTogaG9zdExhYmVsLCBwYXJhbWV0ZXJzOiB0aGlzLnBhcmFtZXRlcnMgfSk7XG4gICAgICB9XG4gICAgICBzY3JlZW5WaWRlbyAmJiBzY3JlZW5WaWRlby5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMubWFpblNjcmVlbkNhbnZhcyAmJiB0aGlzLnNjcmVlbkNhbnZhc1JlZikge1xuICAgICAgICB0aGlzLnNjcmVlbkNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICAgICAgfVxuICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICB9XG4gIH07XG5cbiAgYW5ub3RhdGF0aW9uUHJldmlldyA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBzY3JlZW5WaWRlbyA9IHRoaXMuc2NyZWVuVmlkZW9SZWYhLm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKCF0aGlzLnBhcmFtZXRlcnMubWFpblNjcmVlbkNhbnZhcykge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLm1haW5TY3JlZW5DYW52YXMgPSB0aGlzLnNjcmVlbkNhbnZhc1JlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZU1haW5TY3JlZW5DYW52YXModGhpcy5wYXJhbWV0ZXJzLm1haW5TY3JlZW5DYW52YXMpO1xuICAgIH1cbiAgICBjb25zdCBhbm5vdGF0ZSA9IHRoaXMucGFyYW1ldGVycy5hbm5vdGF0ZVNjcmVlblN0cmVhbTtcblxuICAgIGlmIChcbiAgICAgIGFubm90YXRlICYmXG4gICAgICAoIXRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuIHx8XG4gICAgICAgICh0aGlzLmNsb25lZFN0cmVhbVNjcmVlbiAmJlxuICAgICAgICAgIHRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKCkubGVuZ3RoID4gMCAmJlxuICAgICAgICAgIHRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKClbMF0ucmVhZHlTdGF0ZSA9PT0gJ2VuZGVkJykpXG4gICAgKSB7XG4gICAgICBjb25zdCBvcmlnaW5hbFRyYWNrID0gdGhpcy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuIS5nZXRWaWRlb1RyYWNrcygpWzBdO1xuICAgICAgY29uc3Qgb3JpZ2luYWxTZXR0aW5ncyA9IG9yaWdpbmFsVHJhY2suZ2V0U2V0dGluZ3MoKTtcbiAgICAgIGNvbnN0IGNsb25lZCA9IG9yaWdpbmFsVHJhY2suY2xvbmUoKTtcbiAgICAgIGF3YWl0IGNsb25lZC5hcHBseUNvbnN0cmFpbnRzKHtcbiAgICAgICAgd2lkdGg6IG9yaWdpbmFsU2V0dGluZ3Mud2lkdGgsXG4gICAgICAgIGhlaWdodDogb3JpZ2luYWxTZXR0aW5ncy5oZWlnaHQsXG4gICAgICAgIGZyYW1lUmF0ZTogb3JpZ2luYWxTZXR0aW5ncy5mcmFtZVJhdGUsXG4gICAgICAgIGFzcGVjdFJhdGlvOiBvcmlnaW5hbFNldHRpbmdzLmFzcGVjdFJhdGlvLFxuICAgICAgfSk7XG4gICAgICB0aGlzLmNsb25lZFN0cmVhbVNjcmVlbiA9IG5ldyBNZWRpYVN0cmVhbShbY2xvbmVkXSk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5jbG9uZWRTdHJlYW1TY3JlZW4gJiZcbiAgICAgIHRoaXMucGFyYW1ldGVycy5sb2NhbFN0cmVhbVNjcmVlbiAmJlxuICAgICAgdGhpcy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKCkubGVuZ3RoID4gMCAmJlxuICAgICAgdGhpcy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKClbMF0ucmVhZHlTdGF0ZSA9PT0gJ2VuZGVkJ1xuICAgICkge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuLnJlbW92ZVRyYWNrKFxuICAgICAgICB0aGlzLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1TY3JlZW4uZ2V0VmlkZW9UcmFja3MoKVswXSxcbiAgICAgICk7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1TY3JlZW4uYWRkVHJhY2soXG4gICAgICAgIHRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKClbMF0uY2xvbmUoKSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuKSB7XG4gICAgICB0aGlzLmNsb25lZFN0cmVhbVNjcmVlbi5nZXRWaWRlb1RyYWNrcygpWzBdLm9uZW5kZWQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMucGFyYW1ldGVycy5kaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbih7IHBhcmFtZXRlcnM6IHRoaXMucGFyYW1ldGVycyB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5wYXJhbWV0ZXJzLnN0b3BTaGFyZVNjcmVlbih7IHBhcmFtZXRlcnM6IHRoaXMucGFyYW1ldGVycyB9KTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgbWVkaWFDYW52YXMgPSB0aGlzLnBhcmFtZXRlcnMubWFpblNjcmVlbkNhbnZhcztcbiAgICBjb25zdCBjdHggPSBtZWRpYUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIG1lZGlhQ2FudmFzLndpZHRoID0gdGhpcy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuIS5nZXRWaWRlb1RyYWNrcygpWzBdLmdldFNldHRpbmdzKCkud2lkdGghO1xuICAgIG1lZGlhQ2FudmFzLmhlaWdodCA9IHRoaXMucGFyYW1ldGVyc1xuICAgICAgLmxvY2FsU3RyZWFtU2NyZWVuIS5nZXRWaWRlb1RyYWNrcygpWzBdXG4gICAgICAuZ2V0U2V0dGluZ3MoKS5oZWlnaHQhO1xuXG4gICAgaWYgKCFhbm5vdGF0ZSkge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnByb2Nlc3NlZFNjcmVlblN0cmVhbSA9IG51bGw7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlUHJvY2Vzc2VkU2NyZWVuU3RyZWFtKG51bGwpO1xuICAgIH1cblxuICAgIGNvbnN0IGNhcHR1cmVTdHJlYW0gPSAoKSA9PiB7XG4gICAgICBjb25zdCBzdHJlYW0gPSBtZWRpYUNhbnZhcy5jYXB0dXJlU3RyZWFtKDMwKTtcbiAgICAgIHRoaXMuYW5ub3RhdGlvbkNoZWNrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG4gICAgICAgIGNhbnZhc0VsZW1lbnQgPSBwYXJhbXMuY2FudmFzU2NyZWVuYm9hcmQ7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IGNhbnZhc0VsZW1lbnQhLmhlaWdodDtcbiAgICAgICAgY29uc3Qgd2lkdGggPSBjYW52YXNFbGVtZW50IS53aWR0aDtcbiAgICAgICAgY29uc3QgcmVmSGVpZ2h0ID0gcGFyYW1zLmxvY2FsU3RyZWFtU2NyZWVuIS5nZXRWaWRlb1RyYWNrcygpWzBdLmdldFNldHRpbmdzKCkuaGVpZ2h0ITtcbiAgICAgICAgY29uc3QgcmVmV2lkdGggPSBwYXJhbXMubG9jYWxTdHJlYW1TY3JlZW4hLmdldFZpZGVvVHJhY2tzKClbMF0uZ2V0U2V0dGluZ3MoKS53aWR0aCE7XG4gICAgICAgIGlmIChoZWlnaHQgIT09IHJlZkhlaWdodCB8fCB3aWR0aCAhPT0gcmVmV2lkdGgpIHtcbiAgICAgICAgICBjYW52YXNFbGVtZW50IS53aWR0aCA9IHJlZldpZHRoO1xuICAgICAgICAgIGNhbnZhc0VsZW1lbnQhLmhlaWdodCA9IHJlZkhlaWdodDtcbiAgICAgICAgICBtZWRpYUNhbnZhcy53aWR0aCA9IHJlZldpZHRoO1xuICAgICAgICAgIG1lZGlhQ2FudmFzLmhlaWdodCA9IHJlZkhlaWdodDtcbiAgICAgICAgfVxuICAgICAgfSwgMTAwMCk7XG4gICAgICB0aGlzLmFubm90YXRpb25JbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgZHJhd0NvbWJpbmVkKCk7XG4gICAgICB9LCAzMCk7XG4gICAgICByZXR1cm4gc3RyZWFtO1xuICAgIH07XG5cbiAgICBjb25zdCBhbm5vdGF0ZUltYWdlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnByb2Nlc3NlZFNjcmVlblN0cmVhbSA9IGF3YWl0IGNhcHR1cmVTdHJlYW0oKTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVQcm9jZXNzZWRTY3JlZW5TdHJlYW0odGhpcy5wYXJhbWV0ZXJzLnByb2Nlc3NlZFNjcmVlblN0cmVhbSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGFubm90YXRlVmlkZW8gPSB0aGlzLmNsb25lZFN0cmVhbVNjcmVlbjtcbiAgICBpZiAoYW5ub3RhdGVWaWRlbyAmJiBhbm5vdGF0ZSkge1xuICAgICAgc2NyZWVuVmlkZW8uc3R5bGUud2lkdGggPSBgJHthbm5vdGF0ZVZpZGVvLmdldFZpZGVvVHJhY2tzKClbMF0uZ2V0U2V0dGluZ3MoKS53aWR0aH1weGA7XG4gICAgICBzY3JlZW5WaWRlby5zdHlsZS5oZWlnaHQgPSBgJHthbm5vdGF0ZVZpZGVvLmdldFZpZGVvVHJhY2tzKClbMF0uZ2V0U2V0dGluZ3MoKS5oZWlnaHR9cHhgO1xuICAgICAgc2NyZWVuVmlkZW8uc3JjT2JqZWN0ID0gYW5ub3RhdGVWaWRlbztcbiAgICAgIGF3YWl0IGFubm90YXRlSW1hZ2UoKTtcbiAgICB9XG5cbiAgICBsZXQgY2FudmFzRWxlbWVudCA9IHRoaXMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCkuY2FudmFzU2NyZWVuYm9hcmQ7XG4gICAgY2FudmFzRWxlbWVudCEud2lkdGggPSBtZWRpYUNhbnZhcy53aWR0aDtcbiAgICBjYW52YXNFbGVtZW50IS5oZWlnaHQgPSBtZWRpYUNhbnZhcy5oZWlnaHQ7XG5cbiAgICBjb25zdCBkcmF3Q29tYmluZWQgPSAoKSA9PiB7XG4gICAgICBjdHghLmNsZWFyUmVjdCgwLCAwLCBjYW52YXNFbGVtZW50IS53aWR0aCwgY2FudmFzRWxlbWVudCEuaGVpZ2h0KTtcbiAgICAgIGN0eCEuZHJhd0ltYWdlKHNjcmVlblZpZGVvLCAwLCAwLCBjYW52YXNFbGVtZW50IS53aWR0aCwgY2FudmFzRWxlbWVudCEuaGVpZ2h0KTtcbiAgICAgIGN0eCEuZHJhd0ltYWdlKGNhbnZhc0VsZW1lbnQhLCAwLCAwLCBjYW52YXNFbGVtZW50IS53aWR0aCwgY2FudmFzRWxlbWVudCEuaGVpZ2h0KTtcbiAgICAgIGN0eCEucmVzdG9yZSgpO1xuICAgIH07XG4gIH07XG5cbiAgaGFuZGxlU2NyZWVuVHJhbnNwb3J0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmIChcbiAgICAgIHRoaXMucGFyYW1ldGVycy5sb2NhbFN0cmVhbVNjcmVlbiEuZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGggPiAwICYmXG4gICAgICB0aGlzLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1TY3JlZW4hLmdldFZpZGVvVHJhY2tzKClbMF0uaWQgPT09XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5zY3JlZW5Qcm9kdWNlcj8udHJhY2shLmlkXG4gICAgKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuICYmXG4gICAgICAgIHRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKCkubGVuZ3RoID4gMCAmJlxuICAgICAgICB0aGlzLmNsb25lZFN0cmVhbVNjcmVlbi5nZXRWaWRlb1RyYWNrcygpWzBdLnJlYWR5U3RhdGUgPT09ICdlbmRlZCdcbiAgICAgICkge1xuICAgICAgICB0aGlzLmNsb25lZFN0cmVhbVNjcmVlbi5yZW1vdmVUcmFjayh0aGlzLmNsb25lZFN0cmVhbVNjcmVlbi5nZXRWaWRlb1RyYWNrcygpWzBdKTtcbiAgICAgICAgdGhpcy5jbG9uZWRTdHJlYW1TY3JlZW4uYWRkVHJhY2soXG4gICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuIS5nZXRWaWRlb1RyYWNrcygpWzBdLmNsb25lKCksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1TY3JlZW4hLnJlbW92ZVRyYWNrKFxuICAgICAgICB0aGlzLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1TY3JlZW4hLmdldFZpZGVvVHJhY2tzKClbMF0sXG4gICAgICApO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuIS5hZGRUcmFjayhcbiAgICAgICAgdGhpcy5jbG9uZWRTdHJlYW1TY3JlZW4hLmdldFZpZGVvVHJhY2tzKClbMF0uY2xvbmUoKSxcbiAgICAgICk7XG4gICAgfVxuICAgIGF3YWl0IHRoaXMucGFyYW1ldGVycy5kaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbih7IHBhcmFtZXRlcnM6IHRoaXMucGFyYW1ldGVycyB9KTtcbiAgfTtcblxuICBzdG9wQW5ub3RhdGlvbiA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAodGhpcy5hbm5vdGF0aW9uSW50ZXJ2YWwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5hbm5vdGF0aW9uSW50ZXJ2YWwpO1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmFubm90YXRpb25DaGVja0ludGVydmFsKTtcbiAgICAgIHRoaXMuYW5ub3RhdGlvbkludGVydmFsID0gbnVsbDtcbiAgICAgIHRoaXMuYW5ub3RhdGlvbkNoZWNrSW50ZXJ2YWwgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhcmFtZXRlcnMucHJvY2Vzc2VkU2NyZWVuU3RyZWFtKSB7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMucHJvY2Vzc2VkU2NyZWVuU3RyZWFtXG4gICAgICAgIC5nZXRUcmFja3MoKVxuICAgICAgICAuZm9yRWFjaCgodHJhY2s6IE1lZGlhU3RyZWFtVHJhY2spID0+IHRyYWNrLnN0b3AoKSk7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMucHJvY2Vzc2VkU2NyZWVuU3RyZWFtID0gbnVsbDtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVQcm9jZXNzZWRTY3JlZW5TdHJlYW0obnVsbCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGFyYW1ldGVycy5tYWluU2NyZWVuQ2FudmFzKSB7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMubWFpblNjcmVlbkNhbnZhc1xuICAgICAgICA/LmdldENvbnRleHQoJzJkJykhXG4gICAgICAgIC5jbGVhclJlY3QoXG4gICAgICAgICAgMCxcbiAgICAgICAgICAwLFxuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5tYWluU2NyZWVuQ2FudmFzLndpZHRoLFxuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5tYWluU2NyZWVuQ2FudmFzLmhlaWdodCxcbiAgICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgc3RvcEFsbFRyYWNrcyA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1TY3JlZW4gJiZcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKCkubGVuZ3RoID4gMFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5sb2NhbFN0cmVhbVNjcmVlblxuICAgICAgICAgIC5nZXRWaWRlb1RyYWNrcygpXG4gICAgICAgICAgLmZvckVhY2goKHRyYWNrOiBNZWRpYVN0cmVhbVRyYWNrKSA9PiB0cmFjay5zdG9wKCkpO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlTG9jYWxTdHJlYW1TY3JlZW4obnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlTG9jYWxTdHJlYW1TY3JlZW4obnVsbCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuICYmIHRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKCkubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmNsb25lZFN0cmVhbVNjcmVlbi5nZXRWaWRlb1RyYWNrcygpLmZvckVhY2goKHRyYWNrKSA9PiB0cmFjay5zdG9wKCkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMucHJvY2Vzc2VkU2NyZWVuU3RyZWFtKSB7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5wcm9jZXNzZWRTY3JlZW5TdHJlYW1cbiAgICAgICAgICAuZ2V0VHJhY2tzKClcbiAgICAgICAgICAuZm9yRWFjaCgodHJhY2s6IE1lZGlhU3RyZWFtVHJhY2spID0+IHRyYWNrLnN0b3AoKSk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVQcm9jZXNzZWRTY3JlZW5TdHJlYW0obnVsbCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICB9XG5cbiAgICB0aGlzLmNsb25lZFN0cmVhbVNjcmVlbiA9IG51bGw7XG4gIH07XG59XG4iLCI8ZGl2ICpuZ0lmPVwiaXNWaXNpYmxlXCIgY2xhc3M9XCJtb2RhbC1jb250YWluZXJcIj5cclxuICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtdGl0bGVcIj5TY3JlZW4gQW5ub3RhdGlvbjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY2xvc2VcIiAoY2xpY2spPVwiaGlkZU1vZGFsKClcIj5cclxuICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVRpbWVzXCI+PC9mYS1pY29uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGhyIC8+XHJcbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxyXG4gICAgICA8dmlkZW8gI3NjcmVlblZpZGVvIGlkPVwic2NyZWVuVmlkZW9cIiBjbGFzcz1cImQtbm9uZVwiIGF1dG9wbGF5PjwvdmlkZW8+XHJcbiAgICAgIDxjYW52YXMgI3NjcmVlbkNhbnZhcyBpZD1cInNjcmVlbkNhbnZhc1wiPjwvY2FudmFzPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=