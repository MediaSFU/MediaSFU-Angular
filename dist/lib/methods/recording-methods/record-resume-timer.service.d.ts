import { ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface RecordResumeTimerParameters {
    isTimerRunning: boolean;
    canPauseResume: boolean;
    recordElapsedTime: number;
    recordStartTime: number;
    recordTimerInterval?: NodeJS.Timeout | null;
    showAlert?: ShowAlert;
    updateRecordStartTime: (time: number) => void;
    updateRecordTimerInterval: (interval: NodeJS.Timeout | null) => void;
    updateIsTimerRunning: (isRunning: boolean) => void;
    updateCanPauseResume: (canPause: boolean) => void;
    getUpdatedAllParams: () => RecordResumeTimerParameters;
    [key: string]: any;
}
export interface RecordResumeTimerOptions {
    parameters: RecordResumeTimerParameters;
}
export type RecordResumeTimerType = (options: RecordResumeTimerOptions) => Promise<boolean>;
export declare class RecordResumeTimer {
    recordResumeTimer: ({ parameters }: RecordResumeTimerOptions) => Promise<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordResumeTimer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RecordResumeTimer>;
}
