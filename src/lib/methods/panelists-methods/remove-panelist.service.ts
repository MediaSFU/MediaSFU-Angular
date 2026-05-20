import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { Participant, ShowAlert } from '../../@types/types';
import { removePanelist as sharedRemovePanelist } from 'mediasfu-shared';
import type { RemovePanelistOptions as SharedRemovePanelistOptions } from 'mediasfu-shared';

export interface RemovePanelistOptions {
  socket: Socket;
  participant: Participant;
  roomName: string;
  member: string;
  islevel: string;
  showAlert?: ShowAlert;
}

export type RemovePanelistType = (options: RemovePanelistOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class RemovePanelist {
  async removePanelist(options: RemovePanelistOptions): Promise<void> {
    await sharedRemovePanelist(options as unknown as SharedRemovePanelistOptions);
  }
}
