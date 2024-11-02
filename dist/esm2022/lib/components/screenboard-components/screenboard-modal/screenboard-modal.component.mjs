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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyZWVuYm9hcmQtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvc2NyZWVuYm9hcmQtY29tcG9uZW50cy9zY3JlZW5ib2FyZC1tb2RhbC9zY3JlZW5ib2FyZC1tb2RhbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9zY3JlZW5ib2FyZC1jb21wb25lbnRzL3NjcmVlbmJvYXJkLW1vZGFsL3NjcmVlbmJvYXJkLW1vZGFsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDZEQUE2RDtBQUM3RCxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFHTCxTQUFTLEdBS1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7QUEwRDVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzREc7QUFRSCxNQUFNLE9BQU8sZ0JBQWdCO0lBQ2xCLFVBQVUsR0FBK0IsRUFBZ0MsQ0FBQztJQUMxRSxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ2xCLE9BQU8sQ0FBYztJQUNyQixRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQ3RCLGVBQWUsR0FBRyxTQUFTLENBQUM7SUFFWCxjQUFjLENBQWdDO0lBQzdDLGVBQWUsQ0FBaUM7SUFFM0UsT0FBTyxHQUFHLE9BQU8s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QUUsV0FBVyxFQUFFLGlCQUFpQixDQUFDOzhCQUc5QyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFFb0IsY0FBYztzQkFBdkMsU0FBUzt1QkFBQyxhQUFhO2dCQUNHLGVBQWU7c0JBQXpDLFNBQVM7dUJBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb24gKi9cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQWZ0ZXJWaWV3SW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7IGZhVGltZXMgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgUHJvZHVjZXIgfSBmcm9tICdtZWRpYXNvdXAtY2xpZW50L2xpYi90eXBlcyc7XG5pbXBvcnQge1xuICBDb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblR5cGUsXG4gIENyZWF0ZVNlbmRUcmFuc3BvcnRUeXBlLFxuICBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblR5cGUsXG4gIFByZXBvcHVsYXRlVXNlck1lZGlhVHlwZSxcbiAgU3RvcFNoYXJlU2NyZWVuVHlwZSxcbiAgU2xlZXBUeXBlLFxuICBDb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblBhcmFtZXRlcnMsXG4gIENyZWF0ZVNlbmRUcmFuc3BvcnRQYXJhbWV0ZXJzLFxuICBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblBhcmFtZXRlcnMsXG4gIFByZXBvcHVsYXRlVXNlck1lZGlhUGFyYW1ldGVycyxcbiAgU3RvcFNoYXJlU2NyZWVuUGFyYW1ldGVycyxcbn0gZnJvbSAnLi4vLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBTY3JlZW5ib2FyZE1vZGFsUGFyYW1ldGVyc1xuICBleHRlbmRzIENvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuUGFyYW1ldGVycyxcbiAgICBDcmVhdGVTZW5kVHJhbnNwb3J0UGFyYW1ldGVycyxcbiAgICBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblBhcmFtZXRlcnMsXG4gICAgUHJlcG9wdWxhdGVVc2VyTWVkaWFQYXJhbWV0ZXJzLFxuICAgIFN0b3BTaGFyZVNjcmVlblBhcmFtZXRlcnMge1xuICBsb2NhbFN0cmVhbVNjcmVlbjogTWVkaWFTdHJlYW0gfCBudWxsO1xuICBzaGFyZWQ6IGJvb2xlYW47XG4gIGhvc3RMYWJlbDogc3RyaW5nO1xuICBhbm5vdGF0ZVNjcmVlblN0cmVhbTogYm9vbGVhbjtcbiAgcHJvY2Vzc2VkU2NyZWVuU3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGw7XG4gIG1haW5TY3JlZW5DYW52YXM6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbDtcbiAgY2FudmFzU2NyZWVuYm9hcmQ6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbDtcbiAgdHJhbnNwb3J0Q3JlYXRlZDogYm9vbGVhbjtcbiAgc2NyZWVuUHJvZHVjZXI6IFByb2R1Y2VyIHwgbnVsbDtcblxuICB1cGRhdGVMb2NhbFN0cmVhbVNjcmVlbjogKHN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVQcm9jZXNzZWRTY3JlZW5TdHJlYW06IChzdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlTWFpblNjcmVlbkNhbnZhczogKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBzbGVlcDogU2xlZXBUeXBlO1xuICBjcmVhdGVTZW5kVHJhbnNwb3J0OiBDcmVhdGVTZW5kVHJhbnNwb3J0VHlwZTtcbiAgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW46IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuVHlwZTtcbiAgY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW46IENvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuVHlwZTtcbiAgc3RvcFNoYXJlU2NyZWVuOiBTdG9wU2hhcmVTY3JlZW5UeXBlO1xuICBwcmVwb3B1bGF0ZVVzZXJNZWRpYTogUHJlcG9wdWxhdGVVc2VyTWVkaWFUeXBlO1xuXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFNjcmVlbmJvYXJkTW9kYWxQYXJhbWV0ZXJzO1xuICAvLyBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2NyZWVuYm9hcmRNb2RhbE9wdGlvbnMge1xuICBwYXJhbWV0ZXJzOiBTY3JlZW5ib2FyZE1vZGFsUGFyYW1ldGVycztcbiAgaXNWaXNpYmxlOiBib29sZWFuO1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xuICBwb3NpdGlvbjogc3RyaW5nO1xuICBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgU2NyZWVuYm9hcmRNb2RhbFR5cGUgPSAob3B0aW9uczogU2NyZWVuYm9hcmRNb2RhbE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXcgU2NyZWVuYm9hcmRNb2RhbCBjb21wb25lbnQgZm9yIGhhbmRsaW5nIHNjcmVlbiBhbm5vdGF0aW9uIGFuZCBtb2RhbCB2aXNpYmlsaXR5LlxuICpcbiAqIEBjb21wb25lbnRcbiAqIEBzZWxlY3RvciBhcHAtc2NyZWVuYm9hcmQtbW9kYWxcbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEB0ZW1wbGF0ZVVybCAuL3NjcmVlbmJvYXJkLW1vZGFsLmNvbXBvbmVudC5odG1sXG4gKiBAc3R5bGVVcmxzIC4vc2NyZWVuYm9hcmQtbW9kYWwuY29tcG9uZW50LmNzc1xuICogQGltcG9ydHMgQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGVcbiAqXG4gKiBAY2xhc3MgU2NyZWVuYm9hcmRNb2RhbFxuICogQGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdFxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogVGhpcyBjb21wb25lbnQgaXMgcmVzcG9uc2libGUgZm9yIG1hbmFnaW5nIHRoZSBzY3JlZW4gYW5ub3RhdGlvbiBtb2RhbCwgaW5jbHVkaW5nIHNob3dpbmcgYW5kIGhpZGluZyB0aGUgbW9kYWwsXG4gKiBoYW5kbGluZyBzY3JlZW4gYW5ub3RhdGlvbnMsIGFuZCBtYW5hZ2luZyBtZWRpYSBzdHJlYW1zLlxuICpcbiAqIEBwcm9wZXJ0eSB7U2NyZWVuYm9hcmRNb2RhbFBhcmFtZXRlcnN9IHBhcmFtZXRlcnMgLSBJbnB1dCBwYXJhbWV0ZXIgZm9yIHNjcmVlbiBhbm5vdGF0aW9uIG1vZGFsLlxuICogQHByb3BlcnR5IHtib29sZWFufSBpc1Zpc2libGUgLSBJbnB1dCBmbGFnIHRvIGNvbnRyb2wgdGhlIHZpc2liaWxpdHkgb2YgdGhlIG1vZGFsLlxuICogQHByb3BlcnR5IHsoKSA9PiB2b2lkfSBvbkNsb3NlIC0gSW5wdXQgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIG1vZGFsIGlzIGNsb3NlZC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwb3NpdGlvbiAtIElucHV0IHN0cmluZyB0byBzZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBtb2RhbC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBiYWNrZ3JvdW5kQ29sb3IgLSBJbnB1dCBzdHJpbmcgdG8gc2V0IHRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBtb2RhbC5cbiAqXG4gKiBAcHJvcGVydHkge0VsZW1lbnRSZWY8SFRNTFZpZGVvRWxlbWVudD59IHNjcmVlblZpZGVvUmVmIC0gVmlld0NoaWxkIHJlZmVyZW5jZSB0byB0aGUgc2NyZWVuIHZpZGVvIGVsZW1lbnQuXG4gKiBAcHJvcGVydHkge0VsZW1lbnRSZWY8SFRNTENhbnZhc0VsZW1lbnQ+fSBzY3JlZW5DYW52YXNSZWYgLSBWaWV3Q2hpbGQgcmVmZXJlbmNlIHRvIHRoZSBzY3JlZW4gY2FudmFzIGVsZW1lbnQuXG4gKlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFUaW1lcyAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHRoZSBjbG9zZSBidXR0b24uXG4gKlxuICogQHByb3BlcnR5IHthbnl9IGFubm90YXRpb25JbnRlcnZhbCAtIEludGVydmFsIGZvciBhbm5vdGF0aW9uIHVwZGF0ZXMuXG4gKiBAcHJvcGVydHkge2FueX0gYW5ub3RhdGlvbkNoZWNrSW50ZXJ2YWwgLSBJbnRlcnZhbCBmb3IgY2hlY2tpbmcgYW5ub3RhdGlvbiB1cGRhdGVzLlxuICogQHByb3BlcnR5IHtNZWRpYVN0cmVhbSB8IG51bGx9IGNsb25lZFN0cmVhbVNjcmVlbiAtIENsb25lZCBtZWRpYSBzdHJlYW0gZm9yIHNjcmVlbiBzaGFyaW5nLlxuICogQHByb3BlcnR5IHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgfCBudWxsfSBjdHggLSBDYW52YXMgcmVuZGVyaW5nIGNvbnRleHQuXG4gKlxuICogQG1ldGhvZCBuZ09uSW5pdCAtIEluaXRpYWxpemF0aW9uIGxvZ2ljIHRoYXQgZG9lcyBub3QgZGVwZW5kIG9uIHRoZSB2aWV3LlxuICogQG1ldGhvZCBuZ09uRGVzdHJveSAtIENsZWFudXAgbG9naWMgd2hlbiB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZC5cbiAqIEBtZXRob2QgbmdPbkNoYW5nZXMgLSBMb2dpYyB0byBoYW5kbGUgY2hhbmdlcyBpbiBpbnB1dCBwcm9wZXJ0aWVzLlxuICogQG1ldGhvZCBuZ0FmdGVyVmlld0luaXQgLSBMb2dpYyB0aGF0IHJlcXVpcmVzIHZpZXcgYWNjZXNzLlxuICogQG1ldGhvZCBzaG93TW9kYWwgLSBNZXRob2QgdG8gc2hvdyB0aGUgbW9kYWwgYW5kIGhhbmRsZSBzY3JlZW4gYW5ub3RhdGlvbiBzZXR1cC5cbiAqIEBtZXRob2QgaGlkZU1vZGFsIC0gTWV0aG9kIHRvIGhpZGUgdGhlIG1vZGFsIGFuZCBjbGVhbnVwIHNjcmVlbiBhbm5vdGF0aW9uLlxuICogQG1ldGhvZCBhbm5vdGF0YXRpb25QcmV2aWV3IC0gTWV0aG9kIHRvIGhhbmRsZSB0aGUgcHJldmlldyBvZiBzY3JlZW4gYW5ub3RhdGlvbnMuXG4gKiBAbWV0aG9kIGhhbmRsZVNjcmVlblRyYW5zcG9ydCAtIE1ldGhvZCB0byBoYW5kbGUgc2NyZWVuIHRyYW5zcG9ydCBsb2dpYy5cbiAqIEBtZXRob2Qgc3RvcEFubm90YXRpb24gLSBNZXRob2QgdG8gc3RvcCB0aGUgc2NyZWVuIGFubm90YXRpb24uXG4gKiBAbWV0aG9kIHN0b3BBbGxUcmFja3MgLSBNZXRob2QgdG8gc3RvcCBhbGwgbWVkaWEgdHJhY2tzLlxuICogQHJldHVybnMge0hUTUxFbGVtZW50fSBUaGUgc2NyZWVuYm9hcmQgbW9kYWwgY29tcG9uZW50LlxuICogQGV4YW1wbGVcbiAqIGBgYGh0bWxcbiAqIDxhcHAtc2NyZWVuYm9hcmQtbW9kYWxcbiAqICBbcGFyYW1ldGVyc109XCJzY3JlZW5ib2FyZE1vZGFsUGFyYW1zXCJcbiAqIFtpc1Zpc2libGVdPVwiaXNNb2RhbFZpc2libGVcIlxuICogW29uQ2xvc2VdPVwiY2xvc2VNb2RhbFwiXG4gKiBbcG9zaXRpb25dPVwiJ3RvcFJpZ2h0J1wiXG4gKiBbYmFja2dyb3VuZENvbG9yXT1cIicjODNjMGU5J1wiPlxuICogPC9hcHAtc2NyZWVuYm9hcmQtbW9kYWw+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLXNjcmVlbmJvYXJkLW1vZGFsJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgdGVtcGxhdGVVcmw6ICcuL3NjcmVlbmJvYXJkLW1vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2NyZWVuYm9hcmQtbW9kYWwuY29tcG9uZW50LmNzcyddLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBTY3JlZW5ib2FyZE1vZGFsIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIHBhcmFtZXRlcnM6IFNjcmVlbmJvYXJkTW9kYWxQYXJhbWV0ZXJzID0ge30gYXMgU2NyZWVuYm9hcmRNb2RhbFBhcmFtZXRlcnM7XG4gIEBJbnB1dCgpIGlzVmlzaWJsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBvbkNsb3NlITogKCkgPT4gdm9pZDtcbiAgQElucHV0KCkgcG9zaXRpb24gPSAndG9wUmlnaHQnO1xuICBASW5wdXQoKSBiYWNrZ3JvdW5kQ29sb3IgPSAnIzgzYzBlOSc7XG5cbiAgQFZpZXdDaGlsZCgnc2NyZWVuVmlkZW8nKSBzY3JlZW5WaWRlb1JlZiE6IEVsZW1lbnRSZWY8SFRNTFZpZGVvRWxlbWVudD47XG4gIEBWaWV3Q2hpbGQoJ3NjcmVlbkNhbnZhcycpIHNjcmVlbkNhbnZhc1JlZiE6IEVsZW1lbnRSZWY8SFRNTENhbnZhc0VsZW1lbnQ+O1xuXG4gIGZhVGltZXMgPSBmYVRpbWVzO1xuXG4gIHByaXZhdGUgYW5ub3RhdGlvbkludGVydmFsOiBhbnk7XG4gIHByaXZhdGUgYW5ub3RhdGlvbkNoZWNrSW50ZXJ2YWw6IGFueTtcbiAgcHJpdmF0ZSBjbG9uZWRTdHJlYW1TY3JlZW46IE1lZGlhU3RyZWFtIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgfCBudWxsID0gbnVsbDtcblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBJbml0aWFsaXphdGlvbiBsb2dpYyB0aGF0IGRvZXMgbm90IGRlcGVuZCBvbiB0aGUgdmlld1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdG9wQW5ub3RhdGlvbigpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWydpc1Zpc2libGUnXSkge1xuICAgICAgdGhpcy5pc1Zpc2libGUgPSBjaGFuZ2VzWydpc1Zpc2libGUnXS5jdXJyZW50VmFsdWU7XG4gICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcbiAgICAgICAgLy8gSW4gY2FzZSBpc1Zpc2libGUgY2hhbmdlcyBhZnRlciB2aWV3IGluaXRcbiAgICAgICAgaWYgKHRoaXMuc2NyZWVuQ2FudmFzUmVmICYmIHRoaXMuc2NyZWVuVmlkZW9SZWYpIHtcbiAgICAgICAgICB0aGlzLnNob3dNb2RhbCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NyZWVuQ2FudmFzUmVmICYmIHRoaXMuc2NyZWVuVmlkZW9SZWYpIHtcbiAgICAgICAgICAgICAgdGhpcy5zaG93TW9kYWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5zY3JlZW5DYW52YXNSZWYgJiYgdGhpcy5zY3JlZW5WaWRlb1JlZikge1xuICAgICAgICAgIHRoaXMuaGlkZU1vZGFsKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gTW92ZSBsb2dpYyB0aGF0IHJlcXVpcmVzIHZpZXcgYWNjZXNzIGhlcmVcbiAgfVxuXG4gIHNob3dNb2RhbCA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzID0gdGhpcy5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcbiAgICAgIGNvbnN0IHsgYW5ub3RhdGVTY3JlZW5TdHJlYW0sIHNoYXJlZCwgY3JlYXRlU2VuZFRyYW5zcG9ydCwgcHJlcG9wdWxhdGVVc2VyTWVkaWEsIGhvc3RMYWJlbCB9ID1cbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzO1xuICAgICAgY29uc3QgYW5ub3RhdGUgPSBhbm5vdGF0ZVNjcmVlblN0cmVhbTtcbiAgICAgIGNvbnN0IHNjcmVlblZpZGVvID0gdGhpcy5zY3JlZW5WaWRlb1JlZiEubmF0aXZlRWxlbWVudDtcblxuICAgICAgaWYgKGFubm90YXRlICYmIHNoYXJlZCkge1xuICAgICAgICBzY3JlZW5WaWRlby5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcbiAgICAgICAgYXdhaXQgdGhpcy5hbm5vdGF0YXRpb25QcmV2aWV3KCk7XG4gICAgICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGlmICghdGhpcy5wYXJhbWV0ZXJzLnRyYW5zcG9ydENyZWF0ZWQpIHtcbiAgICAgICAgICAgIGF3YWl0IGNyZWF0ZVNlbmRUcmFuc3BvcnQoeyBvcHRpb246ICdzY3JlZW4nLCBwYXJhbWV0ZXJzOiB0aGlzLnBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMuaGFuZGxlU2NyZWVuVHJhbnNwb3J0KCk7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMucGFyYW1ldGVycy5zbGVlcCh7IG1zOiAyNTAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGF3YWl0IHRoaXMucGFyYW1ldGVycy5jb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbih7XG4gICAgICAgICAgICBzdHJlYW06IHRoaXMucGFyYW1ldGVycy5wcm9jZXNzZWRTY3JlZW5TdHJlYW0sXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB0aGlzLnBhcmFtZXRlcnMsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYXdhaXQgcHJlcG9wdWxhdGVVc2VyTWVkaWEhKHsgbmFtZTogaG9zdExhYmVsLCBwYXJhbWV0ZXJzOiB0aGlzLnBhcmFtZXRlcnMgfSk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY3JlZW5WaWRlby5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgIH1cbiAgfTtcblxuICBoaWRlTW9kYWwgPSBhc3luYyAoKSA9PiB7XG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gdGhpcy5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcbiAgICBjb25zdCB7XG4gICAgICBhbm5vdGF0ZVNjcmVlblN0cmVhbSxcbiAgICAgIHNoYXJlZCxcbiAgICAgIGNyZWF0ZVNlbmRUcmFuc3BvcnQsXG4gICAgICBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbixcbiAgICAgIHN0b3BTaGFyZVNjcmVlbixcbiAgICAgIHByZXBvcHVsYXRlVXNlck1lZGlhLFxuICAgICAgaG9zdExhYmVsLFxuICAgIH0gPSB0aGlzLnBhcmFtZXRlcnM7XG4gICAgY29uc3QgYW5ub3RhdGUgPSBhbm5vdGF0ZVNjcmVlblN0cmVhbTtcbiAgICBjb25zdCBzY3JlZW5WaWRlbyA9IHRoaXMuc2NyZWVuVmlkZW9SZWYgJiYgdGhpcy5zY3JlZW5WaWRlb1JlZiEubmF0aXZlRWxlbWVudDtcblxuICAgIHRyeSB7XG4gICAgICBpZiAoIWFubm90YXRlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5zdG9wQW5ub3RhdGlvbigpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2hhcmVkKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLnBhcmFtZXRlcnMudHJhbnNwb3J0Q3JlYXRlZCkge1xuICAgICAgICAgICAgYXdhaXQgY3JlYXRlU2VuZFRyYW5zcG9ydCh7IG9wdGlvbjogJ3NjcmVlbicsIHBhcmFtZXRlcnM6IHRoaXMucGFyYW1ldGVycyB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgYXdhaXQgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4oeyBwYXJhbWV0ZXJzOiB0aGlzLnBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMucGFyYW1ldGVycy5zbGVlcCh7IG1zOiA1MDAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5sb2NhbFN0cmVhbVNjcmVlbiAmJlxuICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1TY3JlZW4uZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5sb2NhbFN0cmVhbVNjcmVlbi5nZXRWaWRlb1RyYWNrcygpWzBdLnJlYWR5U3RhdGUgPT09ICdlbmRlZCdcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1TY3JlZW4ucmVtb3ZlVHJhY2soXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKClbMF0sXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmNsb25lZFN0cmVhbVNjcmVlbikge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5sb2NhbFN0cmVhbVNjcmVlbi5hZGRUcmFjayhcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKClbMF0uY2xvbmUoKSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVMb2NhbFN0cmVhbVNjcmVlbih0aGlzLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1TY3JlZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKClbMF0ub25lbmRlZCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbih7IHBhcmFtZXRlcnM6IHRoaXMucGFyYW1ldGVycyB9KTtcbiAgICAgICAgICAgICAgICBhd2FpdCBzdG9wU2hhcmVTY3JlZW4oeyBwYXJhbWV0ZXJzOiB0aGlzLnBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBhcmFtZXRlcnMuY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4oe1xuICAgICAgICAgICAgICBzdHJlYW06IHRoaXMucGFyYW1ldGVycy5sb2NhbFN0cmVhbVNjcmVlbixcbiAgICAgICAgICAgICAgcGFyYW1ldGVyczogdGhpcy5wYXJhbWV0ZXJzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IHRoaXMuc3RvcEFsbFRyYWNrcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgcHJlcG9wdWxhdGVVc2VyTWVkaWEhKHsgbmFtZTogaG9zdExhYmVsLCBwYXJhbWV0ZXJzOiB0aGlzLnBhcmFtZXRlcnMgfSk7XG4gICAgICB9XG4gICAgICBzY3JlZW5WaWRlbyAmJiBzY3JlZW5WaWRlby5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMubWFpblNjcmVlbkNhbnZhcyAmJiB0aGlzLnNjcmVlbkNhbnZhc1JlZikge1xuICAgICAgICB0aGlzLnNjcmVlbkNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICAgICAgfVxuICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICB9XG4gIH07XG5cbiAgYW5ub3RhdGF0aW9uUHJldmlldyA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBzY3JlZW5WaWRlbyA9IHRoaXMuc2NyZWVuVmlkZW9SZWYhLm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKCF0aGlzLnBhcmFtZXRlcnMubWFpblNjcmVlbkNhbnZhcykge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLm1haW5TY3JlZW5DYW52YXMgPSB0aGlzLnNjcmVlbkNhbnZhc1JlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZU1haW5TY3JlZW5DYW52YXModGhpcy5wYXJhbWV0ZXJzLm1haW5TY3JlZW5DYW52YXMpO1xuICAgIH1cbiAgICBjb25zdCBhbm5vdGF0ZSA9IHRoaXMucGFyYW1ldGVycy5hbm5vdGF0ZVNjcmVlblN0cmVhbTtcblxuICAgIGlmIChcbiAgICAgIGFubm90YXRlICYmXG4gICAgICAoIXRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuIHx8XG4gICAgICAgICh0aGlzLmNsb25lZFN0cmVhbVNjcmVlbiAmJlxuICAgICAgICAgIHRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKCkubGVuZ3RoID4gMCAmJlxuICAgICAgICAgIHRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKClbMF0ucmVhZHlTdGF0ZSA9PT0gJ2VuZGVkJykpXG4gICAgKSB7XG4gICAgICBjb25zdCBvcmlnaW5hbFRyYWNrID0gdGhpcy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuIS5nZXRWaWRlb1RyYWNrcygpWzBdO1xuICAgICAgY29uc3Qgb3JpZ2luYWxTZXR0aW5ncyA9IG9yaWdpbmFsVHJhY2suZ2V0U2V0dGluZ3MoKTtcbiAgICAgIGNvbnN0IGNsb25lZCA9IG9yaWdpbmFsVHJhY2suY2xvbmUoKTtcbiAgICAgIGF3YWl0IGNsb25lZC5hcHBseUNvbnN0cmFpbnRzKHtcbiAgICAgICAgd2lkdGg6IG9yaWdpbmFsU2V0dGluZ3Mud2lkdGgsXG4gICAgICAgIGhlaWdodDogb3JpZ2luYWxTZXR0aW5ncy5oZWlnaHQsXG4gICAgICAgIGZyYW1lUmF0ZTogb3JpZ2luYWxTZXR0aW5ncy5mcmFtZVJhdGUsXG4gICAgICAgIGFzcGVjdFJhdGlvOiBvcmlnaW5hbFNldHRpbmdzLmFzcGVjdFJhdGlvLFxuICAgICAgfSk7XG4gICAgICB0aGlzLmNsb25lZFN0cmVhbVNjcmVlbiA9IG5ldyBNZWRpYVN0cmVhbShbY2xvbmVkXSk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5jbG9uZWRTdHJlYW1TY3JlZW4gJiZcbiAgICAgIHRoaXMucGFyYW1ldGVycy5sb2NhbFN0cmVhbVNjcmVlbiAmJlxuICAgICAgdGhpcy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKCkubGVuZ3RoID4gMCAmJlxuICAgICAgdGhpcy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKClbMF0ucmVhZHlTdGF0ZSA9PT0gJ2VuZGVkJ1xuICAgICkge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuLnJlbW92ZVRyYWNrKFxuICAgICAgICB0aGlzLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1TY3JlZW4uZ2V0VmlkZW9UcmFja3MoKVswXSxcbiAgICAgICk7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1TY3JlZW4uYWRkVHJhY2soXG4gICAgICAgIHRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKClbMF0uY2xvbmUoKSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuKSB7XG4gICAgICB0aGlzLmNsb25lZFN0cmVhbVNjcmVlbi5nZXRWaWRlb1RyYWNrcygpWzBdLm9uZW5kZWQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMucGFyYW1ldGVycy5kaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbih7IHBhcmFtZXRlcnM6IHRoaXMucGFyYW1ldGVycyB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5wYXJhbWV0ZXJzLnN0b3BTaGFyZVNjcmVlbih7IHBhcmFtZXRlcnM6IHRoaXMucGFyYW1ldGVycyB9KTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgbWVkaWFDYW52YXMgPSB0aGlzLnBhcmFtZXRlcnMubWFpblNjcmVlbkNhbnZhcztcbiAgICBjb25zdCBjdHggPSBtZWRpYUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIG1lZGlhQ2FudmFzLndpZHRoID0gdGhpcy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuIS5nZXRWaWRlb1RyYWNrcygpWzBdLmdldFNldHRpbmdzKCkud2lkdGghO1xuICAgIG1lZGlhQ2FudmFzLmhlaWdodCA9IHRoaXMucGFyYW1ldGVyc1xuICAgICAgLmxvY2FsU3RyZWFtU2NyZWVuIS5nZXRWaWRlb1RyYWNrcygpWzBdXG4gICAgICAuZ2V0U2V0dGluZ3MoKS5oZWlnaHQhO1xuXG4gICAgaWYgKCFhbm5vdGF0ZSkge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnByb2Nlc3NlZFNjcmVlblN0cmVhbSA9IG51bGw7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlUHJvY2Vzc2VkU2NyZWVuU3RyZWFtKG51bGwpO1xuICAgIH1cblxuICAgIGNvbnN0IGNhcHR1cmVTdHJlYW0gPSAoKSA9PiB7XG4gICAgICBjb25zdCBzdHJlYW0gPSBtZWRpYUNhbnZhcy5jYXB0dXJlU3RyZWFtKDMwKTtcbiAgICAgIHRoaXMuYW5ub3RhdGlvbkNoZWNrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG4gICAgICAgIGNhbnZhc0VsZW1lbnQgPSBwYXJhbXMuY2FudmFzU2NyZWVuYm9hcmQ7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IGNhbnZhc0VsZW1lbnQhLmhlaWdodDtcbiAgICAgICAgY29uc3Qgd2lkdGggPSBjYW52YXNFbGVtZW50IS53aWR0aDtcbiAgICAgICAgY29uc3QgcmVmSGVpZ2h0ID0gcGFyYW1zLmxvY2FsU3RyZWFtU2NyZWVuIS5nZXRWaWRlb1RyYWNrcygpWzBdLmdldFNldHRpbmdzKCkuaGVpZ2h0ITtcbiAgICAgICAgY29uc3QgcmVmV2lkdGggPSBwYXJhbXMubG9jYWxTdHJlYW1TY3JlZW4hLmdldFZpZGVvVHJhY2tzKClbMF0uZ2V0U2V0dGluZ3MoKS53aWR0aCE7XG4gICAgICAgIGlmIChoZWlnaHQgIT09IHJlZkhlaWdodCB8fCB3aWR0aCAhPT0gcmVmV2lkdGgpIHtcbiAgICAgICAgICBjYW52YXNFbGVtZW50IS53aWR0aCA9IHJlZldpZHRoO1xuICAgICAgICAgIGNhbnZhc0VsZW1lbnQhLmhlaWdodCA9IHJlZkhlaWdodDtcbiAgICAgICAgICBtZWRpYUNhbnZhcy53aWR0aCA9IHJlZldpZHRoO1xuICAgICAgICAgIG1lZGlhQ2FudmFzLmhlaWdodCA9IHJlZkhlaWdodDtcbiAgICAgICAgfVxuICAgICAgfSwgMTAwMCk7XG4gICAgICB0aGlzLmFubm90YXRpb25JbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgZHJhd0NvbWJpbmVkKCk7XG4gICAgICB9LCAzMCk7XG4gICAgICByZXR1cm4gc3RyZWFtO1xuICAgIH07XG5cbiAgICBjb25zdCBhbm5vdGF0ZUltYWdlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnByb2Nlc3NlZFNjcmVlblN0cmVhbSA9IGF3YWl0IGNhcHR1cmVTdHJlYW0oKTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVQcm9jZXNzZWRTY3JlZW5TdHJlYW0odGhpcy5wYXJhbWV0ZXJzLnByb2Nlc3NlZFNjcmVlblN0cmVhbSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGFubm90YXRlVmlkZW8gPSB0aGlzLmNsb25lZFN0cmVhbVNjcmVlbjtcbiAgICBpZiAoYW5ub3RhdGVWaWRlbyAmJiBhbm5vdGF0ZSkge1xuICAgICAgc2NyZWVuVmlkZW8uc3R5bGUud2lkdGggPSBgJHthbm5vdGF0ZVZpZGVvLmdldFZpZGVvVHJhY2tzKClbMF0uZ2V0U2V0dGluZ3MoKS53aWR0aH1weGA7XG4gICAgICBzY3JlZW5WaWRlby5zdHlsZS5oZWlnaHQgPSBgJHthbm5vdGF0ZVZpZGVvLmdldFZpZGVvVHJhY2tzKClbMF0uZ2V0U2V0dGluZ3MoKS5oZWlnaHR9cHhgO1xuICAgICAgc2NyZWVuVmlkZW8uc3JjT2JqZWN0ID0gYW5ub3RhdGVWaWRlbztcbiAgICAgIGF3YWl0IGFubm90YXRlSW1hZ2UoKTtcbiAgICB9XG5cbiAgICBsZXQgY2FudmFzRWxlbWVudCA9IHRoaXMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCkuY2FudmFzU2NyZWVuYm9hcmQ7XG4gICAgY2FudmFzRWxlbWVudCEud2lkdGggPSBtZWRpYUNhbnZhcy53aWR0aDtcbiAgICBjYW52YXNFbGVtZW50IS5oZWlnaHQgPSBtZWRpYUNhbnZhcy5oZWlnaHQ7XG5cbiAgICBjb25zdCBkcmF3Q29tYmluZWQgPSAoKSA9PiB7XG4gICAgICBjdHghLmNsZWFyUmVjdCgwLCAwLCBjYW52YXNFbGVtZW50IS53aWR0aCwgY2FudmFzRWxlbWVudCEuaGVpZ2h0KTtcbiAgICAgIGN0eCEuZHJhd0ltYWdlKHNjcmVlblZpZGVvLCAwLCAwLCBjYW52YXNFbGVtZW50IS53aWR0aCwgY2FudmFzRWxlbWVudCEuaGVpZ2h0KTtcbiAgICAgIGN0eCEuZHJhd0ltYWdlKGNhbnZhc0VsZW1lbnQhLCAwLCAwLCBjYW52YXNFbGVtZW50IS53aWR0aCwgY2FudmFzRWxlbWVudCEuaGVpZ2h0KTtcbiAgICAgIGN0eCEucmVzdG9yZSgpO1xuICAgIH07XG4gIH07XG5cbiAgaGFuZGxlU2NyZWVuVHJhbnNwb3J0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmIChcbiAgICAgIHRoaXMucGFyYW1ldGVycy5sb2NhbFN0cmVhbVNjcmVlbiEuZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGggPiAwICYmXG4gICAgICB0aGlzLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1TY3JlZW4hLmdldFZpZGVvVHJhY2tzKClbMF0uaWQgPT09XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5zY3JlZW5Qcm9kdWNlcj8udHJhY2shLmlkXG4gICAgKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuICYmXG4gICAgICAgIHRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKCkubGVuZ3RoID4gMCAmJlxuICAgICAgICB0aGlzLmNsb25lZFN0cmVhbVNjcmVlbi5nZXRWaWRlb1RyYWNrcygpWzBdLnJlYWR5U3RhdGUgPT09ICdlbmRlZCdcbiAgICAgICkge1xuICAgICAgICB0aGlzLmNsb25lZFN0cmVhbVNjcmVlbi5yZW1vdmVUcmFjayh0aGlzLmNsb25lZFN0cmVhbVNjcmVlbi5nZXRWaWRlb1RyYWNrcygpWzBdKTtcbiAgICAgICAgdGhpcy5jbG9uZWRTdHJlYW1TY3JlZW4uYWRkVHJhY2soXG4gICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuIS5nZXRWaWRlb1RyYWNrcygpWzBdLmNsb25lKCksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1TY3JlZW4hLnJlbW92ZVRyYWNrKFxuICAgICAgICB0aGlzLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1TY3JlZW4hLmdldFZpZGVvVHJhY2tzKClbMF0sXG4gICAgICApO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuIS5hZGRUcmFjayhcbiAgICAgICAgdGhpcy5jbG9uZWRTdHJlYW1TY3JlZW4hLmdldFZpZGVvVHJhY2tzKClbMF0uY2xvbmUoKSxcbiAgICAgICk7XG4gICAgfVxuICAgIGF3YWl0IHRoaXMucGFyYW1ldGVycy5kaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbih7IHBhcmFtZXRlcnM6IHRoaXMucGFyYW1ldGVycyB9KTtcbiAgfTtcblxuICBzdG9wQW5ub3RhdGlvbiA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAodGhpcy5hbm5vdGF0aW9uSW50ZXJ2YWwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5hbm5vdGF0aW9uSW50ZXJ2YWwpO1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmFubm90YXRpb25DaGVja0ludGVydmFsKTtcbiAgICAgIHRoaXMuYW5ub3RhdGlvbkludGVydmFsID0gbnVsbDtcbiAgICAgIHRoaXMuYW5ub3RhdGlvbkNoZWNrSW50ZXJ2YWwgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhcmFtZXRlcnMucHJvY2Vzc2VkU2NyZWVuU3RyZWFtKSB7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMucHJvY2Vzc2VkU2NyZWVuU3RyZWFtXG4gICAgICAgIC5nZXRUcmFja3MoKVxuICAgICAgICAuZm9yRWFjaCgodHJhY2s6IE1lZGlhU3RyZWFtVHJhY2spID0+IHRyYWNrLnN0b3AoKSk7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMucHJvY2Vzc2VkU2NyZWVuU3RyZWFtID0gbnVsbDtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVQcm9jZXNzZWRTY3JlZW5TdHJlYW0obnVsbCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGFyYW1ldGVycy5tYWluU2NyZWVuQ2FudmFzKSB7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMubWFpblNjcmVlbkNhbnZhc1xuICAgICAgICA/LmdldENvbnRleHQoJzJkJykhXG4gICAgICAgIC5jbGVhclJlY3QoXG4gICAgICAgICAgMCxcbiAgICAgICAgICAwLFxuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5tYWluU2NyZWVuQ2FudmFzLndpZHRoLFxuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5tYWluU2NyZWVuQ2FudmFzLmhlaWdodCxcbiAgICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgc3RvcEFsbFRyYWNrcyA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1TY3JlZW4gJiZcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKCkubGVuZ3RoID4gMFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5sb2NhbFN0cmVhbVNjcmVlblxuICAgICAgICAgIC5nZXRWaWRlb1RyYWNrcygpXG4gICAgICAgICAgLmZvckVhY2goKHRyYWNrOiBNZWRpYVN0cmVhbVRyYWNrKSA9PiB0cmFjay5zdG9wKCkpO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlTG9jYWxTdHJlYW1TY3JlZW4obnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlTG9jYWxTdHJlYW1TY3JlZW4obnVsbCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuICYmIHRoaXMuY2xvbmVkU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKCkubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmNsb25lZFN0cmVhbVNjcmVlbi5nZXRWaWRlb1RyYWNrcygpLmZvckVhY2goKHRyYWNrKSA9PiB0cmFjay5zdG9wKCkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMucHJvY2Vzc2VkU2NyZWVuU3RyZWFtKSB7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5wcm9jZXNzZWRTY3JlZW5TdHJlYW1cbiAgICAgICAgICAuZ2V0VHJhY2tzKClcbiAgICAgICAgICAuZm9yRWFjaCgodHJhY2s6IE1lZGlhU3RyZWFtVHJhY2spID0+IHRyYWNrLnN0b3AoKSk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVQcm9jZXNzZWRTY3JlZW5TdHJlYW0obnVsbCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICB9XG5cbiAgICB0aGlzLmNsb25lZFN0cmVhbVNjcmVlbiA9IG51bGw7XG4gIH07XG59XG4iLCI8ZGl2ICpuZ0lmPVwiaXNWaXNpYmxlXCIgY2xhc3M9XCJtb2RhbC1jb250YWluZXJcIj5cclxuICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtdGl0bGVcIj5TY3JlZW4gQW5ub3RhdGlvbjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY2xvc2VcIiAoY2xpY2spPVwiaGlkZU1vZGFsKClcIj5cclxuICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVRpbWVzXCI+PC9mYS1pY29uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGhyIC8+XHJcbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxyXG4gICAgICA8dmlkZW8gI3NjcmVlblZpZGVvIGlkPVwic2NyZWVuVmlkZW9cIiBjbGFzcz1cImQtbm9uZVwiIGF1dG9wbGF5PjwvdmlkZW8+XHJcbiAgICAgIDxjYW52YXMgI3NjcmVlbkNhbnZhcyBpZD1cInNjcmVlbkNhbnZhc1wiPjwvY2FudmFzPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=