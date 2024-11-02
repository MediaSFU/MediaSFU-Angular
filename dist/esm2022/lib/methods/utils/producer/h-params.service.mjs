import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * The `HParams` service provides encoding parameters for video production in a media session using the Mediasoup library.
 * It includes a default configuration for RTP encoding parameters designed for handling high-quality video streams.
 *
 * @service
 * @example
 * ```typescript
 * import { HParams } from './path/to/h-params.service';
 *
 * constructor(private hParamsService: HParams) {
 *   console.log(this.hParamsService.hParams);
 * }
 * ```
 *
 * @typedef HParamsType
 * @property {RtpEncodingParameters[]} encodings - Array of RTP encoding parameters for video.
 * @property {ProducerCodecOptions} [codecOptions] - Optional codec options for the video producer.
 *
 * @example
 * const hParams: HParamsType = {
 *   encodings: [
 *     {
 *       rid: 'r8',
 *       maxBitrate: 240000, // Max bitrate for this encoding (in bps)
 *       scalabilityMode: 'L1T3', // Scalable video coding mode
 *       scaleResolutionDownBy: 4.0, // Scale down the resolution by a factor of 4
 *     },
 *     {
 *       rid: 'r9',
 *       maxBitrate: 480000,
 *       scalabilityMode: 'L1T3',
 *       scaleResolutionDownBy: 2.0, // Scale down the resolution by a factor of 2
 *     },
 *     {
 *       rid: 'r10',
 *       maxBitrate: 960000,
 *       scalabilityMode: 'L1T3',
 *     },
 *   ],
 *   codecOptions: {
 *     videoGoogleStartBitrate: 320, // Initial bitrate for the Google codec
 *   },
 * };
 *
 * @remarks
 * The default `hParams` includes three encoding configurations with different resolutions and bitrates.
 * The configurations are optimized for scalable video encoding, allowing for adaptive bitrate streaming based on network conditions.
 *
 * @returns {HParamsType} The video parameters for use in video producer configuration.
 */
export class HParams {
    hParams = {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HParams, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HParams, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HParams, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaC1wYXJhbXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3V0aWxzL3Byb2R1Y2VyL2gtcGFyYW1zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFPM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpREc7QUFNSCxNQUFNLE9BQU8sT0FBTztJQUNsQixPQUFPLEdBQWdCO1FBQ3JCLFNBQVMsRUFBRTtZQUNUO2dCQUNFLEdBQUcsRUFBRSxJQUFJO2dCQUNULFVBQVUsRUFBRSxNQUFNO2dCQUNsQixlQUFlLEVBQUUsTUFBTTtnQkFDdkIscUJBQXFCLEVBQUUsR0FBRzthQUMzQjtZQUNEO2dCQUNFLEdBQUcsRUFBRSxJQUFJO2dCQUNULFVBQVUsRUFBRSxNQUFNO2dCQUNsQixlQUFlLEVBQUUsTUFBTTtnQkFDdkIscUJBQXFCLEVBQUUsR0FBRzthQUMzQjtZQUNEO2dCQUNFLEdBQUcsRUFBRSxLQUFLO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2dCQUNsQixlQUFlLEVBQUUsTUFBTTthQUN4QjtTQUNGO1FBQ0QsWUFBWSxFQUFFO1lBQ1osdUJBQXVCLEVBQUUsR0FBRztTQUM3QjtLQUNGLENBQUM7dUdBeEJTLE9BQU87MkdBQVAsT0FBTyxjQUZOLE1BQU07OzJGQUVQLE9BQU87a0JBSG5CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvZHVjZXJDb2RlY09wdGlvbnMsIFJ0cEVuY29kaW5nUGFyYW1ldGVycyB9IGZyb20gJ21lZGlhc291cC1jbGllbnQvbGliL3R5cGVzJztcbmV4cG9ydCB0eXBlIEhQYXJhbXNUeXBlID0ge1xuICBlbmNvZGluZ3M6IFJ0cEVuY29kaW5nUGFyYW1ldGVyc1tdO1xuICBjb2RlY09wdGlvbnM/OiBQcm9kdWNlckNvZGVjT3B0aW9ucztcbn07XG5cbi8qKlxuICogVGhlIGBIUGFyYW1zYCBzZXJ2aWNlIHByb3ZpZGVzIGVuY29kaW5nIHBhcmFtZXRlcnMgZm9yIHZpZGVvIHByb2R1Y3Rpb24gaW4gYSBtZWRpYSBzZXNzaW9uIHVzaW5nIHRoZSBNZWRpYXNvdXAgbGlicmFyeS5cbiAqIEl0IGluY2x1ZGVzIGEgZGVmYXVsdCBjb25maWd1cmF0aW9uIGZvciBSVFAgZW5jb2RpbmcgcGFyYW1ldGVycyBkZXNpZ25lZCBmb3IgaGFuZGxpbmcgaGlnaC1xdWFsaXR5IHZpZGVvIHN0cmVhbXMuXG4gKlxuICogQHNlcnZpY2VcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBIUGFyYW1zIH0gZnJvbSAnLi9wYXRoL3RvL2gtcGFyYW1zLnNlcnZpY2UnO1xuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgaFBhcmFtc1NlcnZpY2U6IEhQYXJhbXMpIHtcbiAqICAgY29uc29sZS5sb2codGhpcy5oUGFyYW1zU2VydmljZS5oUGFyYW1zKTtcbiAqIH1cbiAqIGBgYFxuICpcbiAqIEB0eXBlZGVmIEhQYXJhbXNUeXBlXG4gKiBAcHJvcGVydHkge1J0cEVuY29kaW5nUGFyYW1ldGVyc1tdfSBlbmNvZGluZ3MgLSBBcnJheSBvZiBSVFAgZW5jb2RpbmcgcGFyYW1ldGVycyBmb3IgdmlkZW8uXG4gKiBAcHJvcGVydHkge1Byb2R1Y2VyQ29kZWNPcHRpb25zfSBbY29kZWNPcHRpb25zXSAtIE9wdGlvbmFsIGNvZGVjIG9wdGlvbnMgZm9yIHRoZSB2aWRlbyBwcm9kdWNlci5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgaFBhcmFtczogSFBhcmFtc1R5cGUgPSB7XG4gKiAgIGVuY29kaW5nczogW1xuICogICAgIHtcbiAqICAgICAgIHJpZDogJ3I4JyxcbiAqICAgICAgIG1heEJpdHJhdGU6IDI0MDAwMCwgLy8gTWF4IGJpdHJhdGUgZm9yIHRoaXMgZW5jb2RpbmcgKGluIGJwcylcbiAqICAgICAgIHNjYWxhYmlsaXR5TW9kZTogJ0wxVDMnLCAvLyBTY2FsYWJsZSB2aWRlbyBjb2RpbmcgbW9kZVxuICogICAgICAgc2NhbGVSZXNvbHV0aW9uRG93bkJ5OiA0LjAsIC8vIFNjYWxlIGRvd24gdGhlIHJlc29sdXRpb24gYnkgYSBmYWN0b3Igb2YgNFxuICogICAgIH0sXG4gKiAgICAge1xuICogICAgICAgcmlkOiAncjknLFxuICogICAgICAgbWF4Qml0cmF0ZTogNDgwMDAwLFxuICogICAgICAgc2NhbGFiaWxpdHlNb2RlOiAnTDFUMycsXG4gKiAgICAgICBzY2FsZVJlc29sdXRpb25Eb3duQnk6IDIuMCwgLy8gU2NhbGUgZG93biB0aGUgcmVzb2x1dGlvbiBieSBhIGZhY3RvciBvZiAyXG4gKiAgICAgfSxcbiAqICAgICB7XG4gKiAgICAgICByaWQ6ICdyMTAnLFxuICogICAgICAgbWF4Qml0cmF0ZTogOTYwMDAwLFxuICogICAgICAgc2NhbGFiaWxpdHlNb2RlOiAnTDFUMycsXG4gKiAgICAgfSxcbiAqICAgXSxcbiAqICAgY29kZWNPcHRpb25zOiB7XG4gKiAgICAgdmlkZW9Hb29nbGVTdGFydEJpdHJhdGU6IDMyMCwgLy8gSW5pdGlhbCBiaXRyYXRlIGZvciB0aGUgR29vZ2xlIGNvZGVjXG4gKiAgIH0sXG4gKiB9O1xuICpcbiAqIEByZW1hcmtzXG4gKiBUaGUgZGVmYXVsdCBgaFBhcmFtc2AgaW5jbHVkZXMgdGhyZWUgZW5jb2RpbmcgY29uZmlndXJhdGlvbnMgd2l0aCBkaWZmZXJlbnQgcmVzb2x1dGlvbnMgYW5kIGJpdHJhdGVzLlxuICogVGhlIGNvbmZpZ3VyYXRpb25zIGFyZSBvcHRpbWl6ZWQgZm9yIHNjYWxhYmxlIHZpZGVvIGVuY29kaW5nLCBhbGxvd2luZyBmb3IgYWRhcHRpdmUgYml0cmF0ZSBzdHJlYW1pbmcgYmFzZWQgb24gbmV0d29yayBjb25kaXRpb25zLlxuICpcbiAqIEByZXR1cm5zIHtIUGFyYW1zVHlwZX0gVGhlIHZpZGVvIHBhcmFtZXRlcnMgZm9yIHVzZSBpbiB2aWRlbyBwcm9kdWNlciBjb25maWd1cmF0aW9uLlxuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEhQYXJhbXMge1xuICBoUGFyYW1zOiBIUGFyYW1zVHlwZSA9IHtcbiAgICBlbmNvZGluZ3M6IFtcbiAgICAgIHtcbiAgICAgICAgcmlkOiAncjgnLFxuICAgICAgICBtYXhCaXRyYXRlOiAyNDAwMDAsXG4gICAgICAgIHNjYWxhYmlsaXR5TW9kZTogJ0wxVDMnLFxuICAgICAgICBzY2FsZVJlc29sdXRpb25Eb3duQnk6IDQuMCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJpZDogJ3I5JyxcbiAgICAgICAgbWF4Qml0cmF0ZTogNDgwMDAwLFxuICAgICAgICBzY2FsYWJpbGl0eU1vZGU6ICdMMVQzJyxcbiAgICAgICAgc2NhbGVSZXNvbHV0aW9uRG93bkJ5OiAyLjAsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICByaWQ6ICdyMTAnLFxuICAgICAgICBtYXhCaXRyYXRlOiA5NjAwMDAsXG4gICAgICAgIHNjYWxhYmlsaXR5TW9kZTogJ0wxVDMnLFxuICAgICAgfSxcbiAgICBdLFxuICAgIGNvZGVjT3B0aW9uczoge1xuICAgICAgdmlkZW9Hb29nbGVTdGFydEJpdHJhdGU6IDMyMCxcbiAgICB9LFxuICB9O1xufVxuIl19