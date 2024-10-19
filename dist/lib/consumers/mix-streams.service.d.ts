import { Stream, Participant } from '../@types/types';
import * as i0 from "@angular/core";
export interface MixStreamsOptions {
    alVideoStreams: (Stream | Participant)[];
    non_alVideoStreams: Participant[];
    ref_participants: (Stream | Participant)[];
}
export type MixStreamsType = (options: MixStreamsOptions) => Promise<(Stream | Participant)[]>;
export declare class MixStreams {
    /**
     * Mixes video and audio streams and participants based on specified parameters.
     *
     * @param {Object} options - The options for mixing streams.
     * @param {Array} options.alVideoStreams - The list of audio and video streams to mix.
     * @param {Array} options.non_alVideoStreams - The list of non-audio and video streams to mix.
     * @param {Array} options.ref_participants - The list of reference participants to mix.
     * @returns {Promise<Array>} A promise that resolves with the mixed streams.
     * @throws Will throw an error if there is an issue mixing the streams.
     * @example
     * ```typescript
     * mixStreams({
     *   alVideoStreams: [stream1, stream2],
     *  non_alVideoStreams: [participant1, participant2],
     * ref_participants: [participant1, participant2]
     * });
     *
     * ```
     */
    mixStreams({ alVideoStreams, non_alVideoStreams, ref_participants, }: MixStreamsOptions): Promise<(Stream | Participant)[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MixStreams, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MixStreams>;
}
