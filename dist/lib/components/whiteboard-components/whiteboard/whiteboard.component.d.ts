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
 *
 * @example
 * ```html
 * <app-whiteboard
 *  [customWidth]="1280"
 * [customHeight]="720"
 * [parameters]="{
 *  socket: socket,
 * showAlert: showAlert,
 * islevel: islevel,
 * roomName: roomName,
 * shapes: shapes,
 * useImageBackground: useImageBackground,
 * redoStack: redoStack,
 * undoStack: undoStack,
 * whiteboardStarted: whiteboardStarted,
 * whiteboardEnded: whiteboardEnded,
 * whiteboardUsers: whiteboardUsers,
 * participants: participants,
 * participantsAll: participantsAll,
 * screenId: screenId,
 * recordStarted: recordStarted,
 * recordStopped: recordStopped,
 * recordPaused: recordPaused,
 * recordResumed: recordResumed,
 * recordingMediaOptions: recordingMediaOptions,
 * member: member,
 * shareScreenStarted: shareScreenStarted,
 * canvasWhiteboard: canvasWhiteboard,
 * targetResolution: targetResolution,
 * targetResolutionHost: targetResolutionHost,
 * updateShapes: updateShapes,
 * updateUseImageBackground: updateUseImageBackground,
 * updateRedoStack: updateRedoStack,
 * updateUndoStack: updateUndoStack,
 * updateWhiteboardStarted: updateWhiteboardStarted,
 * updateWhiteboardEnded: updateWhiteboardEnded,
 * updateWhiteboardUsers: updateWhiteboardUsers,
 * updateParticipants: updateParticipants,
 * updateScreenId: updateScreenId,
 * updateShareScreenStarted: updateShareScreenStarted,
 * updateCanvasWhiteboard: updateCanvasWhiteboard,
 * onScreenChanges: onScreenChanges,
 * captureCanvasStream: captureCanvasStream,
 * getUpdatedAllParams: getUpdatedAllParams
 * }"
 * [showAspect]="true"
 * ></app-whiteboard>
 * ```
 */
import { ElementRef, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Socket } from 'socket.io-client';
import { OnScreenChangesParameters, OnScreenChangesType } from '../../../consumers/on-screen-changes.service';
import { CaptureCanvasStreamParameters, ShowAlert, WhiteboardUser, Participant, CaptureCanvasStreamType } from '../../../@types/types';
import * as i0 from "@angular/core";
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
    points?: Array<{
        x: number;
        y: number;
    }>;
    img?: HTMLImageElement;
    src?: string;
}
export interface WhiteboardParameters extends OnScreenChangesParameters, CaptureCanvasStreamParameters {
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
export declare class Whiteboard implements OnInit, OnDestroy, OnChanges {
    customWidth: number;
    customHeight: number;
    parameters: WhiteboardParameters;
    showAspect: boolean;
    canvasRef: ElementRef<HTMLCanvasElement>;
    textInputRef: ElementRef<HTMLTextAreaElement>;
    toggleBackgroundRef: ElementRef<HTMLButtonElement>;
    downloadLinkRef: ElementRef<HTMLAnchorElement>;
    tempCanvasRef: ElementRef<HTMLCanvasElement>;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faUndo: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faRedo: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faEraser: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faShapes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faMousePointer: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faHandPaper: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faTextHeight: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faFont: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faPencilAlt: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faPaintBrush: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faTrash: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faSave: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faSearch: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faSearchMinus: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faSearchPlus: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faChevronLeft: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faUpload: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faChevronRight: import("@fortawesome/fontawesome-common-types").IconDefinition;
    private mode;
    private isDrawing;
    private isPanning;
    private isDragging;
    private startX;
    private startY;
    private currentX;
    private currentY;
    private freehandDrawing;
    private selectedShape;
    private selectedHandle;
    private movingShape;
    private panX;
    private panY;
    private scale;
    private minScale;
    private maxScale;
    private eraserThickness;
    private brushThickness;
    private lineThickness;
    lineType: string;
    color: string;
    private font;
    private fontSize;
    private shape;
    private backgroundImage;
    toolbarVisible: boolean;
    dropdownOpen: string | null;
    private currentClickPosition;
    private maxWidth;
    private maxHeight;
    private dimensionsFixed;
    private isValidShape;
    updateLineThickness: (thickness: number) => void;
    updateBrushThickness: (thickness: number) => void;
    updateEraserThickness: (thickness: number) => void;
    updateColor: (color: string) => void;
    updateFont: (font: string) => void;
    updateFontSize: (fontSize: number) => void;
    updateShape: (shape: string) => void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    handleTextInput(event: KeyboardEvent): void;
    addListeners: () => void;
    handleTouchStart(e: TouchEvent): void;
    handleTouchMove(e: TouchEvent): void;
    handleTouchEnd(e: TouchEvent): void;
    handleClickOutside(event: MouseEvent): void;
    handleCanvasClick(e: MouseEvent): void;
    startDrawing(e: MouseEvent): void;
    draw: (e: MouseEvent) => void;
    stopDrawing(): void;
    erase(x: number, y: number): void;
    isPointNearLine(px: number, py: number, x1: number, y1: number, x2: number, y2: number, threshold: number): boolean;
    zoomCanvas(scaleFactor: number, event?: MouseEvent): void;
    handleZoom(e: WheelEvent): void;
    drawEdgeMarkers(): void;
    drawShapes(): void;
    drawLine(x1: number, y1: number, x2: number, y2: number, color: string, thickness: number, lineType: string): void;
    drawText(text: string, x: number, y: number, color: string, font: string): void;
    drawFreehand(points: {
        x: number;
        y: number;
    }[], color: string, thickness: number): void;
    drawShape(type: string, x1: number, y1: number, x2: number, y2: number, color: string, thickness: number, lineType: string, ctx?: CanvasRenderingContext2D): void;
    drawPolygon(ctx: CanvasRenderingContext2D, sides: number, x1: number, y1: number, x2: number, y2: number): void;
    undo(): void;
    redo(): void;
    saveState(): void;
    findShape(x: number, y: number): Shape | undefined;
    drawSelection(shape: any): void;
    getResizeHandles(shape: any): ({
        isCenter: boolean;
        x: any;
        y: any;
    } | {
        isCenter: boolean;
        x: any;
        y: any;
    })[];
    getHandleAtPosition(x: number, y: number): {
        isCenter: boolean;
        x: any;
        y: any;
    } | null | undefined;
    resizeShape(shape: any, handle: any, x: number, y: number): void;
    moveShape(shape: any, dx: number, dy: number): void;
    downloadCanvas(tempCanvas: HTMLCanvasElement): void;
    saveCanvas(): void;
    drawShapeOnCanvas(shape: any, ctx?: CanvasRenderingContext2D): void;
    deleteShape(doEmits?: boolean): void;
    toggleBackground: (doEmits?: boolean) => void;
    clearCanvas: (doEmits?: boolean) => void;
    uploadImage: (event: any, doEmits?: boolean) => void;
    handleServerResponse: (response: any) => void;
    WhiteboardAction: (data: any) => void;
    WhiteboardUpdated: (data: any) => void;
    handleDropdownClick(id: string): void;
    handleItemClick(callback: any, name: string, value: any): void;
    dropdownItems(items: any[], name: string, callback: any): string[];
    toggleToolbar(): void;
    checkBoardAccess(): boolean;
    changeMode(newMode: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Whiteboard, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Whiteboard, "app-whiteboard", never, { "customWidth": { "alias": "customWidth"; "required": false; }; "customHeight": { "alias": "customHeight"; "required": false; }; "parameters": { "alias": "parameters"; "required": false; }; "showAspect": { "alias": "showAspect"; "required": false; }; }, {}, never, never, true, never>;
}
