import { Injectable } from '@angular/core';
import { SocketManager } from '../sockets/socket-manager.service';
import { NewPipeProducer } from './socket-receive-methods/new-pipe-producer.service';
import { ProducerClosed } from './socket-receive-methods/producer-closed.service';
import { JoinConsumeRoom } from './socket-receive-methods/join-consume-room.service';
import { Device } from 'mediasoup-client/lib/types';
import {
  ReorderStreamsParameters,
  ReorderStreamsType,
  NewPipeProducerParameters,
  NewPipeProducerType,
  ProducerClosedType,
  ProducerClosedParameters,
  JoinConsumeRoomType,
  JoinConsumeRoomParameters,
  ConsumeSocket,
} from '../@types/types';

export interface ConnectIpsParameters
  extends ReorderStreamsParameters,
    JoinConsumeRoomParameters,
    ProducerClosedParameters,
    NewPipeProducerParameters {
  device: Device | null;
  roomRecvIPs: string[];
  updateRoomRecvIPs: (roomRecvIPs: string[]) => void;
  updateConsume_sockets: (consume_sockets: ConsumeSocket[]) => void;

  // mediasfu functions
  reorderStreams: ReorderStreamsType;
  getUpdatedAllParams: () => ConnectIpsParameters;
  [key: string]: any;
}

export interface ConnectIpsOptions {
  consume_sockets: ConsumeSocket[];
  remIP: string[];
  apiUserName: string;
  apiKey?: string;
  apiToken: string;
  newProducerMethod?: NewPipeProducerType;
  closedProducerMethod?: ProducerClosedType;
  joinConsumeRoomMethod?: JoinConsumeRoomType;
  parameters: ConnectIpsParameters;
}

// Export the type definition for the function
export type ConnectIpsType = (
  options: ConnectIpsOptions,
) => Promise<[Record<string, any>[], string[]]>;

/**
 * Connects to remote IPs and manages socket connections.
 *
 * This method establishes connections to remote IPs for media streaming, handles new pipe producer events,
 * and manages producer closure events. It updates the necessary state in the application to reflect
 * the current connections and stream configurations.
 *
 * @param {ConnectIpsOptions} options - The options for connecting IPs.
 * @param {Record<string, any>[]} options.consume_sockets - The array of current socket connections.
 * @param {string[]} options.remIP - The list of remote IPs to connect to.
 * @param {string} options.apiUserName - The API username for authentication.
 * @param {string} [options.apiKey] - The API key for authentication.
 * @param {string} [options.apiToken] - The API token for authentication.
 * @param {Function} [options.newProducerMethod] - The method to handle new pipe producer events (default: newPipeProducer).
 * @param {Function} [options.closedProducerMethod] - The method to handle producer closed events (default: producerClosed).
 * @param {Function} [options.joinConsumeRoomMethod] - The method to handle joining a consuming room (default: joinConsumeRoom).
 * @param {ConnectIpsParameters} options.parameters - Additional parameters for the operation.
 * @param {string[]} options.parameters.roomRecvIPs - The list of IPs that have been received in the room.
 * @param {Function} options.parameters.updateRoomRecvIPs - Function to update the room received IPs.
 * @param {Function} options.parameters.updateConsume_sockets - Function to update the consume sockets.
 *
 * @returns {Promise<[Record<string, any>[], string[]]>} A promise that resolves to an array containing the updated consume sockets and room received IPs.
 *
 * @throws Will throw an error if required parameters are missing or if there is an issue connecting to a remote IP.
 *
 * @example
 * ```typescript
 * const result = await connectIps({
 *   consume_sockets: currentSockets,
 *   remIP: ['192.168.1.1', '192.168.1.2'],
 *   apiUserName: 'username',
 *   apiKey: 'your-api-key',
 *   apiToken: 'your-api-token',
 *   parameters: {
 *     roomRecvIPs: [],
 *     updateRoomRecvIPs: (ips) => { },
 *     updateConsume_sockets: (sockets) => { },
 *     // ...other parameters
 *   },
 * });
 * ```
 */



@Injectable({
  providedIn: 'root',
})
export class ConnectIps {
  constructor(
    private socketManagerService: SocketManager,
    private newPipeProducerService: NewPipeProducer,
    private producerClosedService: ProducerClosed,
    private joinConsumeRoomService: JoinConsumeRoom,
  ) {}

  /**
   * Connects to remote IPs and manages socket connections.
   *
   * @param {Object} options - The options for connecting IPs.
   * @param {Record<string, any>[]} options.consume_sockets - The array of current socket connections.
   * @param {string[]} options.remIP - The list of remote IPs to connect to.
   * @param {string} options.apiUserName - The API username for authentication.
   * @param {string} [options.apiKey] - The API key for authentication.
   * @param {string} [options.apiToken] - The API token for authentication.
   * @param {Function} [options.newProducerMethod=newPipeProducer] - The method to handle new pipe producer events.
   * @param {Function} [options.closedProducerMethod=producerClosed] - The method to handle producer closed events.
   * @param {Function} [options.joinConsumeRoomMethod=joinConsumeRoom] - The method to handle joining a consuming room.
   * @param {Object} options.parameters - Additional parameters.
   * @param {string[]} options.parameters.roomRecvIPs - The list of IPs that have been received in the room.
   * @param {Function} options.parameters.updateRoomRecvIPs - The function to update the room received IPs.
   * @param {Function} options.parameters.updateConsume_sockets - The function to update the consume sockets.
   *
   * @returns {Promise<[Record<string, any>[], string[]]>} A promise that resolves to an array containing the updated consume sockets and room received IPs.
   *
   * @throws Will throw an error if required parameters are missing or if there is an issue connecting to a remote IP.
   */
  connectIps = async ({
    consume_sockets,
    remIP,
    apiUserName,
    apiKey = '',
    apiToken = '',
    newProducerMethod = this.newPipeProducerService.newPipeProducer,
    closedProducerMethod = this.producerClosedService.producerClosed,
    joinConsumeRoomMethod = this.joinConsumeRoomService.joinConsumeRoom,
    parameters,
  }: ConnectIpsOptions): Promise<any> => {
    try {
      const { roomRecvIPs, updateRoomRecvIPs, updateConsume_sockets } = parameters;

      if (!consume_sockets || !remIP || !apiUserName || (!apiKey && !apiToken)) {
        console.log(
          'Missing required parameters - consume_sockets, remIP, apiUserName, apiKey, apiToken',
        );
        return [consume_sockets, roomRecvIPs];
      }

      await Promise.all(
        remIP.map(async (ip) => {
          try {
            // Check if the IP is already connected
            const matching = consume_sockets.find(
              (socketObj: any) => Object.keys(socketObj)[0] == ip,
            );

            if (matching || !ip || ip === '' || ip === null || ip === undefined) {
              // Skip if the IP is already connected
              return;
            }

            // Connect to the remote socket using socket.io-client
            const remote_sock = await this.socketManagerService.connectSocket({
              apiUserName,
              apiKey,
              apiToken,
              link: `https://${ip}.mediasfu.com`,
            });

            // Handle successful connection to the remote socket
            if (remote_sock.id) {
              // Check if the IP is in the roomRecvIPs, if not, add it
              if (!roomRecvIPs.includes(ip)) {
                roomRecvIPs.push(ip);
                updateRoomRecvIPs(roomRecvIPs);
              }

              // Handle new pipe producer event
              remote_sock.on(
                'new-pipe-producer',
                async ({ producerId, islevel }: { producerId: string; islevel: string }) => {
                  await newProducerMethod({ producerId, islevel, nsock: remote_sock, parameters });
                },
              );

              // Handle producer closed event
              remote_sock.on(
                'producer-closed',
                async ({ remoteProducerId }: { remoteProducerId: string }) => {
                  await closedProducerMethod({ remoteProducerId, parameters });
                },
              );

              // Handle new consuming room by joining the room
              const data = await joinConsumeRoomMethod({
                remote_sock,
                apiToken,
                apiUserName,
                parameters,
              });
              if (!data.rtpCapabilities) {
                return;
              }

              // Add the remote socket to the consume_sockets array
              consume_sockets.push({ [ip]: remote_sock });
              updateConsume_sockets(consume_sockets);
            }
          } catch (error) {
            // Handle the error
            console.log('connectIps error', error);
          }
        }),
      );

      return [consume_sockets, roomRecvIPs];
    } catch (error) {
      // Handle the error
      console.log('connectIps error', error);
    }
  };
}
