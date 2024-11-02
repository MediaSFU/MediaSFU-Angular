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
 * MeetingProgressTimer displays a customizable timer badge to track meeting progress time.
 *
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
 * - `.badge-container`: General container style with positioning.
 * - `.progress-timer`: Timer badge with default padding, background, and border-radius.
 * - `.progress-timer-text`: Text styling within the timer badge.
 *
 * @inputs
 * - `meetingProgressTime` (string): Time to be displayed in the timer.
 * - `initialBackgroundColor` (string): Background color of the timer badge. Default is 'green'.
 * - `position` ('topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'): Position of the timer on the screen. Default is 'topLeft'.
 * - `textStyle` (object): Custom styles for the timer text.
 * - `showTimer` (boolean): If true, displays the timer. Default is true.
 *
 * @property `positions` (object): Preset styles for timer positioning options.
 *
 * @methods
 * - `ngOnChanges(changes: SimpleChanges)`: Handles changes to input properties and updates styles accordingly.
 *
 * @example
 * ```html
 * <app-meeting-progress-timer
 *   [meetingProgressTime]="'10:30'"
 *   [initialBackgroundColor]="'blue'"
 *   [position]="'bottomRight'"
 *   [textStyle]="{ color: 'white', fontWeight: 'bold' }"
 *   [showTimer]="true"
 * ></app-meeting-progress-timer>
 * ```
 **/
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
