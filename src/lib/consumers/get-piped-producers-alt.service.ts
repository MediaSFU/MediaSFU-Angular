// piped-producers.service.ts
import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';

import {
  SignalNewConsumerTransportParameters,
  SignalNewConsumerTransportType,
} from '../@types/types';

export interface GetPipedProducersAltParameters extends SignalNewConsumerTransportParameters {
  member: string;

  // mediasfu functions
  signalNewConsumerTransport: SignalNewConsumerTransportType;
  [key: string]: any;
}

export interface GetPipedProducersAltOptions {
  nsock: Socket;
  islevel: string;
  parameters: GetPipedProducersAltParameters;
}

// Export the type definition for the function
export type GetPipedProducersAltType = (options: GetPipedProducersAltOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class GetPipedProducersAlt {
  /**
   * Retrieves piped producers and signals new consumer transport for each retrieved producer.
   *
   * @param {Object} options - The options for retrieving piped producers.
   * @param {WebSocket} options.nsock - The WebSocket instance used for communication.
   * @param {boolean} options.islevel - A flag indicating the level of the request.
   * @param {Object} options.parameters - Additional parameters for the request.
   * @param {string} options.parameters.member - The member identifier.
   * @param {Function} options.parameters.signalNewConsumerTransport - A function to signal new consumer transport.
   *
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   *
   * @throws {Error} If an error occurs during the process of retrieving producers.
   */
  async getPipedProducersAlt({
    nsock,
    islevel,
    parameters,
  }: GetPipedProducersAltOptions): Promise<void> {
    try {
      // Destructure parameters
      const { member, signalNewConsumerTransport } = parameters;

      // Emit request to get piped producers using WebSocket
      nsock.emit('getProducersPipedAlt', { islevel, member }, async (producerIds: string[]) => {
        // Check if producers are retrieved
        if (producerIds.length > 0) {
          // Signal new consumer transport for each retrieved producer
          for (const id of producerIds) {
            await signalNewConsumerTransport({ nsock, remoteProducerId: id, islevel, parameters });
          }
        }
      });
    } catch (error: any) {
      // Handle errors during the process of retrieving producers
      console.log('Error getting piped producers:', error.message);
      // throw error;
    }
  }
}
