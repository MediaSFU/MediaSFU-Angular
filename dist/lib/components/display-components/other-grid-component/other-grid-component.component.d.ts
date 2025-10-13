import { TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export interface OtherGridComponentOptions {
    backgroundColor?: string;
    width?: number;
    height?: number;
    showAspect?: boolean;
    timeBackgroundColor?: string;
    showTimer?: boolean;
    meetingProgressTime?: string;
    containerStyle?: Partial<CSSStyleDeclaration>;
    customTemplate?: TemplateRef<any>;
}
export type OtherGridComponentType = (options: OtherGridComponentOptions) => HTMLElement;
/**
 * OtherGridComponent represents a customizable grid container with optional meeting progress timer.
 *
 * @selector app-other-grid-component
 * @standalone true
 * @imports CommonModule, MeetingProgressTimer
 *
 * @template
 * - The template consists of:
 *   - A grid container styled with specified dimensions, background color, and border.
 *   - An optional `MeetingProgressTimer` component displayed within the grid if `showTimer` is true.
 *
 * @styles
 * - Default border, padding, and display styles for the grid container.
 *
 * @inputs
 * - `backgroundColor` (string): Background color of the grid container. Default is `'transparent'`.
 * - `width` (number): Width of the grid in pixels. Default is `0`.
 * - `height` (number): Height of the grid in pixels. Default is `0`.
 * - `showAspect` (boolean): Controls visibility of the grid container. Default is `true`.
 * - `timeBackgroundColor` (string): Background color of the timer. Default is `'green'`.
 * - `showTimer` (boolean): Determines if the timer should be displayed. Default is `false`.
 * - `meetingProgressTime` (string): Time to display in the timer. Default is `'00:00:00'`.
 *
 * @class OtherGridComponent
 * @example
 * ```html
 * <app-other-grid-component
 *   [backgroundColor]="'lightgray'"
 *   [width]="300"
 *   [height]="200"
 *   [showAspect]="true"
 *   [timeBackgroundColor]="'blue'"
 *   [showTimer]="true"
 *   [meetingProgressTime]="'00:05:32'"
 * ></app-other-grid-component>
 * ```
 */
export declare class OtherGridComponent {
    backgroundColor: string;
    width: number;
    height: number;
    showAspect: boolean;
    timeBackgroundColor: string;
    showTimer: boolean;
    meetingProgressTime: string;
    containerStyle?: Partial<CSSStyleDeclaration>;
    customTemplate?: TemplateRef<any>;
    get otherGridContainerStyle(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<OtherGridComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OtherGridComponent, "app-other-grid-component", never, { "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "width": { "alias": "width"; "required": false; }; "height": { "alias": "height"; "required": false; }; "showAspect": { "alias": "showAspect"; "required": false; }; "timeBackgroundColor": { "alias": "timeBackgroundColor"; "required": false; }; "showTimer": { "alias": "showTimer"; "required": false; }; "meetingProgressTime": { "alias": "meetingProgressTime"; "required": false; }; "containerStyle": { "alias": "containerStyle"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, {}, never, ["*"], true, never>;
}
