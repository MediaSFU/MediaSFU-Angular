import { Socket } from 'socket.io-client';
import { ResponseJoinLocalRoom, PreJoinPageParameters } from '../../@types/types';
import { JoinRoomOnMediaSFU, JoinRoomOnMediaSFUType } from '../../methods/utils/join-room-on-media-sfu.service';
import * as i0 from "@angular/core";
export interface JoinLocalRoomOptions {
    socket: Socket;
    roomName: string;
    islevel: string;
    member: string;
    sec: string;
    apiUserName: string;
    parameters: PreJoinPageParameters;
    checkConnect?: boolean;
    joinMediaSFURoom?: JoinRoomOnMediaSFUType;
    localLink?: string;
}
export type JoinLocalRoomType = (options: JoinLocalRoomOptions) => Promise<ResponseJoinLocalRoom>;
export interface CheckMediasfuURLOptions {
    data: ResponseJoinLocalRoom;
    member: string;
    roomName: string;
    islevel: string;
    socket: Socket;
    parameters: PreJoinPageParameters;
    joinMediaSFURoom?: JoinRoomOnMediaSFUType;
    localLink?: string;
}
export type CheckMediasfuURLType = (options: CheckMediasfuURLOptions) => Promise<void>;
export declare class JoinLocalRoom {
    private joinRoomOnMediaSFU;
    constructor(joinRoomOnMediaSFU: JoinRoomOnMediaSFU);
    checkMediasfuURL: CheckMediasfuURLType;
    joinLocalRoom: JoinLocalRoomType;
    static ɵfac: i0.ɵɵFactoryDeclaration<JoinLocalRoom, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<JoinLocalRoom>;
}
