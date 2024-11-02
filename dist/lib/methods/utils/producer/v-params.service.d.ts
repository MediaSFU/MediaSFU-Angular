import { ProducerCodecOptions, RtpEncodingParameters } from 'mediasoup-client/lib/types';
import * as i0 from "@angular/core";
export type VParamsType = {
    encodings: RtpEncodingParameters[];
    codecOptions?: ProducerCodecOptions;
};
/**
 * The `VParams` service provides encoding parameters for video in a media session using the Mediasoup library.
 * It includes a default configuration for RTP encoding parameters optimized for video streaming.
 *
 * @service
 * @example
 * ```typescript
 * import { VParams } from './path/to/v-params.service';
 *
 * constructor(private vParamsService: VParams) {
 *   console.log(this.vParamsService.vParams);
 * }
 * ```
 *
 * @typedef VParamsType
 * @property {RtpEncodingParameters[]} encodings - Array of RTP encoding parameters for video.
 * @property {ProducerCodecOptions} [codecOptions] - Optional codec options for the video producer.
 *
 * @example
 * const vParams: VParamsType = {
 *   encodings: [
 *     {
 *       rid: 'r3',
 *       maxBitrate: 200000, // Max bitrate for this encoding (in bps)
 *       scalabilityMode: 'L1T3', // Scalability mode for encoding
 *       scaleResolutionDownBy: 4.0, // Scale down resolution by this factor
 *     },
 *     {
 *       rid: 'r4',
 *       maxBitrate: 400000,
 *       scalabilityMode: 'L1T3',
 *       scaleResolutionDownBy: 2.0,
 *     },
 *     {
 *       rid: 'r5',
 *       maxBitrate: 800000,
 *       scalabilityMode: 'L1T3',
 *     },
 *   ],
 *   codecOptions: {
 *     videoGoogleStartBitrate: 320, // Initial bitrate for the Google codec
 *   },
 * };
 *
 * @remarks
 * The default `vParams` includes multiple encoding configurations with different maximum bitrates,
 * allowing for adaptive streaming based on network conditions and participant capabilities.
 *
 * @returns {VParamsType} The video parameters for use in video producer configuration.
 */
export declare class VParams {
    vParams: VParamsType;
    static ɵfac: i0.ɵɵFactoryDeclaration<VParams, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<VParams>;
}
