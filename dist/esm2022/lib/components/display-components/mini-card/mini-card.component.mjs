import { Component, Input, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * MiniCard component displays a customizable card with an image or initials.
 *
 * @component
 * @selector app-mini-card
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * ```html
 * <div class="mini-card" [ngStyle]="getMergedCardStyles()">
 *   <div *ngIf="imageSource; else noImage" class="image-container">
 *     <img [src]="imageSource" alt="Profile" [ngStyle]="getMergedImageStyles()" />
 *   </div>
 *   <ng-template #noImage>
 *     <div class="initials" [ngStyle]="getInitialsStyle()">{{ initials }}</div>
 *   </ng-template>
 * </div>
 * ```
 *
 * @styleUrls ['./mini-card.component.css']
 *
 * @inputs
 * - `initials` (string): Initials to display if no image is provided.
 * - `fontSize` (number): Font size for initials text, default is 14.
 * - `customStyle` (CSSStyleDeclaration): Custom styles for the card.
 * - `imageSource` (string): Source URL for the image.
 * - `roundedImage` (boolean): Whether the image should be rounded, default is false.
 * - `imageStyle` (CSSStyleDeclaration): Custom styles for the image.
 *
 * @constructor
 * - Optionally accepts injected values for each input property.
 *
 * @methods
 * - `getMergedCardStyles()`: Returns merged styles for the card.
 * - `getMergedImageStyles()`: Returns merged styles for the image.
 * - `getInitialsStyle()`: Returns styles for the initials text.
 *
 * @example
 * ```html
 * <app-mini-card initials="AB" fontSize="20" [roundedImage]="true" imageSource="/path/to/image.jpg"></app-mini-card>
 * ```
 */
export class MiniCard {
    initials;
    fontSize = 14;
    customStyle = {};
    imageSource;
    roundedImage = false;
    imageStyle = {};
    constructor(injectedInitials, injectedFontSize, injectedCustomStyle, injectedImageSource, injectedRoundedImage, injectedImageStyle) {
        this.initials = injectedInitials || this.initials || '';
        this.fontSize = injectedFontSize || this.fontSize || 14;
        this.customStyle = injectedCustomStyle || this.customStyle || {};
        this.imageSource = injectedImageSource || this.imageSource || '';
        this.roundedImage = injectedRoundedImage || this.roundedImage || true;
        this.imageStyle = injectedImageStyle || this.imageStyle || {};
    }
    getMergedCardStyles() {
        return {
            'font-size': this.fontSize + 'px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '0',
            width: '100%',
            height: '100%',
            color: 'black',
            fontFamily: "'Nunito', sans-serif",
            overflow: 'hidden',
            border: '2px solid black',
            ...this.customStyle,
        };
    }
    getMergedImageStyles() {
        return {
            width: '60%',
            height: '60%',
            objectFit: 'cover',
            ...(this.roundedImage ? { borderRadius: '50%' } : {}),
            ...this.imageStyle,
        };
    }
    getInitialsStyle() {
        return {
            textAlign: 'center',
            'font-size': this.fontSize + 'px',
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MiniCard, deps: [{ token: 'initials', optional: true }, { token: 'fontSize', optional: true }, { token: 'customStyle', optional: true }, { token: 'imageSource', optional: true }, { token: 'roundedImage', optional: true }, { token: 'imageStyle', optional: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MiniCard, isStandalone: true, selector: "app-mini-card", inputs: { initials: "initials", fontSize: "fontSize", customStyle: "customStyle", imageSource: "imageSource", roundedImage: "roundedImage", imageStyle: "imageStyle" }, ngImport: i0, template: `
    <div class="mini-card" [ngStyle]="getMergedCardStyles()">
      <div *ngIf="imageSource; else noImage" class="image-container">
        <img [src]="imageSource" alt="Profile" [ngStyle]="getMergedImageStyles()" />
      </div>
      <ng-template #noImage>
        <div class="initials" [ngStyle]="getInitialsStyle()">{{ initials }}</div>
      </ng-template>
    </div>
  `, isInline: true, styles: [".mini-card{display:flex;justify-content:center;align-items:center;border-radius:0;width:100%;height:100%;color:#000;font-family:Nunito,sans-serif;overflow:hidden;border:2px solid black}.image-container{display:flex;justify-content:center;align-items:center;width:100%;height:100%}.backgroundImage{width:60%;height:60%;object-fit:cover}.roundedImage{border-radius:50%}.initials{text-align:center;font-size:14px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MiniCard, decorators: [{
            type: Component,
            args: [{ selector: 'app-mini-card', standalone: true, imports: [CommonModule], template: `
    <div class="mini-card" [ngStyle]="getMergedCardStyles()">
      <div *ngIf="imageSource; else noImage" class="image-container">
        <img [src]="imageSource" alt="Profile" [ngStyle]="getMergedImageStyles()" />
      </div>
      <ng-template #noImage>
        <div class="initials" [ngStyle]="getInitialsStyle()">{{ initials }}</div>
      </ng-template>
    </div>
  `, styles: [".mini-card{display:flex;justify-content:center;align-items:center;border-radius:0;width:100%;height:100%;color:#000;font-family:Nunito,sans-serif;overflow:hidden;border:2px solid black}.image-container{display:flex;justify-content:center;align-items:center;width:100%;height:100%}.backgroundImage{width:60%;height:60%;object-fit:cover}.roundedImage{border-radius:50%}.initials{text-align:center;font-size:14px}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['initials']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['fontSize']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['customStyle']
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
                }] }], propDecorators: { initials: [{
                type: Input
            }], fontSize: [{
                type: Input
            }], customStyle: [{
                type: Input
            }], imageSource: [{
                type: Input
            }], roundedImage: [{
                type: Input
            }], imageStyle: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaS1jYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9taW5pLWNhcmQvbWluaS1jYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBWS9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQ0c7QUFrQkgsTUFBTSxPQUFPLFFBQVE7SUFDVixRQUFRLENBQVU7SUFDbEIsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNkLFdBQVcsR0FBaUMsRUFBRSxDQUFDO0lBQy9DLFdBQVcsQ0FBVTtJQUNyQixZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLFVBQVUsR0FBaUMsRUFBRSxDQUFDO0lBRXZELFlBQ2tDLGdCQUF3QixFQUN4QixnQkFBd0IsRUFDckIsbUJBQWlELEVBQ2pELG1CQUEyQixFQUMxQixvQkFBNkIsRUFDL0Isa0JBQWdEO1FBRWxGLElBQUksQ0FBQyxRQUFRLEdBQUcsZ0JBQWdCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUN4RCxJQUFJLENBQUMsV0FBVyxHQUFHLG1CQUFtQixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO1FBQ2pFLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQW1CLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7UUFDakUsSUFBSSxDQUFDLFlBQVksR0FBRyxvQkFBb0IsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQztRQUN0RSxJQUFJLENBQUMsVUFBVSxHQUFHLGtCQUFrQixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO0lBQ2hFLENBQUM7SUFFRCxtQkFBbUI7UUFDakIsT0FBTztZQUNMLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUk7WUFDakMsT0FBTyxFQUFFLE1BQU07WUFDZixjQUFjLEVBQUUsUUFBUTtZQUN4QixVQUFVLEVBQUUsUUFBUTtZQUNwQixZQUFZLEVBQUUsR0FBRztZQUNqQixLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxNQUFNO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxVQUFVLEVBQUUsc0JBQXNCO1lBQ2xDLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLE1BQU0sRUFBRSxpQkFBaUI7WUFDekIsR0FBRyxJQUFJLENBQUMsV0FBVztTQUNwQixDQUFDO0lBQ0osQ0FBQztJQUVELG9CQUFvQjtRQUNsQixPQUFPO1lBQ0wsS0FBSyxFQUFFLEtBQUs7WUFDWixNQUFNLEVBQUUsS0FBSztZQUNiLFNBQVMsRUFBRSxPQUFPO1lBQ2xCLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3JELEdBQUcsSUFBSSxDQUFDLFVBQVU7U0FDbkIsQ0FBQztJQUNKLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxPQUFPO1lBQ0wsU0FBUyxFQUFFLFFBQVE7WUFDbkIsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSTtTQUNsQyxDQUFDO0lBQ0osQ0FBQzt1R0F4RFUsUUFBUSxrQkFTRyxVQUFVLDZCQUNWLFVBQVUsNkJBQ1YsYUFBYSw2QkFDYixhQUFhLDZCQUNiLGNBQWMsNkJBQ2QsWUFBWTsyRkFkdkIsUUFBUSxpUEFaVDs7Ozs7Ozs7O0dBU1QscWVBVlMsWUFBWTs7MkZBYVgsUUFBUTtrQkFoQnBCLFNBQVM7K0JBQ0UsZUFBZSxjQUNiLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQyxZQUNiOzs7Ozs7Ozs7R0FTVDs7MEJBWUUsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxVQUFVOzswQkFDN0IsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxVQUFVOzswQkFDN0IsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxhQUFhOzswQkFDaEMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxhQUFhOzswQkFDaEMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxjQUFjOzswQkFDakMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxZQUFZO3lDQWJ6QixRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5leHBvcnQgaW50ZXJmYWNlIE1pbmlDYXJkT3B0aW9ucyB7XG4gIGluaXRpYWxzPzogc3RyaW5nO1xuICBmb250U2l6ZT86IG51bWJlcjtcbiAgY3VzdG9tU3R5bGU/OiBQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+O1xuICBpbWFnZVNvdXJjZT86IHN0cmluZztcbiAgcm91bmRlZEltYWdlPzogYm9vbGVhbjtcbiAgaW1hZ2VTdHlsZT86IFBhcnRpYWw8Q1NTU3R5bGVEZWNsYXJhdGlvbj47XG59XG5cbmV4cG9ydCB0eXBlIE1pbmlDYXJkVHlwZSA9IChvcHRpb25zOiBNaW5pQ2FyZE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIE1pbmlDYXJkIGNvbXBvbmVudCBkaXNwbGF5cyBhIGN1c3RvbWl6YWJsZSBjYXJkIHdpdGggYW4gaW1hZ2Ugb3IgaW5pdGlhbHMuXG4gKlxuICogQGNvbXBvbmVudFxuICogQHNlbGVjdG9yIGFwcC1taW5pLWNhcmRcbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEBpbXBvcnRzIENvbW1vbk1vZHVsZVxuICpcbiAqIEB0ZW1wbGF0ZVxuICogYGBgaHRtbFxuICogPGRpdiBjbGFzcz1cIm1pbmktY2FyZFwiIFtuZ1N0eWxlXT1cImdldE1lcmdlZENhcmRTdHlsZXMoKVwiPlxuICogICA8ZGl2ICpuZ0lmPVwiaW1hZ2VTb3VyY2U7IGVsc2Ugbm9JbWFnZVwiIGNsYXNzPVwiaW1hZ2UtY29udGFpbmVyXCI+XG4gKiAgICAgPGltZyBbc3JjXT1cImltYWdlU291cmNlXCIgYWx0PVwiUHJvZmlsZVwiIFtuZ1N0eWxlXT1cImdldE1lcmdlZEltYWdlU3R5bGVzKClcIiAvPlxuICogICA8L2Rpdj5cbiAqICAgPG5nLXRlbXBsYXRlICNub0ltYWdlPlxuICogICAgIDxkaXYgY2xhc3M9XCJpbml0aWFsc1wiIFtuZ1N0eWxlXT1cImdldEluaXRpYWxzU3R5bGUoKVwiPnt7IGluaXRpYWxzIH19PC9kaXY+XG4gKiAgIDwvbmctdGVtcGxhdGU+XG4gKiA8L2Rpdj5cbiAqIGBgYFxuICpcbiAqIEBzdHlsZVVybHMgWycuL21pbmktY2FyZC5jb21wb25lbnQuY3NzJ11cbiAqXG4gKiBAaW5wdXRzXG4gKiAtIGBpbml0aWFsc2AgKHN0cmluZyk6IEluaXRpYWxzIHRvIGRpc3BsYXkgaWYgbm8gaW1hZ2UgaXMgcHJvdmlkZWQuXG4gKiAtIGBmb250U2l6ZWAgKG51bWJlcik6IEZvbnQgc2l6ZSBmb3IgaW5pdGlhbHMgdGV4dCwgZGVmYXVsdCBpcyAxNC5cbiAqIC0gYGN1c3RvbVN0eWxlYCAoQ1NTU3R5bGVEZWNsYXJhdGlvbik6IEN1c3RvbSBzdHlsZXMgZm9yIHRoZSBjYXJkLlxuICogLSBgaW1hZ2VTb3VyY2VgIChzdHJpbmcpOiBTb3VyY2UgVVJMIGZvciB0aGUgaW1hZ2UuXG4gKiAtIGByb3VuZGVkSW1hZ2VgIChib29sZWFuKTogV2hldGhlciB0aGUgaW1hZ2Ugc2hvdWxkIGJlIHJvdW5kZWQsIGRlZmF1bHQgaXMgZmFsc2UuXG4gKiAtIGBpbWFnZVN0eWxlYCAoQ1NTU3R5bGVEZWNsYXJhdGlvbik6IEN1c3RvbSBzdHlsZXMgZm9yIHRoZSBpbWFnZS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIC0gT3B0aW9uYWxseSBhY2NlcHRzIGluamVjdGVkIHZhbHVlcyBmb3IgZWFjaCBpbnB1dCBwcm9wZXJ0eS5cbiAqXG4gKiBAbWV0aG9kc1xuICogLSBgZ2V0TWVyZ2VkQ2FyZFN0eWxlcygpYDogUmV0dXJucyBtZXJnZWQgc3R5bGVzIGZvciB0aGUgY2FyZC5cbiAqIC0gYGdldE1lcmdlZEltYWdlU3R5bGVzKClgOiBSZXR1cm5zIG1lcmdlZCBzdHlsZXMgZm9yIHRoZSBpbWFnZS5cbiAqIC0gYGdldEluaXRpYWxzU3R5bGUoKWA6IFJldHVybnMgc3R5bGVzIGZvciB0aGUgaW5pdGlhbHMgdGV4dC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogPGFwcC1taW5pLWNhcmQgaW5pdGlhbHM9XCJBQlwiIGZvbnRTaXplPVwiMjBcIiBbcm91bmRlZEltYWdlXT1cInRydWVcIiBpbWFnZVNvdXJjZT1cIi9wYXRoL3RvL2ltYWdlLmpwZ1wiPjwvYXBwLW1pbmktY2FyZD5cbiAqIGBgYFxuICovXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1taW5pLWNhcmQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwibWluaS1jYXJkXCIgW25nU3R5bGVdPVwiZ2V0TWVyZ2VkQ2FyZFN0eWxlcygpXCI+XG4gICAgICA8ZGl2ICpuZ0lmPVwiaW1hZ2VTb3VyY2U7IGVsc2Ugbm9JbWFnZVwiIGNsYXNzPVwiaW1hZ2UtY29udGFpbmVyXCI+XG4gICAgICAgIDxpbWcgW3NyY109XCJpbWFnZVNvdXJjZVwiIGFsdD1cIlByb2ZpbGVcIiBbbmdTdHlsZV09XCJnZXRNZXJnZWRJbWFnZVN0eWxlcygpXCIgLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPG5nLXRlbXBsYXRlICNub0ltYWdlPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5pdGlhbHNcIiBbbmdTdHlsZV09XCJnZXRJbml0aWFsc1N0eWxlKClcIj57eyBpbml0aWFscyB9fTwvZGl2PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vbWluaS1jYXJkLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTWluaUNhcmQge1xuICBASW5wdXQoKSBpbml0aWFscyE6IHN0cmluZztcbiAgQElucHV0KCkgZm9udFNpemUgPSAxNDtcbiAgQElucHV0KCkgY3VzdG9tU3R5bGU6IFBhcnRpYWw8Q1NTU3R5bGVEZWNsYXJhdGlvbj4gPSB7fTtcbiAgQElucHV0KCkgaW1hZ2VTb3VyY2UhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHJvdW5kZWRJbWFnZSA9IGZhbHNlO1xuICBASW5wdXQoKSBpbWFnZVN0eWxlOiBQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+ID0ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnaW5pdGlhbHMnKSBpbmplY3RlZEluaXRpYWxzOiBzdHJpbmcsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnZm9udFNpemUnKSBpbmplY3RlZEZvbnRTaXplOiBudW1iZXIsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnY3VzdG9tU3R5bGUnKSBpbmplY3RlZEN1c3RvbVN0eWxlOiBQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2ltYWdlU291cmNlJykgaW5qZWN0ZWRJbWFnZVNvdXJjZTogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3JvdW5kZWRJbWFnZScpIGluamVjdGVkUm91bmRlZEltYWdlOiBib29sZWFuLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2ltYWdlU3R5bGUnKSBpbmplY3RlZEltYWdlU3R5bGU6IFBhcnRpYWw8Q1NTU3R5bGVEZWNsYXJhdGlvbj4sXG4gICkge1xuICAgIHRoaXMuaW5pdGlhbHMgPSBpbmplY3RlZEluaXRpYWxzIHx8IHRoaXMuaW5pdGlhbHMgfHwgJyc7XG4gICAgdGhpcy5mb250U2l6ZSA9IGluamVjdGVkRm9udFNpemUgfHwgdGhpcy5mb250U2l6ZSB8fCAxNDtcbiAgICB0aGlzLmN1c3RvbVN0eWxlID0gaW5qZWN0ZWRDdXN0b21TdHlsZSB8fCB0aGlzLmN1c3RvbVN0eWxlIHx8IHt9O1xuICAgIHRoaXMuaW1hZ2VTb3VyY2UgPSBpbmplY3RlZEltYWdlU291cmNlIHx8IHRoaXMuaW1hZ2VTb3VyY2UgfHwgJyc7XG4gICAgdGhpcy5yb3VuZGVkSW1hZ2UgPSBpbmplY3RlZFJvdW5kZWRJbWFnZSB8fCB0aGlzLnJvdW5kZWRJbWFnZSB8fCB0cnVlO1xuICAgIHRoaXMuaW1hZ2VTdHlsZSA9IGluamVjdGVkSW1hZ2VTdHlsZSB8fCB0aGlzLmltYWdlU3R5bGUgfHwge307XG4gIH1cblxuICBnZXRNZXJnZWRDYXJkU3R5bGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnZm9udC1zaXplJzogdGhpcy5mb250U2l6ZSArICdweCcsXG4gICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgIGJvcmRlclJhZGl1czogJzAnLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICBmb250RmFtaWx5OiBcIidOdW5pdG8nLCBzYW5zLXNlcmlmXCIsXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICBib3JkZXI6ICcycHggc29saWQgYmxhY2snLFxuICAgICAgLi4udGhpcy5jdXN0b21TdHlsZSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0TWVyZ2VkSW1hZ2VTdHlsZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiAnNjAlJyxcbiAgICAgIGhlaWdodDogJzYwJScsXG4gICAgICBvYmplY3RGaXQ6ICdjb3ZlcicsXG4gICAgICAuLi4odGhpcy5yb3VuZGVkSW1hZ2UgPyB7IGJvcmRlclJhZGl1czogJzUwJScgfSA6IHt9KSxcbiAgICAgIC4uLnRoaXMuaW1hZ2VTdHlsZSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0SW5pdGlhbHNTdHlsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICdmb250LXNpemUnOiB0aGlzLmZvbnRTaXplICsgJ3B4JyxcbiAgICB9O1xuICB9XG59XG4iXX0=