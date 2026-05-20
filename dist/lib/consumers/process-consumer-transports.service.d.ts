import { Stream, Participant, Transport, SleepType } from '../@types/types';
import * as i0 from "@angular/core";
export interface ProcessConsumerTransportsParameters {
    remoteScreenStream: Stream[];
    oldAllStreams: (Stream | Participant)[];
    newLimitedStreams: (Stream | Participant)[];
    sleep: SleepType;
    getUpdatedAllParams: () => ProcessConsumerTransportsParameters;
    [key: string]: any;
}
export interface ProcessConsumerTransportsOptions {
    consumerTransports: Transport[];
    lStreams_: (Stream | Participant)[];
    parameters: ProcessConsumerTransportsParameters;
}
export type ProcessConsumerTransportsType = (options: ProcessConsumerTransportsOptions) => Promise<void>;
/**
 * @service ProcessConsumerTransports
 * @description Service adapter for the shared consumer transport pause/resume orchestration.
 */
export declare class ProcessConsumerTransports {
    processConsumerTransports({ consumerTransports, lStreams_, parameters, }: ProcessConsumerTransportsOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProcessConsumerTransports, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProcessConsumerTransports>;
}
