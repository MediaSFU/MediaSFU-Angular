import { CoHostResponsibility, MessageParticipantsType, MuteParticipantsType, Participant, RemoveParticipantsType, ShowAlert } from '../../../@types/types';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
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
export declare class ParticipantListItem {
    participant: Participant;
    isBroadcast: boolean;
    onMuteParticipants: (params: any) => Promise<void>;
    onMessageParticipants: (params: any) => void;
    onRemoveParticipants: (params: any) => Promise<void>;
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
    participants: Participant[];
    updateParticipants: (participants: Participant[]) => void;
    faMicrophone: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faMicrophoneSlash: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faComment: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faTrash: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faDotCircle: import("@fortawesome/fontawesome-common-types").IconDefinition;
    getIconName(): import("@fortawesome/fontawesome-common-types").IconDefinition;
    muteParticipant(): void;
    messageParticipant(): void;
    removeParticipant(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ParticipantListItem, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ParticipantListItem, "app-participant-list-item", never, { "participant": { "alias": "participant"; "required": false; }; "isBroadcast": { "alias": "isBroadcast"; "required": false; }; "onMuteParticipants": { "alias": "onMuteParticipants"; "required": false; }; "onMessageParticipants": { "alias": "onMessageParticipants"; "required": false; }; "onRemoveParticipants": { "alias": "onRemoveParticipants"; "required": false; }; "socket": { "alias": "socket"; "required": false; }; "coHostResponsibility": { "alias": "coHostResponsibility"; "required": false; }; "member": { "alias": "member"; "required": false; }; "islevel": { "alias": "islevel"; "required": false; }; "showAlert": { "alias": "showAlert"; "required": false; }; "coHost": { "alias": "coHost"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "updateIsMessagesModalVisible": { "alias": "updateIsMessagesModalVisible"; "required": false; }; "updateDirectMessageDetails": { "alias": "updateDirectMessageDetails"; "required": false; }; "updateStartDirectMessage": { "alias": "updateStartDirectMessage"; "required": false; }; "participants": { "alias": "participants"; "required": false; }; "updateParticipants": { "alias": "updateParticipants"; "required": false; }; }, {}, never, never, true, never>;
}
