import { Injectable } from '@angular/core';
import { ProducerCodecOptions, RtpEncodingParameters } from 'mediasoup-client/lib/types';
export type HParamsType = {
  encodings: RtpEncodingParameters[];
  codecOptions?: ProducerCodecOptions;
};

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
