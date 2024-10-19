import { Participant, Stream, OnScreenChangesType, ReorderStreamsType, ChangeVidsType, OnScreenChangesParameters, ReorderStreamsParameters, ChangeVidsParameters, EventType } from '../@types/types';
import * as i0 from "@angular/core";
export interface ReUpdateInterParameters extends OnScreenChangesParameters, ReorderStreamsParameters, ChangeVidsParameters {
    screenPageLimit: number;
    itemPageLimit: number;
    reorderInterval: number;
    fastReorderInterval: number;
    eventType: EventType;
    participants: Participant[];
    allVideoStreams: (Participant | Stream)[];
    shared: boolean;
    shareScreenStarted: boolean;
    adminNameStream?: string;
    screenShareNameStream?: string;
    updateMainWindow: boolean;
    sortAudioLoudness: boolean;
    lastReorderTime: number;
    newLimitedStreams: (Participant | Stream)[];
    newLimitedStreamsIDs: string[];
    oldSoundIds: string[];
    updateUpdateMainWindow: (value: boolean) => void;
    updateSortAudioLoudness: (value: boolean) => void;
    updateLastReorderTime: (value: number) => void;
    updateNewLimitedStreams: (streams: (Participant | Stream)[]) => void;
    updateNewLimitedStreamsIDs: (ids: string[]) => void;
    updateOldSoundIds: (ids: string[]) => void;
    onScreenChanges: OnScreenChangesType;
    reorderStreams: ReorderStreamsType;
    changeVids: ChangeVidsType;
    getUpdatedAllParams: () => ReUpdateInterParameters;
    [key: string]: any;
}
export interface ReUpdateInterOptions {
    name: string;
    add?: boolean;
    force?: boolean;
    average?: number;
    parameters: ReUpdateInterParameters;
}
export type ReUpdateInterType = (options: ReUpdateInterOptions) => Promise<void>;
export declare class ReUpdateInter {
    /**
     * Updates the interaction state based on the provided options and parameters.
     *
     * @param {ReUpdateInterOptions} options - The options for updating the interaction.
     * @param {string} options.name - The name of the participant.
     * @param {boolean} [options.add=false] - Whether to add the participant to the interaction.
     * @param {boolean} [options.force=false] - Whether to force the update.
     * @param {number} [options.average=127] - The average value used for determining reorder intervals.
     * @param {Object} options.parameters - The parameters for updating the interaction.
     * @param {number} options.parameters.screenPageLimit - The screen page limit.
     * @param {number} options.parameters.itemPageLimit - The item page limit.
     * @param {number} options.parameters.reorderInterval - The reorder interval.
     * @param {number} options.parameters.fastReorderInterval - The fast reorder interval.
     * @param {string} options.parameters.eventType - The type of event.
     * @param {Array} options.parameters.participants - The list of participants.
     * @param {Array} options.parameters.allVideoStreams - The list of all video streams.
     * @param {boolean} options.parameters.shared - Whether the screen is shared.
     * @param {boolean} options.parameters.shareScreenStarted - Whether screen sharing has started.
     * @param {string} options.parameters.adminNameStream - The admin name stream.
     * @param {string} options.parameters.screenShareNameStream - The screen share name stream.
     * @param {boolean} options.parameters.updateMainWindow - Whether to update the main window.
     * @param {boolean} options.parameters.sortAudioLoudness - Whether to sort audio by loudness.
     * @param {number} options.parameters.lastReorderTime - The last reorder time.
     * @param {Array} options.parameters.newLimitedStreams - The list of new limited streams.
     * @param {Array} options.parameters.newLimitedStreamsIDs - The list of new limited stream IDs.
     * @param {Array} options.parameters.oldSoundIds - The list of old sound IDs.
     * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window.
     * @param {Function} options.parameters.updateSortAudioLoudness - Function to update the audio loudness sorting.
     * @param {Function} options.parameters.updateLastReorderTime - Function to update the last reorder time.
     * @param {Function} options.parameters.updateNewLimitedStreams - Function to update the new limited streams.
     * @param {Function} options.parameters.updateNewLimitedStreamsIDs - Function to update the new limited stream IDs.
     * @param {Function} options.parameters.updateOldSoundIds - Function to update the old sound IDs.
     * @param {Function} options.parameters.onScreenChanges - Function to handle screen changes.
     * @param {Function} options.parameters.reorderStreams - Function to reorder streams.
     * @param {Function} options.parameters.changeVids - Function to change videos.
     *
     * @returns {Promise<void>} A promise that resolves when the interaction update is complete.
     */
    reUpdateInter: ({ name, add, force, average, parameters, }: ReUpdateInterOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReUpdateInter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ReUpdateInter>;
}
