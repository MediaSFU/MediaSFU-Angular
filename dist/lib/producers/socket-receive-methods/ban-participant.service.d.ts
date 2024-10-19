import { Participant, ReorderStreamsType, ReorderStreamsParameters } from '../../@types/types';
import * as i0 from "@angular/core";
export interface BanParticipantParameters extends ReorderStreamsParameters {
    activeNames: string[];
    dispActiveNames: string[];
    participants: Participant[];
    updateParticipants: (participants: Participant[]) => void;
    reorderStreams: ReorderStreamsType;
    [key: string]: any;
}
export interface BanParticipantOptions {
    name: string;
    parameters: BanParticipantParameters;
}
export type BanParticipantType = (options: BanParticipantOptions) => Promise<void>;
export declare class BanParticipant {
    /**
     * Bans a participant from the session by removing them from the active and display names arrays,
     * updating the participants list, and reordering the streams.
     *
     * @param {BanParticipantOptions} options - The options for banning a participant.
     * @param {string} options.name - The name of the participant to be banned.
     * @param {Object} options.parameters - The parameters required for banning the participant.
     * @param {string[]} options.parameters.activeNames - The array of active participant names.
     * @param {string[]} options.parameters.dispActiveNames - The array of display participant names.
     * @param {Object[]} options.parameters.participants - The array of participant objects.
     * @param {Function} options.parameters.updateParticipants - The function to update the participants array.
     * @param {Function} options.parameters.reorderStreams - The function to reorder the streams.
     *
     * @returns {Promise<void>} A promise that resolves when the participant has been banned and streams reordered.
     */
    banParticipant: ({ name, parameters }: BanParticipantOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BanParticipant, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BanParticipant>;
}
