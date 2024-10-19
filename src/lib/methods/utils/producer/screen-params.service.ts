import { Injectable } from '@angular/core';
import { ProducerCodecOptions, RtpEncodingParameters } from 'mediasoup-client/lib/types';
export type ScreenParamsType = {
  encodings: RtpEncodingParameters[];
  codecOptions?: ProducerCodecOptions;
};

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
