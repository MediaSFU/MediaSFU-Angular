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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hpdGVib2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy93aGl0ZWJvYXJkLWNvbXBvbmVudHMvd2hpdGVib2FyZC93aGl0ZWJvYXJkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL3doaXRlYm9hcmQtY29tcG9uZW50cy93aGl0ZWJvYXJkL3doaXRlYm9hcmQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNkRBQTZEO0FBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBME1HO0FBQ0gsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBR0wsU0FBUyxFQUNULGlCQUFpQixHQUdsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFDTCxPQUFPLEVBQ1AsTUFBTSxFQUNOLE1BQU0sRUFDTixRQUFRLEVBQ1IsUUFBUSxFQUNSLGNBQWMsRUFDZCxXQUFXLEVBQ1gsWUFBWSxFQUNaLE1BQU0sRUFDTixXQUFXLEVBQ1gsWUFBWSxF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QU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzVDLE1BQU0sT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN6RCxNQUFNLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFFekQsTUFBTSxFQUFFLEdBQUcsT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUM7WUFDdEQsTUFBTSxFQUFFLEdBQUcsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUM7WUFFdkQsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFFekMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDL0QsTUFBTSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDaEUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZE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QyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLENBQUM7YUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDbkMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlGLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM3RCxDQUFDO2FBQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRSxDQUFDO1lBQ2pDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxRCxNQUFNLFdBQVcsR0FBRyxHQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMxRSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNoRixDQUFDO2FBQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRSxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDL0YsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxLQUFL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QkFBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUNLLFlBQVk7c0JBQXpELFNBQVM7dUJBQUMsY0FBYyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFFNUMsbUJBQW1CO3NCQURsQixTQUFTO3VCQUFDLHFCQUFxQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFFRixlQUFlO3NCQUEvRCxTQUFTO3VCQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFDQSxhQUFhO3NCQUEzRCxTQUFTO3VCQUFDLGVBQWUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uICovXG4vKipcbiAqIFdoaXRlYm9hcmQgY29tcG9uZW50IGZvciBkcmF3aW5nIGFuZCBtYW5pcHVsYXRpbmcgc2hhcGVzLCB0ZXh0LCBhbmQgaW1hZ2VzIG9uIGEgY2FudmFzLlxuICpcbiAqIEBjb21wb25lbnRcbiAqIEBzZWxlY3RvciBhcHAtd2hpdGVib2FyZFxuICogQHRlbXBsYXRlVXJsIC4vd2hpdGVib2FyZC5jb21wb25lbnQuaHRtbFxuICogQHN0eWxlVXJscyAuL3doaXRlYm9hcmQuY29tcG9uZW50LmNzc1xuICogQGVuY2Fwc3VsYXRpb24gVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxuICogQGltcG9ydHMgW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlXVxuICpcbiAqIEBjbGFzcyBXaGl0ZWJvYXJkXG4gKiBAaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzXG4gKlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGN1c3RvbVdpZHRoIC0gQ3VzdG9tIHdpZHRoIGZvciB0aGUgd2hpdGVib2FyZC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjdXN0b21IZWlnaHQgLSBDdXN0b20gaGVpZ2h0IGZvciB0aGUgd2hpdGVib2FyZC5cbiAqIEBwcm9wZXJ0eSB7V2hpdGVib2FyZFBhcmFtZXRlcnN9IHBhcmFtZXRlcnMgLSBQYXJhbWV0ZXJzIGZvciB0aGUgd2hpdGVib2FyZC5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gc2hvd0FzcGVjdCAtIEZsYWcgdG8gc2hvdyBhc3BlY3QgcmF0aW8uXG4gKlxuICogQHByb3BlcnR5IHtFbGVtZW50UmVmPEhUTUxDYW52YXNFbGVtZW50Pn0gY2FudmFzUmVmIC0gUmVmZXJlbmNlIHRvIHRoZSBjYW52YXMgZWxlbWVudC5cbiAqIEBwcm9wZXJ0eSB7RWxlbWVudFJlZjxIVE1MVGV4dEFyZWFFbGVtZW50Pn0gdGV4dElucHV0UmVmIC0gUmVmZXJlbmNlIHRvIHRoZSB0ZXh0IGlucHV0IGVsZW1lbnQuXG4gKiBAcHJvcGVydHkge0VsZW1lbnRSZWY8SFRNTEJ1dHRvbkVsZW1lbnQ+fSB0b2dnbGVCYWNrZ3JvdW5kUmVmIC0gUmVmZXJlbmNlIHRvIHRoZSB0b2dnbGUgYmFja2dyb3VuZCBidXR0b24gZWxlbWVudC5cbiAqIEBwcm9wZXJ0eSB7RWxlbWVudFJlZjxIVE1MQW5jaG9yRWxlbWVudD59IGRvd25sb2FkTGlua1JlZiAtIFJlZmVyZW5jZSB0byB0aGUgZG93bmxvYWQgbGluayBlbGVtZW50LlxuICogQHByb3BlcnR5IHtFbGVtZW50UmVmPEhUTUxDYW52YXNFbGVtZW50Pn0gdGVtcENhbnZhc1JlZiAtIFJlZmVyZW5jZSB0byB0aGUgdGVtcG9yYXJ5IGNhbnZhcyBlbGVtZW50LlxuICpcbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhVGltZXMgLSBGb250QXdlc29tZSBpY29uIGZvciB0aW1lcy5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhVW5kbyAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHVuZG8uXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVJlZG8gLSBGb250QXdlc29tZSBpY29uIGZvciByZWRvLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFFcmFzZXIgLSBGb250QXdlc29tZSBpY29uIGZvciBlcmFzZXIuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVNoYXBlcyAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHNoYXBlcy5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhTW91c2VQb2ludGVyIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgbW91c2UgcG9pbnRlci5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhSGFuZFBhcGVyIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgaGFuZCBwYXBlci5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhVGV4dEhlaWdodCAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHRleHQgaGVpZ2h0LlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFGb250IC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgZm9udC5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhUGVuY2lsQWx0IC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgcGVuY2lsIGFsdC5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhUGFpbnRCcnVzaCAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHBhaW50IGJydXNoLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFUcmFzaCAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHRyYXNoLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFTYXZlIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3Igc2F2ZS5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhU2VhcmNoIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3Igc2VhcmNoLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFTZWFyY2hNaW51cyAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHNlYXJjaCBtaW51cy5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhU2VhcmNoUGx1cyAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHNlYXJjaCBwbHVzLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFDaGV2cm9uTGVmdCAtIEZvbnRBd2Vzb21lIGljb24gZm9yIGNoZXZyb24gbGVmdC5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhVXBsb2FkIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgdXBsb2FkLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFDaGV2cm9uUmlnaHQgLSBGb250QXdlc29tZSBpY29uIGZvciBjaGV2cm9uIHJpZ2h0LlxuICpcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtb2RlIC0gQ3VycmVudCBtb2RlIG9mIHRoZSB3aGl0ZWJvYXJkIChlLmcuLCAncGFuJywgJ2RyYXcnLCAnZXJhc2UnKS5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNEcmF3aW5nIC0gRmxhZyBpbmRpY2F0aW5nIGlmIGRyYXdpbmcgaXMgaW4gcHJvZ3Jlc3MuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGlzUGFubmluZyAtIEZsYWcgaW5kaWNhdGluZyBpZiBwYW5uaW5nIGlzIGluIHByb2dyZXNzLlxuICogQHByb3BlcnR5IHtib29sZWFufSBpc0RyYWdnaW5nIC0gRmxhZyBpbmRpY2F0aW5nIGlmIGRyYWdnaW5nIGlzIGluIHByb2dyZXNzLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IHN0YXJ0WCAtIFN0YXJ0aW5nIFggY29vcmRpbmF0ZSBmb3IgZHJhd2luZy5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzdGFydFkgLSBTdGFydGluZyBZIGNvb3JkaW5hdGUgZm9yIGRyYXdpbmcuXG4gKiBAcHJvcGVydHkge251bWJlcn0gY3VycmVudFggLSBDdXJyZW50IFggY29vcmRpbmF0ZSBmb3IgZHJhd2luZy5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjdXJyZW50WSAtIEN1cnJlbnQgWSBjb29yZGluYXRlIGZvciBkcmF3aW5nLlxuICogQHByb3BlcnR5IHthbnlbXX0gZnJlZWhhbmREcmF3aW5nIC0gQXJyYXkgb2YgcG9pbnRzIGZvciBmcmVlaGFuZCBkcmF3aW5nLlxuICogQHByb3BlcnR5IHthbnl9IHNlbGVjdGVkU2hhcGUgLSBDdXJyZW50bHkgc2VsZWN0ZWQgc2hhcGUuXG4gKiBAcHJvcGVydHkge2FueX0gc2VsZWN0ZWRIYW5kbGUgLSBDdXJyZW50bHkgc2VsZWN0ZWQgaGFuZGxlIGZvciByZXNpemluZyBzaGFwZXMuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IG1vdmluZ1NoYXBlIC0gRmxhZyBpbmRpY2F0aW5nIGlmIGEgc2hhcGUgaXMgYmVpbmcgbW92ZWQuXG4gKiBAcHJvcGVydHkge251bWJlcn0gcGFuWCAtIFggY29vcmRpbmF0ZSBmb3IgcGFubmluZy5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwYW5ZIC0gWSBjb29yZGluYXRlIGZvciBwYW5uaW5nLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IHNjYWxlIC0gQ3VycmVudCBzY2FsZSBvZiB0aGUgY2FudmFzLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IG1pblNjYWxlIC0gTWluaW11bSBzY2FsZSBvZiB0aGUgY2FudmFzLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IG1heFNjYWxlIC0gTWF4aW11bSBzY2FsZSBvZiB0aGUgY2FudmFzLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGVyYXNlclRoaWNrbmVzcyAtIFRoaWNrbmVzcyBvZiB0aGUgZXJhc2VyLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGJydXNoVGhpY2tuZXNzIC0gVGhpY2tuZXNzIG9mIHRoZSBicnVzaC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsaW5lVGhpY2tuZXNzIC0gVGhpY2tuZXNzIG9mIHRoZSBsaW5lLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGxpbmVUeXBlIC0gVHlwZSBvZiB0aGUgbGluZSAoZS5nLiwgJ3NvbGlkJywgJ2Rhc2hlZCcpLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNvbG9yIC0gQ3VycmVudCBjb2xvciBmb3IgZHJhd2luZy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBmb250IC0gQ3VycmVudCBmb250IGZvciB0ZXh0LlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGZvbnRTaXplIC0gQ3VycmVudCBmb250IHNpemUgZm9yIHRleHQuXG4gKiBAcHJvcGVydHkge2FueX0gc2hhcGUgLSBDdXJyZW50IHNoYXBlIGJlaW5nIGRyYXduLlxuICogQHByb3BlcnR5IHtIVE1MSW1hZ2VFbGVtZW50fSBiYWNrZ3JvdW5kSW1hZ2UgLSBCYWNrZ3JvdW5kIGltYWdlIGZvciB0aGUgY2FudmFzLlxuICogQHByb3BlcnR5IHtib29sZWFufSB0b29sYmFyVmlzaWJsZSAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgdG9vbGJhciBpcyB2aXNpYmxlLlxuICogQHByb3BlcnR5IHtzdHJpbmcgfCBudWxsfSBkcm9wZG93bk9wZW4gLSBDdXJyZW50bHkgb3BlbiBkcm9wZG93biBtZW51LlxuICogQHByb3BlcnR5IHt7IGNsaWVudFg6IG51bWJlciwgY2xpZW50WTogbnVtYmVyLCBvZmZzZXRYOiBudW1iZXIsIG9mZnNldFk6IG51bWJlciB9IHwgbnVsbH0gY3VycmVudENsaWNrUG9zaXRpb24gLSBDdXJyZW50IGNsaWNrIHBvc2l0aW9uIG9uIHRoZSBjYW52YXMuXG4gKiBAcHJvcGVydHkge251bWJlcn0gbWF4V2lkdGggLSBNYXhpbXVtIHdpZHRoIG9mIHRoZSBjYW52YXMuXG4gKiBAcHJvcGVydHkge251bWJlcn0gbWF4SGVpZ2h0IC0gTWF4aW11bSBoZWlnaHQgb2YgdGhlIGNhbnZhcy5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZGltZW5zaW9uc0ZpeGVkIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBjYW52YXMgZGltZW5zaW9ucyBhcmUgZml4ZWQuXG4gKlxuICogQG1ldGhvZCB1cGRhdGVMaW5lVGhpY2tuZXNzIC0gVXBkYXRlcyB0aGUgdGhpY2tuZXNzIG9mIHRoZSBsaW5lLlxuICogQHBhcmFtIHtudW1iZXJ9IHRoaWNrbmVzcyAtIE5ldyB0aGlja25lc3MgZm9yIHRoZSBsaW5lLlxuICpcbiAqIEBtZXRob2QgdXBkYXRlQnJ1c2hUaGlja25lc3MgLSBVcGRhdGVzIHRoZSB0aGlja25lc3Mgb2YgdGhlIGJydXNoLlxuICogQHBhcmFtIHtudW1iZXJ9IHRoaWNrbmVzcyAtIE5ldyB0aGlja25lc3MgZm9yIHRoZSBicnVzaC5cbiAqXG4gKiBAbWV0aG9kIHVwZGF0ZUVyYXNlclRoaWNrbmVzcyAtIFVwZGF0ZXMgdGhlIHRoaWNrbmVzcyBvZiB0aGUgZXJhc2VyLlxuICogQHBhcmFtIHtudW1iZXJ9IHRoaWNrbmVzcyAtIE5ldyB0aGlja25lc3MgZm9yIHRoZSBlcmFzZXIuXG4gKlxuICogQG1ldGhvZCB1cGRhdGVDb2xvciAtIFVwZGF0ZXMgdGhlIGNvbG9yIGZvciBkcmF3aW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yIC0gTmV3IGNvbG9yIGZvciBkcmF3aW5nLlxuICpcbiAqIEBtZXRob2QgdXBkYXRlRm9udCAtIFVwZGF0ZXMgdGhlIGZvbnQgZm9yIHRleHQuXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9udCAtIE5ldyBmb250IGZvciB0ZXh0LlxuICpcbiAqIEBtZXRob2QgdXBkYXRlRm9udFNpemUgLSBVcGRhdGVzIHRoZSBmb250IHNpemUgZm9yIHRleHQuXG4gKiBAcGFyYW0ge251bWJlcn0gZm9udFNpemUgLSBOZXcgZm9udCBzaXplIGZvciB0ZXh0LlxuICpcbiAqIEBtZXRob2QgdXBkYXRlU2hhcGUgLSBVcGRhdGVzIHRoZSBzaGFwZSBiZWluZyBkcmF3bi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzaGFwZSAtIE5ldyBzaGFwZSB0byBiZSBkcmF3bi5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqXG4gKiBAbWV0aG9kIG5nT25Jbml0IC0gTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgZGF0YS1ib3VuZCBwcm9wZXJ0aWVzIGFyZSBpbml0aWFsaXplZC5cbiAqXG4gKiBAbWV0aG9kIG5nT25DaGFuZ2VzIC0gTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgd2hlbiBhbnkgZGF0YS1ib3VuZCBwcm9wZXJ0eSBvZiBhIGRpcmVjdGl2ZSBjaGFuZ2VzLlxuICogQHBhcmFtIHtTaW1wbGVDaGFuZ2VzfSBjaGFuZ2VzIC0gT2JqZWN0IG9mIGNoYW5nZXMuXG4gKlxuICogQG1ldGhvZCBuZ09uRGVzdHJveSAtIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIHdoZW4gYSBkaXJlY3RpdmUsIHBpcGUsIG9yIHNlcnZpY2UgaXMgZGVzdHJveWVkLlxuICpcbiAqIEBtZXRob2QgbmdBZnRlclZpZXdJbml0IC0gTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgYSBjb21wb25lbnQncyB2aWV3IGhhcyBiZWVuIGZ1bGx5IGluaXRpYWxpemVkLlxuICpcbiAqIEBtZXRob2QgaGFuZGxlVGV4dElucHV0IC0gSGFuZGxlcyB0aGUgdGV4dCBpbnB1dCBldmVudC5cbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgLSBLZXlib2FyZCBldmVudC5cbiAqXG4gKiBAbWV0aG9kIGFkZExpc3RlbmVycyAtIEFkZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBjYW52YXMgYW5kIGRvY3VtZW50LlxuICpcbiAqIEBtZXRob2QgaGFuZGxlVG91Y2hTdGFydCAtIEhhbmRsZXMgdGhlIHRvdWNoIHN0YXJ0IGV2ZW50LlxuICogQHBhcmFtIHtUb3VjaEV2ZW50fSBlIC0gVG91Y2ggZXZlbnQuXG4gKlxuICogQG1ldGhvZCBoYW5kbGVUb3VjaE1vdmUgLSBIYW5kbGVzIHRoZSB0b3VjaCBtb3ZlIGV2ZW50LlxuICogQHBhcmFtIHtUb3VjaEV2ZW50fSBlIC0gVG91Y2ggZXZlbnQuXG4gKlxuICogQG1ldGhvZCBoYW5kbGVUb3VjaEVuZCAtIEhhbmRsZXMgdGhlIHRvdWNoIGVuZCBldmVudC5cbiAqIEBwYXJhbSB7VG91Y2hFdmVudH0gZSAtIFRvdWNoIGV2ZW50LlxuICpcbiAqIEBtZXRob2QgaGFuZGxlQ2xpY2tPdXRzaWRlIC0gSGFuZGxlcyB0aGUgY2xpY2sgb3V0c2lkZSBldmVudC5cbiAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnQgLSBNb3VzZSBldmVudC5cbiAqXG4gKiBAbWV0aG9kIGhhbmRsZUNhbnZhc0NsaWNrIC0gSGFuZGxlcyB0aGUgY2FudmFzIGNsaWNrIGV2ZW50LlxuICogQHBhcmFtIHtNb3VzZUV2ZW50fSBlIC0gTW91c2UgZXZlbnQuXG4gKlxuICogQG1ldGhvZCBzdGFydERyYXdpbmcgLSBTdGFydHMgdGhlIGRyYXdpbmcgcHJvY2Vzcy5cbiAqIEBwYXJhbSB7TW91c2VFdmVudH0gZSAtIE1vdXNlIGV2ZW50LlxuICpcbiAqIEBtZXRob2QgZHJhdyAtIERyYXdzIG9uIHRoZSBjYW52YXMuXG4gKiBAcGFyYW0ge01vdXNlRXZlbnR9IGUgLSBNb3VzZSBldmVudC5cbiAqXG4gKiBAbWV0aG9kIHN0b3BEcmF3aW5nIC0gU3RvcHMgdGhlIGRyYXdpbmcgcHJvY2Vzcy5cbiAqIEBwYXJhbSB7TW91c2VFdmVudH0gZSAtIE1vdXNlIGV2ZW50LlxuICpcbiAqIEBtZXRob2QgZXJhc2UgLSBFcmFzZXMgYSBwYXJ0IG9mIHRoZSBjYW52YXMuXG4gKiBAcGFyYW0ge251bWJlcn0geCAtIFggY29vcmRpbmF0ZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gWSBjb29yZGluYXRlLlxuICpcbiAqIEBtZXRob2QgaXNQb2ludE5lYXJMaW5lIC0gQ2hlY2tzIGlmIGEgcG9pbnQgaXMgbmVhciBhIGxpbmUuXG4gKiBAcGFyYW0ge251bWJlcn0gcHggLSBYIGNvb3JkaW5hdGUgb2YgdGhlIHBvaW50LlxuICogQHBhcmFtIHtudW1iZXJ9IHB5IC0gWSBjb29yZGluYXRlIG9mIHRoZSBwb2ludC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB4MSAtIFggY29vcmRpbmF0ZSBvZiB0aGUgbGluZSBzdGFydC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB5MSAtIFkgY29vcmRpbmF0ZSBvZiB0aGUgbGluZSBzdGFydC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB4MiAtIFggY29vcmRpbmF0ZSBvZiB0aGUgbGluZSBlbmQuXG4gKiBAcGFyYW0ge251bWJlcn0geTIgLSBZIGNvb3JkaW5hdGUgb2YgdGhlIGxpbmUgZW5kLlxuICogQHBhcmFtIHtudW1iZXJ9IHRocmVzaG9sZCAtIERpc3RhbmNlIHRocmVzaG9sZC5cbiAqIEByZXR1cm5zIHtib29sZWFufSAtIFRydWUgaWYgdGhlIHBvaW50IGlzIG5lYXIgdGhlIGxpbmUsIGZhbHNlIG90aGVyd2lzZS5cbiAqXG4gKiBAbWV0aG9kIHpvb21DYW52YXMgLSBab29tcyB0aGUgY2FudmFzLlxuICogQHBhcmFtIHtudW1iZXJ9IHNjYWxlRmFjdG9yIC0gU2NhbGUgZmFjdG9yIGZvciB6b29taW5nLlxuICogQHBhcmFtIHtNb3VzZUV2ZW50fSBbZXZlbnRdIC0gTW91c2UgZXZlbnQuXG4gKlxuICogQG1ldGhvZCBoYW5kbGVab29tIC0gSGFuZGxlcyB0aGUgem9vbSBldmVudC5cbiAqIEBwYXJhbSB7V2hlZWxFdmVudH0gZSAtIFdoZWVsIGV2ZW50LlxuICpcbiAqIEBtZXRob2QgZHJhd0VkZ2VNYXJrZXJzIC0gRHJhd3MgZWRnZSBtYXJrZXJzIG9uIHRoZSBjYW52YXMuXG4gKlxuICogQG1ldGhvZCBkcmF3U2hhcGVzIC0gRHJhd3MgYWxsIHNoYXBlcyBvbiB0aGUgY2FudmFzLlxuICpcbiAqIEBtZXRob2QgZHJhd0xpbmUgLSBEcmF3cyBhIGxpbmUgb24gdGhlIGNhbnZhcy5cbiAqIEBwYXJhbSB7bnVtYmVyfSB4MSAtIFggY29vcmRpbmF0ZSBvZiB0aGUgbGluZSBzdGFydC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB5MSAtIFkgY29vcmRpbmF0ZSBvZiB0aGUgbGluZSBzdGFydC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB4MiAtIFggY29vcmRpbmF0ZSBvZiB0aGUgbGluZSBlbmQuXG4gKiBAcGFyYW0ge251bWJlcn0geTIgLSBZIGNvb3JkaW5hdGUgb2YgdGhlIGxpbmUgZW5kLlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yIC0gQ29sb3Igb2YgdGhlIGxpbmUuXG4gKiBAcGFyYW0ge251bWJlcn0gdGhpY2tuZXNzIC0gVGhpY2tuZXNzIG9mIHRoZSBsaW5lLlxuICogQHBhcmFtIHtzdHJpbmd9IGxpbmVUeXBlIC0gVHlwZSBvZiB0aGUgbGluZSAoZS5nLiwgJ3NvbGlkJywgJ2Rhc2hlZCcpLlxuICpcbiAqIEBtZXRob2QgZHJhd1RleHQgLSBEcmF3cyB0ZXh0IG9uIHRoZSBjYW52YXMuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIFRleHQgdG8gYmUgZHJhd24uXG4gKiBAcGFyYW0ge251bWJlcn0geCAtIFggY29vcmRpbmF0ZSBvZiB0aGUgdGV4dC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gWSBjb29yZGluYXRlIG9mIHRoZSB0ZXh0LlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yIC0gQ29sb3Igb2YgdGhlIHRleHQuXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9udCAtIEZvbnQgb2YgdGhlIHRleHQuXG4gKlxuICogQG1ldGhvZCBkcmF3RnJlZWhhbmQgLSBEcmF3cyBmcmVlaGFuZCBsaW5lcyBvbiB0aGUgY2FudmFzLlxuICogQHBhcmFtIHt7IHg6IG51bWJlciwgeTogbnVtYmVyIH1bXX0gcG9pbnRzIC0gQXJyYXkgb2YgcG9pbnRzIGZvciBmcmVlaGFuZCBkcmF3aW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yIC0gQ29sb3Igb2YgdGhlIGZyZWVoYW5kIGRyYXdpbmcuXG4gKiBAcGFyYW0ge251bWJlcn0gdGhpY2tuZXNzIC0gVGhpY2tuZXNzIG9mIHRoZSBmcmVlaGFuZCBkcmF3aW5nLlxuICpcbiAqIEBtZXRob2QgZHJhd1NoYXBlIC0gRHJhd3MgYSBzaGFwZSBvbiB0aGUgY2FudmFzLlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBUeXBlIG9mIHRoZSBzaGFwZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSB4MSAtIFggY29vcmRpbmF0ZSBvZiB0aGUgc2hhcGUgc3RhcnQuXG4gKiBAcGFyYW0ge251bWJlcn0geTEgLSBZIGNvb3JkaW5hdGUgb2YgdGhlIHNoYXBlIHN0YXJ0LlxuICogQHBhcmFtIHtudW1iZXJ9IHgyIC0gWCBjb29yZGluYXRlIG9mIHRoZSBzaGFwZSBlbmQuXG4gKiBAcGFyYW0ge251bWJlcn0geTIgLSBZIGNvb3JkaW5hdGUgb2YgdGhlIHNoYXBlIGVuZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvciAtIENvbG9yIG9mIHRoZSBzaGFwZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSB0aGlja25lc3MgLSBUaGlja25lc3Mgb2YgdGhlIHNoYXBlLlxuICogQHBhcmFtIHtzdHJpbmd9IGxpbmVUeXBlIC0gVHlwZSBvZiB0aGUgbGluZSAoZS5nLiwgJ3NvbGlkJywgJ2Rhc2hlZCcpLlxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IFtjdHhdIC0gQ2FudmFzIHJlbmRlcmluZyBjb250ZXh0LlxuICpcbiAqIEBtZXRob2QgZHJhd1BvbHlnb24gLSBEcmF3cyBhIHBvbHlnb24gb24gdGhlIGNhbnZhcy5cbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjdHggLSBDYW52YXMgcmVuZGVyaW5nIGNvbnRleHQuXG4gKiBAcGFyYW0ge251bWJlcn0gc2lkZXMgLSBOdW1iZXIgb2Ygc2lkZXMgb2YgdGhlIHBvbHlnb24uXG4gKiBAcGFyYW0ge251bWJlcn0geDEgLSBYIGNvb3JkaW5hdGUgb2YgdGhlIHBvbHlnb24gc3RhcnQuXG4gKiBAcGFyYW0ge251bWJlcn0geTEgLSBZIGNvb3JkaW5hdGUgb2YgdGhlIHBvbHlnb24gc3RhcnQuXG4gKiBAcGFyYW0ge251bWJlcn0geDIgLSBYIGNvb3JkaW5hdGUgb2YgdGhlIHBvbHlnb24gZW5kLlxuICogQHBhcmFtIHtudW1iZXJ9IHkyIC0gWSBjb29yZGluYXRlIG9mIHRoZSBwb2x5Z29uIGVuZC5cbiAqL1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7XG4gIGZhVGltZXMsXG4gIGZhVW5kbyxcbiAgZmFSZWRvLFxuICBmYUVyYXNlcixcbiAgZmFTaGFwZXMsXG4gIGZhTW91c2VQb2ludGVyLFxuICBmYUhhbmRQYXBlcixcbiAgZmFUZXh0SGVpZ2h0LFxuICBmYUZvbnQsXG4gIGZhUGVuY2lsQWx0LFxuICBmYVBhaW50QnJ1c2gsXG4gIGZhVHJhc2gsXG4gIGZhU2F2ZSxcbiAgZmFTZWFyY2gsXG4gIGZhU2VhcmNoTWludXMsXG4gIGZhU2VhcmNoUGx1cyxcbiAgZmFDaGV2cm9uTGVmdCxcbiAgZmFVcGxvYWQsXG4gIGZhQ2hldnJvblJpZ2h0LFxufSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQge1xuICBPblNjcmVlbkNoYW5nZXNQYXJhbWV0ZXJzLFxuICBPblNjcmVlbkNoYW5nZXNUeXBlLFxufSBmcm9tICcuLi8uLi8uLi9jb25zdW1lcnMvb24tc2NyZWVuLWNoYW5nZXMuc2VydmljZSc7XG5pbXBvcnQge1xuICBDYXB0dXJlQ2FudmFzU3RyZWFtUGFyYW1ldGVycyxcbiAgU2hvd0FsZXJ0LFxuICBXaGl0ZWJvYXJkVXNlcixcbiAgUGFydGljaXBhbnQsXG4gIENhcHR1cmVDYW52YXNTdHJlYW1UeXBlLFxufSBmcm9tICcuLi8uLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNoYXBlIHtcbiAgdHlwZTogc3RyaW5nO1xuICB4PzogbnVtYmVyO1xuICB5PzogbnVtYmVyO1xuICB4MT86IG51bWJlcjtcbiAgeTE/OiBudW1iZXI7XG4gIHgyPzogbnVtYmVyO1xuICB5Mj86IG51bWJlcjtcbiAgdGV4dD86IHN0cmluZztcbiAgY29sb3I/OiBzdHJpbmc7XG4gIGZvbnQ/OiBzdHJpbmc7XG4gIGZvbnRTaXplPzogbnVtYmVyO1xuICB0aGlja25lc3M/OiBudW1iZXI7XG4gIGxpbmVUeXBlPzogc3RyaW5nO1xuICBwb2ludHM/OiBBcnJheTx7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0+O1xuICBpbWc/OiBIVE1MSW1hZ2VFbGVtZW50O1xuICBzcmM/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2hpdGVib2FyZFBhcmFtZXRlcnNcbiAgZXh0ZW5kcyBPblNjcmVlbkNoYW5nZXNQYXJhbWV0ZXJzLFxuICAgIENhcHR1cmVDYW52YXNTdHJlYW1QYXJhbWV0ZXJzIHtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgaXNsZXZlbDogc3RyaW5nO1xuICByb29tTmFtZTogc3RyaW5nO1xuICBzaGFwZXM6IFNoYXBlW107XG4gIHVzZUltYWdlQmFja2dyb3VuZDogYm9vbGVhbjtcbiAgcmVkb1N0YWNrOiBTaGFwZVtdO1xuICB1bmRvU3RhY2s6IHN0cmluZ1tdO1xuICB3aGl0ZWJvYXJkU3RhcnRlZDogYm9vbGVhbjtcbiAgd2hpdGVib2FyZEVuZGVkOiBib29sZWFuO1xuICB3aGl0ZWJvYXJkVXNlcnM6IFdoaXRlYm9hcmRVc2VyW107XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgcGFydGljaXBhbnRzQWxsOiBQYXJ0aWNpcGFudFtdO1xuICBzY3JlZW5JZDogc3RyaW5nO1xuICByZWNvcmRTdGFydGVkOiBib29sZWFuO1xuICByZWNvcmRTdG9wcGVkOiBib29sZWFuO1xuICByZWNvcmRQYXVzZWQ6IGJvb2xlYW47XG4gIHJlY29yZFJlc3VtZWQ6IGJvb2xlYW47XG4gIHJlY29yZGluZ01lZGlhT3B0aW9uczogc3RyaW5nO1xuICBtZW1iZXI6IHN0cmluZztcbiAgc2hhcmVTY3JlZW5TdGFydGVkOiBib29sZWFuO1xuICBjYW52YXNXaGl0ZWJvYXJkOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw7XG4gIHRhcmdldFJlc29sdXRpb24/OiBzdHJpbmc7XG4gIHRhcmdldFJlc29sdXRpb25Ib3N0Pzogc3RyaW5nO1xuXG4gIHVwZGF0ZVNoYXBlczogKHNoYXBlczogU2hhcGVbXSkgPT4gdm9pZDtcbiAgdXBkYXRlVXNlSW1hZ2VCYWNrZ3JvdW5kOiAodXNlSW1hZ2VCYWNrZ3JvdW5kOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVSZWRvU3RhY2s6IChyZWRvU3RhY2s6IFNoYXBlW10pID0+IHZvaWQ7XG4gIHVwZGF0ZVVuZG9TdGFjazogKHVuZG9TdGFjazogc3RyaW5nW10pID0+IHZvaWQ7XG4gIHVwZGF0ZVdoaXRlYm9hcmRTdGFydGVkOiAod2hpdGVib2FyZFN0YXJ0ZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVdoaXRlYm9hcmRFbmRlZDogKHdoaXRlYm9hcmRFbmRlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlV2hpdGVib2FyZFVzZXJzOiAod2hpdGVib2FyZFVzZXJzOiBXaGl0ZWJvYXJkVXNlcltdKSA9PiB2b2lkO1xuICB1cGRhdGVQYXJ0aWNpcGFudHM6IChwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W10pID0+IHZvaWQ7XG4gIHVwZGF0ZVNjcmVlbklkOiAoc2NyZWVuSWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkOiAoc2hhcmVTY3JlZW5TdGFydGVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVDYW52YXNXaGl0ZWJvYXJkOiAoY2FudmFzV2hpdGVib2FyZDogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBvblNjcmVlbkNoYW5nZXM6IE9uU2NyZWVuQ2hhbmdlc1R5cGU7XG4gIGNhcHR1cmVDYW52YXNTdHJlYW06IENhcHR1cmVDYW52YXNTdHJlYW1UeXBlO1xuXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFdoaXRlYm9hcmRQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2hpdGVib2FyZE9wdGlvbnMge1xuICBjdXN0b21XaWR0aDogbnVtYmVyO1xuICBjdXN0b21IZWlnaHQ6IG51bWJlcjtcbiAgcGFyYW1ldGVyczogV2hpdGVib2FyZFBhcmFtZXRlcnM7XG4gIHNob3dBc3BlY3Q6IGJvb2xlYW47XG59XG5cbmV4cG9ydCB0eXBlIFdoaXRlYm9hcmRUeXBlID0gKG9wdGlvbnM6IFdoaXRlYm9hcmRPcHRpb25zKSA9PiB2b2lkO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtd2hpdGVib2FyZCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHRlbXBsYXRlVXJsOiAnLi93aGl0ZWJvYXJkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vd2hpdGVib2FyZC5jb21wb25lbnQuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIFdoaXRlYm9hcmQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgY3VzdG9tV2lkdGghOiBudW1iZXI7XG4gIEBJbnB1dCgpIGN1c3RvbUhlaWdodCE6IG51bWJlcjtcbiAgQElucHV0KCkgcGFyYW1ldGVyczogV2hpdGVib2FyZFBhcmFtZXRlcnMgPSB7fSBhcyBXaGl0ZWJvYXJkUGFyYW1ldGVycztcbiAgQElucHV0KCkgc2hvd0FzcGVjdCE6IGJvb2xlYW47XG5cbiAgQFZpZXdDaGlsZCgnY2FudmFzUmVmJywgeyBzdGF0aWM6IGZhbHNlIH0pIGNhbnZhc1JlZiE6IEVsZW1lbnRSZWY8SFRNTENhbnZhc0VsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCd0ZXh0SW5wdXRSZWYnLCB7IHN0YXRpYzogZmFsc2UgfSkgdGV4dElucHV0UmVmITogRWxlbWVudFJlZjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgndG9nZ2xlQmFja2dyb3VuZFJlZicsIHsgc3RhdGljOiBmYWxzZSB9KVxuICB0b2dnbGVCYWNrZ3JvdW5kUmVmITogRWxlbWVudFJlZjxIVE1MQnV0dG9uRWxlbWVudD47XG4gIEBWaWV3Q2hpbGQoJ2Rvd25sb2FkTGlua1JlZicsIHsgc3RhdGljOiBmYWxzZSB9KSBkb3dubG9hZExpbmtSZWYhOiBFbGVtZW50UmVmPEhUTUxBbmNob3JFbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgndGVtcENhbnZhc1JlZicsIHsgc3RhdGljOiBmYWxzZSB9KSB0ZW1wQ2FudmFzUmVmITogRWxlbWVudFJlZjxIVE1MQ2FudmFzRWxlbWVudD47XG5cbiAgZmFUaW1lcyA9IGZhVGltZXM7XG4gIGZhVW5kbyA9IGZhVW5kbztcbiAgZmFSZWRvID0gZmFSZWRvO1xuICBmYUVyYXNlciA9IGZhRXJhc2VyO1xuICBmYVNoYXBlcyA9IGZhU2hhcGVzO1xuICBmYU1vdXNlUG9pbnRlciA9IGZhTW91c2VQb2ludGVyO1xuICBmYUhhbmRQYXBlciA9IGZhSGFuZFBhcGVyO1xuICBmYVRleHRIZWlnaHQgPSBmYVRleHRIZWlnaHQ7XG4gIGZhRm9udCA9IGZhRm9udDtcbiAgZmFQZW5jaWxBbHQgPSBmYVBlbmNpbEFsdDtcbiAgZmFQYWludEJydXNoID0gZmFQYWludEJydXNoO1xuICBmYVRyYXNoID0gZmFUcmFzaDtcbiAgZmFTYXZlID0gZmFTYXZlO1xuICBmYVNlYXJjaCA9IGZhU2VhcmNoO1xuICBmYVNlYXJjaE1pbnVzID0gZmFTZWFyY2hNaW51cztcbiAgZmFTZWFyY2hQbHVzID0gZmFTZWFyY2hQbHVzO1xuICBmYUNoZXZyb25MZWZ0ID0gZmFDaGV2cm9uTGVmdDtcbiAgZmFVcGxvYWQgPSBmYVVwbG9hZDtcbiAgZmFDaGV2cm9uUmlnaHQgPSBmYUNoZXZyb25SaWdodDtcblxuICBwcml2YXRlIG1vZGUgPSAncGFuJztcbiAgcHJpdmF0ZSBpc0RyYXdpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBpc1Bhbm5pbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBpc0RyYWdnaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgc3RhcnRYID0gMDtcbiAgcHJpdmF0ZSBzdGFydFkgPSAwO1xuICBwcml2YXRlIGN1cnJlbnRYID0gMDtcbiAgcHJpdmF0ZSBjdXJyZW50WSA9IDA7XG4gIHByaXZhdGUgZnJlZWhhbmREcmF3aW5nOiBhbnlbXSA9IFtdO1xuICBwcml2YXRlIHNlbGVjdGVkU2hhcGU6IGFueSA9IG51bGw7XG4gIHByaXZhdGUgc2VsZWN0ZWRIYW5kbGU6IGFueSA9IG51bGw7XG4gIHByaXZhdGUgbW92aW5nU2hhcGUgPSBmYWxzZTtcbiAgcHJpdmF0ZSBwYW5YID0gMDtcbiAgcHJpdmF0ZSBwYW5ZID0gMDtcbiAgcHJpdmF0ZSBzY2FsZSA9IDE7XG4gIHByaXZhdGUgbWluU2NhbGUgPSAwLjI1O1xuICBwcml2YXRlIG1heFNjYWxlID0gMS43NTtcbiAgcHJpdmF0ZSBlcmFzZXJUaGlja25lc3MgPSAxMDtcbiAgcHJpdmF0ZSBicnVzaFRoaWNrbmVzcyA9IDY7XG4gIHByaXZhdGUgbGluZVRoaWNrbmVzcyA9IDY7XG4gIGxpbmVUeXBlID0gJ3NvbGlkJztcbiAgY29sb3IgPSAnIzAwMDAwMCc7XG4gIHByaXZhdGUgZm9udCA9ICdBcmlhbCc7XG4gIHByaXZhdGUgZm9udFNpemUgPSAyMDtcbiAgcHJpdmF0ZSBzaGFwZTogYW55ID0gbnVsbDtcbiAgcHJpdmF0ZSBiYWNrZ3JvdW5kSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgdG9vbGJhclZpc2libGUgPSB0cnVlO1xuICBkcm9wZG93bk9wZW46IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGN1cnJlbnRDbGlja1Bvc2l0aW9uOiB7XG4gICAgY2xpZW50WDogbnVtYmVyO1xuICAgIGNsaWVudFk6IG51bWJlcjtcbiAgICBvZmZzZXRYOiBudW1iZXI7XG4gICAgb2Zmc2V0WTogbnVtYmVyO1xuICB9IHwgbnVsbCA9IG51bGw7XG5cbiAgcHJpdmF0ZSBtYXhXaWR0aCA9IDEyODA7XG4gIHByaXZhdGUgbWF4SGVpZ2h0ID0gNzIwO1xuICBwcml2YXRlIGRpbWVuc2lvbnNGaXhlZCA9IGZhbHNlO1xuICBwcml2YXRlIGlzVmFsaWRTaGFwZSA9IGZhbHNlO1xuXG4gIHVwZGF0ZUxpbmVUaGlja25lc3MgPSAodGhpY2tuZXNzOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmxpbmVUaGlja25lc3MgPSB0aGlja25lc3M7XG4gIH07XG5cbiAgdXBkYXRlQnJ1c2hUaGlja25lc3MgPSAodGhpY2tuZXNzOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmJydXNoVGhpY2tuZXNzID0gdGhpY2tuZXNzO1xuICB9O1xuXG4gIHVwZGF0ZUVyYXNlclRoaWNrbmVzcyA9ICh0aGlja25lc3M6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuZXJhc2VyVGhpY2tuZXNzID0gdGhpY2tuZXNzO1xuICB9O1xuXG4gIHVwZGF0ZUNvbG9yID0gKGNvbG9yOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gIH07XG5cbiAgdXBkYXRlRm9udCA9IChmb250OiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmZvbnQgPSBmb250O1xuICB9O1xuXG4gIHVwZGF0ZUZvbnRTaXplID0gKGZvbnRTaXplOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmZvbnRTaXplID0gZm9udFNpemU7XG4gIH07XG5cbiAgdXBkYXRlU2hhcGUgPSAoc2hhcGU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcbiAgfTtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zaG93QXNwZWN0KSB7XG4gICAgICB0aGlzLmFkZExpc3RlbmVycygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlc1sncGFyYW1ldGVycyddICYmIGNoYW5nZXNbJ3BhcmFtZXRlcnMnXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycyA9IGNoYW5nZXNbJ3BhcmFtZXRlcnMnXS5jdXJyZW50VmFsdWU7XG5cbiAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuc29ja2V0KSB7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5zb2NrZXQub24oJ3doaXRlYm9hcmRVcGRhdGVkJywgYXN5bmMgKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMuV2hpdGVib2FyZFVwZGF0ZWQoZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5zb2NrZXQub24oJ3doaXRlYm9hcmRBY3Rpb24nLCAoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5XaGl0ZWJvYXJkQWN0aW9uKGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1snc2hvd0FzcGVjdCddKSB7XG4gICAgICBpZiAoY2hhbmdlc1snc2hvd0FzcGVjdCddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVycygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuc3RhcnREcmF3aW5nLmJpbmQodGhpcykpO1xuICAgIGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmRyYXcuYmluZCh0aGlzKSk7XG4gICAgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnN0b3BEcmF3aW5nLmJpbmQodGhpcykpO1xuICAgIGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuaGFuZGxlWm9vbS5iaW5kKHRoaXMpKTtcbiAgICBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNhbnZhc0NsaWNrLmJpbmQodGhpcykpO1xuXG4gICAgLy8gdG91Y2ggZXZlbnRzXG4gICAgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoU3RhcnQuYmluZCh0aGlzKSk7XG4gICAgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlVG91Y2hNb3ZlLmJpbmQodGhpcykpO1xuICAgIGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuaGFuZGxlVG91Y2hFbmQuYmluZCh0aGlzKSk7XG5cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZUNsaWNrT3V0c2lkZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBBdHRhY2ggdGhlIGV2ZW50IGxpc3RlbmVyIG9uY2UgYWZ0ZXIgdGhlIHZpZXcgaGFzIGJlZW4gaW5pdGlhbGl6ZWRcbiAgICBjb25zdCB0ZXh0SW5wdXQgPSB0aGlzLnRleHRJbnB1dFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRleHRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICB0aGlzLmhhbmRsZVRleHRJbnB1dChldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVUZXh0SW5wdXQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCB0ZXh0SW5wdXQgPSB0aGlzLnRleHRJbnB1dFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicgJiYgdGhpcy5jdXJyZW50Q2xpY2tQb3NpdGlvbikge1xuICAgICAgY29uc3QgeyBvZmZzZXRYLCBvZmZzZXRZIH0gPSB0aGlzLmN1cnJlbnRDbGlja1Bvc2l0aW9uO1xuICAgICAgY29uc3QgdGV4dCA9IHRleHRJbnB1dC52YWx1ZTtcbiAgICAgIHRleHRJbnB1dC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgdGV4dElucHV0LnZhbHVlID0gJyc7XG5cbiAgICAgIGNvbnN0IHggPSAob2Zmc2V0WCAtIHRoaXMucGFuWCkgLyB0aGlzLnNjYWxlO1xuICAgICAgY29uc3QgeSA9IChvZmZzZXRZIC0gdGhpcy5wYW5ZKSAvIHRoaXMuc2NhbGU7XG5cbiAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFwZXMucHVzaCh7XG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgdGV4dCxcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXG4gICAgICAgIGZvbnQ6IHRoaXMuZm9udCxcbiAgICAgICAgZm9udFNpemU6IHRoaXMuZm9udFNpemUsXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlU2hhcGVzKHRoaXMucGFyYW1ldGVycy5zaGFwZXMpO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNvY2tldC5lbWl0KFxuICAgICAgICAndXBkYXRlQm9hcmRBY3Rpb24nLFxuICAgICAgICB7XG4gICAgICAgICAgYWN0aW9uOiAndGV4dCcsXG4gICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgdGV4dCxcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICB5LFxuICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXG4gICAgICAgICAgICBmb250OiB0aGlzLmZvbnQsXG4gICAgICAgICAgICBmb250U2l6ZTogdGhpcy5mb250U2l6ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB0aGlzLmhhbmRsZVNlcnZlclJlc3BvbnNlLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBhZGRMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucGFyYW1ldGVycykge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzID0gdGhpcy5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcbiAgICB9XG5cbiAgICB0aGlzLmJhY2tncm91bmRJbWFnZS5zcmMgPSAnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9ncmFwaF9wYXBlci5qcGcnO1xuICAgIHRoaXMuYmFja2dyb3VuZEltYWdlLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG4gICAgdGhpcy5iYWNrZ3JvdW5kSW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICBpZiAodGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy50YXJnZXRSZXNvbHV0aW9uID09ICdxaGQnIHx8XG4gICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnRhcmdldFJlc29sdXRpb25Ib3N0ID09ICdxaGQnXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMubWF4V2lkdGggPSAxOTIwO1xuICAgICAgICAgIHRoaXMubWF4SGVpZ2h0ID0gMTA4MDtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMudGFyZ2V0UmVzb2x1dGlvbiA9PSAnZmhkJyB8fFxuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy50YXJnZXRSZXNvbHV0aW9uSG9zdCA9PSAnZmhkJ1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLm1heFdpZHRoID0gMTkyMDtcbiAgICAgICAgICB0aGlzLm1heEhlaWdodCA9IDEwODA7XG4gICAgICAgIH1cbiAgICAgICAgY2FudmFzLndpZHRoID0gdGhpcy5tYXhXaWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHRoaXMubWF4SGVpZ2h0O1xuICAgICAgICB0aGlzLmRpbWVuc2lvbnNGaXhlZCA9IHRydWU7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICB9XG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlQ2FudmFzV2hpdGVib2FyZCh0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5zdGFydERyYXdpbmcuYmluZCh0aGlzKSk7XG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuZHJhdy5iaW5kKHRoaXMpKTtcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuc3RvcERyYXdpbmcuYmluZCh0aGlzKSk7XG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVab29tLmJpbmQodGhpcykpO1xuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlQ2FudmFzQ2xpY2suYmluZCh0aGlzKSk7XG5cbiAgICAvLyB0b3VjaCBldmVudHNcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hTdGFydC5iaW5kKHRoaXMpKTtcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUuYmluZCh0aGlzKSk7XG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5oYW5kbGVUb3VjaEVuZC5iaW5kKHRoaXMpKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlQ2xpY2tPdXRzaWRlLmJpbmQodGhpcykpO1xuICB9O1xuXG4gIGhhbmRsZVRvdWNoU3RhcnQoZTogVG91Y2hFdmVudCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB0b3VjaCA9IGUudG91Y2hlc1swXTtcbiAgICBjb25zdCBtb3VzZUV2ZW50ID0gbmV3IE1vdXNlRXZlbnQoJ21vdXNlZG93bicsIHtcbiAgICAgIGNsaWVudFg6IHRvdWNoLmNsaWVudFgsXG4gICAgICBjbGllbnRZOiB0b3VjaC5jbGllbnRZLFxuICAgIH0pO1xuICAgIHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudChtb3VzZUV2ZW50KTtcbiAgfVxuXG4gIGhhbmRsZVRvdWNoTW92ZShlOiBUb3VjaEV2ZW50KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHRvdWNoID0gZS50b3VjaGVzWzBdO1xuICAgIGNvbnN0IG1vdXNlRXZlbnQgPSBuZXcgTW91c2VFdmVudCgnbW91c2Vtb3ZlJywge1xuICAgICAgY2xpZW50WDogdG91Y2guY2xpZW50WCxcbiAgICAgIGNsaWVudFk6IHRvdWNoLmNsaWVudFksXG4gICAgfSk7XG4gICAgdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KG1vdXNlRXZlbnQpO1xuICB9XG5cbiAgaGFuZGxlVG91Y2hFbmQoZTogVG91Y2hFdmVudCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBtb3VzZUV2ZW50ID0gbmV3IE1vdXNlRXZlbnQoJ21vdXNldXAnLCB7fSk7XG4gICAgdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KG1vdXNlRXZlbnQpO1xuICB9XG5cbiAgaGFuZGxlQ2xpY2tPdXRzaWRlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEVsZW1lbnQ7XG4gICAgaWYgKHRoaXMuZHJvcGRvd25PcGVuICYmICF0YXJnZXQuY2xvc2VzdCgnLmJ0bi1ncm91cCcpKSB7XG4gICAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ2FudmFzQ2xpY2soZTogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLm1vZGUgPT09ICd0ZXh0Jykge1xuICAgICAgY29uc3QgdGV4dElucHV0ID0gdGhpcy50ZXh0SW5wdXRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgIHRleHRJbnB1dC5zdHlsZS5sZWZ0ID0gZS5jbGllbnRYICsgJ3B4JztcbiAgICAgIHRleHRJbnB1dC5zdHlsZS50b3AgPSBlLmNsaWVudFkgKyAncHgnO1xuICAgICAgdGV4dElucHV0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgdGV4dElucHV0LmZvY3VzKCk7XG4gICAgICB0aGlzLmN1cnJlbnRDbGlja1Bvc2l0aW9uID0ge1xuICAgICAgICBjbGllbnRYOiBlLmNsaWVudFgsXG4gICAgICAgIGNsaWVudFk6IGUuY2xpZW50WSxcbiAgICAgICAgb2Zmc2V0WDogZS5vZmZzZXRYLFxuICAgICAgICBvZmZzZXRZOiBlLm9mZnNldFksXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0RHJhd2luZyhlOiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5pc0RyYXdpbmcgPSB0cnVlO1xuICAgIHRoaXMuc3RhcnRYID0gKGUub2Zmc2V0WCAtIHRoaXMucGFuWCkgLyB0aGlzLnNjYWxlO1xuICAgIHRoaXMuc3RhcnRZID0gKGUub2Zmc2V0WSAtIHRoaXMucGFuWSkgLyB0aGlzLnNjYWxlO1xuXG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ2VyYXNlJykge1xuICAgICAgdGhpcy5lcmFzZSh0aGlzLnN0YXJ0WCwgdGhpcy5zdGFydFkpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlID09PSAnZHJhdycgfHwgdGhpcy5tb2RlID09PSAnZnJlZWhhbmQnKSB7XG4gICAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgICBjdHghLmJlZ2luUGF0aCgpO1xuICAgICAgY3R4IS5tb3ZlVG8odGhpcy5zdGFydFgsIHRoaXMuc3RhcnRZKTtcbiAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdmcmVlaGFuZCcpIHtcbiAgICAgICAgdGhpcy5mcmVlaGFuZERyYXdpbmcgPSBbeyB4OiB0aGlzLnN0YXJ0WCwgeTogdGhpcy5zdGFydFkgfV07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLm1vZGUgPT09ICdwYW4nKSB7XG4gICAgICB0aGlzLmlzUGFubmluZyA9IHRydWU7XG4gICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRIYW5kbGUgPSB0aGlzLmdldEhhbmRsZUF0UG9zaXRpb24odGhpcy5zdGFydFgsIHRoaXMuc3RhcnRZKTtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkSGFuZGxlKSB7XG4gICAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgICAgIHRoaXMubW92aW5nU2hhcGUgPSB0aGlzLnNlbGVjdGVkSGFuZGxlLmlzQ2VudGVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFNoYXBlID0gdGhpcy5maW5kU2hhcGUodGhpcy5zdGFydFgsIHRoaXMuc3RhcnRZKTtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRTaGFwZSkge1xuICAgICAgICAgIHRoaXMuZHJhd1NoYXBlcygpO1xuICAgICAgICAgIHRoaXMuZHJhd1NlbGVjdGlvbih0aGlzLnNlbGVjdGVkU2hhcGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZHJhdyA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLmRpbWVuc2lvbnNGaXhlZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy50YXJnZXRSZXNvbHV0aW9uID09ICdxaGQnIHx8XG4gICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnRhcmdldFJlc29sdXRpb25Ib3N0ID09ICdxaGQnXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMubWF4V2lkdGggPSAxOTIwO1xuICAgICAgICAgIHRoaXMubWF4SGVpZ2h0ID0gMTA4MDtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMudGFyZ2V0UmVzb2x1dGlvbiA9PSAnZmhkJyB8fFxuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy50YXJnZXRSZXNvbHV0aW9uSG9zdCA9PSAnZmhkJ1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLm1heFdpZHRoID0gMTkyMDtcbiAgICAgICAgICB0aGlzLm1heEhlaWdodCA9IDEwODA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC53aWR0aCA9IHRoaXMubWF4V2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuaGVpZ2h0ID0gdGhpcy5tYXhIZWlnaHQ7XG4gICAgICAgIHRoaXMuZGltZW5zaW9uc0ZpeGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZUNhbnZhc1doaXRlYm9hcmQodGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICB9XG4gICAgfVxuICAgIGlmICghdGhpcy5pc0RyYXdpbmcpIHJldHVybjtcbiAgICB0aGlzLmN1cnJlbnRYID0gKGUub2Zmc2V0WCAtIHRoaXMucGFuWCkgLyB0aGlzLnNjYWxlO1xuICAgIHRoaXMuY3VycmVudFkgPSAoZS5vZmZzZXRZIC0gdGhpcy5wYW5ZKSAvIHRoaXMuc2NhbGU7XG5cbiAgICBpZiAodGhpcy5tb2RlID09ICdkcmF3JyB8fCB0aGlzLm1vZGUgPT0gJ2ZyZWVoYW5kJyB8fCB0aGlzLm1vZGUgPT0gJ3NoYXBlJykge1xuICAgICAgLy9pZiBtb3JlIHRoYW4gbWF4IHdpZHRoIG9yIGhlaWdodCBvciBsZXNzIHRoYW4gMCwgcmV0dXJuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuY3VycmVudFggPiB0aGlzLm1heFdpZHRoIHx8XG4gICAgICAgIHRoaXMuY3VycmVudFkgPiB0aGlzLm1heEhlaWdodCB8fFxuICAgICAgICB0aGlzLmN1cnJlbnRYIDwgMCB8fFxuICAgICAgICB0aGlzLmN1cnJlbnRZIDwgMFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuaXNWYWxpZFNoYXBlID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaXNWYWxpZFNoYXBlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ2VyYXNlJykge1xuICAgICAgdGhpcy5lcmFzZSh0aGlzLmN1cnJlbnRYLCB0aGlzLmN1cnJlbnRZKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gJ2RyYXcnKSB7XG4gICAgICBjdHghLmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LndpZHRoLCB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmhlaWdodCk7XG4gICAgICB0aGlzLmRyYXdTaGFwZXMoKTtcbiAgICAgIHRoaXMuZHJhd0xpbmUoXG4gICAgICAgIHRoaXMuc3RhcnRYLFxuICAgICAgICB0aGlzLnN0YXJ0WSxcbiAgICAgICAgdGhpcy5jdXJyZW50WCxcbiAgICAgICAgdGhpcy5jdXJyZW50WSxcbiAgICAgICAgdGhpcy5jb2xvcixcbiAgICAgICAgdGhpcy5saW5lVGhpY2tuZXNzLFxuICAgICAgICB0aGlzLmxpbmVUeXBlLFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gJ2ZyZWVoYW5kJykge1xuICAgICAgY3R4IS5saW5lVG8odGhpcy5jdXJyZW50WCwgdGhpcy5jdXJyZW50WSk7XG4gICAgICBjdHghLnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgIGN0eCEubGluZVdpZHRoID0gdGhpcy5icnVzaFRoaWNrbmVzcztcbiAgICAgIGN0eCEuc3Ryb2tlKCk7XG4gICAgICB0aGlzLmZyZWVoYW5kRHJhd2luZy5wdXNoKHsgeDogdGhpcy5jdXJyZW50WCwgeTogdGhpcy5jdXJyZW50WSB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gJ3NoYXBlJykge1xuICAgICAgY3R4IS5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC53aWR0aCwgdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC5oZWlnaHQpO1xuICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgICB0aGlzLmRyYXdTaGFwZShcbiAgICAgICAgdGhpcy5zaGFwZSxcbiAgICAgICAgdGhpcy5zdGFydFgsXG4gICAgICAgIHRoaXMuc3RhcnRZLFxuICAgICAgICB0aGlzLmN1cnJlbnRYLFxuICAgICAgICB0aGlzLmN1cnJlbnRZLFxuICAgICAgICB0aGlzLmNvbG9yLFxuICAgICAgICB0aGlzLmxpbmVUaGlja25lc3MsXG4gICAgICAgIHRoaXMubGluZVR5cGUsXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlID09PSAncGFuJyAmJiB0aGlzLmlzUGFubmluZykge1xuICAgICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgIGNvbnN0IGR4ID0gZS5jbGllbnRYIC0gdGhpcy5zdGFydFg7XG4gICAgICBjb25zdCBkeSA9IGUuY2xpZW50WSAtIHRoaXMuc3RhcnRZO1xuICAgICAgdGhpcy5wYW5YICs9IGR4O1xuICAgICAgdGhpcy5wYW5ZICs9IGR5O1xuICAgICAgdGhpcy5zdGFydFggPSBlLmNsaWVudFg7XG4gICAgICB0aGlzLnN0YXJ0WSA9IGUuY2xpZW50WTtcblxuICAgICAgY3R4IS5zZXRUcmFuc2Zvcm0odGhpcy5zY2FsZSwgMCwgMCwgdGhpcy5zY2FsZSwgdGhpcy5wYW5YLCB0aGlzLnBhblkpO1xuICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm1vZGUgPT09ICdzZWxlY3QnICYmIHRoaXMuc2VsZWN0ZWRTaGFwZSkge1xuICAgICAgY3R4IS5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC53aWR0aCwgdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC5oZWlnaHQpO1xuICAgICAgaWYgKHRoaXMubW92aW5nU2hhcGUpIHtcbiAgICAgICAgY29uc3QgZHggPSB0aGlzLmN1cnJlbnRYIC0gdGhpcy5zdGFydFg7XG4gICAgICAgIGNvbnN0IGR5ID0gdGhpcy5jdXJyZW50WSAtIHRoaXMuc3RhcnRZO1xuICAgICAgICB0aGlzLm1vdmVTaGFwZSh0aGlzLnNlbGVjdGVkU2hhcGUsIGR4LCBkeSk7XG4gICAgICAgIHRoaXMuc3RhcnRYID0gdGhpcy5jdXJyZW50WDtcbiAgICAgICAgdGhpcy5zdGFydFkgPSB0aGlzLmN1cnJlbnRZO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5yZXNpemVTaGFwZSh0aGlzLnNlbGVjdGVkU2hhcGUsIHRoaXMuc2VsZWN0ZWRIYW5kbGUsIHRoaXMuY3VycmVudFgsIHRoaXMuY3VycmVudFkpO1xuICAgICAgfVxuICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgICB0aGlzLmRyYXdTZWxlY3Rpb24odGhpcy5zZWxlY3RlZFNoYXBlKTtcbiAgICB9XG4gIH07XG5cbiAgc3RvcERyYXdpbmcoKSB7XG4gICAgdGhpcy5pc0RyYXdpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmlzUGFubmluZyA9IGZhbHNlO1xuICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgY29uc3QgY3R4ID0gdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eCEuY2xvc2VQYXRoKCk7XG5cbiAgICBpZiAodGhpcy5tb2RlID09PSAnZHJhdycgJiYgdGhpcy5pc1ZhbGlkU2hhcGUpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFwZXMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgeDE6IHRoaXMuc3RhcnRYLFxuICAgICAgICB5MTogdGhpcy5zdGFydFksXG4gICAgICAgIHgyOiB0aGlzLmN1cnJlbnRYLFxuICAgICAgICB5MjogdGhpcy5jdXJyZW50WSxcbiAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXG4gICAgICAgIHRoaWNrbmVzczogdGhpcy5saW5lVGhpY2tuZXNzLFxuICAgICAgICBsaW5lVHlwZTogdGhpcy5saW5lVHlwZSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVNoYXBlcyh0aGlzLnBhcmFtZXRlcnMuc2hhcGVzKTtcbiAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMuc29ja2V0LmVtaXQoXG4gICAgICAgICd1cGRhdGVCb2FyZEFjdGlvbicsXG4gICAgICAgIHtcbiAgICAgICAgICBhY3Rpb246ICdkcmF3JyxcbiAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICB4MTogdGhpcy5zdGFydFgsXG4gICAgICAgICAgICB5MTogdGhpcy5zdGFydFksXG4gICAgICAgICAgICB4MjogdGhpcy5jdXJyZW50WCxcbiAgICAgICAgICAgIHkyOiB0aGlzLmN1cnJlbnRZLFxuICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXG4gICAgICAgICAgICB0aGlja25lc3M6IHRoaXMubGluZVRoaWNrbmVzcyxcbiAgICAgICAgICAgIGxpbmVUeXBlOiB0aGlzLmxpbmVUeXBlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHRoaXMuaGFuZGxlU2VydmVyUmVzcG9uc2UsXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlID09PSAnZnJlZWhhbmQnICYmIHRoaXMuaXNWYWxpZFNoYXBlKSB7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzLnB1c2goe1xuICAgICAgICB0eXBlOiAnZnJlZWhhbmQnLFxuICAgICAgICBwb2ludHM6IHRoaXMuZnJlZWhhbmREcmF3aW5nLFxuICAgICAgICBjb2xvcjogdGhpcy5jb2xvcixcbiAgICAgICAgdGhpY2tuZXNzOiB0aGlzLmJydXNoVGhpY2tuZXNzLFxuICAgICAgfSk7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlU2hhcGVzKHRoaXMucGFyYW1ldGVycy5zaGFwZXMpO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNvY2tldC5lbWl0KFxuICAgICAgICAndXBkYXRlQm9hcmRBY3Rpb24nLFxuICAgICAgICB7XG4gICAgICAgICAgYWN0aW9uOiAnZHJhdycsXG4gICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgdHlwZTogJ2ZyZWVoYW5kJyxcbiAgICAgICAgICAgIHBvaW50czogdGhpcy5mcmVlaGFuZERyYXdpbmcsXG4gICAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvcixcbiAgICAgICAgICAgIHRoaWNrbmVzczogdGhpcy5icnVzaFRoaWNrbmVzcyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB0aGlzLmhhbmRsZVNlcnZlclJlc3BvbnNlLFxuICAgICAgKTtcbiAgICAgIHRoaXMuZnJlZWhhbmREcmF3aW5nID0gW107XG4gICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlID09PSAnc2hhcGUnICYmIHRoaXMuaXNWYWxpZFNoYXBlKSB7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzLnB1c2goe1xuICAgICAgICB0eXBlOiB0aGlzLnNoYXBlLFxuICAgICAgICB4MTogdGhpcy5zdGFydFgsXG4gICAgICAgIHkxOiB0aGlzLnN0YXJ0WSxcbiAgICAgICAgeDI6IHRoaXMuY3VycmVudFgsXG4gICAgICAgIHkyOiB0aGlzLmN1cnJlbnRZLFxuICAgICAgICBjb2xvcjogdGhpcy5jb2xvcixcbiAgICAgICAgdGhpY2tuZXNzOiB0aGlzLmxpbmVUaGlja25lc3MsXG4gICAgICAgIGxpbmVUeXBlOiB0aGlzLmxpbmVUeXBlLFxuICAgICAgfSk7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlU2hhcGVzKHRoaXMucGFyYW1ldGVycy5zaGFwZXMpO1xuICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zb2NrZXQuZW1pdChcbiAgICAgICAgJ3VwZGF0ZUJvYXJkQWN0aW9uJyxcbiAgICAgICAge1xuICAgICAgICAgIGFjdGlvbjogJ3NoYXBlJyxcbiAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICB0eXBlOiB0aGlzLnNoYXBlLFxuICAgICAgICAgICAgeDE6IHRoaXMuc3RhcnRYLFxuICAgICAgICAgICAgeTE6IHRoaXMuc3RhcnRZLFxuICAgICAgICAgICAgeDI6IHRoaXMuY3VycmVudFgsXG4gICAgICAgICAgICB5MjogdGhpcy5jdXJyZW50WSxcbiAgICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yLFxuICAgICAgICAgICAgdGhpY2tuZXNzOiB0aGlzLmxpbmVUaGlja25lc3MsXG4gICAgICAgICAgICBsaW5lVHlwZTogdGhpcy5saW5lVHlwZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB0aGlzLmhhbmRsZVNlcnZlclJlc3BvbnNlLFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkU2hhcGUgJiYgIXRoaXMubW92aW5nU2hhcGUgJiYgIXRoaXMuaXNEcmFnZ2luZykge1xuICAgICAgICBjb25zdCBzaGFwZUZvdW5kID0gdGhpcy5maW5kU2hhcGUodGhpcy5jdXJyZW50WCwgdGhpcy5jdXJyZW50WSk7XG4gICAgICAgIGlmIChzaGFwZUZvdW5kKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZFNoYXBlID0gc2hhcGVGb3VuZDtcbiAgICAgICAgICB0aGlzLmRyYXdTaGFwZXMoKTtcbiAgICAgICAgICB0aGlzLmRyYXdTZWxlY3Rpb24oc2hhcGVGb3VuZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkU2hhcGUpIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNvY2tldC5lbWl0KFxuICAgICAgICAgICd1cGRhdGVCb2FyZEFjdGlvbicsXG4gICAgICAgICAgeyBhY3Rpb246ICdzaGFwZXMnLCBwYXlsb2FkOiB7IHNoYXBlczogdGhpcy5wYXJhbWV0ZXJzLnNoYXBlcyB9IH0sXG4gICAgICAgICAgdGhpcy5oYW5kbGVTZXJ2ZXJSZXNwb25zZSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgfVxuICB9XG5cbiAgZXJhc2UoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4IS5zYXZlKCk7XG4gICAgY3R4IS5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnZGVzdGluYXRpb24tb3V0JztcbiAgICBjdHghLmJlZ2luUGF0aCgpO1xuICAgIGN0eCEuYXJjKHgsIHksIHRoaXMuZXJhc2VyVGhpY2tuZXNzIC8gMiwgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcbiAgICBjdHghLmZpbGwoKTtcbiAgICBjdHghLnJlc3RvcmUoKTtcblxuICAgIGxldCBjaGFuZ2VPY2N1cnJlZCA9IGZhbHNlO1xuICAgIHRoaXMucGFyYW1ldGVycy5zaGFwZXMgPSB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzXG4gICAgICAubWFwKChzaGFwZTogYW55KSA9PiB7XG4gICAgICAgIGlmIChzaGFwZS50eXBlID09PSAnZnJlZWhhbmQnKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnNoYXBlLFxuICAgICAgICAgICAgcG9pbnRzOiBzaGFwZS5wb2ludHMuZmlsdGVyKChwb2ludDogYW55KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50LnggLSB4LCAyKSArIE1hdGgucG93KHBvaW50LnkgLSB5LCAyKSk7XG4gICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8PSB0aGlzLmVyYXNlclRoaWNrbmVzcyAvIDIpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VPY2N1cnJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBkaXN0YW5jZSA+IHRoaXMuZXJhc2VyVGhpY2tuZXNzIC8gMjtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoc2hhcGUudHlwZSA9PT0gJ2xpbmUnKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5pc1BvaW50TmVhckxpbmUoXG4gICAgICAgICAgICAgIHgsXG4gICAgICAgICAgICAgIHksXG4gICAgICAgICAgICAgIHNoYXBlLngxLFxuICAgICAgICAgICAgICBzaGFwZS55MSxcbiAgICAgICAgICAgICAgc2hhcGUueDIsXG4gICAgICAgICAgICAgIHNoYXBlLnkyLFxuICAgICAgICAgICAgICB0aGlzLmVyYXNlclRoaWNrbmVzcyAvIDIsXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjaGFuZ2VPY2N1cnJlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc2hhcGUudHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgY29uc3QgdGV4dFdpZHRoID0gY3R4IS5tZWFzdXJlVGV4dChzaGFwZS50ZXh0KS53aWR0aDtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB4ID4gc2hhcGUueCAmJlxuICAgICAgICAgICAgeCA8IHNoYXBlLnggKyB0ZXh0V2lkdGggJiZcbiAgICAgICAgICAgIHkgPiBzaGFwZS55IC0gc2hhcGUuZm9udFNpemUgJiZcbiAgICAgICAgICAgIHkgPCBzaGFwZS55XG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjaGFuZ2VPY2N1cnJlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc2hhcGUudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgIGlmICh4ID4gc2hhcGUueDEgJiYgeCA8IHNoYXBlLngyICYmIHkgPiBzaGFwZS55MSAmJiB5IDwgc2hhcGUueTIpIHtcbiAgICAgICAgICAgIGNoYW5nZU9jY3VycmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoeCA+IHNoYXBlLngxICYmIHggPCBzaGFwZS54MiAmJiB5ID4gc2hhcGUueTEgJiYgeSA8IHNoYXBlLnkyKSB7XG4gICAgICAgICAgICBjaGFuZ2VPY2N1cnJlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNoYXBlO1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoKHNoYXBlOiBhbnkpID0+IHNoYXBlICYmIChzaGFwZS50eXBlICE9PSAnZnJlZWhhbmQnIHx8IHNoYXBlLnBvaW50cy5sZW5ndGggPiAwKSk7XG4gICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVNoYXBlcyh0aGlzLnBhcmFtZXRlcnMuc2hhcGVzKTtcblxuICAgIHRoaXMuZHJhd1NoYXBlcygpO1xuICAgIGlmIChjaGFuZ2VPY2N1cnJlZCkge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNvY2tldC5lbWl0KFxuICAgICAgICAndXBkYXRlQm9hcmRBY3Rpb24nLFxuICAgICAgICB7IGFjdGlvbjogJ3NoYXBlcycsIHBheWxvYWQ6IHsgc2hhcGVzOiB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzIH0gfSxcbiAgICAgICAgdGhpcy5oYW5kbGVTZXJ2ZXJSZXNwb25zZSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgaXNQb2ludE5lYXJMaW5lKFxuICAgIHB4OiBudW1iZXIsXG4gICAgcHk6IG51bWJlcixcbiAgICB4MTogbnVtYmVyLFxuICAgIHkxOiBudW1iZXIsXG4gICAgeDI6IG51bWJlcixcbiAgICB5MjogbnVtYmVyLFxuICAgIHRocmVzaG9sZDogbnVtYmVyLFxuICApOiBib29sZWFuIHtcbiAgICBjb25zdCBkeCA9IHgyIC0geDE7XG4gICAgY29uc3QgZHkgPSB5MiAtIHkxO1xuICAgIGNvbnN0IGxlbmd0aCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgY29uc3QgZG90ID0gKChweCAtIHgxKSAqIGR4ICsgKHB5IC0geTEpICogZHkpIC8gKGxlbmd0aCAqIGxlbmd0aCk7XG4gICAgY29uc3QgY2xvc2VzdFggPSB4MSArIGRvdCAqIGR4O1xuICAgIGNvbnN0IGNsb3Nlc3RZID0geTEgKyBkb3QgKiBkeTtcbiAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydChNYXRoLnBvdyhweCAtIGNsb3Nlc3RYLCAyKSArIE1hdGgucG93KHB5IC0gY2xvc2VzdFksIDIpKTtcbiAgICByZXR1cm4gZGlzdGFuY2UgPD0gdGhyZXNob2xkO1xuICB9XG5cbiAgem9vbUNhbnZhcyhcbiAgICBzY2FsZUZhY3RvcjogbnVtYmVyLFxuICAgIGV2ZW50OiBNb3VzZUV2ZW50ID0ge1xuICAgICAgY2xpZW50WDogdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC53aWR0aCAvIDIsXG4gICAgICBjbGllbnRZOiB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmhlaWdodCAvIDIsXG4gICAgfSBhcyBNb3VzZUV2ZW50LFxuICApIHtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGlmIChzY2FsZUZhY3RvciA9PT0gMTApIHtcbiAgICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgICAgdGhpcy5wYW5YID0gMDtcbiAgICAgIHRoaXMucGFuWSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBuZXdTY2FsZSA9IHRoaXMuc2NhbGUgKiBzY2FsZUZhY3RvcjtcbiAgICAgIGlmIChuZXdTY2FsZSA8IHRoaXMubWluU2NhbGUpIHtcbiAgICAgICAgbmV3U2NhbGUgPSB0aGlzLm1pblNjYWxlO1xuICAgICAgfSBlbHNlIGlmIChuZXdTY2FsZSA+IHRoaXMubWF4U2NhbGUpIHtcbiAgICAgICAgbmV3U2NhbGUgPSB0aGlzLm1heFNjYWxlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3Qgb2Zmc2V0WCA9IChldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0KSAvIHJlY3Qud2lkdGg7XG4gICAgICBjb25zdCBvZmZzZXRZID0gKGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcCkgLyByZWN0LmhlaWdodDtcblxuICAgICAgY29uc3QgZHggPSBvZmZzZXRYICogY2FudmFzLndpZHRoICogKDEgLSBzY2FsZUZhY3Rvcik7XG4gICAgICBjb25zdCBkeSA9IG9mZnNldFkgKiBjYW52YXMuaGVpZ2h0ICogKDEgLSBzY2FsZUZhY3Rvcik7XG5cbiAgICAgIHRoaXMuc2NhbGUgPSBuZXdTY2FsZTtcbiAgICAgIHRoaXMucGFuWCA9IHRoaXMucGFuWCAqIHNjYWxlRmFjdG9yICsgZHg7XG4gICAgICB0aGlzLnBhblkgPSB0aGlzLnBhblkgKiBzY2FsZUZhY3RvciArIGR5O1xuXG4gICAgICBjb25zdCBtYXhQYW5YID0gKGNhbnZhcy53aWR0aCAqICh0aGlzLnNjYWxlIC0gMSkpIC8gdGhpcy5zY2FsZTtcbiAgICAgIGNvbnN0IG1heFBhblkgPSAoY2FudmFzLmhlaWdodCAqICh0aGlzLnNjYWxlIC0gMSkpIC8gdGhpcy5zY2FsZTtcbiAgICAgIHRoaXMucGFuWCA9IE1hdGgubWluKE1hdGgubWF4KHRoaXMucGFuWCwgLW1heFBhblgpLCAwKTtcbiAgICAgIHRoaXMucGFuWSA9IE1hdGgubWluKE1hdGgubWF4KHRoaXMucGFuWSwgLW1heFBhblkpLCAwKTtcbiAgICB9XG5cbiAgICBjdHghLnNldFRyYW5zZm9ybSh0aGlzLnNjYWxlLCAwLCAwLCB0aGlzLnNjYWxlLCB0aGlzLnBhblgsIHRoaXMucGFuWSk7XG4gICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gIH1cblxuICBoYW5kbGVab29tKGU6IFdoZWVsRXZlbnQpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKGUuZGVsdGFZIDwgMCkge1xuICAgICAgdGhpcy56b29tQ2FudmFzKDEuMiwgZSBhcyBhbnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnpvb21DYW52YXMoMC44LCBlIGFzIGFueSk7XG4gICAgfVxuICB9XG5cbiAgZHJhd0VkZ2VNYXJrZXJzKCkge1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHghLnNhdmUoKTtcbiAgICBjdHghLnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgICBjdHghLnN0cm9rZVN0eWxlID0gJ3JlZCc7XG4gICAgY3R4IS5saW5lV2lkdGggPSA1O1xuICAgIGN0eCEuc2V0TGluZURhc2goW10pOyAvLyByZXNldCBsaW5lIGRhc2hcblxuICAgIGNvbnN0IG1hcmtlckxlbmd0aCA9IDIwO1xuICAgIGNvbnN0IHRvcExlZnRYID0gdGhpcy5wYW5YO1xuICAgIGNvbnN0IHRvcExlZnRZID0gdGhpcy5wYW5ZO1xuICAgIGNvbnN0IGJvdHRvbVJpZ2h0WCA9IHRoaXMucGFuWCArIDEyODAgKiB0aGlzLnNjYWxlO1xuICAgIGNvbnN0IGJvdHRvbVJpZ2h0WSA9IHRoaXMucGFuWSArIDcyMCAqIHRoaXMuc2NhbGU7XG5cbiAgICBjdHghLmJlZ2luUGF0aCgpO1xuICAgIGN0eCEubW92ZVRvKHRvcExlZnRYLCB0b3BMZWZ0WSArIG1hcmtlckxlbmd0aCk7XG4gICAgY3R4IS5saW5lVG8odG9wTGVmdFgsIHRvcExlZnRZKTtcbiAgICBjdHghLmxpbmVUbyh0b3BMZWZ0WCArIG1hcmtlckxlbmd0aCwgdG9wTGVmdFkpO1xuICAgIGN0eCEuc3Ryb2tlKCk7XG5cbiAgICBjdHghLmJlZ2luUGF0aCgpO1xuICAgIGN0eCEubW92ZVRvKGJvdHRvbVJpZ2h0WCAtIG1hcmtlckxlbmd0aCwgdG9wTGVmdFkpO1xuICAgIGN0eCEubGluZVRvKGJvdHRvbVJpZ2h0WCwgdG9wTGVmdFkpO1xuICAgIGN0eCEubGluZVRvKGJvdHRvbVJpZ2h0WCwgdG9wTGVmdFkgKyBtYXJrZXJMZW5ndGgpO1xuICAgIGN0eCEuc3Ryb2tlKCk7XG5cbiAgICBjdHghLmJlZ2luUGF0aCgpO1xuICAgIGN0eCEubW92ZVRvKGJvdHRvbVJpZ2h0WCwgYm90dG9tUmlnaHRZIC0gbWFya2VyTGVuZ3RoKTtcbiAgICBjdHghLmxpbmVUbyhib3R0b21SaWdodFgsIGJvdHRvbVJpZ2h0WSk7XG4gICAgY3R4IS5saW5lVG8oYm90dG9tUmlnaHRYIC0gbWFya2VyTGVuZ3RoLCBib3R0b21SaWdodFkpO1xuICAgIGN0eCEuc3Ryb2tlKCk7XG5cbiAgICBjdHghLmJlZ2luUGF0aCgpO1xuICAgIGN0eCEubW92ZVRvKHRvcExlZnRYICsgbWFya2VyTGVuZ3RoLCBib3R0b21SaWdodFkpO1xuICAgIGN0eCEubGluZVRvKHRvcExlZnRYLCBib3R0b21SaWdodFkpO1xuICAgIGN0eCEubGluZVRvKHRvcExlZnRYLCBib3R0b21SaWdodFkgLSBtYXJrZXJMZW5ndGgpO1xuICAgIGN0eCEuc3Ryb2tlKCk7XG5cbiAgICBjdHghLnJlc3RvcmUoKTtcbiAgfVxuXG4gIGRyYXdTaGFwZXMoKSB7XG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHghLmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGN0eCEuc2F2ZSgpO1xuICAgIGN0eCEuc2V0VHJhbnNmb3JtKHRoaXMuc2NhbGUsIDAsIDAsIHRoaXMuc2NhbGUsIHRoaXMucGFuWCwgdGhpcy5wYW5ZKTtcbiAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLnVzZUltYWdlQmFja2dyb3VuZCkge1xuICAgICAgY3R4IS5kcmF3SW1hZ2UoXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZEltYWdlLFxuICAgICAgICAtdGhpcy5wYW5YIC8gdGhpcy5zY2FsZSxcbiAgICAgICAgLXRoaXMucGFuWSAvIHRoaXMuc2NhbGUsXG4gICAgICAgIGNhbnZhcy53aWR0aCAvIHRoaXMuc2NhbGUsXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgLyB0aGlzLnNjYWxlLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3R4IS5maWxsU3R5bGUgPSAnI2ZmZic7XG4gICAgICBjdHghLmZpbGxSZWN0KFxuICAgICAgICAtdGhpcy5wYW5YIC8gdGhpcy5zY2FsZSxcbiAgICAgICAgLXRoaXMucGFuWSAvIHRoaXMuc2NhbGUsXG4gICAgICAgIGNhbnZhcy53aWR0aCAvIHRoaXMuc2NhbGUsXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgLyB0aGlzLnNjYWxlLFxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5wYXJhbWV0ZXJzLnNoYXBlcy5mb3JFYWNoKChzaGFwZTogYW55KSA9PiB7XG4gICAgICBpZiAoc2hhcGUudHlwZSA9PT0gJ2xpbmUnKSB7XG4gICAgICAgIHRoaXMuZHJhd0xpbmUoXG4gICAgICAgICAgc2hhcGUueDEsXG4gICAgICAgICAgc2hhcGUueTEsXG4gICAgICAgICAgc2hhcGUueDIsXG4gICAgICAgICAgc2hhcGUueTIsXG4gICAgICAgICAgc2hhcGUuY29sb3IsXG4gICAgICAgICAgc2hhcGUudGhpY2tuZXNzLFxuICAgICAgICAgIHNoYXBlLmxpbmVUeXBlLFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChzaGFwZS50eXBlID09PSAnZnJlZWhhbmQnKSB7XG4gICAgICAgIHRoaXMuZHJhd0ZyZWVoYW5kKHNoYXBlLnBvaW50cywgc2hhcGUuY29sb3IsIHNoYXBlLnRoaWNrbmVzcyk7XG4gICAgICB9IGVsc2UgaWYgKHNoYXBlLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICBjdHghLmZvbnQgPSBgJHtzaGFwZS5mb250U2l6ZX1weCAke3NoYXBlLmZvbnR9YDtcbiAgICAgICAgY3R4IS5maWxsU3R5bGUgPSBzaGFwZS5jb2xvcjtcbiAgICAgICAgY3R4IS5maWxsVGV4dChzaGFwZS50ZXh0LCBzaGFwZS54LCBzaGFwZS55KTtcbiAgICAgIH0gZWxzZSBpZiAoc2hhcGUudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICBjdHghLmRyYXdJbWFnZShzaGFwZS5pbWcsIHNoYXBlLngxLCBzaGFwZS55MSwgc2hhcGUueDIgLSBzaGFwZS54MSwgc2hhcGUueTIgLSBzaGFwZS55MSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRyYXdTaGFwZShcbiAgICAgICAgICBzaGFwZS50eXBlLFxuICAgICAgICAgIHNoYXBlLngxLFxuICAgICAgICAgIHNoYXBlLnkxLFxuICAgICAgICAgIHNoYXBlLngyLFxuICAgICAgICAgIHNoYXBlLnkyLFxuICAgICAgICAgIHNoYXBlLmNvbG9yLFxuICAgICAgICAgIHNoYXBlLnRoaWNrbmVzcyxcbiAgICAgICAgICBzaGFwZS5saW5lVHlwZSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjdHghLnJlc3RvcmUoKTtcbiAgICB0aGlzLmRyYXdFZGdlTWFya2VycygpO1xuICB9XG5cbiAgZHJhd0xpbmUoXG4gICAgeDE6IG51bWJlcixcbiAgICB5MTogbnVtYmVyLFxuICAgIHgyOiBudW1iZXIsXG4gICAgeTI6IG51bWJlcixcbiAgICBjb2xvcjogc3RyaW5nLFxuICAgIHRoaWNrbmVzczogbnVtYmVyLFxuICAgIGxpbmVUeXBlOiBzdHJpbmcsXG4gICkge1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHghLmJlZ2luUGF0aCgpO1xuICAgIGN0eCEuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICBjdHghLmxpbmVXaWR0aCA9IHRoaWNrbmVzcztcbiAgICBpZiAobGluZVR5cGUgPT09ICdkYXNoZWQnKSB7XG4gICAgICBjdHghLnNldExpbmVEYXNoKFsxMCwgMTBdKTtcbiAgICB9IGVsc2UgaWYgKGxpbmVUeXBlID09PSAnZG90dGVkJykge1xuICAgICAgY3R4IS5zZXRMaW5lRGFzaChbMiwgMTBdKTtcbiAgICB9IGVsc2UgaWYgKGxpbmVUeXBlID09PSAnZGFzaERvdCcpIHtcbiAgICAgIGN0eCEuc2V0TGluZURhc2goWzEwLCA1LCAyLCA1XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0eCEuc2V0TGluZURhc2goW10pO1xuICAgIH1cbiAgICBjdHghLm1vdmVUbyh4MSwgeTEpO1xuICAgIGN0eCEubGluZVRvKHgyLCB5Mik7XG4gICAgY3R4IS5zdHJva2UoKTtcbiAgICBjdHghLnNldExpbmVEYXNoKFtdKTtcbiAgfVxuXG4gIGRyYXdUZXh0KHRleHQ6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIGNvbG9yOiBzdHJpbmcsIGZvbnQ6IHN0cmluZykge1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHghLmZvbnQgPSBgMjBweCAke2ZvbnR9YDtcbiAgICBjdHghLmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgIGN0eCEuZmlsbFRleHQodGV4dCwgeCwgeSk7XG4gIH1cblxuICBkcmF3RnJlZWhhbmQocG9pbnRzOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH1bXSwgY29sb3I6IHN0cmluZywgdGhpY2tuZXNzOiBudW1iZXIpIHtcbiAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgaWYgKHBvaW50cy5sZW5ndGggPCAyKSByZXR1cm47XG4gICAgY3R4IS5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgIGN0eCEubGluZVdpZHRoID0gdGhpY2tuZXNzO1xuICAgIGN0eCEuYmVnaW5QYXRoKCk7XG4gICAgY3R4IS5tb3ZlVG8ocG9pbnRzWzBdLngsIHBvaW50c1swXS55KTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgY3R4IS5saW5lVG8ocG9pbnRzW2ldLngsIHBvaW50c1tpXS55KTtcbiAgICB9XG4gICAgY3R4IS5zdHJva2UoKTtcbiAgfVxuXG4gIGRyYXdTaGFwZShcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgeDE6IG51bWJlcixcbiAgICB5MTogbnVtYmVyLFxuICAgIHgyOiBudW1iZXIsXG4gICAgeTI6IG51bWJlcixcbiAgICBjb2xvcjogc3RyaW5nLFxuICAgIHRoaWNrbmVzczogbnVtYmVyLFxuICAgIGxpbmVUeXBlOiBzdHJpbmcsXG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmdldENvbnRleHQoJzJkJykhLFxuICApIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgY3R4LmxpbmVXaWR0aCA9IHRoaWNrbmVzcztcbiAgICBpZiAobGluZVR5cGUgPT09ICdkYXNoZWQnKSB7XG4gICAgICBjdHguc2V0TGluZURhc2goWzEwLCAxMF0pO1xuICAgIH0gZWxzZSBpZiAobGluZVR5cGUgPT09ICdkb3R0ZWQnKSB7XG4gICAgICBjdHguc2V0TGluZURhc2goWzIsIDEwXSk7XG4gICAgfSBlbHNlIGlmIChsaW5lVHlwZSA9PT0gJ2Rhc2hEb3QnKSB7XG4gICAgICBjdHguc2V0TGluZURhc2goWzEwLCA1LCAyLCA1XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0eC5zZXRMaW5lRGFzaChbXSk7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAncmVjdGFuZ2xlJykge1xuICAgICAgY3R4LnN0cm9rZVJlY3QoeDEsIHkxLCB4MiAtIHgxLCB5MiAtIHkxKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdjaXJjbGUnKSB7XG4gICAgICBjb25zdCByYWRpdXMgPSBNYXRoLnNxcnQoTWF0aC5wb3coeDIgLSB4MSwgMikgKyBNYXRoLnBvdyh5MiAtIHkxLCAyKSk7XG4gICAgICBjdHguYXJjKHgxLCB5MSwgcmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAncmhvbWJ1cycpIHtcbiAgICAgIGNvbnN0IGNlbnRlclggPSAoeDEgKyB4MikgLyAyO1xuICAgICAgY29uc3QgY2VudGVyWSA9ICh5MSArIHkyKSAvIDI7XG4gICAgICBjdHgubW92ZVRvKGNlbnRlclgsIHkxKTtcbiAgICAgIGN0eC5saW5lVG8oeDIsIGNlbnRlclkpO1xuICAgICAgY3R4LmxpbmVUbyhjZW50ZXJYLCB5Mik7XG4gICAgICBjdHgubGluZVRvKHgxLCBjZW50ZXJZKTtcbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdwZW50YWdvbicpIHtcbiAgICAgIHRoaXMuZHJhd1BvbHlnb24oY3R4LCA1LCB4MSwgeTEsIHgyLCB5Mik7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnaGV4YWdvbicpIHtcbiAgICAgIHRoaXMuZHJhd1BvbHlnb24oY3R4LCA2LCB4MSwgeTEsIHgyLCB5Mik7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAndHJpYW5nbGUnKSB7XG4gICAgICBjb25zdCBjZW50ZXJYID0gKHgxICsgeDIpIC8gMjtcbiAgICAgIGN0eC5tb3ZlVG8oY2VudGVyWCwgeTEpO1xuICAgICAgY3R4LmxpbmVUbyh4MiwgeTIpO1xuICAgICAgY3R4LmxpbmVUbyh4MSwgeTIpO1xuICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3NxdWFyZScpIHtcbiAgICAgIGN0eC5zdHJva2VSZWN0KHgxLCB5MSwgeDIgLSB4MSwgeDIgLSB4MSk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2N0YWdvbicpIHtcbiAgICAgIHRoaXMuZHJhd1BvbHlnb24oY3R4LCA4LCB4MSwgeTEsIHgyLCB5Mik7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb3ZhbCcpIHtcbiAgICAgIGNvbnN0IHJhZGl1c1ggPSBNYXRoLmFicyh4MiAtIHgxKSAvIDI7XG4gICAgICBjb25zdCByYWRpdXNZID0gTWF0aC5hYnMoeTIgLSB5MSkgLyAyO1xuICAgICAgY29uc3QgY2VudGVyWCA9ICh4MSArIHgyKSAvIDI7XG4gICAgICBjb25zdCBjZW50ZXJZID0gKHkxICsgeTIpIC8gMjtcbiAgICAgIGN0eC5lbGxpcHNlKGNlbnRlclgsIGNlbnRlclksIHJhZGl1c1gsIHJhZGl1c1ksIDAsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdwYXJhbGxlbG9ncmFtJykge1xuICAgICAgY29uc3QgY2VudGVyWCA9ICh4MSArIHgyKSAvIDI7XG4gICAgICBjdHgubW92ZVRvKGNlbnRlclgsIHkxKTtcbiAgICAgIGN0eC5saW5lVG8oeDIsIHkyKTtcbiAgICAgIGN0eC5saW5lVG8oY2VudGVyWCwgeTIpO1xuICAgICAgY3R4LmxpbmVUbyh4MSwgeTEpO1xuICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLnNoYXBlLmltZywgeDEsIHkxLCB4MiAtIHgxLCB5MiAtIHkxKTtcbiAgICB9XG4gIH1cblxuICBkcmF3UG9seWdvbihcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcbiAgICBzaWRlczogbnVtYmVyLFxuICAgIHgxOiBudW1iZXIsXG4gICAgeTE6IG51bWJlcixcbiAgICB4MjogbnVtYmVyLFxuICAgIHkyOiBudW1iZXIsXG4gICkge1xuICAgIGNvbnN0IGNlbnRlclggPSAoeDEgKyB4MikgLyAyO1xuICAgIGNvbnN0IGNlbnRlclkgPSAoeTEgKyB5MikgLyAyO1xuICAgIGNvbnN0IHJhZGl1cyA9IE1hdGgubWluKE1hdGguYWJzKHgyIC0geDEpLCBNYXRoLmFicyh5MiAtIHkxKSkgLyAyO1xuICAgIGNvbnN0IGFuZ2xlID0gKDIgKiBNYXRoLlBJKSAvIHNpZGVzO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpZGVzOyBpKyspIHtcbiAgICAgIGNvbnN0IHggPSBjZW50ZXJYICsgcmFkaXVzICogTWF0aC5jb3MoaSAqIGFuZ2xlIC0gTWF0aC5QSSAvIDIpO1xuICAgICAgY29uc3QgeSA9IGNlbnRlclkgKyByYWRpdXMgKiBNYXRoLnNpbihpICogYW5nbGUgLSBNYXRoLlBJIC8gMik7XG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICBjdHgubW92ZVRvKHgsIHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3R4LmxpbmVUbyh4LCB5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgfVxuXG4gIHVuZG8oKSB7XG4gICAgaWYgKHRoaXMucGFyYW1ldGVycy5zaGFwZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnJlZG9TdGFjay5wdXNoKHRoaXMucGFyYW1ldGVycy5zaGFwZXMucG9wKCkhKTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVSZWRvU3RhY2sodGhpcy5wYXJhbWV0ZXJzLnJlZG9TdGFjayk7XG4gICAgICB0aGlzLmRyYXdTaGFwZXMoKTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zb2NrZXQuZW1pdChcbiAgICAgICAgJ3VwZGF0ZUJvYXJkQWN0aW9uJyxcbiAgICAgICAgeyBhY3Rpb246ICd1bmRvJyB9LFxuICAgICAgICB0aGlzLmhhbmRsZVNlcnZlclJlc3BvbnNlLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZWRvKCkge1xuICAgIGlmICh0aGlzLnBhcmFtZXRlcnMucmVkb1N0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFwZXMucHVzaCh0aGlzLnBhcmFtZXRlcnMucmVkb1N0YWNrLnBvcCgpISk7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlU2hhcGVzKHRoaXMucGFyYW1ldGVycy5zaGFwZXMpO1xuICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMuc29ja2V0LmVtaXQoXG4gICAgICAgICd1cGRhdGVCb2FyZEFjdGlvbicsXG4gICAgICAgIHsgYWN0aW9uOiAncmVkbycgfSxcbiAgICAgICAgdGhpcy5oYW5kbGVTZXJ2ZXJSZXNwb25zZSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgc2F2ZVN0YXRlKCkge1xuICAgIHRoaXMucGFyYW1ldGVycy51bmRvU3RhY2sucHVzaChKU09OLnN0cmluZ2lmeSh0aGlzLnBhcmFtZXRlcnMuc2hhcGVzKSk7XG4gICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVVuZG9TdGFjayh0aGlzLnBhcmFtZXRlcnMudW5kb1N0YWNrKTtcbiAgfVxuXG4gIGZpbmRTaGFwZSh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzLmZpbmQoKHNoYXBlOiBhbnkpID0+IHtcbiAgICAgIGlmIChzaGFwZS50eXBlID09PSAnZnJlZWhhbmQnKSB7XG4gICAgICAgIHJldHVybiBzaGFwZS5wb2ludHMuc29tZSgocG9pbnQ6IGFueSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50LnggLSB4LCAyKSArIE1hdGgucG93KHBvaW50LnkgLSB5LCAyKSk7XG4gICAgICAgICAgcmV0dXJuIGRpc3RhbmNlIDwgc2hhcGUudGhpY2tuZXNzO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoc2hhcGUudHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgY3R4IS5mb250ID0gYCR7c2hhcGUuZm9udFNpemV9cHggJHtzaGFwZS5mb250fWA7XG4gICAgICAgIGNvbnN0IHRleHRNZXRyaWNzID0gY3R4IS5tZWFzdXJlVGV4dChzaGFwZS50ZXh0KTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICB4ID4gc2hhcGUueCAmJlxuICAgICAgICAgIHggPCBzaGFwZS54ICsgdGV4dE1ldHJpY3Mud2lkdGggJiZcbiAgICAgICAgICB5ID4gc2hhcGUueSAtIHNoYXBlLmZvbnRTaXplICYmXG4gICAgICAgICAgeSA8IHNoYXBlLnlcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoc2hhcGUudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICByZXR1cm4geCA+IHNoYXBlLngxICYmIHggPCBzaGFwZS54MiAmJiB5ID4gc2hhcGUueTEgJiYgeSA8IHNoYXBlLnkyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHggPiBzaGFwZS54MSAmJiB4IDwgc2hhcGUueDIgJiYgeSA+IHNoYXBlLnkxICYmIHkgPCBzaGFwZS55MjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGRyYXdTZWxlY3Rpb24oc2hhcGU6IGFueSkge1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBpZiAoIXNoYXBlKSByZXR1cm47XG5cbiAgICBjb25zdCBoYW5kbGVzID0gdGhpcy5nZXRSZXNpemVIYW5kbGVzKHNoYXBlKTtcbiAgICBjdHghLnN0cm9rZVN0eWxlID0gJ3JlZCc7XG4gICAgY3R4IS5saW5lV2lkdGggPSAyO1xuICAgIGN0eCEuc2V0TGluZURhc2goWzYsIDNdKTtcbiAgICBpZiAoc2hhcGUudHlwZSA9PT0gJ2xpbmUnKSB7XG4gICAgICBjdHghLmJlZ2luUGF0aCgpO1xuICAgICAgY3R4IS5tb3ZlVG8oc2hhcGUueDEsIHNoYXBlLnkxKTtcbiAgICAgIGN0eCEubGluZVRvKHNoYXBlLngyLCBzaGFwZS55Mik7XG4gICAgICBjdHghLnN0cm9rZSgpO1xuICAgIH0gZWxzZSBpZiAoc2hhcGUudHlwZSA9PT0gJ2NpcmNsZScpIHtcbiAgICAgIGNvbnN0IHJhZGl1cyA9IE1hdGguc3FydChNYXRoLnBvdyhzaGFwZS54MiAtIHNoYXBlLngxLCAyKSArIE1hdGgucG93KHNoYXBlLnkyIC0gc2hhcGUueTEsIDIpKTtcbiAgICAgIGN0eCEuYmVnaW5QYXRoKCk7XG4gICAgICBjdHghLmFyYyhzaGFwZS54MSwgc2hhcGUueTEsIHJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgY3R4IS5zdHJva2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3R4IS5zdHJva2VSZWN0KHNoYXBlLngxLCBzaGFwZS55MSwgc2hhcGUueDIgLSBzaGFwZS54MSwgc2hhcGUueTIgLSBzaGFwZS55MSk7XG4gICAgfVxuXG4gICAgY3R4IS5zZXRMaW5lRGFzaChbXSk7XG5cbiAgICBoYW5kbGVzLmZvckVhY2goKGhhbmRsZSkgPT4ge1xuICAgICAgY3R4IS5maWxsU3R5bGUgPSBoYW5kbGUuaXNDZW50ZXIgPyAnYmx1ZScgOiAncmVkJztcbiAgICAgIGN0eCEuZmlsbFJlY3QoaGFuZGxlLnggLSA2LCBoYW5kbGUueSAtIDYsIDEyLCAxMik7XG4gICAgfSk7XG4gIH1cblxuICBnZXRSZXNpemVIYW5kbGVzKHNoYXBlOiBhbnkpIHtcbiAgICBjb25zdCBoYW5kbGVzID0gW107XG4gICAgaWYgKHNoYXBlLnR5cGUgPT09ICdsaW5lJykge1xuICAgICAgaGFuZGxlcy5wdXNoKHsgeDogc2hhcGUueDEsIHk6IHNoYXBlLnkxIH0pO1xuICAgICAgaGFuZGxlcy5wdXNoKHsgeDogc2hhcGUueDIsIHk6IHNoYXBlLnkyIH0pO1xuICAgIH0gZWxzZSBpZiAoc2hhcGUudHlwZSA9PT0gJ2NpcmNsZScpIHtcbiAgICAgIGNvbnN0IHJhZGl1cyA9IE1hdGguc3FydChNYXRoLnBvdyhzaGFwZS54MiAtIHNoYXBlLngxLCAyKSArIE1hdGgucG93KHNoYXBlLnkyIC0gc2hhcGUueTEsIDIpKTtcbiAgICAgIGhhbmRsZXMucHVzaCh7IHg6IHNoYXBlLngxICsgcmFkaXVzLCB5OiBzaGFwZS55MSB9KTtcbiAgICAgIGhhbmRsZXMucHVzaCh7IHg6IHNoYXBlLngxIC0gcmFkaXVzLCB5OiBzaGFwZS55MSB9KTtcbiAgICAgIGhhbmRsZXMucHVzaCh7IHg6IHNoYXBlLngxLCB5OiBzaGFwZS55MSArIHJhZGl1cyB9KTtcbiAgICAgIGhhbmRsZXMucHVzaCh7IHg6IHNoYXBlLngxLCB5OiBzaGFwZS55MSAtIHJhZGl1cyB9KTtcbiAgICAgIGhhbmRsZXMucHVzaCh7IHg6IHNoYXBlLngxLCB5OiBzaGFwZS55MSwgaXNDZW50ZXI6IHRydWUgfSk7XG4gICAgfSBlbHNlIGlmIChzaGFwZS50eXBlID09PSAndGV4dCcpIHtcbiAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIGNvbnN0IHRleHRNZXRyaWNzID0gY3R4IS5tZWFzdXJlVGV4dChzaGFwZS50ZXh0KTtcbiAgICAgIGhhbmRsZXMucHVzaCh7IHg6IHNoYXBlLngsIHk6IHNoYXBlLnkgLSBzaGFwZS5mb250U2l6ZSwgaXNDZW50ZXI6IHRydWUgfSk7XG4gICAgICBoYW5kbGVzLnB1c2goeyB4OiBzaGFwZS54ICsgdGV4dE1ldHJpY3Mud2lkdGgsIHk6IHNoYXBlLnksIGlzQ2VudGVyOiBmYWxzZSB9KTtcbiAgICB9IGVsc2UgaWYgKHNoYXBlLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgIGhhbmRsZXMucHVzaCh7IHg6IHNoYXBlLngxLCB5OiBzaGFwZS55MSB9KTtcbiAgICAgIGhhbmRsZXMucHVzaCh7IHg6IHNoYXBlLngyLCB5OiBzaGFwZS55MSB9KTtcbiAgICAgIGhhbmRsZXMucHVzaCh7IHg6IHNoYXBlLngyLCB5OiBzaGFwZS55MiB9KTtcbiAgICAgIGhhbmRsZXMucHVzaCh7IHg6IHNoYXBlLngxLCB5OiBzaGFwZS55MiB9KTtcbiAgICAgIGhhbmRsZXMucHVzaCh7IHg6IChzaGFwZS54MSArIHNoYXBlLngyKSAvIDIsIHk6IChzaGFwZS55MSArIHNoYXBlLnkyKSAvIDIsIGlzQ2VudGVyOiB0cnVlIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBoYW5kbGVzLnB1c2goeyB4OiBzaGFwZS54MSwgeTogc2hhcGUueTEgfSk7XG4gICAgICBoYW5kbGVzLnB1c2goeyB4OiBzaGFwZS54MiwgeTogc2hhcGUueTEgfSk7XG4gICAgICBoYW5kbGVzLnB1c2goeyB4OiBzaGFwZS54MiwgeTogc2hhcGUueTIgfSk7XG4gICAgICBoYW5kbGVzLnB1c2goeyB4OiBzaGFwZS54MSwgeTogc2hhcGUueTIgfSk7XG4gICAgICBoYW5kbGVzLnB1c2goeyB4OiAoc2hhcGUueDEgKyBzaGFwZS54MikgLyAyLCB5OiAoc2hhcGUueTEgKyBzaGFwZS55MikgLyAyLCBpc0NlbnRlcjogdHJ1ZSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGhhbmRsZXMubWFwKChoYW5kbGUpID0+ICh7XG4gICAgICAuLi5oYW5kbGUsXG4gICAgICBpc0NlbnRlcjogaGFuZGxlLmlzQ2VudGVyIHx8IGZhbHNlLFxuICAgIH0pKTtcbiAgfVxuXG4gIGdldEhhbmRsZUF0UG9zaXRpb24oeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRTaGFwZSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UmVzaXplSGFuZGxlcyh0aGlzLnNlbGVjdGVkU2hhcGUpLmZpbmQoKGhhbmRsZSkgPT4ge1xuICAgICAgcmV0dXJuIE1hdGguYWJzKGhhbmRsZS54IC0geCkgPCA2ICYmIE1hdGguYWJzKGhhbmRsZS55IC0geSkgPCA2O1xuICAgIH0pO1xuICB9XG5cbiAgcmVzaXplU2hhcGUoc2hhcGU6IGFueSwgaGFuZGxlOiBhbnksIHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgaWYgKHNoYXBlLnR5cGUgPT09ICdsaW5lJykge1xuICAgICAgaWYgKGhhbmRsZS54ID09PSBzaGFwZS54MSAmJiBoYW5kbGUueSA9PT0gc2hhcGUueTEpIHtcbiAgICAgICAgc2hhcGUueDEgPSB4O1xuICAgICAgICBzaGFwZS55MSA9IHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaGFwZS54MiA9IHg7XG4gICAgICAgIHNoYXBlLnkyID0geTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNoYXBlLnR5cGUgPT09ICdjaXJjbGUnKSB7XG4gICAgICBjb25zdCBkeCA9IHggLSBzaGFwZS54MTtcbiAgICAgIGNvbnN0IGR5ID0geSAtIHNoYXBlLnkxO1xuICAgICAgY29uc3QgcmFkaXVzID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgIHNoYXBlLngyID0gc2hhcGUueDEgKyByYWRpdXM7XG4gICAgICBzaGFwZS55MiA9IHNoYXBlLnkxO1xuICAgIH0gZWxzZSBpZiAoc2hhcGUudHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICBpZiAoaGFuZGxlLmlzQ2VudGVyKSB7XG4gICAgICAgIHNoYXBlLnggPSB4O1xuICAgICAgICBzaGFwZS55ID0geTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHRleHRNZXRyaWNzID0gdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC5nZXRDb250ZXh0KCcyZCcpIS5tZWFzdXJlVGV4dChzaGFwZS50ZXh0KTtcbiAgICAgICAgc2hhcGUueCA9IHggLSB0ZXh0TWV0cmljcy53aWR0aDtcbiAgICAgICAgc2hhcGUueSA9IHk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzaGFwZS50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICBpZiAoaGFuZGxlLmlzQ2VudGVyKSB7XG4gICAgICAgIGNvbnN0IGR4ID0geCAtIChzaGFwZS54MSArIHNoYXBlLngyKSAvIDI7XG4gICAgICAgIGNvbnN0IGR5ID0geSAtIChzaGFwZS55MSArIHNoYXBlLnkyKSAvIDI7XG4gICAgICAgIHRoaXMubW92ZVNoYXBlKHNoYXBlLCBkeCwgZHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGhhbmRsZS54ID09PSBzaGFwZS54MSAmJiBoYW5kbGUueSA9PT0gc2hhcGUueTEpIHtcbiAgICAgICAgICBzaGFwZS54MSA9IHg7XG4gICAgICAgICAgc2hhcGUueTEgPSB5O1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZS54ID09PSBzaGFwZS54MiAmJiBoYW5kbGUueSA9PT0gc2hhcGUueTEpIHtcbiAgICAgICAgICBzaGFwZS54MiA9IHg7XG4gICAgICAgICAgc2hhcGUueTEgPSB5O1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZS54ID09PSBzaGFwZS54MiAmJiBoYW5kbGUueSA9PT0gc2hhcGUueTIpIHtcbiAgICAgICAgICBzaGFwZS54MiA9IHg7XG4gICAgICAgICAgc2hhcGUueTIgPSB5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNoYXBlLngxID0geDtcbiAgICAgICAgICBzaGFwZS55MiA9IHk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGhhbmRsZS5pc0NlbnRlcikge1xuICAgICAgICBjb25zdCBkeCA9IHggLSAoc2hhcGUueDEgKyBzaGFwZS54MikgLyAyO1xuICAgICAgICBjb25zdCBkeSA9IHkgLSAoc2hhcGUueTEgKyBzaGFwZS55MikgLyAyO1xuICAgICAgICB0aGlzLm1vdmVTaGFwZShzaGFwZSwgZHgsIGR5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChoYW5kbGUueCA9PT0gc2hhcGUueDEgJiYgaGFuZGxlLnkgPT09IHNoYXBlLnkxKSB7XG4gICAgICAgICAgc2hhcGUueDEgPSB4O1xuICAgICAgICAgIHNoYXBlLnkxID0geTtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGUueCA9PT0gc2hhcGUueDIgJiYgaGFuZGxlLnkgPT09IHNoYXBlLnkxKSB7XG4gICAgICAgICAgc2hhcGUueDIgPSB4O1xuICAgICAgICAgIHNoYXBlLnkxID0geTtcbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGUueCA9PT0gc2hhcGUueDIgJiYgaGFuZGxlLnkgPT09IHNoYXBlLnkyKSB7XG4gICAgICAgICAgc2hhcGUueDIgPSB4O1xuICAgICAgICAgIHNoYXBlLnkyID0geTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzaGFwZS54MSA9IHg7XG4gICAgICAgICAgc2hhcGUueTIgPSB5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZHJhd1NoYXBlcygpO1xuICB9XG5cbiAgbW92ZVNoYXBlKHNoYXBlOiBhbnksIGR4OiBudW1iZXIsIGR5OiBudW1iZXIpIHtcbiAgICBpZiAoc2hhcGUudHlwZSA9PT0gJ2xpbmUnIHx8IHNoYXBlLnR5cGUgPT09ICdjaXJjbGUnKSB7XG4gICAgICBzaGFwZS54MSArPSBkeDtcbiAgICAgIHNoYXBlLnkxICs9IGR5O1xuICAgICAgc2hhcGUueDIgKz0gZHg7XG4gICAgICBzaGFwZS55MiArPSBkeTtcbiAgICB9IGVsc2UgaWYgKHNoYXBlLnR5cGUgPT09ICdmcmVlaGFuZCcpIHtcbiAgICAgIHNoYXBlLnBvaW50cy5mb3JFYWNoKChwb2ludDogYW55KSA9PiB7XG4gICAgICAgIHBvaW50LnggKz0gZHg7XG4gICAgICAgIHBvaW50LnkgKz0gZHk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHNoYXBlLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgc2hhcGUueCArPSBkeDtcbiAgICAgIHNoYXBlLnkgKz0gZHk7XG4gICAgfSBlbHNlIGlmIChzaGFwZS50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICBzaGFwZS54MSArPSBkeDtcbiAgICAgIHNoYXBlLnkxICs9IGR5O1xuICAgICAgc2hhcGUueDIgKz0gZHg7XG4gICAgICBzaGFwZS55MiArPSBkeTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2hhcGUueDEgKz0gZHg7XG4gICAgICBzaGFwZS55MSArPSBkeTtcbiAgICAgIHNoYXBlLngyICs9IGR4O1xuICAgICAgc2hhcGUueTIgKz0gZHk7XG4gICAgfVxuICB9XG5cbiAgZG93bmxvYWRDYW52YXModGVtcENhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICBjb25zdCBsaW5rID0gdGhpcy5kb3dubG9hZExpbmtSZWYubmF0aXZlRWxlbWVudDtcbiAgICBsaW5rLmhyZWYgPSB0ZW1wQ2FudmFzLnRvRGF0YVVSTCgpO1xuICAgIGxpbmsuZG93bmxvYWQgPSAnd2hpdGVib2FyZC5wbmcnO1xuICAgIGxpbmsuY2xpY2soKTtcbiAgfVxuXG4gIHNhdmVDYW52YXMoKSB7XG4gICAgY29uc3QgdGVtcENhbnZhcyA9IHRoaXMudGVtcENhbnZhc1JlZi5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IHRlbXBDdHggPSB0ZW1wQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGVtcENhbnZhcy53aWR0aCA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQud2lkdGg7XG4gICAgdGVtcENhbnZhcy5oZWlnaHQgPSB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmhlaWdodDtcbiAgICBjb25zdCBub3RTaGFwZXMgPSBbJ2ZyZWVoYW5kJywgJ3RleHQnLCAnaW1hZ2UnLCAnbGluZSddO1xuXG4gICAgaWYgKHRoaXMucGFyYW1ldGVycy51c2VJbWFnZUJhY2tncm91bmQpIHtcbiAgICAgIGNvbnN0IGJhY2tncm91bmRJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgYmFja2dyb3VuZEltYWdlLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICB0ZW1wQ3R4IS5kcmF3SW1hZ2UoYmFja2dyb3VuZEltYWdlLCAwLCAwLCB0ZW1wQ2FudmFzLndpZHRoLCB0ZW1wQ2FudmFzLmhlaWdodCk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFwZXMuZm9yRWFjaCgoc2hhcGU6IGFueSkgPT4ge1xuICAgICAgICAgICFub3RTaGFwZXMuaW5jbHVkZXMoc2hhcGUudHlwZSlcbiAgICAgICAgICAgID8gdGhpcy5kcmF3U2hhcGUoXG4gICAgICAgICAgICAgICAgc2hhcGUudHlwZSxcbiAgICAgICAgICAgICAgICBzaGFwZS54MSxcbiAgICAgICAgICAgICAgICBzaGFwZS55MSxcbiAgICAgICAgICAgICAgICBzaGFwZS54MixcbiAgICAgICAgICAgICAgICBzaGFwZS55MixcbiAgICAgICAgICAgICAgICBzaGFwZS5jb2xvcixcbiAgICAgICAgICAgICAgICBzaGFwZS50aGlja25lc3MsXG4gICAgICAgICAgICAgICAgc2hhcGUubGluZVR5cGUsXG4gICAgICAgICAgICAgICAgdGVtcEN0eCEsXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogdGhpcy5kcmF3U2hhcGVPbkNhbnZhcyhzaGFwZSwgdGVtcEN0eCEpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kb3dubG9hZENhbnZhcyh0ZW1wQ2FudmFzKTtcbiAgICAgIH07XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2Uuc3JjID0gJ2h0dHBzOi8vbWVkaWFzZnUuY29tL2ltYWdlcy9zdmcvZ3JhcGhfcGFwZXIuanBnJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGVtcEN0eCEuZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICAgIHRlbXBDdHghLmZpbGxSZWN0KDAsIDAsIHRlbXBDYW52YXMud2lkdGgsIHRlbXBDYW52YXMuaGVpZ2h0KTtcblxuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNoYXBlcy5mb3JFYWNoKChzaGFwZTogYW55KSA9PiB7XG4gICAgICAgICFub3RTaGFwZXMuaW5jbHVkZXMoc2hhcGUudHlwZSlcbiAgICAgICAgICA/IHRoaXMuZHJhd1NoYXBlKFxuICAgICAgICAgICAgICBzaGFwZS50eXBlLFxuICAgICAgICAgICAgICBzaGFwZS54MSxcbiAgICAgICAgICAgICAgc2hhcGUueTEsXG4gICAgICAgICAgICAgIHNoYXBlLngyLFxuICAgICAgICAgICAgICBzaGFwZS55MixcbiAgICAgICAgICAgICAgc2hhcGUuY29sb3IsXG4gICAgICAgICAgICAgIHNoYXBlLnRoaWNrbmVzcyxcbiAgICAgICAgICAgICAgc2hhcGUubGluZVR5cGUsXG4gICAgICAgICAgICAgIHRlbXBDdHghLFxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogdGhpcy5kcmF3U2hhcGVPbkNhbnZhcyhzaGFwZSwgdGVtcEN0eCEpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmRvd25sb2FkQ2FudmFzKHRlbXBDYW52YXMpO1xuICAgIH1cbiAgfVxuXG4gIGRyYXdTaGFwZU9uQ2FudmFzKFxuICAgIHNoYXBlOiBhbnksXG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LmdldENvbnRleHQoJzJkJykhLFxuICApIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gc2hhcGUuY29sb3I7XG4gICAgY3R4LmxpbmVXaWR0aCA9IHNoYXBlLnRoaWNrbmVzcyB8fCAyO1xuICAgIGN0eC5maWxsU3R5bGUgPSBzaGFwZS5jb2xvcjtcbiAgICBjdHguZm9udCA9IGAke3NoYXBlLmZvbnRTaXplfXB4ICR7c2hhcGUuZm9udEZhbWlseX1gO1xuXG4gICAgY29uc3QgbGluZVR5cGUgPSBzaGFwZS5saW5lVHlwZSA/IHNoYXBlLmxpbmVUeXBlIDogJ3NvbGlkJztcblxuICAgIGlmIChsaW5lVHlwZSA9PT0gJ2Rhc2hlZCcpIHtcbiAgICAgIGN0eC5zZXRMaW5lRGFzaChbMTAsIDEwXSk7XG4gICAgfSBlbHNlIGlmIChsaW5lVHlwZSA9PT0gJ2RvdHRlZCcpIHtcbiAgICAgIGN0eC5zZXRMaW5lRGFzaChbMiwgMTBdKTtcbiAgICB9IGVsc2UgaWYgKGxpbmVUeXBlID09PSAnZGFzaERvdCcpIHtcbiAgICAgIGN0eC5zZXRMaW5lRGFzaChbMTAsIDUsIDIsIDVdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3R4LnNldExpbmVEYXNoKFtdKTtcbiAgICB9XG4gICAgc3dpdGNoIChzaGFwZS50eXBlKSB7XG4gICAgICBjYXNlICdsaW5lJzpcbiAgICAgICAgY3R4Lm1vdmVUbyhzaGFwZS54MSwgc2hhcGUueTEpO1xuICAgICAgICBjdHgubGluZVRvKHNoYXBlLngyLCBzaGFwZS55Mik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZnJlZWhhbmQnOlxuICAgICAgICB0cnkge1xuICAgICAgICAgIGN0eC5tb3ZlVG8oc2hhcGUucG9pbnRzWzBdLngsIHNoYXBlLnBvaW50c1swXS55KTtcbiAgICAgICAgICBzaGFwZS5wb2ludHMuZm9yRWFjaCgocG9pbnQ6IGFueSkgPT4gY3R4LmxpbmVUbyhwb2ludC54LCBwb2ludC55KSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIC8vY29uc29sZS5sb2coJ0Vycm9yIGRyYXdpbmcgZnJlZWhhbmQgc2hhcGUnKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICBjdHguZmlsbFRleHQoc2hhcGUudGV4dCwgc2hhcGUueCwgc2hhcGUueSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgICBjdHguZHJhd0ltYWdlKHNoYXBlLmltZywgc2hhcGUueDEsIHNoYXBlLnkxLCBzaGFwZS54MiAtIHNoYXBlLngxLCBzaGFwZS55MiAtIHNoYXBlLnkxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgY3R4LnN0cm9rZSgpO1xuICB9XG5cbiAgZGVsZXRlU2hhcGUoZG9FbWl0cyA9IHRydWUpIHtcbiAgICBpZiAoIXRoaXMuY2hlY2tCb2FyZEFjY2VzcygpKSByZXR1cm47XG5cbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRTaGFwZSkgcmV0dXJuO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkU2hhcGUpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFwZXMgPSB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzLmZpbHRlcihcbiAgICAgICAgKHNoYXBlOiBhbnkpID0+IHNoYXBlICE9PSB0aGlzLnNlbGVjdGVkU2hhcGUsXG4gICAgICApO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVNoYXBlcyh0aGlzLnBhcmFtZXRlcnMuc2hhcGVzKTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRTaGFwZSA9IG51bGw7XG4gICAgICBpZiAoZG9FbWl0cykge1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc29ja2V0LmVtaXQoXG4gICAgICAgICAgJ3VwZGF0ZUJvYXJkQWN0aW9uJyxcbiAgICAgICAgICB7IGFjdGlvbjogJ3NoYXBlcycsIHBheWxvYWQ6IHsgc2hhcGVzOiB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzIH0gfSxcbiAgICAgICAgICB0aGlzLmhhbmRsZVNlcnZlclJlc3BvbnNlLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlQmFja2dyb3VuZCA9IChkb0VtaXRzID0gdHJ1ZSkgPT4ge1xuICAgIGlmIChkb0VtaXRzICYmICF0aGlzLmNoZWNrQm9hcmRBY2Nlc3MoKSkgcmV0dXJuO1xuICAgIHRoaXMucGFyYW1ldGVycy51c2VJbWFnZUJhY2tncm91bmQgPSAhdGhpcy5wYXJhbWV0ZXJzLnVzZUltYWdlQmFja2dyb3VuZDtcbiAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlVXNlSW1hZ2VCYWNrZ3JvdW5kKHRoaXMucGFyYW1ldGVycy51c2VJbWFnZUJhY2tncm91bmQpO1xuICAgIGNvbnN0IHRvZ2dsZUJ1dHRvbiA9IHRoaXMudG9nZ2xlQmFja2dyb3VuZFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGlmICh0aGlzLnBhcmFtZXRlcnMudXNlSW1hZ2VCYWNrZ3JvdW5kKSB7XG4gICAgICB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJ2h0dHBzOi8vbWVkaWFzZnUuY29tL2ltYWdlcy9zdmcvZ3JhcGhfcGFwZXIuanBnJylgO1xuICAgICAgdG9nZ2xlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICdub25lJztcbiAgICAgIHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgICAgIHRvZ2dsZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG4gICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgaWYgKGRvRW1pdHMpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zb2NrZXQuZW1pdChcbiAgICAgICAgJ3VwZGF0ZUJvYXJkQWN0aW9uJyxcbiAgICAgICAgeyBhY3Rpb246ICd0b2dnbGVCYWNrZ3JvdW5kJywgcGF5bG9hZDogdGhpcy5wYXJhbWV0ZXJzLnVzZUltYWdlQmFja2dyb3VuZCB9LFxuICAgICAgICB0aGlzLmhhbmRsZVNlcnZlclJlc3BvbnNlLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgY2xlYXJDYW52YXMgPSAoZG9FbWl0cyA9IHRydWUpID0+IHtcbiAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLmlzbGV2ZWwgIT0gJzInICYmIGRvRW1pdHMpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdZb3UgZG8gbm90IGhhdmUgcGVybWlzc2lvbiB0byBjbGVhciB0aGUgYm9hcmQnLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLnNoYXBlcy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzID0gW107XG4gICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVNoYXBlcyhbXSk7XG4gICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgaWYgKGRvRW1pdHMpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zb2NrZXQuZW1pdChcbiAgICAgICAgJ3VwZGF0ZUJvYXJkQWN0aW9uJyxcbiAgICAgICAgeyBhY3Rpb246ICdjbGVhcicgfSxcbiAgICAgICAgdGhpcy5oYW5kbGVTZXJ2ZXJSZXNwb25zZSxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIHVwbG9hZEltYWdlID0gKGV2ZW50OiBhbnksIGRvRW1pdHMgPSB0cnVlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghdGhpcy5jaGVja0JvYXJkQWNjZXNzKCkpIHJldHVybjtcbiAgICAgIGNvbnN0IGZpbGUgPSBldmVudC50YXJnZXQuZmlsZXNbMF07XG4gICAgICBpZiAoZmlsZS5zaXplID4gMTAyNCAqIDEwMjQpIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHsgbWVzc2FnZTogJ0ZpbGUgc2l6ZSBtdXN0IGJlIGxlc3MgdGhhbiAxTUInLCB0eXBlOiAnZGFuZ2VyJyB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgcmVhZGVyLm9ubG9hZCA9IChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWcuY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJztcbiAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICBpZiAoaW1nLmhlaWdodCA+IDYwMCAmJiBpbWcuaGVpZ2h0ID4gaW1nLndpZHRoICYmICFmaWxlLnR5cGUuaW5jbHVkZXMoJ2pwZWcnKSkge1xuICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ0ZvciBiZXR0ZXIgcGVyZm9ybWFuY2UsIHBsZWFzZSB1cGxvYWQgdGhlIGltYWdlIGluIEpQRyBmb3JtYXQuJyxcbiAgICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgaW1hZ2VXaWR0aCA9IDM1MDtcbiAgICAgICAgICBjb25zdCBhc3BlY3RSYXRpbyA9IGltZy5oZWlnaHQgLyBpbWcud2lkdGg7XG4gICAgICAgICAgbGV0IGltYWdlSGVpZ2h0ID0gaW1hZ2VXaWR0aCAqIGFzcGVjdFJhdGlvO1xuICAgICAgICAgIGNvbnN0IG1heEhlaWdodCA9IDYwMDtcbiAgICAgICAgICBpZiAoaW1hZ2VIZWlnaHQgPiBtYXhIZWlnaHQpIHtcbiAgICAgICAgICAgIGltYWdlSGVpZ2h0ID0gbWF4SGVpZ2h0O1xuICAgICAgICAgICAgaW1hZ2VXaWR0aCA9IGltYWdlSGVpZ2h0IC8gYXNwZWN0UmF0aW87XG4gICAgICAgICAgICBpZiAoaW1hZ2VXaWR0aCA+IDYwMCkge1xuICAgICAgICAgICAgICBpbWFnZVdpZHRoID0gNjAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBpbWFnZVNoYXBlID0ge1xuICAgICAgICAgICAgdHlwZTogJ2ltYWdlJyxcbiAgICAgICAgICAgIGltZzogaW1nLFxuICAgICAgICAgICAgc3JjOiBldmVudC50YXJnZXQucmVzdWx0LFxuICAgICAgICAgICAgeDE6IDUwLFxuICAgICAgICAgICAgeTE6IDUwLFxuICAgICAgICAgICAgeDI6IDUwICsgaW1hZ2VXaWR0aCxcbiAgICAgICAgICAgIHkyOiA1MCArIGltYWdlSGVpZ2h0LFxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNoYXBlcy5wdXNoKGltYWdlU2hhcGUpO1xuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVTaGFwZXModGhpcy5wYXJhbWV0ZXJzLnNoYXBlcyk7XG4gICAgICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgICAgICAgaWYgKGRvRW1pdHMpIHtcbiAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5zb2NrZXQuZW1pdChcbiAgICAgICAgICAgICAgJ3VwZGF0ZUJvYXJkQWN0aW9uJyxcbiAgICAgICAgICAgICAgeyBhY3Rpb246ICd1cGxvYWRJbWFnZScsIHBheWxvYWQ6IGltYWdlU2hhcGUgfSxcbiAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTZXJ2ZXJSZXNwb25zZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpbWcub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0Py4oeyBtZXNzYWdlOiAnRXJyb3IgbG9hZGluZyBpbWFnZScsIHR5cGU6ICdkYW5nZXInIH0pO1xuICAgICAgICB9O1xuICAgICAgICBpbWcuc3JjID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgIH07XG4gICAgICByZWFkZXIub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHsgbWVzc2FnZTogJ0Vycm9yIHJlYWRpbmcgZmlsZScsIHR5cGU6ICdkYW5nZXInIH0pO1xuICAgICAgfTtcbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlU2VydmVyUmVzcG9uc2UgPSAocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgIGlmICghcmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogYFdoaXRlYm9hcmQgYWN0aW9uIGZhaWxlZDogJHtyZXNwb25zZS5yZWFzb259YCxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgV2hpdGVib2FyZEFjdGlvbiA9IChkYXRhOiBhbnkpID0+IHtcbiAgICBjb25zdCB7IGFjdGlvbiwgcGF5bG9hZCB9ID0gZGF0YTtcblxuICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBpZiAoIWN0eCkgcmV0dXJuO1xuICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVDYW52YXNXaGl0ZWJvYXJkKHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgIGNhc2UgJ2RyYXcnOlxuICAgICAgICBpZiAocGF5bG9hZC50eXBlID09PSAnZnJlZWhhbmQnKSB7XG4gICAgICAgICAgdGhpcy5kcmF3RnJlZWhhbmQocGF5bG9hZC5wb2ludHMsIHBheWxvYWQuY29sb3IsIHBheWxvYWQudGhpY2tuZXNzKTtcbiAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogJ2ZyZWVoYW5kJyxcbiAgICAgICAgICAgIHBvaW50czogcGF5bG9hZC5wb2ludHMsXG4gICAgICAgICAgICBjb2xvcjogcGF5bG9hZC5jb2xvcixcbiAgICAgICAgICAgIHRoaWNrbmVzczogcGF5bG9hZC50aGlja25lc3MsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVNoYXBlcyh0aGlzLnBhcmFtZXRlcnMuc2hhcGVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmRyYXdMaW5lKFxuICAgICAgICAgICAgcGF5bG9hZC54MSxcbiAgICAgICAgICAgIHBheWxvYWQueTEsXG4gICAgICAgICAgICBwYXlsb2FkLngyLFxuICAgICAgICAgICAgcGF5bG9hZC55MixcbiAgICAgICAgICAgIHBheWxvYWQuY29sb3IsXG4gICAgICAgICAgICBwYXlsb2FkLnRoaWNrbmVzcyxcbiAgICAgICAgICAgIHBheWxvYWQubGluZVR5cGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgeDE6IHBheWxvYWQueDEsXG4gICAgICAgICAgICB5MTogcGF5bG9hZC55MSxcbiAgICAgICAgICAgIHgyOiBwYXlsb2FkLngyLFxuICAgICAgICAgICAgeTI6IHBheWxvYWQueTIsXG4gICAgICAgICAgICBjb2xvcjogcGF5bG9hZC5jb2xvcixcbiAgICAgICAgICAgIHRoaWNrbmVzczogcGF5bG9hZC50aGlja25lc3MsXG4gICAgICAgICAgICBsaW5lVHlwZTogcGF5bG9hZC5saW5lVHlwZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlU2hhcGVzKHRoaXMucGFyYW1ldGVycy5zaGFwZXMpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2hhcGUnOlxuICAgICAgICB0aGlzLmRyYXdTaGFwZShcbiAgICAgICAgICBwYXlsb2FkLnR5cGUsXG4gICAgICAgICAgcGF5bG9hZC54MSxcbiAgICAgICAgICBwYXlsb2FkLnkxLFxuICAgICAgICAgIHBheWxvYWQueDIsXG4gICAgICAgICAgcGF5bG9hZC55MixcbiAgICAgICAgICBwYXlsb2FkLmNvbG9yLFxuICAgICAgICAgIHBheWxvYWQudGhpY2tuZXNzLFxuICAgICAgICAgIHBheWxvYWQubGluZVR5cGUsXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFwZXMucHVzaCh7XG4gICAgICAgICAgdHlwZTogcGF5bG9hZC50eXBlLFxuICAgICAgICAgIHgxOiBwYXlsb2FkLngxLFxuICAgICAgICAgIHkxOiBwYXlsb2FkLnkxLFxuICAgICAgICAgIHgyOiBwYXlsb2FkLngyLFxuICAgICAgICAgIHkyOiBwYXlsb2FkLnkyLFxuICAgICAgICAgIGNvbG9yOiBwYXlsb2FkLmNvbG9yLFxuICAgICAgICAgIHRoaWNrbmVzczogcGF5bG9hZC50aGlja25lc3MsXG4gICAgICAgICAgbGluZVR5cGU6IHBheWxvYWQubGluZVR5cGUsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlU2hhcGVzKHRoaXMucGFyYW1ldGVycy5zaGFwZXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2VyYXNlJzpcbiAgICAgICAgdGhpcy5lcmFzZShwYXlsb2FkLngsIHBheWxvYWQueSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2xlYXInOlxuICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKGZhbHNlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd1cGxvYWRJbWFnZSc6IHtcbiAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltZy5jcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xuICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGltYWdlU2hhcGUgPSB7XG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UnLFxuICAgICAgICAgICAgaW1nLFxuICAgICAgICAgICAgc3JjOiBwYXlsb2FkLnNyYyxcbiAgICAgICAgICAgIHgxOiBwYXlsb2FkLngxLFxuICAgICAgICAgICAgeTE6IHBheWxvYWQueTEsXG4gICAgICAgICAgICB4MjogcGF5bG9hZC54MixcbiAgICAgICAgICAgIHkyOiBwYXlsb2FkLnkyLFxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNoYXBlcy5wdXNoKGltYWdlU2hhcGUpO1xuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVTaGFwZXModGhpcy5wYXJhbWV0ZXJzLnNoYXBlcyk7XG4gICAgICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgICAgIH07XG4gICAgICAgIGltZy5zcmMgPSBwYXlsb2FkLnNyYztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICd0b2dnbGVCYWNrZ3JvdW5kJzpcbiAgICAgICAgdGhpcy50b2dnbGVCYWNrZ3JvdW5kKGZhbHNlKTtcbiAgICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndW5kbyc6XG4gICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuc2hhcGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMucmVkb1N0YWNrLnB1c2godGhpcy5wYXJhbWV0ZXJzLnNoYXBlcy5wb3AoKSEpO1xuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVSZWRvU3RhY2sodGhpcy5wYXJhbWV0ZXJzLnJlZG9TdGFjayk7XG4gICAgICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZWRvJzpcbiAgICAgICAgaWYgKHRoaXMucGFyYW1ldGVycy5yZWRvU3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFwZXMucHVzaCh0aGlzLnBhcmFtZXRlcnMucmVkb1N0YWNrLnBvcCgpISk7XG4gICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVNoYXBlcyh0aGlzLnBhcmFtZXRlcnMuc2hhcGVzKTtcbiAgICAgICAgICB0aGlzLmRyYXdTaGFwZXMoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzLnB1c2goe1xuICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICB0ZXh0OiBwYXlsb2FkLnRleHQsXG4gICAgICAgICAgeDogcGF5bG9hZC54LFxuICAgICAgICAgIHk6IHBheWxvYWQueSxcbiAgICAgICAgICBjb2xvcjogcGF5bG9hZC5jb2xvcixcbiAgICAgICAgICBmb250OiBwYXlsb2FkLmZvbnQsXG4gICAgICAgICAgZm9udFNpemU6IHBheWxvYWQuZm9udFNpemUsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlU2hhcGVzKHRoaXMucGFyYW1ldGVycy5zaGFwZXMpO1xuICAgICAgICB0aGlzLmRyYXdTaGFwZXMoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkZWxldGVTaGFwZSc6XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFwZXMgPSB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzLmZpbHRlcigoc2hhcGU6IGFueSkgPT4gc2hhcGUgIT09IHBheWxvYWQpO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlU2hhcGVzKHRoaXMucGFyYW1ldGVycy5zaGFwZXMpO1xuICAgICAgICB0aGlzLmRyYXdTaGFwZXMoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzaGFwZXMnOiB7XG4gICAgICAgIGNvbnN0IG9sZFNoYXBlcyA9IHRoaXMucGFyYW1ldGVycy5zaGFwZXMuZmlsdGVyKChzaGFwZTogYW55KSA9PiBzaGFwZS50eXBlID09PSAnaW1hZ2UnKTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNoYXBlcyA9IHBheWxvYWQuc2hhcGVzLm1hcCgoc2hhcGU6IGFueSkgPT4ge1xuICAgICAgICAgIGlmIChzaGFwZS50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICBjb25zdCBvbGRTaGFwZSA9IG9sZFNoYXBlcy5maW5kKChvbGRTaGFwZTogYW55KSA9PiBvbGRTaGFwZS5zcmMgPT09IHNoYXBlLnNyYyk7XG4gICAgICAgICAgICBpZiAob2xkU2hhcGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgLi4uc2hhcGUsIGltZzogb2xkU2hhcGUuaW1nIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgaW1nLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG4gICAgICAgICAgICAgIGltZy5zcmMgPSBzaGFwZS5zcmM7XG4gICAgICAgICAgICAgIHJldHVybiB7IC4uLnNoYXBlLCBpbWcgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNoYXBlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVTaGFwZXModGhpcy5wYXJhbWV0ZXJzLnNoYXBlcyk7XG4gICAgICAgIHRoaXMuZHJhd1NoYXBlcygpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcblxuICBXaGl0ZWJvYXJkVXBkYXRlZCA9IChkYXRhOiBhbnkpID0+IHtcbiAgICAvLyBkYXRhID0geyB3aGl0ZWJvYXJkVXNlcnMsIHN0YXR1c31cbiAgICAvLyBzdGF0dXMgPSAnc3RhcnRlZCcsICdlbmRlZCcsICd1cGRhdGVkJ1xuICAgIC8vIHdoaXRlYm9hcmRVc2VycyBhcnJheVxuICAgIC8vIG1lbWJlcnMgKHBhcnRpY2lwYW50cykgYXJyYXkgb25seSBzZW50IHRvIHRoZSBob3N0XG4gICAgLy93aGl0ZWJvYXJkRGF0YSA9IHtzaGFwZXM9W10sIHVzZUltYWdlQmFja2dyb3VuZD1Cb29sZWFuLCByZWRvU3RhY2s9W10sIHVuZG9TdGFjaz1bXX0gb3Ige30gb3IgbnVsbFxuICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBpZiAoIWN0eCkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMucGFyYW1ldGVycy5pc2xldmVsID09ICcyJyAmJiBkYXRhLm1lbWJlcnMpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5wYXJ0aWNpcGFudHNBbGwgPSBkYXRhLm1lbWJlcnMubWFwKChwYXJ0aWNpcGFudDogYW55KSA9PiAoe1xuICAgICAgICBpc0Jhbm5lZDogcGFydGljaXBhbnQuaXNCYW5uZWQsXG4gICAgICAgIG5hbWU6IHBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICB9KSk7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMucGFydGljaXBhbnRzID0gZGF0YS5tZW1iZXJzLmZpbHRlcihcbiAgICAgICAgKHBhcnRpY2lwYW50OiBhbnkpID0+IHBhcnRpY2lwYW50LmlzQmFubmVkID09IGZhbHNlLFxuICAgICAgKTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVQYXJ0aWNpcGFudHModGhpcy5wYXJhbWV0ZXJzLnBhcnRpY2lwYW50cyk7XG4gICAgfVxuXG4gICAgdGhpcy5wYXJhbWV0ZXJzLndoaXRlYm9hcmRVc2VycyA9IGRhdGEud2hpdGVib2FyZFVzZXJzO1xuICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVXaGl0ZWJvYXJkVXNlcnModGhpcy5wYXJhbWV0ZXJzLndoaXRlYm9hcmRVc2Vycyk7XG5cbiAgICBjb25zdCB1c2VCb2FyZCA9IHRoaXMucGFyYW1ldGVycy53aGl0ZWJvYXJkVXNlcnMuZmluZChcbiAgICAgICh1c2VyOiBhbnkpID0+IHVzZXIubmFtZSA9PSB0aGlzLnBhcmFtZXRlcnMubWVtYmVyICYmIHVzZXIudXNlQm9hcmQsXG4gICAgKVxuICAgICAgPyB0cnVlXG4gICAgICA6IGZhbHNlO1xuICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuaXNsZXZlbCAhPSAnMicgJiYgIXVzZUJvYXJkICYmICF0aGlzLnBhcmFtZXRlcnMud2hpdGVib2FyZEVuZGVkKSB7XG4gICAgICB0aGlzLmNoYW5nZU1vZGUoJ3BhbicpO1xuICAgIH1cblxuICAgIGlmIChkYXRhLndoaXRlYm9hcmREYXRhICYmIE9iamVjdC5rZXlzKGRhdGEud2hpdGVib2FyZERhdGEpLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChkYXRhLndoaXRlYm9hcmREYXRhLnNoYXBlcykge1xuICAgICAgICBjb25zdCBvbGRTaGFwZXMgPSB0aGlzLnBhcmFtZXRlcnMuc2hhcGVzLmZpbHRlcigoc2hhcGU6IGFueSkgPT4gc2hhcGUudHlwZSA9PT0gJ2ltYWdlJyk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFwZXMgPSBkYXRhLndoaXRlYm9hcmREYXRhLnNoYXBlcy5tYXAoKHNoYXBlOiBhbnkpID0+IHtcbiAgICAgICAgICBpZiAoc2hhcGUudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgY29uc3Qgb2xkU2hhcGUgPSBvbGRTaGFwZXMuZmluZCgob2xkU2hhcGU6IGFueSkgPT4gb2xkU2hhcGUuc3JjID09PSBzaGFwZS5zcmMpO1xuICAgICAgICAgICAgaWYgKG9sZFNoYXBlKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IC4uLnNoYXBlLCBpbWc6IG9sZFNoYXBlLmltZyB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgIGltZy5jcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xuICAgICAgICAgICAgICBpbWcuc3JjID0gc2hhcGUuc3JjO1xuICAgICAgICAgICAgICByZXR1cm4geyAuLi5zaGFwZSwgaW1nIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzaGFwZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlU2hhcGVzKHRoaXMucGFyYW1ldGVycy5zaGFwZXMpO1xuICAgICAgfVxuICAgICAgaWYgKGRhdGEud2hpdGVib2FyZERhdGEudXNlSW1hZ2VCYWNrZ3JvdW5kICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVzZUltYWdlQmFja2dyb3VuZCA9IGRhdGEud2hpdGVib2FyZERhdGEudXNlSW1hZ2VCYWNrZ3JvdW5kO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlVXNlSW1hZ2VCYWNrZ3JvdW5kKHRoaXMucGFyYW1ldGVycy51c2VJbWFnZUJhY2tncm91bmQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVzZUltYWdlQmFja2dyb3VuZCA9IHRydWU7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVVc2VJbWFnZUJhY2tncm91bmQodHJ1ZSk7XG4gICAgICB9XG4gICAgICBpZiAoZGF0YS53aGl0ZWJvYXJkRGF0YS5yZWRvU3RhY2spIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnJlZG9TdGFjayA9IGRhdGEud2hpdGVib2FyZERhdGEucmVkb1N0YWNrO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlUmVkb1N0YWNrKHRoaXMucGFyYW1ldGVycy5yZWRvU3RhY2spO1xuICAgICAgfVxuICAgICAgaWYgKGRhdGEud2hpdGVib2FyZERhdGEudW5kb1N0YWNrKSB7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy51bmRvU3RhY2sgPSBkYXRhLndoaXRlYm9hcmREYXRhLnVuZG9TdGFjaztcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVVuZG9TdGFjayh0aGlzLnBhcmFtZXRlcnMudW5kb1N0YWNrKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGF0YS5zdGF0dXMgPT0gJ3N0YXJ0ZWQnICYmICF0aGlzLnBhcmFtZXRlcnMud2hpdGVib2FyZFN0YXJ0ZWQpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy53aGl0ZWJvYXJkU3RhcnRlZCA9IHRydWU7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMud2hpdGVib2FyZEVuZGVkID0gZmFsc2U7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMuc2NyZWVuSWQgPSBgd2hpdGVib2FyZC0ke3RoaXMucGFyYW1ldGVycy5yb29tTmFtZX1gO1xuXG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlV2hpdGVib2FyZFN0YXJ0ZWQodHJ1ZSk7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlV2hpdGVib2FyZEVuZGVkKGZhbHNlKTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVTY3JlZW5JZCh0aGlzLnBhcmFtZXRlcnMuc2NyZWVuSWQpO1xuXG4gICAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLmlzbGV2ZWwgIT0gJzInKSB7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFyZVNjcmVlblN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkKHRydWUpO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMub25TY3JlZW5DaGFuZ2VzKHsgY2hhbmdlZDogdHJ1ZSwgcGFyYW1ldGVyczogdGhpcy5wYXJhbWV0ZXJzIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGF0YS5zdGF0dXMgPT0gJ2VuZGVkJykge1xuICAgICAgY29uc3QgcHJldldoaXRlYm9hcmRFbmRlZCA9IHRoaXMucGFyYW1ldGVycy53aGl0ZWJvYXJkRW5kZWQ7XG4gICAgICBjb25zdCBwcmV2V2hpdGVib2FyZFN0YXJ0ZWQgPSB0aGlzLnBhcmFtZXRlcnMud2hpdGVib2FyZFN0YXJ0ZWQ7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMud2hpdGVib2FyZEVuZGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy53aGl0ZWJvYXJkU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVdoaXRlYm9hcmRTdGFydGVkKGZhbHNlKTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVXaGl0ZWJvYXJkRW5kZWQodHJ1ZSk7XG4gICAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLmlzbGV2ZWwgPT0gJzInICYmIHByZXZXaGl0ZWJvYXJkRW5kZWQpIHtcbiAgICAgICAgLy8gTm8gb3BlcmF0aW9uIG5lZWRlZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNoYXJlU2NyZWVuU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2NyZWVuSWQgPSAnJztcblxuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkKGZhbHNlKTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVNjcmVlbklkKCcnKTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLm9uU2NyZWVuQ2hhbmdlcyh7IGNoYW5nZWQ6IHRydWUsIHBhcmFtZXRlcnM6IHRoaXMucGFyYW1ldGVycyB9KTtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHByZXZXaGl0ZWJvYXJkU3RhcnRlZCAmJlxuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5pc2xldmVsID09ICcyJyAmJlxuICAgICAgICAgICh0aGlzLnBhcmFtZXRlcnMucmVjb3JkU3RhcnRlZCB8fCB0aGlzLnBhcmFtZXRlcnMucmVjb3JkUmVzdW1lZClcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKCEodGhpcy5wYXJhbWV0ZXJzLnJlY29yZFBhdXNlZCB8fCB0aGlzLnBhcmFtZXRlcnMucmVjb3JkU3RvcHBlZCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMucmVjb3JkaW5nTWVkaWFPcHRpb25zID09ICd2aWRlbycpIHtcbiAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmNhcHR1cmVDYW52YXNTdHJlYW0oeyBwYXJhbWV0ZXJzOiB0aGlzLnBhcmFtZXRlcnMsIHN0YXJ0OiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIC8vIEhhbmRsZSBlcnJvclxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGF0YS5zdGF0dXMgPT0gJ3N0YXJ0ZWQnICYmIHRoaXMucGFyYW1ldGVycy53aGl0ZWJvYXJkU3RhcnRlZCkge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLndoaXRlYm9hcmRTdGFydGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy53aGl0ZWJvYXJkRW5kZWQgPSBmYWxzZTtcblxuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVdoaXRlYm9hcmRTdGFydGVkKHRydWUpO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVdoaXRlYm9hcmRFbmRlZChmYWxzZSk7XG5cbiAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFyZVNjcmVlblN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNjcmVlbklkID0gYHdoaXRlYm9hcmQtJHt0aGlzLnBhcmFtZXRlcnMucm9vbU5hbWV9YDtcblxuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZCh0cnVlKTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVTY3JlZW5JZCh0aGlzLnBhcmFtZXRlcnMuc2NyZWVuSWQpO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLm9uU2NyZWVuQ2hhbmdlcyh7IGNoYW5nZWQ6IHRydWUsIHBhcmFtZXRlcnM6IHRoaXMucGFyYW1ldGVycyB9KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlRHJvcGRvd25DbGljayhpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5kcm9wZG93bk9wZW4gPSB0aGlzLmRyb3Bkb3duT3BlbiA9PT0gaWQgPyBudWxsIDogaWQ7XG4gIH1cblxuICBoYW5kbGVJdGVtQ2xpY2soY2FsbGJhY2s6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgY2FsbGJhY2sodmFsdWUpO1xuICAgIHRoaXMuZHJvcGRvd25PcGVuID0gbnVsbDtcbiAgICBpZiAoWydkcmF3JywgJ2ZyZWVoYW5kJywgJ3NoYXBlJywgJ3RleHQnLCAnZXJhc2UnXS5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgdGhpcy5jaGFuZ2VNb2RlKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGRyb3Bkb3duSXRlbXMoaXRlbXM6IGFueVtdLCBuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBhbnkpIHtcbiAgICByZXR1cm4gaXRlbXMubWFwKFxuICAgICAgKGl0ZW0sIGluZGV4KSA9PlxuICAgICAgICBgPGJ1dHRvbiBrZXk9XCIke2luZGV4fVwiIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJoYW5kbGVJdGVtQ2xpY2soJHtjYWxsYmFja30sICcke25hbWV9JywgJHtpdGVtLnZhbHVlfSlcIiBzdHlsZT1cInBhZGRpbmc6IDVweDtcIj5cbiAgICAgICAgJHtpdGVtLmxhYmVsfVxuICAgICAgPC9idXR0b24+YCxcbiAgICApO1xuICB9XG5cbiAgdG9nZ2xlVG9vbGJhcigpIHtcbiAgICB0aGlzLnRvb2xiYXJWaXNpYmxlID0gIXRoaXMudG9vbGJhclZpc2libGU7XG4gIH1cblxuICBjaGVja0JvYXJkQWNjZXNzKCkge1xuICAgIHRoaXMucGFyYW1ldGVycyA9IHRoaXMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG4gICAgaWYgKHRoaXMucGFyYW1ldGVycy53aGl0ZWJvYXJkU3RhcnRlZCAmJiAhdGhpcy5wYXJhbWV0ZXJzLndoaXRlYm9hcmRFbmRlZCkge1xuICAgICAgY29uc3QgdXNlciA9IHRoaXMucGFyYW1ldGVycy53aGl0ZWJvYXJkVXNlcnMuZmluZChcbiAgICAgICAgKHVzZXI6IGFueSkgPT4gdXNlci5uYW1lID09PSB0aGlzLnBhcmFtZXRlcnMubWVtYmVyLFxuICAgICAgKTtcbiAgICAgIGlmICgoIXVzZXIgfHwgIXVzZXIudXNlQm9hcmQpICYmIHRoaXMucGFyYW1ldGVycy5pc2xldmVsICE9ICcyJykge1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdZb3UgYXJlIG5vdCBhbGxvd2VkIHRvIHVzZSB0aGUgd2hpdGVib2FyZC4gUGxlYXNlIGFzayB0aGUgaG9zdCB0byBhc3NpZ24geW91LicsXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgY2hhbmdlTW9kZShuZXdNb2RlOiBzdHJpbmcpIHtcbiAgICBpZiAobmV3TW9kZSAhPT0gJ3BhbicgJiYgIXRoaXMuY2hlY2tCb2FyZEFjY2VzcygpKSByZXR1cm47XG4gICAgdGhpcy5tb2RlID0gbmV3TW9kZTtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50O1xuICAgIGlmIChuZXdNb2RlID09PSAncGFuJykge1xuICAgICAgY2FudmFzLnN0eWxlLmN1cnNvciA9ICdncmFiJztcbiAgICB9IGVsc2UgaWYgKG5ld01vZGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICBjYW52YXMuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgIH0gZWxzZSBpZiAobmV3TW9kZSA9PT0gJ2VyYXNlJykge1xuICAgICAgY2FudmFzLnN0eWxlLmN1cnNvciA9ICdjcm9zc2hhaXInO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYW52YXMuc3R5bGUuY3Vyc29yID0gJ2Nyb3NzaGFpcic7XG4gICAgfVxuICAgIGlmIChuZXdNb2RlICE9PSAnZnJlZWhhbmQnICYmIHRoaXMuZnJlZWhhbmREcmF3aW5nLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zaGFwZXMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdmcmVlaGFuZCcsXG4gICAgICAgIHBvaW50czogdGhpcy5mcmVlaGFuZERyYXdpbmcsXG4gICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yLFxuICAgICAgICB0aGlja25lc3M6IHRoaXMuYnJ1c2hUaGlja25lc3MsXG4gICAgICB9KTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVTaGFwZXModGhpcy5wYXJhbWV0ZXJzLnNoYXBlcyk7XG4gICAgICB0aGlzLmZyZWVoYW5kRHJhd2luZyA9IFtdO1xuICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXYgaWQ9XCJ3aGl0ZWJvYXJkLWludGVyZmFjZVwiIFtzdHlsZS53aWR0aC5weF09XCJjdXN0b21XaWR0aFwiIFtzdHlsZS5oZWlnaHQucHhdPVwiY3VzdG9tSGVpZ2h0XCIgW3N0eWxlLmRpc3BsYXldPVwic2hvd0FzcGVjdCA/ICdibG9jaycgOiAnbm9uZSdcIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTsgZGlzcGxheTogZmxleDsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGJvcmRlcjogMnB4IHNvbGlkICMwMDA7IGJhY2tncm91bmQtY29sb3I6ICNmMGYwZjA7XCI+XHJcbiAgPGRpdiBpZD1cIndoaXRlYm9hcmRDb250ZW50XCIgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7IGRpc3BsYXk6IGZsZXg7IGp1c3RpZnktY29udGVudDogY2VudGVyOyBhbGlnbi1pdGVtczogY2VudGVyOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyBtYXgtd2lkdGg6IDEwMCU7IG1heC1oZWlnaHQ6IDEwMCU7IG92ZXJmbG93OiBhdXRvO1wiPlxyXG4gICAgPGJ1dHRvbiBpZD1cInRvb2xiYXJUb2dnbGVcIiBjbGFzcz1cImJ0biBidG5Cb2FyZCBidG4tcHJpbWFyeVwiIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyB0b3A6IDVweDsgbGVmdDogNTVweDsgei1pbmRleDogMTA7XCIgKGNsaWNrKT1cInRvZ2dsZVRvb2xiYXIoKVwiPlxyXG4gICAgICA8ZmEtaWNvbiBbaWNvbl09XCJ0b29sYmFyVmlzaWJsZSA/IGZhQ2hldnJvbkxlZnQgOiBmYUNoZXZyb25SaWdodFwiPjwvZmEtaWNvbj5cclxuICAgIDwvYnV0dG9uPlxyXG4gICAgPGRpdiAqbmdJZj1cInRvb2xiYXJWaXNpYmxlXCIgY2xhc3M9XCJ0b29sYmFyIG1iLTNcIiBpZD1cInRvb2xiYXJcIiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiA1cHg7IGxlZnQ6IDEwMHB4OyB6LWluZGV4OiAxMDsgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bkJvYXJkIGJ0bi1zZWNvbmRhcnkgZHJvcGRvd24tdG9nZ2xlXCIgaWQ9XCJkcmF3TW9kZVwiIChjbGljayk9XCJoYW5kbGVEcm9wZG93bkNsaWNrKCdkcmF3TW9kZScpXCI+XHJcbiAgICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVBlbmNpbEFsdFwiPjwvZmEtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwiZHJvcGRvd25PcGVuID09PSAnZHJhd01vZGUnXCIgY2xhc3M9XCJkcm9wZG93bi1tZW51IHNob3dcIj5cclxuICAgICAgICAgIDxidXR0b24gKm5nRm9yPVwibGV0IGl0ZW0gb2YgW3sgbGFiZWw6ICdYWC1TbWFsbCAoM3B4KScsIHZhbHVlOiAzIH0sIHsgbGFiZWw6ICdYLVNtYWxsICg2cHgpJywgdmFsdWU6IDYgfSwgeyBsYWJlbDogJ1NtYWxsICgxMnB4KScsIHZhbHVlOiAxMiB9LCB7IGxhYmVsOiAnTWVkaXVtICgxOHB4KScsIHZhbHVlOiAxOCB9LCB7IGxhYmVsOiAnTGFyZ2UgKDI0cHgpJywgdmFsdWU6IDI0IH0sIHsgbGFiZWw6ICdYLUxhcmdlICgzNnB4KScsIHZhbHVlOiAzNiB9XVwiIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJoYW5kbGVJdGVtQ2xpY2sodXBkYXRlTGluZVRoaWNrbmVzcywgJ2RyYXcnLCBpdGVtLnZhbHVlKVwiIHN0eWxlPVwicGFkZGluZzogNXB4O1wiPlxyXG4gICAgICAgICAgICB7eyBpdGVtLmxhYmVsIH19XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bkJvYXJkIGJ0bi1zZWNvbmRhcnkgZHJvcGRvd24tdG9nZ2xlXCIgaWQ9XCJmcmVlaGFuZE1vZGVcIiAoY2xpY2spPVwiaGFuZGxlRHJvcGRvd25DbGljaygnZnJlZWhhbmRNb2RlJylcIj5cclxuICAgICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhUGFpbnRCcnVzaFwiPjwvZmEtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwiZHJvcGRvd25PcGVuID09PSAnZnJlZWhhbmRNb2RlJ1wiIGNsYXNzPVwiZHJvcGRvd24tbWVudSBzaG93XCI+XHJcbiAgICAgICAgICA8YnV0dG9uICpuZ0Zvcj1cImxldCBpdGVtIG9mIFt7IGxhYmVsOiAnWC1TbWFsbCAoNXB4KScsIHZhbHVlOiA1IH0sIHsgbGFiZWw6ICdTbWFsbCAoMTBweCknLCB2YWx1ZTogMTAgfSwgeyBsYWJlbDogJ01lZGl1bSAoMjBweCknLCB2YWx1ZTogMjAgfSwgeyBsYWJlbDogJ0xhcmdlICg0MHB4KScsIHZhbHVlOiA0MCB9LCB7IGxhYmVsOiAnWC1MYXJnZSAoNjBweCknLCB2YWx1ZTogNjAgfV1cIiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwiaGFuZGxlSXRlbUNsaWNrKHVwZGF0ZUJydXNoVGhpY2tuZXNzLCAnZnJlZWhhbmQnLCBpdGVtLnZhbHVlKVwiIHN0eWxlPVwicGFkZGluZzogNXB4O1wiPlxyXG4gICAgICAgICAgICB7eyBpdGVtLmxhYmVsIH19XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bkJvYXJkIGJ0bi1zZWNvbmRhcnkgZHJvcGRvd24tdG9nZ2xlXCIgaWQ9XCJzaGFwZU1vZGVcIiAoY2xpY2spPVwiaGFuZGxlRHJvcGRvd25DbGljaygnc2hhcGVNb2RlJylcIj5cclxuICAgICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhU2hhcGVzXCI+PC9mYS1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxkaXYgKm5nSWY9XCJkcm9wZG93bk9wZW4gPT09ICdzaGFwZU1vZGUnXCIgY2xhc3M9XCJkcm9wZG93bi1tZW51IHNob3dcIj5cclxuICAgICAgICAgIDxidXR0b24gKm5nRm9yPVwibGV0IGl0ZW0gb2YgW1xyXG4gICAgICAgICAgICB7IGxhYmVsOiAnPGltZyBzcmM9XFwnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9zcXVhcmUuc3ZnXFwnIGFsdD1cXCdTcXVhcmVcXCcgY2xhc3M9XFwnc2hhcGUtaWNvblxcJyAvPicsIHZhbHVlOiAnc3F1YXJlJyB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiAnPGltZyBzcmM9XFwnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9yZWN0YW5nbGUuc3ZnXFwnIGFsdD1cXCdSZWN0YW5nbGVcXCcgY2xhc3M9XFwnc2hhcGUtaWNvblxcJyAvPicsIHZhbHVlOiAncmVjdGFuZ2xlJyB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiAnPGltZyBzcmM9XFwnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9jaXJjbGUuc3ZnXFwnIGFsdD1cXCdDaXJjbGVcXCcgY2xhc3M9XFwnc2hhcGUtaWNvblxcJyAvPicsIHZhbHVlOiAnY2lyY2xlJyB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiAnPGltZyBzcmM9XFwnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy90cmlhbmdsZS5zdmdcXCcgYWx0PVxcJ1RyaWFuZ2xlXFwnIGNsYXNzPVxcJ3NoYXBlLWljb25cXCcgLz4nLCB2YWx1ZTogJ3RyaWFuZ2xlJyB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiAnPGltZyBzcmM9XFwnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9oZXhhZ29uLnN2Z1xcJyBhbHQ9XFwnSGV4YWdvblxcJyBjbGFzcz1cXCdzaGFwZS1pY29uXFwnIC8+JywgdmFsdWU6ICdoZXhhZ29uJyB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiAnPGltZyBzcmM9XFwnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9wZW50YWdvbi5zdmdcXCcgYWx0PVxcJ1BlbnRhZ29uXFwnIGNsYXNzPVxcJ3NoYXBlLWljb25cXCcgLz4nLCB2YWx1ZTogJ3BlbnRhZ29uJyB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiAnPGltZyBzcmM9XFwnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9yaG9tYnVzLnN2Z1xcJyBhbHQ9XFwnUmhvbWJ1c1xcJyBjbGFzcz1cXCdzaGFwZS1pY29uXFwnIC8+JywgdmFsdWU6ICdyaG9tYnVzJyB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiAnPGltZyBzcmM9XFwnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9vY3RhZ29uLnN2Z1xcJyBhbHQ9XFwnT2N0YWdvblxcJyBjbGFzcz1cXCdzaGFwZS1pY29uXFwnIC8+JywgdmFsdWU6ICdvY3RhZ29uJyB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiAnPGltZyBzcmM9XFwnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9wYXJhbGxlbG9ncmFtLnN2Z1xcJyBhbHQ9XFwnUGFyYWxsZWxvZ3JhbVxcJyBjbGFzcz1cXCdzaGFwZS1pY29uXFwnIC8+JywgdmFsdWU6ICdwYXJhbGxlbG9ncmFtJyB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiAnPGltZyBzcmM9XFwnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9vdmFsLnN2Z1xcJyBhbHQ9XFwnT3ZhbFxcJyBjbGFzcz1cXCdzaGFwZS1pY29uXFwnIC8+JywgdmFsdWU6ICdvdmFsJyB9XHJcbiAgICAgICAgICBdXCIgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cImhhbmRsZUl0ZW1DbGljayh1cGRhdGVTaGFwZSwgJ3NoYXBlJywgaXRlbS52YWx1ZSlcIiBzdHlsZT1cInBhZGRpbmc6IDVweDtcIiBbaW5uZXJIVE1MXT1cIml0ZW0ubGFiZWxcIj5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG5Cb2FyZCBidG4tc2Vjb25kYXJ5XCIgaWQ9XCJzZWxlY3RNb2RlXCIgKGNsaWNrKT1cImNoYW5nZU1vZGUoJ3NlbGVjdCcpXCI+XHJcbiAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFNb3VzZVBvaW50ZXJcIj48L2ZhLWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG5Cb2FyZCBidG4tZGFuZ2VyIGRyb3Bkb3duLXRvZ2dsZVwiIGlkPVwiZXJhc2VNb2RlXCIgKGNsaWNrKT1cImhhbmRsZURyb3Bkb3duQ2xpY2soJ2VyYXNlTW9kZScpXCI+XHJcbiAgICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYUVyYXNlclwiPjwvZmEtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwiZHJvcGRvd25PcGVuID09PSAnZXJhc2VNb2RlJ1wiIGNsYXNzPVwiZHJvcGRvd24tbWVudSBzaG93XCI+XHJcbiAgICAgICAgICA8YnV0dG9uICpuZ0Zvcj1cImxldCBpdGVtIG9mIFt7IGxhYmVsOiAnWC1TbWFsbCAoNXB4KScsIHZhbHVlOiA1IH0sIHsgbGFiZWw6ICdTbWFsbCAoMTBweCknLCB2YWx1ZTogMTAgfSwgeyBsYWJlbDogJ01lZGl1bSAoMjBweCknLCB2YWx1ZTogMjAgfSwgeyBsYWJlbDogJ0xhcmdlICgzMHB4KScsIHZhbHVlOiAzMCB9LCB7IGxhYmVsOiAnWC1MYXJnZSAoNjBweCknLCB2YWx1ZTogNjAgfV1cIiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwiaGFuZGxlSXRlbUNsaWNrKHVwZGF0ZUVyYXNlclRoaWNrbmVzcywgJ2VyYXNlJywgaXRlbS52YWx1ZSlcIiBzdHlsZT1cInBhZGRpbmc6IDVweDtcIj5cclxuICAgICAgICAgICAge3sgaXRlbS5sYWJlbCB9fVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bkJvYXJkIGJ0bi1pbmZvXCIgaWQ9XCJwYW5Nb2RlXCIgKGNsaWNrKT1cImNoYW5nZU1vZGUoJ3BhbicpXCI+XHJcbiAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFIYW5kUGFwZXJcIj48L2ZhLWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bkJvYXJkIGJ0bi1zdWNjZXNzXCIgaWQ9XCJ6b29tSW5cIiAoY2xpY2spPVwiem9vbUNhbnZhcygxLjIsICRldmVudClcIj5cclxuICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVNlYXJjaFBsdXNcIj48L2ZhLWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bkJvYXJkIGJ0bi1zdWNjZXNzXCIgaWQ9XCJ6b29tUmVzZXRcIiAoY2xpY2spPVwiem9vbUNhbnZhcygxMCwgJGV2ZW50KVwiPlxyXG4gICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhU2VhcmNoXCI+PC9mYS1pY29uPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG5Cb2FyZCBidG4tc3VjY2Vzc1wiIGlkPVwiem9vbU91dFwiIChjbGljayk9XCJ6b29tQ2FudmFzKDAuOCwgJGV2ZW50KVwiPlxyXG4gICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhU2VhcmNoTWludXNcIj48L2ZhLWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG5Cb2FyZCBidG4tc2Vjb25kYXJ5IGRyb3Bkb3duLXRvZ2dsZVwiIGlkPVwiYWRkVGV4dFwiIChjbGljayk9XCJoYW5kbGVEcm9wZG93bkNsaWNrKCdhZGRUZXh0JylcIj5cclxuICAgICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhRm9udFwiPjwvZmEtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwiZHJvcGRvd25PcGVuID09PSAnYWRkVGV4dCdcIiBjbGFzcz1cImRyb3Bkb3duLW1lbnUgc2hvd1wiPlxyXG4gICAgICAgICAgPGJ1dHRvbiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBbeyBsYWJlbDogJ0FyaWFsJywgdmFsdWU6ICdBcmlhbCcgfSwgeyBsYWJlbDogJ1RpbWVzIE5ldyBSb21hbicsIHZhbHVlOiAnVGltZXMgTmV3IFJvbWFuJyB9LCB7IGxhYmVsOiAnQ291cmllciBOZXcnLCB2YWx1ZTogJ0NvdXJpZXIgTmV3JyB9LCB7IGxhYmVsOiAnVmVyZGFuYScsIHZhbHVlOiAnVmVyZGFuYScgfV1cIiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwiaGFuZGxlSXRlbUNsaWNrKHVwZGF0ZUZvbnQsICd0ZXh0JywgaXRlbS52YWx1ZSlcIiBzdHlsZT1cInBhZGRpbmc6IDVweDtcIj5cclxuICAgICAgICAgICAge3sgaXRlbS5sYWJlbCB9fVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG5Cb2FyZCBidG4tc2Vjb25kYXJ5IGRyb3Bkb3duLXRvZ2dsZVwiIGlkPVwiZm9udFNpemVcIiAoY2xpY2spPVwiaGFuZGxlRHJvcGRvd25DbGljaygnZm9udFNpemUnKVwiPlxyXG4gICAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFUZXh0SGVpZ2h0XCI+PC9mYS1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxkaXYgKm5nSWY9XCJkcm9wZG93bk9wZW4gPT09ICdmb250U2l6ZSdcIiBjbGFzcz1cImRyb3Bkb3duLW1lbnUgc2hvd1wiPlxyXG4gICAgICAgICAgPGJ1dHRvbiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBbeyBsYWJlbDogJ1gtU21hbGwgKDVweCknLCB2YWx1ZTogNSB9LCB7IGxhYmVsOiAnU21hbGwgKDEwcHgpJywgdmFsdWU6IDEwIH0sIHsgbGFiZWw6ICdNZWRpdW0gKDIwcHgpJywgdmFsdWU6IDIwIH0sIHsgbGFiZWw6ICdMYXJnZSAoNDBweCknLCB2YWx1ZTogNDAgfSwgeyBsYWJlbDogJ1gtTGFyZ2UgKDYwcHgpJywgdmFsdWU6IDYwIH1dXCIgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cImhhbmRsZUl0ZW1DbGljayh1cGRhdGVGb250U2l6ZSwgJycsIGl0ZW0udmFsdWUpXCIgc3R5bGU9XCJwYWRkaW5nOiA1cHg7XCI+XHJcbiAgICAgICAgICAgIHt7IGl0ZW0ubGFiZWwgfX1cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG5Cb2FyZCBidG4tc2Vjb25kYXJ5XCIgaWQ9XCJ1bmRvXCIgKGNsaWNrKT1cInVuZG8oKVwiPlxyXG4gICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhVW5kb1wiPjwvZmEtaWNvbj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuQm9hcmQgYnRuLXNlY29uZGFyeVwiIGlkPVwicmVkb1wiIChjbGljayk9XCJyZWRvKClcIj5cclxuICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVJlZG9cIj48L2ZhLWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bkJvYXJkIGJ0bi1zZWNvbmRhcnlcIiBpZD1cInNhdmVcIiAoY2xpY2spPVwic2F2ZUNhbnZhcygpXCI+XHJcbiAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFTYXZlXCI+PC9mYS1pY29uPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG5Cb2FyZCBidG4tZGFuZ2VyXCIgaWQ9XCJkZWxldGVcIiAoY2xpY2spPVwiZGVsZXRlU2hhcGUoKVwiPlxyXG4gICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhVHJhc2hcIj48L2ZhLWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bkJvYXJkIGJ0bi1zZWNvbmRhcnlcIiBpZD1cImNsZWFyQ2FudmFzXCIgKGNsaWNrKT1cImNsZWFyQ2FudmFzKClcIj5cclxuICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVRpbWVzXCI+PC9mYS1pY29uPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvbiBpZD1cInRvZ2dsZUJhY2tncm91bmRSZWZcIiAjdG9nZ2xlQmFja2dyb3VuZFJlZiBjbGFzcz1cImJ0biBidG5Cb2FyZCBidG4tc2Vjb25kYXJ5XCIgKGNsaWNrKT1cInRvZ2dsZUJhY2tncm91bmQoKVwiPlxyXG4gICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9ncmFwaC5qcGdcIiBhbHQ9XCJCYWNrZ3JvdW5kXCIgY2xhc3M9XCJ0b2dnbGUtaWNvblwiIGlkPVwiYmFja2dyb3VuZEljb25cIiAvPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgaWQ9XCJ1cGxvYWRCb2FyZEltYWdlXCIgYWNjZXB0PVwiaW1hZ2UvKlwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiAoY2hhbmdlKT1cInVwbG9hZEltYWdlKCRldmVudClcIiAvPlxyXG4gICAgICA8bGFiZWwgZm9yPVwidXBsb2FkQm9hcmRJbWFnZVwiIGNsYXNzPVwiYnRuIGJ0bkJvYXJkIGJ0bi1wcmltYXJ5XCI+XHJcbiAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFVcGxvYWRcIj48L2ZhLWljb24+XHJcbiAgICAgIDwvbGFiZWw+XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwiY29sb3JcIiBpZD1cImNvbG9yUGlja2VyXCIgY2xhc3M9XCJidG5cIiBbKG5nTW9kZWwpXT1cImNvbG9yXCIgLz5cclxuICAgICAgPHNlbGVjdCBpZD1cImxpbmVUeXBlUGlja2VyXCIgY2xhc3M9XCJjdXN0b20tc2VsZWN0XCIgc3R5bGU9XCJ3aWR0aDogYXV0bztcIiBbKG5nTW9kZWwpXT1cImxpbmVUeXBlXCI+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInNvbGlkXCI+U29saWQ8L29wdGlvbj5cclxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiZGFzaGVkXCI+RGFzaGVkPC9vcHRpb24+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImRvdHRlZFwiPkRvdHRlZDwvb3B0aW9uPlxyXG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJkYXNoRG90XCI+RGFzaC1Eb3Q8L29wdGlvbj5cclxuICAgICAgPC9zZWxlY3Q+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxjYW52YXMgaWQ9XCJjYW52YXNSZWZcIiB3aWR0aD1cIjEyODBcIiBoZWlnaHQ9XCI3MjBcIiBzdHlsZT1cImJvcmRlcjogMnB4IHNvbGlkIHJlZDtcIiAjY2FudmFzUmVmPjwvY2FudmFzPlxyXG4gICAgPHRleHRhcmVhIGlkPVwidGV4dElucHV0UmVmXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiAjdGV4dElucHV0UmVmIHN0eWxlPVwiZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGFic29sdXRlO1wiPjwvdGV4dGFyZWE+XHJcbiAgICA8YSBocmVmPVwiI1wiIGlkPVwiZG93bmxvYWRMaW5rUmVmXCIgI2Rvd25sb2FkTGlua1JlZiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+RG93bmxvYWQ8L2E+XHJcbiAgICA8Y2FudmFzIGlkPVwidGVtcENhbnZhc1JlZlwiICN0ZW1wQ2FudmFzUmVmIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj48L2NhbnZhcz5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==