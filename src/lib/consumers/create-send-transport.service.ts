import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { Device, Transport, DtlsParameters } from 'mediasoup-client/lib/types';
import { ConnectSendTransportParameters, ConnectSendTransportType } from '../@types/types';

export interface CreateSendTransportParameters extends ConnectSendTransportParameters {
  islevel: string;
  member: string;
  socket: Socket;
  device: Device | null;
  transportCreated: boolean;
  producerTransport: Transport | null;
  updateProducerTransport: (producerTransport: Transport | null) => void;
  updateTransportCreated: (transportCreated: boolean) => void;

  // mediasfu functions
  connectSendTransport: ConnectSendTransportType;
  getUpdatedAllParams: () => CreateSendTransportParameters;
  [key: string]: any;
}

export interface CreateSendTransportOptions {
  option: 'audio' | 'video' | 'screen' | 'all';
  parameters: CreateSendTransportParameters;
}

// Export the type definition for the function
export type CreateSendTransportType = (options: CreateSendTransportOptions) => Promise<void>;

  /**
   * Creates a WebRTC send transport and sets up event handlers for the transport.
   *
   * @param {CreateSendTransportOptions} options - The options for creating the send transport.
   * @param {'audio' | 'video' | 'screen' | 'all'} options.option - The type of transport to create.
   * @param {CreateSendTransportParameters} options.parameters - The parameters required for creating the transport.
   * @param {string} options.parameters.islevel - Indicates the level of the transport.
   * @param {string} options.parameters.member - The member name associated with the transport.
   * @param {Socket} options.parameters.socket - The socket instance for communication.
   * @param {Device | null} options.parameters.device - The WebRTC device instance.
   * @param {boolean} options.parameters.transportCreated - Flag indicating if the transport is created.
   * @param {Transport | null} options.parameters.producerTransport - The producer transport instance.
   * @param {Function} options.parameters.updateProducerTransport - Function to update the producer transport.
   * @param {Function} options.parameters.updateTransportCreated - Function to update the transport creation state.
   * @param {Function} options.parameters.connectSendTransport - Function to connect the send transport.
   *
   * @returns {Promise<void>} A promise that resolves when the send transport is created and configured.
   *
   * @throws Will throw an error if there is an issue creating the send transport.
   *
   * @example
   * ```typescript
   * const options = {
   *   option: 'audio',
   *   parameters: {
   *     islevel: '2',
   *     member: 'currentMember',
   *     socket: socketInstance,
   *     device: deviceInstance,
   *     transportCreated: false,
   *     producerTransport: null,
   *     updateProducerTransport: (transport) => { console.log(updated) },
   *     updateTransportCreated: (state) => { console.log(updated) },
   *     connectSendTransport: connectSendTransportFunction,
   *   },
   * };
   *
   * createSendTransportService.createSendTransport(options)
   *   .then(() => {
   *     console.log('Send transport created successfully');
   *   })
   *   .catch((error) => {
   *     console.error('Error creating send transport:', error);
   *   });
   * ```
   */


@Injectable({
  providedIn: 'root',
})
export class CreateSendTransport {
  /**
   * Creates a WebRTC send transport and sets up event handlers for the transport.
   *
   * @param {CreateSendTransportOptions} options - The options for creating the send transport.
   * @param {Object} options.option - Additional options for the transport creation.
   * @param {Object} options.parameters - The parameters required for creating the transport.
   * @param {boolean} options.parameters.islevel - Indicates the level of the transport.
   * @param {string} options.parameters.member - The member name associated with the transport.
   * @param {Socket} options.parameters.socket - The socket instance for communication.
   * @param {Device} options.parameters.device - The WebRTC device instance.
   * @param {boolean} options.parameters.transportCreated - Flag indicating if the transport is created.
   * @param {Transport} options.parameters.producerTransport - The producer transport instance.
   * @param {Function} options.parameters.updateProducerTransport - Function to update the producer transport.
   * @param {Function} options.parameters.updateTransportCreated - Function to update the transport creation state.
   * @param {Function} options.parameters.connectSendTransport - Function to connect the send transport.
   * @returns {Promise<void>} A promise that resolves when the send transport is created and configured.
   *
   * @throws Will throw an error if there is an issue creating the send transport.
   */
  async createSendTransport({ option, parameters }: CreateSendTransportOptions): Promise<void> {
    try {
      // Destructure parameters
      let {
        islevel,
        member,
        device,
        socket,
        transportCreated,
        producerTransport,
        updateProducerTransport,
        updateTransportCreated,
        connectSendTransport,
        getUpdatedAllParams,
      } = parameters;

      const updatedParams = getUpdatedAllParams();
      device = updatedParams.device;
      socket = updatedParams.socket;

      // Emit createWebRtcTransport event to the server
      socket.emit(
        'createWebRtcTransport',
        { consumer: false, islevel: islevel },
        async ({ params }: any) => {
          // Check if there is an error in the response
          if (params && params.error) {
            return;
          }

          // Create a WebRTC send transport
          if (device) {
            producerTransport = device.createSendTransport(params);
          } else {
            throw new Error('Device is null');
          }
          updateProducerTransport(producerTransport);

          // Handle 'connect' event
          producerTransport.on(
            'connect',
            async (
              { dtlsParameters }: { dtlsParameters: DtlsParameters },
              callback: () => void,
              errback: (error: any) => void,
            ) => {
              try {
                socket.emit('transport-connect', {
                  dtlsParameters,
                });
                callback();
              } catch (error) {
                errback(error);
              }
            },
          );

          // Handle 'produce' event
          producerTransport.on(
            'produce',
            async (
              parameters: any,
              callback: (arg0: { id: any }) => void,
              errback: (error: any) => void,
            ) => {
              try {
                socket.emit(
                  'transport-produce',
                  {
                    kind: parameters.kind,
                    rtpParameters: parameters.rtpParameters,
                    appData: parameters.appData,
                    islevel: islevel,
                    name: member,
                  },
                  ({ id }: { id: string }) => {
                    callback({ id });
                  },
                );
              } catch (error) {
                errback(error);
              }
            },
          );

          // Handle 'connectionstatechange' event
          producerTransport.on('connectionstatechange', (state: string) => {
            switch (state) {
              case 'connecting':
                break;
              case 'connected':
                break;
              case 'failed':
                producerTransport?.close();
                break;
              default:
                break;
            }
          });

          // Update transport creation state
          transportCreated = true;
          await connectSendTransport({
            option: option,
            parameters: {
              ...parameters,
              producerTransport: producerTransport,
            },
          });

          updateTransportCreated(transportCreated);
        },
      );
    } catch (error) {
      // Handle errors during transport creation
      try {
        const { showAlert } = parameters;
        if (showAlert) {
          showAlert({
            message: 'Error creating send transport.',
            type: 'danger',
            duration: 3000,
          });
        }
      } catch (innerError) {
        console.log('Error creating send transport:', innerError);
      }
      console.log('Error creating send transport:', error);
    }
  }
}
