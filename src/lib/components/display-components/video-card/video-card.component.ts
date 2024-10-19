import { Component, Input, OnInit, OnDestroy, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
} from '@fortawesome/free-solid-svg-icons';
import { CardVideoDisplay } from '../card-video-display/card-video-display.component';
import { getOverlayPosition } from '../../../methods/utils/get-overlay-position.util';
import { ControlMedia } from '../../../consumers/control-media.service';
import {
  Participant,
  AudioDecibels,
  CoHostResponsibility,
  ShowAlert,
  EventType,
  CustomComponent,
} from '../../../@types/types';
import { Socket } from 'socket.io-client';

export interface VideoCardParameters {
  socket: Socket;
  roomName: string;
  coHostResponsibility: CoHostResponsibility[];
  showAlert?: ShowAlert;
  coHost: string;
  participants: Participant[];
  member: string;
  islevel: string;
  audioDecibels: AudioDecibels[];

  // mediasfu functions
  getUpdatedAllParams: () => VideoCardParameters;
  // [key: string]: any;
}

export interface VideoCardOptions {
  customStyle?: Partial<CSSStyleDeclaration>;
  name: string;
  barColor?: string;
  textColor?: string;
  imageSource: string;
  roundedImage?: boolean;
  imageStyle?: Partial<CSSStyleDeclaration>;
  remoteProducerId: string;
  eventType: EventType;
  forceFullDisplay?: boolean;
  videoStream: MediaStream | null;
  showControls?: boolean;
  showInfo?: boolean;
  videoInfoComponent?: HTMLElement | CustomComponent;
  videoControlsComponent?: HTMLElement | CustomComponent;
  controlsPosition?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  infoPosition?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  participant: Participant;
  backgroundColor: string;
  audioDecibels: AudioDecibels[];
  doMirror?: boolean;
  parameters: VideoCardParameters;
}

export type VideoCardType = (options: VideoCardOptions) => HTMLElement;

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, CardVideoDisplay],
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css'],
})
export class VideoCard implements OnInit, OnDestroy {
  @Input() customStyle: Partial<CSSStyleDeclaration> = {};
  @Input() name!: string;
  @Input() barColor = 'red';
  @Input() textColor = 'white';
  @Input() imageSource!: string;
  @Input() roundedImage = false;
  @Input() imageStyle: Partial<CSSStyleDeclaration> = {};
  @Input() remoteProducerId!: string;
  @Input() eventType!: EventType;
  @Input() forceFullDisplay!: boolean;
  @Input() videoStream: MediaStream | null = null;
  @Input() showControls = true;
  @Input() showInfo = true;
  @Input() videoInfoComponent?: HTMLElement | CustomComponent;
  @Input() videoControlsComponent?: HTMLElement | CustomComponent;
  @Input() controlsPosition: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'topLeft';
  @Input() infoPosition: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'topRight';
  @Input() participant!: Participant;
  @Input() backgroundColor!: string;
  @Input() audioDecibels: AudioDecibels[] = [];
  @Input() doMirror!: boolean;
  @Input() parameters!: VideoCardParameters;

  waveformAnimations: number[] = Array.from({ length: 9 }, () => 0);
  showWaveform = true;
  interval: any;

  faMicrophone = faMicrophone;
  faMicrophoneSlash = faMicrophoneSlash;
  faVideo = faVideo;
  faVideoSlash = faVideoSlash;

  constructor(
    private controlMediaService: ControlMedia,
    @Optional() @Inject('customStyle') injectedCustomStyle: Partial<CSSStyleDeclaration>,
    @Optional() @Inject('name') injectedName: string,
    @Optional() @Inject('barColor') injectedBarColor: string,
    @Optional() @Inject('textColor') injectedTextColor: string,
    @Optional() @Inject('imageSource') injectedImageSource: string,
    @Optional() @Inject('roundedImage') injectedRoundedImage: boolean,
    @Optional() @Inject('imageStyle') injectedImageStyle: Partial<CSSStyleDeclaration>,
    @Optional() @Inject('remoteProducerId') injectedRemoteProducerId: string,
    @Optional() @Inject('eventType') injectedEventType: EventType,
    @Optional() @Inject('forceFullDisplay') injectedForceFullDisplay: boolean,
    @Optional() @Inject('videoStream') injectedVideoStream: MediaStream | null,
    @Optional() @Inject('showControls') injectedShowControls: boolean,
    @Optional() @Inject('showInfo') injectedShowInfo: boolean,
    @Optional() @Inject('videoInfoComponent') injectedVideoInfoComponent: HTMLElement,
    @Optional() @Inject('videoControlsComponent') injectedVideoControlsComponent: HTMLElement,
    @Optional()
    @Inject('controlsPosition')
    injectedControlsPosition: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight',
    @Optional()
    @Inject('infoPosition')
    injectedInfoPosition: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight',
    @Optional() @Inject('participant') injectedParticipant: Participant,
    @Optional() @Inject('backgroundColor') injectedBackgroundColor: string,
    @Optional() @Inject('audioDecibels') injectedAudioDecibels: AudioDecibels[],
    @Optional() @Inject('doMirror') injectedDoMirror: boolean,
    @Optional() @Inject('parameters') injectedParameters: VideoCardParameters,
  ) {
    this.customStyle = injectedCustomStyle || this.customStyle;
    this.name = injectedName || this.name;
    this.barColor = injectedBarColor || this.barColor;
    this.textColor = injectedTextColor || this.textColor;
    this.imageSource = injectedImageSource || this.imageSource;
    this.roundedImage = injectedRoundedImage || this.roundedImage;
    this.imageStyle = injectedImageStyle || this.imageStyle;
    this.remoteProducerId = injectedRemoteProducerId || this.remoteProducerId;
    this.eventType = injectedEventType || this.eventType;
    this.forceFullDisplay = injectedForceFullDisplay || this.forceFullDisplay;
    this.videoStream = injectedVideoStream || this.videoStream;
    this.showControls = injectedShowControls != null ? injectedShowControls : this.showControls;
    this.showInfo = injectedShowInfo != null ? injectedShowInfo : this.showInfo;
    this.videoInfoComponent = injectedVideoInfoComponent || this.videoInfoComponent;
    this.videoControlsComponent = injectedVideoControlsComponent || this.videoControlsComponent;
    this.controlsPosition = injectedControlsPosition || this.controlsPosition;
    this.infoPosition = injectedInfoPosition || this.infoPosition;
    this.participant = injectedParticipant || this.participant;
    this.backgroundColor = injectedBackgroundColor || this.backgroundColor;
    this.audioDecibels = injectedAudioDecibels || this.audioDecibels;
    this.doMirror = injectedDoMirror || this.doMirror;
    this.parameters = injectedParameters || this.parameters;
  }

  ngOnInit() {
    this.interval = setInterval(() => {
      const params = this.parameters.getUpdatedAllParams();
      const { audioDecibels, participants } = params;
      const existingEntry =
        audioDecibels && audioDecibels.find((entry: AudioDecibels) => entry.name === this.name);
      const participantEntry =
        participants && participants.find((p: Participant) => p.name === this.name);
      if (
        existingEntry &&
        existingEntry.averageLoudness > 127.5 &&
        participantEntry &&
        !participantEntry.muted
      ) {
        this.animateWaveform();
      } else {
        this.resetWaveform();
      }
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  animateWaveform() {
    this.waveformAnimations.forEach((_, index) => {
      setInterval(() => this.animateBar(index), this.getAnimationDuration(index) * 2);
    });
  }

  animateBar(index: number) {
    this.waveformAnimations[index] = 1;
    setTimeout(() => {
      this.waveformAnimations[index] = 0;
    }, this.getAnimationDuration(index));
  }

  resetWaveform() {
    this.waveformAnimations.fill(0);
  }

  getAnimationDuration(index: number): number {
    const durations = [474, 433, 407, 458, 400, 427, 441, 419, 487];
    return durations[index] || 0;
  }

  async toggleAudio() {
    if (this.participant && !this.participant.muted) {
      const params = this.parameters;
      await this.controlMediaService.controlMedia({
        participantId: this.participant.id || '',
        participantName: this.participant.name,
        type: 'audio',
        socket: params.socket,
        roomName: params.roomName,
        coHostResponsibility: params.coHostResponsibility,
        showAlert: params.showAlert,
        coHost: params.coHost,
        participants: params.participants,
        member: params.member,
        islevel: params.islevel,
      });
    }
  }

  async toggleVideo() {
    if (this.participant) {
      const params = this.parameters.getUpdatedAllParams();
      await this.controlMediaService.controlMedia({
        participantId: this.participant.id || '',
        participantName: this.participant.name,
        type: 'video',
        socket: params.socket,
        roomName: params.roomName,
        coHostResponsibility: params.coHostResponsibility,
        showAlert: params.showAlert,
        coHost: params.coHost,
        participants: params.participants,
        member: params.member,
        islevel: params.islevel,
      });
    }
  }

  renderControls() {
    if (!this.showControls) {
      return null;
    }

    if (this.videoControlsComponent) {
      return this.videoControlsComponent;
    }

    return `
      <div class="overlayControls">
        <button class="controlButton" (click)="toggleAudio()">
          <fa-icon [icon]="participant?.muted ? faMicrophoneSlash : faMicrophone" [style.color]="participant?.muted ? 'red' : 'green'"></fa-icon>
        </button>
        <button class="controlButton" (click)="toggleVideo()">
          <fa-icon [icon]="participant?.videoOn ? faVideo : faVideoSlash" [style.color]="participant?.videoOn ? 'green' : 'red'"></fa-icon>
        </button>
      </div>
    `;
  }

  getOverlayPosition(position: string) {
    return getOverlayPosition({ position });
  }

  isCustomComponent(
    comp: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent),
  ): comp is CustomComponent {
    return (
      typeof (comp as CustomComponent).component !== 'function' &&
      (comp as CustomComponent).component !== undefined
    );
  }

  isFunctionComponent(
    comp: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent),
  ): comp is () => HTMLElement | CustomComponent {
    return typeof comp === 'function';
  }
}