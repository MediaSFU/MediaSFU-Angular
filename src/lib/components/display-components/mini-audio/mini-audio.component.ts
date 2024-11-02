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
