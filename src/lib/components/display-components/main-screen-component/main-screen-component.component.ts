import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ContentChildren,
  QueryList,
  ElementRef,
  Renderer2,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentSizes } from '../../../@types/types';
export interface MainScreenComponentOptions {
  mainSize?: number;
  doStack?: boolean;
  containerWidthFraction?: number;
  containerHeightFraction?: number;
  defaultFraction?: number;
  showControls?: boolean;
  updateComponentSizes: (sizes: ComponentSizes) => void;
}

export type MainScreenComponentType = (options: MainScreenComponentOptions) => HTMLElement;

/**
 * MainScreenComponent dynamically displays a main screen area with responsive dimensions, adjustable layout, and stacking options based on the screen size and input properties.
 *
 * @selector app-main-screen-component
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * ```html
 * <div [ngStyle]="containerStyle">
 *   <ng-content></ng-content>
 * </div>
 * ```
 *
 * @inputs
 * - `mainSize` (number): Percentage size of the main component. Default is 40.
 * - `doStack` (boolean): Determines if components should be stacked. Default is true.
 * - `containerWidthFraction` (number): Fraction of the container width to use. Default is 1.
 * - `containerHeightFraction` (number): Fraction of the container height to use. Default is 1.
 * - `defaultFraction` (number): Default height fraction for the container when controls are shown. Default is 0.94.
 * - `showControls` (boolean): If true, shows control elements, affecting container height. Default is true.
 * - `updateComponentSizes` (function): Callback for updating component sizes.
 *
 * @ContentChildren('child') children - Query list of child elements within the component.
 *
 * @properties
 * - `containerStyle`: Returns a style object for the container based on dimensions and layout options.
 *
 * @methods
 * - `ngOnInit()`: Initializes the component and sets up event listeners for window resize and orientation changes.
 * - `ngOnChanges(changes: SimpleChanges)`: Updates dimensions and layout if any relevant inputs change.
 * - `ngOnDestroy()`: Removes event listeners to prevent memory leaks.
 * - `ngAfterViewInit()`: Applies computed styles to child elements after view initialization.
 * - `computeDimensions()`: Calculates the dimensions for main and secondary components based on current layout settings.
 * - `updateDimensions()`: Updates component dimensions based on window size and input properties.
 * - `applyChildStyles()`: Applies computed styles to child components.
 *
 * @example
 * ```html
 * <app-main-screen-component
 *   [mainSize]="60"
 *   [doStack]="false"
 *   [containerWidthFraction]="0.8"
 *   [containerHeightFraction]="0.9"
 *   [defaultFraction]="0.9"
 *   [showControls]="true"
 *   [updateComponentSizes]="onUpdateSizes"
 * >
 *   <div #child>Child Component</div>
 * </app-main-screen-component>
 * ```
 **/

@Component({
  selector: 'app-main-screen-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngStyle]="containerStyle">
      <ng-content></ng-content>
    </div>
  `,
})
export class MainScreenComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() mainSize = 40; // percentage
  @Input() doStack = true;
  @Input() containerWidthFraction = 1;
  @Input() containerHeightFraction = 1;
  @Input() defaultFraction = 0.94;
  @Input() showControls = true;
  @Input() updateComponentSizes = (sizes: ComponentSizes) => {
    console.log(sizes);
  };

  @ContentChildren('child')
  children!: QueryList<ElementRef>;

  parentWidth!: number;
  parentHeight!: number;
  isWideScreen!: boolean;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.updateDimensions();

    window.addEventListener('resize', this.updateDimensions);
    window.addEventListener('orientationchange', this.updateDimensions);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.updateDimensions);
    window.removeEventListener('orientationchange', this.updateDimensions);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['mainSize'] ||
      changes['doStack'] ||
      changes['parentWidth'] ||
      changes['parentHeight'] ||
      changes['showControls'] ||
      changes['defaultFraction']
    ) {
      this.updateDimensions();
    }
  }

  ngAfterViewInit() {
    this.applyChildStyles();
  }

  computeDimensions() {
    if (this.doStack) {
      return this.isWideScreen
        ? {
            mainHeight: Math.floor(this.parentHeight),
            otherHeight: Math.floor(this.parentHeight),
            mainWidth: Math.floor((this.mainSize / 100) * this.parentWidth),
            otherWidth: Math.floor(((100 - this.mainSize) / 100) * this.parentWidth),
          }
        : {
            mainHeight: Math.floor((this.mainSize / 100) * this.parentHeight),
            otherHeight: Math.floor(((100 - this.mainSize) / 100) * this.parentHeight),
            mainWidth: Math.floor(this.parentWidth),
            otherWidth: Math.floor(this.parentWidth),
          };
    } else {
      return {
        mainHeight: Math.floor(this.parentHeight),
        otherHeight: Math.floor(this.parentHeight),
        mainWidth: Math.floor(this.parentWidth),
        otherWidth: Math.floor(this.parentWidth),
      };
    }
  }

  updateDimensions = () => {
    this.parentWidth = window.innerWidth * this.containerWidthFraction;
    this.parentHeight = this.showControls
      ? window.innerHeight * this.containerHeightFraction * this.defaultFraction
      : window.innerHeight * this.containerHeightFraction;

    this.isWideScreen = this.parentWidth >= 768;

    if (!this.isWideScreen && this.parentWidth > 1.5 * this.parentHeight) {
      this.isWideScreen = true;
    }

    const { mainHeight, otherHeight, mainWidth, otherWidth } = this.computeDimensions();
    this.updateComponentSizes({ mainHeight, otherHeight, mainWidth, otherWidth });
    this.applyChildStyles();
  };

  get containerStyle() {
    return {
      display: 'flex',
      flex: 1,
      flexDirection: this.isWideScreen ? 'row' : 'column',
      width: `${this.parentWidth}px`,
      height: `${this.parentHeight}px`,
      padding: 0,
      margin: 0,
    };
  }

  applyChildStyles() {
    if (this.children) {
      const { mainHeight, otherHeight, mainWidth, otherWidth } = this.computeDimensions();
      this.children.forEach((child, index) => {
        const childStyle = this.doStack
          ? {
              height: index === 0 ? mainHeight : otherHeight,
              width: index === 0 ? mainWidth : otherWidth,
            }
          : {
              height: mainHeight,
              width: mainWidth,
            };

        this.renderer.setStyle(child.nativeElement, 'height', `${childStyle.height}px`);
        this.renderer.setStyle(child.nativeElement, 'width', `${childStyle.width}px`);
      });
    }
  }
}
