import { Participant, PrepopulateUserMediaType, ReorderStreamsType, ReUpdateInterParameters, ReUpdateInterType, ReorderStreamsParameters, PrepopulateUserMediaParameters } from '../../@types/types';
import * as i0 from "@angular/core";
export interface ProducerMediaPausedParameters extends PrepopulateUserMediaParameters, ReorderStreamsParameters, ReUpdateInterParameters {
    activeSounds: string[];
    meetingDisplayType: string;
    meetingVideoOptimized: boolean;
    participants: Participant[];
    oldSoundIds: string[];
    shared: boolean;
    shareScreenStarted: boolean;
    updateMainWindow: boolean;
    hostLabel: string;
    islevel: string;
    updateActiveSounds: (activeSounds: string[]) => void;
    updateUpdateMainWindow: (updateMainWindow: boolean) => void;
    reorderStreams: ReorderStreamsType;
    prepopulateUserMedia: PrepopulateUserMediaType;
    reUpdateInter: ReUpdateInterType;
    getUpdatedAllParams: () => ProducerMediaPausedParameters;
    [key: string]: any;
}
export interface ProducerMediaPausedOptions {
    producerId: string;
    kind: 'audio' | 'video' | 'screenshare' | 'screen';
    name: string;
    parameters: ProducerMediaPausedParameters;
}
export type ProducerMediaPausedType = (options: ProducerMediaPausedOptions) => Promise<void>;
export declare class ProducerMediaPaused {
    producerMediaPaused: ({ producerId, kind, name, parameters, }: ProducerMediaPausedOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProducerMediaPaused, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProducerMediaPaused>;
}
