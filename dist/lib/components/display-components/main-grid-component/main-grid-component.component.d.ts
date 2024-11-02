import * as i0 from "@angular/core";
export interface MainGridComponentOptions {
    backgroundColor?: string;
    mainSize?: number;
    height?: number;
    width?: number;
    showAspect?: boolean;
    timeBackgroundColor?: string;
    showTimer?: boolean;
    meetingProgressTime?: string;
}
export type MainGridComponentType = (options: MainGridComponentOptions) => HTMLElement;
/**
 * MainGridComponent displays a customizable grid container with an optional meeting progress timer.
 *
 * @selector app-main-grid-component
 * @standalone true
 * @imports CommonModule, MeetingProgressTimer
 *
 * @template
 * ```html
 * <div [ngStyle]="maingridContainerStyle">
 *   <app-meeting-progress-timer
 *     *ngIf="showTimer"
 *     [meetingProgressTime]="meetingProgressTime"
 *     [initialBackgroundColor]="timeBackgroundColor"
 *   ></app-meeting-progress-timer>
 *   <ng-content></ng-content>
 * </div>
 * ```
 *
 * @inputs
 * - `backgroundColor` (string): Background color of the grid container. Default is an empty string.
 * - `mainSize` (number): Main size of the grid container, used for layout adjustments.
 * - `height` (number): Height of the grid container in pixels.
 * - `width` (number): Width of the grid container in pixels.
 * - `showAspect` (boolean): If true, displays the grid container in flex layout. Default is true.
 * - `timeBackgroundColor` (string): Background color of the meeting progress timer. Default is 'green'.
 * - `showTimer` (boolean): If true, displays the meeting progress timer. Default is true.
 * - `meetingProgressTime` (string): Time displayed in the meeting progress timer.
 *
 * @getter
 * - `maingridContainerStyle`: Returns a style object for the grid container, including display, color, dimensions, and border styling.
 *
 * @example
 * ```html
 * <app-main-grid-component
 *   [backgroundColor]="'lightgrey'"
 *   [height]="500"
 *   [width]="500"
 *   [showAspect]="true"
 *   [timeBackgroundColor]="'blue'"
 *   [showTimer]="true"
 *   [meetingProgressTime]="'10:45'"
 * ></app-main-grid-component>
 * ```
 **/
export declare class MainGridComponent {
    backgroundColor: string;
    mainSize: number;
    height: number;
    width: number;
    showAspect: boolean;
    timeBackgroundColor: string;
    showTimer: boolean;
    meetingProgressTime: string;
    get maingridContainerStyle(): {
        display: string;
        backgroundColor: string;
        height: string;
        width: string;
        flexDirection: string;
        justifyContent: string;
        alignItems: string;
        borderStyle: string;
        borderColor: string;
        borderWidth: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<MainGridComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MainGridComponent, "app-main-grid-component", never, { "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "mainSize": { "alias": "mainSize"; "required": false; }; "height": { "alias": "height"; "required": false; }; "width": { "alias": "width"; "required": false; }; "showAspect": { "alias": "showAspect"; "required": false; }; "timeBackgroundColor": { "alias": "timeBackgroundColor"; "required": false; }; "showTimer": { "alias": "showTimer"; "required": false; }; "meetingProgressTime": { "alias": "meetingProgressTime"; "required": false; }; }, {}, never, ["*"], true, never>;
}
