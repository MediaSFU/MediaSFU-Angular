import { OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { ModifyCoHostSettings } from '../../../methods/co-host-methods/modify-co-host-settings.service';
import { Participant, CoHostResponsibility, ModifyCoHostSettingsOptions, ShowAlert } from '../../../@types/types';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface CoHostModalOptions {
    isCoHostModalVisible: boolean;
    currentCohost?: string;
    participants: Participant[];
    coHostResponsibility: CoHostResponsibility[];
    position?: string;
    backgroundColor?: string;
    roomName: string;
    showAlert?: ShowAlert;
    updateCoHostResponsibility: (coHostResponsibility: CoHostResponsibility[]) => void;
    updateCoHost: (coHost: string) => void;
    updateIsCoHostModalVisible: (isCoHostModalVisible: boolean) => void;
    socket: Socket;
    onCoHostClose: () => void;
    onModifyEventSettings?: (settings: ModifyCoHostSettingsOptions) => void;
}
export type CoHostModalType = (options: CoHostModalOptions) => HTMLElement;
export declare class CoHostModal implements OnChanges, OnInit {
    private modifyCoHostSettingsService;
    isCoHostModalVisible: boolean;
    currentCohost: string;
    participants: Participant[];
    coHostResponsibility: CoHostResponsibility[];
    position: string;
    backgroundColor: string;
    roomName: string;
    showAlert: ShowAlert;
    updateCoHostResponsibility: (coHostResponsibility: CoHostResponsibility[]) => void;
    updateCoHost: (coHost: string) => void;
    updateIsCoHostModalVisible: (isCoHostModalVisible: boolean) => void;
    socket: Socket;
    onCoHostClose: () => void;
    onModifyCoHost: (settings: ModifyCoHostSettingsOptions) => void;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    selectedCohost: string;
    CoHostResponsibilityCopy: any[];
    CoHostResponsibilityCopyAlt: any[];
    responsibilities: {
        [key: string]: boolean;
    };
    responsibilityKeys: {
        manageKey: string;
        dedicateKey: string;
    }[];
    modalWidth: number;
    constructor(modifyCoHostSettingsService: ModifyCoHostSettings);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    initializeResponsibilities(): void;
    get filteredParticipants(): Participant[];
    handleToggleSwitch(key: string): void;
    handleSave(): void;
    handleClose(): void;
    calculateModalWidth(): void;
    modalContainerStyle(): {
        display: string;
        position: string;
        top: string;
        left: string;
        width: string;
        height: string;
        backgroundColor: string;
        zIndex: string;
    };
    modalContentStyle(): {
        backgroundColor: string;
        borderRadius: string;
        padding: string;
        width: string;
        maxHeight: string;
        overflowX: string;
        overflowY: string;
        position: string;
        top: string;
        bottom: string;
        left: string;
        right: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<CoHostModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CoHostModal, "app-co-host-modal", never, { "isCoHostModalVisible": { "alias": "isCoHostModalVisible"; "required": false; }; "currentCohost": { "alias": "currentCohost"; "required": false; }; "participants": { "alias": "participants"; "required": false; }; "coHostResponsibility": { "alias": "coHostResponsibility"; "required": false; }; "position": { "alias": "position"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "showAlert": { "alias": "showAlert"; "required": false; }; "updateCoHostResponsibility": { "alias": "updateCoHostResponsibility"; "required": false; }; "updateCoHost": { "alias": "updateCoHost"; "required": false; }; "updateIsCoHostModalVisible": { "alias": "updateIsCoHostModalVisible"; "required": false; }; "socket": { "alias": "socket"; "required": false; }; "onCoHostClose": { "alias": "onCoHostClose"; "required": false; }; "onModifyCoHost": { "alias": "onModifyCoHost"; "required": false; }; }, {}, never, never, true, never>;
}
