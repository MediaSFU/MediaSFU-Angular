import { ProducerCodecOptions, RtpEncodingParameters } from 'mediasoup-client/lib/types';
import * as i0 from "@angular/core";
export type ScreenParamsType = {
    encodings: RtpEncodingParameters[];
    codecOptions?: ProducerCodecOptions;
};
export declare class ScreenParams {
    screenParams: ScreenParamsType;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScreenParams, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ScreenParams>;
}
