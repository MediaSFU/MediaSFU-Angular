import { Injectable } from '@angular/core';
import { types } from 'mediasoup-client';
type ProducerCodecOptions = types.ProducerCodecOptions;
type RtpEncodingParameters = types.RtpEncodingParameters;
export type HParamsType = {
  encodings: RtpEncodingParameters[];
  codecOptions?: ProducerCodecOptions;
};

/**
 * The `HParams` service provides encoding parameters for video production in a media session using the Mediasoup library.
 * It includes a default configuration for RTP encoding parameters designed for handling high-quality video streams.
 *
 * @service
 * @example
 * ```typescript
 * import { HParams } from './path/to/h-params.service';
 *
 * constructor(private hParamsService: HParams) {
 *   console.log(this.hParamsService.hParams);
 * }
 * ```
 *
 * @typedef HParamsType
 * @property {RtpEncodingParameters[]} encodings - Array of RTP encoding parameters for video.
 * @property {ProducerCodecOptions} [codecOptions] - Optional codec options for the video producer.
 *
 * @example
 * const hParams: HParamsType = {
 *   encodings: [
 *     {
 *       rid: 'r8',
 *       maxBitrate: 240000, // Max bitrate for this encoding (in bps)
 *       scalabilityMode: 'L1T3', // Scalable video coding mode
 *       scaleResolutionDownBy: 4.0, // Scale down the resolution by a factor of 4
 *     },
 *     {
 *       rid: 'r9',
 *       maxBitrate: 480000,
 *       scalabilityMode: 'L1T3',
 *       scaleResolutionDownBy: 2.0, // Scale down the resolution by a factor of 2
 *     },
 *     {
 *       rid: 'r10',
 *       maxBitrate: 960000,
 *       scalabilityMode: 'L1T3',
 *     },
 *   ],
 *   codecOptions: {
 *     videoGoogleStartBitrate: 320, // Initial bitrate for the Google codec
 *   },
 * };
 *
 * @remarks
 * The default `hParams` includes three encoding configurations with different resolutions and bitrates.
 * The configurations are optimized for scalable video encoding, allowing for adaptive bitrate streaming based on network conditions.
 *
 * @returns {HParamsType} The video parameters for use in video producer configuration.
 */


@Injectable({
  providedIn: 'root',
})
export class HParams {
  hParams: HParamsType = {
    encodings: [
      {
        rid: 'r8',
        maxBitrate: 240000,
        scalabilityMode: 'L1T3',
        scaleResolutionDownBy: 4.0,
      },
      {
        rid: 'r9',
        maxBitrate: 480000,
        scalabilityMode: 'L1T3',
        scaleResolutionDownBy: 2.0,
      },
      {
        rid: 'r10',
        maxBitrate: 960000,
        scalabilityMode: 'L1T3',
      },
    ],
    codecOptions: {
      videoGoogleStartBitrate: 320,
    },
  };
}
