import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMicrophone,
  faMicrophoneSlash,
  faComment,
  faTrash,
  faDotCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  CoHostResponsibility,
  MessageParticipantsType,
  MuteParticipantsType,
  Participant,
  RemoveParticipantsType,
  ShowAlert,
} from '../../../@types/types'; // Adjust the import based on your file structure
import { Socket } from 'socket.io-client';

export interface ParticipantListItemOptions {
  participant: Participant;
  isBroadcast: boolean;
  onMuteParticipants: MuteParticipantsType;
  onMessageParticipants: MessageParticipantsType;
  onRemoveParticipants: RemoveParticipantsType;
  socket: Socket;
  coHostResponsibility: CoHostResponsibility[];
  member: string;
  islevel: string;
  showAlert?: ShowAlert;
  coHost: string;
  roomName: string;
  participants: Participant[];
  updateIsMessagesModalVisible: (isVisible: boolean) => void;
  updateDirectMessageDetails: (participant: Participant | null) => void;
  updateStartDirectMessage: (start: boolean) => void;
  updateParticipants: (participants: Participant[]) => void;
}

export type ParticipantListItemType = (options: ParticipantListItemOptions) => HTMLElement;


/**
 * Component representing an individual participant item in the participant list.
 * Provides controls for muting, messaging, and removing a participant.
 *
 * @component
 * @selector app-participant-list-item
 * @standalone true
 * @templateUrl ./participant-list-item.component.html
 * @styleUrls ['./participant-list-item.component.css']
 * @imports [CommonModule, FontAwesomeModule]
 *
 * @example
 * ```html
 * <app-participant-list-item [participant]="participant" [isBroadcast]="isBroadcast"
 *                            [onMuteParticipants]="muteHandler" [onMessageParticipants]="messageHandler"
 *                            [onRemoveParticipants]="removeHandler" [socket]="socket" [member]="member">
 * </app-participant-list-item>
 * ```
 */

@Component({
    selector: 'app-participant-list-item',
    templateUrl: './participant-list-item.component.html',
    styleUrls: ['./participant-list-item.component.css'],
    imports: [CommonModule, FontAwesomeModule]
})
export class ParticipantListItem {
  @Input() participant!: Participant;
  @Input() isBroadcast!: boolean;
  @Input() onMuteParticipants!: (params: any) => Promise<void>;
  @Input() onMessageParticipants!: (params: any) => void;
  @Input() onRemoveParticipants!: (params: any) => Promise<void>;
  @Input() socket!: Socket;
  @Input() coHostResponsibility!: CoHostResponsibility[];
  @Input() member!: string;
  @Input() islevel!: string;
  @Input() showAlert?: ShowAlert;
  @Input() coHost!: string;
  @Input() roomName!: string;
  @Input() updateIsMessagesModalVisible!: (isVisible: boolean) => void;
  @Input() updateDirectMessageDetails!: (participant: Participant | null) => void;
  @Input() updateStartDirectMessage!: (start: boolean) => void;
  @Input() participants!: Participant[];
  @Input() updateParticipants!: (participants: Participant[]) => void;

  faMicrophone = faMicrophone;
  faMicrophoneSlash = faMicrophoneSlash;
  faComment = faComment;
  faTrash = faTrash;
  faDotCircle = faDotCircle;

  getIconName() {
    return this.participant.muted ? this.faMicrophoneSlash : this.faMicrophone;
  }

  muteParticipant() {
    if (this.onMuteParticipants) {
      this.onMuteParticipants({
        socket: this.socket,
        participant: this.participant,
        coHostResponsibility: this.coHostResponsibility,
        member: this.member,
        islevel: this.islevel,
        showAlert: this.showAlert,
        coHost: this.coHost,
        roomName: this.roomName,
      });
    }
  }

  messageParticipant() {
    if (this.onMessageParticipants) {
      this.onMessageParticipants({
        participant: this.participant,
        coHostResponsibility: this.coHostResponsibility,
        member: this.member,
        islevel: this.islevel,
        showAlert: this.showAlert,
        coHost: this.coHost,
        updateIsMessagesModalVisible: this.updateIsMessagesModalVisible,
        updateDirectMessageDetails: this.updateDirectMessageDetails,
        updateStartDirectMessage: this.updateStartDirectMessage,
      });
    }
  }

  removeParticipant() {
    if (this.onRemoveParticipants) {
      this.onRemoveParticipants({
        socket: this.socket,
        participant: this.participant,
        coHostResponsibility: this.coHostResponsibility,
        member: this.member,
        islevel: this.islevel,
        showAlert: this.showAlert,
        coHost: this.coHost,
        roomName: this.roomName,
        participants: this.participants,
        updateParticipants: this.updateParticipants,
      });
    }
  }
}
