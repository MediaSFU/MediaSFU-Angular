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
 * MainGridComponent is a standalone Angular component that displays a grid container
 * with optional meeting progress timer and customizable styles.
 *
 * @selector app-main-grid-component
 * @standalone true
 * @imports CommonModule, MeetingProgressTimer
 *
 * @template
 * <div [ngStyle]="maingridContainerStyle">
 *   <app-meeting-progress-timer
 *     *ngIf="showTimer"
 *     [meetingProgressTime]="meetingProgressTime"
 *     [initialBackgroundColor]="timeBackgroundColor"
 *   ></app-meeting-progress-timer>
 *   <ng-content></ng-content>
 * </div>
 *
 * @Inputs
 * @property {string} backgroundColor - The background color of the grid container.
 * @property {number} mainSize - The main size of the grid container.
 * @property {number} height - The height of the grid container in pixels.
 * @property {number} width - The width of the grid container in pixels.
 * @property {boolean} showAspect - Determines if the grid container should be displayed as flex.
 * @property {string} timeBackgroundColor - The background color of the meeting progress timer.
 * @property {boolean} showTimer - Determines if the meeting progress timer should be displayed.
 * @property {string} meetingProgressTime - The progress time to be displayed in the meeting progress timer.
 *
 * @getter maingridContainerStyle - Returns the style object for the grid container.
 * @returns {Object} The style object for the grid container.
 */
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
