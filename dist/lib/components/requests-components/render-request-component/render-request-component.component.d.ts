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
