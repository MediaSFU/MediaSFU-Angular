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
/**
 * Service to handle banning a participant from the session.
 *
 * @class
 * @name BanParticipant
 * @description This service provides a method to remove a participant from active lists and update the session's participant array, followed by reordering the streams.
 *
 * @method
 * banParticipant
 * @async
 * @param {BanParticipantOptions} options - The options for banning a participant.
 * @param {string} options.name - The name of the participant to be banned.
 * @param {BanParticipantParameters} options.parameters - Parameters required for the banning operation.
 * @param {string[]} options.parameters.activeNames - Array of active participant names.
 * @param {string[]} options.parameters.dispActiveNames - Array of display participant names.
 * @param {Participant[]} options.parameters.participants - Array of current session participants.
 * @param {Function} options.parameters.updateParticipants - Function to update the participants array.
 * @param {Function} options.parameters.reorderStreams - Function to reorder the streams after removing the participant.
 *
 * @returns {Promise<void>} A promise that resolves when the participant has been banned and streams reordered.
 *
 * @example
 * ```typescript
 * const banParticipantService = new BanParticipant();
 * await banParticipantService.banParticipant({
 *   name: 'John Doe',
 *   parameters: {
 *     activeNames: ['John Doe', 'Jane Smith'],
 *     dispActiveNames: ['John Doe', 'Jane Smith'],
 *     participants: [{ name: 'John Doe', isBanned: false }, { name: 'Jane Smith', isBanned: false }],
 *     updateParticipants: (updated) => console.log(updated),
 *     reorderStreams: async () => { }
 *   }
 * });
 * ```
 */
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
