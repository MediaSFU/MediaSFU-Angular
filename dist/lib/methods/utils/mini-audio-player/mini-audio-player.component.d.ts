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
/**
 * The `MiniAudioPlayer` component manages audio playback for participants in a meeting, including volume control, audio visualization, and connection to the main application state.
 * It uses audio analysis to display waveforms for active speakers and supports breakout room conditions, participant-specific audio decibel updates, and other media state dependencies.
 *
 * @component
 * @example
 * ```html
 * <app-mini-audio-player
 *    [stream]="audioStream"
 *    [remoteProducerId]="producerId"
 *    [parameters]="audioPlayerParameters">
 * </app-mini-audio-player>
 * ```
 *
 * @param {MediaStream} [stream] - The audio stream from the participant.
 * @param {string} [remoteProducerId] - Unique ID for the remote producer of the audio stream.
 * @param {MiniAudioPlayerParameters} [parameters] - Configuration object with various parameters and utility functions for audio management.
 * @param {Component} [MiniAudioComponent] - Optional audio visualization component injected into the `MiniAudioPlayer`.
 * @param {Record<string, any>} [miniAudioProps] - Additional properties for configuring the audio visualization component.
 *
 * @returns {HTMLElement} The created audio player element.
 *
 * @remarks
 * The `MiniAudioPlayer` leverages the `AudioContext` API to process audio data, analyze frequency, and manage audio levels.
 * It supports a dynamic breakout room feature that restricts audio visibility to limited participants, updates decibel levels for individual participants, and adjusts the waveforms based on audio activity.
 *
 * Key functionalities include:
 * - Automatically toggling wave visualization for active speakers.
 * - Handling audio settings for different room states (e.g., shared screens, breakout rooms).
 * - Injecting configuration and parameter dependencies dynamically through `Injector`.
 *
 * @dependencies
 * - `AudioContext`: Web API for processing and analyzing audio data.
 * - `setInterval` for periodic volume level checks (auto-clears on component destruction).
 * - `ReUpdateInterType` and `UpdateParticipantAudioDecibelsType` for dynamic participant audio decibel management.
 *
 * @example
 * ```typescript
 * const audioPlayerParameters: MiniAudioPlayerParameters = {
 *   breakOutRoomStarted: true,
 *   breakOutRoomEnded: false,
 *   limitedBreakRoom: participantList,
 *   reUpdateInter: reUpdateInterFunc,
 *   updateParticipantAudioDecibels: updateAudioDecibelsFunc,
 *   getUpdatedAllParams: () => getParams(),
 * };
 *
 * // Initialize component with required inputs
 * <app-mini-audio-player
 *   [stream]="audioStream"
 *   [remoteProducerId]="participantId"
 *   [parameters]="audioPlayerParameters"
 * ></app-mini-audio-player>
 * ```
 */
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
