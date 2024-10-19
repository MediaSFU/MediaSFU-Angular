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
 * @fileoverview SubAspectComponent is an Angular component that displays a sub-aspect of a media element.
 * It adjusts its size and visibility based on input properties and window events.
 *
 * @component
 * @selector app-sub-aspect-component
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * <div *ngIf="showControls" [ngStyle]="{ position: 'absolute', bottom: '0', margin: '0', backgroundColor: backgroundColor, height: aspectStyles.height + 'px', width: aspectStyles.width + 'px' }">
 *   <ng-content></ng-content>
 * </div>
 *
 * @styles []
 *
 * @class SubAspectComponent
 * @implements OnInit, OnDestroy, OnChanges
 *
 * @property {string} backgroundColor - The background color of the component. Default is 'transparent'.
 * @property {boolean} showControls - Determines whether the controls are shown. Default is true.
 * @property {number} containerWidthFraction - The fraction of the container's width. Default is 1.
 * @property {number} containerHeightFraction - The fraction of the container's height. Default is 1.
 * @property {number} defaultFractionSub - The default fraction for the sub-aspect. Default is 0.0.
 * @property {object} aspectStyles - The styles for the aspect, including height and width.
 * @property {number} aspectStyles.height - The height of the aspect.
 * @property {number} aspectStyles.width - The width of the aspect.
 * @property {number} subAspectFraction - The fraction of the sub-aspect.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized. Adds event listeners for window resize and orientation change.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes. Updates aspect styles if relevant properties change.
 * @method ngOnDestroy - Lifecycle hook that is called just before the component is destroyed. Removes event listeners for window resize and orientation change.
 * @method updateAspectStyles - Updates the aspect styles based on the current window size and input properties.
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
