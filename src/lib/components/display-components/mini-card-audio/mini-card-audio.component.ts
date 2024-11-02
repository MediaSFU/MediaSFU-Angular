import { Component, Input, OnInit, OnDestroy, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getOverlayPosition } from '../../../methods/utils/get-overlay-position.util';

export interface MiniCardAudioOptions {
  customStyle?: Partial<CSSStyleDeclaration>;
  name?: string;
  showWaveform?: boolean;
  overlayPosition?: string;
  barColor?: string;
  textColor?: string;
  imageSource?: string;
  roundedImage?: boolean;
  imageStyle?: Partial<CSSStyleDeclaration>;
}

export type MiniCardAudioType = (options: MiniCardAudioOptions) => HTMLElement;

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

@Component({
  selector: 'app-mini-card-audio',
  standalone: true,
  imports: [CommonModule],
  template: `
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
  `,
  styles: [
    `
      .card {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: #2c678f;
      }
      .overlay-web {
        position: absolute;
        min-width: 50%;
        min-height: 5%;
        max-height: 100%;
        display: grid;
        grid-template-columns: 4fr 2fr;
        grid-gap: 3px;
      }
      .name-column {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 5px 10px;
        margin-right: 2px;
        font-size: 14px;
      }
      .name-text {
        font-size: 14px;
        color: white;
      }
      .waveform-web {
        display: flex;
        justify-content: left;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.05);
        padding: 0;
        flex-direction: row;
      }
      .bar {
        flex: 1;
        opacity: 0.35;
        margin: 0 1px;
      }
      .background-image {
        position: absolute;
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 50%;
        left: 50%;
        transform: translate(-40px, -40px);
      }
      .rounded-image {
        border-radius: 20%;
      }
    `,
  ],
})
export class MiniCardAudio implements OnInit, OnDestroy {
  @Input() customStyle: any;
  @Input() name = '';
  @Input() showWaveform = false;
  @Input() overlayPosition = 'bottomLeft';
  @Input() barColor = 'white';
  @Input() textColor = 'white';
  @Input() imageSource = '';
  @Input() roundedImage = false;
  @Input() imageStyle: any = {};

  waveformAnimations: number[] = Array.from({ length: 9 }, () => 0);
  intervals: NodeJS.Timeout[] = [];

  constructor(
    @Optional() @Inject('customStyle') injectedCustomStyle: Partial<CSSStyleDeclaration>,
    @Optional() @Inject('name') injectedName: string,
    @Optional() @Inject('showWaveform') injectedShowWaveform: boolean,
    @Optional() @Inject('overlayPosition') injectedOverlayPosition: string,
    @Optional() @Inject('barColor') injectedBarColor: string,
    @Optional() @Inject('textColor') injectedTextColor: string,
    @Optional() @Inject('imageSource') injectedImageSource: string,
    @Optional() @Inject('roundedImage') injectedRoundedImage: boolean,
    @Optional() @Inject('imageStyle') injectedImageStyle: Partial<CSSStyleDeclaration>,
  ) {
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
    } else {
      this.resetWaveform();
    }
  }

  ngOnDestroy() {
    this.clearIntervals();
  }

  animateWaveform() {
    this.intervals = this.waveformAnimations.map((_, index) =>
      setInterval(() => {
        this.waveformAnimations[index] = (this.waveformAnimations[index] + 1) % 2;
      }, this.getAnimationDuration(index)),
    );
  }

  resetWaveform() {
    this.waveformAnimations.fill(0);
  }

  clearIntervals() {
    this.intervals.forEach((interval) => clearInterval(interval));
  }

  getAnimationDuration(index: number): number {
    const durations = [474, 433, 407, 458, 400, 427, 441, 419, 487];
    return durations[index] || 0;
  }

  getImageStyle() {
    return {
      ...this.imageStyle,
      ...(this.roundedImage ? { borderRadius: '20%' } : {}),
    };
  }

  getOverlayPosition(position: string) {
    return getOverlayPosition({ position });
  }
}
