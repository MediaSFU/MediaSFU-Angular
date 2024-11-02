import { OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CoHostResponsibility, EventType, Participant, ShowAlert } from '../../../@types/types';
import { MuteParticipants, MuteParticipantsOptions } from '../../../methods/participants-methods/mute-participants.service';
import { MessageParticipants, MessageParticipantsOptions } from '../../../methods/participants-methods/message-participants.service';
import { RemoveParticipants, RemoveParticipantsOptions } from '../../../methods/participants-methods/remove-participants.service';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface ParticipantsModalParameters {
    position?: string;
    backgroundColor?: string;
    coHostResponsibility: CoHostResponsibility[];
    coHost: string;
    member: string;
    islevel: string;
    participants: Participant[];
    eventType: EventType;
    filteredParticipants: Participant[];
    socket: Socket;
    showAlert?: ShowAlert;
    roomName: string;
    updateIsMessagesModalVisible: (isVisible: boolean) => void;
    updateDirectMessageDetails: (participant: Participant | null) => void;
    updateStartDirectMessage: (start: boolean) => void;
    updateParticipants: (participants: Participant[]) => void;
    getUpdatedAllParams: () => ParticipantsModalParameters;
    [key: string]: any;
}
export interface ParticipantsModalOptions {
    isParticipantsModalVisible: boolean;
    onParticipantsClose: () => void;
    onParticipantsFilterChange: (filter: string) => void;
    participantsCounter: number;
    onMuteParticipants?: typeof MuteParticipants;
    onMessageParticipants?: typeof MessageParticipants;
    onRemoveParticipants?: typeof RemoveParticipants;
    RenderParticipantList?: HTMLElement;
    RenderParticipantListOthers?: HTMLElement;
    parameters: ParticipantsModalParameters;
    backgroundColor?: string;
    position?: string;
}
export type ParticipantsModalType = (options: ParticipantsModalOptions) => HTMLElement;
/**
 * Component for displaying a modal containing a list of participants with options to mute, message, or remove participants.
 * Supports both regular participants and a subset of "other" participants.
 *
 * @component
 * @selector app-participants-modal
 * @standalone true
 * @templateUrl ./participants-modal.component.html
 * @styleUrls ['./participants-modal.component.css']
 * @imports [CommonModule, FontAwesomeModule, ParticipantList, ParticipantListOthers]
 *
 * @example
 * ```html
 * <app-participants-modal
 *   [isParticipantsModalVisible]="true"
 *   [onParticipantsClose]="closeModalFunction"
 *   [onParticipantsFilterChange]="filterFunction"
 *   [participantsCounter]="5"
 *   [parameters]="participantsModalParameters"
 *   [position]="'topRight'"
 *   [backgroundColor]="'#83c0e9'"
 * ></app-participants-modal>
 * ```
 */
export declare class ParticipantsModal implements OnInit, OnChanges {
    private muteParticipantsService;
    private messageParticipantsService;
    private removeParticipantsService;
    isParticipantsModalVisible: boolean;
    onParticipantsClose: () => void;
    onParticipantsFilterChange: (filter: string) => void;
    participantsCounter: number;
    onMuteParticipants: (options: MuteParticipantsOptions) => Promise<void>;
    onMessageParticipants: (options: MessageParticipantsOptions) => void;
    onRemoveParticipants: (options: RemoveParticipantsOptions) => Promise<void>;
    parameters: ParticipantsModalParameters;
    position: string;
    backgroundColor: string;
    participant_s: Participant[];
    participantsCounter_s: number;
    reRender: boolean;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    constructor(muteParticipantsService: MuteParticipants, messageParticipantsService: MessageParticipants, removeParticipantsService: RemoveParticipants);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    updateParticipantsData(): void;
    handleFilterChange(event: Event): void;
    handleClose(): void;
    canShowParticipantList(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ParticipantsModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ParticipantsModal, "app-participants-modal", never, { "isParticipantsModalVisible": { "alias": "isParticipantsModalVisible"; "required": false; }; "onParticipantsClose": { "alias": "onParticipantsClose"; "required": false; }; "onParticipantsFilterChange": { "alias": "onParticipantsFilterChange"; "required": false; }; "participantsCounter": { "alias": "participantsCounter"; "required": false; }; "onMuteParticipants": { "alias": "onMuteParticipants"; "required": false; }; "onMessageParticipants": { "alias": "onMessageParticipants"; "required": false; }; "onRemoveParticipants": { "alias": "onRemoveParticipants"; "required": false; }; "parameters": { "alias": "parameters"; "required": false; }; "position": { "alias": "position"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; }, {}, never, never, true, never>;
}
