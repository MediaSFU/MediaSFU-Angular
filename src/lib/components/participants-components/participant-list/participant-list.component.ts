/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantListItem } from '../participant-list-item/participant-list-item.component';
import {
  CoHostResponsibility,
  Participant,
  ShowAlert,
  MuteParticipantsOptions,
  MessageParticipantsOptions,
  RemoveParticipantsOptions,
} from '../../../@types/types';
import { Socket } from 'socket.io-client';

export interface ParticipantListOptions {
  participants: Participant[];
  isBroadcast: boolean;
  onMuteParticipants: (options: MuteParticipantsOptions) => Promise<void>;
  onMessageParticipants: (options: MessageParticipantsOptions) => void;
  onRemoveParticipants: (options: RemoveParticipantsOptions) => void;
  socket: Socket;
  coHostResponsibility: CoHostResponsibility[];
  member: string;
  islevel: string;
  showAlert?: ShowAlert;
  coHost: string;
  roomName: string;
  updateIsMessagesModalVisible: (isVisible: boolean) => void;
  updateDirectMessageDetails: (participant: Participant | null) => void;
  updateStartDirectMessage: (start: boolean) => void;
  updateParticipants: (participants: Participant[]) => void;
}

/**
 * @component ParticipantList
 * @description Displays a list of participants and provides actions like muting, messaging, and removing participants.
 *
 * @selector app-participant-list
 * @standalone true
 * @templateUrl ./participant-list.component.html
 * @styleUrls ['./participant-list.component.css']
 * @imports [CommonModule, ParticipantListItem]
 *
 * @example
 * ```html
 * <app-participant-list [participants]="participants" [isBroadcast]="isBroadcast"
 *                       [onMuteParticipants]="muteParticipantsHandler"
 *                       [onMessageParticipants]="messageParticipantsHandler"
 *                       [onRemoveParticipants]="removeParticipantsHandler">
 * </app-participant-list>
 * ```
 */


@Component({
    selector: 'app-participant-list',
    imports: [CommonModule, ParticipantListItem],
    templateUrl: './participant-list.component.html',
    styleUrls: ['./participant-list.component.css']
})
export class ParticipantList {
  @Input() participants: Participant[] = [];
  @Input() isBroadcast = false;
  @Input() onMuteParticipants!: (options: MuteParticipantsOptions) => Promise<void>;
  @Input() onMessageParticipants!: (options: MessageParticipantsOptions) => void;
  @Input() onRemoveParticipants!: (options: RemoveParticipantsOptions) => Promise<void>;
  @Input() socket: Socket = {} as Socket;
  @Input() coHostResponsibility: CoHostResponsibility[] = [];
  @Input() member = '';
  @Input() islevel = '';
  @Input() showAlert?: ShowAlert;
  @Input() coHost = '';
  @Input() roomName = '';
  @Input() updateIsMessagesModalVisible: (isVisible: boolean) => void = () => {};
  @Input() updateDirectMessageDetails: (participant: Participant | null) => void = () => {};
  @Input() updateStartDirectMessage: (start: boolean) => void = () => {};
  @Input() updateParticipants: (participants: Participant[]) => void = () => {};
}
