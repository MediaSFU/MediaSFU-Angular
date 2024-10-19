import { ProducerCodecOptions, RtpEncodingParameters } from 'mediasoup-client/lib/types';
import * as i0 from "@angular/core";
export type AParamsType = {
    encodings: RtpEncodingParameters[];
    codecOptions?: ProducerCodecOptions;
};
export declare class AParams {
    aParams: AParamsType;
    static ɵfac: i0.ɵɵFactoryDeclaration<AParams, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AParams>;
}
