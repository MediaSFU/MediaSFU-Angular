import { Stream, Participant } from '../@types/types';
import * as i0 from "@angular/core";
export interface GetVideosOptions {
    participants: Participant[];
    allVideoStreams: (Stream | Participant)[];
    oldAllStreams: (Stream | Participant)[];
    adminVidID?: string;
    updateAllVideoStreams: (streams: (Stream | Participant)[]) => void;
    updateOldAllStreams: (streams: (Stream | Participant)[]) => void;
}
export type GetVideosType = (options: GetVideosOptions) => Promise<void>;
export declare class GetVideos {
    /**
     * Asynchronously processes and updates video streams by filtering out the admin's video stream.
     *
     * @param {GetVideosOptions} options - The options for getting videos.
     * @param {Participant[]} options.participants - The list of participants.
     * @param {Stream[]} options.allVideoStreams - The list of all video streams.
     * @param {(Stream | Participant)[]} options.oldAllStreams - The list of old video streams.
     * @param {string} options.adminVidID - The ID of the admin's video stream.
     * @param {Function} options.updateAllVideoStreams - Function to update the state variable for all video streams.
     * @param {Function} options.updateOldAllStreams - Function to update the state variable for old video streams.
     * @returns {Promise<void>} A promise that resolves when the video streams have been processed and updated.
     */
    getVideos({ participants, allVideoStreams, oldAllStreams, adminVidID, updateAllVideoStreams, updateOldAllStreams, }: GetVideosOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GetVideos, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GetVideos>;
}
