import { ProducerCodecOptions, RtpEncodingParameters } from 'mediasoup-client/lib/types';
import * as i0 from "@angular/core";
export type VParamsType = {
    encodings: RtpEncodingParameters[];
    codecOptions?: ProducerCodecOptions;
};
export declare class VParams {
    vParams: VParamsType;
    static ɵfac: i0.ɵɵFactoryDeclaration<VParams, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<VParams>;
}
