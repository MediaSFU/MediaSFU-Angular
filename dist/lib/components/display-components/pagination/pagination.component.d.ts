import { OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { GeneratePageContent, GeneratePageContentParameters } from '../../../consumers/generate-page-content.service';
import { Socket } from 'socket.io-client';
import { BreakoutParticipant, ComponentSizes, ShowAlert } from '../../../@types/types';
import * as i0 from "@angular/core";
export interface PaginationParameters extends GeneratePageContentParameters {
    mainRoomsLength: number;
    memberRoom: number;
    breakOutRoomStarted: boolean;
    breakOutRoomEnded: boolean;
    member: string;
    breakoutRooms: BreakoutParticipant[][];
    hostNewRoom: number;
    roomName: string;
    islevel: string;
    showAlert?: ShowAlert;
    socket: Socket;
    getUpdatedAllParams: () => PaginationParameters;
    [key: string]: any;
}
export interface PaginationOptions {
    totalPages: number;
    currentUserPage: number;
    handlePageChange: (options: any) => Promise<void>;
    position: 'left' | 'middle' | 'right' | string;
    location: 'top' | 'middle' | 'bottom' | string;
    direction: 'horizontal' | 'vertical';
    buttonsContainerStyle: any;
    activePageStyle: any;
    inactivePageStyle: any;
    backgroundColor: string;
    paginationHeight: number;
    showAspect?: boolean;
    parameters: PaginationParameters;
}
export type PaginationType = (options: PaginationOptions) => HTMLElement;
/**
 * Pagination component for displaying and handling pagination controls.
 *
 * @component
 * @selector app-pagination
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule]
 *
 * @description
 * This component renders pagination controls with customizable styles and behavior.
 * It supports horizontal and vertical layouts, different positions, and dynamic data.
 *
 * @example
 * <app-pagination
 *   [totalPages]="10"
 *   [currentUserPage]="1"
 *   [handlePageChange]="handlePageChange"
 *   [position]="'middle'"
 *   [location]="'bottom'"
 *   [direction]="'horizontal'"
 *   [backgroundColor]="'#ffffff'"
 *   [paginationHeight]="40"
 *   [showAspect]="true"
 *   [parameters]="paginationParameters">
 * </app-pagination>
 *
 * @input {number} totalPages - Total number of pages.
 * @input {number} currentUserPage - Current active page.
 * @input {Function} handlePageChange - Function to handle page change.
 * @input {'left' | 'middle' | 'right' | string} position - Position of the pagination controls.
 * @input {'top' | 'middle' | 'bottom' | string} location - Location of the pagination controls.
 * @input {'horizontal' | 'vertical' | string} direction - Direction of the pagination controls.
 * @input {any} buttonsContainerStyle - Custom styles for the buttons container.
 * @input {any} activePageStyle - Custom styles for the active page button.
 * @input {any} inactivePageStyle - Custom styles for the inactive page buttons.
 * @input {string} backgroundColor - Background color of the pagination controls.
 * @input {number} paginationHeight - Height of the pagination controls.
 * @input {boolean} showAspect - Flag to show or hide the pagination controls.
 * @input {PaginationParameters} parameters - Additional parameters for pagination.
 *
 * @method ngOnInit - Initializes the component and sets up initial data.
 * @method ngOnChanges - Handles changes to input properties and updates data accordingly.
 * @method handleClick - Handles click events on pagination buttons and performs necessary actions.
 * @method getPageStyle - Returns the style for a given page button based on its state.
 * @method isBreakoutRoom - Determines if a given item represents a breakout room.
 * @method getDisplayItem - Returns the display text for a given item.
 */
export declare class Pagination implements OnInit, OnChanges {
    private generatePageContentService;
    totalPages: number;
    currentUserPage: number;
    handlePageChange: (options: any) => Promise<void>;
    position: 'left' | 'middle' | 'right' | string;
    location: 'top' | 'middle' | 'bottom' | string;
    direction: 'horizontal' | 'vertical';
    buttonsContainerStyle: any;
    activePageStyle: any;
    inactivePageStyle: any;
    backgroundColor: string;
    paginationHeight: number;
    showAspect: boolean;
    parameters: PaginationParameters;
    constructor(generatePageContentService: GeneratePageContent);
    faStar: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faLock: import("@fortawesome/fontawesome-common-types").IconDefinition;
    data: number[];
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    handleClick: (page: number) => Promise<void>;
    componentSizes: ComponentSizes;
    getPageStyle(item: number): any;
    isBreakoutRoom: (item: number) => boolean;
    getDisplayItem(item: number): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<Pagination, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Pagination, "app-pagination", never, { "totalPages": { "alias": "totalPages"; "required": false; }; "currentUserPage": { "alias": "currentUserPage"; "required": false; }; "handlePageChange": { "alias": "handlePageChange"; "required": false; }; "position": { "alias": "position"; "required": false; }; "location": { "alias": "location"; "required": false; }; "direction": { "alias": "direction"; "required": false; }; "buttonsContainerStyle": { "alias": "buttonsContainerStyle"; "required": false; }; "activePageStyle": { "alias": "activePageStyle"; "required": false; }; "inactivePageStyle": { "alias": "inactivePageStyle"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "paginationHeight": { "alias": "paginationHeight"; "required": false; }; "showAspect": { "alias": "showAspect"; "required": false; }; "parameters": { "alias": "parameters"; "required": false; }; }, {}, never, never, true, never>;
}
