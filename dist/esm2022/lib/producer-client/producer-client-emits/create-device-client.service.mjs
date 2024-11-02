import { Injectable } from '@angular/core';
import * as mediasoupClient from 'mediasoup-client';
import * as i0 from "@angular/core";
/**
 * Creates a mediasoup client device using the provided RTP capabilities.
 *
 * @param {CreateDeviceClientOptions} options - Options containing the required RTP capabilities.
 * @param {RtpCapabilities | null} options.rtpCapabilities - The RTP capabilities necessary for initializing the device.
 * @returns {Promise<Device | null>} - A promise resolving to the created `Device` instance or `null` if creation fails.
 * @throws {Error} - Throws an error if RTP capabilities or the mediasoup client library are not provided, or if the device is unsupported by the browser.
 *
 * This function initializes a mediasoup client `Device` using the specified RTP capabilities, enabling communication capabilities according to provided media configurations. It filters out unsupported video orientation extensions and loads router capabilities, ensuring compatibility with client configurations.
 *
 * @example
 * ```typescript
 * const client = new CreateDeviceClient();
 * const device = await client.createDeviceClient({ rtpCapabilities });
 * if (device) {
 *   console.log('Device created successfully:', device);
 * } else {
 *   console.log('Failed to create device.');
 * }
 * ```
 *
 * In this example, the function creates a device based on RTP capabilities, handling errors and unsupported devices gracefully.
 */
export class CreateDeviceClient {
    /**
     * Creates a mediasoup client device with the provided RTP capabilities.
     *
     * @param {CreateDeviceClientOptions} options - The options for creating the device client.
     * @param {RTPCapabilities} options.rtpCapabilities - The RTP capabilities required for the device.
     * @returns {Promise<Device | null>} A promise that resolves to the created Device or null if creation fails.
     * @throws {Error} Throws an error if the required parameters are not provided or if device creation is not supported.
     *
     */
    async createDeviceClient({ rtpCapabilities }) {
        try {
            // Validate input parameters
            if (!rtpCapabilities || !mediasoupClient) {
                throw new Error('Both rtpCapabilities and mediasoupClient must be provided.');
            }
            // Create a mediasoup client device
            const device = new mediasoupClient.Device();
            // Remove orientation capabilities
            if (rtpCapabilities.headerExtensions) {
                rtpCapabilities.headerExtensions = rtpCapabilities.headerExtensions.filter((ext) => ext.uri !== 'urn:3gpp:video-orientation');
            }
            // Load the provided RTP capabilities into the device
            await device.load({
                routerRtpCapabilities: rtpCapabilities,
            });
            // Perform additional initialization, e.g., loading spinner and retrieving messages
            return device;
        }
        catch (error) {
            // Handle specific errors, e.g., UnsupportedError
            if (error.name === 'UnsupportedError') {
                // Handle unsupported device creation
                console.error('UnsupportedError: Device creation is not supported by the browser.');
            }
            throw error; // Propagate other errors
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CreateDeviceClient, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CreateDeviceClient, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CreateDeviceClient, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWRldmljZS1jbGllbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9wcm9kdWNlci1jbGllbnQvcHJvZHVjZXItY2xpZW50LWVtaXRzL2NyZWF0ZS1kZXZpY2UtY2xpZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEtBQUssZUFBZSxNQUFNLGtCQUFrQixDQUFDOztBQVFwRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUtILE1BQU0sT0FBTyxrQkFBa0I7SUFDN0I7Ozs7Ozs7O09BUUc7SUFFSCxLQUFLLENBQUMsa0JBQWtCLENBQUMsRUFBRSxlQUFlLEVBQTZCO1FBQ3JFLElBQUksQ0FBQztZQUNILDRCQUE0QjtZQUM1QixJQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQUMsNERBQTRELENBQUMsQ0FBQztZQUNoRixDQUFDO1lBRUQsbUNBQW1DO1lBQ25DLE1BQU0sTUFBTSxHQUFXLElBQUksZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRXBELGtDQUFrQztZQUNsQyxJQUFJLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUNyQyxlQUFlLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FDeEUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssNEJBQTRCLENBQ2xELENBQUM7WUFDSixDQUFDO1lBRUQscURBQXFEO1lBQ3JELE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDaEIscUJBQXFCLEVBQUUsZUFBZTthQUN2QyxDQUFDLENBQUM7WUFFSCxtRkFBbUY7WUFFbkYsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztRQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7WUFDcEIsaURBQWlEO1lBQ2pELElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxrQkFBa0IsRUFBRSxDQUFDO2dCQUN0QyxxQ0FBcUM7Z0JBQ3JDLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0VBQW9FLENBQUMsQ0FBQztZQUN0RixDQUFDO1lBRUQsTUFBTSxLQUFLLENBQUMsQ0FBQyx5QkFBeUI7UUFDeEMsQ0FBQztJQUNILENBQUM7dUdBN0NVLGtCQUFrQjsyR0FBbEIsa0JBQWtCLGNBRmpCLE1BQU07OzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSdHBDYXBhYmlsaXRpZXMsIERldmljZSB9IGZyb20gJ21lZGlhc291cC1jbGllbnQvbGliL3R5cGVzJztcbmltcG9ydCAqIGFzIG1lZGlhc291cENsaWVudCBmcm9tICdtZWRpYXNvdXAtY2xpZW50JztcbmV4cG9ydCBpbnRlcmZhY2UgQ3JlYXRlRGV2aWNlQ2xpZW50T3B0aW9ucyB7XG4gIHJ0cENhcGFiaWxpdGllczogUnRwQ2FwYWJpbGl0aWVzIHwgbnVsbDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQ3JlYXRlRGV2aWNlQ2xpZW50VHlwZSA9IChvcHRpb25zOiBDcmVhdGVEZXZpY2VDbGllbnRPcHRpb25zKSA9PiBQcm9taXNlPERldmljZSB8IG51bGw+O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtZWRpYXNvdXAgY2xpZW50IGRldmljZSB1c2luZyB0aGUgcHJvdmlkZWQgUlRQIGNhcGFiaWxpdGllcy5cbiAqXG4gKiBAcGFyYW0ge0NyZWF0ZURldmljZUNsaWVudE9wdGlvbnN9IG9wdGlvbnMgLSBPcHRpb25zIGNvbnRhaW5pbmcgdGhlIHJlcXVpcmVkIFJUUCBjYXBhYmlsaXRpZXMuXG4gKiBAcGFyYW0ge1J0cENhcGFiaWxpdGllcyB8IG51bGx9IG9wdGlvbnMucnRwQ2FwYWJpbGl0aWVzIC0gVGhlIFJUUCBjYXBhYmlsaXRpZXMgbmVjZXNzYXJ5IGZvciBpbml0aWFsaXppbmcgdGhlIGRldmljZS5cbiAqIEByZXR1cm5zIHtQcm9taXNlPERldmljZSB8IG51bGw+fSAtIEEgcHJvbWlzZSByZXNvbHZpbmcgdG8gdGhlIGNyZWF0ZWQgYERldmljZWAgaW5zdGFuY2Ugb3IgYG51bGxgIGlmIGNyZWF0aW9uIGZhaWxzLlxuICogQHRocm93cyB7RXJyb3J9IC0gVGhyb3dzIGFuIGVycm9yIGlmIFJUUCBjYXBhYmlsaXRpZXMgb3IgdGhlIG1lZGlhc291cCBjbGllbnQgbGlicmFyeSBhcmUgbm90IHByb3ZpZGVkLCBvciBpZiB0aGUgZGV2aWNlIGlzIHVuc3VwcG9ydGVkIGJ5IHRoZSBicm93c2VyLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gaW5pdGlhbGl6ZXMgYSBtZWRpYXNvdXAgY2xpZW50IGBEZXZpY2VgIHVzaW5nIHRoZSBzcGVjaWZpZWQgUlRQIGNhcGFiaWxpdGllcywgZW5hYmxpbmcgY29tbXVuaWNhdGlvbiBjYXBhYmlsaXRpZXMgYWNjb3JkaW5nIHRvIHByb3ZpZGVkIG1lZGlhIGNvbmZpZ3VyYXRpb25zLiBJdCBmaWx0ZXJzIG91dCB1bnN1cHBvcnRlZCB2aWRlbyBvcmllbnRhdGlvbiBleHRlbnNpb25zIGFuZCBsb2FkcyByb3V0ZXIgY2FwYWJpbGl0aWVzLCBlbnN1cmluZyBjb21wYXRpYmlsaXR5IHdpdGggY2xpZW50IGNvbmZpZ3VyYXRpb25zLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBjbGllbnQgPSBuZXcgQ3JlYXRlRGV2aWNlQ2xpZW50KCk7XG4gKiBjb25zdCBkZXZpY2UgPSBhd2FpdCBjbGllbnQuY3JlYXRlRGV2aWNlQ2xpZW50KHsgcnRwQ2FwYWJpbGl0aWVzIH0pO1xuICogaWYgKGRldmljZSkge1xuICogICBjb25zb2xlLmxvZygnRGV2aWNlIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5OicsIGRldmljZSk7XG4gKiB9IGVsc2Uge1xuICogICBjb25zb2xlLmxvZygnRmFpbGVkIHRvIGNyZWF0ZSBkZXZpY2UuJyk7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBJbiB0aGlzIGV4YW1wbGUsIHRoZSBmdW5jdGlvbiBjcmVhdGVzIGEgZGV2aWNlIGJhc2VkIG9uIFJUUCBjYXBhYmlsaXRpZXMsIGhhbmRsaW5nIGVycm9ycyBhbmQgdW5zdXBwb3J0ZWQgZGV2aWNlcyBncmFjZWZ1bGx5LlxuICovXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDcmVhdGVEZXZpY2VDbGllbnQge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG1lZGlhc291cCBjbGllbnQgZGV2aWNlIHdpdGggdGhlIHByb3ZpZGVkIFJUUCBjYXBhYmlsaXRpZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7Q3JlYXRlRGV2aWNlQ2xpZW50T3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBjcmVhdGluZyB0aGUgZGV2aWNlIGNsaWVudC5cbiAgICogQHBhcmFtIHtSVFBDYXBhYmlsaXRpZXN9IG9wdGlvbnMucnRwQ2FwYWJpbGl0aWVzIC0gVGhlIFJUUCBjYXBhYmlsaXRpZXMgcmVxdWlyZWQgZm9yIHRoZSBkZXZpY2UuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPERldmljZSB8IG51bGw+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgY3JlYXRlZCBEZXZpY2Ugb3IgbnVsbCBpZiBjcmVhdGlvbiBmYWlscy5cbiAgICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGUgcmVxdWlyZWQgcGFyYW1ldGVycyBhcmUgbm90IHByb3ZpZGVkIG9yIGlmIGRldmljZSBjcmVhdGlvbiBpcyBub3Qgc3VwcG9ydGVkLlxuICAgKlxuICAgKi9cblxuICBhc3luYyBjcmVhdGVEZXZpY2VDbGllbnQoeyBydHBDYXBhYmlsaXRpZXMgfTogQ3JlYXRlRGV2aWNlQ2xpZW50T3B0aW9ucyk6IFByb21pc2U8RGV2aWNlIHwgbnVsbD4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBWYWxpZGF0ZSBpbnB1dCBwYXJhbWV0ZXJzXG4gICAgICBpZiAoIXJ0cENhcGFiaWxpdGllcyB8fCAhbWVkaWFzb3VwQ2xpZW50KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQm90aCBydHBDYXBhYmlsaXRpZXMgYW5kIG1lZGlhc291cENsaWVudCBtdXN0IGJlIHByb3ZpZGVkLicpO1xuICAgICAgfVxuXG4gICAgICAvLyBDcmVhdGUgYSBtZWRpYXNvdXAgY2xpZW50IGRldmljZVxuICAgICAgY29uc3QgZGV2aWNlOiBEZXZpY2UgPSBuZXcgbWVkaWFzb3VwQ2xpZW50LkRldmljZSgpO1xuXG4gICAgICAvLyBSZW1vdmUgb3JpZW50YXRpb24gY2FwYWJpbGl0aWVzXG4gICAgICBpZiAocnRwQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMpIHtcbiAgICAgICAgcnRwQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMgPSBydHBDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucy5maWx0ZXIoXG4gICAgICAgICAgKGV4dCkgPT4gZXh0LnVyaSAhPT0gJ3VybjozZ3BwOnZpZGVvLW9yaWVudGF0aW9uJyxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gTG9hZCB0aGUgcHJvdmlkZWQgUlRQIGNhcGFiaWxpdGllcyBpbnRvIHRoZSBkZXZpY2VcbiAgICAgIGF3YWl0IGRldmljZS5sb2FkKHtcbiAgICAgICAgcm91dGVyUnRwQ2FwYWJpbGl0aWVzOiBydHBDYXBhYmlsaXRpZXMsXG4gICAgICB9KTtcblxuICAgICAgLy8gUGVyZm9ybSBhZGRpdGlvbmFsIGluaXRpYWxpemF0aW9uLCBlLmcuLCBsb2FkaW5nIHNwaW5uZXIgYW5kIHJldHJpZXZpbmcgbWVzc2FnZXNcblxuICAgICAgcmV0dXJuIGRldmljZTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAvLyBIYW5kbGUgc3BlY2lmaWMgZXJyb3JzLCBlLmcuLCBVbnN1cHBvcnRlZEVycm9yXG4gICAgICBpZiAoZXJyb3IubmFtZSA9PT0gJ1Vuc3VwcG9ydGVkRXJyb3InKSB7XG4gICAgICAgIC8vIEhhbmRsZSB1bnN1cHBvcnRlZCBkZXZpY2UgY3JlYXRpb25cbiAgICAgICAgY29uc29sZS5lcnJvcignVW5zdXBwb3J0ZWRFcnJvcjogRGV2aWNlIGNyZWF0aW9uIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGJyb3dzZXIuJyk7XG4gICAgICB9XG5cbiAgICAgIHRocm93IGVycm9yOyAvLyBQcm9wYWdhdGUgb3RoZXIgZXJyb3JzXG4gICAgfVxuICB9XG59XG4iXX0=