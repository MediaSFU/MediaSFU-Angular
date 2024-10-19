import { Component, Input, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
export interface MiniCardOptions {
  initials?: string;
  fontSize?: number;
  customStyle?: Partial<CSSStyleDeclaration>;
  imageSource?: string;
  roundedImage?: boolean;
  imageStyle?: Partial<CSSStyleDeclaration>;
}

export type MiniCardType = (options: MiniCardOptions) => HTMLElement;

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
@Component({
  selector: 'app-mini-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mini-card" [ngStyle]="getMergedCardStyles()">
      <div *ngIf="imageSource; else noImage" class="image-container">
        <img [src]="imageSource" alt="Profile" [ngStyle]="getMergedImageStyles()" />
      </div>
      <ng-template #noImage>
        <div class="initials" [ngStyle]="getInitialsStyle()">{{ initials }}</div>
      </ng-template>
    </div>
  `,
  styleUrls: ['./mini-card.component.css'],
})
export class MiniCard {
  @Input() initials!: string;
  @Input() fontSize = 14;
  @Input() customStyle: Partial<CSSStyleDeclaration> = {};
  @Input() imageSource!: string;
  @Input() roundedImage = false;
  @Input() imageStyle: Partial<CSSStyleDeclaration> = {};

  constructor(
    @Optional() @Inject('initials') injectedInitials: string,
    @Optional() @Inject('fontSize') injectedFontSize: number,
    @Optional() @Inject('customStyle') injectedCustomStyle: Partial<CSSStyleDeclaration>,
    @Optional() @Inject('imageSource') injectedImageSource: string,
    @Optional() @Inject('roundedImage') injectedRoundedImage: boolean,
    @Optional() @Inject('imageStyle') injectedImageStyle: Partial<CSSStyleDeclaration>,
  ) {
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
}
