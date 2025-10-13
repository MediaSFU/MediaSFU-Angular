import { Injectable } from '@angular/core';
import { JoinConRoom } from '../../producers/producer-emits/join-con-room.service';
import { Socket } from 'socket.io-client';
import {
  ReceiveAllPipedTransportsType,
  ReceiveAllPipedTransportsParameters,
  CreateDeviceClientType,
} from '../../@types/types';
import { types } from 'mediasoup-client';
type Device = types.Device;
type RtpCapabilities = types.RtpCapabilities;

export interface JoinConsumeRoomParameters extends ReceiveAllPipedTransportsParameters {
  roomName: string;
  islevel: string;
  member: string;
  device: Device | null;
  updateDevice: (device: Device | null) => void;
  receiveAllPipedTransports: ReceiveAllPipedTransportsType;
  createDeviceClient: CreateDeviceClientType;

  // mediasfu functions
  [key: string]: any;
}
export interface JoinConsumeRoomOptions {
  remote_sock: Socket;
  apiToken: string;
  apiUserName: string;
  parameters: JoinConsumeRoomParameters;
}

interface JoinConsumeRoomResponse {
  success: boolean;
  rtpCapabilities?: RtpCapabilities;
}

// Export the type definition for the function
export type JoinConsumeRoomType = (
  options: JoinConsumeRoomOptions,
) => Promise<JoinConsumeRoomResponse>;


/**
 * @service JoinConsumeRoom
 * @description Service to join a media consumption room, setup device, and manage piped transports.
 *
 * @method joinConsumeRoom
 * Joins a consumption room by sending a request to the server and performing necessary device and transport setup.
 *
 * @param {JoinConsumeRoomOptions} options - Options for joining the consumption room.
 * @param {Socket} options.remote_sock - The remote socket used for joining the room.
 * @param {string} options.apiToken - API token for authentication.
 * @param {string} options.apiUserName - API username for authentication.
 * @param {JoinConsumeRoomParameters} options.parameters - Parameters required for the function.
 *
 * @returns {Promise<JoinConsumeRoomResponse>} A promise that resolves with the result of the join request.
 *
 * @example
 * ```typescript
 * const joinConsumeRoomResponse = await joinConsumeRoomService.joinConsumeRoom({
 *   remote_sock: mySocket,
 *   apiToken: 'apiToken123',
 *   apiUserName: 'myUser',
 *   parameters: {
 *     roomName: 'room1',
 *     islevel: '2',
 *     member: 'JohnDoe',
 *     device: null,
 *     updateDevice: updateDeviceFunction,
 *     receiveAllPipedTransports: receiveAllPipedTransportsFunction,
 *     createDeviceClient: createDeviceClientFunction,
 *   }
 * });
 * ```
 */

@Injectable({
  providedIn: 'root',
})
export class JoinConsumeRoom {
  constructor(private JoinConRoomService: JoinConRoom) {}

  /**
   * Joins a consumption room by sending a request to the server and handles the necessary setup.
   * @param {Object} options - The options object containing necessary variables.
   * @param {any} options.remote_sock - The remote socket information.
   * @param {string} options.apiToken - The API token for authentication.
   * @param {string} options.apiUserName - The API username for authentication.
   * @param {any} options.parameters - Additional parameters required for the function.
   * @returns {Promise<any>} - A promise that resolves with data related to the success of joining the room.
   */
  joinConsumeRoom = async ({
    remote_sock,
    apiToken,
    apiUserName,
    parameters,
  }: JoinConsumeRoomOptions): Promise<JoinConsumeRoomResponse> => {
    let {
      roomName,
      islevel,
      member,
      device,
      updateDevice,

      //Mediasfu functions
      receiveAllPipedTransports,
      createDeviceClient,
    } = parameters;

    try {
      // Join the consumption room
      const data: any = await this.JoinConRoomService.joinConRoom({
        socket: remote_sock,
        roomName,
        islevel,
        member,
        sec: apiToken,
        apiUserName,
      });

      if (data && data.success) {
        // Setup media device if not already set
        if (!device) {
          if (data.rtpCapabilities) {
            const device_ = await createDeviceClient({
              rtpCapabilities: data.rtpCapabilities,
            });

            if (device_) {
              updateDevice(device_);
            }
          }
        }

        // Receive all piped transports
        await receiveAllPipedTransports({ nsock: remote_sock, parameters });
      }

      return data;
    } catch (error) {
      console.log('Error in joinConsumeRoom:', error);
      throw new Error('Failed to join the consumption room or set up necessary components.');
    }
  };
}
