import { Injectable } from '@angular/core';
import { RtpCapabilities, Device } from 'mediasoup-client/lib/types';
import * as mediasoupClient from 'mediasoup-client';
export interface CreateDeviceClientOptions {
  rtpCapabilities: RtpCapabilities | null;
}

// Export the type definition for the function
export type CreateDeviceClientType = (options: CreateDeviceClientOptions) => Promise<Device | null>;

@Injectable({
  providedIn: 'root',
})
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

  async createDeviceClient({ rtpCapabilities }: CreateDeviceClientOptions): Promise<Device | null> {
    try {
      // Validate input parameters
      if (!rtpCapabilities || !mediasoupClient) {
        throw new Error('Both rtpCapabilities and mediasoupClient must be provided.');
      }

      // Create a mediasoup client device
      const device: Device = new mediasoupClient.Device();

      // Remove orientation capabilities
      if (rtpCapabilities.headerExtensions) {
        rtpCapabilities.headerExtensions = rtpCapabilities.headerExtensions.filter(
          (ext) => ext.uri !== 'urn:3gpp:video-orientation',
        );
      }

      // Load the provided RTP capabilities into the device
      await device.load({
        routerRtpCapabilities: rtpCapabilities,
      });

      // Perform additional initialization, e.g., loading spinner and retrieving messages

      return device;
    } catch (error: any) {
      // Handle specific errors, e.g., UnsupportedError
      if (error.name === 'UnsupportedError') {
        // Handle unsupported device creation
        console.error('UnsupportedError: Device creation is not supported by the browser.');
      }

      throw error; // Propagate other errors
    }
  }
}
