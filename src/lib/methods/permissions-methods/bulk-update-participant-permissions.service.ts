import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { Participant, ShowAlert } from '../../@types/types';
import { PermissionLevel } from './update-participant-permission.service';
import { bulkUpdateParticipantPermissions as sharedBulkUpdateParticipantPermissions } from 'mediasfu-shared';
import type { BulkUpdateParticipantPermissionsOptions as SharedBulkUpdateParticipantPermissionsOptions } from 'mediasfu-shared';

export interface BulkUpdateParticipantPermissionsOptions {
  socket: Socket;
  participants: Participant[];
  newLevel: PermissionLevel;
  member: string;
  islevel: string;
  roomName: string;
  showAlert?: ShowAlert;
  maxBatchSize?: number;
}

export type BulkUpdateParticipantPermissionsType = (options: BulkUpdateParticipantPermissionsOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class BulkUpdateParticipantPermissions {
  async bulkUpdateParticipantPermissions(options: BulkUpdateParticipantPermissionsOptions): Promise<void> {
    await sharedBulkUpdateParticipantPermissions(
      options as unknown as SharedBulkUpdateParticipantPermissionsOptions,
    );
  }
}
