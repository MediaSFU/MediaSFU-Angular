import { Stream, Participant, DispStreamsType, DispStreamsParameters, AudioDecibels, MixStreamsType, BreakoutParticipant, EventType } from '../@types/types';
import * as i0 from "@angular/core";
export interface ChangeVidsParameters extends DispStreamsParameters {
    allVideoStreams: (Stream | Participant)[];
    p_activeNames: string[];
    activeNames: string[];
    dispActiveNames: string[];
    shareScreenStarted: boolean;
    shared: boolean;
    newLimitedStreams: (Stream | Participant)[];
    non_alVideoStreams: Participant[];
    ref_participants: Participant[];
    participants: Participant[];
    eventType: EventType;
    islevel: string;
    member: string;
    sortAudioLoudness: boolean;
    audioDecibels: AudioDecibels[];
    mixed_alVideoStreams: (Stream | Participant)[];
    non_alVideoStreams_muted: Participant[];
    remoteProducerId?: string;
    localStreamVideo: MediaStream | null;
    oldAllStreams: (Stream | Participant)[];
    screenPageLimit: number;
    meetingDisplayType: string;
    meetingVideoOptimized: boolean;
    recordingVideoOptimized: boolean;
    recordingDisplayType: 'video' | 'media' | 'all';
    paginatedStreams: (Stream | Participant)[][];
    itemPageLimit: number;
    doPaginate: boolean;
    prevDoPaginate: boolean;
    currentUserPage: number;
    breakoutRooms: BreakoutParticipant[][];
    hostNewRoom: number;
    breakOutRoomStarted: boolean;
    breakOutRoomEnded: boolean;
    virtualStream: MediaStream | null;
    mainRoomsLength: number;
    memberRoom: number;
    updateP_activeNames: (names: string[]) => void;
    updateActiveNames: (names: string[]) => void;
    updateDispActiveNames: (names: string[]) => void;
    updateNewLimitedStreams: (streams: (Stream | Participant)[]) => void;
    updateNon_alVideoStreams: (participants: Participant[]) => void;
    updateRef_participants: (participants: Participant[]) => void;
    updateSortAudioLoudness: (sort: boolean) => void;
    updateMixed_alVideoStreams: (streams: (Stream | Participant)[]) => void;
    updateNon_alVideoStreams_muted: (participants: Participant[]) => void;
    updatePaginatedStreams: (streams: (Stream | Participant)[][]) => void;
    updateDoPaginate: (paginate: boolean) => void;
    updatePrevDoPaginate: (paginate: boolean) => void;
    updateCurrentUserPage: (page: number) => void;
    updateNumberPages: (pages: number) => void;
    updateMainRoomsLength: (length: number) => void;
    updateMemberRoom: (room: number) => void;
    mixStreams: MixStreamsType;
    dispStreams: DispStreamsType;
    getUpdatedAllParams: () => ChangeVidsParameters;
    [key: string]: any;
}
export interface ChangeVidsOptions {
    screenChanged?: boolean;
    parameters: ChangeVidsParameters;
}
export type ChangeVidsType = (options: ChangeVidsOptions) => Promise<void>;
/**
 * Asynchronously changes the video streams based on the provided options.
 *
 * @param {Object} options - The options for changing video streams.
 * @param {boolean} [options.screenChanged=false] - Indicates if the screen has changed.
 * @param {ChangeVidsOptions} options.parameters - The parameters for changing video streams.
 * @returns {Promise<void>} A promise that resolves when the video streams have been changed.
 *
 * @typedef {Object} ChangeVidsOptions
 * @property {Function} getUpdatedAllParams - Function to get updated parameters.
 * @property {Array} allVideoStreams - Array of all video streams.
 * @property {Array} p_activeNames - Array of active participant names.
 * @property {Array} activeNames - Array of active names.
 * @property {Array} dispActiveNames - Array of displayed active names.
 * @property {boolean} shareScreenStarted - Indicates if screen sharing has started.
 * @property {boolean} shared - Indicates if the screen is shared.
 * @property {Array} newLimitedStreams - Array of new limited streams.
 * @property {Array} non_alVideoStreams - Array of non-al video streams.
 * @property {Array} ref_participants - Array of reference participants.
 * @property {Array} participants - Array of participants.
 * @property {string} eventType - Type of the event.
 * @property {string} islevel - Level of the participant.
 * @property {string} member - Name of the member.
 * @property {boolean} sortAudioLoudness - Indicates if audio loudness should be sorted.
 * @property {Array} audioDecibels - Array of audio decibels.
 * @property {Array} mixed_alVideoStreams - Array of mixed al video streams.
 * @property {Array} non_alVideoStreams_muted - Array of muted non-al video streams.
 * @property {string} remoteProducerId - ID of the remote producer.
 * @property {Object} localStreamVideo - Local stream video object.
 * @property {Array} oldAllStreams - Array of old all streams.
 * @property {number} screenPageLimit - Limit of streams per screen page.
 * @property {string} meetingDisplayType - Type of meeting display.
 * @property {boolean} meetingVideoOptimized - Indicates if meeting video is optimized.
 * @property {boolean} recordingVideoOptimized - Indicates if recording video is optimized.
 * @property {string} recordingDisplayType - Type of recording display.
 * @property {Array} paginatedStreams - Array of paginated streams.
 * @property {number} itemPageLimit - Limit of items per page.
 * @property {boolean} doPaginate - Indicates if pagination should be done.
 * @property {boolean} prevDoPaginate - Indicates if pagination was previously done.
 * @property {number} currentUserPage - Current user page number.
 * @property {Array} breakoutRooms - Array of breakout rooms.
 * @property {number} hostNewRoom - Index of the new room for the host.
 * @property {boolean} breakOutRoomStarted - Indicates if breakout room has started.
 * @property {boolean} breakOutRoomEnded - Indicates if breakout room has ended.
 * @property {Object} virtualStream - Virtual stream object.
 * @property {number} mainRoomsLength - Length of main rooms.
 * @property {string} memberRoom - Room of the member.
 * @property {Function} updateP_activeNames - Function to update active participant names.
 * @property {Function} updateActiveNames - Function to update active names.
 * @property {Function} updateDispActiveNames - Function to update displayed active names.
 * @property {Function} updateNewLimitedStreams - Function to update new limited streams.
 * @property {Function} updateNon_alVideoStreams - Function to update non-al video streams.
 * @property {Function} updateRef_participants - Function to update reference participants.
 * @property {Function} updateSortAudioLoudness - Function to update audio loudness sorting.
 * @property {Function} updateMixed_alVideoStreams - Function to update mixed al video streams.
 * @property {Function} updateNon_alVideoStreams_muted - Function to update muted non-al video streams.
 * @property {Function} updatePaginatedStreams - Function to update paginated streams.
 * @property {Function} updateDoPaginate - Function to update pagination status.
 * @property {Function} updatePrevDoPaginate - Function to update previous pagination status.
 * @property {Function} updateCurrentUserPage - Function to update current user page.
 * @property {Function} updateNumberPages - Function to update number of pages.
 * @property {Function} updateMainRoomsLength - Function to update main rooms length.
 * @property {Function} updateMemberRoom - Function to update member room.
 * @property {Function} mixStreams - Function to mix streams.
 * @property {Function} dispStreams - Function to display streams.
 *
 *
 * @example
 * ```typescript
 * await changeVidsService.changeVids({
 *   screenChanged: true,
 *   parameters: {
 *     allVideoStreams: [], // Your array of video streams
 *     p_activeNames: [], // Active participant names
 *     activeNames: [], // Names of active streams
 *     dispActiveNames: [], // Names of displayed active streams
 *     shareScreenStarted: false,
 *     shared: false,
 *     newLimitedStreams: [], // New limited streams
 *     non_alVideoStreams: [], // Non-audio video streams
 *     ref_participants: [], // Reference participants
 *     participants: [], // All participants
 *     eventType: 'conference', // Type of event
 *     islevel: '1', // Level of the participant
 *     member: 'John Doe', // Member's name
 *     sortAudioLoudness: true,
 *     audioDecibels: [], // Audio decibel levels
 *     mixed_alVideoStreams: [], // Mixed audio/video streams
 *     non_alVideoStreams_muted: [], // Muted non-audio video streams
 *     remoteProducerId: 'abc123',
 *     localStreamVideo: null, // Local video stream
 *     oldAllStreams: [], // Previous streams
 *     screenPageLimit: 4, // Limit of streams per screen
 *     meetingDisplayType: 'grid', // Type of display
 *     meetingVideoOptimized: true, // Video optimization status
 *     recordingVideoOptimized: false, // Recording optimization status
 *     recordingDisplayType: 'video', // Recording display type
 *     paginatedStreams: [], // Paginated streams
 *     itemPageLimit: 2, // Items per page limit
 *     doPaginate: true, // Pagination flag
 *     prevDoPaginate: false, // Previous pagination state
 *     currentUserPage: 1, // Current page number
 *     breakoutRooms: [], // Breakout room information
 *     hostNewRoom: 0, // Host room number
 *     breakOutRoomStarted: false, // Breakout room status
 *     breakOutRoomEnded: false, // Breakout room end status
 *     virtualStream: null, // Virtual stream
 *     mainRoomsLength: 3, // Number of main rooms
 *     memberRoom: 1, // Member's room number
 *     updateP_activeNames: (names) => {}, // Update function for active names
 *     updateActiveNames: (names) => {}, // Update function for all names
 *     updateDispActiveNames: (names) => {}, // Update function for displayed names
 *     updateNewLimitedStreams: (streams) => {}, // Update function for limited streams
 *     updateNon_alVideoStreams: (participants) => {}, // Update function for non-audio streams
 *     updateRef_participants: (participants) => {}, // Update function for reference participants
 *     updateSortAudioLoudness: (sort) => {}, // Update function for sorting audio
 *     updateMixed_alVideoStreams: (streams) => {}, // Update function for mixed streams
 *     updateNon_alVideoStreams_muted: (participants) => {}, // Update function for muted streams
 *     updatePaginatedStreams: (streams) => {}, // Update function for paginated streams
 *     updateDoPaginate: (paginate) => {}, // Update function for pagination
 *     updatePrevDoPaginate: (paginate) => {}, // Update function for previous pagination
 *     updateCurrentUserPage: (page) => {}, // Update function for current page
 *     updateNumberPages: (pages) => {}, // Update function for number of pages
 *     updateMainRoomsLength: (length) => {}, // Update function for main room length
 *     updateMemberRoom: (room) => {}, // Update function for member's room
 *     mixStreams: async ({ streams, displayType }) => {}, // Function to mix streams
 *     dispStreams: async ({ streams, displayType }) => {}, // Function to display streams
 *   },
 * });
 * ```
 */
export declare class ChangeVids {
    changeVids: ({ screenChanged, parameters }: ChangeVidsOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChangeVids, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ChangeVids>;
}
