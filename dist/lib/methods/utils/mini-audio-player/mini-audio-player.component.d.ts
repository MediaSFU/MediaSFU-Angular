import { OnInit, OnDestroy, Injector, ElementRef } from '@angular/core';
import { ReUpdateInterType, UpdateParticipantAudioDecibelsType, ReUpdateInterParameters, Participant } from '../../../@types/types';
import * as i0 from "@angular/core";
export interface MiniAudioPlayerParameters extends ReUpdateInterParameters {
    breakOutRoomStarted: boolean;
    breakOutRoomEnded: boolean;
    limitedBreakRoom: Participant[];
    reUpdateInter: ReUpdateInterType;
    updateParticipantAudioDecibels: UpdateParticipantAudioDecibelsType;
    getUpdatedAllParams: () => MiniAudioPlayerParameters;
    [key: string]: any;
}
export interface MiniAudioPlayerOptions {
    stream: MediaStream | null;
    remoteProducerId: string;
    parameters: MiniAudioPlayerParameters;
    MiniAudioComponent?: any;
    miniAudioProps?: Record<string, any>;
}
export type MiniAudioPlayerType = (options: MiniAudioPlayerOptions) => HTMLElement;
export declare class MiniAudioPlayer implements OnInit, OnDestroy {
    private injector;
    stream: MediaStream | null;
    remoteProducerId: string;
    parameters: MiniAudioPlayerParameters;
    MiniAudioComponent: any;
    miniAudioProps: Record<string, any>;
    audioElement: ElementRef<HTMLAudioElement>;
    showWaveModal: boolean;
    isMuted: boolean;
    audioContext: AudioContext;
    intervalId: any;
    autoWaveCheck: boolean;
    private previousShowWaveModal;
    private previousIsMuted;
    private injectorCache;
    private cachedMiniAudioProps;
    constructor(injector: Injector, injectedStream: MediaStream | null, injectedRemoteProducerId: string, injectedParameters: MiniAudioPlayerParameters, injectedMiniAudioComponent: any, injectedMiniAudioProps: Record<string, any>);
    ngOnInit(): void;
    ngOnDestroy(): void;
    setupAudioProcessing(): void;
    createInjector(inputs: any): Injector;
    getMiniAudioProps(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<MiniAudioPlayer, [null, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MiniAudioPlayer, "app-mini-audio-player", never, { "stream": { "alias": "stream"; "required": false; }; "remoteProducerId": { "alias": "remoteProducerId"; "required": false; }; "parameters": { "alias": "parameters"; "required": false; }; "MiniAudioComponent": { "alias": "MiniAudioComponent"; "required": false; }; "miniAudioProps": { "alias": "miniAudioProps"; "required": false; }; }, {}, never, never, true, never>;
}
