import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { GetPipedProducersAltType, GetPipedProducersAltParameters } from '../@types/types';

export interface ReceiveAllPipedTransportsParameters extends GetPipedProducersAltParameters {
  roomName: string;
  member: string;

  // mediasfu functions
  getPipedProducersAlt: GetPipedProducersAltType;
  [key: string]: any;
}

export interface ReceiveAllPipedTransportsOptions {
  nsock: Socket;
  parameters: ReceiveAllPipedTransportsParameters;
}

// Export the type definition for the function
export type ReceiveAllPipedTransportsType = (
  options: ReceiveAllPipedTransportsOptions,
) => Promise<void>;

/**
 * Receives all piped transports by emitting an event to the server and processing the response.
 *
 * This method communicates with the server to request piped transports for a specific room and member.
 * It checks if any producers exist and, if so, iterates through different levels to retrieve piped producers.
 *
 * @param {ReceiveAllPipedTransportsOptions} options - The options for receiving all piped transports.
 * @param {Socket} options.nsock - The socket instance used for communication.
 * @param {ReceiveAllPipedTransportsParameters} options.parameters - The parameters for the operation.
 * @param {string} options.parameters.roomName - The name of the room.
 * @param {string} options.parameters.member - The member identifier.
 * @param {GetPipedProducersAltType} options.parameters.getPipedProducersAlt - The function to get piped producers for a given level.
 *
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 *
 * @throws Will log an error message if the operation fails.
 *
 * @example
 * ```typescript
 * const options = {
 *   nsock: socketInstance,
 *   parameters: {
 *     roomName: 'Room1',
 *     member: 'Member1',
 *     getPipedProducersAlt: getPipedProducersAltFunction,
 *   },
 * };
 *
 * await receiveAllPipedTransports(options);
 * ```
 */

@Injectable({
  providedIn: 'root',
})
export class ReceiveAllPipedTransports {
  /**
   * Receives all piped transports by emitting an event to the server and processing the response.
   *
   * @param {ReceiveAllPipedTransportsOptions} options - The options for receiving all piped transports.
   * @param {any} options.nsock - The socket instance used for communication.
   * @param {Object} options.parameters - The parameters for the operation.
   * @param {string} options.parameters.roomName - The name of the room.
   * @param {string} options.parameters.member - The member identifier.
   * @param {Function} options.parameters.getPipedProducersAlt - The function to get piped producers for a given level.
   *
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   *
   * @throws Will log an error message if the operation fails.
   */
  receiveAllPipedTransports = async ({
    nsock,
    parameters,
  }: ReceiveAllPipedTransportsOptions): Promise<void> => {
    try {
      // Destructure parameters
      const { roomName, member, getPipedProducersAlt } = parameters;

      // Emit createReceiveAllTransportsPiped event to the server
      await new Promise<void>((resolve, reject) => {
        nsock.emit(
          'createReceiveAllTransportsPiped',
          { roomName, member },
          async ({ producersExist }: { producersExist: boolean }) => {
            try {
              // Array of options representing different levels
              const options = ['0', '1', '2'];

              // If producers exist, loop through each level and get producers
              if (producersExist) {
                for (const islevel of options) {
                  await getPipedProducersAlt({ nsock, islevel, parameters });
                }
              }
              resolve();
            } catch (err) {
              reject(err);
            }
          },
        );
      });
    } catch (error) {
      console.log('receiveAllPipedTransports error', error);
      // throw error;
    }
  };
}
