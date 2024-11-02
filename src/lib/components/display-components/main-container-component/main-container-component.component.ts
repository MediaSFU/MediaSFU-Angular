import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MainContainerComponentOptions {
  backgroundColor?: string;
  containerWidthFraction?: number;
  containerHeightFraction?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  padding?: number;
}

export type MainContainerComponentType = (options: MainContainerComponentOptions) => HTMLElement;

/**
 * MainContainerComponent dynamically adjusts its styles based on input properties and window size,
 * providing a responsive container for content.
 *
 * @selector app-main-container-component
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * ```html
 * <div [ngStyle]="containerStyles">
 *   <ng-content></ng-content>
 * </div>
 * ```
 *
 * @inputs
 * - `backgroundColor` (string): Background color of the container.
 * - `containerWidthFraction` (number): Fraction of the window width the container should occupy. Default is 1.
 * - `containerHeightFraction` (number): Fraction of the window height the container should occupy. Default is 1.
 * - `marginLeft` (number): Left margin of the container in pixels.
 * - `marginRight` (number): Right margin of the container in pixels.
 * - `marginTop` (number): Top margin of the container in pixels.
 * - `marginBottom` (number): Bottom margin of the container in pixels.
 * - `padding` (number): Padding inside the container in pixels.
 *
 * @methods
 * - `ngOnInit()`: Initializes the component, sets up event listeners for resize and orientation changes, and updates container styles.
 * - `ngOnChanges(changes: SimpleChanges)`: Updates container styles when input properties change.
 * - `ngOnDestroy()`: Removes event listeners to avoid memory leaks.
 * - `updateContainerStyles()`: Computes and applies styles to the container based on current window size and input properties.
 *
 * @example
 * ```html
 * <app-main-container-component
 *   [backgroundColor]="'lightgrey'"
 *   [containerWidthFraction]="0.8"
 *   [containerHeightFraction]="0.9"
 *   [marginLeft]="10"
 *   [marginTop]="15"
 *   [padding]="5"
 * ></app-main-container-component>
 * ```
 **/

@Component({
  selector: 'app-main-container-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngStyle]="containerStyles">
      <ng-content></ng-content>
    </div>
  `,
})
export class MainContainerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() backgroundColor = '';
  @Input() containerWidthFraction = 1;
  @Input() containerHeightFraction = 1;
  @Input() marginLeft = 0;
  @Input() marginRight = 0;
  @Input() marginTop = 0;
  @Input() marginBottom = 0;
  @Input() padding = 0;

  containerStyles: { [key: string]: any } = {};

  ngOnInit() {
    this.updateContainerStyles();

    window.addEventListener('resize', this.updateContainerStyles);
    window.addEventListener('orientationchange', this.updateContainerStyles);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['containerHeightFraction'] ||
      changes['containerWidthFraction'] ||
      changes['backgroundColor'] ||
      changes['marginLeft'] ||
      changes['marginRight'] ||
      changes['marginTop'] ||
      changes['marginBottom']
    ) {
      this.updateContainerStyles();
    }
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.updateContainerStyles);
    window.removeEventListener('orientationchange', this.updateContainerStyles);
  }

  updateContainerStyles = () => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    this.containerStyles = {
      backgroundColor: this.backgroundColor,
      marginLeft: `${this.marginLeft}px`,
      marginRight: `${this.marginRight}px`,
      marginTop: `${this.marginTop}px`,
      marginBottom: `${this.marginBottom}px`,
      height: Math.floor(this.containerHeightFraction * windowHeight) + 'px',
      maxHeight: Math.floor(this.containerHeightFraction * windowHeight) + 'px',
      width: Math.floor(this.containerWidthFraction * windowWidth) + 'px',
      maxWidth: Math.floor(this.containerWidthFraction * windowWidth) + 'px',
      padding: `${this.padding}px`,
      overflow: 'hidden',
    };
  };
}
