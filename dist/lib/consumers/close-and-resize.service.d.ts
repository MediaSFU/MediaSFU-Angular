import { Stream, Participant, ReorderStreamsType, ReorderStreamsParameters, PrepopulateUserMediaParameters, PrepopulateUserMediaType, GetVideosType, RePortType, RePortParameters, EventType } from '../@types/types';
import * as i0 from "@angular/core";
export interface CloseAndResizeParameters extends ReorderStreamsParameters, PrepopulateUserMediaParameters, RePortParameters {
    allAudioStreams: (Stream | Participant)[];
    allVideoStreams: (Stream | Participant)[];
    activeNames: string[];
    participants: Participant[];
    streamNames: Stream[];
    recordingDisplayType: 'video' | 'media' | 'all';
    recordingVideoOptimized: boolean;
    adminIDStream?: string;
    newLimitedStreams: (Stream | Participant)[];
    newLimitedStreamsIDs: string[];
    oldAllStreams: (Stream | Participant)[];
    shareScreenStarted: boolean;
    shared: boolean;
    meetingDisplayType: string;
    defer_receive: boolean;
    lock_screen: boolean;
    firstAll: boolean;
    first_round: boolean;
    gotAllVids: boolean;
    eventType: EventType;
    hostLabel: string;
    shareEnded: boolean;
    updateMainWindow: boolean;
    updateActiveNames: (activeNames: string[]) => void;
    updateAllAudioStreams: (allAudioStreams: (Stream | Participant)[]) => void;
    updateShareScreenStarted: (shareScreenStarted: boolean) => void;
    updateUpdateMainWindow: (updateMainWindow: boolean) => void;
    updateNewLimitedStreams: (newLimitedStreams: (Stream | Participant)[]) => void;
    updateOldAllStreams: (oldAllStreams: (Stream | Participant)[]) => void;
    updateDefer_receive: (defer_receive: boolean) => void;
    updateMainHeightWidth: (heightWidth: number) => void;
    updateShareEnded: (shareEnded: boolean) => void;
    updateLock_screen: (lock_screen: boolean) => void;
    updateFirstAll: (firstAll: boolean) => void;
    updateFirst_round: (first_round: boolean) => void;
    reorderStreams: ReorderStreamsType;
    prepopulateUserMedia: PrepopulateUserMediaType;
    getVideos: GetVideosType;
    rePort: RePortType;
    getUpdatedAllParams: () => CloseAndResizeParameters;
    [key: string]: any;
}
export interface CloseAndResizeOptions {
    producerId: string;
    kind: string;
    parameters: CloseAndResizeParameters;
}
export type CloseAndResizeType = (options: CloseAndResizeOptions) => Promise<void>;
/**
 * Closes and resizes the video and audio elements based on the provided options.
 *
 * @param {CloseAndResizeOptions} options - The options for closing and resizing.
 * @param {string} options.producerId - The ID of the producer.
 * @param {string} options.kind - The kind of media (audio, video, screenshare, or screen).
 * @param {object} options.parameters - The parameters for the operation.
 * @param {function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
 * @param {Array} options.parameters.allAudioStreams - Array of all audio streams.
 * @param {Array} options.parameters.allVideoStreams - Array of all video streams.
 * @param {Array} options.parameters.activeNames - Array of active participant names.
 * @param {Array} options.parameters.participants - Array of participants.
 * @param {Array} options.parameters.streamNames - Array of stream names.
 * @param {string} options.parameters.recordingDisplayType - Type of recording display.
 * @param {boolean} options.parameters.recordingVideoOptimized - Whether recording is video optimized.
 * @param {string} options.parameters.adminIDStream - ID of the admin stream.
 * @param {Array} options.parameters.newLimitedStreams - Array of new limited streams.
 * @param {Array} options.parameters.newLimitedStreamsIDs - Array of new limited stream IDs.
 * @param {Array} options.parameters.oldAllStreams - Array of old all streams.
 * @param {boolean} options.parameters.shareScreenStarted - Whether screen sharing has started.
 * @param {boolean} options.parameters.shared - Whether sharing is active.
 * @param {string} options.parameters.meetingDisplayType - Type of meeting display.
 * @param {boolean} options.parameters.defer_receive - Whether to defer receiving.
 * @param {boolean} options.parameters.lock_screen - Whether the screen is locked.
 * @param {boolean} options.parameters.firstAll - Whether it is the first all.
 * @param {boolean} options.parameters.first_round - Whether it is the first round.
 * @param {boolean} options.parameters.gotAllVids - Whether all videos are received.
 * @param {string} options.parameters.eventType - Type of event.
 * @param {string} options.parameters.hostLabel - Label of the host.
 * @param {boolean} options.parameters.shareEnded - Whether sharing has ended.
 * @param {boolean} options.parameters.updateMainWindow - Whether to update the main window.
 * @param {function} options.parameters.updateActiveNames - Function to update active names.
 * @param {function} options.parameters.updateAllAudioStreams - Function to update all audio streams.
 * @param {function} options.parameters.updateAllVideoStreams - Function to update all video streams.
 * @param {function} options.parameters.updateShareScreenStarted - Function to update share screen started status.
 * @param {function} options.parameters.updateUpdateMainWindow - Function to update main window status.
 * @param {function} options.parameters.updateNewLimitedStreams - Function to update new limited streams.
 * @param {function} options.parameters.updateOldAllStreams - Function to update old all streams.
 * @param {function} options.parameters.updateDefer_receive - Function to update defer receive status.
 * @param {function} options.parameters.updateMainHeightWidth - Function to update main height and width.
 * @param {function} options.parameters.updateShareEnded - Function to update share ended status.
 * @param {function} options.parameters.updateLock_screen - Function to update lock screen status.
 * @param {function} options.parameters.updateFirstAll - Function to update first all status.
 * @param {function} options.parameters.updateFirst_round - Function to update first round status.
 * @param {function} options.parameters.reorderStreams - Function to reorder streams.
 * @param {function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
 * @param {function} options.parameters.getVideos - Function to get videos.
 * @param {function} options.parameters.rePort - Function to report.
 *
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 *
 * @example
 * const options = {
 *   producerId: '12345',
 *   kind: 'video',
 *   parameters: {
 *     getUpdatedAllParams: () => { /* Logic to get updated parameters *\/ },
 *     allAudioStreams: [],
 *     allVideoStreams: [],
 *     activeNames: ['Participant1', 'Participant2'],
 *     participants: [],
 *     streamNames: [],
 *     recordingDisplayType: 'video',
 *     recordingVideoOptimized: true,
 *     adminIDStream: 'admin123',
 *     newLimitedStreams: [],
 *     newLimitedStreamsIDs: [],
 *     oldAllStreams: [],
 *     shareScreenStarted: false,
 *     shared: false,
 *     meetingDisplayType: 'media',
 *     defer_receive: false,
 *     lock_screen: false,
 *     firstAll: false,
 *     first_round: false,
 *     gotAllVids: false,
 *     eventType: 'conference',
 *     hostLabel: 'Host',
 *     shareEnded: false,
 *     updateMainWindow: false,
 *     updateActiveNames: (names) => { /* Logic to update active names *\/ },
 *     updateAllAudioStreams: (streams) => { /* Logic to update audio streams *\/ },
 *     updateShareScreenStarted: (status) => { /* Logic to update share screen status *\/ },
 *     updateUpdateMainWindow: (status) => { /* Logic to update main window status *\/ },
 *     updateNewLimitedStreams: (streams) => { /* Logic to update new limited streams *\/ },
 *     updateOldAllStreams: (streams) => { /* Logic to update old streams *\/ },
 *     updateDefer_receive: (status) => { /* Logic to update defer receive status *\/ },
 *     updateMainHeightWidth: (size) => { /* Logic to update main height and width *\/ },
 *     updateShareEnded: (status) => { /* Logic to update share ended status *\/ },
 *     updateLock_screen: (status) => { /* Logic to update lock screen status *\/ },
 *     updateFirstAll: (status) => { /* Logic to update first all status *\/ },
 *     updateFirst_round: (status) => { /* Logic to update first round status *\/ },
 *     reorderStreams: async () => { /* Logic to reorder streams *\/ },
 *     prepopulateUserMedia: async () => { /* Logic to prepopulate user media *\/ },
 *     getVideos: async () => { /* Logic to get videos *\/ },
 *     rePort: async () => { /* Logic to report *\/ },
 *   },
 * };
 *
 * await closeAndResizeService.closeAndResize(options);
 * // The operation will adjust the video and audio elements as per the given parameters.
 */
export declare class CloseAndResize {
    /**
     * Closes and resizes the video and audio elements based on the provided options.
     *
     * @param {CloseAndResizeOptions} options - The options for closing and resizing.
     * @param {string} options.producerId - The ID of the producer.
     * @param {string} options.kind - The kind of media (audio, video, screenshare, or screen).
     * @param {object} options.parameters - The parameters for the operation.
     * @param {function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     * @param {Array} options.parameters.allAudioStreams - Array of all audio streams.
     * @param {Array} options.parameters.allVideoStreams - Array of all video streams.
     * @param {Array} options.parameters.activeNames - Array of active participant names.
     * @param {Array} options.parameters.participants - Array of participants.
     * @param {Array} options.parameters.streamNames - Array of stream names.
     * @param {string} options.parameters.recordingDisplayType - Type of recording display.
     * @param {boolean} options.parameters.recordingVideoOptimized - Whether recording is video optimized.
     * @param {string} options.parameters.adminIDStream - ID of the admin stream.
     * @param {Array} options.parameters.newLimitedStreams - Array of new limited streams.
     * @param {Array} options.parameters.newLimitedStreamsIDs - Array of new limited stream IDs.
     * @param {Array} options.parameters.oldAllStreams - Array of old all streams.
     * @param {boolean} options.parameters.shareScreenStarted - Whether screen sharing has started.
     * @param {boolean} options.parameters.shared - Whether sharing is active.
     * @param {string} options.parameters.meetingDisplayType - Type of meeting display.
     * @param {boolean} options.parameters.defer_receive - Whether to defer receiving.
     * @param {boolean} options.parameters.lock_screen - Whether the screen is locked.
     * @param {boolean} options.parameters.firstAll - Whether it is the first all.
     * @param {boolean} options.parameters.first_round - Whether it is the first round.
     * @param {boolean} options.parameters.gotAllVids - Whether all videos are received.
     * @param {string} options.parameters.eventType - Type of event.
     * @param {string} options.parameters.hostLabel - Label of the host.
     * @param {boolean} options.parameters.shareEnded - Whether sharing has ended.
     * @param {boolean} options.parameters.updateMainWindow - Whether to update the main window.
     * @param {function} options.parameters.updateActiveNames - Function to update active names.
     * @param {function} options.parameters.updateAllAudioStreams - Function to update all audio streams.
     * @param {function} options.parameters.updateAllVideoStreams - Function to update all video streams.
     * @param {function} options.parameters.updateShareScreenStarted - Function to update share screen started status.
     * @param {function} options.parameters.updateUpdateMainWindow - Function to update main window status.
     * @param {function} options.parameters.updateNewLimitedStreams - Function to update new limited streams.
     * @param {function} options.parameters.updateOldAllStreams - Function to update old all streams.
     * @param {function} options.parameters.updateDefer_receive - Function to update defer receive status.
     * @param {function} options.parameters.updateMainHeightWidth - Function to update main height and width.
     * @param {function} options.parameters.updateShareEnded - Function to update share ended status.
     * @param {function} options.parameters.updateLock_screen - Function to update lock screen status.
     * @param {function} options.parameters.updateFirstAll - Function to update first all status.
     * @param {function} options.parameters.updateFirst_round - Function to update first round status.
     * @param {function} options.parameters.reorderStreams - Function to reorder streams.
     * @param {function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
     * @param {function} options.parameters.getVideos - Function to get videos.
     * @param {function} options.parameters.rePort - Function to report.
     *
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     */
    closeAndResize: ({ producerId, kind, parameters, }: CloseAndResizeOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CloseAndResize, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CloseAndResize>;
}
