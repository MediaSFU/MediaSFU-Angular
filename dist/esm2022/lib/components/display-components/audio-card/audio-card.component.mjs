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
/**
 * AudioCard component renders an audio card for participants with customizable options and media controls.
 * It shows audio waveform animations, video/audio toggle buttons, and additional info based on injected or passed properties.
 *
 * @selector app-audio-card
 * @standalone true
 * @imports CommonModule, FontAwesomeModule, MiniCard
 *
 * @inputs
 * - `controlUserMedia` (function): Optional function to control media actions for a participant.
 * - `customStyle` (Partial<CSSStyleDeclaration>): Custom CSS styles for the audio card.
 * - `name` (string): Name of the participant.
 * - `barColor` (string): Color for the audio bar. Default is 'red'.
 * - `textColor` (string): Text color. Default is 'white'.
 * - `imageSource` (string): Image source URL for participant.
 * - `roundedImage` (boolean): Toggle for rounded image style.
 * - `imageStyle` (Partial<CSSStyleDeclaration>): Custom styles for the image.
 * - `showControls` (boolean): Toggle for displaying media controls. Default is true.
 * - `showInfo` (boolean): Toggle for displaying info section. Default is true.
 * - `videoInfoComponent` (HTMLElement | CustomComponent): Custom component for participant info.
 * - `videoControlsComponent` (HTMLElement | CustomComponent): Custom component for video controls.
 * - `controlsPosition` (ControlsPosition): Position for controls on the card. Default is 'topLeft'.
 * - `infoPosition` (InfoPosition): Position for the info section. Default is 'topRight'.
 * - `participant` (Participant | null): Participant object reference.
 * - `backgroundColor` (string): Background color for the card.
 * - `audioDecibels` (AudioDecibels): Optional audio decibel levels for the participant.
 * - `parameters` (AudioCardParameters): Required object with configuration parameters.
 *
 * @methods
 * - `ngOnInit()`: Initializes the component, sets default media control behavior, and activates audio waveform animations.
 * - `ngOnDestroy()`: Clears the animation interval.
 * - `animateBar(index: number)`: Animates the audio bar at a specified index.
 * - `animateWaveform()`: Triggers animations across the waveform bars.
 * - `resetWaveform()`: Resets waveform animations to default.
 * - `getAnimationDuration(index: number)`: Retrieves the animation duration for a bar by index.
 * - `toggleAudio()`: Toggles audio for the participant if media control function is defined.
 * - `toggleVideo()`: Toggles video for the participant if media control function is defined.
 * - `renderControls()`: Returns `showControls` to render or hide media controls.
 * - `combineStyles(baseStyle: any, additionalStyles: any)`: Combines base and additional styles for inline styling.
 * - `getOverlayPosition(position: string)`: Retrieves calculated overlay position for elements.
 * - `isCustomComponent(comp: HTMLElement | CustomComponent)`: Type guard for identifying custom components.
 * - `isFunctionComponent(comp: HTMLElement | CustomComponent)`: Type guard for identifying function components.
 *
 * @example
 * ```html
 * <app-audio-card
 *  [controlUserMedia]="controlMediaFunction"
 * [name]="participantName"
 * [barColor]="'blue'"
 * [textColor]="'black'"
 * [imageSource]="participantImageURL"
 * [roundedImage]="true"
 * [showControls]="true"
 * [participant]="participant"
 * [parameters]="audioCardParameters">
 * </app-audio-card>
 * ```
 *
 **/
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW8tY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvYXVkaW8tY2FyZC9hdWRpby1jYXJkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9hdWRpby1jYXJkL2F1ZGlvLWNhcmQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTZCLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFDTCxPQUFPLEVBQ1AsWUFBWSxFQUNaLFlBQVksRUFDWixpQkFBaUIsR0FDbEIsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUV0RixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7Ozs7O0FBb0Q1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTBESTtBQVNKLE1BQU0sT0FBTyxTQUFTO0lBOEJWO0lBQ0E7SUE5QkQsZ0JBQWdCLENBQW1EO0lBQ25FLFdBQVcsR0FBaUMsRUFBRSxDQUFDO0lBQy9DLElBQUksR0FBRyxFQUFFLENBQUM7SUFDVixRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ2pCLFNBQVMsR0FBRyxPQUFPLENBQUM7SUFDcEIs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QUNSLE1BQU07MkJBQUMsb0JBQW9COzswQkFFM0IsUUFBUTs7MEJBQ1IsTUFBTTsyQkFBQyx3QkFBd0I7OzBCQUUvQixRQUFROzswQkFBSSxNQUFNOzJCQUFDLGtCQUFrQjs7MEJBQ3JDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsY0FBYzs7MEJBQ2pDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsYUFBYTs7MEJBQ2hDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsaUJBQWlCOzswQkFDcEMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxlQUFlOzswQkFDbEMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxZQUFZO3lDQXREekIsZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csa0JBQWtCO3NCQUExQixLQUFLO2dCQUNHLHNCQUFzQjtzQkFBOUIsS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkRlc3Ryb3ksIE5nWm9uZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHtcbiAgZmFWaWRlbyxcbiAgZmFWaWRlb1NsYXNoLFxuICBmYU1pY3JvcGhvbmUsXG4gIGZhTWljcm9waG9uZVNsYXNoLFxufSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgZ2V0T3ZlcmxheVBvc2l0aW9uIH0gZnJvbSAnLi4vLi4vLi4vbWV0aG9kcy91dGlscy9nZXQtb3ZlcmxheS1wb3NpdGlvbi51dGlsJztcbmltcG9ydCB7IENvbnRyb2xNZWRpYSB9IGZyb20gJy4uLy4uLy4uL2NvbnN1bWVycy9jb250cm9sLW1lZGlhLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWluaUNhcmQgfSBmcm9tICcuLi9taW5pLWNhcmQvbWluaS1jYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBQYXJ0aWNpcGFudCxcbiAgQ29udHJvbHNQb3NpdGlvbixcbiAgSW5mb1Bvc2l0aW9uLFxuICBBdWRpb0RlY2liZWxzLFxuICBDb250cm9sTWVkaWFPcHRpb25zLFxuICBTaG93QWxlcnQsXG4gIENvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICBDdXN0b21Db21wb25lbnQsXG59IGZyb20gJy4uLy4uLy4uL0B0eXBlcy90eXBlcyc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBBdWRpb0NhcmRQYXJhbWV0ZXJzIHtcbiAgYXVkaW9EZWNpYmVsczogQXVkaW9EZWNpYmVsc1tdO1xuICBwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W107XG4gIHNvY2tldDogU29ja2V0O1xuICBjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXTtcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICBjb0hvc3Q6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBtZW1iZXI6IHN0cmluZztcbiAgZXZlbnRUeXBlOiBzdHJpbmc7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXMoKTogQXVkaW9DYXJkUGFyYW1ldGVycztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBdWRpb0NhcmRPcHRpb25zIHtcbiAgY29udHJvbFVzZXJNZWRpYT86IChvcHRpb25zOiBDb250cm9sTWVkaWFPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuICBjdXN0b21TdHlsZT86IFBhcnRpYWw8Q1NTU3R5bGVEZWNsYXJhdGlvbj47IC8vIFVzZSBQYXJ0aWFsIHRvIGFsbG93IHNwZWNpZmljIENTUyBwcm9wZXJ0aWVzXG4gIG5hbWU6IHN0cmluZzsgLy8gUmVxdWlyZWQgZmllbGQgZm9yIG5hbWVcbiAgYmFyQ29sb3I/OiBzdHJpbmc7IC8vIE9wdGlvbmFsIGNvbG9yIGZvciBhdWRpbyBiYXJcbiAgdGV4dENvbG9yPzogc3RyaW5nOyAvLyBPcHRpb25hbCBjb2xvciBmb3IgdGV4dFxuICBpbWFnZVNvdXJjZT86IHN0cmluZzsgLy8gT3B0aW9uYWwgVVJMIGZvciBpbWFnZSBzb3VyY2VcbiAgcm91bmRlZEltYWdlPzogYm9vbGVhbjsgLy8gT3B0aW9uYWwgZmxhZyBmb3Igcm91bmRlZCBpbWFnZVxuICBpbWFnZVN0eWxlPzogUGFydGlhbDxDU1NTdHlsZURlY2xhcmF0aW9uPjsgLy8gVXNlIFBhcnRpYWwgZm9yIENTUyBzdHlsZSB0eXBlIHNhZmV0eVxuICBzaG93Q29udHJvbHM/OiBib29sZWFuOyAvLyBUb2dnbGUgdG8gc2hvdy9oaWRlIGNvbnRyb2xzXG4gIHNob3dJbmZvPzogYm9vbGVhbjsgLy8gVG9nZ2xlIHRvIHNob3cvaGlkZSBpbmZvIHNlY3Rpb25cbiAgdmlkZW9JbmZvQ29tcG9uZW50PzogSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQ7IC8vIEN1c3RvbSBjb21wb25lbnQgZm9yIHBhcnRpY2lwYW50IGluZm9ybWF0aW9uXG4gIHZpZGVvQ29udHJvbHNDb21wb25lbnQ/OiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudDsgLy8gQ3VzdG9tIGNvbXBvbmVudCBmb3IgdmlkZW8gY29udHJvbHNcbiAgY29udHJvbHNQb3NpdGlvbj86IENvbnRyb2xzUG9zaXRpb247IC8vIEN1c3RvbSBjb250cm9sIHBvc2l0aW9uaW5nXG4gIGluZm9Qb3NpdGlvbj86IEluZm9Qb3NpdGlvbjsgLy8gQ3VzdG9tIGluZm8gcG9zaXRpb25pbmdcbiAgcGFydGljaXBhbnQ6IFBhcnRpY2lwYW50OyAvLyBSZXF1aXJlZCBwYXJ0aWNpcGFudCBvYmplY3QgcmVmZXJlbmNlXG4gIGJhY2tncm91bmRDb2xvcj86IHN0cmluZzsgLy8gT3B0aW9uYWwgYmFja2dyb3VuZCBjb2xvclxuICBhdWRpb0RlY2liZWxzPzogQXVkaW9EZWNpYmVsczsgLy8gT3B0aW9uYWwgYXVkaW8gZGVjaWJlbHMgaW5mb1xuICBwYXJhbWV0ZXJzOiBBdWRpb0NhcmRQYXJhbWV0ZXJzOyAvLyBSZXF1aXJlZCBwYXJhbWV0ZXJzIG9iamVjdCBmb3IgY29uZmlndXJhdGlvbnNcbn1cblxuZXhwb3J0IHR5cGUgQXVkaW9DYXJkVHlwZSA9IChvcHRpb25zOiBBdWRpb0NhcmRPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuLyoqXG4gKiBBdWRpb0NhcmQgY29tcG9uZW50IHJlbmRlcnMgYW4gYXVkaW8gY2FyZCBmb3IgcGFydGljaXBhbnRzIHdpdGggY3VzdG9taXphYmxlIG9wdGlvbnMgYW5kIG1lZGlhIGNvbnRyb2xzLlxuICogSXQgc2hvd3MgYXVkaW8gd2F2ZWZvcm0gYW5pbWF0aW9ucywgdmlkZW8vYXVkaW8gdG9nZ2xlIGJ1dHRvbnMsIGFuZCBhZGRpdGlvbmFsIGluZm8gYmFzZWQgb24gaW5qZWN0ZWQgb3IgcGFzc2VkIHByb3BlcnRpZXMuXG4gKlxuICogQHNlbGVjdG9yIGFwcC1hdWRpby1jYXJkXG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlLCBNaW5pQ2FyZFxuICpcbiAqIEBpbnB1dHNcbiAqIC0gYGNvbnRyb2xVc2VyTWVkaWFgIChmdW5jdGlvbik6IE9wdGlvbmFsIGZ1bmN0aW9uIHRvIGNvbnRyb2wgbWVkaWEgYWN0aW9ucyBmb3IgYSBwYXJ0aWNpcGFudC5cbiAqIC0gYGN1c3RvbVN0eWxlYCAoUGFydGlhbDxDU1NTdHlsZURlY2xhcmF0aW9uPik6IEN1c3RvbSBDU1Mgc3R5bGVzIGZvciB0aGUgYXVkaW8gY2FyZC5cbiAqIC0gYG5hbWVgIChzdHJpbmcpOiBOYW1lIG9mIHRoZSBwYXJ0aWNpcGFudC5cbiAqIC0gYGJhckNvbG9yYCAoc3RyaW5nKTogQ29sb3IgZm9yIHRoZSBhdWRpbyBiYXIuIERlZmF1bHQgaXMgJ3JlZCcuXG4gKiAtIGB0ZXh0Q29sb3JgIChzdHJpbmcpOiBUZXh0IGNvbG9yLiBEZWZhdWx0IGlzICd3aGl0ZScuXG4gKiAtIGBpbWFnZVNvdXJjZWAgKHN0cmluZyk6IEltYWdlIHNvdXJjZSBVUkwgZm9yIHBhcnRpY2lwYW50LlxuICogLSBgcm91bmRlZEltYWdlYCAoYm9vbGVhbik6IFRvZ2dsZSBmb3Igcm91bmRlZCBpbWFnZSBzdHlsZS5cbiAqIC0gYGltYWdlU3R5bGVgIChQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+KTogQ3VzdG9tIHN0eWxlcyBmb3IgdGhlIGltYWdlLlxuICogLSBgc2hvd0NvbnRyb2xzYCAoYm9vbGVhbik6IFRvZ2dsZSBmb3IgZGlzcGxheWluZyBtZWRpYSBjb250cm9scy4gRGVmYXVsdCBpcyB0cnVlLlxuICogLSBgc2hvd0luZm9gIChib29sZWFuKTogVG9nZ2xlIGZvciBkaXNwbGF5aW5nIGluZm8gc2VjdGlvbi4gRGVmYXVsdCBpcyB0cnVlLlxuICogLSBgdmlkZW9JbmZvQ29tcG9uZW50YCAoSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQpOiBDdXN0b20gY29tcG9uZW50IGZvciBwYXJ0aWNpcGFudCBpbmZvLlxuICogLSBgdmlkZW9Db250cm9sc0NvbXBvbmVudGAgKEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50KTogQ3VzdG9tIGNvbXBvbmVudCBmb3IgdmlkZW8gY29udHJvbHMuXG4gKiAtIGBjb250cm9sc1Bvc2l0aW9uYCAoQ29udHJvbHNQb3NpdGlvbik6IFBvc2l0aW9uIGZvciBjb250cm9scyBvbiB0aGUgY2FyZC4gRGVmYXVsdCBpcyAndG9wTGVmdCcuXG4gKiAtIGBpbmZvUG9zaXRpb25gIChJbmZvUG9zaXRpb24pOiBQb3NpdGlvbiBmb3IgdGhlIGluZm8gc2VjdGlvbi4gRGVmYXVsdCBpcyAndG9wUmlnaHQnLlxuICogLSBgcGFydGljaXBhbnRgIChQYXJ0aWNpcGFudCB8IG51bGwpOiBQYXJ0aWNpcGFudCBvYmplY3QgcmVmZXJlbmNlLlxuICogLSBgYmFja2dyb3VuZENvbG9yYCAoc3RyaW5nKTogQmFja2dyb3VuZCBjb2xvciBmb3IgdGhlIGNhcmQuXG4gKiAtIGBhdWRpb0RlY2liZWxzYCAoQXVkaW9EZWNpYmVscyk6IE9wdGlvbmFsIGF1ZGlvIGRlY2liZWwgbGV2ZWxzIGZvciB0aGUgcGFydGljaXBhbnQuXG4gKiAtIGBwYXJhbWV0ZXJzYCAoQXVkaW9DYXJkUGFyYW1ldGVycyk6IFJlcXVpcmVkIG9iamVjdCB3aXRoIGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycy5cbiAqXG4gKiBAbWV0aG9kc1xuICogLSBgbmdPbkluaXQoKWA6IEluaXRpYWxpemVzIHRoZSBjb21wb25lbnQsIHNldHMgZGVmYXVsdCBtZWRpYSBjb250cm9sIGJlaGF2aW9yLCBhbmQgYWN0aXZhdGVzIGF1ZGlvIHdhdmVmb3JtIGFuaW1hdGlvbnMuXG4gKiAtIGBuZ09uRGVzdHJveSgpYDogQ2xlYXJzIHRoZSBhbmltYXRpb24gaW50ZXJ2YWwuXG4gKiAtIGBhbmltYXRlQmFyKGluZGV4OiBudW1iZXIpYDogQW5pbWF0ZXMgdGhlIGF1ZGlvIGJhciBhdCBhIHNwZWNpZmllZCBpbmRleC5cbiAqIC0gYGFuaW1hdGVXYXZlZm9ybSgpYDogVHJpZ2dlcnMgYW5pbWF0aW9ucyBhY3Jvc3MgdGhlIHdhdmVmb3JtIGJhcnMuXG4gKiAtIGByZXNldFdhdmVmb3JtKClgOiBSZXNldHMgd2F2ZWZvcm0gYW5pbWF0aW9ucyB0byBkZWZhdWx0LlxuICogLSBgZ2V0QW5pbWF0aW9uRHVyYXRpb24oaW5kZXg6IG51bWJlcilgOiBSZXRyaWV2ZXMgdGhlIGFuaW1hdGlvbiBkdXJhdGlvbiBmb3IgYSBiYXIgYnkgaW5kZXguXG4gKiAtIGB0b2dnbGVBdWRpbygpYDogVG9nZ2xlcyBhdWRpbyBmb3IgdGhlIHBhcnRpY2lwYW50IGlmIG1lZGlhIGNvbnRyb2wgZnVuY3Rpb24gaXMgZGVmaW5lZC5cbiAqIC0gYHRvZ2dsZVZpZGVvKClgOiBUb2dnbGVzIHZpZGVvIGZvciB0aGUgcGFydGljaXBhbnQgaWYgbWVkaWEgY29udHJvbCBmdW5jdGlvbiBpcyBkZWZpbmVkLlxuICogLSBgcmVuZGVyQ29udHJvbHMoKWA6IFJldHVybnMgYHNob3dDb250cm9sc2AgdG8gcmVuZGVyIG9yIGhpZGUgbWVkaWEgY29udHJvbHMuXG4gKiAtIGBjb21iaW5lU3R5bGVzKGJhc2VTdHlsZTogYW55LCBhZGRpdGlvbmFsU3R5bGVzOiBhbnkpYDogQ29tYmluZXMgYmFzZSBhbmQgYWRkaXRpb25hbCBzdHlsZXMgZm9yIGlubGluZSBzdHlsaW5nLlxuICogLSBgZ2V0T3ZlcmxheVBvc2l0aW9uKHBvc2l0aW9uOiBzdHJpbmcpYDogUmV0cmlldmVzIGNhbGN1bGF0ZWQgb3ZlcmxheSBwb3NpdGlvbiBmb3IgZWxlbWVudHMuXG4gKiAtIGBpc0N1c3RvbUNvbXBvbmVudChjb21wOiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudClgOiBUeXBlIGd1YXJkIGZvciBpZGVudGlmeWluZyBjdXN0b20gY29tcG9uZW50cy5cbiAqIC0gYGlzRnVuY3Rpb25Db21wb25lbnQoY29tcDogSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQpYDogVHlwZSBndWFyZCBmb3IgaWRlbnRpZnlpbmcgZnVuY3Rpb24gY29tcG9uZW50cy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogPGFwcC1hdWRpby1jYXJkXG4gKiAgW2NvbnRyb2xVc2VyTWVkaWFdPVwiY29udHJvbE1lZGlhRnVuY3Rpb25cIlxuICogW25hbWVdPVwicGFydGljaXBhbnROYW1lXCJcbiAqIFtiYXJDb2xvcl09XCInYmx1ZSdcIlxuICogW3RleHRDb2xvcl09XCInYmxhY2snXCJcbiAqIFtpbWFnZVNvdXJjZV09XCJwYXJ0aWNpcGFudEltYWdlVVJMXCJcbiAqIFtyb3VuZGVkSW1hZ2VdPVwidHJ1ZVwiXG4gKiBbc2hvd0NvbnRyb2xzXT1cInRydWVcIlxuICogW3BhcnRpY2lwYW50XT1cInBhcnRpY2lwYW50XCJcbiAqIFtwYXJhbWV0ZXJzXT1cImF1ZGlvQ2FyZFBhcmFtZXRlcnNcIj5cbiAqIDwvYXBwLWF1ZGlvLWNhcmQ+XG4gKiBgYGBcbiAqXG4gKiovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtYXVkaW8tY2FyZCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlLCBNaW5pQ2FyZF0sXG4gIHRlbXBsYXRlVXJsOiAnLi9hdWRpby1jYXJkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYXVkaW8tY2FyZC5jb21wb25lbnQuY3NzJ10sXG59KVxuXG5leHBvcnQgY2xhc3MgQXVkaW9DYXJkIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBjb250cm9sVXNlck1lZGlhPzogKG9wdGlvbnM6IENvbnRyb2xNZWRpYU9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG4gIEBJbnB1dCgpIGN1c3RvbVN0eWxlOiBQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+ID0ge307XG4gIEBJbnB1dCgpIG5hbWUgPSAnJztcbiAgQElucHV0KCkgYmFyQ29sb3IgPSAncmVkJztcbiAgQElucHV0KCkgdGV4dENvbG9yID0gJ3doaXRlJztcbiAgQElucHV0KCkgaW1hZ2VTb3VyY2UgPSAnJztcbiAgQElucHV0KCkgcm91bmRlZEltYWdlID0gZmFsc2U7XG4gIEBJbnB1dCgpIGltYWdlU3R5bGU6IFBhcnRpYWw8Q1NTU3R5bGVEZWNsYXJhdGlvbj4gPSB7fTtcbiAgQElucHV0KCkgc2hvd0NvbnRyb2xzID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd0luZm8gPSB0cnVlO1xuICBASW5wdXQoKSB2aWRlb0luZm9Db21wb25lbnQ/OiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudDsgLy8gQ3VzdG9tIGNvbXBvbmVudCBmb3IgcGFydGljaXBhbnQgaW5mb3JtYXRpb25cbiAgQElucHV0KCkgdmlkZW9Db250cm9sc0NvbXBvbmVudD86IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50OyAvLyBDdXN0b20gY29tcG9uZW50IGZvciB2aWRlbyBjb250cm9sc1xuICBASW5wdXQoKSBjb250cm9sc1Bvc2l0aW9uID0gJ3RvcExlZnQnO1xuICBASW5wdXQoKSBpbmZvUG9zaXRpb24gPSAndG9wUmlnaHQnO1xuICBASW5wdXQoKSBwYXJ0aWNpcGFudDogUGFydGljaXBhbnQgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yID0gJyc7XG4gIEBJbnB1dCgpIGF1ZGlvRGVjaWJlbHM6IGFueTtcbiAgQElucHV0KCkgcGFyYW1ldGVycyE6IEF1ZGlvQ2FyZFBhcmFtZXRlcnM7XG5cbiAgZmFWaWRlbyA9IGZhVmlkZW87XG4gIGZhVmlkZW9TbGFzaCA9IGZhVmlkZW9TbGFzaDtcbiAgZmFNaWNyb3Bob25lID0gZmFNaWNyb3Bob25lO1xuICBmYU1pY3JvcGhvbmVTbGFzaCA9IGZhTWljcm9waG9uZVNsYXNoO1xuXG4gIHdhdmVmb3JtQW5pbWF0aW9uczogbnVtYmVyW10gPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiA5IH0sICgpID0+IDApO1xuICBzaG93V2F2ZWZvcm0gPSB0cnVlO1xuICBpbnRlcnZhbDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBjb250cm9sTWVkaWFTZXJ2aWNlOiBDb250cm9sTWVkaWEsXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KCdjb250cm9sVXNlck1lZGlhJylcbiAgICBpbmplY3RlZENvbnRyb2xVc2VyTWVkaWE6IChvcHRpb25zOiBDb250cm9sTWVkaWFPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2N1c3RvbVN0eWxlJykgaW5qZWN0ZWRDdXN0b21TdHlsZTogUGFydGlhbDxDU1NTdHlsZURlY2xhcmF0aW9uPixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCduYW1lJykgaW5qZWN0ZWROYW1lOiBzdHJpbmcsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnYmFyQ29sb3InKSBpbmplY3RlZEJhckNvbG9yOiBzdHJpbmcsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgndGV4dENvbG9yJykgaW5qZWN0ZWRUZXh0Q29sb3I6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdpbWFnZVNvdXJjZScpIGluamVjdGVkSW1hZ2VTb3VyY2U6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdyb3VuZGVkSW1hZ2UnKSBpbmplY3RlZFJvdW5kZWRJbWFnZTogYm9vbGVhbixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdpbWFnZVN0eWxlJykgaW5qZWN0ZWRJbWFnZVN0eWxlOiBQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3Nob3dDb250cm9scycpIGluamVjdGVkU2hvd0NvbnRyb2xzOiBib29sZWFuLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3Nob3dJbmZvJykgaW5qZWN0ZWRTaG93SW5mbzogYm9vbGVhbixcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoJ3ZpZGVvSW5mb0NvbXBvbmVudCcpXG4gICAgaW5qZWN0ZWRWaWRlb0luZm9Db21wb25lbnQ6IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50LFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdCgndmlkZW9Db250cm9sc0NvbXBvbmVudCcpXG4gICAgaW5qZWN0ZWRWaWRlb0NvbnRyb2xzQ29tcG9uZW50OiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdjb250cm9sc1Bvc2l0aW9uJykgaW5qZWN0ZWRDb250cm9sc1Bvc2l0aW9uOiBDb250cm9sc1Bvc2l0aW9uLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2luZm9Qb3NpdGlvbicpIGluamVjdGVkSW5mb1Bvc2l0aW9uOiBJbmZvUG9zaXRpb24sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgncGFydGljaXBhbnQnKSBpbmplY3RlZFBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudCB8IG51bGwsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnYmFja2dyb3VuZENvbG9yJykgaW5qZWN0ZWRCYWNrZ3JvdW5kQ29sb3I6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdhdWRpb0RlY2liZWxzJykgaW5qZWN0ZWRBdWRpb0RlY2liZWxzOiBBdWRpb0RlY2liZWxzLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3BhcmFtZXRlcnMnKSBpbmplY3RlZFBhcmFtZXRlcnM6IEF1ZGlvQ2FyZFBhcmFtZXRlcnMsXG4gICkge1xuICAgIHRoaXMuY29udHJvbFVzZXJNZWRpYSA9IGluamVjdGVkQ29udHJvbFVzZXJNZWRpYSB8fCB0aGlzLmNvbnRyb2xVc2VyTWVkaWE7XG4gICAgdGhpcy5jdXN0b21TdHlsZSA9IGluamVjdGVkQ3VzdG9tU3R5bGUgfHwgdGhpcy5jdXN0b21TdHlsZTtcbiAgICB0aGlzLm5hbWUgPSBpbmplY3RlZE5hbWUgfHwgdGhpcy5uYW1lO1xuICAgIHRoaXMuYmFyQ29sb3IgPSBpbmplY3RlZEJhckNvbG9yIHx8IHRoaXMuYmFyQ29sb3I7XG4gICAgdGhpcy50ZXh0Q29sb3IgPSBpbmplY3RlZFRleHRDb2xvciB8fCB0aGlzLnRleHRDb2xvcjtcbiAgICB0aGlzLmltYWdlU291cmNlID0gaW5qZWN0ZWRJbWFnZVNvdXJjZSB8fCB0aGlzLmltYWdlU291cmNlO1xuICAgIHRoaXMucm91bmRlZEltYWdlID0gaW5qZWN0ZWRSb3VuZGVkSW1hZ2UgfHwgdGhpcy5yb3VuZGVkSW1hZ2U7XG4gICAgdGhpcy5pbWFnZVN0eWxlID0gaW5qZWN0ZWRJbWFnZVN0eWxlIHx8IHRoaXMuaW1hZ2VTdHlsZTtcbiAgICB0aGlzLnNob3dDb250cm9scyA9IGluamVjdGVkU2hvd0NvbnRyb2xzICE9IG51bGwgPyBpbmplY3RlZFNob3dDb250cm9scyA6IHRoaXMuc2hvd0NvbnRyb2xzO1xuICAgIHRoaXMuc2hvd0luZm8gPSBpbmplY3RlZFNob3dJbmZvICE9IG51bGwgPyBpbmplY3RlZFNob3dJbmZvIDogdGhpcy5zaG93SW5mbztcbiAgICB0aGlzLnZpZGVvSW5mb0NvbXBvbmVudCA9IGluamVjdGVkVmlkZW9JbmZvQ29tcG9uZW50IHx8IHRoaXMudmlkZW9JbmZvQ29tcG9uZW50O1xuICAgIHRoaXMudmlkZW9Db250cm9sc0NvbXBvbmVudCA9IGluamVjdGVkVmlkZW9Db250cm9sc0NvbXBvbmVudCB8fCB0aGlzLnZpZGVvQ29udHJvbHNDb21wb25lbnQ7XG4gICAgdGhpcy5jb250cm9sc1Bvc2l0aW9uID0gaW5qZWN0ZWRDb250cm9sc1Bvc2l0aW9uIHx8IHRoaXMuY29udHJvbHNQb3NpdGlvbjtcbiAgICB0aGlzLmluZm9Qb3NpdGlvbiA9IGluamVjdGVkSW5mb1Bvc2l0aW9uIHx8IHRoaXMuaW5mb1Bvc2l0aW9uO1xuICAgIHRoaXMucGFydGljaXBhbnQgPSBpbmplY3RlZFBhcnRpY2lwYW50IHx8IHRoaXMucGFydGljaXBhbnQ7XG4gICAgdGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSBpbmplY3RlZEJhY2tncm91bmRDb2xvciB8fCB0aGlzLmJhY2tncm91bmRDb2xvcjtcbiAgICB0aGlzLmF1ZGlvRGVjaWJlbHMgPSBpbmplY3RlZEF1ZGlvRGVjaWJlbHMgfHwgdGhpcy5hdWRpb0RlY2liZWxzO1xuICAgIHRoaXMucGFyYW1ldGVycyA9IGluamVjdGVkUGFyYW1ldGVycyB8fCB0aGlzLnBhcmFtZXRlcnM7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuY29udHJvbFVzZXJNZWRpYSkge1xuICAgICAgdGhpcy5jb250cm9sVXNlck1lZGlhID0gYXN5bmMgKG9wdGlvbnM6IENvbnRyb2xNZWRpYU9wdGlvbnMpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5jb250cm9sTWVkaWFTZXJ2aWNlLmNvbnRyb2xNZWRpYShvcHRpb25zKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGFyYW1ldGVycykge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgYXVkaW9EZWNpYmVscywgcGFydGljaXBhbnRzIH0gPSB0aGlzLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuICAgICAgICAgIGNvbnN0IGV4aXN0aW5nRW50cnkgPSBhdWRpb0RlY2liZWxzLmZpbmQoKGVudHJ5OiBhbnkpID0+IGVudHJ5Lm5hbWUgPT0gdGhpcy5uYW1lKTtcbiAgICAgICAgICB0aGlzLnBhcnRpY2lwYW50ID0gcGFydGljaXBhbnRzLmZpbmQoKHA6IFBhcnRpY2lwYW50KSA9PiBwLm5hbWUgPT0gdGhpcy5uYW1lKSB8fCBudWxsO1xuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgZXhpc3RpbmdFbnRyeSAmJlxuICAgICAgICAgICAgZXhpc3RpbmdFbnRyeS5hdmVyYWdlTG91ZG5lc3MgPiAxMjcuNSAmJlxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNpcGFudCAmJlxuICAgICAgICAgICAgIXRoaXMucGFydGljaXBhbnQubXV0ZWRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVdhdmVmb3JtKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRXYXZlZm9ybSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYXJ0aWNpcGFudD8ubXV0ZWQpIHtcbiAgICAgIHRoaXMuc2hvd1dhdmVmb3JtID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvd1dhdmVmb3JtID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICB9XG5cbiAgYW5pbWF0ZUJhcihpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy53YXZlZm9ybUFuaW1hdGlvbnNbaW5kZXhdID0gMTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMud2F2ZWZvcm1BbmltYXRpb25zW2luZGV4XSA9IDA7XG4gICAgfSwgdGhpcy5nZXRBbmltYXRpb25EdXJhdGlvbihpbmRleCkpO1xuICB9XG5cbiAgYW5pbWF0ZVdhdmVmb3JtKCkge1xuICAgIHRoaXMud2F2ZWZvcm1BbmltYXRpb25zLmZvckVhY2goKF8sIGluZGV4KSA9PiB7XG4gICAgICBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLmFuaW1hdGVCYXIoaW5kZXgpLCB0aGlzLmdldEFuaW1hdGlvbkR1cmF0aW9uKGluZGV4KSAqIDIpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVzZXRXYXZlZm9ybSgpIHtcbiAgICB0aGlzLndhdmVmb3JtQW5pbWF0aW9ucy5maWxsKDApO1xuICB9XG5cbiAgZ2V0QW5pbWF0aW9uRHVyYXRpb24oaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgZHVyYXRpb25zID0gWzQ3NCwgNDMzLCA0MDcsIDQ1OCwgNDAwLCA0MjcsIDQ0MSwgNDE5LCA0ODddO1xuICAgIHJldHVybiBkdXJhdGlvbnNbaW5kZXhdIHx8IDA7XG4gIH1cblxuICBhc3luYyB0b2dnbGVBdWRpbygpIHtcbiAgICBpZiAodGhpcy5wYXJ0aWNpcGFudCAmJiAhdGhpcy5wYXJ0aWNpcGFudC5tdXRlZCkge1xuICAgICAgYXdhaXQgdGhpcy5jb250cm9sVXNlck1lZGlhPy4oe1xuICAgICAgICBwYXJ0aWNpcGFudElkOiB0aGlzLnBhcnRpY2lwYW50LmlkIHx8ICcnLFxuICAgICAgICBwYXJ0aWNpcGFudE5hbWU6IHRoaXMucGFydGljaXBhbnQubmFtZSxcbiAgICAgICAgdHlwZTogJ2F1ZGlvJyxcbiAgICAgICAgc29ja2V0OiB0aGlzLnBhcmFtZXRlcnMuc29ja2V0LFxuICAgICAgICBjb0hvc3RSZXNwb25zaWJpbGl0eTogdGhpcy5wYXJhbWV0ZXJzLmNvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICAgICAgICByb29tTmFtZTogdGhpcy5wYXJhbWV0ZXJzLnJvb21OYW1lLFxuICAgICAgICBzaG93QWxlcnQ6IHRoaXMucGFyYW1ldGVycy5zaG93QWxlcnQsXG4gICAgICAgIGNvSG9zdDogdGhpcy5wYXJhbWV0ZXJzLmNvSG9zdCxcbiAgICAgICAgaXNsZXZlbDogdGhpcy5wYXJhbWV0ZXJzLmlzbGV2ZWwsXG4gICAgICAgIG1lbWJlcjogdGhpcy5wYXJhbWV0ZXJzLm1lbWJlcixcbiAgICAgICAgcGFydGljaXBhbnRzOiB0aGlzLnBhcmFtZXRlcnMucGFydGljaXBhbnRzLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgdG9nZ2xlVmlkZW8oKSB7XG4gICAgaWYgKHRoaXMucGFydGljaXBhbnQpIHtcbiAgICAgIGF3YWl0IHRoaXMuY29udHJvbFVzZXJNZWRpYT8uKHtcbiAgICAgICAgcGFydGljaXBhbnRJZDogdGhpcy5wYXJ0aWNpcGFudC5pZCB8fCAnJyxcbiAgICAgICAgcGFydGljaXBhbnROYW1lOiB0aGlzLnBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICAgIHR5cGU6ICd2aWRlbycsXG4gICAgICAgIHNvY2tldDogdGhpcy5wYXJhbWV0ZXJzLnNvY2tldCxcbiAgICAgICAgY29Ib3N0UmVzcG9uc2liaWxpdHk6IHRoaXMucGFyYW1ldGVycy5jb0hvc3RSZXNwb25zaWJpbGl0eSxcbiAgICAgICAgcm9vbU5hbWU6IHRoaXMucGFyYW1ldGVycy5yb29tTmFtZSxcbiAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0LFxuICAgICAgICBjb0hvc3Q6IHRoaXMucGFyYW1ldGVycy5jb0hvc3QsXG4gICAgICAgIGlzbGV2ZWw6IHRoaXMucGFyYW1ldGVycy5pc2xldmVsLFxuICAgICAgICBtZW1iZXI6IHRoaXMucGFyYW1ldGVycy5tZW1iZXIsXG4gICAgICAgIHBhcnRpY2lwYW50czogdGhpcy5wYXJhbWV0ZXJzLnBhcnRpY2lwYW50cyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlckNvbnRyb2xzKCkge1xuICAgIHJldHVybiB0aGlzLnNob3dDb250cm9scztcbiAgfVxuXG4gIC8vIEhlbHBlciBtZXRob2QgdG8gY29tYmluZSBzdHlsZXNcbiAgY29tYmluZVN0eWxlcyhiYXNlU3R5bGU6IGFueSwgYWRkaXRpb25hbFN0eWxlczogYW55KSB7XG4gICAgcmV0dXJuIHsgLi4uYmFzZVN0eWxlLCAuLi5hZGRpdGlvbmFsU3R5bGVzIH07XG4gIH1cblxuICBnZXRPdmVybGF5UG9zaXRpb24ocG9zaXRpb246IHN0cmluZykge1xuICAgIHJldHVybiBnZXRPdmVybGF5UG9zaXRpb24oeyBwb3NpdGlvbiB9KTtcbiAgfVxuXG4gIGlzQ3VzdG9tQ29tcG9uZW50KFxuICAgIGNvbXA6IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50IHwgKCgpID0+IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50KSxcbiAgKTogY29tcCBpcyBDdXN0b21Db21wb25lbnQge1xuICAgIHJldHVybiAoXG4gICAgICB0eXBlb2YgKGNvbXAgYXMgQ3VzdG9tQ29tcG9uZW50KS5jb21wb25lbnQgIT09ICdmdW5jdGlvbicgJiZcbiAgICAgIChjb21wIGFzIEN1c3RvbUNvbXBvbmVudCkuY29tcG9uZW50ICE9PSB1bmRlZmluZWRcbiAgICApO1xuICB9XG5cbiAgaXNGdW5jdGlvbkNvbXBvbmVudChcbiAgICBjb21wOiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudCB8ICgoKSA9PiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudCksXG4gICk6IGNvbXAgaXMgKCkgPT4gSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQge1xuICAgIHJldHVybiB0eXBlb2YgY29tcCA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxufVxuIiwiPGRpdlxyXG4gIGNsYXNzPVwiY2FyZFwiXHJcbiAgW25nU3R5bGVdPVwiY3VzdG9tU3R5bGVcIlxyXG4gIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwiYmFja2dyb3VuZENvbG9yXCJcclxuPlxyXG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJpbWFnZVNvdXJjZTsgZWxzZSBub0ltYWdlXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiaW1hZ2VDb250YWluZXJcIj5cclxuICAgICAgPGltZ1xyXG4gICAgICAgIFtzcmNdPVwiaW1hZ2VTb3VyY2VcIlxyXG4gICAgICAgIFtuZ1N0eWxlXT1cIlxyXG4gICAgICAgICAgY29tYmluZVN0eWxlcyhpbWFnZVN0eWxlLCB7XHJcbiAgICAgICAgICAgICdib3JkZXItcmFkaXVzJzogcm91bmRlZEltYWdlID8gJzIwJScgOiAnMCdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgXCJcclxuICAgICAgICBjbGFzcz1cImJhY2tncm91bmRJbWFnZVwiXHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuICA8bmctdGVtcGxhdGUgI25vSW1hZ2U+XHJcbiAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJVwiPlxyXG4gICAgICA8YXBwLW1pbmktY2FyZCBbaW5pdGlhbHNdPVwibmFtZVwiIFtmb250U2l6ZV09XCIyMFwiIFtuZ1N0eWxlXT1cInsgJ2JvcmRlcic6IHBhcmFtZXRlcnMuZXZlbnRUeXBlID09PSAnYnJvYWRjYXN0JyA/ICcycHggc29saWQgYmxhY2snIDogJzBweCBzb2xpZCBibGFjaycgfVwiPjwvYXBwLW1pbmktY2FyZD5cclxuICAgIDwvZGl2PlxyXG4gIDwvbmctdGVtcGxhdGU+XHJcblxyXG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJzaG93SW5mb1wiPlxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzcz1cIm92ZXJsYXlcIlxyXG4gICAgICBbbmdTdHlsZV09XCJnZXRPdmVybGF5UG9zaXRpb24oaW5mb1Bvc2l0aW9uKVwiXHJcbiAgICAgIFtuZ0NsYXNzXT1cInNob3dDb250cm9scyA/ICdvdmVybGF5V2ViJyA6ICdvdmVybGF5V2ViQWx0J1wiXHJcbiAgICA+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJuYW1lQ29sdW1uXCI+XHJcbiAgICAgICAgPHAgW25nU3R5bGVdPVwieyBjb2xvcjogdGV4dENvbG9yIH1cIiBjbGFzcz1cIm5hbWVUZXh0XCI+e3sgbmFtZSB9fTwvcD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJzaG93V2F2ZWZvcm1cIiBjbGFzcz1cIndhdmVmb3JtV2ViXCI+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGFuaW1hdGlvbiBvZiB3YXZlZm9ybUFuaW1hdGlvbnNcIlxyXG4gICAgICAgICAgW25nU3R5bGVdPVwie1xyXG4gICAgICAgICAgICBoZWlnaHQ6IGFuaW1hdGlvbiA9PT0gMCA/ICcxcHgnIDogJzEycHgnLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhckNvbG9yXHJcbiAgICAgICAgICB9XCJcclxuICAgICAgICAgIGNsYXNzPVwiYmFyXCJcclxuICAgICAgICA+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJyZW5kZXJDb250cm9scygpXCI+XHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzPVwib3ZlcmxheUNvbnRyb2xzXCJcclxuICAgICAgW25nU3R5bGVdPVwiZ2V0T3ZlcmxheVBvc2l0aW9uKGNvbnRyb2xzUG9zaXRpb24pXCJcclxuICAgID5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF2aWRlb0NvbnRyb2xzQ29tcG9uZW50XCI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNvbnRyb2xCdXR0b25cIiAoY2xpY2spPVwidG9nZ2xlQXVkaW8oKVwiPlxyXG4gICAgICAgICAgPGZhLWljb25cclxuICAgICAgICAgICAgW2ljb25dPVwicGFydGljaXBhbnQ/Lm11dGVkID8gZmFNaWNyb3Bob25lU2xhc2ggOiBmYU1pY3JvcGhvbmVcIlxyXG4gICAgICAgICAgICBbc3R5bGUuY29sb3JdPVwicGFydGljaXBhbnQ/Lm11dGVkID8gJ3JlZCcgOiAnZ3JlZW4nXCJcclxuICAgICAgICAgID48L2ZhLWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNvbnRyb2xCdXR0b25cIiAoY2xpY2spPVwidG9nZ2xlVmlkZW8oKVwiPlxyXG4gICAgICAgICAgPGZhLWljb25cclxuICAgICAgICAgICAgW2ljb25dPVwicGFydGljaXBhbnQ/LlsndmlkZW9PbiddID8gZmFWaWRlbyA6IGZhVmlkZW9TbGFzaFwiXHJcbiAgICAgICAgICAgIFtzdHlsZS5jb2xvcl09XCJwYXJ0aWNpcGFudD8uWyd2aWRlb09uJ10gPyAnZ3JlZW4nIDogJ3JlZCdcIlxyXG4gICAgICAgICAgPjwvZmEtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ2aWRlb0NvbnRyb2xzQ29tcG9uZW50XCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzQ3VzdG9tQ29tcG9uZW50KHZpZGVvQ29udHJvbHNDb21wb25lbnQpXCI+XHJcbiAgICAgICAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICAgICAgICpuZ0NvbXBvbmVudE91dGxldD1cIlxyXG4gICAgICAgICAgICAgIHZpZGVvQ29udHJvbHNDb21wb25lbnQuY29tcG9uZW50O1xyXG4gICAgICAgICAgICAgIGluamVjdG9yOiB2aWRlb0NvbnRyb2xzQ29tcG9uZW50LmluamVjdG9yXHJcbiAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICA+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc0N1c3RvbUNvbXBvbmVudCh2aWRlb0NvbnRyb2xzQ29tcG9uZW50KVwiPlxyXG4gICAgICAgICAgPGRpdiBbaW5uZXJIVE1MXT1cInZpZGVvQ29udHJvbHNDb21wb25lbnQub3V0ZXJIVE1MXCI+PC9kaXY+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcbjwvZGl2PlxyXG4iXX0=