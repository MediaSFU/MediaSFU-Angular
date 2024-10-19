import { OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { WaitingRoomParticipant } from '../../@types/types';
import { RespondToWaiting, RespondToWaitingOptions, RespondToWaitingType } from '../../methods/waiting-methods/respond-to-waiting.service';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface WaitingRoomModalParameters {
    filteredWaitingRoomList: WaitingRoomParticipant[];
    getUpdatedAllParams: () => WaitingRoomModalParameters;
    [key: string]: any;
}
export interface WaitingRoomModalOptions {
    isWaitingModalVisible: boolean;
    onWaitingRoomClose: () => void;
    waitingRoomCounter: number;
    onWaitingRoomFilterChange: (filter: string) => void;
    waitingRoomList: WaitingRoomParticipant[];
    updateWaitingList: (updatedList: WaitingRoomParticipant[]) => void;
    roomName: string;
    socket: Socket;
    position?: string;
    backgroundColor?: string;
    parameters: WaitingRoomModalParameters;
    onWaitingRoomItemPress?: RespondToWaitingType;
}
export type WaitingRoomModalType = (options: WaitingRoomModalOptions) => HTMLElement;
export declare class WaitingRoomModal implements OnChanges, OnInit {
    private respondToWaitingService;
    constructor(respondToWaitingService: RespondToWaiting);
    isWaitingModalVisible: boolean;
    waitingRoomCounter: number;
    waitingRoomList: WaitingRoomParticipant[];
    roomName: string;
    socket: Socket;
    position: string;
    backgroundColor: string;
    parameters: WaitingRoomModalParameters;
    onWaitingRoomClose: () => void;
    onWaitingRoomFilterChange: (value: string) => void;
    updateWaitingList: (data: WaitingRoomParticipant[]) => void;
    onWaitingRoomItemPress: (data: RespondToWaitingOptions) => void;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faCheck: import("@fortawesome/fontawesome-common-types").IconDefinition;
    waitingRoomList_s: WaitingRoomParticipant[];
    waitingRoomCounter_s: number;
    reRender: boolean;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    updateParameters(): void;
    handleModalClose(): void;
    handleFilterChange(event: Event): void;
    handleItemPress(participant: WaitingRoomParticipant, type: boolean): void;
    get modalContainerStyle(): {
        position: string;
        top: string;
        left: string;
        width: string;
        height: string;
        backgroundColor: string;
        display: string;
        zIndex: string;
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
    get inputStyle(): {
        width: string;
        padding: string;
        borderRadius: string;
        border: string;
        fontSize: string;
        marginBottom: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<WaitingRoomModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WaitingRoomModal, "app-waiting-room-modal", never, { "isWaitingModalVisible": { "alias": "isWaitingModalVisible"; "required": false; }; "waitingRoomCounter": { "alias": "waitingRoomCounter"; "required": false; }; "waitingRoomList": { "alias": "waitingRoomList"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "socket": { "alias": "socket"; "required": false; }; "position": { "alias": "position"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "parameters": { "alias": "parameters"; "required": false; }; "onWaitingRoomClose": { "alias": "onWaitingRoomClose"; "required": false; }; "onWaitingRoomFilterChange": { "alias": "onWaitingRoomFilterChange"; "required": false; }; "updateWaitingList": { "alias": "updateWaitingList"; "required": false; }; "onWaitingRoomItemPress": { "alias": "onWaitingRoomItemPress"; "required": false; }; }, {}, never, never, true, never>;
}
