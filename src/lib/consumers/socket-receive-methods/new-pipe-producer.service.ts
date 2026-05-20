import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import {
  ReorderStreamsParameters,
  ReorderStreamsType,
  SignalNewConsumerTransportParameters,
  ConnectRecvTransportParameters,
  ConnectRecvTransportType,
  ShowAlert,
} from '../../@types/types';
import { types } from 'mediasoup-client';
import { newPipeProducer as sharedNewPipeProducer } from 'mediasfu-shared';
type Device = types.Device;

export interface NewPipeProducerParameters
  extends ReorderStreamsParameters,
    SignalNewConsumerTransportParameters,
    ConnectRecvTransportParameters {
  first_round: boolean;
  shareScreenStarted: boolean;
  shared: boolean;
  landScaped: boolean;
  showAlert?: ShowAlert;
  isWideScreen: boolean;
  updateFirst_round: (firstRound: boolean) => void;
  updateLandScaped: (landScaped: boolean) => void;
  device: Device | null;
  consumingTransports: string[];
  lock_screen: boolean;
  updateConsumingTransports: (transports: string[]) => void;

  // mediasfu functions
  connectRecvTransport: ConnectRecvTransportType;
  reorderStreams: ReorderStreamsType;
  getUpdatedAllParams: () => NewPipeProducerParameters;
  [key: string]: any;
}

export interface NewPipeProducerOptions {
  producerId: string;
  islevel: string;
  nsock: Socket;
  parameters: NewPipeProducerParameters;
}

// Export the type definition for the function
export type NewPipeProducerType = (options: NewPipeProducerOptions) => Promise<void>;

/**
 * @service NewPipeProducer
 * @description Service to manage new pipe producer events, update state, and handle screen orientation for optimal experience.
 *
 * @method newPipeProducer
 * Handles the setup of a new pipe producer and manages user notifications or orientation changes as needed.
 *
 * @param {NewPipeProducerOptions} options - Options for setting up a new pipe producer.
 * @param {string} options.producerId - Unique ID for the new producer.
 * @param {string} options.islevel - Level designation for the producer.
 * @param {Socket} options.nsock - The socket used for communication.
 * @param {NewPipeProducerParameters} options.parameters - Parameters to configure the new pipe producer.
 *
 * @returns {Promise<void>} A promise that completes when the new pipe producer is set up.
 *
 * @example
 * ```typescript
 * await newPipeProducerService.newPipeProducer({
 *   producerId: 'producer123',
 *   islevel: '2',
 *   nsock: mySocket,
 *   parameters: {
 *     first_round: true,
 *     shareScreenStarted: false,
 *     shared: false,
 *     landScaped: false,
 *     showAlert: alertFunction,
 *     isWideScreen: true,
 *     updateFirst_round: updateFirstRoundFunction,
 *     updateLandScaped: updateLandScapedFunction,
 *     device: myDevice,
 *     consumingTransports: [],
 *     connectRecvTransport: connectRecvTransportFunction,
 *     reorderStreams: reorderStreamsFunction,
 *     getUpdatedAllParams: getUpdatedParamsFunction,
 *   }
 * });
 * ```
 */

@Injectable({
  providedIn: 'root',
})
export class NewPipeProducer {
  async newPipeProducer({
    producerId,
    islevel,
    nsock,
    parameters,
  }: NewPipeProducerOptions): Promise<void> {
    return sharedNewPipeProducer({
      producerId,
      islevel,
      nsock,
      parameters,
    } as unknown as Parameters<typeof sharedNewPipeProducer>[0]) as Promise<void>;
  }
}
