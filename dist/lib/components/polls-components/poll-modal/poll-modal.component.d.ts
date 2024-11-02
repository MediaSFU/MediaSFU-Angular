import { OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Socket } from 'socket.io-client';
import { Poll, ShowAlert, HandleCreatePollType, HandleEndPollType, HandleVotePollType } from '../../../@types/types';
import * as i0 from "@angular/core";
export interface PollModalOptions {
    isPollModalVisible: boolean;
    onClose: () => void;
    position?: string;
    backgroundColor?: string;
    member: string;
    islevel: string;
    polls: Poll[];
    poll: Poll | null;
    socket: Socket;
    roomName: string;
    showAlert?: ShowAlert;
    updateIsPollModalVisible: (isVisible: boolean) => void;
    handleCreatePoll: HandleCreatePollType;
    handleEndPoll: HandleEndPollType;
    handleVotePoll: HandleVotePollType;
}
export type PollModalType = (options: PollModalOptions) => HTMLElement;
/**
 * Component for displaying a poll modal, allowing users to create, vote, and end polls within a session.
 *
 * @component
 * @selector app-poll-modal
 * @standalone true
 * @templateUrl ./poll-modal.component.html
 * @styleUrls ['./poll-modal.component.css']
 * @imports [CommonModule, FontAwesomeModule, FormsModule]
 *
 * @example
 * ```html
 * <app-poll-modal
 *   [isPollModalVisible]="true"
 *   [onClose]="closeModalFunction"
 *   [member]="currentMember"
 *   [islevel]="'2'"
 *   [polls]="pollList"
 *   [poll]="selectedPoll"
 *   [socket]="socketInstance"
 *   [roomName]="'exampleRoom'"
 *   [handleCreatePoll]="createPollFunction"
 *   [handleEndPoll]="endPollFunction"
 *   [handleVotePoll]="votePollFunction"
 * ></app-poll-modal>
 * ```
 */
export declare class PollModal implements OnInit, OnChanges {
    isPollModalVisible: boolean;
    onClose: () => void;
    position: string;
    backgroundColor: string;
    member: string;
    islevel: string;
    polls: Poll[];
    poll: Poll | null;
    socket: Socket;
    roomName: string;
    showAlert: ShowAlert;
    updateIsPollModalVisible: (isVisible: boolean) => void;
    handleCreatePoll: HandleCreatePollType;
    handleEndPoll: HandleEndPollType;
    handleVotePoll: HandleVotePollType;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    newPoll: any;
    screenWidth: number;
    modalWidth: number;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    renderPolls: () => void;
    calculatePercentage(votes: number[], optionIndex: number): number;
    handlePollTypeChange(event: any): void;
    validateAndCreatePoll(): Promise<void>;
    handledVotePoll(pollId: string, optionIndex: number): void;
    handledEndPoll(pollId: string): void;
    get modalContainerStyle(): {
        position: string;
        top: number;
        left: number;
        width: string;
        height: string;
        backgroundColor: string;
        display: string;
        zIndex: number;
    };
    get modalContentStyle(): {
        position: string;
        backgroundColor: string;
        borderRadius: string;
        padding: string;
        width: string;
        maxHeight: string;
        overflowY: string;
        top: string;
        bottom: string;
        left: string;
        right: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<PollModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PollModal, "app-poll-modal", never, { "isPollModalVisible": { "alias": "isPollModalVisible"; "required": false; }; "onClose": { "alias": "onClose"; "required": false; }; "position": { "alias": "position"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "member": { "alias": "member"; "required": false; }; "islevel": { "alias": "islevel"; "required": false; }; "polls": { "alias": "polls"; "required": false; }; "poll": { "alias": "poll"; "required": false; }; "socket": { "alias": "socket"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "showAlert": { "alias": "showAlert"; "required": false; }; "updateIsPollModalVisible": { "alias": "updateIsPollModalVisible"; "required": false; }; "handleCreatePoll": { "alias": "handleCreatePoll"; "required": false; }; "handleEndPoll": { "alias": "handleEndPoll"; "required": false; }; "handleVotePoll": { "alias": "handleVotePoll"; "required": false; }; }, {}, never, never, true, never>;
}
