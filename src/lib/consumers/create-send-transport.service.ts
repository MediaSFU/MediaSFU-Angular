import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { Device, Transport, DtlsParameters } from 'mediasoup-client/lib/types';
import { ConnectSendTransportParameters, ConnectSendTransportType } from '../@types/types';

export interface CreateSendTransportParameters extends ConnectSendTransportParameters {
  islevel: string;
  member: string;
  socket: Socket;
  localSocket?: Socket;
  device: Device | null;
  producerTransport: Transport | null;
  localProducerTransport?: Transport | null;
  transportCreated: boolean;
  localTransportCreated?: boolean;
  updateProducerTransport: (producerTransport: Transport | null) => void;
  updateLocalProducerTransport?: (localTransport: Transport | null) => void;
  updateTransportCreated: (transportCreated: boolean) => void;
  updateLocalTransportCreated?: (localTransportCreated: boolean) => void;

  // mediasfu functions
  connectSendTransport: ConnectSendTransportType;
  getUpdatedAllParams: () => CreateSendTransportParameters;
  [key: string]: any;
}

export interface CreateSendTransportOptions {
  option: "audio" | "video" | "screen" | "all";
  parameters: CreateSendTransportParameters;
}

// Export the type definition for the function
export type CreateSendTransportType = (options: CreateSendTransportOptions) => Promise<void>;


/**
 * Creates a WebRTC send transport and sets up event handlers for the transport.
 * Supports both primary and local transports with modular handling.
 * @param {CreateSendTransportOptions} options - The options for creating the send transport.
 * @param {string} options.option - The type of transport to create.
 * @param {CreateSendTransportParameters} options.parameters - The parameters required for creating the transport.
 * @param {string} options.parameters.islevel - The level of the transport.
 * @param {string} options.parameters.member - The member name for the transport.
 * @param {Socket} options.parameters.socket - The primary socket instance.
 * @param {Device} options.parameters.device - The device instance.
 * @param {Transport | null} options.parameters.producerTransport - The primary producer transport object.
 * @param {boolean} options.parameters.transportCreated - The state of the primary transport creation.
 * @param {(transport: Transport | null) => void} options.parameters.updateProducerTransport - The function to update the primary transport object.
 * @param {(state: boolean) => void} options.parameters.updateTransportCreated - The function to update the primary transport creation state.
 * @param {Function} options.parameters.connectSendTransport - The function to connect the send transport.
 * @param {Function} options.parameters.getUpdatedAllParams - The function to get updated parameters.
 * @param {Socket} [options.parameters.localSocket] - The local socket instance.
 * @param {Transport | null} [options.parameters.localProducerTransport] - The local producer transport object.
 * @param {boolean} [options.parameters.localTransportCreated] - The state of the local transport creation.
 * @param {(localTransport: Transport | null) => void} [options.parameters.updateLocalProducerTransport] - The function to update the local transport object.
 * @param {(state: boolean) => void} [options.parameters.updateLocalTransportCreated] - The function to update the local transport creation state.
 * @returns {Promise<void>} A promise that resolves when the send transport is created and configured.
 * @throws Will throw an error if there is an issue creating the send transport.
 * @example
 * const options = {
 *  option: 'video',
 * parameters: {
 * islevel: '1',
 * member: 'John Doe',
 * socket: socketInstance,
 * localSocket: localSocketInstance,
 * device: deviceInstance,
 * producerTransport: null,
 * localProducerTransport: null,
 * transportCreated: false,
 * localTransportCreated: false,
 * updateProducerTransport: (transport) => console.log('Primary transport updated:', transport),
 * updateLocalProducerTransport: (transport) => console.log('Local transport updated:', transport),
 * updateTransportCreated: (state) => console.log('Primary transport created:', state),
 * updateLocalTransportCreated: (state) => console.log('Local transport created:', state),
 * },
 * };
 * createSendTransport(options)
 * .then(() => console.log('Send transport created successfully'))
 * .catch((error) => console.error('Error creating send transport:', error));
 *
 */

export const createLocalSendTransport = async({
  option,
  parameters,
}: CreateSendTransportOptions): Promise<void> => {
  try {
    console.log("Creating local send transport...");
    let {
      islevel,
      member,
      socket,
      localSocket,
      device,
      localProducerTransport,
      localTransportCreated,
      updateLocalProducerTransport,
      updateLocalTransportCreated,

      connectSendTransport,
    } = parameters;


    if (!localSocket || !localSocket.id || socket?.id == localSocket?.id) {
      return;
    }

    localSocket.emit(
      "createWebRtcTransport",
      { consumer: false, islevel },
      async ({ params }: { params: any }) => {
        if (params && params.error) {
          console.error("Error in local createWebRtcTransport:", params.error);
          return;
        }

        // Create local send transport
        localProducerTransport = await device!.createSendTransport(params);
        if (updateLocalProducerTransport) {
          updateLocalProducerTransport(localProducerTransport);
        }

        // Handle local transport events
        localProducerTransport.on(
          "connect",
          async ({ dtlsParameters }: { dtlsParameters: DtlsParameters }, callback: () => void, errback: (error: Error) => void) => {
            try {
              localSocket.emit("transport-connect", { dtlsParameters });
              callback();
            } catch (error) {
              errback(error as Error);
            }
          }
        );

        localProducerTransport.on(
          "produce",
          async (
            parameters: { kind: string; rtpParameters: any; appData: any },
            callback: (response: { id: string }) => void,
            errback: (error: Error) => void
          ) => {
            try {
              localSocket.emit(
                "transport-produce",
                {
                  kind: parameters.kind,
                  rtpParameters: parameters.rtpParameters,
                  appData: parameters.appData,
                  islevel,
                  name: member,
                },
                ({ id }: { id: string }) => callback({ id })
              );
            } catch (error) {
              errback(error as Error);
            }
          }
        );

        localProducerTransport.on("connectionstatechange", (state: string) => {
          if (state === "failed") {
            console.error("Local transport connection failed.");
            if (localProducerTransport) {
              localProducerTransport.close();
            }
          }
        });

        // Mark local transport as created
        localTransportCreated = true;
        updateLocalTransportCreated?.(localTransportCreated);

        // connect local transport
        await connectSendTransport({
          targetOption: "local",
          option,
          parameters: { ...parameters, localProducerTransport: localProducerTransport },
        });
      }
    );
  } catch (error) {
    console.error("Error creating local send transport:", error);
  }
};


/**
 * Creates a WebRTC send transport and sets up event handlers for the transport.
 *
 * Supports both primary and local transports with modular handling.
 *
 * @param {CreateSendTransportOptions} options - The options for creating the send transport.
 * @param {string} options.option - The type of transport to create.
 * @param {CreateSendTransportParameters} options.parameters - The parameters required for creating the transport.
 * @param {string} options.parameters.islevel - The level of the transport.
 * @param {string} options.parameters.member - The member name for the transport.
 * @param {Socket} options.parameters.socket - The primary socket instance.
 * @param {Device} options.parameters.device - The device instance.
 * @param {Transport | null} options.parameters.producerTransport - The primary producer transport object.
 * @param {boolean} options.parameters.transportCreated - The state of the primary transport creation.
 * @param {(transport: Transport | null) => void} options.parameters.updateProducerTransport - The function to update the primary transport object.
 * @param {(state: boolean) => void} options.parameters.updateTransportCreated - The function to update the primary transport creation state.
 * @param {Function} options.parameters.connectSendTransport - The function to connect the send transport.
 * @param {Function} options.parameters.getUpdatedAllParams - The function to get updated parameters.
 * @param {Socket} [options.parameters.localSocket] - The local socket instance.
 * @param {Transport | null} [options.parameters.localProducerTransport] - The local producer transport object.
 * @param {boolean} [options.parameters.localTransportCreated] - The state of the local transport creation.
 * @param {(localTransport: Transport | null) => void} [options.parameters.updateLocalProducerTransport] - The function to update the local transport object.
 * @param {(state: boolean) => void} [options.parameters.updateLocalTransportCreated] - The function to update the local transport creation state.
 * @returns {Promise<void>} A promise that resolves when the send transport is created and configured.
 *
 * @throws Will throw an error if there is an issue creating the send transport.
 *
 * @example
 * const options = {
 *   option: 'video',
 *   parameters: {
 *     islevel: '1',
 *     member: 'John Doe',
 *     socket: socketInstance,
 *     localSocket: localSocketInstance,
 *     device: deviceInstance,
 *     producerTransport: null,
 *     localProducerTransport: null,
 *     transportCreated: false,
 *     localTransportCreated: false,
 *     updateProducerTransport: (transport) => console.log('Primary transport updated:', transport),
 *     updateLocalProducerTransport: (transport) => console.log('Local transport updated:', transport),
 *     updateTransportCreated: (state) => console.log('Primary transport created:', state),
 *     updateLocalTransportCreated: (state) => console.log('Local transport created:', state),
 *   },
 * };
 *
 * createSendTransport(options)
 *   .then(() => console.log('Send transport created successfully'))
 *   .catch((error) => console.error('Error creating send transport:', error));
 */


@Injectable({
  providedIn: 'root',
})
export class CreateSendTransport {

  /**
   * Creates a WebRTC send transport and sets up event handlers for the transport.
   *
   * Supports both primary and local transports with modular handling.
   *
   * @param {CreateSendTransportOptions} options - The options for creating the send transport.
   * @param {string} options.option - The type of transport to create.
   * @param {CreateSendTransportParameters} options.parameters - The parameters required for creating the transport.
   * @param {string} options.parameters.islevel - The level of the transport.
   * @param {string} options.parameters.member - The member name for the transport.
   * @param {Socket} options.parameters.socket - The primary socket instance.
   * @param {Device} options.parameters.device - The device instance.
   * @param {Transport | null} options.parameters.producerTransport - The primary producer transport object.
   * @param {boolean} options.parameters.transportCreated - The state of the primary transport creation.
   * @param {(transport: Transport | null) => void} options.parameters.updateProducerTransport - The function to update the primary transport object.
   * @param {(state: boolean) => void} options.parameters.updateTransportCreated - The function to update the primary transport creation state.
   * @param {Function} options.parameters.connectSendTransport - The function to connect the send transport.
   * @param {Function} options.parameters.getUpdatedAllParams - The function to get updated parameters.
   * @param {Socket} [options.parameters.localSocket] - The local socket instance.
   * @param {Transport | null} [options.parameters.localProducerTransport] - The local producer transport object.
   * @param {boolean} [options.parameters.localTransportCreated] - The state of the local transport creation.
   * @param {(localTransport: Transport | null) => void} [options.parameters.updateLocalProducerTransport] - The function to update the local transport object.
   * @param {(state: boolean) => void} [options.parameters.updateLocalTransportCreated] - The function to update the local transport creation state.
   * @returns {Promise<void>} A promise that resolves when the send transport is created and configured.
   *
   * @throws Will throw an error if there is an issue creating the send transport.
   *
   * @example
   * const options = {
   *   option: 'video',
   *   parameters: {
   *     islevel: '1',
   *     member: 'John Doe',
   *     socket: socketInstance,
   *     localSocket: localSocketInstance,
   *     device: deviceInstance,
   *     producerTransport: null,
   *     localProducerTransport: null,
   *     transportCreated: false,
   *     localTransportCreated: false,
   *     updateProducerTransport: (transport) => console.log('Primary transport updated:', transport),
   *     updateLocalProducerTransport: (transport) => console.log('Local transport updated:', transport),
   *     updateTransportCreated: (state) => console.log('Primary transport created:', state),
   *     updateLocalTransportCreated: (state) => console.log('Local transport created:', state),
   *   },
   * };
   *
   * createSendTransport(options)
   *   .then(() => console.log('Send transport created successfully'))
   *   .catch((error) => console.error('Error creating send transport:', error));
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

      try {
        // Handle local transport creation first
        if (!createLocalSendTransport) {
          throw new Error("Local transport creation method not found.");
        }
        await createLocalSendTransport({ option, parameters });
      } catch (error) {
        console.log("Error creating local send transport:", error);
      }

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
            targetOption: 'remote',
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
      console.log('Error creating send transport:', error);
    }
  }
}
