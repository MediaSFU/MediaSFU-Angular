import * as i0 from "@angular/core";
/**
 * RecordTimerWidget displays the current recording progress time.
 *
 * @selector app-record-timer-widget
 * @standalone true
 * @imports CommonModule
 *
 * @inputs
 * - `recordingProgressTime` (string): The time to display as recording progress.
 *
 * @example
 * ```html
 * <app-record-timer-widget [recordingProgressTime]="'00:05:23'"></app-record-timer-widget>
 * ```
 **/
export declare class RecordTimerWidget {
    recordingProgressTime: string;
    constructor(recordingProgressTime: string);
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordTimerWidget, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RecordTimerWidget, "app-record-timer-widget", never, {}, {}, never, never, true, never>;
}
