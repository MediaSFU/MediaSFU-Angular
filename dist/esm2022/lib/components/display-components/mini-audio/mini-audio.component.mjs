import { Component, Input, HostListener, Optional, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getOverlayPosition } from '../../../methods/utils/get-overlay-position.util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * MiniAudio component is a draggable, customizable mini audio player with optional waveform animations.
 *
 * @selector app-mini-audio
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * ```html
 * <div *ngIf="visible" class="modal-container" [ngStyle]="{ transform: 'translate(' + position.x + 'px, ' + position.y + 'px)' }" (mousedown)="handleMouseDown($event)">
 *   <div class="card" [ngStyle]="customStyle">
 *     <ng-container *ngIf="imageSource">
 *       <img [src]="imageSource" [ngStyle]="getImageStyle()" alt="Background" class="background-image" />
 *     </ng-container>
 *     <div class="name-text" [ngStyle]="combineStyles({ color: textColor }, nameTextStyling)">
 *       {{ name }}
 *     </div>
 *     <div [ngStyle]="getOverlayPosition(overlayPosition)" class="overlay-web">
 *       <div class="waveform-web">
 *         <div *ngFor="let animation of waveformAnimations; let i = index"
 *              [ngStyle]="{ height: animation == 0 ? '1px' : '30px', width: '10px', backgroundColor: barColor }"
 *              class="bar">
 *         </div>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * @styles
 * - `.modal-container`: Positioning and drag area.
 * - `.card`: The main container styling.
 * - `.background-image`: Styling for an optional background image.
 * - `.name-text`: Styling for name text with customizable color.
 * - `.overlay-web` and `.waveform-web`: Contains and styles the waveform animation bars.
 *
 * @inputs
 * - `visible` (boolean): Show/hide the component.
 * - `customStyle` (object): Custom styles for the component.
 * - `name` (string): Text to display as the name.
 * - `showWaveform` (boolean): Show/hide waveform animations.
 * - `overlayPosition` (string): Position of the overlay.
 * - `barColor` (string): Color of waveform bars.
 * - `textColor` (string): Color of name text.
 * - `nameTextStyling` (object): Additional styles for the name text.
 * - `imageSource` (string): URL of the background image.
 * - `roundedImage` (boolean): If true, applies rounded corners to the image.
 * - `imageStyle` (object): Custom styles for the image.
 *
 * @property `waveformAnimations` (array): Tracks animation states for each waveform bar.
 * @property `position` (object): Tracks x and y positioning for dragging.
 *
 * @methods
 * - `ngOnInit()`: Starts waveform animations if `showWaveform` is true.
 * - `ngOnDestroy()`: Clears waveform animation intervals.
 * - `animateWaveform()`: Sets intervals for each bar's animation.
 * - `handleMouseDown(event: MouseEvent)`: Starts dragging on mousedown.
 * - `handleMouseMove(event: MouseEvent)`: Updates position during drag.
 * - `handleMouseUp()`: Ends dragging on mouseup.
 *
 * @example
 * ```html
 * <app-mini-audio [visible]="true" [name]="'Audio Player'" [barColor]="'blue'" [imageSource]="'/path/to/image.png'"></app-mini-audio>
 * ```
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaS1hdWRpby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvbWluaS1hdWRpby9taW5pLWF1ZGlvLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDOzs7QUFrQnRGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0VHO0FBd0hILE1BQU0sT0FBTyxTQUFTO0lBQ1gsT0FBTyxHQUFHLElBQUksQ0FBQztJQUNmLFdBQVcsQ0FBTTtJQUNqQixJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ1YsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUNyQixlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDakIsU0FBUyxHQUFHLE9BQU8sQ0FBQztJQUNwQixlQUFlLEdBQVEsRUFBRSxDQUFDO0lBQzFCLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDakIsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUNyQixVQUFVLEdBQVEsRUFBRSxDQUFDO0lBRTlCLGtCQUFrQixHQUFhLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsU0FBUyxHQUFxQixFQUFFLENBQUM7SUFDakMsUUFBUSxHQUFH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QUFhOzswQkFDaEMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxjQUFjOzswQkFDakMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxZQUFZO3lDQTdCekIsT0FBTztzQkFBZixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkE0Rk4sZUFBZTtzQkFEZCxZQUFZO3VCQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVc5QyxhQUFhO3NCQURaLFlBQVk7dUJBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkRlc3Ryb3ksIEhvc3RMaXN0ZW5lciwgT3B0aW9uYWwsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IGdldE92ZXJsYXlQb3NpdGlvbiB9IGZyb20gJy4uLy4uLy4uL21ldGhvZHMvdXRpbHMvZ2V0LW92ZXJsYXktcG9zaXRpb24udXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWluaUF1ZGlvT3B0aW9ucyB7XG4gIHZpc2libGU/OiBib29sZWFuO1xuICBjdXN0b21TdHlsZT86IGFueTtcbiAgbmFtZT86IHN0cmluZztcbiAgc2hvd1dhdmVmb3JtPzogYm9vbGVhbjtcbiAgb3ZlcmxheVBvc2l0aW9uPzogc3RyaW5nO1xuICBiYXJDb2xvcj86IHN0cmluZztcbiAgdGV4dENvbG9yPzogc3RyaW5nO1xuICBuYW1lVGV4dFN0eWxpbmc/OiBhbnk7XG4gIGltYWdlU291cmNlPzogc3RyaW5nO1xuICByb3VuZGVkSW1hZ2U/OiBib29sZWFuO1xuICBpbWFnZVN0eWxlPzogYW55O1xufVxuXG5leHBvcnQgdHlwZSBNaW5pQXVkaW9UeXBlID0gKG9wdGlvbnM6IE1pbmlBdWRpb09wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIE1pbmlBdWRpbyBjb21wb25lbnQgaXMgYSBkcmFnZ2FibGUsIGN1c3RvbWl6YWJsZSBtaW5pIGF1ZGlvIHBsYXllciB3aXRoIG9wdGlvbmFsIHdhdmVmb3JtIGFuaW1hdGlvbnMuXG4gKlxuICogQHNlbGVjdG9yIGFwcC1taW5pLWF1ZGlvXG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBDb21tb25Nb2R1bGVcbiAqXG4gKiBAdGVtcGxhdGVcbiAqIGBgYGh0bWxcbiAqIDxkaXYgKm5nSWY9XCJ2aXNpYmxlXCIgY2xhc3M9XCJtb2RhbC1jb250YWluZXJcIiBbbmdTdHlsZV09XCJ7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgnICsgcG9zaXRpb24ueCArICdweCwgJyArIHBvc2l0aW9uLnkgKyAncHgpJyB9XCIgKG1vdXNlZG93bik9XCJoYW5kbGVNb3VzZURvd24oJGV2ZW50KVwiPlxuICogICA8ZGl2IGNsYXNzPVwiY2FyZFwiIFtuZ1N0eWxlXT1cImN1c3RvbVN0eWxlXCI+XG4gKiAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImltYWdlU291cmNlXCI+XG4gKiAgICAgICA8aW1nIFtzcmNdPVwiaW1hZ2VTb3VyY2VcIiBbbmdTdHlsZV09XCJnZXRJbWFnZVN0eWxlKClcIiBhbHQ9XCJCYWNrZ3JvdW5kXCIgY2xhc3M9XCJiYWNrZ3JvdW5kLWltYWdlXCIgLz5cbiAqICAgICA8L25nLWNvbnRhaW5lcj5cbiAqICAgICA8ZGl2IGNsYXNzPVwibmFtZS10ZXh0XCIgW25nU3R5bGVdPVwiY29tYmluZVN0eWxlcyh7IGNvbG9yOiB0ZXh0Q29sb3IgfSwgbmFtZVRleHRTdHlsaW5nKVwiPlxuICogICAgICAge3sgbmFtZSB9fVxuICogICAgIDwvZGl2PlxuICogICAgIDxkaXYgW25nU3R5bGVdPVwiZ2V0T3ZlcmxheVBvc2l0aW9uKG92ZXJsYXlQb3NpdGlvbilcIiBjbGFzcz1cIm92ZXJsYXktd2ViXCI+XG4gKiAgICAgICA8ZGl2IGNsYXNzPVwid2F2ZWZvcm0td2ViXCI+XG4gKiAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGFuaW1hdGlvbiBvZiB3YXZlZm9ybUFuaW1hdGlvbnM7IGxldCBpID0gaW5kZXhcIlxuICogICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgaGVpZ2h0OiBhbmltYXRpb24gPT0gMCA/ICcxcHgnIDogJzMwcHgnLCB3aWR0aDogJzEwcHgnLCBiYWNrZ3JvdW5kQ29sb3I6IGJhckNvbG9yIH1cIlxuICogICAgICAgICAgICAgIGNsYXNzPVwiYmFyXCI+XG4gKiAgICAgICAgIDwvZGl2PlxuICogICAgICAgPC9kaXY+XG4gKiAgICAgPC9kaXY+XG4gKiAgIDwvZGl2PlxuICogPC9kaXY+XG4gKiBgYGBcbiAqXG4gKiBAc3R5bGVzXG4gKiAtIGAubW9kYWwtY29udGFpbmVyYDogUG9zaXRpb25pbmcgYW5kIGRyYWcgYXJlYS5cbiAqIC0gYC5jYXJkYDogVGhlIG1haW4gY29udGFpbmVyIHN0eWxpbmcuXG4gKiAtIGAuYmFja2dyb3VuZC1pbWFnZWA6IFN0eWxpbmcgZm9yIGFuIG9wdGlvbmFsIGJhY2tncm91bmQgaW1hZ2UuXG4gKiAtIGAubmFtZS10ZXh0YDogU3R5bGluZyBmb3IgbmFtZSB0ZXh0IHdpdGggY3VzdG9taXphYmxlIGNvbG9yLlxuICogLSBgLm92ZXJsYXktd2ViYCBhbmQgYC53YXZlZm9ybS13ZWJgOiBDb250YWlucyBhbmQgc3R5bGVzIHRoZSB3YXZlZm9ybSBhbmltYXRpb24gYmFycy5cbiAqXG4gKiBAaW5wdXRzXG4gKiAtIGB2aXNpYmxlYCAoYm9vbGVhbik6IFNob3cvaGlkZSB0aGUgY29tcG9uZW50LlxuICogLSBgY3VzdG9tU3R5bGVgIChvYmplY3QpOiBDdXN0b20gc3R5bGVzIGZvciB0aGUgY29tcG9uZW50LlxuICogLSBgbmFtZWAgKHN0cmluZyk6IFRleHQgdG8gZGlzcGxheSBhcyB0aGUgbmFtZS5cbiAqIC0gYHNob3dXYXZlZm9ybWAgKGJvb2xlYW4pOiBTaG93L2hpZGUgd2F2ZWZvcm0gYW5pbWF0aW9ucy5cbiAqIC0gYG92ZXJsYXlQb3NpdGlvbmAgKHN0cmluZyk6IFBvc2l0aW9uIG9mIHRoZSBvdmVybGF5LlxuICogLSBgYmFyQ29sb3JgIChzdHJpbmcpOiBDb2xvciBvZiB3YXZlZm9ybSBiYXJzLlxuICogLSBgdGV4dENvbG9yYCAoc3RyaW5nKTogQ29sb3Igb2YgbmFtZSB0ZXh0LlxuICogLSBgbmFtZVRleHRTdHlsaW5nYCAob2JqZWN0KTogQWRkaXRpb25hbCBzdHlsZXMgZm9yIHRoZSBuYW1lIHRleHQuXG4gKiAtIGBpbWFnZVNvdXJjZWAgKHN0cmluZyk6IFVSTCBvZiB0aGUgYmFja2dyb3VuZCBpbWFnZS5cbiAqIC0gYHJvdW5kZWRJbWFnZWAgKGJvb2xlYW4pOiBJZiB0cnVlLCBhcHBsaWVzIHJvdW5kZWQgY29ybmVycyB0byB0aGUgaW1hZ2UuXG4gKiAtIGBpbWFnZVN0eWxlYCAob2JqZWN0KTogQ3VzdG9tIHN0eWxlcyBmb3IgdGhlIGltYWdlLlxuICpcbiAqIEBwcm9wZXJ0eSBgd2F2ZWZvcm1BbmltYXRpb25zYCAoYXJyYXkpOiBUcmFja3MgYW5pbWF0aW9uIHN0YXRlcyBmb3IgZWFjaCB3YXZlZm9ybSBiYXIuXG4gKiBAcHJvcGVydHkgYHBvc2l0aW9uYCAob2JqZWN0KTogVHJhY2tzIHggYW5kIHkgcG9zaXRpb25pbmcgZm9yIGRyYWdnaW5nLlxuICpcbiAqIEBtZXRob2RzXG4gKiAtIGBuZ09uSW5pdCgpYDogU3RhcnRzIHdhdmVmb3JtIGFuaW1hdGlvbnMgaWYgYHNob3dXYXZlZm9ybWAgaXMgdHJ1ZS5cbiAqIC0gYG5nT25EZXN0cm95KClgOiBDbGVhcnMgd2F2ZWZvcm0gYW5pbWF0aW9uIGludGVydmFscy5cbiAqIC0gYGFuaW1hdGVXYXZlZm9ybSgpYDogU2V0cyBpbnRlcnZhbHMgZm9yIGVhY2ggYmFyJ3MgYW5pbWF0aW9uLlxuICogLSBgaGFuZGxlTW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50KWA6IFN0YXJ0cyBkcmFnZ2luZyBvbiBtb3VzZWRvd24uXG4gKiAtIGBoYW5kbGVNb3VzZU1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpYDogVXBkYXRlcyBwb3NpdGlvbiBkdXJpbmcgZHJhZy5cbiAqIC0gYGhhbmRsZU1vdXNlVXAoKWA6IEVuZHMgZHJhZ2dpbmcgb24gbW91c2V1cC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogPGFwcC1taW5pLWF1ZGlvIFt2aXNpYmxlXT1cInRydWVcIiBbbmFtZV09XCInQXVkaW8gUGxheWVyJ1wiIFtiYXJDb2xvcl09XCInYmx1ZSdcIiBbaW1hZ2VTb3VyY2VdPVwiJy9wYXRoL3RvL2ltYWdlLnBuZydcIj48L2FwcC1taW5pLWF1ZGlvPlxuICogYGBgXG4gKi9cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW1pbmktYXVkaW8nLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICAqbmdJZj1cInZpc2libGVcIlxuICAgICAgY2xhc3M9XCJtb2RhbC1jb250YWluZXJcIlxuICAgICAgW25nU3R5bGVdPVwieyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoJyArIHBvc2l0aW9uLnggKyAncHgsICcgKyBwb3NpdGlvbi55ICsgJ3B4KScgfVwiXG4gICAgICAobW91c2Vkb3duKT1cImhhbmRsZU1vdXNlRG93bigkZXZlbnQpXCJcbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiIFtuZ1N0eWxlXT1cImN1c3RvbVN0eWxlXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpbWFnZVNvdXJjZVwiPlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIFtzcmNdPVwiaW1hZ2VTb3VyY2VcIlxuICAgICAgICAgICAgW25nU3R5bGVdPVwiZ2V0SW1hZ2VTdHlsZSgpXCJcbiAgICAgICAgICAgIGFsdD1cIkJhY2tncm91bmRcIlxuICAgICAgICAgICAgY2xhc3M9XCJiYWNrZ3JvdW5kLWltYWdlXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWUtdGV4dFwiIFtuZ1N0eWxlXT1cImNvbWJpbmVTdHlsZXMoeyBjb2xvcjogdGV4dENvbG9yIH0sIG5hbWVUZXh0U3R5bGluZylcIj5cbiAgICAgICAgICB7eyBuYW1lIH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IFtuZ1N0eWxlXT1cImdldE92ZXJsYXlQb3NpdGlvbihvdmVybGF5UG9zaXRpb24pXCIgY2xhc3M9XCJvdmVybGF5LXdlYlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3YXZlZm9ybS13ZWJcIj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGFuaW1hdGlvbiBvZiB3YXZlZm9ybUFuaW1hdGlvbnM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBhbmltYXRpb24gPT0gMCA/ICcxcHgnIDogJzMwcHgnLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTBweCcsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBiYXJDb2xvclxuICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJiYXJcIlxuICAgICAgICAgICAgPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICAubW9kYWwtY29udGFpbmVyIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIHdpZHRoOiAxMDBweDtcbiAgICAgICAgaGVpZ2h0OiAxMDBweDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgNDUsIDMzLCAwLjUpO1xuICAgICAgICB6LWluZGV4OiA4O1xuICAgICAgICBlbGV2YXRpb246IDg7XG4gICAgICB9XG5cbiAgICAgIC5jYXJkIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmM2NzhmO1xuICAgICAgfVxuXG4gICAgICAuYmFja2dyb3VuZC1pbWFnZSB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDcwcHg7XG4gICAgICAgIGhlaWdodDogNzBweDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgICAgICAgdG9wOiA0MCU7XG4gICAgICAgIGxlZnQ6IDUwJTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTM1cHgsIC0xMHB4KTtcbiAgICAgIH1cblxuICAgICAgLm5hbWUtdGV4dCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBwYWRkaW5nLXRvcDogNXB4O1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogNXB4O1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIHotaW5kZXg6IDI7XG4gICAgICB9XG5cbiAgICAgIC5vdmVybGF5LXdlYiB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMTJmciAxZnI7XG4gICAgICAgIGdyaWQtZ2FwOiAzcHg7XG4gICAgICAgIHotaW5kZXg6IDM7XG4gICAgICB9XG5cbiAgICAgIC53YXZlZm9ybS13ZWIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjA1KTtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgIH1cblxuICAgICAgLmJhciB7XG4gICAgICAgIGZsZXg6IDE7XG4gICAgICAgIG9wYWNpdHk6IDAuMzU7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMC41cHg7XG4gICAgICB9XG4gICAgYCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWluaUF1ZGlvIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSB2aXNpYmxlID0gdHJ1ZTtcbiAgQElucHV0KCkgY3VzdG9tU3R5bGU6IGFueTtcbiAgQElucHV0KCkgbmFtZSA9ICcnO1xuICBASW5wdXQoKSBzaG93V2F2ZWZvcm0gPSBmYWxzZTtcbiAgQElucHV0KCkgb3ZlcmxheVBvc2l0aW9uID0gJyc7XG4gIEBJbnB1dCgpIGJhckNvbG9yID0gJ3JlZCc7XG4gIEBJbnB1dCgpIHRleHRDb2xvciA9ICd3aGl0ZSc7XG4gIEBJbnB1dCgpIG5hbWVUZXh0U3R5bGluZzogYW55ID0ge307XG4gIEBJbnB1dCgpIGltYWdlU291cmNlID0gJyc7XG4gIEBJbnB1dCgpIHJvdW5kZWRJbWFnZSA9IGZhbHNlO1xuICBASW5wdXQoKSBpbWFnZVN0eWxlOiBhbnkgPSB7fTtcblxuICB3YXZlZm9ybUFuaW1hdGlvbnM6IG51bWJlcltdID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogOSB9LCAoKSA9PiAwKTtcbiAgaW50ZXJ2YWxzOiBOb2RlSlMuVGltZW91dFtdID0gW107XG4gIHBvc2l0aW9uID0geyB4OiAwLCB5OiAwIH07XG4gIGlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgZHJhZ09mZnNldCA9IHsgeDogMCwgeTogMCB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3Zpc2libGUnKSBpbmplY3RlZFZpc2libGU6IGJvb2xlYW4sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnY3VzdG9tU3R5bGUnKSBpbmplY3RlZEN1c3RvbVN0eWxlOiBhbnksXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnbmFtZScpIGluamVjdGVkTmFtZTogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3Nob3dXYXZlZm9ybScpIGluamVjdGVkU2hvd1dhdmVmb3JtOiBib29sZWFuLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ292ZXJsYXlQb3NpdGlvbicpIGluamVjdGVkT3ZlcmxheVBvc2l0aW9uOiBzdHJpbmcsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnYmFyQ29sb3InKSBpbmplY3RlZEJhckNvbG9yOiBzdHJpbmcsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgndGV4dENvbG9yJykgaW5qZWN0ZWRUZXh0Q29sb3I6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCduYW1lVGV4dFN0eWxpbmcnKSBpbmplY3RlZE5hbWVUZXh0U3R5bGluZzogYW55LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2ltYWdlU291cmNlJykgaW5qZWN0ZWRJbWFnZVNvdXJjZTogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3JvdW5kZWRJbWFnZScpIGluamVjdGVkUm91bmRlZEltYWdlOiBib29sZWFuLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2ltYWdlU3R5bGUnKSBpbmplY3RlZEltYWdlU3R5bGU6IGFueSxcbiAgKSB7XG4gICAgdGhpcy52aXNpYmxlID0gaW5qZWN0ZWRWaXNpYmxlICE9IG51bGwgPyBpbmplY3RlZFZpc2libGUgOiB0aGlzLnZpc2libGU7XG4gICAgdGhpcy5jdXN0b21TdHlsZSA9IGluamVjdGVkQ3VzdG9tU3R5bGUgfHwgdGhpcy5jdXN0b21TdHlsZTtcbiAgICB0aGlzLm5hbWUgPSBpbmplY3RlZE5hbWUgfHwgdGhpcy5uYW1lO1xuICAgIHRoaXMuc2hvd1dhdmVmb3JtID0gaW5qZWN0ZWRTaG93V2F2ZWZvcm0gIT0gbnVsbCA/IGluamVjdGVkU2hvd1dhdmVmb3JtIDogdGhpcy5zaG93V2F2ZWZvcm07XG4gICAgdGhpcy5vdmVybGF5UG9zaXRpb24gPSBpbmplY3RlZE92ZXJsYXlQb3NpdGlvbiB8fCB0aGlzLm92ZXJsYXlQb3NpdGlvbjtcbiAgICB0aGlzLmJhckNvbG9yID0gaW5qZWN0ZWRCYXJDb2xvciB8fCB0aGlzLmJhckNvbG9yO1xuICAgIHRoaXMudGV4dENvbG9yID0gaW5qZWN0ZWRUZXh0Q29sb3IgfHwgdGhpcy50ZXh0Q29sb3I7XG4gICAgdGhpcy5uYW1lVGV4dFN0eWxpbmcgPSBpbmplY3RlZE5hbWVUZXh0U3R5bGluZyB8fCB0aGlzLm5hbWVUZXh0U3R5bGluZztcbiAgICB0aGlzLmltYWdlU291cmNlID0gaW5qZWN0ZWRJbWFnZVNvdXJjZSB8fCB0aGlzLmltYWdlU291cmNlO1xuICAgIHRoaXMucm91bmRlZEltYWdlID0gaW5qZWN0ZWRSb3VuZGVkSW1hZ2UgIT0gbnVsbCA/IGluamVjdGVkUm91bmRlZEltYWdlIDogdGhpcy5yb3VuZGVkSW1hZ2U7XG4gICAgdGhpcy5pbWFnZVN0eWxlID0gaW5qZWN0ZWRJbWFnZVN0eWxlIHx8IHRoaXMuaW1hZ2VTdHlsZTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLnNob3dXYXZlZm9ybSkge1xuICAgICAgdGhpcy5hbmltYXRlV2F2ZWZvcm0oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXNldFdhdmVmb3JtKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jbGVhckludGVydmFscygpO1xuICB9XG5cbiAgYW5pbWF0ZVdhdmVmb3JtKCkge1xuICAgIHRoaXMuaW50ZXJ2YWxzID0gdGhpcy53YXZlZm9ybUFuaW1hdGlvbnMubWFwKChfLCBpbmRleCkgPT5cbiAgICAgIHNldEludGVydmFsKCgpID0+IHRoaXMuYW5pbWF0ZUJhcihpbmRleCksIHRoaXMuZ2V0QW5pbWF0aW9uRHVyYXRpb24oaW5kZXgpICogMiksXG4gICAgKTtcbiAgfVxuXG4gIGFuaW1hdGVCYXIoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMud2F2ZWZvcm1BbmltYXRpb25zW2luZGV4XSA9IDE7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLndhdmVmb3JtQW5pbWF0aW9uc1tpbmRleF0gPSAwO1xuICAgIH0sIHRoaXMuZ2V0QW5pbWF0aW9uRHVyYXRpb24oaW5kZXgpKTtcbiAgfVxuXG4gIHJlc2V0V2F2ZWZvcm0oKSB7XG4gICAgdGhpcy53YXZlZm9ybUFuaW1hdGlvbnMuZmlsbCgwKTtcbiAgfVxuXG4gIGNsZWFySW50ZXJ2YWxzKCkge1xuICAgIHRoaXMuaW50ZXJ2YWxzLmZvckVhY2goKGludGVydmFsKSA9PiBjbGVhckludGVydmFsKGludGVydmFsKSk7XG4gIH1cblxuICBnZXRBbmltYXRpb25EdXJhdGlvbihpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBkdXJhdGlvbnMgPSBbNDc0LCA0MzMsIDQwNywgNDU4LCA0MDAsIDQyNywgNDQxLCA0MTksIDQ4N107XG4gICAgcmV0dXJuIGR1cmF0aW9uc1tpbmRleF0gfHwgMDtcbiAgfVxuXG4gIGdldEltYWdlU3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMuaW1hZ2VTdHlsZSxcbiAgICAgIC4uLih0aGlzLnJvdW5kZWRJbWFnZSA/IHsgYm9yZGVyUmFkaXVzOiAnMjAlJyB9IDoge30pLFxuICAgIH07XG4gIH1cblxuICBjb21iaW5lU3R5bGVzKGJhc2VTdHlsZTogYW55LCBhZGRpdGlvbmFsU3R5bGVzOiBhbnkpIHtcbiAgICByZXR1cm4geyAuLi5iYXNlU3R5bGUsIC4uLmFkZGl0aW9uYWxTdHlsZXMgfTtcbiAgfVxuXG4gIGhhbmRsZU1vdXNlRG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMuaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgdGhpcy5kcmFnT2Zmc2V0ID0ge1xuICAgICAgeDogZXZlbnQuY2xpZW50WCAtIHRoaXMucG9zaXRpb24ueCxcbiAgICAgIHk6IGV2ZW50LmNsaWVudFkgLSB0aGlzLnBvc2l0aW9uLnksXG4gICAgfTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50Om1vdXNlbW92ZScsIFsnJGV2ZW50J10pXG4gIGhhbmRsZU1vdXNlTW92ZShldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICAgIHg6IGV2ZW50LmNsaWVudFggLSB0aGlzLmRyYWdPZmZzZXQueCxcbiAgICAgICAgeTogZXZlbnQuY2xpZW50WSAtIHRoaXMuZHJhZ09mZnNldC55LFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDptb3VzZXVwJylcbiAgaGFuZGxlTW91c2VVcCgpIHtcbiAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIGdldE92ZXJsYXlQb3NpdGlvbihwb3NpdGlvbjogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGdldE92ZXJsYXlQb3NpdGlvbih7IHBvc2l0aW9uIH0pO1xuICB9XG59XG4iXX0=