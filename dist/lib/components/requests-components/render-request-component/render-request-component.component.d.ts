import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { RespondToRequestsType, RespondToRequestsOptions, Request } from '../../../@types/types';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface RenderRequestComponentOptions {
    request: Request;
    onRequestItemPress: RespondToRequestsType;
    requestList: Request[];
    updateRequestList: (newRequestList: Request[]) => void;
    roomName: string;
    socket: Socket;
}
export type RenderRequestComponentType = (options: RenderRequestComponentOptions) => HTMLElement;
/**
 * @component RenderRequestComponent
 * @description Component to render and manage individual requests in a list. Each request can be responded to with specified actions (e.g., approve, deny).
 *
 * @selector app-render-request-component
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule]
 * @templateUrl ./render-request-component.component.html
 * @styleUrls ./render-request-component.component.css
 *
 * @example
 * ```html
 * <app-render-request-component
 *   [request]="request"
 *   [requestList]="requestList"
 *   [roomName]="roomName"
 *   [socket]="socket"
 *   [onRequestItemPress]="handleRequestPress"
 *   [updateRequestList]="updateRequestList">
 * </app-render-request-component>
 * ```
 */
export declare class RenderRequestComponent {
    request: Request;
    requestList: Request[];
    roomName: string;
    socket: Socket;
    onRequestItemPress: (options: RespondToRequestsOptions) => void;
    updateRequestList: (newRequestList: Request[]) => void;
    faMicrophone: IconDefinition;
    faDesktop: IconDefinition;
    faVideo: IconDefinition;
    faComments: IconDefinition;
    faCheck: IconDefinition;
    faTimes: IconDefinition;
    keyMap: {
        [key: string]: IconDefinition;
    };
    getIcon(iconName: string): IconDefinition;
    handleRequestAction: (action: string) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RenderRequestComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RenderRequestComponent, "app-render-request-component", never, { "request": { "alias": "request"; "required": false; }; "requestList": { "alias": "requestList"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "socket": { "alias": "socket"; "required": false; }; "onRequestItemPress": { "alias": "onRequestItemPress"; "required": false; }; "updateRequestList": { "alias": "updateRequestList"; "required": false; }; }, {}, never, never, true, never>;
}
