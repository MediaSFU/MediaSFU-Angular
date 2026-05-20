import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  HostListener,
  Optional,
  Inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { getOverlayPosition } from '../../../methods/utils/get-overlay-position.util';

export interface MiniAudioOptions {
  visible?: boolean;
  customStyle?: any;
  name?: string;
  showWaveform?: boolean;
  overlayPosition?: string;
  barColor?: string;
  textColor?: string;
  nameTextStyling?: any;
  imageSource?: string;
  roundedImage?: boolean;
  imageStyle?: any;
}

export type MiniAudioType = (options: MiniAudioOptions) => HTMLElement;

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

@Component({
    selector: 'app-mini-audio',
    imports: [CommonModule],
    template: `
    <div
      *ngIf="visible"
      class="modal-container"
      [class.modal-container--dragging]="isDragging"
      [ngStyle]="{ transform: 'translate(' + position.x + 'px, ' + position.y + 'px)' }"
      (mousedown)="handleMouseDown($event)"
    >
      <div class="card" [ngStyle]="customStyle">
        <div [ngStyle]="getOverlayPosition(overlayPosition)" class="overlay-web">
          <div class="waveform-web">
            <ng-container *ngIf="showWaveform">
              <div class="pulse-ring" [ngStyle]="{ borderColor: barColor, animationDelay: '0s' }"></div>
              <div class="pulse-ring" [ngStyle]="{ borderColor: barColor, animationDelay: '0.5s' }"></div>
            </ng-container>

            <div *ngIf="!hasRenderableImage" class="avatar-fallback" [ngStyle]="{ borderColor: barColor }">
              {{ fallbackInitials }}
            </div>

          <img
            *ngIf="hasRenderableImage"
            [src]="imageSource"
            [ngStyle]="getImageStyle()"
            [alt]="name || 'Audio participant'"
            class="background-image"
            (error)="handleImageError()"
          />
          </div>
        </div>

        <div class="name-text" [ngStyle]="combineStyles({ color: textColor }, nameTextStyling)">
          {{ name }}
        </div>
      </div>
    </div>
  `,
    styles: [
        `
      .modal-container {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0;
        margin: 0;
        width: 100px;
        height: 100px;
        background-color: transparent;
        z-index: 8;
        elevation: 8;
        cursor: grab;
        user-select: none;
        transition: transform 160ms ease, filter 160ms ease;
      }

      .modal-container--dragging {
        cursor: grabbing;
        filter: drop-shadow(0 18px 28px rgba(15, 23, 42, 0.32));
      }

      .card {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98));
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(12px);
      }

      .background-image {
        position: relative;
        width: 52px;
        height: 52px;
        z-index: 2;
        object-fit: cover;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }

      .avatar-fallback {
        width: 52px;
        height: 52px;
        position: relative;
        z-index: 2;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 2px solid;
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.78), rgba(20, 184, 166, 0.74));
        color: #ffffff;
        font-size: 0.8rem;
        font-weight: 800;
        letter-spacing: 0.05em;
      }

      .name-text {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        font-size: 11px;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4));
        backdrop-filter: blur(4px);
        width: 100%;
        min-height: 24px;
        padding: 6px 4px;
        text-align: center;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        letter-spacing: 0.2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        z-index: 4;
      }

      .overlay-web {
        position: absolute;
        inset: 0 0 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3;
      }

      .waveform-web {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70px;
        height: 70px;
        position: relative;
        border-radius: 50%;
        padding: 0;
      }

      .pulse-ring {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        border: 2px solid;
        opacity: 0.6;
        animation: miniAudioPulse 1.5s ease-in-out infinite;
      }

      @keyframes miniAudioPulse {
        0% {
          transform: scale(1);
          opacity: 0.6;
        }
        50% {
          transform: scale(1.15);
          opacity: 0.3;
        }
        100% {
          transform: scale(1.3);
          opacity: 0;
        }
      }
    `,
    ]
})
export class MiniAudio implements OnInit, OnDestroy, OnChanges {
  @Input() visible = true;
  @Input() customStyle: any;
  @Input() name = '';
  @Input() showWaveform = false;
  @Input() overlayPosition = '';
  @Input() barColor = 'red';
  @Input() textColor = 'white';
  @Input() nameTextStyling: any = {};
  @Input() imageSource = '';
  @Input() roundedImage = false;
  @Input() imageStyle: any = {};

  waveformAnimations: number[] = Array.from({ length: 9 }, () => 0);
  intervals: ReturnType<typeof setInterval>[] = [];
  timeouts: ReturnType<typeof setTimeout>[] = [];
  position = { x: 0, y: 0 };
  isDragging = false;
  dragOffset = { x: 0, y: 0 };
  imageLoadFailed = false;

  constructor(
    @Optional() @Inject('visible') injectedVisible: boolean,
    @Optional() @Inject('customStyle') injectedCustomStyle: any,
    @Optional() @Inject('name') injectedName: string,
    @Optional() @Inject('showWaveform') injectedShowWaveform: boolean,
    @Optional() @Inject('overlayPosition') injectedOverlayPosition: string,
    @Optional() @Inject('barColor') injectedBarColor: string,
    @Optional() @Inject('textColor') injectedTextColor: string,
    @Optional() @Inject('nameTextStyling') injectedNameTextStyling: any,
    @Optional() @Inject('imageSource') injectedImageSource: string,
    @Optional() @Inject('roundedImage') injectedRoundedImage: boolean,
    @Optional() @Inject('imageStyle') injectedImageStyle: any,
  ) {
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
    this.syncWaveformState();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showWaveform']) {
      this.syncWaveformState();
    }

    if (changes['imageSource']) {
      this.imageLoadFailed = false;
    }
  }

  ngOnDestroy() {
    this.clearIntervals();
    this.clearTimeouts();
  }

  syncWaveformState() {
    if (this.showWaveform) {
      this.animateWaveform();
    } else {
      this.resetWaveform();
    }
  }

  animateWaveform() {
    this.clearIntervals();
    this.clearTimeouts();
    this.intervals = this.waveformAnimations.map((_, index) =>
      setInterval(() => this.animateBar(index), this.getAnimationDuration(index) * 2),
    );
  }

  animateBar(index: number) {
    this.waveformAnimations[index] = 1;
    const timeout = setTimeout(() => {
      this.waveformAnimations[index] = 0;
    }, this.getAnimationDuration(index));
    this.timeouts.push(timeout);
  }

  resetWaveform() {
    this.clearIntervals();
    this.clearTimeouts();
    this.waveformAnimations.fill(0);
  }

  clearIntervals() {
    this.intervals.forEach((interval) => clearInterval(interval));
    this.intervals = [];
  }

  clearTimeouts() {
    this.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.timeouts = [];
  }

  getAnimationDuration(index: number): number {
    const durations = [474, 433, 407, 458, 400, 427, 441, 419, 487];
    return durations[index] || 0;
  }

  getImageStyle() {
    return {
      ...this.imageStyle,
      ...(this.roundedImage ? { borderRadius: '50%' } : {}),
    };
  }

  get hasRenderableImage(): boolean {
    return Boolean(this.imageSource) && !this.imageLoadFailed;
  }

  get fallbackInitials(): string {
    const trimmedName = this.name.trim();
    if (!trimmedName) {
      return 'AU';
    }

    return trimmedName
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }

  handleImageError() {
    this.imageLoadFailed = true;
  }

  combineStyles(baseStyle: any, additionalStyles: any) {
    return { ...baseStyle, ...additionalStyles };
  }

  handleMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.dragOffset = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y,
    };
  }

  @HostListener('document:mousemove', ['$event'])
  handleMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.position = {
        x: event.clientX - this.dragOffset.x,
        y: event.clientY - this.dragOffset.y,
      };
    }
  }

  @HostListener('document:mouseup')
  handleMouseUp() {
    this.isDragging = false;
  }

  getOverlayPosition(position: string) {
    return getOverlayPosition({ position });
  }
}
