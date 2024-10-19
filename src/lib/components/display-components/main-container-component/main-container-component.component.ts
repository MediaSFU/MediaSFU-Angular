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
 * MainContainerComponent is a standalone Angular component that dynamically adjusts its styles
 * based on the provided input properties and window size changes.
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
 * @class MainContainerComponent
 * @implements OnInit, OnDestroy, OnChanges
 *
 * @property {string} backgroundColor - The background color of the container.
 * @property {number} containerWidthFraction - The fraction of the window width the container should occupy.
 * @property {number} containerHeightFraction - The fraction of the window height the container should occupy.
 * @property {number} marginLeft - The left margin of the container in pixels.
 * @property {number} marginRight - The right margin of the container in pixels.
 * @property {number} marginTop - The top margin of the container in pixels.
 * @property {number} marginBottom - The bottom margin of the container in pixels.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized. Sets up event listeners for window resize and orientation change.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes. Updates the container styles accordingly.
 * @method ngOnDestroy - Lifecycle hook that is called just before the component is destroyed. Removes event listeners for window resize and orientation change.
 * @method updateContainerStyles - Updates the container styles based on the current input properties and window size.
 */
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
