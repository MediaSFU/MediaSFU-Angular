import { Component, Input, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash, } from '@fortawesome/free-solid-svg-icons';
import { CardVideoDisplay } from '../card-video-display/card-video-display.component';
import { getOverlayPosition } from '../../../methods/utils/get-overlay-position.util';
import * as i0 from "@angular/core";
import * as i1 from "../../../consumers/control-media.service";
import * as i2 from "@angular/common";
import * as i3 from "@fortawesome/angular-fontawesome";
/**
 * VideoCard component represents a customizable video display card with participant controls for toggling audio and video.
 * It also animates an audio waveform if sound is detected in the participant's audio stream.
 *
 * @selector app-video-card
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule, CardVideoDisplay]
 *
 * @example
 * ```html
 * <app-video-card
 *   [name]="participant.name"
 *   [videoStream]="videoStream"
 *   [audioDecibels]="audioDecibels"
 *   [participant]="participant"
 *   [parameters]="videoCardParameters"
 * ></app-video-card>
 * ```
 *
 * @input {Partial<CSSStyleDeclaration>} customStyle - Styles for the card container.
 * @input {string} name - Name of the participant displayed on the card.
 * @input {string} barColor - Color of the waveform bars. Default is 'red'.
 * @input {string} textColor - Color of the name text. Default is 'white'.
 * @input {string} imageSource - Source URL of the participant's image.
 * @input {boolean} roundedImage - Whether the image should have rounded corners.
 * @input {Partial<CSSStyleDeclaration>} imageStyle - Additional styles for the image.
 * @input {string} remoteProducerId - ID of the remote media producer.
 * @input {EventType} eventType - Type of event (used for internal logic).
 * @input {boolean} forceFullDisplay - Forces full display if true.
 * @input {MediaStream | null} videoStream - Stream of the video to be displayed.
 * @input {boolean} showControls - Determines if the controls are displayed. Default is true.
 * @input {boolean} showInfo - Determines if info (e.g., participant name) is shown. Default is true.
 * @input {HTMLElement | CustomComponent} videoInfoComponent - Custom component for video info display.
 * @input {HTMLElement | CustomComponent} videoControlsComponent - Custom component for video controls.
 * @input {'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'} controlsPosition - Position of controls overlay.
 * @input {'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'} infoPosition - Position of info overlay.
 * @input {Participant} participant - Participant data object.
 * @input {string} backgroundColor - Background color of the video card.
 * @input {AudioDecibels[]} audioDecibels - Audio decibel data for animating waveform.
 * @input {boolean} doMirror - If true, mirrors the video display.
 * @input {VideoCardParameters} parameters - Additional parameters including socket and alert configuration.
 *
 * @property {number[]} waveformAnimations - Array representing animation states for waveform bars.
 * @property {boolean} showWaveform - Flag to toggle waveform animation. Default is true.
 * @property {any} interval - Interval reference for audio decibel checks.
 * @property {IconDefinition} faMicrophone - FontAwesome icon for microphone.
 * @property {IconDefinition} faMicrophoneSlash - FontAwesome icon for muted microphone.
 * @property {IconDefinition} faVideo - FontAwesome icon for video.
 * @property {IconDefinition} faVideoSlash - FontAwesome icon for video off.
 *
 * @method ngOnInit - Lifecycle hook to initialize audio decibel interval check.
 * @method ngOnDestroy - Lifecycle hook to clear intervals.
 * @method animateWaveform - Starts audio waveform animation.
 * @method resetWaveform - Resets waveform animations.
 * @method getAnimationDuration - Returns animation duration for given bar index.
 * @method toggleAudio - Toggles participant's audio status.
 * @method toggleVideo - Toggles participant's video status.
 * @method renderControls - Renders the control buttons (audio and video) based on participant status.
 * @method getOverlayPosition - Returns overlay position styles based on the input position string.
 * @method isCustomComponent - Checks if a component is a custom component.
 * @method isFunctionComponent - Checks if a component is a function component.
 */
export class VideoCard {
    controlMediaService;
    customStyle = {};
    name;
    barColor = 'red';
    textColor = 'white';
    imageSource;
    roundedImage = false;
    imageStyle = {};
    remoteProducerId;
    eventType;
    forceFullDisplay;
    videoStream = null;
    showControls = true;
    showInfo = true;
    videoInfoComponent;
    videoControlsComponent;
    controlsPosition = 'topLeft';
    infoPosition = 'topRight';
    participant;
    backgroundColor;
    audioDecibels = [];
    doMirror;
    parameters;
    waveformAnimations = Array.from({ length: 9 }, () => 0);
    showWaveform = true;
    interval;
    faMicrophone = faMicrophone;
    faMicrophoneSlash = faMicrophoneSlash;
    faVideo = faVideo;
    faVideoSlash = faVideoSlash;
    constructor(controlMediaService, injectedCustomStyle, injectedName, injectedBarColor, injectedTextColor, injectedImageSource, injectedRoundedImage, injectedImageStyle, injectedRemoteProducerId, injectedEventType, injectedForceFullDisplay, injectedVideoStream, injectedShowControls, injectedShowInfo, injectedVideoInfoComponent, injectedVideoControlsComponent, injectedControlsPosition, injectedInfoPosition, injectedParticipant, injectedBackgroundColor, injectedAudioDecibels, injectedDoMirror, injectedParameters) {
        this.controlMediaService = controlMediaService;
        this.customStyle = injectedCustomStyle || this.customStyle;
        this.name = injectedName || this.name;
        this.barColor = injectedBarColor || this.barColor;
        this.textColor = injectedTextColor || this.textColor;
        this.imageSource = injectedImageSource || this.imageSource;
        this.roundedImage = injectedRoundedImage || this.roundedImage;
        this.imageStyle = injectedImageStyle || this.imageStyle;
        this.remoteProducerId = injectedRemoteProducerId || this.remoteProducerId;
        this.eventType = injectedEventType || this.eventType;
        this.forceFullDisplay = injectedForceFullDisplay || this.forceFullDisplay;
        this.videoStream = injectedVideoStream || this.videoStream;
        this.showControls = injectedShowControls != null ? injectedShowControls : this.showControls;
        this.showInfo = injectedShowInfo != null ? injectedShowInfo : this.showInfo;
        this.videoInfoComponent = injectedVideoInfoComponent || this.videoInfoComponent;
        this.videoControlsComponent = injectedVideoControlsComponent || this.videoControlsComponent;
        this.controlsPosition = injectedControlsPosition || this.controlsPosition;
        this.infoPosition = injectedInfoPosition || this.infoPosition;
        this.participant = injectedParticipant || this.participant;
        this.backgroundColor = injectedBackgroundColor || this.backgroundColor;
        this.audioDecibels = injectedAudioDecibels || this.audioDecibels;
        this.doMirror = injectedDoMirror || this.doMirror;
        this.parameters = injectedParameters || this.parameters;
    }
    ngOnInit() {
        this.interval = setInterval(() => {
            const params = this.parameters.getUpdatedAllParams();
            const { audioDecibels, participants } = params;
            const existingEntry = audioDecibels && audioDecibels.find((entry) => entry.name === this.name);
            const participantEntry = participants && participants.find((p) => p.name === this.name);
            if (existingEntry &&
                existingEntry.averageLoudness > 127.5 &&
                participantEntry &&
                !participantEntry.muted) {
                this.animateWaveform();
            }
            else {
                this.resetWaveform();
            }
        }, 1000);
    }
    ngOnDestroy() {
        clearInterval(this.interval);
    }
    animateWaveform() {
        this.waveformAnimations.forEach((_, index) => {
            setInterval(() => this.animateBar(index), this.getAnimationDuration(index) * 2);
        });
    }
    animateBar(index) {
        this.waveformAnimations[index] = 1;
        setTimeout(() => {
            this.waveformAnimations[index] = 0;
        }, this.getAnimationDuration(index));
    }
    resetWaveform() {
        this.waveformAnimations.fill(0);
    }
    getAnimationDuration(index) {
        const durations = [474, 433, 407, 458, 400, 427, 441, 419, 487];
        return durations[index] || 0;
    }
    async toggleAudio() {
        if (this.participant && !this.participant.muted) {
            const params = this.parameters;
            await this.controlMediaService.controlMedia({
                participantId: this.participant.id || '',
                participantName: this.participant.name,
                type: 'audio',
                socket: params.socket,
                roomName: params.roomName,
                coHostResponsibility: params.coHostResponsibility,
                showAlert: params.showAlert,
                coHost: params.coHost,
                participants: params.participants,
                member: params.member,
                islevel: params.islevel,
            });
        }
    }
    async toggleVideo() {
        if (this.participant) {
            const params = this.parameters.getUpdatedAllParams();
            await this.controlMediaService.controlMedia({
                participantId: this.participant.id || '',
                participantName: this.participant.name,
                type: 'video',
                socket: params.socket,
                roomName: params.roomName,
                coHostResponsibility: params.coHostResponsibility,
                showAlert: params.showAlert,
                coHost: params.coHost,
                participants: params.participants,
                member: params.member,
                islevel: params.islevel,
            });
        }
    }
    renderControls() {
        if (!this.showControls) {
            return null;
        }
        if (this.videoControlsComponent) {
            return this.videoControlsComponent;
        }
        return `
      <div class="overlayControls">
        <button class="controlButton" (click)="toggleAudio()">
          <fa-icon [icon]="participant?.muted ? faMicrophoneSlash : faMicrophone" [style.color]="participant?.muted ? 'red' : 'green'"></fa-icon>
        </button>
        <button class="controlButton" (click)="toggleVideo()">
          <fa-icon [icon]="participant?.videoOn ? faVideo : faVideoSlash" [style.color]="participant?.videoOn ? 'green' : 'red'"></fa-icon>
        </button>
      </div>
    `;
    }
    getOverlayPosition(position) {
        return getOverlayPosition({ position });
    }
    isCustomComponent(comp) {
        return (typeof comp.component !== 'function' &&
            comp.component !== undefined);
    }
    isFunctionComponent(comp) {
        return typeof comp === 'function';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: VideoCard, deps: [{ token: i1.ControlMedia }, { token: 'customStyle', optional: true }, { token: 'name', optional: true }, { token: 'barColor', optional: true }, { token: 'textColor', optional: true }, { token: 'imageSource', optional: true }, { token: 'roundedImage', optional: true }, { token: 'imageStyle', optional: true }, { token: 'remoteProducerId', optional: true }, { token: 'eventType', optional: true }, { token: 'forceFullDisplay', optional: true }, { token: 'videoStream', optional: true }, { token: 'showControls', optional: true }, { token: 'showInfo', optional: true }, { token: 'videoInfoComponent', optional: true }, { token: 'videoControlsComponent', optional: true }, { token: 'controlsPosition', optional: true }, { token: 'infoPosition', optional: true }, { token: 'participant', optional: true }, { token: 'backgroundColor', optional: true }, { token: 'audioDecibels', optional: true }, { token: 'doMirror', optional: true }, { token: 'parameters', optional: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: VideoCard, isStandalone: true, selector: "app-video-card", inputs: { customStyle: "customStyle", name: "name", barColor: "barColor", textColor: "textColor", imageSource: "imageSource", roundedImage: "roundedImage", imageStyle: "imageStyle", remoteProducerId: "remoteProducerId", eventType: "eventType", forceFullDisplay: "forceFullDisplay", videoStream: "videoStream", showControls: "showControls", showInfo: "showInfo", videoInfoComponent: "videoInfoComponent", videoControlsComponent: "videoControlsComponent", controlsPosition: "controlsPosition", infoPosition: "infoPosition", participant: "participant", backgroundColor: "backgroundColor", audioDecibels: "audioDecibels", doMirror: "doMirror", parameters: "parameters" }, ngImport: i0, template: "<div\r\n  [ngStyle]=\"customStyle\"\r\n  [style.backgroundColor]=\"backgroundColor\"\r\n  class=\"video-card\"\r\n>\r\n  <app-card-video-display\r\n    [remoteProducerId]=\"remoteProducerId\"\r\n    [eventType]=\"eventType\"\r\n    [forceFullDisplay]=\"forceFullDisplay\"\r\n    [videoStream]=\"videoStream\"\r\n    [backgroundColor]=\"backgroundColor\"\r\n    [doMirror]=\"doMirror\"\r\n  ></app-card-video-display>\r\n\r\n  <div\r\n    *ngIf=\"showInfo\"\r\n    [ngClass]=\"showControls ? 'overlayWeb' : 'overlayWebAlt'\"\r\n    [ngStyle]=\"getOverlayPosition(infoPosition)\"\r\n  >\r\n    <div class=\"nameColumn\">\r\n      <span class=\"nameText\" [style.color]=\"textColor\">{{\r\n        participant.name\r\n      }}</span>\r\n    </div>\r\n    <div *ngIf=\"showWaveform\" class=\"waveformWeb\">\r\n      <div\r\n        *ngFor=\"let animation of waveformAnimations; let i = index\"\r\n        class=\"bar\"\r\n        [ngStyle]=\"{\r\n          height: animation === 0 ? '1px' : '16px',\r\n          backgroundColor: barColor\r\n        }\"\r\n      ></div>\r\n    </div>\r\n  </div>\r\n\r\n  <div\r\n    *ngIf=\"showControls\"\r\n    class=\"overlayControls\"\r\n    [ngStyle]=\"getOverlayPosition(controlsPosition)\"\r\n  >\r\n    <ng-container *ngIf=\"!videoControlsComponent\">\r\n      <div class=\"overlayControls\">\r\n        <button class=\"controlButton\" (click)=\"toggleAudio()\">\r\n          <fa-icon\r\n            [icon]=\"participant.muted ? faMicrophoneSlash : faMicrophone\"\r\n            [style.color]=\"participant.muted ? 'red' : 'green'\"\r\n          ></fa-icon>\r\n        </button>\r\n        <button class=\"controlButton\" (click)=\"toggleVideo()\">\r\n          <fa-icon\r\n            [icon]=\"participant['videoOn'] ? faVideo : faVideoSlash\"\r\n            [style.color]=\"participant['videoOn'] ? 'green' : 'red'\"\r\n          ></fa-icon>\r\n        </button>\r\n      </div>\r\n    </ng-container>\r\n    <ng-container *ngIf=\"videoControlsComponent\">\r\n      <ng-container *ngIf=\"isCustomComponent(videoControlsComponent)\">\r\n        <ng-container\r\n          *ngComponentOutlet=\"\r\n            videoControlsComponent.component;\r\n            injector: videoControlsComponent.injector\r\n          \"\r\n        ></ng-container>\r\n      </ng-container>\r\n      <ng-container *ngIf=\"!isCustomComponent(videoControlsComponent)\">\r\n        <div [innerHTML]=\"videoControlsComponent.outerHTML\"></div>\r\n      </ng-container>\r\n    </ng-container>\r\n  </div>\r\n</div>\r\n", styles: [".video-card{width:100%;height:100%;margin:0;padding:0;background-color:#2c678f;border:2px solid black;position:relative}.overlayWeb{position:absolute;min-width:40%;min-height:5%;max-height:100%;display:grid;grid-template-columns:4fr 2fr;grid-gap:3px}.overlayWebAlt{position:absolute;min-width:50%;min-height:5%;max-height:100%;display:grid;grid-template-columns:4fr;grid-gap:0px;top:0;right:0}.overlayControls{display:flex;flex-direction:row;padding:0;position:absolute;top:0;left:0}.controlButton{justify-content:center;align-items:center;background-color:#0003;padding:2px 4px;margin-right:2px;font-size:medium;border:none;cursor:pointer}.nameColumn{justify-content:center;align-items:center;background-color:#00000080;padding:5px;margin-right:2px;font-size:small;text-align:center}.nameText{font-size:small;font-weight:bolder}.waveformWeb{display:flex;justify-content:left;align-items:center;background-color:#0000000d;padding:0;flex-direction:row}.bar{flex:1;opacity:.35;margin:0 1px;transition:height .5s ease}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i3.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }, { kind: "component", type: CardVideoDisplay, selector: "app-card-video-display", inputs: ["remoteProducerId", "eventType", "forceFullDisplay", "videoStream", "backgroundColor", "doMirror"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: VideoCard, decorators: [{
            type: Component,
            args: [{ selector: 'app-video-card', standalone: true, imports: [CommonModule, FontAwesomeModule, CardVideoDisplay], template: "<div\r\n  [ngStyle]=\"customStyle\"\r\n  [style.backgroundColor]=\"backgroundColor\"\r\n  class=\"video-card\"\r\n>\r\n  <app-card-video-display\r\n    [remoteProducerId]=\"remoteProducerId\"\r\n    [eventType]=\"eventType\"\r\n    [forceFullDisplay]=\"forceFullDisplay\"\r\n    [videoStream]=\"videoStream\"\r\n    [backgroundColor]=\"backgroundColor\"\r\n    [doMirror]=\"doMirror\"\r\n  ></app-card-video-display>\r\n\r\n  <div\r\n    *ngIf=\"showInfo\"\r\n    [ngClass]=\"showControls ? 'overlayWeb' : 'overlayWebAlt'\"\r\n    [ngStyle]=\"getOverlayPosition(infoPosition)\"\r\n  >\r\n    <div class=\"nameColumn\">\r\n      <span class=\"nameText\" [style.color]=\"textColor\">{{\r\n        participant.name\r\n      }}</span>\r\n    </div>\r\n    <div *ngIf=\"showWaveform\" class=\"waveformWeb\">\r\n      <div\r\n        *ngFor=\"let animation of waveformAnimations; let i = index\"\r\n        class=\"bar\"\r\n        [ngStyle]=\"{\r\n          height: animation === 0 ? '1px' : '16px',\r\n          backgroundColor: barColor\r\n        }\"\r\n      ></div>\r\n    </div>\r\n  </div>\r\n\r\n  <div\r\n    *ngIf=\"showControls\"\r\n    class=\"overlayControls\"\r\n    [ngStyle]=\"getOverlayPosition(controlsPosition)\"\r\n  >\r\n    <ng-container *ngIf=\"!videoControlsComponent\">\r\n      <div class=\"overlayControls\">\r\n        <button class=\"controlButton\" (click)=\"toggleAudio()\">\r\n          <fa-icon\r\n            [icon]=\"participant.muted ? faMicrophoneSlash : faMicrophone\"\r\n            [style.color]=\"participant.muted ? 'red' : 'green'\"\r\n          ></fa-icon>\r\n        </button>\r\n        <button class=\"controlButton\" (click)=\"toggleVideo()\">\r\n          <fa-icon\r\n            [icon]=\"participant['videoOn'] ? faVideo : faVideoSlash\"\r\n            [style.color]=\"participant['videoOn'] ? 'green' : 'red'\"\r\n          ></fa-icon>\r\n        </button>\r\n      </div>\r\n    </ng-container>\r\n    <ng-container *ngIf=\"videoControlsComponent\">\r\n      <ng-container *ngIf=\"isCustomComponent(videoControlsComponent)\">\r\n        <ng-container\r\n          *ngComponentOutlet=\"\r\n            videoControlsComponent.component;\r\n            injector: videoControlsComponent.injector\r\n          \"\r\n        ></ng-container>\r\n      </ng-container>\r\n      <ng-container *ngIf=\"!isCustomComponent(videoControlsComponent)\">\r\n        <div [innerHTML]=\"videoControlsComponent.outerHTML\"></div>\r\n      </ng-container>\r\n    </ng-container>\r\n  </div>\r\n</div>\r\n", styles: [".video-card{width:100%;height:100%;margin:0;padding:0;background-color:#2c678f;border:2px solid black;position:relative}.overlayWeb{position:absolute;min-width:40%;min-height:5%;max-height:100%;display:grid;grid-template-columns:4fr 2fr;grid-gap:3px}.overlayWebAlt{position:absolute;min-width:50%;min-height:5%;max-height:100%;display:grid;grid-template-columns:4fr;grid-gap:0px;top:0;right:0}.overlayControls{display:flex;flex-direction:row;padding:0;position:absolute;top:0;left:0}.controlButton{justify-content:center;align-items:center;background-color:#0003;padding:2px 4px;margin-right:2px;font-size:medium;border:none;cursor:pointer}.nameColumn{justify-content:center;align-items:center;background-color:#00000080;padding:5px;margin-right:2px;font-size:small;text-align:center}.nameText{font-size:small;font-weight:bolder}.waveformWeb{display:flex;justify-content:left;align-items:center;background-color:#0000000d;padding:0;flex-direction:row}.bar{flex:1;opacity:.35;margin:0 1px;transition:height .5s ease}\n"] }]
        }], ctorParameters: () => [{ type: i1.ControlMedia }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['customStyle']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['name']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['barColor']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['textColor']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['imageSource']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['roundedImage']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['imageStyle']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['remoteProducerId']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['eventType']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['forceFullDisplay']
                }] }, { type: MediaStream, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['videoStream']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['showControls']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['showInfo']
                }] }, { type: HTMLElement, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['videoInfoComponent']
                }] }, { type: HTMLElement, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['videoControlsComponent']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['controlsPosition']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['infoPosition']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['participant']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['backgroundColor']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['audioDecibels']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['doMirror']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['parameters']
                }] }], propDecorators: { customStyle: [{
                type: Input
            }], name: [{
                type: Input
            }], barColor: [{
                type: Input
            }], textColor: [{
                type: Input
            }], imageSource: [{
                type: Input
            }], roundedImage: [{
                type: Input
            }], imageStyle: [{
                type: Input
            }], remoteProducerId: [{
                type: Input
            }], eventType: [{
                type: Input
            }], forceFullDisplay: [{
                type: Input
            }], videoStream: [{
                type: Input
            }], showControls: [{
                type: Input
            }], showInfo: [{
                type: Input
            }], videoInfoComponent: [{
                type: Input
            }], videoControlsComponent: [{
                type: Input
            }], controlsPosition: [{
                type: Input
            }], infoPosition: [{
                type: Input
            }], participant: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], audioDecibels: [{
                type: Input
            }], doMirror: [{
                type: Input
            }], parameters: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvdmlkZW8tY2FyZC92aWRlby1jYXJkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy92aWRlby1jYXJkL3ZpZGVvLWNhcmQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFDTCxZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLE9BQU8sRUFDUCxZQUFZLEdBQ2IsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUN0RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQzs7Ozs7QUF1RHRGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkRHO0FBVUgsTUFBTSxPQUFPLFNBQVM7SUFrQ1Y7SUFqQ0QsV0FBVyxHQUFpQyxFQUFFLENBQUM7SUFDL0MsSUFBSSxDQUFVO0lBQ2QsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUNqQixTQUFTLEdBQUcsT0FBTyxDQUFDO0lBQ3BCLFdBQVcsQ0FBVTtJQUNyQixZQUFZLEdBQUcsS0FB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bmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9udEF3ZXNvbWVNb2R1bGUgfSBmcm9tICdAZm9ydGF3ZXNvbWUvYW5ndWxhci1mb250YXdlc29tZSc7XG5pbXBvcnQge1xuICBmYU1pY3JvcGhvbmUsXG4gIGZhTWljcm9waG9uZVNsYXNoLFxuICBmYVZpZGVvLFxuICBmYVZpZGVvU2xhc2gsXG59IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XG5pbXBvcnQgeyBDYXJkVmlkZW9EaXNwbGF5IH0gZnJvbSAnLi4vY2FyZC12aWRlby1kaXNwbGF5L2NhcmQtdmlkZW8tZGlzcGxheS5jb21wb25lbnQnO1xuaW1wb3J0IHsgZ2V0T3ZlcmxheVBvc2l0aW9uIH0gZnJvbSAnLi4vLi4vLi4vbWV0aG9kcy91dGlscy9nZXQtb3ZlcmxheS1wb3NpdGlvbi51dGlsJztcbmltcG9ydCB7IENvbnRyb2xNZWRpYSB9IGZyb20gJy4uLy4uLy4uL2NvbnN1bWVycy9jb250cm9sLW1lZGlhLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgUGFydGljaXBhbnQsXG4gIEF1ZGlvRGVjaWJlbHMsXG4gIENvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICBTaG93QWxlcnQsXG4gIEV2ZW50VHlwZSxcbiAgQ3VzdG9tQ29tcG9uZW50LFxufSBmcm9tICcuLi8uLi8uLi9AdHlwZXMvdHlwZXMnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmlkZW9DYXJkUGFyYW1ldGVycyB7XG4gIHNvY2tldDogU29ja2V0O1xuICByb29tTmFtZTogc3RyaW5nO1xuICBjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXTtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICBjb0hvc3Q6IHN0cmluZztcbiAgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICBtZW1iZXI6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBhdWRpb0RlY2liZWxzOiBBdWRpb0RlY2liZWxzW107XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFZpZGVvQ2FyZFBhcmFtZXRlcnM7XG4gIC8vIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBWaWRlb0NhcmRPcHRpb25zIHtcbiAgY3VzdG9tU3R5bGU/OiBQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+O1xuICBuYW1lOiBzdHJpbmc7XG4gIGJhckNvbG9yPzogc3RyaW5nO1xuICB0ZXh0Q29sb3I/OiBzdHJpbmc7XG4gIGltYWdlU291cmNlOiBzdHJpbmc7XG4gIHJvdW5kZWRJbWFnZT86IGJvb2xlYW47XG4gIGltYWdlU3R5bGU/OiBQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+O1xuICByZW1vdGVQcm9kdWNlcklkOiBzdHJpbmc7XG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlO1xuICBmb3JjZUZ1bGxEaXNwbGF5PzogYm9vbGVhbjtcbiAgdmlkZW9TdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgc2hvd0NvbnRyb2xzPzogYm9vbGVhbjtcbiAgc2hvd0luZm8/OiBib29sZWFuO1xuICB2aWRlb0luZm9Db21wb25lbnQ/OiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudDtcbiAgdmlkZW9Db250cm9sc0NvbXBvbmVudD86IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50O1xuICBjb250cm9sc1Bvc2l0aW9uPzogJ3RvcExlZnQnIHwgJ3RvcFJpZ2h0JyB8ICdib3R0b21MZWZ0JyB8ICdib3R0b21SaWdodCc7XG4gIGluZm9Qb3NpdGlvbj86ICd0b3BMZWZ0JyB8ICd0b3BSaWdodCcgfCAnYm90dG9tTGVmdCcgfCAnYm90dG9tUmlnaHQnO1xuICBwYXJ0aWNpcGFudDogUGFydGljaXBhbnQ7XG4gIGJhY2tncm91bmRDb2xvcjogc3RyaW5nO1xuICBhdWRpb0RlY2liZWxzOiBBdWRpb0RlY2liZWxzW107XG4gIGRvTWlycm9yPzogYm9vbGVhbjtcbiAgcGFyYW1ldGVyczogVmlkZW9DYXJkUGFyYW1ldGVycztcbn1cblxuZXhwb3J0IHR5cGUgVmlkZW9DYXJkVHlwZSA9IChvcHRpb25zOiBWaWRlb0NhcmRPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuLyoqXG4gKiBWaWRlb0NhcmQgY29tcG9uZW50IHJlcHJlc2VudHMgYSBjdXN0b21pemFibGUgdmlkZW8gZGlzcGxheSBjYXJkIHdpdGggcGFydGljaXBhbnQgY29udHJvbHMgZm9yIHRvZ2dsaW5nIGF1ZGlvIGFuZCB2aWRlby5cbiAqIEl0IGFsc28gYW5pbWF0ZXMgYW4gYXVkaW8gd2F2ZWZvcm0gaWYgc291bmQgaXMgZGV0ZWN0ZWQgaW4gdGhlIHBhcnRpY2lwYW50J3MgYXVkaW8gc3RyZWFtLlxuICpcbiAqIEBzZWxlY3RvciBhcHAtdmlkZW8tY2FyZFxuICogQHN0YW5kYWxvbmUgdHJ1ZVxuICogQGltcG9ydHMgW0NvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGUsIENhcmRWaWRlb0Rpc3BsYXldXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGh0bWxcbiAqIDxhcHAtdmlkZW8tY2FyZFxuICogICBbbmFtZV09XCJwYXJ0aWNpcGFudC5uYW1lXCJcbiAqICAgW3ZpZGVvU3RyZWFtXT1cInZpZGVvU3RyZWFtXCJcbiAqICAgW2F1ZGlvRGVjaWJlbHNdPVwiYXVkaW9EZWNpYmVsc1wiXG4gKiAgIFtwYXJ0aWNpcGFudF09XCJwYXJ0aWNpcGFudFwiXG4gKiAgIFtwYXJhbWV0ZXJzXT1cInZpZGVvQ2FyZFBhcmFtZXRlcnNcIlxuICogPjwvYXBwLXZpZGVvLWNhcmQ+XG4gKiBgYGBcbiAqXG4gKiBAaW5wdXQge1BhcnRpYWw8Q1NTU3R5bGVEZWNsYXJhdGlvbj59IGN1c3RvbVN0eWxlIC0gU3R5bGVzIGZvciB0aGUgY2FyZCBjb250YWluZXIuXG4gKiBAaW5wdXQge3N0cmluZ30gbmFtZSAtIE5hbWUgb2YgdGhlIHBhcnRpY2lwYW50IGRpc3BsYXllZCBvbiB0aGUgY2FyZC5cbiAqIEBpbnB1dCB7c3RyaW5nfSBiYXJDb2xvciAtIENvbG9yIG9mIHRoZSB3YXZlZm9ybSBiYXJzLiBEZWZhdWx0IGlzICdyZWQnLlxuICogQGlucHV0IHtzdHJpbmd9IHRleHRDb2xvciAtIENvbG9yIG9mIHRoZSBuYW1lIHRleHQuIERlZmF1bHQgaXMgJ3doaXRlJy5cbiAqIEBpbnB1dCB7c3RyaW5nfSBpbWFnZVNvdXJjZSAtIFNvdXJjZSBVUkwgb2YgdGhlIHBhcnRpY2lwYW50J3MgaW1hZ2UuXG4gKiBAaW5wdXQge2Jvb2xlYW59IHJvdW5kZWRJbWFnZSAtIFdoZXRoZXIgdGhlIGltYWdlIHNob3VsZCBoYXZlIHJvdW5kZWQgY29ybmVycy5cbiAqIEBpbnB1dCB7UGFydGlhbDxDU1NTdHlsZURlY2xhcmF0aW9uPn0gaW1hZ2VTdHlsZSAtIEFkZGl0aW9uYWwgc3R5bGVzIGZvciB0aGUgaW1hZ2UuXG4gKiBAaW5wdXQge3N0cmluZ30gcmVtb3RlUHJvZHVjZXJJZCAtIElEIG9mIHRoZSByZW1vdGUgbWVkaWEgcHJvZHVjZXIuXG4gKiBAaW5wdXQge0V2ZW50VHlwZX0gZXZlbnRUeXBlIC0gVHlwZSBvZiBldmVudCAodXNlZCBmb3IgaW50ZXJuYWwgbG9naWMpLlxuICogQGlucHV0IHtib29sZWFufSBmb3JjZUZ1bGxEaXNwbGF5IC0gRm9yY2VzIGZ1bGwgZGlzcGxheSBpZiB0cnVlLlxuICogQGlucHV0IHtNZWRpYVN0cmVhbSB8IG51bGx9IHZpZGVvU3RyZWFtIC0gU3RyZWFtIG9mIHRoZSB2aWRlbyB0byBiZSBkaXNwbGF5ZWQuXG4gKiBAaW5wdXQge2Jvb2xlYW59IHNob3dDb250cm9scyAtIERldGVybWluZXMgaWYgdGhlIGNvbnRyb2xzIGFyZSBkaXNwbGF5ZWQuIERlZmF1bHQgaXMgdHJ1ZS5cbiAqIEBpbnB1dCB7Ym9vbGVhbn0gc2hvd0luZm8gLSBEZXRlcm1pbmVzIGlmIGluZm8gKGUuZy4sIHBhcnRpY2lwYW50IG5hbWUpIGlzIHNob3duLiBEZWZhdWx0IGlzIHRydWUuXG4gKiBAaW5wdXQge0hUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50fSB2aWRlb0luZm9Db21wb25lbnQgLSBDdXN0b20gY29tcG9uZW50IGZvciB2aWRlbyBpbmZvIGRpc3BsYXkuXG4gKiBAaW5wdXQge0hUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50fSB2aWRlb0NvbnRyb2xzQ29tcG9uZW50IC0gQ3VzdG9tIGNvbXBvbmVudCBmb3IgdmlkZW8gY29udHJvbHMuXG4gKiBAaW5wdXQgeyd0b3BMZWZ0JyB8ICd0b3BSaWdodCcgfCAnYm90dG9tTGVmdCcgfCAnYm90dG9tUmlnaHQnfSBjb250cm9sc1Bvc2l0aW9uIC0gUG9zaXRpb24gb2YgY29udHJvbHMgb3ZlcmxheS5cbiAqIEBpbnB1dCB7J3RvcExlZnQnIHwgJ3RvcFJpZ2h0JyB8ICdib3R0b21MZWZ0JyB8ICdib3R0b21SaWdodCd9IGluZm9Qb3NpdGlvbiAtIFBvc2l0aW9uIG9mIGluZm8gb3ZlcmxheS5cbiAqIEBpbnB1dCB7UGFydGljaXBhbnR9IHBhcnRpY2lwYW50IC0gUGFydGljaXBhbnQgZGF0YSBvYmplY3QuXG4gKiBAaW5wdXQge3N0cmluZ30gYmFja2dyb3VuZENvbG9yIC0gQmFja2dyb3VuZCBjb2xvciBvZiB0aGUgdmlkZW8gY2FyZC5cbiAqIEBpbnB1dCB7QXVkaW9EZWNpYmVsc1tdfSBhdWRpb0RlY2liZWxzIC0gQXVkaW8gZGVjaWJlbCBkYXRhIGZvciBhbmltYXRpbmcgd2F2ZWZvcm0uXG4gKiBAaW5wdXQge2Jvb2xlYW59IGRvTWlycm9yIC0gSWYgdHJ1ZSwgbWlycm9ycyB0aGUgdmlkZW8gZGlzcGxheS5cbiAqIEBpbnB1dCB7VmlkZW9DYXJkUGFyYW1ldGVyc30gcGFyYW1ldGVycyAtIEFkZGl0aW9uYWwgcGFyYW1ldGVycyBpbmNsdWRpbmcgc29ja2V0IGFuZCBhbGVydCBjb25maWd1cmF0aW9uLlxuICpcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyW119IHdhdmVmb3JtQW5pbWF0aW9ucyAtIEFycmF5IHJlcHJlc2VudGluZyBhbmltYXRpb24gc3RhdGVzIGZvciB3YXZlZm9ybSBiYXJzLlxuICogQHByb3BlcnR5IHtib29sZWFufSBzaG93V2F2ZWZvcm0gLSBGbGFnIHRvIHRvZ2dsZSB3YXZlZm9ybSBhbmltYXRpb24uIERlZmF1bHQgaXMgdHJ1ZS5cbiAqIEBwcm9wZXJ0eSB7YW55fSBpbnRlcnZhbCAtIEludGVydmFsIHJlZmVyZW5jZSBmb3IgYXVkaW8gZGVjaWJlbCBjaGVja3MuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYU1pY3JvcGhvbmUgLSBGb250QXdlc29tZSBpY29uIGZvciBtaWNyb3Bob25lLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFNaWNyb3Bob25lU2xhc2ggLSBGb250QXdlc29tZSBpY29uIGZvciBtdXRlZCBtaWNyb3Bob25lLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFWaWRlbyAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHZpZGVvLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFWaWRlb1NsYXNoIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgdmlkZW8gb2ZmLlxuICpcbiAqIEBtZXRob2QgbmdPbkluaXQgLSBMaWZlY3ljbGUgaG9vayB0byBpbml0aWFsaXplIGF1ZGlvIGRlY2liZWwgaW50ZXJ2YWwgY2hlY2suXG4gKiBAbWV0aG9kIG5nT25EZXN0cm95IC0gTGlmZWN5Y2xlIGhvb2sgdG8gY2xlYXIgaW50ZXJ2YWxzLlxuICogQG1ldGhvZCBhbmltYXRlV2F2ZWZvcm0gLSBTdGFydHMgYXVkaW8gd2F2ZWZvcm0gYW5pbWF0aW9uLlxuICogQG1ldGhvZCByZXNldFdhdmVmb3JtIC0gUmVzZXRzIHdhdmVmb3JtIGFuaW1hdGlvbnMuXG4gKiBAbWV0aG9kIGdldEFuaW1hdGlvbkR1cmF0aW9uIC0gUmV0dXJucyBhbmltYXRpb24gZHVyYXRpb24gZm9yIGdpdmVuIGJhciBpbmRleC5cbiAqIEBtZXRob2QgdG9nZ2xlQXVkaW8gLSBUb2dnbGVzIHBhcnRpY2lwYW50J3MgYXVkaW8gc3RhdHVzLlxuICogQG1ldGhvZCB0b2dnbGVWaWRlbyAtIFRvZ2dsZXMgcGFydGljaXBhbnQncyB2aWRlbyBzdGF0dXMuXG4gKiBAbWV0aG9kIHJlbmRlckNvbnRyb2xzIC0gUmVuZGVycyB0aGUgY29udHJvbCBidXR0b25zIChhdWRpbyBhbmQgdmlkZW8pIGJhc2VkIG9uIHBhcnRpY2lwYW50IHN0YXR1cy5cbiAqIEBtZXRob2QgZ2V0T3ZlcmxheVBvc2l0aW9uIC0gUmV0dXJucyBvdmVybGF5IHBvc2l0aW9uIHN0eWxlcyBiYXNlZCBvbiB0aGUgaW5wdXQgcG9zaXRpb24gc3RyaW5nLlxuICogQG1ldGhvZCBpc0N1c3RvbUNvbXBvbmVudCAtIENoZWNrcyBpZiBhIGNvbXBvbmVudCBpcyBhIGN1c3RvbSBjb21wb25lbnQuXG4gKiBAbWV0aG9kIGlzRnVuY3Rpb25Db21wb25lbnQgLSBDaGVja3MgaWYgYSBjb21wb25lbnQgaXMgYSBmdW5jdGlvbiBjb21wb25lbnQuXG4gKi9cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtdmlkZW8tY2FyZCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlLCBDYXJkVmlkZW9EaXNwbGF5XSxcbiAgdGVtcGxhdGVVcmw6ICcuL3ZpZGVvLWNhcmQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi92aWRlby1jYXJkLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgVmlkZW9DYXJkIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBjdXN0b21TdHlsZTogUGFydGlhbDxDU1NTdHlsZURlY2xhcmF0aW9uPiA9IHt9O1xuICBASW5wdXQoKSBuYW1lITogc3RyaW5nO1xuICBASW5wdXQoKSBiYXJDb2xvciA9ICdyZWQnO1xuICBASW5wdXQoKSB0ZXh0Q29sb3IgPSAnd2hpdGUnO1xuICBASW5wdXQoKSBpbWFnZVNvdXJjZSE6IHN0cmluZztcbiAgQElucHV0KCkgcm91bmRlZEltYWdlID0gZmFsc2U7XG4gIEBJbnB1dCgpIGltYWdlU3R5bGU6IFBhcnRpYWw8Q1NTU3R5bGVEZWNsYXJhdGlvbj4gPSB7fTtcbiAgQElucHV0KCkgcmVtb3RlUHJvZHVjZXJJZCE6IHN0cmluZztcbiAgQElucHV0KCkgZXZlbnRUeXBlITogRXZlbnRUeXBlO1xuICBASW5wdXQoKSBmb3JjZUZ1bGxEaXNwbGF5ITogYm9vbGVhbjtcbiAgQElucHV0KCkgdmlkZW9TdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHNob3dDb250cm9scyA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dJbmZvID0gdHJ1ZTtcbiAgQElucHV0KCkgdmlkZW9JbmZvQ29tcG9uZW50PzogSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQ7XG4gIEBJbnB1dCgpIHZpZGVvQ29udHJvbHNDb21wb25lbnQ/OiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudDtcbiAgQElucHV0KCkgY29udHJvbHNQb3NpdGlvbjogJ3RvcExlZnQnIHwgJ3RvcFJpZ2h0JyB8ICdib3R0b21MZWZ0JyB8ICdib3R0b21SaWdodCcgPSAndG9wTGVmdCc7XG4gIEBJbnB1dCgpIGluZm9Qb3NpdGlvbjogJ3RvcExlZnQnIHwgJ3RvcFJpZ2h0JyB8ICdib3R0b21MZWZ0JyB8ICdib3R0b21SaWdodCcgPSAndG9wUmlnaHQnO1xuICBASW5wdXQoKSBwYXJ0aWNpcGFudCE6IFBhcnRpY2lwYW50O1xuICBASW5wdXQoKSBiYWNrZ3JvdW5kQ29sb3IhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGF1ZGlvRGVjaWJlbHM6IEF1ZGlvRGVjaWJlbHNbXSA9IFtdO1xuICBASW5wdXQoKSBkb01pcnJvciE6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHBhcmFtZXRlcnMhOiBWaWRlb0NhcmRQYXJhbWV0ZXJzO1xuXG4gIHdhdmVmb3JtQW5pbWF0aW9uczogbnVtYmVyW10gPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiA5IH0sICgpID0+IDApO1xuICBzaG93V2F2ZWZvcm0gPSB0cnVlO1xuICBpbnRlcnZhbDogYW55O1xuXG4gIGZhTWljcm9waG9uZSA9IGZhTWljcm9waG9uZTtcbiAgZmFNaWNyb3Bob25lU2xhc2ggPSBmYU1pY3JvcGhvbmVTbGFzaDtcbiAgZmFWaWRlbyA9IGZhVmlkZW87XG4gIGZhVmlkZW9TbGFzaCA9IGZhVmlkZW9TbGFzaDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbnRyb2xNZWRpYVNlcnZpY2U6IENvbnRyb2xNZWRpYSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdjdXN0b21TdHlsZScpIGluamVjdGVkQ3VzdG9tU3R5bGU6IFBhcnRpYWw8Q1NTU3R5bGVEZWNsYXJhdGlvbj4sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnbmFtZScpIGluamVjdGVkTmFtZTogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2JhckNvbG9yJykgaW5qZWN0ZWRCYXJDb2xvcjogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3RleHRDb2xvcicpIGluamVjdGVkVGV4dENvbG9yOiBzdHJpbmcsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnaW1hZ2VTb3VyY2UnKSBpbmplY3RlZEltYWdlU291cmNlOiBzdHJpbmcsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgncm91bmRlZEltYWdlJykgaW5qZWN0ZWRSb3VuZGVkSW1hZ2U6IGJvb2xlYW4sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnaW1hZ2VTdHlsZScpIGluamVjdGVkSW1hZ2VTdHlsZTogUGFydGlhbDxDU1NTdHlsZURlY2xhcmF0aW9uPixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdyZW1vdGVQcm9kdWNlcklkJykgaW5qZWN0ZWRSZW1vdGVQcm9kdWNlcklkOiBzdHJpbmcsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnZXZlbnRUeXBlJykgaW5qZWN0ZWRFdmVudFR5cGU6IEV2ZW50VHlwZSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdmb3JjZUZ1bGxEaXNwbGF5JykgaW5qZWN0ZWRGb3JjZUZ1bGxEaXNwbGF5OiBib29sZWFuLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3ZpZGVvU3RyZWFtJykgaW5qZWN0ZWRWaWRlb1N0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3Nob3dDb250cm9scycpIGluamVjdGVkU2hvd0NvbnRyb2xzOiBib29sZWFuLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3Nob3dJbmZvJykgaW5qZWN0ZWRTaG93SW5mbzogYm9vbGVhbixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCd2aWRlb0luZm9Db21wb25lbnQnKSBpbmplY3RlZFZpZGVvSW5mb0NvbXBvbmVudDogSFRNTEVsZW1lbnQsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgndmlkZW9Db250cm9sc0NvbXBvbmVudCcpIGluamVjdGVkVmlkZW9Db250cm9sc0NvbXBvbmVudDogSFRNTEVsZW1lbnQsXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KCdjb250cm9sc1Bvc2l0aW9uJylcbiAgICBpbmplY3RlZENvbnRyb2xzUG9zaXRpb246ICd0b3BMZWZ0JyB8ICd0b3BSaWdodCcgfCAnYm90dG9tTGVmdCcgfCAnYm90dG9tUmlnaHQnLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdCgnaW5mb1Bvc2l0aW9uJylcbiAgICBpbmplY3RlZEluZm9Qb3NpdGlvbjogJ3RvcExlZnQnIHwgJ3RvcFJpZ2h0JyB8ICdib3R0b21MZWZ0JyB8ICdib3R0b21SaWdodCcsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgncGFydGljaXBhbnQnKSBpbmplY3RlZFBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdiYWNrZ3JvdW5kQ29sb3InKSBpbmplY3RlZEJhY2tncm91bmRDb2xvcjogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2F1ZGlvRGVjaWJlbHMnKSBpbmplY3RlZEF1ZGlvRGVjaWJlbHM6IEF1ZGlvRGVjaWJlbHNbXSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdkb01pcnJvcicpIGluamVjdGVkRG9NaXJyb3I6IGJvb2xlYW4sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgncGFyYW1ldGVycycpIGluamVjdGVkUGFyYW1ldGVyczogVmlkZW9DYXJkUGFyYW1ldGVycyxcbiAgKSB7XG4gICAgdGhpcy5jdXN0b21TdHlsZSA9IGluamVjdGVkQ3VzdG9tU3R5bGUgfHwgdGhpcy5jdXN0b21TdHlsZTtcbiAgICB0aGlzLm5hbWUgPSBpbmplY3RlZE5hbWUgfHwgdGhpcy5uYW1lO1xuICAgIHRoaXMuYmFyQ29sb3IgPSBpbmplY3RlZEJhckNvbG9yIHx8IHRoaXMuYmFyQ29sb3I7XG4gICAgdGhpcy50ZXh0Q29sb3IgPSBpbmplY3RlZFRleHRDb2xvciB8fCB0aGlzLnRleHRDb2xvcjtcbiAgICB0aGlzLmltYWdlU291cmNlID0gaW5qZWN0ZWRJbWFnZVNvdXJjZSB8fCB0aGlzLmltYWdlU291cmNlO1xuICAgIHRoaXMucm91bmRlZEltYWdlID0gaW5qZWN0ZWRSb3VuZGVkSW1hZ2UgfHwgdGhpcy5yb3VuZGVkSW1hZ2U7XG4gICAgdGhpcy5pbWFnZVN0eWxlID0gaW5qZWN0ZWRJbWFnZVN0eWxlIHx8IHRoaXMuaW1hZ2VTdHlsZTtcbiAgICB0aGlzLnJlbW90ZVByb2R1Y2VySWQgPSBpbmplY3RlZFJlbW90ZVByb2R1Y2VySWQgfHwgdGhpcy5yZW1vdGVQcm9kdWNlcklkO1xuICAgIHRoaXMuZXZlbnRUeXBlID0gaW5qZWN0ZWRFdmVudFR5cGUgfHwgdGhpcy5ldmVudFR5cGU7XG4gICAgdGhpcy5mb3JjZUZ1bGxEaXNwbGF5ID0gaW5qZWN0ZWRGb3JjZUZ1bGxEaXNwbGF5IHx8IHRoaXMuZm9yY2VGdWxsRGlzcGxheTtcbiAgICB0aGlzLnZpZGVvU3RyZWFtID0gaW5qZWN0ZWRWaWRlb1N0cmVhbSB8fCB0aGlzLnZpZGVvU3RyZWFtO1xuICAgIHRoaXMuc2hvd0NvbnRyb2xzID0gaW5qZWN0ZWRTaG93Q29udHJvbHMgIT0gbnVsbCA/IGluamVjdGVkU2hvd0NvbnRyb2xzIDogdGhpcy5zaG93Q29udHJvbHM7XG4gICAgdGhpcy5zaG93SW5mbyA9IGluamVjdGVkU2hvd0luZm8gIT0gbnVsbCA/IGluamVjdGVkU2hvd0luZm8gOiB0aGlzLnNob3dJbmZvO1xuICAgIHRoaXMudmlkZW9JbmZvQ29tcG9uZW50ID0gaW5qZWN0ZWRWaWRlb0luZm9Db21wb25lbnQgfHwgdGhpcy52aWRlb0luZm9Db21wb25lbnQ7XG4gICAgdGhpcy52aWRlb0NvbnRyb2xzQ29tcG9uZW50ID0gaW5qZWN0ZWRWaWRlb0NvbnRyb2xzQ29tcG9uZW50IHx8IHRoaXMudmlkZW9Db250cm9sc0NvbXBvbmVudDtcbiAgICB0aGlzLmNvbnRyb2xzUG9zaXRpb24gPSBpbmplY3RlZENvbnRyb2xzUG9zaXRpb24gfHwgdGhpcy5jb250cm9sc1Bvc2l0aW9uO1xuICAgIHRoaXMuaW5mb1Bvc2l0aW9uID0gaW5qZWN0ZWRJbmZvUG9zaXRpb24gfHwgdGhpcy5pbmZvUG9zaXRpb247XG4gICAgdGhpcy5wYXJ0aWNpcGFudCA9IGluamVjdGVkUGFydGljaXBhbnQgfHwgdGhpcy5wYXJ0aWNpcGFudDtcbiAgICB0aGlzLmJhY2tncm91bmRDb2xvciA9IGluamVjdGVkQmFja2dyb3VuZENvbG9yIHx8IHRoaXMuYmFja2dyb3VuZENvbG9yO1xuICAgIHRoaXMuYXVkaW9EZWNpYmVscyA9IGluamVjdGVkQXVkaW9EZWNpYmVscyB8fCB0aGlzLmF1ZGlvRGVjaWJlbHM7XG4gICAgdGhpcy5kb01pcnJvciA9IGluamVjdGVkRG9NaXJyb3IgfHwgdGhpcy5kb01pcnJvcjtcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSBpbmplY3RlZFBhcmFtZXRlcnMgfHwgdGhpcy5wYXJhbWV0ZXJzO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG4gICAgICBjb25zdCB7IGF1ZGlvRGVjaWJlbHMsIHBhcnRpY2lwYW50cyB9ID0gcGFyYW1zO1xuICAgICAgY29uc3QgZXhpc3RpbmdFbnRyeSA9XG4gICAgICAgIGF1ZGlvRGVjaWJlbHMgJiYgYXVkaW9EZWNpYmVscy5maW5kKChlbnRyeTogQXVkaW9EZWNpYmVscykgPT4gZW50cnkubmFtZSA9PT0gdGhpcy5uYW1lKTtcbiAgICAgIGNvbnN0IHBhcnRpY2lwYW50RW50cnkgPVxuICAgICAgICBwYXJ0aWNpcGFudHMgJiYgcGFydGljaXBhbnRzLmZpbmQoKHA6IFBhcnRpY2lwYW50KSA9PiBwLm5hbWUgPT09IHRoaXMubmFtZSk7XG4gICAgICBpZiAoXG4gICAgICAgIGV4aXN0aW5nRW50cnkgJiZcbiAgICAgICAgZXhpc3RpbmdFbnRyeS5hdmVyYWdlTG91ZG5lc3MgPiAxMjcuNSAmJlxuICAgICAgICBwYXJ0aWNpcGFudEVudHJ5ICYmXG4gICAgICAgICFwYXJ0aWNpcGFudEVudHJ5Lm11dGVkXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5hbmltYXRlV2F2ZWZvcm0oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVzZXRXYXZlZm9ybSgpO1xuICAgICAgfVxuICAgIH0sIDEwMDApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgfVxuXG4gIGFuaW1hdGVXYXZlZm9ybSgpIHtcbiAgICB0aGlzLndhdmVmb3JtQW5pbWF0aW9ucy5mb3JFYWNoKChfLCBpbmRleCkgPT4ge1xuICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5hbmltYXRlQmFyKGluZGV4KSwgdGhpcy5nZXRBbmltYXRpb25EdXJhdGlvbihpbmRleCkgKiAyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFuaW1hdGVCYXIoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMud2F2ZWZvcm1BbmltYXRpb25zW2luZGV4XSA9IDE7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLndhdmVmb3JtQW5pbWF0aW9uc1tpbmRleF0gPSAwO1xuICAgIH0sIHRoaXMuZ2V0QW5pbWF0aW9uRHVyYXRpb24oaW5kZXgpKTtcbiAgfVxuXG4gIHJlc2V0V2F2ZWZvcm0oKSB7XG4gICAgdGhpcy53YXZlZm9ybUFuaW1hdGlvbnMuZmlsbCgwKTtcbiAgfVxuXG4gIGdldEFuaW1hdGlvbkR1cmF0aW9uKGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGR1cmF0aW9ucyA9IFs0NzQsIDQzMywgNDA3LCA0NTgsIDQwMCwgNDI3LCA0NDEsIDQxOSwgNDg3XTtcbiAgICByZXR1cm4gZHVyYXRpb25zW2luZGV4XSB8fCAwO1xuICB9XG5cbiAgYXN5bmMgdG9nZ2xlQXVkaW8oKSB7XG4gICAgaWYgKHRoaXMucGFydGljaXBhbnQgJiYgIXRoaXMucGFydGljaXBhbnQubXV0ZWQpIHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMucGFyYW1ldGVycztcbiAgICAgIGF3YWl0IHRoaXMuY29udHJvbE1lZGlhU2VydmljZS5jb250cm9sTWVkaWEoe1xuICAgICAgICBwYXJ0aWNpcGFudElkOiB0aGlzLnBhcnRpY2lwYW50LmlkIHx8ICcnLFxuICAgICAgICBwYXJ0aWNpcGFudE5hbWU6IHRoaXMucGFydGljaXBhbnQubmFtZSxcbiAgICAgICAgdHlwZTogJ2F1ZGlvJyxcbiAgICAgICAgc29ja2V0OiBwYXJhbXMuc29ja2V0LFxuICAgICAgICByb29tTmFtZTogcGFyYW1zLnJvb21OYW1lLFxuICAgICAgICBjb0hvc3RSZXNwb25zaWJpbGl0eTogcGFyYW1zLmNvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICAgICAgICBzaG93QWxlcnQ6IHBhcmFtcy5zaG93QWxlcnQsXG4gICAgICAgIGNvSG9zdDogcGFyYW1zLmNvSG9zdCxcbiAgICAgICAgcGFydGljaXBhbnRzOiBwYXJhbXMucGFydGljaXBhbnRzLFxuICAgICAgICBtZW1iZXI6IHBhcmFtcy5tZW1iZXIsXG4gICAgICAgIGlzbGV2ZWw6IHBhcmFtcy5pc2xldmVsLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgdG9nZ2xlVmlkZW8oKSB7XG4gICAgaWYgKHRoaXMucGFydGljaXBhbnQpIHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG4gICAgICBhd2FpdCB0aGlzLmNvbnRyb2xNZWRpYVNlcnZpY2UuY29udHJvbE1lZGlhKHtcbiAgICAgICAgcGFydGljaXBhbnRJZDogdGhpcy5wYXJ0aWNpcGFudC5pZCB8fCAnJyxcbiAgICAgICAgcGFydGljaXBhbnROYW1lOiB0aGlzLnBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICAgIHR5cGU6ICd2aWRlbycsXG4gICAgICAgIHNvY2tldDogcGFyYW1zLnNvY2tldCxcbiAgICAgICAgcm9vbU5hbWU6IHBhcmFtcy5yb29tTmFtZSxcbiAgICAgICAgY29Ib3N0UmVzcG9uc2liaWxpdHk6IHBhcmFtcy5jb0hvc3RSZXNwb25zaWJpbGl0eSxcbiAgICAgICAgc2hvd0FsZXJ0OiBwYXJhbXMuc2hvd0FsZXJ0LFxuICAgICAgICBjb0hvc3Q6IHBhcmFtcy5jb0hvc3QsXG4gICAgICAgIHBhcnRpY2lwYW50czogcGFyYW1zLnBhcnRpY2lwYW50cyxcbiAgICAgICAgbWVtYmVyOiBwYXJhbXMubWVtYmVyLFxuICAgICAgICBpc2xldmVsOiBwYXJhbXMuaXNsZXZlbCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlckNvbnRyb2xzKCkge1xuICAgIGlmICghdGhpcy5zaG93Q29udHJvbHMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnZpZGVvQ29udHJvbHNDb21wb25lbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLnZpZGVvQ29udHJvbHNDb21wb25lbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJvdmVybGF5Q29udHJvbHNcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNvbnRyb2xCdXR0b25cIiAoY2xpY2spPVwidG9nZ2xlQXVkaW8oKVwiPlxuICAgICAgICAgIDxmYS1pY29uIFtpY29uXT1cInBhcnRpY2lwYW50Py5tdXRlZCA/IGZhTWljcm9waG9uZVNsYXNoIDogZmFNaWNyb3Bob25lXCIgW3N0eWxlLmNvbG9yXT1cInBhcnRpY2lwYW50Py5tdXRlZCA/ICdyZWQnIDogJ2dyZWVuJ1wiPjwvZmEtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJjb250cm9sQnV0dG9uXCIgKGNsaWNrKT1cInRvZ2dsZVZpZGVvKClcIj5cbiAgICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJwYXJ0aWNpcGFudD8udmlkZW9PbiA/IGZhVmlkZW8gOiBmYVZpZGVvU2xhc2hcIiBbc3R5bGUuY29sb3JdPVwicGFydGljaXBhbnQ/LnZpZGVvT24gPyAnZ3JlZW4nIDogJ3JlZCdcIj48L2ZhLWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxuXG4gIGdldE92ZXJsYXlQb3NpdGlvbihwb3NpdGlvbjogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGdldE92ZXJsYXlQb3NpdGlvbih7IHBvc2l0aW9uIH0pO1xuICB9XG5cbiAgaXNDdXN0b21Db21wb25lbnQoXG4gICAgY29tcDogSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQgfCAoKCkgPT4gSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQpLFxuICApOiBjb21wIGlzIEN1c3RvbUNvbXBvbmVudCB7XG4gICAgcmV0dXJuIChcbiAgICAgIHR5cGVvZiAoY29tcCBhcyBDdXN0b21Db21wb25lbnQpLmNvbXBvbmVudCAhPT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgKGNvbXAgYXMgQ3VzdG9tQ29tcG9uZW50KS5jb21wb25lbnQgIT09IHVuZGVmaW5lZFxuICAgICk7XG4gIH1cblxuICBpc0Z1bmN0aW9uQ29tcG9uZW50KFxuICAgIGNvbXA6IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50IHwgKCgpID0+IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50KSxcbiAgKTogY29tcCBpcyAoKSA9PiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudCB7XG4gICAgcmV0dXJuIHR5cGVvZiBjb21wID09PSAnZnVuY3Rpb24nO1xuICB9XG59XG4iLCI8ZGl2XHJcbiAgW25nU3R5bGVdPVwiY3VzdG9tU3R5bGVcIlxyXG4gIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwiYmFja2dyb3VuZENvbG9yXCJcclxuICBjbGFzcz1cInZpZGVvLWNhcmRcIlxyXG4+XHJcbiAgPGFwcC1jYXJkLXZpZGVvLWRpc3BsYXlcclxuICAgIFtyZW1vdGVQcm9kdWNlcklkXT1cInJlbW90ZVByb2R1Y2VySWRcIlxyXG4gICAgW2V2ZW50VHlwZV09XCJldmVudFR5cGVcIlxyXG4gICAgW2ZvcmNlRnVsbERpc3BsYXldPVwiZm9yY2VGdWxsRGlzcGxheVwiXHJcbiAgICBbdmlkZW9TdHJlYW1dPVwidmlkZW9TdHJlYW1cIlxyXG4gICAgW2JhY2tncm91bmRDb2xvcl09XCJiYWNrZ3JvdW5kQ29sb3JcIlxyXG4gICAgW2RvTWlycm9yXT1cImRvTWlycm9yXCJcclxuICA+PC9hcHAtY2FyZC12aWRlby1kaXNwbGF5PlxyXG5cclxuICA8ZGl2XHJcbiAgICAqbmdJZj1cInNob3dJbmZvXCJcclxuICAgIFtuZ0NsYXNzXT1cInNob3dDb250cm9scyA/ICdvdmVybGF5V2ViJyA6ICdvdmVybGF5V2ViQWx0J1wiXHJcbiAgICBbbmdTdHlsZV09XCJnZXRPdmVybGF5UG9zaXRpb24oaW5mb1Bvc2l0aW9uKVwiXHJcbiAgPlxyXG4gICAgPGRpdiBjbGFzcz1cIm5hbWVDb2x1bW5cIj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJuYW1lVGV4dFwiIFtzdHlsZS5jb2xvcl09XCJ0ZXh0Q29sb3JcIj57e1xyXG4gICAgICAgIHBhcnRpY2lwYW50Lm5hbWVcclxuICAgICAgfX08L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgKm5nSWY9XCJzaG93V2F2ZWZvcm1cIiBjbGFzcz1cIndhdmVmb3JtV2ViXCI+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICAqbmdGb3I9XCJsZXQgYW5pbWF0aW9uIG9mIHdhdmVmb3JtQW5pbWF0aW9uczsgbGV0IGkgPSBpbmRleFwiXHJcbiAgICAgICAgY2xhc3M9XCJiYXJcIlxyXG4gICAgICAgIFtuZ1N0eWxlXT1cIntcclxuICAgICAgICAgIGhlaWdodDogYW5pbWF0aW9uID09PSAwID8gJzFweCcgOiAnMTZweCcsXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhckNvbG9yXHJcbiAgICAgICAgfVwiXHJcbiAgICAgID48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2XHJcbiAgICAqbmdJZj1cInNob3dDb250cm9sc1wiXHJcbiAgICBjbGFzcz1cIm92ZXJsYXlDb250cm9sc1wiXHJcbiAgICBbbmdTdHlsZV09XCJnZXRPdmVybGF5UG9zaXRpb24oY29udHJvbHNQb3NpdGlvbilcIlxyXG4gID5cclxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdmlkZW9Db250cm9sc0NvbXBvbmVudFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwib3ZlcmxheUNvbnRyb2xzXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNvbnRyb2xCdXR0b25cIiAoY2xpY2spPVwidG9nZ2xlQXVkaW8oKVwiPlxyXG4gICAgICAgICAgPGZhLWljb25cclxuICAgICAgICAgICAgW2ljb25dPVwicGFydGljaXBhbnQubXV0ZWQgPyBmYU1pY3JvcGhvbmVTbGFzaCA6IGZhTWljcm9waG9uZVwiXHJcbiAgICAgICAgICAgIFtzdHlsZS5jb2xvcl09XCJwYXJ0aWNpcGFudC5tdXRlZCA/ICdyZWQnIDogJ2dyZWVuJ1wiXHJcbiAgICAgICAgICA+PC9mYS1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJjb250cm9sQnV0dG9uXCIgKGNsaWNrKT1cInRvZ2dsZVZpZGVvKClcIj5cclxuICAgICAgICAgIDxmYS1pY29uXHJcbiAgICAgICAgICAgIFtpY29uXT1cInBhcnRpY2lwYW50Wyd2aWRlb09uJ10gPyBmYVZpZGVvIDogZmFWaWRlb1NsYXNoXCJcclxuICAgICAgICAgICAgW3N0eWxlLmNvbG9yXT1cInBhcnRpY2lwYW50Wyd2aWRlb09uJ10gPyAnZ3JlZW4nIDogJ3JlZCdcIlxyXG4gICAgICAgICAgPjwvZmEtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWRlb0NvbnRyb2xzQ29tcG9uZW50XCI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc0N1c3RvbUNvbXBvbmVudCh2aWRlb0NvbnRyb2xzQ29tcG9uZW50KVwiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICAgICpuZ0NvbXBvbmVudE91dGxldD1cIlxyXG4gICAgICAgICAgICB2aWRlb0NvbnRyb2xzQ29tcG9uZW50LmNvbXBvbmVudDtcclxuICAgICAgICAgICAgaW5qZWN0b3I6IHZpZGVvQ29udHJvbHNDb21wb25lbnQuaW5qZWN0b3JcclxuICAgICAgICAgIFwiXHJcbiAgICAgICAgPjwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc0N1c3RvbUNvbXBvbmVudCh2aWRlb0NvbnRyb2xzQ29tcG9uZW50KVwiPlxyXG4gICAgICAgIDxkaXYgW2lubmVySFRNTF09XCJ2aWRlb0NvbnRyb2xzQ29tcG9uZW50Lm91dGVySFRNTFwiPjwvZGl2PlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19