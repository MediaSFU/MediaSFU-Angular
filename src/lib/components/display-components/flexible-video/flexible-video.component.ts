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
 * FlexibleVideo component displays a customizable video grid, supporting dynamic layout and optional screenboard overlay.
 *
 * @selector app-flexible-video
 * @standalone true
 * @imports CommonModule
 *
 * @inputs
 * - `customWidth` (number): The custom width for each video grid item in pixels. Default is 0.
 * - `customHeight` (number): The custom height for each video grid item in pixels. Default is 0.
 * - `rows` (number): Number of rows in the video grid. Default is 0.
 * - `columns` (number): Number of columns in the video grid. Default is 0.
 * - `componentsToRender` (CustomMediaComponent[]): Array of components to render in the grid.
 * - `showAspect` (boolean): Flag to control aspect ratio display. Default is false.
 * - `backgroundColor` (string): Background color for the video grid. Default is 'transparent'.
 * - `Screenboard` (CustomMediaComponent): Optional screenboard component to overlay on the grid.
 * - `annotateScreenStream` (boolean): Flag to annotate the screen stream. Default is false.
 * - `localStreamScreen` (MediaStream): Local screen stream for video.
 *
 * @methods
 * - `ngOnInit()`: Initializes and generates the grid on component load if `showAspect` is true.
 * - `ngOnChanges(changes: SimpleChanges)`: Updates grid layout and dimensions if properties change.
 * - `generateGrid()`: Generates grid structure based on rows, columns, and `componentsToRender`.
 * - `createInjector(inputs: any)`: Creates and caches an injector for component inputs.
 *
 * @example
 * ```html
 * <app-flexible-video
 *   [customWidth]="300"
 *   [customHeight]="200"
 *   [rows]="2"
 *   [columns]="3"
 *   [componentsToRender]="[{ component: VideoComponent, inputs: { stream: videoStream } }]"
 *   showAspect="true"
 *   [Screenboard]="{ component: ScreenOverlayComponent, inputs: { overlayData: data } }"
 * ></app-flexible-video>
 * ```
 **/


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
