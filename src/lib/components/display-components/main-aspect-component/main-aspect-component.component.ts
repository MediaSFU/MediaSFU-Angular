import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MainAspectComponentOptions {
  backgroundColor?: string;
  showControls?: boolean;
  containerWidthFraction?: number;
  containerHeightFraction?: number;
  defaultFraction?: number;
  updateIsWideScreen: (isWideScreen: boolean) => void;
  updateIsMediumScreen: (isMediumScreen: boolean) => void;
  updateIsSmallScreen: (isSmallScreen: boolean) => void;
}

export type MainAspectComponentType = (options: MainAspectComponentOptions) => HTMLElement;

/**
 * MainAspectComponent dynamically adjusts its aspect ratio based on window size, providing an adaptable container for content.
 * It listens for window resize and orientation changes to update its layout, making it suitable for responsive applications.
 *
 * @selector app-main-aspect-component
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * ```html
 * <div [ngStyle]="aspectStyles" [style.backgroundColor]="backgroundColor" class="aspect-container">
 *   <ng-content></ng-content>
 * </div>
 * ```
 *
 * @styles
 * - `.aspect-container`: Styles for overflow handling.
 *
 * @inputs
 * - `backgroundColor` (string): The background color of the aspect container.
 * - `showControls` (boolean): Toggles control display, adjusting the container height. Default is true.
 * - `containerWidthFraction` (number): Fraction of window width for container width. Default is 1.
 * - `containerHeightFraction` (number): Fraction of window height for container height. Default is 1.
 * - `defaultFraction` (number): Height adjustment factor when controls are shown. Default is 0.94.
 * - `updateIsWideScreen` (function): Callback to set wide screen status.
 * - `updateIsMediumScreen` (function): Callback to set medium screen status.
 * - `updateIsSmallScreen` (function): Callback to set small screen status.
 *
 * @methods
 * - `ngOnInit()`: Initializes component and sets up resize and orientation listeners.
 * - `ngOnChanges(changes: SimpleChanges)`: Updates layout when relevant inputs change.
 * - `ngOnDestroy()`: Removes event listeners to prevent memory leaks.
 * - `updateAspectStyles()`: Calculates and applies styles based on current window dimensions and component inputs.
 *
 * @example
 * ```html
 * <app-main-aspect-component
 *   [backgroundColor]="'lightblue'"
 *   [showControls]="true"
 *   [containerWidthFraction]="0.9"
 *   [containerHeightFraction]="0.8"
 *   [defaultFraction]="0.95"
 *   [updateIsWideScreen]="onWideScreenUpdate"
 *   [updateIsMediumScreen]="onMediumScreenUpdate"
 *   [updateIsSmallScreen]="onSmallScreenUpdate"
 * ></app-main-aspect-component>
 * ```
 **/

@Component({
    selector: 'app-main-aspect-component',
    imports: [CommonModule],
    template: `
    <div
      [ngStyle]="aspectStyles"
      [style.backgroundColor]="backgroundColor"
      class="aspect-container"
    >
      <ng-content></ng-content>
    </div>
  `,
    styles: [
        `
      .aspect-container {
        overflow: hidden;
      }
    `,
    ]
})
export class MainAspectComponent implements OnInit, OnDestroy, OnChanges {
  @Input() backgroundColor = '';
  @Input() showControls = true;
  @Input() containerWidthFraction = 1;
  @Input() containerHeightFraction = 1;
  @Input() defaultFraction = 0.94;
  @Input() updateIsWideScreen!: (isWideScreen: boolean) => void;
  @Input() updateIsMediumScreen!: (isMediumScreen: boolean) => void;
  @Input() updateIsSmallScreen!: (isSmallScreen: boolean) => void;

  aspectStyles: { [key: string]: any } = {};

  ngOnInit() {
    this.updateAspectStyles();

    window.addEventListener('resize', this.updateAspectStyles);
    window.addEventListener('orientationchange', this.updateAspectStyles);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['showControls'] ||
      changes['containerWidthFraction'] ||
      changes['containerHeightFraction'] ||
      changes['defaultFraction']
    ) {
      this.updateAspectStyles();
    }
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.updateAspectStyles);
    window.removeEventListener('orientationchange', this.updateAspectStyles);
  }

  private updateAspectStyles = () => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    const parentWidth = Math.floor(this.containerWidthFraction * windowWidth);
    const parentHeight = this.showControls
      ? Math.floor(this.containerHeightFraction * windowHeight * this.defaultFraction)
      : Math.floor(this.containerHeightFraction * windowHeight);

    let isWideScreen = parentWidth >= 768;
    const isMediumScreen = parentWidth >= 576 && parentWidth < 768;
    const isSmallScreen = parentWidth < 576;

    if (!isWideScreen && parentWidth > 1.5 * parentHeight) {
      isWideScreen = true;
    }

    this.updateIsWideScreen(isWideScreen);
    this.updateIsMediumScreen(isMediumScreen);
    this.updateIsSmallScreen(isSmallScreen);

    this.aspectStyles = {
      height: parentHeight + 'px',
      width: parentWidth + 'px',
    };
  };
}
