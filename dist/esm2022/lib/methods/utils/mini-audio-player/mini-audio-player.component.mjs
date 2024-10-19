import { Component, Input, Injector, Inject, Optional, ViewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaS1hdWRpby1wbGF5ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvdXRpbHMvbWluaS1hdWRpby1wbGF5ZXIvbWluaS1hdWRpby1wbGF5ZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvdXRpbHMvbWluaS1hdWRpby1wbGF5ZXIvbWluaS1hdWRpby1wbGF5ZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixRQUFRLEVBQ1IsU0FBUyxHQUVWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBc0MvQyxNQUFNLE9BQU8sZUFBZTtJQXNCaEI7SUFyQkQsTUFBTSxHQUF1QixJQUFJLENBQUM7SUFDbEMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLFVBQVUsR0FBOEIsRUFBK0IsQ0FBQztJQUN4RSxrQkFBa0IsQ0FBTTtJQUN4QixjQUFjLEdBQXdCLEVBQUUsQ0FBQztJQUVMLFlBQVksQ0FBZ0M7SUFFekYsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUN0QixPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ2hCLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksSUFBSyxNQUFjLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDO0lBQ2pGLFVBQVUsQ0FBTTtJQUNoQixhQUFhLEdBQUcsS0FBSyxDQUFDO0lBRWQscUJBQXFCLEdBQW1CLElBQUksQ0FBQztJQUM3QyxlQUFlLEdBQW1CLElBQUksQ0FBQztJQUV2QyxhQUFhLEdBQUcsSUFBSSxPQUFPLEVBQWlCLENBQUM7SUFDN0Msb0JBQW9CLENBQU07SUFFbEMsWUFDVSxRQUFrQixFQUNJLGNBQWtDLEVBQ3hCLHdCQUFnQyxFQUN0QyxrQkFBNkMsRUFDckMsMEJBQStCLEVBQ25DLHNCQUEyQztRQUx6RSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBTzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsY0FBYyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDNUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLHdCQUF3QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUMxRSxJQUFJLENBQUMsVUFBVSxHQUFHLGtCQUFrQixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDeEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLDBCQUEwQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUNoRixJQUFJLENBQUMsY0FBYyxHQUFHLHNCQUFzQixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDdEUsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM5QixDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNwQixhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7SUFDSCxDQUFDO0lBRUQsb0JBQW9CO1FBQ2xCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDcEQsUUFBUSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDdEIsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGlCQUFpQixDQUFDO1FBQ2hELE1BQU0sU0FBUyxHQUFHLElBQUksVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQy9DLG9FQUFvRTtRQUNwRSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxNQUFPLENBQUMsQ0FBQztRQUN2RSxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pCLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztRQUVwQixJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDakMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFDLElBQUksZUFBZSxHQUNqQixLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDO1lBRTlFLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUM1RCxJQUFJLEVBQ0YsU0FBUyxFQUNULFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsZUFBZSxFQUNmLGVBQWUsRUFDZixlQUFlLEVBQ2YsWUFBWSxFQUNaLGFBQWEsRUFDYiw4QkFBOEIsRUFDOUIsa0JBQWtCLEVBQ2xCLE1BQU0sRUFDTixrQkFBa0IsRUFDbEIsbUJBQW1CLEVBQ25CLGlCQUFpQixFQUNqQixnQkFBZ0IsR0FDakIsR0FBRyxhQUFhLENBQUM7WUFFbEIsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUUxRixJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQztZQUM3QixJQUFJLFdBQVcsRUFBRSxDQUFDO2dCQUNoQixJQUFJLG1CQUFtQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztvQkFDOUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDN0UsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO3dCQUMxQixlQUFlLEdBQUcsR0FBRyxDQUFDO29CQUN4QixDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1lBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUNsRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUM1QixDQUFDO1lBQ0QsSUFBSSxNQUFNLElBQUksa0JBQWtCLEVBQUUsQ0FBQztnQkFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDN0IsQ0FBQztZQUVELElBQUksV0FBVyxFQUFFLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUM7Z0JBRTFDLElBQUksU0FBUyxJQUFJLE1BQU0sSUFBSSxTQUFTLElBQUksV0FBVyxFQUFFLENBQUM7b0JBQ3BELDhCQUE4QixDQUFDO3dCQUM3QixJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUksSUFBSSxFQUFFO3dCQUM1QixlQUFlLEVBQUUsZUFBZTt3QkFDaEMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxhQUFhO3dCQUMxQyxtQkFBbUIsRUFBRSxhQUFhLENBQUMscUJBQXFCLENBQUM7cUJBQzFELENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUVELE1BQU0sTUFBTSxHQUFHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDLFNBQVMsQ0FDeEQsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDLElBQUksQ0FDM0MsQ0FBQztnQkFFRixJQUFJLFdBQVcsQ0FBQyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDcEYsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7b0JBQzNCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzt3QkFDckIsTUFBTSxnQkFBZ0IsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxDQUFDO3dCQUM3RSxlQUFlLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUNsRSxDQUFDO29CQUVELElBQUksV0FBVyxDQUFDLElBQUksSUFBSSxlQUFlLEVBQUUsQ0FBQzt3QkFDeEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBQzVCLENBQUM7Z0JBQ0gsQ0FBQztxQkFBTSxDQUFDO29CQUNOLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2dCQUM1QixDQUFDO2dCQUVELElBQ0UsV0FBVyxDQUFDLE9BQU87b0JBQ25CLElBQUksQ0FBQyxhQUFhO29CQUNsQixDQUFDLG1CQUFtQixJQUFJLENBQUMsaUJBQWlCLElBQUksaUJBQWlCLENBQUMsRUFDaEUsQ0FBQztvQkFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztvQkFFM0IsSUFBSSxlQUFlLEdBQUcsS0FBSyxFQUFFLENBQUM7d0JBQzVCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDOzRCQUM3QyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDcEMsT0FBTyxHQUFHLEtBQUssQ0FBQzs0QkFFaEIsSUFBSSxDQUFDLGtCQUFrQixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dDQUMzRCxhQUFhOzRCQUNmLENBQUM7aUNBQU0sQ0FBQztnQ0FDTixJQUFJLFNBQVMsSUFBSSxNQUFNLElBQUksU0FBUyxJQUFJLFdBQVcsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7b0NBQ3hFLGFBQWEsQ0FBQzt3Q0FDWixJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUk7d0NBQ3RCLEdBQUcsRUFBRSxJQUFJO3dDQUNULE9BQU8sRUFBRSxlQUFlO3dDQUN4QixVQUFVLEVBQUUsYUFBYTtxQ0FDMUIsQ0FBQyxDQUFDO2dDQUNMLENBQUM7NEJBQ0gsQ0FBQzt3QkFDSCxDQUFDO29CQUNILENBQUM7eUJBQU0sQ0FBQzt3QkFDTixJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDOzRCQUN2RCxZQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUUvRCxJQUFJLENBQUMsa0JBQWtCLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7Z0NBQzNELGFBQWE7NEJBQ2YsQ0FBQztpQ0FBTSxDQUFDO2dDQUNOLElBQUksU0FBUyxJQUFJLE1BQU0sSUFBSSxTQUFTLElBQUksV0FBVyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQ0FDeEUsYUFBYSxDQUFDO3dDQUNaLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSTt3Q0FDdEIsT0FBTyxFQUFFLGVBQWU7d0NBQ3hCLFVBQVUsRUFBRSxhQUFhO3FDQUMxQixDQUFDLENBQUM7Z0NBQ0wsQ0FBQzs0QkFDSCxDQUFDO3dCQUNILENBQUM7NkJBQU0sQ0FBQzs0QkFDTixPQUFPLEdBQUcsSUFBSSxDQUFDO3dCQUNqQixDQUFDO29CQUNILENBQUM7Z0JBQ0gsQ0FBQztxQkFBTSxDQUFDO29CQUNOLElBQUksZUFBZSxHQUFHLEtBQUssRUFBRSxDQUFDO3dCQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDOzRCQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQzt3QkFDN0IsQ0FBQzs2QkFBTSxDQUFDOzRCQUNOLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO3dCQUM1QixDQUFDO3dCQUVELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDOzRCQUM3QyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDdEMsQ0FBQzt3QkFDRCxJQUFJLENBQUMsa0JBQWtCLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQzNELGFBQWE7d0JBQ2YsQ0FBQzs2QkFBTSxDQUFDOzRCQUNOLElBQUksU0FBUyxJQUFJLE1BQU0sSUFBSSxTQUFTLElBQUksV0FBVyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQ0FDeEUsYUFBYSxDQUFDO29DQUNaLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSTtvQ0FDdEIsR0FBRyxFQUFFLElBQUk7b0NBQ1QsT0FBTyxFQUFFLGVBQWU7b0NBQ3hCLFVBQVUsRUFBRSxhQUFhO2lDQUMxQixDQUFDLENBQUM7NEJBQ0wsQ0FBQzt3QkFDSCxDQUFDO29CQUNILENBQUM7eUJBQU0sQ0FBQzt3QkFDTixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQzt3QkFDM0IsSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDOzRCQUM1QyxZQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNqRSxDQUFDO3dCQUNELElBQUksQ0FBQyxrQkFBa0IsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDM0QsYUFBYTt3QkFDZixDQUFDOzZCQUFNLENBQUM7NEJBQ04sSUFBSSxTQUFTLElBQUksTUFBTSxJQUFJLFNBQVMsSUFBSSxXQUFXLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO2dDQUN4RSxhQUFhLENBQUM7b0NBQ1osSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJO29DQUN0QixPQUFPLEVBQUUsZUFBZTtvQ0FDeEIsVUFBVSxFQUFFLGFBQWE7aUNBQzFCLENBQUMsQ0FBQzs0QkFDTCxDQUFDO3dCQUNILENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO2dCQUVELGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ25DLENBQUM7aUJBQU0sQ0FBQztnQkFDTixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztnQkFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDdEIsQ0FBQztRQUNILENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxjQUFjLENBQUMsTUFBVztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNwQyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUMvQixTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RixNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVE7YUFDdEIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsSUFDRSxDQUFDLElBQUksQ0FBQyxvQkFBb0I7WUFDMUIsSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMscUJBQXFCO1lBQ2pELElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLGVBQWUsRUFDckMsQ0FBQztZQUNELElBQUksQ0FBQyxvQkFBb0IsR0FBRztnQkFDMUIsR0FBRyxJQUFJLENBQUMsY0FBYztnQkFDdEIsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztnQkFDNUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhO2FBQ2pDLENBQUM7WUFFRixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUNoRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEMsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO0lBQ25DLENBQUM7dUdBN1BVLGVBQWUsMENBdUJKLFFBQVEsNkJBQ1Isa0JBQWtCLDZCQUNsQixZQUFZLDZCQUNaLG9CQUFvQiw2QkFDcEIsZ0JBQWdCOzJGQTNCM0IsZUFBZSx1WENqRDVCLGlWQU9BLHVJRHdDWSxZQUFZOzsyRkFFWCxlQUFlO2tCQVAzQixTQUFTOytCQUNFLHVCQUF1QixjQUNyQixJQUFJLFdBR1AsQ0FBQyxZQUFZLENBQUM7OzBCQXlCcEIsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxRQUFROzswQkFDM0IsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxrQkFBa0I7OzBCQUNyQyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLFlBQVk7OzBCQUMvQixRQUFROzswQkFBSSxNQUFNOzJCQUFDLG9CQUFvQjs7MEJBQ3ZDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsZ0JBQWdCO3lDQTFCN0IsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUV1QyxZQUFZO3NCQUF4RCxTQUFTO3VCQUFDLGNBQWMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgSW5qZWN0b3IsXG4gIEluamVjdCxcbiAgT3B0aW9uYWwsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgUmVVcGRhdGVJbnRlclR5cGUsXG4gIFVwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVsc1R5cGUsXG4gIFJlVXBkYXRlSW50ZXJQYXJhbWV0ZXJzLFxuICBQYXJ0aWNpcGFudCxcbn0gZnJvbSAnLi4vLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBNaW5pQXVkaW9QbGF5ZXJQYXJhbWV0ZXJzIGV4dGVuZHMgUmVVcGRhdGVJbnRlclBhcmFtZXRlcnMge1xuICBicmVha091dFJvb21TdGFydGVkOiBib29sZWFuO1xuICBicmVha091dFJvb21FbmRlZDogYm9vbGVhbjtcbiAgbGltaXRlZEJyZWFrUm9vbTogUGFydGljaXBhbnRbXTtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgcmVVcGRhdGVJbnRlcjogUmVVcGRhdGVJbnRlclR5cGU7XG4gIHVwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVsczogVXBkYXRlUGFydGljaXBhbnRBdWRpb0RlY2liZWxzVHlwZTtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBNaW5pQXVkaW9QbGF5ZXJQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWluaUF1ZGlvUGxheWVyT3B0aW9ucyB7XG4gIHN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsO1xuICByZW1vdGVQcm9kdWNlcklkOiBzdHJpbmc7XG4gIHBhcmFtZXRlcnM6IE1pbmlBdWRpb1BsYXllclBhcmFtZXRlcnM7XG4gIE1pbmlBdWRpb0NvbXBvbmVudD86IGFueTtcbiAgbWluaUF1ZGlvUHJvcHM/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xufVxuXG5leHBvcnQgdHlwZSBNaW5pQXVkaW9QbGF5ZXJUeXBlID0gKG9wdGlvbnM6IE1pbmlBdWRpb1BsYXllck9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbWluaS1hdWRpby1wbGF5ZXInLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICB0ZW1wbGF0ZVVybDogJy4vbWluaS1hdWRpby1wbGF5ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9taW5pLWF1ZGlvLXBsYXllci5jb21wb25lbnQuY3NzJ10sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBNaW5pQXVkaW9QbGF5ZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcmVtb3RlUHJvZHVjZXJJZCA9ICcnO1xuICBASW5wdXQoKSBwYXJhbWV0ZXJzOiBNaW5pQXVkaW9QbGF5ZXJQYXJhbWV0ZXJzID0ge30gYXMgTWluaUF1ZGlvUGxheWVyUGFyYW1ldGVycztcbiAgQElucHV0KCkgTWluaUF1ZGlvQ29tcG9uZW50OiBhbnk7XG4gIEBJbnB1dCgpIG1pbmlBdWRpb1Byb3BzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XG5cbiAgQFZpZXdDaGlsZCgnYXVkaW9FbGVtZW50JywgeyBzdGF0aWM6IHRydWUgfSkgYXVkaW9FbGVtZW50ITogRWxlbWVudFJlZjxIVE1MQXVkaW9FbGVtZW50PjtcblxuICBzaG93V2F2ZU1vZGFsID0gZmFsc2U7XG4gIGlzTXV0ZWQgPSBmYWxzZTtcbiAgYXVkaW9Db250ZXh0ID0gbmV3ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8ICh3aW5kb3cgYXMgYW55KS53ZWJraXRBdWRpb0NvbnRleHQpKCk7XG4gIGludGVydmFsSWQ6IGFueTtcbiAgYXV0b1dhdmVDaGVjayA9IGZhbHNlO1xuXG4gIHByaXZhdGUgcHJldmlvdXNTaG93V2F2ZU1vZGFsOiBib29sZWFuIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgcHJldmlvdXNJc011dGVkOiBib29sZWFuIHwgbnVsbCA9IG51bGw7XG5cbiAgcHJpdmF0ZSBpbmplY3RvckNhY2hlID0gbmV3IFdlYWtNYXA8YW55LCBJbmplY3Rvcj4oKTtcbiAgcHJpdmF0ZSBjYWNoZWRNaW5pQXVkaW9Qcm9wczogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3N0cmVhbScpIGluamVjdGVkU3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGwsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgncmVtb3RlUHJvZHVjZXJJZCcpIGluamVjdGVkUmVtb3RlUHJvZHVjZXJJZDogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ3BhcmFtZXRlcnMnKSBpbmplY3RlZFBhcmFtZXRlcnM6IE1pbmlBdWRpb1BsYXllclBhcmFtZXRlcnMsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnTWluaUF1ZGlvQ29tcG9uZW50JykgaW5qZWN0ZWRNaW5pQXVkaW9Db21wb25lbnQ6IGFueSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdtaW5pQXVkaW9Qcm9wcycpIGluamVjdGVkTWluaUF1ZGlvUHJvcHM6IFJlY29yZDxzdHJpbmcsIGFueT4sXG4gICkge1xuICAgIHRoaXMuc3RyZWFtID0gaW5qZWN0ZWRTdHJlYW0gfHwgdGhpcy5zdHJlYW07XG4gICAgdGhpcy5yZW1vdGVQcm9kdWNlcklkID0gaW5qZWN0ZWRSZW1vdGVQcm9kdWNlcklkIHx8IHRoaXMucmVtb3RlUHJvZHVjZXJJZDtcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSBpbmplY3RlZFBhcmFtZXRlcnMgfHwgdGhpcy5wYXJhbWV0ZXJzO1xuICAgIHRoaXMuTWluaUF1ZGlvQ29tcG9uZW50ID0gaW5qZWN0ZWRNaW5pQXVkaW9Db21wb25lbnQgfHwgdGhpcy5NaW5pQXVkaW9Db21wb25lbnQ7XG4gICAgdGhpcy5taW5pQXVkaW9Qcm9wcyA9IGluamVjdGVkTWluaUF1ZGlvUHJvcHMgfHwgdGhpcy5taW5pQXVkaW9Qcm9wcztcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN0cmVhbSkge1xuICAgICAgdGhpcy5zZXR1cEF1ZGlvUHJvY2Vzc2luZygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmludGVydmFsSWQpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTtcbiAgICB9XG4gIH1cblxuICBzZXR1cEF1ZGlvUHJvY2Vzc2luZygpIHtcbiAgICBjb25zdCBhbmFseXNlciA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUFuYWx5c2VyKCk7XG4gICAgYW5hbHlzZXIuZmZ0U2l6ZSA9IDMyO1xuICAgIGNvbnN0IGJ1ZmZlckxlbmd0aCA9IGFuYWx5c2VyLmZyZXF1ZW5jeUJpbkNvdW50O1xuICAgIGNvbnN0IGRhdGFBcnJheSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlckxlbmd0aCk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICBjb25zdCBzb3VyY2UgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVNZWRpYVN0cmVhbVNvdXJjZSh0aGlzLnN0cmVhbSEpO1xuICAgIHNvdXJjZS5jb25uZWN0KGFuYWx5c2VyKTtcbiAgICBsZXQgY29uc0xvdyA9IGZhbHNlO1xuXG4gICAgdGhpcy5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgYW5hbHlzZXIuZ2V0Qnl0ZVRpbWVEb21haW5EYXRhKGRhdGFBcnJheSk7XG4gICAgICBsZXQgYXZlcmFnZUxvdWRuZXNzID1cbiAgICAgICAgQXJyYXkuZnJvbShkYXRhQXJyYXkpLnJlZHVjZSgoc3VtLCB2YWx1ZSkgPT4gc3VtICsgdmFsdWUsIDApIC8gYnVmZmVyTGVuZ3RoO1xuXG4gICAgICBjb25zdCB1cGRhdGVkUGFyYW1zID0gdGhpcy5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcbiAgICAgIGxldCB7XG4gICAgICAgIGV2ZW50VHlwZSxcbiAgICAgICAgcGFydGljaXBhbnRzLFxuICAgICAgICBwYWdpbmF0ZWRTdHJlYW1zLFxuICAgICAgICBjdXJyZW50VXNlclBhZ2UsXG4gICAgICAgIGFkbWluTmFtZVN0cmVhbSxcbiAgICAgICAgZGlzcEFjdGl2ZU5hbWVzLFxuICAgICAgICBhY3RpdmVTb3VuZHMsXG4gICAgICAgIHJlVXBkYXRlSW50ZXIsXG4gICAgICAgIHVwZGF0ZVBhcnRpY2lwYW50QXVkaW9EZWNpYmVscyxcbiAgICAgICAgdXBkYXRlQWN0aXZlU291bmRzLFxuICAgICAgICBzaGFyZWQsXG4gICAgICAgIHNoYXJlU2NyZWVuU3RhcnRlZCxcbiAgICAgICAgYnJlYWtPdXRSb29tU3RhcnRlZCxcbiAgICAgICAgYnJlYWtPdXRSb29tRW5kZWQsXG4gICAgICAgIGxpbWl0ZWRCcmVha1Jvb20sXG4gICAgICB9ID0gdXBkYXRlZFBhcmFtcztcblxuICAgICAgY29uc3QgcGFydGljaXBhbnQgPSBwYXJ0aWNpcGFudHMuZmluZCgob2JqOiBhbnkpID0+IG9iai5hdWRpb0lEID09IHRoaXMucmVtb3RlUHJvZHVjZXJJZCk7XG5cbiAgICAgIGxldCBhdWRpb0FjdGl2ZUluUm9vbSA9IHRydWU7XG4gICAgICBpZiAocGFydGljaXBhbnQpIHtcbiAgICAgICAgaWYgKGJyZWFrT3V0Um9vbVN0YXJ0ZWQgJiYgIWJyZWFrT3V0Um9vbUVuZGVkKSB7XG4gICAgICAgICAgaWYgKCFsaW1pdGVkQnJlYWtSb29tLm1hcCgob2JqOiBhbnkpID0+IG9iai5uYW1lKS5pbmNsdWRlcyhwYXJ0aWNpcGFudC5uYW1lKSkge1xuICAgICAgICAgICAgYXVkaW9BY3RpdmVJblJvb20gPSBmYWxzZTtcbiAgICAgICAgICAgIGF2ZXJhZ2VMb3VkbmVzcyA9IDEyNztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMucGFyYW1ldGVycy5tZWV0aW5nRGlzcGxheVR5cGUgIT0gJ3ZpZGVvJykge1xuICAgICAgICB0aGlzLmF1dG9XYXZlQ2hlY2sgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHNoYXJlZCB8fCBzaGFyZVNjcmVlblN0YXJ0ZWQpIHtcbiAgICAgICAgdGhpcy5hdXRvV2F2ZUNoZWNrID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJ0aWNpcGFudCkge1xuICAgICAgICB0aGlzLmlzTXV0ZWQgPSBwYXJ0aWNpcGFudC5tdXRlZCB8fCBmYWxzZTtcblxuICAgICAgICBpZiAoZXZlbnRUeXBlICE9ICdjaGF0JyAmJiBldmVudFR5cGUgIT0gJ2Jyb2FkY2FzdCcpIHtcbiAgICAgICAgICB1cGRhdGVQYXJ0aWNpcGFudEF1ZGlvRGVjaWJlbHMoe1xuICAgICAgICAgICAgbmFtZTogcGFydGljaXBhbnQubmFtZSA/PyAnJyxcbiAgICAgICAgICAgIGF2ZXJhZ2VMb3VkbmVzczogYXZlcmFnZUxvdWRuZXNzLFxuICAgICAgICAgICAgYXVkaW9EZWNpYmVsczogdXBkYXRlZFBhcmFtcy5hdWRpb0RlY2liZWxzLFxuICAgICAgICAgICAgdXBkYXRlQXVkaW9EZWNpYmVsczogdXBkYXRlZFBhcmFtc1sndXBkYXRlQXVkaW9EZWNpYmVscyddLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaW5QYWdlID0gcGFnaW5hdGVkU3RyZWFtc1tjdXJyZW50VXNlclBhZ2VdLmZpbmRJbmRleChcbiAgICAgICAgICAob2JqOiBhbnkpID0+IG9iai5uYW1lID09IHBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHBhcnRpY2lwYW50Lm5hbWUgJiYgIWRpc3BBY3RpdmVOYW1lcy5pbmNsdWRlcyhwYXJ0aWNpcGFudC5uYW1lKSAmJiBpblBhZ2UgPT0gLTEpIHtcbiAgICAgICAgICB0aGlzLmF1dG9XYXZlQ2hlY2sgPSBmYWxzZTtcbiAgICAgICAgICBpZiAoIWFkbWluTmFtZVN0cmVhbSkge1xuICAgICAgICAgICAgY29uc3QgYWRtaW5QYXJ0aWNpcGFudCA9IHBhcnRpY2lwYW50cy5maW5kKChvYmo6IGFueSkgPT4gb2JqLmlzbGV2ZWwgPT0gJzInKTtcbiAgICAgICAgICAgIGFkbWluTmFtZVN0cmVhbSA9IGFkbWluUGFydGljaXBhbnQgPyBhZG1pblBhcnRpY2lwYW50Lm5hbWUgOiAnJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFydGljaXBhbnQubmFtZSA9PSBhZG1pbk5hbWVTdHJlYW0pIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b1dhdmVDaGVjayA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuYXV0b1dhdmVDaGVjayA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgcGFydGljaXBhbnQudmlkZW9JRCB8fFxuICAgICAgICAgIHRoaXMuYXV0b1dhdmVDaGVjayB8fFxuICAgICAgICAgIChicmVha091dFJvb21TdGFydGVkICYmICFicmVha091dFJvb21FbmRlZCAmJiBhdWRpb0FjdGl2ZUluUm9vbSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5zaG93V2F2ZU1vZGFsID0gZmFsc2U7XG5cbiAgICAgICAgICBpZiAoYXZlcmFnZUxvdWRuZXNzID4gMTI3LjUpIHtcbiAgICAgICAgICAgIGlmICghYWN0aXZlU291bmRzLmluY2x1ZGVzKHBhcnRpY2lwYW50Lm5hbWUpKSB7XG4gICAgICAgICAgICAgIGFjdGl2ZVNvdW5kcy5wdXNoKHBhcnRpY2lwYW50Lm5hbWUpO1xuICAgICAgICAgICAgICBjb25zTG93ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgaWYgKChzaGFyZVNjcmVlblN0YXJ0ZWQgfHwgc2hhcmVkKSAmJiAhcGFydGljaXBhbnQudmlkZW9JRCkge1xuICAgICAgICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRUeXBlICE9ICdjaGF0JyAmJiBldmVudFR5cGUgIT0gJ2Jyb2FkY2FzdCcgJiYgcGFydGljaXBhbnQubmFtZSkge1xuICAgICAgICAgICAgICAgICAgcmVVcGRhdGVJbnRlcih7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGFkZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXZlcmFnZTogYXZlcmFnZUxvdWRuZXNzLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB1cGRhdGVkUGFyYW1zLFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChhY3RpdmVTb3VuZHMuaW5jbHVkZXMocGFydGljaXBhbnQubmFtZSkgJiYgY29uc0xvdykge1xuICAgICAgICAgICAgICBhY3RpdmVTb3VuZHMuc3BsaWNlKGFjdGl2ZVNvdW5kcy5pbmRleE9mKHBhcnRpY2lwYW50Lm5hbWUpLCAxKTtcblxuICAgICAgICAgICAgICBpZiAoKHNoYXJlU2NyZWVuU3RhcnRlZCB8fCBzaGFyZWQpICYmICFwYXJ0aWNpcGFudC52aWRlb0lEKSB7XG4gICAgICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChldmVudFR5cGUgIT0gJ2NoYXQnICYmIGV2ZW50VHlwZSAhPSAnYnJvYWRjYXN0JyAmJiBwYXJ0aWNpcGFudC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICByZVVwZGF0ZUludGVyKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogcGFydGljaXBhbnQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgYXZlcmFnZTogYXZlcmFnZUxvdWRuZXNzLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB1cGRhdGVkUGFyYW1zLFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zTG93ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGF2ZXJhZ2VMb3VkbmVzcyA+IDEyNy41KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucGFyYW1ldGVyc1snYXV0b1dhdmUnXSkge1xuICAgICAgICAgICAgICB0aGlzLnNob3dXYXZlTW9kYWwgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuc2hvd1dhdmVNb2RhbCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghYWN0aXZlU291bmRzLmluY2x1ZGVzKHBhcnRpY2lwYW50Lm5hbWUpKSB7XG4gICAgICAgICAgICAgIGFjdGl2ZVNvdW5kcy5wdXNoKHBhcnRpY2lwYW50Lm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChzaGFyZVNjcmVlblN0YXJ0ZWQgfHwgc2hhcmVkKSAmJiAhcGFydGljaXBhbnQudmlkZW9JRCkge1xuICAgICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoZXZlbnRUeXBlICE9ICdjaGF0JyAmJiBldmVudFR5cGUgIT0gJ2Jyb2FkY2FzdCcgJiYgcGFydGljaXBhbnQubmFtZSkge1xuICAgICAgICAgICAgICAgIHJlVXBkYXRlSW50ZXIoe1xuICAgICAgICAgICAgICAgICAgbmFtZTogcGFydGljaXBhbnQubmFtZSxcbiAgICAgICAgICAgICAgICAgIGFkZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGF2ZXJhZ2U6IGF2ZXJhZ2VMb3VkbmVzcyxcbiAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHVwZGF0ZWRQYXJhbXMsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93V2F2ZU1vZGFsID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoYWN0aXZlU291bmRzLmluY2x1ZGVzKHBhcnRpY2lwYW50Lm5hbWUpKSB7XG4gICAgICAgICAgICAgIGFjdGl2ZVNvdW5kcy5zcGxpY2UoYWN0aXZlU291bmRzLmluZGV4T2YocGFydGljaXBhbnQubmFtZSksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChzaGFyZVNjcmVlblN0YXJ0ZWQgfHwgc2hhcmVkKSAmJiAhcGFydGljaXBhbnQudmlkZW9JRCkge1xuICAgICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoZXZlbnRUeXBlICE9ICdjaGF0JyAmJiBldmVudFR5cGUgIT0gJ2Jyb2FkY2FzdCcgJiYgcGFydGljaXBhbnQubmFtZSkge1xuICAgICAgICAgICAgICAgIHJlVXBkYXRlSW50ZXIoe1xuICAgICAgICAgICAgICAgICAgbmFtZTogcGFydGljaXBhbnQubmFtZSxcbiAgICAgICAgICAgICAgICAgIGF2ZXJhZ2U6IGF2ZXJhZ2VMb3VkbmVzcyxcbiAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHVwZGF0ZWRQYXJhbXMsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVBY3RpdmVTb3VuZHMoYWN0aXZlU291bmRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2hvd1dhdmVNb2RhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTXV0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0sIDIwMDApO1xuICB9XG5cbiAgY3JlYXRlSW5qZWN0b3IoaW5wdXRzOiBhbnkpIHtcbiAgICBpZiAoIXRoaXMuaW5qZWN0b3JDYWNoZS5oYXMoaW5wdXRzKSkge1xuICAgICAgY29uc3QgaW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgICBwcm92aWRlcnM6IE9iamVjdC5rZXlzKGlucHV0cykubWFwKChrZXkpID0+ICh7IHByb3ZpZGU6IGtleSwgdXNlVmFsdWU6IGlucHV0c1trZXldIH0pKSxcbiAgICAgICAgcGFyZW50OiB0aGlzLmluamVjdG9yLFxuICAgICAgfSk7XG4gICAgICB0aGlzLmluamVjdG9yQ2FjaGUuc2V0KGlucHV0cywgaW5qZWN0b3IpO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgIHJldHVybiB0aGlzLmluamVjdG9yQ2FjaGUuZ2V0KGlucHV0cykhO1xuICB9XG5cbiAgZ2V0TWluaUF1ZGlvUHJvcHMoKSB7XG4gICAgaWYgKFxuICAgICAgIXRoaXMuY2FjaGVkTWluaUF1ZGlvUHJvcHMgfHxcbiAgICAgIHRoaXMuc2hvd1dhdmVNb2RhbCAhPT0gdGhpcy5wcmV2aW91c1Nob3dXYXZlTW9kYWwgfHxcbiAgICAgIHRoaXMuaXNNdXRlZCAhPT0gdGhpcy5wcmV2aW91c0lzTXV0ZWRcbiAgICApIHtcbiAgICAgIHRoaXMuY2FjaGVkTWluaUF1ZGlvUHJvcHMgPSB7XG4gICAgICAgIC4uLnRoaXMubWluaUF1ZGlvUHJvcHMsXG4gICAgICAgIHZpc2libGU6IHRoaXMuc2hvd1dhdmVNb2RhbCAmJiAhdGhpcy5pc011dGVkLFxuICAgICAgICBzaG93V2F2ZWZvcm06IHRoaXMuc2hvd1dhdmVNb2RhbCxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMucHJldmlvdXNTaG93V2F2ZU1vZGFsID0gdGhpcy5zaG93V2F2ZU1vZGFsO1xuICAgICAgdGhpcy5wcmV2aW91c0lzTXV0ZWQgPSB0aGlzLmlzTXV0ZWQ7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNhY2hlZE1pbmlBdWRpb1Byb3BzO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgPGF1ZGlvICpuZ0lmPVwic3RyZWFtXCIgYXV0b3BsYXkgcGxheXNpbmxpbmUgI2F1ZGlvRWxlbWVudCBbc3JjT2JqZWN0XT1cInN0cmVhbVwiPjwvYXVkaW8+XHJcblxyXG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJNaW5pQXVkaW9Db21wb25lbnRcIj5cclxuICAgIDxuZy1jb250YWluZXIgKm5nQ29tcG9uZW50T3V0bGV0PVwiTWluaUF1ZGlvQ29tcG9uZW50OyBpbmplY3RvcjogY3JlYXRlSW5qZWN0b3IoZ2V0TWluaUF1ZGlvUHJvcHMoKSlcIj48L25nLWNvbnRhaW5lcj5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuPC9kaXY+XHJcbiJdfQ==