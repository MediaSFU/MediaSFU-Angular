import { Component, Input, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getOverlayPosition } from '../../../methods/utils/get-overlay-position.util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * MiniCardAudio component displays an audio card with optional waveform animation.
 *
 * @component
 * @selector app-mini-card-audio
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * The template includes:
 * - A card container with customizable styles.
 * - An optional background image.
 * - An overlay with the name and waveform animation.
 *
 * @styles
 * The styles include:
 * - Card dimensions and background color.
 * - Overlay positioning and grid layout.
 * - Name column styling.
 * - Waveform bar styling.
 * - Background image positioning and optional rounded corners.
 *
 * @inputs
 * @param {any} customStyle - Custom styles for the card.
 * @param {string} name - The name to display on the card.
 * @param {boolean} showWaveform - Flag to show or hide the waveform animation.
 * @param {string} overlayPosition - Position of the overlay on the card.
 * @param {string} barColor - Color of the waveform bars.
 * @param {string} textColor - Color of the name text.
 * @param {string} imageSource - Source URL for the background image.
 * @param {boolean} roundedImage - Flag to apply rounded corners to the background image.
 * @param {any} imageStyle - Custom styles for the background image.
 *
 * @class
 * @implements OnInit, OnDestroy
 *
 * @constructor
 * @param {Partial<CSSStyleDeclaration>} injectedCustomStyle - Injected custom styles for the card.
 * @param {string} injectedName - Injected name to display on the card.
 * @param {boolean} injectedShowWaveform - Injected flag to show or hide the waveform animation.
 * @param {string} injectedOverlayPosition - Injected position of the overlay on the card.
 * @param {string} injectedBarColor - Injected color of the waveform bars.
 * @param {string} injectedTextColor - Injected color of the name text.
 * @param {string} injectedImageSource - Injected source URL for the background image.
 * @param {boolean} injectedRoundedImage - Injected flag to apply rounded corners to the background image.
 * @param {Partial<CSSStyleDeclaration>} injectedImageStyle - Injected custom styles for the background image.
 *
 * @methods
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnDestroy - Lifecycle hook that is called just before the component is destroyed.
 * @method animateWaveform - Starts the waveform animation.
 * @method resetWaveform - Resets the waveform animation.
 * @method clearIntervals - Clears all animation intervals.
 * @method getAnimationDuration - Returns the animation duration for a given index.
 * @method getImageStyle - Returns the styles for the background image.
 * @method getOverlayPosition - Returns the styles for the overlay position.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaS1jYXJkLWF1ZGlvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9taW5pLWNhcmQtYXVkaW8vbWluaS1jYXJkLWF1ZGlvLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0RBQWtELENBQUM7OztBQWdCdEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0RHO0FBc0ZILE1BQU0sT0FBTyxhQUFhO0lBQ2YsV0FBVyxDQUFNO0lBQ2pCLElBQUksR0FBRyxFQUFFLENBQUM7SUFDVixZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLGVBQWUsR0FBRyxZQUFZLENBQUM7SUFDL0IsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUNuQixTQUFTLEdBQUcsT0FBTyxDQUFDO0lBQ3BCLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDakIsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUNyQixVQUFVLEdBQVEsRUFBRSxDQUFDO0lBRTlCLGtCQUFrQixHQUFhLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsU0FBUyxHQUFxQixFQUFFLENBQUM7SUFFakMsWUFDcUMsbUJBQWlELEVBQ3hELFlBQW9CLEVBQ1osb0JBQTZCLEVBQzFCLHVCQUErQixFQUN0QyxnQkFBd0Is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QkFDVixXQUFXLDZCQUNYLGFBQWEsNkJBQ2IsY0FBYyw2QkFDZCxZQUFZOzJGQXZCdkIsYUFBYSx5VUFqRmQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQlQsaXpCQXBCUyxZQUFZOzsyRkFrRlgsYUFBYTtrQkFyRnpCLFNBQVM7K0JBQ0UscUJBQXFCLGNBQ25CLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQyxZQUNiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJUOzswQkE2RUUsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxhQUFhOzswQkFDaEMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxNQUFNOzswQkFDekIsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxjQUFjOzswQkFDakMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxpQkFBaUI7OzBCQUNwQyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLFVBQVU7OzBCQUM3QixRQUFROzswQkFBSSxNQUFNOzJCQUFDLFdBQVc7OzBCQUM5QixRQUFROzswQkFBSSxNQUFNOzJCQUFDLGFBQWE7OzBCQUNoQyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLGNBQWM7OzBCQUNqQyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLFlBQVk7eUNBdEJ6QixXQUFXO3NCQUFuQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkRlc3Ryb3ksIEluamVjdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBnZXRPdmVybGF5UG9zaXRpb24gfSBmcm9tICcuLi8uLi8uLi9tZXRob2RzL3V0aWxzL2dldC1vdmVybGF5LXBvc2l0aW9uLnV0aWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1pbmlDYXJkQXVkaW9PcHRpb25zIHtcbiAgY3VzdG9tU3R5bGU/OiBQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+O1xuICBuYW1lPzogc3RyaW5nO1xuICBzaG93V2F2ZWZvcm0/OiBib29sZWFuO1xuICBvdmVybGF5UG9zaXRpb24/OiBzdHJpbmc7XG4gIGJhckNvbG9yPzogc3RyaW5nO1xuICB0ZXh0Q29sb3I/OiBzdHJpbmc7XG4gIGltYWdlU291cmNlPzogc3RyaW5nO1xuICByb3VuZGVkSW1hZ2U/OiBib29sZWFuO1xuICBpbWFnZVN0eWxlPzogUGFydGlhbDxDU1NTdHlsZURlY2xhcmF0aW9uPjtcbn1cblxuZXhwb3J0IHR5cGUgTWluaUNhcmRBdWRpb1R5cGUgPSAob3B0aW9uczogTWluaUNhcmRBdWRpb09wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIE1pbmlDYXJkQXVkaW8gY29tcG9uZW50IGRpc3BsYXlzIGFuIGF1ZGlvIGNhcmQgd2l0aCBvcHRpb25hbCB3YXZlZm9ybSBhbmltYXRpb24uXG4gKlxuICogQGNvbXBvbmVudFxuICogQHNlbGVjdG9yIGFwcC1taW5pLWNhcmQtYXVkaW9cbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEBpbXBvcnRzIENvbW1vbk1vZHVsZVxuICpcbiAqIEB0ZW1wbGF0ZVxuICogVGhlIHRlbXBsYXRlIGluY2x1ZGVzOlxuICogLSBBIGNhcmQgY29udGFpbmVyIHdpdGggY3VzdG9taXphYmxlIHN0eWxlcy5cbiAqIC0gQW4gb3B0aW9uYWwgYmFja2dyb3VuZCBpbWFnZS5cbiAqIC0gQW4gb3ZlcmxheSB3aXRoIHRoZSBuYW1lIGFuZCB3YXZlZm9ybSBhbmltYXRpb24uXG4gKlxuICogQHN0eWxlc1xuICogVGhlIHN0eWxlcyBpbmNsdWRlOlxuICogLSBDYXJkIGRpbWVuc2lvbnMgYW5kIGJhY2tncm91bmQgY29sb3IuXG4gKiAtIE92ZXJsYXkgcG9zaXRpb25pbmcgYW5kIGdyaWQgbGF5b3V0LlxuICogLSBOYW1lIGNvbHVtbiBzdHlsaW5nLlxuICogLSBXYXZlZm9ybSBiYXIgc3R5bGluZy5cbiAqIC0gQmFja2dyb3VuZCBpbWFnZSBwb3NpdGlvbmluZyBhbmQgb3B0aW9uYWwgcm91bmRlZCBjb3JuZXJzLlxuICpcbiAqIEBpbnB1dHNcbiAqIEBwYXJhbSB7YW55fSBjdXN0b21TdHlsZSAtIEN1c3RvbSBzdHlsZXMgZm9yIHRoZSBjYXJkLlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSB0byBkaXNwbGF5IG9uIHRoZSBjYXJkLlxuICogQHBhcmFtIHtib29sZWFufSBzaG93V2F2ZWZvcm0gLSBGbGFnIHRvIHNob3cgb3IgaGlkZSB0aGUgd2F2ZWZvcm0gYW5pbWF0aW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IG92ZXJsYXlQb3NpdGlvbiAtIFBvc2l0aW9uIG9mIHRoZSBvdmVybGF5IG9uIHRoZSBjYXJkLlxuICogQHBhcmFtIHtzdHJpbmd9IGJhckNvbG9yIC0gQ29sb3Igb2YgdGhlIHdhdmVmb3JtIGJhcnMuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dENvbG9yIC0gQ29sb3Igb2YgdGhlIG5hbWUgdGV4dC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZVNvdXJjZSAtIFNvdXJjZSBVUkwgZm9yIHRoZSBiYWNrZ3JvdW5kIGltYWdlLlxuICogQHBhcmFtIHtib29sZWFufSByb3VuZGVkSW1hZ2UgLSBGbGFnIHRvIGFwcGx5IHJvdW5kZWQgY29ybmVycyB0byB0aGUgYmFja2dyb3VuZCBpbWFnZS5cbiAqIEBwYXJhbSB7YW55fSBpbWFnZVN0eWxlIC0gQ3VzdG9tIHN0eWxlcyBmb3IgdGhlIGJhY2tncm91bmQgaW1hZ2UuXG4gKlxuICogQGNsYXNzXG4gKiBAaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveVxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+fSBpbmplY3RlZEN1c3RvbVN0eWxlIC0gSW5qZWN0ZWQgY3VzdG9tIHN0eWxlcyBmb3IgdGhlIGNhcmQuXG4gKiBAcGFyYW0ge3N0cmluZ30gaW5qZWN0ZWROYW1lIC0gSW5qZWN0ZWQgbmFtZSB0byBkaXNwbGF5IG9uIHRoZSBjYXJkLlxuICogQHBhcmFtIHtib29sZWFufSBpbmplY3RlZFNob3dXYXZlZm9ybSAtIEluamVjdGVkIGZsYWcgdG8gc2hvdyBvciBoaWRlIHRoZSB3YXZlZm9ybSBhbmltYXRpb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gaW5qZWN0ZWRPdmVybGF5UG9zaXRpb24gLSBJbmplY3RlZCBwb3NpdGlvbiBvZiB0aGUgb3ZlcmxheSBvbiB0aGUgY2FyZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBpbmplY3RlZEJhckNvbG9yIC0gSW5qZWN0ZWQgY29sb3Igb2YgdGhlIHdhdmVmb3JtIGJhcnMuXG4gKiBAcGFyYW0ge3N0cmluZ30gaW5qZWN0ZWRUZXh0Q29sb3IgLSBJbmplY3RlZCBjb2xvciBvZiB0aGUgbmFtZSB0ZXh0LlxuICogQHBhcmFtIHtzdHJpbmd9IGluamVjdGVkSW1hZ2VTb3VyY2UgLSBJbmplY3RlZCBzb3VyY2UgVVJMIGZvciB0aGUgYmFja2dyb3VuZCBpbWFnZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5qZWN0ZWRSb3VuZGVkSW1hZ2UgLSBJbmplY3RlZCBmbGFnIHRvIGFwcGx5IHJvdW5kZWQgY29ybmVycyB0byB0aGUgYmFja2dyb3VuZCBpbWFnZS5cbiAqIEBwYXJhbSB7UGFydGlhbDxDU1NTdHlsZURlY2xhcmF0aW9uPn0gaW5qZWN0ZWRJbWFnZVN0eWxlIC0gSW5qZWN0ZWQgY3VzdG9tIHN0eWxlcyBmb3IgdGhlIGJhY2tncm91bmQgaW1hZ2UuXG4gKlxuICogQG1ldGhvZHNcbiAqIEBtZXRob2QgbmdPbkluaXQgLSBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciBkYXRhLWJvdW5kIHByb3BlcnRpZXMgYXJlIGluaXRpYWxpemVkLlxuICogQG1ldGhvZCBuZ09uRGVzdHJveSAtIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIGp1c3QgYmVmb3JlIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkLlxuICogQG1ldGhvZCBhbmltYXRlV2F2ZWZvcm0gLSBTdGFydHMgdGhlIHdhdmVmb3JtIGFuaW1hdGlvbi5cbiAqIEBtZXRob2QgcmVzZXRXYXZlZm9ybSAtIFJlc2V0cyB0aGUgd2F2ZWZvcm0gYW5pbWF0aW9uLlxuICogQG1ldGhvZCBjbGVhckludGVydmFscyAtIENsZWFycyBhbGwgYW5pbWF0aW9uIGludGVydmFscy5cbiAqIEBtZXRob2QgZ2V0QW5pbWF0aW9uRHVyYXRpb24gLSBSZXR1cm5zIHRoZSBhbmltYXRpb24gZHVyYXRpb24gZm9yIGEgZ2l2ZW4gaW5kZXguXG4gKiBAbWV0aG9kIGdldEltYWdlU3R5bGUgLSBSZXR1cm5zIHRoZSBzdHlsZXMgZm9yIHRoZSBiYWNrZ3JvdW5kIGltYWdlLlxuICogQG1ldGhvZCBnZXRPdmVybGF5UG9zaXRpb24gLSBSZXR1cm5zIHRoZSBzdHlsZXMgZm9yIHRoZSBvdmVybGF5IHBvc2l0aW9uLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbWluaS1jYXJkLWF1ZGlvJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImNhcmRcIiBbbmdTdHlsZV09XCJjdXN0b21TdHlsZVwiPlxuICAgICAgPGltZyAqbmdJZj1cImltYWdlU291cmNlXCIgW3NyY109XCJpbWFnZVNvdXJjZVwiIFtuZ1N0eWxlXT1cImdldEltYWdlU3R5bGUoKVwiIGFsdD1cIkJhY2tncm91bmRcIiAvPlxuICAgICAgPGRpdiBbbmdTdHlsZV09XCJnZXRPdmVybGF5UG9zaXRpb24ob3ZlcmxheVBvc2l0aW9uKVwiIFtjbGFzcy5vdmVybGF5LXdlYl09XCJ0cnVlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lLWNvbHVtblwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmFtZS10ZXh0XCIgW25nU3R5bGVdPVwieyBjb2xvcjogdGV4dENvbG9yIH1cIj57eyBuYW1lIH19PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBbY2xhc3Mud2F2ZWZvcm0td2ViXT1cInRydWVcIj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgYW5pbWF0aW9uIG9mIHdhdmVmb3JtQW5pbWF0aW9uc1wiXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICAgICAgIGhlaWdodDogYW5pbWF0aW9uID09PSAwID8gJzFweCcgOiAnMTZweCcsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogYmFyQ29sb3JcbiAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgY2xhc3M9XCJiYXJcIlxuICAgICAgICAgID48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgLmNhcmQge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMyYzY3OGY7XG4gICAgICB9XG4gICAgICAub3ZlcmxheS13ZWIge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIG1pbi13aWR0aDogNTAlO1xuICAgICAgICBtaW4taGVpZ2h0OiA1JTtcbiAgICAgICAgbWF4LWhlaWdodDogMTAwJTtcbiAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA0ZnIgMmZyO1xuICAgICAgICBncmlkLWdhcDogM3B4O1xuICAgICAgfVxuICAgICAgLm5hbWUtY29sdW1uIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcbiAgICAgICAgcGFkZGluZzogNXB4IDEwcHg7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMnB4O1xuICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICB9XG4gICAgICAubmFtZS10ZXh0IHtcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICB9XG4gICAgICAud2F2ZWZvcm0td2ViIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBsZWZ0O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMDUpO1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgfVxuICAgICAgLmJhciB7XG4gICAgICAgIGZsZXg6IDE7XG4gICAgICAgIG9wYWNpdHk6IDAuMzU7XG4gICAgICAgIG1hcmdpbjogMCAxcHg7XG4gICAgICB9XG4gICAgICAuYmFja2dyb3VuZC1pbWFnZSB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDgwcHg7XG4gICAgICAgIGhlaWdodDogODBweDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC00MHB4LCAtNDBweCk7XG4gICAgICB9XG4gICAgICAucm91bmRlZC1pbWFnZSB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDIwJTtcbiAgICAgIH1cbiAgICBgLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNaW5pQ2FyZEF1ZGlvIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBjdXN0b21TdHlsZTogYW55O1xuICBASW5wdXQoKSBuYW1lID0gJyc7XG4gIEBJbnB1dCgpIHNob3dXYXZlZm9ybSA9IGZhbHNlO1xuICBASW5wdXQoKSBvdmVybGF5UG9zaXRpb24gPSAnYm90dG9tTGVmdCc7XG4gIEBJbnB1dCgpIGJhckNvbG9yID0gJ3doaXRlJztcbiAgQElucHV0KCkgdGV4dENvbG9yID0gJ3doaXRlJztcbiAgQElucHV0KCkgaW1hZ2VTb3VyY2UgPSAnJztcbiAgQElucHV0KCkgcm91bmRlZEltYWdlID0gZmFsc2U7XG4gIEBJbnB1dCgpIGltYWdlU3R5bGU6IGFueSA9IHt9O1xuXG4gIHdhdmVmb3JtQW5pbWF0aW9uczogbnVtYmVyW10gPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiA5IH0sICgpID0+IDApO1xuICBpbnRlcnZhbHM6IE5vZGVKUy5UaW1lb3V0W10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdjdXN0b21TdHlsZScpIGluamVjdGVkQ3VzdG9tU3R5bGU6IFBhcnRpYWw8Q1NTU3R5bGVEZWNsYXJhdGlvbj4sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnbmFtZScpIGluamVjdGVkTmFtZTogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3Nob3dXYXZlZm9ybScpIGluamVjdGVkU2hvd1dhdmVmb3JtOiBib29sZWFuLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ292ZXJsYXlQb3NpdGlvbicpIGluamVjdGVkT3ZlcmxheVBvc2l0aW9uOiBzdHJpbmcsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnYmFyQ29sb3InKSBpbmplY3RlZEJhckNvbG9yOiBzdHJpbmcsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgndGV4dENvbG9yJykgaW5qZWN0ZWRUZXh0Q29sb3I6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdpbWFnZVNvdXJjZScpIGluamVjdGVkSW1hZ2VTb3VyY2U6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdyb3VuZGVkSW1hZ2UnKSBpbmplY3RlZFJvdW5kZWRJbWFnZTogYm9vbGVhbixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdpbWFnZVN0eWxlJykgaW5qZWN0ZWRJbWFnZVN0eWxlOiBQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+LFxuICApIHtcbiAgICAvLyBVc2UgaW5qZWN0ZWQgdmFsdWVzIGlmIGF2YWlsYWJsZVxuICAgIHRoaXMuY3VzdG9tU3R5bGUgPSBpbmplY3RlZEN1c3RvbVN0eWxlIHx8IHRoaXMuY3VzdG9tU3R5bGU7XG4gICAgdGhpcy5uYW1lID0gaW5qZWN0ZWROYW1lIHx8IHRoaXMubmFtZTtcbiAgICB0aGlzLnNob3dXYXZlZm9ybSA9IGluamVjdGVkU2hvd1dhdmVmb3JtIHx8IHRoaXMuc2hvd1dhdmVmb3JtO1xuICAgIHRoaXMub3ZlcmxheVBvc2l0aW9uID0gaW5qZWN0ZWRPdmVybGF5UG9zaXRpb24gfHwgdGhpcy5vdmVybGF5UG9zaXRpb247XG4gICAgdGhpcy5iYXJDb2xvciA9IGluamVjdGVkQmFyQ29sb3IgfHwgdGhpcy5iYXJDb2xvcjtcbiAgICB0aGlzLnRleHRDb2xvciA9IGluamVjdGVkVGV4dENvbG9yIHx8IHRoaXMudGV4dENvbG9yO1xuICAgIHRoaXMuaW1hZ2VTb3VyY2UgPSBpbmplY3RlZEltYWdlU291cmNlIHx8IHRoaXMuaW1hZ2VTb3VyY2U7XG4gICAgdGhpcy5yb3VuZGVkSW1hZ2UgPSBpbmplY3RlZFJvdW5kZWRJbWFnZSB8fCB0aGlzLnJvdW5kZWRJbWFnZTtcbiAgICB0aGlzLmltYWdlU3R5bGUgPSBpbmplY3RlZEltYWdlU3R5bGUgfHwgdGhpcy5pbWFnZVN0eWxlO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuc2hvd1dhdmVmb3JtKSB7XG4gICAgICB0aGlzLmFuaW1hdGVXYXZlZm9ybSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlc2V0V2F2ZWZvcm0oKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmNsZWFySW50ZXJ2YWxzKCk7XG4gIH1cblxuICBhbmltYXRlV2F2ZWZvcm0oKSB7XG4gICAgdGhpcy5pbnRlcnZhbHMgPSB0aGlzLndhdmVmb3JtQW5pbWF0aW9ucy5tYXAoKF8sIGluZGV4KSA9PlxuICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICB0aGlzLndhdmVmb3JtQW5pbWF0aW9uc1tpbmRleF0gPSAodGhpcy53YXZlZm9ybUFuaW1hdGlvbnNbaW5kZXhdICsgMSkgJSAyO1xuICAgICAgfSwgdGhpcy5nZXRBbmltYXRpb25EdXJhdGlvbihpbmRleCkpLFxuICAgICk7XG4gIH1cblxuICByZXNldFdhdmVmb3JtKCkge1xuICAgIHRoaXMud2F2ZWZvcm1BbmltYXRpb25zLmZpbGwoMCk7XG4gIH1cblxuICBjbGVhckludGVydmFscygpIHtcbiAgICB0aGlzLmludGVydmFscy5mb3JFYWNoKChpbnRlcnZhbCkgPT4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCkpO1xuICB9XG5cbiAgZ2V0QW5pbWF0aW9uRHVyYXRpb24oaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgZHVyYXRpb25zID0gWzQ3NCwgNDMzLCA0MDcsIDQ1OCwgNDAwLCA0MjcsIDQ0MSwgNDE5LCA0ODddO1xuICAgIHJldHVybiBkdXJhdGlvbnNbaW5kZXhdIHx8IDA7XG4gIH1cblxuICBnZXRJbWFnZVN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLmltYWdlU3R5bGUsXG4gICAgICAuLi4odGhpcy5yb3VuZGVkSW1hZ2UgPyB7IGJvcmRlclJhZGl1czogJzIwJScgfSA6IHt9KSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0T3ZlcmxheVBvc2l0aW9uKHBvc2l0aW9uOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gZ2V0T3ZlcmxheVBvc2l0aW9uKHsgcG9zaXRpb24gfSk7XG4gIH1cbn1cbiJdfQ==