import { Component, Input, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * MiniCard component displays a card with either an image or initials.
 *
 * @component
 * @selector app-mini-card
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * <div class="mini-card" [ngStyle]="getMergedCardStyles()">
 *   <div *ngIf="imageSource; else noImage" class="image-container">
 *     <img [src]="imageSource" alt="Profile" [ngStyle]="getMergedImageStyles()" />
 *   </div>
 *   <ng-template #noImage>
 *     <div class="initials" [ngStyle]="getInitialsStyle()">{{ initials }}</div>
 *   </ng-template>
 * </div>
 *
 * @styleUrls ['./mini-card.component.css']
 *
 * @property {string} initials - The initials to display if no image is provided.
 * @property {number} fontSize - The font size for the initials text. Default is 14.
 * @property {Partial<CSSStyleDeclaration>} customStyle - Custom styles for the card.
 * @property {string} imageSource - The source URL for the image.
 * @property {boolean} roundedImage - Whether the image should be rounded. Default is false.
 * @property {Partial<CSSStyleDeclaration>} imageStyle - Custom styles for the image.
 *
 * @constructor
 * @param {string} [injectedInitials] - Injected initials.
 * @param {number} [injectedFontSize] - Injected font size.
 * @param {Partial<CSSStyleDeclaration>} [injectedCustomStyle] - Injected custom styles.
 * @param {string} [injectedImageSource] - Injected image source.
 * @param {boolean} [injectedRoundedImage] - Injected rounded image flag.
 * @param {Partial<CSSStyleDeclaration>} [injectedImageStyle] - Injected image styles.
 *
 * @method getMergedCardStyles
 * @description Merges the default card styles with custom styles.
 * @returns {CSSStyleDeclaration} The merged card styles.
 *
 * @method getMergedImageStyles
 * @description Merges the default image styles with custom styles.
 * @returns {CSSStyleDeclaration} The merged image styles.
 *
 * @method getInitialsStyle
 * @description Returns the styles for the initials text.
 * @returns {CSSStyleDeclaration} The initials text styles.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaS1jYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9taW5pLWNhcmQvbWluaS1jYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBWS9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOENHO0FBaUJILE1BQU0sT0FBTyxRQUFRO0lBQ1YsUUFBUSxDQUFVO0lBQ2xCLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDZCxXQUFXLEdBQWlDLEVBQUUsQ0FBQztJQUMvQyxXQUFXLENBQVU7SUFDckIsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUNyQixVQUFVLEdBQWlDLEVBQUUsQ0FBQztJQUV2RCxZQUNrQyxnQkFBd0IsRUFDeEIsZ0JBQXdCLEVBQ3JCLG1CQUFpRCxFQUNqRCxtQkFBMkIsRUFDMUIsb0JBQTZCLEVBQy9CLGtCQUFnRDtRQUVsRixJQUFJLENBQUMsUUFBUSxHQUFHLGdCQUFnQixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO1FBQ3hELElBQUksQ0FBQyxRQUFRLEdBQUcsZ0JBQWdCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztRQUNqRSxJQUFJLENBQUMsV0FBVyxHQUFHLG1CQUFtQixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO1FBQ2pFLElBQUksQ0FBQyxZQUFZLEdBQUcsb0JBQW9CLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUM7UUFDdEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztJQUNoRSxDQUFDO0lBRUQsbUJBQW1CO1FBQ2pCLE9BQU87WUFDTCxXQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJO1lBQ2pDLE9BQU8sRUFBRSxNQUFNO1lBQ2YsY0FBYyxFQUFFLFFBQVE7WUFDeEIsVUFBVSxFQUFFLFFBQVE7WUFDcEIsWUFBWSxFQUFFLEdBQUc7WUFDakIsS0FBSyxFQUFFLE1BQU07WUFDYixNQUFNLEVBQUUsTUFBTTtZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsVUFBVSxFQUFFLHNCQUFzQjtZQUNsQyxRQUFRLEVBQUUsUUFBUTtZQUNsQixNQUFNLEVBQUUsaUJBQWlCO1lBQ3pCLEdBQUcsSUFBSSxDQUFDLFdBQVc7U0FDcEIsQ0FBQztJQUNKLENBQUM7SUFFRCxvQkFBb0I7UUFDbEIsT0FBTztZQUNMLEtBQUssRUFBRSxLQUFLO1lBQ1osTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUUsT0FBTztZQUNsQixHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNyRCxHQUFHLElBQUksQ0FBQyxVQUFVO1NBQ25CLENBQUM7SUFDSixDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsT0FBTztZQUNMLFNBQVMsRUFBRSxRQUFRO1lBQ25CLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUk7U0FDbEMsQ0FBQztJQUNKLENBQUM7dUdBeERVLFFBQVEsa0JBU0csVUFBVSw2QkFDVixVQUFVLDZCQUNWLGFBQWEsNkJBQ2IsYUFBYSw2QkFDYixjQUFjLDZCQUNkLFlBQVk7MkZBZHZCLFFBQVEsaVBBWlQ7Ozs7Ozs7OztHQVNULHFlQVZTLFlBQVk7OzJGQWFYLFFBQVE7a0JBaEJwQixTQUFTOytCQUNFLGVBQWUsY0FDYixJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsWUFDYjs7Ozs7Ozs7O0dBU1Q7OzBCQVlFLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsVUFBVTs7MEJBQzdCLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsVUFBVTs7MEJBQzdCLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsYUFBYTs7MEJBQ2hDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsYUFBYTs7MEJBQ2hDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsY0FBYzs7MEJBQ2pDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsWUFBWTt5Q0FiekIsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuZXhwb3J0IGludGVyZmFjZSBNaW5pQ2FyZE9wdGlvbnMge1xuICBpbml0aWFscz86IHN0cmluZztcbiAgZm9udFNpemU/OiBudW1iZXI7XG4gIGN1c3RvbVN0eWxlPzogUGFydGlhbDxDU1NTdHlsZURlY2xhcmF0aW9uPjtcbiAgaW1hZ2VTb3VyY2U/OiBzdHJpbmc7XG4gIHJvdW5kZWRJbWFnZT86IGJvb2xlYW47XG4gIGltYWdlU3R5bGU/OiBQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+O1xufVxuXG5leHBvcnQgdHlwZSBNaW5pQ2FyZFR5cGUgPSAob3B0aW9uczogTWluaUNhcmRPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuLyoqXG4gKiBNaW5pQ2FyZCBjb21wb25lbnQgZGlzcGxheXMgYSBjYXJkIHdpdGggZWl0aGVyIGFuIGltYWdlIG9yIGluaXRpYWxzLlxuICpcbiAqIEBjb21wb25lbnRcbiAqIEBzZWxlY3RvciBhcHAtbWluaS1jYXJkXG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBDb21tb25Nb2R1bGVcbiAqXG4gKiBAdGVtcGxhdGVcbiAqIDxkaXYgY2xhc3M9XCJtaW5pLWNhcmRcIiBbbmdTdHlsZV09XCJnZXRNZXJnZWRDYXJkU3R5bGVzKClcIj5cbiAqICAgPGRpdiAqbmdJZj1cImltYWdlU291cmNlOyBlbHNlIG5vSW1hZ2VcIiBjbGFzcz1cImltYWdlLWNvbnRhaW5lclwiPlxuICogICAgIDxpbWcgW3NyY109XCJpbWFnZVNvdXJjZVwiIGFsdD1cIlByb2ZpbGVcIiBbbmdTdHlsZV09XCJnZXRNZXJnZWRJbWFnZVN0eWxlcygpXCIgLz5cbiAqICAgPC9kaXY+XG4gKiAgIDxuZy10ZW1wbGF0ZSAjbm9JbWFnZT5cbiAqICAgICA8ZGl2IGNsYXNzPVwiaW5pdGlhbHNcIiBbbmdTdHlsZV09XCJnZXRJbml0aWFsc1N0eWxlKClcIj57eyBpbml0aWFscyB9fTwvZGl2PlxuICogICA8L25nLXRlbXBsYXRlPlxuICogPC9kaXY+XG4gKlxuICogQHN0eWxlVXJscyBbJy4vbWluaS1jYXJkLmNvbXBvbmVudC5jc3MnXVxuICpcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpbml0aWFscyAtIFRoZSBpbml0aWFscyB0byBkaXNwbGF5IGlmIG5vIGltYWdlIGlzIHByb3ZpZGVkLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGZvbnRTaXplIC0gVGhlIGZvbnQgc2l6ZSBmb3IgdGhlIGluaXRpYWxzIHRleHQuIERlZmF1bHQgaXMgMTQuXG4gKiBAcHJvcGVydHkge1BhcnRpYWw8Q1NTU3R5bGVEZWNsYXJhdGlvbj59IGN1c3RvbVN0eWxlIC0gQ3VzdG9tIHN0eWxlcyBmb3IgdGhlIGNhcmQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaW1hZ2VTb3VyY2UgLSBUaGUgc291cmNlIFVSTCBmb3IgdGhlIGltYWdlLlxuICogQHByb3BlcnR5IHtib29sZWFufSByb3VuZGVkSW1hZ2UgLSBXaGV0aGVyIHRoZSBpbWFnZSBzaG91bGQgYmUgcm91bmRlZC4gRGVmYXVsdCBpcyBmYWxzZS5cbiAqIEBwcm9wZXJ0eSB7UGFydGlhbDxDU1NTdHlsZURlY2xhcmF0aW9uPn0gaW1hZ2VTdHlsZSAtIEN1c3RvbSBzdHlsZXMgZm9yIHRoZSBpbWFnZS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBbaW5qZWN0ZWRJbml0aWFsc10gLSBJbmplY3RlZCBpbml0aWFscy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbaW5qZWN0ZWRGb250U2l6ZV0gLSBJbmplY3RlZCBmb250IHNpemUuXG4gKiBAcGFyYW0ge1BhcnRpYWw8Q1NTU3R5bGVEZWNsYXJhdGlvbj59IFtpbmplY3RlZEN1c3RvbVN0eWxlXSAtIEluamVjdGVkIGN1c3RvbSBzdHlsZXMuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2luamVjdGVkSW1hZ2VTb3VyY2VdIC0gSW5qZWN0ZWQgaW1hZ2Ugc291cmNlLlxuICogQHBhcmFtIHtib29sZWFufSBbaW5qZWN0ZWRSb3VuZGVkSW1hZ2VdIC0gSW5qZWN0ZWQgcm91bmRlZCBpbWFnZSBmbGFnLlxuICogQHBhcmFtIHtQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+fSBbaW5qZWN0ZWRJbWFnZVN0eWxlXSAtIEluamVjdGVkIGltYWdlIHN0eWxlcy5cbiAqXG4gKiBAbWV0aG9kIGdldE1lcmdlZENhcmRTdHlsZXNcbiAqIEBkZXNjcmlwdGlvbiBNZXJnZXMgdGhlIGRlZmF1bHQgY2FyZCBzdHlsZXMgd2l0aCBjdXN0b20gc3R5bGVzLlxuICogQHJldHVybnMge0NTU1N0eWxlRGVjbGFyYXRpb259IFRoZSBtZXJnZWQgY2FyZCBzdHlsZXMuXG4gKlxuICogQG1ldGhvZCBnZXRNZXJnZWRJbWFnZVN0eWxlc1xuICogQGRlc2NyaXB0aW9uIE1lcmdlcyB0aGUgZGVmYXVsdCBpbWFnZSBzdHlsZXMgd2l0aCBjdXN0b20gc3R5bGVzLlxuICogQHJldHVybnMge0NTU1N0eWxlRGVjbGFyYXRpb259IFRoZSBtZXJnZWQgaW1hZ2Ugc3R5bGVzLlxuICpcbiAqIEBtZXRob2QgZ2V0SW5pdGlhbHNTdHlsZVxuICogQGRlc2NyaXB0aW9uIFJldHVybnMgdGhlIHN0eWxlcyBmb3IgdGhlIGluaXRpYWxzIHRleHQuXG4gKiBAcmV0dXJucyB7Q1NTU3R5bGVEZWNsYXJhdGlvbn0gVGhlIGluaXRpYWxzIHRleHQgc3R5bGVzLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbWluaS1jYXJkJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIm1pbmktY2FyZFwiIFtuZ1N0eWxlXT1cImdldE1lcmdlZENhcmRTdHlsZXMoKVwiPlxuICAgICAgPGRpdiAqbmdJZj1cImltYWdlU291cmNlOyBlbHNlIG5vSW1hZ2VcIiBjbGFzcz1cImltYWdlLWNvbnRhaW5lclwiPlxuICAgICAgICA8aW1nIFtzcmNdPVwiaW1hZ2VTb3VyY2VcIiBhbHQ9XCJQcm9maWxlXCIgW25nU3R5bGVdPVwiZ2V0TWVyZ2VkSW1hZ2VTdHlsZXMoKVwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjbm9JbWFnZT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImluaXRpYWxzXCIgW25nU3R5bGVdPVwiZ2V0SW5pdGlhbHNTdHlsZSgpXCI+e3sgaW5pdGlhbHMgfX08L2Rpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL21pbmktY2FyZC5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE1pbmlDYXJkIHtcbiAgQElucHV0KCkgaW5pdGlhbHMhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZvbnRTaXplID0gMTQ7XG4gIEBJbnB1dCgpIGN1c3RvbVN0eWxlOiBQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+ID0ge307XG4gIEBJbnB1dCgpIGltYWdlU291cmNlITogc3RyaW5nO1xuICBASW5wdXQoKSByb3VuZGVkSW1hZ2UgPSBmYWxzZTtcbiAgQElucHV0KCkgaW1hZ2VTdHlsZTogUGFydGlhbDxDU1NTdHlsZURlY2xhcmF0aW9uPiA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2luaXRpYWxzJykgaW5qZWN0ZWRJbml0aWFsczogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2ZvbnRTaXplJykgaW5qZWN0ZWRGb250U2l6ZTogbnVtYmVyLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2N1c3RvbVN0eWxlJykgaW5qZWN0ZWRDdXN0b21TdHlsZTogUGFydGlhbDxDU1NTdHlsZURlY2xhcmF0aW9uPixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdpbWFnZVNvdXJjZScpIGluamVjdGVkSW1hZ2VTb3VyY2U6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdyb3VuZGVkSW1hZ2UnKSBpbmplY3RlZFJvdW5kZWRJbWFnZTogYm9vbGVhbixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdpbWFnZVN0eWxlJykgaW5qZWN0ZWRJbWFnZVN0eWxlOiBQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+LFxuICApIHtcbiAgICB0aGlzLmluaXRpYWxzID0gaW5qZWN0ZWRJbml0aWFscyB8fCB0aGlzLmluaXRpYWxzIHx8ICcnO1xuICAgIHRoaXMuZm9udFNpemUgPSBpbmplY3RlZEZvbnRTaXplIHx8IHRoaXMuZm9udFNpemUgfHwgMTQ7XG4gICAgdGhpcy5jdXN0b21TdHlsZSA9IGluamVjdGVkQ3VzdG9tU3R5bGUgfHwgdGhpcy5jdXN0b21TdHlsZSB8fCB7fTtcbiAgICB0aGlzLmltYWdlU291cmNlID0gaW5qZWN0ZWRJbWFnZVNvdXJjZSB8fCB0aGlzLmltYWdlU291cmNlIHx8ICcnO1xuICAgIHRoaXMucm91bmRlZEltYWdlID0gaW5qZWN0ZWRSb3VuZGVkSW1hZ2UgfHwgdGhpcy5yb3VuZGVkSW1hZ2UgfHwgdHJ1ZTtcbiAgICB0aGlzLmltYWdlU3R5bGUgPSBpbmplY3RlZEltYWdlU3R5bGUgfHwgdGhpcy5pbWFnZVN0eWxlIHx8IHt9O1xuICB9XG5cbiAgZ2V0TWVyZ2VkQ2FyZFN0eWxlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2ZvbnQtc2l6ZSc6IHRoaXMuZm9udFNpemUgKyAncHgnLFxuICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICBib3JkZXJSYWRpdXM6ICcwJyxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgZm9udEZhbWlseTogXCInTnVuaXRvJywgc2Fucy1zZXJpZlwiLFxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgYm9yZGVyOiAnMnB4IHNvbGlkIGJsYWNrJyxcbiAgICAgIC4uLnRoaXMuY3VzdG9tU3R5bGUsXG4gICAgfTtcbiAgfVxuXG4gIGdldE1lcmdlZEltYWdlU3R5bGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogJzYwJScsXG4gICAgICBoZWlnaHQ6ICc2MCUnLFxuICAgICAgb2JqZWN0Rml0OiAnY292ZXInLFxuICAgICAgLi4uKHRoaXMucm91bmRlZEltYWdlID8geyBib3JkZXJSYWRpdXM6ICc1MCUnIH0gOiB7fSksXG4gICAgICAuLi50aGlzLmltYWdlU3R5bGUsXG4gICAgfTtcbiAgfVxuXG4gIGdldEluaXRpYWxzU3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAnZm9udC1zaXplJzogdGhpcy5mb250U2l6ZSArICdweCcsXG4gICAgfTtcbiAgfVxufVxuIl19