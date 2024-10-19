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
 * MainAspectComponent is a standalone Angular component that adjusts its aspect ratio
 * based on the window size and other input properties. It listens to window resize
 * and orientation change events to dynamically update its styles.
 *
 * @selector app-main-aspect-component
 * @standalone true
 * @imports [CommonModule]
 *
 * @template
 * ```html
 * <div [ngStyle]="aspectStyles" [style.backgroundColor]="backgroundColor" class="aspect-container">
 *   <ng-content></ng-content>
 * </div>
 * ```
 *
 * @styles
 * ```css
 * .aspect-container {
 *   overflow: hidden;
 * }
 * ```
 *
 * @class MainAspectComponent
 * @implements OnInit, OnDestroy, OnChanges
 *
 * @property {string} backgroundColor - The background color of the aspect container.
 * @property {boolean} showControls - Flag to show or hide controls.
 * @property {number} containerWidthFraction - Fraction of the window width for the container.
 * @property {number} containerHeightFraction - Fraction of the window height for the container.
 * @property {number} defaultFraction - Default fraction to adjust the height when controls are shown.
 * @property {(isWideScreen: boolean) => void} updateIsWideScreen - Callback to update wide screen status.
 * @property {(isMediumScreen: boolean) => void} updateIsMediumScreen - Callback to update medium screen status.
 * @property {(isSmallScreen: boolean) => void} updateIsSmallScreen - Callback to update small screen status.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @method ngOnDestroy - Lifecycle hook that is called just before the component is destroyed.
 * @method private updateAspectStyles - Updates the aspect styles based on the window size and input properties.
 */
@Component({
  selector: 'app-main-aspect-component',
  standalone: true,
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
  ],
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
