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
 * Pagination component for managing and displaying page navigation controls with various layouts and customizations.
 *
 * @selector app-pagination
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule]
 *
 * @description
 * This component renders pagination controls, allowing users to navigate through pages. The controls support horizontal and vertical layouts, customizable styles, and dynamic page content handling, with special support for breakout room navigation.
 *
 * @example
 * ```html
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
 * ```
 *
 * @input {number} totalPages - Total number of pages available for navigation.
 * @input {number} currentUserPage - Current active page number.
 * @input {Function} handlePageChange - Callback function to handle page changes.
 * @input {'left' | 'middle' | 'right' | string} position - Horizontal position of the pagination controls (default is 'middle').
 * @input {'top' | 'middle' | 'bottom' | string} location - Vertical position of the pagination controls (default is 'middle').
 * @input {'horizontal' | 'vertical' | string} direction - Layout direction of the pagination controls (default is 'horizontal').
 * @input {any} buttonsContainerStyle - Custom CSS styles for the buttons container.
 * @input {any} activePageStyle - CSS styles for the active page button.
 * @input {any} inactivePageStyle - CSS styles for inactive page buttons.
 * @input {string} backgroundColor - Background color for the pagination controls.
 * @input {number} paginationHeight - Height of the pagination controls in pixels.
 * @input {boolean} showAspect - Flag to display or hide the pagination controls.
 * @input {PaginationParameters} parameters - Additional configuration parameters for managing breakout rooms and related state.
 *
 * @property {number[]} data - Array representing pages to be displayed in pagination controls.
 * @property {ComponentSizes} componentSizes - Stores calculated sizes for pagination controls.
 *
 * @method ngOnInit - Lifecycle hook that initializes the component and sets up page data.
 * @method ngOnChanges - Handles input property changes to update page data when needed.
 * @method handleClick - Asynchronously handles page button clicks and manages breakout room navigation logic.
 * @method getPageStyle - Returns specific styles for a page button based on its active or inactive state.
 * @method isBreakoutRoom - Checks if a page represents a breakout room.
 * @method getDisplayItem - Returns the display label for a page, accounting for breakout room naming conventions.
 *
 * @dependencies
 * This component requires an external pagination parameters configuration (`PaginationParameters`) and access to the `GeneratePageContent` service for managing dynamic content loading.
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
