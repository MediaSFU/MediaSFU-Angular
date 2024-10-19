import { SimpleChanges, OnChanges } from '@angular/core';
import * as i0 from "@angular/core";
export interface MeetingProgressTimerOptions {
    meetingProgressTime: string;
    initialBackgroundColor?: string;
    position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    textStyle?: {
        [key: string]: string | number;
    };
    showTimer?: boolean;
}
export type MeetingProgressTimerType = (options: MeetingProgressTimerOptions) => HTMLElement;
/**
 * Component to display a meeting progress timer.
 *s
 * @selector app-meeting-progress-timer
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * ```html
 * <div [ngStyle]="positions[position]" class="badge-container">
 *   <div [ngStyle]="{ backgroundColor: initialBackgroundColor, display: showTimer ? 'block' : 'none' }" class="progress-timer">
 *     <span [ngStyle]="textStyle" class="progress-timer-text">{{ meetingProgressTime }}</span>
 *   </div>
 * </div>
 * ```
 *
 * @styles
 * ```css
 * .badge-container {
 *   padding: 5px;
 *   position: relative;
 *   z-index: 1000;
 * }
 * .progress-timer {
 *   background-color: green;
 *   padding: 5px;
 *   border-radius: 5px;
 *   color: white;
 * }
 * .progress-timer-text {
 *   color: black;
 * }
 * ```
 *
 * @class MeetingProgressTimer
 * @implements OnInit, OnChanges
 *
 * @property {string} meetingProgressTime - The time to be displayed in the timer.
 * @property {string} [initialBackgroundColor='green'] - The initial background color of the timer.
 * @property {'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'} [position='topLeft'] - The position of the timer on the screen.
 * @property {{ [key: string]: string | number }} [textStyle={}] - The style to be applied to the timer text.
 * @property {boolean} [showTimer=true] - Flag to show or hide the timer.
 *
 * @property {{ [key: string]: { position: string, top?: string, bottom?: string, left?: string, right?: string } }} positions - The possible positions for the timer.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property of a directive changes.
 * @param {SimpleChanges} changes - The changed properties.
 */
export declare class MeetingProgressTimer implements OnChanges {
    meetingProgressTime: string;
    initialBackgroundColor: string;
    position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    textStyle: {
        [key: string]: string | number;
    };
    showTimer: boolean;
    positions: {
        [key: string]: {
            position: string;
            top?: string;
            bottom?: string;
            left?: string;
            right?: string;
        };
    };
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MeetingProgressTimer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MeetingProgressTimer, "app-meeting-progress-timer", never, { "meetingProgressTime": { "alias": "meetingProgressTime"; "required": false; }; "initialBackgroundColor": { "alias": "initialBackgroundColor"; "required": false; }; "position": { "alias": "position"; "required": false; }; "textStyle": { "alias": "textStyle"; "required": false; }; "showTimer": { "alias": "showTimer"; "required": false; }; }, {}, never, never, true, never>;
}
