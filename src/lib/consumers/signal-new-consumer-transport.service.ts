import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import {
  ReorderStreamsParameters,
  ReorderStreamsType,
  ConnectRecvTransportType,
  ConnectRecvTransportParameters,
  CreateWebRTCTransportResponse,
} from '../@types/types';
import { Device, DtlsParameters } from 'mediasoup-client/lib/types';

export interface SignalNewConsumerTransportParameters
  extends ReorderStreamsParameters,
    ConnectRecvTransportParameters {
  device: Device | null;
  consumingTransports: string[];
  lock_screen: boolean;
  updateConsumingTransports: (transports: string[]) => void;
  connectRecvTransport: ConnectRecvTransportType;
  reorderStreams: ReorderStreamsType;
  getUpdatedAllParams: () => SignalNewConsumerTransportParameters;
  [key: string]: any;
}

export interface SignalNewConsumerTransportOptions {
  remoteProducerId: string;
  islevel: string;
  nsock: Socket;
  parameters: SignalNewConsumerTransportParameters;
}

// Export the type definition for the function
export type SignalNewConsumerTransportType = (
  options: SignalNewConsumerTransportOptions,
) => Promise<string[] | void>;

/**
   * Signals the creation of a new consumer transport.
   *
   * @param {Object} options - The options for signaling a new consumer transport.
   * @param {string} options.remoteProducerId - The ID of the remote producer.
   * @param {boolean} options.islevel - Indicates the level of the consumer.
   * @param {any} options.nsock - The socket instance for communication.
   * @param {SignalNewConsumerTransportOptions} options.parameters - The parameters for the transport.
   *
   * @returns {Promise<string[] | void>} A promise that resolves to an array of consuming transports or void.
   *
   * @throws Will throw an error if the signaling process fails.
   *
   * @example
   * const options = {
   *   remoteProducerId: 'producer-id',
   *   islevel: true,
   *   nsock: socketInstance,
   *   parameters: {
   *     device: mediaDevice,
   *     consumingTransports: [],
   *     lock_screen: false,
   *     updateConsumingTransports: updateFunction,
   *     connectRecvTransport: connectFunction,
   *     reorderStreams: reorderFunction,
   *     getUpdatedAllParams: getUpdatedParamsFunction,
   *   },
   * };
   *
   * signalNewConsumerTransport(options)
   *   .then(consumingTransports => {
   *     console.log('Consuming Transports:', consumingTransports);
   *   })
   *   .catch(error => {
   *     console.error('Error signaling new consumer transport:', error);
   *   });
   */
@Injectable({
  providedIn: 'root',
})
export class SignalNewConsumerTransport {

  signalNewConsumerTransport = async ({
    remoteProducerId,
    islevel,
    nsock,
    parameters,
  }: SignalNewConsumerTransportOptions): Promise<string[] | void> => {
    try {
      let {
        device,
        consumingTransports,
        lock_screen,
        updateConsumingTransports,
        connectRecvTransport,
        reorderStreams,
      } = parameters;

      // Get updated parameters
      const updatedParams = parameters.getUpdatedAllParams();
      device = updatedParams.device;
      consumingTransports = updatedParams.consumingTransports;

      // Check if already consuming
      if (consumingTransports.includes(remoteProducerId)) {
        return consumingTransports;
      }

      // Add remote producer ID to consumingTransports array
      consumingTransports.push(remoteProducerId);
      updateConsumingTransports(consumingTransports);

      // Emit createWebRtcTransport event to signal a new consumer
      nsock.emit(
        'createWebRtcTransport',
        { consumer: true, islevel },
        async ({ params }: { params: CreateWebRTCTransportResponse }) => {
          if (params.error) {
            // Handle error
            return;
          }

          try {
            // Create a new receiving transport using the received parameters
            if (!device) {
              throw new Error('Device is not initialized');
            }
            const consumerTransport = device.createRecvTransport({ ...params });

            // Handle 'connect' event for the consumer transport
            consumerTransport.on(
              'connect',
              async (
                { dtlsParameters }: { dtlsParameters: DtlsParameters },
                callback: () => void,
                errback: (error: any) => void,
              ) => {
                try {
                  // Emit transport-recv-connect event to signal connection
                  nsock.emit('transport-recv-connect', {
                    dtlsParameters,
                    serverConsumerTransportId: params.id,
                  });
                  callback();
                } catch (error) {
                  errback(error);
                }
              },
            );

            // Listen for connection state change
            consumerTransport.on('connectionstatechange', async (state: string) => {
              switch (state) {
                case 'connecting':
                  // Handle connecting state
                  break;

                case 'connected':
                  // Handle connected state
                  break;

                case 'failed':
                  // Handle failed state
                  consumerTransport.close();

                  // Reorder streams based on conditions
                  if (lock_screen) {
                    await reorderStreams({ add: true, parameters });
                  } else {
                    await reorderStreams({ add: false, parameters });
                  }
                  break;

                default:
                  break;
              }
            });

            // Connect the receiving transport
            await connectRecvTransport({
              consumerTransport,
              remoteProducerId,
              serverConsumerTransportId: params.id,
              nsock,
              parameters,
            });
          } catch (error) {
            console.log(error, 'createRecvTransport error');
            // Handle error
            return;
          }
        },
      );
    } catch (error) {
      console.log(error, 'signalNewConsumerTransport error');
      // Handle error
      return;
    }
  };
}
