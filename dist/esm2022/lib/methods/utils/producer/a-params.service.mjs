import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * The `AParams` service provides the encoding parameters for audio production in a media session using the Mediasoup library.
 * It includes a default configuration for RTP encoding parameters, which can be used when creating audio producers.
 *
 * @service
 * @example
 * ```typescript
 * import { AParams } from './path/to/a-params.service';
 *
 * constructor(private aParamsService: AParams) {
 *   console.log(this.aParamsService.aParams);
 * }
 * ```
 *
 * @typedef AParamsType
 * @property {RtpEncodingParameters[]} encodings - Array of RTP encoding parameters for audio.
 * @property {ProducerCodecOptions} [codecOptions] - Optional codec options for the audio producer.
 *
 * @example
 * const aParams: AParamsType = {
 *   encodings: [
 *     {
 *       rid: 'r0',
 *       maxBitrate: 64000, // Max bitrate for the audio stream (in bps)
 *     },
 *   ],
 *   codecOptions: {
 *     // Additional codec options can be defined here
 *   },
 * };
 *
 * @remarks
 * The default `aParams` contains a single encoding with a `rid` of "r0" and a maximum bitrate of 64 kbps.
 * This configuration can be adjusted based on application requirements.
 *
 * @returns {AParamsType} The audio parameters for use in audio producer configuration.
 */
export class AParams {
    aParams = {
        encodings: [
            {
                rid: 'r0',
                maxBitrate: 64000,
            },
        ],
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AParams, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AParams, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AParams, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYS1wYXJhbXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3V0aWxzL3Byb2R1Y2VyL2EtcGFyYW1zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFRM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9DRztBQU1ILE1BQU0sT0FBTyxPQUFPO0lBQ2xCLE9BQU8sR0FBZ0I7UUFDckIsU0FBUyxFQUFFO1lBQ1Q7Z0JBQ0UsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsVUFBVSxFQUFFLEtBQUs7YUFDbEI7U0FDRjtLQUNGLENBQUM7dUdBUlMsT0FBTzsyR0FBUCxPQUFPLGNBRk4sTUFBTTs7MkZBRVAsT0FBTztrQkFIbkIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcm9kdWNlckNvZGVjT3B0aW9ucywgUnRwRW5jb2RpbmdQYXJhbWV0ZXJzIH0gZnJvbSAnbWVkaWFzb3VwLWNsaWVudC9saWIvdHlwZXMnO1xuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQVBhcmFtc1R5cGUgPSB7XG4gIGVuY29kaW5nczogUnRwRW5jb2RpbmdQYXJhbWV0ZXJzW107XG4gIGNvZGVjT3B0aW9ucz86IFByb2R1Y2VyQ29kZWNPcHRpb25zO1xufTtcblxuLyoqXG4gKiBUaGUgYEFQYXJhbXNgIHNlcnZpY2UgcHJvdmlkZXMgdGhlIGVuY29kaW5nIHBhcmFtZXRlcnMgZm9yIGF1ZGlvIHByb2R1Y3Rpb24gaW4gYSBtZWRpYSBzZXNzaW9uIHVzaW5nIHRoZSBNZWRpYXNvdXAgbGlicmFyeS5cbiAqIEl0IGluY2x1ZGVzIGEgZGVmYXVsdCBjb25maWd1cmF0aW9uIGZvciBSVFAgZW5jb2RpbmcgcGFyYW1ldGVycywgd2hpY2ggY2FuIGJlIHVzZWQgd2hlbiBjcmVhdGluZyBhdWRpbyBwcm9kdWNlcnMuXG4gKlxuICogQHNlcnZpY2VcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBBUGFyYW1zIH0gZnJvbSAnLi9wYXRoL3RvL2EtcGFyYW1zLnNlcnZpY2UnO1xuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgYVBhcmFtc1NlcnZpY2U6IEFQYXJhbXMpIHtcbiAqICAgY29uc29sZS5sb2codGhpcy5hUGFyYW1zU2VydmljZS5hUGFyYW1zKTtcbiAqIH1cbiAqIGBgYFxuICpcbiAqIEB0eXBlZGVmIEFQYXJhbXNUeXBlXG4gKiBAcHJvcGVydHkge1J0cEVuY29kaW5nUGFyYW1ldGVyc1tdfSBlbmNvZGluZ3MgLSBBcnJheSBvZiBSVFAgZW5jb2RpbmcgcGFyYW1ldGVycyBmb3IgYXVkaW8uXG4gKiBAcHJvcGVydHkge1Byb2R1Y2VyQ29kZWNPcHRpb25zfSBbY29kZWNPcHRpb25zXSAtIE9wdGlvbmFsIGNvZGVjIG9wdGlvbnMgZm9yIHRoZSBhdWRpbyBwcm9kdWNlci5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgYVBhcmFtczogQVBhcmFtc1R5cGUgPSB7XG4gKiAgIGVuY29kaW5nczogW1xuICogICAgIHtcbiAqICAgICAgIHJpZDogJ3IwJyxcbiAqICAgICAgIG1heEJpdHJhdGU6IDY0MDAwLCAvLyBNYXggYml0cmF0ZSBmb3IgdGhlIGF1ZGlvIHN0cmVhbSAoaW4gYnBzKVxuICogICAgIH0sXG4gKiAgIF0sXG4gKiAgIGNvZGVjT3B0aW9uczoge1xuICogICAgIC8vIEFkZGl0aW9uYWwgY29kZWMgb3B0aW9ucyBjYW4gYmUgZGVmaW5lZCBoZXJlXG4gKiAgIH0sXG4gKiB9O1xuICpcbiAqIEByZW1hcmtzXG4gKiBUaGUgZGVmYXVsdCBgYVBhcmFtc2AgY29udGFpbnMgYSBzaW5nbGUgZW5jb2Rpbmcgd2l0aCBhIGByaWRgIG9mIFwicjBcIiBhbmQgYSBtYXhpbXVtIGJpdHJhdGUgb2YgNjQga2Jwcy5cbiAqIFRoaXMgY29uZmlndXJhdGlvbiBjYW4gYmUgYWRqdXN0ZWQgYmFzZWQgb24gYXBwbGljYXRpb24gcmVxdWlyZW1lbnRzLlxuICpcbiAqIEByZXR1cm5zIHtBUGFyYW1zVHlwZX0gVGhlIGF1ZGlvIHBhcmFtZXRlcnMgZm9yIHVzZSBpbiBhdWRpbyBwcm9kdWNlciBjb25maWd1cmF0aW9uLlxuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEFQYXJhbXMge1xuICBhUGFyYW1zOiBBUGFyYW1zVHlwZSA9IHtcbiAgICBlbmNvZGluZ3M6IFtcbiAgICAgIHtcbiAgICAgICAgcmlkOiAncjAnLFxuICAgICAgICBtYXhCaXRyYXRlOiA2NDAwMCxcbiAgICAgIH0sXG4gICAgXSxcbiAgfTtcbn1cbiJdfQ==