import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { ShowAlert } from '../../@types/types';
import { focusPanelists as sharedFocusPanelists } from 'mediasfu-shared';
import type { FocusPanelistsOptions as SharedFocusPanelistsOptions } from 'mediasfu-shared';

export interface FocusPanelistsOptions {
  socket: Socket;
  roomName: string;
  member: string;
  islevel: string;
  focusEnabled: boolean;
  muteOthersMic?: boolean;
  muteOthersCamera?: boolean;
  showAlert?: ShowAlert;
}

export type FocusPanelistsType = (options: FocusPanelistsOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class FocusPanelists {
  async focusPanelists(options: FocusPanelistsOptions): Promise<void> {
    await sharedFocusPanelists(options as unknown as SharedFocusPanelistsOptions);
  }
}
