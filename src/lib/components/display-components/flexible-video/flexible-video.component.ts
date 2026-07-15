import { Component, Input, OnChanges, OnInit, SimpleChanges, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMediaComponent } from '../../../@types/types';
import {
  getContainedContentRect,
  type ContainRect,
} from '../../screenboard-components/screenboard/canvas-coordinates.util';
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
  isDarkMode?: boolean;
  enableGlassmorphism?: boolean;
  cellBorderRadius?: number;
  enableGlow?: boolean;
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
    imports: [CommonModule],
    template: `
    <div *ngIf="showAspect" class="flexible-video" [ngStyle]="getContainerStyle()">
      <div
        *ngFor="let rowComponents of grid; let rowIndex = index"
        class="flexible-video__row"
      >
        <div
          *ngFor="let component of rowComponents; let colIndex = index"
          class="flexible-video__cell"
          [ngStyle]="getCellStyle(component)"
        >
          <ng-container *ngIf="component?.component; else emptyCell">
            <ng-container
              *ngComponentOutlet="component.component; injector: createInjector(component.inputs)"
            ></ng-container>
          </ng-container>
          <ng-template #emptyCell>
            <div class="flexible-video__placeholder">
              <span class="flexible-video__placeholder-core"></span>
            </div>
          </ng-template>
        </div>
      </div>
      <div
        *ngIf="Screenboard && Screenboard.component"
        class="flexible-video__screenboard"
        [ngStyle]="getScreenboardStyle()"
      >
        <ng-container
          *ngComponentOutlet="Screenboard.component; injector: createInjector(Screenboard.inputs)"
        ></ng-container>
      </div>
    </div>
  `,
    styles: [
        `
      .flexible-video {
        padding: 0;
        flex: 1;
        margin: 0;
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .flexible-video__row {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
      }

      .flexible-video__cell {
        position: relative;
      }

      .flexible-video__placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .flexible-video__placeholder-core {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(148, 163, 184, 0.18) 0%, rgba(79, 70, 229, 0.18) 100%);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
      }

      .flexible-video__screenboard {
        position: absolute;
        top: 0;
        z-index: 2;
        overflow: hidden;
      }
    `,
    ]
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
  @Input() isDarkMode = true;
  @Input() enableGlassmorphism = true;
  @Input() cellBorderRadius = 0;
  @Input() enableGlow = false;

  key = 0;
  screenContentRect: ContainRect = { left: 0, top: 0, width: 0, height: 0 };
  grid: any[][] = [];

  private injectorCache = new WeakMap<any, Injector>();

  constructor(private injector: Injector) {}

  ngOnInit() {
    this.updateDimensions();
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
      this.updateDimensions();
      if (this.showAspect) {
        this.key++;
        this.generateGrid();
      }
    }

    if (changes['annotateScreenStream'] || changes['localStreamScreen']) {
      this.updateDimensions();
    }
  }

  updateDimensions() {
    const videoTrack = this.annotateScreenStream
      ? this.localStreamScreen?.getVideoTracks()[0]
      : undefined;
    const settings = videoTrack?.getSettings();

    this.screenContentRect = getContainedContentRect(
      this.customWidth,
      this.customHeight,
      settings?.width || 0,
      settings?.height || 0
    );
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

  getContainerStyle() {
    return {
      width: '100%',
      height: '100%',
      maxWidth: this.customWidth + 'px',
      maxHeight: this.customHeight + 'px',
      left: '0',
    };
  }

  getCellStyle(component?: CustomMediaComponent) {
    const hasContent = !!component?.component;
    const borderRadius = `${Math.max(this.cellBorderRadius, 0)}px`;
    const baseBackground = hasContent
      ? this.backgroundColor || 'transparent'
      : this.enableGlassmorphism
        ? this.isDarkMode
          ? 'rgba(30, 30, 40, 0.6)'
          : 'rgba(255, 255, 255, 0.6)'
        : this.backgroundColor || 'transparent';
    const borderColor = this.enableGlassmorphism
      ? this.isDarkMode
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.1)'
      : 'transparent';

    return {
      flex: 1,
      width: this.customWidth + 'px',
      height: this.customHeight + 'px',
      background: baseBackground,
      margin: '1px',
      padding: '0',
      borderRadius,
      left: '0',
      overflow: 'hidden',
      border: !hasContent && this.enableGlassmorphism ? `1px solid ${borderColor}` : 'none',
      backdropFilter: !hasContent && this.enableGlassmorphism ? 'blur(10px)' : 'none',
      boxShadow: this.enableGlow ? '0 4px 16px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.10)' : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    };
  }

  getScreenboardStyle() {
    return {
      top: this.screenContentRect.top + 'px',
      left: this.screenContentRect.left + 'px',
      width: this.screenContentRect.width + 'px',
      height: this.screenContentRect.height + 'px',
      backgroundColor: 'rgba(0, 0, 0, 0.005)',
      borderRadius: `${Math.max(this.cellBorderRadius, 0)}px`,
      boxShadow: this.enableGlow ? '0 4px 16px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.10)' : 'none',
      border:
        this.enableGlassmorphism
          ? `1px solid ${this.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
          : 'none',
    };
  }

  createInjector(inputs: any) {
    if (!inputs || typeof inputs !== 'object') {
      return this.injector;
    }

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
