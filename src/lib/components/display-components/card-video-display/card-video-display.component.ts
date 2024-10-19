import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventType } from '../../../@types/types';

export interface CardVideoDisplayOptions {
  remoteProducerId: string;
  eventType: string;
  forceFullDisplay: boolean;
  videoStream: MediaStream | null;
  backgroundColor: string;
  doMirror?: boolean;
}

export type CardVideoDisplayType = (options: CardVideoDisplayOptions) => HTMLElement;

@Component({
  selector: 'app-card-video-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-video-display.component.html',
  styleUrls: ['./card-video-display.component.css'],
})
export class CardVideoDisplay implements OnInit, OnChanges {
  @Input() remoteProducerId = '';
  @Input() eventType: EventType = 'webinar';
  @Input() forceFullDisplay = false;
  @Input() videoStream: MediaStream | null = null;
  @Input() backgroundColor = 'transparent';
  @Input() doMirror = false;

  @ViewChild('videoElement', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;

  videoContainerStyle: any;

  ngOnInit() {
    this.updateVideoStream();
    this.setVideoContainerStyle();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['videoStream'] && this.videoStream) {
      const currentStream = changes['videoStream'].currentValue;
      const previousStream = changes['videoStream'].previousValue;

      if (
        !previousStream ||
        currentStream.id !== previousStream.id ||
        currentStream.active !== previousStream.active
      ) {
        this.updateVideoStream();
      }
    }

    if (
      changes['backgroundColor'] &&
      changes['backgroundColor'].currentValue !== changes['backgroundColor'].previousValue
    ) {
      this.setVideoContainerStyle();
    }
  }

  updateVideoStream() {
    if (this.videoElement && this.videoStream) {
      const videoElement = this.videoElement.nativeElement;

      // Update the video element's srcObject only if it has changed
      if (videoElement.srcObject !== this.videoStream) {
        videoElement.srcObject = this.videoStream;
      }
    }
  }

  setVideoContainerStyle() {
    this.videoContainerStyle = {
      ...this.getBaseVideoContainerStyle(),
      backgroundColor: this.backgroundColor,
    };
  }

  getBaseVideoContainerStyle() {
    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
    };
  }

  getVideoStyle() {
    const baseStyles: any = {
      width: this.forceFullDisplay ? '100%' : 'auto',
      height: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: this.forceFullDisplay ? 'cover' : 'contain',
      backgroundColor: this.backgroundColor,
    };

    if (this.doMirror) {
      baseStyles.transform = 'rotateY(180deg)';
    }

    return baseStyles;
  }
}