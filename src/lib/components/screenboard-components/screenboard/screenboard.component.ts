/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  Optional,
  Inject,
} from '@angular/core';
import {
  faChevronRight,
  faChevronLeft,
  faPencilAlt,
  faPaintBrush,
  faShapes,
  faEraser,
  faSearch,
  faSearchPlus,
  faSearchMinus,
  faFont,
  faTextHeight,
  faUndo,
  faRedo,
  faSave,
  faTrash,
  faTimes,
  faMousePointer,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SleepType, ShowAlert } from '../../../@types/types';

export interface ScreenboardParameters {
  updateCanvasScreenboard: (canvas: HTMLCanvasElement) => void;
  annotateScreenStream: boolean;
  updateAnnotateScreenStream: (annotateScreenStream: boolean) => void;
  updateIsScreenboardModalVisible: (isVisible: boolean) => void;
  sleep: SleepType;
  showAlert?: ShowAlert;

  getUpdatedAllParams: () => ScreenboardParameters;
  [key: string]: any;
}

export interface ScreenboardOptions {
  customWidth: number;
  customHeight: number;
  parameters: ScreenboardParameters;
  showAspect: boolean;
}

export type ScreenboardType = (options: ScreenboardOptions) => void;

/**
 * @fileoverview Screenboard component for MediaSFU-Angular application.
 *
 * This component provides a screenboard with drawing, freehand, shape, and erase modes.
 * It supports mouse and touch events for drawing on a canvas.
 *
 * @component
 * @selector app-screenboard
 * @templateUrl ./screenboard.component.html
 * @styleUrls ./screenboard.component.css
 * @imports CommonModule, FontAwesomeModule, FormsModule
 *
 * @class Screenboard
 * @implements OnInit, AfterViewInit, OnDestroy, OnChanges
 *
 * @property {number} customWidth - Custom width for the screenboard.
 * @property {number} customHeight - Custom height for the screenboard.
 * @property {any} parameters - Parameters for the screenboard.
 * @property {boolean} showAspect - Flag to show aspect ratio.
 *
 * @property {ElementRef<HTMLCanvasElement>} canvasRef - Reference to the canvas element.
 * @property {ElementRef<HTMLDivElement>} screenboardRef - Reference to the screenboard div element.
 * @property {ElementRef<HTMLDivElement>} screenboardContentRef - Reference to the screenboard content div element.
 *
 * @property {IconDefinition} faChevronRight - FontAwesome icon for chevron right.
 * @property {IconDefinition} faChevronLeft - FontAwesome icon for chevron left.
 * @property {IconDefinition} faPencilAlt - FontAwesome icon for pencil.
 * @property {IconDefinition} faPaintBrush - FontAwesome icon for paint brush.
 * @property {IconDefinition} faShapes - FontAwesome icon for shapes.
 * @property {IconDefinition} faEraser - FontAwesome icon for eraser.
 * @property {IconDefinition} faSearch - FontAwesome icon for search.
 * @property {IconDefinition} faSearchPlus - FontAwesome icon for search plus.
 * @property {IconDefinition} faSearchMinus - FontAwesome icon for search minus.
 * @property {IconDefinition} faFont - FontAwesome icon for font.
 * @property {IconDefinition} faTextHeight - FontAwesome icon for text height.
 * @property {IconDefinition} faUndo - FontAwesome icon for undo.
 * @property {IconDefinition} faRedo - FontAwesome icon for redo.
 * @property {IconDefinition} faSave - FontAwesome icon for save.
 * @property {IconDefinition} faTrash - FontAwesome icon for trash.
 * @property {IconDefinition} faTimes - FontAwesome icon for times.
 * @property {IconDefinition} faMousePointer - FontAwesome icon for mouse pointer.
 *
 * @property {'draw' | 'freehand' | 'shape' | 'erase'} mode - Current drawing mode.
 * @property {boolean} isDrawing - Flag to indicate if drawing is in progress.
 * @property {number} startX - Starting X coordinate for drawing.
 * @property {number} startY - Starting Y coordinate for drawing.
 * @property {number} currentX - Current X coordinate for drawing.
 * @property {number} currentY - Current Y coordinate for drawing.
 * @property {Array<{ x: number; y: number; color: string; thickness: number }>} freehandDrawing - Array of points for freehand drawing.
 * @property {any[]} shapes - Array of shapes drawn on the canvas.
 * @property {number} eraserThickness - Thickness of the eraser.
 * @property {number} brushThickness - Thickness of the brush.
 * @property {number} lineThickness - Thickness of the line.
 * @property {string} lineType - Type of the line (solid, dashed, dotted, dashDot).
 * @property {string} color - Color for drawing.
 * @property {string} font - Font for text.
 * @property {number} fontSize - Font size for text.
 * @property {string | null} shape - Current shape being drawn.
 * @property {boolean} toolbarVisible - Flag to indicate if the toolbar is visible.
 * @property {string | null} dropdownOpen - ID of the currently open dropdown.
 * @property {HTMLCanvasElement} canvas - Canvas element.
 * @property {CanvasRenderingContext2D} ctx - Canvas rendering context.
 *
 * @constructor
 * @param {number} [injectedCustomWidth] - Injected custom width.
 * @param {number} [injectedCustomHeight] - Injected custom height.
 * @param {any} [injectedParameters] - Injected parameters.
 * @param {boolean} [injectedShowAspect] - Injected show aspect flag.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @method ngAfterViewInit - Lifecycle hook that is called after the component's view has been fully initialized.
 * @method ngOnDestroy - Lifecycle hook that is called just before the component is destroyed.
 *
 * @method addListeners - Adds event listeners to the canvas.
 * @method handleMouseDown - Handles mouse down events.
 * @method handleMouseMove - Handles mouse move events.
 * @method handleMouseUp - Handles mouse up events.
 * @method handleTouchStart - Handles touch start events.
 * @method handleTouchMove - Handles touch move events.
 * @method handleTouchEnd - Handles touch end events.
 * @method handleClickOutside - Handles click events outside the component.
 * @method handleDropdownClick - Handles dropdown click events.
 * @method setDrawMode - Sets the drawing mode.
 * @method setFreehandMode - Sets the freehand mode.
 * @method setShapeMode - Sets the shape mode.
 * @method setEraseMode - Sets the erase mode.
 * @method startDrawing - Starts the drawing process.
 * @method draw - Draws on the canvas.
 * @method stopDrawing - Stops the drawing process.
 * @method drawLine - Draws a line on the canvas.
 * @method drawShapes - Draws all shapes on the canvas.
 * @method drawFreehand - Draws freehand on the canvas.
 * @method drawShape - Draws a shape on the canvas.
 * @method drawPolygon - Draws a polygon on the canvas.
 * @method removeShape - Removes the first shape from the shapes array.
 * @method erase - Erases part of the drawing.
 * @method isPointNearLine - Checks if a point is near a line.
 * @method toggleToolbar - Toggles the visibility of the toolbar.
 * @method toggleAnnotate - Toggles the annotation mode.
 */
@Component({
  selector: 'app-screenboard',
  standalone: true,
  templateUrl: './screenboard.component.html',
  styleUrls: ['./screenboard.component.css'],
  imports: [CommonModule, FontAwesomeModule, FormsModule],
})
export class Screenboard implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() customWidth!: number;
  @Input() customHeight!: number;
  @Input() parameters: ScreenboardParameters = {} as ScreenboardParameters;
  @Input() showAspect!: boolean;

  @ViewChild('canvasRef')
  canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('screenboardRef')
  screenboardRef!: ElementRef<HTMLDivElement>;
  @ViewChild('screenboardContentRef')
  screenboardContentRef!: ElementRef<HTMLDivElement>;

  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faPencilAlt = faPencilAlt;
  faPaintBrush = faPaintBrush;
  faShapes = faShapes;
  faEraser = faEraser;
  faSearch = faSearch;
  faSearchPlus = faSearchPlus;
  faSearchMinus = faSearchMinus;
  faFont = faFont;
  faTextHeight = faTextHeight;
  faUndo = faUndo;
  faRedo = faRedo;
  faSave = faSave;
  faTrash = faTrash;
  faTimes = faTimes;
  faMousePointer = faMousePointer;

  mode: 'draw' | 'freehand' | 'shape' | 'erase' = 'draw';
  isDrawing = false;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
  freehandDrawing: { x: number; y: number; color: string; thickness: number }[] = [];
  shapes: any[] = [];
  eraserThickness = 10;
  brushThickness = 6;
  lineThickness = 6;
  lineType = 'solid';
  color = '#000000';
  font = 'Arial';
  fontSize = 20;
  shape: string | null = null;
  toolbarVisible = false;
  dropdownOpen: string | null = null;
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  constructor(
    @Optional() @Inject('customWidth') injectedCustomWidth: number,
    @Optional() @Inject('customHeight') injectedCustomHeight: number,
    @Optional() @Inject('parameters') injectedParameters: any,
    @Optional() @Inject('showAspect') injectedShowAspect: boolean,
  ) {
    this.customWidth = injectedCustomWidth || this.customWidth || 0;
    this.customHeight = injectedCustomHeight || this.customHeight || 0;
    this.parameters = injectedParameters || this.parameters || {};
    this.showAspect = injectedShowAspect || this.showAspect || false;
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (this.parameters) {
        this.parameters = this.parameters.getUpdatedAllParams();
      }
    }, 100);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showAspect']) {
      if (!this.canvas && this.canvasRef) {
        this.canvas = this.canvasRef!.nativeElement;
        this.addListeners();
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.canvasRef && !this.canvas) {
      this.canvas = this.canvasRef!.nativeElement;
      this.addListeners();
    }
  }

  ngOnDestroy(): void {
    if (this.canvas) {
      this.canvas.removeEventListener('mousedown', this.handleMouseDown.bind(this));
      this.canvas.removeEventListener('mousemove', this.handleMouseMove.bind(this));
      this.canvas.removeEventListener('mouseup', this.handleMouseUp.bind(this));
      this.canvas.removeEventListener('mouseout', this.handleMouseUp.bind(this));

      this.canvas.removeEventListener('touchstart', this.handleTouchStart.bind(this));
      this.canvas.removeEventListener('touchmove', this.handleTouchMove.bind(this));
      this.canvas.removeEventListener('touchend', this.handleTouchEnd.bind(this));

      document.removeEventListener('mousedown', this.handleClickOutside.bind(this));
    }
  }

  addListeners = () => {
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d')!;
      this.parameters.updateCanvasScreenboard(this.canvas);

      this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
      this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
      this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
      this.canvas.addEventListener('mouseout', this.handleMouseUp.bind(this));

      this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
      this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
      this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));

      document.addEventListener('mousedown', this.handleClickOutside.bind(this));
    }
  };

  handleMouseDown(event: MouseEvent) {
    this.startDrawing(event);
  }

  handleMouseMove(event: MouseEvent) {
    this.draw(event);
  }

  handleMouseUp() {
    this.stopDrawing();
  }

  handleTouchStart(e: TouchEvent) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    this.canvas.dispatchEvent(mouseEvent);
  }

  handleTouchMove(e: TouchEvent) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    this.canvas.dispatchEvent(mouseEvent);
  }

  handleTouchEnd(e: TouchEvent) {
    e.preventDefault();
    const mouseEvent = new MouseEvent('mouseup', {});
    this.canvas.dispatchEvent(mouseEvent);
  }

  handleClickOutside(event: MouseEvent) {
    if (this.dropdownOpen && !(event.target as HTMLElement).closest('.btn-group')) {
      this.dropdownOpen = null;
    }
  }

  handleDropdownClick(id: string) {
    this.dropdownOpen = this.dropdownOpen === id ? null : id;
  }

  setDrawMode(thickness: number) {
    this.lineThickness = thickness;
    this.mode = 'draw';
    this.dropdownOpen = null;
  }

  setFreehandMode(thickness: number) {
    this.brushThickness = thickness;
    this.mode = 'freehand';
    this.dropdownOpen = null;
  }

  setShapeMode(shape: string) {
    this.shape = shape;
    this.mode = 'shape';
    this.dropdownOpen = null;
  }

  setEraseMode(thickness: number) {
    this.eraserThickness = thickness;
    this.mode = 'erase';
    this.dropdownOpen = null;
  }

  startDrawing(event: MouseEvent) {
    this.isDrawing = true;
    this.startX = event.offsetX;
    this.startY = event.offsetY;

    if (this.mode === 'erase') {
      this.erase(event.offsetX, event.offsetY);
    } else if (this.mode === 'draw' || this.mode === 'freehand') {
      this.ctx.beginPath();
      this.ctx.moveTo(event.offsetX, event.offsetY);
      if (this.mode === 'freehand') {
        this.freehandDrawing = [
          { x: event.offsetX, y: event.offsetY, color: this.color, thickness: this.brushThickness },
        ];
      }
    }
  }

  draw(event: MouseEvent) {
    if (!this.isDrawing) return;

    this.currentX = event.offsetX;
    this.currentY = event.offsetY;

    if (this.mode === 'erase') {
      this.erase(event.offsetX, event.offsetY);
    } else if (this.mode === 'draw') {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawShapes();
      this.drawLine(this.startX, this.startY, event.offsetX, event.offsetY);
    } else if (this.mode === 'freehand') {
      this.ctx.lineTo(event.offsetX, event.offsetY);
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = this.brushThickness;
      this.ctx.stroke();
      this.freehandDrawing.push({
        x: event.offsetX,
        y: event.offsetY,
        color: this.color,
        thickness: this.brushThickness,
      });
    } else if (this.mode === 'shape') {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawShapes();
      this.drawShape(this.shape!, this.startX, this.startY, event.offsetX, event.offsetY);
    }
  }

  stopDrawing() {
    this.isDrawing = false;

    if (this.mode === 'draw') {
      this.shapes.push({
        type: 'line',
        x1: this.startX,
        y1: this.startY,
        x2: this.currentX,
        y2: this.currentY,
        color: this.color,
        thickness: this.lineThickness,
        lineType: this.lineType,
      });
    } else if (this.mode === 'freehand') {
      this.shapes.push({
        type: 'freehand',
        points: this.freehandDrawing,
        color: this.color,
        thickness: this.brushThickness,
      });
      this.freehandDrawing = [];
    } else if (this.mode === 'shape') {
      this.shapes.push({
        type: this.shape!,
        x1: this.startX,
        y1: this.startY,
        x2: this.currentX,
        y2: this.currentY,
        color: this.color,
        thickness: this.lineThickness,
        lineType: this.lineType,
      });
    }

    setTimeout(() => this.removeShape(), 15000);
  }

  drawLine = (x1: number, y1: number, x2: number, y2: number) => {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.lineThickness;
    if (this.lineType === 'dashed') {
      this.ctx.setLineDash([10, 10]);
    } else if (this.lineType === 'dotted') {
      this.ctx.setLineDash([2, 10]);
    } else if (this.lineType === 'dashDot') {
      this.ctx.setLineDash([10, 5, 2, 5]);
    } else {
      this.ctx.setLineDash([]);
    }
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
  };

  drawShapes = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.shapes.forEach((shape) => {
      if (shape.type === 'line') {
        this.drawLine(shape.x1, shape.y1, shape.x2, shape.y2);
      } else if (shape.type === 'freehand') {
        this.drawFreehand(shape.points);
      } else {
        this.drawShape(shape.type, shape.x1, shape.y1, shape.x2, shape.y2);
      }
    });
  };

  drawFreehand = (points: { x: number; y: number; color: string; thickness: number }[]) => {
    if (points.length < 2) return;
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.brushThickness;
    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i].x, points[i].y);
    }
    this.ctx.stroke();
  };

  drawShape = (type: string, x1: number, y1: number, x2: number, y2: number) => {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.lineThickness;
    if (this.lineType === 'dashed') {
      this.ctx.setLineDash([10, 10]);
    } else if (this.lineType === 'dotted') {
      this.ctx.setLineDash([2, 10]);
    } else if (this.lineType === 'dashDot') {
      this.ctx.setLineDash([10, 5, 2, 5]);
    } else {
      this.ctx.setLineDash([]);
    }
    if (type === 'rectangle') {
      this.ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
    } else if (type === 'circle') {
      const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      this.ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
      this.ctx.stroke();
    } else if (type === 'rhombus') {
      const centerX = (x1 + x2) / 2;
      const centerY = (y1 + y2) / 2;
      this.ctx.moveTo(centerX, y1);
      this.ctx.lineTo(x2, centerY);
      this.ctx.lineTo(centerX, y2);
      this.ctx.lineTo(x1, centerY);
      this.ctx.closePath();
      this.ctx.stroke();
    } else if (type === 'pentagon') {
      this.drawPolygon(5, x1, y1, x2, y2);
    } else if (type === 'hexagon') {
      this.drawPolygon(6, x1, y1, x2, y2);
    } else if (type === 'triangle') {
      const centerXTriangle = (x1 + x2) / 2;
      this.ctx.moveTo(centerXTriangle, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.lineTo(x1, y2);
      this.ctx.closePath();
      this.ctx.stroke();
    } else if (type === 'square') {
      this.ctx.strokeRect(x1, y1, x2 - x1, x2 - x1);
    } else if (type === 'octagon') {
      this.drawPolygon(8, x1, y1, x2, y2);
    } else if (type === 'oval') {
      const radiusX = Math.abs(x2 - x1) / 2;
      const radiusY = Math.abs(y2 - y1) / 2;
      const centerX = (x1 + x2) / 2;
      const centerY = (y1 + y2) / 2;
      this.ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
      this.ctx.stroke();
    } else if (type === 'parallelogram') {
      const centerX = (x1 + x2) / 2;
      this.ctx.moveTo(centerX, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.lineTo(centerX, y2);
      this.ctx.lineTo(x1, y1);
      this.ctx.closePath();
      this.ctx.stroke();
    }
    this.ctx.setLineDash([]);
  };

  drawPolygon = (sides: number, x1: number, y1: number, x2: number, y2: number) => {
    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;
    const radius = Math.min(Math.abs(x2 - x1), Math.abs(y2 - y1)) / 2;
    const angle = (2 * Math.PI) / sides;
    this.ctx.beginPath();
    for (let i = 0; i < sides; i++) {
      const x = centerX + radius * Math.cos(i * angle - Math.PI / 2);
      const y = centerY + radius * Math.sin(i * angle - Math.PI / 2);
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.closePath();
    this.ctx.stroke();
  };

  removeShape = () => {
    this.shapes.shift();
    this.drawShapes();
  };

  erase = (x: number, y: number) => {
    this.ctx.save();
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.eraserThickness / 2, 0, Math.PI * 2, false);
    this.ctx.fill();
    this.ctx.restore();

    this.shapes = this.shapes
      .map((shape) => {
        if (shape.type === 'freehand') {
          return {
            ...shape,
            points: shape.points.filter((point: any) => {
              const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
              return distance > this.eraserThickness / 2;
            }),
          };
        } else if (shape.type === 'line') {
          if (
            this.isPointNearLine(
              x,
              y,
              shape.x1,
              shape.y1,
              shape.x2,
              shape.y2,
              this.eraserThickness / 2,
            )
          ) {
            return null;
          }
        } else if (shape.type === 'text') {
          const textWidth = this.ctx.measureText(shape.text).width;
          if (
            x > shape.x &&
            x < shape.x + textWidth &&
            y > shape.y - shape.fontSize &&
            y < shape.y
          ) {
            return null;
          }
        } else {
          if (x > shape.x1 && x < shape.x2 && y > shape.y1 && y < shape.y2) {
            return null;
          }
        }
        return shape;
      })
      .filter((shape) => shape && (shape.type !== 'freehand' || shape.points.length > 0));
  };

  isPointNearLine(
    px: number,
    py: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    threshold: number,
  ): boolean {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const dot = ((px - x1) * dx + (py - y1) * dy) / (length * length);
    const closestX = x1 + dot * dx;
    const closestY = y1 + dot * dy;
    const distance = Math.sqrt(Math.pow(px - closestX, 2) + Math.pow(py - closestY, 2));
    return distance <= threshold;
  }

  toggleToolbar = () => {
    this.toolbarVisible = !this.toolbarVisible;
  };

  toggleAnnotate = async () => {
    const annotateScreenStream = this.parameters.annotateScreenStream;
    this.parameters.annotateScreenStream = !annotateScreenStream;

    setTimeout(() => {
      this.parameters.updateAnnotateScreenStream(!annotateScreenStream);
    });
    if (this.parameters.annotateScreenStream) {
      this.toolbarVisible = true;
      this.parameters.showAlert?.({
        message: `You can now annotate the screen. If you cannot see your annotation controls (on top), try minimizing your screen by using 'Cmd' + '-' (on Mac) or 'Ctrl' + '-' (on Windows).`,
        type: 'success',
        duration: 9000,
      });
    } else {
      this.toolbarVisible = false;
    }

    this.parameters.updateIsScreenboardModalVisible(true);
    await this.parameters.sleep({ ms: 500 });
    this.parameters.updateIsScreenboardModalVisible(false);
  };
}
