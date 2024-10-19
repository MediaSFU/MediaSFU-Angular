import { Injectable } from '@angular/core';
import * as mediasoupClient from 'mediasoup-client';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWRldmljZS1jbGllbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9wcm9kdWNlci1jbGllbnQvcHJvZHVjZXItY2xpZW50LWVtaXRzL2NyZWF0ZS1kZXZpY2UtY2xpZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEtBQUssZUFBZSxNQUFNLGtCQUFrQixDQUFDOztBQVdwRCxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCOzs7Ozs7OztPQVFHO0lBRUgsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsZUFBZSxFQUE2QjtRQUNyRSxJQUFJLENBQUM7WUFDSCw0QkFBNEI7WUFDNUIsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN6QyxNQUFNLElBQUksS0FBSyxDQUFDLDREQUE0RCxDQUFDLENBQUM7WUFDaEYsQ0FBQztZQUVELG1DQUFtQztZQUNuQyxNQUFNLE1BQU0sR0FBVyxJQUFJLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUVwRCxrQ0FBa0M7WUFDbEMsSUFBSSxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDckMsZUFBZSxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQ3hFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLDRCQUE0QixDQUNsRCxDQUFDO1lBQ0osQ0FBQztZQUVELHFEQUFxRDtZQUNyRCxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLHFCQUFxQixFQUFFLGVBQWU7YUFDdkMsQ0FBQyxDQUFDO1lBRUgsbUZBQW1GO1lBRW5GLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7UUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1lBQ3BCLGlEQUFpRDtZQUNqRCxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssa0JBQWtCLEVBQUUsQ0FBQztnQkFDdEMscUNBQXFDO2dCQUNyQyxPQUFPLENBQUMsS0FBSyxDQUFDLG9FQUFvRSxDQUFDLENBQUM7WUFDdEYsQ0FBQztZQUVELE1BQU0sS0FBSyxDQUFDLENBQUMseUJBQXlCO1FBQ3hDLENBQUM7SUFDSCxDQUFDO3VHQTdDVSxrQkFBa0I7MkdBQWxCLGtCQUFrQixjQUZqQixNQUFNOzsyRkFFUCxrQkFBa0I7a0JBSDlCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUnRwQ2FwYWJpbGl0aWVzLCBEZXZpY2UgfSBmcm9tICdtZWRpYXNvdXAtY2xpZW50L2xpYi90eXBlcyc7XG5pbXBvcnQgKiBhcyBtZWRpYXNvdXBDbGllbnQgZnJvbSAnbWVkaWFzb3VwLWNsaWVudCc7XG5leHBvcnQgaW50ZXJmYWNlIENyZWF0ZURldmljZUNsaWVudE9wdGlvbnMge1xuICBydHBDYXBhYmlsaXRpZXM6IFJ0cENhcGFiaWxpdGllcyB8IG51bGw7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENyZWF0ZURldmljZUNsaWVudFR5cGUgPSAob3B0aW9uczogQ3JlYXRlRGV2aWNlQ2xpZW50T3B0aW9ucykgPT4gUHJvbWlzZTxEZXZpY2UgfCBudWxsPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENyZWF0ZURldmljZUNsaWVudCB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbWVkaWFzb3VwIGNsaWVudCBkZXZpY2Ugd2l0aCB0aGUgcHJvdmlkZWQgUlRQIGNhcGFiaWxpdGllcy5cbiAgICpcbiAgICogQHBhcmFtIHtDcmVhdGVEZXZpY2VDbGllbnRPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRoZSBkZXZpY2UgY2xpZW50LlxuICAgKiBAcGFyYW0ge1JUUENhcGFiaWxpdGllc30gb3B0aW9ucy5ydHBDYXBhYmlsaXRpZXMgLSBUaGUgUlRQIGNhcGFiaWxpdGllcyByZXF1aXJlZCBmb3IgdGhlIGRldmljZS5cbiAgICogQHJldHVybnMge1Byb21pc2U8RGV2aWNlIHwgbnVsbD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBjcmVhdGVkIERldmljZSBvciBudWxsIGlmIGNyZWF0aW9uIGZhaWxzLlxuICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZSByZXF1aXJlZCBwYXJhbWV0ZXJzIGFyZSBub3QgcHJvdmlkZWQgb3IgaWYgZGV2aWNlIGNyZWF0aW9uIGlzIG5vdCBzdXBwb3J0ZWQuXG4gICAqXG4gICAqL1xuXG4gIGFzeW5jIGNyZWF0ZURldmljZUNsaWVudCh7IHJ0cENhcGFiaWxpdGllcyB9OiBDcmVhdGVEZXZpY2VDbGllbnRPcHRpb25zKTogUHJvbWlzZTxEZXZpY2UgfCBudWxsPiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFZhbGlkYXRlIGlucHV0IHBhcmFtZXRlcnNcbiAgICAgIGlmICghcnRwQ2FwYWJpbGl0aWVzIHx8ICFtZWRpYXNvdXBDbGllbnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCb3RoIHJ0cENhcGFiaWxpdGllcyBhbmQgbWVkaWFzb3VwQ2xpZW50IG11c3QgYmUgcHJvdmlkZWQuJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIENyZWF0ZSBhIG1lZGlhc291cCBjbGllbnQgZGV2aWNlXG4gICAgICBjb25zdCBkZXZpY2U6IERldmljZSA9IG5ldyBtZWRpYXNvdXBDbGllbnQuRGV2aWNlKCk7XG5cbiAgICAgIC8vIFJlbW92ZSBvcmllbnRhdGlvbiBjYXBhYmlsaXRpZXNcbiAgICAgIGlmIChydHBDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucykge1xuICAgICAgICBydHBDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucyA9IHJ0cENhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zLmZpbHRlcihcbiAgICAgICAgICAoZXh0KSA9PiBleHQudXJpICE9PSAndXJuOjNncHA6dmlkZW8tb3JpZW50YXRpb24nLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBMb2FkIHRoZSBwcm92aWRlZCBSVFAgY2FwYWJpbGl0aWVzIGludG8gdGhlIGRldmljZVxuICAgICAgYXdhaXQgZGV2aWNlLmxvYWQoe1xuICAgICAgICByb3V0ZXJSdHBDYXBhYmlsaXRpZXM6IHJ0cENhcGFiaWxpdGllcyxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBQZXJmb3JtIGFkZGl0aW9uYWwgaW5pdGlhbGl6YXRpb24sIGUuZy4sIGxvYWRpbmcgc3Bpbm5lciBhbmQgcmV0cmlldmluZyBtZXNzYWdlc1xuXG4gICAgICByZXR1cm4gZGV2aWNlO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIC8vIEhhbmRsZSBzcGVjaWZpYyBlcnJvcnMsIGUuZy4sIFVuc3VwcG9ydGVkRXJyb3JcbiAgICAgIGlmIChlcnJvci5uYW1lID09PSAnVW5zdXBwb3J0ZWRFcnJvcicpIHtcbiAgICAgICAgLy8gSGFuZGxlIHVuc3VwcG9ydGVkIGRldmljZSBjcmVhdGlvblxuICAgICAgICBjb25zb2xlLmVycm9yKCdVbnN1cHBvcnRlZEVycm9yOiBEZXZpY2UgY3JlYXRpb24gaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYnJvd3Nlci4nKTtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgZXJyb3I7IC8vIFByb3BhZ2F0ZSBvdGhlciBlcnJvcnNcbiAgICB9XG4gIH1cbn1cbiJdfQ==