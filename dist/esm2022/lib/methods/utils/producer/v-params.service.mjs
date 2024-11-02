import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * The `VParams` service provides encoding parameters for video in a media session using the Mediasoup library.
 * It includes a default configuration for RTP encoding parameters optimized for video streaming.
 *
 * @service
 * @example
 * ```typescript
 * import { VParams } from './path/to/v-params.service';
 *
 * constructor(private vParamsService: VParams) {
 *   console.log(this.vParamsService.vParams);
 * }
 * ```
 *
 * @typedef VParamsType
 * @property {RtpEncodingParameters[]} encodings - Array of RTP encoding parameters for video.
 * @property {ProducerCodecOptions} [codecOptions] - Optional codec options for the video producer.
 *
 * @example
 * const vParams: VParamsType = {
 *   encodings: [
 *     {
 *       rid: 'r3',
 *       maxBitrate: 200000, // Max bitrate for this encoding (in bps)
 *       scalabilityMode: 'L1T3', // Scalability mode for encoding
 *       scaleResolutionDownBy: 4.0, // Scale down resolution by this factor
 *     },
 *     {
 *       rid: 'r4',
 *       maxBitrate: 400000,
 *       scalabilityMode: 'L1T3',
 *       scaleResolutionDownBy: 2.0,
 *     },
 *     {
 *       rid: 'r5',
 *       maxBitrate: 800000,
 *       scalabilityMode: 'L1T3',
 *     },
 *   ],
 *   codecOptions: {
 *     videoGoogleStartBitrate: 320, // Initial bitrate for the Google codec
 *   },
 * };
 *
 * @remarks
 * The default `vParams` includes multiple encoding configurations with different maximum bitrates,
 * allowing for adaptive streaming based on network conditions and participant capabilities.
 *
 * @returns {VParamsType} The video parameters for use in video producer configuration.
 */
export class VParams {
    vParams = {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: VParams, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: VParams, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: VParams, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidi1wYXJhbXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3V0aWxzL3Byb2R1Y2VyL3YtcGFyYW1zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFPM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpREc7QUFNSCxNQUFNLE9BQU8sT0FBTztJQUNsQixPQUFPLEdBQWdCO1FBQ3JCLFNBQVMsRUFBRTtZQUNUO2dCQUNFLEdBQUcsRUFBRSxJQUFJO2dCQUNULFVBQVUsRUFBRSxNQUFNO2dCQUNsQixlQUFlLEVBQUUsTUFBTTtnQkFDdkIscUJBQXFCLEVBQUUsR0FBRzthQUMzQjtZQUNEO2dCQUNFLEdBQUcsRUFBRSxJQUFJO2dCQUNULFVBQVUsRUFBRSxNQUFNO2dCQUNsQixlQUFlLEVBQUUsTUFBTTtnQkFDdkIscUJBQXFCLEVBQUUsR0FBRzthQUMzQjtZQUNEO2dCQUNFLEdBQUcsRUFBRSxJQUFJO2dCQUNULFVBQVUsRUFBRSxNQUFNO2dCQUNsQixlQUFlLEVBQUUsTUFBTTthQUN4QjtTQUNGO1FBQ0QsWUFBWSxFQUFFO1lBQ1osdUJBQXVCLEVBQUUsR0FBRztTQUM3QjtLQUNGLENBQUM7dUdBeEJTLE9BQU87MkdBQVAsT0FBTyxjQUZOLE1BQU07OzJGQUVQLE9BQU87a0JBSG5CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvZHVjZXJDb2RlY09wdGlvbnMsIFJ0cEVuY29kaW5nUGFyYW1ldGVycyB9IGZyb20gJ21lZGlhc291cC1jbGllbnQvbGliL3R5cGVzJztcbmV4cG9ydCB0eXBlIFZQYXJhbXNUeXBlID0ge1xuICBlbmNvZGluZ3M6IFJ0cEVuY29kaW5nUGFyYW1ldGVyc1tdO1xuICBjb2RlY09wdGlvbnM/OiBQcm9kdWNlckNvZGVjT3B0aW9ucztcbn07XG5cbi8qKlxuICogVGhlIGBWUGFyYW1zYCBzZXJ2aWNlIHByb3ZpZGVzIGVuY29kaW5nIHBhcmFtZXRlcnMgZm9yIHZpZGVvIGluIGEgbWVkaWEgc2Vzc2lvbiB1c2luZyB0aGUgTWVkaWFzb3VwIGxpYnJhcnkuXG4gKiBJdCBpbmNsdWRlcyBhIGRlZmF1bHQgY29uZmlndXJhdGlvbiBmb3IgUlRQIGVuY29kaW5nIHBhcmFtZXRlcnMgb3B0aW1pemVkIGZvciB2aWRlbyBzdHJlYW1pbmcuXG4gKlxuICogQHNlcnZpY2VcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBWUGFyYW1zIH0gZnJvbSAnLi9wYXRoL3RvL3YtcGFyYW1zLnNlcnZpY2UnO1xuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgdlBhcmFtc1NlcnZpY2U6IFZQYXJhbXMpIHtcbiAqICAgY29uc29sZS5sb2codGhpcy52UGFyYW1zU2VydmljZS52UGFyYW1zKTtcbiAqIH1cbiAqIGBgYFxuICpcbiAqIEB0eXBlZGVmIFZQYXJhbXNUeXBlXG4gKiBAcHJvcGVydHkge1J0cEVuY29kaW5nUGFyYW1ldGVyc1tdfSBlbmNvZGluZ3MgLSBBcnJheSBvZiBSVFAgZW5jb2RpbmcgcGFyYW1ldGVycyBmb3IgdmlkZW8uXG4gKiBAcHJvcGVydHkge1Byb2R1Y2VyQ29kZWNPcHRpb25zfSBbY29kZWNPcHRpb25zXSAtIE9wdGlvbmFsIGNvZGVjIG9wdGlvbnMgZm9yIHRoZSB2aWRlbyBwcm9kdWNlci5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgdlBhcmFtczogVlBhcmFtc1R5cGUgPSB7XG4gKiAgIGVuY29kaW5nczogW1xuICogICAgIHtcbiAqICAgICAgIHJpZDogJ3IzJyxcbiAqICAgICAgIG1heEJpdHJhdGU6IDIwMDAwMCwgLy8gTWF4IGJpdHJhdGUgZm9yIHRoaXMgZW5jb2RpbmcgKGluIGJwcylcbiAqICAgICAgIHNjYWxhYmlsaXR5TW9kZTogJ0wxVDMnLCAvLyBTY2FsYWJpbGl0eSBtb2RlIGZvciBlbmNvZGluZ1xuICogICAgICAgc2NhbGVSZXNvbHV0aW9uRG93bkJ5OiA0LjAsIC8vIFNjYWxlIGRvd24gcmVzb2x1dGlvbiBieSB0aGlzIGZhY3RvclxuICogICAgIH0sXG4gKiAgICAge1xuICogICAgICAgcmlkOiAncjQnLFxuICogICAgICAgbWF4Qml0cmF0ZTogNDAwMDAwLFxuICogICAgICAgc2NhbGFiaWxpdHlNb2RlOiAnTDFUMycsXG4gKiAgICAgICBzY2FsZVJlc29sdXRpb25Eb3duQnk6IDIuMCxcbiAqICAgICB9LFxuICogICAgIHtcbiAqICAgICAgIHJpZDogJ3I1JyxcbiAqICAgICAgIG1heEJpdHJhdGU6IDgwMDAwMCxcbiAqICAgICAgIHNjYWxhYmlsaXR5TW9kZTogJ0wxVDMnLFxuICogICAgIH0sXG4gKiAgIF0sXG4gKiAgIGNvZGVjT3B0aW9uczoge1xuICogICAgIHZpZGVvR29vZ2xlU3RhcnRCaXRyYXRlOiAzMjAsIC8vIEluaXRpYWwgYml0cmF0ZSBmb3IgdGhlIEdvb2dsZSBjb2RlY1xuICogICB9LFxuICogfTtcbiAqXG4gKiBAcmVtYXJrc1xuICogVGhlIGRlZmF1bHQgYHZQYXJhbXNgIGluY2x1ZGVzIG11bHRpcGxlIGVuY29kaW5nIGNvbmZpZ3VyYXRpb25zIHdpdGggZGlmZmVyZW50IG1heGltdW0gYml0cmF0ZXMsXG4gKiBhbGxvd2luZyBmb3IgYWRhcHRpdmUgc3RyZWFtaW5nIGJhc2VkIG9uIG5ldHdvcmsgY29uZGl0aW9ucyBhbmQgcGFydGljaXBhbnQgY2FwYWJpbGl0aWVzLlxuICpcbiAqIEByZXR1cm5zIHtWUGFyYW1zVHlwZX0gVGhlIHZpZGVvIHBhcmFtZXRlcnMgZm9yIHVzZSBpbiB2aWRlbyBwcm9kdWNlciBjb25maWd1cmF0aW9uLlxuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFZQYXJhbXMge1xuICB2UGFyYW1zOiBWUGFyYW1zVHlwZSA9IHtcbiAgICBlbmNvZGluZ3M6IFtcbiAgICAgIHtcbiAgICAgICAgcmlkOiAncjMnLFxuICAgICAgICBtYXhCaXRyYXRlOiAyMDAwMDAsXG4gICAgICAgIHNjYWxhYmlsaXR5TW9kZTogJ0wxVDMnLFxuICAgICAgICBzY2FsZVJlc29sdXRpb25Eb3duQnk6IDQuMCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJpZDogJ3I0JyxcbiAgICAgICAgbWF4Qml0cmF0ZTogNDAwMDAwLFxuICAgICAgICBzY2FsYWJpbGl0eU1vZGU6ICdMMVQzJyxcbiAgICAgICAgc2NhbGVSZXNvbHV0aW9uRG93bkJ5OiAyLjAsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICByaWQ6ICdyNScsXG4gICAgICAgIG1heEJpdHJhdGU6IDgwMDAwMCxcbiAgICAgICAgc2NhbGFiaWxpdHlNb2RlOiAnTDFUMycsXG4gICAgICB9LFxuICAgIF0sXG4gICAgY29kZWNPcHRpb25zOiB7XG4gICAgICB2aWRlb0dvb2dsZVN0YXJ0Qml0cmF0ZTogMzIwLFxuICAgIH0sXG4gIH07XG59XG4iXX0=