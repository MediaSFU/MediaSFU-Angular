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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyZWVuYm9hcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvc2NyZWVuYm9hcmQtY29tcG9uZW50cy9zY3JlZW5ib2FyZC9zY3JlZW5ib2FyZC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9zY3JlZW5ib2FyZC1jb21wb25lbnRzL3NjcmVlbmJvYXJkL3NjcmVlbmJvYXJkLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDZEQUE2RDtBQUM3RCxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxTQUFTLEVBTVQsUUFBUSxFQUNSLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsY0FBYyxFQUNkLGFBQWEsRUFDYixXQUFXLEVBQ1gsWUFBWSxFQUNaLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLFlBQVksRUFDWixhQUFhLEVBQ2IsTUFBTSxFQUNOLFlBQVksRUFDWixNQUFNLEVBQ04sTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsT0FBTyxFQUNQLGNBQWMsR0FDZixNQUFNLG1DQUFtQyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7Ozs7O0FBd0JyRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9HRztB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QkFBQyx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uICovXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgT25EZXN0cm95LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE9wdGlvbmFsLFxuICBJbmplY3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgZmFDaGV2cm9uUmlnaHQsXG4gIGZhQ2hldnJvbkxlZnQsXG4gIGZhUGVuY2lsQWx0LFxuICBmYVBhaW50QnJ1c2gsXG4gIGZhU2hhcGVzLFxuICBmYUVyYXNlcixcbiAgZmFTZWFyY2gsXG4gIGZhU2VhcmNoUGx1cyxcbiAgZmFTZWFyY2hNaW51cyxcbiAgZmFGb250LFxuICBmYVRleHRIZWlnaHQsXG4gIGZhVW5kbyxcbiAgZmFSZWRvLFxuICBmYVNhdmUsXG4gIGZhVHJhc2gsXG4gIGZhVGltZXMsXG4gIGZhTW91c2VQb2ludGVyLFxufSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9udEF3ZXNvbWVNb2R1bGUgfSBmcm9tICdAZm9ydGF3ZXNvbWUvYW5ndWxhci1mb250YXdlc29tZSc7XG5pbXBvcnQgeyBTbGVlcFR5cGUsIFNob3dBbGVydCB9IGZyb20gJy4uLy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2NyZWVuYm9hcmRQYXJhbWV0ZXJzIHtcbiAgdXBkYXRlQ2FudmFzU2NyZWVuYm9hcmQ6IChjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSA9PiB2b2lkO1xuICBhbm5vdGF0ZVNjcmVlblN0cmVhbTogYm9vbGVhbjtcbiAgdXBkYXRlQW5ub3RhdGVTY3JlZW5TdHJlYW06IChhbm5vdGF0ZVNjcmVlblN0cmVhbTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlSXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgc2xlZXA6IFNsZWVwVHlwZTtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFNjcmVlbmJvYXJkUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNjcmVlbmJvYXJkT3B0aW9ucyB7XG4gIGN1c3RvbVdpZHRoOiBudW1iZXI7XG4gIGN1c3RvbUhlaWdodDogbnVtYmVyO1xuICBwYXJhbWV0ZXJzOiBTY3JlZW5ib2FyZFBhcmFtZXRlcnM7XG4gIHNob3dBc3BlY3Q6IGJvb2xlYW47XG59XG5cbmV4cG9ydCB0eXBlIFNjcmVlbmJvYXJkVHlwZSA9IChvcHRpb25zOiBTY3JlZW5ib2FyZE9wdGlvbnMpID0+IHZvaWQ7XG5cbi8qKlxuICogQGZpbGVvdmVydmlldyBTY3JlZW5ib2FyZCBjb21wb25lbnQgZm9yIE1lZGlhU0ZVLUFuZ3VsYXIgYXBwbGljYXRpb24uXG4gKlxuICogVGhpcyBjb21wb25lbnQgcHJvdmlkZXMgYSBzY3JlZW5ib2FyZCB3aXRoIGRyYXdpbmcsIGZyZWVoYW5kLCBzaGFwZSwgYW5kIGVyYXNlIG1vZGVzLlxuICogSXQgc3VwcG9ydHMgbW91c2UgYW5kIHRvdWNoIGV2ZW50cyBmb3IgZHJhd2luZyBvbiBhIGNhbnZhcy5cbiAqXG4gKiBAY29tcG9uZW50XG4gKiBAc2VsZWN0b3IgYXBwLXNjcmVlbmJvYXJkXG4gKiBAdGVtcGxhdGVVcmwgLi9zY3JlZW5ib2FyZC5jb21wb25lbnQuaHRtbFxuICogQHN0eWxlVXJscyAuL3NjcmVlbmJvYXJkLmNvbXBvbmVudC5jc3NcbiAqIEBpbXBvcnRzIENvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGUsIEZvcm1zTW9kdWxlXG4gKlxuICogQGNsYXNzIFNjcmVlbmJvYXJkXG4gKiBAaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzXG4gKlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGN1c3RvbVdpZHRoIC0gQ3VzdG9tIHdpZHRoIGZvciB0aGUgc2NyZWVuYm9hcmQuXG4gKiBAcHJvcGVydHkge251bWJlcn0gY3VzdG9tSGVpZ2h0IC0gQ3VzdG9tIGhlaWdodCBmb3IgdGhlIHNjcmVlbmJvYXJkLlxuICogQHByb3BlcnR5IHthbnl9IHBhcmFtZXRlcnMgLSBQYXJhbWV0ZXJzIGZvciB0aGUgc2NyZWVuYm9hcmQuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHNob3dBc3BlY3QgLSBGbGFnIHRvIHNob3cgYXNwZWN0IHJhdGlvLlxuICpcbiAqIEBwcm9wZXJ0eSB7RWxlbWVudFJlZjxIVE1MQ2FudmFzRWxlbWVudD59IGNhbnZhc1JlZiAtIFJlZmVyZW5jZSB0byB0aGUgY2FudmFzIGVsZW1lbnQuXG4gKiBAcHJvcGVydHkge0VsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+fSBzY3JlZW5ib2FyZFJlZiAtIFJlZmVyZW5jZSB0byB0aGUgc2NyZWVuYm9hcmQgZGl2IGVsZW1lbnQuXG4gKiBAcHJvcGVydHkge0VsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+fSBzY3JlZW5ib2FyZENvbnRlbnRSZWYgLSBSZWZlcmVuY2UgdG8gdGhlIHNjcmVlbmJvYXJkIGNvbnRlbnQgZGl2IGVsZW1lbnQuXG4gKlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFDaGV2cm9uUmlnaHQgLSBGb250QXdlc29tZSBpY29uIGZvciBjaGV2cm9uIHJpZ2h0LlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFDaGV2cm9uTGVmdCAtIEZvbnRBd2Vzb21lIGljb24gZm9yIGNoZXZyb24gbGVmdC5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhUGVuY2lsQWx0IC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgcGVuY2lsLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFQYWludEJydXNoIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgcGFpbnQgYnJ1c2guXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVNoYXBlcyAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHNoYXBlcy5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhRXJhc2VyIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgZXJhc2VyLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFTZWFyY2ggLSBGb250QXdlc29tZSBpY29uIGZvciBzZWFyY2guXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVNlYXJjaFBsdXMgLSBGb250QXdlc29tZSBpY29uIGZvciBzZWFyY2ggcGx1cy5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhU2VhcmNoTWludXMgLSBGb250QXdlc29tZSBpY29uIGZvciBzZWFyY2ggbWludXMuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYUZvbnQgLSBGb250QXdlc29tZSBpY29uIGZvciBmb250LlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFUZXh0SGVpZ2h0IC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgdGV4dCBoZWlnaHQuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVVuZG8gLSBGb250QXdlc29tZSBpY29uIGZvciB1bmRvLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFSZWRvIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgcmVkby5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhU2F2ZSAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHNhdmUuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVRyYXNoIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgdHJhc2guXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVRpbWVzIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgdGltZXMuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYU1vdXNlUG9pbnRlciAtIEZvbnRBd2Vzb21lIGljb24gZm9yIG1vdXNlIHBvaW50ZXIuXG4gKlxuICogQHByb3BlcnR5IHsnZHJhdycgfCAnZnJlZWhhbmQnIHwgJ3NoYXBlJyB8ICdlcmFzZSd9IG1vZGUgLSBDdXJyZW50IGRyYXdpbmcgbW9kZS5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNEcmF3aW5nIC0gRmxhZyB0byBpbmRpY2F0ZSBpZiBkcmF3aW5nIGlzIGluIHByb2dyZXNzLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IHN0YXJ0WCAtIFN0YXJ0aW5nIFggY29vcmRpbmF0ZSBmb3IgZHJhd2luZy5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzdGFydFkgLSBTdGFydGluZyBZIGNvb3JkaW5hdGUgZm9yIGRyYXdpbmcuXG4gKiBAcHJvcGVydHkge251bWJlcn0gY3VycmVudFggLSBDdXJyZW50IFggY29vcmRpbmF0ZSBmb3IgZHJhd2luZy5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjdXJyZW50WSAtIEN1cnJlbnQgWSBjb29yZGluYXRlIGZvciBkcmF3aW5nLlxuICogQHByb3BlcnR5IHtBcnJheTx7IHg6IG51bWJlcjsgeTogbnVtYmVyOyBjb2xvcjogc3RyaW5nOyB0aGlja25lc3M6IG51bWJlciB9Pn0gZnJlZWhhbmREcmF3aW5nIC0gQXJyYXkgb2YgcG9pbnRzIGZvciBmcmVlaGFuZCBkcmF3aW5nLlxuICogQHByb3BlcnR5IHthbnlbXX0gc2hhcGVzIC0gQXJyYXkgb2Ygc2hhcGVzIGRyYXduIG9uIHRoZSBjYW52YXMuXG4gKiBAcHJvcGVydHkge251bWJlcn0gZXJhc2VyVGhpY2tuZXNzIC0gVGhpY2tuZXNzIG9mIHRoZSBlcmFzZXIuXG4gKiBAcHJvcGVydHkge251bWJlcn0gYnJ1c2hUaGlja25lc3MgLSBUaGlja25lc3Mgb2YgdGhlIGJydXNoLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGxpbmVUaGlja25lc3MgLSBUaGlja25lc3Mgb2YgdGhlIGxpbmUuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbGluZVR5cGUgLSBUeXBlIG9mIHRoZSBsaW5lIChzb2xpZCwgZGFzaGVkLCBkb3R0ZWQsIGRhc2hEb3QpLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNvbG9yIC0gQ29sb3IgZm9yIGRyYXdpbmcuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZm9udCAtIEZvbnQgZm9yIHRleHQuXG4gKiBAcHJvcGVydHkge251bWJlcn0gZm9udFNpemUgLSBGb250IHNpemUgZm9yIHRleHQuXG4gKiBAcHJvcGVydHkge3N0cmluZyB8IG51bGx9IHNoYXBlIC0gQ3VycmVudCBzaGFwZSBiZWluZyBkcmF3bi5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gdG9vbGJhclZpc2libGUgLSBGbGFnIHRvIGluZGljYXRlIGlmIHRoZSB0b29sYmFyIGlzIHZpc2libGUuXG4gKiBAcHJvcGVydHkge3N0cmluZyB8IG51bGx9IGRyb3Bkb3duT3BlbiAtIElEIG9mIHRoZSBjdXJyZW50bHkgb3BlbiBkcm9wZG93bi5cbiAqIEBwcm9wZXJ0eSB7SFRNTENhbnZhc0VsZW1lbnR9IGNhbnZhcyAtIENhbnZhcyBlbGVtZW50LlxuICogQHByb3BlcnR5IHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGN0eCAtIENhbnZhcyByZW5kZXJpbmcgY29udGV4dC5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBbaW5qZWN0ZWRDdXN0b21XaWR0aF0gLSBJbmplY3RlZCBjdXN0b20gd2lkdGguXG4gKiBAcGFyYW0ge251bWJlcn0gW2luamVjdGVkQ3VzdG9tSGVpZ2h0XSAtIEluamVjdGVkIGN1c3RvbSBoZWlnaHQuXG4gKiBAcGFyYW0ge2FueX0gW2luamVjdGVkUGFyYW1ldGVyc10gLSBJbmplY3RlZCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtib29sZWFufSBbaW5qZWN0ZWRTaG93QXNwZWN0XSAtIEluamVjdGVkIHNob3cgYXNwZWN0IGZsYWcuXG4gKlxuICogQG1ldGhvZCBuZ09uSW5pdCAtIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIGFmdGVyIGRhdGEtYm91bmQgcHJvcGVydGllcyBhcmUgaW5pdGlhbGl6ZWQuXG4gKiBAbWV0aG9kIG5nT25DaGFuZ2VzIC0gTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgd2hlbiBhbnkgZGF0YS1ib3VuZCBwcm9wZXJ0eSBjaGFuZ2VzLlxuICogQG1ldGhvZCBuZ0FmdGVyVmlld0luaXQgLSBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciB0aGUgY29tcG9uZW50J3MgdmlldyBoYXMgYmVlbiBmdWxseSBpbml0aWFsaXplZC5cbiAqIEBtZXRob2QgbmdPbkRlc3Ryb3kgLSBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBqdXN0IGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZC5cbiAqXG4gKiBAbWV0aG9kIGFkZExpc3RlbmVycyAtIEFkZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBjYW52YXMuXG4gKiBAbWV0aG9kIGhhbmRsZU1vdXNlRG93biAtIEhhbmRsZXMgbW91c2UgZG93biBldmVudHMuXG4gKiBAbWV0aG9kIGhhbmRsZU1vdXNlTW92ZSAtIEhhbmRsZXMgbW91c2UgbW92ZSBldmVudHMuXG4gKiBAbWV0aG9kIGhhbmRsZU1vdXNlVXAgLSBIYW5kbGVzIG1vdXNlIHVwIGV2ZW50cy5cbiAqIEBtZXRob2QgaGFuZGxlVG91Y2hTdGFydCAtIEhhbmRsZXMgdG91Y2ggc3RhcnQgZXZlbnRzLlxuICogQG1ldGhvZCBoYW5kbGVUb3VjaE1vdmUgLSBIYW5kbGVzIHRvdWNoIG1vdmUgZXZlbnRzLlxuICogQG1ldGhvZCBoYW5kbGVUb3VjaEVuZCAtIEhhbmRsZXMgdG91Y2ggZW5kIGV2ZW50cy5cbiAqIEBtZXRob2QgaGFuZGxlQ2xpY2tPdXRzaWRlIC0gSGFuZGxlcyBjbGljayBldmVudHMgb3V0c2lkZSB0aGUgY29tcG9uZW50LlxuICogQG1ldGhvZCBoYW5kbGVEcm9wZG93bkNsaWNrIC0gSGFuZGxlcyBkcm9wZG93biBjbGljayBldmVudHMuXG4gKiBAbWV0aG9kIHNldERyYXdNb2RlIC0gU2V0cyB0aGUgZHJhd2luZyBtb2RlLlxuICogQG1ldGhvZCBzZXRGcmVlaGFuZE1vZGUgLSBTZXRzIHRoZSBmcmVlaGFuZCBtb2RlLlxuICogQG1ldGhvZCBzZXRTaGFwZU1vZGUgLSBTZXRzIHRoZSBzaGFwZSBtb2RlLlxuICogQG1ldGhvZCBzZXRFcmFzZU1vZGUgLSBTZXRzIHRoZSBlcmFzZSBtb2RlLlxuICogQG1ldGhvZCBzdGFydERyYXdpbmcgLSBTdGFydHMgdGhlIGRyYXdpbmcgcHJvY2Vzcy5cbiAqIEBtZXRob2QgZHJhdyAtIERyYXdzIG9uIHRoZSBjYW52YXMuXG4gKiBAbWV0aG9kIHN0b3BEcmF3aW5nIC0gU3RvcHMgdGhlIGRyYXdpbmcgcHJvY2Vzcy5cbiAqIEBtZXRob2QgZHJhd0xpbmUgLSBEcmF3cyBhIGxpbmUgb24gdGhlIGNhbnZhcy5cbiAqIEBtZXRob2QgZHJhd1NoYXBlcyAtIERyYXdzIGFsbCBzaGFwZXMgb24gdGhlIGNhbnZhcy5cbiAqIEBtZXRob2QgZHJhd0ZyZWVoYW5kIC0gRHJhd3MgZnJlZWhhbmQgb24gdGhlIGNhbnZhcy5cbiAqIEBtZXRob2QgZHJhd1NoYXBlIC0gRHJhd3MgYSBzaGFwZSBvbiB0aGUgY2FudmFzLlxuICogQG1ldGhvZCBkcmF3UG9seWdvbiAtIERyYXdzIGEgcG9seWdvbiBvbiB0aGUgY2FudmFzLlxuICogQG1ldGhvZCByZW1vdmVTaGFwZSAtIFJlbW92ZXMgdGhlIGZpcnN0IHNoYXBlIGZyb20gdGhlIHNoYXBlcyBhcnJheS5cbiAqIEBtZXRob2QgZXJhc2UgLSBFcmFzZXMgcGFydCBvZiB0aGUgZHJhd2luZy5cbiAqIEBtZXRob2QgaXNQb2ludE5lYXJMaW5lIC0gQ2hlY2tzIGlmIGEgcG9pbnQgaXMgbmVhciBhIGxpbmUuXG4gKiBAbWV0aG9kIHRvZ2dsZVRvb2xiYXIgLSBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSB0b29sYmFyLlxuICogQG1ldGhvZCB0b2dnbGVBbm5vdGF0ZSAtIFRvZ2dsZXMgdGhlIGFubm90YXRpb24gbW9kZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLXNjcmVlbmJvYXJkJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgdGVtcGxhdGVVcmw6ICcuL3NjcmVlbmJvYXJkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2NyZWVuYm9hcmQuY29tcG9uZW50LmNzcyddLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZSwgRm9ybXNNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBTY3JlZW5ib2FyZCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBjdXN0b21XaWR0aCE6IG51bWJlcjtcbiAgQElucHV0KCkgY3VzdG9tSGVpZ2h0ITogbnVtYmVyO1xuICBASW5wdXQoKSBwYXJhbWV0ZXJzOiBTY3JlZW5ib2FyZFBhcmFtZXRlcnMgPSB7fSBhcyBTY3JlZW5ib2FyZFBhcmFtZXRlcnM7XG4gIEBJbnB1dCgpIHNob3dBc3BlY3QhOiBib29sZWFuO1xuXG4gIEBWaWV3Q2hpbGQoJ2NhbnZhc1JlZicpXG4gIGNhbnZhc1JlZiE6IEVsZW1lbnRSZWY8SFRNTENhbnZhc0VsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCdzY3JlZW5ib2FyZFJlZicpXG4gIHNjcmVlbmJvYXJkUmVmITogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XG4gIEBWaWV3Q2hpbGQoJ3NjcmVlbmJvYXJkQ29udGVudFJlZicpXG4gIHNjcmVlbmJvYXJkQ29udGVudFJlZiE6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+O1xuXG4gIGZhQ2hldnJvblJpZ2h0ID0gZmFDaGV2cm9uUmlnaHQ7XG4gIGZhQ2hldnJvbkxlZnQgPSBmYUNoZXZyb25MZWZ0O1xuICBmYVBlbmNpbEFsdCA9IGZhUGVuY2lsQWx0O1xuICBmYVBhaW50QnJ1c2ggPSBmYVBhaW50QnJ1c2g7XG4gIGZhU2hhcGVzID0gZmFTaGFwZXM7XG4gIGZhRXJhc2VyID0gZmFFcmFzZXI7XG4gIGZhU2VhcmNoID0gZmFTZWFyY2g7XG4gIGZhU2VhcmNoUGx1cyA9IGZhU2VhcmNoUGx1cztcbiAgZmFTZWFyY2hNaW51cyA9IGZhU2VhcmNoTWludXM7XG4gIGZhRm9udCA9IGZhRm9udDtcbiAgZmFUZXh0SGVpZ2h0ID0gZmFUZXh0SGVpZ2h0O1xuICBmYVVuZG8gPSBmYVVuZG87XG4gIGZhUmVkbyA9IGZhUmVkbztcbiAgZmFTYXZlID0gZmFTYXZlO1xuICBmYVRyYXNoID0gZmFUcmFzaDtcbiAgZmFUaW1lcyA9IGZhVGltZXM7XG4gIGZhTW91c2VQb2ludGVyID0gZmFNb3VzZVBvaW50ZXI7XG5cbiAgbW9kZTogJ2RyYXcnIHwgJ2ZyZWVoYW5kJyB8ICdzaGFwZScgfCAnZXJhc2UnID0gJ2RyYXcnO1xuICBpc0RyYXdpbmcgPSBmYWxzZTtcbiAgc3RhcnRYID0gMDtcbiAgc3RhcnRZID0gMDtcbiAgY3VycmVudFggPSAwO1xuICBjdXJyZW50WSA9IDA7XG4gIGZyZWVoYW5kRHJhd2luZzogeyB4OiBudW1iZXI7IHk6IG51bWJlcjsgY29sb3I6IHN0cmluZzsgdGhpY2tuZXNzOiBudW1iZXIgfVtdID0gW107XG4gIHNoYXBlczogYW55W10gPSBbXTtcbiAgZXJhc2VyVGhpY2tuZXNzID0gMTA7XG4gIGJydXNoVGhpY2tuZXNzID0gNjtcbiAgbGluZVRoaWNrbmVzcyA9IDY7XG4gIGxpbmVUeXBlID0gJ3NvbGlkJztcbiAgY29sb3IgPSAnIzAwMDAwMCc7XG4gIGZvbnQgPSAnQXJpYWwnO1xuICBmb250U2l6ZSA9IDIwO1xuICBzaGFwZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIHRvb2xiYXJWaXNpYmxlID0gZmFsc2U7XG4gIGRyb3Bkb3duT3Blbjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIGNhbnZhcyE6IEhUTUxDYW52YXNFbGVtZW50O1xuICBjdHghOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnY3VzdG9tV2lkdGgnKSBpbmplY3RlZEN1c3RvbVdpZHRoOiBudW1iZXIsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnY3VzdG9tSGVpZ2h0JykgaW5qZWN0ZWRDdXN0b21IZWlnaHQ6IG51bWJlcixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdwYXJhbWV0ZXJzJykgaW5qZWN0ZWRQYXJhbWV0ZXJzOiBhbnksXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnc2hvd0FzcGVjdCcpIGluamVjdGVkU2hvd0FzcGVjdDogYm9vbGVhbixcbiAgKSB7XG4gICAgdGhpcy5jdXN0b21XaWR0aCA9IGluamVjdGVkQ3VzdG9tV2lkdGggfHwgdGhpcy5jdXN0b21XaWR0aCB8fCAwO1xuICAgIHRoaXMuY3VzdG9tSGVpZ2h0ID0gaW5qZWN0ZWRDdXN0b21IZWlnaHQgfHwgdGhpcy5jdXN0b21IZWlnaHQgfHwgMDtcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSBpbmplY3RlZFBhcmFtZXRlcnMgfHwgdGhpcy5wYXJhbWV0ZXJzIHx8IHt9O1xuICAgIHRoaXMuc2hvd0FzcGVjdCA9IGluamVjdGVkU2hvd0FzcGVjdCB8fCB0aGlzLnNob3dBc3BlY3QgfHwgZmFsc2U7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMpIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzID0gdGhpcy5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcbiAgICAgIH1cbiAgICB9LCAxMDApO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzWydzaG93QXNwZWN0J10pIHtcbiAgICAgIGlmICghdGhpcy5jYW52YXMgJiYgdGhpcy5jYW52YXNSZWYpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSB0aGlzLmNhbnZhc1JlZiEubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcnMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2FudmFzUmVmICYmICF0aGlzLmNhbnZhcykge1xuICAgICAgdGhpcy5jYW52YXMgPSB0aGlzLmNhbnZhc1JlZiEubmF0aXZlRWxlbWVudDtcbiAgICAgIHRoaXMuYWRkTGlzdGVuZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2FudmFzKSB7XG4gICAgICB0aGlzLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZU1vdXNlRG93bi5iaW5kKHRoaXMpKTtcbiAgICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlTW91c2VNb3ZlLmJpbmQodGhpcykpO1xuICAgICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlTW91c2VVcC5iaW5kKHRoaXMpKTtcbiAgICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgdGhpcy5oYW5kbGVNb3VzZVVwLmJpbmQodGhpcykpO1xuXG4gICAgICB0aGlzLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LmJpbmQodGhpcykpO1xuICAgICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUuYmluZCh0aGlzKSk7XG4gICAgICB0aGlzLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuaGFuZGxlVG91Y2hFbmQuYmluZCh0aGlzKSk7XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlQ2xpY2tPdXRzaWRlLmJpbmQodGhpcykpO1xuICAgIH1cbiAgfVxuXG4gIGFkZExpc3RlbmVycyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5jYW52YXMpIHtcbiAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlQ2FudmFzU2NyZWVuYm9hcmQodGhpcy5jYW52YXMpO1xuXG4gICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZU1vdXNlRG93bi5iaW5kKHRoaXMpKTtcbiAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlTW91c2VNb3ZlLmJpbmQodGhpcykpO1xuICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlTW91c2VVcC5iaW5kKHRoaXMpKTtcbiAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgdGhpcy5oYW5kbGVNb3VzZVVwLmJpbmQodGhpcykpO1xuXG4gICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LmJpbmQodGhpcykpO1xuICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUuYmluZCh0aGlzKSk7XG4gICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuaGFuZGxlVG91Y2hFbmQuYmluZCh0aGlzKSk7XG5cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlQ2xpY2tPdXRzaWRlLmJpbmQodGhpcykpO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVNb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLnN0YXJ0RHJhd2luZyhldmVudCk7XG4gIH1cblxuICBoYW5kbGVNb3VzZU1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLmRyYXcoZXZlbnQpO1xuICB9XG5cbiAgaGFuZGxlTW91c2VVcCgpIHtcbiAgICB0aGlzLnN0b3BEcmF3aW5nKCk7XG4gIH1cblxuICBoYW5kbGVUb3VjaFN0YXJ0KGU6IFRvdWNoRXZlbnQpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdG91Y2ggPSBlLnRvdWNoZXNbMF07XG4gICAgY29uc3QgbW91c2VFdmVudCA9IG5ldyBNb3VzZUV2ZW50KCdtb3VzZWRvd24nLCB7XG4gICAgICBjbGllbnRYOiB0b3VjaC5jbGllbnRYLFxuICAgICAgY2xpZW50WTogdG91Y2guY2xpZW50WSxcbiAgICB9KTtcbiAgICB0aGlzLmNhbnZhcy5kaXNwYXRjaEV2ZW50KG1vdXNlRXZlbnQpO1xuICB9XG5cbiAgaGFuZGxlVG91Y2hNb3ZlKGU6IFRvdWNoRXZlbnQpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdG91Y2ggPSBlLnRvdWNoZXNbMF07XG4gICAgY29uc3QgbW91c2VFdmVudCA9IG5ldyBNb3VzZUV2ZW50KCdtb3VzZW1vdmUnLCB7XG4gICAgICBjbGllbnRYOiB0b3VjaC5jbGllbnRYLFxuICAgICAgY2xpZW50WTogdG91Y2guY2xpZW50WSxcbiAgICB9KTtcbiAgICB0aGlzLmNhbnZhcy5kaXNwYXRjaEV2ZW50KG1vdXNlRXZlbnQpO1xuICB9XG5cbiAgaGFuZGxlVG91Y2hFbmQoZTogVG91Y2hFdmVudCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBtb3VzZUV2ZW50ID0gbmV3IE1vdXNlRXZlbnQoJ21vdXNldXAnLCB7fSk7XG4gICAgdGhpcy5jYW52YXMuZGlzcGF0Y2hFdmVudChtb3VzZUV2ZW50KTtcbiAgfVxuXG4gIGhhbmRsZUNsaWNrT3V0c2lkZShldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLmRyb3Bkb3duT3BlbiAmJiAhKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuY2xvc2VzdCgnLmJ0bi1ncm91cCcpKSB7XG4gICAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRHJvcGRvd25DbGljayhpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5kcm9wZG93bk9wZW4gPSB0aGlzLmRyb3Bkb3duT3BlbiA9PT0gaWQgPyBudWxsIDogaWQ7XG4gIH1cblxuICBzZXREcmF3TW9kZSh0aGlja25lc3M6IG51bWJlcikge1xuICAgIHRoaXMubGluZVRoaWNrbmVzcyA9IHRoaWNrbmVzcztcbiAgICB0aGlzLm1vZGUgPSAnZHJhdyc7XG4gICAgdGhpcy5kcm9wZG93bk9wZW4gPSBudWxsO1xuICB9XG5cbiAgc2V0RnJlZWhhbmRNb2RlKHRoaWNrbmVzczogbnVtYmVyKSB7XG4gICAgdGhpcy5icnVzaFRoaWNrbmVzcyA9IHRoaWNrbmVzcztcbiAgICB0aGlzLm1vZGUgPSAnZnJlZWhhbmQnO1xuICAgIHRoaXMuZHJvcGRvd25PcGVuID0gbnVsbDtcbiAgfVxuXG4gIHNldFNoYXBlTW9kZShzaGFwZTogc3RyaW5nKSB7XG4gICAgdGhpcy5zaGFwZSA9IHNoYXBlO1xuICAgIHRoaXMubW9kZSA9ICdzaGFwZSc7XG4gICAgdGhpcy5kcm9wZG93bk9wZW4gPSBudWxsO1xuICB9XG5cbiAgc2V0RXJhc2VNb2RlKHRoaWNrbmVzczogbnVtYmVyKSB7XG4gICAgdGhpcy5lcmFzZXJUaGlja25lc3MgPSB0aGlja25lc3M7XG4gICAgdGhpcy5tb2RlID0gJ2VyYXNlJztcbiAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IG51bGw7XG4gIH1cblxuICBzdGFydERyYXdpbmcoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLmlzRHJhd2luZyA9IHRydWU7XG4gICAgdGhpcy5zdGFydFggPSBldmVudC5vZmZzZXRYO1xuICAgIHRoaXMuc3RhcnRZID0gZXZlbnQub2Zmc2V0WTtcblxuICAgIGlmICh0aGlzLm1vZGUgPT09ICdlcmFzZScpIHtcbiAgICAgIHRoaXMuZXJhc2UoZXZlbnQub2Zmc2V0WCwgZXZlbnQub2Zmc2V0WSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm1vZGUgPT09ICdkcmF3JyB8fCB0aGlzLm1vZGUgPT09ICdmcmVlaGFuZCcpIHtcbiAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jdHgubW92ZVRvKGV2ZW50Lm9mZnNldFgsIGV2ZW50Lm9mZnNldFkpO1xuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ2ZyZWVoYW5kJykge1xuICAgICAgICB0aGlzLmZyZWVoYW5kRHJhd2luZyA9IFtcbiAgICAgICAgICB7IHg6IGV2ZW50Lm9mZnNldFgsIHk6IGV2ZW50Lm9mZnNldFksIGNvbG9yOiB0aGlzLmNvbG9yLCB0aGlja25lc3M6IHRoaXMuYnJ1c2hUaGlja25lc3MgfSxcbiAgICAgICAgXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkcmF3KGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmlzRHJhd2luZykgcmV0dXJuO1xuXG4gICAgdGhpcy5jdXJyZW50WCA9IGV2ZW50Lm9mZnNldFg7XG4gICAgdGhpcy5jdXJyZW50WSA9IGV2ZW50Lm9mZnNldFk7XG5cbiAgICBpZiAodGhpcy5tb2RlID09PSAnZXJhc2UnKSB7XG4gICAgICB0aGlzLmVyYXNlKGV2ZW50Lm9mZnNldFgsIGV2ZW50Lm9mZnNldFkpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlID09PSAnZHJhdycpIHtcbiAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICAgIHRoaXMuZHJhd1NoYXBlcygpO1xuICAgICAgdGhpcy5kcmF3TGluZSh0aGlzLnN0YXJ0WCwgdGhpcy5zdGFydFksIGV2ZW50Lm9mZnNldFgsIGV2ZW50Lm9mZnNldFkpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlID09PSAnZnJlZWhhbmQnKSB7XG4gICAgICB0aGlzLmN0eC5saW5lVG8oZXZlbnQub2Zmc2V0WCwgZXZlbnQub2Zmc2V0WSk7XG4gICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSB0aGlzLmJydXNoVGhpY2tuZXNzO1xuICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgICB0aGlzLmZyZWVoYW5kRHJhd2luZy5wdXNoKHtcbiAgICAgICAgeDogZXZlbnQub2Zmc2V0WCxcbiAgICAgICAgeTogZXZlbnQub2Zmc2V0WSxcbiAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXG4gICAgICAgIHRoaWNrbmVzczogdGhpcy5icnVzaFRoaWNrbmVzcyxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlID09PSAnc2hhcGUnKSB7XG4gICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgICB0aGlzLmRyYXdTaGFwZXMoKTtcbiAgICAgIHRoaXMuZHJhd1NoYXBlKHRoaXMuc2hhcGUhLCB0aGlzLnN0YXJ0WCwgdGhpcy5zdGFydFksIGV2ZW50Lm9mZnNldFgsIGV2ZW50Lm9mZnNldFkpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BEcmF3aW5nKCkge1xuICAgIHRoaXMuaXNEcmF3aW5nID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5tb2RlID09PSAnZHJhdycpIHtcbiAgICAgIHRoaXMuc2hhcGVzLnB1c2goe1xuICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgIHgxOiB0aGlzLnN0YXJ0WCxcbiAgICAgICAgeTE6IHRoaXMuc3RhcnRZLFxuICAgICAgICB4MjogdGhpcy5jdXJyZW50WCxcbiAgICAgICAgeTI6IHRoaXMuY3VycmVudFksXG4gICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yLFxuICAgICAgICB0aGlja25lc3M6IHRoaXMubGluZVRoaWNrbmVzcyxcbiAgICAgICAgbGluZVR5cGU6IHRoaXMubGluZVR5cGUsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gJ2ZyZWVoYW5kJykge1xuICAgICAgdGhpcy5zaGFwZXMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdmcmVlaGFuZCcsXG4gICAgICAgIHBvaW50czogdGhpcy5mcmVlaGFuZERyYXdpbmcsXG4gICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yLFxuICAgICAgICB0aGlja25lc3M6IHRoaXMuYnJ1c2hUaGlja25lc3MsXG4gICAgICB9KTtcbiAgICAgIHRoaXMuZnJlZWhhbmREcmF3aW5nID0gW107XG4gICAgfSBlbHNlIGlmICh0aGlzLm1vZGUgPT09ICdzaGFwZScpIHtcbiAgICAgIHRoaXMuc2hhcGVzLnB1c2goe1xuICAgICAgICB0eXBlOiB0aGlzLnNoYXBlISxcbiAgICAgICAgeDE6IHRoaXMuc3RhcnRYLFxuICAgICAgICB5MTogdGhpcy5zdGFydFksXG4gICAgICAgIHgyOiB0aGlzLmN1cnJlbnRYLFxuICAgICAgICB5MjogdGhpcy5jdXJyZW50WSxcbiAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXG4gICAgICAgIHRoaWNrbmVzczogdGhpcy5saW5lVGhpY2tuZXNzLFxuICAgICAgICBsaW5lVHlwZTogdGhpcy5saW5lVHlwZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5yZW1vdmVTaGFwZSgpLCAxNTAwMCk7XG4gIH1cblxuICBkcmF3TGluZSA9ICh4MTogbnVtYmVyLCB5MTogbnVtYmVyLCB4MjogbnVtYmVyLCB5MjogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IHRoaXMubGluZVRoaWNrbmVzcztcbiAgICBpZiAodGhpcy5saW5lVHlwZSA9PT0gJ2Rhc2hlZCcpIHtcbiAgICAgIHRoaXMuY3R4LnNldExpbmVEYXNoKFsxMCwgMTBdKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubGluZVR5cGUgPT09ICdkb3R0ZWQnKSB7XG4gICAgICB0aGlzLmN0eC5zZXRMaW5lRGFzaChbMiwgMTBdKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubGluZVR5cGUgPT09ICdkYXNoRG90Jykge1xuICAgICAgdGhpcy5jdHguc2V0TGluZURhc2goWzEwLCA1LCAyLCA1XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3R4LnNldExpbmVEYXNoKFtdKTtcbiAgICB9XG4gICAgdGhpcy5jdHgubW92ZVRvKHgxLCB5MSk7XG4gICAgdGhpcy5jdHgubGluZVRvKHgyLCB5Mik7XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgdGhpcy5jdHguc2V0TGluZURhc2goW10pO1xuICB9O1xuXG4gIGRyYXdTaGFwZXMgPSAoKSA9PiB7XG4gICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgIHRoaXMuc2hhcGVzLmZvckVhY2goKHNoYXBlKSA9PiB7XG4gICAgICBpZiAoc2hhcGUudHlwZSA9PT0gJ2xpbmUnKSB7XG4gICAgICAgIHRoaXMuZHJhd0xpbmUoc2hhcGUueDEsIHNoYXBlLnkxLCBzaGFwZS54Miwgc2hhcGUueTIpO1xuICAgICAgfSBlbHNlIGlmIChzaGFwZS50eXBlID09PSAnZnJlZWhhbmQnKSB7XG4gICAgICAgIHRoaXMuZHJhd0ZyZWVoYW5kKHNoYXBlLnBvaW50cyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRyYXdTaGFwZShzaGFwZS50eXBlLCBzaGFwZS54MSwgc2hhcGUueTEsIHNoYXBlLngyLCBzaGFwZS55Mik7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgZHJhd0ZyZWVoYW5kID0gKHBvaW50czogeyB4OiBudW1iZXI7IHk6IG51bWJlcjsgY29sb3I6IHN0cmluZzsgdGhpY2tuZXNzOiBudW1iZXIgfVtdKSA9PiB7XG4gICAgaWYgKHBvaW50cy5sZW5ndGggPCAyKSByZXR1cm47XG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IHRoaXMuYnJ1c2hUaGlja25lc3M7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHgubW92ZVRvKHBvaW50c1swXS54LCBwb2ludHNbMF0ueSk7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuY3R4LmxpbmVUbyhwb2ludHNbaV0ueCwgcG9pbnRzW2ldLnkpO1xuICAgIH1cbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgfTtcblxuICBkcmF3U2hhcGUgPSAodHlwZTogc3RyaW5nLCB4MTogbnVtYmVyLCB5MTogbnVtYmVyLCB4MjogbnVtYmVyLCB5MjogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IHRoaXMubGluZVRoaWNrbmVzcztcbiAgICBpZiAodGhpcy5saW5lVHlwZSA9PT0gJ2Rhc2hlZCcpIHtcbiAgICAgIHRoaXMuY3R4LnNldExpbmVEYXNoKFsxMCwgMTBdKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubGluZVR5cGUgPT09ICdkb3R0ZWQnKSB7XG4gICAgICB0aGlzLmN0eC5zZXRMaW5lRGFzaChbMiwgMTBdKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubGluZVR5cGUgPT09ICdkYXNoRG90Jykge1xuICAgICAgdGhpcy5jdHguc2V0TGluZURhc2goWzEwLCA1LCAyLCA1XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3R4LnNldExpbmVEYXNoKFtdKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICdyZWN0YW5nbGUnKSB7XG4gICAgICB0aGlzLmN0eC5zdHJva2VSZWN0KHgxLCB5MSwgeDIgLSB4MSwgeTIgLSB5MSk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnY2lyY2xlJykge1xuICAgICAgY29uc3QgcmFkaXVzID0gTWF0aC5zcXJ0KE1hdGgucG93KHgyIC0geDEsIDIpICsgTWF0aC5wb3coeTIgLSB5MSwgMikpO1xuICAgICAgdGhpcy5jdHguYXJjKHgxLCB5MSwgcmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdyaG9tYnVzJykge1xuICAgICAgY29uc3QgY2VudGVyWCA9ICh4MSArIHgyKSAvIDI7XG4gICAgICBjb25zdCBjZW50ZXJZID0gKHkxICsgeTIpIC8gMjtcbiAgICAgIHRoaXMuY3R4Lm1vdmVUbyhjZW50ZXJYLCB5MSk7XG4gICAgICB0aGlzLmN0eC5saW5lVG8oeDIsIGNlbnRlclkpO1xuICAgICAgdGhpcy5jdHgubGluZVRvKGNlbnRlclgsIHkyKTtcbiAgICAgIHRoaXMuY3R4LmxpbmVUbyh4MSwgY2VudGVyWSk7XG4gICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3BlbnRhZ29uJykge1xuICAgICAgdGhpcy5kcmF3UG9seWdvbig1LCB4MSwgeTEsIHgyLCB5Mik7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnaGV4YWdvbicpIHtcbiAgICAgIHRoaXMuZHJhd1BvbHlnb24oNiwgeDEsIHkxLCB4MiwgeTIpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3RyaWFuZ2xlJykge1xuICAgICAgY29uc3QgY2VudGVyWFRyaWFuZ2xlID0gKHgxICsgeDIpIC8gMjtcbiAgICAgIHRoaXMuY3R4Lm1vdmVUbyhjZW50ZXJYVHJpYW5nbGUsIHkxKTtcbiAgICAgIHRoaXMuY3R4LmxpbmVUbyh4MiwgeTIpO1xuICAgICAgdGhpcy5jdHgubGluZVRvKHgxLCB5Mik7XG4gICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3NxdWFyZScpIHtcbiAgICAgIHRoaXMuY3R4LnN0cm9rZVJlY3QoeDEsIHkxLCB4MiAtIHgxLCB4MiAtIHgxKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvY3RhZ29uJykge1xuICAgICAgdGhpcy5kcmF3UG9seWdvbig4LCB4MSwgeTEsIHgyLCB5Mik7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb3ZhbCcpIHtcbiAgICAgIGNvbnN0IHJhZGl1c1ggPSBNYXRoLmFicyh4MiAtIHgxKSAvIDI7XG4gICAgICBjb25zdCByYWRpdXNZID0gTWF0aC5hYnMoeTIgLSB5MSkgLyAyO1xuICAgICAgY29uc3QgY2VudGVyWCA9ICh4MSArIHgyKSAvIDI7XG4gICAgICBjb25zdCBjZW50ZXJZID0gKHkxICsgeTIpIC8gMjtcbiAgICAgIHRoaXMuY3R4LmVsbGlwc2UoY2VudGVyWCwgY2VudGVyWSwgcmFkaXVzWCwgcmFkaXVzWSwgMCwgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAncGFyYWxsZWxvZ3JhbScpIHtcbiAgICAgIGNvbnN0IGNlbnRlclggPSAoeDEgKyB4MikgLyAyO1xuICAgICAgdGhpcy5jdHgubW92ZVRvKGNlbnRlclgsIHkxKTtcbiAgICAgIHRoaXMuY3R4LmxpbmVUbyh4MiwgeTIpO1xuICAgICAgdGhpcy5jdHgubGluZVRvKGNlbnRlclgsIHkyKTtcbiAgICAgIHRoaXMuY3R4LmxpbmVUbyh4MSwgeTEpO1xuICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICB9XG4gICAgdGhpcy5jdHguc2V0TGluZURhc2goW10pO1xuICB9O1xuXG4gIGRyYXdQb2x5Z29uID0gKHNpZGVzOiBudW1iZXIsIHgxOiBudW1iZXIsIHkxOiBudW1iZXIsIHgyOiBudW1iZXIsIHkyOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBjZW50ZXJYID0gKHgxICsgeDIpIC8gMjtcbiAgICBjb25zdCBjZW50ZXJZID0gKHkxICsgeTIpIC8gMjtcbiAgICBjb25zdCByYWRpdXMgPSBNYXRoLm1pbihNYXRoLmFicyh4MiAtIHgxKSwgTWF0aC5hYnMoeTIgLSB5MSkpIC8gMjtcbiAgICBjb25zdCBhbmdsZSA9ICgyICogTWF0aC5QSSkgLyBzaWRlcztcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpZGVzOyBpKyspIHtcbiAgICAgIGNvbnN0IHggPSBjZW50ZXJYICsgcmFkaXVzICogTWF0aC5jb3MoaSAqIGFuZ2xlIC0gTWF0aC5QSSAvIDIpO1xuICAgICAgY29uc3QgeSA9IGNlbnRlclkgKyByYWRpdXMgKiBNYXRoLnNpbihpICogYW5nbGUgLSBNYXRoLlBJIC8gMik7XG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oeCwgeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCwgeSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICB9O1xuXG4gIHJlbW92ZVNoYXBlID0gKCkgPT4ge1xuICAgIHRoaXMuc2hhcGVzLnNoaWZ0KCk7XG4gICAgdGhpcy5kcmF3U2hhcGVzKCk7XG4gIH07XG5cbiAgZXJhc2UgPSAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgdGhpcy5jdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLW91dCc7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguYXJjKHgsIHksIHRoaXMuZXJhc2VyVGhpY2tuZXNzIC8gMiwgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcbiAgICB0aGlzLmN0eC5maWxsKCk7XG4gICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuXG4gICAgdGhpcy5zaGFwZXMgPSB0aGlzLnNoYXBlc1xuICAgICAgLm1hcCgoc2hhcGUpID0+IHtcbiAgICAgICAgaWYgKHNoYXBlLnR5cGUgPT09ICdmcmVlaGFuZCcpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uc2hhcGUsXG4gICAgICAgICAgICBwb2ludHM6IHNoYXBlLnBvaW50cy5maWx0ZXIoKHBvaW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoTWF0aC5wb3cocG9pbnQueCAtIHgsIDIpICsgTWF0aC5wb3cocG9pbnQueSAtIHksIDIpKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGRpc3RhbmNlID4gdGhpcy5lcmFzZXJUaGlja25lc3MgLyAyO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChzaGFwZS50eXBlID09PSAnbGluZScpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLmlzUG9pbnROZWFyTGluZShcbiAgICAgICAgICAgICAgeCxcbiAgICAgICAgICAgICAgeSxcbiAgICAgICAgICAgICAgc2hhcGUueDEsXG4gICAgICAgICAgICAgIHNoYXBlLnkxLFxuICAgICAgICAgICAgICBzaGFwZS54MixcbiAgICAgICAgICAgICAgc2hhcGUueTIsXG4gICAgICAgICAgICAgIHRoaXMuZXJhc2VyVGhpY2tuZXNzIC8gMixcbiAgICAgICAgICAgIClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzaGFwZS50eXBlID09PSAndGV4dCcpIHtcbiAgICAgICAgICBjb25zdCB0ZXh0V2lkdGggPSB0aGlzLmN0eC5tZWFzdXJlVGV4dChzaGFwZS50ZXh0KS53aWR0aDtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB4ID4gc2hhcGUueCAmJlxuICAgICAgICAgICAgeCA8IHNoYXBlLnggKyB0ZXh0V2lkdGggJiZcbiAgICAgICAgICAgIHkgPiBzaGFwZS55IC0gc2hhcGUuZm9udFNpemUgJiZcbiAgICAgICAgICAgIHkgPCBzaGFwZS55XG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHggPiBzaGFwZS54MSAmJiB4IDwgc2hhcGUueDIgJiYgeSA+IHNoYXBlLnkxICYmIHkgPCBzaGFwZS55Mikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaGFwZTtcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKChzaGFwZSkgPT4gc2hhcGUgJiYgKHNoYXBlLnR5cGUgIT09ICdmcmVlaGFuZCcgfHwgc2hhcGUucG9pbnRzLmxlbmd0aCA+IDApKTtcbiAgfTtcblxuICBpc1BvaW50TmVhckxpbmUoXG4gICAgcHg6IG51bWJlcixcbiAgICBweTogbnVtYmVyLFxuICAgIHgxOiBudW1iZXIsXG4gICAgeTE6IG51bWJlcixcbiAgICB4MjogbnVtYmVyLFxuICAgIHkyOiBudW1iZXIsXG4gICAgdGhyZXNob2xkOiBudW1iZXIsXG4gICk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGR4ID0geDIgLSB4MTtcbiAgICBjb25zdCBkeSA9IHkyIC0geTE7XG4gICAgY29uc3QgbGVuZ3RoID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICBjb25zdCBkb3QgPSAoKHB4IC0geDEpICogZHggKyAocHkgLSB5MSkgKiBkeSkgLyAobGVuZ3RoICogbGVuZ3RoKTtcbiAgICBjb25zdCBjbG9zZXN0WCA9IHgxICsgZG90ICogZHg7XG4gICAgY29uc3QgY2xvc2VzdFkgPSB5MSArIGRvdCAqIGR5O1xuICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHB4IC0gY2xvc2VzdFgsIDIpICsgTWF0aC5wb3cocHkgLSBjbG9zZXN0WSwgMikpO1xuICAgIHJldHVybiBkaXN0YW5jZSA8PSB0aHJlc2hvbGQ7XG4gIH1cblxuICB0b2dnbGVUb29sYmFyID0gKCkgPT4ge1xuICAgIHRoaXMudG9vbGJhclZpc2libGUgPSAhdGhpcy50b29sYmFyVmlzaWJsZTtcbiAgfTtcblxuICB0b2dnbGVBbm5vdGF0ZSA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBhbm5vdGF0ZVNjcmVlblN0cmVhbSA9IHRoaXMucGFyYW1ldGVycy5hbm5vdGF0ZVNjcmVlblN0cmVhbTtcbiAgICB0aGlzLnBhcmFtZXRlcnMuYW5ub3RhdGVTY3JlZW5TdHJlYW0gPSAhYW5ub3RhdGVTY3JlZW5TdHJlYW07XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVBbm5vdGF0ZVNjcmVlblN0cmVhbSghYW5ub3RhdGVTY3JlZW5TdHJlYW0pO1xuICAgIH0pO1xuICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuYW5ub3RhdGVTY3JlZW5TdHJlYW0pIHtcbiAgICAgIHRoaXMudG9vbGJhclZpc2libGUgPSB0cnVlO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogYFlvdSBjYW4gbm93IGFubm90YXRlIHRoZSBzY3JlZW4uIElmIHlvdSBjYW5ub3Qgc2VlIHlvdXIgYW5ub3RhdGlvbiBjb250cm9scyAob24gdG9wKSwgdHJ5IG1pbmltaXppbmcgeW91ciBzY3JlZW4gYnkgdXNpbmcgJ0NtZCcgKyAnLScgKG9uIE1hYykgb3IgJ0N0cmwnICsgJy0nIChvbiBXaW5kb3dzKS5gLFxuICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgIGR1cmF0aW9uOiA5MDAwLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudG9vbGJhclZpc2libGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlSXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZSh0cnVlKTtcbiAgICBhd2FpdCB0aGlzLnBhcmFtZXRlcnMuc2xlZXAoeyBtczogNTAwIH0pO1xuICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVJc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfTtcbn1cbiIsIjxkaXYgaWQ9XCJzY3JlZW5ib2FyZC1pbnRlcmZhY2VcIiAqbmdJZj1cInNob3dBc3BlY3RcIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTsgZGlzcGxheTogYmxvY2s7IGp1c3RpZnktY29udGVudDogY2VudGVyOyBhbGlnbi1pdGVtczogY2VudGVyOyBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsgei1pbmRleDogMTAwMDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgbWF4LXdpZHRoOiAxMDAlOyBtYXgtaGVpZ2h0OiAxMDAlOyBvdmVyZmxvdzogYXV0bztcIiAjc2NyZWVuYm9hcmRSZWY+XHJcbiAgPGRpdiBpZD1cInNjcmVlbmJvYXJkQ29udGVudFwiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlOyBkaXNwbGF5OiBmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgYWxpZ24taXRlbXM6IGNlbnRlcjsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgb3ZlcmZsb3c6IGhpZGRlbjsgdG9wOiAwOyBsZWZ0OiAwO1wiICNzY3JlZW5ib2FyZENvbnRlbnRSZWY+XHJcbiAgICA8YnV0dG9uIGlkPVwiYW5ub3RhdGVTY3JlZW5cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG5Cb2FyZFNjcmVlbiBhbm5vdGF0ZVNjcmVlbkJ0blwiIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyB0b3A6IDVweDsgcmlnaHQ6IDEwcHg7IHotaW5kZXg6IDEwMDA7XCIgKGNsaWNrKT1cInRvZ2dsZUFubm90YXRlKClcIj5cclxuICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFQZW5jaWxBbHRcIiBbbmdTdHlsZV09XCJ7J2NvbG9yJzogcGFyYW1ldGVycy5hbm5vdGF0ZVNjcmVlblN0cmVhbSA/ICdyZWQnIDogJ2dyZWVuJ31cIj48L2ZhLWljb24+XHJcbiAgICA8L2J1dHRvbj5cclxuXHJcbiAgICA8YnV0dG9uIGlkPVwidG9vbGJhclRvZ2dsZVNjcmVlblwiICpuZ0lmPVwicGFyYW1ldGVycy5hbm5vdGF0ZVNjcmVlblN0cmVhbVwiIGNsYXNzPVwiYnRuIGJ0bkJvYXJkU2NyZWVuIGJ0bi1wcmltYXJ5XCIgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogNXB4OyByaWdodDogNTVweDsgei1pbmRleDogMTAwMDtcIiAoY2xpY2spPVwidG9nZ2xlVG9vbGJhcigpXCI+XHJcbiAgICAgIDxmYS1pY29uIFtpY29uXT1cInRvb2xiYXJWaXNpYmxlID8gZmFDaGV2cm9uUmlnaHQgOiBmYUNoZXZyb25MZWZ0XCI+PC9mYS1pY29uPlxyXG4gICAgPC9idXR0b24+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cInRvb2xiYXJTY3JlZW4gbWItM1wiIGlkPVwidG9vbGJhclNjcmVlblwiIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyB0b3A6IDVweDsgcmlnaHQ6IDEwNXB4OyB6LWluZGV4OiAxMDAwOyBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcIiBbc3R5bGUuZGlzcGxheV09XCJ0b29sYmFyVmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZSdcIj5cclxuICAgICAgPCEtLSBEcmF3IE1vZGUgRHJvcGRvd24gLS0+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bkJvYXJkU2NyZWVuIGJ0bi1zZWNvbmRhcnkgZHJvcGRvd24tdG9nZ2xlXCIgaWQ9XCJkcmF3TW9kZVNjcmVlblwiIChjbGljayk9XCJoYW5kbGVEcm9wZG93bkNsaWNrKCdkcmF3TW9kZVNjcmVlbicpXCI+XHJcbiAgICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVBlbmNpbEFsdFwiPjwvZmEtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwiZHJvcGRvd25PcGVuID09PSAnZHJhd01vZGVTY3JlZW4nXCIgY2xhc3M9XCJkcm9wZG93bi1tZW51IHNob3dcIj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNldERyYXdNb2RlKDMpXCI+WFgtU21hbGwgKDNweCk8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNldERyYXdNb2RlKDYpXCI+WC1TbWFsbCAoNnB4KTwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwic2V0RHJhd01vZGUoMTIpXCI+U21hbGwgKDEycHgpPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXREcmF3TW9kZSgxOClcIj5NZWRpdW0gKDE4cHgpPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXREcmF3TW9kZSgyNClcIj5MYXJnZSAoMjRweCk8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNldERyYXdNb2RlKDM2KVwiPlgtTGFyZ2UgKDM2cHgpPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPCEtLSBGcmVlaGFuZCBNb2RlIERyb3Bkb3duIC0tPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG5Cb2FyZFNjcmVlbiBidG4tZGFyayBkcm9wZG93bi10b2dnbGVcIiBpZD1cImZyZWVoYW5kTW9kZVNjcmVlblwiIChjbGljayk9XCJoYW5kbGVEcm9wZG93bkNsaWNrKCdmcmVlaGFuZE1vZGVTY3JlZW4nKVwiPlxyXG4gICAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFQYWludEJydXNoXCI+PC9mYS1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxkaXYgKm5nSWY9XCJkcm9wZG93bk9wZW4gPT09ICdmcmVlaGFuZE1vZGVTY3JlZW4nXCIgY2xhc3M9XCJkcm9wZG93bi1tZW51IHNob3dcIj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNldEZyZWVoYW5kTW9kZSg1KVwiPlgtU21hbGwgKDVweCk8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNldEZyZWVoYW5kTW9kZSgxMClcIj5TbWFsbCAoMTBweCk8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNldEZyZWVoYW5kTW9kZSgyMClcIj5NZWRpdW0gKDIwcHgpPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXRGcmVlaGFuZE1vZGUoNDApXCI+TGFyZ2UgKDQwcHgpPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXRGcmVlaGFuZE1vZGUoNjApXCI+WC1MYXJnZSAoNjBweCk8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8IS0tIFNoYXBlIE1vZGUgRHJvcGRvd24gd2l0aCBJbWFnZXMgLS0+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bkJvYXJkU2NyZWVuIGJ0bi1kYXJrIGRyb3Bkb3duLXRvZ2dsZVwiIGlkPVwic2hhcGVNb2RlU2NyZWVuXCIgKGNsaWNrKT1cImhhbmRsZURyb3Bkb3duQ2xpY2soJ3NoYXBlTW9kZVNjcmVlbicpXCI+XHJcbiAgICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVNoYXBlc1wiPjwvZmEtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwiZHJvcGRvd25PcGVuID09PSAnc2hhcGVNb2RlU2NyZWVuJ1wiIGNsYXNzPVwiZHJvcGRvd24tbWVudSBzaG93XCI+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXRTaGFwZU1vZGUoJ3NxdWFyZScpXCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9zcXVhcmUuc3ZnXCIgYWx0PVwiU3F1YXJlXCIgY2xhc3M9XCJzaGFwZS1pY29uXCIgLz4gU3F1YXJlXHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNldFNoYXBlTW9kZSgncmVjdGFuZ2xlJylcIj5cclxuICAgICAgICAgICAgPGltZyBzcmM9XCJodHRwczovL21lZGlhc2Z1LmNvbS9pbWFnZXMvc3ZnL3JlY3RhbmdsZS5zdmdcIiBhbHQ9XCJSZWN0YW5nbGVcIiBjbGFzcz1cInNoYXBlLWljb25cIiAvPiBSZWN0YW5nbGVcclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwic2V0U2hhcGVNb2RlKCdjaXJjbGUnKVwiPlxyXG4gICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vbWVkaWFzZnUuY29tL2ltYWdlcy9zdmcvY2lyY2xlLnN2Z1wiIGFsdD1cIkNpcmNsZVwiIGNsYXNzPVwic2hhcGUtaWNvblwiIC8+IENpcmNsZVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXRTaGFwZU1vZGUoJ3RyaWFuZ2xlJylcIj5cclxuICAgICAgICAgICAgPGltZyBzcmM9XCJodHRwczovL21lZGlhc2Z1LmNvbS9pbWFnZXMvc3ZnL3RyaWFuZ2xlLnN2Z1wiIGFsdD1cIlRyaWFuZ2xlXCIgY2xhc3M9XCJzaGFwZS1pY29uXCIgLz4gVHJpYW5nbGVcclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwic2V0U2hhcGVNb2RlKCdoZXhhZ29uJylcIj5cclxuICAgICAgICAgICAgPGltZyBzcmM9XCJodHRwczovL21lZGlhc2Z1LmNvbS9pbWFnZXMvc3ZnL2hleGFnb24uc3ZnXCIgYWx0PVwiSGV4YWdvblwiIGNsYXNzPVwic2hhcGUtaWNvblwiIC8+IEhleGFnb25cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwic2V0U2hhcGVNb2RlKCdwZW50YWdvbicpXCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9wZW50YWdvbi5zdmdcIiBhbHQ9XCJQZW50YWdvblwiIGNsYXNzPVwic2hhcGUtaWNvblwiIC8+IFBlbnRhZ29uXHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNldFNoYXBlTW9kZSgncmhvbWJ1cycpXCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9yaG9tYnVzLnN2Z1wiIGFsdD1cIlJob21idXNcIiBjbGFzcz1cInNoYXBlLWljb25cIiAvPiBSaG9tYnVzXHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNldFNoYXBlTW9kZSgnb2N0YWdvbicpXCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9vY3RhZ29uLnN2Z1wiIGFsdD1cIk9jdGFnb25cIiBjbGFzcz1cInNoYXBlLWljb25cIiAvPiBPY3RhZ29uXHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNldFNoYXBlTW9kZSgnb3ZhbCcpXCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9vdmFsLnN2Z1wiIGFsdD1cIk92YWxcIiBjbGFzcz1cInNoYXBlLWljb25cIiAvPiBPdmFsXHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNldFNoYXBlTW9kZSgncGFyYWxsZWxvZ3JhbScpXCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL3N2Zy9wYXJhbGxlbG9ncmFtLnN2Z1wiIGFsdD1cIlBhcmFsbGVsb2dyYW1cIiBjbGFzcz1cInNoYXBlLWljb25cIiAvPiBQYXJhbGxlbG9ncmFtXHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8IS0tIEVyYXNlIE1vZGUgRHJvcGRvd24gLS0+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bkJvYXJkU2NyZWVuIGJ0bi1kYW5nZXIgZHJvcGRvd24tdG9nZ2xlXCIgaWQ9XCJlcmFzZU1vZGVTY3JlZW5cIiAoY2xpY2spPVwiaGFuZGxlRHJvcGRvd25DbGljaygnZXJhc2VNb2RlU2NyZWVuJylcIj5cclxuICAgICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhRXJhc2VyXCI+PC9mYS1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxkaXYgKm5nSWY9XCJkcm9wZG93bk9wZW4gPT09ICdlcmFzZU1vZGVTY3JlZW4nXCIgY2xhc3M9XCJkcm9wZG93bi1tZW51IHNob3dcIj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNldEVyYXNlTW9kZSg1KVwiPlgtU21hbGwgKDVweCk8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNldEVyYXNlTW9kZSgxMClcIj5TbWFsbCAoMTBweCk8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNldEVyYXNlTW9kZSgyMClcIj5NZWRpdW0gKDIwcHgpPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXRFcmFzZU1vZGUoMzApXCI+TGFyZ2UgKDMwcHgpPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXRFcmFzZU1vZGUoNjApXCI+WC1MYXJnZSAoNjBweCk8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8IS0tIEFkZGl0aW9uYWwgVG9vbGJhciBDb250cm9scyAtLT5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG5Cb2FyZCBidG4tc3VjY2Vzc1wiIGlkPVwiem9vbVJlc2V0U2NyZWVuXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPlxyXG4gICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhU2VhcmNoXCI+PC9mYS1pY29uPlxyXG4gICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgIDxpbnB1dCB0eXBlPVwiY29sb3JcIiBjbGFzcz1cImJ0blwiIGlkPVwiY29sb3JQaWNrZXJTY3JlZW5cIiBbKG5nTW9kZWwpXT1cImNvbG9yXCI+XHJcbiAgICAgIDxzZWxlY3QgaWQ9XCJsaW5lVHlwZVBpY2tlclNjcmVlblwiIGNsYXNzPVwiY3VzdG9tLXNlbGVjdFwiIHN0eWxlPVwid2lkdGg6IGF1dG87XCIgWyhuZ01vZGVsKV09XCJsaW5lVHlwZVwiPlxyXG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJzb2xpZFwiPlNvbGlkPC9vcHRpb24+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImRhc2hlZFwiPkRhc2hlZDwvb3B0aW9uPlxyXG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJkb3R0ZWRcIj5Eb3R0ZWQ8L29wdGlvbj5cclxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiZGFzaERvdFwiPkRhc2gtRG90PC9vcHRpb24+XHJcbiAgICAgIDwvc2VsZWN0PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGNhbnZhcyBpZD1cImNhbnZhc1JlZlwiIHdpZHRoPVwiMTI4MFwiIGhlaWdodD1cIjcyMFwiIFtuZ1N0eWxlXT1cInsnZGlzcGxheSc6IHBhcmFtZXRlcnMuYW5ub3RhdGVTY3JlZW5TdHJlYW0gPyAnYmxvY2snIDogJ25vbmUnfVwiIHN0eWxlPVwicGFkZGluZzogMDsgbWFyZ2luOiAwO1wiICNjYW52YXNSZWY+PC9jYW52YXM+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=