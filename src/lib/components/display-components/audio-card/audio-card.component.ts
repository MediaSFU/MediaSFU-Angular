import { Component, Input, OnInit, OnDestroy, NgZone, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faVideo,
  faVideoSlash,
  faMicrophone,
  faMicrophoneSlash,
} from '@fortawesome/free-solid-svg-icons';
import { getOverlayPosition } from '../../../methods/utils/get-overlay-position.util';
import { ControlMedia } from '../../../consumers/control-media.service';
import { MiniCard } from '../mini-card/mini-card.component';
import {
  Participant,
  ControlsPosition,
  InfoPosition,
  AudioDecibels,
  ControlMediaOptions,
  ShowAlert,
  CoHostResponsibility,
  CustomComponent,
} from '../../../@types/types';
import { Socket } from 'socket.io-client';

export interface AudioCardParameters {
  audioDecibels: AudioDecibels[];
  participants: Participant[];
  socket: Socket;
  coHostResponsibility: CoHostResponsibility[];
  roomName: string;
  showAlert?: ShowAlert;
  coHost: string;
  islevel: string;
  member: string;
  eventType: string;

  // mediasfu functions
  getUpdatedAllParams(): AudioCardParameters;
}

export interface AudioCardOptions {
  controlUserMedia?: (options: ControlMediaOptions) => Promise<void>;
  customStyle?: Partial<CSSStyleDeclaration>; // Use Partial to allow specific CSS properties
  name: string; // Required field for name
  barColor?: string; // Optional color for audio bar
  textColor?: string; // Optional color for text
  imageSource?: string; // Optional URL for image source
  roundedImage?: boolean; // Optional flag for rounded image
  imageStyle?: Partial<CSSStyleDeclaration>; // Use Partial for CSS style type safety
  showControls?: boolean; // Toggle to show/hide controls
  showInfo?: boolean; // Toggle to show/hide info section
  videoInfoComponent?: HTMLElement | CustomComponent; // Custom component for participant information
  videoControlsComponent?: HTMLElement | CustomComponent; // Custom component for video controls
  controlsPosition?: ControlsPosition; // Custom control positioning
  infoPosition?: InfoPosition; // Custom info positioning
  participant: Participant; // Required participant object reference
  backgroundColor?: string; // Optional background color
  audioDecibels?: AudioDecibels; // Optional audio decibels info
  parameters: AudioCardParameters; // Required parameters object for configurations
}

export type AudioCardType = (options: AudioCardOptions) => HTMLElement;

@Component({
  selector: 'app-audio-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, MiniCard],
  templateUrl: './audio-card.component.html',
  styleUrls: ['./audio-card.component.css'],
})
export class AudioCard implements OnInit, OnDestroy {
  @Input() controlUserMedia?: (options: ControlMediaOptions) => Promise<void>;
  @Input() customStyle: Partial<CSSStyleDeclaration> = {};
  @Input() name = '';
  @Input() barColor = 'red';
  @Input() textColor = 'white';
  @Input() imageSource = '';
  @Input() roundedImage = false;
  @Input() imageStyle: Partial<CSSStyleDeclaration> = {};
  @Input() showControls = true;
  @Input() showInfo = true;
  @Input() videoInfoComponent?: HTMLElement | CustomComponent; // Custom component for participant information
  @Input() videoControlsComponent?: HTMLElement | CustomComponent; // Custom component for video controls
  @Input() controlsPosition = 'topLeft';
  @Input() infoPosition = 'topRight';
  @Input() participant: Participant | null = null;
  @Input() backgroundColor = '';
  @Input() audioDecibels: any;
  @Input() parameters!: AudioCardParameters;

  faVideo = faVideo;
  faVideoSlash = faVideoSlash;
  faMicrophone = faMicrophone;
  faMicrophoneSlash = faMicrophoneSlash;

  waveformAnimations: number[] = Array.from({ length: 9 }, () => 0);
  showWaveform = true;
  interval: any;

  constructor(
    private ngZone: NgZone,
    private controlMediaService: ControlMedia,
    @Optional()
    @Inject('controlUserMedia')
    injectedControlUserMedia: (options: ControlMediaOptions) => Promise<void>,
    @Optional() @Inject('customStyle') injectedCustomStyle: Partial<CSSStyleDeclaration>,
    @Optional() @Inject('name') injectedName: string,
    @Optional() @Inject('barColor') injectedBarColor: string,
    @Optional() @Inject('textColor') injectedTextColor: string,
    @Optional() @Inject('imageSource') injectedImageSource: string,
    @Optional() @Inject('roundedImage') injectedRoundedImage: boolean,
    @Optional() @Inject('imageStyle') injectedImageStyle: Partial<CSSStyleDeclaration>,
    @Optional() @Inject('showControls') injectedShowControls: boolean,
    @Optional() @Inject('showInfo') injectedShowInfo: boolean,
    @Optional()
    @Inject('videoInfoComponent')
    injectedVideoInfoComponent: HTMLElement | CustomComponent,
    @Optional()
    @Inject('videoControlsComponent')
    injectedVideoControlsComponent: HTMLElement | CustomComponent,
    @Optional() @Inject('controlsPosition') injectedControlsPosition: ControlsPosition,
    @Optional() @Inject('infoPosition') injectedInfoPosition: InfoPosition,
    @Optional() @Inject('participant') injectedParticipant: Participant | null,
    @Optional() @Inject('backgroundColor') injectedBackgroundColor: string,
    @Optional() @Inject('audioDecibels') injectedAudioDecibels: AudioDecibels,
    @Optional() @Inject('parameters') injectedParameters: AudioCardParameters,
  ) {
    this.controlUserMedia = injectedControlUserMedia || this.controlUserMedia;
    this.customStyle = injectedCustomStyle || this.customStyle;
    this.name = injectedName || this.name;
    this.barColor = injectedBarColor || this.barColor;
    this.textColor = injectedTextColor || this.textColor;
    this.imageSource = injectedImageSource || this.imageSource;
    this.roundedImage = injectedRoundedImage || this.roundedImage;
    this.imageStyle = injectedImageStyle || this.imageStyle;
    this.showControls = injectedShowControls != null ? injectedShowControls : this.showControls;
    this.showInfo = injectedShowInfo != null ? injectedShowInfo : this.showInfo;
    this.videoInfoComponent = injectedVideoInfoComponent || this.videoInfoComponent;
    this.videoControlsComponent = injectedVideoControlsComponent || this.videoControlsComponent;
    this.controlsPosition = injectedControlsPosition || this.controlsPosition;
    this.infoPosition = injectedInfoPosition || this.infoPosition;
    this.participant = injectedParticipant || this.participant;
    this.backgroundColor = injectedBackgroundColor || this.backgroundColor;
    this.audioDecibels = injectedAudioDecibels || this.audioDecibels;
    this.parameters = injectedParameters || this.parameters;
  }

  ngOnInit() {
    if (!this.controlUserMedia) {
      this.controlUserMedia = async (options: ControlMediaOptions) => {
        await this.controlMediaService.controlMedia(options);
      };
    }

    if (this.parameters) {
      this.ngZone.runOutsideAngular(() => {
        this.interval = setInterval(() => {
          const { audioDecibels, participants } = this.parameters.getUpdatedAllParams();
          const existingEntry = audioDecibels.find((entry: any) => entry.name == this.name);
          this.participant = participants.find((p: Participant) => p.name == this.name) || null;

          if (
            existingEntry &&
            existingEntry.averageLoudness > 127.5 &&
            this.participant &&
            !this.participant.muted
          ) {
            this.animateWaveform();
          } else {
            this.resetWaveform();
          }
        }, 1000);
      });
    }

    if (this.participant?.muted) {
      this.showWaveform = false;
    } else {
      this.showWaveform = true;
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  animateBar(index: number) {
    this.waveformAnimations[index] = 1;
    setTimeout(() => {
      this.waveformAnimations[index] = 0;
    }, this.getAnimationDuration(index));
  }

  animateWaveform() {
    this.waveformAnimations.forEach((_, index) => {
      setInterval(() => this.animateBar(index), this.getAnimationDuration(index) * 2);
    });
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
      await this.controlUserMedia?.({
        participantId: this.participant.id || '',
        participantName: this.participant.name,
        type: 'audio',
        socket: this.parameters.socket,
        coHostResponsibility: this.parameters.coHostResponsibility,
        roomName: this.parameters.roomName,
        showAlert: this.parameters.showAlert,
        coHost: this.parameters.coHost,
        islevel: this.parameters.islevel,
        member: this.parameters.member,
        participants: this.parameters.participants,
      });
    }
  }

  async toggleVideo() {
    if (this.participant) {
      await this.controlUserMedia?.({
        participantId: this.participant.id || '',
        participantName: this.participant.name,
        type: 'video',
        socket: this.parameters.socket,
        coHostResponsibility: this.parameters.coHostResponsibility,
        roomName: this.parameters.roomName,
        showAlert: this.parameters.showAlert,
        coHost: this.parameters.coHost,
        islevel: this.parameters.islevel,
        member: this.parameters.member,
        participants: this.parameters.participants,
      });
    }
  }

  renderControls() {
    return this.showControls;
  }

  // Helper method to combine styles
  combineStyles(baseStyle: any, additionalStyles: any) {
    return { ...baseStyle, ...additionalStyles };
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
