import { Participant, PrepopulateUserMediaType, ReorderStreamsType, ReUpdateInterParameters, ReUpdateInterType, ReorderStreamsParameters, PrepopulateUserMediaParameters } from '../../@types/types';
import * as i0 from "@angular/core";
export interface ProducerMediaPausedParameters extends PrepopulateUserMediaParameters, ReorderStreamsParameters, ReUpdateInterParameters {
    activeSounds: string[];
    meetingDisplayType: string;
    meetingVideoOptimized: boolean;
    participants: Participant[];
    oldSoundIds: string[];
    shared: boolean;
    shareScreenStarted: boolean;
    updateMainWindow: boolean;
    hostLabel: string;
    islevel: string;
    updateActiveSounds: (activeSounds: string[]) => void;
    updateUpdateMainWindow: (updateMainWindow: boolean) => void;
    reorderStreams: ReorderStreamsType;
    prepopulateUserMedia: PrepopulateUserMediaType;
    reUpdateInter: ReUpdateInterType;
    getUpdatedAllParams: () => ProducerMediaPausedParameters;
    [key: string]: any;
}
export interface ProducerMediaPausedOptions {
    producerId: string;
    kind: 'audio' | 'video' | 'screenshare' | 'screen';
    name: string;
    parameters: ProducerMediaPausedParameters;
}
export type ProducerMediaPausedType = (options: ProducerMediaPausedOptions) => Promise<void>;
/**
 * Service to handle the paused state of media for a producer.
 *
 * @class
 * @name ProducerMediaPaused
 * @description
 * Handles the actions required when media is paused for a specified producer, including UI updates, participant state handling, and managing meeting display optimizations.
 *
 * @method
 * producerMediaPaused
 *
 * @param {ProducerMediaPausedOptions} options - Options to specify the producer and event details:
 *   - `producerId` {string}: The ID of the paused producer.
 *   - `kind` {string}: The type of media paused (e.g., "audio", "video").
 *   - `name` {string}: Name of the producer whose media is paused.
 *   - `parameters` {ProducerMediaPausedParameters}: Configuration and state parameters for the meeting.
 *      - `activeSounds` {string[]}: Active audio streams currently displayed.
 *      - `meetingDisplayType` {string}: Current meeting layout type (e.g., "media", "video").
 *      - `meetingVideoOptimized` {boolean}: Indicates if video is optimized.
 *      - `participants` {Participant[]}: List of all meeting participants.
 *      - `oldSoundIds` {string[]}: List of previously active audio stream IDs.
 *      - `shared` {boolean}: Indicates if the screen is currently shared.
 *      - `shareScreenStarted` {boolean}: Indicates if screen sharing has started.
 *      - `updateMainWindow` {boolean}: Specifies if the main display window should update.
 *      - `hostLabel` {string}: The label representing the host participant.
 *      - `islevel` {string}: The access level of the participant.
 *      - `updateActiveSounds` {Function}: Updates the list of active audio streams.
 *      - `updateUpdateMainWindow` {Function}: Updates the status of the main display window.
 *      - `reorderStreams` {Function}: Reorders media streams for optimized display.
 *      - `prepopulateUserMedia` {Function}: Preloads user media based on display needs.
 *      - `reUpdateInter` {Function}: Refreshes participant interactions on the UI.
 *
 * @returns {Promise<void>} Resolves when media pause handling is complete.
 *
 * @example
 * const options = {
 *   producerId: '12345',
 *   kind: 'audio',
 *   name: 'Participant A',
 *   parameters: {
 *     activeSounds: ['Participant B'],
 *     meetingDisplayType: 'video',
 *     meetingVideoOptimized: false,
 *     participants: [...],
 *     oldSoundIds: ['Participant A'],
 *     shared: false,
 *     shareScreenStarted: false,
 *     updateMainWindow: true,
 *     hostLabel: 'Host',
 *     islevel: '1',
 *     updateActiveSounds: (sounds) => { ... },
 *     updateUpdateMainWindow: (status) => { ... },
 *     reorderStreams: ({ add, screenChanged, parameters }) => { ... },
 *     prepopulateUserMedia: ({ name, parameters }) => { ... },
 *     reUpdateInter: ({ name, add, force, parameters }) => { ... }
 *   }
 * };
 *
 * producerMediaPausedService.producerMediaPaused(options)
 *   .then(() => console.log('Media pause handled'))
 *   .catch(error => console.error('Error:', error));
 */
export declare class ProducerMediaPaused {
    /**
     * Handles the event when media is paused for a producer.
     *
     * @param {ProducerMediaPausedOptions} options - The options for the producer media paused event.
     * @param {string} options.producerId - The ID of the producer.
     * @param {string} options.kind - The kind of media (e.g., "audio", "video").
     * @param {string} options.name - The name of the producer.
     * @param {Parameters} options.parameters - The parameters for the event.
     *
     * @returns {Promise<void>} A promise that resolves when the media paused handling is complete.
     *
     * @description
     * This function handles the event when media is paused for a producer. It performs the following tasks:
     * - Updates the parameters.
     * - Iterates through participants and updates the UI based on their muted status and other conditions.
     * - Handles meeting display type and optimizes the UI accordingly.
     * - Manages audio media by updating the relevant participant's state.
     */
    producerMediaPaused: ({ producerId, kind, name, parameters, }: ProducerMediaPausedOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProducerMediaPaused, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProducerMediaPaused>;
}
