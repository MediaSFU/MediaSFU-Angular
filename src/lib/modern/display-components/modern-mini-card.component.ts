import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ModernMiniCardOptions {
  initials?: string;
  fontSize?: number;
  customStyle?: Partial<CSSStyleDeclaration>;
  imageSource?: string;
  roundedImage?: boolean;
  imageStyle?: Partial<CSSStyleDeclaration>;
}

export type ModernMiniCardType = (options: ModernMiniCardOptions) => HTMLElement;

@Component({
  selector: 'app-modern-mini-card',
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
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      .mini-card {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: #ffffff;
        font-family: var(--ms-modern-font-family, 'Segoe UI', 'Aptos', 'Trebuchet MS', sans-serif);
        overflow: hidden;
      }

      .mini-card__avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      .mini-card__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .mini-card__initials {
        position: relative;
        z-index: 1;
        font-weight: 800;
      }

      .mini-card__gloss {
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, transparent 55%);
        pointer-events: none;
      }
    `,
  ],
})
export class ModernMiniCardComponent implements OnChanges {
  @Input() initials = '';
  @Input() fontSize = 14;
  @Input() customStyle: Partial<CSSStyleDeclaration> = {};
  @Input() imageSource = '';
  @Input() roundedImage = true;
  @Input() imageStyle: Partial<CSSStyleDeclaration> = {};

  imageLoadFailed = false;

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