import { Injectable } from '@angular/core';
import { SignalNewConsumerTransport } from '../signal-new-consumer-transport.service';
import { Socket } from 'socket.io-client';
import {
  ReorderStreamsParameters,
  ReorderStreamsType,
  SignalNewConsumerTransportParameters,
  ConnectRecvTransportParameters,
  ConnectRecvTransportType,
  ShowAlert,
} from '../../@types/types';
import { Device } from 'mediasoup-client/lib/types';

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
  constructor(private signalNewConsumerTransportService: SignalNewConsumerTransport) {}

  /**
   * Handles new pipe producer events and updates relevant states.
   * @param {Object} options - The options object containing necessary variables.
   * @param {string} options.producerId - The ID of the producer.
   * @param {string} options.islevel - The level of the producer.
   * @param {any} options.nsock - The socket object.
   * @param {any} options.parameters - Additional parameters required for the function.
   * @returns {Promise<void>}
   */
  newPipeProducer = async ({
    producerId,
    islevel,
    nsock,
    parameters,
  }: NewPipeProducerOptions): Promise<void> => {
    let {
      first_round,
      shareScreenStarted,
      shared,
      landScaped,
      showAlert,
      isWideScreen,
      updateFirst_round,
      updateLandScaped,
    } = parameters;

    try {
      // Perform signaling for new consumer transport
      await this.signalNewConsumerTransportService.signalNewConsumerTransport({
        remoteProducerId: producerId,
        islevel: islevel,
        nsock: nsock,
        parameters: parameters,
      });

      first_round = false;
      if (shareScreenStarted || shared) {
        if (!isWideScreen) {
          if (!landScaped) {
            if (showAlert) {
              showAlert({
                message: 'Please rotate your device to landscape mode for better experience',
                type: 'success',
                duration: 3000,
              });
            }
            landScaped = true;
            updateLandScaped(landScaped);
          }
        }

        first_round = true;
        updateFirst_round(first_round);
      }
    } catch (error) {
      console.error('Error in newPipeProducer:', error);
      throw new Error('Failed to handle new pipe producer event.');
    }
  };
}
