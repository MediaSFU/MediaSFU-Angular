/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, Input, ViewChild, Optional, Inject, } from '@angular/core';
import { faChevronRight, faChevronLeft, faPencilAlt, faPaintBrush, faShapes, faEraser, faSearch, faSearchPlus, faSearchMinus, faFont, faTextHeight, faUndo, faRedo, faSave, faTrash, faTimes, faMousePointer, } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
import * as i3 from "@angular/forms";
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
 *
 * @example
 * ```html
 * <app-screenboard
 *  [customWidth]="customWidth"
 * [customHeight]="customHeight"
 * [parameters]="screenboardParameters"
 * [showAspect]="showAspect"
 * ></app-screenboard>
 * ```
 */
export class Screenboard {
    customWidth;
    customHeight;
    parameters = {};
    showAspect;
    canvasRef;
    screenboardRef;
    screenboardContentRef;
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
    mode = 'draw';
    isDrawing = false;
    startX = 0;
    startY = 0;
    currentX = 0;
    currentY = 0;
    freehandDrawing = [];
    shapes = [];
    eraserThickness = 10;
    brushThickness = 6;
    lineThickness = 6;
    lineType = 'solid';
    color = '#000000';
    font = 'Arial';
    fontSize = 20;
    shape = null;
    toolbarVisible = false;
    dropdownOpen = null;
    canvas;
    ctx;
    constructor(injectedCustomWidth, injectedCustomHeight, injectedParameters, injectedShowAspect) {
        this.customWidth = injectedCustomWidth || this.customWidth || 0;
        this.customHeight = injectedCustomHeight || this.customHeight || 0;
        this.parameters = injectedParameters || this.parameters || {};
        this.showAspect = injectedShowAspect || this.showAspect || false;
    }
    ngOnInit() {
        setTimeout(() => {
            if (this.parameters) {
                this.parameters = this.parameters.getUpdatedAllParams();
            }
        }, 100);
    }
    ngOnChanges(changes) {
        if (changes['showAspect']) {
            if (!this.canvas && this.canvasRef) {
                this.canvas = this.canvasRef.nativeElement;
                this.addListeners();
            }
        }
    }
    ngAfterViewInit() {
        if (this.canvasRef && !this.canvas) {
            this.canvas = this.canvasRef.nativeElement;
            this.addListeners();
        }
    }
    ngOnDestroy() {
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
            this.ctx = this.canvas.getContext('2d');
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
    handleMouseDown(event) {
        this.startDrawing(event);
    }
    handleMouseMove(event) {
        this.draw(event);
    }
    handleMouseUp() {
        this.stopDrawing();
    }
    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY,
        });
        this.canvas.dispatchEvent(mouseEvent);
    }
    handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY,
        });
        this.canvas.dispatchEvent(mouseEvent);
    }
    handleTouchEnd(e) {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        this.canvas.dispatchEvent(mouseEvent);
    }
    handleClickOutside(event) {
        if (this.dropdownOpen && !event.target.closest('.btn-group')) {
            this.dropdownOpen = null;
        }
    }
    handleDropdownClick(id) {
        this.dropdownOpen = this.dropdownOpen === id ? null : id;
    }
    setDrawMode(thickness) {
        this.lineThickness = thickness;
        this.mode = 'draw';
        this.dropdownOpen = null;
    }
    setFreehandMode(thickness) {
        this.brushThickness = thickness;
        this.mode = 'freehand';
        this.dropdownOpen = null;
    }
    setShapeMode(shape) {
        this.shape = shape;
        this.mode = 'shape';
        this.dropdownOpen = null;
    }
    setEraseMode(thickness) {
        this.eraserThickness = thickness;
        this.mode = 'erase';
        this.dropdownOpen = null;
    }
    startDrawing(event) {
        this.isDrawing = true;
        this.startX = event.offsetX;
        this.startY = event.offsetY;
        if (this.mode === 'erase') {
            this.erase(event.offsetX, event.offsetY);
        }
        else if (this.mode === 'draw' || this.mode === 'freehand') {
            this.ctx.beginPath();
            this.ctx.moveTo(event.offsetX, event.offsetY);
            if (this.mode === 'freehand') {
                this.freehandDrawing = [
                    { x: event.offsetX, y: event.offsetY, color: this.color, thickness: this.brushThickness },
                ];
            }
        }
    }
    draw(event) {
        if (!this.isDrawing)
            return;
        this.currentX = event.offsetX;
        this.currentY = event.offsetY;
        if (this.mode === 'erase') {
            this.erase(event.offsetX, event.offsetY);
        }
        else if (this.mode === 'draw') {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawShapes();
            this.drawLine(this.startX, this.startY, event.offsetX, event.offsetY);
        }
        else if (this.mode === 'freehand') {
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
        }
        else if (this.mode === 'shape') {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawShapes();
            this.drawShape(this.shape, this.startX, this.startY, event.offsetX, event.offsetY);
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
        }
        else if (this.mode === 'freehand') {
            this.shapes.push({
                type: 'freehand',
                points: this.freehandDrawing,
                color: this.color,
                thickness: this.brushThickness,
            });
            this.freehandDrawing = [];
        }
        else if (this.mode === 'shape') {
            this.shapes.push({
                type: this.shape,
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
    drawLine = (x1, y1, x2, y2) => {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineThickness;
        if (this.lineType === 'dashed') {
            this.ctx.setLineDash([10, 10]);
        }
        else if (this.lineType === 'dotted') {
            this.ctx.setLineDash([2, 10]);
        }
        else if (this.lineType === 'dashDot') {
            this.ctx.setLineDash([10, 5, 2, 5]);
        }
        else {
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
            }
            else if (shape.type === 'freehand') {
                this.drawFreehand(shape.points);
            }
            else {
                this.drawShape(shape.type, shape.x1, shape.y1, shape.x2, shape.y2);
            }
        });
    };
    drawFreehand = (points) => {
        if (points.length < 2)
            return;
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.brushThickness;
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i].x, points[i].y);
        }
        this.ctx.stroke();
    };
    drawShape = (type, x1, y1, x2, y2) => {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineThickness;
        if (this.lineType === 'dashed') {
            this.ctx.setLineDash([10, 10]);
        }
        else if (this.lineType === 'dotted') {
            this.ctx.setLineDash([2, 10]);
        }
        else if (this.lineType === 'dashDot') {
            this.ctx.setLineDash([10, 5, 2, 5]);
        }
        else {
            this.ctx.setLineDash([]);
        }
        if (type === 'rectangle') {
            this.ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
        }
        else if (type === 'circle') {
            const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            this.ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
        else if (type === 'rhombus') {
            const centerX = (x1 + x2) / 2;
            const centerY = (y1 + y2) / 2;
            this.ctx.moveTo(centerX, y1);
            this.ctx.lineTo(x2, centerY);
            this.ctx.lineTo(centerX, y2);
            this.ctx.lineTo(x1, centerY);
            this.ctx.closePath();
            this.ctx.stroke();
        }
        else if (type === 'pentagon') {
            this.drawPolygon(5, x1, y1, x2, y2);
        }
        else if (type === 'hexagon') {
            this.drawPolygon(6, x1, y1, x2, y2);
        }
        else if (type === 'triangle') {
            const centerXTriangle = (x1 + x2) / 2;
            this.ctx.moveTo(centerXTriangle, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.lineTo(x1, y2);
            this.ctx.closePath();
            this.ctx.stroke();
        }
        else if (type === 'square') {
            this.ctx.strokeRect(x1, y1, x2 - x1, x2 - x1);
        }
        else if (type === 'octagon') {
            this.drawPolygon(8, x1, y1, x2, y2);
        }
        else if (type === 'oval') {
            const radiusX = Math.abs(x2 - x1) / 2;
            const radiusY = Math.abs(y2 - y1) / 2;
            const centerX = (x1 + x2) / 2;
            const centerY = (y1 + y2) / 2;
            this.ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
        else if (type === 'parallelogram') {
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
    drawPolygon = (sides, x1, y1, x2, y2) => {
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
            }
            else {
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
    erase = (x, y) => {
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
                    points: shape.points.filter((point) => {
                        const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
                        return distance > this.eraserThickness / 2;
                    }),
                };
            }
            else if (shape.type === 'line') {
                if (this.isPointNearLine(x, y, shape.x1, shape.y1, shape.x2, shape.y2, this.eraserThickness / 2)) {
                    return null;
                }
            }
            else if (shape.type === 'text') {
                const textWidth = this.ctx.measureText(shape.text).width;
                if (x > shape.x &&
                    x < shape.x + textWidth &&
                    y > shape.y - shape.fontSize &&
                    y < shape.y) {
                    return null;
                }
            }
            else {
                if (x > shape.x1 && x < shape.x2 && y > shape.y1 && y < shape.y2) {
                    return null;
                }
            }
            return shape;
        })
            .filter((shape) => shape && (shape.type !== 'freehand' || shape.points.length > 0));
    };
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
        }
        else {
            this.toolbarVisible = false;
        }
        this.parameters.updateIsScreenboardModalVisible(true);
        await this.parameters.sleep({ ms: 500 });
        this.parameters.updateIsScreenboardModalVisible(false);
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: Screenboard, deps: [{ token: 'customWidth', optional: true }, { token: 'customHeight', optional: true }, { token: 'parameters', optional: true }, { token: 'showAspect', optional: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: Screenboard, isStandalone: true, selector: "app-screenboard", inputs: { customWidth: "customWidth", customHeight: "customHeight", parameters: "parameters", showAspect: "showAspect" }, viewQueries: [{ propertyName: "canvasRef", first: true, predicate: ["canvasRef"], descendants: true }, { propertyName: "screenboardRef", first: true, predicate: ["screenboardRef"], descendants: true }, { propertyName: "screenboardContentRef", first: true, predicate: ["screenboardContentRef"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div id=\"screenboard-interface\" *ngIf=\"showAspect\" style=\"position: relative; display: block; justify-content: center; align-items: center; background-color: transparent; z-index: 1000; width: 100%; height: 100%; max-width: 100%; max-height: 100%; overflow: auto;\" #screenboardRef>\r\n  <div id=\"screenboardContent\" style=\"position: relative; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; overflow: hidden; top: 0; left: 0;\" #screenboardContentRef>\r\n    <button id=\"annotateScreen\" class=\"btn btn-primary btnBoardScreen annotateScreenBtn\" style=\"position: absolute; top: 5px; right: 10px; z-index: 1000;\" (click)=\"toggleAnnotate()\">\r\n      <fa-icon [icon]=\"faPencilAlt\" [ngStyle]=\"{'color': parameters.annotateScreenStream ? 'red' : 'green'}\"></fa-icon>\r\n    </button>\r\n\r\n    <button id=\"toolbarToggleScreen\" *ngIf=\"parameters.annotateScreenStream\" class=\"btn btnBoardScreen btn-primary\" style=\"position: absolute; top: 5px; right: 55px; z-index: 1000;\" (click)=\"toggleToolbar()\">\r\n      <fa-icon [icon]=\"toolbarVisible ? faChevronRight : faChevronLeft\"></fa-icon>\r\n    </button>\r\n\r\n    <div class=\"toolbarScreen mb-3\" id=\"toolbarScreen\" style=\"position: absolute; top: 5px; right: 105px; z-index: 1000; background-color: transparent;\" [style.display]=\"toolbarVisible ? 'block' : 'none'\">\r\n      <!-- Draw Mode Dropdown -->\r\n      <div class=\"btn-group\" role=\"group\">\r\n        <button class=\"btn btnBoardScreen btn-secondary dropdown-toggle\" id=\"drawModeScreen\" (click)=\"handleDropdownClick('drawModeScreen')\">\r\n          <fa-icon [icon]=\"faPencilAlt\"></fa-icon>\r\n        </button>\r\n        <div *ngIf=\"dropdownOpen === 'drawModeScreen'\" class=\"dropdown-menu show\">\r\n          <button class=\"dropdown-item\" (click)=\"setDrawMode(3)\">XX-Small (3px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setDrawMode(6)\">X-Small (6px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setDrawMode(12)\">Small (12px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setDrawMode(18)\">Medium (18px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setDrawMode(24)\">Large (24px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setDrawMode(36)\">X-Large (36px)</button>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Freehand Mode Dropdown -->\r\n      <div class=\"btn-group\" role=\"group\">\r\n        <button class=\"btn btnBoardScreen btn-dark dropdown-toggle\" id=\"freehandModeScreen\" (click)=\"handleDropdownClick('freehandModeScreen')\">\r\n          <fa-icon [icon]=\"faPaintBrush\"></fa-icon>\r\n        </button>\r\n        <div *ngIf=\"dropdownOpen === 'freehandModeScreen'\" class=\"dropdown-menu show\">\r\n          <button class=\"dropdown-item\" (click)=\"setFreehandMode(5)\">X-Small (5px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setFreehandMode(10)\">Small (10px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setFreehandMode(20)\">Medium (20px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setFreehandMode(40)\">Large (40px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setFreehandMode(60)\">X-Large (60px)</button>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Shape Mode Dropdown with Images -->\r\n      <div class=\"btn-group\" role=\"group\">\r\n        <button class=\"btn btnBoardScreen btn-dark dropdown-toggle\" id=\"shapeModeScreen\" (click)=\"handleDropdownClick('shapeModeScreen')\">\r\n          <fa-icon [icon]=\"faShapes\"></fa-icon>\r\n        </button>\r\n        <div *ngIf=\"dropdownOpen === 'shapeModeScreen'\" class=\"dropdown-menu show\">\r\n          <button class=\"dropdown-item\" (click)=\"setShapeMode('square')\">\r\n            <img src=\"https://mediasfu.com/images/svg/square.svg\" alt=\"Square\" class=\"shape-icon\" /> Square\r\n          </button>\r\n          <button class=\"dropdown-item\" (click)=\"setShapeMode('rectangle')\">\r\n            <img src=\"https://mediasfu.com/images/svg/rectangle.svg\" alt=\"Rectangle\" class=\"shape-icon\" /> Rectangle\r\n          </button>\r\n          <button class=\"dropdown-item\" (click)=\"setShapeMode('circle')\">\r\n            <img src=\"https://mediasfu.com/images/svg/circle.svg\" alt=\"Circle\" class=\"shape-icon\" /> Circle\r\n          </button>\r\n          <button class=\"dropdown-item\" (click)=\"setShapeMode('triangle')\">\r\n            <img src=\"https://mediasfu.com/images/svg/triangle.svg\" alt=\"Triangle\" class=\"shape-icon\" /> Triangle\r\n          </button>\r\n          <button class=\"dropdown-item\" (click)=\"setShapeMode('hexagon')\">\r\n            <img src=\"https://mediasfu.com/images/svg/hexagon.svg\" alt=\"Hexagon\" class=\"shape-icon\" /> Hexagon\r\n          </button>\r\n          <button class=\"dropdown-item\" (click)=\"setShapeMode('pentagon')\">\r\n            <img src=\"https://mediasfu.com/images/svg/pentagon.svg\" alt=\"Pentagon\" class=\"shape-icon\" /> Pentagon\r\n          </button>\r\n          <button class=\"dropdown-item\" (click)=\"setShapeMode('rhombus')\">\r\n            <img src=\"https://mediasfu.com/images/svg/rhombus.svg\" alt=\"Rhombus\" class=\"shape-icon\" /> Rhombus\r\n          </button>\r\n          <button class=\"dropdown-item\" (click)=\"setShapeMode('octagon')\">\r\n            <img src=\"https://mediasfu.com/images/svg/octagon.svg\" alt=\"Octagon\" class=\"shape-icon\" /> Octagon\r\n          </button>\r\n          <button class=\"dropdown-item\" (click)=\"setShapeMode('oval')\">\r\n            <img src=\"https://mediasfu.com/images/svg/oval.svg\" alt=\"Oval\" class=\"shape-icon\" /> Oval\r\n          </button>\r\n          <button class=\"dropdown-item\" (click)=\"setShapeMode('parallelogram')\">\r\n            <img src=\"https://mediasfu.com/images/svg/parallelogram.svg\" alt=\"Parallelogram\" class=\"shape-icon\" /> Parallelogram\r\n          </button>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Erase Mode Dropdown -->\r\n      <div class=\"btn-group\" role=\"group\">\r\n        <button class=\"btn btnBoardScreen btn-danger dropdown-toggle\" id=\"eraseModeScreen\" (click)=\"handleDropdownClick('eraseModeScreen')\">\r\n          <fa-icon [icon]=\"faEraser\"></fa-icon>\r\n        </button>\r\n        <div *ngIf=\"dropdownOpen === 'eraseModeScreen'\" class=\"dropdown-menu show\">\r\n          <button class=\"dropdown-item\" (click)=\"setEraseMode(5)\">X-Small (5px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setEraseMode(10)\">Small (10px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setEraseMode(20)\">Medium (20px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setEraseMode(30)\">Large (30px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setEraseMode(60)\">X-Large (60px)</button>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Additional Toolbar Controls -->\r\n      <button class=\"btn btnBoard btn-success\" id=\"zoomResetScreen\" style=\"display: none;\">\r\n        <fa-icon [icon]=\"faSearch\"></fa-icon>\r\n      </button>\r\n\r\n      <input type=\"color\" class=\"btn\" id=\"colorPickerScreen\" [(ngModel)]=\"color\">\r\n      <select id=\"lineTypePickerScreen\" class=\"custom-select\" style=\"width: auto;\" [(ngModel)]=\"lineType\">\r\n        <option value=\"solid\">Solid</option>\r\n        <option value=\"dashed\">Dashed</option>\r\n        <option value=\"dotted\">Dotted</option>\r\n        <option value=\"dashDot\">Dash-Dot</option>\r\n      </select>\r\n    </div>\r\n\r\n    <canvas id=\"canvasRef\" width=\"1280\" height=\"720\" [ngStyle]=\"{'display': parameters.annotateScreenStream ? 'block' : 'none'}\" style=\"padding: 0; margin: 0;\" #canvasRef></canvas>\r\n  </div>\r\n</div>\r\n", styles: ["#whiteboardCanvas{border:1px solid #000;cursor:crosshair;background-color:#fff}.resize-handle,.move-handle{width:8px;height:8px;background:red;position:absolute}.move-handle{background:#00f}#textInput{display:none;position:absolute;z-index:10;width:200px}.shape-icon{width:20px;height:20px;color:#fff}.toolbar .btn-group button,.toolbar .dropdown-menu a{font-size:.8rem;padding:5px 10px;margin:0 2px;border-radius:4px;transition:background-color .2s}.toolbar .dropdown-menu a{background-color:transparent;color:#1b1a1a}.toolbar .btn-group button:hover,.toolbar .dropdown-menu a:hover{background-color:#e3e7eb}.toolbar .btn-group button.active{background-color:#454d55}.toolbarScreen .btn-group button,.toolbarScreen .dropdown-menu a{font-size:.8rem;padding:5px 10px;margin:1px 2px;border-radius:4px;transition:background-color .2s;background-color:transparent;color:\"black\"}.toolbarScreen .btn-group button{color:#060606;border:none}.toolbarScreen .dropdown-menu a{background-color:transparent;color:#1b1a1a}.toolbarScreen .btn-group button.active{background-color:#454d55}#toolbar,#toolbarScreen{transition:display .3s ease-in-out}#toolbarToggle,#toolbarToggleScreen{cursor:pointer;border:\"2px solid black\"!important;font-size:.8rem}#colorPicker,#colorPickerScreen{font-size:.8rem;padding:2px;width:32px;height:32px}#lineTypePicker{font-size:.8rem;padding:2px auto;width:32px;height:32px}.btnBoard{font-size:1rem;padding:2px;width:40px;height:40px;margin:2px}#lineTypePickerScreen{font-size:.7rem;padding:2px auto;width:28px;height:28px;background-color:#d6d1d166;color:#000;border-radius:4px}.toggle-icon{width:30px;height:30px;padding:0;margin:0}#toggleBackground.active{background-color:#fdfeff}.annotateScreenBtn{background-color:#2d2e2f!important;border:2px solid #000!important;color:green!important;font-size:.75rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i2.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i3.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i3.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: Screenboard, decorators: [{
            type: Component,
            args: [{ selector: 'app-screenboard', standalone: true, imports: [CommonModule, FontAwesomeModule, FormsModule], template: "<div id=\"screenboard-interface\" *ngIf=\"showAspect\" style=\"position: relative; display: block; justify-content: center; align-items: center; background-color: transparent; z-index: 1000; width: 100%; height: 100%; max-width: 100%; max-height: 100%; overflow: auto;\" #screenboardRef>\r\n  <div id=\"screenboardContent\" style=\"position: relative; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; overflow: hidden; top: 0; left: 0;\" #screenboardContentRef>\r\n    <button id=\"annotateScreen\" class=\"btn btn-primary btnBoardScreen annotateScreenBtn\" style=\"position: absolute; top: 5px; right: 10px; z-index: 1000;\" (click)=\"toggleAnnotate()\">\r\n      <fa-icon [icon]=\"faPencilAlt\" [ngStyle]=\"{'color': parameters.annotateScreenStream ? 'red' : 'green'}\"></fa-icon>\r\n    </button>\r\n\r\n    <button id=\"toolbarToggleScreen\" *ngIf=\"parameters.annotateScreenStream\" class=\"btn btnBoardScreen btn-primary\" style=\"position: absolute; top: 5px; right: 55px; z-index: 1000;\" (click)=\"toggleToolbar()\">\r\n      <fa-icon [icon]=\"toolbarVisible ? faChevronRight : faChevronLeft\"></fa-icon>\r\n    </button>\r\n\r\n    <div class=\"toolbarScreen mb-3\" id=\"toolbarScreen\" style=\"position: absolute; top: 5px; right: 105px; z-index: 1000; background-color: transparent;\" [style.display]=\"toolbarVisible ? 'block' : 'none'\">\r\n      <!-- Draw Mode Dropdown -->\r\n      <div class=\"btn-group\" role=\"group\">\r\n        <button class=\"btn btnBoardScreen btn-secondary dropdown-toggle\" id=\"drawModeScreen\" (click)=\"handleDropdownClick('drawModeScreen')\">\r\n          <fa-icon [icon]=\"faPencilAlt\"></fa-icon>\r\n        </button>\r\n        <div *ngIf=\"dropdownOpen === 'drawModeScreen'\" class=\"dropdown-menu show\">\r\n          <button class=\"dropdown-item\" (click)=\"setDrawMode(3)\">XX-Small (3px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setDrawMode(6)\">X-Small (6px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setDrawMode(12)\">Small (12px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setDrawMode(18)\">Medium (18px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setDrawMode(24)\">Large (24px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setDrawMode(36)\">X-Large (36px)</button>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Freehand Mode Dropdown -->\r\n      <div class=\"btn-group\" role=\"group\">\r\n        <button class=\"btn btnBoardScreen btn-dark dropdown-toggle\" id=\"freehandModeScreen\" (click)=\"handleDropdownClick('freehandModeScreen')\">\r\n          <fa-icon [icon]=\"faPaintBrush\"></fa-icon>\r\n        </button>\r\n        <div *ngIf=\"dropdownOpen === 'freehandModeScreen'\" class=\"dropdown-menu show\">\r\n          <button class=\"dropdown-item\" (click)=\"setFreehandMode(5)\">X-Small (5px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setFreehandMode(10)\">Small (10px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setFreehandMode(20)\">Medium (20px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setFreehandMode(40)\">Large (40px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setFreehandMode(60)\">X-Large (60px)</button>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Shape Mode Dropdown with Images -->\r\n      <div class=\"btn-group\" role=\"group\">\r\n        <button class=\"btn btnBoardScreen btn-dark dropdown-toggle\" id=\"shapeModeScreen\" (click)=\"handleDropdownClick('shapeModeScreen')\">\r\n          <fa-icon [icon]=\"faShapes\"></fa-icon>\r\n        </button>\r\n        <div *ngIf=\"dropdownOpen === 'shapeModeScreen'\" class=\"dropdown-menu show\">\r\n          <button class=\"dropdown-item\" (click)=\"setShapeMode('square')\">\r\n            <img src=\"https://mediasfu.com/images/svg/square.svg\" alt=\"Square\" class=\"shape-icon\" /> Square\r\n          </button>\r\n          <button class=\"dropdown-item\" (click)=\"setShapeMode('rectangle')\">\r\n            <img src=\"https://mediasfu.com/images/svg/rectangle.svg\" alt=\"Rectangle\" class=\"shape-icon\" /> Rectangle\r\n          </button>\r\n          <button class=\"dropdown-item\" (click)=\"setShapeMode('circle')\">\r\n            <img src=\"https://mediasfu.com/images/svg/circle.svg\" alt=\"Circle\" class=\"shape-icon\" /> Circle\r\n          </button>\r\n          <button class=\"dropdown-item\" (click)=\"setShapeMode('triangle')\">\r\n            <img src=\"https://mediasfu.com/images/svg/triangle.svg\" alt=\"Triangle\" class=\"shape-icon\" /> Triangle\r\n          </button>\r\n          <button class=\"dropdown-item\" (click)=\"setShapeMode('hexagon')\">\r\n            <img src=\"https://mediasfu.com/images/svg/hexagon.svg\" alt=\"Hexagon\" class=\"shape-icon\" /> Hexagon\r\n          </button>\r\n          <button class=\"dropdown-item\" (click)=\"setShapeMode('pentagon')\">\r\n            <img src=\"https://mediasfu.com/images/svg/pentagon.svg\" alt=\"Pentagon\" class=\"shape-icon\" /> Pentagon\r\n          </button>\r\n          <button class=\"dropdown-item\" (click)=\"setShapeMode('rhombus')\">\r\n            <img src=\"https://mediasfu.com/images/svg/rhombus.svg\" alt=\"Rhombus\" class=\"shape-icon\" /> Rhombus\r\n          </button>\r\n          <button class=\"dropdown-item\" (click)=\"setShapeMode('octagon')\">\r\n            <img src=\"https://mediasfu.com/images/svg/octagon.svg\" alt=\"Octagon\" class=\"shape-icon\" /> Octagon\r\n          </button>\r\n          <button class=\"dropdown-item\" (click)=\"setShapeMode('oval')\">\r\n            <img src=\"https://mediasfu.com/images/svg/oval.svg\" alt=\"Oval\" class=\"shape-icon\" /> Oval\r\n          </button>\r\n          <button class=\"dropdown-item\" (click)=\"setShapeMode('parallelogram')\">\r\n            <img src=\"https://mediasfu.com/images/svg/parallelogram.svg\" alt=\"Parallelogram\" class=\"shape-icon\" /> Parallelogram\r\n          </button>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Erase Mode Dropdown -->\r\n      <div class=\"btn-group\" role=\"group\">\r\n        <button class=\"btn btnBoardScreen btn-danger dropdown-toggle\" id=\"eraseModeScreen\" (click)=\"handleDropdownClick('eraseModeScreen')\">\r\n          <fa-icon [icon]=\"faEraser\"></fa-icon>\r\n        </button>\r\n        <div *ngIf=\"dropdownOpen === 'eraseModeScreen'\" class=\"dropdown-menu show\">\r\n          <button class=\"dropdown-item\" (click)=\"setEraseMode(5)\">X-Small (5px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setEraseMode(10)\">Small (10px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setEraseMode(20)\">Medium (20px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setEraseMode(30)\">Large (30px)</button>\r\n          <button class=\"dropdown-item\" (click)=\"setEraseMode(60)\">X-Large (60px)</button>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Additional Toolbar Controls -->\r\n      <button class=\"btn btnBoard btn-success\" id=\"zoomResetScreen\" style=\"display: none;\">\r\n        <fa-icon [icon]=\"faSearch\"></fa-icon>\r\n      </button>\r\n\r\n      <input type=\"color\" class=\"btn\" id=\"colorPickerScreen\" [(ngModel)]=\"color\">\r\n      <select id=\"lineTypePickerScreen\" class=\"custom-select\" style=\"width: auto;\" [(ngModel)]=\"lineType\">\r\n        <option value=\"solid\">Solid</option>\r\n        <option value=\"dashed\">Dashed</option>\r\n        <option value=\"dotted\">Dotted</option>\r\n        <option value=\"dashDot\">Dash-Dot</option>\r\n      </select>\r\n    </div>\r\n\r\n    <canvas id=\"canvasRef\" width=\"1280\" height=\"720\" [ngStyle]=\"{'display': parameters.annotateScreenStream ? 'block' : 'none'}\" style=\"padding: 0; margin: 0;\" #canvasRef></canvas>\r\n  </div>\r\n</div>\r\n", styles: ["#whiteboardCanvas{border:1px solid #000;cursor:crosshair;background-color:#fff}.resize-handle,.move-handle{width:8px;height:8px;background:red;position:absolute}.move-handle{background:#00f}#textInput{display:none;position:absolute;z-index:10;width:200px}.shape-icon{width:20px;height:20px;color:#fff}.toolbar .btn-group button,.toolbar .dropdown-menu a{font-size:.8rem;padding:5px 10px;margin:0 2px;border-radius:4px;transition:background-color .2s}.toolbar .dropdown-menu a{background-color:transparent;color:#1b1a1a}.toolbar .btn-group button:hover,.toolbar .dropdown-menu a:hover{background-color:#e3e7eb}.toolbar .btn-group button.active{background-color:#454d55}.toolbarScreen .btn-group button,.toolbarScreen .dropdown-menu a{font-size:.8rem;padding:5px 10px;margin:1px 2px;border-radius:4px;transition:background-color .2s;background-color:transparent;color:\"black\"}.toolbarScreen .btn-group button{color:#060606;border:none}.toolbarScreen .dropdown-menu a{background-color:transparent;color:#1b1a1a}.toolbarScreen .btn-group button.active{background-color:#454d55}#toolbar,#toolbarScreen{transition:display .3s ease-in-out}#toolbarToggle,#toolbarToggleScreen{cursor:pointer;border:\"2px solid black\"!important;font-size:.8rem}#colorPicker,#colorPickerScreen{font-size:.8rem;padding:2px;width:32px;height:32px}#lineTypePicker{font-size:.8rem;padding:2px auto;width:32px;height:32px}.btnBoard{font-size:1rem;padding:2px;width:40px;height:40px;margin:2px}#lineTypePickerScreen{font-size:.7rem;padding:2px auto;width:28px;height:28px;background-color:#d6d1d166;color:#000;border-radius:4px}.toggle-icon{width:30px;height:30px;padding:0;margin:0}#toggleBackground.active{background-color:#fdfeff}.annotateScreenBtn{background-color:#2d2e2f!important;border:2px solid #000!important;color:green!important;font-size:.75rem}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['customWidth']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['customHeight']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['parameters']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['showAspect']
                }] }], propDecorators: { customWidth: [{
                type: Input
            }], customHeight: [{
                type: Input
            }], parameters: [{
                type: Input
            }], showAspect: [{
                type: Input
            }], canvasRef: [{
                type: ViewChild,
                args: ['canvasRef']
            }], screenboardRef: [{
                type: ViewChild,
                args: ['screenboardRef']
            }], screenboardContentRef: [{
                type: ViewChild,
                args: ['screenboardContentRef']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyZWVuYm9hcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvc2NyZWVuYm9hcmQtY29tcG9uZW50cy9zY3JlZW5ib2FyZC9zY3JlZW5ib2FyZC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9zY3JlZW5ib2FyZC1jb21wb25lbnRzL3NjcmVlbmJvYXJkL3NjcmVlbmJvYXJkLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDZEQUE2RDtBQUM3RCxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxTQUFTLEVBTVQsUUFBUSxFQUNSLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsY0FBYyxFQUNkLGFBQWEsRUFDYixXQUFXLEVBQ1gsWUFBWSxFQUNaLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLFlBQVksRUFDWixhQUFhLEVBQ2IsTUFBTSxFQUNOLFlBQVksRUFDWixNQUFNLEVBQ04sTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsT0FBTyxFQUNQLGNBQWMsR0FDZixNQUFNLG1DQUFtQyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7Ozs7O0FBd0JyRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4R0c7QUFRSCxNQUFNLE9BQU8sV0FBVztJQUNiLFdBQVcsQ0FBVTtJQUNyQixZQUFZLENBQVU7SUFDdEIsVUFBVSxHQUEwQixFQUEyQixDQUFDO0lBQ2hFLFVBQVUsQ0FBVztJQUc5QixTQUFTLENBQWlDO0lBRTFDLGNBQWMsQ0FBOEI7SUFFNUMscUJBQXFCLENBQThCO0lBRW5ELGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDaEMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUM5QixXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQzFCLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDNUIsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUNwQixRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQ3BCLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDcEIsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUM1QixhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQzlCLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDaEIsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUM1QixNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ2hCLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDaEIsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUNoQixPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ2xCLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDbEIsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUVoQyxJQUFJLEdBQTRDLE1BQU0sQ0FBQztJQUN2RCxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ2xCLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDWCxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsUUFBUSxHQUFHLENBQUMsQ0FBQztJQUNiLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDYixlQUFlLEdBQWlFLEVBQUUsQ0FBQztJQUNuRixNQUFNLEdBQVUsRUFBRSxDQUFDO0lBQ25CLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDckIsY0FBYyxHQUFHLENBQUMsQ0FBQztJQUNuQixhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDbkIsS0FBSyxHQUFHLFNBQVMsQ0FBQztJQUNsQixJQUFJLEdBQUcsT0FBTyxDQUFDO0lBQ2YsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNkLEtBQUssR0FBa0IsSUFBSSxDQUFDO0lBQzVCLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDdkIsWUFBWSxHQUFrQixJQUFJLENBQUM7SUFDbkMsTUFBTSxDQUFxQjtJQUMzQixHQUFHLENBQTRCO0lBRS9CLFlBQ3FDLG1CQUEyQixFQUMxQixvQkFBNEIsRUFDOUIsa0JBQXVCLEVBQ3ZCLGtCQUEyQjtRQUU3RCxJQUFJLENBQUMsV0FBVyxHQUFHLG1CQUFtQixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxZQUFZLEdBQUcsb0JBQW9CLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFVBQVUsR0FBRyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztRQUM5RCxJQUFJLENBQUMsVUFBVSxHQUFHLGtCQUFrQixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDO0lBQ25FLENBQUM7SUFFRCxRQUFRO1FBQ04sVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUMxRCxDQUFDO1FBQ0gsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBVSxDQUFDLGFBQWEsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3RCLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBVSxDQUFDLGFBQWEsQ0FBQztZQUM1QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEIsQ0FBQztJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzlFLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUUzRSxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBRTVFLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLENBQUM7SUFDSCxDQUFDO0lBRUQsWUFBWSxHQUFHLEdBQUcsRUFBRTtRQUNsQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXJELElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFeEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUV6RSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM3RSxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsZUFBZSxDQUFDLEtBQWlCO1FBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELGVBQWUsQ0FBQyxLQUFpQjtRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxDQUFhO1FBQzVCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDLFdBQVcsRUFBRTtZQUM3QyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87WUFDdEIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO1NBQ3ZCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxlQUFlLENBQUMsQ0FBYTtRQUMzQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixNQUFNLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDN0MsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO1lBQ3RCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztTQUN2QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsY0FBYyxDQUFDLENBQWE7UUFDMUIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25CLE1BQU0sVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsa0JBQWtCLENBQUMsS0FBaUI7UUFDbEMsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUUsS0FBSyxDQUFDLE1BQXNCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUM7WUFDOUUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDM0IsQ0FBQztJQUNILENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxFQUFVO1FBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzNELENBQUM7SUFFRCxXQUFXLENBQUMsU0FBaUI7UUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVELGVBQWUsQ0FBQyxTQUFpQjtRQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztRQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQWE7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVELFlBQVksQ0FBQyxTQUFpQjtRQUM1QixJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQWlCO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFFNUIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsQ0FBQzthQUFNLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUUsQ0FBQztZQUM1RCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlDLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUUsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLGVBQWUsR0FBRztvQkFDckIsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRTtpQkFDMUYsQ0FBQztZQUNKLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVELElBQUksQ0FBQyxLQUFpQjtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFBRSxPQUFPO1FBRTVCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFFOUIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsQ0FBQzthQUFNLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hFLENBQUM7YUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hCLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTztnQkFDaEIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPO2dCQUNoQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLFNBQVMsRUFBRSxJQUFJLENBQUMsY0FBYzthQUMvQixDQUFDLENBQUM7UUFDTCxDQUFDO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0RixDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUV2QixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2YsSUFBSSxFQUFFLE1BQU07Z0JBQ1osRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNmLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDZixFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ2pCLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDakIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWE7Z0JBQzdCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTthQUN4QixDQUFDLENBQUM7UUFDTCxDQUFDO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNmLElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsSUFBSSxDQUFDLGVBQWU7Z0JBQzVCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDakIsU0FBUyxFQUFFLElBQUksQ0FBQyxjQUFjO2FBQy9CLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzVCLENBQUM7YUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFNO2dCQUNqQixFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ2YsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNmLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDakIsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLFNBQVMsRUFBRSxJQUFJLENBQUMsYUFBYTtnQkFDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2FBQ3hCLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxRQUFRLEdBQUcsQ0FBQyxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBRTtRQUM1RCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN4QyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDO2FBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEMsQ0FBQzthQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQixDQUFDO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQztJQUVGLFVBQVUsR0FBRyxHQUFHLEVBQUU7UUFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDNUIsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRSxDQUFDO2dCQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4RCxDQUFDO2lCQUFNLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUUsQ0FBQztnQkFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEMsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckUsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0lBRUYsWUFBWSxHQUFHLENBQUMsTUFBb0UsRUFBRSxFQUFFO1FBQ3RGLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQUUsT0FBTztRQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3BCLENBQUMsQ0FBQztJQUVGLFNBQVMsR0FBRyxDQUFDLElBQVksRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBRTtRQUMzRSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN4QyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDO2FBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEMsQ0FBQzthQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQixDQUFDO1FBQ0QsSUFBSSxJQUFJLEtBQUssV0FBVyxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNoRCxDQUFDO2FBQU0sSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDN0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNwQixDQUFDO2FBQU0sSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDOUIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sT0FBTyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3BCLENBQUM7YUFBTSxJQUFJLElBQUksS0FBSyxVQUFVLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0QyxDQUFDO2FBQU0sSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEMsQ0FBQzthQUFNLElBQUksSUFBSSxLQUFLLFVBQVUsRUFBRSxDQUFDO1lBQy9CLE1BQU0sZUFBZSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDcEIsQ0FBQzthQUFNLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDaEQsQ0FBQzthQUFNLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7YUFBTSxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUUsQ0FBQztZQUMzQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sT0FBTyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QixNQUFNLE9BQU8sR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3BCLENBQUM7YUFBTSxJQUFJLElBQUksS0FBSyxlQUFlLEVBQUUsQ0FBQztZQUNwQyxNQUFNLE9BQU8sR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0lBRUYsV0FBVyxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFFO1FBQzlFLE1BQU0sT0FBTyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixNQUFNLE9BQU8sR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRSxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxHQUFHLE9BQU8sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDL0QsTUFBTSxDQUFDLEdBQUcsT0FBTyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDWixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEIsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QixDQUFDO1FBQ0gsQ0FBQztRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNwQixDQUFDLENBQUM7SUFFRixXQUFXLEdBQUcsR0FBRyxFQUFFO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUMsQ0FBQztJQUVGLEtBQUssR0FBRyxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsRUFBRTtRQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEdBQUcsaUJBQWlCLENBQUM7UUFDdEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTTthQUN0QixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNiLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUUsQ0FBQztnQkFDOUIsT0FBTztvQkFDTCxHQUFHLEtBQUs7b0JBQ1IsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7d0JBQ3pDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2hGLE9BQU8sUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO29CQUM3QyxDQUFDLENBQUM7aUJBQ0gsQ0FBQztZQUNKLENBQUM7aUJBQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRSxDQUFDO2dCQUNqQyxJQUNFLElBQUksQ0FBQyxlQUFlLENBQ2xCLENBQUMsRUFDRCxDQUFDLEVBQ0QsS0FBSyxDQUFDLEVBQUUsRUFDUixLQUFLLENBQUMsRUFBRSxFQUNSLEtBQUssQ0FBQyxFQUFFLEVBQ1IsS0FBSyxDQUFDLEVBQUUsRUFDUixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FDekIsRUFDRCxDQUFDO29CQUNELE9BQU8sSUFBSSxDQUFDO2dCQUNkLENBQUM7WUFDSCxDQUFDO2lCQUFNLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUUsQ0FBQztnQkFDakMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDekQsSUFDRSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7b0JBQ1gsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsU0FBUztvQkFDdkIsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVE7b0JBQzVCLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUNYLENBQUM7b0JBQ0QsT0FBTyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztZQUNILENBQUM7aUJBQU0sQ0FBQztnQkFDTixJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQ2pFLE9BQU8sSUFBSSxDQUFDO2dCQUNkLENBQUM7WUFDSCxDQUFDO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLENBQUM7YUFDRCxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssVUFBVSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQyxDQUFDO0lBRUYsZUFBZSxDQUNiLEVBQVUsRUFDVixFQUFVLEVBQ1YsRUFBVSxFQUNWLEVBQVUsRUFDVixFQUFVLEVBQ1YsRUFBVSxFQUNWLFNBQWlCO1FBRWpCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDbkIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNuQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sUUFBUSxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQy9CLE1BQU0sUUFBUSxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQy9CLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsUUFBUSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BGLE9BQU8sUUFBUSxJQUFJLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBRUQsYUFBYSxHQUFHLEdBQUcsRUFBRTtRQUNuQixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QyxDQUFDLENBQUM7SUFFRixjQUFjLEdBQUcsS0FBSyxJQUFJLEVBQUU7UUFDMUIsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDO1FBQ2xFLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztRQUU3RCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDcEUsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUMxQixPQUFPLEVBQUUsOEtBQThLO2dCQUN2TCxJQUFJLEVBQUUsU0FBUztnQkFDZixRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztRQUNMLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDOUIsQ0FBQztRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEQsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsK0JBQStCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekQsQ0FBQyxDQUFDO3VHQXpmUyxXQUFXLGtCQXFEQSxhQUFhLDZCQUNiLGNBQWMsNkJBQ2QsWUFBWSw2QkFDWixZQUFZOzJGQXhEdkIsV0FBVyxzaEJDakx4QixpdVBBOEdBLCsxRERpRVksWUFBWSx1TkFBRSxpQkFBaUIsNFBBQUUsV0FBVzs7MkZBRTNDLFdBQVc7a0JBUHZCLFNBQVM7K0JBQ0UsaUJBQWlCLGNBQ2YsSUFBSSxXQUdQLENBQUMsWUFBWSxFQUFFLGlCQUFpQixFQUFFLFdBQVcsQ0FBQzs7MEJBdURwRCxRQUFROzswQkFBSSxNQUFNOzJCQUFDLGFBQWE7OzBCQUNoQyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLGNBQWM7OzBCQUNqQyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLFlBQVk7OzBCQUMvQixRQUFROzswQkFBSSxNQUFNOzJCQUFDLFlBQVk7eUNBdkR6QixXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUdOLFNBQVM7c0JBRFIsU0FBUzt1QkFBQyxXQUFXO2dCQUd0QixjQUFjO3NCQURiLFNBQVM7dUJBQUMsZ0JBQWdCO2dCQUczQixxQkFBcUI7c0JBRHBCLFNBQVM7dUJBQUMsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvbiAqL1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIEFmdGVyVmlld0luaXQsXG4gIE9uRGVzdHJveSxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPcHRpb25hbCxcbiAgSW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIGZhQ2hldnJvblJpZ2h0LFxuICBmYUNoZXZyb25MZWZ0LFxuICBmYVBlbmNpbEFsdCxcbiAgZmFQYWludEJydXNoLFxuICBmYVNoYXBlcyxcbiAgZmFFcmFzZXIsXG4gIGZhU2VhcmNoLFxuICBmYVNlYXJjaFBsdXMsXG4gIGZhU2VhcmNoTWludXMsXG4gIGZhRm9udCxcbiAgZmFUZXh0SGVpZ2h0LFxuICBmYVVuZG8sXG4gIGZhUmVkbyxcbiAgZmFTYXZlLFxuICBmYVRyYXNoLFxuICBmYVRpbWVzLFxuICBmYU1vdXNlUG9pbnRlcixcbn0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHsgU2xlZXBUeXBlLCBTaG93QWxlcnQgfSBmcm9tICcuLi8uLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNjcmVlbmJvYXJkUGFyYW1ldGVycyB7XG4gIHVwZGF0ZUNhbnZhc1NjcmVlbmJvYXJkOiAoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkgPT4gdm9pZDtcbiAgYW5ub3RhdGVTY3JlZW5TdHJlYW06IGJvb2xlYW47XG4gIHVwZGF0ZUFubm90YXRlU2NyZWVuU3RyZWFtOiAoYW5ub3RhdGVTY3JlZW5TdHJlYW06IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGU6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHNsZWVwOiBTbGVlcFR5cGU7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBTY3JlZW5ib2FyZFBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTY3JlZW5ib2FyZE9wdGlvbnMge1xuICBjdXN0b21XaWR0aDogbnVtYmVyO1xuICBjdXN0b21IZWlnaHQ6IG51bWJlcjtcbiAgcGFyYW1ldGVyczogU2NyZWVuYm9hcmRQYXJhbWV0ZXJzO1xuICBzaG93QXNwZWN0OiBib29sZWFuO1xufVxuXG5leHBvcnQgdHlwZSBTY3JlZW5ib2FyZFR5cGUgPSAob3B0aW9uczogU2NyZWVuYm9hcmRPcHRpb25zKSA9PiB2b2lkO1xuXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXcgU2NyZWVuYm9hcmQgY29tcG9uZW50IGZvciBNZWRpYVNGVS1Bbmd1bGFyIGFwcGxpY2F0aW9uLlxuICpcbiAqIFRoaXMgY29tcG9uZW50IHByb3ZpZGVzIGEgc2NyZWVuYm9hcmQgd2l0aCBkcmF3aW5nLCBmcmVlaGFuZCwgc2hhcGUsIGFuZCBlcmFzZSBtb2Rlcy5cbiAqIEl0IHN1cHBvcnRzIG1vdXNlIGFuZCB0b3VjaCBldmVudHMgZm9yIGRyYXdpbmcgb24gYSBjYW52YXMuXG4gKlxuICogQGNvbXBvbmVudFxuICogQHNlbGVjdG9yIGFwcC1zY3JlZW5ib2FyZFxuICogQHRlbXBsYXRlVXJsIC4vc2NyZWVuYm9hcmQuY29tcG9uZW50Lmh0bWxcbiAqIEBzdHlsZVVybHMgLi9zY3JlZW5ib2FyZC5jb21wb25lbnQuY3NzXG4gKiBAaW1wb3J0cyBDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlLCBGb3Jtc01vZHVsZVxuICpcbiAqIEBjbGFzcyBTY3JlZW5ib2FyZFxuICogQGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlc1xuICpcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjdXN0b21XaWR0aCAtIEN1c3RvbSB3aWR0aCBmb3IgdGhlIHNjcmVlbmJvYXJkLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGN1c3RvbUhlaWdodCAtIEN1c3RvbSBoZWlnaHQgZm9yIHRoZSBzY3JlZW5ib2FyZC5cbiAqIEBwcm9wZXJ0eSB7YW55fSBwYXJhbWV0ZXJzIC0gUGFyYW1ldGVycyBmb3IgdGhlIHNjcmVlbmJvYXJkLlxuICogQHByb3BlcnR5IHtib29sZWFufSBzaG93QXNwZWN0IC0gRmxhZyB0byBzaG93IGFzcGVjdCByYXRpby5cbiAqXG4gKiBAcHJvcGVydHkge0VsZW1lbnRSZWY8SFRNTENhbnZhc0VsZW1lbnQ+fSBjYW52YXNSZWYgLSBSZWZlcmVuY2UgdG8gdGhlIGNhbnZhcyBlbGVtZW50LlxuICogQHByb3BlcnR5IHtFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50Pn0gc2NyZWVuYm9hcmRSZWYgLSBSZWZlcmVuY2UgdG8gdGhlIHNjcmVlbmJvYXJkIGRpdiBlbGVtZW50LlxuICogQHByb3BlcnR5IHtFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50Pn0gc2NyZWVuYm9hcmRDb250ZW50UmVmIC0gUmVmZXJlbmNlIHRvIHRoZSBzY3JlZW5ib2FyZCBjb250ZW50IGRpdiBlbGVtZW50LlxuICpcbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhQ2hldnJvblJpZ2h0IC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgY2hldnJvbiByaWdodC5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhQ2hldnJvbkxlZnQgLSBGb250QXdlc29tZSBpY29uIGZvciBjaGV2cm9uIGxlZnQuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVBlbmNpbEFsdCAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHBlbmNpbC5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhUGFpbnRCcnVzaCAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHBhaW50IGJydXNoLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFTaGFwZXMgLSBGb250QXdlc29tZSBpY29uIGZvciBzaGFwZXMuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYUVyYXNlciAtIEZvbnRBd2Vzb21lIGljb24gZm9yIGVyYXNlci5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhU2VhcmNoIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3Igc2VhcmNoLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFTZWFyY2hQbHVzIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3Igc2VhcmNoIHBsdXMuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVNlYXJjaE1pbnVzIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3Igc2VhcmNoIG1pbnVzLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFGb250IC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgZm9udC5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhVGV4dEhlaWdodCAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHRleHQgaGVpZ2h0LlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFVbmRvIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgdW5kby5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhUmVkbyAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHJlZG8uXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVNhdmUgLSBGb250QXdlc29tZSBpY29uIGZvciBzYXZlLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFUcmFzaCAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHRyYXNoLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFUaW1lcyAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHRpbWVzLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFNb3VzZVBvaW50ZXIgLSBGb250QXdlc29tZSBpY29uIGZvciBtb3VzZSBwb2ludGVyLlxuICpcbiAqIEBwcm9wZXJ0eSB7J2RyYXcnIHwgJ2ZyZWVoYW5kJyB8ICdzaGFwZScgfCAnZXJhc2UnfSBtb2RlIC0gQ3VycmVudCBkcmF3aW5nIG1vZGUuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGlzRHJhd2luZyAtIEZsYWcgdG8gaW5kaWNhdGUgaWYgZHJhd2luZyBpcyBpbiBwcm9ncmVzcy5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzdGFydFggLSBTdGFydGluZyBYIGNvb3JkaW5hdGUgZm9yIGRyYXdpbmcuXG4gKiBAcHJvcGVydHkge251bWJlcn0gc3RhcnRZIC0gU3RhcnRpbmcgWSBjb29yZGluYXRlIGZvciBkcmF3aW5nLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGN1cnJlbnRYIC0gQ3VycmVudCBYIGNvb3JkaW5hdGUgZm9yIGRyYXdpbmcuXG4gKiBAcHJvcGVydHkge251bWJlcn0gY3VycmVudFkgLSBDdXJyZW50IFkgY29vcmRpbmF0ZSBmb3IgZHJhd2luZy5cbiAqIEBwcm9wZXJ0eSB7QXJyYXk8eyB4OiBudW1iZXI7IHk6IG51bWJlcjsgY29sb3I6IHN0cmluZzsgdGhpY2tuZXNzOiBudW1iZXIgfT59IGZyZWVoYW5kRHJhd2luZyAtIEFycmF5IG9mIHBvaW50cyBmb3IgZnJlZWhhbmQgZHJhd2luZy5cbiAqIEBwcm9wZXJ0eSB7YW55W119IHNoYXBlcyAtIEFycmF5IG9mIHNoYXBlcyBkcmF3biBvbiB0aGUgY2FudmFzLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGVyYXNlclRoaWNrbmVzcyAtIFRoaWNrbmVzcyBvZiB0aGUgZXJhc2VyLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGJydXNoVGhpY2tuZXNzIC0gVGhpY2tuZXNzIG9mIHRoZSBicnVzaC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsaW5lVGhpY2tuZXNzIC0gVGhpY2tuZXNzIG9mIHRoZSBsaW5lLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGxpbmVUeXBlIC0gVHlwZSBvZiB0aGUgbGluZSAoc29saWQsIGRhc2hlZCwgZG90dGVkLCBkYXNoRG90KS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjb2xvciAtIENvbG9yIGZvciBkcmF3aW5nLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGZvbnQgLSBGb250IGZvciB0ZXh0LlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGZvbnRTaXplIC0gRm9udCBzaXplIGZvciB0ZXh0LlxuICogQHByb3BlcnR5IHtzdHJpbmcgfCBudWxsfSBzaGFwZSAtIEN1cnJlbnQgc2hhcGUgYmVpbmcgZHJhd24uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHRvb2xiYXJWaXNpYmxlIC0gRmxhZyB0byBpbmRpY2F0ZSBpZiB0aGUgdG9vbGJhciBpcyB2aXNpYmxlLlxuICogQHByb3BlcnR5IHtzdHJpbmcgfCBudWxsfSBkcm9wZG93bk9wZW4gLSBJRCBvZiB0aGUgY3VycmVudGx5IG9wZW4gZHJvcGRvd24uXG4gKiBAcHJvcGVydHkge0hUTUxDYW52YXNFbGVtZW50fSBjYW52YXMgLSBDYW52YXMgZWxlbWVudC5cbiAqIEBwcm9wZXJ0eSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjdHggLSBDYW52YXMgcmVuZGVyaW5nIGNvbnRleHQuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge251bWJlcn0gW2luamVjdGVkQ3VzdG9tV2lkdGhdIC0gSW5qZWN0ZWQgY3VzdG9tIHdpZHRoLlxuICogQHBhcmFtIHtudW1iZXJ9IFtpbmplY3RlZEN1c3RvbUhlaWdodF0gLSBJbmplY3RlZCBjdXN0b20gaGVpZ2h0LlxuICogQHBhcmFtIHthbnl9IFtpbmplY3RlZFBhcmFtZXRlcnNdIC0gSW5qZWN0ZWQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luamVjdGVkU2hvd0FzcGVjdF0gLSBJbmplY3RlZCBzaG93IGFzcGVjdCBmbGFnLlxuICpcbiAqIEBtZXRob2QgbmdPbkluaXQgLSBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciBkYXRhLWJvdW5kIHByb3BlcnRpZXMgYXJlIGluaXRpYWxpemVkLlxuICogQG1ldGhvZCBuZ09uQ2hhbmdlcyAtIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIHdoZW4gYW55IGRhdGEtYm91bmQgcHJvcGVydHkgY2hhbmdlcy5cbiAqIEBtZXRob2QgbmdBZnRlclZpZXdJbml0IC0gTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgdGhlIGNvbXBvbmVudCdzIHZpZXcgaGFzIGJlZW4gZnVsbHkgaW5pdGlhbGl6ZWQuXG4gKiBAbWV0aG9kIG5nT25EZXN0cm95IC0gTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQganVzdCBiZWZvcmUgdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuXG4gKlxuICogQG1ldGhvZCBhZGRMaXN0ZW5lcnMgLSBBZGRzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgY2FudmFzLlxuICogQG1ldGhvZCBoYW5kbGVNb3VzZURvd24gLSBIYW5kbGVzIG1vdXNlIGRvd24gZXZlbnRzLlxuICogQG1ldGhvZCBoYW5kbGVNb3VzZU1vdmUgLSBIYW5kbGVzIG1vdXNlIG1vdmUgZXZlbnRzLlxuICogQG1ldGhvZCBoYW5kbGVNb3VzZVVwIC0gSGFuZGxlcyBtb3VzZSB1cCBldmVudHMuXG4gKiBAbWV0aG9kIGhhbmRsZVRvdWNoU3RhcnQgLSBIYW5kbGVzIHRvdWNoIHN0YXJ0IGV2ZW50cy5cbiAqIEBtZXRob2QgaGFuZGxlVG91Y2hNb3ZlIC0gSGFuZGxlcyB0b3VjaCBtb3ZlIGV2ZW50cy5cbiAqIEBtZXRob2QgaGFuZGxlVG91Y2hFbmQgLSBIYW5kbGVzIHRvdWNoIGVuZCBldmVudHMuXG4gKiBAbWV0aG9kIGhhbmRsZUNsaWNrT3V0c2lkZSAtIEhhbmRsZXMgY2xpY2sgZXZlbnRzIG91dHNpZGUgdGhlIGNvbXBvbmVudC5cbiAqIEBtZXRob2QgaGFuZGxlRHJvcGRvd25DbGljayAtIEhhbmRsZXMgZHJvcGRvd24gY2xpY2sgZXZlbnRzLlxuICogQG1ldGhvZCBzZXREcmF3TW9kZSAtIFNldHMgdGhlIGRyYXdpbmcgbW9kZS5cbiAqIEBtZXRob2Qgc2V0RnJlZWhhbmRNb2RlIC0gU2V0cyB0aGUgZnJlZWhhbmQgbW9kZS5cbiAqIEBtZXRob2Qgc2V0U2hhcGVNb2RlIC0gU2V0cyB0aGUgc2hhcGUgbW9kZS5cbiAqIEBtZXRob2Qgc2V0RXJhc2VNb2RlIC0gU2V0cyB0aGUgZXJhc2UgbW9kZS5cbiAqIEBtZXRob2Qgc3RhcnREcmF3aW5nIC0gU3RhcnRzIHRoZSBkcmF3aW5nIHByb2Nlc3MuXG4gKiBAbWV0aG9kIGRyYXcgLSBEcmF3cyBvbiB0aGUgY2FudmFzLlxuICogQG1ldGhvZCBzdG9wRHJhd2luZyAtIFN0b3BzIHRoZSBkcmF3aW5nIHByb2Nlc3MuXG4gKiBAbWV0aG9kIGRyYXdMaW5lIC0gRHJhd3MgYSBsaW5lIG9uIHRoZSBjYW52YXMuXG4gKiBAbWV0aG9kIGRyYXdTaGFwZXMgLSBEcmF3cyBhbGwgc2hhcGVzIG9uIHRoZSBjYW52YXMuXG4gKiBAbWV0aG9kIGRyYXdGcmVlaGFuZCAtIERyYXdzIGZyZWVoYW5kIG9uIHRoZSBjYW52YXMuXG4gKiBAbWV0aG9kIGRyYXdTaGFwZSAtIERyYXdzIGEgc2hhcGUgb24gdGhlIGNhbnZhcy5cbiAqIEBtZXRob2QgZHJhd1BvbHlnb24gLSBEcmF3cyBhIHBvbHlnb24gb24gdGhlIGNhbnZhcy5cbiAqIEBtZXRob2QgcmVtb3ZlU2hhcGUgLSBSZW1vdmVzIHRoZSBmaXJzdCBzaGFwZSBmcm9tIHRoZSBzaGFwZXMgYXJyYXkuXG4gKiBAbWV0aG9kIGVyYXNlIC0gRXJhc2VzIHBhcnQgb2YgdGhlIGRyYXdpbmcuXG4gKiBAbWV0aG9kIGlzUG9pbnROZWFyTGluZSAtIENoZWNrcyBpZiBhIHBvaW50IGlzIG5lYXIgYSBsaW5lLlxuICogQG1ldGhvZCB0b2dnbGVUb29sYmFyIC0gVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgdG9vbGJhci5cbiAqIEBtZXRob2QgdG9nZ2xlQW5ub3RhdGUgLSBUb2dnbGVzIHRoZSBhbm5vdGF0aW9uIG1vZGUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGh0bWxcbiAqIDxhcHAtc2NyZWVuYm9hcmRcbiAqICBbY3VzdG9tV2lkdGhdPVwiY3VzdG9tV2lkdGhcIlxuICogW2N1c3RvbUhlaWdodF09XCJjdXN0b21IZWlnaHRcIlxuICogW3BhcmFtZXRlcnNdPVwic2NyZWVuYm9hcmRQYXJhbWV0ZXJzXCJcbiAqIFtzaG93QXNwZWN0XT1cInNob3dBc3BlY3RcIlxuICogPjwvYXBwLXNjcmVlbmJvYXJkPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1zY3JlZW5ib2FyZCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHRlbXBsYXRlVXJsOiAnLi9zY3JlZW5ib2FyZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NjcmVlbmJvYXJkLmNvbXBvbmVudC5jc3MnXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGUsIEZvcm1zTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgU2NyZWVuYm9hcmQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgY3VzdG9tV2lkdGghOiBudW1iZXI7XG4gIEBJbnB1dCgpIGN1c3RvbUhlaWdodCE6IG51bWJlcjtcbiAgQElucHV0KCkgcGFyYW1ldGVyczogU2NyZWVuYm9hcmRQYXJhbWV0ZXJzID0ge30gYXMgU2NyZWVuYm9hcmRQYXJhbWV0ZXJzO1xuICBASW5wdXQoKSBzaG93QXNwZWN0ITogYm9vbGVhbjtcblxuICBAVmlld0NoaWxkKCdjYW52YXNSZWYnKVxuICBjYW52YXNSZWYhOiBFbGVtZW50UmVmPEhUTUxDYW52YXNFbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgnc2NyZWVuYm9hcmRSZWYnKVxuICBzY3JlZW5ib2FyZFJlZiE6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCdzY3JlZW5ib2FyZENvbnRlbnRSZWYnKVxuICBzY3JlZW5ib2FyZENvbnRlbnRSZWYhOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PjtcblxuICBmYUNoZXZyb25SaWdodCA9IGZhQ2hldnJvblJpZ2h0O1xuICBmYUNoZXZyb25MZWZ0ID0gZmFDaGV2cm9uTGVmdDtcbiAgZmFQZW5jaWxBbHQgPSBmYVBlbmNpbEFsdDtcbiAgZmFQYWludEJydXNoID0gZmFQYWludEJydXNoO1xuICBmYVNoYXBlcyA9IGZhU2hhcGVzO1xuICBmYUVyYXNlciA9IGZhRXJhc2VyO1xuICBmYVNlYXJjaCA9IGZhU2VhcmNoO1xuICBmYVNlYXJjaFBsdXMgPSBmYVNlYXJjaFBsdXM7XG4gIGZhU2VhcmNoTWludXMgPSBmYVNlYXJjaE1pbnVzO1xuICBmYUZvbnQgPSBmYUZvbnQ7XG4gIGZhVGV4dEhlaWdodCA9IGZhVGV4dEhlaWdodDtcbiAgZmFVbmRvID0gZmFVbmRvO1xuICBmYVJlZG8gPSBmYVJlZG87XG4gIGZhU2F2ZSA9IGZhU2F2ZTtcbiAgZmFUcmFzaCA9IGZhVHJhc2g7XG4gIGZhVGltZXMgPSBmYVRpbWVzO1xuICBmYU1vdXNlUG9pbnRlciA9IGZhTW91c2VQb2ludGVyO1xuXG4gIG1vZGU6ICdkcmF3JyB8ICdmcmVlaGFuZCcgfCAnc2hhcGUnIHwgJ2VyYXNlJyA9ICdkcmF3JztcbiAgaXNEcmF3aW5nID0gZmFsc2U7XG4gIHN0YXJ0WCA9IDA7XG4gIHN0YXJ0WSA9IDA7XG4gIGN1cnJlbnRYID0gMDtcbiAgY3VycmVudFkgPSAwO1xuICBmcmVlaGFuZERyYXdpbmc6IHsgeDogbnVtYmVyOyB5OiBudW1iZXI7IGNvbG9yOiBzdHJpbmc7IHRoaWNrbmVzczogbnVtYmVyIH1bXSA9IFtdO1xuICBzaGFwZXM6IGFueVtdID0gW107XG4gIGVyYXNlclRoaWNrbmVzcyA9IDEwO1xuICBicnVzaFRoaWNrbmVzcyA9IDY7XG4gIGxpbmVUaGlja25lc3MgPSA2O1xuICBsaW5lVHlwZSA9ICdzb2xpZCc7XG4gIGNvbG9yID0gJyMwMDAwMDAnO1xuICBmb250ID0gJ0FyaWFsJztcbiAgZm9udFNpemUgPSAyMDtcbiAgc2hhcGU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICB0b29sYmFyVmlzaWJsZSA9IGZhbHNlO1xuICBkcm9wZG93bk9wZW46IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBjYW52YXMhOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgY3R4ITogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2N1c3RvbVdpZHRoJykgaW5qZWN0ZWRDdXN0b21XaWR0aDogbnVtYmVyLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2N1c3RvbUhlaWdodCcpIGluamVjdGVkQ3VzdG9tSGVpZ2h0OiBudW1iZXIsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgncGFyYW1ldGVycycpIGluamVjdGVkUGFyYW1ldGVyczogYW55LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3Nob3dBc3BlY3QnKSBpbmplY3RlZFNob3dBc3BlY3Q6IGJvb2xlYW4sXG4gICkge1xuICAgIHRoaXMuY3VzdG9tV2lkdGggPSBpbmplY3RlZEN1c3RvbVdpZHRoIHx8IHRoaXMuY3VzdG9tV2lkdGggfHwgMDtcbiAgICB0aGlzLmN1c3RvbUhlaWdodCA9IGluamVjdGVkQ3VzdG9tSGVpZ2h0IHx8IHRoaXMuY3VzdG9tSGVpZ2h0IHx8IDA7XG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gaW5qZWN0ZWRQYXJhbWV0ZXJzIHx8IHRoaXMucGFyYW1ldGVycyB8fCB7fTtcbiAgICB0aGlzLnNob3dBc3BlY3QgPSBpbmplY3RlZFNob3dBc3BlY3QgfHwgdGhpcy5zaG93QXNwZWN0IHx8IGZhbHNlO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5wYXJhbWV0ZXJzKSB7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycyA9IHRoaXMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG4gICAgICB9XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlc1snc2hvd0FzcGVjdCddKSB7XG4gICAgICBpZiAoIXRoaXMuY2FudmFzICYmIHRoaXMuY2FudmFzUmVmKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gdGhpcy5jYW52YXNSZWYhLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXJzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNhbnZhc1JlZiAmJiAhdGhpcy5jYW52YXMpIHtcbiAgICAgIHRoaXMuY2FudmFzID0gdGhpcy5jYW52YXNSZWYhLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICB0aGlzLmFkZExpc3RlbmVycygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNhbnZhcykge1xuICAgICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVNb3VzZURvd24uYmluZCh0aGlzKSk7XG4gICAgICB0aGlzLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZU1vdXNlTW92ZS5iaW5kKHRoaXMpKTtcbiAgICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXAuYmluZCh0aGlzKSk7XG4gICAgICB0aGlzLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIHRoaXMuaGFuZGxlTW91c2VVcC5iaW5kKHRoaXMpKTtcblxuICAgICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hTdGFydC5iaW5kKHRoaXMpKTtcbiAgICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlVG91Y2hNb3ZlLmJpbmQodGhpcykpO1xuICAgICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmhhbmRsZVRvdWNoRW5kLmJpbmQodGhpcykpO1xuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZUNsaWNrT3V0c2lkZS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gIH1cblxuICBhZGRMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuY2FudmFzKSB7XG4gICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJykhO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZUNhbnZhc1NjcmVlbmJvYXJkKHRoaXMuY2FudmFzKTtcblxuICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVNb3VzZURvd24uYmluZCh0aGlzKSk7XG4gICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZU1vdXNlTW92ZS5iaW5kKHRoaXMpKTtcbiAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXAuYmluZCh0aGlzKSk7XG4gICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIHRoaXMuaGFuZGxlTW91c2VVcC5iaW5kKHRoaXMpKTtcblxuICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hTdGFydC5iaW5kKHRoaXMpKTtcbiAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlVG91Y2hNb3ZlLmJpbmQodGhpcykpO1xuICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmhhbmRsZVRvdWNoRW5kLmJpbmQodGhpcykpO1xuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZUNsaWNrT3V0c2lkZS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlTW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5zdGFydERyYXdpbmcoZXZlbnQpO1xuICB9XG5cbiAgaGFuZGxlTW91c2VNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5kcmF3KGV2ZW50KTtcbiAgfVxuXG4gIGhhbmRsZU1vdXNlVXAoKSB7XG4gICAgdGhpcy5zdG9wRHJhd2luZygpO1xuICB9XG5cbiAgaGFuZGxlVG91Y2hTdGFydChlOiBUb3VjaEV2ZW50KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHRvdWNoID0gZS50b3VjaGVzWzBdO1xuICAgIGNvbnN0IG1vdXNlRXZlbnQgPSBuZXcgTW91c2VFdmVudCgnbW91c2Vkb3duJywge1xuICAgICAgY2xpZW50WDogdG91Y2guY2xpZW50WCxcbiAgICAgIGNsaWVudFk6IHRvdWNoLmNsaWVudFksXG4gICAgfSk7XG4gICAgdGhpcy5jYW52YXMuZGlzcGF0Y2hFdmVudChtb3VzZUV2ZW50KTtcbiAgfVxuXG4gIGhhbmRsZVRvdWNoTW92ZShlOiBUb3VjaEV2ZW50KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHRvdWNoID0gZS50b3VjaGVzWzBdO1xuICAgIGNvbnN0IG1vdXNlRXZlbnQgPSBuZXcgTW91c2VFdmVudCgnbW91c2Vtb3ZlJywge1xuICAgICAgY2xpZW50WDogdG91Y2guY2xpZW50WCxcbiAgICAgIGNsaWVudFk6IHRvdWNoLmNsaWVudFksXG4gICAgfSk7XG4gICAgdGhpcy5jYW52YXMuZGlzcGF0Y2hFdmVudChtb3VzZUV2ZW50KTtcbiAgfVxuXG4gIGhhbmRsZVRvdWNoRW5kKGU6IFRvdWNoRXZlbnQpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgbW91c2VFdmVudCA9IG5ldyBNb3VzZUV2ZW50KCdtb3VzZXVwJywge30pO1xuICAgIHRoaXMuY2FudmFzLmRpc3BhdGNoRXZlbnQobW91c2VFdmVudCk7XG4gIH1cblxuICBoYW5kbGVDbGlja091dHNpZGUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAodGhpcy5kcm9wZG93bk9wZW4gJiYgIShldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmNsb3Nlc3QoJy5idG4tZ3JvdXAnKSkge1xuICAgICAgdGhpcy5kcm9wZG93bk9wZW4gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZURyb3Bkb3duQ2xpY2soaWQ6IHN0cmluZykge1xuICAgIHRoaXMuZHJvcGRvd25PcGVuID0gdGhpcy5kcm9wZG93bk9wZW4gPT09IGlkID8gbnVsbCA6IGlkO1xuICB9XG5cbiAgc2V0RHJhd01vZGUodGhpY2tuZXNzOiBudW1iZXIpIHtcbiAgICB0aGlzLmxpbmVUaGlja25lc3MgPSB0aGlja25lc3M7XG4gICAgdGhpcy5tb2RlID0gJ2RyYXcnO1xuICAgIHRoaXMuZHJvcGRvd25PcGVuID0gbnVsbDtcbiAgfVxuXG4gIHNldEZyZWVoYW5kTW9kZSh0aGlja25lc3M6IG51bWJlcikge1xuICAgIHRoaXMuYnJ1c2hUaGlja25lc3MgPSB0aGlja25lc3M7XG4gICAgdGhpcy5tb2RlID0gJ2ZyZWVoYW5kJztcbiAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IG51bGw7XG4gIH1cblxuICBzZXRTaGFwZU1vZGUoc2hhcGU6IHN0cmluZykge1xuICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcbiAgICB0aGlzLm1vZGUgPSAnc2hhcGUnO1xuICAgIHRoaXMuZHJvcGRvd25PcGVuID0gbnVsbDtcbiAgfVxuXG4gIHNldEVyYXNlTW9kZSh0aGlja25lc3M6IG51bWJlcikge1xuICAgIHRoaXMuZXJhc2VyVGhpY2tuZXNzID0gdGhpY2tuZXNzO1xuICAgIHRoaXMubW9kZSA9ICdlcmFzZSc7XG4gICAgdGhpcy5kcm9wZG93bk9wZW4gPSBudWxsO1xuICB9XG5cbiAgc3RhcnREcmF3aW5nKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5pc0RyYXdpbmcgPSB0cnVlO1xuICAgIHRoaXMuc3RhcnRYID0gZXZlbnQub2Zmc2V0WDtcbiAgICB0aGlzLnN0YXJ0WSA9IGV2ZW50Lm9mZnNldFk7XG5cbiAgICBpZiAodGhpcy5tb2RlID09PSAnZXJhc2UnKSB7XG4gICAgICB0aGlzLmVyYXNlKGV2ZW50Lm9mZnNldFgsIGV2ZW50Lm9mZnNldFkpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlID09PSAnZHJhdycgfHwgdGhpcy5tb2RlID09PSAnZnJlZWhhbmQnKSB7XG4gICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgIHRoaXMuY3R4Lm1vdmVUbyhldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZKTtcbiAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdmcmVlaGFuZCcpIHtcbiAgICAgICAgdGhpcy5mcmVlaGFuZERyYXdpbmcgPSBbXG4gICAgICAgICAgeyB4OiBldmVudC5vZmZzZXRYLCB5OiBldmVudC5vZmZzZXRZLCBjb2xvcjogdGhpcy5jb2xvciwgdGhpY2tuZXNzOiB0aGlzLmJydXNoVGhpY2tuZXNzIH0sXG4gICAgICAgIF07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZHJhdyhldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICghdGhpcy5pc0RyYXdpbmcpIHJldHVybjtcblxuICAgIHRoaXMuY3VycmVudFggPSBldmVudC5vZmZzZXRYO1xuICAgIHRoaXMuY3VycmVudFkgPSBldmVudC5vZmZzZXRZO1xuXG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ2VyYXNlJykge1xuICAgICAgdGhpcy5lcmFzZShldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gJ2RyYXcnKSB7XG4gICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgICB0aGlzLmRyYXdTaGFwZXMoKTtcbiAgICAgIHRoaXMuZHJhd0xpbmUodGhpcy5zdGFydFgsIHRoaXMuc3RhcnRZLCBldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gJ2ZyZWVoYW5kJykge1xuICAgICAgdGhpcy5jdHgubGluZVRvKGV2ZW50Lm9mZnNldFgsIGV2ZW50Lm9mZnNldFkpO1xuICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gdGhpcy5icnVzaFRoaWNrbmVzcztcbiAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgICAgdGhpcy5mcmVlaGFuZERyYXdpbmcucHVzaCh7XG4gICAgICAgIHg6IGV2ZW50Lm9mZnNldFgsXG4gICAgICAgIHk6IGV2ZW50Lm9mZnNldFksXG4gICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yLFxuICAgICAgICB0aGlja25lc3M6IHRoaXMuYnJ1c2hUaGlja25lc3MsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gJ3NoYXBlJykge1xuICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gICAgICB0aGlzLmRyYXdTaGFwZSh0aGlzLnNoYXBlISwgdGhpcy5zdGFydFgsIHRoaXMuc3RhcnRZLCBldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZKTtcbiAgICB9XG4gIH1cblxuICBzdG9wRHJhd2luZygpIHtcbiAgICB0aGlzLmlzRHJhd2luZyA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ2RyYXcnKSB7XG4gICAgICB0aGlzLnNoYXBlcy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICB4MTogdGhpcy5zdGFydFgsXG4gICAgICAgIHkxOiB0aGlzLnN0YXJ0WSxcbiAgICAgICAgeDI6IHRoaXMuY3VycmVudFgsXG4gICAgICAgIHkyOiB0aGlzLmN1cnJlbnRZLFxuICAgICAgICBjb2xvcjogdGhpcy5jb2xvcixcbiAgICAgICAgdGhpY2tuZXNzOiB0aGlzLmxpbmVUaGlja25lc3MsXG4gICAgICAgIGxpbmVUeXBlOiB0aGlzLmxpbmVUeXBlLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm1vZGUgPT09ICdmcmVlaGFuZCcpIHtcbiAgICAgIHRoaXMuc2hhcGVzLnB1c2goe1xuICAgICAgICB0eXBlOiAnZnJlZWhhbmQnLFxuICAgICAgICBwb2ludHM6IHRoaXMuZnJlZWhhbmREcmF3aW5nLFxuICAgICAgICBjb2xvcjogdGhpcy5jb2xvcixcbiAgICAgICAgdGhpY2tuZXNzOiB0aGlzLmJydXNoVGhpY2tuZXNzLFxuICAgICAgfSk7XG4gICAgICB0aGlzLmZyZWVoYW5kRHJhd2luZyA9IFtdO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlID09PSAnc2hhcGUnKSB7XG4gICAgICB0aGlzLnNoYXBlcy5wdXNoKHtcbiAgICAgICAgdHlwZTogdGhpcy5zaGFwZSEsXG4gICAgICAgIHgxOiB0aGlzLnN0YXJ0WCxcbiAgICAgICAgeTE6IHRoaXMuc3RhcnRZLFxuICAgICAgICB4MjogdGhpcy5jdXJyZW50WCxcbiAgICAgICAgeTI6IHRoaXMuY3VycmVudFksXG4gICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yLFxuICAgICAgICB0aGlja25lc3M6IHRoaXMubGluZVRoaWNrbmVzcyxcbiAgICAgICAgbGluZVR5cGU6IHRoaXMubGluZVR5cGUsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVtb3ZlU2hhcGUoKSwgMTUwMDApO1xuICB9XG5cbiAgZHJhd0xpbmUgPSAoeDE6IG51bWJlciwgeTE6IG51bWJlciwgeDI6IG51bWJlciwgeTI6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICB0aGlzLmN0eC5saW5lV2lkdGggPSB0aGlzLmxpbmVUaGlja25lc3M7XG4gICAgaWYgKHRoaXMubGluZVR5cGUgPT09ICdkYXNoZWQnKSB7XG4gICAgICB0aGlzLmN0eC5zZXRMaW5lRGFzaChbMTAsIDEwXSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxpbmVUeXBlID09PSAnZG90dGVkJykge1xuICAgICAgdGhpcy5jdHguc2V0TGluZURhc2goWzIsIDEwXSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxpbmVUeXBlID09PSAnZGFzaERvdCcpIHtcbiAgICAgIHRoaXMuY3R4LnNldExpbmVEYXNoKFsxMCwgNSwgMiwgNV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN0eC5zZXRMaW5lRGFzaChbXSk7XG4gICAgfVxuICAgIHRoaXMuY3R4Lm1vdmVUbyh4MSwgeTEpO1xuICAgIHRoaXMuY3R4LmxpbmVUbyh4MiwgeTIpO1xuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgIHRoaXMuY3R4LnNldExpbmVEYXNoKFtdKTtcbiAgfTtcblxuICBkcmF3U2hhcGVzID0gKCkgPT4ge1xuICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICB0aGlzLnNoYXBlcy5mb3JFYWNoKChzaGFwZSkgPT4ge1xuICAgICAgaWYgKHNoYXBlLnR5cGUgPT09ICdsaW5lJykge1xuICAgICAgICB0aGlzLmRyYXdMaW5lKHNoYXBlLngxLCBzaGFwZS55MSwgc2hhcGUueDIsIHNoYXBlLnkyKTtcbiAgICAgIH0gZWxzZSBpZiAoc2hhcGUudHlwZSA9PT0gJ2ZyZWVoYW5kJykge1xuICAgICAgICB0aGlzLmRyYXdGcmVlaGFuZChzaGFwZS5wb2ludHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kcmF3U2hhcGUoc2hhcGUudHlwZSwgc2hhcGUueDEsIHNoYXBlLnkxLCBzaGFwZS54Miwgc2hhcGUueTIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGRyYXdGcmVlaGFuZCA9IChwb2ludHM6IHsgeDogbnVtYmVyOyB5OiBudW1iZXI7IGNvbG9yOiBzdHJpbmc7IHRoaWNrbmVzczogbnVtYmVyIH1bXSkgPT4ge1xuICAgIGlmIChwb2ludHMubGVuZ3RoIDwgMikgcmV0dXJuO1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICB0aGlzLmN0eC5saW5lV2lkdGggPSB0aGlzLmJydXNoVGhpY2tuZXNzO1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4Lm1vdmVUbyhwb2ludHNbMF0ueCwgcG9pbnRzWzBdLnkpO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmN0eC5saW5lVG8ocG9pbnRzW2ldLngsIHBvaW50c1tpXS55KTtcbiAgICB9XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gIH07XG5cbiAgZHJhd1NoYXBlID0gKHR5cGU6IHN0cmluZywgeDE6IG51bWJlciwgeTE6IG51bWJlciwgeDI6IG51bWJlciwgeTI6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICB0aGlzLmN0eC5saW5lV2lkdGggPSB0aGlzLmxpbmVUaGlja25lc3M7XG4gICAgaWYgKHRoaXMubGluZVR5cGUgPT09ICdkYXNoZWQnKSB7XG4gICAgICB0aGlzLmN0eC5zZXRMaW5lRGFzaChbMTAsIDEwXSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxpbmVUeXBlID09PSAnZG90dGVkJykge1xuICAgICAgdGhpcy5jdHguc2V0TGluZURhc2goWzIsIDEwXSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxpbmVUeXBlID09PSAnZGFzaERvdCcpIHtcbiAgICAgIHRoaXMuY3R4LnNldExpbmVEYXNoKFsxMCwgNSwgMiwgNV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN0eC5zZXRMaW5lRGFzaChbXSk7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAncmVjdGFuZ2xlJykge1xuICAgICAgdGhpcy5jdHguc3Ryb2tlUmVjdCh4MSwgeTEsIHgyIC0geDEsIHkyIC0geTEpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2NpcmNsZScpIHtcbiAgICAgIGNvbnN0IHJhZGl1cyA9IE1hdGguc3FydChNYXRoLnBvdyh4MiAtIHgxLCAyKSArIE1hdGgucG93KHkyIC0geTEsIDIpKTtcbiAgICAgIHRoaXMuY3R4LmFyYyh4MSwgeTEsIHJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAncmhvbWJ1cycpIHtcbiAgICAgIGNvbnN0IGNlbnRlclggPSAoeDEgKyB4MikgLyAyO1xuICAgICAgY29uc3QgY2VudGVyWSA9ICh5MSArIHkyKSAvIDI7XG4gICAgICB0aGlzLmN0eC5tb3ZlVG8oY2VudGVyWCwgeTEpO1xuICAgICAgdGhpcy5jdHgubGluZVRvKHgyLCBjZW50ZXJZKTtcbiAgICAgIHRoaXMuY3R4LmxpbmVUbyhjZW50ZXJYLCB5Mik7XG4gICAgICB0aGlzLmN0eC5saW5lVG8oeDEsIGNlbnRlclkpO1xuICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdwZW50YWdvbicpIHtcbiAgICAgIHRoaXMuZHJhd1BvbHlnb24oNSwgeDEsIHkxLCB4MiwgeTIpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2hleGFnb24nKSB7XG4gICAgICB0aGlzLmRyYXdQb2x5Z29uKDYsIHgxLCB5MSwgeDIsIHkyKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd0cmlhbmdsZScpIHtcbiAgICAgIGNvbnN0IGNlbnRlclhUcmlhbmdsZSA9ICh4MSArIHgyKSAvIDI7XG4gICAgICB0aGlzLmN0eC5tb3ZlVG8oY2VudGVyWFRyaWFuZ2xlLCB5MSk7XG4gICAgICB0aGlzLmN0eC5saW5lVG8oeDIsIHkyKTtcbiAgICAgIHRoaXMuY3R4LmxpbmVUbyh4MSwgeTIpO1xuICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzcXVhcmUnKSB7XG4gICAgICB0aGlzLmN0eC5zdHJva2VSZWN0KHgxLCB5MSwgeDIgLSB4MSwgeDIgLSB4MSk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2N0YWdvbicpIHtcbiAgICAgIHRoaXMuZHJhd1BvbHlnb24oOCwgeDEsIHkxLCB4MiwgeTIpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ292YWwnKSB7XG4gICAgICBjb25zdCByYWRpdXNYID0gTWF0aC5hYnMoeDIgLSB4MSkgLyAyO1xuICAgICAgY29uc3QgcmFkaXVzWSA9IE1hdGguYWJzKHkyIC0geTEpIC8gMjtcbiAgICAgIGNvbnN0IGNlbnRlclggPSAoeDEgKyB4MikgLyAyO1xuICAgICAgY29uc3QgY2VudGVyWSA9ICh5MSArIHkyKSAvIDI7XG4gICAgICB0aGlzLmN0eC5lbGxpcHNlKGNlbnRlclgsIGNlbnRlclksIHJhZGl1c1gsIHJhZGl1c1ksIDAsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3BhcmFsbGVsb2dyYW0nKSB7XG4gICAgICBjb25zdCBjZW50ZXJYID0gKHgxICsgeDIpIC8gMjtcbiAgICAgIHRoaXMuY3R4Lm1vdmVUbyhjZW50ZXJYLCB5MSk7XG4gICAgICB0aGlzLmN0eC5saW5lVG8oeDIsIHkyKTtcbiAgICAgIHRoaXMuY3R4LmxpbmVUbyhjZW50ZXJYLCB5Mik7XG4gICAgICB0aGlzLmN0eC5saW5lVG8oeDEsIHkxKTtcbiAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgfVxuICAgIHRoaXMuY3R4LnNldExpbmVEYXNoKFtdKTtcbiAgfTtcblxuICBkcmF3UG9seWdvbiA9IChzaWRlczogbnVtYmVyLCB4MTogbnVtYmVyLCB5MTogbnVtYmVyLCB4MjogbnVtYmVyLCB5MjogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgY2VudGVyWCA9ICh4MSArIHgyKSAvIDI7XG4gICAgY29uc3QgY2VudGVyWSA9ICh5MSArIHkyKSAvIDI7XG4gICAgY29uc3QgcmFkaXVzID0gTWF0aC5taW4oTWF0aC5hYnMoeDIgLSB4MSksIE1hdGguYWJzKHkyIC0geTEpKSAvIDI7XG4gICAgY29uc3QgYW5nbGUgPSAoMiAqIE1hdGguUEkpIC8gc2lkZXM7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaWRlczsgaSsrKSB7XG4gICAgICBjb25zdCB4ID0gY2VudGVyWCArIHJhZGl1cyAqIE1hdGguY29zKGkgKiBhbmdsZSAtIE1hdGguUEkgLyAyKTtcbiAgICAgIGNvbnN0IHkgPSBjZW50ZXJZICsgcmFkaXVzICogTWF0aC5zaW4oaSAqIGFuZ2xlIC0gTWF0aC5QSSAvIDIpO1xuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgdGhpcy5jdHgubW92ZVRvKHgsIHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jdHgubGluZVRvKHgsIHkpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgfTtcblxuICByZW1vdmVTaGFwZSA9ICgpID0+IHtcbiAgICB0aGlzLnNoYXBlcy5zaGlmdCgpO1xuICAgIHRoaXMuZHJhd1NoYXBlcygpO1xuICB9O1xuXG4gIGVyYXNlID0gKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgIHRoaXMuY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdkZXN0aW5hdGlvbi1vdXQnO1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4LmFyYyh4LCB5LCB0aGlzLmVyYXNlclRoaWNrbmVzcyAvIDIsIDAsIE1hdGguUEkgKiAyLCBmYWxzZSk7XG4gICAgdGhpcy5jdHguZmlsbCgpO1xuICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcblxuICAgIHRoaXMuc2hhcGVzID0gdGhpcy5zaGFwZXNcbiAgICAgIC5tYXAoKHNoYXBlKSA9PiB7XG4gICAgICAgIGlmIChzaGFwZS50eXBlID09PSAnZnJlZWhhbmQnKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnNoYXBlLFxuICAgICAgICAgICAgcG9pbnRzOiBzaGFwZS5wb2ludHMuZmlsdGVyKChwb2ludDogYW55KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50LnggLSB4LCAyKSArIE1hdGgucG93KHBvaW50LnkgLSB5LCAyKSk7XG4gICAgICAgICAgICAgIHJldHVybiBkaXN0YW5jZSA+IHRoaXMuZXJhc2VyVGhpY2tuZXNzIC8gMjtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoc2hhcGUudHlwZSA9PT0gJ2xpbmUnKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5pc1BvaW50TmVhckxpbmUoXG4gICAgICAgICAgICAgIHgsXG4gICAgICAgICAgICAgIHksXG4gICAgICAgICAgICAgIHNoYXBlLngxLFxuICAgICAgICAgICAgICBzaGFwZS55MSxcbiAgICAgICAgICAgICAgc2hhcGUueDIsXG4gICAgICAgICAgICAgIHNoYXBlLnkyLFxuICAgICAgICAgICAgICB0aGlzLmVyYXNlclRoaWNrbmVzcyAvIDIsXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc2hhcGUudHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgY29uc3QgdGV4dFdpZHRoID0gdGhpcy5jdHgubWVhc3VyZVRleHQoc2hhcGUudGV4dCkud2lkdGg7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgeCA+IHNoYXBlLnggJiZcbiAgICAgICAgICAgIHggPCBzaGFwZS54ICsgdGV4dFdpZHRoICYmXG4gICAgICAgICAgICB5ID4gc2hhcGUueSAtIHNoYXBlLmZvbnRTaXplICYmXG4gICAgICAgICAgICB5IDwgc2hhcGUueVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh4ID4gc2hhcGUueDEgJiYgeCA8IHNoYXBlLngyICYmIHkgPiBzaGFwZS55MSAmJiB5IDwgc2hhcGUueTIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2hhcGU7XG4gICAgICB9KVxuICAgICAgLmZpbHRlcigoc2hhcGUpID0+IHNoYXBlICYmIChzaGFwZS50eXBlICE9PSAnZnJlZWhhbmQnIHx8IHNoYXBlLnBvaW50cy5sZW5ndGggPiAwKSk7XG4gIH07XG5cbiAgaXNQb2ludE5lYXJMaW5lKFxuICAgIHB4OiBudW1iZXIsXG4gICAgcHk6IG51bWJlcixcbiAgICB4MTogbnVtYmVyLFxuICAgIHkxOiBudW1iZXIsXG4gICAgeDI6IG51bWJlcixcbiAgICB5MjogbnVtYmVyLFxuICAgIHRocmVzaG9sZDogbnVtYmVyLFxuICApOiBib29sZWFuIHtcbiAgICBjb25zdCBkeCA9IHgyIC0geDE7XG4gICAgY29uc3QgZHkgPSB5MiAtIHkxO1xuICAgIGNvbnN0IGxlbmd0aCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgY29uc3QgZG90ID0gKChweCAtIHgxKSAqIGR4ICsgKHB5IC0geTEpICogZHkpIC8gKGxlbmd0aCAqIGxlbmd0aCk7XG4gICAgY29uc3QgY2xvc2VzdFggPSB4MSArIGRvdCAqIGR4O1xuICAgIGNvbnN0IGNsb3Nlc3RZID0geTEgKyBkb3QgKiBkeTtcbiAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydChNYXRoLnBvdyhweCAtIGNsb3Nlc3RYLCAyKSArIE1hdGgucG93KHB5IC0gY2xvc2VzdFksIDIpKTtcbiAgICByZXR1cm4gZGlzdGFuY2UgPD0gdGhyZXNob2xkO1xuICB9XG5cbiAgdG9nZ2xlVG9vbGJhciA9ICgpID0+IHtcbiAgICB0aGlzLnRvb2xiYXJWaXNpYmxlID0gIXRoaXMudG9vbGJhclZpc2libGU7XG4gIH07XG5cbiAgdG9nZ2xlQW5ub3RhdGUgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgYW5ub3RhdGVTY3JlZW5TdHJlYW0gPSB0aGlzLnBhcmFtZXRlcnMuYW5ub3RhdGVTY3JlZW5TdHJlYW07XG4gICAgdGhpcy5wYXJhbWV0ZXJzLmFubm90YXRlU2NyZWVuU3RyZWFtID0gIWFubm90YXRlU2NyZWVuU3RyZWFtO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlQW5ub3RhdGVTY3JlZW5TdHJlYW0oIWFubm90YXRlU2NyZWVuU3RyZWFtKTtcbiAgICB9KTtcbiAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLmFubm90YXRlU2NyZWVuU3RyZWFtKSB7XG4gICAgICB0aGlzLnRvb2xiYXJWaXNpYmxlID0gdHJ1ZTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6IGBZb3UgY2FuIG5vdyBhbm5vdGF0ZSB0aGUgc2NyZWVuLiBJZiB5b3UgY2Fubm90IHNlZSB5b3VyIGFubm90YXRpb24gY29udHJvbHMgKG9uIHRvcCksIHRyeSBtaW5pbWl6aW5nIHlvdXIgc2NyZWVuIGJ5IHVzaW5nICdDbWQnICsgJy0nIChvbiBNYWMpIG9yICdDdHJsJyArICctJyAob24gV2luZG93cykuYCxcbiAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICBkdXJhdGlvbjogOTAwMCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRvb2xiYXJWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZUlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGUodHJ1ZSk7XG4gICAgYXdhaXQgdGhpcy5wYXJhbWV0ZXJzLnNsZWVwKHsgbXM6IDUwMCB9KTtcbiAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlSXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG59XG4iLCI8ZGl2IGlkPVwic2NyZWVuYm9hcmQtaW50ZXJmYWNlXCIgKm5nSWY9XCJzaG93QXNwZWN0XCIgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7IGRpc3BsYXk6IGJsb2NrOyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgYWxpZ24taXRlbXM6IGNlbnRlcjsgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7IHotaW5kZXg6IDEwMDA7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7IG1heC13aWR0aDogMTAwJTsgbWF4LWhlaWdodDogMTAwJTsgb3ZlcmZsb3c6IGF1dG87XCIgI3NjcmVlbmJvYXJkUmVmPlxyXG4gIDxkaXYgaWQ9XCJzY3JlZW5ib2FyZENvbnRlbnRcIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTsgZGlzcGxheTogZmxleDsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7IG92ZXJmbG93OiBoaWRkZW47IHRvcDogMDsgbGVmdDogMDtcIiAjc2NyZWVuYm9hcmRDb250ZW50UmVmPlxyXG4gICAgPGJ1dHRvbiBpZD1cImFubm90YXRlU2NyZWVuXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuQm9hcmRTY3JlZW4gYW5ub3RhdGVTY3JlZW5CdG5cIiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiA1cHg7IHJpZ2h0OiAxMHB4OyB6LWluZGV4OiAxMDAwO1wiIChjbGljayk9XCJ0b2dnbGVBbm5vdGF0ZSgpXCI+XHJcbiAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhUGVuY2lsQWx0XCIgW25nU3R5bGVdPVwieydjb2xvcic6IHBhcmFtZXRlcnMuYW5ub3RhdGVTY3JlZW5TdHJlYW0gPyAncmVkJyA6ICdncmVlbid9XCI+PC9mYS1pY29uPlxyXG4gICAgPC9idXR0b24+XHJcblxyXG4gICAgPGJ1dHRvbiBpZD1cInRvb2xiYXJUb2dnbGVTY3JlZW5cIiAqbmdJZj1cInBhcmFtZXRlcnMuYW5ub3RhdGVTY3JlZW5TdHJlYW1cIiBjbGFzcz1cImJ0biBidG5Cb2FyZFNjcmVlbiBidG4tcHJpbWFyeVwiIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyB0b3A6IDVweDsgcmlnaHQ6IDU1cHg7IHotaW5kZXg6IDEwMDA7XCIgKGNsaWNrKT1cInRvZ2dsZVRvb2xiYXIoKVwiPlxyXG4gICAgICA8ZmEtaWNvbiBbaWNvbl09XCJ0b29sYmFyVmlzaWJsZSA/IGZhQ2hldnJvblJpZ2h0IDogZmFDaGV2cm9uTGVmdFwiPjwvZmEtaWNvbj5cclxuICAgIDwvYnV0dG9uPlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJ0b29sYmFyU2NyZWVuIG1iLTNcIiBpZD1cInRvb2xiYXJTY3JlZW5cIiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiA1cHg7IHJpZ2h0OiAxMDVweDsgei1pbmRleDogMTAwMDsgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XCIgW3N0eWxlLmRpc3BsYXldPVwidG9vbGJhclZpc2libGUgPyAnYmxvY2snIDogJ25vbmUnXCI+XHJcbiAgICAgIDwhLS0gRHJhdyBNb2RlIERyb3Bkb3duIC0tPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG5Cb2FyZFNjcmVlbiBidG4tc2Vjb25kYXJ5IGRyb3Bkb3duLXRvZ2dsZVwiIGlkPVwiZHJhd01vZGVTY3JlZW5cIiAoY2xpY2spPVwiaGFuZGxlRHJvcGRvd25DbGljaygnZHJhd01vZGVTY3JlZW4nKVwiPlxyXG4gICAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFQZW5jaWxBbHRcIj48L2ZhLWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGRpdiAqbmdJZj1cImRyb3Bkb3duT3BlbiA9PT0gJ2RyYXdNb2RlU2NyZWVuJ1wiIGNsYXNzPVwiZHJvcGRvd24tbWVudSBzaG93XCI+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXREcmF3TW9kZSgzKVwiPlhYLVNtYWxsICgzcHgpPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXREcmF3TW9kZSg2KVwiPlgtU21hbGwgKDZweCk8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNldERyYXdNb2RlKDEyKVwiPlNtYWxsICgxMnB4KTwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwic2V0RHJhd01vZGUoMTgpXCI+TWVkaXVtICgxOHB4KTwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwic2V0RHJhd01vZGUoMjQpXCI+TGFyZ2UgKDI0cHgpPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXREcmF3TW9kZSgzNilcIj5YLUxhcmdlICgzNnB4KTwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDwhLS0gRnJlZWhhbmQgTW9kZSBEcm9wZG93biAtLT5cclxuICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIHJvbGU9XCJncm91cFwiPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuQm9hcmRTY3JlZW4gYnRuLWRhcmsgZHJvcGRvd24tdG9nZ2xlXCIgaWQ9XCJmcmVlaGFuZE1vZGVTY3JlZW5cIiAoY2xpY2spPVwiaGFuZGxlRHJvcGRvd25DbGljaygnZnJlZWhhbmRNb2RlU2NyZWVuJylcIj5cclxuICAgICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhUGFpbnRCcnVzaFwiPjwvZmEtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwiZHJvcGRvd25PcGVuID09PSAnZnJlZWhhbmRNb2RlU2NyZWVuJ1wiIGNsYXNzPVwiZHJvcGRvd24tbWVudSBzaG93XCI+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXRGcmVlaGFuZE1vZGUoNSlcIj5YLVNtYWxsICg1cHgpPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXRGcmVlaGFuZE1vZGUoMTApXCI+U21hbGwgKDEwcHgpPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXRGcmVlaGFuZE1vZGUoMjApXCI+TWVkaXVtICgyMHB4KTwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwic2V0RnJlZWhhbmRNb2RlKDQwKVwiPkxhcmdlICg0MHB4KTwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwic2V0RnJlZWhhbmRNb2RlKDYwKVwiPlgtTGFyZ2UgKDYwcHgpPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPCEtLSBTaGFwZSBNb2RlIERyb3Bkb3duIHdpdGggSW1hZ2VzIC0tPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG5Cb2FyZFNjcmVlbiBidG4tZGFyayBkcm9wZG93bi10b2dnbGVcIiBpZD1cInNoYXBlTW9kZVNjcmVlblwiIChjbGljayk9XCJoYW5kbGVEcm9wZG93bkNsaWNrKCdzaGFwZU1vZGVTY3JlZW4nKVwiPlxyXG4gICAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFTaGFwZXNcIj48L2ZhLWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGRpdiAqbmdJZj1cImRyb3Bkb3duT3BlbiA9PT0gJ3NoYXBlTW9kZVNjcmVlbidcIiBjbGFzcz1cImRyb3Bkb3duLW1lbnUgc2hvd1wiPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwic2V0U2hhcGVNb2RlKCdzcXVhcmUnKVwiPlxyXG4gICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vbWVkaWFzZnUuY29tL2ltYWdlcy9zdmcvc3F1YXJlLnN2Z1wiIGFsdD1cIlNxdWFyZVwiIGNsYXNzPVwic2hhcGUtaWNvblwiIC8+IFNxdWFyZVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXRTaGFwZU1vZGUoJ3JlY3RhbmdsZScpXCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9yZWN0YW5nbGUuc3ZnXCIgYWx0PVwiUmVjdGFuZ2xlXCIgY2xhc3M9XCJzaGFwZS1pY29uXCIgLz4gUmVjdGFuZ2xlXHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNldFNoYXBlTW9kZSgnY2lyY2xlJylcIj5cclxuICAgICAgICAgICAgPGltZyBzcmM9XCJodHRwczovL21lZGlhc2Z1LmNvbS9pbWFnZXMvc3ZnL2NpcmNsZS5zdmdcIiBhbHQ9XCJDaXJjbGVcIiBjbGFzcz1cInNoYXBlLWljb25cIiAvPiBDaXJjbGVcclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwic2V0U2hhcGVNb2RlKCd0cmlhbmdsZScpXCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy90cmlhbmdsZS5zdmdcIiBhbHQ9XCJUcmlhbmdsZVwiIGNsYXNzPVwic2hhcGUtaWNvblwiIC8+IFRyaWFuZ2xlXHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNldFNoYXBlTW9kZSgnaGV4YWdvbicpXCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9oZXhhZ29uLnN2Z1wiIGFsdD1cIkhleGFnb25cIiBjbGFzcz1cInNoYXBlLWljb25cIiAvPiBIZXhhZ29uXHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNldFNoYXBlTW9kZSgncGVudGFnb24nKVwiPlxyXG4gICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vbWVkaWFzZnUuY29tL2ltYWdlcy9zdmcvcGVudGFnb24uc3ZnXCIgYWx0PVwiUGVudGFnb25cIiBjbGFzcz1cInNoYXBlLWljb25cIiAvPiBQZW50YWdvblxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXRTaGFwZU1vZGUoJ3Job21idXMnKVwiPlxyXG4gICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vbWVkaWFzZnUuY29tL2ltYWdlcy9zdmcvcmhvbWJ1cy5zdmdcIiBhbHQ9XCJSaG9tYnVzXCIgY2xhc3M9XCJzaGFwZS1pY29uXCIgLz4gUmhvbWJ1c1xyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXRTaGFwZU1vZGUoJ29jdGFnb24nKVwiPlxyXG4gICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vbWVkaWFzZnUuY29tL2ltYWdlcy9zdmcvb2N0YWdvbi5zdmdcIiBhbHQ9XCJPY3RhZ29uXCIgY2xhc3M9XCJzaGFwZS1pY29uXCIgLz4gT2N0YWdvblxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXRTaGFwZU1vZGUoJ292YWwnKVwiPlxyXG4gICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vbWVkaWFzZnUuY29tL2ltYWdlcy9zdmcvb3ZhbC5zdmdcIiBhbHQ9XCJPdmFsXCIgY2xhc3M9XCJzaGFwZS1pY29uXCIgLz4gT3ZhbFxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXRTaGFwZU1vZGUoJ3BhcmFsbGVsb2dyYW0nKVwiPlxyXG4gICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vbWVkaWFzZnUuY29tL2ltYWdlcy9zdmcvcGFyYWxsZWxvZ3JhbS5zdmdcIiBhbHQ9XCJQYXJhbGxlbG9ncmFtXCIgY2xhc3M9XCJzaGFwZS1pY29uXCIgLz4gUGFyYWxsZWxvZ3JhbVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPCEtLSBFcmFzZSBNb2RlIERyb3Bkb3duIC0tPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG5Cb2FyZFNjcmVlbiBidG4tZGFuZ2VyIGRyb3Bkb3duLXRvZ2dsZVwiIGlkPVwiZXJhc2VNb2RlU2NyZWVuXCIgKGNsaWNrKT1cImhhbmRsZURyb3Bkb3duQ2xpY2soJ2VyYXNlTW9kZVNjcmVlbicpXCI+XHJcbiAgICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYUVyYXNlclwiPjwvZmEtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwiZHJvcGRvd25PcGVuID09PSAnZXJhc2VNb2RlU2NyZWVuJ1wiIGNsYXNzPVwiZHJvcGRvd24tbWVudSBzaG93XCI+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXRFcmFzZU1vZGUoNSlcIj5YLVNtYWxsICg1cHgpPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXRFcmFzZU1vZGUoMTApXCI+U21hbGwgKDEwcHgpPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXRFcmFzZU1vZGUoMjApXCI+TWVkaXVtICgyMHB4KTwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwic2V0RXJhc2VNb2RlKDMwKVwiPkxhcmdlICgzMHB4KTwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwic2V0RXJhc2VNb2RlKDYwKVwiPlgtTGFyZ2UgKDYwcHgpPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPCEtLSBBZGRpdGlvbmFsIFRvb2xiYXIgQ29udHJvbHMgLS0+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuQm9hcmQgYnRuLXN1Y2Nlc3NcIiBpZD1cInpvb21SZXNldFNjcmVlblwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj5cclxuICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVNlYXJjaFwiPjwvZmEtaWNvbj5cclxuICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICA8aW5wdXQgdHlwZT1cImNvbG9yXCIgY2xhc3M9XCJidG5cIiBpZD1cImNvbG9yUGlja2VyU2NyZWVuXCIgWyhuZ01vZGVsKV09XCJjb2xvclwiPlxyXG4gICAgICA8c2VsZWN0IGlkPVwibGluZVR5cGVQaWNrZXJTY3JlZW5cIiBjbGFzcz1cImN1c3RvbS1zZWxlY3RcIiBzdHlsZT1cIndpZHRoOiBhdXRvO1wiIFsobmdNb2RlbCldPVwibGluZVR5cGVcIj5cclxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwic29saWRcIj5Tb2xpZDwvb3B0aW9uPlxyXG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJkYXNoZWRcIj5EYXNoZWQ8L29wdGlvbj5cclxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiZG90dGVkXCI+RG90dGVkPC9vcHRpb24+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImRhc2hEb3RcIj5EYXNoLURvdDwvb3B0aW9uPlxyXG4gICAgICA8L3NlbGVjdD5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxjYW52YXMgaWQ9XCJjYW52YXNSZWZcIiB3aWR0aD1cIjEyODBcIiBoZWlnaHQ9XCI3MjBcIiBbbmdTdHlsZV09XCJ7J2Rpc3BsYXknOiBwYXJhbWV0ZXJzLmFubm90YXRlU2NyZWVuU3RyZWFtID8gJ2Jsb2NrJyA6ICdub25lJ31cIiBzdHlsZT1cInBhZGRpbmc6IDA7IG1hcmdpbjogMDtcIiAjY2FudmFzUmVmPjwvY2FudmFzPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19