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
 * MainScreenComponent is responsible for displaying a main screen with dynamic dimensions
 * and layout based on the input properties and screen size.
 *
 * @selector app-main-screen-component
 * @standalone true
 * @imports CommonModule
 *
 * @property {number} mainSize - The size of the main component as a percentage.
 * @property {boolean} doStack - Determines if the components should be stacked.
 * @property {number} containerWidthFraction - Fraction of the container width.
 * @property {number} containerHeightFraction - Fraction of the container height.
 * @property {number} defaultFraction - Default fraction for height calculation.
 * @property {boolean} showControls - Flag to show or hide controls.
 * @property {(sizes: ComponentSizes) => void} updateComponentSizes - Callback to update component sizes.
 *
 * @ContentChildren('child') children - Query list of child elements.
 *
 * @property {number} parentWidth - The width of the parent container.
 * @property {number} parentHeight - The height of the parent container.
 * @property {boolean} isWideScreen - Flag to determine if the screen is wide.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnDestroy - Lifecycle hook that is called when the component is destroyed.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @method ngAfterViewInit - Lifecycle hook that is called after the component's view has been fully initialized.
 * @method computeDimensions - Computes the dimensions of the main and other components based on the input properties.
 * @method updateDimensions - Updates the dimensions of the parent container and child components.
 * @method get containerStyle - Returns the style object for the container.
 * @method applyChildStyles - Applies the computed styles to the child components.
 */
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
