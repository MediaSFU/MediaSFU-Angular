import { ProducerCodecOptions, RtpEncodingParameters } from 'mediasoup-client/lib/types';
import * as i0 from "@angular/core";
export type HParamsType = {
    encodings: RtpEncodingParameters[];
    codecOptions?: ProducerCodecOptions;
};
export declare class HParams {
    hParams: HParamsType;
    static ɵfac: i0.ɵɵFactoryDeclaration<HParams, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HParams>;
}
