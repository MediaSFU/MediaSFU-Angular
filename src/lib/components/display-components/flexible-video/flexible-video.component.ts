import { Component, Input, OnChanges, OnInit, SimpleChanges, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMediaComponent } from '../../../@types/types';
export interface FlexibleVideoOptions {
  customWidth: number;
  customHeight: number;
  rows: number;
  columns: number;
  componentsToRender: CustomMediaComponent[];
  showAspect?: boolean;
  backgroundColor?: string;
  Screenboard?: CustomMediaComponent;
  annotateScreenStream?: boolean;
  localStreamScreen: MediaStream | null;
}

export type FlexibleVideoType = (options: FlexibleVideoOptions) => HTMLElement;

/**
 * Component for displaying a flexible video grid.
 *
 * @component
 * @selector app-flexible-video
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * <div>
 *   <!-- Dynamic styles and layout for video grid -->
 *   <div *ngFor="let rowComponents of grid; let rowIndex = index">
 *     <div *ngFor="let component of rowComponents; let colIndex = index">
 *       <ng-container *ngComponentOutlet="component.component; injector: createInjector(component.inputs)"></ng-container>
 *     </div>
 *   </div>
 *   <div *ngIf="Screenboard && Screenboard.component">
 *     <ng-container *ngComponentOutlet="Screenboard.component; injector: createInjector(Screenboard.inputs)"></ng-container>
 *   </div>
 * </div>
 *
 * @class FlexibleVideo
 * @implements OnInit, OnChanges
 *
 * @property {number} customWidth - Custom width for the video grid.
 * @property {number} customHeight - Custom height for the video grid.
 * @property {number} rows - Number of rows in the video grid.
 * @property {number} columns - Number of columns in the video grid.
 * @property {Array<{ component: ComponentType<any>, inputs: any }>} componentsToRender - Components to render in the grid.
 * @property {boolean} showAspect - Flag to show or hide the aspect ratio.
 * @property {string} [backgroundColor='transparent'] - Background color for the video grid.
 * @property {{ component: ComponentType<any>, inputs: any }} [Screenboard] - Screenboard component to overlay on the grid.
 * @property {boolean} [annotateScreenStream=false] - Flag to annotate the screen stream.
 * @property {MediaStream} [localStreamScreen] - Local media stream for the screen.
 *
 * @property {number} key - Key for tracking changes.
 * @property {number} cardWidth - Width of each card in the grid.
 * @property {number} cardHeight - Height of each card in the grid.
 * @property {number} cardTop - Top position of each card in the grid.
 * @property {number} cardLeft - Left position of each card in the grid.
 * @property {number} canvasLeft - Left position of the canvas.
 * @property {any[][]} grid - Grid structure for the components.
 *
 * @constructor
 * @param {Injector} injector - Angular injector for dependency injection.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @method generateGrid - Generates the grid structure based on rows and columns.
 * @method createInjector - Creates an injector for the given inputs.
 * @param {any} inputs - Inputs for the component.
 * @returns {Injector} - The created injector.
 */
@Component({
  selector: 'app-flexible-video',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      style="padding: 0; flex: 1; margin: 0; position: relative; display: {{
        showAspect ? 'flex' : 'none'
      }};
             max-width: {{ customWidth }}px; overflow-x: hidden; overflow-y: auto; left: {{
        cardLeft > 0 ? cardLeft : 0
      }}px;"
    >
      <div
        *ngFor="let rowComponents of grid; let rowIndex = index"
        style="display: flex; flex-direction: row;"
      >
        <div
          *ngFor="let component of rowComponents; let colIndex = index"
          [ngStyle]="{
            flex: 1,
            width: cardWidth + 'px',
            height: cardHeight + 'px',
            backgroundColor: backgroundColor,
            margin: '1px',
            padding: 0,
            borderRadius: '0px',
            left: cardLeft + 'px'
          }"
        >
          <ng-container
            *ngComponentOutlet="component.component; injector: createInjector(component.inputs)"
          ></ng-container>
        </div>
      </div>
      <div
        *ngIf="Screenboard && Screenboard.component"
        [ngStyle]="{
          position: 'absolute',
          top: '0',
          left: canvasLeft + 'px',
          width: cardWidth + 'px',
          height: cardHeight + 'px',
          backgroundColor: 'rgba(0, 0, 0, 0.005)',
          zIndex: '2'
        }"
      >
        <ng-container
          *ngComponentOutlet="Screenboard.component; injector: createInjector(Screenboard.inputs)"
        ></ng-container>
      </div>
    </div>
  `,
})
export class FlexibleVideo implements OnInit, OnChanges {
  @Input() customWidth = 0;
  @Input() customHeight = 0;
  @Input() rows = 0;
  @Input() columns = 0;
  @Input() componentsToRender: CustomMediaComponent[] = [];
  @Input() showAspect = false;
  @Input() backgroundColor?: string = 'transparent';
  @Input() Screenboard?: CustomMediaComponent;
  @Input() annotateScreenStream?: boolean = false;
  @Input() localStreamScreen?: MediaStream;

  key = 0;
  cardWidth = 0;
  cardHeight = 0;
  cardTop = 0;
  cardLeft = 0;
  canvasLeft = 0;
  grid: any[][] = [];

  private injectorCache = new WeakMap<any, Injector>();

  constructor(private injector: Injector) {}

  ngOnInit() {
    if (this.showAspect) {
      this.generateGrid();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['columns'] ||
      changes['rows'] ||
      changes['componentsToRender'] ||
      changes['customWidth'] ||
      changes['customHeight']
    ) {
      if (this.showAspect) {
        this.key++;
        this.generateGrid();
      }
    }

    if (this.annotateScreenStream && this.localStreamScreen) {
      const videoHeight = this.localStreamScreen.getVideoTracks()[0].getSettings().height || 0;
      const videoWidth = this.localStreamScreen.getVideoTracks()[0].getSettings().width || 0;
      this.cardWidth = videoWidth;
      this.cardHeight = videoHeight;
      this.cardTop = Math.floor((this.customHeight - videoHeight) / 2);
      this.cardLeft = Math.floor((this.customWidth - videoWidth) / 2);
      this.canvasLeft = this.cardLeft < 0 ? this.cardLeft : 0;
    } else {
      this.cardWidth = this.customWidth;
      this.cardHeight = this.customHeight;
      this.cardTop = 0;
      this.cardLeft = 0;
      this.canvasLeft = 0;
    }
  }

  generateGrid() {
    this.grid = [];
    for (let row = 0; row < this.rows; row++) {
      const rowComponents = [];
      for (let col = 0; col < this.columns; col++) {
        const index = row * this.columns + col;
        const component = this.componentsToRender[index];
        rowComponents.push(component);
      }
      this.grid.push(rowComponents);
    }
  }

  createInjector(inputs: any) {
    if (!this.injectorCache.has(inputs)) {
      const injector = Injector.create({
        providers: Object.keys(inputs).map((key) => ({ provide: key, useValue: inputs[key] })),
        parent: this.injector,
      });
      this.injectorCache.set(inputs, injector);
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.injectorCache.get(inputs)!;
  }
}
