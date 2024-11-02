import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Injector,
  Inject,
  Optional,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReUpdateInterType,
  UpdateParticipantAudioDecibelsType,
  ReUpdateInterParameters,
  Participant,
} from '../../../@types/types';

export interface MiniAudioPlayerParameters extends ReUpdateInterParameters {
  breakOutRoomStarted: boolean;
  breakOutRoomEnded: boolean;
  limitedBreakRoom: Participant[];

  // mediasfu functions
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


@Component({
  selector: 'app-mini-audio-player',
  standalone: true,
  templateUrl: './mini-audio-player.component.html',
  styleUrls: ['./mini-audio-player.component.css'],
  imports: [CommonModule],
})
export class MiniAudioPlayer implements OnInit, OnDestroy {
  @Input() stream: MediaStream | null = null;
  @Input() remoteProducerId = '';
  @Input() parameters: MiniAudioPlayerParameters = {} as MiniAudioPlayerParameters;
  @Input() MiniAudioComponent: any;
  @Input() miniAudioProps: Record<string, any> = {};

  @ViewChild('audioElement', { static: true }) audioElement!: ElementRef<HTMLAudioElement>;

  showWaveModal = false;
  isMuted = false;
  audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  intervalId: any;
  autoWaveCheck = false;

  private previousShowWaveModal: boolean | null = null;
  private previousIsMuted: boolean | null = null;

  private injectorCache = new WeakMap<any, Injector>();
  private cachedMiniAudioProps: any;

  constructor(
    private injector: Injector,
    @Optional() @Inject('stream') injectedStream: MediaStream | null,
    @Optional() @Inject('remoteProducerId') injectedRemoteProducerId: string,
    @Optional() @Inject('parameters') injectedParameters: MiniAudioPlayerParameters,
    @Optional() @Inject('MiniAudioComponent') injectedMiniAudioComponent: any,
    @Optional() @Inject('miniAudioProps') injectedMiniAudioProps: Record<string, any>,
  ) {
    this.stream = injectedStream || this.stream;
    this.remoteProducerId = injectedRemoteProducerId || this.remoteProducerId;
    this.parameters = injectedParameters || this.parameters;
    this.MiniAudioComponent = injectedMiniAudioComponent || this.MiniAudioComponent;
    this.miniAudioProps = injectedMiniAudioProps || this.miniAudioProps;
  }

  ngOnInit(): void {
    if (this.stream) {
      this.setupAudioProcessing();
    }
  }

  ngOnDestroy(): void {
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
    const source = this.audioContext.createMediaStreamSource(this.stream!);
    source.connect(analyser);
    let consLow = false;

    this.intervalId = setInterval(() => {
      analyser.getByteTimeDomainData(dataArray);
      let averageLoudness =
        Array.from(dataArray).reduce((sum, value) => sum + value, 0) / bufferLength;

      const updatedParams = this.parameters.getUpdatedAllParams();
      let {
        eventType,
        participants,
        paginatedStreams,
        currentUserPage,
        adminNameStream,
        dispActiveNames,
        activeSounds,
        reUpdateInter,
        updateParticipantAudioDecibels,
        updateActiveSounds,
        shared,
        shareScreenStarted,
        breakOutRoomStarted,
        breakOutRoomEnded,
        limitedBreakRoom,
      } = updatedParams;

      const participant = participants.find((obj: any) => obj.audioID == this.remoteProducerId);

      let audioActiveInRoom = true;
      if (participant) {
        if (breakOutRoomStarted && !breakOutRoomEnded) {
          if (!limitedBreakRoom.map((obj: any) => obj.name).includes(participant.name)) {
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

        const inPage = paginatedStreams[currentUserPage].findIndex(
          (obj: any) => obj.name == participant.name,
        );

        if (participant.name && !dispActiveNames.includes(participant.name) && inPage == -1) {
          this.autoWaveCheck = false;
          if (!adminNameStream) {
            const adminParticipant = participants.find((obj: any) => obj.islevel == '2');
            adminNameStream = adminParticipant ? adminParticipant.name : '';
          }

          if (participant.name == adminNameStream) {
            this.autoWaveCheck = true;
          }
        } else {
          this.autoWaveCheck = true;
        }

        if (
          participant.videoID ||
          this.autoWaveCheck ||
          (breakOutRoomStarted && !breakOutRoomEnded && audioActiveInRoom)
        ) {
          this.showWaveModal = false;

          if (averageLoudness > 127.5) {
            if (!activeSounds.includes(participant.name)) {
              activeSounds.push(participant.name);
              consLow = false;

              if ((shareScreenStarted || shared) && !participant.videoID) {
                // do nothing
              } else {
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
          } else {
            if (activeSounds.includes(participant.name) && consLow) {
              activeSounds.splice(activeSounds.indexOf(participant.name), 1);

              if ((shareScreenStarted || shared) && !participant.videoID) {
                // do nothing
              } else {
                if (eventType != 'chat' && eventType != 'broadcast' && participant.name) {
                  reUpdateInter({
                    name: participant.name,
                    average: averageLoudness,
                    parameters: updatedParams,
                  });
                }
              }
            } else {
              consLow = true;
            }
          }
        } else {
          if (averageLoudness > 127.5) {
            if (!this.parameters['autoWave']) {
              this.showWaveModal = false;
            } else {
              this.showWaveModal = true;
            }

            if (!activeSounds.includes(participant.name)) {
              activeSounds.push(participant.name);
            }
            if ((shareScreenStarted || shared) && !participant.videoID) {
              // do nothing
            } else {
              if (eventType != 'chat' && eventType != 'broadcast' && participant.name) {
                reUpdateInter({
                  name: participant.name,
                  add: true,
                  average: averageLoudness,
                  parameters: updatedParams,
                });
              }
            }
          } else {
            this.showWaveModal = false;
            if (activeSounds.includes(participant.name)) {
              activeSounds.splice(activeSounds.indexOf(participant.name), 1);
            }
            if ((shareScreenStarted || shared) && !participant.videoID) {
              // do nothing
            } else {
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
      } else {
        this.showWaveModal = false;
        this.isMuted = true;
      }
    }, 2000);
  }

  createInjector(inputs: any) {
    if (!this.injectorCache.has(inputs)) {
      const injector = Injector.create({
        providers: Object.keys(inputs).map((key) => ({ provide: key, useValue: inputs[key] })),
        parent: this.injector,
      });
      this.injectorCache.set(inputs, injector);
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.injectorCache.get(inputs)!;
  }

  getMiniAudioProps() {
    if (
      !this.cachedMiniAudioProps ||
      this.showWaveModal !== this.previousShowWaveModal ||
      this.isMuted !== this.previousIsMuted
    ) {
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
}
