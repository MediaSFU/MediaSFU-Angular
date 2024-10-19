import * as i0 from "@angular/core";
export interface OtherGridComponentOptions {
    backgroundColor?: string;
    width?: number;
    height?: number;
    showAspect?: boolean;
    timeBackgroundColor?: string;
    showTimer?: boolean;
    meetingProgressTime?: string;
}
export type OtherGridComponentType = (options: OtherGridComponentOptions) => HTMLElement;
/**
 * Component representing a customizable grid with an optional timer.
 *
 * @selector app-other-grid-component
 * @standalone true
 * @imports CommonModule, MeetingProgressTimer
 *
 * @template
 * <div [ngStyle]="{...}">
 *   <app-meeting-progress-timer *ngIf="showTimer" [meetingProgressTime]="meetingProgressTime" [initialBackgroundColor]="timeBackgroundColor" [showTimer]="showTimer"></app-meeting-progress-timer>
 *   <ng-content></ng-content>
 * </div>
 *
 * @class OtherGridComponent
 *
 * @property {string} backgroundColor - The background color of the grid. Default is 'transparent'.
 * @property {number} width - The width of the grid in pixels. Default is 0.
 * @property {number} height - The height of the grid in pixels. Default is 0.
 * @property {boolean} showAspect - Flag to show or hide the grid. Default is true.
 * @property {string} timeBackgroundColor - The background color of the timer. Default is 'green'.
 * @property {boolean} showTimer - Flag to show or hide the timer. Default is false.
 * @property {string} meetingProgressTime - The meeting progress time to be displayed in the timer. Default is '00:00:00'.
 */
export declare class OtherGridComponent {
    backgroundColor: string;
    width: number;
    height: number;
    showAspect: boolean;
    timeBackgroundColor: string;
    showTimer: boolean;
    meetingProgressTime: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OtherGridComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OtherGridComponent, "app-other-grid-component", never, { "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "width": { "alias": "width"; "required": false; }; "height": { "alias": "height"; "required": false; }; "showAspect": { "alias": "showAspect"; "required": false; }; "timeBackgroundColor": { "alias": "timeBackgroundColor"; "required": false; }; "showTimer": { "alias": "showTimer"; "required": false; }; "meetingProgressTime": { "alias": "meetingProgressTime"; "required": false; }; }, {}, never, ["*"], true, never>;
}
