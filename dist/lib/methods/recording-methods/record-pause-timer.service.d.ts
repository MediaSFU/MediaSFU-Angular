import { ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface RecordPauseTimerOptions {
    stop?: boolean;
    isTimerRunning: boolean;
    canPauseResume: boolean;
    showAlert?: ShowAlert;
}
export type RecordPauseTimerType = (options: RecordPauseTimerOptions) => boolean;
export declare class RecordPauseTimer {
    /**
     * Controls the pause and resume functionality of a recording timer.
     *
     * @param {Object} options - The options for controlling the timer.
     * @param {boolean} [options.stop=false] - Indicates whether to stop the timer.
     * @param {Object} options.parameters - The parameters for the timer control.
     * @param {boolean} options.parameters.isTimerRunning - Indicates if the timer is currently running.
     * @param {boolean} options.parameters.canPauseResume - Indicates if the timer can be paused or resumed.
     * @param {Function} [options.parameters.showAlert] - Optional function to show an alert message.
     * @returns {boolean} - Returns true if the timer can be paused or resumed, otherwise false.
     */
    recordPauseTimer: ({ stop, isTimerRunning, canPauseResume, showAlert, }: RecordPauseTimerOptions) => boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordPauseTimer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RecordPauseTimer>;
}