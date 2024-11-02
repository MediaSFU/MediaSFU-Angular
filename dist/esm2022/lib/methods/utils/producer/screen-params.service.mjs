import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
export class ScreenParams {
    screenParams = {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ScreenParams, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ScreenParams, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ScreenParams, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyZWVuLXBhcmFtcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvdXRpbHMvcHJvZHVjZXIvc2NyZWVuLXBhcmFtcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQ0c7QUFNSCxNQUFNLE9BQU8sWUFBWTtJQUN2QixZQUFZLEdBQXFCO1FBQy9CLFNBQVMsRUFBRTtZQUNUO2dCQUNFLEdBQUcsRUFBRSxJQUFJO2dCQUNULFVBQVUsRUFBRSxPQUFPO2FBQ3BCO1NBQ0Y7UUFDRCxZQUFZLEVBQUU7WUFDWix1QkFBdUIsRUFBRSxJQUFJO1NBQzlCO0tBQ0YsQ0FBQzt1R0FYUyxZQUFZOzJHQUFaLFlBQVksY0FGWCxNQUFNOzsyRkFFUCxZQUFZO2tCQUh4QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb2R1Y2VyQ29kZWNPcHRpb25zLCBSdHBFbmNvZGluZ1BhcmFtZXRlcnMgfSBmcm9tICdtZWRpYXNvdXAtY2xpZW50L2xpYi90eXBlcyc7XG5leHBvcnQgdHlwZSBTY3JlZW5QYXJhbXNUeXBlID0ge1xuICBlbmNvZGluZ3M6IFJ0cEVuY29kaW5nUGFyYW1ldGVyc1tdO1xuICBjb2RlY09wdGlvbnM/OiBQcm9kdWNlckNvZGVjT3B0aW9ucztcbn07XG5cbi8qKlxuICogVGhlIGBTY3JlZW5QYXJhbXNgIHNlcnZpY2UgcHJvdmlkZXMgZW5jb2RpbmcgcGFyYW1ldGVycyBzcGVjaWZpY2FsbHkgZm9yIHNjcmVlbiBzaGFyaW5nIGluIGEgbWVkaWEgc2Vzc2lvbiB1c2luZyB0aGUgTWVkaWFzb3VwIGxpYnJhcnkuXG4gKiBJdCBpbmNsdWRlcyBhIGRlZmF1bHQgY29uZmlndXJhdGlvbiBmb3IgUlRQIGVuY29kaW5nIHBhcmFtZXRlcnMgb3B0aW1pemVkIGZvciBoaWdoLXF1YWxpdHkgc2NyZWVuIHNoYXJpbmcuXG4gKlxuICogQHNlcnZpY2VcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBTY3JlZW5QYXJhbXMgfSBmcm9tICcuL3BhdGgvdG8vc2NyZWVuLXBhcmFtcy5zZXJ2aWNlJztcbiAqXG4gKiBjb25zdHJ1Y3Rvcihwcml2YXRlIHNjcmVlblBhcmFtc1NlcnZpY2U6IFNjcmVlblBhcmFtcykge1xuICogICBjb25zb2xlLmxvZyh0aGlzLnNjcmVlblBhcmFtc1NlcnZpY2Uuc2NyZWVuUGFyYW1zKTtcbiAqIH1cbiAqIGBgYFxuICpcbiAqIEB0eXBlZGVmIFNjcmVlblBhcmFtc1R5cGVcbiAqIEBwcm9wZXJ0eSB7UnRwRW5jb2RpbmdQYXJhbWV0ZXJzW119IGVuY29kaW5ncyAtIEFycmF5IG9mIFJUUCBlbmNvZGluZyBwYXJhbWV0ZXJzIGZvciBzY3JlZW4gc2hhcmluZy5cbiAqIEBwcm9wZXJ0eSB7UHJvZHVjZXJDb2RlY09wdGlvbnN9IFtjb2RlY09wdGlvbnNdIC0gT3B0aW9uYWwgY29kZWMgb3B0aW9ucyBmb3IgdGhlIHNjcmVlbiBzaGFyaW5nIHByb2R1Y2VyLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBzY3JlZW5QYXJhbXM6IFNjcmVlblBhcmFtc1R5cGUgPSB7XG4gKiAgIGVuY29kaW5nczogW1xuICogICAgIHtcbiAqICAgICAgIHJpZDogJ3I3JyxcbiAqICAgICAgIG1heEJpdHJhdGU6IDMwMDAwMDAsIC8vIE1heCBiaXRyYXRlIGZvciB0aGlzIGVuY29kaW5nIChpbiBicHMpXG4gKiAgICAgfSxcbiAqICAgXSxcbiAqICAgY29kZWNPcHRpb25zOiB7XG4gKiAgICAgdmlkZW9Hb29nbGVTdGFydEJpdHJhdGU6IDEwMDAsIC8vIEluaXRpYWwgYml0cmF0ZSBmb3IgdGhlIEdvb2dsZSBjb2RlY1xuICogICB9LFxuICogfTtcbiAqXG4gKiBAcmVtYXJrc1xuICogVGhlIGRlZmF1bHQgYHNjcmVlblBhcmFtc2AgaW5jbHVkZXMgb25lIGVuY29kaW5nIGNvbmZpZ3VyYXRpb24gd2l0aCBhIGhpZ2ggbWF4aW11bSBiaXRyYXRlIHN1aXRhYmxlIGZvciBzaGFyaW5nIGRldGFpbGVkIHNjcmVlbiBjb250ZW50LlxuICogVGhlIHBhcmFtZXRlcnMgYXJlIG9wdGltaXplZCB0byBlbnN1cmUgYSBzbW9vdGggZXhwZXJpZW5jZSBkdXJpbmcgc2NyZWVuIHNoYXJpbmcgc2Vzc2lvbnMuXG4gKlxuICogQHJldHVybnMge1NjcmVlblBhcmFtc1R5cGV9IFRoZSBzY3JlZW4gc2hhcmluZyBwYXJhbWV0ZXJzIGZvciB1c2UgaW4gc2NyZWVuIHNoYXJpbmcgcHJvZHVjZXIgY29uZmlndXJhdGlvbi5cbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBTY3JlZW5QYXJhbXMge1xuICBzY3JlZW5QYXJhbXM6IFNjcmVlblBhcmFtc1R5cGUgPSB7XG4gICAgZW5jb2RpbmdzOiBbXG4gICAgICB7XG4gICAgICAgIHJpZDogJ3I3JyxcbiAgICAgICAgbWF4Qml0cmF0ZTogMzAwMDAwMCxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBjb2RlY09wdGlvbnM6IHtcbiAgICAgIHZpZGVvR29vZ2xlU3RhcnRCaXRyYXRlOiAxMDAwLFxuICAgIH0sXG4gIH07XG59XG4iXX0=