import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { ValidateAlphanumeric } from '../../methods/utils/validate-alphanumeric.service';
import { ResponseJoinLocalRoom, PreJoinPageParameters } from '../../@types/types';
import { CheckLimitsAndMakeRequest } from '../../methods/utils/check-limits-and-make-request.service';
import { JoinRoomOnMediaSFU } from '../../methods/utils/join-room-on-media-sfu.service';

export interface JoinLocalRoomOptions {
  socket: Socket;
  roomName: string;
  islevel: string;
  member: string;
  sec: string;
  apiUserName: string;
  parameters: PreJoinPageParameters;
  checkConnect?: boolean;
}

// Export the type definition for the function
export type JoinLocalRoomType = (
  options: JoinLocalRoomOptions
) => Promise<ResponseJoinLocalRoom>;


export interface CheckMediasfuURLOptions {
  data: ResponseJoinLocalRoom;
  member: string;
  roomName: string;
  islevel: string;
  socket: Socket;
  parameters: PreJoinPageParameters;
}

// Export the type definition for the function
export type CheckMediasfuURLType = (options: CheckMediasfuURLOptions) => Promise<void>;

/**
 * Checks the MediaSFU URL and processes the necessary actions based on the URL's validity.
 *
 * @param {CheckMediasfuURLOptions} options - The options for checking and handling the MediaSFU URL.
 * @param {ResponseJoinLocalRoom} options.data - The data received from the room join response.
 * @param {string} options.member - The member identifier.
 * @param {string} options.roomName - The name of the room to join.
 * @param {string} options.islevel - The level of the user.
 * @param {Socket} options.socket - The socket instance to use for communication.
 * @param {PreJoinPageParameters} options.parameters - Additional parameters for pre-join page actions.
 *
 * @returns {Promise<void>} A promise that resolves when the actions are complete.
 *
 * @example
 * ```typescript
 * const options = {
 *   data: {
 *     mediasfuURL: "https://example.com/meet/room123/secret",
 *     allowRecord: true,
 *     apiKey: "1234567890123456789012345678901234567890123456789012345678901234",
 *     apiUserName: "user123",
 *   },
 *   member: "user123",
 *   roomName: "s12345678",
 *   islevel: "1",
 *   socket: socketInstance,
 *   parameters: {
 *     someParameter: "value",
 *   },
 * };
 *
 * try {
 *   await checkMediasfuURL(options);
 *   console.log("MediaSFU URL processed successfully.");
 * } catch (error) {
 *   console.error("Failed to process MediaSFU URL:", error);
 * }
 * ```
 */

@Injectable({
  providedIn: 'root',
})
export class JoinLocalRoom {
  constructor(
    private validateAlphanumericService: ValidateAlphanumeric,
    private checkLimitsService: CheckLimitsAndMakeRequest,
    private joinRoomOnMediaSFU: JoinRoomOnMediaSFU
  ) {}

/**
 * Checks the MediaSFU URL and processes the necessary actions based on the URL's validity.
 *
 * @param {CheckMediasfuURLOptions} options - The options for checking and handling the MediaSFU URL.
 * @param {ResponseJoinLocalRoom} options.data - The data received from the room join response.
 * @param {string} options.member - The member identifier.
 * @param {string} options.roomName - The name of the room to join.
 * @param {string} options.islevel - The level of the user.
 * @param {Socket} options.socket - The socket instance to use for communication.
 * @param {PreJoinPageParameters} options.parameters - Additional parameters for pre-join page actions.
 *
 * @returns {Promise<void>} A promise that resolves when the actions are complete.
 *
 * @example
 * ```typescript
 * const options = {
 *   data: {
 *     mediasfuURL: "https://example.com/meet/room123/secret",
 *     allowRecord: true,
 *     apiKey: "1234567890123456789012345678901234567890123456789012345678901234",
 *     apiUserName: "user123",
 *   },
 *   member: "user123",
 *   roomName: "s12345678",
 *   islevel: "1",
 *   socket: socketInstance,
 *   parameters: {
 *     someParameter: "value",
 *   },
 * };
 *
 * try {
 *   await checkMediasfuURL(options);
 *   console.log("MediaSFU URL processed successfully.");
 * } catch (error) {
 *   console.error("Failed to process MediaSFU URL:", error);
 * }
 * ```
 */

  async joinLocalRoom(options: JoinLocalRoomOptions): Promise<ResponseJoinLocalRoom> {
    const {
      socket,
      roomName,
      islevel,
      member,
      sec,
      apiUserName,
      parameters,
      checkConnect = false,
    } = options;

    return new Promise((resolve, reject) => {
      // Validate inputs
      if (!(sec && roomName && islevel && apiUserName && member)) {
        const validationError = {
          success: false,
          rtpCapabilities: null,
          reason: 'Missing required parameters',
        };
        reject(validationError);
        return;
      }

      // Validate alphanumeric for roomName, apiUserName, and member
      try {
        this.validateAlphanumericService.validateAlphanumeric({ str: roomName });
        this.validateAlphanumericService.validateAlphanumeric({ str: apiUserName });
        this.validateAlphanumericService.validateAlphanumeric({ str: member });
      } catch (error) {
        const validationError = {
          success: false,
          rtpCapabilities: null,
          reason: 'Invalid roomName or apiUserName or member',
        };
        reject(validationError);
        return;
      }

      // Validate roomName starts with 's', 'p', or 'm'
      if (
        !(
          roomName.startsWith('s') ||
          roomName.startsWith('p') ||
          roomName.startsWith('m')
        )
      ) {
        const validationError = {
          success: false,
          rtpCapabilities: null,
          reason: 'Invalid roomName, must start with s, p, or m',
        };
        reject(validationError);
        return;
      }

      // Validate other conditions for sec, roomName, islevel, apiUserName
      if (
        !(
          sec.length === 32 &&
          roomName.length >= 8 &&
          islevel.length === 1 &&
          apiUserName.length >= 6 &&
          ['0', '1', '2'].includes(islevel)
        )
      ) {
        const validationError = {
          success: false,
          rtpCapabilities: null,
          reason: 'Invalid roomName, islevel, apiUserName, or secret',
        };
        reject(validationError);
        return;
      }

      socket.emit(
        'joinRoom',
        { roomName, islevel, member, sec, apiUserName },
        async (data: ResponseJoinLocalRoom) => {
          try {
            // Check if rtpCapabilities is null
            if (data.rtpCapabilities === null) {
              // Handle specific error cases
              if (data.isBanned) {
                throw new Error('User is banned.');
              }
              if (data.hostNotJoined) {
                throw new Error('Host has not joined the room yet.');
              }

              // Resolve with the data received from the 'joinRoom' event
              resolve(data);
            } else {
              if (checkConnect) {
                await this.checkMediasfuURL({
                  data,
                  member,
                  roomName,
                  islevel,
                  socket,
                  parameters,
                });
              } else {
                // If mediasfuURL is present, extract and update the API token
                if (data.mediasfuURL && data.mediasfuURL.length > 10) {
                  let secretCode;
                  const splitTexts = ['/meet/', '/chat/', '/broadcast/'];
                  const splitText =
                    splitTexts.find((text) => data.mediasfuURL.includes(text)) ||
                    '/meet/';
                  const urlParts = data.mediasfuURL.split(splitText);
                  secretCode = urlParts[1].split('/')[1];
                  parameters.updateApiToken(secretCode);
                }
              }
              // Resolve with the data received from the 'joinRoom' event
              resolve(data);
            }
          } catch (error) {
            // Handle errors during the joinRoom process
            console.error('Error joining room:', error);
            reject(error);
          }
        }
      );
    });
  }

  /**
   * Checks the MediaSFU URL and processes necessary actions based on its validity.
   *
   * @param {Object} options - Contains:
   *   - `data`: Data received from the room join response.
   *   - `member`: User identifier.
   *   - `roomName`: Name of the room to join.
   *   - `islevel`: User's level indicator.
   *   - `socket`: Socket instance for communication.
   *   - `parameters`: Additional parameters for pre-join page actions.
   */
  private async checkMediasfuURL(options: {
    data: ResponseJoinLocalRoom;
    member: string;
    roomName: string;
    islevel: string;
    socket: Socket;
    parameters: PreJoinPageParameters;
  }): Promise<void> {
    const { data, member, roomName, islevel, socket, parameters } = options;

    if (data.mediasfuURL && data.mediasfuURL.length > 10) {
      let link;
      let secretCode;

      try {
        const splitTexts = ['/meet/', '/chat/', '/broadcast/'];
        const splitText =
          splitTexts.find((text) => data.mediasfuURL.includes(text)) || '/meet/';
        const urlParts = data.mediasfuURL.split(splitText);
        link = urlParts[0];
        secretCode = urlParts[1].split('/')[1];
      } catch {
        link = data.mediasfuURL;
        return;
      }

      await this.checkLimitsService.checkLimitsAndMakeRequest({
        apiUserName: roomName,
        apiToken: secretCode,
        link,
        apiKey: '',
        userName: member,
        parameters,
        validate: false,
      });

      return;
    }

    if (
      (!data.mediasfuURL || data.mediasfuURL.length < 10) &&
      islevel !== '2' &&
      data.allowRecord &&
      data.apiKey &&
      data.apiKey.length === 64 &&
      data.apiUserName &&
      data.apiUserName.length > 5 &&
      (roomName.startsWith('s') || roomName.startsWith('p'))
    ) {
      const payload = {
        action: 'join',
        meetingID: roomName,
        userName: member,
      };

      const response = await this.joinRoomOnMediaSFU.joinRoomOnMediaSFU({
        payload,
        apiKey: data.apiKey,
        apiUserName: data.apiUserName,
      });

      if (response.success && response.data && 'roomName' in response.data) {
        try {
          socket.emit(
            'updateMediasfuURL',
            { eventID: roomName, mediasfuURL: response.data.publicURL },
            () => {}
          );
        } catch {
          // Do nothing
        }

        await this.checkLimitsService.checkLimitsAndMakeRequest({
          apiUserName: response.data.roomName,
          apiToken: response.data.secret,
          link: response.data.link,
          userName: member,
          parameters,
          validate: false,
        });
        parameters.updateApiToken(response.data.secret);
      }
      return;
    }
  }
}
