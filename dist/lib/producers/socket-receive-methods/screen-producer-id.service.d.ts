import { Participant } from '../../@types/types';
import * as i0 from "@angular/core";
export interface ScreenProducerIdOptions {
    producerId: string;
    screenId: string;
    membersReceived: boolean;
    shareScreenStarted: boolean;
    deferScreenReceived: boolean;
    participants: Participant[];
    updateScreenId: (id: string) => void;
    updateShareScreenStarted: (started: boolean) => void;
    updateDeferScreenReceived: (received: boolean) => void;
}
export type ScreenProducerIdType = (options: ScreenProducerIdOptions) => void;
/**
 * Service to manage screen producer ID and screen sharing status for participants.
 *
 * @class
 * @name ScreenProducerId
 * @description This service processes and updates the screen producer ID, manages screen sharing states, and defers screen updates as needed based on participant data.
 *
 * @method
 * screenProducerId
 *
 * @param {ScreenProducerIdOptions} options - Options for handling screen producer ID:
 *   - `producerId` {string}: The ID of the screen producer.
 *   - `screenId` {string}: The current screen ID.
 *   - `membersReceived` {boolean}: Indicates if members data has been received.
 *   - `shareScreenStarted` {boolean}: Indicates if screen sharing has started.
 *   - `deferScreenReceived` {boolean}: Indicates if screen sharing should be deferred.
 *   - `participants` {Participant[]}: The list of current participants.
 *   - `updateScreenId` {Function}: Function to update the screen ID.
 *   - `updateShareScreenStarted` {Function}: Function to update the screen sharing status.
 *   - `updateDeferScreenReceived` {Function}: Function to update the deferred screen status.
 *
 * @returns {void} Updates states directly through provided functions.
 *
 * @example
 * const options = {
 *   producerId: 'abc123',
 *   screenId: 'screen45',
 *   membersReceived: true,
 *   shareScreenStarted: false,
 *   deferScreenReceived: false,
 *   participants: [
 *     { id: 'p1', ScreenID: 'screen45', ScreenOn: true },
 *     // Additional participants
 *   ],
 *   updateScreenId: (id) => console.log(`Screen ID updated to: ${id}`),
 *   updateShareScreenStarted: (started) => console.log(`Screen sharing started: ${started}`),
 *   updateDeferScreenReceived: (received) => console.log(`Screen sharing deferred: ${received}`)
 * };
 *
 * screenProducerIdService.screenProducerId(options);
 */
export declare class ScreenProducerId {
    /**
     * Handles the screen producer id.
     *
     * @param producerId - The id of the producer.
     * @param screenId - The id of the screen.
     * @param membersReceived - Whether the members data has been received.
     * @param shareScreenStarted - Whether the screen sharing has started.
     * @param deferScreenReceived - Whether the screen sharing has been deferred.
     * @param participants - The list of participants.
     * @param updateScreenId - Function to update the screen id.
     * @param updateShareScreenStarted - Function to update the screen sharing status.
     * @param updateDeferScreenReceived - Function to update the screen sharing defer status.
     */
    screenProducerId: ({ producerId, screenId, membersReceived, shareScreenStarted, deferScreenReceived, participants, updateScreenId, updateShareScreenStarted, updateDeferScreenReceived, }: ScreenProducerIdOptions) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScreenProducerId, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ScreenProducerId>;
}
