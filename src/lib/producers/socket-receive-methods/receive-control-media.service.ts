import { Injectable } from '@angular/core';
import { ShowAlert } from '../../@types/types';
import { panelistControlMedia as sharedPanelistControlMedia } from 'mediasfu-shared';

export interface ControlMediaData {
  type: 'audio' | 'video';
  action: 'mute' | 'unmute';
  reason?: string;
}

export interface ReceiveControlMediaOptions {
  data: ControlMediaData;
  showAlert?: ShowAlert;
  clickAudio?: () => void;
  clickVideo?: () => void;
  audioAlreadyOn?: boolean;
  videoAlreadyOn?: boolean;
}

export type ReceiveControlMediaType = (options: ReceiveControlMediaOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class ReceiveControlMedia {
  async receiveControlMedia({
    data,
    showAlert,
    clickAudio,
    clickVideo,
    audioAlreadyOn,
    videoAlreadyOn,
  }: ReceiveControlMediaOptions): Promise<void> {
    return sharedPanelistControlMedia({
      data,
      showAlert,
      clickAudio,
      clickVideo,
      audioAlreadyOn,
      videoAlreadyOn,
    });
  }
}
