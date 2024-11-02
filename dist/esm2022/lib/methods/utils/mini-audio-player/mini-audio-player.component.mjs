import { Component, Input, Injector, Inject, Optional, ViewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
export class MiniAudioPlayer {
    injector;
    stream = null;
    remoteProducerId = '';
    parameters = {};
    MiniAudioComponent;
    miniAudioProps = {};
    audioElement;
    showWaveModal = false;
    isMuted = false;
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    intervalId;
    autoWaveCheck = false;
    previousShowWaveModal = null;
    previousIsMuted = null;
    injectorCache = new WeakMap();
    cachedMiniAudioProps;
    constructor(injector, injectedStream, injectedRemoteProducerId, injectedParameters, injectedMiniAudioComponent, injectedMiniAudioProps) {
        this.injector = injector;
        this.stream = injectedStream || this.stream;
        this.remoteProducerId = injectedRemoteProducerId || this.remoteProducerId;
        this.parameters = injectedParameters || this.parameters;
        this.MiniAudioComponent = injectedMiniAudioComponent || this.MiniAudioComponent;
        this.miniAudioProps = injectedMiniAudioProps || this.miniAudioProps;
    }
    ngOnInit() {
        if (this.stream) {
            this.setupAudioProcessing();
        }
    }
    ngOnDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
    setupAudioProcessing() {
        const analyser = this.audioContext.createAnalyser();
        analyser.fftSize = 32;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const source = this.audioContext.createMediaStreamSource(this.stream);
        source.connect(analyser);
        let consLow = false;
        this.intervalId = setInterval(() => {
            analyser.getByteTimeDomainData(dataArray);
            let averageLoudness = Array.from(dataArray).reduce((sum, value) => sum + value, 0) / bufferLength;
            const updatedParams = this.parameters.getUpdatedAllParams();
            let { eventType, participants, paginatedStreams, currentUserPage, adminNameStream, dispActiveNames, activeSounds, reUpdateInter, updateParticipantAudioDecibels, updateActiveSounds, shared, shareScreenStarted, breakOutRoomStarted, breakOutRoomEnded, limitedBreakRoom, } = updatedParams;
            const participant = participants.find((obj) => obj.audioID == this.remoteProducerId);
            let audioActiveInRoom = true;
            if (participant) {
                if (breakOutRoomStarted && !breakOutRoomEnded) {
                    if (!limitedBreakRoom.map((obj) => obj.name).includes(participant.name)) {
                        audioActiveInRoom = false;
                        averageLoudness = 127;
                    }
                }
            }
            if (this.parameters.meetingDisplayType != 'video') {
                this.autoWaveCheck = true;
            }
            if (shared || shareScreenStarted) {
                this.autoWaveCheck = false;
            }
            if (participant) {
                this.isMuted = participant.muted || false;
                if (eventType != 'chat' && eventType != 'broadcast') {
                    updateParticipantAudioDecibels({
                        name: participant.name ?? '',
                        averageLoudness: averageLoudness,
                        audioDecibels: updatedParams.audioDecibels,
                        updateAudioDecibels: updatedParams['updateAudioDecibels'],
                    });
                }
                const inPage = paginatedStreams[currentUserPage].findIndex((obj) => obj.name == participant.name);
                if (participant.name && !dispActiveNames.includes(participant.name) && inPage == -1) {
                    this.autoWaveCheck = false;
                    if (!adminNameStream) {
                        const adminParticipant = participants.find((obj) => obj.islevel == '2');
                        adminNameStream = adminParticipant ? adminParticipant.name : '';
                    }
                    if (participant.name == adminNameStream) {
                        this.autoWaveCheck = true;
                    }
                }
                else {
                    this.autoWaveCheck = true;
                }
                if (participant.videoID ||
                    this.autoWaveCheck ||
                    (breakOutRoomStarted && !breakOutRoomEnded && audioActiveInRoom)) {
                    this.showWaveModal = false;
                    if (averageLoudness > 127.5) {
                        if (!activeSounds.includes(participant.name)) {
                            activeSounds.push(participant.name);
                            consLow = false;
                            if ((shareScreenStarted || shared) && !participant.videoID) {
                                // do nothing
                            }
                            else {
                                if (eventType != 'chat' && eventType != 'broadcast' && participant.name) {
                                    reUpdateInter({
                                        name: participant.name,
                                        add: true,
                                        average: averageLoudness,
                                        parameters: updatedParams,
                                    });
                                }
                            }
                        }
                    }
                    else {
                        if (activeSounds.includes(participant.name) && consLow) {
                            activeSounds.splice(activeSounds.indexOf(participant.name), 1);
                            if ((shareScreenStarted || shared) && !participant.videoID) {
                                // do nothing
                            }
                            else {
                                if (eventType != 'chat' && eventType != 'broadcast' && participant.name) {
                                    reUpdateInter({
                                        name: participant.name,
                                        average: averageLoudness,
                                        parameters: updatedParams,
                                    });
                                }
                            }
                        }
                        else {
                            consLow = true;
                        }
                    }
                }
                else {
                    if (averageLoudness > 127.5) {
                        if (!this.parameters['autoWave']) {
                            this.showWaveModal = false;
                        }
                        else {
                            this.showWaveModal = true;
                        }
                        if (!activeSounds.includes(participant.name)) {
                            activeSounds.push(participant.name);
                        }
                        if ((shareScreenStarted || shared) && !participant.videoID) {
                            // do nothing
                        }
                        else {
                            if (eventType != 'chat' && eventType != 'broadcast' && participant.name) {
                                reUpdateInter({
                                    name: participant.name,
                                    add: true,
                                    average: averageLoudness,
                                    parameters: updatedParams,
                                });
                            }
                        }
                    }
                    else {
                        this.showWaveModal = false;
                        if (activeSounds.includes(participant.name)) {
                            activeSounds.splice(activeSounds.indexOf(participant.name), 1);
                        }
                        if ((shareScreenStarted || shared) && !participant.videoID) {
                            // do nothing
                        }
                        else {
                            if (eventType != 'chat' && eventType != 'broadcast' && participant.name) {
                                reUpdateInter({
                                    name: participant.name,
                                    average: averageLoudness,
                                    parameters: updatedParams,
                                });
                            }
                        }
                    }
                }
                updateActiveSounds(activeSounds);
            }
            else {
                this.showWaveModal = false;
                this.isMuted = true;
            }
        }, 2000);
    }
    createInjector(inputs) {
        if (!this.injectorCache.has(inputs)) {
            const injector = Injector.create({
                providers: Object.keys(inputs).map((key) => ({ provide: key, useValue: inputs[key] })),
                parent: this.injector,
            });
            this.injectorCache.set(inputs, injector);
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.injectorCache.get(inputs);
    }
    getMiniAudioProps() {
        if (!this.cachedMiniAudioProps ||
            this.showWaveModal !== this.previousShowWaveModal ||
            this.isMuted !== this.previousIsMuted) {
            this.cachedMiniAudioProps = {
                ...this.miniAudioProps,
                visible: this.showWaveModal && !this.isMuted,
                showWaveform: this.showWaveModal,
            };
            this.previousShowWaveModal = this.showWaveModal;
            this.previousIsMuted = this.isMuted;
        }
        return this.cachedMiniAudioProps;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MiniAudioPlayer, deps: [{ token: i0.Injector }, { token: 'stream', optional: true }, { token: 'remoteProducerId', optional: true }, { token: 'parameters', optional: true }, { token: 'MiniAudioComponent', optional: true }, { token: 'miniAudioProps', optional: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MiniAudioPlayer, isStandalone: true, selector: "app-mini-audio-player", inputs: { stream: "stream", remoteProducerId: "remoteProducerId", parameters: "parameters", MiniAudioComponent: "MiniAudioComponent", miniAudioProps: "miniAudioProps" }, viewQueries: [{ propertyName: "audioElement", first: true, predicate: ["audioElement"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"container\">\r\n  <audio *ngIf=\"stream\" autoplay playsinline #audioElement [srcObject]=\"stream\"></audio>\r\n\r\n  <ng-container *ngIf=\"MiniAudioComponent\">\r\n    <ng-container *ngComponentOutlet=\"MiniAudioComponent; injector: createInjector(getMiniAudioProps())\"></ng-container>\r\n  </ng-container>\r\n</div>\r\n", styles: [".container{display:flex;justify-content:center;align-items:center;z-index:9}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MiniAudioPlayer, decorators: [{
            type: Component,
            args: [{ selector: 'app-mini-audio-player', standalone: true, imports: [CommonModule], template: "<div class=\"container\">\r\n  <audio *ngIf=\"stream\" autoplay playsinline #audioElement [srcObject]=\"stream\"></audio>\r\n\r\n  <ng-container *ngIf=\"MiniAudioComponent\">\r\n    <ng-container *ngComponentOutlet=\"MiniAudioComponent; injector: createInjector(getMiniAudioProps())\"></ng-container>\r\n  </ng-container>\r\n</div>\r\n", styles: [".container{display:flex;justify-content:center;align-items:center;z-index:9}\n"] }]
        }], ctorParameters: () => [{ type: i0.Injector }, { type: MediaStream, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['stream']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['remoteProducerId']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['parameters']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['MiniAudioComponent']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['miniAudioProps']
                }] }], propDecorators: { stream: [{
                type: Input
            }], remoteProducerId: [{
                type: Input
            }], parameters: [{
                type: Input
            }], MiniAudioComponent: [{
                type: Input
            }], miniAudioProps: [{
                type: Input
            }], audioElement: [{
                type: ViewChild,
                args: ['audioElement', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaS1hdWRpby1wbGF5ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvdXRpbHMvbWluaS1hdWRpby1wbGF5ZXIvbWluaS1hdWRpby1wbGF5ZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvdXRpbHMvbWluaS1hdWRpby1wbGF5ZXIvbWluaS1hdWRpby1wbGF5ZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixRQUFRLEVBQ1IsU0FBUyxHQUVWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBK0IvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0RHO0FBVUgsTUFBTSxPQUFPLGVBQWU7SUFzQmhCO0lBckJELE1BQU0sR0FBdUIsSUFBSSxDQUFDO0lBQ2xDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztJQUN0QixVQUFVLEdBQThCLEVBQStCLENBQUM7SUFDeEUsa0JBQWtCLENBQU07SUFDeEIsY0FBYyxHQUF3QixFQUFFLENBQUM7SUFFTCxZQUFZLENBQWdDO0lBRXpGLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDdEIsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNoQixZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLElBQUssTUFBYyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQztJQUNqRixVQUFVLENBQU07SUFDaEIsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUVkLHFCQUFx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QXhCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFFdUMsWUFBWTtzQkFBeEQsU0FBUzt1QkFBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIEluamVjdG9yLFxuICBJbmplY3QsXG4gIE9wdGlvbmFsLFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIFJlVXBkYXRlSW50ZXJUeXBlLFxuICBVcGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHNUeXBlLFxuICBSZVVwZGF0ZUludGVyUGFyYW1ldGVycyxcbiAgUGFydGljaXBhbnQsXG59IGZyb20gJy4uLy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWluaUF1ZGlvUGxheWVyUGFyYW1ldGVycyBleHRlbmRzIFJlVXBkYXRlSW50ZXJQYXJhbWV0ZXJzIHtcbiAgYnJlYWtPdXRSb29tU3RhcnRlZDogYm9vbGVhbjtcbiAgYnJlYWtPdXRSb29tRW5kZWQ6IGJvb2xlYW47XG4gIGxpbWl0ZWRCcmVha1Jvb206IFBhcnRpY2lwYW50W107XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIHJlVXBkYXRlSW50ZXI6IFJlVXBkYXRlSW50ZXJUeXBlO1xuICB1cGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHM6IFVwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVsc1R5cGU7XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gTWluaUF1ZGlvUGxheWVyUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1pbmlBdWRpb1BsYXllck9wdGlvbnMge1xuICBzdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgcmVtb3RlUHJvZHVjZXJJZDogc3RyaW5nO1xuICBwYXJhbWV0ZXJzOiBNaW5pQXVkaW9QbGF5ZXJQYXJhbWV0ZXJzO1xuICBNaW5pQXVkaW9Db21wb25lbnQ/OiBhbnk7XG4gIG1pbmlBdWRpb1Byb3BzPzogUmVjb3JkPHN0cmluZywgYW55Pjtcbn1cblxuZXhwb3J0IHR5cGUgTWluaUF1ZGlvUGxheWVyVHlwZSA9IChvcHRpb25zOiBNaW5pQXVkaW9QbGF5ZXJPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuLyoqXG4gKiBUaGUgYE1pbmlBdWRpb1BsYXllcmAgY29tcG9uZW50IG1hbmFnZXMgYXVkaW8gcGxheWJhY2sgZm9yIHBhcnRpY2lwYW50cyBpbiBhIG1lZXRpbmcsIGluY2x1ZGluZyB2b2x1bWUgY29udHJvbCwgYXVkaW8gdmlzdWFsaXphdGlvbiwgYW5kIGNvbm5lY3Rpb24gdG8gdGhlIG1haW4gYXBwbGljYXRpb24gc3RhdGUuXG4gKiBJdCB1c2VzIGF1ZGlvIGFuYWx5c2lzIHRvIGRpc3BsYXkgd2F2ZWZvcm1zIGZvciBhY3RpdmUgc3BlYWtlcnMgYW5kIHN1cHBvcnRzIGJyZWFrb3V0IHJvb20gY29uZGl0aW9ucywgcGFydGljaXBhbnQtc3BlY2lmaWMgYXVkaW8gZGVjaWJlbCB1cGRhdGVzLCBhbmQgb3RoZXIgbWVkaWEgc3RhdGUgZGVwZW5kZW5jaWVzLlxuICpcbiAqIEBjb21wb25lbnRcbiAqIEBleGFtcGxlXG4gKiBgYGBodG1sXG4gKiA8YXBwLW1pbmktYXVkaW8tcGxheWVyXG4gKiAgICBbc3RyZWFtXT1cImF1ZGlvU3RyZWFtXCJcbiAqICAgIFtyZW1vdGVQcm9kdWNlcklkXT1cInByb2R1Y2VySWRcIlxuICogICAgW3BhcmFtZXRlcnNdPVwiYXVkaW9QbGF5ZXJQYXJhbWV0ZXJzXCI+XG4gKiA8L2FwcC1taW5pLWF1ZGlvLXBsYXllcj5cbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7TWVkaWFTdHJlYW19IFtzdHJlYW1dIC0gVGhlIGF1ZGlvIHN0cmVhbSBmcm9tIHRoZSBwYXJ0aWNpcGFudC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbcmVtb3RlUHJvZHVjZXJJZF0gLSBVbmlxdWUgSUQgZm9yIHRoZSByZW1vdGUgcHJvZHVjZXIgb2YgdGhlIGF1ZGlvIHN0cmVhbS5cbiAqIEBwYXJhbSB7TWluaUF1ZGlvUGxheWVyUGFyYW1ldGVyc30gW3BhcmFtZXRlcnNdIC0gQ29uZmlndXJhdGlvbiBvYmplY3Qgd2l0aCB2YXJpb3VzIHBhcmFtZXRlcnMgYW5kIHV0aWxpdHkgZnVuY3Rpb25zIGZvciBhdWRpbyBtYW5hZ2VtZW50LlxuICogQHBhcmFtIHtDb21wb25lbnR9IFtNaW5pQXVkaW9Db21wb25lbnRdIC0gT3B0aW9uYWwgYXVkaW8gdmlzdWFsaXphdGlvbiBjb21wb25lbnQgaW5qZWN0ZWQgaW50byB0aGUgYE1pbmlBdWRpb1BsYXllcmAuXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIGFueT59IFttaW5pQXVkaW9Qcm9wc10gLSBBZGRpdGlvbmFsIHByb3BlcnRpZXMgZm9yIGNvbmZpZ3VyaW5nIHRoZSBhdWRpbyB2aXN1YWxpemF0aW9uIGNvbXBvbmVudC5cbiAqXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IFRoZSBjcmVhdGVkIGF1ZGlvIHBsYXllciBlbGVtZW50LlxuICpcbiAqIEByZW1hcmtzXG4gKiBUaGUgYE1pbmlBdWRpb1BsYXllcmAgbGV2ZXJhZ2VzIHRoZSBgQXVkaW9Db250ZXh0YCBBUEkgdG8gcHJvY2VzcyBhdWRpbyBkYXRhLCBhbmFseXplIGZyZXF1ZW5jeSwgYW5kIG1hbmFnZSBhdWRpbyBsZXZlbHMuXG4gKiBJdCBzdXBwb3J0cyBhIGR5bmFtaWMgYnJlYWtvdXQgcm9vbSBmZWF0dXJlIHRoYXQgcmVzdHJpY3RzIGF1ZGlvIHZpc2liaWxpdHkgdG8gbGltaXRlZCBwYXJ0aWNpcGFudHMsIHVwZGF0ZXMgZGVjaWJlbCBsZXZlbHMgZm9yIGluZGl2aWR1YWwgcGFydGljaXBhbnRzLCBhbmQgYWRqdXN0cyB0aGUgd2F2ZWZvcm1zIGJhc2VkIG9uIGF1ZGlvIGFjdGl2aXR5LlxuICpcbiAqIEtleSBmdW5jdGlvbmFsaXRpZXMgaW5jbHVkZTpcbiAqIC0gQXV0b21hdGljYWxseSB0b2dnbGluZyB3YXZlIHZpc3VhbGl6YXRpb24gZm9yIGFjdGl2ZSBzcGVha2Vycy5cbiAqIC0gSGFuZGxpbmcgYXVkaW8gc2V0dGluZ3MgZm9yIGRpZmZlcmVudCByb29tIHN0YXRlcyAoZS5nLiwgc2hhcmVkIHNjcmVlbnMsIGJyZWFrb3V0IHJvb21zKS5cbiAqIC0gSW5qZWN0aW5nIGNvbmZpZ3VyYXRpb24gYW5kIHBhcmFtZXRlciBkZXBlbmRlbmNpZXMgZHluYW1pY2FsbHkgdGhyb3VnaCBgSW5qZWN0b3JgLlxuICpcbiAqIEBkZXBlbmRlbmNpZXNcbiAqIC0gYEF1ZGlvQ29udGV4dGA6IFdlYiBBUEkgZm9yIHByb2Nlc3NpbmcgYW5kIGFuYWx5emluZyBhdWRpbyBkYXRhLlxuICogLSBgc2V0SW50ZXJ2YWxgIGZvciBwZXJpb2RpYyB2b2x1bWUgbGV2ZWwgY2hlY2tzIChhdXRvLWNsZWFycyBvbiBjb21wb25lbnQgZGVzdHJ1Y3Rpb24pLlxuICogLSBgUmVVcGRhdGVJbnRlclR5cGVgIGFuZCBgVXBkYXRlUGFydGljaXBhbnRBdWRpb0RlY2liZWxzVHlwZWAgZm9yIGR5bmFtaWMgcGFydGljaXBhbnQgYXVkaW8gZGVjaWJlbCBtYW5hZ2VtZW50LlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBhdWRpb1BsYXllclBhcmFtZXRlcnM6IE1pbmlBdWRpb1BsYXllclBhcmFtZXRlcnMgPSB7XG4gKiAgIGJyZWFrT3V0Um9vbVN0YXJ0ZWQ6IHRydWUsXG4gKiAgIGJyZWFrT3V0Um9vbUVuZGVkOiBmYWxzZSxcbiAqICAgbGltaXRlZEJyZWFrUm9vbTogcGFydGljaXBhbnRMaXN0LFxuICogICByZVVwZGF0ZUludGVyOiByZVVwZGF0ZUludGVyRnVuYyxcbiAqICAgdXBkYXRlUGFydGljaXBhbnRBdWRpb0RlY2liZWxzOiB1cGRhdGVBdWRpb0RlY2liZWxzRnVuYyxcbiAqICAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gZ2V0UGFyYW1zKCksXG4gKiB9O1xuICpcbiAqIC8vIEluaXRpYWxpemUgY29tcG9uZW50IHdpdGggcmVxdWlyZWQgaW5wdXRzXG4gKiA8YXBwLW1pbmktYXVkaW8tcGxheWVyXG4gKiAgIFtzdHJlYW1dPVwiYXVkaW9TdHJlYW1cIlxuICogICBbcmVtb3RlUHJvZHVjZXJJZF09XCJwYXJ0aWNpcGFudElkXCJcbiAqICAgW3BhcmFtZXRlcnNdPVwiYXVkaW9QbGF5ZXJQYXJhbWV0ZXJzXCJcbiAqID48L2FwcC1taW5pLWF1ZGlvLXBsYXllcj5cbiAqIGBgYFxuICovXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW1pbmktYXVkaW8tcGxheWVyJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgdGVtcGxhdGVVcmw6ICcuL21pbmktYXVkaW8tcGxheWVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWluaS1hdWRpby1wbGF5ZXIuY29tcG9uZW50LmNzcyddLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTWluaUF1ZGlvUGxheWVyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBzdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHJlbW90ZVByb2R1Y2VySWQgPSAnJztcbiAgQElucHV0KCkgcGFyYW1ldGVyczogTWluaUF1ZGlvUGxheWVyUGFyYW1ldGVycyA9IHt9IGFzIE1pbmlBdWRpb1BsYXllclBhcmFtZXRlcnM7XG4gIEBJbnB1dCgpIE1pbmlBdWRpb0NvbXBvbmVudDogYW55O1xuICBASW5wdXQoKSBtaW5pQXVkaW9Qcm9wczogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9O1xuXG4gIEBWaWV3Q2hpbGQoJ2F1ZGlvRWxlbWVudCcsIHsgc3RhdGljOiB0cnVlIH0pIGF1ZGlvRWxlbWVudCE6IEVsZW1lbnRSZWY8SFRNTEF1ZGlvRWxlbWVudD47XG5cbiAgc2hvd1dhdmVNb2RhbCA9IGZhbHNlO1xuICBpc011dGVkID0gZmFsc2U7XG4gIGF1ZGlvQ29udGV4dCA9IG5ldyAod2luZG93LkF1ZGlvQ29udGV4dCB8fCAod2luZG93IGFzIGFueSkud2Via2l0QXVkaW9Db250ZXh0KSgpO1xuICBpbnRlcnZhbElkOiBhbnk7XG4gIGF1dG9XYXZlQ2hlY2sgPSBmYWxzZTtcblxuICBwcml2YXRlIHByZXZpb3VzU2hvd1dhdmVNb2RhbDogYm9vbGVhbiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHByZXZpb3VzSXNNdXRlZDogYm9vbGVhbiB8IG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgaW5qZWN0b3JDYWNoZSA9IG5ldyBXZWFrTWFwPGFueSwgSW5qZWN0b3I+KCk7XG4gIHByaXZhdGUgY2FjaGVkTWluaUF1ZGlvUHJvcHM6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdzdHJlYW0nKSBpbmplY3RlZFN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3JlbW90ZVByb2R1Y2VySWQnKSBpbmplY3RlZFJlbW90ZVByb2R1Y2VySWQ6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdwYXJhbWV0ZXJzJykgaW5qZWN0ZWRQYXJhbWV0ZXJzOiBNaW5pQXVkaW9QbGF5ZXJQYXJhbWV0ZXJzLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ01pbmlBdWRpb0NvbXBvbmVudCcpIGluamVjdGVkTWluaUF1ZGlvQ29tcG9uZW50OiBhbnksXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnbWluaUF1ZGlvUHJvcHMnKSBpbmplY3RlZE1pbmlBdWRpb1Byb3BzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuICApIHtcbiAgICB0aGlzLnN0cmVhbSA9IGluamVjdGVkU3RyZWFtIHx8IHRoaXMuc3RyZWFtO1xuICAgIHRoaXMucmVtb3RlUHJvZHVjZXJJZCA9IGluamVjdGVkUmVtb3RlUHJvZHVjZXJJZCB8fCB0aGlzLnJlbW90ZVByb2R1Y2VySWQ7XG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gaW5qZWN0ZWRQYXJhbWV0ZXJzIHx8IHRoaXMucGFyYW1ldGVycztcbiAgICB0aGlzLk1pbmlBdWRpb0NvbXBvbmVudCA9IGluamVjdGVkTWluaUF1ZGlvQ29tcG9uZW50IHx8IHRoaXMuTWluaUF1ZGlvQ29tcG9uZW50O1xuICAgIHRoaXMubWluaUF1ZGlvUHJvcHMgPSBpbmplY3RlZE1pbmlBdWRpb1Byb3BzIHx8IHRoaXMubWluaUF1ZGlvUHJvcHM7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdHJlYW0pIHtcbiAgICAgIHRoaXMuc2V0dXBBdWRpb1Byb2Nlc3NpbmcoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pbnRlcnZhbElkKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJZCk7XG4gICAgfVxuICB9XG5cbiAgc2V0dXBBdWRpb1Byb2Nlc3NpbmcoKSB7XG4gICAgY29uc3QgYW5hbHlzZXIgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVBbmFseXNlcigpO1xuICAgIGFuYWx5c2VyLmZmdFNpemUgPSAzMjtcbiAgICBjb25zdCBidWZmZXJMZW5ndGggPSBhbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudDtcbiAgICBjb25zdCBkYXRhQXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXJMZW5ndGgpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgY29uc3Qgc291cmNlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlTWVkaWFTdHJlYW1Tb3VyY2UodGhpcy5zdHJlYW0hKTtcbiAgICBzb3VyY2UuY29ubmVjdChhbmFseXNlcik7XG4gICAgbGV0IGNvbnNMb3cgPSBmYWxzZTtcblxuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGFuYWx5c2VyLmdldEJ5dGVUaW1lRG9tYWluRGF0YShkYXRhQXJyYXkpO1xuICAgICAgbGV0IGF2ZXJhZ2VMb3VkbmVzcyA9XG4gICAgICAgIEFycmF5LmZyb20oZGF0YUFycmF5KS5yZWR1Y2UoKHN1bSwgdmFsdWUpID0+IHN1bSArIHZhbHVlLCAwKSAvIGJ1ZmZlckxlbmd0aDtcblxuICAgICAgY29uc3QgdXBkYXRlZFBhcmFtcyA9IHRoaXMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG4gICAgICBsZXQge1xuICAgICAgICBldmVudFR5cGUsXG4gICAgICAgIHBhcnRpY2lwYW50cyxcbiAgICAgICAgcGFnaW5hdGVkU3RyZWFtcyxcbiAgICAgICAgY3VycmVudFVzZXJQYWdlLFxuICAgICAgICBhZG1pbk5hbWVTdHJlYW0sXG4gICAgICAgIGRpc3BBY3RpdmVOYW1lcyxcbiAgICAgICAgYWN0aXZlU291bmRzLFxuICAgICAgICByZVVwZGF0ZUludGVyLFxuICAgICAgICB1cGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHMsXG4gICAgICAgIHVwZGF0ZUFjdGl2ZVNvdW5kcyxcbiAgICAgICAgc2hhcmVkLFxuICAgICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgICAgIGJyZWFrT3V0Um9vbVN0YXJ0ZWQsXG4gICAgICAgIGJyZWFrT3V0Um9vbUVuZGVkLFxuICAgICAgICBsaW1pdGVkQnJlYWtSb29tLFxuICAgICAgfSA9IHVwZGF0ZWRQYXJhbXM7XG5cbiAgICAgIGNvbnN0IHBhcnRpY2lwYW50ID0gcGFydGljaXBhbnRzLmZpbmQoKG9iajogYW55KSA9PiBvYmouYXVkaW9JRCA9PSB0aGlzLnJlbW90ZVByb2R1Y2VySWQpO1xuXG4gICAgICBsZXQgYXVkaW9BY3RpdmVJblJvb20gPSB0cnVlO1xuICAgICAgaWYgKHBhcnRpY2lwYW50KSB7XG4gICAgICAgIGlmIChicmVha091dFJvb21TdGFydGVkICYmICFicmVha091dFJvb21FbmRlZCkge1xuICAgICAgICAgIGlmICghbGltaXRlZEJyZWFrUm9vbS5tYXAoKG9iajogYW55KSA9PiBvYmoubmFtZSkuaW5jbHVkZXMocGFydGljaXBhbnQubmFtZSkpIHtcbiAgICAgICAgICAgIGF1ZGlvQWN0aXZlSW5Sb29tID0gZmFsc2U7XG4gICAgICAgICAgICBhdmVyYWdlTG91ZG5lc3MgPSAxMjc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMubWVldGluZ0Rpc3BsYXlUeXBlICE9ICd2aWRlbycpIHtcbiAgICAgICAgdGhpcy5hdXRvV2F2ZUNoZWNrID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChzaGFyZWQgfHwgc2hhcmVTY3JlZW5TdGFydGVkKSB7XG4gICAgICAgIHRoaXMuYXV0b1dhdmVDaGVjayA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFydGljaXBhbnQpIHtcbiAgICAgICAgdGhpcy5pc011dGVkID0gcGFydGljaXBhbnQubXV0ZWQgfHwgZmFsc2U7XG5cbiAgICAgICAgaWYgKGV2ZW50VHlwZSAhPSAnY2hhdCcgJiYgZXZlbnRUeXBlICE9ICdicm9hZGNhc3QnKSB7XG4gICAgICAgICAgdXBkYXRlUGFydGljaXBhbnRBdWRpb0RlY2liZWxzKHtcbiAgICAgICAgICAgIG5hbWU6IHBhcnRpY2lwYW50Lm5hbWUgPz8gJycsXG4gICAgICAgICAgICBhdmVyYWdlTG91ZG5lc3M6IGF2ZXJhZ2VMb3VkbmVzcyxcbiAgICAgICAgICAgIGF1ZGlvRGVjaWJlbHM6IHVwZGF0ZWRQYXJhbXMuYXVkaW9EZWNpYmVscyxcbiAgICAgICAgICAgIHVwZGF0ZUF1ZGlvRGVjaWJlbHM6IHVwZGF0ZWRQYXJhbXNbJ3VwZGF0ZUF1ZGlvRGVjaWJlbHMnXSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGluUGFnZSA9IHBhZ2luYXRlZFN0cmVhbXNbY3VycmVudFVzZXJQYWdlXS5maW5kSW5kZXgoXG4gICAgICAgICAgKG9iajogYW55KSA9PiBvYmoubmFtZSA9PSBwYXJ0aWNpcGFudC5uYW1lLFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChwYXJ0aWNpcGFudC5uYW1lICYmICFkaXNwQWN0aXZlTmFtZXMuaW5jbHVkZXMocGFydGljaXBhbnQubmFtZSkgJiYgaW5QYWdlID09IC0xKSB7XG4gICAgICAgICAgdGhpcy5hdXRvV2F2ZUNoZWNrID0gZmFsc2U7XG4gICAgICAgICAgaWYgKCFhZG1pbk5hbWVTdHJlYW0pIHtcbiAgICAgICAgICAgIGNvbnN0IGFkbWluUGFydGljaXBhbnQgPSBwYXJ0aWNpcGFudHMuZmluZCgob2JqOiBhbnkpID0+IG9iai5pc2xldmVsID09ICcyJyk7XG4gICAgICAgICAgICBhZG1pbk5hbWVTdHJlYW0gPSBhZG1pblBhcnRpY2lwYW50ID8gYWRtaW5QYXJ0aWNpcGFudC5uYW1lIDogJyc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcnRpY2lwYW50Lm5hbWUgPT0gYWRtaW5OYW1lU3RyZWFtKSB7XG4gICAgICAgICAgICB0aGlzLmF1dG9XYXZlQ2hlY2sgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmF1dG9XYXZlQ2hlY2sgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHBhcnRpY2lwYW50LnZpZGVvSUQgfHxcbiAgICAgICAgICB0aGlzLmF1dG9XYXZlQ2hlY2sgfHxcbiAgICAgICAgICAoYnJlYWtPdXRSb29tU3RhcnRlZCAmJiAhYnJlYWtPdXRSb29tRW5kZWQgJiYgYXVkaW9BY3RpdmVJblJvb20pXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuc2hvd1dhdmVNb2RhbCA9IGZhbHNlO1xuXG4gICAgICAgICAgaWYgKGF2ZXJhZ2VMb3VkbmVzcyA+IDEyNy41KSB7XG4gICAgICAgICAgICBpZiAoIWFjdGl2ZVNvdW5kcy5pbmNsdWRlcyhwYXJ0aWNpcGFudC5uYW1lKSkge1xuICAgICAgICAgICAgICBhY3RpdmVTb3VuZHMucHVzaChwYXJ0aWNpcGFudC5uYW1lKTtcbiAgICAgICAgICAgICAgY29uc0xvdyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgIGlmICgoc2hhcmVTY3JlZW5TdGFydGVkIHx8IHNoYXJlZCkgJiYgIXBhcnRpY2lwYW50LnZpZGVvSUQpIHtcbiAgICAgICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50VHlwZSAhPSAnY2hhdCcgJiYgZXZlbnRUeXBlICE9ICdicm9hZGNhc3QnICYmIHBhcnRpY2lwYW50Lm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgIHJlVXBkYXRlSW50ZXIoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBwYXJ0aWNpcGFudC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBhZGQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGF2ZXJhZ2U6IGF2ZXJhZ2VMb3VkbmVzcyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyczogdXBkYXRlZFBhcmFtcyxcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoYWN0aXZlU291bmRzLmluY2x1ZGVzKHBhcnRpY2lwYW50Lm5hbWUpICYmIGNvbnNMb3cpIHtcbiAgICAgICAgICAgICAgYWN0aXZlU291bmRzLnNwbGljZShhY3RpdmVTb3VuZHMuaW5kZXhPZihwYXJ0aWNpcGFudC5uYW1lKSwgMSk7XG5cbiAgICAgICAgICAgICAgaWYgKChzaGFyZVNjcmVlblN0YXJ0ZWQgfHwgc2hhcmVkKSAmJiAhcGFydGljaXBhbnQudmlkZW9JRCkge1xuICAgICAgICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRUeXBlICE9ICdjaGF0JyAmJiBldmVudFR5cGUgIT0gJ2Jyb2FkY2FzdCcgJiYgcGFydGljaXBhbnQubmFtZSkge1xuICAgICAgICAgICAgICAgICAgcmVVcGRhdGVJbnRlcih7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGF2ZXJhZ2U6IGF2ZXJhZ2VMb3VkbmVzcyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyczogdXBkYXRlZFBhcmFtcyxcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc0xvdyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChhdmVyYWdlTG91ZG5lc3MgPiAxMjcuNSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBhcmFtZXRlcnNbJ2F1dG9XYXZlJ10pIHtcbiAgICAgICAgICAgICAgdGhpcy5zaG93V2F2ZU1vZGFsID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnNob3dXYXZlTW9kYWwgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWFjdGl2ZVNvdW5kcy5pbmNsdWRlcyhwYXJ0aWNpcGFudC5uYW1lKSkge1xuICAgICAgICAgICAgICBhY3RpdmVTb3VuZHMucHVzaChwYXJ0aWNpcGFudC5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoc2hhcmVTY3JlZW5TdGFydGVkIHx8IHNoYXJlZCkgJiYgIXBhcnRpY2lwYW50LnZpZGVvSUQpIHtcbiAgICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGV2ZW50VHlwZSAhPSAnY2hhdCcgJiYgZXZlbnRUeXBlICE9ICdicm9hZGNhc3QnICYmIHBhcnRpY2lwYW50Lm5hbWUpIHtcbiAgICAgICAgICAgICAgICByZVVwZGF0ZUludGVyKHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IHBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgICBhZGQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICBhdmVyYWdlOiBhdmVyYWdlTG91ZG5lc3MsXG4gICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB1cGRhdGVkUGFyYW1zLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1dhdmVNb2RhbCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGFjdGl2ZVNvdW5kcy5pbmNsdWRlcyhwYXJ0aWNpcGFudC5uYW1lKSkge1xuICAgICAgICAgICAgICBhY3RpdmVTb3VuZHMuc3BsaWNlKGFjdGl2ZVNvdW5kcy5pbmRleE9mKHBhcnRpY2lwYW50Lm5hbWUpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoc2hhcmVTY3JlZW5TdGFydGVkIHx8IHNoYXJlZCkgJiYgIXBhcnRpY2lwYW50LnZpZGVvSUQpIHtcbiAgICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGV2ZW50VHlwZSAhPSAnY2hhdCcgJiYgZXZlbnRUeXBlICE9ICdicm9hZGNhc3QnICYmIHBhcnRpY2lwYW50Lm5hbWUpIHtcbiAgICAgICAgICAgICAgICByZVVwZGF0ZUludGVyKHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IHBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgICBhdmVyYWdlOiBhdmVyYWdlTG91ZG5lc3MsXG4gICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB1cGRhdGVkUGFyYW1zLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlQWN0aXZlU291bmRzKGFjdGl2ZVNvdW5kcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNob3dXYXZlTW9kYWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc011dGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LCAyMDAwKTtcbiAgfVxuXG4gIGNyZWF0ZUluamVjdG9yKGlucHV0czogYW55KSB7XG4gICAgaWYgKCF0aGlzLmluamVjdG9yQ2FjaGUuaGFzKGlucHV0cykpIHtcbiAgICAgIGNvbnN0IGluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgICAgcHJvdmlkZXJzOiBPYmplY3Qua2V5cyhpbnB1dHMpLm1hcCgoa2V5KSA9PiAoeyBwcm92aWRlOiBrZXksIHVzZVZhbHVlOiBpbnB1dHNba2V5XSB9KSksXG4gICAgICAgIHBhcmVudDogdGhpcy5pbmplY3RvcixcbiAgICAgIH0pO1xuICAgICAgdGhpcy5pbmplY3RvckNhY2hlLnNldChpbnB1dHMsIGluamVjdG9yKTtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICByZXR1cm4gdGhpcy5pbmplY3RvckNhY2hlLmdldChpbnB1dHMpITtcbiAgfVxuXG4gIGdldE1pbmlBdWRpb1Byb3BzKCkge1xuICAgIGlmIChcbiAgICAgICF0aGlzLmNhY2hlZE1pbmlBdWRpb1Byb3BzIHx8XG4gICAgICB0aGlzLnNob3dXYXZlTW9kYWwgIT09IHRoaXMucHJldmlvdXNTaG93V2F2ZU1vZGFsIHx8XG4gICAgICB0aGlzLmlzTXV0ZWQgIT09IHRoaXMucHJldmlvdXNJc011dGVkXG4gICAgKSB7XG4gICAgICB0aGlzLmNhY2hlZE1pbmlBdWRpb1Byb3BzID0ge1xuICAgICAgICAuLi50aGlzLm1pbmlBdWRpb1Byb3BzLFxuICAgICAgICB2aXNpYmxlOiB0aGlzLnNob3dXYXZlTW9kYWwgJiYgIXRoaXMuaXNNdXRlZCxcbiAgICAgICAgc2hvd1dhdmVmb3JtOiB0aGlzLnNob3dXYXZlTW9kYWwsXG4gICAgICB9O1xuXG4gICAgICB0aGlzLnByZXZpb3VzU2hvd1dhdmVNb2RhbCA9IHRoaXMuc2hvd1dhdmVNb2RhbDtcbiAgICAgIHRoaXMucHJldmlvdXNJc011dGVkID0gdGhpcy5pc011dGVkO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jYWNoZWRNaW5pQXVkaW9Qcm9wcztcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gIDxhdWRpbyAqbmdJZj1cInN0cmVhbVwiIGF1dG9wbGF5IHBsYXlzaW5saW5lICNhdWRpb0VsZW1lbnQgW3NyY09iamVjdF09XCJzdHJlYW1cIj48L2F1ZGlvPlxyXG5cclxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiTWluaUF1ZGlvQ29tcG9uZW50XCI+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0NvbXBvbmVudE91dGxldD1cIk1pbmlBdWRpb0NvbXBvbmVudDsgaW5qZWN0b3I6IGNyZWF0ZUluamVjdG9yKGdldE1pbmlBdWRpb1Byb3BzKCkpXCI+PC9uZy1jb250YWluZXI+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcbjwvZGl2PlxyXG4iXX0=