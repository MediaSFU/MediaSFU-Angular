import { Participant, Stream, ChangeVidsParameters, ChangeVidsType } from '../@types/types';
import * as i0 from "@angular/core";
export interface ReorderStreamsParameters extends ChangeVidsParameters {
    allVideoStreams: (Stream | Participant)[];
    participants: Participant[];
    oldAllStreams: (Stream | Participant)[];
    screenId?: string;
    adminVidID?: string;
    newLimitedStreams: (Stream | Participant)[];
    newLimitedStreamsIDs: string[];
    activeSounds: string[];
    screenShareIDStream?: string;
    screenShareNameStream?: string;
    adminIDStream?: string;
    adminNameStream?: string;
    updateNewLimitedStreams: (streams: (Stream | Participant)[]) => void;
    updateNewLimitedStreamsIDs: (ids: string[]) => void;
    updateActiveSounds: (sounds: string[]) => void;
    updateScreenShareIDStream: (id: string) => void;
    updateScreenShareNameStream: (name: string) => void;
    updateAdminIDStream: (id: string) => void;
    updateAdminNameStream: (name: string) => void;
    updateYouYouStream: (streams: (Stream | Participant)[]) => void;
    changeVids: ChangeVidsType;
    getUpdatedAllParams: () => ReorderStreamsParameters;
    [key: string]: any;
}
export interface ReorderStreamsOptions {
    add?: boolean;
    screenChanged?: boolean;
    parameters: ReorderStreamsParameters;
}
export type ReorderStreamsType = (options: ReorderStreamsOptions) => Promise<void>;
/**
 * Reorders the video streams based on the provided options and updates the UI accordingly.
 *
 * This method handles the logic for reordering streams in a video conferencing application,
 * managing the addition and arrangement of streams based on various conditions such as
 * participant roles, screen sharing status, and current streams.
 *
 * @param {ReorderStreamsOptions} options - The options for reordering streams.
 * @param {boolean} [options.add=false] - Whether to add new streams or not.
 * @param {boolean} [options.screenChanged=false] - Whether the screen has changed or not.
 * @param {ReorderStreamsParameters} options.parameters - The parameters required for reordering streams.
 * @param {Array<Stream | Participant>} options.parameters.allVideoStreams - Array of all video streams.
 * @param {Array<Participant>} options.parameters.participants - Array of participants.
 * @param {Array<Stream | Participant>} options.parameters.oldAllStreams - Array of old streams.
 * @param {string} [options.parameters.screenId] - ID of the screen.
 * @param {string} [options.parameters.adminVidID] - ID of the admin video.
 * @param {Array<Stream | Participant>} options.parameters.newLimitedStreams - Array of new limited streams.
 * @param {Array<string>} options.parameters.newLimitedStreamsIDs - Array of new limited stream IDs.
 * @param {Array<string>} options.parameters.activeSounds - Array of active sounds.
 * @param {string} [options.parameters.screenShareIDStream] - ID of the screen share stream.
 * @param {string} [options.parameters.screenShareNameStream] - Name of the screen share stream.
 * @param {string} [options.parameters.adminIDStream] - ID of the admin stream.
 * @param {string} [options.parameters.adminNameStream] - Name of the admin stream.
 * @param {Function} options.parameters.updateNewLimitedStreams - Function to update new limited streams.
 * @param {Function} options.parameters.updateNewLimitedStreamsIDs - Function to update new limited stream IDs.
 * @param {Function} options.parameters.updateActiveSounds - Function to update active sounds.
 * @param {Function} options.parameters.updateScreenShareIDStream - Function to update screen share ID stream.
 * @param {Function} options.parameters.updateScreenShareNameStream - Function to update screen share name stream.
 * @param {Function} options.parameters.updateAdminIDStream - Function to update admin ID stream.
 * @param {Function} options.parameters.updateAdminNameStream - Function to update admin name stream.
 * @param {Function} options.parameters.updateYouYouStream - Function to update YouYou stream.
 * @param {Function} options.parameters.changeVids - Function to reflect changes on the UI.
 *
 * @returns {Promise<void>} A promise that resolves when the reordering is complete.
 *
 * @throws Will throw an error if there is an issue during the reordering process.
 *
 * @example
 * ```typescript
 * await reorderStreams({
 *   add: true,
 *   screenChanged: false,
 *   parameters: {
 *     allVideoStreams: [...],
 *     participants: [...],
 *     oldAllStreams: [...],
 *     newLimitedStreams: [],
 *     newLimitedStreamsIDs: [],
 *     activeSounds: [],
 *     updateNewLimitedStreams: (streams) => { console.log(updated) },
 *     updateNewLimitedStreamsIDs: (ids) => { console.log(updated) },
 *     updateActiveSounds: (sounds) => { console.log(updated) },
 *     changeVids: async (options) => { },
 *     // ...other parameters
 *   },
 * });
 * ```
 */
export declare class ReorderStreams {
    /**
     * Reorders the video streams based on the provided options and updates the UI accordingly.
     *
     * @param {Object} options - The options for reordering streams.
     * @param {boolean} [options.add=false] - Whether to add new streams or not.
     * @param {boolean} [options.screenChanged=false] - Whether the screen has changed or not.
     * @param {ReorderStreamsOptions} options.parameters - The parameters required for reordering streams.
     *
     * @returns {Promise<void>} A promise that resolves when the reordering is complete.
     *
     * @typedef {Object} ReorderStreamsOptions
     * @property {Function} getUpdatedAllParams - Function to get updated parameters.
     * @property {Array} allVideoStreams - Array of all video streams.
     * @property {Array} participants - Array of participants.
     * @property {Array} oldAllStreams - Array of old streams.
     * @property {string} screenId - ID of the screen.
     * @property {string} adminVidID - ID of the admin video.
     * @property {Array} newLimitedStreams - Array of new limited streams.
     * @property {Array} newLimitedStreamsIDs - Array of new limited stream IDs.
     * @property {Array} activeSounds - Array of active sounds.
     * @property {string} screenShareIDStream - ID of the screen share stream.
     * @property {string} screenShareNameStream - Name of the screen share stream.
     * @property {string} adminIDStream - ID of the admin stream.
     * @property {string} adminNameStream - Name of the admin stream.
     * @property {Function} updateNewLimitedStreams - Function to update new limited streams.
     * @property {Function} updateNewLimitedStreamsIDs - Function to update new limited stream IDs.
     * @property {Function} updateActiveSounds - Function to update active sounds.
     * @property {Function} updateScreenShareIDStream - Function to update screen share ID stream.
     * @property {Function} updateScreenShareNameStream - Function to update screen share name stream.
     * @property {Function} updateAdminIDStream - Function to update admin ID stream.
     * @property {Function} updateAdminNameStream - Function to update admin name stream.
     * @property {Function} updateYouYouStream - Function to update YouYou stream.
     * @property {Function} changeVids - Function to reflect changes on the UI.
     */
    reorderStreams: ({ add, screenChanged, parameters, }: ReorderStreamsOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReorderStreams, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ReorderStreams>;
}
