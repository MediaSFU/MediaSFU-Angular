import { Component, Input, OnInit, OnDestroy, HostListener, Optional, Inject } from '@angular/core';
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
 * MiniAudio component is a standalone Angular component that displays a mini audio player with waveform animations.
 * It supports various customizations including visibility, styles, text, and image properties.
 * The component can be dragged around the screen.
 *
 * @selector app-mini-audio
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * The template includes a modal container with a card that displays an optional background image, name text, and waveform animations.
 *
 * @styles
 * The styles define the appearance of the modal container, card, background image, name text, overlay, waveform, and bars.
 *
 * @class MiniAudio
 * @implements OnInit, OnDestroy
 *
 * @property {boolean} visible - Determines if the component is visible.
 * @property {any} customStyle - Custom styles for the component.
 * @property {string} name - The name text displayed in the component.
 * @property {boolean} showWaveform - Flag to show or hide the waveform animations.
 * @property {string} overlayPosition - Position of the overlay.
 * @property {string} barColor - Color of the waveform bars.
 * @property {string} textColor - Color of the name text.
 * @property {any} nameTextStyling - Additional styles for the name text.
 * @property {string} imageSource - Source URL for the background image.
 * @property {boolean} roundedImage - Flag to apply rounded corners to the background image.
 * @property {any} imageStyle - Custom styles for the background image.
 *
 * @constructor
 * The constructor allows optional dependency injection for all input properties.
 *
 * @method ngOnInit
 * Initializes the component and starts waveform animations if enabled.
 *
 * @method ngOnDestroy
 * Cleans up intervals to prevent memory leaks.
 *
 * @method animateWaveform
 * Starts the waveform animations by setting intervals for each bar.
 *
 * @method animateBar
 * Animates a single bar in the waveform.
 *
 * @method resetWaveform
 * Resets the waveform animations to their initial state.
 *
 * @method clearIntervals
 * Clears all animation intervals.
 *
 * @method getAnimationDuration
 * Returns the animation duration for a given bar index.
 *
 * @method getImageStyle
 * Returns the combined styles for the background image, including optional rounded corners.
 *
 * @method combineStyles
 * Combines base styles with additional styles.
 *
 * @method handleMouseDown
 * Handles the mousedown event to start dragging the component.
 *
 * @method handleMouseMove
 * Handles the mousemove event to update the component's position while dragging.
 *
 * @method handleMouseUp
 * Handles the mouseup event to stop dragging the component.
 *
 * @method getOverlayPosition
 * Returns the position styles for the overlay.
 */
@Component({
  selector: 'app-mini-audio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="visible"
      class="modal-container"
      [ngStyle]="{ transform: 'translate(' + position.x + 'px, ' + position.y + 'px)' }"
      (mousedown)="handleMouseDown($event)"
    >
      <div class="card" [ngStyle]="customStyle">
        <ng-container *ngIf="imageSource">
          <img
            [src]="imageSource"
            [ngStyle]="getImageStyle()"
            alt="Background"
            class="background-image"
          />
        </ng-container>
        <div class="name-text" [ngStyle]="combineStyles({ color: textColor }, nameTextStyling)">
          {{ name }}
        </div>
        <div [ngStyle]="getOverlayPosition(overlayPosition)" class="overlay-web">
          <div class="waveform-web">
            <div
              *ngFor="let animation of waveformAnimations; let i = index"
              [ngStyle]="{
                height: animation == 0 ? '1px' : '30px',
                width: '10px',
                backgroundColor: barColor
              }"
              class="bar"
            ></div>
          </div>
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
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 45, 33, 0.5);
        z-index: 8;
        elevation: 8;
      }

      .card {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: #2c678f;
      }

      .background-image {
        position: absolute;
        width: 70px;
        height: 70px;
        justify-content: center;
        align-items: center;
        align-self: center;
        top: 40%;
        left: 50%;
        transform: translate(-35px, -10px);
      }

      .name-text {
        font-size: 20px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;
        padding-top: 5px;
        padding-bottom: 5px;
        text-align: center;
        z-index: 2;
      }

      .overlay-web {
        position: absolute;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 12fr 1fr;
        grid-gap: 3px;
        z-index: 3;
      }

      .waveform-web {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.05);
        padding: 0;
        flex-direction: row;
      }

      .bar {
        flex: 1;
        opacity: 0.35;
        margin-right: 0.5px;
      }
    `,
  ],
})
export class MiniAudio implements OnInit, OnDestroy {
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
  intervals: NodeJS.Timeout[] = [];
  position = { x: 0, y: 0 };
  isDragging = false;
  dragOffset = { x: 0, y: 0 };

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
      setInterval(() => this.animateBar(index), this.getAnimationDuration(index) * 2),
    );
  }

  animateBar(index: number) {
    this.waveformAnimations[index] = 1;
    setTimeout(() => {
      this.waveformAnimations[index] = 0;
    }, this.getAnimationDuration(index));
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
