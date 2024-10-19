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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvdmlkZW8tY2FyZC92aWRlby1jYXJkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy92aWRlby1jYXJkL3ZpZGVvLWNhcmQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFDTCxZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLE9BQU8sRUFDUCxZQUFZLEdBQ2IsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUN0RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQzs7Ozs7QUE4RHRGLE1BQU0sT0FBTyxTQUFTO0lBa0NWO0lBakNELFdBQVcsR0FBaUMsRUFBRSxDQUFDO0lBQy9DLElBQUksQ0FBVTtJQUNkLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDakIsU0FBUyxHQUFHLE9BQU8sQ0FBQztJQUNwQixXQUFXLENBQVU7SUFDckIsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUNyQixVQUFVLEdBQWlDLEVBQUUsQ0FBQztJQUM5QyxnQkFBZ0IsQ0FBVTtJQUMxQixTQUFTLENBQWE7SUFD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OzswQkFDUixNQUFNOzJCQUFDLGtCQUFrQjs7MEJBRXpCLFFBQVE7OzBCQUNSLE1BQU07MkJBQUMsY0FBYzs7MEJBRXJCLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsYUFBYTs7MEJBQ2hDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsaUJBQWlCOzswQkFDcEMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxlQUFlOzswQkFDbEMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxVQUFVOzswQkFDN0IsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxZQUFZO3lDQTNEekIsV0FBVztzQkFBbkIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csc0JBQXNCO3NCQUE5QixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95LCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9udEF3ZXNvbWVNb2R1bGUgfSBmcm9tICdAZm9ydGF3ZXNvbWUvYW5ndWxhci1mb250YXdlc29tZSc7XG5pbXBvcnQge1xuICBmYU1pY3JvcGhvbmUsXG4gIGZhTWljcm9waG9uZVNsYXNoLFxuICBmYVZpZGVvLFxuICBmYVZpZGVvU2xhc2gsXG59IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XG5pbXBvcnQgeyBDYXJkVmlkZW9EaXNwbGF5IH0gZnJvbSAnLi4vY2FyZC12aWRlby1kaXNwbGF5L2NhcmQtdmlkZW8tZGlzcGxheS5jb21wb25lbnQnO1xuaW1wb3J0IHsgZ2V0T3ZlcmxheVBvc2l0aW9uIH0gZnJvbSAnLi4vLi4vLi4vbWV0aG9kcy91dGlscy9nZXQtb3ZlcmxheS1wb3NpdGlvbi51dGlsJztcbmltcG9ydCB7IENvbnRyb2xNZWRpYSB9IGZyb20gJy4uLy4uLy4uL2NvbnN1bWVycy9jb250cm9sLW1lZGlhLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgUGFydGljaXBhbnQsXG4gIEF1ZGlvRGVjaWJlbHMsXG4gIENvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICBTaG93QWxlcnQsXG4gIEV2ZW50VHlwZSxcbiAgQ3VzdG9tQ29tcG9uZW50LFxufSBmcm9tICcuLi8uLi8uLi9AdHlwZXMvdHlwZXMnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmlkZW9DYXJkUGFyYW1ldGVycyB7XG4gIHNvY2tldDogU29ja2V0O1xuICByb29tTmFtZTogc3RyaW5nO1xuICBjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXTtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICBjb0hvc3Q6IHN0cmluZztcbiAgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICBtZW1iZXI6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBhdWRpb0RlY2liZWxzOiBBdWRpb0RlY2liZWxzW107XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFZpZGVvQ2FyZFBhcmFtZXRlcnM7XG4gIC8vIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBWaWRlb0NhcmRPcHRpb25zIHtcbiAgY3VzdG9tU3R5bGU/OiBQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+O1xuICBuYW1lOiBzdHJpbmc7XG4gIGJhckNvbG9yPzogc3RyaW5nO1xuICB0ZXh0Q29sb3I/OiBzdHJpbmc7XG4gIGltYWdlU291cmNlOiBzdHJpbmc7XG4gIHJvdW5kZWRJbWFnZT86IGJvb2xlYW47XG4gIGltYWdlU3R5bGU/OiBQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+O1xuICByZW1vdGVQcm9kdWNlcklkOiBzdHJpbmc7XG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlO1xuICBmb3JjZUZ1bGxEaXNwbGF5PzogYm9vbGVhbjtcbiAgdmlkZW9TdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgc2hvd0NvbnRyb2xzPzogYm9vbGVhbjtcbiAgc2hvd0luZm8/OiBib29sZWFuO1xuICB2aWRlb0luZm9Db21wb25lbnQ/OiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudDtcbiAgdmlkZW9Db250cm9sc0NvbXBvbmVudD86IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50O1xuICBjb250cm9sc1Bvc2l0aW9uPzogJ3RvcExlZnQnIHwgJ3RvcFJpZ2h0JyB8ICdib3R0b21MZWZ0JyB8ICdib3R0b21SaWdodCc7XG4gIGluZm9Qb3NpdGlvbj86ICd0b3BMZWZ0JyB8ICd0b3BSaWdodCcgfCAnYm90dG9tTGVmdCcgfCAnYm90dG9tUmlnaHQnO1xuICBwYXJ0aWNpcGFudDogUGFydGljaXBhbnQ7XG4gIGJhY2tncm91bmRDb2xvcjogc3RyaW5nO1xuICBhdWRpb0RlY2liZWxzOiBBdWRpb0RlY2liZWxzW107XG4gIGRvTWlycm9yPzogYm9vbGVhbjtcbiAgcGFyYW1ldGVyczogVmlkZW9DYXJkUGFyYW1ldGVycztcbn1cblxuZXhwb3J0IHR5cGUgVmlkZW9DYXJkVHlwZSA9IChvcHRpb25zOiBWaWRlb0NhcmRPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLXZpZGVvLWNhcmQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZSwgQ2FyZFZpZGVvRGlzcGxheV0sXG4gIHRlbXBsYXRlVXJsOiAnLi92aWRlby1jYXJkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdmlkZW8tY2FyZC5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFZpZGVvQ2FyZCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgY3VzdG9tU3R5bGU6IFBhcnRpYWw8Q1NTU3R5bGVEZWNsYXJhdGlvbj4gPSB7fTtcbiAgQElucHV0KCkgbmFtZSE6IHN0cmluZztcbiAgQElucHV0KCkgYmFyQ29sb3IgPSAncmVkJztcbiAgQElucHV0KCkgdGV4dENvbG9yID0gJ3doaXRlJztcbiAgQElucHV0KCkgaW1hZ2VTb3VyY2UhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHJvdW5kZWRJbWFnZSA9IGZhbHNlO1xuICBASW5wdXQoKSBpbWFnZVN0eWxlOiBQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+ID0ge307XG4gIEBJbnB1dCgpIHJlbW90ZVByb2R1Y2VySWQhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGV2ZW50VHlwZSE6IEV2ZW50VHlwZTtcbiAgQElucHV0KCkgZm9yY2VGdWxsRGlzcGxheSE6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHZpZGVvU3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBzaG93Q29udHJvbHMgPSB0cnVlO1xuICBASW5wdXQoKSBzaG93SW5mbyA9IHRydWU7XG4gIEBJbnB1dCgpIHZpZGVvSW5mb0NvbXBvbmVudD86IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50O1xuICBASW5wdXQoKSB2aWRlb0NvbnRyb2xzQ29tcG9uZW50PzogSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQ7XG4gIEBJbnB1dCgpIGNvbnRyb2xzUG9zaXRpb246ICd0b3BMZWZ0JyB8ICd0b3BSaWdodCcgfCAnYm90dG9tTGVmdCcgfCAnYm90dG9tUmlnaHQnID0gJ3RvcExlZnQnO1xuICBASW5wdXQoKSBpbmZvUG9zaXRpb246ICd0b3BMZWZ0JyB8ICd0b3BSaWdodCcgfCAnYm90dG9tTGVmdCcgfCAnYm90dG9tUmlnaHQnID0gJ3RvcFJpZ2h0JztcbiAgQElucHV0KCkgcGFydGljaXBhbnQhOiBQYXJ0aWNpcGFudDtcbiAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yITogc3RyaW5nO1xuICBASW5wdXQoKSBhdWRpb0RlY2liZWxzOiBBdWRpb0RlY2liZWxzW10gPSBbXTtcbiAgQElucHV0KCkgZG9NaXJyb3IhOiBib29sZWFuO1xuICBASW5wdXQoKSBwYXJhbWV0ZXJzITogVmlkZW9DYXJkUGFyYW1ldGVycztcblxuICB3YXZlZm9ybUFuaW1hdGlvbnM6IG51bWJlcltdID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogOSB9LCAoKSA9PiAwKTtcbiAgc2hvd1dhdmVmb3JtID0gdHJ1ZTtcbiAgaW50ZXJ2YWw6IGFueTtcblxuICBmYU1pY3JvcGhvbmUgPSBmYU1pY3JvcGhvbmU7XG4gIGZhTWljcm9waG9uZVNsYXNoID0gZmFNaWNyb3Bob25lU2xhc2g7XG4gIGZhVmlkZW8gPSBmYVZpZGVvO1xuICBmYVZpZGVvU2xhc2ggPSBmYVZpZGVvU2xhc2g7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb250cm9sTWVkaWFTZXJ2aWNlOiBDb250cm9sTWVkaWEsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnY3VzdG9tU3R5bGUnKSBpbmplY3RlZEN1c3RvbVN0eWxlOiBQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ25hbWUnKSBpbmplY3RlZE5hbWU6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdiYXJDb2xvcicpIGluamVjdGVkQmFyQ29sb3I6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCd0ZXh0Q29sb3InKSBpbmplY3RlZFRleHRDb2xvcjogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2ltYWdlU291cmNlJykgaW5qZWN0ZWRJbWFnZVNvdXJjZTogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3JvdW5kZWRJbWFnZScpIGluamVjdGVkUm91bmRlZEltYWdlOiBib29sZWFuLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2ltYWdlU3R5bGUnKSBpbmplY3RlZEltYWdlU3R5bGU6IFBhcnRpYWw8Q1NTU3R5bGVEZWNsYXJhdGlvbj4sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgncmVtb3RlUHJvZHVjZXJJZCcpIGluamVjdGVkUmVtb3RlUHJvZHVjZXJJZDogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2V2ZW50VHlwZScpIGluamVjdGVkRXZlbnRUeXBlOiBFdmVudFR5cGUsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnZm9yY2VGdWxsRGlzcGxheScpIGluamVjdGVkRm9yY2VGdWxsRGlzcGxheTogYm9vbGVhbixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCd2aWRlb1N0cmVhbScpIGluamVjdGVkVmlkZW9TdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdzaG93Q29udHJvbHMnKSBpbmplY3RlZFNob3dDb250cm9sczogYm9vbGVhbixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdzaG93SW5mbycpIGluamVjdGVkU2hvd0luZm86IGJvb2xlYW4sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgndmlkZW9JbmZvQ29tcG9uZW50JykgaW5qZWN0ZWRWaWRlb0luZm9Db21wb25lbnQ6IEhUTUxFbGVtZW50LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3ZpZGVvQ29udHJvbHNDb21wb25lbnQnKSBpbmplY3RlZFZpZGVvQ29udHJvbHNDb21wb25lbnQ6IEhUTUxFbGVtZW50LFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdCgnY29udHJvbHNQb3NpdGlvbicpXG4gICAgaW5qZWN0ZWRDb250cm9sc1Bvc2l0aW9uOiAndG9wTGVmdCcgfCAndG9wUmlnaHQnIHwgJ2JvdHRvbUxlZnQnIHwgJ2JvdHRvbVJpZ2h0JyxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoJ2luZm9Qb3NpdGlvbicpXG4gICAgaW5qZWN0ZWRJbmZvUG9zaXRpb246ICd0b3BMZWZ0JyB8ICd0b3BSaWdodCcgfCAnYm90dG9tTGVmdCcgfCAnYm90dG9tUmlnaHQnLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3BhcnRpY2lwYW50JykgaW5qZWN0ZWRQYXJ0aWNpcGFudDogUGFydGljaXBhbnQsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnYmFja2dyb3VuZENvbG9yJykgaW5qZWN0ZWRCYWNrZ3JvdW5kQ29sb3I6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdhdWRpb0RlY2liZWxzJykgaW5qZWN0ZWRBdWRpb0RlY2liZWxzOiBBdWRpb0RlY2liZWxzW10sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnZG9NaXJyb3InKSBpbmplY3RlZERvTWlycm9yOiBib29sZWFuLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3BhcmFtZXRlcnMnKSBpbmplY3RlZFBhcmFtZXRlcnM6IFZpZGVvQ2FyZFBhcmFtZXRlcnMsXG4gICkge1xuICAgIHRoaXMuY3VzdG9tU3R5bGUgPSBpbmplY3RlZEN1c3RvbVN0eWxlIHx8IHRoaXMuY3VzdG9tU3R5bGU7XG4gICAgdGhpcy5uYW1lID0gaW5qZWN0ZWROYW1lIHx8IHRoaXMubmFtZTtcbiAgICB0aGlzLmJhckNvbG9yID0gaW5qZWN0ZWRCYXJDb2xvciB8fCB0aGlzLmJhckNvbG9yO1xuICAgIHRoaXMudGV4dENvbG9yID0gaW5qZWN0ZWRUZXh0Q29sb3IgfHwgdGhpcy50ZXh0Q29sb3I7XG4gICAgdGhpcy5pbWFnZVNvdXJjZSA9IGluamVjdGVkSW1hZ2VTb3VyY2UgfHwgdGhpcy5pbWFnZVNvdXJjZTtcbiAgICB0aGlzLnJvdW5kZWRJbWFnZSA9IGluamVjdGVkUm91bmRlZEltYWdlIHx8IHRoaXMucm91bmRlZEltYWdlO1xuICAgIHRoaXMuaW1hZ2VTdHlsZSA9IGluamVjdGVkSW1hZ2VTdHlsZSB8fCB0aGlzLmltYWdlU3R5bGU7XG4gICAgdGhpcy5yZW1vdGVQcm9kdWNlcklkID0gaW5qZWN0ZWRSZW1vdGVQcm9kdWNlcklkIHx8IHRoaXMucmVtb3RlUHJvZHVjZXJJZDtcbiAgICB0aGlzLmV2ZW50VHlwZSA9IGluamVjdGVkRXZlbnRUeXBlIHx8IHRoaXMuZXZlbnRUeXBlO1xuICAgIHRoaXMuZm9yY2VGdWxsRGlzcGxheSA9IGluamVjdGVkRm9yY2VGdWxsRGlzcGxheSB8fCB0aGlzLmZvcmNlRnVsbERpc3BsYXk7XG4gICAgdGhpcy52aWRlb1N0cmVhbSA9IGluamVjdGVkVmlkZW9TdHJlYW0gfHwgdGhpcy52aWRlb1N0cmVhbTtcbiAgICB0aGlzLnNob3dDb250cm9scyA9IGluamVjdGVkU2hvd0NvbnRyb2xzICE9IG51bGwgPyBpbmplY3RlZFNob3dDb250cm9scyA6IHRoaXMuc2hvd0NvbnRyb2xzO1xuICAgIHRoaXMuc2hvd0luZm8gPSBpbmplY3RlZFNob3dJbmZvICE9IG51bGwgPyBpbmplY3RlZFNob3dJbmZvIDogdGhpcy5zaG93SW5mbztcbiAgICB0aGlzLnZpZGVvSW5mb0NvbXBvbmVudCA9IGluamVjdGVkVmlkZW9JbmZvQ29tcG9uZW50IHx8IHRoaXMudmlkZW9JbmZvQ29tcG9uZW50O1xuICAgIHRoaXMudmlkZW9Db250cm9sc0NvbXBvbmVudCA9IGluamVjdGVkVmlkZW9Db250cm9sc0NvbXBvbmVudCB8fCB0aGlzLnZpZGVvQ29udHJvbHNDb21wb25lbnQ7XG4gICAgdGhpcy5jb250cm9sc1Bvc2l0aW9uID0gaW5qZWN0ZWRDb250cm9sc1Bvc2l0aW9uIHx8IHRoaXMuY29udHJvbHNQb3NpdGlvbjtcbiAgICB0aGlzLmluZm9Qb3NpdGlvbiA9IGluamVjdGVkSW5mb1Bvc2l0aW9uIHx8IHRoaXMuaW5mb1Bvc2l0aW9uO1xuICAgIHRoaXMucGFydGljaXBhbnQgPSBpbmplY3RlZFBhcnRpY2lwYW50IHx8IHRoaXMucGFydGljaXBhbnQ7XG4gICAgdGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSBpbmplY3RlZEJhY2tncm91bmRDb2xvciB8fCB0aGlzLmJhY2tncm91bmRDb2xvcjtcbiAgICB0aGlzLmF1ZGlvRGVjaWJlbHMgPSBpbmplY3RlZEF1ZGlvRGVjaWJlbHMgfHwgdGhpcy5hdWRpb0RlY2liZWxzO1xuICAgIHRoaXMuZG9NaXJyb3IgPSBpbmplY3RlZERvTWlycm9yIHx8IHRoaXMuZG9NaXJyb3I7XG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gaW5qZWN0ZWRQYXJhbWV0ZXJzIHx8IHRoaXMucGFyYW1ldGVycztcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBjb25zdCBwYXJhbXMgPSB0aGlzLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuICAgICAgY29uc3QgeyBhdWRpb0RlY2liZWxzLCBwYXJ0aWNpcGFudHMgfSA9IHBhcmFtcztcbiAgICAgIGNvbnN0IGV4aXN0aW5nRW50cnkgPVxuICAgICAgICBhdWRpb0RlY2liZWxzICYmIGF1ZGlvRGVjaWJlbHMuZmluZCgoZW50cnk6IEF1ZGlvRGVjaWJlbHMpID0+IGVudHJ5Lm5hbWUgPT09IHRoaXMubmFtZSk7XG4gICAgICBjb25zdCBwYXJ0aWNpcGFudEVudHJ5ID1cbiAgICAgICAgcGFydGljaXBhbnRzICYmIHBhcnRpY2lwYW50cy5maW5kKChwOiBQYXJ0aWNpcGFudCkgPT4gcC5uYW1lID09PSB0aGlzLm5hbWUpO1xuICAgICAgaWYgKFxuICAgICAgICBleGlzdGluZ0VudHJ5ICYmXG4gICAgICAgIGV4aXN0aW5nRW50cnkuYXZlcmFnZUxvdWRuZXNzID4gMTI3LjUgJiZcbiAgICAgICAgcGFydGljaXBhbnRFbnRyeSAmJlxuICAgICAgICAhcGFydGljaXBhbnRFbnRyeS5tdXRlZFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZVdhdmVmb3JtKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlc2V0V2F2ZWZvcm0oKTtcbiAgICAgIH1cbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gIH1cblxuICBhbmltYXRlV2F2ZWZvcm0oKSB7XG4gICAgdGhpcy53YXZlZm9ybUFuaW1hdGlvbnMuZm9yRWFjaCgoXywgaW5kZXgpID0+IHtcbiAgICAgIHNldEludGVydmFsKCgpID0+IHRoaXMuYW5pbWF0ZUJhcihpbmRleCksIHRoaXMuZ2V0QW5pbWF0aW9uRHVyYXRpb24oaW5kZXgpICogMik7XG4gICAgfSk7XG4gIH1cblxuICBhbmltYXRlQmFyKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLndhdmVmb3JtQW5pbWF0aW9uc1tpbmRleF0gPSAxO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy53YXZlZm9ybUFuaW1hdGlvbnNbaW5kZXhdID0gMDtcbiAgICB9LCB0aGlzLmdldEFuaW1hdGlvbkR1cmF0aW9uKGluZGV4KSk7XG4gIH1cblxuICByZXNldFdhdmVmb3JtKCkge1xuICAgIHRoaXMud2F2ZWZvcm1BbmltYXRpb25zLmZpbGwoMCk7XG4gIH1cblxuICBnZXRBbmltYXRpb25EdXJhdGlvbihpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBkdXJhdGlvbnMgPSBbNDc0LCA0MzMsIDQwNywgNDU4LCA0MDAsIDQyNywgNDQxLCA0MTksIDQ4N107XG4gICAgcmV0dXJuIGR1cmF0aW9uc1tpbmRleF0gfHwgMDtcbiAgfVxuXG4gIGFzeW5jIHRvZ2dsZUF1ZGlvKCkge1xuICAgIGlmICh0aGlzLnBhcnRpY2lwYW50ICYmICF0aGlzLnBhcnRpY2lwYW50Lm11dGVkKSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSB0aGlzLnBhcmFtZXRlcnM7XG4gICAgICBhd2FpdCB0aGlzLmNvbnRyb2xNZWRpYVNlcnZpY2UuY29udHJvbE1lZGlhKHtcbiAgICAgICAgcGFydGljaXBhbnRJZDogdGhpcy5wYXJ0aWNpcGFudC5pZCB8fCAnJyxcbiAgICAgICAgcGFydGljaXBhbnROYW1lOiB0aGlzLnBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICAgIHR5cGU6ICdhdWRpbycsXG4gICAgICAgIHNvY2tldDogcGFyYW1zLnNvY2tldCxcbiAgICAgICAgcm9vbU5hbWU6IHBhcmFtcy5yb29tTmFtZSxcbiAgICAgICAgY29Ib3N0UmVzcG9uc2liaWxpdHk6IHBhcmFtcy5jb0hvc3RSZXNwb25zaWJpbGl0eSxcbiAgICAgICAgc2hvd0FsZXJ0OiBwYXJhbXMuc2hvd0FsZXJ0LFxuICAgICAgICBjb0hvc3Q6IHBhcmFtcy5jb0hvc3QsXG4gICAgICAgIHBhcnRpY2lwYW50czogcGFyYW1zLnBhcnRpY2lwYW50cyxcbiAgICAgICAgbWVtYmVyOiBwYXJhbXMubWVtYmVyLFxuICAgICAgICBpc2xldmVsOiBwYXJhbXMuaXNsZXZlbCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHRvZ2dsZVZpZGVvKCkge1xuICAgIGlmICh0aGlzLnBhcnRpY2lwYW50KSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSB0aGlzLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuICAgICAgYXdhaXQgdGhpcy5jb250cm9sTWVkaWFTZXJ2aWNlLmNvbnRyb2xNZWRpYSh7XG4gICAgICAgIHBhcnRpY2lwYW50SWQ6IHRoaXMucGFydGljaXBhbnQuaWQgfHwgJycsXG4gICAgICAgIHBhcnRpY2lwYW50TmFtZTogdGhpcy5wYXJ0aWNpcGFudC5uYW1lLFxuICAgICAgICB0eXBlOiAndmlkZW8nLFxuICAgICAgICBzb2NrZXQ6IHBhcmFtcy5zb2NrZXQsXG4gICAgICAgIHJvb21OYW1lOiBwYXJhbXMucm9vbU5hbWUsXG4gICAgICAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiBwYXJhbXMuY29Ib3N0UmVzcG9uc2liaWxpdHksXG4gICAgICAgIHNob3dBbGVydDogcGFyYW1zLnNob3dBbGVydCxcbiAgICAgICAgY29Ib3N0OiBwYXJhbXMuY29Ib3N0LFxuICAgICAgICBwYXJ0aWNpcGFudHM6IHBhcmFtcy5wYXJ0aWNpcGFudHMsXG4gICAgICAgIG1lbWJlcjogcGFyYW1zLm1lbWJlcixcbiAgICAgICAgaXNsZXZlbDogcGFyYW1zLmlzbGV2ZWwsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZW5kZXJDb250cm9scygpIHtcbiAgICBpZiAoIXRoaXMuc2hvd0NvbnRyb2xzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy52aWRlb0NvbnRyb2xzQ29tcG9uZW50KSB7XG4gICAgICByZXR1cm4gdGhpcy52aWRlb0NvbnRyb2xzQ29tcG9uZW50O1xuICAgIH1cblxuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwib3ZlcmxheUNvbnRyb2xzXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJjb250cm9sQnV0dG9uXCIgKGNsaWNrKT1cInRvZ2dsZUF1ZGlvKClcIj5cbiAgICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJwYXJ0aWNpcGFudD8ubXV0ZWQgPyBmYU1pY3JvcGhvbmVTbGFzaCA6IGZhTWljcm9waG9uZVwiIFtzdHlsZS5jb2xvcl09XCJwYXJ0aWNpcGFudD8ubXV0ZWQgPyAncmVkJyA6ICdncmVlbidcIj48L2ZhLWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY29udHJvbEJ1dHRvblwiIChjbGljayk9XCJ0b2dnbGVWaWRlbygpXCI+XG4gICAgICAgICAgPGZhLWljb24gW2ljb25dPVwicGFydGljaXBhbnQ/LnZpZGVvT24gPyBmYVZpZGVvIDogZmFWaWRlb1NsYXNoXCIgW3N0eWxlLmNvbG9yXT1cInBhcnRpY2lwYW50Py52aWRlb09uID8gJ2dyZWVuJyA6ICdyZWQnXCI+PC9mYS1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cblxuICBnZXRPdmVybGF5UG9zaXRpb24ocG9zaXRpb246IHN0cmluZykge1xuICAgIHJldHVybiBnZXRPdmVybGF5UG9zaXRpb24oeyBwb3NpdGlvbiB9KTtcbiAgfVxuXG4gIGlzQ3VzdG9tQ29tcG9uZW50KFxuICAgIGNvbXA6IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50IHwgKCgpID0+IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50KSxcbiAgKTogY29tcCBpcyBDdXN0b21Db21wb25lbnQge1xuICAgIHJldHVybiAoXG4gICAgICB0eXBlb2YgKGNvbXAgYXMgQ3VzdG9tQ29tcG9uZW50KS5jb21wb25lbnQgIT09ICdmdW5jdGlvbicgJiZcbiAgICAgIChjb21wIGFzIEN1c3RvbUNvbXBvbmVudCkuY29tcG9uZW50ICE9PSB1bmRlZmluZWRcbiAgICApO1xuICB9XG5cbiAgaXNGdW5jdGlvbkNvbXBvbmVudChcbiAgICBjb21wOiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudCB8ICgoKSA9PiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudCksXG4gICk6IGNvbXAgaXMgKCkgPT4gSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQge1xuICAgIHJldHVybiB0eXBlb2YgY29tcCA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxufVxuIiwiPGRpdlxyXG4gIFtuZ1N0eWxlXT1cImN1c3RvbVN0eWxlXCJcclxuICBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cImJhY2tncm91bmRDb2xvclwiXHJcbiAgY2xhc3M9XCJ2aWRlby1jYXJkXCJcclxuPlxyXG4gIDxhcHAtY2FyZC12aWRlby1kaXNwbGF5XHJcbiAgICBbcmVtb3RlUHJvZHVjZXJJZF09XCJyZW1vdGVQcm9kdWNlcklkXCJcclxuICAgIFtldmVudFR5cGVdPVwiZXZlbnRUeXBlXCJcclxuICAgIFtmb3JjZUZ1bGxEaXNwbGF5XT1cImZvcmNlRnVsbERpc3BsYXlcIlxyXG4gICAgW3ZpZGVvU3RyZWFtXT1cInZpZGVvU3RyZWFtXCJcclxuICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiYmFja2dyb3VuZENvbG9yXCJcclxuICAgIFtkb01pcnJvcl09XCJkb01pcnJvclwiXHJcbiAgPjwvYXBwLWNhcmQtdmlkZW8tZGlzcGxheT5cclxuXHJcbiAgPGRpdlxyXG4gICAgKm5nSWY9XCJzaG93SW5mb1wiXHJcbiAgICBbbmdDbGFzc109XCJzaG93Q29udHJvbHMgPyAnb3ZlcmxheVdlYicgOiAnb3ZlcmxheVdlYkFsdCdcIlxyXG4gICAgW25nU3R5bGVdPVwiZ2V0T3ZlcmxheVBvc2l0aW9uKGluZm9Qb3NpdGlvbilcIlxyXG4gID5cclxuICAgIDxkaXYgY2xhc3M9XCJuYW1lQ29sdW1uXCI+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwibmFtZVRleHRcIiBbc3R5bGUuY29sb3JdPVwidGV4dENvbG9yXCI+e3tcclxuICAgICAgICBwYXJ0aWNpcGFudC5uYW1lXHJcbiAgICAgIH19PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2ICpuZ0lmPVwic2hvd1dhdmVmb3JtXCIgY2xhc3M9XCJ3YXZlZm9ybVdlYlwiPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgKm5nRm9yPVwibGV0IGFuaW1hdGlvbiBvZiB3YXZlZm9ybUFuaW1hdGlvbnM7IGxldCBpID0gaW5kZXhcIlxyXG4gICAgICAgIGNsYXNzPVwiYmFyXCJcclxuICAgICAgICBbbmdTdHlsZV09XCJ7XHJcbiAgICAgICAgICBoZWlnaHQ6IGFuaW1hdGlvbiA9PT0gMCA/ICcxcHgnIDogJzE2cHgnLFxyXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBiYXJDb2xvclxyXG4gICAgICAgIH1cIlxyXG4gICAgICA+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdlxyXG4gICAgKm5nSWY9XCJzaG93Q29udHJvbHNcIlxyXG4gICAgY2xhc3M9XCJvdmVybGF5Q29udHJvbHNcIlxyXG4gICAgW25nU3R5bGVdPVwiZ2V0T3ZlcmxheVBvc2l0aW9uKGNvbnRyb2xzUG9zaXRpb24pXCJcclxuICA+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXZpZGVvQ29udHJvbHNDb21wb25lbnRcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm92ZXJsYXlDb250cm9sc1wiPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJjb250cm9sQnV0dG9uXCIgKGNsaWNrKT1cInRvZ2dsZUF1ZGlvKClcIj5cclxuICAgICAgICAgIDxmYS1pY29uXHJcbiAgICAgICAgICAgIFtpY29uXT1cInBhcnRpY2lwYW50Lm11dGVkID8gZmFNaWNyb3Bob25lU2xhc2ggOiBmYU1pY3JvcGhvbmVcIlxyXG4gICAgICAgICAgICBbc3R5bGUuY29sb3JdPVwicGFydGljaXBhbnQubXV0ZWQgPyAncmVkJyA6ICdncmVlbidcIlxyXG4gICAgICAgICAgPjwvZmEtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY29udHJvbEJ1dHRvblwiIChjbGljayk9XCJ0b2dnbGVWaWRlbygpXCI+XHJcbiAgICAgICAgICA8ZmEtaWNvblxyXG4gICAgICAgICAgICBbaWNvbl09XCJwYXJ0aWNpcGFudFsndmlkZW9PbiddID8gZmFWaWRlbyA6IGZhVmlkZW9TbGFzaFwiXHJcbiAgICAgICAgICAgIFtzdHlsZS5jb2xvcl09XCJwYXJ0aWNpcGFudFsndmlkZW9PbiddID8gJ2dyZWVuJyA6ICdyZWQnXCJcclxuICAgICAgICAgID48L2ZhLWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidmlkZW9Db250cm9sc0NvbXBvbmVudFwiPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNDdXN0b21Db21wb25lbnQodmlkZW9Db250cm9sc0NvbXBvbmVudClcIj5cclxuICAgICAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICAgICAqbmdDb21wb25lbnRPdXRsZXQ9XCJcclxuICAgICAgICAgICAgdmlkZW9Db250cm9sc0NvbXBvbmVudC5jb21wb25lbnQ7XHJcbiAgICAgICAgICAgIGluamVjdG9yOiB2aWRlb0NvbnRyb2xzQ29tcG9uZW50LmluamVjdG9yXHJcbiAgICAgICAgICBcIlxyXG4gICAgICAgID48L25nLWNvbnRhaW5lcj5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNDdXN0b21Db21wb25lbnQodmlkZW9Db250cm9sc0NvbXBvbmVudClcIj5cclxuICAgICAgICA8ZGl2IFtpbm5lckhUTUxdPVwidmlkZW9Db250cm9sc0NvbXBvbmVudC5vdXRlckhUTUxcIj48L2Rpdj5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==