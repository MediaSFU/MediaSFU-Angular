import { types } from 'mediasoup-client';
import * as i0 from "@angular/core";
type RtpCapabilities = types.RtpCapabilities;
type Device = types.Device;
export interface CreateDeviceClientOptions {
    rtpCapabilities: RtpCapabilities | null;
}
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
export declare class CreateDeviceClient {
    /**
     * Creates a mediasoup client device with the provided RTP capabilities.
     *
     * @param {CreateDeviceClientOptions} options - The options for creating the device client.
     * @param {RTPCapabilities} options.rtpCapabilities - The RTP capabilities required for the device.
     * @returns {Promise<Device | null>} A promise that resolves to the created Device or null if creation fails.
     * @throws {Error} Throws an error if the required parameters are not provided or if device creation is not supported.
     *
     */
    createDeviceClient({ rtpCapabilities }: CreateDeviceClientOptions): Promise<Device | null>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CreateDeviceClient, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CreateDeviceClient>;
}
export {};
