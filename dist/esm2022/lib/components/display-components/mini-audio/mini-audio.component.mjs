import { Component, Input, HostListener, Optional, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getOverlayPosition } from '../../../methods/utils/get-overlay-position.util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * MiniAudio component is a standalone Angular component that displays a mini audio player with waveform animations.
 * It supports various customizations including visibility, styles, text, and image properties.
 * The component can be dragged around the screen.
 *
 * @selector app-mini-audio
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * The template includes a modal container with a card that displays an optional background image, name text, and waveform animations.
 *
 * @styles
 * The styles define the appearance of the modal container, card, background image, name text, overlay, waveform, and bars.
 *
 * @class MiniAudio
 * @implements OnInit, OnDestroy
 *
 * @property {boolean} visible - Determines if the component is visible.
 * @property {any} customStyle - Custom styles for the component.
 * @property {string} name - The name text displayed in the component.
 * @property {boolean} showWaveform - Flag to show or hide the waveform animations.
 * @property {string} overlayPosition - Position of the overlay.
 * @property {string} barColor - Color of the waveform bars.
 * @property {string} textColor - Color of the name text.
 * @property {any} nameTextStyling - Additional styles for the name text.
 * @property {string} imageSource - Source URL for the background image.
 * @property {boolean} roundedImage - Flag to apply rounded corners to the background image.
 * @property {any} imageStyle - Custom styles for the background image.
 *
 * @constructor
 * The constructor allows optional dependency injection for all input properties.
 *
 * @method ngOnInit
 * Initializes the component and starts waveform animations if enabled.
 *
 * @method ngOnDestroy
 * Cleans up intervals to prevent memory leaks.
 *
 * @method animateWaveform
 * Starts the waveform animations by setting intervals for each bar.
 *
 * @method animateBar
 * Animates a single bar in the waveform.
 *
 * @method resetWaveform
 * Resets the waveform animations to their initial state.
 *
 * @method clearIntervals
 * Clears all animation intervals.
 *
 * @method getAnimationDuration
 * Returns the animation duration for a given bar index.
 *
 * @method getImageStyle
 * Returns the combined styles for the background image, including optional rounded corners.
 *
 * @method combineStyles
 * Combines base styles with additional styles.
 *
 * @method handleMouseDown
 * Handles the mousedown event to start dragging the component.
 *
 * @method handleMouseMove
 * Handles the mousemove event to update the component's position while dragging.
 *
 * @method handleMouseUp
 * Handles the mouseup event to stop dragging the component.
 *
 * @method getOverlayPosition
 * Returns the position styles for the overlay.
 */
export class MiniAudio {
    visible = true;
    customStyle;
    name = '';
    showWaveform = false;
    overlayPosition = '';
    barColor = 'red';
    textColor = 'white';
    nameTextStyling = {};
    imageSource = '';
    roundedImage = false;
    imageStyle = {};
    waveformAnimations = Array.from({ length: 9 }, () => 0);
    intervals = [];
    position = { x: 0, y: 0 };
    isDragging = false;
    dragOffset = { x: 0, y: 0 };
    constructor(injectedVisible, injectedCustomStyle, injectedName, injectedShowWaveform, injectedOverlayPosition, injectedBarColor, injectedTextColor, injectedNameTextStyling, injectedImageSource, injectedRoundedImage, injectedImageStyle) {
        this.visible = injectedVisible != null ? injectedVisible : this.visible;
        this.customStyle = injectedCustomStyle || this.customStyle;
        this.name = injectedName || this.name;
        this.showWaveform = injectedShowWaveform != null ? injectedShowWaveform : this.showWaveform;
        this.overlayPosition = injectedOverlayPosition || this.overlayPosition;
        this.barColor = injectedBarColor || this.barColor;
        this.textColor = injectedTextColor || this.textColor;
        this.nameTextStyling = injectedNameTextStyling || this.nameTextStyling;
        this.imageSource = injectedImageSource || this.imageSource;
        this.roundedImage = injectedRoundedImage != null ? injectedRoundedImage : this.roundedImage;
        this.imageStyle = injectedImageStyle || this.imageStyle;
    }
    ngOnInit() {
        if (this.showWaveform) {
            this.animateWaveform();
        }
        else {
            this.resetWaveform();
        }
    }
    ngOnDestroy() {
        this.clearIntervals();
    }
    animateWaveform() {
        this.intervals = this.waveformAnimations.map((_, index) => setInterval(() => this.animateBar(index), this.getAnimationDuration(index) * 2));
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
    clearIntervals() {
        this.intervals.forEach((interval) => clearInterval(interval));
    }
    getAnimationDuration(index) {
        const durations = [474, 433, 407, 458, 400, 427, 441, 419, 487];
        return durations[index] || 0;
    }
    getImageStyle() {
        return {
            ...this.imageStyle,
            ...(this.roundedImage ? { borderRadius: '20%' } : {}),
        };
    }
    combineStyles(baseStyle, additionalStyles) {
        return { ...baseStyle, ...additionalStyles };
    }
    handleMouseDown(event) {
        this.isDragging = true;
        this.dragOffset = {
            x: event.clientX - this.position.x,
            y: event.clientY - this.position.y,
        };
    }
    handleMouseMove(event) {
        if (this.isDragging) {
            this.position = {
                x: event.clientX - this.dragOffset.x,
                y: event.clientY - this.dragOffset.y,
            };
        }
    }
    handleMouseUp() {
        this.isDragging = false;
    }
    getOverlayPosition(position) {
        return getOverlayPosition({ position });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MiniAudio, deps: [{ token: 'visible', optional: true }, { token: 'customStyle', optional: true }, { token: 'name', optional: true }, { token: 'showWaveform', optional: true }, { token: 'overlayPosition', optional: true }, { token: 'barColor', optional: true }, { token: 'textColor', optional: true }, { token: 'nameTextStyling', optional: true }, { token: 'imageSource', optional: true }, { token: 'roundedImage', optional: true }, { token: 'imageStyle', optional: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MiniAudio, isStandalone: true, selector: "app-mini-audio", inputs: { visible: "visible", customStyle: "customStyle", name: "name", showWaveform: "showWaveform", overlayPosition: "overlayPosition", barColor: "barColor", textColor: "textColor", nameTextStyling: "nameTextStyling", imageSource: "imageSource", roundedImage: "roundedImage", imageStyle: "imageStyle" }, host: { listeners: { "document:mousemove": "handleMouseMove($event)", "document:mouseup": "handleMouseUp()" } }, ngImport: i0, template: `
    <div
      *ngIf="visible"
      class="modal-container"
      [ngStyle]="{ transform: 'translate(' + position.x + 'px, ' + position.y + 'px)' }"
      (mousedown)="handleMouseDown($event)"
    >
      <div class="card" [ngStyle]="customStyle">
        <ng-container *ngIf="imageSource">
          <img
            [src]="imageSource"
            [ngStyle]="getImageStyle()"
            alt="Background"
            class="background-image"
          />
        </ng-container>
        <div class="name-text" [ngStyle]="combineStyles({ color: textColor }, nameTextStyling)">
          {{ name }}
        </div>
        <div [ngStyle]="getOverlayPosition(overlayPosition)" class="overlay-web">
          <div class="waveform-web">
            <div
              *ngFor="let animation of waveformAnimations; let i = index"
              [ngStyle]="{
                height: animation == 0 ? '1px' : '30px',
                width: '10px',
                backgroundColor: barColor
              }"
              class="bar"
            ></div>
          </div>
        </div>
      </div>
    </div>
  `, isInline: true, styles: [".modal-container{position:absolute;top:0;right:0;padding:0;margin:0;width:100px;height:100px;display:flex;justify-content:center;align-items:center;background-color:#002d2180;z-index:8;elevation:8}.card{width:100%;height:100%;margin:0;padding:0;background-color:#2c678f}.background-image{position:absolute;width:70px;height:70px;justify-content:center;align-items:center;align-self:center;top:40%;left:50%;transform:translate(-35px,-10px)}.name-text{font-size:20px;font-weight:700;display:flex;justify-content:center;align-items:center;background-color:#00000080;width:100%;padding-top:5px;padding-bottom:5px;text-align:center;z-index:2}.overlay-web{position:absolute;width:100%;height:100%;display:grid;grid-template-columns:1fr 12fr 1fr;grid-gap:3px;z-index:3}.waveform-web{display:flex;justify-content:center;align-items:center;background-color:#0000000d;padding:0;flex-direction:row}.bar{flex:1;opacity:.35;margin-right:.5px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MiniAudio, decorators: [{
            type: Component,
            args: [{ selector: 'app-mini-audio', standalone: true, imports: [CommonModule], template: `
    <div
      *ngIf="visible"
      class="modal-container"
      [ngStyle]="{ transform: 'translate(' + position.x + 'px, ' + position.y + 'px)' }"
      (mousedown)="handleMouseDown($event)"
    >
      <div class="card" [ngStyle]="customStyle">
        <ng-container *ngIf="imageSource">
          <img
            [src]="imageSource"
            [ngStyle]="getImageStyle()"
            alt="Background"
            class="background-image"
          />
        </ng-container>
        <div class="name-text" [ngStyle]="combineStyles({ color: textColor }, nameTextStyling)">
          {{ name }}
        </div>
        <div [ngStyle]="getOverlayPosition(overlayPosition)" class="overlay-web">
          <div class="waveform-web">
            <div
              *ngFor="let animation of waveformAnimations; let i = index"
              [ngStyle]="{
                height: animation == 0 ? '1px' : '30px',
                width: '10px',
                backgroundColor: barColor
              }"
              class="bar"
            ></div>
          </div>
        </div>
      </div>
    </div>
  `, styles: [".modal-container{position:absolute;top:0;right:0;padding:0;margin:0;width:100px;height:100px;display:flex;justify-content:center;align-items:center;background-color:#002d2180;z-index:8;elevation:8}.card{width:100%;height:100%;margin:0;padding:0;background-color:#2c678f}.background-image{position:absolute;width:70px;height:70px;justify-content:center;align-items:center;align-self:center;top:40%;left:50%;transform:translate(-35px,-10px)}.name-text{font-size:20px;font-weight:700;display:flex;justify-content:center;align-items:center;background-color:#00000080;width:100%;padding-top:5px;padding-bottom:5px;text-align:center;z-index:2}.overlay-web{position:absolute;width:100%;height:100%;display:grid;grid-template-columns:1fr 12fr 1fr;grid-gap:3px;z-index:3}.waveform-web{display:flex;justify-content:center;align-items:center;background-color:#0000000d;padding:0;flex-direction:row}.bar{flex:1;opacity:.35;margin-right:.5px}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['visible']
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
                    args: ['showWaveform']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['overlayPosition']
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
                    args: ['nameTextStyling']
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
                }] }], propDecorators: { visible: [{
                type: Input
            }], customStyle: [{
                type: Input
            }], name: [{
                type: Input
            }], showWaveform: [{
                type: Input
            }], overlayPosition: [{
                type: Input
            }], barColor: [{
                type: Input
            }], textColor: [{
                type: Input
            }], nameTextStyling: [{
                type: Input
            }], imageSource: [{
                type: Input
            }], roundedImage: [{
                type: Input
            }], imageStyle: [{
                type: Input
            }], handleMouseMove: [{
                type: HostListener,
                args: ['document:mousemove', ['$event']]
            }], handleMouseUp: [{
                type: HostListener,
                args: ['document:mouseup']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaS1hdWRpby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvbWluaS1hdWRpby9taW5pLWF1ZGlvLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDOzs7QUFrQnRGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVFRztBQXVISCxNQUFNLE9BQU8sU0FBUztJQUNYLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDZixXQUFXLENBQU07SUFDakIsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNWLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDckIsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUNyQixRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ2pCLFNBQVMsR0FBRyxPQUFPLENBQUM7SUFDcEIsZUFBZSxHQUFRLEVBQUUsQ0FBQztJQUMxQixXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDckIsVUFBVSxHQUFRLEVBQUUsQ0FBQztJQUU5QixrQkFBa0IsR0FBYSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLFNBQVMsR0FBcUIsRUFBRSxDQUFDO0lBQ2pDLFFB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MkJBQUMsYUFBYTs7MEJBQ2hDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsY0FBYzs7MEJBQ2pDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsWUFBWTt5Q0E3QnpCLE9BQU87c0JBQWYsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBNEZOLGVBQWU7c0JBRGQsWUFBWTt1QkFBQyxvQkFBb0IsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFXOUMsYUFBYTtzQkFEWixZQUFZO3VCQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95LCBIb3N0TGlzdGVuZXIsIE9wdGlvbmFsLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBnZXRPdmVybGF5UG9zaXRpb24gfSBmcm9tICcuLi8uLi8uLi9tZXRob2RzL3V0aWxzL2dldC1vdmVybGF5LXBvc2l0aW9uLnV0aWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1pbmlBdWRpb09wdGlvbnMge1xuICB2aXNpYmxlPzogYm9vbGVhbjtcbiAgY3VzdG9tU3R5bGU/OiBhbnk7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHNob3dXYXZlZm9ybT86IGJvb2xlYW47XG4gIG92ZXJsYXlQb3NpdGlvbj86IHN0cmluZztcbiAgYmFyQ29sb3I/OiBzdHJpbmc7XG4gIHRleHRDb2xvcj86IHN0cmluZztcbiAgbmFtZVRleHRTdHlsaW5nPzogYW55O1xuICBpbWFnZVNvdXJjZT86IHN0cmluZztcbiAgcm91bmRlZEltYWdlPzogYm9vbGVhbjtcbiAgaW1hZ2VTdHlsZT86IGFueTtcbn1cblxuZXhwb3J0IHR5cGUgTWluaUF1ZGlvVHlwZSA9IChvcHRpb25zOiBNaW5pQXVkaW9PcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuLyoqXG4gKiBNaW5pQXVkaW8gY29tcG9uZW50IGlzIGEgc3RhbmRhbG9uZSBBbmd1bGFyIGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIGEgbWluaSBhdWRpbyBwbGF5ZXIgd2l0aCB3YXZlZm9ybSBhbmltYXRpb25zLlxuICogSXQgc3VwcG9ydHMgdmFyaW91cyBjdXN0b21pemF0aW9ucyBpbmNsdWRpbmcgdmlzaWJpbGl0eSwgc3R5bGVzLCB0ZXh0LCBhbmQgaW1hZ2UgcHJvcGVydGllcy5cbiAqIFRoZSBjb21wb25lbnQgY2FuIGJlIGRyYWdnZWQgYXJvdW5kIHRoZSBzY3JlZW4uXG4gKlxuICogQHNlbGVjdG9yIGFwcC1taW5pLWF1ZGlvXG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBDb21tb25Nb2R1bGVcbiAqXG4gKiBAdGVtcGxhdGVcbiAqIFRoZSB0ZW1wbGF0ZSBpbmNsdWRlcyBhIG1vZGFsIGNvbnRhaW5lciB3aXRoIGEgY2FyZCB0aGF0IGRpc3BsYXlzIGFuIG9wdGlvbmFsIGJhY2tncm91bmQgaW1hZ2UsIG5hbWUgdGV4dCwgYW5kIHdhdmVmb3JtIGFuaW1hdGlvbnMuXG4gKlxuICogQHN0eWxlc1xuICogVGhlIHN0eWxlcyBkZWZpbmUgdGhlIGFwcGVhcmFuY2Ugb2YgdGhlIG1vZGFsIGNvbnRhaW5lciwgY2FyZCwgYmFja2dyb3VuZCBpbWFnZSwgbmFtZSB0ZXh0LCBvdmVybGF5LCB3YXZlZm9ybSwgYW5kIGJhcnMuXG4gKlxuICogQGNsYXNzIE1pbmlBdWRpb1xuICogQGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3lcbiAqXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHZpc2libGUgLSBEZXRlcm1pbmVzIGlmIHRoZSBjb21wb25lbnQgaXMgdmlzaWJsZS5cbiAqIEBwcm9wZXJ0eSB7YW55fSBjdXN0b21TdHlsZSAtIEN1c3RvbSBzdHlsZXMgZm9yIHRoZSBjb21wb25lbnQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIHRleHQgZGlzcGxheWVkIGluIHRoZSBjb21wb25lbnQuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHNob3dXYXZlZm9ybSAtIEZsYWcgdG8gc2hvdyBvciBoaWRlIHRoZSB3YXZlZm9ybSBhbmltYXRpb25zLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IG92ZXJsYXlQb3NpdGlvbiAtIFBvc2l0aW9uIG9mIHRoZSBvdmVybGF5LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGJhckNvbG9yIC0gQ29sb3Igb2YgdGhlIHdhdmVmb3JtIGJhcnMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdGV4dENvbG9yIC0gQ29sb3Igb2YgdGhlIG5hbWUgdGV4dC5cbiAqIEBwcm9wZXJ0eSB7YW55fSBuYW1lVGV4dFN0eWxpbmcgLSBBZGRpdGlvbmFsIHN0eWxlcyBmb3IgdGhlIG5hbWUgdGV4dC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpbWFnZVNvdXJjZSAtIFNvdXJjZSBVUkwgZm9yIHRoZSBiYWNrZ3JvdW5kIGltYWdlLlxuICogQHByb3BlcnR5IHtib29sZWFufSByb3VuZGVkSW1hZ2UgLSBGbGFnIHRvIGFwcGx5IHJvdW5kZWQgY29ybmVycyB0byB0aGUgYmFja2dyb3VuZCBpbWFnZS5cbiAqIEBwcm9wZXJ0eSB7YW55fSBpbWFnZVN0eWxlIC0gQ3VzdG9tIHN0eWxlcyBmb3IgdGhlIGJhY2tncm91bmQgaW1hZ2UuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBUaGUgY29uc3RydWN0b3IgYWxsb3dzIG9wdGlvbmFsIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGZvciBhbGwgaW5wdXQgcHJvcGVydGllcy5cbiAqXG4gKiBAbWV0aG9kIG5nT25Jbml0XG4gKiBJbml0aWFsaXplcyB0aGUgY29tcG9uZW50IGFuZCBzdGFydHMgd2F2ZWZvcm0gYW5pbWF0aW9ucyBpZiBlbmFibGVkLlxuICpcbiAqIEBtZXRob2QgbmdPbkRlc3Ryb3lcbiAqIENsZWFucyB1cCBpbnRlcnZhbHMgdG8gcHJldmVudCBtZW1vcnkgbGVha3MuXG4gKlxuICogQG1ldGhvZCBhbmltYXRlV2F2ZWZvcm1cbiAqIFN0YXJ0cyB0aGUgd2F2ZWZvcm0gYW5pbWF0aW9ucyBieSBzZXR0aW5nIGludGVydmFscyBmb3IgZWFjaCBiYXIuXG4gKlxuICogQG1ldGhvZCBhbmltYXRlQmFyXG4gKiBBbmltYXRlcyBhIHNpbmdsZSBiYXIgaW4gdGhlIHdhdmVmb3JtLlxuICpcbiAqIEBtZXRob2QgcmVzZXRXYXZlZm9ybVxuICogUmVzZXRzIHRoZSB3YXZlZm9ybSBhbmltYXRpb25zIHRvIHRoZWlyIGluaXRpYWwgc3RhdGUuXG4gKlxuICogQG1ldGhvZCBjbGVhckludGVydmFsc1xuICogQ2xlYXJzIGFsbCBhbmltYXRpb24gaW50ZXJ2YWxzLlxuICpcbiAqIEBtZXRob2QgZ2V0QW5pbWF0aW9uRHVyYXRpb25cbiAqIFJldHVybnMgdGhlIGFuaW1hdGlvbiBkdXJhdGlvbiBmb3IgYSBnaXZlbiBiYXIgaW5kZXguXG4gKlxuICogQG1ldGhvZCBnZXRJbWFnZVN0eWxlXG4gKiBSZXR1cm5zIHRoZSBjb21iaW5lZCBzdHlsZXMgZm9yIHRoZSBiYWNrZ3JvdW5kIGltYWdlLCBpbmNsdWRpbmcgb3B0aW9uYWwgcm91bmRlZCBjb3JuZXJzLlxuICpcbiAqIEBtZXRob2QgY29tYmluZVN0eWxlc1xuICogQ29tYmluZXMgYmFzZSBzdHlsZXMgd2l0aCBhZGRpdGlvbmFsIHN0eWxlcy5cbiAqXG4gKiBAbWV0aG9kIGhhbmRsZU1vdXNlRG93blxuICogSGFuZGxlcyB0aGUgbW91c2Vkb3duIGV2ZW50IHRvIHN0YXJ0IGRyYWdnaW5nIHRoZSBjb21wb25lbnQuXG4gKlxuICogQG1ldGhvZCBoYW5kbGVNb3VzZU1vdmVcbiAqIEhhbmRsZXMgdGhlIG1vdXNlbW92ZSBldmVudCB0byB1cGRhdGUgdGhlIGNvbXBvbmVudCdzIHBvc2l0aW9uIHdoaWxlIGRyYWdnaW5nLlxuICpcbiAqIEBtZXRob2QgaGFuZGxlTW91c2VVcFxuICogSGFuZGxlcyB0aGUgbW91c2V1cCBldmVudCB0byBzdG9wIGRyYWdnaW5nIHRoZSBjb21wb25lbnQuXG4gKlxuICogQG1ldGhvZCBnZXRPdmVybGF5UG9zaXRpb25cbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIHN0eWxlcyBmb3IgdGhlIG92ZXJsYXkuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1taW5pLWF1ZGlvJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgKm5nSWY9XCJ2aXNpYmxlXCJcbiAgICAgIGNsYXNzPVwibW9kYWwtY29udGFpbmVyXCJcbiAgICAgIFtuZ1N0eWxlXT1cInsgdHJhbnNmb3JtOiAndHJhbnNsYXRlKCcgKyBwb3NpdGlvbi54ICsgJ3B4LCAnICsgcG9zaXRpb24ueSArICdweCknIH1cIlxuICAgICAgKG1vdXNlZG93bik9XCJoYW5kbGVNb3VzZURvd24oJGV2ZW50KVwiXG4gICAgPlxuICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIiBbbmdTdHlsZV09XCJjdXN0b21TdHlsZVwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaW1hZ2VTb3VyY2VcIj5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBbc3JjXT1cImltYWdlU291cmNlXCJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cImdldEltYWdlU3R5bGUoKVwiXG4gICAgICAgICAgICBhbHQ9XCJCYWNrZ3JvdW5kXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYmFja2dyb3VuZC1pbWFnZVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lLXRleHRcIiBbbmdTdHlsZV09XCJjb21iaW5lU3R5bGVzKHsgY29sb3I6IHRleHRDb2xvciB9LCBuYW1lVGV4dFN0eWxpbmcpXCI+XG4gICAgICAgICAge3sgbmFtZSB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBbbmdTdHlsZV09XCJnZXRPdmVybGF5UG9zaXRpb24ob3ZlcmxheVBvc2l0aW9uKVwiIGNsYXNzPVwib3ZlcmxheS13ZWJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid2F2ZWZvcm0td2ViXCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBhbmltYXRpb24gb2Ygd2F2ZWZvcm1BbmltYXRpb25zOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICAgICAgICAgIGhlaWdodDogYW5pbWF0aW9uID09IDAgPyAnMXB4JyA6ICczMHB4JyxcbiAgICAgICAgICAgICAgICB3aWR0aDogJzEwcHgnLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogYmFyQ29sb3JcbiAgICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICAgIGNsYXNzPVwiYmFyXCJcbiAgICAgICAgICAgID48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgLm1vZGFsLWNvbnRhaW5lciB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICB3aWR0aDogMTAwcHg7XG4gICAgICAgIGhlaWdodDogMTAwcHg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDQ1LCAzMywgMC41KTtcbiAgICAgICAgei1pbmRleDogODtcbiAgICAgICAgZWxldmF0aW9uOiA4O1xuICAgICAgfVxuXG4gICAgICAuY2FyZCB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzJjNjc4ZjtcbiAgICAgIH1cblxuICAgICAgLmJhY2tncm91bmQtaW1hZ2Uge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiA3MHB4O1xuICAgICAgICBoZWlnaHQ6IDcwcHg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgICAgIHRvcDogNDAlO1xuICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0zNXB4LCAtMTBweCk7XG4gICAgICB9XG5cbiAgICAgIC5uYW1lLXRleHQge1xuICAgICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgcGFkZGluZy10b3A6IDVweDtcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDVweDtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB6LWluZGV4OiAyO1xuICAgICAgfVxuXG4gICAgICAub3ZlcmxheS13ZWIge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDEyZnIgMWZyO1xuICAgICAgICBncmlkLWdhcDogM3B4O1xuICAgICAgICB6LWluZGV4OiAzO1xuICAgICAgfVxuXG4gICAgICAud2F2ZWZvcm0td2ViIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4wNSk7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICB9XG5cbiAgICAgIC5iYXIge1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgICBvcGFjaXR5OiAwLjM1O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDAuNXB4O1xuICAgICAgfVxuICAgIGAsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1pbmlBdWRpbyBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgdmlzaWJsZSA9IHRydWU7XG4gIEBJbnB1dCgpIGN1c3RvbVN0eWxlOiBhbnk7XG4gIEBJbnB1dCgpIG5hbWUgPSAnJztcbiAgQElucHV0KCkgc2hvd1dhdmVmb3JtID0gZmFsc2U7XG4gIEBJbnB1dCgpIG92ZXJsYXlQb3NpdGlvbiA9ICcnO1xuICBASW5wdXQoKSBiYXJDb2xvciA9ICdyZWQnO1xuICBASW5wdXQoKSB0ZXh0Q29sb3IgPSAnd2hpdGUnO1xuICBASW5wdXQoKSBuYW1lVGV4dFN0eWxpbmc6IGFueSA9IHt9O1xuICBASW5wdXQoKSBpbWFnZVNvdXJjZSA9ICcnO1xuICBASW5wdXQoKSByb3VuZGVkSW1hZ2UgPSBmYWxzZTtcbiAgQElucHV0KCkgaW1hZ2VTdHlsZTogYW55ID0ge307XG5cbiAgd2F2ZWZvcm1BbmltYXRpb25zOiBudW1iZXJbXSA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDkgfSwgKCkgPT4gMCk7XG4gIGludGVydmFsczogTm9kZUpTLlRpbWVvdXRbXSA9IFtdO1xuICBwb3NpdGlvbiA9IHsgeDogMCwgeTogMCB9O1xuICBpc0RyYWdnaW5nID0gZmFsc2U7XG4gIGRyYWdPZmZzZXQgPSB7IHg6IDAsIHk6IDAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCd2aXNpYmxlJykgaW5qZWN0ZWRWaXNpYmxlOiBib29sZWFuLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2N1c3RvbVN0eWxlJykgaW5qZWN0ZWRDdXN0b21TdHlsZTogYW55LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ25hbWUnKSBpbmplY3RlZE5hbWU6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdzaG93V2F2ZWZvcm0nKSBpbmplY3RlZFNob3dXYXZlZm9ybTogYm9vbGVhbixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdvdmVybGF5UG9zaXRpb24nKSBpbmplY3RlZE92ZXJsYXlQb3NpdGlvbjogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2JhckNvbG9yJykgaW5qZWN0ZWRCYXJDb2xvcjogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3RleHRDb2xvcicpIGluamVjdGVkVGV4dENvbG9yOiBzdHJpbmcsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnbmFtZVRleHRTdHlsaW5nJykgaW5qZWN0ZWROYW1lVGV4dFN0eWxpbmc6IGFueSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdpbWFnZVNvdXJjZScpIGluamVjdGVkSW1hZ2VTb3VyY2U6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdyb3VuZGVkSW1hZ2UnKSBpbmplY3RlZFJvdW5kZWRJbWFnZTogYm9vbGVhbixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdpbWFnZVN0eWxlJykgaW5qZWN0ZWRJbWFnZVN0eWxlOiBhbnksXG4gICkge1xuICAgIHRoaXMudmlzaWJsZSA9IGluamVjdGVkVmlzaWJsZSAhPSBudWxsID8gaW5qZWN0ZWRWaXNpYmxlIDogdGhpcy52aXNpYmxlO1xuICAgIHRoaXMuY3VzdG9tU3R5bGUgPSBpbmplY3RlZEN1c3RvbVN0eWxlIHx8IHRoaXMuY3VzdG9tU3R5bGU7XG4gICAgdGhpcy5uYW1lID0gaW5qZWN0ZWROYW1lIHx8IHRoaXMubmFtZTtcbiAgICB0aGlzLnNob3dXYXZlZm9ybSA9IGluamVjdGVkU2hvd1dhdmVmb3JtICE9IG51bGwgPyBpbmplY3RlZFNob3dXYXZlZm9ybSA6IHRoaXMuc2hvd1dhdmVmb3JtO1xuICAgIHRoaXMub3ZlcmxheVBvc2l0aW9uID0gaW5qZWN0ZWRPdmVybGF5UG9zaXRpb24gfHwgdGhpcy5vdmVybGF5UG9zaXRpb247XG4gICAgdGhpcy5iYXJDb2xvciA9IGluamVjdGVkQmFyQ29sb3IgfHwgdGhpcy5iYXJDb2xvcjtcbiAgICB0aGlzLnRleHRDb2xvciA9IGluamVjdGVkVGV4dENvbG9yIHx8IHRoaXMudGV4dENvbG9yO1xuICAgIHRoaXMubmFtZVRleHRTdHlsaW5nID0gaW5qZWN0ZWROYW1lVGV4dFN0eWxpbmcgfHwgdGhpcy5uYW1lVGV4dFN0eWxpbmc7XG4gICAgdGhpcy5pbWFnZVNvdXJjZSA9IGluamVjdGVkSW1hZ2VTb3VyY2UgfHwgdGhpcy5pbWFnZVNvdXJjZTtcbiAgICB0aGlzLnJvdW5kZWRJbWFnZSA9IGluamVjdGVkUm91bmRlZEltYWdlICE9IG51bGwgPyBpbmplY3RlZFJvdW5kZWRJbWFnZSA6IHRoaXMucm91bmRlZEltYWdlO1xuICAgIHRoaXMuaW1hZ2VTdHlsZSA9IGluamVjdGVkSW1hZ2VTdHlsZSB8fCB0aGlzLmltYWdlU3R5bGU7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5zaG93V2F2ZWZvcm0pIHtcbiAgICAgIHRoaXMuYW5pbWF0ZVdhdmVmb3JtKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVzZXRXYXZlZm9ybSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY2xlYXJJbnRlcnZhbHMoKTtcbiAgfVxuXG4gIGFuaW1hdGVXYXZlZm9ybSgpIHtcbiAgICB0aGlzLmludGVydmFscyA9IHRoaXMud2F2ZWZvcm1BbmltYXRpb25zLm1hcCgoXywgaW5kZXgpID0+XG4gICAgICBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLmFuaW1hdGVCYXIoaW5kZXgpLCB0aGlzLmdldEFuaW1hdGlvbkR1cmF0aW9uKGluZGV4KSAqIDIpLFxuICAgICk7XG4gIH1cblxuICBhbmltYXRlQmFyKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLndhdmVmb3JtQW5pbWF0aW9uc1tpbmRleF0gPSAxO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy53YXZlZm9ybUFuaW1hdGlvbnNbaW5kZXhdID0gMDtcbiAgICB9LCB0aGlzLmdldEFuaW1hdGlvbkR1cmF0aW9uKGluZGV4KSk7XG4gIH1cblxuICByZXNldFdhdmVmb3JtKCkge1xuICAgIHRoaXMud2F2ZWZvcm1BbmltYXRpb25zLmZpbGwoMCk7XG4gIH1cblxuICBjbGVhckludGVydmFscygpIHtcbiAgICB0aGlzLmludGVydmFscy5mb3JFYWNoKChpbnRlcnZhbCkgPT4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCkpO1xuICB9XG5cbiAgZ2V0QW5pbWF0aW9uRHVyYXRpb24oaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgZHVyYXRpb25zID0gWzQ3NCwgNDMzLCA0MDcsIDQ1OCwgNDAwLCA0MjcsIDQ0MSwgNDE5LCA0ODddO1xuICAgIHJldHVybiBkdXJhdGlvbnNbaW5kZXhdIHx8IDA7XG4gIH1cblxuICBnZXRJbWFnZVN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLmltYWdlU3R5bGUsXG4gICAgICAuLi4odGhpcy5yb3VuZGVkSW1hZ2UgPyB7IGJvcmRlclJhZGl1czogJzIwJScgfSA6IHt9KSxcbiAgICB9O1xuICB9XG5cbiAgY29tYmluZVN0eWxlcyhiYXNlU3R5bGU6IGFueSwgYWRkaXRpb25hbFN0eWxlczogYW55KSB7XG4gICAgcmV0dXJuIHsgLi4uYmFzZVN0eWxlLCAuLi5hZGRpdGlvbmFsU3R5bGVzIH07XG4gIH1cblxuICBoYW5kbGVNb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLmlzRHJhZ2dpbmcgPSB0cnVlO1xuICAgIHRoaXMuZHJhZ09mZnNldCA9IHtcbiAgICAgIHg6IGV2ZW50LmNsaWVudFggLSB0aGlzLnBvc2l0aW9uLngsXG4gICAgICB5OiBldmVudC5jbGllbnRZIC0gdGhpcy5wb3NpdGlvbi55LFxuICAgIH07XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDptb3VzZW1vdmUnLCBbJyRldmVudCddKVxuICBoYW5kbGVNb3VzZU1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAodGhpcy5pc0RyYWdnaW5nKSB7XG4gICAgICB0aGlzLnBvc2l0aW9uID0ge1xuICAgICAgICB4OiBldmVudC5jbGllbnRYIC0gdGhpcy5kcmFnT2Zmc2V0LngsXG4gICAgICAgIHk6IGV2ZW50LmNsaWVudFkgLSB0aGlzLmRyYWdPZmZzZXQueSxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6bW91c2V1cCcpXG4gIGhhbmRsZU1vdXNlVXAoKSB7XG4gICAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG4gIH1cblxuICBnZXRPdmVybGF5UG9zaXRpb24ocG9zaXRpb246IHN0cmluZykge1xuICAgIHJldHVybiBnZXRPdmVybGF5UG9zaXRpb24oeyBwb3NpdGlvbiB9KTtcbiAgfVxufVxuIl19