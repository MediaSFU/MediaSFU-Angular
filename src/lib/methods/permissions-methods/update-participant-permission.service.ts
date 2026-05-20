import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { Participant, ShowAlert } from '../../@types/types';
import { updateParticipantPermission as sharedUpdateParticipantPermission } from 'mediasfu-shared';
import type { UpdateParticipantPermissionOptions as SharedUpdateParticipantPermissionOptions } from 'mediasfu-shared';

export type PermissionLevel = '0' | '1' | '2';

export interface UpdateParticipantPermissionOptions {
  socket: Socket;
  participant: Participant;
  newLevel: PermissionLevel;
  member: string;
  islevel: string;
  roomName: string;
  showAlert?: ShowAlert;
}

export type UpdateParticipantPermissionType = (options: UpdateParticipantPermissionOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class UpdateParticipantPermission {
  async updateParticipantPermission(options: UpdateParticipantPermissionOptions): Promise<void> {
    await sharedUpdateParticipantPermission(
      options as unknown as SharedUpdateParticipantPermissionOptions,
    );
  }
}
