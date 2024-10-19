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
