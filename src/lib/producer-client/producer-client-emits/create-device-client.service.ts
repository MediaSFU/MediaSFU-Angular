import { Injectable } from '@angular/core';
import { types } from 'mediasoup-client';
type RtpCapabilities = types.RtpCapabilities;
type Device = types.Device;
import { createDeviceClient as sharedCreateDeviceClient } from 'mediasfu-shared';
export interface CreateDeviceClientOptions {
  rtpCapabilities: RtpCapabilities | null;
}

// Export the type definition for the function
export type CreateDeviceClientType = (options: CreateDeviceClientOptions) => Promise<Device | null>;

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

@Injectable({
  providedIn: 'root',
})
export class CreateDeviceClient {
  async createDeviceClient({ rtpCapabilities }: CreateDeviceClientOptions): Promise<Device | null> {
    return sharedCreateDeviceClient(
      { rtpCapabilities } as unknown as Parameters<typeof sharedCreateDeviceClient>[0],
    ) as unknown as Promise<Device | null>;
  }
}
