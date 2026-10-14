import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniAudio } from '../../../components/display-components/mini-audio/mini-audio.component';

/** Anything with a receiver whose stats carry the inbound audio level (a mediasoup Consumer). */
export interface ScreenAudioConsumerLike {
  rtpReceiver?: { getStats: () => Promise<RTCStatsReport> } | null;
}

export interface ScreenAudioPlayerOptions {
  /** Stream holding the screen-share audio track. */
  stream: MediaStream | null;
  /** Producer id of the screen-share audio (used to remove the player when the share stops). */
  remoteProducerId: string;
  /** The consumer, used for its audio level (the card shows while sound plays). */
  consumer?: ScreenAudioConsumerLike | null;
  /** Name of the participant sharing the screen. */
  ownerName?: string;
  /** Listening volume, 0..1 (default 1). */
  volume?: number;
  /** Card component (default MiniAudio, or the app's custom mini audio component). */
  MiniAudioComponent?: any;
  /** Extra inputs for the card. */
  miniAudioProps?: Record<string, any>;
  /** Hide the card entirely (audio still plays). */
  hideCard?: boolean;
}

const LEVEL_THRESHOLD = 0.01;

/**
 * Plays audio shared with a screen share. While it plays, it shows an audio card ("<name> · Screen audio") with a
 * waveform, like other audio-only sources; it never marks the sharer as speaking. Clicking the card mutes or unmutes
 * it for this listener only. `audio[data-screen-audio="true"]` (or `setScreenAudioVolume`) sets the listening volume.
 *
 * Rendered by consumer resume into `audioOnlyStreams` as `{ component: ScreenAudioPlayer, inputs: {...} }`; the inputs
 * arrive through the injector like the other audio-only players.
 *
 * @example
 * ```html
 * <app-screen-audio-player [stream]="stream" remoteProducerId="p1" [consumer]="consumer" ownerName="Alice">
 * </app-screen-audio-player>
 * ```
 */
@Component({
  selector: 'app-screen-audio-player',
  imports: [CommonModule],
  template: `
    <div data-screen-audio-player="true" [attr.data-producer-id]="remoteProducerId">
      <audio
        #audioElement
        autoplay
        playsinline
        data-screen-audio="true"
        [attr.data-producer-id]="remoteProducerId"
        style="display: none"
      ></audio>
      <div
        *ngIf="!hideCard && MiniAudioComponent"
        role="button"
        [attr.title]="muted ? 'Unmute screen audio' : 'Mute screen audio'"
        [attr.aria-pressed]="muted"
        (click)="toggleMuted()"
      >
        <ng-container *ngComponentOutlet="MiniAudioComponent; injector: cardInjector()"></ng-container>
      </div>
    </div>
  `,
})
export class ScreenAudioPlayer implements AfterViewInit, OnChanges, OnDestroy {
  @Input() stream: MediaStream | null = null;
  @Input() remoteProducerId = '';
  @Input() consumer: ScreenAudioConsumerLike | null = null;
  @Input() ownerName = '';
  @Input() volume = 1;
  @Input() MiniAudioComponent: any = MiniAudio;
  @Input() miniAudioProps: Record<string, any> = {};
  @Input() hideCard = false;

  @ViewChild('audioElement') audioElement?: ElementRef<HTMLAudioElement>;

  active = false;
  muted = false;

  private levelTimer: ReturnType<typeof setInterval> | null = null;
  private cachedInjector: Injector | null = null;
  private cachedKey = '';
  private cachedProps: Record<string, any> | null = null;
  private readonly unlock = () => {
    const audio = this.audioElement?.nativeElement;
    if (!audio) return;
    void audio.play().then(() => this.removeUnlockListeners()).catch(() => {});
  };

  constructor(
    private injector: Injector,
    @Optional() @Inject('stream') injectedStream?: MediaStream | null,
    @Optional() @Inject('remoteProducerId') injectedRemoteProducerId?: string,
    @Optional() @Inject('consumer') injectedConsumer?: ScreenAudioConsumerLike | null,
    @Optional() @Inject('ownerName') injectedOwnerName?: string,
    @Optional() @Inject('volume') injectedVolume?: number,
    @Optional() @Inject('MiniAudioComponent') injectedMiniAudioComponent?: any,
    @Optional() @Inject('miniAudioProps') injectedMiniAudioProps?: Record<string, any>,
    @Optional() @Inject('hideCard') injectedHideCard?: boolean,
  ) {
    this.stream = injectedStream ?? this.stream;
    this.remoteProducerId = injectedRemoteProducerId ?? this.remoteProducerId;
    this.consumer = injectedConsumer ?? this.consumer;
    this.ownerName = injectedOwnerName ?? this.ownerName;
    this.volume = injectedVolume ?? this.volume;
    this.MiniAudioComponent = injectedMiniAudioComponent ?? this.MiniAudioComponent;
    this.miniAudioProps = injectedMiniAudioProps ?? this.miniAudioProps;
    this.hideCard = injectedHideCard ?? this.hideCard;
  }

  get label(): string {
    return `${this.ownerName ? `${this.ownerName} · ` : ''}Screen audio${this.muted ? ' (muted)' : ''}`;
  }

  /** Inputs for the card; the injector is rebuilt only when what it shows changes. */
  cardInputs(): Record<string, any> {
    return {
      imageSource: 'https://mediasfu.com/images/logo192.png',
      roundedImage: true,
      customStyle: { backgroundColor: 'gray' },
      barColor: 'white',
      textColor: 'white',
      overlayPosition: 'topRight',
      ...this.miniAudioProps,
      name: this.label,
      visible: this.active || this.muted,
      showWaveform: this.active && !this.muted,
    };
  }

  cardInjector(): Injector {
    const inputs = this.cardInputs();
    const key = `${inputs['name']}|${inputs['visible']}|${inputs['showWaveform']}`;
    if (!this.cachedInjector || key !== this.cachedKey || this.cachedProps !== this.miniAudioProps) {
      this.cachedInjector = Injector.create({
        providers: Object.keys(inputs).map((name) => ({ provide: name, useValue: inputs[name] })),
        parent: this.injector,
      });
      this.cachedKey = key;
      this.cachedProps = this.miniAudioProps;
    }
    return this.cachedInjector;
  }

  ngAfterViewInit(): void {
    this.attachStream();
    this.applyVolume();
    this.startLevelPolling();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stream'] || changes['consumer']) {
      this.attachStream();
      this.startLevelPolling();
    }
    if (changes['volume']) this.applyVolume();
  }

  ngOnDestroy(): void {
    this.stopLevelPolling();
    this.removeUnlockListeners();
    const audio = this.audioElement?.nativeElement;
    if (audio) audio.srcObject = null;
  }

  toggleMuted(): void {
    this.muted = !this.muted;
    const audio = this.audioElement?.nativeElement;
    if (audio) audio.muted = this.muted;
  }

  private attachStream(): void {
    const audio = this.audioElement?.nativeElement;
    if (!audio) return;
    this.removeUnlockListeners();
    if (audio.srcObject !== this.stream) audio.srcObject = this.stream;
    audio.muted = this.muted;
    if (!this.stream) return;
    // Browsers reject play() before the first user gesture; retry on the next gesture, as MiniAudioPlayer does.
    const playing = audio.play?.();
    if (playing && typeof playing.then === 'function') {
      playing.then(() => this.removeUnlockListeners()).catch(() => {
        document.addEventListener('pointerdown', this.unlock, true);
        document.addEventListener('keydown', this.unlock, true);
        document.addEventListener('touchend', this.unlock, true);
      });
    }
  }

  private removeUnlockListeners(): void {
    if (typeof document === 'undefined') return;
    document.removeEventListener('pointerdown', this.unlock, true);
    document.removeEventListener('keydown', this.unlock, true);
    document.removeEventListener('touchend', this.unlock, true);
  }

  private applyVolume(): void {
    const audio = this.audioElement?.nativeElement;
    if (audio) audio.volume = Math.min(1, Math.max(0, Number.isFinite(this.volume) ? this.volume : 1));
  }

  // Audio level from the receiver's stats; never fed to the speaking or audio-decibel logic.
  private startLevelPolling(): void {
    this.stopLevelPolling();
    const receiver = this.consumer?.rtpReceiver;
    if (!this.stream || !receiver) return;
    this.levelTimer = setInterval(() => {
      receiver
        .getStats()
        .then((stats) => {
          let level = 0;
          stats.forEach((report: { type?: string; kind?: string; audioLevel?: number }) => {
            if (report.type === 'inbound-rtp' && report.kind === 'audio' && typeof report.audioLevel === 'number') {
              level = report.audioLevel;
            }
          });
          this.active = level > LEVEL_THRESHOLD;
        })
        .catch(() => {});
    }, 1000);
  }

  private stopLevelPolling(): void {
    if (this.levelTimer !== null) {
      clearInterval(this.levelTimer);
      this.levelTimer = null;
    }
  }
}
