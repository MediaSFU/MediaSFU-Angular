import { Component, Input, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getOverlayPosition } from '../../../methods/utils/get-overlay-position.util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * MiniCardAudio component displays an audio card with optional waveform animation and overlay.
 *
 * @selector app-mini-card-audio
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * - Displays:
 *   - A customizable card with optional image and name.
 *   - Overlay with waveform animation and text.
 *
 * @styles
 * - Customizable card, overlay, and waveform styles.
 *
 * @inputs
 * - `customStyle` (Partial<CSSStyleDeclaration>): Custom CSS styles for the card.
 * - `name` (string): Name displayed on the card.
 * - `showWaveform` (boolean): Controls visibility of waveform animation.
 * - `overlayPosition` (string): Position for the overlay on the card.
 * - `barColor` (string): Color of waveform bars.
 * - `textColor` (string): Color of the name text.
 * - `imageSource` (string): URL for the background image.
 * - `roundedImage` (boolean): Rounds image corners if true.
 * - `imageStyle` (Partial<CSSStyleDeclaration>): Custom styles for the background image.
 *
 * @class MiniCardAudio
 * @implements OnInit, OnDestroy
 *
 * @constructor
 * - Optional injected values for all input properties.
 *
 * @methods
 * - `ngOnInit`: Initializes the component, starts waveform animation if `showWaveform` is true.
 * - `ngOnDestroy`: Cleans up intervals.
 * - `animateWaveform`: Starts animation of the waveform bars.
 * - `resetWaveform`: Resets waveform to initial state.
 * - `clearIntervals`: Clears all active intervals.
 * - `getAnimationDuration`: Returns duration for animation at a given index.
 * - `getImageStyle`: Combines custom image styles with rounded corners if enabled.
 * - `getOverlayPosition`: Uses utility to determine the overlay's position.
 *
 * @example
 * ```html
 * <app-mini-card-audio
 *   [customStyle]="{ backgroundColor: 'blue' }"
 *   name="Audio Name"
 *   [showWaveform]="true"
 *   overlayPosition="bottomRight"
 *   barColor="red"
 *   textColor="white"
 *   imageSource="/path/to/image.jpg"
 *   [roundedImage]="true"
 *   [imageStyle]="{ border: '2px solid black' }"
 * ></app-mini-card-audio>
 * ```
 */
export class MiniCardAudio {
    customStyle;
    name = '';
    showWaveform = false;
    overlayPosition = 'bottomLeft';
    barColor = 'white';
    textColor = 'white';
    imageSource = '';
    roundedImage = false;
    imageStyle = {};
    waveformAnimations = Array.from({ length: 9 }, () => 0);
    intervals = [];
    constructor(injectedCustomStyle, injectedName, injectedShowWaveform, injectedOverlayPosition, injectedBarColor, injectedTextColor, injectedImageSource, injectedRoundedImage, injectedImageStyle) {
        // Use injected values if available
        this.customStyle = injectedCustomStyle || this.customStyle;
        this.name = injectedName || this.name;
        this.showWaveform = injectedShowWaveform || this.showWaveform;
        this.overlayPosition = injectedOverlayPosition || this.overlayPosition;
        this.barColor = injectedBarColor || this.barColor;
        this.textColor = injectedTextColor || this.textColor;
        this.imageSource = injectedImageSource || this.imageSource;
        this.roundedImage = injectedRoundedImage || this.roundedImage;
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
        this.intervals = this.waveformAnimations.map((_, index) => setInterval(() => {
            this.waveformAnimations[index] = (this.waveformAnimations[index] + 1) % 2;
        }, this.getAnimationDuration(index)));
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
    getOverlayPosition(position) {
        return getOverlayPosition({ position });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MiniCardAudio, deps: [{ token: 'customStyle', optional: true }, { token: 'name', optional: true }, { token: 'showWaveform', optional: true }, { token: 'overlayPosition', optional: true }, { token: 'barColor', optional: true }, { token: 'textColor', optional: true }, { token: 'imageSource', optional: true }, { token: 'roundedImage', optional: true }, { token: 'imageStyle', optional: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MiniCardAudio, isStandalone: true, selector: "app-mini-card-audio", inputs: { customStyle: "customStyle", name: "name", showWaveform: "showWaveform", overlayPosition: "overlayPosition", barColor: "barColor", textColor: "textColor", imageSource: "imageSource", roundedImage: "roundedImage", imageStyle: "imageStyle" }, ngImport: i0, template: `
    <div class="card" [ngStyle]="customStyle">
      <img *ngIf="imageSource" [src]="imageSource" [ngStyle]="getImageStyle()" alt="Background" />
      <div [ngStyle]="getOverlayPosition(overlayPosition)" [class.overlay-web]="true">
        <div class="name-column">
          <span class="name-text" [ngStyle]="{ color: textColor }">{{ name }}</span>
        </div>
        <div [class.waveform-web]="true">
          <div
            *ngFor="let animation of waveformAnimations"
            [ngStyle]="{
              height: animation === 0 ? '1px' : '16px',
              backgroundColor: barColor
            }"
            class="bar"
          ></div>
        </div>
      </div>
    </div>
  `, isInline: true, styles: [".card{width:100%;height:100%;margin:0;padding:0;background-color:#2c678f}.overlay-web{position:absolute;min-width:50%;min-height:5%;max-height:100%;display:grid;grid-template-columns:4fr 2fr;grid-gap:3px}.name-column{display:flex;justify-content:center;align-items:center;background-color:#00000080;padding:5px 10px;margin-right:2px;font-size:14px}.name-text{font-size:14px;color:#fff}.waveform-web{display:flex;justify-content:left;align-items:center;background-color:#0000000d;padding:0;flex-direction:row}.bar{flex:1;opacity:.35;margin:0 1px}.background-image{position:absolute;width:80px;height:80px;display:flex;justify-content:center;align-items:center;top:50%;left:50%;transform:translate(-40px,-40px)}.rounded-image{border-radius:20%}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MiniCardAudio, decorators: [{
            type: Component,
            args: [{ selector: 'app-mini-card-audio', standalone: true, imports: [CommonModule], template: `
    <div class="card" [ngStyle]="customStyle">
      <img *ngIf="imageSource" [src]="imageSource" [ngStyle]="getImageStyle()" alt="Background" />
      <div [ngStyle]="getOverlayPosition(overlayPosition)" [class.overlay-web]="true">
        <div class="name-column">
          <span class="name-text" [ngStyle]="{ color: textColor }">{{ name }}</span>
        </div>
        <div [class.waveform-web]="true">
          <div
            *ngFor="let animation of waveformAnimations"
            [ngStyle]="{
              height: animation === 0 ? '1px' : '16px',
              backgroundColor: barColor
            }"
            class="bar"
          ></div>
        </div>
      </div>
    </div>
  `, styles: [".card{width:100%;height:100%;margin:0;padding:0;background-color:#2c678f}.overlay-web{position:absolute;min-width:50%;min-height:5%;max-height:100%;display:grid;grid-template-columns:4fr 2fr;grid-gap:3px}.name-column{display:flex;justify-content:center;align-items:center;background-color:#00000080;padding:5px 10px;margin-right:2px;font-size:14px}.name-text{font-size:14px;color:#fff}.waveform-web{display:flex;justify-content:left;align-items:center;background-color:#0000000d;padding:0;flex-direction:row}.bar{flex:1;opacity:.35;margin:0 1px}.background-image{position:absolute;width:80px;height:80px;display:flex;justify-content:center;align-items:center;top:50%;left:50%;transform:translate(-40px,-40px)}.rounded-image{border-radius:20%}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
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
                }] }], propDecorators: { customStyle: [{
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
            }], imageSource: [{
                type: Input
            }], roundedImage: [{
                type: Input
            }], imageStyle: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaS1jYXJkLWF1ZGlvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9taW5pLWNhcmQtYXVkaW8vbWluaS1jYXJkLWF1ZGlvLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0RBQWtELENBQUM7OztBQWdCdEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0RHO0FBdUZILE1BQU0sT0FBTyxhQUFhO0lBQ2YsV0FBVyxDQUFNO0lBQ2pCLElBQUksR0FBRyxFQUFFLENBQUM7SUFDVixZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLGVBQWUsR0FBRyxZQUFZLENBQUM7SUFDL0IsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUNuQixTQUFTLEdBQUcsT0FBTyxDQUFDO0lBQ3BCLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDakIsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUNyQixVQUFVLEdBQVEsRUFBRSxDQUFDO0lBRTlCLGtCQUFrQixHQUFhLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsU0FBUyxHQUFxQixFQUFFLENBQUM7SUFFakMsWUFDcUMsbUJBQWlELEVBQ3hELFlBQW9CLEVBQ1osb0JBQTZCLEVBQzFCLHVCQUErQixFQUN0QyxnQkFBd0Is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QkFDVixXQUFXLDZCQUNYLGFBQWEsNkJBQ2IsY0FBYyw2QkFDZCxZQUFZOzJGQXZCdkIsYUFBYSx5VUFqRmQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQlQsaXpCQXBCUyxZQUFZOzsyRkFrRlgsYUFBYTtrQkFyRnpCLFNBQVM7K0JBQ0UscUJBQXFCLGNBQ25CLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQyxZQUNiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJUOzswQkE2RUUsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxhQUFhOzswQkFDaEMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxNQUFNOzswQkFDekIsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxjQUFjOzswQkFDakMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxpQkFBaUI7OzBCQUNwQyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLFVBQVU7OzBCQUM3QixRQUFROzswQkFBSSxNQUFNOzJCQUFDLFdBQVc7OzBCQUM5QixRQUFROzswQkFBSSxNQUFNOzJCQUFDLGFBQWE7OzBCQUNoQyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLGNBQWM7OzBCQUNqQyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLFlBQVk7eUNBdEJ6QixXQUFXO3NCQUFuQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkRlc3Ryb3ksIEluamVjdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBnZXRPdmVybGF5UG9zaXRpb24gfSBmcm9tICcuLi8uLi8uLi9tZXRob2RzL3V0aWxzL2dldC1vdmVybGF5LXBvc2l0aW9uLnV0aWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1pbmlDYXJkQXVkaW9PcHRpb25zIHtcbiAgY3VzdG9tU3R5bGU/OiBQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+O1xuICBuYW1lPzogc3RyaW5nO1xuICBzaG93V2F2ZWZvcm0/OiBib29sZWFuO1xuICBvdmVybGF5UG9zaXRpb24/OiBzdHJpbmc7XG4gIGJhckNvbG9yPzogc3RyaW5nO1xuICB0ZXh0Q29sb3I/OiBzdHJpbmc7XG4gIGltYWdlU291cmNlPzogc3RyaW5nO1xuICByb3VuZGVkSW1hZ2U/OiBib29sZWFuO1xuICBpbWFnZVN0eWxlPzogUGFydGlhbDxDU1NTdHlsZURlY2xhcmF0aW9uPjtcbn1cblxuZXhwb3J0IHR5cGUgTWluaUNhcmRBdWRpb1R5cGUgPSAob3B0aW9uczogTWluaUNhcmRBdWRpb09wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIE1pbmlDYXJkQXVkaW8gY29tcG9uZW50IGRpc3BsYXlzIGFuIGF1ZGlvIGNhcmQgd2l0aCBvcHRpb25hbCB3YXZlZm9ybSBhbmltYXRpb24gYW5kIG92ZXJsYXkuXG4gKlxuICogQHNlbGVjdG9yIGFwcC1taW5pLWNhcmQtYXVkaW9cbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEBpbXBvcnRzIENvbW1vbk1vZHVsZVxuICpcbiAqIEB0ZW1wbGF0ZVxuICogLSBEaXNwbGF5czpcbiAqICAgLSBBIGN1c3RvbWl6YWJsZSBjYXJkIHdpdGggb3B0aW9uYWwgaW1hZ2UgYW5kIG5hbWUuXG4gKiAgIC0gT3ZlcmxheSB3aXRoIHdhdmVmb3JtIGFuaW1hdGlvbiBhbmQgdGV4dC5cbiAqXG4gKiBAc3R5bGVzXG4gKiAtIEN1c3RvbWl6YWJsZSBjYXJkLCBvdmVybGF5LCBhbmQgd2F2ZWZvcm0gc3R5bGVzLlxuICpcbiAqIEBpbnB1dHNcbiAqIC0gYGN1c3RvbVN0eWxlYCAoUGFydGlhbDxDU1NTdHlsZURlY2xhcmF0aW9uPik6IEN1c3RvbSBDU1Mgc3R5bGVzIGZvciB0aGUgY2FyZC5cbiAqIC0gYG5hbWVgIChzdHJpbmcpOiBOYW1lIGRpc3BsYXllZCBvbiB0aGUgY2FyZC5cbiAqIC0gYHNob3dXYXZlZm9ybWAgKGJvb2xlYW4pOiBDb250cm9scyB2aXNpYmlsaXR5IG9mIHdhdmVmb3JtIGFuaW1hdGlvbi5cbiAqIC0gYG92ZXJsYXlQb3NpdGlvbmAgKHN0cmluZyk6IFBvc2l0aW9uIGZvciB0aGUgb3ZlcmxheSBvbiB0aGUgY2FyZC5cbiAqIC0gYGJhckNvbG9yYCAoc3RyaW5nKTogQ29sb3Igb2Ygd2F2ZWZvcm0gYmFycy5cbiAqIC0gYHRleHRDb2xvcmAgKHN0cmluZyk6IENvbG9yIG9mIHRoZSBuYW1lIHRleHQuXG4gKiAtIGBpbWFnZVNvdXJjZWAgKHN0cmluZyk6IFVSTCBmb3IgdGhlIGJhY2tncm91bmQgaW1hZ2UuXG4gKiAtIGByb3VuZGVkSW1hZ2VgIChib29sZWFuKTogUm91bmRzIGltYWdlIGNvcm5lcnMgaWYgdHJ1ZS5cbiAqIC0gYGltYWdlU3R5bGVgIChQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+KTogQ3VzdG9tIHN0eWxlcyBmb3IgdGhlIGJhY2tncm91bmQgaW1hZ2UuXG4gKlxuICogQGNsYXNzIE1pbmlDYXJkQXVkaW9cbiAqIEBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95XG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiAtIE9wdGlvbmFsIGluamVjdGVkIHZhbHVlcyBmb3IgYWxsIGlucHV0IHByb3BlcnRpZXMuXG4gKlxuICogQG1ldGhvZHNcbiAqIC0gYG5nT25Jbml0YDogSW5pdGlhbGl6ZXMgdGhlIGNvbXBvbmVudCwgc3RhcnRzIHdhdmVmb3JtIGFuaW1hdGlvbiBpZiBgc2hvd1dhdmVmb3JtYCBpcyB0cnVlLlxuICogLSBgbmdPbkRlc3Ryb3lgOiBDbGVhbnMgdXAgaW50ZXJ2YWxzLlxuICogLSBgYW5pbWF0ZVdhdmVmb3JtYDogU3RhcnRzIGFuaW1hdGlvbiBvZiB0aGUgd2F2ZWZvcm0gYmFycy5cbiAqIC0gYHJlc2V0V2F2ZWZvcm1gOiBSZXNldHMgd2F2ZWZvcm0gdG8gaW5pdGlhbCBzdGF0ZS5cbiAqIC0gYGNsZWFySW50ZXJ2YWxzYDogQ2xlYXJzIGFsbCBhY3RpdmUgaW50ZXJ2YWxzLlxuICogLSBgZ2V0QW5pbWF0aW9uRHVyYXRpb25gOiBSZXR1cm5zIGR1cmF0aW9uIGZvciBhbmltYXRpb24gYXQgYSBnaXZlbiBpbmRleC5cbiAqIC0gYGdldEltYWdlU3R5bGVgOiBDb21iaW5lcyBjdXN0b20gaW1hZ2Ugc3R5bGVzIHdpdGggcm91bmRlZCBjb3JuZXJzIGlmIGVuYWJsZWQuXG4gKiAtIGBnZXRPdmVybGF5UG9zaXRpb25gOiBVc2VzIHV0aWxpdHkgdG8gZGV0ZXJtaW5lIHRoZSBvdmVybGF5J3MgcG9zaXRpb24uXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGh0bWxcbiAqIDxhcHAtbWluaS1jYXJkLWF1ZGlvXG4gKiAgIFtjdXN0b21TdHlsZV09XCJ7IGJhY2tncm91bmRDb2xvcjogJ2JsdWUnIH1cIlxuICogICBuYW1lPVwiQXVkaW8gTmFtZVwiXG4gKiAgIFtzaG93V2F2ZWZvcm1dPVwidHJ1ZVwiXG4gKiAgIG92ZXJsYXlQb3NpdGlvbj1cImJvdHRvbVJpZ2h0XCJcbiAqICAgYmFyQ29sb3I9XCJyZWRcIlxuICogICB0ZXh0Q29sb3I9XCJ3aGl0ZVwiXG4gKiAgIGltYWdlU291cmNlPVwiL3BhdGgvdG8vaW1hZ2UuanBnXCJcbiAqICAgW3JvdW5kZWRJbWFnZV09XCJ0cnVlXCJcbiAqICAgW2ltYWdlU3R5bGVdPVwieyBib3JkZXI6ICcycHggc29saWQgYmxhY2snIH1cIlxuICogPjwvYXBwLW1pbmktY2FyZC1hdWRpbz5cbiAqIGBgYFxuICovXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1taW5pLWNhcmQtYXVkaW8nLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiIFtuZ1N0eWxlXT1cImN1c3RvbVN0eWxlXCI+XG4gICAgICA8aW1nICpuZ0lmPVwiaW1hZ2VTb3VyY2VcIiBbc3JjXT1cImltYWdlU291cmNlXCIgW25nU3R5bGVdPVwiZ2V0SW1hZ2VTdHlsZSgpXCIgYWx0PVwiQmFja2dyb3VuZFwiIC8+XG4gICAgICA8ZGl2IFtuZ1N0eWxlXT1cImdldE92ZXJsYXlQb3NpdGlvbihvdmVybGF5UG9zaXRpb24pXCIgW2NsYXNzLm92ZXJsYXktd2ViXT1cInRydWVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWUtY29sdW1uXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYW1lLXRleHRcIiBbbmdTdHlsZV09XCJ7IGNvbG9yOiB0ZXh0Q29sb3IgfVwiPnt7IG5hbWUgfX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IFtjbGFzcy53YXZlZm9ybS13ZWJdPVwidHJ1ZVwiPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBhbmltYXRpb24gb2Ygd2F2ZWZvcm1BbmltYXRpb25zXCJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cIntcbiAgICAgICAgICAgICAgaGVpZ2h0OiBhbmltYXRpb24gPT09IDAgPyAnMXB4JyA6ICcxNnB4JyxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBiYXJDb2xvclxuICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICBjbGFzcz1cImJhclwiXG4gICAgICAgICAgPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICAuY2FyZCB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzJjNjc4ZjtcbiAgICAgIH1cbiAgICAgIC5vdmVybGF5LXdlYiB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgbWluLXdpZHRoOiA1MCU7XG4gICAgICAgIG1pbi1oZWlnaHQ6IDUlO1xuICAgICAgICBtYXgtaGVpZ2h0OiAxMDAlO1xuICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDRmciAyZnI7XG4gICAgICAgIGdyaWQtZ2FwOiAzcHg7XG4gICAgICB9XG4gICAgICAubmFtZS1jb2x1bW4ge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xuICAgICAgICBwYWRkaW5nOiA1cHggMTBweDtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAycHg7XG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgIH1cbiAgICAgIC5uYW1lLXRleHQge1xuICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgIH1cbiAgICAgIC53YXZlZm9ybS13ZWIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGxlZnQ7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4wNSk7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICB9XG4gICAgICAuYmFyIHtcbiAgICAgICAgZmxleDogMTtcbiAgICAgICAgb3BhY2l0eTogMC4zNTtcbiAgICAgICAgbWFyZ2luOiAwIDFweDtcbiAgICAgIH1cbiAgICAgIC5iYWNrZ3JvdW5kLWltYWdlIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogODBweDtcbiAgICAgICAgaGVpZ2h0OiA4MHB4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgIGxlZnQ6IDUwJTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTQwcHgsIC00MHB4KTtcbiAgICAgIH1cbiAgICAgIC5yb3VuZGVkLWltYWdlIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMjAlO1xuICAgICAgfVxuICAgIGAsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1pbmlDYXJkQXVkaW8gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGN1c3RvbVN0eWxlOiBhbnk7XG4gIEBJbnB1dCgpIG5hbWUgPSAnJztcbiAgQElucHV0KCkgc2hvd1dhdmVmb3JtID0gZmFsc2U7XG4gIEBJbnB1dCgpIG92ZXJsYXlQb3NpdGlvbiA9ICdib3R0b21MZWZ0JztcbiAgQElucHV0KCkgYmFyQ29sb3IgPSAnd2hpdGUnO1xuICBASW5wdXQoKSB0ZXh0Q29sb3IgPSAnd2hpdGUnO1xuICBASW5wdXQoKSBpbWFnZVNvdXJjZSA9ICcnO1xuICBASW5wdXQoKSByb3VuZGVkSW1hZ2UgPSBmYWxzZTtcbiAgQElucHV0KCkgaW1hZ2VTdHlsZTogYW55ID0ge307XG5cbiAgd2F2ZWZvcm1BbmltYXRpb25zOiBudW1iZXJbXSA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDkgfSwgKCkgPT4gMCk7XG4gIGludGVydmFsczogTm9kZUpTLlRpbWVvdXRbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2N1c3RvbVN0eWxlJykgaW5qZWN0ZWRDdXN0b21TdHlsZTogUGFydGlhbDxDU1NTdHlsZURlY2xhcmF0aW9uPixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCduYW1lJykgaW5qZWN0ZWROYW1lOiBzdHJpbmcsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnc2hvd1dhdmVmb3JtJykgaW5qZWN0ZWRTaG93V2F2ZWZvcm06IGJvb2xlYW4sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnb3ZlcmxheVBvc2l0aW9uJykgaW5qZWN0ZWRPdmVybGF5UG9zaXRpb246IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdiYXJDb2xvcicpIGluamVjdGVkQmFyQ29sb3I6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCd0ZXh0Q29sb3InKSBpbmplY3RlZFRleHRDb2xvcjogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2ltYWdlU291cmNlJykgaW5qZWN0ZWRJbWFnZVNvdXJjZTogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3JvdW5kZWRJbWFnZScpIGluamVjdGVkUm91bmRlZEltYWdlOiBib29sZWFuLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2ltYWdlU3R5bGUnKSBpbmplY3RlZEltYWdlU3R5bGU6IFBhcnRpYWw8Q1NTU3R5bGVEZWNsYXJhdGlvbj4sXG4gICkge1xuICAgIC8vIFVzZSBpbmplY3RlZCB2YWx1ZXMgaWYgYXZhaWxhYmxlXG4gICAgdGhpcy5jdXN0b21TdHlsZSA9IGluamVjdGVkQ3VzdG9tU3R5bGUgfHwgdGhpcy5jdXN0b21TdHlsZTtcbiAgICB0aGlzLm5hbWUgPSBpbmplY3RlZE5hbWUgfHwgdGhpcy5uYW1lO1xuICAgIHRoaXMuc2hvd1dhdmVmb3JtID0gaW5qZWN0ZWRTaG93V2F2ZWZvcm0gfHwgdGhpcy5zaG93V2F2ZWZvcm07XG4gICAgdGhpcy5vdmVybGF5UG9zaXRpb24gPSBpbmplY3RlZE92ZXJsYXlQb3NpdGlvbiB8fCB0aGlzLm92ZXJsYXlQb3NpdGlvbjtcbiAgICB0aGlzLmJhckNvbG9yID0gaW5qZWN0ZWRCYXJDb2xvciB8fCB0aGlzLmJhckNvbG9yO1xuICAgIHRoaXMudGV4dENvbG9yID0gaW5qZWN0ZWRUZXh0Q29sb3IgfHwgdGhpcy50ZXh0Q29sb3I7XG4gICAgdGhpcy5pbWFnZVNvdXJjZSA9IGluamVjdGVkSW1hZ2VTb3VyY2UgfHwgdGhpcy5pbWFnZVNvdXJjZTtcbiAgICB0aGlzLnJvdW5kZWRJbWFnZSA9IGluamVjdGVkUm91bmRlZEltYWdlIHx8IHRoaXMucm91bmRlZEltYWdlO1xuICAgIHRoaXMuaW1hZ2VTdHlsZSA9IGluamVjdGVkSW1hZ2VTdHlsZSB8fCB0aGlzLmltYWdlU3R5bGU7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5zaG93V2F2ZWZvcm0pIHtcbiAgICAgIHRoaXMuYW5pbWF0ZVdhdmVmb3JtKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVzZXRXYXZlZm9ybSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY2xlYXJJbnRlcnZhbHMoKTtcbiAgfVxuXG4gIGFuaW1hdGVXYXZlZm9ybSgpIHtcbiAgICB0aGlzLmludGVydmFscyA9IHRoaXMud2F2ZWZvcm1BbmltYXRpb25zLm1hcCgoXywgaW5kZXgpID0+XG4gICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIHRoaXMud2F2ZWZvcm1BbmltYXRpb25zW2luZGV4XSA9ICh0aGlzLndhdmVmb3JtQW5pbWF0aW9uc1tpbmRleF0gKyAxKSAlIDI7XG4gICAgICB9LCB0aGlzLmdldEFuaW1hdGlvbkR1cmF0aW9uKGluZGV4KSksXG4gICAgKTtcbiAgfVxuXG4gIHJlc2V0V2F2ZWZvcm0oKSB7XG4gICAgdGhpcy53YXZlZm9ybUFuaW1hdGlvbnMuZmlsbCgwKTtcbiAgfVxuXG4gIGNsZWFySW50ZXJ2YWxzKCkge1xuICAgIHRoaXMuaW50ZXJ2YWxzLmZvckVhY2goKGludGVydmFsKSA9PiBjbGVhckludGVydmFsKGludGVydmFsKSk7XG4gIH1cblxuICBnZXRBbmltYXRpb25EdXJhdGlvbihpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBkdXJhdGlvbnMgPSBbNDc0LCA0MzMsIDQwNywgNDU4LCA0MDAsIDQyNywgNDQxLCA0MTksIDQ4N107XG4gICAgcmV0dXJuIGR1cmF0aW9uc1tpbmRleF0gfHwgMDtcbiAgfVxuXG4gIGdldEltYWdlU3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMuaW1hZ2VTdHlsZSxcbiAgICAgIC4uLih0aGlzLnJvdW5kZWRJbWFnZSA/IHsgYm9yZGVyUmFkaXVzOiAnMjAlJyB9IDoge30pLFxuICAgIH07XG4gIH1cblxuICBnZXRPdmVybGF5UG9zaXRpb24ocG9zaXRpb246IHN0cmluZykge1xuICAgIHJldHVybiBnZXRPdmVybGF5UG9zaXRpb24oeyBwb3NpdGlvbiB9KTtcbiAgfVxufVxuIl19