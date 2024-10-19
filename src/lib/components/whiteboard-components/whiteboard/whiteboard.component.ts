/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * Whiteboard component for drawing and manipulating shapes, text, and images on a canvas.
 *
 * @component
 * @selector app-whiteboard
 * @templateUrl ./whiteboard.component.html
 * @styleUrls ./whiteboard.component.css
 * @encapsulation ViewEncapsulation.None
 * @imports [CommonModule, FormsModule, FontAwesomeModule]
 *
 * @class Whiteboard
 * @implements OnInit, OnDestroy, OnChanges
 *
 * @property {number} customWidth - Custom width for the whiteboard.
 * @property {number} customHeight - Custom height for the whiteboard.
 * @property {WhiteboardParameters} parameters - Parameters for the whiteboard.
 * @property {boolean} showAspect - Flag to show aspect ratio.
 *
 * @property {ElementRef<HTMLCanvasElement>} canvasRef - Reference to the canvas element.
 * @property {ElementRef<HTMLTextAreaElement>} textInputRef - Reference to the text input element.
 * @property {ElementRef<HTMLButtonElement>} toggleBackgroundRef - Reference to the toggle background button element.
 * @property {ElementRef<HTMLAnchorElement>} downloadLinkRef - Reference to the download link element.
 * @property {ElementRef<HTMLCanvasElement>} tempCanvasRef - Reference to the temporary canvas element.
 *
 * @property {IconDefinition} faTimes - FontAwesome icon for times.
 * @property {IconDefinition} faUndo - FontAwesome icon for undo.
 * @property {IconDefinition} faRedo - FontAwesome icon for redo.
 * @property {IconDefinition} faEraser - FontAwesome icon for eraser.
 * @property {IconDefinition} faShapes - FontAwesome icon for shapes.
 * @property {IconDefinition} faMousePointer - FontAwesome icon for mouse pointer.
 * @property {IconDefinition} faHandPaper - FontAwesome icon for hand paper.
 * @property {IconDefinition} faTextHeight - FontAwesome icon for text height.
 * @property {IconDefinition} faFont - FontAwesome icon for font.
 * @property {IconDefinition} faPencilAlt - FontAwesome icon for pencil alt.
 * @property {IconDefinition} faPaintBrush - FontAwesome icon for paint brush.
 * @property {IconDefinition} faTrash - FontAwesome icon for trash.
 * @property {IconDefinition} faSave - FontAwesome icon for save.
 * @property {IconDefinition} faSearch - FontAwesome icon for search.
 * @property {IconDefinition} faSearchMinus - FontAwesome icon for search minus.
 * @property {IconDefinition} faSearchPlus - FontAwesome icon for search plus.
 * @property {IconDefinition} faChevronLeft - FontAwesome icon for chevron left.
 * @property {IconDefinition} faUpload - FontAwesome icon for upload.
 * @property {IconDefinition} faChevronRight - FontAwesome icon for chevron right.
 *
 * @property {string} mode - Current mode of the whiteboard (e.g., 'pan', 'draw', 'erase').
 * @property {boolean} isDrawing - Flag indicating if drawing is in progress.
 * @property {boolean} isPanning - Flag indicating if panning is in progress.
 * @property {boolean} isDragging - Flag indicating if dragging is in progress.
 * @property {number} startX - Starting X coordinate for drawing.
 * @property {number} startY - Starting Y coordinate for drawing.
 * @property {number} currentX - Current X coordinate for drawing.
 * @property {number} currentY - Current Y coordinate for drawing.
 * @property {any[]} freehandDrawing - Array of points for freehand drawing.
 * @property {any} selectedShape - Currently selected shape.
 * @property {any} selectedHandle - Currently selected handle for resizing shapes.
 * @property {boolean} movingShape - Flag indicating if a shape is being moved.
 * @property {number} panX - X coordinate for panning.
 * @property {number} panY - Y coordinate for panning.
 * @property {number} scale - Current scale of the canvas.
 * @property {number} minScale - Minimum scale of the canvas.
 * @property {number} maxScale - Maximum scale of the canvas.
 * @property {number} eraserThickness - Thickness of the eraser.
 * @property {number} brushThickness - Thickness of the brush.
 * @property {number} lineThickness - Thickness of the line.
 * @property {string} lineType - Type of the line (e.g., 'solid', 'dashed').
 * @property {string} color - Current color for drawing.
 * @property {string} font - Current font for text.
 * @property {number} fontSize - Current font size for text.
 * @property {any} shape - Current shape being drawn.
 * @property {HTMLImageElement} backgroundImage - Background image for the canvas.
 * @property {boolean} toolbarVisible - Flag indicating if the toolbar is visible.
 * @property {string | null} dropdownOpen - Currently open dropdown menu.
 * @property {{ clientX: number, clientY: number, offsetX: number, offsetY: number } | null} currentClickPosition - Current click position on the canvas.
 * @property {number} maxWidth - Maximum width of the canvas.
 * @property {number} maxHeight - Maximum height of the canvas.
 * @property {boolean} dimensionsFixed - Flag indicating if the canvas dimensions are fixed.
 *
 * @method updateLineThickness - Updates the thickness of the line.
 * @param {number} thickness - New thickness for the line.
 *
 * @method updateBrushThickness - Updates the thickness of the brush.
 * @param {number} thickness - New thickness for the brush.
 *
 * @method updateEraserThickness - Updates the thickness of the eraser.
 * @param {number} thickness - New thickness for the eraser.
 *
 * @method updateColor - Updates the color for drawing.
 * @param {string} color - New color for drawing.
 *
 * @method updateFont - Updates the font for text.
 * @param {string} font - New font for text.
 *
 * @method updateFontSize - Updates the font size for text.
 * @param {number} fontSize - New font size for text.
 *
 * @method updateShape - Updates the shape being drawn.
 * @param {string} shape - New shape to be drawn.
 *
 * @constructor
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 *
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property of a directive changes.
 * @param {SimpleChanges} changes - Object of changes.
 *
 * @method ngOnDestroy - Lifecycle hook that is called when a directive, pipe, or service is destroyed.
 *
 * @method ngAfterViewInit - Lifecycle hook that is called after a component's view has been fully initialized.
 *
 * @method handleTextInput - Handles the text input event.
 * @param {KeyboardEvent} event - Keyboard event.
 *
 * @method addListeners - Adds event listeners to the canvas and document.
 *
 * @method handleTouchStart - Handles the touch start event.
 * @param {TouchEvent} e - Touch event.
 *
 * @method handleTouchMove - Handles the touch move event.
 * @param {TouchEvent} e - Touch event.
 *
 * @method handleTouchEnd - Handles the touch end event.
 * @param {TouchEvent} e - Touch event.
 *
 * @method handleClickOutside - Handles the click outside event.
 * @param {MouseEvent} event - Mouse event.
 *
 * @method handleCanvasClick - Handles the canvas click event.
 * @param {MouseEvent} e - Mouse event.
 *
 * @method startDrawing - Starts the drawing process.
 * @param {MouseEvent} e - Mouse event.
 *
 * @method draw - Draws on the canvas.
 * @param {MouseEvent} e - Mouse event.
 *
 * @method stopDrawing - Stops the drawing process.
 * @param {MouseEvent} e - Mouse event.
 *
 * @method erase - Erases a part of the canvas.
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 *
 * @method isPointNearLine - Checks if a point is near a line.
 * @param {number} px - X coordinate of the point.
 * @param {number} py - Y coordinate of the point.
 * @param {number} x1 - X coordinate of the line start.
 * @param {number} y1 - Y coordinate of the line start.
 * @param {number} x2 - X coordinate of the line end.
 * @param {number} y2 - Y coordinate of the line end.
 * @param {number} threshold - Distance threshold.
 * @returns {boolean} - True if the point is near the line, false otherwise.
 *
 * @method zoomCanvas - Zooms the canvas.
 * @param {number} scaleFactor - Scale factor for zooming.
 * @param {MouseEvent} [event] - Mouse event.
 *
 * @method handleZoom - Handles the zoom event.
 * @param {WheelEvent} e - Wheel event.
 *
 * @method drawEdgeMarkers - Draws edge markers on the canvas.
 *
 * @method drawShapes - Draws all shapes on the canvas.
 *
 * @method drawLine - Draws a line on the canvas.
 * @param {number} x1 - X coordinate of the line start.
 * @param {number} y1 - Y coordinate of the line start.
 * @param {number} x2 - X coordinate of the line end.
 * @param {number} y2 - Y coordinate of the line end.
 * @param {string} color - Color of the line.
 * @param {number} thickness - Thickness of the line.
 * @param {string} lineType - Type of the line (e.g., 'solid', 'dashed').
 *
 * @method drawText - Draws text on the canvas.
 * @param {string} text - Text to be drawn.
 * @param {number} x - X coordinate of the text.
 * @param {number} y - Y coordinate of the text.
 * @param {string} color - Color of the text.
 * @param {string} font - Font of the text.
 *
 * @method drawFreehand - Draws freehand lines on the canvas.
 * @param {{ x: number, y: number }[]} points - Array of points for freehand drawing.
 * @param {string} color - Color of the freehand drawing.
 * @param {number} thickness - Thickness of the freehand drawing.
 *
 * @method drawShape - Draws a shape on the canvas.
 * @param {string} type - Type of the shape.
 * @param {number} x1 - X coordinate of the shape start.
 * @param {number} y1 - Y coordinate of the shape start.
 * @param {number} x2 - X coordinate of the shape end.
 * @param {number} y2 - Y coordinate of the shape end.
 * @param {string} color - Color of the shape.
 * @param {number} thickness - Thickness of the shape.
 * @param {string} lineType - Type of the line (e.g., 'solid', 'dashed').
 * @param {CanvasRenderingContext2D} [ctx] - Canvas rendering context.
 *
 * @method drawPolygon - Draws a polygon on the canvas.
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
 * @param {number} sides - Number of sides of the polygon.
 * @param {number} x1 - X coordinate of the polygon start.
 * @param {number} y1 - Y coordinate of the polygon start.
 * @param {number} x2 - X coordinate of the polygon end.
 * @param {number} y2 - Y coordinate of the polygon end.
 */
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTimes,
  faUndo,
  faRedo,
  faEraser,
  faShapes,
  faMousePointer,
  faHandPaper,
  faTextHeight,
  faFont,
  faPencilAlt,
  faPaintBrush,
  faTrash,
  faSave,
  faSearch,
  faSearchMinus,
  faSearchPlus,
  faChevronLeft,
  faUpload,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Socket } from 'socket.io-client';
import {
  OnScreenChangesParameters,
  OnScreenChangesType,
} from '../../../consumers/on-screen-changes.service';
import {
  CaptureCanvasStreamParameters,
  ShowAlert,
  WhiteboardUser,
  Participant,
  CaptureCanvasStreamType,
} from '../../../@types/types';

export interface Shape {
  type: string;
  x?: number;
  y?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  text?: string;
  color?: string;
  font?: string;
  fontSize?: number;
  thickness?: number;
  lineType?: string;
  points?: Array<{ x: number; y: number }>;
  img?: HTMLImageElement;
  src?: string;
}

export interface WhiteboardParameters
  extends OnScreenChangesParameters,
    CaptureCanvasStreamParameters {
  socket: Socket;
  showAlert?: ShowAlert;
  islevel: string;
  roomName: string;
  shapes: Shape[];
  useImageBackground: boolean;
  redoStack: Shape[];
  undoStack: string[];
  whiteboardStarted: boolean;
  whiteboardEnded: boolean;
  whiteboardUsers: WhiteboardUser[];
  participants: Participant[];
  participantsAll: Participant[];
  screenId: string;
  recordStarted: boolean;
  recordStopped: boolean;
  recordPaused: boolean;
  recordResumed: boolean;
  recordingMediaOptions: string;
  member: string;
  shareScreenStarted: boolean;
  canvasWhiteboard: HTMLCanvasElement | null;
  targetResolution?: string;
  targetResolutionHost?: string;

  updateShapes: (shapes: Shape[]) => void;
  updateUseImageBackground: (useImageBackground: boolean) => void;
  updateRedoStack: (redoStack: Shape[]) => void;
  updateUndoStack: (undoStack: string[]) => void;
  updateWhiteboardStarted: (whiteboardStarted: boolean) => void;
  updateWhiteboardEnded: (whiteboardEnded: boolean) => void;
  updateWhiteboardUsers: (whiteboardUsers: WhiteboardUser[]) => void;
  updateParticipants: (participants: Participant[]) => void;
  updateScreenId: (screenId: string) => void;
  updateShareScreenStarted: (shareScreenStarted: boolean) => void;
  updateCanvasWhiteboard: (canvasWhiteboard: HTMLCanvasElement | null) => void;

  // mediasfu functions
  onScreenChanges: OnScreenChangesType;
  captureCanvasStream: CaptureCanvasStreamType;

  getUpdatedAllParams: () => WhiteboardParameters;
  [key: string]: any;
}

export interface WhiteboardOptions {
  customWidth: number;
  customHeight: number;
  parameters: WhiteboardParameters;
  showAspect: boolean;
}

export type WhiteboardType = (options: WhiteboardOptions) => void;

@Component({
  selector: 'app-whiteboard',
  standalone: true,
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
})
export class Whiteboard implements OnInit, OnDestroy, OnChanges {
  @Input() customWidth!: number;
  @Input() customHeight!: number;
  @Input() parameters: WhiteboardParameters = {} as WhiteboardParameters;
  @Input() showAspect!: boolean;

  @ViewChild('canvasRef', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('textInputRef', { static: false }) textInputRef!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('toggleBackgroundRef', { static: false })
  toggleBackgroundRef!: ElementRef<HTMLButtonElement>;
  @ViewChild('downloadLinkRef', { static: false }) downloadLinkRef!: ElementRef<HTMLAnchorElement>;
  @ViewChild('tempCanvasRef', { static: false }) tempCanvasRef!: ElementRef<HTMLCanvasElement>;

  faTimes = faTimes;
  faUndo = faUndo;
  faRedo = faRedo;
  faEraser = faEraser;
  faShapes = faShapes;
  faMousePointer = faMousePointer;
  faHandPaper = faHandPaper;
  faTextHeight = faTextHeight;
  faFont = faFont;
  faPencilAlt = faPencilAlt;
  faPaintBrush = faPaintBrush;
  faTrash = faTrash;
  faSave = faSave;
  faSearch = faSearch;
  faSearchMinus = faSearchMinus;
  faSearchPlus = faSearchPlus;
  faChevronLeft = faChevronLeft;
  faUpload = faUpload;
  faChevronRight = faChevronRight;

  private mode = 'pan';
  private isDrawing = false;
  private isPanning = false;
  private isDragging = false;
  private startX = 0;
  private startY = 0;
  private currentX = 0;
  private currentY = 0;
  private freehandDrawing: any[] = [];
  private selectedShape: any = null;
  private selectedHandle: any = null;
  private movingShape = false;
  private panX = 0;
  private panY = 0;
  private scale = 1;
  private minScale = 0.25;
  private maxScale = 1.75;
  private eraserThickness = 10;
  private brushThickness = 6;
  private lineThickness = 6;
  lineType = 'solid';
  color = '#000000';
  private font = 'Arial';
  private fontSize = 20;
  private shape: any = null;
  private backgroundImage = new Image();
  toolbarVisible = true;
  dropdownOpen: string | null = null;
  private currentClickPosition: {
    clientX: number;
    clientY: number;
    offsetX: number;
    offsetY: number;
  } | null = null;

  private maxWidth = 1280;
  private maxHeight = 720;
  private dimensionsFixed = false;
  private isValidShape = false;

  updateLineThickness = (thickness: number) => {
    this.lineThickness = thickness;
  };

  updateBrushThickness = (thickness: number) => {
    this.brushThickness = thickness;
  };

  updateEraserThickness = (thickness: number) => {
    this.eraserThickness = thickness;
  };

  updateColor = (color: string) => {
    this.color = color;
  };

  updateFont = (font: string) => {
    this.font = font;
  };

  updateFontSize = (fontSize: number) => {
    this.fontSize = fontSize;
  };

  updateShape = (shape: string) => {
    this.shape = shape;
  };

  ngOnInit(): void {
    if (this.showAspect) {
      this.addListeners();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['parameters'] && changes['parameters'].currentValue) {
      this.parameters = changes['parameters'].currentValue;

      if (this.parameters.socket) {
        this.parameters.socket.on('whiteboardUpdated', async (data: any) => {
          this.WhiteboardUpdated(data);
        });

        this.parameters.socket.on('whiteboardAction', (data: any) => {
          this.WhiteboardAction(data);
        });
      }
    }

    if (changes['showAspect']) {
      if (changes['showAspect'].currentValue) {
        this.addListeners();
      }
    }
  }

  ngOnDestroy(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.removeEventListener('mousedown', this.startDrawing.bind(this));
    canvas.removeEventListener('mousemove', this.draw.bind(this));
    canvas.removeEventListener('mouseup', this.stopDrawing.bind(this));
    canvas.removeEventListener('wheel', this.handleZoom.bind(this));
    canvas.removeEventListener('click', this.handleCanvasClick.bind(this));

    // touch events
    canvas.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    canvas.removeEventListener('touchmove', this.handleTouchMove.bind(this));
    canvas.removeEventListener('touchend', this.handleTouchEnd.bind(this));

    document.removeEventListener('mousedown', this.handleClickOutside.bind(this));
  }

  ngAfterViewInit() {
    // Attach the event listener once after the view has been initialized
    const textInput = this.textInputRef.nativeElement;
    textInput.addEventListener('keypress', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        this.handleTextInput(event);
      }
    });
  }

  handleTextInput(event: KeyboardEvent) {
    const textInput = this.textInputRef.nativeElement;
    if (event.key === 'Enter' && this.currentClickPosition) {
      const { offsetX, offsetY } = this.currentClickPosition;
      const text = textInput.value;
      textInput.style.display = 'none';
      textInput.value = '';

      const x = (offsetX - this.panX) / this.scale;
      const y = (offsetY - this.panY) / this.scale;

      this.parameters.shapes.push({
        type: 'text',
        text,
        x,
        y,
        color: this.color,
        font: this.font,
        fontSize: this.fontSize,
      });

      this.drawShapes();
      this.parameters.updateShapes(this.parameters.shapes);
      this.parameters.socket.emit(
        'updateBoardAction',
        {
          action: 'text',
          payload: {
            type: 'text',
            text,
            x,
            y,
            color: this.color,
            font: this.font,
            fontSize: this.fontSize,
          },
        },
        this.handleServerResponse,
      );
    }
  }

  addListeners = () => {
    if (this.parameters) {
      this.parameters = this.parameters.getUpdatedAllParams();
    }

    this.backgroundImage.src = 'https://mediasfu.com/images/svg/graph_paper.jpg';
    this.backgroundImage.crossOrigin = 'anonymous';
    this.backgroundImage.onload = () => {
      this.drawShapes();
    };

    const canvas = this.canvasRef.nativeElement;

    if (this.canvasRef.nativeElement) {
      try {
        if (
          this.parameters.targetResolution == 'qhd' ||
          this.parameters.targetResolutionHost == 'qhd'
        ) {
          this.maxWidth = 1920;
          this.maxHeight = 1080;
        } else if (
          this.parameters.targetResolution == 'fhd' ||
          this.parameters.targetResolutionHost == 'fhd'
        ) {
          this.maxWidth = 1920;
          this.maxHeight = 1080;
        }
        canvas.width = this.maxWidth;
        canvas.height = this.maxHeight;
        this.dimensionsFixed = true;
      } catch {
        /* handle error */
      }
      this.parameters.updateCanvasWhiteboard(this.canvasRef.nativeElement);
    }

    canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    canvas.addEventListener('mousemove', this.draw.bind(this));
    canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
    canvas.addEventListener('wheel', this.handleZoom.bind(this));
    canvas.addEventListener('click', this.handleCanvasClick.bind(this));

    // touch events
    canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
    canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
    canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));

    document.addEventListener('mousedown', this.handleClickOutside.bind(this));
  };

  handleTouchStart(e: TouchEvent) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    this.canvasRef.nativeElement.dispatchEvent(mouseEvent);
  }

  handleTouchMove(e: TouchEvent) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    this.canvasRef.nativeElement.dispatchEvent(mouseEvent);
  }

  handleTouchEnd(e: TouchEvent) {
    e.preventDefault();
    const mouseEvent = new MouseEvent('mouseup', {});
    this.canvasRef.nativeElement.dispatchEvent(mouseEvent);
  }

  handleClickOutside(event: MouseEvent) {
    const target = event.target as Element;
    if (this.dropdownOpen && !target.closest('.btn-group')) {
      this.dropdownOpen = null;
    }
  }

  handleCanvasClick(e: MouseEvent) {
    if (this.mode === 'text') {
      const textInput = this.textInputRef.nativeElement;
      textInput.style.left = e.clientX + 'px';
      textInput.style.top = e.clientY + 'px';
      textInput.style.display = 'block';
      textInput.focus();
      this.currentClickPosition = {
        clientX: e.clientX,
        clientY: e.clientY,
        offsetX: e.offsetX,
        offsetY: e.offsetY,
      };
    }
  }

  startDrawing(e: MouseEvent) {
    this.isDrawing = true;
    this.startX = (e.offsetX - this.panX) / this.scale;
    this.startY = (e.offsetY - this.panY) / this.scale;

    if (this.mode === 'erase') {
      this.erase(this.startX, this.startY);
    } else if (this.mode === 'draw' || this.mode === 'freehand') {
      const ctx = this.canvasRef.nativeElement.getContext('2d');
      ctx!.beginPath();
      ctx!.moveTo(this.startX, this.startY);
      if (this.mode === 'freehand') {
        this.freehandDrawing = [{ x: this.startX, y: this.startY }];
      }
    } else if (this.mode === 'pan') {
      this.isPanning = true;
      this.isDragging = false;
    } else if (this.mode === 'select') {
      this.selectedHandle = this.getHandleAtPosition(this.startX, this.startY);
      if (this.selectedHandle) {
        this.isDragging = true;
        this.movingShape = this.selectedHandle.isCenter;
      } else {
        this.selectedShape = this.findShape(this.startX, this.startY);
        if (this.selectedShape) {
          this.drawShapes();
          this.drawSelection(this.selectedShape);
        }
      }
    }
  }

  draw = (e: MouseEvent) => {
    if (!this.dimensionsFixed) {
      try {
        if (
          this.parameters.targetResolution == 'qhd' ||
          this.parameters.targetResolutionHost == 'qhd'
        ) {
          this.maxWidth = 1920;
          this.maxHeight = 1080;
        } else if (
          this.parameters.targetResolution == 'fhd' ||
          this.parameters.targetResolutionHost == 'fhd'
        ) {
          this.maxWidth = 1920;
          this.maxHeight = 1080;
        }
        this.canvasRef.nativeElement.width = this.maxWidth;
        this.canvasRef.nativeElement.height = this.maxHeight;
        this.dimensionsFixed = true;
        this.parameters.updateCanvasWhiteboard(this.canvasRef.nativeElement);
      } catch {
        /* handle error */
      }
    }
    if (!this.isDrawing) return;
    this.currentX = (e.offsetX - this.panX) / this.scale;
    this.currentY = (e.offsetY - this.panY) / this.scale;

    if (this.mode == 'draw' || this.mode == 'freehand' || this.mode == 'shape') {
      //if more than max width or height or less than 0, return
      if (
        this.currentX > this.maxWidth ||
        this.currentY > this.maxHeight ||
        this.currentX < 0 ||
        this.currentY < 0
      ) {
        this.isValidShape = false;
        return;
      } else {
        this.isValidShape = true;
      }
    }

    const ctx = this.canvasRef.nativeElement.getContext('2d');
    if (this.mode === 'erase') {
      this.erase(this.currentX, this.currentY);
    } else if (this.mode === 'draw') {
      ctx!.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
      this.drawShapes();
      this.drawLine(
        this.startX,
        this.startY,
        this.currentX,
        this.currentY,
        this.color,
        this.lineThickness,
        this.lineType,
      );
    } else if (this.mode === 'freehand') {
      ctx!.lineTo(this.currentX, this.currentY);
      ctx!.strokeStyle = this.color;
      ctx!.lineWidth = this.brushThickness;
      ctx!.stroke();
      this.freehandDrawing.push({ x: this.currentX, y: this.currentY });
    } else if (this.mode === 'shape') {
      ctx!.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
      this.drawShapes();
      this.drawShape(
        this.shape,
        this.startX,
        this.startY,
        this.currentX,
        this.currentY,
        this.color,
        this.lineThickness,
        this.lineType,
      );
    } else if (this.mode === 'pan' && this.isPanning) {
      this.isDragging = true;
      const dx = e.clientX - this.startX;
      const dy = e.clientY - this.startY;
      this.panX += dx;
      this.panY += dy;
      this.startX = e.clientX;
      this.startY = e.clientY;

      ctx!.setTransform(this.scale, 0, 0, this.scale, this.panX, this.panY);
      this.drawShapes();
    } else if (this.mode === 'select' && this.selectedShape) {
      ctx!.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
      if (this.movingShape) {
        const dx = this.currentX - this.startX;
        const dy = this.currentY - this.startY;
        this.moveShape(this.selectedShape, dx, dy);
        this.startX = this.currentX;
        this.startY = this.currentY;
      } else if (this.isDragging) {
        this.resizeShape(this.selectedShape, this.selectedHandle, this.currentX, this.currentY);
      }
      this.drawShapes();
      this.drawSelection(this.selectedShape);
    }
  };

  stopDrawing() {
    this.isDrawing = false;
    this.isPanning = false;
    this.isDragging = false;

    const ctx = this.canvasRef.nativeElement.getContext('2d');
    ctx!.closePath();

    if (this.mode === 'draw' && this.isValidShape) {
      this.parameters.shapes.push({
        type: 'line',
        x1: this.startX,
        y1: this.startY,
        x2: this.currentX,
        y2: this.currentY,
        color: this.color,
        thickness: this.lineThickness,
        lineType: this.lineType,
      });
      this.parameters.updateShapes(this.parameters.shapes);
      this.saveState();
      this.parameters.socket.emit(
        'updateBoardAction',
        {
          action: 'draw',
          payload: {
            type: 'line',
            x1: this.startX,
            y1: this.startY,
            x2: this.currentX,
            y2: this.currentY,
            color: this.color,
            thickness: this.lineThickness,
            lineType: this.lineType,
          },
        },
        this.handleServerResponse,
      );
    } else if (this.mode === 'freehand' && this.isValidShape) {
      this.parameters.shapes.push({
        type: 'freehand',
        points: this.freehandDrawing,
        color: this.color,
        thickness: this.brushThickness,
      });
      this.parameters.updateShapes(this.parameters.shapes);
      this.parameters.socket.emit(
        'updateBoardAction',
        {
          action: 'draw',
          payload: {
            type: 'freehand',
            points: this.freehandDrawing,
            color: this.color,
            thickness: this.brushThickness,
          },
        },
        this.handleServerResponse,
      );
      this.freehandDrawing = [];
      this.saveState();
    } else if (this.mode === 'shape' && this.isValidShape) {
      this.parameters.shapes.push({
        type: this.shape,
        x1: this.startX,
        y1: this.startY,
        x2: this.currentX,
        y2: this.currentY,
        color: this.color,
        thickness: this.lineThickness,
        lineType: this.lineType,
      });
      this.parameters.updateShapes(this.parameters.shapes);
      this.saveState();
      this.parameters.socket.emit(
        'updateBoardAction',
        {
          action: 'shape',
          payload: {
            type: this.shape,
            x1: this.startX,
            y1: this.startY,
            x2: this.currentX,
            y2: this.currentY,
            color: this.color,
            thickness: this.lineThickness,
            lineType: this.lineType,
          },
        },
        this.handleServerResponse,
      );
    } else if (this.mode === 'select') {
      if (this.selectedShape && !this.movingShape && !this.isDragging) {
        const shapeFound = this.findShape(this.currentX, this.currentY);
        if (shapeFound) {
          this.selectedShape = shapeFound;
          this.drawShapes();
          this.drawSelection(shapeFound);
        }
      }
      if (this.selectedShape) {
        this.parameters.socket.emit(
          'updateBoardAction',
          { action: 'shapes', payload: { shapes: this.parameters.shapes } },
          this.handleServerResponse,
        );
      }
      this.saveState();
    }
  }

  erase(x: number, y: number) {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    ctx!.save();
    ctx!.globalCompositeOperation = 'destination-out';
    ctx!.beginPath();
    ctx!.arc(x, y, this.eraserThickness / 2, 0, Math.PI * 2, false);
    ctx!.fill();
    ctx!.restore();

    let changeOccurred = false;
    this.parameters.shapes = this.parameters.shapes
      .map((shape: any) => {
        if (shape.type === 'freehand') {
          return {
            ...shape,
            points: shape.points.filter((point: any) => {
              const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
              if (distance <= this.eraserThickness / 2) {
                changeOccurred = true;
                return false;
              }
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
            changeOccurred = true;
            return null;
          }
        } else if (shape.type === 'text') {
          const textWidth = ctx!.measureText(shape.text).width;
          if (
            x > shape.x &&
            x < shape.x + textWidth &&
            y > shape.y - shape.fontSize &&
            y < shape.y
          ) {
            changeOccurred = true;
            return null;
          }
        } else if (shape.type === 'image') {
          if (x > shape.x1 && x < shape.x2 && y > shape.y1 && y < shape.y2) {
            changeOccurred = true;
            return null;
          }
        } else {
          if (x > shape.x1 && x < shape.x2 && y > shape.y1 && y < shape.y2) {
            changeOccurred = true;
            return null;
          }
        }
        return shape;
      })
      .filter((shape: any) => shape && (shape.type !== 'freehand' || shape.points.length > 0));
    this.parameters.updateShapes(this.parameters.shapes);

    this.drawShapes();
    if (changeOccurred) {
      this.parameters.socket.emit(
        'updateBoardAction',
        { action: 'shapes', payload: { shapes: this.parameters.shapes } },
        this.handleServerResponse,
      );
    }
  }

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

  zoomCanvas(
    scaleFactor: number,
    event: MouseEvent = {
      clientX: this.canvasRef.nativeElement.width / 2,
      clientY: this.canvasRef.nativeElement.height / 2,
    } as MouseEvent,
  ) {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (scaleFactor === 10) {
      this.scale = 1;
      this.panX = 0;
      this.panY = 0;
    } else {
      let newScale = this.scale * scaleFactor;
      if (newScale < this.minScale) {
        newScale = this.minScale;
      } else if (newScale > this.maxScale) {
        newScale = this.maxScale;
      }

      const rect = canvas.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width;
      const offsetY = (event.clientY - rect.top) / rect.height;

      const dx = offsetX * canvas.width * (1 - scaleFactor);
      const dy = offsetY * canvas.height * (1 - scaleFactor);

      this.scale = newScale;
      this.panX = this.panX * scaleFactor + dx;
      this.panY = this.panY * scaleFactor + dy;

      const maxPanX = (canvas.width * (this.scale - 1)) / this.scale;
      const maxPanY = (canvas.height * (this.scale - 1)) / this.scale;
      this.panX = Math.min(Math.max(this.panX, -maxPanX), 0);
      this.panY = Math.min(Math.max(this.panY, -maxPanY), 0);
    }

    ctx!.setTransform(this.scale, 0, 0, this.scale, this.panX, this.panY);
    this.drawShapes();
  }

  handleZoom(e: WheelEvent) {
    e.preventDefault();
    if (e.deltaY < 0) {
      this.zoomCanvas(1.2, e as any);
    } else {
      this.zoomCanvas(0.8, e as any);
    }
  }

  drawEdgeMarkers() {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    ctx!.save();
    ctx!.setTransform(1, 0, 0, 1, 0, 0);
    ctx!.strokeStyle = 'red';
    ctx!.lineWidth = 5;
    ctx!.setLineDash([]); // reset line dash

    const markerLength = 20;
    const topLeftX = this.panX;
    const topLeftY = this.panY;
    const bottomRightX = this.panX + 1280 * this.scale;
    const bottomRightY = this.panY + 720 * this.scale;

    ctx!.beginPath();
    ctx!.moveTo(topLeftX, topLeftY + markerLength);
    ctx!.lineTo(topLeftX, topLeftY);
    ctx!.lineTo(topLeftX + markerLength, topLeftY);
    ctx!.stroke();

    ctx!.beginPath();
    ctx!.moveTo(bottomRightX - markerLength, topLeftY);
    ctx!.lineTo(bottomRightX, topLeftY);
    ctx!.lineTo(bottomRightX, topLeftY + markerLength);
    ctx!.stroke();

    ctx!.beginPath();
    ctx!.moveTo(bottomRightX, bottomRightY - markerLength);
    ctx!.lineTo(bottomRightX, bottomRightY);
    ctx!.lineTo(bottomRightX - markerLength, bottomRightY);
    ctx!.stroke();

    ctx!.beginPath();
    ctx!.moveTo(topLeftX + markerLength, bottomRightY);
    ctx!.lineTo(topLeftX, bottomRightY);
    ctx!.lineTo(topLeftX, bottomRightY - markerLength);
    ctx!.stroke();

    ctx!.restore();
  }

  drawShapes() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    ctx!.save();
    ctx!.setTransform(this.scale, 0, 0, this.scale, this.panX, this.panY);
    if (this.parameters.useImageBackground) {
      ctx!.drawImage(
        this.backgroundImage,
        -this.panX / this.scale,
        -this.panY / this.scale,
        canvas.width / this.scale,
        canvas.height / this.scale,
      );
    } else {
      ctx!.fillStyle = '#fff';
      ctx!.fillRect(
        -this.panX / this.scale,
        -this.panY / this.scale,
        canvas.width / this.scale,
        canvas.height / this.scale,
      );
    }
    this.parameters.shapes.forEach((shape: any) => {
      if (shape.type === 'line') {
        this.drawLine(
          shape.x1,
          shape.y1,
          shape.x2,
          shape.y2,
          shape.color,
          shape.thickness,
          shape.lineType,
        );
      } else if (shape.type === 'freehand') {
        this.drawFreehand(shape.points, shape.color, shape.thickness);
      } else if (shape.type === 'text') {
        ctx!.font = `${shape.fontSize}px ${shape.font}`;
        ctx!.fillStyle = shape.color;
        ctx!.fillText(shape.text, shape.x, shape.y);
      } else if (shape.type === 'image') {
        ctx!.drawImage(shape.img, shape.x1, shape.y1, shape.x2 - shape.x1, shape.y2 - shape.y1);
      } else {
        this.drawShape(
          shape.type,
          shape.x1,
          shape.y1,
          shape.x2,
          shape.y2,
          shape.color,
          shape.thickness,
          shape.lineType,
        );
      }
    });
    ctx!.restore();
    this.drawEdgeMarkers();
  }

  drawLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string,
    thickness: number,
    lineType: string,
  ) {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    ctx!.beginPath();
    ctx!.strokeStyle = color;
    ctx!.lineWidth = thickness;
    if (lineType === 'dashed') {
      ctx!.setLineDash([10, 10]);
    } else if (lineType === 'dotted') {
      ctx!.setLineDash([2, 10]);
    } else if (lineType === 'dashDot') {
      ctx!.setLineDash([10, 5, 2, 5]);
    } else {
      ctx!.setLineDash([]);
    }
    ctx!.moveTo(x1, y1);
    ctx!.lineTo(x2, y2);
    ctx!.stroke();
    ctx!.setLineDash([]);
  }

  drawText(text: string, x: number, y: number, color: string, font: string) {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    ctx!.font = `20px ${font}`;
    ctx!.fillStyle = color;
    ctx!.fillText(text, x, y);
  }

  drawFreehand(points: { x: number; y: number }[], color: string, thickness: number) {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    if (points.length < 2) return;
    ctx!.strokeStyle = color;
    ctx!.lineWidth = thickness;
    ctx!.beginPath();
    ctx!.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx!.lineTo(points[i].x, points[i].y);
    }
    ctx!.stroke();
  }

  drawShape(
    type: string,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string,
    thickness: number,
    lineType: string,
    ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d')!,
  ) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    if (lineType === 'dashed') {
      ctx.setLineDash([10, 10]);
    } else if (lineType === 'dotted') {
      ctx.setLineDash([2, 10]);
    } else if (lineType === 'dashDot') {
      ctx.setLineDash([10, 5, 2, 5]);
    } else {
      ctx.setLineDash([]);
    }
    if (type === 'rectangle') {
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
    } else if (type === 'circle') {
      const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
      ctx.stroke();
    } else if (type === 'rhombus') {
      const centerX = (x1 + x2) / 2;
      const centerY = (y1 + y2) / 2;
      ctx.moveTo(centerX, y1);
      ctx.lineTo(x2, centerY);
      ctx.lineTo(centerX, y2);
      ctx.lineTo(x1, centerY);
      ctx.closePath();
      ctx.stroke();
    } else if (type === 'pentagon') {
      this.drawPolygon(ctx, 5, x1, y1, x2, y2);
    } else if (type === 'hexagon') {
      this.drawPolygon(ctx, 6, x1, y1, x2, y2);
    } else if (type === 'triangle') {
      const centerX = (x1 + x2) / 2;
      ctx.moveTo(centerX, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x1, y2);
      ctx.closePath();
      ctx.stroke();
    } else if (type === 'square') {
      ctx.strokeRect(x1, y1, x2 - x1, x2 - x1);
    } else if (type === 'octagon') {
      this.drawPolygon(ctx, 8, x1, y1, x2, y2);
    } else if (type === 'oval') {
      const radiusX = Math.abs(x2 - x1) / 2;
      const radiusY = Math.abs(y2 - y1) / 2;
      const centerX = (x1 + x2) / 2;
      const centerY = (y1 + y2) / 2;
      ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
      ctx.stroke();
    } else if (type === 'parallelogram') {
      const centerX = (x1 + x2) / 2;
      ctx.moveTo(centerX, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(centerX, y2);
      ctx.lineTo(x1, y1);
      ctx.closePath();
      ctx.stroke();
    } else if (type === 'image') {
      ctx.drawImage(this.shape.img, x1, y1, x2 - x1, y2 - y1);
    }
  }

  drawPolygon(
    ctx: CanvasRenderingContext2D,
    sides: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ) {
    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;
    const radius = Math.min(Math.abs(x2 - x1), Math.abs(y2 - y1)) / 2;
    const angle = (2 * Math.PI) / sides;
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
      const x = centerX + radius * Math.cos(i * angle - Math.PI / 2);
      const y = centerY + radius * Math.sin(i * angle - Math.PI / 2);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.stroke();
  }

  undo() {
    if (this.parameters.shapes.length > 0) {
      this.parameters.redoStack.push(this.parameters.shapes.pop()!);
      this.parameters.updateRedoStack(this.parameters.redoStack);
      this.drawShapes();
      this.parameters.socket.emit(
        'updateBoardAction',
        { action: 'undo' },
        this.handleServerResponse,
      );
    }
  }

  redo() {
    if (this.parameters.redoStack.length > 0) {
      this.parameters.shapes.push(this.parameters.redoStack.pop()!);
      this.parameters.updateShapes(this.parameters.shapes);
      this.drawShapes();
      this.parameters.socket.emit(
        'updateBoardAction',
        { action: 'redo' },
        this.handleServerResponse,
      );
    }
  }

  saveState() {
    this.parameters.undoStack.push(JSON.stringify(this.parameters.shapes));
    this.parameters.updateUndoStack(this.parameters.undoStack);
  }

  findShape(x: number, y: number) {
    return this.parameters.shapes.find((shape: any) => {
      if (shape.type === 'freehand') {
        return shape.points.some((point: any) => {
          const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
          return distance < shape.thickness;
        });
      } else if (shape.type === 'text') {
        const ctx = this.canvasRef.nativeElement.getContext('2d');
        ctx!.font = `${shape.fontSize}px ${shape.font}`;
        const textMetrics = ctx!.measureText(shape.text);
        return (
          x > shape.x &&
          x < shape.x + textMetrics.width &&
          y > shape.y - shape.fontSize &&
          y < shape.y
        );
      } else if (shape.type === 'image') {
        return x > shape.x1 && x < shape.x2 && y > shape.y1 && y < shape.y2;
      } else {
        return x > shape.x1 && x < shape.x2 && y > shape.y1 && y < shape.y2;
      }
    });
  }

  drawSelection(shape: any) {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    if (!shape) return;

    const handles = this.getResizeHandles(shape);
    ctx!.strokeStyle = 'red';
    ctx!.lineWidth = 2;
    ctx!.setLineDash([6, 3]);
    if (shape.type === 'line') {
      ctx!.beginPath();
      ctx!.moveTo(shape.x1, shape.y1);
      ctx!.lineTo(shape.x2, shape.y2);
      ctx!.stroke();
    } else if (shape.type === 'circle') {
      const radius = Math.sqrt(Math.pow(shape.x2 - shape.x1, 2) + Math.pow(shape.y2 - shape.y1, 2));
      ctx!.beginPath();
      ctx!.arc(shape.x1, shape.y1, radius, 0, 2 * Math.PI);
      ctx!.stroke();
    } else {
      ctx!.strokeRect(shape.x1, shape.y1, shape.x2 - shape.x1, shape.y2 - shape.y1);
    }

    ctx!.setLineDash([]);

    handles.forEach((handle) => {
      ctx!.fillStyle = handle.isCenter ? 'blue' : 'red';
      ctx!.fillRect(handle.x - 6, handle.y - 6, 12, 12);
    });
  }

  getResizeHandles(shape: any) {
    const handles = [];
    if (shape.type === 'line') {
      handles.push({ x: shape.x1, y: shape.y1 });
      handles.push({ x: shape.x2, y: shape.y2 });
    } else if (shape.type === 'circle') {
      const radius = Math.sqrt(Math.pow(shape.x2 - shape.x1, 2) + Math.pow(shape.y2 - shape.y1, 2));
      handles.push({ x: shape.x1 + radius, y: shape.y1 });
      handles.push({ x: shape.x1 - radius, y: shape.y1 });
      handles.push({ x: shape.x1, y: shape.y1 + radius });
      handles.push({ x: shape.x1, y: shape.y1 - radius });
      handles.push({ x: shape.x1, y: shape.y1, isCenter: true });
    } else if (shape.type === 'text') {
      const ctx = this.canvasRef.nativeElement.getContext('2d');
      const textMetrics = ctx!.measureText(shape.text);
      handles.push({ x: shape.x, y: shape.y - shape.fontSize, isCenter: true });
      handles.push({ x: shape.x + textMetrics.width, y: shape.y, isCenter: false });
    } else if (shape.type === 'image') {
      handles.push({ x: shape.x1, y: shape.y1 });
      handles.push({ x: shape.x2, y: shape.y1 });
      handles.push({ x: shape.x2, y: shape.y2 });
      handles.push({ x: shape.x1, y: shape.y2 });
      handles.push({ x: (shape.x1 + shape.x2) / 2, y: (shape.y1 + shape.y2) / 2, isCenter: true });
    } else {
      handles.push({ x: shape.x1, y: shape.y1 });
      handles.push({ x: shape.x2, y: shape.y1 });
      handles.push({ x: shape.x2, y: shape.y2 });
      handles.push({ x: shape.x1, y: shape.y2 });
      handles.push({ x: (shape.x1 + shape.x2) / 2, y: (shape.y1 + shape.y2) / 2, isCenter: true });
    }
    return handles.map((handle) => ({
      ...handle,
      isCenter: handle.isCenter || false,
    }));
  }

  getHandleAtPosition(x: number, y: number) {
    if (!this.selectedShape) return null;
    return this.getResizeHandles(this.selectedShape).find((handle) => {
      return Math.abs(handle.x - x) < 6 && Math.abs(handle.y - y) < 6;
    });
  }

  resizeShape(shape: any, handle: any, x: number, y: number) {
    if (shape.type === 'line') {
      if (handle.x === shape.x1 && handle.y === shape.y1) {
        shape.x1 = x;
        shape.y1 = y;
      } else {
        shape.x2 = x;
        shape.y2 = y;
      }
    } else if (shape.type === 'circle') {
      const dx = x - shape.x1;
      const dy = y - shape.y1;
      const radius = Math.sqrt(dx * dx + dy * dy);
      shape.x2 = shape.x1 + radius;
      shape.y2 = shape.y1;
    } else if (shape.type === 'text') {
      if (handle.isCenter) {
        shape.x = x;
        shape.y = y;
      } else {
        const textMetrics = this.canvasRef.nativeElement.getContext('2d')!.measureText(shape.text);
        shape.x = x - textMetrics.width;
        shape.y = y;
      }
    } else if (shape.type === 'image') {
      if (handle.isCenter) {
        const dx = x - (shape.x1 + shape.x2) / 2;
        const dy = y - (shape.y1 + shape.y2) / 2;
        this.moveShape(shape, dx, dy);
      } else {
        if (handle.x === shape.x1 && handle.y === shape.y1) {
          shape.x1 = x;
          shape.y1 = y;
        } else if (handle.x === shape.x2 && handle.y === shape.y1) {
          shape.x2 = x;
          shape.y1 = y;
        } else if (handle.x === shape.x2 && handle.y === shape.y2) {
          shape.x2 = x;
          shape.y2 = y;
        } else {
          shape.x1 = x;
          shape.y2 = y;
        }
      }
    } else {
      if (handle.isCenter) {
        const dx = x - (shape.x1 + shape.x2) / 2;
        const dy = y - (shape.y1 + shape.y2) / 2;
        this.moveShape(shape, dx, dy);
      } else {
        if (handle.x === shape.x1 && handle.y === shape.y1) {
          shape.x1 = x;
          shape.y1 = y;
        } else if (handle.x === shape.x2 && handle.y === shape.y1) {
          shape.x2 = x;
          shape.y1 = y;
        } else if (handle.x === shape.x2 && handle.y === shape.y2) {
          shape.x2 = x;
          shape.y2 = y;
        } else {
          shape.x1 = x;
          shape.y2 = y;
        }
      }
    }
    this.drawShapes();
  }

  moveShape(shape: any, dx: number, dy: number) {
    if (shape.type === 'line' || shape.type === 'circle') {
      shape.x1 += dx;
      shape.y1 += dy;
      shape.x2 += dx;
      shape.y2 += dy;
    } else if (shape.type === 'freehand') {
      shape.points.forEach((point: any) => {
        point.x += dx;
        point.y += dy;
      });
    } else if (shape.type === 'text') {
      shape.x += dx;
      shape.y += dy;
    } else if (shape.type === 'image') {
      shape.x1 += dx;
      shape.y1 += dy;
      shape.x2 += dx;
      shape.y2 += dy;
    } else {
      shape.x1 += dx;
      shape.y1 += dy;
      shape.x2 += dx;
      shape.y2 += dy;
    }
  }

  downloadCanvas(tempCanvas: HTMLCanvasElement) {
    const link = this.downloadLinkRef.nativeElement;
    link.href = tempCanvas.toDataURL();
    link.download = 'whiteboard.png';
    link.click();
  }

  saveCanvas() {
    const tempCanvas = this.tempCanvasRef.nativeElement;
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = this.canvasRef.nativeElement.width;
    tempCanvas.height = this.canvasRef.nativeElement.height;
    const notShapes = ['freehand', 'text', 'image', 'line'];

    if (this.parameters.useImageBackground) {
      const backgroundImage = new Image();
      backgroundImage.crossOrigin = 'anonymous';
      backgroundImage.onload = () => {
        tempCtx!.drawImage(backgroundImage, 0, 0, tempCanvas.width, tempCanvas.height);
        this.parameters.shapes.forEach((shape: any) => {
          !notShapes.includes(shape.type)
            ? this.drawShape(
                shape.type,
                shape.x1,
                shape.y1,
                shape.x2,
                shape.y2,
                shape.color,
                shape.thickness,
                shape.lineType,
                tempCtx!,
              )
            : this.drawShapeOnCanvas(shape, tempCtx!);
        });
        this.downloadCanvas(tempCanvas);
      };
      backgroundImage.src = 'https://mediasfu.com/images/svg/graph_paper.jpg';
    } else {
      tempCtx!.fillStyle = 'white';
      tempCtx!.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      this.parameters.shapes.forEach((shape: any) => {
        !notShapes.includes(shape.type)
          ? this.drawShape(
              shape.type,
              shape.x1,
              shape.y1,
              shape.x2,
              shape.y2,
              shape.color,
              shape.thickness,
              shape.lineType,
              tempCtx!,
            )
          : this.drawShapeOnCanvas(shape, tempCtx!);
      });
      this.downloadCanvas(tempCanvas);
    }
  }

  drawShapeOnCanvas(
    shape: any,
    ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d')!,
  ) {
    ctx.beginPath();
    ctx.strokeStyle = shape.color;
    ctx.lineWidth = shape.thickness || 2;
    ctx.fillStyle = shape.color;
    ctx.font = `${shape.fontSize}px ${shape.fontFamily}`;

    const lineType = shape.lineType ? shape.lineType : 'solid';

    if (lineType === 'dashed') {
      ctx.setLineDash([10, 10]);
    } else if (lineType === 'dotted') {
      ctx.setLineDash([2, 10]);
    } else if (lineType === 'dashDot') {
      ctx.setLineDash([10, 5, 2, 5]);
    } else {
      ctx.setLineDash([]);
    }
    switch (shape.type) {
      case 'line':
        ctx.moveTo(shape.x1, shape.y1);
        ctx.lineTo(shape.x2, shape.y2);
        break;
      case 'freehand':
        try {
          ctx.moveTo(shape.points[0].x, shape.points[0].y);
          shape.points.forEach((point: any) => ctx.lineTo(point.x, point.y));
        } catch {
          //console.log('Error drawing freehand shape');
        }
        break;
      case 'text':
        ctx.fillText(shape.text, shape.x, shape.y);
        break;
      case 'image':
        ctx.drawImage(shape.img, shape.x1, shape.y1, shape.x2 - shape.x1, shape.y2 - shape.y1);
        break;
      default:
        break;
    }
    ctx.stroke();
  }

  deleteShape(doEmits = true) {
    if (!this.checkBoardAccess()) return;

    if (!this.selectedShape) return;
    if (this.selectedShape) {
      this.parameters.shapes = this.parameters.shapes.filter(
        (shape: any) => shape !== this.selectedShape,
      );
      this.parameters.updateShapes(this.parameters.shapes);
      this.selectedShape = null;
      if (doEmits) {
        this.parameters.socket.emit(
          'updateBoardAction',
          { action: 'shapes', payload: { shapes: this.parameters.shapes } },
          this.handleServerResponse,
        );
      }
      this.drawShapes();
    }
  }

  toggleBackground = (doEmits = true) => {
    if (doEmits && !this.checkBoardAccess()) return;
    this.parameters.useImageBackground = !this.parameters.useImageBackground;
    this.parameters.updateUseImageBackground(this.parameters.useImageBackground);
    const toggleButton = this.toggleBackgroundRef.nativeElement;
    if (this.parameters.useImageBackground) {
      this.canvasRef.nativeElement.style.backgroundImage = `url('https://mediasfu.com/images/svg/graph_paper.jpg')`;
      toggleButton.classList.remove('active');
    } else {
      this.canvasRef.nativeElement.style.backgroundImage = 'none';
      this.canvasRef.nativeElement.style.backgroundColor = 'white';
      toggleButton.classList.add('active');
    }
    this.drawShapes();
    if (doEmits) {
      this.parameters.socket.emit(
        'updateBoardAction',
        { action: 'toggleBackground', payload: this.parameters.useImageBackground },
        this.handleServerResponse,
      );
    }
  };

  clearCanvas = (doEmits = true) => {
    if (this.parameters.islevel != '2' && doEmits) {
      this.parameters.showAlert?.({
        message: 'You do not have permission to clear the board',
        type: 'danger',
      });
      return;
    }
    if (this.parameters.shapes.length === 0) return;
    this.parameters.shapes = [];
    this.parameters.updateShapes([]);
    this.drawShapes();
    if (doEmits) {
      this.parameters.socket.emit(
        'updateBoardAction',
        { action: 'clear' },
        this.handleServerResponse,
      );
    }
  };

  uploadImage = (event: any, doEmits = true) => {
    try {
      if (!this.checkBoardAccess()) return;
      const file = event.target.files[0];
      if (file.size > 1024 * 1024) {
        this.parameters.showAlert?.({ message: 'File size must be less than 1MB', type: 'danger' });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event: any) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          if (img.height > 600 && img.height > img.width && !file.type.includes('jpeg')) {
            this.parameters.showAlert?.({
              message: 'For better performance, please upload the image in JPG format.',
              type: 'danger',
            });
            return;
          }

          let imageWidth = 350;
          const aspectRatio = img.height / img.width;
          let imageHeight = imageWidth * aspectRatio;
          const maxHeight = 600;
          if (imageHeight > maxHeight) {
            imageHeight = maxHeight;
            imageWidth = imageHeight / aspectRatio;
            if (imageWidth > 600) {
              imageWidth = 600;
            }
          }
          const imageShape = {
            type: 'image',
            img: img,
            src: event.target.result,
            x1: 50,
            y1: 50,
            x2: 50 + imageWidth,
            y2: 50 + imageHeight,
          };
          this.parameters.shapes.push(imageShape);
          this.parameters.updateShapes(this.parameters.shapes);
          this.drawShapes();
          if (doEmits) {
            this.parameters.socket.emit(
              'updateBoardAction',
              { action: 'uploadImage', payload: imageShape },
              this.handleServerResponse,
            );
          }
        };
        img.onerror = () => {
          this.parameters.showAlert?.({ message: 'Error loading image', type: 'danger' });
        };
        img.src = event.target.result;
      };
      reader.onerror = () => {
        this.parameters.showAlert?.({ message: 'Error reading file', type: 'danger' });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      //console.log(error);
    }
  };

  handleServerResponse = (response: any) => {
    if (!response.success) {
      this.parameters.showAlert?.({
        message: `Whiteboard action failed: ${response.reason}`,
        type: 'danger',
      });
    }
  };

  WhiteboardAction = (data: any) => {
    const { action, payload } = data;

    const ctx = this.canvasRef.nativeElement.getContext('2d');
    if (!ctx) return;
    this.parameters.updateCanvasWhiteboard(this.canvasRef.nativeElement);

    switch (action) {
      case 'draw':
        if (payload.type === 'freehand') {
          this.drawFreehand(payload.points, payload.color, payload.thickness);
          this.parameters.shapes.push({
            type: 'freehand',
            points: payload.points,
            color: payload.color,
            thickness: payload.thickness,
          });
          this.parameters.updateShapes(this.parameters.shapes);
        } else {
          this.drawLine(
            payload.x1,
            payload.y1,
            payload.x2,
            payload.y2,
            payload.color,
            payload.thickness,
            payload.lineType,
          );
          this.parameters.shapes.push({
            type: 'line',
            x1: payload.x1,
            y1: payload.y1,
            x2: payload.x2,
            y2: payload.y2,
            color: payload.color,
            thickness: payload.thickness,
            lineType: payload.lineType,
          });
          this.parameters.updateShapes(this.parameters.shapes);
        }
        break;
      case 'shape':
        this.drawShape(
          payload.type,
          payload.x1,
          payload.y1,
          payload.x2,
          payload.y2,
          payload.color,
          payload.thickness,
          payload.lineType,
        );
        this.parameters.shapes.push({
          type: payload.type,
          x1: payload.x1,
          y1: payload.y1,
          x2: payload.x2,
          y2: payload.y2,
          color: payload.color,
          thickness: payload.thickness,
          lineType: payload.lineType,
        });
        this.parameters.updateShapes(this.parameters.shapes);
        break;
      case 'erase':
        this.erase(payload.x, payload.y);
        break;
      case 'clear':
        this.clearCanvas(false);
        break;
      case 'uploadImage': {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const imageShape = {
            type: 'image',
            img,
            src: payload.src,
            x1: payload.x1,
            y1: payload.y1,
            x2: payload.x2,
            y2: payload.y2,
          };
          this.parameters.shapes.push(imageShape);
          this.parameters.updateShapes(this.parameters.shapes);
          this.drawShapes();
        };
        img.src = payload.src;
        break;
      }
      case 'toggleBackground':
        this.toggleBackground(false);
        this.drawShapes();
        break;
      case 'undo':
        if (this.parameters.shapes.length > 0) {
          this.parameters.redoStack.push(this.parameters.shapes.pop()!);
          this.parameters.updateRedoStack(this.parameters.redoStack);
          this.drawShapes();
        }
        break;
      case 'redo':
        if (this.parameters.redoStack.length > 0) {
          this.parameters.shapes.push(this.parameters.redoStack.pop()!);
          this.parameters.updateShapes(this.parameters.shapes);
          this.drawShapes();
        }
        break;
      case 'text':
        this.parameters.shapes.push({
          type: 'text',
          text: payload.text,
          x: payload.x,
          y: payload.y,
          color: payload.color,
          font: payload.font,
          fontSize: payload.fontSize,
        });
        this.parameters.updateShapes(this.parameters.shapes);
        this.drawShapes();
        break;
      case 'deleteShape':
        this.parameters.shapes = this.parameters.shapes.filter((shape: any) => shape !== payload);
        this.parameters.updateShapes(this.parameters.shapes);
        this.drawShapes();
        break;
      case 'shapes': {
        const oldShapes = this.parameters.shapes.filter((shape: any) => shape.type === 'image');
        this.parameters.shapes = payload.shapes.map((shape: any) => {
          if (shape.type === 'image') {
            const oldShape = oldShapes.find((oldShape: any) => oldShape.src === shape.src);
            if (oldShape) {
              return { ...shape, img: oldShape.img };
            } else {
              const img = new Image();
              img.crossOrigin = 'anonymous';
              img.src = shape.src;
              return { ...shape, img };
            }
          } else {
            return shape;
          }
        });
        this.parameters.updateShapes(this.parameters.shapes);
        this.drawShapes();
        break;
      }
      default:
        break;
    }
  };

  WhiteboardUpdated = (data: any) => {
    // data = { whiteboardUsers, status}
    // status = 'started', 'ended', 'updated'
    // whiteboardUsers array
    // members (participants) array only sent to the host
    //whiteboardData = {shapes=[], useImageBackground=Boolean, redoStack=[], undoStack=[]} or {} or null
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.parameters.islevel == '2' && data.members) {
      this.parameters.participantsAll = data.members.map((participant: any) => ({
        isBanned: participant.isBanned,
        name: participant.name,
      }));
      this.parameters.participants = data.members.filter(
        (participant: any) => participant.isBanned == false,
      );
      this.parameters.updateParticipants(this.parameters.participants);
    }

    this.parameters.whiteboardUsers = data.whiteboardUsers;
    this.parameters.updateWhiteboardUsers(this.parameters.whiteboardUsers);

    const useBoard = this.parameters.whiteboardUsers.find(
      (user: any) => user.name == this.parameters.member && user.useBoard,
    )
      ? true
      : false;
    if (this.parameters.islevel != '2' && !useBoard && !this.parameters.whiteboardEnded) {
      this.changeMode('pan');
    }

    if (data.whiteboardData && Object.keys(data.whiteboardData).length > 0) {
      if (data.whiteboardData.shapes) {
        const oldShapes = this.parameters.shapes.filter((shape: any) => shape.type === 'image');
        this.parameters.shapes = data.whiteboardData.shapes.map((shape: any) => {
          if (shape.type === 'image') {
            const oldShape = oldShapes.find((oldShape: any) => oldShape.src === shape.src);
            if (oldShape) {
              return { ...shape, img: oldShape.img };
            } else {
              const img = new Image();
              img.crossOrigin = 'anonymous';
              img.src = shape.src;
              return { ...shape, img };
            }
          } else {
            return shape;
          }
        });
        this.parameters.updateShapes(this.parameters.shapes);
      }
      if (data.whiteboardData.useImageBackground != null) {
        this.parameters.useImageBackground = data.whiteboardData.useImageBackground;
        this.parameters.updateUseImageBackground(this.parameters.useImageBackground);
      } else {
        this.parameters.useImageBackground = true;
        this.parameters.updateUseImageBackground(true);
      }
      if (data.whiteboardData.redoStack) {
        this.parameters.redoStack = data.whiteboardData.redoStack;
        this.parameters.updateRedoStack(this.parameters.redoStack);
      }
      if (data.whiteboardData.undoStack) {
        this.parameters.undoStack = data.whiteboardData.undoStack;
        this.parameters.updateUndoStack(this.parameters.undoStack);
      }
    }

    if (data.status == 'started' && !this.parameters.whiteboardStarted) {
      this.parameters.whiteboardStarted = true;
      this.parameters.whiteboardEnded = false;
      this.parameters.screenId = `whiteboard-${this.parameters.roomName}`;

      this.parameters.updateWhiteboardStarted(true);
      this.parameters.updateWhiteboardEnded(false);
      this.parameters.updateScreenId(this.parameters.screenId);

      if (this.parameters.islevel != '2') {
        this.parameters.shareScreenStarted = true;
        this.parameters.updateShareScreenStarted(true);
        this.parameters.onScreenChanges({ changed: true, parameters: this.parameters });
      }
    } else if (data.status == 'ended') {
      const prevWhiteboardEnded = this.parameters.whiteboardEnded;
      const prevWhiteboardStarted = this.parameters.whiteboardStarted;
      this.parameters.whiteboardEnded = true;
      this.parameters.whiteboardStarted = false;
      this.parameters.updateWhiteboardStarted(false);
      this.parameters.updateWhiteboardEnded(true);
      if (this.parameters.islevel == '2' && prevWhiteboardEnded) {
        // No operation needed
      } else {
        this.parameters.shareScreenStarted = false;
        this.parameters.screenId = '';

        this.parameters.updateShareScreenStarted(false);
        this.parameters.updateScreenId('');
        this.parameters.onScreenChanges({ changed: true, parameters: this.parameters });
      }

      try {
        if (
          prevWhiteboardStarted &&
          this.parameters.islevel == '2' &&
          (this.parameters.recordStarted || this.parameters.recordResumed)
        ) {
          if (!(this.parameters.recordPaused || this.parameters.recordStopped)) {
            if (this.parameters.recordingMediaOptions == 'video') {
              this.parameters.captureCanvasStream({ parameters: this.parameters, start: false });
            }
          }
        }
      } catch (error) {
        // Handle error
      }
    } else if (data.status == 'started' && this.parameters.whiteboardStarted) {
      this.parameters.whiteboardStarted = true;
      this.parameters.whiteboardEnded = false;

      this.parameters.updateWhiteboardStarted(true);
      this.parameters.updateWhiteboardEnded(false);

      this.parameters.shareScreenStarted = true;
      this.parameters.screenId = `whiteboard-${this.parameters.roomName}`;

      this.parameters.updateShareScreenStarted(true);
      this.parameters.updateScreenId(this.parameters.screenId);
      this.parameters.onScreenChanges({ changed: true, parameters: this.parameters });
    }
  };

  handleDropdownClick(id: string) {
    this.dropdownOpen = this.dropdownOpen === id ? null : id;
  }

  handleItemClick(callback: any, name: string, value: any) {
    callback(value);
    this.dropdownOpen = null;
    if (['draw', 'freehand', 'shape', 'text', 'erase'].includes(name)) {
      this.changeMode(name);
    }
  }

  dropdownItems(items: any[], name: string, callback: any) {
    return items.map(
      (item, index) =>
        `<button key="${index}" class="dropdown-item" (click)="handleItemClick(${callback}, '${name}', ${item.value})" style="padding: 5px;">
        ${item.label}
      </button>`,
    );
  }

  toggleToolbar() {
    this.toolbarVisible = !this.toolbarVisible;
  }

  checkBoardAccess() {
    this.parameters = this.parameters.getUpdatedAllParams();
    if (this.parameters.whiteboardStarted && !this.parameters.whiteboardEnded) {
      const user = this.parameters.whiteboardUsers.find(
        (user: any) => user.name === this.parameters.member,
      );
      if ((!user || !user.useBoard) && this.parameters.islevel != '2') {
        this.parameters.showAlert?.({
          message: 'You are not allowed to use the whiteboard. Please ask the host to assign you.',
          type: 'danger',
        });
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  changeMode(newMode: string) {
    if (newMode !== 'pan' && !this.checkBoardAccess()) return;
    this.mode = newMode;
    const canvas = this.canvasRef.nativeElement;
    if (newMode === 'pan') {
      canvas.style.cursor = 'grab';
    } else if (newMode === 'select') {
      canvas.style.cursor = 'pointer';
    } else if (newMode === 'erase') {
      canvas.style.cursor = 'crosshair';
    } else {
      canvas.style.cursor = 'crosshair';
    }
    if (newMode !== 'freehand' && this.freehandDrawing.length > 0) {
      this.parameters.shapes.push({
        type: 'freehand',
        points: this.freehandDrawing,
        color: this.color,
        thickness: this.brushThickness,
      });
      this.parameters.updateShapes(this.parameters.shapes);
      this.freehandDrawing = [];
      this.saveState();
    }
  }
}
