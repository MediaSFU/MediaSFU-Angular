import { WaitingRoomParticipant } from '../../@types/types';
import * as i0 from "@angular/core";
export type GenerateRandomWaitingRoomListType = () => WaitingRoomParticipant[];
export declare class GenerateRandomWaitingRoomList {
    /**
     * Generates a random list of participants for a waiting room.
     *
     * @param options - Configuration options for generating the waiting room list.
     * @returns An array of `WaitingRoomParticipant` objects, each with a random name, mute status, and unique ID.
     *
     * @example
     * const options = {};
     * const waitingRoomList = generateRandomWaitingRoomList(options);
     * console.log(waitingRoomList);
     */
    generateRandomWaitingRoomList(): WaitingRoomParticipant[];
    static ɵfac: i0.ɵɵFactoryDeclaration<GenerateRandomWaitingRoomList, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GenerateRandomWaitingRoomList>;
}
