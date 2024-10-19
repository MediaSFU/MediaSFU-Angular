import { Component, Input, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faVideo, faVideoSlash, faMicrophone, faMicrophoneSlash, } from '@fortawesome/free-solid-svg-icons';
import { getOverlayPosition } from '../../../methods/utils/get-overlay-position.util';
import { MiniCard } from '../mini-card/mini-card.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../consumers/control-media.service";
import * as i2 from "@angular/common";
import * as i3 from "@fortawesome/angular-fontawesome";
export class AudioCard {
    ngZone;
    controlMediaService;
    controlUserMedia;
    customStyle = {};
    name = '';
    barColor = 'red';
    textColor = 'white';
    imageSource = '';
    roundedImage = false;
    imageStyle = {};
    showControls = true;
    showInfo = true;
    videoInfoComponent; // Custom component for participant information
    videoControlsComponent; // Custom component for video controls
    controlsPosition = 'topLeft';
    infoPosition = 'topRight';
    participant = null;
    backgroundColor = '';
    audioDecibels;
    parameters;
    faVideo = faVideo;
    faVideoSlash = faVideoSlash;
    faMicrophone = faMicrophone;
    faMicrophoneSlash = faMicrophoneSlash;
    waveformAnimations = Array.from({ length: 9 }, () => 0);
    showWaveform = true;
    interval;
    constructor(ngZone, controlMediaService, injectedControlUserMedia, injectedCustomStyle, injectedName, injectedBarColor, injectedTextColor, injectedImageSource, injectedRoundedImage, injectedImageStyle, injectedShowControls, injectedShowInfo, injectedVideoInfoComponent, injectedVideoControlsComponent, injectedControlsPosition, injectedInfoPosition, injectedParticipant, injectedBackgroundColor, injectedAudioDecibels, injectedParameters) {
        this.ngZone = ngZone;
        this.controlMediaService = controlMediaService;
        this.controlUserMedia = injectedControlUserMedia || this.controlUserMedia;
        this.customStyle = injectedCustomStyle || this.customStyle;
        this.name = injectedName || this.name;
        this.barColor = injectedBarColor || this.barColor;
        this.textColor = injectedTextColor || this.textColor;
        this.imageSource = injectedImageSource || this.imageSource;
        this.roundedImage = injectedRoundedImage || this.roundedImage;
        this.imageStyle = injectedImageStyle || this.imageStyle;
        this.showControls = injectedShowControls != null ? injectedShowControls : this.showControls;
        this.showInfo = injectedShowInfo != null ? injectedShowInfo : this.showInfo;
        this.videoInfoComponent = injectedVideoInfoComponent || this.videoInfoComponent;
        this.videoControlsComponent = injectedVideoControlsComponent || this.videoControlsComponent;
        this.controlsPosition = injectedControlsPosition || this.controlsPosition;
        this.infoPosition = injectedInfoPosition || this.infoPosition;
        this.participant = injectedParticipant || this.participant;
        this.backgroundColor = injectedBackgroundColor || this.backgroundColor;
        this.audioDecibels = injectedAudioDecibels || this.audioDecibels;
        this.parameters = injectedParameters || this.parameters;
    }
    ngOnInit() {
        if (!this.controlUserMedia) {
            this.controlUserMedia = async (options) => {
                await this.controlMediaService.controlMedia(options);
            };
        }
        if (this.parameters) {
            this.ngZone.runOutsideAngular(() => {
                this.interval = setInterval(() => {
                    const { audioDecibels, participants } = this.parameters.getUpdatedAllParams();
                    const existingEntry = audioDecibels.find((entry) => entry.name == this.name);
                    this.participant = participants.find((p) => p.name == this.name) || null;
                    if (existingEntry &&
                        existingEntry.averageLoudness > 127.5 &&
                        this.participant &&
                        !this.participant.muted) {
                        this.animateWaveform();
                    }
                    else {
                        this.resetWaveform();
                    }
                }, 1000);
            });
        }
        if (this.participant?.muted) {
            this.showWaveform = false;
        }
        else {
            this.showWaveform = true;
        }
    }
    ngOnDestroy() {
        clearInterval(this.interval);
    }
    animateBar(index) {
        this.waveformAnimations[index] = 1;
        setTimeout(() => {
            this.waveformAnimations[index] = 0;
        }, this.getAnimationDuration(index));
    }
    animateWaveform() {
        this.waveformAnimations.forEach((_, index) => {
            setInterval(() => this.animateBar(index), this.getAnimationDuration(index) * 2);
        });
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
            await this.controlUserMedia?.({
                participantId: this.participant.id || '',
                participantName: this.participant.name,
                type: 'audio',
                socket: this.parameters.socket,
                coHostResponsibility: this.parameters.coHostResponsibility,
                roomName: this.parameters.roomName,
                showAlert: this.parameters.showAlert,
                coHost: this.parameters.coHost,
                islevel: this.parameters.islevel,
                member: this.parameters.member,
                participants: this.parameters.participants,
            });
        }
    }
    async toggleVideo() {
        if (this.participant) {
            await this.controlUserMedia?.({
                participantId: this.participant.id || '',
                participantName: this.participant.name,
                type: 'video',
                socket: this.parameters.socket,
                coHostResponsibility: this.parameters.coHostResponsibility,
                roomName: this.parameters.roomName,
                showAlert: this.parameters.showAlert,
                coHost: this.parameters.coHost,
                islevel: this.parameters.islevel,
                member: this.parameters.member,
                participants: this.parameters.participants,
            });
        }
    }
    renderControls() {
        return this.showControls;
    }
    // Helper method to combine styles
    combineStyles(baseStyle, additionalStyles) {
        return { ...baseStyle, ...additionalStyles };
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AudioCard, deps: [{ token: i0.NgZone }, { token: i1.ControlMedia }, { token: 'controlUserMedia', optional: true }, { token: 'customStyle', optional: true }, { token: 'name', optional: true }, { token: 'barColor', optional: true }, { token: 'textColor', optional: true }, { token: 'imageSource', optional: true }, { token: 'roundedImage', optional: true }, { token: 'imageStyle', optional: true }, { token: 'showControls', optional: true }, { token: 'showInfo', optional: true }, { token: 'videoInfoComponent', optional: true }, { token: 'videoControlsComponent', optional: true }, { token: 'controlsPosition', optional: true }, { token: 'infoPosition', optional: true }, { token: 'participant', optional: true }, { token: 'backgroundColor', optional: true }, { token: 'audioDecibels', optional: true }, { token: 'parameters', optional: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: AudioCard, isStandalone: true, selector: "app-audio-card", inputs: { controlUserMedia: "controlUserMedia", customStyle: "customStyle", name: "name", barColor: "barColor", textColor: "textColor", imageSource: "imageSource", roundedImage: "roundedImage", imageStyle: "imageStyle", showControls: "showControls", showInfo: "showInfo", videoInfoComponent: "videoInfoComponent", videoControlsComponent: "videoControlsComponent", controlsPosition: "controlsPosition", infoPosition: "infoPosition", participant: "participant", backgroundColor: "backgroundColor", audioDecibels: "audioDecibels", parameters: "parameters" }, ngImport: i0, template: "<div\r\n  class=\"card\"\r\n  [ngStyle]=\"customStyle\"\r\n  [style.backgroundColor]=\"backgroundColor\"\r\n>\r\n  <ng-container *ngIf=\"imageSource; else noImage\">\r\n    <div class=\"imageContainer\">\r\n      <img\r\n        [src]=\"imageSource\"\r\n        [ngStyle]=\"\r\n          combineStyles(imageStyle, {\r\n            'border-radius': roundedImage ? '20%' : '0'\r\n          })\r\n        \"\r\n        class=\"backgroundImage\"\r\n      />\r\n    </div>\r\n  </ng-container>\r\n  <ng-template #noImage>\r\n    <div style=\"width: 100%; height: 100%\">\r\n      <app-mini-card [initials]=\"name\" [fontSize]=\"20\" [ngStyle]=\"{ 'border': parameters.eventType === 'broadcast' ? '2px solid black' : '0px solid black' }\"></app-mini-card>\r\n    </div>\r\n  </ng-template>\r\n\r\n  <ng-container *ngIf=\"showInfo\">\r\n    <div\r\n      class=\"overlay\"\r\n      [ngStyle]=\"getOverlayPosition(infoPosition)\"\r\n      [ngClass]=\"showControls ? 'overlayWeb' : 'overlayWebAlt'\"\r\n    >\r\n      <div class=\"nameColumn\">\r\n        <p [ngStyle]=\"{ color: textColor }\" class=\"nameText\">{{ name }}</p>\r\n      </div>\r\n      <div *ngIf=\"showWaveform\" class=\"waveformWeb\">\r\n        <div\r\n          *ngFor=\"let animation of waveformAnimations\"\r\n          [ngStyle]=\"{\r\n            height: animation === 0 ? '1px' : '12px',\r\n            backgroundColor: barColor\r\n          }\"\r\n          class=\"bar\"\r\n        ></div>\r\n      </div>\r\n    </div>\r\n  </ng-container>\r\n\r\n  <ng-container *ngIf=\"renderControls()\">\r\n    <div\r\n      class=\"overlayControls\"\r\n      [ngStyle]=\"getOverlayPosition(controlsPosition)\"\r\n    >\r\n      <ng-container *ngIf=\"!videoControlsComponent\">\r\n        <button class=\"controlButton\" (click)=\"toggleAudio()\">\r\n          <fa-icon\r\n            [icon]=\"participant?.muted ? faMicrophoneSlash : faMicrophone\"\r\n            [style.color]=\"participant?.muted ? 'red' : 'green'\"\r\n          ></fa-icon>\r\n        </button>\r\n        <button class=\"controlButton\" (click)=\"toggleVideo()\">\r\n          <fa-icon\r\n            [icon]=\"participant?.['videoOn'] ? faVideo : faVideoSlash\"\r\n            [style.color]=\"participant?.['videoOn'] ? 'green' : 'red'\"\r\n          ></fa-icon>\r\n        </button>\r\n      </ng-container>\r\n      <ng-container *ngIf=\"videoControlsComponent\">\r\n        <ng-container *ngIf=\"isCustomComponent(videoControlsComponent)\">\r\n          <ng-container\r\n            *ngComponentOutlet=\"\r\n              videoControlsComponent.component;\r\n              injector: videoControlsComponent.injector\r\n            \"\r\n          ></ng-container>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"!isCustomComponent(videoControlsComponent)\">\r\n          <div [innerHTML]=\"videoControlsComponent.outerHTML\"></div>\r\n        </ng-container>\r\n      </ng-container>\r\n    </div>\r\n  </ng-container>\r\n</div>\r\n", styles: [".card{width:100%;height:100%;margin:0;padding:0;background-color:transparent;position:relative}.imageContainer{display:flex;justify-content:center;align-items:center;width:100%;height:100%}.backgroundImage{width:80px;height:80px;border-radius:50%}.overlayWeb{position:absolute;min-width:50%;min-height:5%;max-height:100%;display:grid;grid-template-columns:4fr 2fr;grid-gap:3px}.overlayWebAlt{position:absolute;min-width:50%;min-height:5%;max-height:100%;display:grid;grid-template-columns:4fr;grid-gap:0px;top:0;right:0}.overlayControls{display:flex;flex-direction:row;padding:0;position:absolute;top:0;left:0}.controlButton{justify-content:center;align-items:center;background-color:#0003;padding:0 5px;margin-right:2px;font-size:medium;border:none;cursor:pointer}.nameColumn{justify-content:center;align-items:center;background-color:#00000080;padding:5px 0 0;margin-right:2px;font-size:small;text-align:center;min-height:4%;max-height:70%}.nameText{font-size:small;font-weight:bolder}.waveformWeb{display:flex;justify-content:left;align-items:center;background-color:#0000000d;padding:0;flex-direction:row;min-height:4%;max-height:70%}.waveformMobile{flex-direction:row;align-items:center;background-color:#0000000d;padding:0;max-width:25%;margin:0}.bar{flex:1;opacity:.75;margin:0 1px;transition:height .5s ease}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i3.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }, { kind: "component", type: MiniCard, selector: "app-mini-card", inputs: ["initials", "fontSize", "customStyle", "imageSource", "roundedImage", "imageStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AudioCard, decorators: [{
            type: Component,
            args: [{ selector: 'app-audio-card', standalone: true, imports: [CommonModule, FontAwesomeModule, MiniCard], template: "<div\r\n  class=\"card\"\r\n  [ngStyle]=\"customStyle\"\r\n  [style.backgroundColor]=\"backgroundColor\"\r\n>\r\n  <ng-container *ngIf=\"imageSource; else noImage\">\r\n    <div class=\"imageContainer\">\r\n      <img\r\n        [src]=\"imageSource\"\r\n        [ngStyle]=\"\r\n          combineStyles(imageStyle, {\r\n            'border-radius': roundedImage ? '20%' : '0'\r\n          })\r\n        \"\r\n        class=\"backgroundImage\"\r\n      />\r\n    </div>\r\n  </ng-container>\r\n  <ng-template #noImage>\r\n    <div style=\"width: 100%; height: 100%\">\r\n      <app-mini-card [initials]=\"name\" [fontSize]=\"20\" [ngStyle]=\"{ 'border': parameters.eventType === 'broadcast' ? '2px solid black' : '0px solid black' }\"></app-mini-card>\r\n    </div>\r\n  </ng-template>\r\n\r\n  <ng-container *ngIf=\"showInfo\">\r\n    <div\r\n      class=\"overlay\"\r\n      [ngStyle]=\"getOverlayPosition(infoPosition)\"\r\n      [ngClass]=\"showControls ? 'overlayWeb' : 'overlayWebAlt'\"\r\n    >\r\n      <div class=\"nameColumn\">\r\n        <p [ngStyle]=\"{ color: textColor }\" class=\"nameText\">{{ name }}</p>\r\n      </div>\r\n      <div *ngIf=\"showWaveform\" class=\"waveformWeb\">\r\n        <div\r\n          *ngFor=\"let animation of waveformAnimations\"\r\n          [ngStyle]=\"{\r\n            height: animation === 0 ? '1px' : '12px',\r\n            backgroundColor: barColor\r\n          }\"\r\n          class=\"bar\"\r\n        ></div>\r\n      </div>\r\n    </div>\r\n  </ng-container>\r\n\r\n  <ng-container *ngIf=\"renderControls()\">\r\n    <div\r\n      class=\"overlayControls\"\r\n      [ngStyle]=\"getOverlayPosition(controlsPosition)\"\r\n    >\r\n      <ng-container *ngIf=\"!videoControlsComponent\">\r\n        <button class=\"controlButton\" (click)=\"toggleAudio()\">\r\n          <fa-icon\r\n            [icon]=\"participant?.muted ? faMicrophoneSlash : faMicrophone\"\r\n            [style.color]=\"participant?.muted ? 'red' : 'green'\"\r\n          ></fa-icon>\r\n        </button>\r\n        <button class=\"controlButton\" (click)=\"toggleVideo()\">\r\n          <fa-icon\r\n            [icon]=\"participant?.['videoOn'] ? faVideo : faVideoSlash\"\r\n            [style.color]=\"participant?.['videoOn'] ? 'green' : 'red'\"\r\n          ></fa-icon>\r\n        </button>\r\n      </ng-container>\r\n      <ng-container *ngIf=\"videoControlsComponent\">\r\n        <ng-container *ngIf=\"isCustomComponent(videoControlsComponent)\">\r\n          <ng-container\r\n            *ngComponentOutlet=\"\r\n              videoControlsComponent.component;\r\n              injector: videoControlsComponent.injector\r\n            \"\r\n          ></ng-container>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"!isCustomComponent(videoControlsComponent)\">\r\n          <div [innerHTML]=\"videoControlsComponent.outerHTML\"></div>\r\n        </ng-container>\r\n      </ng-container>\r\n    </div>\r\n  </ng-container>\r\n</div>\r\n", styles: [".card{width:100%;height:100%;margin:0;padding:0;background-color:transparent;position:relative}.imageContainer{display:flex;justify-content:center;align-items:center;width:100%;height:100%}.backgroundImage{width:80px;height:80px;border-radius:50%}.overlayWeb{position:absolute;min-width:50%;min-height:5%;max-height:100%;display:grid;grid-template-columns:4fr 2fr;grid-gap:3px}.overlayWebAlt{position:absolute;min-width:50%;min-height:5%;max-height:100%;display:grid;grid-template-columns:4fr;grid-gap:0px;top:0;right:0}.overlayControls{display:flex;flex-direction:row;padding:0;position:absolute;top:0;left:0}.controlButton{justify-content:center;align-items:center;background-color:#0003;padding:0 5px;margin-right:2px;font-size:medium;border:none;cursor:pointer}.nameColumn{justify-content:center;align-items:center;background-color:#00000080;padding:5px 0 0;margin-right:2px;font-size:small;text-align:center;min-height:4%;max-height:70%}.nameText{font-size:small;font-weight:bolder}.waveformWeb{display:flex;justify-content:left;align-items:center;background-color:#0000000d;padding:0;flex-direction:row;min-height:4%;max-height:70%}.waveformMobile{flex-direction:row;align-items:center;background-color:#0000000d;padding:0;max-width:25%;margin:0}.bar{flex:1;opacity:.75;margin:0 1px;transition:height .5s ease}\n"] }]
        }], ctorParameters: () => [{ type: i0.NgZone }, { type: i1.ControlMedia }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['controlUserMedia']
                }] }, { type: undefined, decorators: [{
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
                    args: ['showControls']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['showInfo']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['videoInfoComponent']
                }] }, { type: undefined, decorators: [{
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
                    args: ['parameters']
                }] }], propDecorators: { controlUserMedia: [{
                type: Input
            }], customStyle: [{
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
            }], parameters: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW8tY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvYXVkaW8tY2FyZC9hdWRpby1jYXJkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9hdWRpby1jYXJkL2F1ZGlvLWNhcmQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTZCLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFDTCxPQUFPLEVBQ1AsWUFBWSxFQUNaLFlBQVksRUFDWixpQkFBaUIsR0FDbEIsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUV0RixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7Ozs7O0FBMkQ1RCxNQUFNLE9BQU8sU0FBUztJQThCVjtJQUNBO0lBOUJELGdCQUFnQixDQUFtRDtJQUNuRSxXQUFXLEdBQWlDLEVBQUUsQ0FBQztJQUMvQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ1YsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUNqQixTQUFTLEdBQUcsT0FBTyxDQUFDO0lBQ3BCLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDakIsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUNyQixVQUFVLEdBQWlDLEVBQUUs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QUFROzswQkFBSSxNQUFNOzJCQUFDLGtCQUFrQjs7MEJBQ3JDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsY0FBYzs7MEJBQ2pDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsYUFBYTs7MEJBQ2hDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsaUJBQWlCOzswQkFDcEMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxlQUFlOzswQkFDbEMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxZQUFZO3lDQXREekIsZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csa0JBQWtCO3NCQUExQixLQUFLO2dCQUNHLHNCQUFzQjtzQkFBOUIsS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkRlc3Ryb3ksIE5nWm9uZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHtcbiAgZmFWaWRlbyxcbiAgZmFWaWRlb1NsYXNoLFxuICBmYU1pY3JvcGhvbmUsXG4gIGZhTWljcm9waG9uZVNsYXNoLFxufSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgZ2V0T3ZlcmxheVBvc2l0aW9uIH0gZnJvbSAnLi4vLi4vLi4vbWV0aG9kcy91dGlscy9nZXQtb3ZlcmxheS1wb3NpdGlvbi51dGlsJztcbmltcG9ydCB7IENvbnRyb2xNZWRpYSB9IGZyb20gJy4uLy4uLy4uL2NvbnN1bWVycy9jb250cm9sLW1lZGlhLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWluaUNhcmQgfSBmcm9tICcuLi9taW5pLWNhcmQvbWluaS1jYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBQYXJ0aWNpcGFudCxcbiAgQ29udHJvbHNQb3NpdGlvbixcbiAgSW5mb1Bvc2l0aW9uLFxuICBBdWRpb0RlY2liZWxzLFxuICBDb250cm9sTWVkaWFPcHRpb25zLFxuICBTaG93QWxlcnQsXG4gIENvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICBDdXN0b21Db21wb25lbnQsXG59IGZyb20gJy4uLy4uLy4uL0B0eXBlcy90eXBlcyc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBBdWRpb0NhcmRQYXJhbWV0ZXJzIHtcbiAgYXVkaW9EZWNpYmVsczogQXVkaW9EZWNpYmVsc1tdO1xuICBwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W107XG4gIHNvY2tldDogU29ja2V0O1xuICBjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXTtcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICBjb0hvc3Q6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBtZW1iZXI6IHN0cmluZztcbiAgZXZlbnRUeXBlOiBzdHJpbmc7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXMoKTogQXVkaW9DYXJkUGFyYW1ldGVycztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBdWRpb0NhcmRPcHRpb25zIHtcbiAgY29udHJvbFVzZXJNZWRpYT86IChvcHRpb25zOiBDb250cm9sTWVkaWFPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuICBjdXN0b21TdHlsZT86IFBhcnRpYWw8Q1NTU3R5bGVEZWNsYXJhdGlvbj47IC8vIFVzZSBQYXJ0aWFsIHRvIGFsbG93IHNwZWNpZmljIENTUyBwcm9wZXJ0aWVzXG4gIG5hbWU6IHN0cmluZzsgLy8gUmVxdWlyZWQgZmllbGQgZm9yIG5hbWVcbiAgYmFyQ29sb3I/OiBzdHJpbmc7IC8vIE9wdGlvbmFsIGNvbG9yIGZvciBhdWRpbyBiYXJcbiAgdGV4dENvbG9yPzogc3RyaW5nOyAvLyBPcHRpb25hbCBjb2xvciBmb3IgdGV4dFxuICBpbWFnZVNvdXJjZT86IHN0cmluZzsgLy8gT3B0aW9uYWwgVVJMIGZvciBpbWFnZSBzb3VyY2VcbiAgcm91bmRlZEltYWdlPzogYm9vbGVhbjsgLy8gT3B0aW9uYWwgZmxhZyBmb3Igcm91bmRlZCBpbWFnZVxuICBpbWFnZVN0eWxlPzogUGFydGlhbDxDU1NTdHlsZURlY2xhcmF0aW9uPjsgLy8gVXNlIFBhcnRpYWwgZm9yIENTUyBzdHlsZSB0eXBlIHNhZmV0eVxuICBzaG93Q29udHJvbHM/OiBib29sZWFuOyAvLyBUb2dnbGUgdG8gc2hvdy9oaWRlIGNvbnRyb2xzXG4gIHNob3dJbmZvPzogYm9vbGVhbjsgLy8gVG9nZ2xlIHRvIHNob3cvaGlkZSBpbmZvIHNlY3Rpb25cbiAgdmlkZW9JbmZvQ29tcG9uZW50PzogSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQ7IC8vIEN1c3RvbSBjb21wb25lbnQgZm9yIHBhcnRpY2lwYW50IGluZm9ybWF0aW9uXG4gIHZpZGVvQ29udHJvbHNDb21wb25lbnQ/OiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudDsgLy8gQ3VzdG9tIGNvbXBvbmVudCBmb3IgdmlkZW8gY29udHJvbHNcbiAgY29udHJvbHNQb3NpdGlvbj86IENvbnRyb2xzUG9zaXRpb247IC8vIEN1c3RvbSBjb250cm9sIHBvc2l0aW9uaW5nXG4gIGluZm9Qb3NpdGlvbj86IEluZm9Qb3NpdGlvbjsgLy8gQ3VzdG9tIGluZm8gcG9zaXRpb25pbmdcbiAgcGFydGljaXBhbnQ6IFBhcnRpY2lwYW50OyAvLyBSZXF1aXJlZCBwYXJ0aWNpcGFudCBvYmplY3QgcmVmZXJlbmNlXG4gIGJhY2tncm91bmRDb2xvcj86IHN0cmluZzsgLy8gT3B0aW9uYWwgYmFja2dyb3VuZCBjb2xvclxuICBhdWRpb0RlY2liZWxzPzogQXVkaW9EZWNpYmVsczsgLy8gT3B0aW9uYWwgYXVkaW8gZGVjaWJlbHMgaW5mb1xuICBwYXJhbWV0ZXJzOiBBdWRpb0NhcmRQYXJhbWV0ZXJzOyAvLyBSZXF1aXJlZCBwYXJhbWV0ZXJzIG9iamVjdCBmb3IgY29uZmlndXJhdGlvbnNcbn1cblxuZXhwb3J0IHR5cGUgQXVkaW9DYXJkVHlwZSA9IChvcHRpb25zOiBBdWRpb0NhcmRPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWF1ZGlvLWNhcmQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZSwgTWluaUNhcmRdLFxuICB0ZW1wbGF0ZVVybDogJy4vYXVkaW8tY2FyZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2F1ZGlvLWNhcmQuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBBdWRpb0NhcmQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGNvbnRyb2xVc2VyTWVkaWE/OiAob3B0aW9uczogQ29udHJvbE1lZGlhT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcbiAgQElucHV0KCkgY3VzdG9tU3R5bGU6IFBhcnRpYWw8Q1NTU3R5bGVEZWNsYXJhdGlvbj4gPSB7fTtcbiAgQElucHV0KCkgbmFtZSA9ICcnO1xuICBASW5wdXQoKSBiYXJDb2xvciA9ICdyZWQnO1xuICBASW5wdXQoKSB0ZXh0Q29sb3IgPSAnd2hpdGUnO1xuICBASW5wdXQoKSBpbWFnZVNvdXJjZSA9ICcnO1xuICBASW5wdXQoKSByb3VuZGVkSW1hZ2UgPSBmYWxzZTtcbiAgQElucHV0KCkgaW1hZ2VTdHlsZTogUGFydGlhbDxDU1NTdHlsZURlY2xhcmF0aW9uPiA9IHt9O1xuICBASW5wdXQoKSBzaG93Q29udHJvbHMgPSB0cnVlO1xuICBASW5wdXQoKSBzaG93SW5mbyA9IHRydWU7XG4gIEBJbnB1dCgpIHZpZGVvSW5mb0NvbXBvbmVudD86IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50OyAvLyBDdXN0b20gY29tcG9uZW50IGZvciBwYXJ0aWNpcGFudCBpbmZvcm1hdGlvblxuICBASW5wdXQoKSB2aWRlb0NvbnRyb2xzQ29tcG9uZW50PzogSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQ7IC8vIEN1c3RvbSBjb21wb25lbnQgZm9yIHZpZGVvIGNvbnRyb2xzXG4gIEBJbnB1dCgpIGNvbnRyb2xzUG9zaXRpb24gPSAndG9wTGVmdCc7XG4gIEBJbnB1dCgpIGluZm9Qb3NpdGlvbiA9ICd0b3BSaWdodCc7XG4gIEBJbnB1dCgpIHBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudCB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBiYWNrZ3JvdW5kQ29sb3IgPSAnJztcbiAgQElucHV0KCkgYXVkaW9EZWNpYmVsczogYW55O1xuICBASW5wdXQoKSBwYXJhbWV0ZXJzITogQXVkaW9DYXJkUGFyYW1ldGVycztcblxuICBmYVZpZGVvID0gZmFWaWRlbztcbiAgZmFWaWRlb1NsYXNoID0gZmFWaWRlb1NsYXNoO1xuICBmYU1pY3JvcGhvbmUgPSBmYU1pY3JvcGhvbmU7XG4gIGZhTWljcm9waG9uZVNsYXNoID0gZmFNaWNyb3Bob25lU2xhc2g7XG5cbiAgd2F2ZWZvcm1BbmltYXRpb25zOiBudW1iZXJbXSA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDkgfSwgKCkgPT4gMCk7XG4gIHNob3dXYXZlZm9ybSA9IHRydWU7XG4gIGludGVydmFsOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIGNvbnRyb2xNZWRpYVNlcnZpY2U6IENvbnRyb2xNZWRpYSxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoJ2NvbnRyb2xVc2VyTWVkaWEnKVxuICAgIGluamVjdGVkQ29udHJvbFVzZXJNZWRpYTogKG9wdGlvbnM6IENvbnRyb2xNZWRpYU9wdGlvbnMpID0+IFByb21pc2U8dm9pZD4sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnY3VzdG9tU3R5bGUnKSBpbmplY3RlZEN1c3RvbVN0eWxlOiBQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ25hbWUnKSBpbmplY3RlZE5hbWU6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdiYXJDb2xvcicpIGluamVjdGVkQmFyQ29sb3I6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCd0ZXh0Q29sb3InKSBpbmplY3RlZFRleHRDb2xvcjogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2ltYWdlU291cmNlJykgaW5qZWN0ZWRJbWFnZVNvdXJjZTogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3JvdW5kZWRJbWFnZScpIGluamVjdGVkUm91bmRlZEltYWdlOiBib29sZWFuLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2ltYWdlU3R5bGUnKSBpbmplY3RlZEltYWdlU3R5bGU6IFBhcnRpYWw8Q1NTU3R5bGVEZWNsYXJhdGlvbj4sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnc2hvd0NvbnRyb2xzJykgaW5qZWN0ZWRTaG93Q29udHJvbHM6IGJvb2xlYW4sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnc2hvd0luZm8nKSBpbmplY3RlZFNob3dJbmZvOiBib29sZWFuLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdCgndmlkZW9JbmZvQ29tcG9uZW50JylcbiAgICBpbmplY3RlZFZpZGVvSW5mb0NvbXBvbmVudDogSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQsXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KCd2aWRlb0NvbnRyb2xzQ29tcG9uZW50JylcbiAgICBpbmplY3RlZFZpZGVvQ29udHJvbHNDb21wb25lbnQ6IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2NvbnRyb2xzUG9zaXRpb24nKSBpbmplY3RlZENvbnRyb2xzUG9zaXRpb246IENvbnRyb2xzUG9zaXRpb24sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnaW5mb1Bvc2l0aW9uJykgaW5qZWN0ZWRJbmZvUG9zaXRpb246IEluZm9Qb3NpdGlvbixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdwYXJ0aWNpcGFudCcpIGluamVjdGVkUGFydGljaXBhbnQ6IFBhcnRpY2lwYW50IHwgbnVsbCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdiYWNrZ3JvdW5kQ29sb3InKSBpbmplY3RlZEJhY2tncm91bmRDb2xvcjogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2F1ZGlvRGVjaWJlbHMnKSBpbmplY3RlZEF1ZGlvRGVjaWJlbHM6IEF1ZGlvRGVjaWJlbHMsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgncGFyYW1ldGVycycpIGluamVjdGVkUGFyYW1ldGVyczogQXVkaW9DYXJkUGFyYW1ldGVycyxcbiAgKSB7XG4gICAgdGhpcy5jb250cm9sVXNlck1lZGlhID0gaW5qZWN0ZWRDb250cm9sVXNlck1lZGlhIHx8IHRoaXMuY29udHJvbFVzZXJNZWRpYTtcbiAgICB0aGlzLmN1c3RvbVN0eWxlID0gaW5qZWN0ZWRDdXN0b21TdHlsZSB8fCB0aGlzLmN1c3RvbVN0eWxlO1xuICAgIHRoaXMubmFtZSA9IGluamVjdGVkTmFtZSB8fCB0aGlzLm5hbWU7XG4gICAgdGhpcy5iYXJDb2xvciA9IGluamVjdGVkQmFyQ29sb3IgfHwgdGhpcy5iYXJDb2xvcjtcbiAgICB0aGlzLnRleHRDb2xvciA9IGluamVjdGVkVGV4dENvbG9yIHx8IHRoaXMudGV4dENvbG9yO1xuICAgIHRoaXMuaW1hZ2VTb3VyY2UgPSBpbmplY3RlZEltYWdlU291cmNlIHx8IHRoaXMuaW1hZ2VTb3VyY2U7XG4gICAgdGhpcy5yb3VuZGVkSW1hZ2UgPSBpbmplY3RlZFJvdW5kZWRJbWFnZSB8fCB0aGlzLnJvdW5kZWRJbWFnZTtcbiAgICB0aGlzLmltYWdlU3R5bGUgPSBpbmplY3RlZEltYWdlU3R5bGUgfHwgdGhpcy5pbWFnZVN0eWxlO1xuICAgIHRoaXMuc2hvd0NvbnRyb2xzID0gaW5qZWN0ZWRTaG93Q29udHJvbHMgIT0gbnVsbCA/IGluamVjdGVkU2hvd0NvbnRyb2xzIDogdGhpcy5zaG93Q29udHJvbHM7XG4gICAgdGhpcy5zaG93SW5mbyA9IGluamVjdGVkU2hvd0luZm8gIT0gbnVsbCA/IGluamVjdGVkU2hvd0luZm8gOiB0aGlzLnNob3dJbmZvO1xuICAgIHRoaXMudmlkZW9JbmZvQ29tcG9uZW50ID0gaW5qZWN0ZWRWaWRlb0luZm9Db21wb25lbnQgfHwgdGhpcy52aWRlb0luZm9Db21wb25lbnQ7XG4gICAgdGhpcy52aWRlb0NvbnRyb2xzQ29tcG9uZW50ID0gaW5qZWN0ZWRWaWRlb0NvbnRyb2xzQ29tcG9uZW50IHx8IHRoaXMudmlkZW9Db250cm9sc0NvbXBvbmVudDtcbiAgICB0aGlzLmNvbnRyb2xzUG9zaXRpb24gPSBpbmplY3RlZENvbnRyb2xzUG9zaXRpb24gfHwgdGhpcy5jb250cm9sc1Bvc2l0aW9uO1xuICAgIHRoaXMuaW5mb1Bvc2l0aW9uID0gaW5qZWN0ZWRJbmZvUG9zaXRpb24gfHwgdGhpcy5pbmZvUG9zaXRpb247XG4gICAgdGhpcy5wYXJ0aWNpcGFudCA9IGluamVjdGVkUGFydGljaXBhbnQgfHwgdGhpcy5wYXJ0aWNpcGFudDtcbiAgICB0aGlzLmJhY2tncm91bmRDb2xvciA9IGluamVjdGVkQmFja2dyb3VuZENvbG9yIHx8IHRoaXMuYmFja2dyb3VuZENvbG9yO1xuICAgIHRoaXMuYXVkaW9EZWNpYmVscyA9IGluamVjdGVkQXVkaW9EZWNpYmVscyB8fCB0aGlzLmF1ZGlvRGVjaWJlbHM7XG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gaW5qZWN0ZWRQYXJhbWV0ZXJzIHx8IHRoaXMucGFyYW1ldGVycztcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5jb250cm9sVXNlck1lZGlhKSB7XG4gICAgICB0aGlzLmNvbnRyb2xVc2VyTWVkaWEgPSBhc3luYyAob3B0aW9uczogQ29udHJvbE1lZGlhT3B0aW9ucykgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLmNvbnRyb2xNZWRpYVNlcnZpY2UuY29udHJvbE1lZGlhKG9wdGlvbnMpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYXJhbWV0ZXJzKSB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgeyBhdWRpb0RlY2liZWxzLCBwYXJ0aWNpcGFudHMgfSA9IHRoaXMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG4gICAgICAgICAgY29uc3QgZXhpc3RpbmdFbnRyeSA9IGF1ZGlvRGVjaWJlbHMuZmluZCgoZW50cnk6IGFueSkgPT4gZW50cnkubmFtZSA9PSB0aGlzLm5hbWUpO1xuICAgICAgICAgIHRoaXMucGFydGljaXBhbnQgPSBwYXJ0aWNpcGFudHMuZmluZCgocDogUGFydGljaXBhbnQpID0+IHAubmFtZSA9PSB0aGlzLm5hbWUpIHx8IG51bGw7XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBleGlzdGluZ0VudHJ5ICYmXG4gICAgICAgICAgICBleGlzdGluZ0VudHJ5LmF2ZXJhZ2VMb3VkbmVzcyA+IDEyNy41ICYmXG4gICAgICAgICAgICB0aGlzLnBhcnRpY2lwYW50ICYmXG4gICAgICAgICAgICAhdGhpcy5wYXJ0aWNpcGFudC5tdXRlZFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRlV2F2ZWZvcm0oKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXNldFdhdmVmb3JtKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhcnRpY2lwYW50Py5tdXRlZCkge1xuICAgICAgdGhpcy5zaG93V2F2ZWZvcm0gPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93V2F2ZWZvcm0gPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gIH1cblxuICBhbmltYXRlQmFyKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLndhdmVmb3JtQW5pbWF0aW9uc1tpbmRleF0gPSAxO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy53YXZlZm9ybUFuaW1hdGlvbnNbaW5kZXhdID0gMDtcbiAgICB9LCB0aGlzLmdldEFuaW1hdGlvbkR1cmF0aW9uKGluZGV4KSk7XG4gIH1cblxuICBhbmltYXRlV2F2ZWZvcm0oKSB7XG4gICAgdGhpcy53YXZlZm9ybUFuaW1hdGlvbnMuZm9yRWFjaCgoXywgaW5kZXgpID0+IHtcbiAgICAgIHNldEludGVydmFsKCgpID0+IHRoaXMuYW5pbWF0ZUJhcihpbmRleCksIHRoaXMuZ2V0QW5pbWF0aW9uRHVyYXRpb24oaW5kZXgpICogMik7XG4gICAgfSk7XG4gIH1cblxuICByZXNldFdhdmVmb3JtKCkge1xuICAgIHRoaXMud2F2ZWZvcm1BbmltYXRpb25zLmZpbGwoMCk7XG4gIH1cblxuICBnZXRBbmltYXRpb25EdXJhdGlvbihpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBkdXJhdGlvbnMgPSBbNDc0LCA0MzMsIDQwNywgNDU4LCA0MDAsIDQyNywgNDQxLCA0MTksIDQ4N107XG4gICAgcmV0dXJuIGR1cmF0aW9uc1tpbmRleF0gfHwgMDtcbiAgfVxuXG4gIGFzeW5jIHRvZ2dsZUF1ZGlvKCkge1xuICAgIGlmICh0aGlzLnBhcnRpY2lwYW50ICYmICF0aGlzLnBhcnRpY2lwYW50Lm11dGVkKSB7XG4gICAgICBhd2FpdCB0aGlzLmNvbnRyb2xVc2VyTWVkaWE/Lih7XG4gICAgICAgIHBhcnRpY2lwYW50SWQ6IHRoaXMucGFydGljaXBhbnQuaWQgfHwgJycsXG4gICAgICAgIHBhcnRpY2lwYW50TmFtZTogdGhpcy5wYXJ0aWNpcGFudC5uYW1lLFxuICAgICAgICB0eXBlOiAnYXVkaW8nLFxuICAgICAgICBzb2NrZXQ6IHRoaXMucGFyYW1ldGVycy5zb2NrZXQsXG4gICAgICAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiB0aGlzLnBhcmFtZXRlcnMuY29Ib3N0UmVzcG9uc2liaWxpdHksXG4gICAgICAgIHJvb21OYW1lOiB0aGlzLnBhcmFtZXRlcnMucm9vbU5hbWUsXG4gICAgICAgIHNob3dBbGVydDogdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydCxcbiAgICAgICAgY29Ib3N0OiB0aGlzLnBhcmFtZXRlcnMuY29Ib3N0LFxuICAgICAgICBpc2xldmVsOiB0aGlzLnBhcmFtZXRlcnMuaXNsZXZlbCxcbiAgICAgICAgbWVtYmVyOiB0aGlzLnBhcmFtZXRlcnMubWVtYmVyLFxuICAgICAgICBwYXJ0aWNpcGFudHM6IHRoaXMucGFyYW1ldGVycy5wYXJ0aWNpcGFudHMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBhc3luYyB0b2dnbGVWaWRlbygpIHtcbiAgICBpZiAodGhpcy5wYXJ0aWNpcGFudCkge1xuICAgICAgYXdhaXQgdGhpcy5jb250cm9sVXNlck1lZGlhPy4oe1xuICAgICAgICBwYXJ0aWNpcGFudElkOiB0aGlzLnBhcnRpY2lwYW50LmlkIHx8ICcnLFxuICAgICAgICBwYXJ0aWNpcGFudE5hbWU6IHRoaXMucGFydGljaXBhbnQubmFtZSxcbiAgICAgICAgdHlwZTogJ3ZpZGVvJyxcbiAgICAgICAgc29ja2V0OiB0aGlzLnBhcmFtZXRlcnMuc29ja2V0LFxuICAgICAgICBjb0hvc3RSZXNwb25zaWJpbGl0eTogdGhpcy5wYXJhbWV0ZXJzLmNvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICAgICAgICByb29tTmFtZTogdGhpcy5wYXJhbWV0ZXJzLnJvb21OYW1lLFxuICAgICAgICBzaG93QWxlcnQ6IHRoaXMucGFyYW1ldGVycy5zaG93QWxlcnQsXG4gICAgICAgIGNvSG9zdDogdGhpcy5wYXJhbWV0ZXJzLmNvSG9zdCxcbiAgICAgICAgaXNsZXZlbDogdGhpcy5wYXJhbWV0ZXJzLmlzbGV2ZWwsXG4gICAgICAgIG1lbWJlcjogdGhpcy5wYXJhbWV0ZXJzLm1lbWJlcixcbiAgICAgICAgcGFydGljaXBhbnRzOiB0aGlzLnBhcmFtZXRlcnMucGFydGljaXBhbnRzLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyQ29udHJvbHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2hvd0NvbnRyb2xzO1xuICB9XG5cbiAgLy8gSGVscGVyIG1ldGhvZCB0byBjb21iaW5lIHN0eWxlc1xuICBjb21iaW5lU3R5bGVzKGJhc2VTdHlsZTogYW55LCBhZGRpdGlvbmFsU3R5bGVzOiBhbnkpIHtcbiAgICByZXR1cm4geyAuLi5iYXNlU3R5bGUsIC4uLmFkZGl0aW9uYWxTdHlsZXMgfTtcbiAgfVxuXG4gIGdldE92ZXJsYXlQb3NpdGlvbihwb3NpdGlvbjogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGdldE92ZXJsYXlQb3NpdGlvbih7IHBvc2l0aW9uIH0pO1xuICB9XG5cbiAgaXNDdXN0b21Db21wb25lbnQoXG4gICAgY29tcDogSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQgfCAoKCkgPT4gSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQpLFxuICApOiBjb21wIGlzIEN1c3RvbUNvbXBvbmVudCB7XG4gICAgcmV0dXJuIChcbiAgICAgIHR5cGVvZiAoY29tcCBhcyBDdXN0b21Db21wb25lbnQpLmNvbXBvbmVudCAhPT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgKGNvbXAgYXMgQ3VzdG9tQ29tcG9uZW50KS5jb21wb25lbnQgIT09IHVuZGVmaW5lZFxuICAgICk7XG4gIH1cblxuICBpc0Z1bmN0aW9uQ29tcG9uZW50KFxuICAgIGNvbXA6IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50IHwgKCgpID0+IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50KSxcbiAgKTogY29tcCBpcyAoKSA9PiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudCB7XG4gICAgcmV0dXJuIHR5cGVvZiBjb21wID09PSAnZnVuY3Rpb24nO1xuICB9XG59XG4iLCI8ZGl2XHJcbiAgY2xhc3M9XCJjYXJkXCJcclxuICBbbmdTdHlsZV09XCJjdXN0b21TdHlsZVwiXHJcbiAgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJiYWNrZ3JvdW5kQ29sb3JcIlxyXG4+XHJcbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImltYWdlU291cmNlOyBlbHNlIG5vSW1hZ2VcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJpbWFnZUNvbnRhaW5lclwiPlxyXG4gICAgICA8aW1nXHJcbiAgICAgICAgW3NyY109XCJpbWFnZVNvdXJjZVwiXHJcbiAgICAgICAgW25nU3R5bGVdPVwiXHJcbiAgICAgICAgICBjb21iaW5lU3R5bGVzKGltYWdlU3R5bGUsIHtcclxuICAgICAgICAgICAgJ2JvcmRlci1yYWRpdXMnOiByb3VuZGVkSW1hZ2UgPyAnMjAlJyA6ICcwJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICBcIlxyXG4gICAgICAgIGNsYXNzPVwiYmFja2dyb3VuZEltYWdlXCJcclxuICAgICAgLz5cclxuICAgIDwvZGl2PlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG4gIDxuZy10ZW1wbGF0ZSAjbm9JbWFnZT5cclxuICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlXCI+XHJcbiAgICAgIDxhcHAtbWluaS1jYXJkIFtpbml0aWFsc109XCJuYW1lXCIgW2ZvbnRTaXplXT1cIjIwXCIgW25nU3R5bGVdPVwieyAnYm9yZGVyJzogcGFyYW1ldGVycy5ldmVudFR5cGUgPT09ICdicm9hZGNhc3QnID8gJzJweCBzb2xpZCBibGFjaycgOiAnMHB4IHNvbGlkIGJsYWNrJyB9XCI+PC9hcHAtbWluaS1jYXJkPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9uZy10ZW1wbGF0ZT5cclxuXHJcbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNob3dJbmZvXCI+XHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzPVwib3ZlcmxheVwiXHJcbiAgICAgIFtuZ1N0eWxlXT1cImdldE92ZXJsYXlQb3NpdGlvbihpbmZvUG9zaXRpb24pXCJcclxuICAgICAgW25nQ2xhc3NdPVwic2hvd0NvbnRyb2xzID8gJ292ZXJsYXlXZWInIDogJ292ZXJsYXlXZWJBbHQnXCJcclxuICAgID5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5hbWVDb2x1bW5cIj5cclxuICAgICAgICA8cCBbbmdTdHlsZV09XCJ7IGNvbG9yOiB0ZXh0Q29sb3IgfVwiIGNsYXNzPVwibmFtZVRleHRcIj57eyBuYW1lIH19PC9wPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdJZj1cInNob3dXYXZlZm9ybVwiIGNsYXNzPVwid2F2ZWZvcm1XZWJcIj5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgYW5pbWF0aW9uIG9mIHdhdmVmb3JtQW5pbWF0aW9uc1wiXHJcbiAgICAgICAgICBbbmdTdHlsZV09XCJ7XHJcbiAgICAgICAgICAgIGhlaWdodDogYW5pbWF0aW9uID09PSAwID8gJzFweCcgOiAnMTJweCcsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogYmFyQ29sb3JcclxuICAgICAgICAgIH1cIlxyXG4gICAgICAgICAgY2xhc3M9XCJiYXJcIlxyXG4gICAgICAgID48L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInJlbmRlckNvbnRyb2xzKClcIj5cclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJvdmVybGF5Q29udHJvbHNcIlxyXG4gICAgICBbbmdTdHlsZV09XCJnZXRPdmVybGF5UG9zaXRpb24oY29udHJvbHNQb3NpdGlvbilcIlxyXG4gICAgPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXZpZGVvQ29udHJvbHNDb21wb25lbnRcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY29udHJvbEJ1dHRvblwiIChjbGljayk9XCJ0b2dnbGVBdWRpbygpXCI+XHJcbiAgICAgICAgICA8ZmEtaWNvblxyXG4gICAgICAgICAgICBbaWNvbl09XCJwYXJ0aWNpcGFudD8ubXV0ZWQgPyBmYU1pY3JvcGhvbmVTbGFzaCA6IGZhTWljcm9waG9uZVwiXHJcbiAgICAgICAgICAgIFtzdHlsZS5jb2xvcl09XCJwYXJ0aWNpcGFudD8ubXV0ZWQgPyAncmVkJyA6ICdncmVlbidcIlxyXG4gICAgICAgICAgPjwvZmEtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY29udHJvbEJ1dHRvblwiIChjbGljayk9XCJ0b2dnbGVWaWRlbygpXCI+XHJcbiAgICAgICAgICA8ZmEtaWNvblxyXG4gICAgICAgICAgICBbaWNvbl09XCJwYXJ0aWNpcGFudD8uWyd2aWRlb09uJ10gPyBmYVZpZGVvIDogZmFWaWRlb1NsYXNoXCJcclxuICAgICAgICAgICAgW3N0eWxlLmNvbG9yXT1cInBhcnRpY2lwYW50Py5bJ3ZpZGVvT24nXSA/ICdncmVlbicgOiAncmVkJ1wiXHJcbiAgICAgICAgICA+PC9mYS1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZGVvQ29udHJvbHNDb21wb25lbnRcIj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNDdXN0b21Db21wb25lbnQodmlkZW9Db250cm9sc0NvbXBvbmVudClcIj5cclxuICAgICAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICAgICAgKm5nQ29tcG9uZW50T3V0bGV0PVwiXHJcbiAgICAgICAgICAgICAgdmlkZW9Db250cm9sc0NvbXBvbmVudC5jb21wb25lbnQ7XHJcbiAgICAgICAgICAgICAgaW5qZWN0b3I6IHZpZGVvQ29udHJvbHNDb21wb25lbnQuaW5qZWN0b3JcclxuICAgICAgICAgICAgXCJcclxuICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzQ3VzdG9tQ29tcG9uZW50KHZpZGVvQ29udHJvbHNDb21wb25lbnQpXCI+XHJcbiAgICAgICAgICA8ZGl2IFtpbm5lckhUTUxdPVwidmlkZW9Db250cm9sc0NvbXBvbmVudC5vdXRlckhUTUxcIj48L2Rpdj5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L2Rpdj5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuPC9kaXY+XHJcbiJdfQ==