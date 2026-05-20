import { RePortParameters, RePortType, ShowAlert, UserRecordingParams } from '../../@types/types';
import { Socket } from 'socket.io-client';
import { RecordResumeTimerParameters } from './record-resume-timer.service';
import * as i0 from "@angular/core";
export interface UpdateRecordingParameters extends RecordResumeTimerParameters, RePortParameters {
    roomName: string;
    userRecordingParams: UserRecordingParams;
    socket: Socket;
    localSocket?: Socket;
    updateIsRecordingModalVisible: (visible: boolean) => void;
    confirmedToRecord: boolean;
    showAlert?: ShowAlert;
    recordingMediaOptions: string;
    videoAlreadyOn: boolean;
    audioAlreadyOn: boolean;
    recordStarted: boolean;
    recordPaused: boolean;
    recordResumed: boolean;
    recordStopped: boolean;
    recordChangeSeconds: number;
    pauseRecordCount: number;
    startReport: boolean;
    endReport: boolean;
    canRecord: boolean;
    canPauseResume: boolean;
    updateCanPauseResume: (canPauseResume: boolean) => void;
    updatePauseRecordCount: (count: number) => void;
    updateClearedToRecord: (cleared: boolean) => void;
    updateRecordPaused: (paused: boolean) => void;
    updateRecordResumed: (resumed: boolean) => void;
    updateStartReport: (start: boolean) => void;
    updateEndReport: (end: boolean) => void;
    updateCanRecord: (canRecord: boolean) => void;
    rePort: RePortType;
    getUpdatedAllParams: () => UpdateRecordingParameters;
    [key: string]: any;
}
export interface UpdateRecordingOptions {
    parameters: UpdateRecordingParameters;
}
export type UpdateRecordingType = (options: UpdateRecordingOptions) => Promise<void>;
export declare class UpdateRecording {
    updateRecording: ({ parameters }: UpdateRecordingOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpdateRecording, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UpdateRecording>;
}
