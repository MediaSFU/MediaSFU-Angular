import { OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { RenderRequestComponentOptions } from '../render-request-component/render-request-component.component';
import { RespondToRequests, RespondToRequestsType } from '../../../methods/requests-methods/respond-to-requests.service';
import { Socket } from 'socket.io-client';
import { Request } from '../../../@types/types';
import * as i0 from "@angular/core";
export interface RequestsModalParameters {
    getUpdatedAllParams: () => {
        filteredRequestList: Request[];
    };
    [key: string]: any;
}
export interface RequestsModalOptions {
    isRequestsModalVisible: boolean;
    requestCounter: number;
    requestList: Request[];
    roomName: string;
    socket: Socket;
    backgroundColor: string;
    position: string;
    parameters: RequestsModalParameters;
    onRequestClose: () => void;
    onRequestFilterChange: (filter: string) => void;
    onRequestItemPress?: RespondToRequestsType;
    updateRequestList: (newRequestList: any[]) => void;
}
export type RequestsModalType = (options: RenderRequestComponentOptions) => HTMLElement;
/**
 * @component RequestsModal
 * @description A modal component to display and manage requests.
 *
 * @selector app-requests-modal
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule, RenderRequestComponent]
 * @templateUrl ./requests-modal.component.html
 * @styleUrls ./requests-modal.component.css
 *
 * @property {boolean} isRequestsModalVisible - Determines if the requests modal is visible.
 * @property {number} requestCounter - Counter for the number of requests.
 * @property {Request[]} requestList - List of requests.
 * @property {string} roomName - Name of the room.
 * @property {Socket} socket - Socket instance for communication.
 * @property {string} backgroundColor - Background color of the modal.
 * @property {string} position - Position of the modal.
 * @property {any} parameters - Additional parameters for the modal.
 * @property {Function} onRequestClose - Callback function when the modal is closed.
 * @property {Function} onRequestFilterChange - Callback function when the request filter changes.
 * @property {Function} onRequestItemPress - Callback function when a request item is pressed.
 * @property {Function} updateRequestList - Function to update the request list.
 *
 * @property {IconDefinition} faTimes - FontAwesome icon for closing the modal.
 * @property {any[]} requestList_s - Filtered list of requests.
 * @property {number} requestCounter_s - Counter for the filtered list of requests.
 * @property {boolean} reRender - Flag to trigger re-rendering.
 *
 * @constructor
 * @param {RespondToRequests} respondToRequestsService - Service to handle request responses.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @param {SimpleChanges} changes - Object of current and previous property values.
 *
 * @method updateRequests - Updates the request list and counter based on the current parameters.
 * @method handleModalClose - Handles the modal close action.
 * @method handleFilterChange - Handles the filter change event.
 * @param {Event} event - The filter change event.
 * @example
 * ```html
 * <app-requests-modal
 *   [isRequestsModalVisible]="isModalVisible"
 *   [requestCounter]="requestCounter"
 *   [requestList]="requests"
 *   [roomName]="roomName"
 *   [socket]="socket"
 *   [backgroundColor]="'#83c0e9'"
 *   [position]="'topRight'"
 *   [parameters]="requestParams"
 *   (onRequestClose)="handleModalClose()"
 *   (onRequestFilterChange)="handleFilterChange($event)"
 *   (onRequestItemPress)="handleRequestPress($event)"
 *   [updateRequestList]="updateRequestList">
 * </app-requests-modal>
 * ```
 */
export declare class RequestsModal implements OnInit, OnChanges {
    private respondToRequestsService;
    isRequestsModalVisible: boolean;
    requestCounter: number;
    requestList: Request[];
    roomName: string;
    socket: Socket;
    backgroundColor: string;
    position: string;
    parameters: any;
    onRequestClose: () => void;
    onRequestFilterChange: (filter: string) => void;
    onRequestItemPress: (params: any) => void;
    updateRequestList: (newRequestList: any[]) => void;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    requestList_s: any[];
    requestCounter_s: number;
    reRender: boolean;
    constructor(respondToRequestsService: RespondToRequests);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    updateRequests(): void;
    handleModalClose(): void;
    handleFilterChange(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RequestsModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RequestsModal, "app-requests-modal", never, { "isRequestsModalVisible": { "alias": "isRequestsModalVisible"; "required": false; }; "requestCounter": { "alias": "requestCounter"; "required": false; }; "requestList": { "alias": "requestList"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "socket": { "alias": "socket"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "position": { "alias": "position"; "required": false; }; "parameters": { "alias": "parameters"; "required": false; }; "onRequestClose": { "alias": "onRequestClose"; "required": false; }; "onRequestFilterChange": { "alias": "onRequestFilterChange"; "required": false; }; "onRequestItemPress": { "alias": "onRequestItemPress"; "required": false; }; "updateRequestList": { "alias": "updateRequestList"; "required": false; }; }, {}, never, never, true, never>;
}
