import { types } from 'mediasoup-client';
import * as i0 from "@angular/core";
type ProducerCodecOptions = types.ProducerCodecOptions;
type RtpEncodingParameters = types.RtpEncodingParameters;
export type AParamsType = {
    encodings: RtpEncodingParameters[];
    codecOptions?: ProducerCodecOptions;
};
/**
 * The `AParams` service provides the encoding parameters for audio production in a media session using the Mediasoup library.
 * It includes a default configuration for RTP encoding parameters, which can be used when creating audio producers.
 *
 * @service
 * @example
 * ```typescript
 * import { AParams } from './path/to/a-params.service';
 *
 * constructor(private aParamsService: AParams) {
 *   console.log(this.aParamsService.aParams);
 * }
 * ```
 *
 * @typedef AParamsType
 * @property {RtpEncodingParameters[]} encodings - Array of RTP encoding parameters for audio.
 * @property {ProducerCodecOptions} [codecOptions] - Optional codec options for the audio producer.
 *
 * @example
 * const aParams: AParamsType = {
 *   encodings: [
 *     {
 *       rid: 'r0',
 *       maxBitrate: 64000, // Max bitrate for the audio stream (in bps)
 *     },
 *   ],
 *   codecOptions: {
 *     // Additional codec options can be defined here
 *   },
 * };
 *
 * @remarks
 * The default `aParams` contains a single encoding with a `rid` of "r0" and a maximum bitrate of 64 kbps.
 * This configuration can be adjusted based on application requirements.
 *
 * @returns {AParamsType} The audio parameters for use in audio producer configuration.
 */
export declare class AParams {
    aParams: AParamsType;
    static ɵfac: i0.ɵɵFactoryDeclaration<AParams, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AParams>;
}
export {};
