import { RtpCapabilities, Device } from 'mediasoup-client/lib/types';
import * as i0 from "@angular/core";
export interface CreateDeviceClientOptions {
    rtpCapabilities: RtpCapabilities | null;
}
export type CreateDeviceClientType = (options: CreateDeviceClientOptions) => Promise<Device | null>;
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
