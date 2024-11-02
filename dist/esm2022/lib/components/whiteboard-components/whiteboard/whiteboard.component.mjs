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
import { Component, Input, ViewChild, ViewEncapsulation, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes, faUndo, faRedo, faEraser, faShapes, faMousePointer, faHandPaper, faTextHeight, faFont, faPencilAlt, faPaintBrush, faTrash, faSave, faSearch, faSearchMinus, faSearchPlus, faChevronLeft, faUpload, faChevronRight, } from '@fortawesome/free-solid-svg-icons';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@fortawesome/angular-fontawesome";
export class Whiteboard {
    customWidth;
    customHeight;
    parameters = {};
    showAspect;
    canvasRef;
    textInputRef;
    toggleBackgroundRef;
    downloadLinkRef;
    tempCanvasRef;
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
    mode = 'pan';
    isDrawing = false;
    isPanning = false;
    isDragging = false;
    startX = 0;
    startY = 0;
    currentX = 0;
    currentY = 0;
    freehandDrawing = [];
    selectedShape = null;
    selectedHandle = null;
    movingShape = false;
    panX = 0;
    panY = 0;
    scale = 1;
    minScale = 0.25;
    maxScale = 1.75;
    eraserThickness = 10;
    brushThickness = 6;
    lineThickness = 6;
    lineType = 'solid';
    color = '#000000';
    font = 'Arial';
    fontSize = 20;
    shape = null;
    backgroundImage = new Image();
    toolbarVisible = true;
    dropdownOpen = null;
    currentClickPosition = null;
    maxWidth = 1280;
    maxHeight = 720;
    dimensionsFixed = false;
    isValidShape = false;
    updateLineThickness = (thickness) => {
        this.lineThickness = thickness;
    };
    updateBrushThickness = (thickness) => {
        this.brushThickness = thickness;
    };
    updateEraserThickness = (thickness) => {
        this.eraserThickness = thickness;
    };
    updateColor = (color) => {
        this.color = color;
    };
    updateFont = (font) => {
        this.font = font;
    };
    updateFontSize = (fontSize) => {
        this.fontSize = fontSize;
    };
    updateShape = (shape) => {
        this.shape = shape;
    };
    ngOnInit() {
        if (this.showAspect) {
            this.addListeners();
        }
    }
    ngOnChanges(changes) {
        if (changes['parameters'] && changes['parameters'].currentValue) {
            this.parameters = changes['parameters'].currentValue;
            if (this.parameters.socket) {
                this.parameters.socket.on('whiteboardUpdated', async (data) => {
                    this.WhiteboardUpdated(data);
                });
                this.parameters.socket.on('whiteboardAction', (data) => {
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
    ngOnDestroy() {
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
        textInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                this.handleTextInput(event);
            }
        });
    }
    handleTextInput(event) {
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
            this.parameters.socket.emit('updateBoardAction', {
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
            }, this.handleServerResponse);
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
                if (this.parameters.targetResolution == 'qhd' ||
                    this.parameters.targetResolutionHost == 'qhd') {
                    this.maxWidth = 1920;
                    this.maxHeight = 1080;
                }
                else if (this.parameters.targetResolution == 'fhd' ||
                    this.parameters.targetResolutionHost == 'fhd') {
                    this.maxWidth = 1920;
                    this.maxHeight = 1080;
                }
                canvas.width = this.maxWidth;
                canvas.height = this.maxHeight;
                this.dimensionsFixed = true;
            }
            catch {
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
    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY,
        });
        this.canvasRef.nativeElement.dispatchEvent(mouseEvent);
    }
    handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY,
        });
        this.canvasRef.nativeElement.dispatchEvent(mouseEvent);
    }
    handleTouchEnd(e) {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        this.canvasRef.nativeElement.dispatchEvent(mouseEvent);
    }
    handleClickOutside(event) {
        const target = event.target;
        if (this.dropdownOpen && !target.closest('.btn-group')) {
            this.dropdownOpen = null;
        }
    }
    handleCanvasClick(e) {
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
    startDrawing(e) {
        this.isDrawing = true;
        this.startX = (e.offsetX - this.panX) / this.scale;
        this.startY = (e.offsetY - this.panY) / this.scale;
        if (this.mode === 'erase') {
            this.erase(this.startX, this.startY);
        }
        else if (this.mode === 'draw' || this.mode === 'freehand') {
            const ctx = this.canvasRef.nativeElement.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(this.startX, this.startY);
            if (this.mode === 'freehand') {
                this.freehandDrawing = [{ x: this.startX, y: this.startY }];
            }
        }
        else if (this.mode === 'pan') {
            this.isPanning = true;
            this.isDragging = false;
        }
        else if (this.mode === 'select') {
            this.selectedHandle = this.getHandleAtPosition(this.startX, this.startY);
            if (this.selectedHandle) {
                this.isDragging = true;
                this.movingShape = this.selectedHandle.isCenter;
            }
            else {
                this.selectedShape = this.findShape(this.startX, this.startY);
                if (this.selectedShape) {
                    this.drawShapes();
                    this.drawSelection(this.selectedShape);
                }
            }
        }
    }
    draw = (e) => {
        if (!this.dimensionsFixed) {
            try {
                if (this.parameters.targetResolution == 'qhd' ||
                    this.parameters.targetResolutionHost == 'qhd') {
                    this.maxWidth = 1920;
                    this.maxHeight = 1080;
                }
                else if (this.parameters.targetResolution == 'fhd' ||
                    this.parameters.targetResolutionHost == 'fhd') {
                    this.maxWidth = 1920;
                    this.maxHeight = 1080;
                }
                this.canvasRef.nativeElement.width = this.maxWidth;
                this.canvasRef.nativeElement.height = this.maxHeight;
                this.dimensionsFixed = true;
                this.parameters.updateCanvasWhiteboard(this.canvasRef.nativeElement);
            }
            catch {
                /* handle error */
            }
        }
        if (!this.isDrawing)
            return;
        this.currentX = (e.offsetX - this.panX) / this.scale;
        this.currentY = (e.offsetY - this.panY) / this.scale;
        if (this.mode == 'draw' || this.mode == 'freehand' || this.mode == 'shape') {
            //if more than max width or height or less than 0, return
            if (this.currentX > this.maxWidth ||
                this.currentY > this.maxHeight ||
                this.currentX < 0 ||
                this.currentY < 0) {
                this.isValidShape = false;
                return;
            }
            else {
                this.isValidShape = true;
            }
        }
        const ctx = this.canvasRef.nativeElement.getContext('2d');
        if (this.mode === 'erase') {
            this.erase(this.currentX, this.currentY);
        }
        else if (this.mode === 'draw') {
            ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
            this.drawShapes();
            this.drawLine(this.startX, this.startY, this.currentX, this.currentY, this.color, this.lineThickness, this.lineType);
        }
        else if (this.mode === 'freehand') {
            ctx.lineTo(this.currentX, this.currentY);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.brushThickness;
            ctx.stroke();
            this.freehandDrawing.push({ x: this.currentX, y: this.currentY });
        }
        else if (this.mode === 'shape') {
            ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
            this.drawShapes();
            this.drawShape(this.shape, this.startX, this.startY, this.currentX, this.currentY, this.color, this.lineThickness, this.lineType);
        }
        else if (this.mode === 'pan' && this.isPanning) {
            this.isDragging = true;
            const dx = e.clientX - this.startX;
            const dy = e.clientY - this.startY;
            this.panX += dx;
            this.panY += dy;
            this.startX = e.clientX;
            this.startY = e.clientY;
            ctx.setTransform(this.scale, 0, 0, this.scale, this.panX, this.panY);
            this.drawShapes();
        }
        else if (this.mode === 'select' && this.selectedShape) {
            ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
            if (this.movingShape) {
                const dx = this.currentX - this.startX;
                const dy = this.currentY - this.startY;
                this.moveShape(this.selectedShape, dx, dy);
                this.startX = this.currentX;
                this.startY = this.currentY;
            }
            else if (this.isDragging) {
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
        ctx.closePath();
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
            this.parameters.socket.emit('updateBoardAction', {
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
            }, this.handleServerResponse);
        }
        else if (this.mode === 'freehand' && this.isValidShape) {
            this.parameters.shapes.push({
                type: 'freehand',
                points: this.freehandDrawing,
                color: this.color,
                thickness: this.brushThickness,
            });
            this.parameters.updateShapes(this.parameters.shapes);
            this.parameters.socket.emit('updateBoardAction', {
                action: 'draw',
                payload: {
                    type: 'freehand',
                    points: this.freehandDrawing,
                    color: this.color,
                    thickness: this.brushThickness,
                },
            }, this.handleServerResponse);
            this.freehandDrawing = [];
            this.saveState();
        }
        else if (this.mode === 'shape' && this.isValidShape) {
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
            this.parameters.socket.emit('updateBoardAction', {
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
            }, this.handleServerResponse);
        }
        else if (this.mode === 'select') {
            if (this.selectedShape && !this.movingShape && !this.isDragging) {
                const shapeFound = this.findShape(this.currentX, this.currentY);
                if (shapeFound) {
                    this.selectedShape = shapeFound;
                    this.drawShapes();
                    this.drawSelection(shapeFound);
                }
            }
            if (this.selectedShape) {
                this.parameters.socket.emit('updateBoardAction', { action: 'shapes', payload: { shapes: this.parameters.shapes } }, this.handleServerResponse);
            }
            this.saveState();
        }
    }
    erase(x, y) {
        const ctx = this.canvasRef.nativeElement.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, this.eraserThickness / 2, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.restore();
        let changeOccurred = false;
        this.parameters.shapes = this.parameters.shapes
            .map((shape) => {
            if (shape.type === 'freehand') {
                return {
                    ...shape,
                    points: shape.points.filter((point) => {
                        const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
                        if (distance <= this.eraserThickness / 2) {
                            changeOccurred = true;
                            return false;
                        }
                        return distance > this.eraserThickness / 2;
                    }),
                };
            }
            else if (shape.type === 'line') {
                if (this.isPointNearLine(x, y, shape.x1, shape.y1, shape.x2, shape.y2, this.eraserThickness / 2)) {
                    changeOccurred = true;
                    return null;
                }
            }
            else if (shape.type === 'text') {
                const textWidth = ctx.measureText(shape.text).width;
                if (x > shape.x &&
                    x < shape.x + textWidth &&
                    y > shape.y - shape.fontSize &&
                    y < shape.y) {
                    changeOccurred = true;
                    return null;
                }
            }
            else if (shape.type === 'image') {
                if (x > shape.x1 && x < shape.x2 && y > shape.y1 && y < shape.y2) {
                    changeOccurred = true;
                    return null;
                }
            }
            else {
                if (x > shape.x1 && x < shape.x2 && y > shape.y1 && y < shape.y2) {
                    changeOccurred = true;
                    return null;
                }
            }
            return shape;
        })
            .filter((shape) => shape && (shape.type !== 'freehand' || shape.points.length > 0));
        this.parameters.updateShapes(this.parameters.shapes);
        this.drawShapes();
        if (changeOccurred) {
            this.parameters.socket.emit('updateBoardAction', { action: 'shapes', payload: { shapes: this.parameters.shapes } }, this.handleServerResponse);
        }
    }
    isPointNearLine(px, py, x1, y1, x2, y2, threshold) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        const dot = ((px - x1) * dx + (py - y1) * dy) / (length * length);
        const closestX = x1 + dot * dx;
        const closestY = y1 + dot * dy;
        const distance = Math.sqrt(Math.pow(px - closestX, 2) + Math.pow(py - closestY, 2));
        return distance <= threshold;
    }
    zoomCanvas(scaleFactor, event = {
        clientX: this.canvasRef.nativeElement.width / 2,
        clientY: this.canvasRef.nativeElement.height / 2,
    }) {
        const canvas = this.canvasRef.nativeElement;
        const ctx = canvas.getContext('2d');
        if (scaleFactor === 10) {
            this.scale = 1;
            this.panX = 0;
            this.panY = 0;
        }
        else {
            let newScale = this.scale * scaleFactor;
            if (newScale < this.minScale) {
                newScale = this.minScale;
            }
            else if (newScale > this.maxScale) {
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
        ctx.setTransform(this.scale, 0, 0, this.scale, this.panX, this.panY);
        this.drawShapes();
    }
    handleZoom(e) {
        e.preventDefault();
        if (e.deltaY < 0) {
            this.zoomCanvas(1.2, e);
        }
        else {
            this.zoomCanvas(0.8, e);
        }
    }
    drawEdgeMarkers() {
        const ctx = this.canvasRef.nativeElement.getContext('2d');
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
        ctx.setLineDash([]); // reset line dash
        const markerLength = 20;
        const topLeftX = this.panX;
        const topLeftY = this.panY;
        const bottomRightX = this.panX + 1280 * this.scale;
        const bottomRightY = this.panY + 720 * this.scale;
        ctx.beginPath();
        ctx.moveTo(topLeftX, topLeftY + markerLength);
        ctx.lineTo(topLeftX, topLeftY);
        ctx.lineTo(topLeftX + markerLength, topLeftY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(bottomRightX - markerLength, topLeftY);
        ctx.lineTo(bottomRightX, topLeftY);
        ctx.lineTo(bottomRightX, topLeftY + markerLength);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(bottomRightX, bottomRightY - markerLength);
        ctx.lineTo(bottomRightX, bottomRightY);
        ctx.lineTo(bottomRightX - markerLength, bottomRightY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(topLeftX + markerLength, bottomRightY);
        ctx.lineTo(topLeftX, bottomRightY);
        ctx.lineTo(topLeftX, bottomRightY - markerLength);
        ctx.stroke();
        ctx.restore();
    }
    drawShapes() {
        const canvas = this.canvasRef.nativeElement;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.setTransform(this.scale, 0, 0, this.scale, this.panX, this.panY);
        if (this.parameters.useImageBackground) {
            ctx.drawImage(this.backgroundImage, -this.panX / this.scale, -this.panY / this.scale, canvas.width / this.scale, canvas.height / this.scale);
        }
        else {
            ctx.fillStyle = '#fff';
            ctx.fillRect(-this.panX / this.scale, -this.panY / this.scale, canvas.width / this.scale, canvas.height / this.scale);
        }
        this.parameters.shapes.forEach((shape) => {
            if (shape.type === 'line') {
                this.drawLine(shape.x1, shape.y1, shape.x2, shape.y2, shape.color, shape.thickness, shape.lineType);
            }
            else if (shape.type === 'freehand') {
                this.drawFreehand(shape.points, shape.color, shape.thickness);
            }
            else if (shape.type === 'text') {
                ctx.font = `${shape.fontSize}px ${shape.font}`;
                ctx.fillStyle = shape.color;
                ctx.fillText(shape.text, shape.x, shape.y);
            }
            else if (shape.type === 'image') {
                ctx.drawImage(shape.img, shape.x1, shape.y1, shape.x2 - shape.x1, shape.y2 - shape.y1);
            }
            else {
                this.drawShape(shape.type, shape.x1, shape.y1, shape.x2, shape.y2, shape.color, shape.thickness, shape.lineType);
            }
        });
        ctx.restore();
        this.drawEdgeMarkers();
    }
    drawLine(x1, y1, x2, y2, color, thickness, lineType) {
        const ctx = this.canvasRef.nativeElement.getContext('2d');
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = thickness;
        if (lineType === 'dashed') {
            ctx.setLineDash([10, 10]);
        }
        else if (lineType === 'dotted') {
            ctx.setLineDash([2, 10]);
        }
        else if (lineType === 'dashDot') {
            ctx.setLineDash([10, 5, 2, 5]);
        }
        else {
            ctx.setLineDash([]);
        }
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.setLineDash([]);
    }
    drawText(text, x, y, color, font) {
        const ctx = this.canvasRef.nativeElement.getContext('2d');
        ctx.font = `20px ${font}`;
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    }
    drawFreehand(points, color, thickness) {
        const ctx = this.canvasRef.nativeElement.getContext('2d');
        if (points.length < 2)
            return;
        ctx.strokeStyle = color;
        ctx.lineWidth = thickness;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
    }
    drawShape(type, x1, y1, x2, y2, color, thickness, lineType, ctx = this.canvasRef.nativeElement.getContext('2d')) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = thickness;
        if (lineType === 'dashed') {
            ctx.setLineDash([10, 10]);
        }
        else if (lineType === 'dotted') {
            ctx.setLineDash([2, 10]);
        }
        else if (lineType === 'dashDot') {
            ctx.setLineDash([10, 5, 2, 5]);
        }
        else {
            ctx.setLineDash([]);
        }
        if (type === 'rectangle') {
            ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
        }
        else if (type === 'circle') {
            const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
            ctx.stroke();
        }
        else if (type === 'rhombus') {
            const centerX = (x1 + x2) / 2;
            const centerY = (y1 + y2) / 2;
            ctx.moveTo(centerX, y1);
            ctx.lineTo(x2, centerY);
            ctx.lineTo(centerX, y2);
            ctx.lineTo(x1, centerY);
            ctx.closePath();
            ctx.stroke();
        }
        else if (type === 'pentagon') {
            this.drawPolygon(ctx, 5, x1, y1, x2, y2);
        }
        else if (type === 'hexagon') {
            this.drawPolygon(ctx, 6, x1, y1, x2, y2);
        }
        else if (type === 'triangle') {
            const centerX = (x1 + x2) / 2;
            ctx.moveTo(centerX, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x1, y2);
            ctx.closePath();
            ctx.stroke();
        }
        else if (type === 'square') {
            ctx.strokeRect(x1, y1, x2 - x1, x2 - x1);
        }
        else if (type === 'octagon') {
            this.drawPolygon(ctx, 8, x1, y1, x2, y2);
        }
        else if (type === 'oval') {
            const radiusX = Math.abs(x2 - x1) / 2;
            const radiusY = Math.abs(y2 - y1) / 2;
            const centerX = (x1 + x2) / 2;
            const centerY = (y1 + y2) / 2;
            ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
            ctx.stroke();
        }
        else if (type === 'parallelogram') {
            const centerX = (x1 + x2) / 2;
            ctx.moveTo(centerX, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(centerX, y2);
            ctx.lineTo(x1, y1);
            ctx.closePath();
            ctx.stroke();
        }
        else if (type === 'image') {
            ctx.drawImage(this.shape.img, x1, y1, x2 - x1, y2 - y1);
        }
    }
    drawPolygon(ctx, sides, x1, y1, x2, y2) {
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
            }
            else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.stroke();
    }
    undo() {
        if (this.parameters.shapes.length > 0) {
            this.parameters.redoStack.push(this.parameters.shapes.pop());
            this.parameters.updateRedoStack(this.parameters.redoStack);
            this.drawShapes();
            this.parameters.socket.emit('updateBoardAction', { action: 'undo' }, this.handleServerResponse);
        }
    }
    redo() {
        if (this.parameters.redoStack.length > 0) {
            this.parameters.shapes.push(this.parameters.redoStack.pop());
            this.parameters.updateShapes(this.parameters.shapes);
            this.drawShapes();
            this.parameters.socket.emit('updateBoardAction', { action: 'redo' }, this.handleServerResponse);
        }
    }
    saveState() {
        this.parameters.undoStack.push(JSON.stringify(this.parameters.shapes));
        this.parameters.updateUndoStack(this.parameters.undoStack);
    }
    findShape(x, y) {
        return this.parameters.shapes.find((shape) => {
            if (shape.type === 'freehand') {
                return shape.points.some((point) => {
                    const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
                    return distance < shape.thickness;
                });
            }
            else if (shape.type === 'text') {
                const ctx = this.canvasRef.nativeElement.getContext('2d');
                ctx.font = `${shape.fontSize}px ${shape.font}`;
                const textMetrics = ctx.measureText(shape.text);
                return (x > shape.x &&
                    x < shape.x + textMetrics.width &&
                    y > shape.y - shape.fontSize &&
                    y < shape.y);
            }
            else if (shape.type === 'image') {
                return x > shape.x1 && x < shape.x2 && y > shape.y1 && y < shape.y2;
            }
            else {
                return x > shape.x1 && x < shape.x2 && y > shape.y1 && y < shape.y2;
            }
        });
    }
    drawSelection(shape) {
        const ctx = this.canvasRef.nativeElement.getContext('2d');
        if (!shape)
            return;
        const handles = this.getResizeHandles(shape);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 3]);
        if (shape.type === 'line') {
            ctx.beginPath();
            ctx.moveTo(shape.x1, shape.y1);
            ctx.lineTo(shape.x2, shape.y2);
            ctx.stroke();
        }
        else if (shape.type === 'circle') {
            const radius = Math.sqrt(Math.pow(shape.x2 - shape.x1, 2) + Math.pow(shape.y2 - shape.y1, 2));
            ctx.beginPath();
            ctx.arc(shape.x1, shape.y1, radius, 0, 2 * Math.PI);
            ctx.stroke();
        }
        else {
            ctx.strokeRect(shape.x1, shape.y1, shape.x2 - shape.x1, shape.y2 - shape.y1);
        }
        ctx.setLineDash([]);
        handles.forEach((handle) => {
            ctx.fillStyle = handle.isCenter ? 'blue' : 'red';
            ctx.fillRect(handle.x - 6, handle.y - 6, 12, 12);
        });
    }
    getResizeHandles(shape) {
        const handles = [];
        if (shape.type === 'line') {
            handles.push({ x: shape.x1, y: shape.y1 });
            handles.push({ x: shape.x2, y: shape.y2 });
        }
        else if (shape.type === 'circle') {
            const radius = Math.sqrt(Math.pow(shape.x2 - shape.x1, 2) + Math.pow(shape.y2 - shape.y1, 2));
            handles.push({ x: shape.x1 + radius, y: shape.y1 });
            handles.push({ x: shape.x1 - radius, y: shape.y1 });
            handles.push({ x: shape.x1, y: shape.y1 + radius });
            handles.push({ x: shape.x1, y: shape.y1 - radius });
            handles.push({ x: shape.x1, y: shape.y1, isCenter: true });
        }
        else if (shape.type === 'text') {
            const ctx = this.canvasRef.nativeElement.getContext('2d');
            const textMetrics = ctx.measureText(shape.text);
            handles.push({ x: shape.x, y: shape.y - shape.fontSize, isCenter: true });
            handles.push({ x: shape.x + textMetrics.width, y: shape.y, isCenter: false });
        }
        else if (shape.type === 'image') {
            handles.push({ x: shape.x1, y: shape.y1 });
            handles.push({ x: shape.x2, y: shape.y1 });
            handles.push({ x: shape.x2, y: shape.y2 });
            handles.push({ x: shape.x1, y: shape.y2 });
            handles.push({ x: (shape.x1 + shape.x2) / 2, y: (shape.y1 + shape.y2) / 2, isCenter: true });
        }
        else {
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
    getHandleAtPosition(x, y) {
        if (!this.selectedShape)
            return null;
        return this.getResizeHandles(this.selectedShape).find((handle) => {
            return Math.abs(handle.x - x) < 6 && Math.abs(handle.y - y) < 6;
        });
    }
    resizeShape(shape, handle, x, y) {
        if (shape.type === 'line') {
            if (handle.x === shape.x1 && handle.y === shape.y1) {
                shape.x1 = x;
                shape.y1 = y;
            }
            else {
                shape.x2 = x;
                shape.y2 = y;
            }
        }
        else if (shape.type === 'circle') {
            const dx = x - shape.x1;
            const dy = y - shape.y1;
            const radius = Math.sqrt(dx * dx + dy * dy);
            shape.x2 = shape.x1 + radius;
            shape.y2 = shape.y1;
        }
        else if (shape.type === 'text') {
            if (handle.isCenter) {
                shape.x = x;
                shape.y = y;
            }
            else {
                const textMetrics = this.canvasRef.nativeElement.getContext('2d').measureText(shape.text);
                shape.x = x - textMetrics.width;
                shape.y = y;
            }
        }
        else if (shape.type === 'image') {
            if (handle.isCenter) {
                const dx = x - (shape.x1 + shape.x2) / 2;
                const dy = y - (shape.y1 + shape.y2) / 2;
                this.moveShape(shape, dx, dy);
            }
            else {
                if (handle.x === shape.x1 && handle.y === shape.y1) {
                    shape.x1 = x;
                    shape.y1 = y;
                }
                else if (handle.x === shape.x2 && handle.y === shape.y1) {
                    shape.x2 = x;
                    shape.y1 = y;
                }
                else if (handle.x === shape.x2 && handle.y === shape.y2) {
                    shape.x2 = x;
                    shape.y2 = y;
                }
                else {
                    shape.x1 = x;
                    shape.y2 = y;
                }
            }
        }
        else {
            if (handle.isCenter) {
                const dx = x - (shape.x1 + shape.x2) / 2;
                const dy = y - (shape.y1 + shape.y2) / 2;
                this.moveShape(shape, dx, dy);
            }
            else {
                if (handle.x === shape.x1 && handle.y === shape.y1) {
                    shape.x1 = x;
                    shape.y1 = y;
                }
                else if (handle.x === shape.x2 && handle.y === shape.y1) {
                    shape.x2 = x;
                    shape.y1 = y;
                }
                else if (handle.x === shape.x2 && handle.y === shape.y2) {
                    shape.x2 = x;
                    shape.y2 = y;
                }
                else {
                    shape.x1 = x;
                    shape.y2 = y;
                }
            }
        }
        this.drawShapes();
    }
    moveShape(shape, dx, dy) {
        if (shape.type === 'line' || shape.type === 'circle') {
            shape.x1 += dx;
            shape.y1 += dy;
            shape.x2 += dx;
            shape.y2 += dy;
        }
        else if (shape.type === 'freehand') {
            shape.points.forEach((point) => {
                point.x += dx;
                point.y += dy;
            });
        }
        else if (shape.type === 'text') {
            shape.x += dx;
            shape.y += dy;
        }
        else if (shape.type === 'image') {
            shape.x1 += dx;
            shape.y1 += dy;
            shape.x2 += dx;
            shape.y2 += dy;
        }
        else {
            shape.x1 += dx;
            shape.y1 += dy;
            shape.x2 += dx;
            shape.y2 += dy;
        }
    }
    downloadCanvas(tempCanvas) {
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
                tempCtx.drawImage(backgroundImage, 0, 0, tempCanvas.width, tempCanvas.height);
                this.parameters.shapes.forEach((shape) => {
                    !notShapes.includes(shape.type)
                        ? this.drawShape(shape.type, shape.x1, shape.y1, shape.x2, shape.y2, shape.color, shape.thickness, shape.lineType, tempCtx)
                        : this.drawShapeOnCanvas(shape, tempCtx);
                });
                this.downloadCanvas(tempCanvas);
            };
            backgroundImage.src = 'https://mediasfu.com/images/svg/graph_paper.jpg';
        }
        else {
            tempCtx.fillStyle = 'white';
            tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
            this.parameters.shapes.forEach((shape) => {
                !notShapes.includes(shape.type)
                    ? this.drawShape(shape.type, shape.x1, shape.y1, shape.x2, shape.y2, shape.color, shape.thickness, shape.lineType, tempCtx)
                    : this.drawShapeOnCanvas(shape, tempCtx);
            });
            this.downloadCanvas(tempCanvas);
        }
    }
    drawShapeOnCanvas(shape, ctx = this.canvasRef.nativeElement.getContext('2d')) {
        ctx.beginPath();
        ctx.strokeStyle = shape.color;
        ctx.lineWidth = shape.thickness || 2;
        ctx.fillStyle = shape.color;
        ctx.font = `${shape.fontSize}px ${shape.fontFamily}`;
        const lineType = shape.lineType ? shape.lineType : 'solid';
        if (lineType === 'dashed') {
            ctx.setLineDash([10, 10]);
        }
        else if (lineType === 'dotted') {
            ctx.setLineDash([2, 10]);
        }
        else if (lineType === 'dashDot') {
            ctx.setLineDash([10, 5, 2, 5]);
        }
        else {
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
                    shape.points.forEach((point) => ctx.lineTo(point.x, point.y));
                }
                catch {
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
        if (!this.checkBoardAccess())
            return;
        if (!this.selectedShape)
            return;
        if (this.selectedShape) {
            this.parameters.shapes = this.parameters.shapes.filter((shape) => shape !== this.selectedShape);
            this.parameters.updateShapes(this.parameters.shapes);
            this.selectedShape = null;
            if (doEmits) {
                this.parameters.socket.emit('updateBoardAction', { action: 'shapes', payload: { shapes: this.parameters.shapes } }, this.handleServerResponse);
            }
            this.drawShapes();
        }
    }
    toggleBackground = (doEmits = true) => {
        if (doEmits && !this.checkBoardAccess())
            return;
        this.parameters.useImageBackground = !this.parameters.useImageBackground;
        this.parameters.updateUseImageBackground(this.parameters.useImageBackground);
        const toggleButton = this.toggleBackgroundRef.nativeElement;
        if (this.parameters.useImageBackground) {
            this.canvasRef.nativeElement.style.backgroundImage = `url('https://mediasfu.com/images/svg/graph_paper.jpg')`;
            toggleButton.classList.remove('active');
        }
        else {
            this.canvasRef.nativeElement.style.backgroundImage = 'none';
            this.canvasRef.nativeElement.style.backgroundColor = 'white';
            toggleButton.classList.add('active');
        }
        this.drawShapes();
        if (doEmits) {
            this.parameters.socket.emit('updateBoardAction', { action: 'toggleBackground', payload: this.parameters.useImageBackground }, this.handleServerResponse);
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
        if (this.parameters.shapes.length === 0)
            return;
        this.parameters.shapes = [];
        this.parameters.updateShapes([]);
        this.drawShapes();
        if (doEmits) {
            this.parameters.socket.emit('updateBoardAction', { action: 'clear' }, this.handleServerResponse);
        }
    };
    uploadImage = (event, doEmits = true) => {
        try {
            if (!this.checkBoardAccess())
                return;
            const file = event.target.files[0];
            if (file.size > 1024 * 1024) {
                this.parameters.showAlert?.({ message: 'File size must be less than 1MB', type: 'danger' });
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
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
                        this.parameters.socket.emit('updateBoardAction', { action: 'uploadImage', payload: imageShape }, this.handleServerResponse);
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
        }
        catch (error) {
            //console.log(error);
        }
    };
    handleServerResponse = (response) => {
        if (!response.success) {
            this.parameters.showAlert?.({
                message: `Whiteboard action failed: ${response.reason}`,
                type: 'danger',
            });
        }
    };
    WhiteboardAction = (data) => {
        const { action, payload } = data;
        const ctx = this.canvasRef.nativeElement.getContext('2d');
        if (!ctx)
            return;
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
                }
                else {
                    this.drawLine(payload.x1, payload.y1, payload.x2, payload.y2, payload.color, payload.thickness, payload.lineType);
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
                this.drawShape(payload.type, payload.x1, payload.y1, payload.x2, payload.y2, payload.color, payload.thickness, payload.lineType);
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
                    this.parameters.redoStack.push(this.parameters.shapes.pop());
                    this.parameters.updateRedoStack(this.parameters.redoStack);
                    this.drawShapes();
                }
                break;
            case 'redo':
                if (this.parameters.redoStack.length > 0) {
                    this.parameters.shapes.push(this.parameters.redoStack.pop());
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
                this.parameters.shapes = this.parameters.shapes.filter((shape) => shape !== payload);
                this.parameters.updateShapes(this.parameters.shapes);
                this.drawShapes();
                break;
            case 'shapes': {
                const oldShapes = this.parameters.shapes.filter((shape) => shape.type === 'image');
                this.parameters.shapes = payload.shapes.map((shape) => {
                    if (shape.type === 'image') {
                        const oldShape = oldShapes.find((oldShape) => oldShape.src === shape.src);
                        if (oldShape) {
                            return { ...shape, img: oldShape.img };
                        }
                        else {
                            const img = new Image();
                            img.crossOrigin = 'anonymous';
                            img.src = shape.src;
                            return { ...shape, img };
                        }
                    }
                    else {
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
    WhiteboardUpdated = (data) => {
        // data = { whiteboardUsers, status}
        // status = 'started', 'ended', 'updated'
        // whiteboardUsers array
        // members (participants) array only sent to the host
        //whiteboardData = {shapes=[], useImageBackground=Boolean, redoStack=[], undoStack=[]} or {} or null
        const ctx = this.canvasRef.nativeElement.getContext('2d');
        if (!ctx)
            return;
        if (this.parameters.islevel == '2' && data.members) {
            this.parameters.participantsAll = data.members.map((participant) => ({
                isBanned: participant.isBanned,
                name: participant.name,
            }));
            this.parameters.participants = data.members.filter((participant) => participant.isBanned == false);
            this.parameters.updateParticipants(this.parameters.participants);
        }
        this.parameters.whiteboardUsers = data.whiteboardUsers;
        this.parameters.updateWhiteboardUsers(this.parameters.whiteboardUsers);
        const useBoard = this.parameters.whiteboardUsers.find((user) => user.name == this.parameters.member && user.useBoard)
            ? true
            : false;
        if (this.parameters.islevel != '2' && !useBoard && !this.parameters.whiteboardEnded) {
            this.changeMode('pan');
        }
        if (data.whiteboardData && Object.keys(data.whiteboardData).length > 0) {
            if (data.whiteboardData.shapes) {
                const oldShapes = this.parameters.shapes.filter((shape) => shape.type === 'image');
                this.parameters.shapes = data.whiteboardData.shapes.map((shape) => {
                    if (shape.type === 'image') {
                        const oldShape = oldShapes.find((oldShape) => oldShape.src === shape.src);
                        if (oldShape) {
                            return { ...shape, img: oldShape.img };
                        }
                        else {
                            const img = new Image();
                            img.crossOrigin = 'anonymous';
                            img.src = shape.src;
                            return { ...shape, img };
                        }
                    }
                    else {
                        return shape;
                    }
                });
                this.parameters.updateShapes(this.parameters.shapes);
            }
            if (data.whiteboardData.useImageBackground != null) {
                this.parameters.useImageBackground = data.whiteboardData.useImageBackground;
                this.parameters.updateUseImageBackground(this.parameters.useImageBackground);
            }
            else {
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
        }
        else if (data.status == 'ended') {
            const prevWhiteboardEnded = this.parameters.whiteboardEnded;
            const prevWhiteboardStarted = this.parameters.whiteboardStarted;
            this.parameters.whiteboardEnded = true;
            this.parameters.whiteboardStarted = false;
            this.parameters.updateWhiteboardStarted(false);
            this.parameters.updateWhiteboardEnded(true);
            if (this.parameters.islevel == '2' && prevWhiteboardEnded) {
                // No operation needed
            }
            else {
                this.parameters.shareScreenStarted = false;
                this.parameters.screenId = '';
                this.parameters.updateShareScreenStarted(false);
                this.parameters.updateScreenId('');
                this.parameters.onScreenChanges({ changed: true, parameters: this.parameters });
            }
            try {
                if (prevWhiteboardStarted &&
                    this.parameters.islevel == '2' &&
                    (this.parameters.recordStarted || this.parameters.recordResumed)) {
                    if (!(this.parameters.recordPaused || this.parameters.recordStopped)) {
                        if (this.parameters.recordingMediaOptions == 'video') {
                            this.parameters.captureCanvasStream({ parameters: this.parameters, start: false });
                        }
                    }
                }
            }
            catch (error) {
                // Handle error
            }
        }
        else if (data.status == 'started' && this.parameters.whiteboardStarted) {
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
    handleDropdownClick(id) {
        this.dropdownOpen = this.dropdownOpen === id ? null : id;
    }
    handleItemClick(callback, name, value) {
        callback(value);
        this.dropdownOpen = null;
        if (['draw', 'freehand', 'shape', 'text', 'erase'].includes(name)) {
            this.changeMode(name);
        }
    }
    dropdownItems(items, name, callback) {
        return items.map((item, index) => `<button key="${index}" class="dropdown-item" (click)="handleItemClick(${callback}, '${name}', ${item.value})" style="padding: 5px;">
        ${item.label}
      </button>`);
    }
    toggleToolbar() {
        this.toolbarVisible = !this.toolbarVisible;
    }
    checkBoardAccess() {
        this.parameters = this.parameters.getUpdatedAllParams();
        if (this.parameters.whiteboardStarted && !this.parameters.whiteboardEnded) {
            const user = this.parameters.whiteboardUsers.find((user) => user.name === this.parameters.member);
            if ((!user || !user.useBoard) && this.parameters.islevel != '2') {
                this.parameters.showAlert?.({
                    message: 'You are not allowed to use the whiteboard. Please ask the host to assign you.',
                    type: 'danger',
                });
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }
    }
    changeMode(newMode) {
        if (newMode !== 'pan' && !this.checkBoardAccess())
            return;
        this.mode = newMode;
        const canvas = this.canvasRef.nativeElement;
        if (newMode === 'pan') {
            canvas.style.cursor = 'grab';
        }
        else if (newMode === 'select') {
            canvas.style.cursor = 'pointer';
        }
        else if (newMode === 'erase') {
            canvas.style.cursor = 'crosshair';
        }
        else {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: Whiteboard, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: Whiteboard, isStandalone: true, selector: "app-whiteboard", inputs: { customWidth: "customWidth", customHeight: "customHeight", parameters: "parameters", showAspect: "showAspect" }, viewQueries: [{ propertyName: "canvasRef", first: true, predicate: ["canvasRef"], descendants: true }, { propertyName: "textInputRef", first: true, predicate: ["textInputRef"], descendants: true }, { propertyName: "toggleBackgroundRef", first: true, predicate: ["toggleBackgroundRef"], descendants: true }, { propertyName: "downloadLinkRef", first: true, predicate: ["downloadLinkRef"], descendants: true }, { propertyName: "tempCanvasRef", first: true, predicate: ["tempCanvasRef"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div id=\"whiteboard-interface\" [style.width.px]=\"customWidth\" [style.height.px]=\"customHeight\" [style.display]=\"showAspect ? 'block' : 'none'\" style=\"position: relative; display: flex; justify-content: center; align-items: center; border: 2px solid #000; background-color: #f0f0f0;\">\r\n  <div id=\"whiteboardContent\" style=\"position: relative; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; max-width: 100%; max-height: 100%; overflow: auto;\">\r\n    <button id=\"toolbarToggle\" class=\"btn btnBoard btn-primary\" style=\"position: absolute; top: 5px; left: 55px; z-index: 10;\" (click)=\"toggleToolbar()\">\r\n      <fa-icon [icon]=\"toolbarVisible ? faChevronLeft : faChevronRight\"></fa-icon>\r\n    </button>\r\n    <div *ngIf=\"toolbarVisible\" class=\"toolbar mb-3\" id=\"toolbar\" style=\"position: absolute; top: 5px; left: 100px; z-index: 10; background-color: transparent;\">\r\n      <div class=\"btn-group\" role=\"group\">\r\n        <button class=\"btn btnBoard btn-secondary dropdown-toggle\" id=\"drawMode\" (click)=\"handleDropdownClick('drawMode')\">\r\n          <fa-icon [icon]=\"faPencilAlt\"></fa-icon>\r\n        </button>\r\n        <div *ngIf=\"dropdownOpen === 'drawMode'\" class=\"dropdown-menu show\">\r\n          <button *ngFor=\"let item of [{ label: 'XX-Small (3px)', value: 3 }, { label: 'X-Small (6px)', value: 6 }, { label: 'Small (12px)', value: 12 }, { label: 'Medium (18px)', value: 18 }, { label: 'Large (24px)', value: 24 }, { label: 'X-Large (36px)', value: 36 }]\" class=\"dropdown-item\" (click)=\"handleItemClick(updateLineThickness, 'draw', item.value)\" style=\"padding: 5px;\">\r\n            {{ item.label }}\r\n          </button>\r\n        </div>\r\n      </div>\r\n      <div class=\"btn-group\" role=\"group\">\r\n        <button class=\"btn btnBoard btn-secondary dropdown-toggle\" id=\"freehandMode\" (click)=\"handleDropdownClick('freehandMode')\">\r\n          <fa-icon [icon]=\"faPaintBrush\"></fa-icon>\r\n        </button>\r\n        <div *ngIf=\"dropdownOpen === 'freehandMode'\" class=\"dropdown-menu show\">\r\n          <button *ngFor=\"let item of [{ label: 'X-Small (5px)', value: 5 }, { label: 'Small (10px)', value: 10 }, { label: 'Medium (20px)', value: 20 }, { label: 'Large (40px)', value: 40 }, { label: 'X-Large (60px)', value: 60 }]\" class=\"dropdown-item\" (click)=\"handleItemClick(updateBrushThickness, 'freehand', item.value)\" style=\"padding: 5px;\">\r\n            {{ item.label }}\r\n          </button>\r\n        </div>\r\n      </div>\r\n      <div class=\"btn-group\" role=\"group\">\r\n        <button class=\"btn btnBoard btn-secondary dropdown-toggle\" id=\"shapeMode\" (click)=\"handleDropdownClick('shapeMode')\">\r\n          <fa-icon [icon]=\"faShapes\"></fa-icon>\r\n        </button>\r\n        <div *ngIf=\"dropdownOpen === 'shapeMode'\" class=\"dropdown-menu show\">\r\n          <button *ngFor=\"let item of [\r\n            { label: '<img src=\\'https://mediasfu.com/images/svg/square.svg\\' alt=\\'Square\\' class=\\'shape-icon\\' />', value: 'square' },\r\n            { label: '<img src=\\'https://mediasfu.com/images/svg/rectangle.svg\\' alt=\\'Rectangle\\' class=\\'shape-icon\\' />', value: 'rectangle' },\r\n            { label: '<img src=\\'https://mediasfu.com/images/svg/circle.svg\\' alt=\\'Circle\\' class=\\'shape-icon\\' />', value: 'circle' },\r\n            { label: '<img src=\\'https://mediasfu.com/images/svg/triangle.svg\\' alt=\\'Triangle\\' class=\\'shape-icon\\' />', value: 'triangle' },\r\n            { label: '<img src=\\'https://mediasfu.com/images/svg/hexagon.svg\\' alt=\\'Hexagon\\' class=\\'shape-icon\\' />', value: 'hexagon' },\r\n            { label: '<img src=\\'https://mediasfu.com/images/svg/pentagon.svg\\' alt=\\'Pentagon\\' class=\\'shape-icon\\' />', value: 'pentagon' },\r\n            { label: '<img src=\\'https://mediasfu.com/images/svg/rhombus.svg\\' alt=\\'Rhombus\\' class=\\'shape-icon\\' />', value: 'rhombus' },\r\n            { label: '<img src=\\'https://mediasfu.com/images/svg/octagon.svg\\' alt=\\'Octagon\\' class=\\'shape-icon\\' />', value: 'octagon' },\r\n            { label: '<img src=\\'https://mediasfu.com/images/svg/parallelogram.svg\\' alt=\\'Parallelogram\\' class=\\'shape-icon\\' />', value: 'parallelogram' },\r\n            { label: '<img src=\\'https://mediasfu.com/images/svg/oval.svg\\' alt=\\'Oval\\' class=\\'shape-icon\\' />', value: 'oval' }\r\n          ]\" class=\"dropdown-item\" (click)=\"handleItemClick(updateShape, 'shape', item.value)\" style=\"padding: 5px;\" [innerHTML]=\"item.label\">\r\n          </button>\r\n        </div>\r\n      </div>\r\n      <button class=\"btn btnBoard btn-secondary\" id=\"selectMode\" (click)=\"changeMode('select')\">\r\n        <fa-icon [icon]=\"faMousePointer\"></fa-icon>\r\n      </button>\r\n      <div class=\"btn-group\" role=\"group\">\r\n        <button class=\"btn btnBoard btn-danger dropdown-toggle\" id=\"eraseMode\" (click)=\"handleDropdownClick('eraseMode')\">\r\n          <fa-icon [icon]=\"faEraser\"></fa-icon>\r\n        </button>\r\n        <div *ngIf=\"dropdownOpen === 'eraseMode'\" class=\"dropdown-menu show\">\r\n          <button *ngFor=\"let item of [{ label: 'X-Small (5px)', value: 5 }, { label: 'Small (10px)', value: 10 }, { label: 'Medium (20px)', value: 20 }, { label: 'Large (30px)', value: 30 }, { label: 'X-Large (60px)', value: 60 }]\" class=\"dropdown-item\" (click)=\"handleItemClick(updateEraserThickness, 'erase', item.value)\" style=\"padding: 5px;\">\r\n            {{ item.label }}\r\n          </button>\r\n        </div>\r\n      </div>\r\n      <button class=\"btn btnBoard btn-info\" id=\"panMode\" (click)=\"changeMode('pan')\">\r\n        <fa-icon [icon]=\"faHandPaper\"></fa-icon>\r\n      </button>\r\n      <button class=\"btn btnBoard btn-success\" id=\"zoomIn\" (click)=\"zoomCanvas(1.2, $event)\">\r\n        <fa-icon [icon]=\"faSearchPlus\"></fa-icon>\r\n      </button>\r\n      <button class=\"btn btnBoard btn-success\" id=\"zoomReset\" (click)=\"zoomCanvas(10, $event)\">\r\n        <fa-icon [icon]=\"faSearch\"></fa-icon>\r\n      </button>\r\n      <button class=\"btn btnBoard btn-success\" id=\"zoomOut\" (click)=\"zoomCanvas(0.8, $event)\">\r\n        <fa-icon [icon]=\"faSearchMinus\"></fa-icon>\r\n      </button>\r\n      <div class=\"btn-group\" role=\"group\">\r\n        <button class=\"btn btnBoard btn-secondary dropdown-toggle\" id=\"addText\" (click)=\"handleDropdownClick('addText')\">\r\n          <fa-icon [icon]=\"faFont\"></fa-icon>\r\n        </button>\r\n        <div *ngIf=\"dropdownOpen === 'addText'\" class=\"dropdown-menu show\">\r\n          <button *ngFor=\"let item of [{ label: 'Arial', value: 'Arial' }, { label: 'Times New Roman', value: 'Times New Roman' }, { label: 'Courier New', value: 'Courier New' }, { label: 'Verdana', value: 'Verdana' }]\" class=\"dropdown-item\" (click)=\"handleItemClick(updateFont, 'text', item.value)\" style=\"padding: 5px;\">\r\n            {{ item.label }}\r\n          </button>\r\n        </div>\r\n      </div>\r\n      <div class=\"btn-group\" role=\"group\">\r\n        <button class=\"btn btnBoard btn-secondary dropdown-toggle\" id=\"fontSize\" (click)=\"handleDropdownClick('fontSize')\">\r\n          <fa-icon [icon]=\"faTextHeight\"></fa-icon>\r\n        </button>\r\n        <div *ngIf=\"dropdownOpen === 'fontSize'\" class=\"dropdown-menu show\">\r\n          <button *ngFor=\"let item of [{ label: 'X-Small (5px)', value: 5 }, { label: 'Small (10px)', value: 10 }, { label: 'Medium (20px)', value: 20 }, { label: 'Large (40px)', value: 40 }, { label: 'X-Large (60px)', value: 60 }]\" class=\"dropdown-item\" (click)=\"handleItemClick(updateFontSize, '', item.value)\" style=\"padding: 5px;\">\r\n            {{ item.label }}\r\n          </button>\r\n        </div>\r\n      </div>\r\n      <button class=\"btn btnBoard btn-secondary\" id=\"undo\" (click)=\"undo()\">\r\n        <fa-icon [icon]=\"faUndo\"></fa-icon>\r\n      </button>\r\n      <button class=\"btn btnBoard btn-secondary\" id=\"redo\" (click)=\"redo()\">\r\n        <fa-icon [icon]=\"faRedo\"></fa-icon>\r\n      </button>\r\n      <button class=\"btn btnBoard btn-secondary\" id=\"save\" (click)=\"saveCanvas()\">\r\n        <fa-icon [icon]=\"faSave\"></fa-icon>\r\n      </button>\r\n      <button class=\"btn btnBoard btn-danger\" id=\"delete\" (click)=\"deleteShape()\">\r\n        <fa-icon [icon]=\"faTrash\"></fa-icon>\r\n      </button>\r\n      <button class=\"btn btnBoard btn-secondary\" id=\"clearCanvas\" (click)=\"clearCanvas()\">\r\n        <fa-icon [icon]=\"faTimes\"></fa-icon>\r\n      </button>\r\n      <button id=\"toggleBackgroundRef\" #toggleBackgroundRef class=\"btn btnBoard btn-secondary\" (click)=\"toggleBackground()\">\r\n        <img src=\"https://mediasfu.com/images/svg/graph.jpg\" alt=\"Background\" class=\"toggle-icon\" id=\"backgroundIcon\" />\r\n      </button>\r\n      <input type=\"file\" id=\"uploadBoardImage\" accept=\"image/*\" style=\"display: none;\" (change)=\"uploadImage($event)\" />\r\n      <label for=\"uploadBoardImage\" class=\"btn btnBoard btn-primary\">\r\n        <fa-icon [icon]=\"faUpload\"></fa-icon>\r\n      </label>\r\n      <input type=\"color\" id=\"colorPicker\" class=\"btn\" [(ngModel)]=\"color\" />\r\n      <select id=\"lineTypePicker\" class=\"custom-select\" style=\"width: auto;\" [(ngModel)]=\"lineType\">\r\n        <option value=\"solid\">Solid</option>\r\n        <option value=\"dashed\">Dashed</option>\r\n        <option value=\"dotted\">Dotted</option>\r\n        <option value=\"dashDot\">Dash-Dot</option>\r\n      </select>\r\n    </div>\r\n    <canvas id=\"canvasRef\" width=\"1280\" height=\"720\" style=\"border: 2px solid red;\" #canvasRef></canvas>\r\n    <textarea id=\"textInputRef\" class=\"form-control\" #textInputRef style=\"display: none; position: absolute;\"></textarea>\r\n    <a href=\"#\" id=\"downloadLinkRef\" #downloadLinkRef style=\"display: none;\">Download</a>\r\n    <canvas id=\"tempCanvasRef\" #tempCanvasRef style=\"display: none;\"></canvas>\r\n  </div>\r\n</div>\r\n", styles: ["#whiteboardCanvas,#canvsRef{border:1px solid #000;cursor:crosshair;background-color:#fff}.resize-handle,.move-handle{width:8px;height:8px;background:red;position:absolute}.move-handle{background:#00f}#textInput,#textInputRef{display:none;position:absolute;z-index:10;width:200px}.shape-icon{width:20px!important;height:20px!important;color:#fff}.toolbar .btn-group button,.toolbar .dropdown-menu a{font-size:.8rem;padding:5px 10px;margin:0 2px;border-radius:4px;transition:background-color .2s}.toolbar .dropdown-menu a{background-color:transparent;color:#1b1a1a}.toolbar .btn-group button:hover,.toolbar .dropdown-menu a:hover{background-color:#e3e7eb}.toolbar .btn-group button.active{background-color:#454d55}.toolbarScreen .btn-group button,.toolbarScreen .dropdown-menu a{font-size:.8rem;padding:5px 10px;margin:0 2px;border-radius:4px;transition:background-color .2s;color:\"black\"}.toolbarScreen .btn-group button{background-color:#e3e7eb;border:none}.toolbarScreen .dropdown-menu a{background-color:transparent;color:#1b1a1a}.toolbarScreen .btn-group button:hover,.toolbarScreen .dropdown-menu a:hover{background-color:#d6d1d166;color:#000}.toolbarScreen .btn-group button.active{background-color:#454d55}#toolbarToggleScreen{background-color:#d6d1d166;border:\"1px solid black\"}#toolbar,#toolbarScreen{transition:display .3s ease-in-out}#toolbarToggle,#toolbarToggleScreen{cursor:pointer}#colorPicker,#colorPickerScreen{font-size:.8rem;padding:2px;width:32px;height:32px}#lineTypePicker{font-size:.8rem;padding:2px auto;width:32px;height:32px}.btnBoard{font-size:1rem;padding:2px;width:40px;height:40px;margin:2px}#lineTypePickerScreen{font-size:.8rem;padding:2px auto;width:32px;height:32px;background-color:#d6d1d166;color:#000}.toggle-icon{width:34px;height:34px;padding:0;margin:0}#toggleBackground.active{background-color:#fdfeff}.annotateScreenBtn{background-color:#2d2e2f!important;border:2px solid #000!important;color:green!important}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i3.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: Whiteboard, decorators: [{
            type: Component,
            args: [{ selector: 'app-whiteboard', standalone: true, encapsulation: ViewEncapsulation.None, imports: [CommonModule, FormsModule, FontAwesomeModule], template: "<div id=\"whiteboard-interface\" [style.width.px]=\"customWidth\" [style.height.px]=\"customHeight\" [style.display]=\"showAspect ? 'block' : 'none'\" style=\"position: relative; display: flex; justify-content: center; align-items: center; border: 2px solid #000; background-color: #f0f0f0;\">\r\n  <div id=\"whiteboardContent\" style=\"position: relative; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; max-width: 100%; max-height: 100%; overflow: auto;\">\r\n    <button id=\"toolbarToggle\" class=\"btn btnBoard btn-primary\" style=\"position: absolute; top: 5px; left: 55px; z-index: 10;\" (click)=\"toggleToolbar()\">\r\n      <fa-icon [icon]=\"toolbarVisible ? faChevronLeft : faChevronRight\"></fa-icon>\r\n    </button>\r\n    <div *ngIf=\"toolbarVisible\" class=\"toolbar mb-3\" id=\"toolbar\" style=\"position: absolute; top: 5px; left: 100px; z-index: 10; background-color: transparent;\">\r\n      <div class=\"btn-group\" role=\"group\">\r\n        <button class=\"btn btnBoard btn-secondary dropdown-toggle\" id=\"drawMode\" (click)=\"handleDropdownClick('drawMode')\">\r\n          <fa-icon [icon]=\"faPencilAlt\"></fa-icon>\r\n        </button>\r\n        <div *ngIf=\"dropdownOpen === 'drawMode'\" class=\"dropdown-menu show\">\r\n          <button *ngFor=\"let item of [{ label: 'XX-Small (3px)', value: 3 }, { label: 'X-Small (6px)', value: 6 }, { label: 'Small (12px)', value: 12 }, { label: 'Medium (18px)', value: 18 }, { label: 'Large (24px)', value: 24 }, { label: 'X-Large (36px)', value: 36 }]\" class=\"dropdown-item\" (click)=\"handleItemClick(updateLineThickness, 'draw', item.value)\" style=\"padding: 5px;\">\r\n            {{ item.label }}\r\n          </button>\r\n        </div>\r\n      </div>\r\n      <div class=\"btn-group\" role=\"group\">\r\n        <button class=\"btn btnBoard btn-secondary dropdown-toggle\" id=\"freehandMode\" (click)=\"handleDropdownClick('freehandMode')\">\r\n          <fa-icon [icon]=\"faPaintBrush\"></fa-icon>\r\n        </button>\r\n        <div *ngIf=\"dropdownOpen === 'freehandMode'\" class=\"dropdown-menu show\">\r\n          <button *ngFor=\"let item of [{ label: 'X-Small (5px)', value: 5 }, { label: 'Small (10px)', value: 10 }, { label: 'Medium (20px)', value: 20 }, { label: 'Large (40px)', value: 40 }, { label: 'X-Large (60px)', value: 60 }]\" class=\"dropdown-item\" (click)=\"handleItemClick(updateBrushThickness, 'freehand', item.value)\" style=\"padding: 5px;\">\r\n            {{ item.label }}\r\n          </button>\r\n        </div>\r\n      </div>\r\n      <div class=\"btn-group\" role=\"group\">\r\n        <button class=\"btn btnBoard btn-secondary dropdown-toggle\" id=\"shapeMode\" (click)=\"handleDropdownClick('shapeMode')\">\r\n          <fa-icon [icon]=\"faShapes\"></fa-icon>\r\n        </button>\r\n        <div *ngIf=\"dropdownOpen === 'shapeMode'\" class=\"dropdown-menu show\">\r\n          <button *ngFor=\"let item of [\r\n            { label: '<img src=\\'https://mediasfu.com/images/svg/square.svg\\' alt=\\'Square\\' class=\\'shape-icon\\' />', value: 'square' },\r\n            { label: '<img src=\\'https://mediasfu.com/images/svg/rectangle.svg\\' alt=\\'Rectangle\\' class=\\'shape-icon\\' />', value: 'rectangle' },\r\n            { label: '<img src=\\'https://mediasfu.com/images/svg/circle.svg\\' alt=\\'Circle\\' class=\\'shape-icon\\' />', value: 'circle' },\r\n            { label: '<img src=\\'https://mediasfu.com/images/svg/triangle.svg\\' alt=\\'Triangle\\' class=\\'shape-icon\\' />', value: 'triangle' },\r\n            { label: '<img src=\\'https://mediasfu.com/images/svg/hexagon.svg\\' alt=\\'Hexagon\\' class=\\'shape-icon\\' />', value: 'hexagon' },\r\n            { label: '<img src=\\'https://mediasfu.com/images/svg/pentagon.svg\\' alt=\\'Pentagon\\' class=\\'shape-icon\\' />', value: 'pentagon' },\r\n            { label: '<img src=\\'https://mediasfu.com/images/svg/rhombus.svg\\' alt=\\'Rhombus\\' class=\\'shape-icon\\' />', value: 'rhombus' },\r\n            { label: '<img src=\\'https://mediasfu.com/images/svg/octagon.svg\\' alt=\\'Octagon\\' class=\\'shape-icon\\' />', value: 'octagon' },\r\n            { label: '<img src=\\'https://mediasfu.com/images/svg/parallelogram.svg\\' alt=\\'Parallelogram\\' class=\\'shape-icon\\' />', value: 'parallelogram' },\r\n            { label: '<img src=\\'https://mediasfu.com/images/svg/oval.svg\\' alt=\\'Oval\\' class=\\'shape-icon\\' />', value: 'oval' }\r\n          ]\" class=\"dropdown-item\" (click)=\"handleItemClick(updateShape, 'shape', item.value)\" style=\"padding: 5px;\" [innerHTML]=\"item.label\">\r\n          </button>\r\n        </div>\r\n      </div>\r\n      <button class=\"btn btnBoard btn-secondary\" id=\"selectMode\" (click)=\"changeMode('select')\">\r\n        <fa-icon [icon]=\"faMousePointer\"></fa-icon>\r\n      </button>\r\n      <div class=\"btn-group\" role=\"group\">\r\n        <button class=\"btn btnBoard btn-danger dropdown-toggle\" id=\"eraseMode\" (click)=\"handleDropdownClick('eraseMode')\">\r\n          <fa-icon [icon]=\"faEraser\"></fa-icon>\r\n        </button>\r\n        <div *ngIf=\"dropdownOpen === 'eraseMode'\" class=\"dropdown-menu show\">\r\n          <button *ngFor=\"let item of [{ label: 'X-Small (5px)', value: 5 }, { label: 'Small (10px)', value: 10 }, { label: 'Medium (20px)', value: 20 }, { label: 'Large (30px)', value: 30 }, { label: 'X-Large (60px)', value: 60 }]\" class=\"dropdown-item\" (click)=\"handleItemClick(updateEraserThickness, 'erase', item.value)\" style=\"padding: 5px;\">\r\n            {{ item.label }}\r\n          </button>\r\n        </div>\r\n      </div>\r\n      <button class=\"btn btnBoard btn-info\" id=\"panMode\" (click)=\"changeMode('pan')\">\r\n        <fa-icon [icon]=\"faHandPaper\"></fa-icon>\r\n      </button>\r\n      <button class=\"btn btnBoard btn-success\" id=\"zoomIn\" (click)=\"zoomCanvas(1.2, $event)\">\r\n        <fa-icon [icon]=\"faSearchPlus\"></fa-icon>\r\n      </button>\r\n      <button class=\"btn btnBoard btn-success\" id=\"zoomReset\" (click)=\"zoomCanvas(10, $event)\">\r\n        <fa-icon [icon]=\"faSearch\"></fa-icon>\r\n      </button>\r\n      <button class=\"btn btnBoard btn-success\" id=\"zoomOut\" (click)=\"zoomCanvas(0.8, $event)\">\r\n        <fa-icon [icon]=\"faSearchMinus\"></fa-icon>\r\n      </button>\r\n      <div class=\"btn-group\" role=\"group\">\r\n        <button class=\"btn btnBoard btn-secondary dropdown-toggle\" id=\"addText\" (click)=\"handleDropdownClick('addText')\">\r\n          <fa-icon [icon]=\"faFont\"></fa-icon>\r\n        </button>\r\n        <div *ngIf=\"dropdownOpen === 'addText'\" class=\"dropdown-menu show\">\r\n          <button *ngFor=\"let item of [{ label: 'Arial', value: 'Arial' }, { label: 'Times New Roman', value: 'Times New Roman' }, { label: 'Courier New', value: 'Courier New' }, { label: 'Verdana', value: 'Verdana' }]\" class=\"dropdown-item\" (click)=\"handleItemClick(updateFont, 'text', item.value)\" style=\"padding: 5px;\">\r\n            {{ item.label }}\r\n          </button>\r\n        </div>\r\n      </div>\r\n      <div class=\"btn-group\" role=\"group\">\r\n        <button class=\"btn btnBoard btn-secondary dropdown-toggle\" id=\"fontSize\" (click)=\"handleDropdownClick('fontSize')\">\r\n          <fa-icon [icon]=\"faTextHeight\"></fa-icon>\r\n        </button>\r\n        <div *ngIf=\"dropdownOpen === 'fontSize'\" class=\"dropdown-menu show\">\r\n          <button *ngFor=\"let item of [{ label: 'X-Small (5px)', value: 5 }, { label: 'Small (10px)', value: 10 }, { label: 'Medium (20px)', value: 20 }, { label: 'Large (40px)', value: 40 }, { label: 'X-Large (60px)', value: 60 }]\" class=\"dropdown-item\" (click)=\"handleItemClick(updateFontSize, '', item.value)\" style=\"padding: 5px;\">\r\n            {{ item.label }}\r\n          </button>\r\n        </div>\r\n      </div>\r\n      <button class=\"btn btnBoard btn-secondary\" id=\"undo\" (click)=\"undo()\">\r\n        <fa-icon [icon]=\"faUndo\"></fa-icon>\r\n      </button>\r\n      <button class=\"btn btnBoard btn-secondary\" id=\"redo\" (click)=\"redo()\">\r\n        <fa-icon [icon]=\"faRedo\"></fa-icon>\r\n      </button>\r\n      <button class=\"btn btnBoard btn-secondary\" id=\"save\" (click)=\"saveCanvas()\">\r\n        <fa-icon [icon]=\"faSave\"></fa-icon>\r\n      </button>\r\n      <button class=\"btn btnBoard btn-danger\" id=\"delete\" (click)=\"deleteShape()\">\r\n        <fa-icon [icon]=\"faTrash\"></fa-icon>\r\n      </button>\r\n      <button class=\"btn btnBoard btn-secondary\" id=\"clearCanvas\" (click)=\"clearCanvas()\">\r\n        <fa-icon [icon]=\"faTimes\"></fa-icon>\r\n      </button>\r\n      <button id=\"toggleBackgroundRef\" #toggleBackgroundRef class=\"btn btnBoard btn-secondary\" (click)=\"toggleBackground()\">\r\n        <img src=\"https://mediasfu.com/images/svg/graph.jpg\" alt=\"Background\" class=\"toggle-icon\" id=\"backgroundIcon\" />\r\n      </button>\r\n      <input type=\"file\" id=\"uploadBoardImage\" accept=\"image/*\" style=\"display: none;\" (change)=\"uploadImage($event)\" />\r\n      <label for=\"uploadBoardImage\" class=\"btn btnBoard btn-primary\">\r\n        <fa-icon [icon]=\"faUpload\"></fa-icon>\r\n      </label>\r\n      <input type=\"color\" id=\"colorPicker\" class=\"btn\" [(ngModel)]=\"color\" />\r\n      <select id=\"lineTypePicker\" class=\"custom-select\" style=\"width: auto;\" [(ngModel)]=\"lineType\">\r\n        <option value=\"solid\">Solid</option>\r\n        <option value=\"dashed\">Dashed</option>\r\n        <option value=\"dotted\">Dotted</option>\r\n        <option value=\"dashDot\">Dash-Dot</option>\r\n      </select>\r\n    </div>\r\n    <canvas id=\"canvasRef\" width=\"1280\" height=\"720\" style=\"border: 2px solid red;\" #canvasRef></canvas>\r\n    <textarea id=\"textInputRef\" class=\"form-control\" #textInputRef style=\"display: none; position: absolute;\"></textarea>\r\n    <a href=\"#\" id=\"downloadLinkRef\" #downloadLinkRef style=\"display: none;\">Download</a>\r\n    <canvas id=\"tempCanvasRef\" #tempCanvasRef style=\"display: none;\"></canvas>\r\n  </div>\r\n</div>\r\n", styles: ["#whiteboardCanvas,#canvsRef{border:1px solid #000;cursor:crosshair;background-color:#fff}.resize-handle,.move-handle{width:8px;height:8px;background:red;position:absolute}.move-handle{background:#00f}#textInput,#textInputRef{display:none;position:absolute;z-index:10;width:200px}.shape-icon{width:20px!important;height:20px!important;color:#fff}.toolbar .btn-group button,.toolbar .dropdown-menu a{font-size:.8rem;padding:5px 10px;margin:0 2px;border-radius:4px;transition:background-color .2s}.toolbar .dropdown-menu a{background-color:transparent;color:#1b1a1a}.toolbar .btn-group button:hover,.toolbar .dropdown-menu a:hover{background-color:#e3e7eb}.toolbar .btn-group button.active{background-color:#454d55}.toolbarScreen .btn-group button,.toolbarScreen .dropdown-menu a{font-size:.8rem;padding:5px 10px;margin:0 2px;border-radius:4px;transition:background-color .2s;color:\"black\"}.toolbarScreen .btn-group button{background-color:#e3e7eb;border:none}.toolbarScreen .dropdown-menu a{background-color:transparent;color:#1b1a1a}.toolbarScreen .btn-group button:hover,.toolbarScreen .dropdown-menu a:hover{background-color:#d6d1d166;color:#000}.toolbarScreen .btn-group button.active{background-color:#454d55}#toolbarToggleScreen{background-color:#d6d1d166;border:\"1px solid black\"}#toolbar,#toolbarScreen{transition:display .3s ease-in-out}#toolbarToggle,#toolbarToggleScreen{cursor:pointer}#colorPicker,#colorPickerScreen{font-size:.8rem;padding:2px;width:32px;height:32px}#lineTypePicker{font-size:.8rem;padding:2px auto;width:32px;height:32px}.btnBoard{font-size:1rem;padding:2px;width:40px;height:40px;margin:2px}#lineTypePickerScreen{font-size:.8rem;padding:2px auto;width:32px;height:32px;background-color:#d6d1d166;color:#000}.toggle-icon{width:34px;height:34px;padding:0;margin:0}#toggleBackground.active{background-color:#fdfeff}.annotateScreenBtn{background-color:#2d2e2f!important;border:2px solid #000!important;color:green!important}\n"] }]
        }], propDecorators: { customWidth: [{
                type: Input
            }], customHeight: [{
                type: Input
            }], parameters: [{
                type: Input
            }], showAspect: [{
                type: Input
            }], canvasRef: [{
                type: ViewChild,
                args: ['canvasRef', { static: false }]
            }], textInputRef: [{
                type: ViewChild,
                args: ['textInputRef', { static: false }]
            }], toggleBackgroundRef: [{
                type: ViewChild,
                args: ['toggleBackgroundRef', { static: false }]
            }], downloadLinkRef: [{
                type: ViewChild,
                args: ['downloadLinkRef', { static: false }]
            }], tempCanvasRef: [{
                type: ViewChild,
                args: ['tempCanvasRef', { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hpdGVib2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy93aGl0ZWJvYXJkLWNvbXBvbmVudHMvd2hpdGVib2FyZC93aGl0ZWJvYXJkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL3doaXRlYm9hcmQtY29tcG9uZW50cy93aGl0ZWJvYXJkL3doaXRlYm9hcmQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNkRBQTZEO0FBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJQRztBQUNILE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQUdMLFNBQVMsRUFDVCxpQkFBaUIsR0FHbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQ0wsT0FBTyxFQUNQLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxFQUNSLFFBQVEsRUFDUixjQUFjLEVB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SUFBSSxLQUFLLE1BQU0sRUFBRSxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3QyxDQUFDO2FBQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQ25DLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5RixPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNwRCxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNwRCxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUNwRCxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUNwRCxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDN0QsQ0FBQzthQUFNLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUUsQ0FBQztZQUNqQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUQsTUFBTSxXQUFXLEdBQUcsR0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDMUUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDaEYsQ0FBQzthQUFNLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUUsQ0FBQztZQUNsQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQy9GLENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcs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O2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRXFDLFNBQVM7c0JBQW5ELFNBQVM7dUJBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFDSyxZQUFZO3NCQUF6RCxTQUFTO3VCQUFDLGNBQWMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBRTVDLG1CQUFtQjtzQkFEbEIsU0FBUzt1QkFBQyxxQkFBcUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBRUYsZUFBZTtzQkFBL0QsU0FBUzt1QkFBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBQ0EsYUFBYTtzQkFBM0QsU0FBUzt1QkFBQyxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvbiAqL1xuLyoqXG4gKiBXaGl0ZWJvYXJkIGNvbXBvbmVudCBmb3IgZHJhd2luZyBhbmQgbWFuaXB1bGF0aW5nIHNoYXBlcywgdGV4dCwgYW5kIGltYWdlcyBvbiBhIGNhbnZhcy5cbiAqXG4gKiBAY29tcG9uZW50XG4gKiBAc2VsZWN0b3IgYXBwLXdoaXRlYm9hcmRcbiAqIEB0ZW1wbGF0ZVVybCAuL3doaXRlYm9hcmQuY29tcG9uZW50Lmh0bWxcbiAqIEBzdHlsZVVybHMgLi93aGl0ZWJvYXJkLmNvbXBvbmVudC5jc3NcbiAqIEBlbmNhcHN1bGF0aW9uIFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbiAqIEBpbXBvcnRzIFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZV1cbiAqXG4gKiBAY2xhc3MgV2hpdGVib2FyZFxuICogQGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlc1xuICpcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjdXN0b21XaWR0aCAtIEN1c3RvbSB3aWR0aCBmb3IgdGhlIHdoaXRlYm9hcmQuXG4gKiBAcHJvcGVydHkge251bWJlcn0gY3VzdG9tSGVpZ2h0IC0gQ3VzdG9tIGhlaWdodCBmb3IgdGhlIHdoaXRlYm9hcmQuXG4gKiBAcHJvcGVydHkge1doaXRlYm9hcmRQYXJhbWV0ZXJzfSBwYXJhbWV0ZXJzIC0gUGFyYW1ldGVycyBmb3IgdGhlIHdoaXRlYm9hcmQuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHNob3dBc3BlY3QgLSBGbGFnIHRvIHNob3cgYXNwZWN0IHJhdGlvLlxuICpcbiAqIEBwcm9wZXJ0eSB7RWxlbWVudFJlZjxIVE1MQ2FudmFzRWxlbWVudD59IGNhbnZhc1JlZiAtIFJlZmVyZW5jZSB0byB0aGUgY2FudmFzIGVsZW1lbnQuXG4gKiBAcHJvcGVydHkge0VsZW1lbnRSZWY8SFRNTFRleHRBcmVhRWxlbWVudD59IHRleHRJbnB1dFJlZiAtIFJlZmVyZW5jZSB0byB0aGUgdGV4dCBpbnB1dCBlbGVtZW50LlxuICogQHByb3BlcnR5IHtFbGVtZW50UmVmPEhUTUxCdXR0b25FbGVtZW50Pn0gdG9nZ2xlQmFja2dyb3VuZFJlZiAtIFJlZmVyZW5jZSB0byB0aGUgdG9nZ2xlIGJhY2tncm91bmQgYnV0dG9uIGVsZW1lbnQuXG4gKiBAcHJvcGVydHkge0VsZW1lbnRSZWY8SFRNTEFuY2hvckVsZW1lbnQ+fSBkb3dubG9hZExpbmtSZWYgLSBSZWZlcmVuY2UgdG8gdGhlIGRvd25sb2FkIGxpbmsgZWxlbWVudC5cbiAqIEBwcm9wZXJ0eSB7RWxlbWVudFJlZjxIVE1MQ2FudmFzRWxlbWVudD59IHRlbXBDYW52YXNSZWYgLSBSZWZlcmVuY2UgdG8gdGhlIHRlbXBvcmFyeSBjYW52YXMgZWxlbWVudC5cbiAqXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVRpbWVzIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgdGltZXMuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVVuZG8gLSBGb250QXdlc29tZSBpY29uIGZvciB1bmRvLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFSZWRvIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgcmVkby5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhRXJhc2VyIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgZXJhc2VyLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFTaGFwZXMgLSBGb250QXdlc29tZSBpY29uIGZvciBzaGFwZXMuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYU1vdXNlUG9pbnRlciAtIEZvbnRBd2Vzb21lIGljb24gZm9yIG1vdXNlIHBvaW50ZXIuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYUhhbmRQYXBlciAtIEZvbnRBd2Vzb21lIGljb24gZm9yIGhhbmQgcGFwZXIuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVRleHRIZWlnaHQgLSBGb250QXdlc29tZSBpY29uIGZvciB0ZXh0IGhlaWdodC5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhRm9udCAtIEZvbnRBd2Vzb21lIGljb24gZm9yIGZvbnQuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVBlbmNpbEFsdCAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHBlbmNpbCBhbHQuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVBhaW50QnJ1c2ggLSBGb250QXdlc29tZSBpY29uIGZvciBwYWludCBicnVzaC5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhVHJhc2ggLSBGb250QXdlc29tZSBpY29uIGZvciB0cmFzaC5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhU2F2ZSAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHNhdmUuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVNlYXJjaCAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHNlYXJjaC5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhU2VhcmNoTWludXMgLSBGb250QXdlc29tZSBpY29uIGZvciBzZWFyY2ggbWludXMuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVNlYXJjaFBsdXMgLSBGb250QXdlc29tZSBpY29uIGZvciBzZWFyY2ggcGx1cy5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhQ2hldnJvbkxlZnQgLSBGb250QXdlc29tZSBpY29uIGZvciBjaGV2cm9uIGxlZnQuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVVwbG9hZCAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHVwbG9hZC5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhQ2hldnJvblJpZ2h0IC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgY2hldnJvbiByaWdodC5cbiAqXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbW9kZSAtIEN1cnJlbnQgbW9kZSBvZiB0aGUgd2hpdGVib2FyZCAoZS5nLiwgJ3BhbicsICdkcmF3JywgJ2VyYXNlJykuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGlzRHJhd2luZyAtIEZsYWcgaW5kaWNhdGluZyBpZiBkcmF3aW5nIGlzIGluIHByb2dyZXNzLlxuICogQHByb3BlcnR5IHtib29sZWFufSBpc1Bhbm5pbmcgLSBGbGFnIGluZGljYXRpbmcgaWYgcGFubmluZyBpcyBpbiBwcm9ncmVzcy5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNEcmFnZ2luZyAtIEZsYWcgaW5kaWNhdGluZyBpZiBkcmFnZ2luZyBpcyBpbiBwcm9ncmVzcy5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzdGFydFggLSBTdGFydGluZyBYIGNvb3JkaW5hdGUgZm9yIGRyYXdpbmcuXG4gKiBAcHJvcGVydHkge251bWJlcn0gc3RhcnRZIC0gU3RhcnRpbmcgWSBjb29yZGluYXRlIGZvciBkcmF3aW5nLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGN1cnJlbnRYIC0gQ3VycmVudCBYIGNvb3JkaW5hdGUgZm9yIGRyYXdpbmcuXG4gKiBAcHJvcGVydHkge251bWJlcn0gY3VycmVudFkgLSBDdXJyZW50IFkgY29vcmRpbmF0ZSBmb3IgZHJhd2luZy5cbiAqIEBwcm9wZXJ0eSB7YW55W119IGZyZWVoYW5kRHJhd2luZyAtIEFycmF5IG9mIHBvaW50cyBmb3IgZnJlZWhhbmQgZHJhd2luZy5cbiAqIEBwcm9wZXJ0eSB7YW55fSBzZWxlY3RlZFNoYXBlIC0gQ3VycmVudGx5IHNlbGVjdGVkIHNoYXBlLlxuICogQHByb3BlcnR5IHthbnl9IHNlbGVjdGVkSGFuZGxlIC0gQ3VycmVudGx5IHNlbGVjdGVkIGhhbmRsZSBmb3IgcmVzaXppbmcgc2hhcGVzLlxuICogQHByb3BlcnR5IHtib29sZWFufSBtb3ZpbmdTaGFwZSAtIEZsYWcgaW5kaWNhdGluZyBpZiBhIHNoYXBlIGlzIGJlaW5nIG1vdmVkLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IHBhblggLSBYIGNvb3JkaW5hdGUgZm9yIHBhbm5pbmcuXG4gKiBAcHJvcGVydHkge251bWJlcn0gcGFuWSAtIFkgY29vcmRpbmF0ZSBmb3IgcGFubmluZy5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzY2FsZSAtIEN1cnJlbnQgc2NhbGUgb2YgdGhlIGNhbnZhcy5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBtaW5TY2FsZSAtIE1pbmltdW0gc2NhbGUgb2YgdGhlIGNhbnZhcy5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBtYXhTY2FsZSAtIE1heGltdW0gc2NhbGUgb2YgdGhlIGNhbnZhcy5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBlcmFzZXJUaGlja25lc3MgLSBUaGlja25lc3Mgb2YgdGhlIGVyYXNlci5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBicnVzaFRoaWNrbmVzcyAtIFRoaWNrbmVzcyBvZiB0aGUgYnJ1c2guXG4gKiBAcHJvcGVydHkge251bWJlcn0gbGluZVRoaWNrbmVzcyAtIFRoaWNrbmVzcyBvZiB0aGUgbGluZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBsaW5lVHlwZSAtIFR5cGUgb2YgdGhlIGxpbmUgKGUuZy4sICdzb2xpZCcsICdkYXNoZWQnKS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjb2xvciAtIEN1cnJlbnQgY29sb3IgZm9yIGRyYXdpbmcuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZm9udCAtIEN1cnJlbnQgZm9udCBmb3IgdGV4dC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBmb250U2l6ZSAtIEN1cnJlbnQgZm9udCBzaXplIGZvciB0ZXh0LlxuICogQHByb3BlcnR5IHthbnl9IHNoYXBlIC0gQ3VycmVudCBzaGFwZSBiZWluZyBkcmF3bi5cbiAqIEBwcm9wZXJ0eSB7SFRNTEltYWdlRWxlbWVudH0gYmFja2dyb3VuZEltYWdlIC0gQmFja2dyb3VuZCBpbWFnZSBmb3IgdGhlIGNhbnZhcy5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gdG9vbGJhclZpc2libGUgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHRvb2xiYXIgaXMgdmlzaWJsZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nIHwgbnVsbH0gZHJvcGRvd25PcGVuIC0gQ3VycmVudGx5IG9wZW4gZHJvcGRvd24gbWVudS5cbiAqIEBwcm9wZXJ0eSB7eyBjbGllbnRYOiBudW1iZXIsIGNsaWVudFk6IG51bWJlciwgb2Zmc2V0WDogbnVtYmVyLCBvZmZzZXRZOiBudW1iZXIgfSB8IG51bGx9IGN1cnJlbnRDbGlja1Bvc2l0aW9uIC0gQ3VycmVudCBjbGljayBwb3NpdGlvbiBvbiB0aGUgY2FudmFzLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IG1heFdpZHRoIC0gTWF4aW11bSB3aWR0aCBvZiB0aGUgY2FudmFzLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IG1heEhlaWdodCAtIE1heGltdW0gaGVpZ2h0IG9mIHRoZSBjYW52YXMuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGRpbWVuc2lvbnNGaXhlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgY2FudmFzIGRpbWVuc2lvbnMgYXJlIGZpeGVkLlxuICpcbiAqIEBtZXRob2QgdXBkYXRlTGluZVRoaWNrbmVzcyAtIFVwZGF0ZXMgdGhlIHRoaWNrbmVzcyBvZiB0aGUgbGluZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSB0aGlja25lc3MgLSBOZXcgdGhpY2tuZXNzIGZvciB0aGUgbGluZS5cbiAqXG4gKiBAbWV0aG9kIHVwZGF0ZUJydXNoVGhpY2tuZXNzIC0gVXBkYXRlcyB0aGUgdGhpY2tuZXNzIG9mIHRoZSBicnVzaC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB0aGlja25lc3MgLSBOZXcgdGhpY2tuZXNzIGZvciB0aGUgYnJ1c2guXG4gKlxuICogQG1ldGhvZCB1cGRhdGVFcmFzZXJUaGlja25lc3MgLSBVcGRhdGVzIHRoZSB0aGlja25lc3Mgb2YgdGhlIGVyYXNlci5cbiAqIEBwYXJhbSB7bnVtYmVyfSB0aGlja25lc3MgLSBOZXcgdGhpY2tuZXNzIGZvciB0aGUgZXJhc2VyLlxuICpcbiAqIEBtZXRob2QgdXBkYXRlQ29sb3IgLSBVcGRhdGVzIHRoZSBjb2xvciBmb3IgZHJhd2luZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvciAtIE5ldyBjb2xvciBmb3IgZHJhd2luZy5cbiAqXG4gKiBAbWV0aG9kIHVwZGF0ZUZvbnQgLSBVcGRhdGVzIHRoZSBmb250IGZvciB0ZXh0LlxuICogQHBhcmFtIHtzdHJpbmd9IGZvbnQgLSBOZXcgZm9udCBmb3IgdGV4dC5cbiAqXG4gKiBAbWV0aG9kIHVwZGF0ZUZvbnRTaXplIC0gVXBkYXRlcyB0aGUgZm9udCBzaXplIGZvciB0ZXh0LlxuICogQHBhcmFtIHtudW1iZXJ9IGZvbnRTaXplIC0gTmV3IGZvbnQgc2l6ZSBmb3IgdGV4dC5cbiAqXG4gKiBAbWV0aG9kIHVwZGF0ZVNoYXBlIC0gVXBkYXRlcyB0aGUgc2hhcGUgYmVpbmcgZHJhd24uXG4gKiBAcGFyYW0ge3N0cmluZ30gc2hhcGUgLSBOZXcgc2hhcGUgdG8gYmUgZHJhd24uXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKlxuICogQG1ldGhvZCBuZ09uSW5pdCAtIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIGFmdGVyIGRhdGEtYm91bmQgcHJvcGVydGllcyBhcmUgaW5pdGlhbGl6ZWQuXG4gKlxuICogQG1ldGhvZCBuZ09uQ2hhbmdlcyAtIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIHdoZW4gYW55IGRhdGEtYm91bmQgcHJvcGVydHkgb2YgYSBkaXJlY3RpdmUgY2hhbmdlcy5cbiAqIEBwYXJhbSB7U2ltcGxlQ2hhbmdlc30gY2hhbmdlcyAtIE9iamVjdCBvZiBjaGFuZ2VzLlxuICpcbiAqIEBtZXRob2QgbmdPbkRlc3Ryb3kgLSBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCB3aGVuIGEgZGlyZWN0aXZlLCBwaXBlLCBvciBzZXJ2aWNlIGlzIGRlc3Ryb3llZC5cbiAqXG4gKiBAbWV0aG9kIG5nQWZ0ZXJWaWV3SW5pdCAtIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIGFmdGVyIGEgY29tcG9uZW50J3MgdmlldyBoYXMgYmVlbiBmdWxseSBpbml0aWFsaXplZC5cbiAqXG4gKiBAbWV0aG9kIGhhbmRsZVRleHRJbnB1dCAtIEhhbmRsZXMgdGhlIHRleHQgaW5wdXQgZXZlbnQuXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IC0gS2V5Ym9hcmQgZXZlbnQuXG4gKlxuICogQG1ldGhvZCBhZGRMaXN0ZW5lcnMgLSBBZGRzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgY2FudmFzIGFuZCBkb2N1bWVudC5cbiAqXG4gKiBAbWV0aG9kIGhhbmRsZVRvdWNoU3RhcnQgLSBIYW5kbGVzIHRoZSB0b3VjaCBzdGFydCBldmVudC5cbiAqIEBwYXJhbSB7VG91Y2hFdmVudH0gZSAtIFRvdWNoIGV2ZW50LlxuICpcbiAqIEBtZXRob2QgaGFuZGxlVG91Y2hNb3ZlIC0gSGFuZGxlcyB0aGUgdG91Y2ggbW92ZSBldmVudC5cbiAqIEBwYXJhbSB7VG91Y2hFdmVudH0gZSAtIFRvdWNoIGV2ZW50LlxuICpcbiAqIEBtZXRob2QgaGFuZGxlVG91Y2hFbmQgLSBIYW5kbGVzIHRoZSB0b3VjaCBlbmQgZXZlbnQuXG4gKiBAcGFyYW0ge1RvdWNoRXZlbnR9IGUgLSBUb3VjaCBldmVudC5cbiAqXG4gKiBAbWV0aG9kIGhhbmRsZUNsaWNrT3V0c2lkZSAtIEhhbmRsZXMgdGhlIGNsaWNrIG91dHNpZGUgZXZlbnQuXG4gKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50IC0gTW91c2UgZXZlbnQuXG4gKlxuICogQG1ldGhvZCBoYW5kbGVDYW52YXNDbGljayAtIEhhbmRsZXMgdGhlIGNhbnZhcyBjbGljayBldmVudC5cbiAqIEBwYXJhbSB7TW91c2VFdmVudH0gZSAtIE1vdXNlIGV2ZW50LlxuICpcbiAqIEBtZXRob2Qgc3RhcnREcmF3aW5nIC0gU3RhcnRzIHRoZSBkcmF3aW5nIHByb2Nlc3MuXG4gKiBAcGFyYW0ge01vdXNlRXZlbnR9IGUgLSBNb3VzZSBldmVudC5cbiAqXG4gKiBAbWV0aG9kIGRyYXcgLSBEcmF3cyBvbiB0aGUgY2FudmFzLlxuICogQHBhcmFtIHtNb3VzZUV2ZW50fSBlIC0gTW91c2UgZXZlbnQuXG4gKlxuICogQG1ldGhvZCBzdG9wRHJhd2luZyAtIFN0b3BzIHRoZSBkcmF3aW5nIHByb2Nlc3MuXG4gKiBAcGFyYW0ge01vdXNlRXZlbnR9IGUgLSBNb3VzZSBldmVudC5cbiAqXG4gKiBAbWV0aG9kIGVyYXNlIC0gRXJhc2VzIGEgcGFydCBvZiB0aGUgY2FudmFzLlxuICogQHBhcmFtIHtudW1iZXJ9IHggLSBYIGNvb3JkaW5hdGUuXG4gKiBAcGFyYW0ge251bWJlcn0geSAtIFkgY29vcmRpbmF0ZS5cbiAqXG4gKiBAbWV0aG9kIGlzUG9pbnROZWFyTGluZSAtIENoZWNrcyBpZiBhIHBvaW50IGlzIG5lYXIgYSBsaW5lLlxuICogQHBhcmFtIHtudW1iZXJ9IHB4IC0gWCBjb29yZGluYXRlIG9mIHRoZSBwb2ludC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBweSAtIFkgY29vcmRpbmF0ZSBvZiB0aGUgcG9pbnQuXG4gKiBAcGFyYW0ge251bWJlcn0geDEgLSBYIGNvb3JkaW5hdGUgb2YgdGhlIGxpbmUgc3RhcnQuXG4gKiBAcGFyYW0ge251bWJlcn0geTEgLSBZIGNvb3JkaW5hdGUgb2YgdGhlIGxpbmUgc3RhcnQuXG4gKiBAcGFyYW0ge251bWJlcn0geDIgLSBYIGNvb3JkaW5hdGUgb2YgdGhlIGxpbmUgZW5kLlxuICogQHBhcmFtIHtudW1iZXJ9IHkyIC0gWSBjb29yZGluYXRlIG9mIHRoZSBsaW5lIGVuZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB0aHJlc2hvbGQgLSBEaXN0YW5jZSB0aHJlc2hvbGQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBUcnVlIGlmIHRoZSBwb2ludCBpcyBuZWFyIHRoZSBsaW5lLCBmYWxzZSBvdGhlcndpc2UuXG4gKlxuICogQG1ldGhvZCB6b29tQ2FudmFzIC0gWm9vbXMgdGhlIGNhbnZhcy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzY2FsZUZhY3RvciAtIFNjYWxlIGZhY3RvciBmb3Igem9vbWluZy5cbiAqIEBwYXJhbSB7TW91c2VFdmVudH0gW2V2ZW50XSAtIE1vdXNlIGV2ZW50LlxuICpcbiAqIEBtZXRob2QgaGFuZGxlWm9vbSAtIEhhbmRsZXMgdGhlIHpvb20gZXZlbnQuXG4gKiBAcGFyYW0ge1doZWVsRXZlbnR9IGUgLSBXaGVlbCBldmVudC5cbiAqXG4gKiBAbWV0aG9kIGRyYXdFZGdlTWFya2VycyAtIERyYXdzIGVkZ2UgbWFya2VycyBvbiB0aGUgY2FudmFzLlxuICpcbiAqIEBtZXRob2QgZHJhd1NoYXBlcyAtIERyYXdzIGFsbCBzaGFwZXMgb24gdGhlIGNhbnZhcy5cbiAqXG4gKiBAbWV0aG9kIGRyYXdMaW5lIC0gRHJhd3MgYSBsaW5lIG9uIHRoZSBjYW52YXMuXG4gKiBAcGFyYW0ge251bWJlcn0geDEgLSBYIGNvb3JkaW5hdGUgb2YgdGhlIGxpbmUgc3RhcnQuXG4gKiBAcGFyYW0ge251bWJlcn0geTEgLSBZIGNvb3JkaW5hdGUgb2YgdGhlIGxpbmUgc3RhcnQuXG4gKiBAcGFyYW0ge251bWJlcn0geDIgLSBYIGNvb3JkaW5hdGUgb2YgdGhlIGxpbmUgZW5kLlxuICogQHBhcmFtIHtudW1iZXJ9IHkyIC0gWSBjb29yZGluYXRlIG9mIHRoZSBsaW5lIGVuZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvciAtIENvbG9yIG9mIHRoZSBsaW5lLlxuICogQHBhcmFtIHtudW1iZXJ9IHRoaWNrbmVzcyAtIFRoaWNrbmVzcyBvZiB0aGUgbGluZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBsaW5lVHlwZSAtIFR5cGUgb2YgdGhlIGxpbmUgKGUuZy4sICdzb2xpZCcsICdkYXNoZWQnKS5cbiAqXG4gKiBAbWV0aG9kIGRyYXdUZXh0IC0gRHJhd3MgdGV4dCBvbiB0aGUgY2FudmFzLlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSBUZXh0IHRvIGJlIGRyYXduLlxuICogQHBhcmFtIHtudW1iZXJ9IHggLSBYIGNvb3JkaW5hdGUgb2YgdGhlIHRleHQuXG4gKiBAcGFyYW0ge251bWJlcn0geSAtIFkgY29vcmRpbmF0ZSBvZiB0aGUgdGV4dC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvciAtIENvbG9yIG9mIHRoZSB0ZXh0LlxuICogQHBhcmFtIHtzdHJpbmd9IGZvbnQgLSBGb250IG9mIHRoZSB0ZXh0LlxuICpcbiAqIEBtZXRob2QgZHJhd0ZyZWVoYW5kIC0gRHJhd3MgZnJlZWhhbmQgbGluZXMgb24gdGhlIGNhbnZhcy5cbiAqIEBwYXJhbSB7eyB4OiBudW1iZXIsIHk6IG51bWJlciB9W119IHBvaW50cyAtIEFycmF5IG9mIHBvaW50cyBmb3IgZnJlZWhhbmQgZHJhd2luZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvciAtIENvbG9yIG9mIHRoZSBmcmVlaGFuZCBkcmF3aW5nLlxuICogQHBhcmFtIHtudW1iZXJ9IHRoaWNrbmVzcyAtIFRoaWNrbmVzcyBvZiB0aGUgZnJlZWhhbmQgZHJhd2luZy5cbiAqXG4gKiBAbWV0aG9kIGRyYXdTaGFwZSAtIERyYXdzIGEgc2hhcGUgb24gdGhlIGNhbnZhcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gVHlwZSBvZiB0aGUgc2hhcGUuXG4gKiBAcGFyYW0ge251bWJlcn0geDEgLSBYIGNvb3JkaW5hdGUgb2YgdGhlIHNoYXBlIHN0YXJ0LlxuICogQHBhcmFtIHtudW1iZXJ9IHkxIC0gWSBjb29yZGluYXRlIG9mIHRoZSBzaGFwZSBzdGFydC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB4MiAtIFggY29vcmRpbmF0ZSBvZiB0aGUgc2hhcGUgZW5kLlxuICogQHBhcmFtIHtudW1iZXJ9IHkyIC0gWSBjb29yZGluYXRlIG9mIHRoZSBzaGFwZSBlbmQuXG4gKiBAcGFyYW0ge3N0cmluZ30gY29sb3IgLSBDb2xvciBvZiB0aGUgc2hhcGUuXG4gKiBAcGFyYW0ge251bWJlcn0gdGhpY2tuZXNzIC0gVGhpY2tuZXNzIG9mIHRoZSBzaGFwZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBsaW5lVHlwZSAtIFR5cGUgb2YgdGhlIGxpbmUgKGUuZy4sICdzb2xpZCcsICdkYXNoZWQnKS5cbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBbY3R4XSAtIENhbnZhcyByZW5kZXJpbmcgY29udGV4dC5cbiAqXG4gKiBAbWV0aG9kIGRyYXdQb2x5Z29uIC0gRHJhd3MgYSBwb2x5Z29uIG9uIHRoZSBjYW52YXMuXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY3R4IC0gQ2FudmFzIHJlbmRlcmluZyBjb250ZXh0LlxuICogQHBhcmFtIHtudW1iZXJ9IHNpZGVzIC0gTnVtYmVyIG9mIHNpZGVzIG9mIHRoZSBwb2x5Z29uLlxuICogQHBhcmFtIHtudW1iZXJ9IHgxIC0gWCBjb29yZGluYXRlIG9mIHRoZSBwb2x5Z29uIHN0YXJ0LlxuICogQHBhcmFtIHtudW1iZXJ9IHkxIC0gWSBjb29yZGluYXRlIG9mIHRoZSBwb2x5Z29uIHN0YXJ0LlxuICogQHBhcmFtIHtudW1iZXJ9IHgyIC0gWCBjb29yZGluYXRlIG9mIHRoZSBwb2x5Z29uIGVuZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB5MiAtIFkgY29vcmRpbmF0ZSBvZiB0aGUgcG9seWdvbiBlbmQuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGh0bWxcbiAqIDxhcHAtd2hpdGVib2FyZFxuICogIFtjdXN0b21XaWR0aF09XCIxMjgwXCJcbiAqIFtjdXN0b21IZWlnaHRdPVwiNzIwXCJcbiAqIFtwYXJhbWV0ZXJzXT1cIntcbiAqICBzb2NrZXQ6IHNvY2tldCxcbiAqIHNob3dBbGVydDogc2hvd0FsZXJ0LFxuICogaXNsZXZlbDogaXNsZXZlbCxcbiAqIHJvb21OYW1lOiByb29tTmFtZSxcbiAqIHNoYXBlczogc2hhcGVzLFxuICogdXNlSW1hZ2VCYWNrZ3JvdW5kOiB1c2VJbWFnZUJhY2tncm91bmQsXG4gKiByZWRvU3RhY2s6IHJlZG9TdGFjayxcbiAqIHVuZG9TdGFjazogdW5kb1N0YWNrLFxuICogd2hpdGVib2FyZFN0YXJ0ZWQ6IHdoaXRlYm9hcmRTdGFydGVkLFxuICogd2hpdGVib2FyZEVuZGVkOiB3aGl0ZWJvYXJkRW5kZWQsXG4gKiB3aGl0ZWJvYXJkVXNlcnM6IHdoaXRlYm9hcmRVc2VycyxcbiAqIHBhcnRpY2lwYW50czogcGFydGljaXBhbnRzLFxuICogcGFydGljaXBhbnRzQWxsOiBwYXJ0aWNpcGFudHNBbGwsXG4gKiBzY3JlZW5JZDogc2NyZWVuSWQsXG4gKiByZWNvcmRTdGFydGVkOiByZWNvcmRTdGFydGVkLFxuICogcmVjb3JkU3RvcHBlZDogcmVjb3JkU3RvcHBlZCxcbiAqIHJlY29yZFBhdXNlZDogcmVjb3JkUGF1c2VkLFxuICogcmVjb3JkUmVzdW1lZDogcmVjb3JkUmVzdW1lZCxcbiAqIHJlY29yZGluZ01lZGlhT3B0aW9uczogcmVjb3JkaW5nTWVkaWFPcHRpb25zLFxuICogbWVtYmVyOiBtZW1iZXIsXG4gKiBzaGFyZVNjcmVlblN0YXJ0ZWQ6IHNoYXJlU2NyZWVuU3RhcnRlZCxcbiAqIGNhbnZhc1doaXRlYm9hcmQ6IGNhbnZhc1doaXRlYm9hcmQsXG4gKiB0YXJnZXRSZXNvbHV0aW9uOiB0YXJnZXRSZXNvbHV0aW9uLFxuICogdGFyZ2V0UmVzb2x1dGlvbkhvc3Q6IHRhcmdldFJlc29sdXRpb25Ib3N0LFxuICogdXBkYXRlU2hhcGVzOiB1cGRhdGVTaGFwZXMsXG4gKiB1cGRhdGVVc2VJbWFnZUJhY2tncm91bmQ6IHVwZGF0ZVVzZUltYWdlQmFja2dyb3VuZCxcbiAqIHVwZGF0ZVJlZG9TdGFjazogdXBkYXRlUmVkb1N0YWNrLFxuICogdXBkYXRlVW5kb1N0YWNrOiB1cGRhdGVVbmRvU3RhY2ssXG4gKiB1cGRhdGVXaGl0ZWJvYXJkU3RhcnRlZDogdXBkYXRlV2hpdGVib2FyZFN0YXJ0ZWQsXG4gKiB1cGRhdGVXaGl0ZWJvYXJkRW5kZWQ6IHVwZGF0ZVdoaXRlYm9hcmRFbmRlZCxcbiAqIHVwZGF0ZVdoaXRlYm9hcmRVc2VyczogdXBkYXRlV2hpdGVib2FyZFVzZXJzLFxuICogdXBkYXRlUGFydGljaXBhbnRzOiB1cGRhdGVQYXJ0aWNpcGFudHMsXG4gKiB1cGRhdGVTY3JlZW5JZDogdXBkYXRlU2NyZWVuSWQsXG4gKiB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQ6IHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZCxcbiAqIHVwZGF0ZUNhbnZhc1doaXRlYm9hcmQ6IHVwZGF0ZUNhbnZhc1doaXRlYm9hcmQsXG4gKiBvblNjcmVlbkNoYW5nZXM6IG9uU2NyZWVuQ2hhbmdlcyxcbiAqIGNhcHR1cmVDYW52YXNTdHJlYW06IGNhcHR1cmVDYW52YXNTdHJlYW0sXG4gKiBnZXRVcGRhdGVkQWxsUGFyYW1zOiBnZXRVcGRhdGVkQWxsUGFyYW1zXG4gKiB9XCJcbiAqIFtzaG93QXNwZWN0XT1cInRydWVcIlxuICogPjwvYXBwLXdoaXRlYm9hcmQ+XG4gKiBgYGBcbiAqL1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7XG4gIGZhVGltZXMsXG4gIGZhVW5kbyxcbiAgZmFSZWRvLFxuICBmYUVyYXNlcixcbiAgZmFTaGFwZXMsXG4gIGZhTW91c2VQb2ludGVyLFxuICBmYUhhbmRQYXBlcixcbiAgZmFUZXh0SGVpZ2h0LFxuICBmYUZvbnQsXG4gIGZhUGVuY2lsQWx0LFxuICBmYVBhaW50QnJ1c2gsXG4gIGZhVHJhc2gsXG4gIGZhU2F2ZSxcbiAgZmFTZWFyY2gsXG4gIGZhU2VhcmNoTWludXMsXG4gIGZhU2VhcmNoUGx1cyxcbiAgZmFDaGV2cm9uTGVmdCxcbiAgZmFVcGxvYWQsXG4gIGZhQ2hldnJvblJpZ2h0LFxufSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQge1xuICBPblNjcmVlbkNoYW5nZXNQYXJhbWV0ZXJzLFxuICBPblNjcmVlbkNoYW5nZXNUeXBlLFxufSBmcm9tICcuLi8uLi8uLi9jb25zdW1lcnMvb24tc2NyZWVuLWNoYW5nZXMuc2VydmljZSc7XG5pbXBvcnQge1xuICBDYXB0dXJlQ2FudmFzU3RyZWFtUGFyYW1ldGVycyxcbiAgU2hvd0FsZXJ0LFxuICBXaGl0ZWJvYXJkVXNlcixcbiAgUGFydGljaXBhbnQsXG4gIENhcHR1cmVDYW52YXNTdHJlYW1UeXBlLFxufSBmcm9tICcuLi8uLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNoYXBlIHtcbiAgdHlwZTogc3RyaW5nO1xuICB4PzogbnVtYmVyO1xuICB5PzogbnVtYmVyO1xuICB4MT86IG51bWJlcjtcbiAgeTE/OiBudW1iZXI7XG4gIHgyPzogbnVtYmVyO1xuICB5Mj86IG51bWJlcjtcbiAgdGV4dD86IHN0cmluZztcbiAgY29sb3I/OiBzdHJpbmc7XG4gIGZvbnQ/OiBzdHJpbmc7XG4gIGZvbnRTaXplPzogbnVtYmVyO1xuICB0aGlja25lc3M/OiBudW1iZXI7XG4gIGxpbmVUeXBlPzogc3RyaW5nO1xuICBwb2ludHM/OiBBcnJheTx7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0+O1xuICBpbWc/OiBIVE1MSW1hZ2VFbGVtZW50O1xuICBzcmM/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2hpdGVib2FyZFBhcmFtZXRlcnNcbiAgZXh0ZW5kcyBPblNjcmVlbkNoYW5nZXNQYXJhbWV0ZXJzLFxuICAgIENhcHR1cmVDYW52YXNTdHJlYW1QYXJhbWV0ZXJzIHtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgaXNsZXZlbDogc3RyaW5nO1xuICByb29tTmFtZTogc3RyaW5nO1xuICBzaGFwZXM6IFNoYXBlW107XG4gIHVzZUltYWdlQmFja2dyb3VuZDogYm9vbGVhbjtcbiAgcmVkb1N0YWNrOiBTaGFwZVtdO1xuICB1bmRvU3RhY2s6IHN0cmluZ1tdO1xuICB3aGl0ZWJvYXJkU3RhcnRlZDogYm9vbGVhbjtcbiAgd2hpdGVib2FyZEVuZGVkOiBib29sZWFuO1xuICB3aGl0ZWJvYXJkVXNlcnM6IFdoaXRlYm9hcmRVc2VyW107XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgcGFydGljaXBhbnRzQWxsOiBQYXJ0aWNpcGFudFtdO1xuICBzY3JlZW5JZDogc3RyaW5nO1xuICByZWNvcmRTdGFydGVkOiBib29sZWFuO1xuICByZWNvcmRTdG9wcGVkOiBib29sZWFuO1xuICByZWNvcmRQYXVzZWQ6IGJvb2xlYW47XG4gIHJlY29yZFJlc3VtZWQ6IGJvb2xlYW47XG4gIHJlY29yZGluZ01lZGlhT3B0aW9uczogc3RyaW5nO1xuICBtZW1iZXI6IHN0cmluZztcbiAgc2hhcmVTY3JlZW5TdGFydGVkOiBib29sZWFuO1xuICBjYW52YXNXaGl0ZWJvYXJkOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw7XG4gIHRhcmdldFJlc29sdXRpb24/OiBzdHJpbmc7XG4gIHRhcmdldFJlc29sdXRpb25Ib3N0Pzogc3RyaW5nO1xuXG4gIHVwZGF0ZVNoYXBlczogKHNoYXBlczogU2hhcGVbXSkgPT4gdm9pZDtcbiAgdXBkYXRlVXNlSW1hZ2VCYWNrZ3JvdW5kOiAodXNlSW1hZ2VCYWNrZ3JvdW5kOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVSZWRvU3RhY2s6IChyZWRvU3RhY2s6IFNoYXBlW10pID0+IHZvaWQ7XG4gIHVwZGF0ZVVuZG9TdGFjazogKHVuZG9TdGFjazogc3RyaW5nW10pID0+IHZvaWQ7XG4gIHVwZGF0ZVdoaXRlYm9hcmRTdGFydGVkOiAod2hpdGVib2FyZFN0YXJ0ZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVdoaXRlYm9hcmRFbmRlZDogKHdoaXRlYm9hcmRFbmRlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlV2hpdGVib2FyZFVzZXJzOiAod2hpdGVib2FyZFVzZXJzOiBXaGl0ZWJvYXJkVXNlcltdKSA9PiB2b2lkO1xuICB1cGRhdGVQYXJ0aWNpcGFudHM6IChwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W10pID0+IHZvaWQ7XG4gIHVwZGF0ZVNjcmVlbklkOiAoc2NyZWVuSWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkOiAoc2hhcmVTY3JlZW5TdGFydGVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVDYW52YXNXaGl0ZWJvYXJkOiAoY2FudmFzV2hpdGVib2FyZDogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBvblNjcmVlbkNoYW5nZXM6IE9uU2NyZWVuQ2hhbmdlc1R5cGU7XG4gIGNhcHR1cmVDYW52YXNTdHJlYW06IENhcHR1cmVDYW52YXNTdHJlYW1UeXBlO1xuXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFdoaXRlYm9hcmRQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2hpdGVib2FyZE9wdGlvbnMge1xuICBjdXN0b21XaWR0aDogbnVtYmVyO1xuICBjdXN0b21IZWlnaHQ6IG51bWJlcjtcbiAgcGFyYW1ldGVyczogV2hpdGVib2FyZFBhcmFtZXRlcnM7XG4gIHNob3dBc3BlY3Q6IGJvb2xlYW47XG59XG5cbmV4cG9ydCB0eXBlIFdoaXRlYm9hcmRUeXBlID0gKG9wdGlvbnM6IFdoaXRlYm9hcmRPcHRpb25zKSA9PiB2b2lkO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtd2hpdGVib2FyZCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHRlbXBsYXRlVXJsOiAnLi93aGl0ZWJvYXJkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vd2hpdGVib2FyZC5jb21wb25lbnQuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIFdoaXRlYm9hcmQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgY3VzdG9tV2lkdGghOiBudW1iZXI7XG4gIEBJbnB1dCgpIGN1c3RvbUhlaWdodCE6IG51bWJlcjtcbiAgQElucHV0KCkgcGFyYW1ldGVyczogV2hpdGVib2FyZFBhcmFtZXRlcnMgPSB7fSBhcyBXaGl0ZWJvYXJkUGFyYW1ldGVycztcbiAgQElucHV0KCkgc2hvd0FzcGVjdCE6IGJvb2xlYW47XG5cbiAgQFZpZXdDaGlsZCgnY2FudmFzUmVmJywgeyBzdGF0aWM6IGZhbHNlIH0pIGNhbnZhc1JlZiE6IEVsZW1lbnRSZWY8SFRNTENhbnZhc0VsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCd0ZXh0SW5wdXRSZWYnLCB7IHN0YXRpYzogZmFsc2UgfSkgdGV4dElucHV0UmVmITogRWxlbWVudFJlZjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgndG9nZ2xlQmFja2dyb3VuZFJlZicsIHsgc3RhdGljOiBmYWxzZSB9KVxuICB0b2dnbGVCYWNrZ3JvdW5kUmVmITogRWxlbWVudFJlZjxIVE1MQnV0dG9uRWxlbWVudD47XG4gIEBWaWV3Q2hpbGQoJ2Rvd25sb2FkTGlua1JlZicsIHsgc3RhdGljOiBmYWxzZSB9KSBkb3dubG9hZExpbmtSZWYhOiBFbGVtZW50UmVmPEhUTUxBbmNob3JFbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgndGVtcENhbnZhc1JlZicsIHsgc3RhdGljOiBmYWxzZSB9KSB0ZW1wQ2FudmFzUmVmITogRWxlbWVudFJlZjxIVE1MQ2FudmFzRWxlbWVudD47XG5cbiAgZmFUaW1lcyA9IGZhVGltZXM7XG4gIGZhVW5kbyA9IGZhVW5kbztcbiAgZmFSZWRvID0gZmFSZWRvO1xuICBmYUVyYXNlciA9IGZhRXJhc2VyO1xuICBmYVNoYXBlcyA9IGZhU2hhcGVzO1xuICBmYU1vdXNlUG9pbnRlciA9IGZhTW91c2VQb2ludGVyO1xuICBmYUhhbmRQYXBlciA9IGZhSGFuZFBhcGVyO1xuICBmYVRleHRIZWlnaHQgPSBmYVRleHRIZWlnaHQ7XG4gIGZhRm9udCA9IGZhRm9udDtcbiAgZmFQZW5jaWxBbHQgPSBmYVBlbmNpbEFsdDtcbiAgZmFQYWludEJydXNoID0gZmFQYWludEJydXNoO1xuICBmYVRyYXNoID0gZmFUcmFzaDtcbiAgZmFTYXZlID0gZmFTYXZlO1xuICBmYVNlYXJjaCA9IGZhU2VhcmNoO1xuICBmYVNlYXJjaE1pbnVzID0gZmFTZWFyY2hNaW51cztcbiAgZmFTZWFyY2hQbHVzID0gZmFTZWFyY2hQbHVzO1xuICBmYUNoZXZyb25MZWZ0ID0gZmFDaGV2cm9uTGVmdDtcbiAgZmFVcGxvYWQgPSBmYVVwbG9hZDtcbiAgZmFDaGV2cm9uUmlnaHQgPSBmYUNoZXZyb25SaWdodDtcblxuICBwcml2YXRlIG1vZGUgPSAncGFuJztcbiAgcHJpdmF0ZSBpc0RyYXdpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBpc1Bhbm5pbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBpc0RyYWdnaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgc3RhcnRYID0gMDtcbiAgcHJpdmF0ZSBzdGFydFkgPSAwO1xuICBwcml2YXRlIGN1cnJlbnRYID0gMDtcbiAgcHJpdmF0ZSBjdXJyZW50WSA9IDA7XG4gIHByaXZhdGUgZnJlZWhhbmREcmF3aW5nOiBhbnlbXSA9IFtdO1xuICBwcml2YXRlIHNlbGVjdGVkU2hhcGU6IGFueSA9IG51bGw7XG4gIHByaXZhdGUgc2VsZWN0ZWRIYW5kbGU6IGFueSA9IG51bGw7XG4gIHByaXZhdGUgbW92aW5nU2hhcGUgPSBmYWxzZTtcbiAgcHJpdmF0ZSBwYW5YID0gMDtcbiAgcHJpdmF0ZSBwYW5ZID0gMDtcbiAgcHJpdmF0ZSBzY2FsZSA9IDE7XG4gIHByaXZhdGUgbWluU2NhbGUgPSAwLjI1O1xuICBwcml2YXRlIG1heFNjYWxlID0gMS43NTtcbiAgcHJpdmF0ZSBlcmFzZXJUaGlja25lc3MgPSAxMDtcbiAgcHJpdmF0ZSBicnVzaFRoaWNrbmVzcyA9IDY7XG4gIHByaXZhdGUgbGluZVRoaWNrbmVzcyA9IDY7XG4gIGxpbmVUeXBlID0gJ3NvbGlkJztcbiAgY29sb3IgPSAnIzAwMDAwMCc7XG4gIHByaXZhdGUgZm9udCA9ICdBcmlhbCc7XG4gIHByaXZhdGUgZm9udFNpemUgPSAyMDtcbiAgcHJpdmF0ZSBzaGFwZTogYW55ID0gbnVsbDtcbiAgcHJpdmF0ZSBiYWNrZ3JvdW5kSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgdG9vbGJhclZpc2libGUgPSB0cnVlO1xuICBkcm9wZG93bk9wZW46IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGN1cnJlbnRDbGlja1Bvc2l0aW9uOiB7XG4gICAgY2xpZW50WDogbnVtYmVyO1xuICAgIGNsaWVudFk6IG51bWJlcjtcbiAgICBvZmZzZXRYOiBudW1iZXI7XG4gICAgb2Zmc2V0WTogbnVtYmVyO1xuICB9IHwgbnVsbCA9IG51bGw7XG5cbiAgcHJpdmF0ZSBtYXhXaWR0aCA9IDEyODA7XG4gIHByaXZhdGUgbWF4SGVpZ2h0ID0gNzIwO1xuICBwcml2YXRlIGRpbWVuc2lvbnNGaXhlZCA9IGZhbHNlO1xuICBwcml2YXRlIGlzVmFsaWRTaGFwZSA9IGZhbHNlO1xuXG4gIHVwZGF0ZUxpbmVUaGlja25lc3MgPSAodGhpY2tuZXNzOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmxpbmVUaGlja25lc3MgPSB0aGlja25lc3M7XG4gIH07XG5cbiAgdXBkYXRlQnJ1c2hUaGlja25lc3MgPSAodGhpY2tuZXNzOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmJydXNoVGhpY2tuZXNzID0gdGhpY2tuZXNzO1xuICB9O1xuXG4gIHVwZGF0ZUVyYXNlclRoaWNrbmVzcyA9ICh0aGlja25lc3M6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuZXJhc2VyVGhpY2tuZXNzID0gdGhpY2tuZXNzO1xuICB9O1xuXG4gIHVwZGF0ZUNvbG9yID0gKGNvbG9yOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gIH07XG5cbiAgdXBkYXRlRm9udCA9IChmb250OiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmZvbnQgPSBmb250O1xuICB9O1xuXG4gIHVwZGF0ZUZvbnRTaXplID0gKGZvbnRTaXplOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmZvbnRTaXplID0gZm9udFNpemU7XG4gIH07XG5cbiAgdXBkYXRlU2hhcGUgPSAoc2hhcGU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcbiAgfTtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zaG93QXNwZWN0KSB7XG4gICAgICB0aGlzLmFkZExpc3RlbmVycygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlc1sncGFyYW1ldGVycyddICYmIGNoYW5nZXNbJ3BhcmFtZXRlcnMnXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycyA9IGNoYW5nZXNbJ3BhcmFtZXRlcnMnXS5jdXJyZW50VmFsdWU7XG5cbiAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuc29ja2V0KSB7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5zb2NrZXQub24oJ3doaXRlYm9hcmRVcGRhdGVkJywgYXN5bmMgKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMuV2hpdGVib2FyZFVwZGF0ZWQoZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5zb2NrZXQub24oJ3doaXRlYm9hcmRBY3Rpb24nLCAoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5XaGl0ZWJvYXJkQWN0aW9uKGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1snc2hvd0FzcGVjdCddKSB7XG4gICAgICBpZiAoY2hhbmdlc1snc2hvd0FzcGVjdCddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVycygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuc3RhcnREcmF3aW5nLmJpbmQodGhpcykpO1xuICAgIGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmRyYXcuYmluZCh0aGlzKSk7XG4gICAgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnN0b3BEcmF3aW5nLmJpbmQodGhpcykpO1xuICAgIGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuaGFuZGxlWm9vbS5iaW5kKHRoaXMpKTtcbiAgICBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNhbnZhc0NsaWNrLmJpbmQodGhpcykpO1xuXG4gICAgLy8gdG91Y2ggZXZlbnRzXG4gICAgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoU3RhcnQuYmluZCh0aGlzKSk7XG4gICAgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlVG91Y2hNb3ZlLmJpbmQodGhpcykpO1xuICAgIGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuaGFuZGxlVG91Y2hFbmQuYmluZCh0aGlzKSk7XG5cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZUNsaWNrT3V0c2lkZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBBdHRhY2ggdGhlIGV2ZW50IGxpc3RlbmVyIG9uY2UgYWZ0ZXIgdGhlIHZpZXcgaGFzIGJlZW4gaW5pdGlhbGl6ZWRcbiAgICBjb25zdCB0ZXh0SW5wdXQgPSB0aGlzLnRleHRJbnB1dFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRleHRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICB0aGlzLmhhbmRsZVRleHRJbnB1dChldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVUZXh0SW5wdXQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCB0ZXh0SW5wdXQgPSB0aGlzLnRleHRJbnB1dFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicgJiYgdGhpcy5jdXJyZW50Q2xpY2tQb3NpdGlvbikge1xuICAgICAgY29uc3QgeyBvZmZzZXRYLCBvZmZzZXRZIH0gPSB0aGlzLmN1cnJlbnRDbGlja1Bvc2l0aW9uO1xuICAgICAgY29uc3QgdGV4dCA9IHRleHRJbnB1dC52YWx1ZTtcbiAgICAgIHRleHRJbnB1dC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgdGV4dElucHV0LnZhbHVlID0gJyc7XG5cbiAgICAgIGNvbnN0IHggPSAob2Zmc2V0WCAtIHRoaXMucGFuWCkgLyB0aGlzLnNjYWxlO1xuICAgICAgY29uc3QgeSA9IChvZmZzZXRZIC0gdGhpcy5wYW5ZKSAvIHRoaXMuc2NhbGU7XG5cbiAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFwZXMucHVzaCh7XG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgdGV4dCxcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXG4gICAgICAgIGZvbnQ6IHRoaXMuZm9udCxcbiAgICAgICAgZm9udFNpemU6IHRoaXMuZm9udFNpemUsXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlU2hhcGVzKHRoaXMucGFyYW1ldGVycy5zaGFwZXMpO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNvY2tldC5lbWl0KFxuICAgICAgICAndXBkYXRlQm9hcmRBY3Rpb24nLFxuICAgICAgICB7XG4gICAgICAgICAgYWN0aW9uOiAndGV4dCcsXG4gICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgdGV4dCxcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICB5LFxuICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXG4gICAgICAgICAgICBmb250OiB0aGlzLmZvbnQsXG4gICAgICAgICAgICBmb250U2l6ZTogdGhpcy5mb250U2l6ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB0aGlzLmhhbmRsZVNlcnZlclJlc3BvbnNlLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBhZGRMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucGFyYW1ldGVycykge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzID0gdGhpcy5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcbiAgICB9XG5cbiAgICB0aGlzLmJhY2tncm91bmRJbWFnZS5zcmMgPSAnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9ncmFwaF9wYXBlci5qcGcnO1xuICAgIHRoaXMuYmFja2dyb3VuZEltYWdlLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG4gICAgdGhpcy5iYWNrZ3JvdW5kSW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICBpZiAodGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy50YXJnZXRSZXNvbHV0aW9uID09ICdxaGQnIHx8XG4gICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnRhcmdldFJlc29sdXRpb25Ib3N0ID09ICdxaGQnXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMubWF4V2lkdGggPSAxOTIwO1xuICAgICAgICAgIHRoaXMubWF4SGVpZ2h0ID0gMTA4MDtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMudGFyZ2V0UmVzb2x1dGlvbiA9PSAnZmhkJyB8fFxuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy50YXJnZXRSZXNvbHV0aW9uSG9zdCA9PSAnZmhkJ1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLm1heFdpZHRoID0gMTkyMDtcbiAgICAgICAgICB0aGlzLm1heEhlaWdodCA9IDEwODA7XG4gICAgICAgIH1cbiAgICAgICAgY2FudmFzLndpZHRoID0gdGhpcy5tYXhXaWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHRoaXMubWF4SGVpZ2h0O1xuICAgICAgICB0aGlzLmRpbWVuc2lvbnNGaXhlZCA9IHRydWU7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICB9XG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlQ2FudmFzV2hpdGVib2FyZCh0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5zdGFydERyYXdpbmcuYmluZCh0aGlzKSk7XG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuZHJhdy5iaW5kKHRoaXMpKTtcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuc3RvcERyYXdpbmcuYmluZCh0aGlzKSk7XG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVab29tLmJpbmQodGhpcykpO1xuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2FudmFzQ2xpY2suYmluZCh0aGlzKSk7XG5cbiAgICAvLyB0b3VjaCBldmVudHNcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hTdGFydC5iaW5kKHRoaXMpKTtcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUuYmluZCh0aGlzKSk7XG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5oYW5kbGVUb3VjaEVuZC5iaW5kKHRoaXMpKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlQ2xpY2tPdXRzaWRlLmJpbmQodGhpcykpO1xuICB9O1xuXG4gIGhhbmRsZVRvdWNoU3RhcnQoZTogVG91Y2hFdmVudCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB0b3VjaCA9IGUudG91Y2hlc1swXTtcbiAgICBjb25zdCBtb3VzZUV2ZW50ID0gbmV3IE1vdXNlRXZlbnQoJ21vdXNlZG93bicsIHtcbiAgICAgIGNsaWVudFg6IHRvdWNoLmNsaWVudFgsXG4gICAgICBjbGllbnRZOiB0b3VjaC5jbGllbnRZLFxuICAgIH0pO1xuICAgIHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudChtb3VzZUV2ZW50KTtcbiAgfVxuXG4gIGhhbmRsZVRvdWNoTW92ZShlOiBUb3VjaEV2ZW50KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHRvdWNoID0gZS50b3VjaGVzWzBdO1xuICAgIGNvbnN0IG1vdXNlRXZlbnQgPSBuZXcgTW91c2VFdmVudCgnbW91c2Vtb3ZlJywge1xuICAgICAgY2xpZW50WDogdG91Y2guY2xpZW50WCxcbiAgICAgIGNsaWVudFk6IHRvdWNoLmNsaWVudFksXG4gICAgfSk7XG4gICAgdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KG1vdXNlRXZlbnQpO1xuICB9XG5cbiAgaGFuZGxlVG91Y2hFbmQoZTogVG91Y2hFdmVudCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBtb3VzZUV2ZW50ID0gbmV3IE1vdXNlRXZlbnQoJ21vdXNldXAnLCB7fSk7XG4gICAgdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KG1vdXNlRXZlbnQpO1xuICB9XG5cbiAgaGFuZGxlQ2xpY2tPdXRzaWRlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEVsZW1lbnQ7XG4gICAgaWYgKHRoaXMuZHJvcGRvd25PcGVuICYmICF0YXJnZXQuY2xvc2VzdCgnLmJ0bi1ncm91cCcpKSB7XG4gICAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ2FudmFzQ2xpY2soZTogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLm1vZGUgPT09ICd0ZXh0Jykge1xuICAgICAgY29uc3QgdGV4dElucHV0ID0gdGhpcy50ZXh0SW5wdXRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgIHRleHRJbnB1dC5zdHlsZS5sZWZ0ID0gZS5jbGllbnRYICsgJ3B4JztcbiAgICAgIHRleHRJbnB1dC5zdHlsZS50b3AgPSBlLmNsaWVudFkgKyAncHgnO1xuICAgICAgdGV4dElucHV0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgdGV4dElucHV0LmZvY3VzKCk7XG4gICAgICB0aGlzLmN1cnJlbnRDbGlja1Bvc2l0aW9uID0ge1xuICAgICAgICBjbGllbnRYOiBlLmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGUuY2xpZW50WSxcbiAgICAgICAgb2Zmc2V0WDogZS5vZmZzZXRYLFxuICAgICAgICBvZmZzZXRZOiBlLm9mZnNldFksXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0RHJhd2luZyhlOiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5pc0RyYXdpbmcgPSB0cnVlO1xuICAgIHRoaXMuc3RhcnRYID0gKGUub2Zmc2V0WCAtIHRoaXMucGFuWCkgLyB0aGlzLnNjYWxlO1xuICAgIHRoaXMuc3RhcnRZID0gKGUub2Zmc2V0WSAtIHRoaXMucGFuWSkgLyB0aGlzLnNjYWxlO1xuXG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ2VyYXNlJykge1xuICAgICAgdGhpcy5lcmFzZSh0aGlzLnN0YXJ0WCwgdGhpcy5zdGFydFkpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlID09PSAnZHJhdycgfHwgdGhpcy5tb2RlID09PSAnZnJlZWhhbmQnKSB7XG4gICAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgICBjdHghLmJlZ2luUGF0aCgpO1xuICAgICAgY3R4IS5tb3ZlVG8odGhpcy5zdGFydFgsIHRoaXMuc3RhcnRZKTtcbiAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdmcmVlaGFuZCcpIHtcbiAgICAgICAgdGhpcy5mcmVlaGFuZERyYXdpbmcgPSBbeyB4OiB0aGlzLnN0YXJ0WCwgeTogdGhpcy5zdGFydFkgfV07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLm1vZGUgPT09ICdwYW4nKSB7XG4gICAgICB0aGlzLmlzUGFubmluZyA9IHRydWU7XG4gICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRIYW5kbGUgPSB0aGlzLmdldEhhbmRsZUF0UG9zaXRpb24odGhpcy5zdGFydFgsIHRoaXMuc3RhcnRZKTtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkSGFuZGxlKSB7XG4gICAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgICAgIHRoaXMubW92aW5nU2hhcGUgPSB0aGlzLnNlbGVjdGVkSGFuZGxlLmlzQ2VudGVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFNoYXBlID0gdGhpcy5maW5kU2hhcGUodGhpcy5zdGFydFgsIHRoaXMuc3RhcnRZKTtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRTaGFwZSkge1xuICAgICAgICAgIHRoaXMuZHJhd1NoYXBlcygpO1xuICAgICAgICAgIHRoaXMuZHJhd1NlbGVjdGlvbih0aGlzLnNlbGVjdGVkU2hhcGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZHJhdyA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLmRpbWVuc2lvbnNGaXhlZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy50YXJnZXRSZXNvbHV0aW9uID09ICdxaGQnIHx8XG4gICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnRhcmdldFJlc29sdXRpb25Ib3N0ID09ICdxaGQnXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMubWF4V2lkdGggPSAxOTIwO1xuICAgICAgICAgIHRoaXMubWF4SGVpZ2h0ID0gMTA4MDtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMudGFyZ2V0UmVzb2x1dGlvbiA9PSAnZmhkJyB8fFxuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy50YXJnZXRSZXNvbHV0aW9uSG9zdCA9PSAnZmhkJ1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLm1heFdpZHRoID0gMTkyMDtcbiAgICAgICAgICB0aGlzLm1heEhlaWdodCA9IDEwODA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC53aWR0aCA9IHRoaXMubWF4V2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuaGVpZ2h0ID0gdGhpcy5tYXhIZWlnaHQ7XG4gICAgICAgIHRoaXMuZGltZW5zaW9uc0ZpeGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZUNhbnZhc1doaXRlYm9hcmQodGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICB9XG4gICAgfVxuICAgIGlmICghdGhpcy5pc0RyYXdpbmcpIHJldHVybjtcbiAgICB0aGlzLmN1cnJlbnRYID0gKGUub2Zmc2V0WCAtIHRoaXMucGFuWCkgLyB0aGlzLnNjYWxlO1xuICAgIHRoaXMuY3VycmVudFkgPSAoZS5vZmZzZXRZIC0gdGhpcy5wYW5ZKSAvIHRoaXMuc2NhbGU7XG5cbiAgICBpZiAodGhpcy5tb2RlID09ICdkcmF3JyB8fCB0aGlzLm1vZGUgPT0gJ2ZyZWVoYW5kJyB8fCB0aGlzLm1vZGUgPT0gJ3NoYXBlJykge1xuICAgICAgLy9pZiBtb3JlIHRoYW4gbWF4IHdpZHRoIG9yIGhlaWdodCBvciBsZXNzIHRoYW4gMCwgcmV0dXJuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuY3VycmVudFggPiB0aGlzLm1heFdpZHRoIHx8XG4gICAgICAgIHRoaXMuY3VycmVudFkgPiB0aGlzLm1heEhlaWdodCB8fFxuICAgICAgICB0aGlzLmN1cnJlbnRYIDwgMCB8fFxuICAgICAgICB0aGlzLmN1cnJlbnRZIDwgMFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuaXNWYWxpZFNoYXBlID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaXNWYWxpZFNoYXBlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ2VyYXNlJykge1xuICAgICAgdGhpcy5lcmFzZSh0aGlzLmN1cnJlbnRYLCB0aGlzLmN1cnJlbnRZKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gJ2RyYXcnKSB7XG4gICAgICBjdHghLmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LndpZHRoLCB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmhlaWdodCk7XG4gICAgICB0aGlzLmRyYXdTaGFwZXMoKTtcbiAgICAgIHRoaXMuZHJhd0xpbmUoXG4gICAgICAgIHRoaXMuc3RhcnRYLFxuICAgICAgICB0aGlzLnN0YXJ0WSxcbiAgICAgICAgdGhpcy5jdXJyZW50WCxcbiAgICAgICAgdGhpcy5jdXJyZW50WSxcbiAgICAgICAgdGhpcy5jb2xvcixcbiAgICAgICAgdGhpcy5saW5lVGhpY2tuZXNzLFxuICAgICAgICB0aGlzLmxpbmVUeXBlLFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gJ2ZyZWVoYW5kJykge1xuICAgICAgY3R4IS5saW5lVG8odGhpcy5jdXJyZW50WCwgdGhpcy5jdXJyZW50WSk7XG4gICAgICBjdHghLnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgIGN0eCEubGluZVdpZHRoID0gdGhpcy5icnVzaFRoaWNrbmVzcztcbiAgICAgIGN0eCEuc3Ryb2tlKCk7XG4gICAgICB0aGlzLmZyZWVoYW5kRHJhd2luZy5wdXNoKHsgeDogdGhpcy5jdXJyZW50WCwgeTogdGhpcy5jdXJyZW50WSB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gJ3NoYXBlJykge1xuICAgICAgY3R4IS5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC53aWR0aCwgdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC5oZWlnaHQpO1xuICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgICB0aGlzLmRyYXdTaGFwZShcbiAgICAgICAgdGhpcy5zaGFwZSxcbiAgICAgICAgdGhpcy5zdGFydFgsXG4gICAgICAgIHRoaXMuc3RhcnRZLFxuICAgICAgICB0aGlzLmN1cnJlbnRYLFxuICAgICAgICB0aGlzLmN1cnJlbnRZLFxuICAgICAgICB0aGlzLmNvbG9yLFxuICAgICAgICB0aGlzLmxpbmVUaGlja25lc3MsXG4gICAgICAgIHRoaXMubGluZVR5cGUsXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlID09PSAncGFuJyAmJiB0aGlzLmlzUGFubmluZykge1xuICAgICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgIGNvbnN0IGR4ID0gZS5jbGllbnRYIC0gdGhpcy5zdGFydFg7XG4gICAgICBjb25zdCBkeSA9IGUuY2xpZW50WSAtIHRoaXMuc3RhcnRZO1xuICAgICAgdGhpcy5wYW5YICs9IGR4O1xuICAgICAgdGhpcy5wYW5ZICs9IGR5O1xuICAgICAgdGhpcy5zdGFydFggPSBlLmNsaWVudFg7XG4gICAgICB0aGlzLnN0YXJ0WSA9IGUuY2xpZW50WTtcblxuICAgICAgY3R4IS5zZXRUcmFuc2Zvcm0odGhpcy5zY2FsZSwgMCwgMCwgdGhpcy5zY2FsZSwgdGhpcy5wYW5YLCB0aGlzLnBhblkpO1xuICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm1vZGUgPT09ICdzZWxlY3QnICYmIHRoaXMuc2VsZWN0ZWRTaGFwZSkge1xuICAgICAgY3R4IS5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC53aWR0aCwgdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC5oZWlnaHQpO1xuICAgICAgaWYgKHRoaXMubW92aW5nU2hhcGUpIHtcbiAgICAgICAgY29uc3QgZHggPSB0aGlzLmN1cnJlbnRYIC0gdGhpcy5zdGFydFg7XG4gICAgICAgIGNvbnN0IGR5ID0gdGhpcy5jdXJyZW50WSAtIHRoaXMuc3RhcnRZO1xuICAgICAgICB0aGlzLm1vdmVTaGFwZSh0aGlzLnNlbGVjdGVkU2hhcGUsIGR4LCBkeSk7XG4gICAgICAgIHRoaXMuc3RhcnRYID0gdGhpcy5jdXJyZW50WDtcbiAgICAgICAgdGhpcy5zdGFydFkgPSB0aGlzLmN1cnJlbnRZO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5yZXNpemVTaGFwZSh0aGlzLnNlbGVjdGVkU2hhcGUsIHRoaXMuc2VsZWN0ZWRIYW5kbGUsIHRoaXMuY3VycmVudFgsIHRoaXMuY3VycmVudFkpO1xuICAgICAgfVxuICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgICB0aGlzLmRyYXdTZWxlY3Rpb24odGhpcy5zZWxlY3RlZFNoYXBlKTtcbiAgICB9XG4gIH07XG5cbiAgc3RvcERyYXdpbmcoKSB7XG4gICAgdGhpcy5pc0RyYXdpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmlzUGFubmluZyA9IGZhbHNlO1xuICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgY29uc3QgY3R4ID0gdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eCEuY2xvc2VQYXRoKCk7XG5cbiAgICBpZiAodGhpcy5tb2RlID09PSAnZHJhdycgJiYgdGhpcy5pc1ZhbGlkU2hhcGUpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFwZXMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgeDE6IHRoaXMuc3RhcnRYLFxuICAgICAgICB5MTogdGhpcy5zdGFydFksXG4gICAgICAgIHgyOiB0aGlzLmN1cnJlbnRYLFxuICAgICAgICB5MjogdGhpcy5jdXJyZW50WSxcbiAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXG4gICAgICAgIHRoaWNrbmVzczogdGhpcy5saW5lVGhpY2tuZXNzLFxuICAgICAgICBsaW5lVHlwZTogdGhpcy5saW5lVHlwZSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVNoYXBlcyh0aGlzLnBhcmFtZXRlcnMuc2hhcGVzKTtcbiAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMuc29ja2V0LmVtaXQoXG4gICAgICAgICd1cGRhdGVCb2FyZEFjdGlvbicsXG4gICAgICAgIHtcbiAgICAgICAgICBhY3Rpb246ICdkcmF3JyxcbiAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICB4MTogdGhpcy5zdGFydFgsXG4gICAgICAgICAgICB5MTogdGhpcy5zdGFydFksXG4gICAgICAgICAgICB4MjogdGhpcy5jdXJyZW50WCxcbiAgICAgICAgICAgIHkyOiB0aGlzLmN1cnJlbnRZLFxuICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXG4gICAgICAgICAgICB0aGlja25lc3M6IHRoaXMubGluZVRoaWNrbmVzcyxcbiAgICAgICAgICAgIGxpbmVUeXBlOiB0aGlzLmxpbmVUeXBlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHRoaXMuaGFuZGxlU2VydmVyUmVzcG9uc2UsXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlID09PSAnZnJlZWhhbmQnICYmIHRoaXMuaXNWYWxpZFNoYXBlKSB7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzLnB1c2goe1xuICAgICAgICB0eXBlOiAnZnJlZWhhbmQnLFxuICAgICAgICBwb2ludHM6IHRoaXMuZnJlZWhhbmREcmF3aW5nLFxuICAgICAgICBjb2xvcjogdGhpcy5jb2xvcixcbiAgICAgICAgdGhpY2tuZXNzOiB0aGlzLmJydXNoVGhpY2tuZXNzLFxuICAgICAgfSk7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlU2hhcGVzKHRoaXMucGFyYW1ldGVycy5zaGFwZXMpO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNvY2tldC5lbWl0KFxuICAgICAgICAndXBkYXRlQm9hcmRBY3Rpb24nLFxuICAgICAgICB7XG4gICAgICAgICAgYWN0aW9uOiAnZHJhdycsXG4gICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgdHlwZTogJ2ZyZWVoYW5kJyxcbiAgICAgICAgICAgIHBvaW50czogdGhpcy5mcmVlaGFuZERyYXdpbmcsXG4gICAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvcixcbiAgICAgICAgICAgIHRoaWNrbmVzczogdGhpcy5icnVzaFRoaWNrbmVzcyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB0aGlzLmhhbmRsZVNlcnZlclJlc3BvbnNlLFxuICAgICAgKTtcbiAgICAgIHRoaXMuZnJlZWhhbmREcmF3aW5nID0gW107XG4gICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlID09PSAnc2hhcGUnICYmIHRoaXMuaXNWYWxpZFNoYXBlKSB7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzLnB1c2goe1xuICAgICAgICB0eXBlOiB0aGlzLnNoYXBlLFxuICAgICAgICB4MTogdGhpcy5zdGFydFgsXG4gICAgICAgIHkxOiB0aGlzLnN0YXJ0WSxcbiAgICAgICAgeDI6IHRoaXMuY3VycmVudFgsXG4gICAgICAgIHkyOiB0aGlzLmN1cnJlbnRZLFxuICAgICAgICBjb2xvcjogdGhpcy5jb2xvcixcbiAgICAgICAgdGhpY2tuZXNzOiB0aGlzLmxpbmVUaGlja25lc3MsXG4gICAgICAgIGxpbmVUeXBlOiB0aGlzLmxpbmVUeXBlLFxuICAgICAgfSk7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlU2hhcGVzKHRoaXMucGFyYW1ldGVycy5zaGFwZXMpO1xuICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zb2NrZXQuZW1pdChcbiAgICAgICAgJ3VwZGF0ZUJvYXJkQWN0aW9uJyxcbiAgICAgICAge1xuICAgICAgICAgIGFjdGlvbjogJ3NoYXBlJyxcbiAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICB0eXBlOiB0aGlzLnNoYXBlLFxuICAgICAgICAgICAgeDE6IHRoaXMuc3RhcnRYLFxuICAgICAgICAgICAgeTE6IHRoaXMuc3RhcnRZLFxuICAgICAgICAgICAgeDI6IHRoaXMuY3VycmVudFgsXG4gICAgICAgICAgICB5MjogdGhpcy5jdXJyZW50WSxcbiAgICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yLFxuICAgICAgICAgICAgdGhpY2tuZXNzOiB0aGlzLmxpbmVUaGlja25lc3MsXG4gICAgICAgICAgICBsaW5lVHlwZTogdGhpcy5saW5lVHlwZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB0aGlzLmhhbmRsZVNlcnZlclJlc3BvbnNlLFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkU2hhcGUgJiYgIXRoaXMubW92aW5nU2hhcGUgJiYgIXRoaXMuaXNEcmFnZ2luZykge1xuICAgICAgICBjb25zdCBzaGFwZUZvdW5kID0gdGhpcy5maW5kU2hhcGUodGhpcy5jdXJyZW50WCwgdGhpcy5jdXJyZW50WSk7XG4gICAgICAgIGlmIChzaGFwZUZvdW5kKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZFNoYXBlID0gc2hhcGVGb3VuZDtcbiAgICAgICAgICB0aGlzLmRyYXdTaGFwZXMoKTtcbiAgICAgICAgICB0aGlzLmRyYXdTZWxlY3Rpb24oc2hhcGVGb3VuZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkU2hhcGUpIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNvY2tldC5lbWl0KFxuICAgICAgICAgICd1cGRhdGVCb2FyZEFjdGlvbicsXG4gICAgICAgICAgeyBhY3Rpb246ICdzaGFwZXMnLCBwYXlsb2FkOiB7IHNoYXBlczogdGhpcy5wYXJhbWV0ZXJzLnNoYXBlcyB9IH0sXG4gICAgICAgICAgdGhpcy5oYW5kbGVTZXJ2ZXJSZXNwb25zZSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgfVxuICB9XG5cbiAgZXJhc2UoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4IS5zYXZlKCk7XG4gICAgY3R4IS5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnZGVzdGluYXRpb24tb3V0JztcbiAgICBjdHghLmJlZ2luUGF0aCgpO1xuICAgIGN0eCEuYXJjKHgsIHksIHRoaXMuZXJhc2VyVGhpY2tuZXNzIC8gMiwgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcbiAgICBjdHghLmZpbGwoKTtcbiAgICBjdHghLnJlc3RvcmUoKTtcblxuICAgIGxldCBjaGFuZ2VPY2N1cnJlZCA9IGZhbHNlO1xuICAgIHRoaXMucGFyYW1ldGVycy5zaGFwZXMgPSB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzXG4gICAgICAubWFwKChzaGFwZTogYW55KSA9PiB7XG4gICAgICAgIGlmIChzaGFwZS50eXBlID09PSAnZnJlZWhhbmQnKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnNoYXBlLFxuICAgICAgICAgICAgcG9pbnRzOiBzaGFwZS5wb2ludHMuZmlsdGVyKChwb2ludDogYW55KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50LnggLSB4LCAyKSArIE1hdGgucG93KHBvaW50LnkgLSB5LCAyKSk7XG4gICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8PSB0aGlzLmVyYXNlclRoaWNrbmVzcyAvIDIpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VPY2N1cnJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBkaXN0YW5jZSA+IHRoaXMuZXJhc2VyVGhpY2tuZXNzIC8gMjtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoc2hhcGUudHlwZSA9PT0gJ2xpbmUnKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5pc1BvaW50TmVhckxpbmUoXG4gICAgICAgICAgICAgIHgsXG4gICAgICAgICAgICAgIHksXG4gICAgICAgICAgICAgIHNoYXBlLngxLFxuICAgICAgICAgICAgICBzaGFwZS55MSxcbiAgICAgICAgICAgICAgc2hhcGUueDIsXG4gICAgICAgICAgICAgIHNoYXBlLnkyLFxuICAgICAgICAgICAgICB0aGlzLmVyYXNlclRoaWNrbmVzcyAvIDIsXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjaGFuZ2VPY2N1cnJlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc2hhcGUudHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgY29uc3QgdGV4dFdpZHRoID0gY3R4IS5tZWFzdXJlVGV4dChzaGFwZS50ZXh0KS53aWR0aDtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB4ID4gc2hhcGUueCAmJlxuICAgICAgICAgICAgeCA8IHNoYXBlLnggKyB0ZXh0V2lkdGggJiZcbiAgICAgICAgICAgIHkgPiBzaGFwZS55IC0gc2hhcGUuZm9udFNpemUgJiZcbiAgICAgICAgICAgIHkgPCBzaGFwZS55XG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjaGFuZ2VPY2N1cnJlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc2hhcGUudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgIGlmICh4ID4gc2hhcGUueDEgJiYgeCA8IHNoYXBlLngyICYmIHkgPiBzaGFwZS55MSAmJiB5IDwgc2hhcGUueTIpIHtcbiAgICAgICAgICAgIGNoYW5nZU9jY3VycmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoeCA+IHNoYXBlLngxICYmIHggPCBzaGFwZS54MiAmJiB5ID4gc2hhcGUueTEgJiYgeSA8IHNoYXBlLnkyKSB7XG4gICAgICAgICAgICBjaGFuZ2VPY2N1cnJlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNoYXBlO1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoKHNoYXBlOiBhbnkpID0+IHNoYXBlICYmIChzaGFwZS50eXBlICE9PSAnZnJlZWhhbmQnIHx8IHNoYXBlLnBvaW50cy5sZW5ndGggPiAwKSk7XG4gICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVNoYXBlcyh0aGlzLnBhcmFtZXRlcnMuc2hhcGVzKTtcblxuICAgIHRoaXMuZHJhd1NoYXBlcygpO1xuICAgIGlmIChjaGFuZ2VPY2N1cnJlZCkge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNvY2tldC5lbWl0KFxuICAgICAgICAndXBkYXRlQm9hcmRBY3Rpb24nLFxuICAgICAgICB7IGFjdGlvbjogJ3NoYXBlcycsIHBheWxvYWQ6IHsgc2hhcGVzOiB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzIH0gfSxcbiAgICAgICAgdGhpcy5oYW5kbGVTZXJ2ZXJSZXNwb25zZSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgaXNQb2ludE5lYXJMaW5lKFxuICAgIHB4OiBudW1iZXIsXG4gICAgcHk6IG51bWJlcixcbiAgICB4MTogbnVtYmVyLFxuICAgIHkxOiBudW1iZXIsXG4gICAgeDI6IG51bWJlcixcbiAgICB5MjogbnVtYmVyLFxuICAgIHRocmVzaG9sZDogbnVtYmVyLFxuICApOiBib29sZWFuIHtcbiAgICBjb25zdCBkeCA9IHgyIC0geDE7XG4gICAgY29uc3QgZHkgPSB5MiAtIHkxO1xuICAgIGNvbnN0IGxlbmd0aCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgY29uc3QgZG90ID0gKChweCAtIHgxKSAqIGR4ICsgKHB5IC0geTEpICogZHkpIC8gKGxlbmd0aCAqIGxlbmd0aCk7XG4gICAgY29uc3QgY2xvc2VzdFggPSB4MSArIGRvdCAqIGR4O1xuICAgIGNvbnN0IGNsb3Nlc3RZID0geTEgKyBkb3QgKiBkeTtcbiAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydChNYXRoLnBvdyhweCAtIGNsb3Nlc3RYLCAyKSArIE1hdGgucG93KHB5IC0gY2xvc2VzdFksIDIpKTtcbiAgICByZXR1cm4gZGlzdGFuY2UgPD0gdGhyZXNob2xkO1xuICB9XG5cbiAgem9vbUNhbnZhcyhcbiAgICBzY2FsZUZhY3RvcjogbnVtYmVyLFxuICAgIGV2ZW50OiBNb3VzZUV2ZW50ID0ge1xuICAgICAgY2xpZW50WDogdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC53aWR0aCAvIDIsXG4gICAgICBjbGllbnRZOiB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmhlaWdodCAvIDIsXG4gICAgfSBhcyBNb3VzZUV2ZW50LFxuICApIHtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGlmIChzY2FsZUZhY3RvciA9PT0gMTApIHtcbiAgICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgICAgdGhpcy5wYW5YID0gMDtcbiAgICAgIHRoaXMucGFuWSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBuZXdTY2FsZSA9IHRoaXMuc2NhbGUgKiBzY2FsZUZhY3RvcjtcbiAgICAgIGlmIChuZXdTY2FsZSA8IHRoaXMubWluU2NhbGUpIHtcbiAgICAgICAgbmV3U2NhbGUgPSB0aGlzLm1pblNjYWxlO1xuICAgICAgfSBlbHNlIGlmIChuZXdTY2FsZSA+IHRoaXMubWF4U2NhbGUpIHtcbiAgICAgICAgbmV3U2NhbGUgPSB0aGlzLm1heFNjYWxlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3Qgb2Zmc2V0WCA9IChldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0KSAvIHJlY3Qud2lkdGg7XG4gICAgICBjb25zdCBvZmZzZXRZID0gKGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcCkgLyByZWN0LmhlaWdodDtcblxuICAgICAgY29uc3QgZHggPSBvZmZzZXRYICogY2FudmFzLndpZHRoICogKDEgLSBzY2FsZUZhY3Rvcik7XG4gICAgICBjb25zdCBkeSA9IG9mZnNldFkgKiBjYW52YXMuaGVpZ2h0ICogKDEgLSBzY2FsZUZhY3Rvcik7XG5cbiAgICAgIHRoaXMuc2NhbGUgPSBuZXdTY2FsZTtcbiAgICAgIHRoaXMucGFuWCA9IHRoaXMucGFuWCAqIHNjYWxlRmFjdG9yICsgZHg7XG4gICAgICB0aGlzLnBhblkgPSB0aGlzLnBhblkgKiBzY2FsZUZhY3RvciArIGR5O1xuXG4gICAgICBjb25zdCBtYXhQYW5YID0gKGNhbnZhcy53aWR0aCAqICh0aGlzLnNjYWxlIC0gMSkpIC8gdGhpcy5zY2FsZTtcbiAgICAgIGNvbnN0IG1heFBhblkgPSAoY2FudmFzLmhlaWdodCAqICh0aGlzLnNjYWxlIC0gMSkpIC8gdGhpcy5zY2FsZTtcbiAgICAgIHRoaXMucGFuWCA9IE1hdGgubWluKE1hdGgubWF4KHRoaXMucGFuWCwgLW1heFBhblgpLCAwKTtcbiAgICAgIHRoaXMucGFuWSA9IE1hdGgubWluKE1hdGgubWF4KHRoaXMucGFuWSwgLW1heFBhblkpLCAwKTtcbiAgICB9XG5cbiAgICBjdHghLnNldFRyYW5zZm9ybSh0aGlzLnNjYWxlLCAwLCAwLCB0aGlzLnNjYWxlLCB0aGlzLnBhblgsIHRoaXMucGFuWSk7XG4gICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gIH1cblxuICBoYW5kbGVab29tKGU6IFdoZWVsRXZlbnQpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKGUuZGVsdGFZIDwgMCkge1xuICAgICAgdGhpcy56b29tQ2FudmFzKDEuMiwgZSBhcyBhbnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnpvb21DYW52YXMoMC44LCBlIGFzIGFueSk7XG4gICAgfVxuICB9XG5cbiAgZHJhd0VkZ2VNYXJrZXJzKCkge1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHghLnNhdmUoKTtcbiAgICBjdHghLnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgICBjdHghLnN0cm9rZVN0eWxlID0gJ3JlZCc7XG4gICAgY3R4IS5saW5lV2lkdGggPSA1O1xuICAgIGN0eCEuc2V0TGluZURhc2goW10pOyAvLyByZXNldCBsaW5lIGRhc2hcblxuICAgIGNvbnN0IG1hcmtlckxlbmd0aCA9IDIwO1xuICAgIGNvbnN0IHRvcExlZnRYID0gdGhpcy5wYW5YO1xuICAgIGNvbnN0IHRvcExlZnRZID0gdGhpcy5wYW5ZO1xuICAgIGNvbnN0IGJvdHRvbVJpZ2h0WCA9IHRoaXMucGFuWCArIDEyODAgKiB0aGlzLnNjYWxlO1xuICAgIGNvbnN0IGJvdHRvbVJpZ2h0WSA9IHRoaXMucGFuWSArIDcyMCAqIHRoaXMuc2NhbGU7XG5cbiAgICBjdHghLmJlZ2luUGF0aCgpO1xuICAgIGN0eCEubW92ZVRvKHRvcExlZnRYLCB0b3BMZWZ0WSArIG1hcmtlckxlbmd0aCk7XG4gICAgY3R4IS5saW5lVG8odG9wTGVmdFgsIHRvcExlZnRZKTtcbiAgICBjdHghLmxpbmVUbyh0b3BMZWZ0WCArIG1hcmtlckxlbmd0aCwgdG9wTGVmdFkpO1xuICAgIGN0eCEuc3Ryb2tlKCk7XG5cbiAgICBjdHghLmJlZ2luUGF0aCgpO1xuICAgIGN0eCEubW92ZVRvKGJvdHRvbVJpZ2h0WCAtIG1hcmtlckxlbmd0aCwgdG9wTGVmdFkpO1xuICAgIGN0eCEubGluZVRvKGJvdHRvbVJpZ2h0WCwgdG9wTGVmdFkpO1xuICAgIGN0eCEubGluZVRvKGJvdHRvbVJpZ2h0WCwgdG9wTGVmdFkgKyBtYXJrZXJMZW5ndGgpO1xuICAgIGN0eCEuc3Ryb2tlKCk7XG5cbiAgICBjdHghLmJlZ2luUGF0aCgpO1xuICAgIGN0eCEubW92ZVRvKGJvdHRvbVJpZ2h0WCwgYm90dG9tUmlnaHRZIC0gbWFya2VyTGVuZ3RoKTtcbiAgICBjdHghLmxpbmVUbyhib3R0b21SaWdodFgsIGJvdHRvbVJpZ2h0WSk7XG4gICAgY3R4IS5saW5lVG8oYm90dG9tUmlnaHRYIC0gbWFya2VyTGVuZ3RoLCBib3R0b21SaWdodFkpO1xuICAgIGN0eCEuc3Ryb2tlKCk7XG5cbiAgICBjdHghLmJlZ2luUGF0aCgpO1xuICAgIGN0eCEubW92ZVRvKHRvcExlZnRYICsgbWFya2VyTGVuZ3RoLCBib3R0b21SaWdodFkpO1xuICAgIGN0eCEubGluZVRvKHRvcExlZnRYLCBib3R0b21SaWdodFkpO1xuICAgIGN0eCEubGluZVRvKHRvcExlZnRYLCBib3R0b21SaWdodFkgLSBtYXJrZXJMZW5ndGgpO1xuICAgIGN0eCEuc3Ryb2tlKCk7XG5cbiAgICBjdHghLnJlc3RvcmUoKTtcbiAgfVxuXG4gIGRyYXdTaGFwZXMoKSB7XG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHghLmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGN0eCEuc2F2ZSgpO1xuICAgIGN0eCEuc2V0VHJhbnNmb3JtKHRoaXMuc2NhbGUsIDAsIDAsIHRoaXMuc2NhbGUsIHRoaXMucGFuWCwgdGhpcy5wYW5ZKTtcbiAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLnVzZUltYWdlQmFja2dyb3VuZCkge1xuICAgICAgY3R4IS5kcmF3SW1hZ2UoXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZEltYWdlLFxuICAgICAgICAtdGhpcy5wYW5YIC8gdGhpcy5zY2FsZSxcbiAgICAgICAgLXRoaXMucGFuWSAvIHRoaXMuc2NhbGUsXG4gICAgICAgIGNhbnZhcy53aWR0aCAvIHRoaXMuc2NhbGUsXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgLyB0aGlzLnNjYWxlLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3R4IS5maWxsU3R5bGUgPSAnI2ZmZic7XG4gICAgICBjdHghLmZpbGxSZWN0KFxuICAgICAgICAtdGhpcy5wYW5YIC8gdGhpcy5zY2FsZSxcbiAgICAgICAgLXRoaXMucGFuWSAvIHRoaXMuc2NhbGUsXG4gICAgICAgIGNhbnZhcy53aWR0aCAvIHRoaXMuc2NhbGUsXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgLyB0aGlzLnNjYWxlLFxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5wYXJhbWV0ZXJzLnNoYXBlcy5mb3JFYWNoKChzaGFwZTogYW55KSA9PiB7XG4gICAgICBpZiAoc2hhcGUudHlwZSA9PT0gJ2xpbmUnKSB7XG4gICAgICAgIHRoaXMuZHJhd0xpbmUoXG4gICAgICAgICAgc2hhcGUueDEsXG4gICAgICAgICAgc2hhcGUueTEsXG4gICAgICAgICAgc2hhcGUueDIsXG4gICAgICAgICAgc2hhcGUueTIsXG4gICAgICAgICAgc2hhcGUuY29sb3IsXG4gICAgICAgICAgc2hhcGUudGhpY2tuZXNzLFxuICAgICAgICAgIHNoYXBlLmxpbmVUeXBlLFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChzaGFwZS50eXBlID09PSAnZnJlZWhhbmQnKSB7XG4gICAgICAgIHRoaXMuZHJhd0ZyZWVoYW5kKHNoYXBlLnBvaW50cywgc2hhcGUuY29sb3IsIHNoYXBlLnRoaWNrbmVzcyk7XG4gICAgICB9IGVsc2UgaWYgKHNoYXBlLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICBjdHghLmZvbnQgPSBgJHtzaGFwZS5mb250U2l6ZX1weCAke3NoYXBlLmZvbnR9YDtcbiAgICAgICAgY3R4IS5maWxsU3R5bGUgPSBzaGFwZS5jb2xvcjtcbiAgICAgICAgY3R4IS5maWxsVGV4dChzaGFwZS50ZXh0LCBzaGFwZS54LCBzaGFwZS55KTtcbiAgICAgIH0gZWxzZSBpZiAoc2hhcGUudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICBjdHghLmRyYXdJbWFnZShzaGFwZS5pbWcsIHNoYXBlLngxLCBzaGFwZS55MSwgc2hhcGUueDIgLSBzaGFwZS54MSwgc2hhcGUueTIgLSBzaGFwZS55MSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRyYXdTaGFwZShcbiAgICAgICAgICBzaGFwZS50eXBlLFxuICAgICAgICAgIHNoYXBlLngxLFxuICAgICAgICAgIHNoYXBlLnkxLFxuICAgICAgICAgIHNoYXBlLngyLFxuICAgICAgICAgIHNoYXBlLnkyLFxuICAgICAgICAgIHNoYXBlLmNvbG9yLFxuICAgICAgICAgIHNoYXBlLnRoaWNrbmVzcyxcbiAgICAgICAgICBzaGFwZS5saW5lVHlwZSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjdHghLnJlc3RvcmUoKTtcbiAgICB0aGlzLmRyYXdFZGdlTWFya2VycygpO1xuICB9XG5cbiAgZHJhd0xpbmUoXG4gICAgeDE6IG51bWJlcixcbiAgICB5MTogbnVtYmVyLFxuICAgIHgyOiBudW1iZXIsXG4gICAgeTI6IG51bWJlcixcbiAgICBjb2xvcjogc3RyaW5nLFxuICAgIHRoaWNrbmVzczogbnVtYmVyLFxuICAgIGxpbmVUeXBlOiBzdHJpbmcsXG4gICkge1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHghLmJlZ2luUGF0aCgpO1xuICAgIGN0eCEuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICBjdHghLmxpbmVXaWR0aCA9IHRoaWNrbmVzcztcbiAgICBpZiAobGluZVR5cGUgPT09ICdkYXNoZWQnKSB7XG4gICAgICBjdHghLnNldExpbmVEYXNoKFsxMCwgMTBdKTtcbiAgICB9IGVsc2UgaWYgKGxpbmVUeXBlID09PSAnZG90dGVkJykge1xuICAgICAgY3R4IS5zZXRMaW5lRGFzaChbMiwgMTBdKTtcbiAgICB9IGVsc2UgaWYgKGxpbmVUeXBlID09PSAnZGFzaERvdCcpIHtcbiAgICAgIGN0eCEuc2V0TGluZURhc2goWzEwLCA1LCAyLCA1XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0eCEuc2V0TGluZURhc2goW10pO1xuICAgIH1cbiAgICBjdHghLm1vdmVUbyh4MSwgeTEpO1xuICAgIGN0eCEubGluZVRvKHgyLCB5Mik7XG4gICAgY3R4IS5zdHJva2UoKTtcbiAgICBjdHghLnNldExpbmVEYXNoKFtdKTtcbiAgfVxuXG4gIGRyYXdUZXh0KHRleHQ6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIGNvbG9yOiBzdHJpbmcsIGZvbnQ6IHN0cmluZykge1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHghLmZvbnQgPSBgMjBweCAke2ZvbnR9YDtcbiAgICBjdHghLmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgIGN0eCEuZmlsbFRleHQodGV4dCwgeCwgeSk7XG4gIH1cblxuICBkcmF3RnJlZWhhbmQocG9pbnRzOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH1bXSwgY29sb3I6IHN0cmluZywgdGhpY2tuZXNzOiBudW1iZXIpIHtcbiAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgaWYgKHBvaW50cy5sZW5ndGggPCAyKSByZXR1cm47XG4gICAgY3R4IS5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgIGN0eCEubGluZVdpZHRoID0gdGhpY2tuZXNzO1xuICAgIGN0eCEuYmVnaW5QYXRoKCk7XG4gICAgY3R4IS5tb3ZlVG8ocG9pbnRzWzBdLngsIHBvaW50c1swXS55KTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgY3R4IS5saW5lVG8ocG9pbnRzW2ldLngsIHBvaW50c1tpXS55KTtcbiAgICB9XG4gICAgY3R4IS5zdHJva2UoKTtcbiAgfVxuXG4gIGRyYXdTaGFwZShcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgeDE6IG51bWJlcixcbiAgICB5MTogbnVtYmVyLFxuICAgIHgyOiBudW1iZXIsXG4gICAgeTI6IG51bWJlcixcbiAgICBjb2xvcjogc3RyaW5nLFxuICAgIHRoaWNrbmVzczogbnVtYmVyLFxuICAgIGxpbmVUeXBlOiBzdHJpbmcsXG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmdldENvbnRleHQoJzJkJykhLFxuICApIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgY3R4LmxpbmVXaWR0aCA9IHRoaWNrbmVzcztcbiAgICBpZiAobGluZVR5cGUgPT09ICdkYXNoZWQnKSB7XG4gICAgICBjdHguc2V0TGluZURhc2goWzEwLCAxMF0pO1xuICAgIH0gZWxzZSBpZiAobGluZVR5cGUgPT09ICdkb3R0ZWQnKSB7XG4gICAgICBjdHguc2V0TGluZURhc2goWzIsIDEwXSk7XG4gICAgfSBlbHNlIGlmIChsaW5lVHlwZSA9PT0gJ2Rhc2hEb3QnKSB7XG4gICAgICBjdHguc2V0TGluZURhc2goWzEwLCA1LCAyLCA1XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0eC5zZXRMaW5lRGFzaChbXSk7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAncmVjdGFuZ2xlJykge1xuICAgICAgY3R4LnN0cm9rZVJlY3QoeDEsIHkxLCB4MiAtIHgxLCB5MiAtIHkxKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdjaXJjbGUnKSB7XG4gICAgICBjb25zdCByYWRpdXMgPSBNYXRoLnNxcnQoTWF0aC5wb3coeDIgLSB4MSwgMikgKyBNYXRoLnBvdyh5MiAtIHkxLCAyKSk7XG4gICAgICBjdHguYXJjKHgxLCB5MSwgcmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAncmhvbWJ1cycpIHtcbiAgICAgIGNvbnN0IGNlbnRlclggPSAoeDEgKyB4MikgLyAyO1xuICAgICAgY29uc3QgY2VudGVyWSA9ICh5MSArIHkyKSAvIDI7XG4gICAgICBjdHgubW92ZVRvKGNlbnRlclgsIHkxKTtcbiAgICAgIGN0eC5saW5lVG8oeDIsIGNlbnRlclkpO1xuICAgICAgY3R4LmxpbmVUbyhjZW50ZXJYLCB5Mik7XG4gICAgICBjdHgubGluZVRvKHgxLCBjZW50ZXJZKTtcbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdwZW50YWdvbicpIHtcbiAgICAgIHRoaXMuZHJhd1BvbHlnb24oY3R4LCA1LCB4MSwgeTEsIHgyLCB5Mik7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnaGV4YWdvbicpIHtcbiAgICAgIHRoaXMuZHJhd1BvbHlnb24oY3R4LCA2LCB4MSwgeTEsIHgyLCB5Mik7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAndHJpYW5nbGUnKSB7XG4gICAgICBjb25zdCBjZW50ZXJYID0gKHgxICsgeDIpIC8gMjtcbiAgICAgIGN0eC5tb3ZlVG8oY2VudGVyWCwgeTEpO1xuICAgICAgY3R4LmxpbmVUbyh4MiwgeTIpO1xuICAgICAgY3R4LmxpbmVUbyh4MSwgeTIpO1xuICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3NxdWFyZScpIHtcbiAgICAgIGN0eC5zdHJva2VSZWN0KHgxLCB5MSwgeDIgLSB4MSwgeDIgLSB4MSk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2N0YWdvbicpIHtcbiAgICAgIHRoaXMuZHJhd1BvbHlnb24oY3R4LCA4LCB4MSwgeTEsIHgyLCB5Mik7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb3ZhbCcpIHtcbiAgICAgIGNvbnN0IHJhZGl1c1ggPSBNYXRoLmFicyh4MiAtIHgxKSAvIDI7XG4gICAgICBjb25zdCByYWRpdXNZID0gTWF0aC5hYnMoeTIgLSB5MSkgLyAyO1xuICAgICAgY29uc3QgY2VudGVyWCA9ICh4MSArIHgyKSAvIDI7XG4gICAgICBjb25zdCBjZW50ZXJZID0gKHkxICsgeTIpIC8gMjtcbiAgICAgIGN0eC5lbGxpcHNlKGNlbnRlclgsIGNlbnRlclksIHJhZGl1c1gsIHJhZGl1c1ksIDAsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdwYXJhbGxlbG9ncmFtJykge1xuICAgICAgY29uc3QgY2VudGVyWCA9ICh4MSArIHgyKSAvIDI7XG4gICAgICBjdHgubW92ZVRvKGNlbnRlclgsIHkxKTtcbiAgICAgIGN0eC5saW5lVG8oeDIsIHkyKTtcbiAgICAgIGN0eC5saW5lVG8oY2VudGVyWCwgeTIpO1xuICAgICAgY3R4LmxpbmVUbyh4MSwgeTEpO1xuICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLnNoYXBlLmltZywgeDEsIHkxLCB4MiAtIHgxLCB5MiAtIHkxKTtcbiAgICB9XG4gIH1cblxuICBkcmF3UG9seWdvbihcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcbiAgICBzaWRlczogbnVtYmVyLFxuICAgIHgxOiBudW1iZXIsXG4gICAgeTE6IG51bWJlcixcbiAgICB4MjogbnVtYmVyLFxuICAgIHkyOiBudW1iZXIsXG4gICkge1xuICAgIGNvbnN0IGNlbnRlclggPSAoeDEgKyB4MikgLyAyO1xuICAgIGNvbnN0IGNlbnRlclkgPSAoeTEgKyB5MikgLyAyO1xuICAgIGNvbnN0IHJhZGl1cyA9IE1hdGgubWluKE1hdGguYWJzKHgyIC0geDEpLCBNYXRoLmFicyh5MiAtIHkxKSkgLyAyO1xuICAgIGNvbnN0IGFuZ2xlID0gKDIgKiBNYXRoLlBJKSAvIHNpZGVzO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpZGVzOyBpKyspIHtcbiAgICAgIGNvbnN0IHggPSBjZW50ZXJYICsgcmFkaXVzICogTWF0aC5jb3MoaSAqIGFuZ2xlIC0gTWF0aC5QSSAvIDIpO1xuICAgICAgY29uc3QgeSA9IGNlbnRlclkgKyByYWRpdXMgKiBNYXRoLnNpbihpICogYW5nbGUgLSBNYXRoLlBJIC8gMik7XG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICBjdHgubW92ZVRvKHgsIHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3R4LmxpbmVUbyh4LCB5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgfVxuXG4gIHVuZG8oKSB7XG4gICAgaWYgKHRoaXMucGFyYW1ldGVycy5zaGFwZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnJlZG9TdGFjay5wdXNoKHRoaXMucGFyYW1ldGVycy5zaGFwZXMucG9wKCkhKTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVSZWRvU3RhY2sodGhpcy5wYXJhbWV0ZXJzLnJlZG9TdGFjayk7XG4gICAgICB0aGlzLmRyYXdTaGFwZXMoKTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zb2NrZXQuZW1pdChcbiAgICAgICAgJ3VwZGF0ZUJvYXJkQWN0aW9uJyxcbiAgICAgICAgeyBhY3Rpb246ICd1bmRvJyB9LFxuICAgICAgICB0aGlzLmhhbmRsZVNlcnZlclJlc3BvbnNlLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZWRvKCkge1xuICAgIGlmICh0aGlzLnBhcmFtZXRlcnMucmVkb1N0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFwZXMucHVzaCh0aGlzLnBhcmFtZXRlcnMucmVkb1N0YWNrLnBvcCgpISk7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlU2hhcGVzKHRoaXMucGFyYW1ldGVycy5zaGFwZXMpO1xuICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMuc29ja2V0LmVtaXQoXG4gICAgICAgICd1cGRhdGVCb2FyZEFjdGlvbicsXG4gICAgICAgIHsgYWN0aW9uOiAncmVkbycgfSxcbiAgICAgICAgdGhpcy5oYW5kbGVTZXJ2ZXJSZXNwb25zZSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgc2F2ZVN0YXRlKCkge1xuICAgIHRoaXMucGFyYW1ldGVycy51bmRvU3RhY2sucHVzaChKU09OLnN0cmluZ2lmeSh0aGlzLnBhcmFtZXRlcnMuc2hhcGVzKSk7XG4gICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVVuZG9TdGFjayh0aGlzLnBhcmFtZXRlcnMudW5kb1N0YWNrKTtcbiAgfVxuXG4gIGZpbmRTaGFwZSh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzLmZpbmQoKHNoYXBlOiBhbnkpID0+IHtcbiAgICAgIGlmIChzaGFwZS50eXBlID09PSAnZnJlZWhhbmQnKSB7XG4gICAgICAgIHJldHVybiBzaGFwZS5wb2ludHMuc29tZSgocG9pbnQ6IGFueSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50LnggLSB4LCAyKSArIE1hdGgucG93KHBvaW50LnkgLSB5LCAyKSk7XG4gICAgICAgICAgcmV0dXJuIGRpc3RhbmNlIDwgc2hhcGUudGhpY2tuZXNzO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoc2hhcGUudHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgY3R4IS5mb250ID0gYCR7c2hhcGUuZm9udFNpemV9cHggJHtzaGFwZS5mb250fWA7XG4gICAgICAgIGNvbnN0IHRleHRNZXRyaWNzID0gY3R4IS5tZWFzdXJlVGV4dChzaGFwZS50ZXh0KTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICB4ID4gc2hhcGUueCAmJlxuICAgICAgICAgIHggPCBzaGFwZS54ICsgdGV4dE1ldHJpY3Mud2lkdGggJiZcbiAgICAgICAgICB5ID4gc2hhcGUueSAtIHNoYXBlLmZvbnRTaXplICYmXG4gICAgICAgICAgeSA8IHNoYXBlLnlcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoc2hhcGUudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICByZXR1cm4geCA+IHNoYXBlLngxICYmIHggPCBzaGFwZS54MiAmJiB5ID4gc2hhcGUueTEgJiYgeSA8IHNoYXBlLnkyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHggPiBzaGFwZS54MSAmJiB4IDwgc2hhcGUueDIgJiYgeSA+IHNoYXBlLnkxICYmIHkgPCBzaGFwZS55MjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGRyYXdTZWxlY3Rpb24oc2hhcGU6IGFueSkge1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBpZiAoIXNoYXBlKSByZXR1cm47XG5cbiAgICBjb25zdCBoYW5kbGVzID0gdGhpcy5nZXRSZXNpemVIYW5kbGVzKHNoYXBlKTtcbiAgICBjdHghLnN0cm9rZVN0eWxlID0gJ3JlZCc7XG4gICAgY3R4IS5saW5lV2lkdGggPSAyO1xuICAgIGN0eCEuc2V0TGluZURhc2goWzYsIDNdKTtcbiAgICBpZiAoc2hhcGUudHlwZSA9PT0gJ2xpbmUnKSB7XG4gICAgICBjdHghLmJlZ2luUGF0aCgpO1xuICAgICAgY3R4IS5tb3ZlVG8oc2hhcGUueDEsIHNoYXBlLnkxKTtcbiAgICAgIGN0eCEubGluZVRvKHNoYXBlLngyLCBzaGFwZS55Mik7XG4gICAgICBjdHghLnN0cm9rZSgpO1xuICAgIH0gZWxzZSBpZiAoc2hhcGUudHlwZSA9PT0gJ2NpcmNsZScpIHtcbiAgICAgIGNvbnN0IHJhZGl1cyA9IE1hdGguc3FydChNYXRoLnBvdyhzaGFwZS54MiAtIHNoYXBlLngxLCAyKSArIE1hdGgucG93KHNoYXBlLnkyIC0gc2hhcGUueTEsIDIpKTtcbiAgICAgIGN0eCEuYmVnaW5QYXRoKCk7XG4gICAgICBjdHghLmFyYyhzaGFwZS54MSwgc2hhcGUueTEsIHJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgY3R4IS5zdHJva2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3R4IS5zdHJva2VSZWN0KHNoYXBlLngxLCBzaGFwZS55MSwgc2hhcGUueDIgLSBzaGFwZS54MSwgc2hhcGUueTIgLSBzaGFwZS55MSk7XG4gICAgfVxuXG4gICAgY3R4IS5zZXRMaW5lRGFzaChbXSk7XG5cbiAgICBoYW5kbGVzLmZvckVhY2goKGhhbmRsZSkgPT4ge1xuICAgICAgY3R4IS5maWxsU3R5bGUgPSBoYW5kbGUuaXNDZW50ZXIgPyAnYmx1ZScgOiAncmVkJztcbiAgICAgIGN0eCEuZmlsbFJlY3QoaGFuZGxlLnggLSA2LCBoYW5kbGUueSAtIDYsIDEyLCAxMik7XG4gICAgfSk7XG4gIH1cblxuICBnZXRSZXNpemVIYW5kbGVzKHNoYXBlOiBhbnkpIHtcbiAgICBjb25zdCBoYW5kbGVzID0gW107XG4gICAgaWYgKHNoYXBlLnR5cGUgPT09ICdsaW5lJykge1xuICAgICAgaGFuZGxlcy5wdXNoKHsgeDogc2hhcGUueDEsIHk6IHNoYXBlLnkxIH0pO1xuICAgICAgaGFuZGxlcy5wdXNoKHsgeDogc2hhcGUueDIsIHk6IHNoYXBlLnkyIH0pO1xuICAgIH0gZWxzZSBpZiAoc2hhcGUudHlwZSA9PT0gJ2NpcmNsZScpIHtcbiAgICAgIGNvbnN0IHJhZGl1cyA9IE1hdGguc3FydChNYXRoLnBvdyhzaGFwZS54MiAtIHNoYXBlLngxLCAyKSArIE1hdGgucG93KHNoYXBlLnkyIC0gc2hhcGUueTEsIDIpKTtcbiAgICAgIGhhbmRsZXMucHVzaCh7IHg6IHNoYXBlLngxICsgcmFkaXVzLCB5OiBzaGFwZS55MSB9KTtcbiAgICAgIGhhbmRsZXMucHVzaCh7IHg6IHNoYXBlLngxIC0gcmFkaXVzLCB5OiBzaGFwZS55MSB9KTtcbiAgICAgIGhhbmRsZXMucHVzaCh7IHg6IHNoYXBlLngxLCB5OiBzaGFwZS55MSArIHJhZGl1cyB9KTtcbiAgICAgIGhhbmRsZXMucHVzaCh7IHg6IHNoYXBlLngxLCB5OiBzaGFwZS55MSAtIHJhZGl1cyB9KTtcbiAgICAgIGhhbmRsZXMucHVzaCh7IHg6IHNoYXBlLngxLCB5OiBzaGFwZS55MSwgaXNDZW50ZXI6IHRydWUgfSk7XG4gICAgfSBlbHNlIGlmIChzaGFwZS50eXBlID09PSAndGV4dCcpIHtcbiAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIGNvbnN0IHRleHRNZXRyaWNzID0gY3R4IS5tZWFzdXJlVGV4dChzaGFwZS50ZXh0KTtcbiAgICAgIGhhbmRsZXMucHVzaCh7IHg6IHNoYXBlLngsIHk6IHNoYXBlLnkgLSBzaGFwZS5mb250U2l6ZSwgaXNDZW50ZXI6IHRydWUgfSk7XG4gICAgICBoYW5kbGVzLnB1c2goeyB4OiBzaGFwZS54ICsgdGV4dE1ldHJpY3Mud2lkdGgsIHk6IHNoYXBlLnksIGlzQ2VudGVyOiBmYWxzZSB9KTtcbiAgICB9IGVsc2UgaWYgKHNoYXBlLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgIGhhbmRsZXMucHVzaCh7IHg6IHNoYXBlLngxLCB5OiBzaGFwZS55MSB9KTtcbiAgICAgIGhhbmRsZXMucHVzaCh7IHg6IHNoYXBlLngyLCB5OiBzaGFwZS55MSB9KTtcbiAgICAgIGhhbmRsZXMucHVzaCh7IHg6IHNoYXBlLngyLCB5OiBzaGFwZS55MiB9KTtcbiAgICAgIGhhbmRsZXMucHVzaCh7IHg6IHNoYXBlLngxLCB5OiBzaGFwZS55MiB9KTtcbiAgICAgIGhhbmRsZXMucHVzaCh7IHg6IChzaGFwZS54MSArIHNoYXBlLngyKSAvIDIsIHk6IChzaGFwZS55MSArIHNoYXBlLnkyKSAvIDIsIGlzQ2VudGVyOiB0cnVlIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBoYW5kbGVzLnB1c2goeyB4OiBzaGFwZS54MSwgeTogc2hhcGUueTEgfSk7XG4gICAgICBoYW5kbGVzLnB1c2goeyB4OiBzaGFwZS54MiwgeTogc2hhcGUueTEgfSk7XG4gICAgICBoYW5kbGVzLnB1c2goeyB4OiBzaGFwZS54MiwgeTogc2hhcGUueTIgfSk7XG4gICAgICBoYW5kbGVzLnB1c2goeyB4OiBzaGFwZS54MSwgeTogc2hhcGUueTIgfSk7XG4gICAgICBoYW5kbGVzLnB1c2goeyB4OiAoc2hhcGUueDEgKyBzaGFwZS54MikgLyAyLCB5OiAoc2hhcGUueTEgKyBzaGFwZS55MikgLyAyLCBpc0NlbnRlcjogdHJ1ZSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGhhbmRsZXMubWFwKChoYW5kbGUpID0+ICh7XG4gICAgICAuLi5oYW5kbGUsXG4gICAgICBpc0NlbnRlcjogaGFuZGxlLmlzQ2VudGVyIHx8IGZhbHNlLFxuICAgIH0pKTtcbiAgfVxuXG4gIGdldEhhbmRsZUF0UG9zaXRpb24oeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRTaGFwZSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UmVzaXplSGFuZGxlcyh0aGlzLnNlbGVjdGVkU2hhcGUpLmZpbmQoKGhhbmRsZSkgPT4ge1xuICAgICAgcmV0dXJuIE1hdGguYWJzKGhhbmRsZS54IC0geCkgPCA2ICYmIE1hdGguYWJzKGhhbmRsZS55IC0geSkgPCA2O1xuICAgIH0pO1xuICB9XG5cbiAgcmVzaXplU2hhcGUoc2hhcGU6IGFueSwgaGFuZGxlOiBhbnksIHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgaWYgKHNoYXBlLnR5cGUgPT09ICdsaW5lJykge1xuICAgICAgaWYgKGhhbmRsZS54ID09PSBzaGFwZS54MSAmJiBoYW5kbGUueSA9PT0gc2hhcGUueTEpIHtcbiAgICAgICAgc2hhcGUueDEgPSB4O1xuICAgICAgICBzaGFwZS55MSA9IHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaGFwZS54MiA9IHg7XG4gICAgICAgIHNoYXBlLnkyID0geTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNoYXBlLnR5cGUgPT09ICdjaXJjbGUnKSB7XG4gICAgICBjb25zdCBkeCA9IHggLSBzaGFwZS54MTtcbiAgICAgIGNvbnN0IGR5ID0geSAtIHNoYXBlLnkxO1xuICAgICAgY29uc3QgcmFkaXVzID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgIHNoYXBlLngyID0gc2hhcGUueDEgKyByYWRpdXM7XG4gICAgICBzaGFwZS55MiA9IHNoYXBlLnkxO1xuICAgIH0gZWxzZSBpZiAoc2hhcGUudHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICBpZiAoaGFuZGxlLmlzQ2VudGVyKSB7XG4gICAgICAgIHNoYXBlLnggPSB4O1xuICAgICAgICBzaGFwZS55ID0geTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHRleHRNZXRyaWNzID0gdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC5nZXRDb250ZXh0KCcyZCcpIS5tZWFzdXJlVGV4dChzaGFwZS50ZXh0KTtcbiAgICAgICAgc2hhcGUueCA9IHggLSB0ZXh0TWV0cmljcy53aWR0aDtcbiAgICAgICAgc2hhcGUueSA9IHk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzaGFwZS50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICBpZiAoaGFuZGxlLmlzQ2VudGVyKSB7XG4gICAgICAgIGNvbnN0IGR4ID0geCAtIChzaGFwZS54MSArIHNoYXBlLngyKSAvIDI7XG4gICAgICAgIGNvbnN0IGR5ID0geSAtIChzaGFwZS55MSArIHNoYXBlLnkyKSAvIDI7XG4gICAgICAgIHRoaXMubW92ZVNoYXBlKHNoYXBlLCBkeCwgZHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGhhbmRsZS54ID09PSBzaGFwZS54MSAmJiBoYW5kbGUueSA9PT0gc2hhcGUueTEpIHtcbiAgICAgICAgICBzaGFwZS54MSA9IHg7XG4gICAgICAgICAgc2hhcGUueTEgPSB5O1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZS54ID09PSBzaGFwZS54MiAmJiBoYW5kbGUueSA9PT0gc2hhcGUueTEpIHtcbiAgICAgICAgICBzaGFwZS54MiA9IHg7XG4gICAgICAgICAgc2hhcGUueTEgPSB5O1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZS54ID09PSBzaGFwZS54MiAmJiBoYW5kbGUueSA9PT0gc2hhcGUueTIpIHtcbiAgICAgICAgICBzaGFwZS54MiA9IHg7XG4gICAgICAgICAgc2hhcGUueTIgPSB5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNoYXBlLngxID0geDtcbiAgICAgICAgICBzaGFwZS55MiA9IHk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGhhbmRsZS5pc0NlbnRlcikge1xuICAgICAgICBjb25zdCBkeCA9IHggLSAoc2hhcGUueDEgKyBzaGFwZS54MikgLyAyO1xuICAgICAgICBjb25zdCBkeSA9IHkgLSAoc2hhcGUueTEgKyBzaGFwZS55MikgLyAyO1xuICAgICAgICB0aGlzLm1vdmVTaGFwZShzaGFwZSwgZHgsIGR5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChoYW5kbGUueCA9PT0gc2hhcGUueDEgJiYgaGFuZGxlLnkgPT09IHNoYXBlLnkxKSB7XG4gICAgICAgICAgc2hhcGUueDEgPSB4O1xuICAgICAgICAgIHNoYXBlLnkxID0geTtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGUueCA9PT0gc2hhcGUueDIgJiYgaGFuZGxlLnkgPT09IHNoYXBlLnkxKSB7XG4gICAgICAgICAgc2hhcGUueDIgPSB4O1xuICAgICAgICAgIHNoYXBlLnkxID0geTtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGUueCA9PT0gc2hhcGUueDIgJiYgaGFuZGxlLnkgPT09IHNoYXBlLnkyKSB7XG4gICAgICAgICAgc2hhcGUueDIgPSB4O1xuICAgICAgICAgIHNoYXBlLnkyID0geTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzaGFwZS54MSA9IHg7XG4gICAgICAgICAgc2hhcGUueTIgPSB5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZHJhd1NoYXBlcygpO1xuICB9XG5cbiAgbW92ZVNoYXBlKHNoYXBlOiBhbnksIGR4OiBudW1iZXIsIGR5OiBudW1iZXIpIHtcbiAgICBpZiAoc2hhcGUudHlwZSA9PT0gJ2xpbmUnIHx8IHNoYXBlLnR5cGUgPT09ICdjaXJjbGUnKSB7XG4gICAgICBzaGFwZS54MSArPSBkeDtcbiAgICAgIHNoYXBlLnkxICs9IGR5O1xuICAgICAgc2hhcGUueDIgKz0gZHg7XG4gICAgICBzaGFwZS55MiArPSBkeTtcbiAgICB9IGVsc2UgaWYgKHNoYXBlLnR5cGUgPT09ICdmcmVlaGFuZCcpIHtcbiAgICAgIHNoYXBlLnBvaW50cy5mb3JFYWNoKChwb2ludDogYW55KSA9PiB7XG4gICAgICAgIHBvaW50LnggKz0gZHg7XG4gICAgICAgIHBvaW50LnkgKz0gZHk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHNoYXBlLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgc2hhcGUueCArPSBkeDtcbiAgICAgIHNoYXBlLnkgKz0gZHk7XG4gICAgfSBlbHNlIGlmIChzaGFwZS50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICBzaGFwZS54MSArPSBkeDtcbiAgICAgIHNoYXBlLnkxICs9IGR5O1xuICAgICAgc2hhcGUueDIgKz0gZHg7XG4gICAgICBzaGFwZS55MiArPSBkeTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2hhcGUueDEgKz0gZHg7XG4gICAgICBzaGFwZS55MSArPSBkeTtcbiAgICAgIHNoYXBlLngyICs9IGR4O1xuICAgICAgc2hhcGUueTIgKz0gZHk7XG4gICAgfVxuICB9XG5cbiAgZG93bmxvYWRDYW52YXModGVtcENhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICBjb25zdCBsaW5rID0gdGhpcy5kb3dubG9hZExpbmtSZWYubmF0aXZlRWxlbWVudDtcbiAgICBsaW5rLmhyZWYgPSB0ZW1wQ2FudmFzLnRvRGF0YVVSTCgpO1xuICAgIGxpbmsuZG93bmxvYWQgPSAnd2hpdGVib2FyZC5wbmcnO1xuICAgIGxpbmsuY2xpY2soKTtcbiAgfVxuXG4gIHNhdmVDYW52YXMoKSB7XG4gICAgY29uc3QgdGVtcENhbnZhcyA9IHRoaXMudGVtcENhbnZhc1JlZi5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IHRlbXBDdHggPSB0ZW1wQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGVtcENhbnZhcy53aWR0aCA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQud2lkdGg7XG4gICAgdGVtcENhbnZhcy5oZWlnaHQgPSB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmhlaWdodDtcbiAgICBjb25zdCBub3RTaGFwZXMgPSBbJ2ZyZWVoYW5kJywgJ3RleHQnLCAnaW1hZ2UnLCAnbGluZSddO1xuXG4gICAgaWYgKHRoaXMucGFyYW1ldGVycy51c2VJbWFnZUJhY2tncm91bmQpIHtcbiAgICAgIGNvbnN0IGJhY2tncm91bmRJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgYmFja2dyb3VuZEltYWdlLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICB0ZW1wQ3R4IS5kcmF3SW1hZ2UoYmFja2dyb3VuZEltYWdlLCAwLCAwLCB0ZW1wQ2FudmFzLndpZHRoLCB0ZW1wQ2FudmFzLmhlaWdodCk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFwZXMuZm9yRWFjaCgoc2hhcGU6IGFueSkgPT4ge1xuICAgICAgICAgICFub3RTaGFwZXMuaW5jbHVkZXMoc2hhcGUudHlwZSlcbiAgICAgICAgICAgID8gdGhpcy5kcmF3U2hhcGUoXG4gICAgICAgICAgICAgICAgc2hhcGUudHlwZSxcbiAgICAgICAgICAgICAgICBzaGFwZS54MSxcbiAgICAgICAgICAgICAgICBzaGFwZS55MSxcbiAgICAgICAgICAgICAgICBzaGFwZS54MixcbiAgICAgICAgICAgICAgICBzaGFwZS55MixcbiAgICAgICAgICAgICAgICBzaGFwZS5jb2xvcixcbiAgICAgICAgICAgICAgICBzaGFwZS50aGlja25lc3MsXG4gICAgICAgICAgICAgICAgc2hhcGUubGluZVR5cGUsXG4gICAgICAgICAgICAgICAgdGVtcEN0eCEsXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogdGhpcy5kcmF3U2hhcGVPbkNhbnZhcyhzaGFwZSwgdGVtcEN0eCEpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kb3dubG9hZENhbnZhcyh0ZW1wQ2FudmFzKTtcbiAgICAgIH07XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2Uuc3JjID0gJ2h0dHBzOi8vbWVkaWFzZnUuY29tL2ltYWdlcy9zdmcvZ3JhcGhfcGFwZXIuanBnJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGVtcEN0eCEuZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICAgIHRlbXBDdHghLmZpbGxSZWN0KDAsIDAsIHRlbXBDYW52YXMud2lkdGgsIHRlbXBDYW52YXMuaGVpZ2h0KTtcblxuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNoYXBlcy5mb3JFYWNoKChzaGFwZTogYW55KSA9PiB7XG4gICAgICAgICFub3RTaGFwZXMuaW5jbHVkZXMoc2hhcGUudHlwZSlcbiAgICAgICAgICA/IHRoaXMuZHJhd1NoYXBlKFxuICAgICAgICAgICAgICBzaGFwZS50eXBlLFxuICAgICAgICAgICAgICBzaGFwZS54MSxcbiAgICAgICAgICAgICAgc2hhcGUueTEsXG4gICAgICAgICAgICAgIHNoYXBlLngyLFxuICAgICAgICAgICAgICBzaGFwZS55MixcbiAgICAgICAgICAgICAgc2hhcGUuY29sb3IsXG4gICAgICAgICAgICAgIHNoYXBlLnRoaWNrbmVzcyxcbiAgICAgICAgICAgICAgc2hhcGUubGluZVR5cGUsXG4gICAgICAgICAgICAgIHRlbXBDdHghLFxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogdGhpcy5kcmF3U2hhcGVPbkNhbnZhcyhzaGFwZSwgdGVtcEN0eCEpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmRvd25sb2FkQ2FudmFzKHRlbXBDYW52YXMpO1xuICAgIH1cbiAgfVxuXG4gIGRyYXdTaGFwZU9uQ2FudmFzKFxuICAgIHNoYXBlOiBhbnksXG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmdldENvbnRleHQoJzJkJykhLFxuICApIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gc2hhcGUuY29sb3I7XG4gICAgY3R4LmxpbmVXaWR0aCA9IHNoYXBlLnRoaWNrbmVzcyB8fCAyO1xuICAgIGN0eC5maWxsU3R5bGUgPSBzaGFwZS5jb2xvcjtcbiAgICBjdHguZm9udCA9IGAke3NoYXBlLmZvbnRTaXplfXB4ICR7c2hhcGUuZm9udEZhbWlseX1gO1xuXG4gICAgY29uc3QgbGluZVR5cGUgPSBzaGFwZS5saW5lVHlwZSA/IHNoYXBlLmxpbmVUeXBlIDogJ3NvbGlkJztcblxuICAgIGlmIChsaW5lVHlwZSA9PT0gJ2Rhc2hlZCcpIHtcbiAgICAgIGN0eC5zZXRMaW5lRGFzaChbMTAsIDEwXSk7XG4gICAgfSBlbHNlIGlmIChsaW5lVHlwZSA9PT0gJ2RvdHRlZCcpIHtcbiAgICAgIGN0eC5zZXRMaW5lRGFzaChbMiwgMTBdKTtcbiAgICB9IGVsc2UgaWYgKGxpbmVUeXBlID09PSAnZGFzaERvdCcpIHtcbiAgICAgIGN0eC5zZXRMaW5lRGFzaChbMTAsIDUsIDIsIDVdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3R4LnNldExpbmVEYXNoKFtdKTtcbiAgICB9XG4gICAgc3dpdGNoIChzaGFwZS50eXBlKSB7XG4gICAgICBjYXNlICdsaW5lJzpcbiAgICAgICAgY3R4Lm1vdmVUbyhzaGFwZS54MSwgc2hhcGUueTEpO1xuICAgICAgICBjdHgubGluZVRvKHNoYXBlLngyLCBzaGFwZS55Mik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZnJlZWhhbmQnOlxuICAgICAgICB0cnkge1xuICAgICAgICAgIGN0eC5tb3ZlVG8oc2hhcGUucG9pbnRzWzBdLngsIHNoYXBlLnBvaW50c1swXS55KTtcbiAgICAgICAgICBzaGFwZS5wb2ludHMuZm9yRWFjaCgocG9pbnQ6IGFueSkgPT4gY3R4LmxpbmVUbyhwb2ludC54LCBwb2ludC55KSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIC8vY29uc29sZS5sb2coJ0Vycm9yIGRyYXdpbmcgZnJlZWhhbmQgc2hhcGUnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICBjdHguZmlsbFRleHQoc2hhcGUudGV4dCwgc2hhcGUueCwgc2hhcGUueSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgICBjdHguZHJhd0ltYWdlKHNoYXBlLmltZywgc2hhcGUueDEsIHNoYXBlLnkxLCBzaGFwZS54MiAtIHNoYXBlLngxLCBzaGFwZS55MiAtIHNoYXBlLnkxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgY3R4LnN0cm9rZSgpO1xuICB9XG5cbiAgZGVsZXRlU2hhcGUoZG9FbWl0cyA9IHRydWUpIHtcbiAgICBpZiAoIXRoaXMuY2hlY2tCb2FyZEFjY2VzcygpKSByZXR1cm47XG5cbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRTaGFwZSkgcmV0dXJuO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkU2hhcGUpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFwZXMgPSB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzLmZpbHRlcihcbiAgICAgICAgKHNoYXBlOiBhbnkpID0+IHNoYXBlICE9PSB0aGlzLnNlbGVjdGVkU2hhcGUsXG4gICAgICApO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVNoYXBlcyh0aGlzLnBhcmFtZXRlcnMuc2hhcGVzKTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRTaGFwZSA9IG51bGw7XG4gICAgICBpZiAoZG9FbWl0cykge1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc29ja2V0LmVtaXQoXG4gICAgICAgICAgJ3VwZGF0ZUJvYXJkQWN0aW9uJyxcbiAgICAgICAgICB7IGFjdGlvbjogJ3NoYXBlcycsIHBheWxvYWQ6IHsgc2hhcGVzOiB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzIH0gfSxcbiAgICAgICAgICB0aGlzLmhhbmRsZVNlcnZlclJlc3BvbnNlLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlQmFja2dyb3VuZCA9IChkb0VtaXRzID0gdHJ1ZSkgPT4ge1xuICAgIGlmIChkb0VtaXRzICYmICF0aGlzLmNoZWNrQm9hcmRBY2Nlc3MoKSkgcmV0dXJuO1xuICAgIHRoaXMucGFyYW1ldGVycy51c2VJbWFnZUJhY2tncm91bmQgPSAhdGhpcy5wYXJhbWV0ZXJzLnVzZUltYWdlQmFja2dyb3VuZDtcbiAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlVXNlSW1hZ2VCYWNrZ3JvdW5kKHRoaXMucGFyYW1ldGVycy51c2VJbWFnZUJhY2tncm91bmQpO1xuICAgIGNvbnN0IHRvZ2dsZUJ1dHRvbiA9IHRoaXMudG9nZ2xlQmFja2dyb3VuZFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGlmICh0aGlzLnBhcmFtZXRlcnMudXNlSW1hZ2VCYWNrZ3JvdW5kKSB7XG4gICAgICB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJ2h0dHBzOi8vbWVkaWFzZnUuY29tL2ltYWdlcy9zdmcvZ3JhcGhfcGFwZXIuanBnJylgO1xuICAgICAgdG9nZ2xlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICdub25lJztcbiAgICAgIHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgICAgIHRvZ2dsZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG4gICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgaWYgKGRvRW1pdHMpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zb2NrZXQuZW1pdChcbiAgICAgICAgJ3VwZGF0ZUJvYXJkQWN0aW9uJyxcbiAgICAgICAgeyBhY3Rpb246ICd0b2dnbGVCYWNrZ3JvdW5kJywgcGF5bG9hZDogdGhpcy5wYXJhbWV0ZXJzLnVzZUltYWdlQmFja2dyb3VuZCB9LFxuICAgICAgICB0aGlzLmhhbmRsZVNlcnZlclJlc3BvbnNlLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgY2xlYXJDYW52YXMgPSAoZG9FbWl0cyA9IHRydWUpID0+IHtcbiAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLmlzbGV2ZWwgIT0gJzInICYmIGRvRW1pdHMpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdZb3UgZG8gbm90IGhhdmUgcGVybWlzc2lvbiB0byBjbGVhciB0aGUgYm9hcmQnLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLnNoYXBlcy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzID0gW107XG4gICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVNoYXBlcyhbXSk7XG4gICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgaWYgKGRvRW1pdHMpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zb2NrZXQuZW1pdChcbiAgICAgICAgJ3VwZGF0ZUJvYXJkQWN0aW9uJyxcbiAgICAgICAgeyBhY3Rpb246ICdjbGVhcicgfSxcbiAgICAgICAgdGhpcy5oYW5kbGVTZXJ2ZXJSZXNwb25zZSxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIHVwbG9hZEltYWdlID0gKGV2ZW50OiBhbnksIGRvRW1pdHMgPSB0cnVlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghdGhpcy5jaGVja0JvYXJkQWNjZXNzKCkpIHJldHVybjtcbiAgICAgIGNvbnN0IGZpbGUgPSBldmVudC50YXJnZXQuZmlsZXNbMF07XG4gICAgICBpZiAoZmlsZS5zaXplID4gMTAyNCAqIDEwMjQpIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHsgbWVzc2FnZTogJ0ZpbGUgc2l6ZSBtdXN0IGJlIGxlc3MgdGhhbiAxTUInLCB0eXBlOiAnZGFuZ2VyJyB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgcmVhZGVyLm9ubG9hZCA9IChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWcuY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJztcbiAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICBpZiAoaW1nLmhlaWdodCA+IDYwMCAmJiBpbWcuaGVpZ2h0ID4gaW1nLndpZHRoICYmICFmaWxlLnR5cGUuaW5jbHVkZXMoJ2pwZWcnKSkge1xuICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ0ZvciBiZXR0ZXIgcGVyZm9ybWFuY2UsIHBsZWFzZSB1cGxvYWQgdGhlIGltYWdlIGluIEpQRyBmb3JtYXQuJyxcbiAgICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgaW1hZ2VXaWR0aCA9IDM1MDtcbiAgICAgICAgICBjb25zdCBhc3BlY3RSYXRpbyA9IGltZy5oZWlnaHQgLyBpbWcud2lkdGg7XG4gICAgICAgICAgbGV0IGltYWdlSGVpZ2h0ID0gaW1hZ2VXaWR0aCAqIGFzcGVjdFJhdGlvO1xuICAgICAgICAgIGNvbnN0IG1heEhlaWdodCA9IDYwMDtcbiAgICAgICAgICBpZiAoaW1hZ2VIZWlnaHQgPiBtYXhIZWlnaHQpIHtcbiAgICAgICAgICAgIGltYWdlSGVpZ2h0ID0gbWF4SGVpZ2h0O1xuICAgICAgICAgICAgaW1hZ2VXaWR0aCA9IGltYWdlSGVpZ2h0IC8gYXNwZWN0UmF0aW87XG4gICAgICAgICAgICBpZiAoaW1hZ2VXaWR0aCA+IDYwMCkge1xuICAgICAgICAgICAgICBpbWFnZVdpZHRoID0gNjAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBpbWFnZVNoYXBlID0ge1xuICAgICAgICAgICAgdHlwZTogJ2ltYWdlJyxcbiAgICAgICAgICAgIGltZzogaW1nLFxuICAgICAgICAgICAgc3JjOiBldmVudC50YXJnZXQucmVzdWx0LFxuICAgICAgICAgICAgeDE6IDUwLFxuICAgICAgICAgICAgeTE6IDUwLFxuICAgICAgICAgICAgeDI6IDUwICsgaW1hZ2VXaWR0aCxcbiAgICAgICAgICAgIHkyOiA1MCArIGltYWdlSGVpZ2h0LFxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNoYXBlcy5wdXNoKGltYWdlU2hhcGUpO1xuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVTaGFwZXModGhpcy5wYXJhbWV0ZXJzLnNoYXBlcyk7XG4gICAgICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgICAgICAgaWYgKGRvRW1pdHMpIHtcbiAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5zb2NrZXQuZW1pdChcbiAgICAgICAgICAgICAgJ3VwZGF0ZUJvYXJkQWN0aW9uJyxcbiAgICAgICAgICAgICAgeyBhY3Rpb246ICd1cGxvYWRJbWFnZScsIHBheWxvYWQ6IGltYWdlU2hhcGUgfSxcbiAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTZXJ2ZXJSZXNwb25zZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpbWcub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0Py4oeyBtZXNzYWdlOiAnRXJyb3IgbG9hZGluZyBpbWFnZScsIHR5cGU6ICdkYW5nZXInIH0pO1xuICAgICAgICB9O1xuICAgICAgICBpbWcuc3JjID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgIH07XG4gICAgICByZWFkZXIub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHsgbWVzc2FnZTogJ0Vycm9yIHJlYWRpbmcgZmlsZScsIHR5cGU6ICdkYW5nZXInIH0pO1xuICAgICAgfTtcbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlU2VydmVyUmVzcG9uc2UgPSAocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgIGlmICghcmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogYFdoaXRlYm9hcmQgYWN0aW9uIGZhaWxlZDogJHtyZXNwb25zZS5yZWFzb259YCxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgV2hpdGVib2FyZEFjdGlvbiA9IChkYXRhOiBhbnkpID0+IHtcbiAgICBjb25zdCB7IGFjdGlvbiwgcGF5bG9hZCB9ID0gZGF0YTtcblxuICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBpZiAoIWN0eCkgcmV0dXJuO1xuICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVDYW52YXNXaGl0ZWJvYXJkKHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgIGNhc2UgJ2RyYXcnOlxuICAgICAgICBpZiAocGF5bG9hZC50eXBlID09PSAnZnJlZWhhbmQnKSB7XG4gICAgICAgICAgdGhpcy5kcmF3RnJlZWhhbmQocGF5bG9hZC5wb2ludHMsIHBheWxvYWQuY29sb3IsIHBheWxvYWQudGhpY2tuZXNzKTtcbiAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogJ2ZyZWVoYW5kJyxcbiAgICAgICAgICAgIHBvaW50czogcGF5bG9hZC5wb2ludHMsXG4gICAgICAgICAgICBjb2xvcjogcGF5bG9hZC5jb2xvcixcbiAgICAgICAgICAgIHRoaWNrbmVzczogcGF5bG9hZC50aGlja25lc3MsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVNoYXBlcyh0aGlzLnBhcmFtZXRlcnMuc2hhcGVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmRyYXdMaW5lKFxuICAgICAgICAgICAgcGF5bG9hZC54MSxcbiAgICAgICAgICAgIHBheWxvYWQueTEsXG4gICAgICAgICAgICBwYXlsb2FkLngyLFxuICAgICAgICAgICAgcGF5bG9hZC55MixcbiAgICAgICAgICAgIHBheWxvYWQuY29sb3IsXG4gICAgICAgICAgICBwYXlsb2FkLnRoaWNrbmVzcyxcbiAgICAgICAgICAgIHBheWxvYWQubGluZVR5cGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgeDE6IHBheWxvYWQueDEsXG4gICAgICAgICAgICB5MTogcGF5bG9hZC55MSxcbiAgICAgICAgICAgIHgyOiBwYXlsb2FkLngyLFxuICAgICAgICAgICAgeTI6IHBheWxvYWQueTIsXG4gICAgICAgICAgICBjb2xvcjogcGF5bG9hZC5jb2xvcixcbiAgICAgICAgICAgIHRoaWNrbmVzczogcGF5bG9hZC50aGlja25lc3MsXG4gICAgICAgICAgICBsaW5lVHlwZTogcGF5bG9hZC5saW5lVHlwZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlU2hhcGVzKHRoaXMucGFyYW1ldGVycy5zaGFwZXMpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2hhcGUnOlxuICAgICAgICB0aGlzLmRyYXdTaGFwZShcbiAgICAgICAgICBwYXlsb2FkLnR5cGUsXG4gICAgICAgICAgcGF5bG9hZC54MSxcbiAgICAgICAgICBwYXlsb2FkLnkxLFxuICAgICAgICAgIHBheWxvYWQueDIsXG4gICAgICAgICAgcGF5bG9hZC55MixcbiAgICAgICAgICBwYXlsb2FkLmNvbG9yLFxuICAgICAgICAgIHBheWxvYWQudGhpY2tuZXNzLFxuICAgICAgICAgIHBheWxvYWQubGluZVR5cGUsXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFwZXMucHVzaCh7XG4gICAgICAgICAgdHlwZTogcGF5bG9hZC50eXBlLFxuICAgICAgICAgIHgxOiBwYXlsb2FkLngxLFxuICAgICAgICAgIHkxOiBwYXlsb2FkLnkxLFxuICAgICAgICAgIHgyOiBwYXlsb2FkLngyLFxuICAgICAgICAgIHkyOiBwYXlsb2FkLnkyLFxuICAgICAgICAgIGNvbG9yOiBwYXlsb2FkLmNvbG9yLFxuICAgICAgICAgIHRoaWNrbmVzczogcGF5bG9hZC50aGlja25lc3MsXG4gICAgICAgICAgbGluZVR5cGU6IHBheWxvYWQubGluZVR5cGUsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlU2hhcGVzKHRoaXMucGFyYW1ldGVycy5zaGFwZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2VyYXNlJzpcbiAgICAgICAgdGhpcy5lcmFzZShwYXlsb2FkLngsIHBheWxvYWQueSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2xlYXInOlxuICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKGZhbHNlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd1cGxvYWRJbWFnZSc6IHtcbiAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltZy5jcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xuICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGltYWdlU2hhcGUgPSB7XG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UnLFxuICAgICAgICAgICAgaW1nLFxuICAgICAgICAgICAgc3JjOiBwYXlsb2FkLnNyYyxcbiAgICAgICAgICAgIHgxOiBwYXlsb2FkLngxLFxuICAgICAgICAgICAgeTE6IHBheWxvYWQueTEsXG4gICAgICAgICAgICB4MjogcGF5bG9hZC54MixcbiAgICAgICAgICAgIHkyOiBwYXlsb2FkLnkyLFxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNoYXBlcy5wdXNoKGltYWdlU2hhcGUpO1xuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVTaGFwZXModGhpcy5wYXJhbWV0ZXJzLnNoYXBlcyk7XG4gICAgICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgICAgIH07XG4gICAgICAgIGltZy5zcmMgPSBwYXlsb2FkLnNyYztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICd0b2dnbGVCYWNrZ3JvdW5kJzpcbiAgICAgICAgdGhpcy50b2dnbGVCYWNrZ3JvdW5kKGZhbHNlKTtcbiAgICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndW5kbyc6XG4gICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuc2hhcGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMucmVkb1N0YWNrLnB1c2godGhpcy5wYXJhbWV0ZXJzLnNoYXBlcy5wb3AoKSEpO1xuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVSZWRvU3RhY2sodGhpcy5wYXJhbWV0ZXJzLnJlZG9TdGFjayk7XG4gICAgICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZWRvJzpcbiAgICAgICAgaWYgKHRoaXMucGFyYW1ldGVycy5yZWRvU3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFwZXMucHVzaCh0aGlzLnBhcmFtZXRlcnMucmVkb1N0YWNrLnBvcCgpISk7XG4gICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVNoYXBlcyh0aGlzLnBhcmFtZXRlcnMuc2hhcGVzKTtcbiAgICAgICAgICB0aGlzLmRyYXdTaGFwZXMoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzLnB1c2goe1xuICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICB0ZXh0OiBwYXlsb2FkLnRleHQsXG4gICAgICAgICAgeDogcGF5bG9hZC54LFxuICAgICAgICAgIHk6IHBheWxvYWQueSxcbiAgICAgICAgICBjb2xvcjogcGF5bG9hZC5jb2xvcixcbiAgICAgICAgICBmb250OiBwYXlsb2FkLmZvbnQsXG4gICAgICAgICAgZm9udFNpemU6IHBheWxvYWQuZm9udFNpemUsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlU2hhcGVzKHRoaXMucGFyYW1ldGVycy5zaGFwZXMpO1xuICAgICAgICB0aGlzLmRyYXdTaGFwZXMoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkZWxldGVTaGFwZSc6XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFwZXMgPSB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzLmZpbHRlcigoc2hhcGU6IGFueSkgPT4gc2hhcGUgIT09IHBheWxvYWQpO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlU2hhcGVzKHRoaXMucGFyYW1ldGVycy5zaGFwZXMpO1xuICAgICAgICB0aGlzLmRyYXdTaGFwZXMoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzaGFwZXMnOiB7XG4gICAgICAgIGNvbnN0IG9sZFNoYXBlcyA9IHRoaXMucGFyYW1ldGVycy5zaGFwZXMuZmlsdGVyKChzaGFwZTogYW55KSA9PiBzaGFwZS50eXBlID09PSAnaW1hZ2UnKTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNoYXBlcyA9IHBheWxvYWQuc2hhcGVzLm1hcCgoc2hhcGU6IGFueSkgPT4ge1xuICAgICAgICAgIGlmIChzaGFwZS50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICBjb25zdCBvbGRTaGFwZSA9IG9sZFNoYXBlcy5maW5kKChvbGRTaGFwZTogYW55KSA9PiBvbGRTaGFwZS5zcmMgPT09IHNoYXBlLnNyYyk7XG4gICAgICAgICAgICBpZiAob2xkU2hhcGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgLi4uc2hhcGUsIGltZzogb2xkU2hhcGUuaW1nIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgaW1nLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG4gICAgICAgICAgICAgIGltZy5zcmMgPSBzaGFwZS5zcmM7XG4gICAgICAgICAgICAgIHJldHVybiB7IC4uLnNoYXBlLCBpbWcgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNoYXBlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVTaGFwZXModGhpcy5wYXJhbWV0ZXJzLnNoYXBlcyk7XG4gICAgICAgIHRoaXMuZHJhd1NoYXBlcygpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcblxuICBXaGl0ZWJvYXJkVXBkYXRlZCA9IChkYXRhOiBhbnkpID0+IHtcbiAgICAvLyBkYXRhID0geyB3aGl0ZWJvYXJkVXNlcnMsIHN0YXR1c31cbiAgICAvLyBzdGF0dXMgPSAnc3RhcnRlZCcsICdlbmRlZCcsICd1cGRhdGVkJ1xuICAgIC8vIHdoaXRlYm9hcmRVc2VycyBhcnJheVxuICAgIC8vIG1lbWJlcnMgKHBhcnRpY2lwYW50cykgYXJyYXkgb25seSBzZW50IHRvIHRoZSBob3N0XG4gICAgLy93aGl0ZWJvYXJkRGF0YSA9IHtzaGFwZXM9W10sIHVzZUltYWdlQmFja2dyb3VuZD1Cb29sZWFuLCByZWRvU3RhY2s9W10sIHVuZG9TdGFjaz1bXX0gb3Ige30gb3IgbnVsbFxuICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBpZiAoIWN0eCkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMucGFyYW1ldGVycy5pc2xldmVsID09ICcyJyAmJiBkYXRhLm1lbWJlcnMpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5wYXJ0aWNpcGFudHNBbGwgPSBkYXRhLm1lbWJlcnMubWFwKChwYXJ0aWNpcGFudDogYW55KSA9PiAoe1xuICAgICAgICBpc0Jhbm5lZDogcGFydGljaXBhbnQuaXNCYW5uZWQsXG4gICAgICAgIG5hbWU6IHBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICB9KSk7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMucGFydGljaXBhbnRzID0gZGF0YS5tZW1iZXJzLmZpbHRlcihcbiAgICAgICAgKHBhcnRpY2lwYW50OiBhbnkpID0+IHBhcnRpY2lwYW50LmlzQmFubmVkID09IGZhbHNlLFxuICAgICAgKTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVQYXJ0aWNpcGFudHModGhpcy5wYXJhbWV0ZXJzLnBhcnRpY2lwYW50cyk7XG4gICAgfVxuXG4gICAgdGhpcy5wYXJhbWV0ZXJzLndoaXRlYm9hcmRVc2VycyA9IGRhdGEud2hpdGVib2FyZFVzZXJzO1xuICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVXaGl0ZWJvYXJkVXNlcnModGhpcy5wYXJhbWV0ZXJzLndoaXRlYm9hcmRVc2Vycyk7XG5cbiAgICBjb25zdCB1c2VCb2FyZCA9IHRoaXMucGFyYW1ldGVycy53aGl0ZWJvYXJkVXNlcnMuZmluZChcbiAgICAgICh1c2VyOiBhbnkpID0+IHVzZXIubmFtZSA9PSB0aGlzLnBhcmFtZXRlcnMubWVtYmVyICYmIHVzZXIudXNlQm9hcmQsXG4gICAgKVxuICAgICAgPyB0cnVlXG4gICAgICA6IGZhbHNlO1xuICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuaXNsZXZlbCAhPSAnMicgJiYgIXVzZUJvYXJkICYmICF0aGlzLnBhcmFtZXRlcnMud2hpdGVib2FyZEVuZGVkKSB7XG4gICAgICB0aGlzLmNoYW5nZU1vZGUoJ3BhbicpO1xuICAgIH1cblxuICAgIGlmIChkYXRhLndoaXRlYm9hcmREYXRhICYmIE9iamVjdC5rZXlzKGRhdGEud2hpdGVib2FyZERhdGEpLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChkYXRhLndoaXRlYm9hcmREYXRhLnNoYXBlcykge1xuICAgICAgICBjb25zdCBvbGRTaGFwZXMgPSB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzLmZpbHRlcigoc2hhcGU6IGFueSkgPT4gc2hhcGUudHlwZSA9PT0gJ2ltYWdlJyk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFwZXMgPSBkYXRhLndoaXRlYm9hcmREYXRhLnNoYXBlcy5tYXAoKHNoYXBlOiBhbnkpID0+IHtcbiAgICAgICAgICBpZiAoc2hhcGUudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgY29uc3Qgb2xkU2hhcGUgPSBvbGRTaGFwZXMuZmluZCgob2xkU2hhcGU6IGFueSkgPT4gb2xkU2hhcGUuc3JjID09PSBzaGFwZS5zcmMpO1xuICAgICAgICAgICAgaWYgKG9sZFNoYXBlKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IC4uLnNoYXBlLCBpbWc6IG9sZFNoYXBlLmltZyB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgIGltZy5jcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xuICAgICAgICAgICAgICBpbWcuc3JjID0gc2hhcGUuc3JjO1xuICAgICAgICAgICAgICByZXR1cm4geyAuLi5zaGFwZSwgaW1nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzaGFwZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlU2hhcGVzKHRoaXMucGFyYW1ldGVycy5zaGFwZXMpO1xuICAgICAgfVxuICAgICAgaWYgKGRhdGEud2hpdGVib2FyZERhdGEudXNlSW1hZ2VCYWNrZ3JvdW5kICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVzZUltYWdlQmFja2dyb3VuZCA9IGRhdGEud2hpdGVib2FyZERhdGEudXNlSW1hZ2VCYWNrZ3JvdW5kO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlVXNlSW1hZ2VCYWNrZ3JvdW5kKHRoaXMucGFyYW1ldGVycy51c2VJbWFnZUJhY2tncm91bmQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVzZUltYWdlQmFja2dyb3VuZCA9IHRydWU7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVVc2VJbWFnZUJhY2tncm91bmQodHJ1ZSk7XG4gICAgICB9XG4gICAgICBpZiAoZGF0YS53aGl0ZWJvYXJkRGF0YS5yZWRvU3RhY2spIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnJlZG9TdGFjayA9IGRhdGEud2hpdGVib2FyZERhdGEucmVkb1N0YWNrO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlUmVkb1N0YWNrKHRoaXMucGFyYW1ldGVycy5yZWRvU3RhY2spO1xuICAgICAgfVxuICAgICAgaWYgKGRhdGEud2hpdGVib2FyZERhdGEudW5kb1N0YWNrKSB7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy51bmRvU3RhY2sgPSBkYXRhLndoaXRlYm9hcmREYXRhLnVuZG9TdGFjaztcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVVuZG9TdGFjayh0aGlzLnBhcmFtZXRlcnMudW5kb1N0YWNrKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGF0YS5zdGF0dXMgPT0gJ3N0YXJ0ZWQnICYmICF0aGlzLnBhcmFtZXRlcnMud2hpdGVib2FyZFN0YXJ0ZWQpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy53aGl0ZWJvYXJkU3RhcnRlZCA9IHRydWU7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMud2hpdGVib2FyZEVuZGVkID0gZmFsc2U7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMuc2NyZWVuSWQgPSBgd2hpdGVib2FyZC0ke3RoaXMucGFyYW1ldGVycy5yb29tTmFtZX1gO1xuXG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlV2hpdGVib2FyZFN0YXJ0ZWQodHJ1ZSk7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlV2hpdGVib2FyZEVuZGVkKGZhbHNlKTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVTY3JlZW5JZCh0aGlzLnBhcmFtZXRlcnMuc2NyZWVuSWQpO1xuXG4gICAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLmlzbGV2ZWwgIT0gJzInKSB7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFyZVNjcmVlblN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkKHRydWUpO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMub25TY3JlZW5DaGFuZ2VzKHsgY2hhbmdlZDogdHJ1ZSwgcGFyYW1ldGVyczogdGhpcy5wYXJhbWV0ZXJzIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGF0YS5zdGF0dXMgPT0gJ2VuZGVkJykge1xuICAgICAgY29uc3QgcHJldldoaXRlYm9hcmRFbmRlZCA9IHRoaXMucGFyYW1ldGVycy53aGl0ZWJvYXJkRW5kZWQ7XG4gICAgICBjb25zdCBwcmV2V2hpdGVib2FyZFN0YXJ0ZWQgPSB0aGlzLnBhcmFtZXRlcnMud2hpdGVib2FyZFN0YXJ0ZWQ7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMud2hpdGVib2FyZEVuZGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy53aGl0ZWJvYXJkU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVdoaXRlYm9hcmRTdGFydGVkKGZhbHNlKTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVXaGl0ZWJvYXJkRW5kZWQodHJ1ZSk7XG4gICAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLmlzbGV2ZWwgPT0gJzInICYmIHByZXZXaGl0ZWJvYXJkRW5kZWQpIHtcbiAgICAgICAgLy8gTm8gb3BlcmF0aW9uIG5lZWRlZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNoYXJlU2NyZWVuU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2NyZWVuSWQgPSAnJztcblxuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkKGZhbHNlKTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVNjcmVlbklkKCcnKTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLm9uU2NyZWVuQ2hhbmdlcyh7IGNoYW5nZWQ6IHRydWUsIHBhcmFtZXRlcnM6IHRoaXMucGFyYW1ldGVycyB9KTtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHByZXZXaGl0ZWJvYXJkU3RhcnRlZCAmJlxuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5pc2xldmVsID09ICcyJyAmJlxuICAgICAgICAgICh0aGlzLnBhcmFtZXRlcnMucmVjb3JkU3RhcnRlZCB8fCB0aGlzLnBhcmFtZXRlcnMucmVjb3JkUmVzdW1lZClcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKCEodGhpcy5wYXJhbWV0ZXJzLnJlY29yZFBhdXNlZCB8fCB0aGlzLnBhcmFtZXRlcnMucmVjb3JkU3RvcHBlZCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMucmVjb3JkaW5nTWVkaWFPcHRpb25zID09ICd2aWRlbycpIHtcbiAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmNhcHR1cmVDYW52YXNTdHJlYW0oeyBwYXJhbWV0ZXJzOiB0aGlzLnBhcmFtZXRlcnMsIHN0YXJ0OiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIC8vIEhhbmRsZSBlcnJvclxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGF0YS5zdGF0dXMgPT0gJ3N0YXJ0ZWQnICYmIHRoaXMucGFyYW1ldGVycy53aGl0ZWJvYXJkU3RhcnRlZCkge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLndoaXRlYm9hcmRTdGFydGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy53aGl0ZWJvYXJkRW5kZWQgPSBmYWxzZTtcblxuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVdoaXRlYm9hcmRTdGFydGVkKHRydWUpO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVdoaXRlYm9hcmRFbmRlZChmYWxzZSk7XG5cbiAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFyZVNjcmVlblN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNjcmVlbklkID0gYHdoaXRlYm9hcmQtJHt0aGlzLnBhcmFtZXRlcnMucm9vbU5hbWV9YDtcblxuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZCh0cnVlKTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVTY3JlZW5JZCh0aGlzLnBhcmFtZXRlcnMuc2NyZWVuSWQpO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLm9uU2NyZWVuQ2hhbmdlcyh7IGNoYW5nZWQ6IHRydWUsIHBhcmFtZXRlcnM6IHRoaXMucGFyYW1ldGVycyB9KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlRHJvcGRvd25DbGljayhpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5kcm9wZG93bk9wZW4gPSB0aGlzLmRyb3Bkb3duT3BlbiA9PT0gaWQgPyBudWxsIDogaWQ7XG4gIH1cblxuICBoYW5kbGVJdGVtQ2xpY2soY2FsbGJhY2s6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgY2FsbGJhY2sodmFsdWUpO1xuICAgIHRoaXMuZHJvcGRvd25PcGVuID0gbnVsbDtcbiAgICBpZiAoWydkcmF3JywgJ2ZyZWVoYW5kJywgJ3NoYXBlJywgJ3RleHQnLCAnZXJhc2UnXS5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgdGhpcy5jaGFuZ2VNb2RlKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGRyb3Bkb3duSXRlbXMoaXRlbXM6IGFueVtdLCBuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBhbnkpIHtcbiAgICByZXR1cm4gaXRlbXMubWFwKFxuICAgICAgKGl0ZW0sIGluZGV4KSA9PlxuICAgICAgICBgPGJ1dHRvbiBrZXk9XCIke2luZGV4fVwiIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJoYW5kbGVJdGVtQ2xpY2soJHtjYWxsYmFja30sICcke25hbWV9JywgJHtpdGVtLnZhbHVlfSlcIiBzdHlsZT1cInBhZGRpbmc6IDVweDtcIj5cbiAgICAgICAgJHtpdGVtLmxhYmVsfVxuICAgICAgPC9idXR0b24+YCxcbiAgICApO1xuICB9XG5cbiAgdG9nZ2xlVG9vbGJhcigpIHtcbiAgICB0aGlzLnRvb2xiYXJWaXNpYmxlID0gIXRoaXMudG9vbGJhclZpc2libGU7XG4gIH1cblxuICBjaGVja0JvYXJkQWNjZXNzKCkge1xuICAgIHRoaXMucGFyYW1ldGVycyA9IHRoaXMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG4gICAgaWYgKHRoaXMucGFyYW1ldGVycy53aGl0ZWJvYXJkU3RhcnRlZCAmJiAhdGhpcy5wYXJhbWV0ZXJzLndoaXRlYm9hcmRFbmRlZCkge1xuICAgICAgY29uc3QgdXNlciA9IHRoaXMucGFyYW1ldGVycy53aGl0ZWJvYXJkVXNlcnMuZmluZChcbiAgICAgICAgKHVzZXI6IGFueSkgPT4gdXNlci5uYW1lID09PSB0aGlzLnBhcmFtZXRlcnMubWVtYmVyLFxuICAgICAgKTtcbiAgICAgIGlmICgoIXVzZXIgfHwgIXVzZXIudXNlQm9hcmQpICYmIHRoaXMucGFyYW1ldGVycy5pc2xldmVsICE9ICcyJykge1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdZb3UgYXJlIG5vdCBhbGxvd2VkIHRvIHVzZSB0aGUgd2hpdGVib2FyZC4gUGxlYXNlIGFzayB0aGUgaG9zdCB0byBhc3NpZ24geW91LicsXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgY2hhbmdlTW9kZShuZXdNb2RlOiBzdHJpbmcpIHtcbiAgICBpZiAobmV3TW9kZSAhPT0gJ3BhbicgJiYgIXRoaXMuY2hlY2tCb2FyZEFjY2VzcygpKSByZXR1cm47XG4gICAgdGhpcy5tb2RlID0gbmV3TW9kZTtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50O1xuICAgIGlmIChuZXdNb2RlID09PSAncGFuJykge1xuICAgICAgY2FudmFzLnN0eWxlLmN1cnNvciA9ICdncmFiJztcbiAgICB9IGVsc2UgaWYgKG5ld01vZGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICBjYW52YXMuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgIH0gZWxzZSBpZiAobmV3TW9kZSA9PT0gJ2VyYXNlJykge1xuICAgICAgY2FudmFzLnN0eWxlLmN1cnNvciA9ICdjcm9zc2hhaXInO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYW52YXMuc3R5bGUuY3Vyc29yID0gJ2Nyb3NzaGFpcic7XG4gICAgfVxuICAgIGlmIChuZXdNb2RlICE9PSAnZnJlZWhhbmQnICYmIHRoaXMuZnJlZWhhbmREcmF3aW5nLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFwZXMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdmcmVlaGFuZCcsXG4gICAgICAgIHBvaW50czogdGhpcy5mcmVlaGFuZERyYXdpbmcsXG4gICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yLFxuICAgICAgICB0aGlja25lc3M6IHRoaXMuYnJ1c2hUaGlja25lc3MsXG4gICAgICB9KTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVTaGFwZXModGhpcy5wYXJhbWV0ZXJzLnNoYXBlcyk7XG4gICAgICB0aGlzLmZyZWVoYW5kRHJhd2luZyA9IFtdO1xuICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXYgaWQ9XCJ3aGl0ZWJvYXJkLWludGVyZmFjZVwiIFtzdHlsZS53aWR0aC5weF09XCJjdXN0b21XaWR0aFwiIFtzdHlsZS5oZWlnaHQucHhdPVwiY3VzdG9tSGVpZ2h0XCIgW3N0eWxlLmRpc3BsYXldPVwic2hvd0FzcGVjdCA/ICdibG9jaycgOiAnbm9uZSdcIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTsgZGlzcGxheTogZmxleDsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGJvcmRlcjogMnB4IHNvbGlkICMwMDA7IGJhY2tncm91bmQtY29sb3I6ICNmMGYwZjA7XCI+XHJcbiAgPGRpdiBpZD1cIndoaXRlYm9hcmRDb250ZW50XCIgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7IGRpc3BsYXk6IGZsZXg7IGp1c3RpZnktY29udGVudDogY2VudGVyOyBhbGlnbi1pdGVtczogY2VudGVyOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyBtYXgtd2lkdGg6IDEwMCU7IG1heC1oZWlnaHQ6IDEwMCU7IG92ZXJmbG93OiBhdXRvO1wiPlxyXG4gICAgPGJ1dHRvbiBpZD1cInRvb2xiYXJUb2dnbGVcIiBjbGFzcz1cImJ0biBidG5Cb2FyZCBidG4tcHJpbWFyeVwiIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyB0b3A6IDVweDsgbGVmdDogNTVweDsgei1pbmRleDogMTA7XCIgKGNsaWNrKT1cInRvZ2dsZVRvb2xiYXIoKVwiPlxyXG4gICAgICA8ZmEtaWNvbiBbaWNvbl09XCJ0b29sYmFyVmlzaWJsZSA/IGZhQ2hldnJvbkxlZnQgOiBmYUNoZXZyb25SaWdodFwiPjwvZmEtaWNvbj5cclxuICAgIDwvYnV0dG9uPlxyXG4gICAgPGRpdiAqbmdJZj1cInRvb2xiYXJWaXNpYmxlXCIgY2xhc3M9XCJ0b29sYmFyIG1iLTNcIiBpZD1cInRvb2xiYXJcIiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiA1cHg7IGxlZnQ6IDEwMHB4OyB6LWluZGV4OiAxMDsgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bkJvYXJkIGJ0bi1zZWNvbmRhcnkgZHJvcGRvd24tdG9nZ2xlXCIgaWQ9XCJkcmF3TW9kZVwiIChjbGljayk9XCJoYW5kbGVEcm9wZG93bkNsaWNrKCdkcmF3TW9kZScpXCI+XHJcbiAgICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVBlbmNpbEFsdFwiPjwvZmEtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwiZHJvcGRvd25PcGVuID09PSAnZHJhd01vZGUnXCIgY2xhc3M9XCJkcm9wZG93bi1tZW51IHNob3dcIj5cclxuICAgICAgICAgIDxidXR0b24gKm5nRm9yPVwibGV0IGl0ZW0gb2YgW3sgbGFiZWw6ICdYWC1TbWFsbCAoM3B4KScsIHZhbHVlOiAzIH0sIHsgbGFiZWw6ICdYLVNtYWxsICg2cHgpJywgdmFsdWU6IDYgfSwgeyBsYWJlbDogJ1NtYWxsICgxMnB4KScsIHZhbHVlOiAxMiB9LCB7IGxhYmVsOiAnTWVkaXVtICgxOHB4KScsIHZhbHVlOiAxOCB9LCB7IGxhYmVsOiAnTGFyZ2UgKDI0cHgpJywgdmFsdWU6IDI0IH0sIHsgbGFiZWw6ICdYLUxhcmdlICgzNnB4KScsIHZhbHVlOiAzNiB9XVwiIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJoYW5kbGVJdGVtQ2xpY2sodXBkYXRlTGluZVRoaWNrbmVzcywgJ2RyYXcnLCBpdGVtLnZhbHVlKVwiIHN0eWxlPVwicGFkZGluZzogNXB4O1wiPlxyXG4gICAgICAgICAgICB7eyBpdGVtLmxhYmVsIH19XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bkJvYXJkIGJ0bi1zZWNvbmRhcnkgZHJvcGRvd24tdG9nZ2xlXCIgaWQ9XCJmcmVlaGFuZE1vZGVcIiAoY2xpY2spPVwiaGFuZGxlRHJvcGRvd25DbGljaygnZnJlZWhhbmRNb2RlJylcIj5cclxuICAgICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhUGFpbnRCcnVzaFwiPjwvZmEtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwiZHJvcGRvd25PcGVuID09PSAnZnJlZWhhbmRNb2RlJ1wiIGNsYXNzPVwiZHJvcGRvd24tbWVudSBzaG93XCI+XHJcbiAgICAgICAgICA8YnV0dG9uICpuZ0Zvcj1cImxldCBpdGVtIG9mIFt7IGxhYmVsOiAnWC1TbWFsbCAoNXB4KScsIHZhbHVlOiA1IH0sIHsgbGFiZWw6ICdTbWFsbCAoMTBweCknLCB2YWx1ZTogMTAgfSwgeyBsYWJlbDogJ01lZGl1bSAoMjBweCknLCB2YWx1ZTogMjAgfSwgeyBsYWJlbDogJ0xhcmdlICg0MHB4KScsIHZhbHVlOiA0MCB9LCB7IGxhYmVsOiAnWC1MYXJnZSAoNjBweCknLCB2YWx1ZTogNjAgfV1cIiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwiaGFuZGxlSXRlbUNsaWNrKHVwZGF0ZUJydXNoVGhpY2tuZXNzLCAnZnJlZWhhbmQnLCBpdGVtLnZhbHVlKVwiIHN0eWxlPVwicGFkZGluZzogNXB4O1wiPlxyXG4gICAgICAgICAgICB7eyBpdGVtLmxhYmVsIH19XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bkJvYXJkIGJ0bi1zZWNvbmRhcnkgZHJvcGRvd24tdG9nZ2xlXCIgaWQ9XCJzaGFwZU1vZGVcIiAoY2xpY2spPVwiaGFuZGxlRHJvcGRvd25DbGljaygnc2hhcGVNb2RlJylcIj5cclxuICAgICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhU2hhcGVzXCI+PC9mYS1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxkaXYgKm5nSWY9XCJkcm9wZG93bk9wZW4gPT09ICdzaGFwZU1vZGUnXCIgY2xhc3M9XCJkcm9wZG93bi1tZW51IHNob3dcIj5cclxuICAgICAgICAgIDxidXR0b24gKm5nRm9yPVwibGV0IGl0ZW0gb2YgW1xyXG4gICAgICAgICAgICB7IGxhYmVsOiAnPGltZyBzcmM9XFwnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9zcXVhcmUuc3ZnXFwnIGFsdD1cXCdTcXVhcmVcXCcgY2xhc3M9XFwnc2hhcGUtaWNvblxcJyAvPicsIHZhbHVlOiAnc3F1YXJlJyB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiAnPGltZyBzcmM9XFwnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9yZWN0YW5nbGUuc3ZnXFwnIGFsdD1cXCdSZWN0YW5nbGVcXCcgY2xhc3M9XFwnc2hhcGUtaWNvblxcJyAvPicsIHZhbHVlOiAncmVjdGFuZ2xlJyB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiAnPGltZyBzcmM9XFwnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9jaXJjbGUuc3ZnXFwnIGFsdD1cXCdDaXJjbGVcXCcgY2xhc3M9XFwnc2hhcGUtaWNvblxcJyAvPicsIHZhbHVlOiAnY2lyY2xlJyB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiAnPGltZyBzcmM9XFwnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy90cmlhbmdsZS5zdmdcXCcgYWx0PVxcJ1RyaWFuZ2xlXFwnIGNsYXNzPVxcJ3NoYXBlLWljb25cXCcgLz4nLCB2YWx1ZTogJ3RyaWFuZ2xlJyB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiAnPGltZyBzcmM9XFwnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9oZXhhZ29uLnN2Z1xcJyBhbHQ9XFwnSGV4YWdvblxcJyBjbGFzcz1cXCdzaGFwZS1pY29uXFwnIC8+JywgdmFsdWU6ICdoZXhhZ29uJyB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiAnPGltZyBzcmM9XFwnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9wZW50YWdvbi5zdmdcXCcgYWx0PVxcJ1BlbnRhZ29uXFwnIGNsYXNzPVxcJ3NoYXBlLWljb25cXCcgLz4nLCB2YWx1ZTogJ3BlbnRhZ29uJyB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiAnPGltZyBzcmM9XFwnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9yaG9tYnVzLnN2Z1xcJyBhbHQ9XFwnUmhvbWJ1c1xcJyBjbGFzcz1cXCdzaGFwZS1pY29uXFwnIC8+JywgdmFsdWU6ICdyaG9tYnVzJyB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiAnPGltZyBzcmM9XFwnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9vY3RhZ29uLnN2Z1xcJyBhbHQ9XFwnT2N0YWdvblxcJyBjbGFzcz1cXCdzaGFwZS1pY29uXFwnIC8+JywgdmFsdWU6ICdvY3RhZ29uJyB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiAnPGltZyBzcmM9XFwnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9wYXJhbGxlbG9ncmFtLnN2Z1xcJyBhbHQ9XFwnUGFyYWxsZWxvZ3JhbVxcJyBjbGFzcz1cXCdzaGFwZS1pY29uXFwnIC8+JywgdmFsdWU6ICdwYXJhbGxlbG9ncmFtJyB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiAnPGltZyBzcmM9XFwnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9vdmFsLnN2Z1xcJyBhbHQ9XFwnT3ZhbFxcJyBjbGFzcz1cXCdzaGFwZS1pY29uXFwnIC8+JywgdmFsdWU6ICdvdmFsJyB9XHJcbiAgICAgICAgICBdXCIgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cImhhbmRsZUl0ZW1DbGljayh1cGRhdGVTaGFwZSwgJ3NoYXBlJywgaXRlbS52YWx1ZSlcIiBzdHlsZT1cInBhZGRpbmc6IDVweDtcIiBbaW5uZXJIVE1MXT1cIml0ZW0ubGFiZWxcIj5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG5Cb2FyZCBidG4tc2Vjb25kYXJ5XCIgaWQ9XCJzZWxlY3RNb2RlXCIgKGNsaWNrKT1cImNoYW5nZU1vZGUoJ3NlbGVjdCcpXCI+XHJcbiAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFNb3VzZVBvaW50ZXJcIj48L2ZhLWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG5Cb2FyZCBidG4tZGFuZ2VyIGRyb3Bkb3duLXRvZ2dsZVwiIGlkPVwiZXJhc2VNb2RlXCIgKGNsaWNrKT1cImhhbmRsZURyb3Bkb3duQ2xpY2soJ2VyYXNlTW9kZScpXCI+XHJcbiAgICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYUVyYXNlclwiPjwvZmEtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwiZHJvcGRvd25PcGVuID09PSAnZXJhc2VNb2RlJ1wiIGNsYXNzPVwiZHJvcGRvd24tbWVudSBzaG93XCI+XHJcbiAgICAgICAgICA8YnV0dG9uICpuZ0Zvcj1cImxldCBpdGVtIG9mIFt7IGxhYmVsOiAnWC1TbWFsbCAoNXB4KScsIHZhbHVlOiA1IH0sIHsgbGFiZWw6ICdTbWFsbCAoMTBweCknLCB2YWx1ZTogMTAgfSwgeyBsYWJlbDogJ01lZGl1bSAoMjBweCknLCB2YWx1ZTogMjAgfSwgeyBsYWJlbDogJ0xhcmdlICgzMHB4KScsIHZhbHVlOiAzMCB9LCB7IGxhYmVsOiAnWC1MYXJnZSAoNjBweCknLCB2YWx1ZTogNjAgfV1cIiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwiaGFuZGxlSXRlbUNsaWNrKHVwZGF0ZUVyYXNlclRoaWNrbmVzcywgJ2VyYXNlJywgaXRlbS52YWx1ZSlcIiBzdHlsZT1cInBhZGRpbmc6IDVweDtcIj5cclxuICAgICAgICAgICAge3sgaXRlbS5sYWJlbCB9fVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bkJvYXJkIGJ0bi1pbmZvXCIgaWQ9XCJwYW5Nb2RlXCIgKGNsaWNrKT1cImNoYW5nZU1vZGUoJ3BhbicpXCI+XHJcbiAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFIYW5kUGFwZXJcIj48L2ZhLWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bkJvYXJkIGJ0bi1zdWNjZXNzXCIgaWQ9XCJ6b29tSW5cIiAoY2xpY2spPVwiem9vbUNhbnZhcygxLjIsICRldmVudClcIj5cclxuICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVNlYXJjaFBsdXNcIj48L2ZhLWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bkJvYXJkIGJ0bi1zdWNjZXNzXCIgaWQ9XCJ6b29tUmVzZXRcIiAoY2xpY2spPVwiem9vbUNhbnZhcygxMCwgJGV2ZW50KVwiPlxyXG4gICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhU2VhcmNoXCI+PC9mYS1pY29uPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG5Cb2FyZCBidG4tc3VjY2Vzc1wiIGlkPVwiem9vbU91dFwiIChjbGljayk9XCJ6b29tQ2FudmFzKDAuOCwgJGV2ZW50KVwiPlxyXG4gICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhU2VhcmNoTWludXNcIj48L2ZhLWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG5Cb2FyZCBidG4tc2Vjb25kYXJ5IGRyb3Bkb3duLXRvZ2dsZVwiIGlkPVwiYWRkVGV4dFwiIChjbGljayk9XCJoYW5kbGVEcm9wZG93bkNsaWNrKCdhZGRUZXh0JylcIj5cclxuICAgICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhRm9udFwiPjwvZmEtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwiZHJvcGRvd25PcGVuID09PSAnYWRkVGV4dCdcIiBjbGFzcz1cImRyb3Bkb3duLW1lbnUgc2hvd1wiPlxyXG4gICAgICAgICAgPGJ1dHRvbiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBbeyBsYWJlbDogJ0FyaWFsJywgdmFsdWU6ICdBcmlhbCcgfSwgeyBsYWJlbDogJ1RpbWVzIE5ldyBSb21hbicsIHZhbHVlOiAnVGltZXMgTmV3IFJvbWFuJyB9LCB7IGxhYmVsOiAnQ291cmllciBOZXcnLCB2YWx1ZTogJ0NvdXJpZXIgTmV3JyB9LCB7IGxhYmVsOiAnVmVyZGFuYScsIHZhbHVlOiAnVmVyZGFuYScgfV1cIiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwiaGFuZGxlSXRlbUNsaWNrKHVwZGF0ZUZvbnQsICd0ZXh0JywgaXRlbS52YWx1ZSlcIiBzdHlsZT1cInBhZGRpbmc6IDVweDtcIj5cclxuICAgICAgICAgICAge3sgaXRlbS5sYWJlbCB9fVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG5Cb2FyZCBidG4tc2Vjb25kYXJ5IGRyb3Bkb3duLXRvZ2dsZVwiIGlkPVwiZm9udFNpemVcIiAoY2xpY2spPVwiaGFuZGxlRHJvcGRvd25DbGljaygnZm9udFNpemUnKVwiPlxyXG4gICAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFUZXh0SGVpZ2h0XCI+PC9mYS1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxkaXYgKm5nSWY9XCJkcm9wZG93bk9wZW4gPT09ICdmb250U2l6ZSdcIiBjbGFzcz1cImRyb3Bkb3duLW1lbnUgc2hvd1wiPlxyXG4gICAgICAgICAgPGJ1dHRvbiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBbeyBsYWJlbDogJ1gtU21hbGwgKDVweCknLCB2YWx1ZTogNSB9LCB7IGxhYmVsOiAnU21hbGwgKDEwcHgpJywgdmFsdWU6IDEwIH0sIHsgbGFiZWw6ICdNZWRpdW0gKDIwcHgpJywgdmFsdWU6IDIwIH0sIHsgbGFiZWw6ICdMYXJnZSAoNDBweCknLCB2YWx1ZTogNDAgfSwgeyBsYWJlbDogJ1gtTGFyZ2UgKDYwcHgpJywgdmFsdWU6IDYwIH1dXCIgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cImhhbmRsZUl0ZW1DbGljayh1cGRhdGVGb250U2l6ZSwgJycsIGl0ZW0udmFsdWUpXCIgc3R5bGU9XCJwYWRkaW5nOiA1cHg7XCI+XHJcbiAgICAgICAgICAgIHt7IGl0ZW0ubGFiZWwgfX1cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG5Cb2FyZCBidG4tc2Vjb25kYXJ5XCIgaWQ9XCJ1bmRvXCIgKGNsaWNrKT1cInVuZG8oKVwiPlxyXG4gICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhVW5kb1wiPjwvZmEtaWNvbj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuQm9hcmQgYnRuLXNlY29uZGFyeVwiIGlkPVwicmVkb1wiIChjbGljayk9XCJyZWRvKClcIj5cclxuICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVJlZG9cIj48L2ZhLWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bkJvYXJkIGJ0bi1zZWNvbmRhcnlcIiBpZD1cInNhdmVcIiAoY2xpY2spPVwic2F2ZUNhbnZhcygpXCI+XHJcbiAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFTYXZlXCI+PC9mYS1pY29uPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG5Cb2FyZCBidG4tZGFuZ2VyXCIgaWQ9XCJkZWxldGVcIiAoY2xpY2spPVwiZGVsZXRlU2hhcGUoKVwiPlxyXG4gICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhVHJhc2hcIj48L2ZhLWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bkJvYXJkIGJ0bi1zZWNvbmRhcnlcIiBpZD1cImNsZWFyQ2FudmFzXCIgKGNsaWNrKT1cImNsZWFyQ2FudmFzKClcIj5cclxuICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVRpbWVzXCI+PC9mYS1pY29uPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvbiBpZD1cInRvZ2dsZUJhY2tncm91bmRSZWZcIiAjdG9nZ2xlQmFja2dyb3VuZFJlZiBjbGFzcz1cImJ0biBidG5Cb2FyZCBidG4tc2Vjb25kYXJ5XCIgKGNsaWNrKT1cInRvZ2dsZUJhY2tncm91bmQoKVwiPlxyXG4gICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9ncmFwaC5qcGdcIiBhbHQ9XCJCYWNrZ3JvdW5kXCIgY2xhc3M9XCJ0b2dnbGUtaWNvblwiIGlkPVwiYmFja2dyb3VuZEljb25cIiAvPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgaWQ9XCJ1cGxvYWRCb2FyZEltYWdlXCIgYWNjZXB0PVwiaW1hZ2UvKlwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiAoY2hhbmdlKT1cInVwbG9hZEltYWdlKCRldmVudClcIiAvPlxyXG4gICAgICA8bGFiZWwgZm9yPVwidXBsb2FkQm9hcmRJbWFnZVwiIGNsYXNzPVwiYnRuIGJ0bkJvYXJkIGJ0bi1wcmltYXJ5XCI+XHJcbiAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFVcGxvYWRcIj48L2ZhLWljb24+XHJcbiAgICAgIDwvbGFiZWw+XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwiY29sb3JcIiBpZD1cImNvbG9yUGlja2VyXCIgY2xhc3M9XCJidG5cIiBbKG5nTW9kZWwpXT1cImNvbG9yXCIgLz5cclxuICAgICAgPHNlbGVjdCBpZD1cImxpbmVUeXBlUGlja2VyXCIgY2xhc3M9XCJjdXN0b20tc2VsZWN0XCIgc3R5bGU9XCJ3aWR0aDogYXV0bztcIiBbKG5nTW9kZWwpXT1cImxpbmVUeXBlXCI+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInNvbGlkXCI+U29saWQ8L29wdGlvbj5cclxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiZGFzaGVkXCI+RGFzaGVkPC9vcHRpb24+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImRvdHRlZFwiPkRvdHRlZDwvb3B0aW9uPlxyXG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJkYXNoRG90XCI+RGFzaC1Eb3Q8L29wdGlvbj5cclxuICAgICAgPC9zZWxlY3Q+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxjYW52YXMgaWQ9XCJjYW52YXNSZWZcIiB3aWR0aD1cIjEyODBcIiBoZWlnaHQ9XCI3MjBcIiBzdHlsZT1cImJvcmRlcjogMnB4IHNvbGlkIHJlZDtcIiAjY2FudmFzUmVmPjwvY2FudmFzPlxyXG4gICAgPHRleHRhcmVhIGlkPVwidGV4dElucHV0UmVmXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiAjdGV4dElucHV0UmVmIHN0eWxlPVwiZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGFic29sdXRlO1wiPjwvdGV4dGFyZWE+XHJcbiAgICA8YSBocmVmPVwiI1wiIGlkPVwiZG93bmxvYWRMaW5rUmVmXCIgI2Rvd25sb2FkTGlua1JlZiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+RG93bmxvYWQ8L2E+XHJcbiAgICA8Y2FudmFzIGlkPVwidGVtcENhbnZhc1JlZlwiICN0ZW1wQ2FudmFzUmVmIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj48L2NhbnZhcz5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==