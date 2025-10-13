import { Injectable } from '@angular/core';
import { types } from 'mediasoup-client';
type ProducerCodecOptions = types.ProducerCodecOptions;
type RtpEncodingParameters = types.RtpEncodingParameters;
export type ScreenParamsType = {
  encodings: RtpEncodingParameters[];
  codecOptions?: ProducerCodecOptions;
};

/**
 * The `ScreenParams` service provides encoding parameters specifically for screen sharing in a media session using the Mediasoup library.
 * It includes a default configuration for RTP encoding parameters optimized for high-quality screen sharing.
 *
 * @service
 * @example
 * ```typescript
 * import { ScreenParams } from './path/to/screen-params.service';
 *
 * constructor(private screenParamsService: ScreenParams) {
 *   console.log(this.screenParamsService.screenParams);
 * }
 * ```
 *
 * @typedef ScreenParamsType
 * @property {RtpEncodingParameters[]} encodings - Array of RTP encoding parameters for screen sharing.
 * @property {ProducerCodecOptions} [codecOptions] - Optional codec options for the screen sharing producer.
 *
 * @example
 * const screenParams: ScreenParamsType = {
 *   encodings: [
 *     {
 *       rid: 'r7',
 *       maxBitrate: 3000000, // Max bitrate for this encoding (in bps)
 *     },
 *   ],
 *   codecOptions: {
 *     videoGoogleStartBitrate: 1000, // Initial bitrate for the Google codec
 *   },
 * };
 *
 * @remarks
 * The default `screenParams` includes one encoding configuration with a high maximum bitrate suitable for sharing detailed screen content.
 * The parameters are optimized to ensure a smooth experience during screen sharing sessions.
 *
 * @returns {ScreenParamsType} The screen sharing parameters for use in screen sharing producer configuration.
 */


@Injectable({
  providedIn: 'root',
})
export class ScreenParams {
  screenParams: ScreenParamsType = {
    encodings: [
      {
        rid: 'r7',
        maxBitrate: 3000000,
      },
    ],
    codecOptions: {
      videoGoogleStartBitrate: 1000,
    },
  };
}
