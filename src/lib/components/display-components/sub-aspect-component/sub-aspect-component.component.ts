import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SubAspectComponentOptions {
  backgroundColor?: string;
  showControls?: boolean;
  containerWidthFraction?: number;
  containerHeightFraction?: number;
  defaultFractionSub?: number;
}

export type SubAspectComponentType = (options: SubAspectComponentOptions) => HTMLElement;

/**
 * SubAspectComponent is an Angular component that displays a sub-aspect of a media element with customizable dimensions and background color.
 * The component adapts its size and visibility based on the provided properties and listens for window resize and orientation change events.
 *
 * @selector app-sub-aspect-component
 * @standalone true
 * @imports CommonModule
 *
 * @example
 * ```html
 * <app-sub-aspect-component [backgroundColor]="'blue'" [showControls]="true" [containerWidthFraction]="0.8"></app-sub-aspect-component>
 * ```
 *
 * @input {string} backgroundColor - The background color of the component. Default is 'transparent'.
 * @input {boolean} showControls - Determines if controls are shown within the component. Default is true.
 * @input {number} containerWidthFraction - Fraction of the window width for the component width. Default is 1.
 * @input {number} containerHeightFraction - Fraction of the window height for the component height. Default is 1.
 * @input {number} defaultFractionSub - The default fraction for the sub-aspect height. Default is 0.0.
 *
 * @property {object} aspectStyles - Contains calculated styles for the component's height and width.
 * @property {number} aspectStyles.height - Calculated height of the component.
 * @property {number} aspectStyles.width - Calculated width of the component.
 *
 * @method ngOnInit - Initializes the component and adds event listeners for responsive adjustments.
 * @method ngOnChanges - Updates the aspect styles when any of the input properties change.
 * @method ngOnDestroy - Removes event listeners when the component is destroyed.
 * @method updateAspectStyles - Calculates and applies updated styles based on the window size and input properties.
 */

@Component({
  selector: 'app-sub-aspect-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="showControls"
      [ngStyle]="{
        position: 'absolute',
        bottom: '0',
        margin: '0',
        backgroundColor: backgroundColor,
        height: aspectStyles.height + 'px',
        width: aspectStyles.width + 'px'
      }"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [],
})
export class SubAspectComponent implements OnInit, OnDestroy, OnChanges {
  @Input() backgroundColor = 'transparent';
  @Input() showControls = true;
  @Input() containerWidthFraction = 1;
  @Input() containerHeightFraction = 1;
  @Input() defaultFractionSub = 0.0;

  aspectStyles = {
    height: 0,
    width: 0,
  };

  ngOnInit() {
    this.updateAspectStyles();
    window.addEventListener('resize', this.updateAspectStyles.bind(this));
    window.addEventListener('orientationchange', this.updateAspectStyles.bind(this));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['showControls'] ||
      changes['containerWidthFraction'] ||
      changes['containerHeightFraction'] ||
      changes['defaultFractionSub']
    ) {
      this.updateAspectStyles();
    }
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.updateAspectStyles.bind(this));
    window.removeEventListener('orientationchange', this.updateAspectStyles.bind(this));
  }

  private updateAspectStyles() {
    const windowWidth = window.innerWidth;

    this.aspectStyles = {
      height: this.showControls ? 40 : 0,
      width: this.containerWidthFraction ? this.containerWidthFraction * windowWidth : windowWidth,
    };
  }
}
