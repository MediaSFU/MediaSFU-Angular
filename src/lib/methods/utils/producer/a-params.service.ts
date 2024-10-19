import { Injectable } from '@angular/core';
import { ProducerCodecOptions, RtpEncodingParameters } from 'mediasoup-client/lib/types';
// Export the type definition for the function
export type AParamsType = {
  encodings: RtpEncodingParameters[];
  codecOptions?: ProducerCodecOptions;
};

@Injectable({
  providedIn: 'root',
})
export class AParams {
  aParams: AParamsType = {
    encodings: [
      {
        rid: 'r0',
        maxBitrate: 64000,
      },
    ],
  };
}
