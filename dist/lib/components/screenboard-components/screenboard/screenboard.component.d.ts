import { OnInit, ElementRef, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { SleepType, ShowAlert } from '../../../@types/types';
import * as i0 from "@angular/core";
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
export declare class Screenboard implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    customWidth: number;
    customHeight: number;
    parameters: ScreenboardParameters;
    showAspect: boolean;
    canvasRef: ElementRef<HTMLCanvasElement>;
    screenboardRef: ElementRef<HTMLDivElement>;
    screenboardContentRef: ElementRef<HTMLDivElement>;
    faChevronRight: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faChevronLeft: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faPencilAlt: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faPaintBrush: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faShapes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faEraser: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faSearch: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faSearchPlus: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faSearchMinus: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faFont: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faTextHeight: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faUndo: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faRedo: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faSave: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faTrash: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faMousePointer: import("@fortawesome/fontawesome-common-types").IconDefinition;
    mode: 'draw' | 'freehand' | 'shape' | 'erase';
    isDrawing: boolean;
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    freehandDrawing: {
        x: number;
        y: number;
        color: string;
        thickness: number;
    }[];
    shapes: any[];
    eraserThickness: number;
    brushThickness: number;
    lineThickness: number;
    lineType: string;
    color: string;
    font: string;
    fontSize: number;
    shape: string | null;
    toolbarVisible: boolean;
    dropdownOpen: string | null;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    constructor(injectedCustomWidth: number, injectedCustomHeight: number, injectedParameters: any, injectedShowAspect: boolean);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    addListeners: () => void;
    handleMouseDown(event: MouseEvent): void;
    handleMouseMove(event: MouseEvent): void;
    handleMouseUp(): void;
    handleTouchStart(e: TouchEvent): void;
    handleTouchMove(e: TouchEvent): void;
    handleTouchEnd(e: TouchEvent): void;
    handleClickOutside(event: MouseEvent): void;
    handleDropdownClick(id: string): void;
    setDrawMode(thickness: number): void;
    setFreehandMode(thickness: number): void;
    setShapeMode(shape: string): void;
    setEraseMode(thickness: number): void;
    startDrawing(event: MouseEvent): void;
    draw(event: MouseEvent): void;
    stopDrawing(): void;
    drawLine: (x1: number, y1: number, x2: number, y2: number) => void;
    drawShapes: () => void;
    drawFreehand: (points: {
        x: number;
        y: number;
        color: string;
        thickness: number;
    }[]) => void;
    drawShape: (type: string, x1: number, y1: number, x2: number, y2: number) => void;
    drawPolygon: (sides: number, x1: number, y1: number, x2: number, y2: number) => void;
    removeShape: () => void;
    erase: (x: number, y: number) => void;
    isPointNearLine(px: number, py: number, x1: number, y1: number, x2: number, y2: number, threshold: number): boolean;
    toggleToolbar: () => void;
    toggleAnnotate: () => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<Screenboard, [{ optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Screenboard, "app-screenboard", never, { "customWidth": { "alias": "customWidth"; "required": false; }; "customHeight": { "alias": "customHeight"; "required": false; }; "parameters": { "alias": "parameters"; "required": false; }; "showAspect": { "alias": "showAspect"; "required": false; }; }, {}, never, never, true, never>;
}
