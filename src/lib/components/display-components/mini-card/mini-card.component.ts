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
