import { Injectable } from '@angular/core';
import { ProducerCodecOptions, RtpEncodingParameters } from 'mediasoup-client/lib/types';
export type VParamsType = {
  encodings: RtpEncodingParameters[];
  codecOptions?: ProducerCodecOptions;
};

@Injectable({
  providedIn: 'root',
})
export class VParams {
  vParams: VParamsType = {
    encodings: [
      {
        rid: 'r3',
        maxBitrate: 200000,
        scalabilityMode: 'L1T3',
        scaleResolutionDownBy: 4.0,
      },
      {
        rid: 'r4',
        maxBitrate: 400000,
        scalabilityMode: 'L1T3',
        scaleResolutionDownBy: 2.0,
      },
      {
        rid: 'r5',
        maxBitrate: 800000,
        scalabilityMode: 'L1T3',
      },
    ],
    codecOptions: {
      videoGoogleStartBitrate: 320,
    },
  };
}
