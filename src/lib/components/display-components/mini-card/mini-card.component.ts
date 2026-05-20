import { Component, Input, Inject, Optional, OnChanges, SimpleChanges } from '@angular/core';
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
    imports: [CommonModule],
    template: `
    <div class="mini-card" [ngStyle]="getMergedCardStyles()">
      <div class="mini-card__avatar" [ngStyle]="getAvatarStyle()">
        <ng-container *ngIf="hasRenderableImage; else noImage">
          <img
            [src]="imageSource"
            alt="Profile"
            class="mini-card__image"
            [ngStyle]="getMergedImageStyles()"
            (error)="handleImageError()"
          />
        </ng-container>
        <ng-template #noImage>
          <div class="mini-card__initials" [ngStyle]="getInitialsStyle()">
            {{ resolvedInitials }}
          </div>
        </ng-template>
        <span class="mini-card__gloss" aria-hidden="true"></span>
      </div>
    </div>
  `,
    styleUrls: ['./mini-card.component.css']
})
export class MiniCard implements OnChanges {
  @Input() initials!: string;
  @Input() fontSize = 14;
  @Input() customStyle: Partial<CSSStyleDeclaration> = {};
  @Input() imageSource!: string;
  @Input() roundedImage = true;
  @Input() imageStyle: Partial<CSSStyleDeclaration> = {};
  imageLoadFailed = false;

  constructor(
    @Optional() @Inject('initials') injectedInitials: string,
    @Optional() @Inject('fontSize') injectedFontSize: number,
    @Optional() @Inject('customStyle') injectedCustomStyle: Partial<CSSStyleDeclaration>,
    @Optional() @Inject('imageSource') injectedImageSource: string,
    @Optional() @Inject('roundedImage') injectedRoundedImage: boolean,
    @Optional() @Inject('imageStyle') injectedImageStyle: Partial<CSSStyleDeclaration>,
  ) {
    this.initials = injectedInitials ?? this.initials ?? '';
    this.fontSize = injectedFontSize ?? this.fontSize ?? 14;
    this.customStyle = injectedCustomStyle ?? this.customStyle ?? {};
    this.imageSource = injectedImageSource ?? this.imageSource ?? '';
    this.roundedImage = injectedRoundedImage ?? this.roundedImage ?? true;
    this.imageStyle = injectedImageStyle ?? this.imageStyle ?? {};
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['imageSource']) {
      this.imageLoadFailed = false;
    }
  }

  getMergedCardStyles() {
    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      color: '#ffffff',
      fontFamily:
        "var(--ms-modern-font-family, 'Segoe UI', 'Aptos', 'Trebuchet MS', sans-serif)",
      overflow: 'hidden',
      background: 'transparent',
      ...this.customStyle,
    };
  }

  getAvatarStyle() {
    return {
      width: 'min(140px, 82%)',
      height: 'min(140px, 82%)',
      maxWidth: '82%',
      maxHeight: '82%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: this.roundedImage ? '50%' : '24px',
      background: this.hasRenderableImage
        ? 'rgba(15, 23, 42, 0.18)'
        : 'linear-gradient(135deg, rgba(79, 70, 229, 0.92) 0%, rgba(20, 184, 166, 0.88) 55%, rgba(245, 158, 11, 0.82) 100%)',
      border: '1px solid rgba(255, 255, 255, 0.22)',
      boxShadow: '0 18px 34px rgba(15, 23, 42, 0.18)',
    };
  }

  getMergedImageStyles() {
    return {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: this.roundedImage ? '50%' : '24px',
      ...this.imageStyle,
    };
  }

  getInitialsStyle() {
    return {
      textAlign: 'center',
      'font-size': this.getDisplayFontSize() + 'px',
      fontWeight: '800',
      letterSpacing: this.resolvedInitials.length > 4 ? '0.02em' : '0.08em',
      textTransform: 'none',
      lineHeight: '1',
      color: '#ffffff',
      textShadow: '0 2px 10px rgba(15, 23, 42, 0.22)',
    };
  }

  get resolvedInitials(): string {
    const trimmedLabel = (this.initials || '').trim();

    if (!trimmedLabel) {
      return '';
    }

    return trimmedLabel.length > 10 ? trimmedLabel.substring(0, 10) : trimmedLabel;
  }

  getDisplayFontSize(): number {
    if (this.resolvedInitials.length > 8) {
      return Math.min(this.fontSize, 12);
    }

    if (this.resolvedInitials.length > 5) {
      return Math.min(this.fontSize, 14);
    }

    return this.fontSize;
  }

  get hasRenderableImage(): boolean {
    return Boolean(this.imageSource) && !this.imageLoadFailed;
  }

  handleImageError() {
    this.imageLoadFailed = true;
  }
}
