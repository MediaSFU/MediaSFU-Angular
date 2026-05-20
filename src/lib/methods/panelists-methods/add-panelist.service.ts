import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { Participant, ShowAlert } from '../../@types/types';
import { addPanelist as sharedAddPanelist } from 'mediasfu-shared';
import type { AddPanelistOptions as SharedAddPanelistOptions } from 'mediasfu-shared';

export interface AddPanelistOptions {
  socket: Socket;
  participant: Participant;
  currentPanelists: Participant[];
  maxPanelists: number;
  roomName: string;
  member: string;
  islevel: string;
  showAlert?: ShowAlert;
}

export type AddPanelistType = (options: AddPanelistOptions) => Promise<boolean>;

@Injectable({
  providedIn: 'root',
})
export class AddPanelist {
  async addPanelist(options: AddPanelistOptions): Promise<boolean> {
    return sharedAddPanelist(options as unknown as SharedAddPanelistOptions);
  }
}
