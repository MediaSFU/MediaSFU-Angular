import { ShowAlert } from '../../@types/types';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface StopRecordingParameters {
    roomName: string;
    socket: Socket;
    localSocket?: Socket;
    showAlert?: ShowAlert;
    startReport: boolean;
    endReport: boolean;
    recordStarted: boolean;
    recordPaused: boolean;
    recordStopped: boolean;
    updateRecordPaused: (paused: boolean) => void;
    updateRecordStopped: (stopped: boolean) => void;
    updateStartReport: (startReport: boolean) => void;
    updateEndReport: (endReport: boolean) => void;
    updateShowRecordButtons: (show: boolean) => void;
    whiteboardStarted: boolean;
    whiteboardEnded: boolean;
    recordingMediaOptions: string;
    captureCanvasStream: (options: {
        parameters: any;
        start?: boolean;
    }) => void;
    getUpdatedAllParams: () => StopRecordingParameters;
    [key: string]: any;
}
export interface StopRecordingOptions {
    parameters: StopRecordingParameters;
}
export type StopRecordingType = (options: StopRecordingOptions) => Promise<void>;
export declare class StopRecording {
    stopRecording({ parameters }: StopRecordingOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<StopRecording, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StopRecording>;
}
