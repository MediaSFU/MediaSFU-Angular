import { Injectable } from '@angular/core';

import { ProducerOptions } from 'mediasoup-client/lib/types';
import {
  ConnectSendTransportAudioType,
  ConnectSendTransportVideoType,
  ConnectSendTransportScreenType,
  ConnectSendTransportAudioParameters,
  ConnectSendTransportVideoParameters,
  ConnectSendTransportScreenParameters,
} from '../@types/types';
export interface ConnectSendTransportParameters
  extends ConnectSendTransportAudioParameters,
    ConnectSendTransportVideoParameters,
    ConnectSendTransportScreenParameters {
  audioParams: ProducerOptions;
  videoParams: ProducerOptions;
  localStreamScreen: MediaStream | null;
  canvasStream: MediaStream | null;
  whiteboardStarted: boolean;
  whiteboardEnded: boolean;
  shared: boolean;
  islevel: string;

  //mediasfu functions
  connectSendTransportAudio: ConnectSendTransportAudioType;
  connectSendTransportVideo: ConnectSendTransportVideoType;
  connectSendTransportScreen: ConnectSendTransportScreenType;
  [key: string]: any;
}

export interface ConnectSendTransportOptions {
  option: 'audio' | 'video' | 'screen' | 'all';
  parameters: ConnectSendTransportParameters;
}

// Export the type definition for the function
export type ConnectSendTransportType = (options: ConnectSendTransportOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class ConnectSendTransport {
  /**
   * Connects the send transport based on the specified option.
   *
   * @param {ConnectSendTransportOptions} options - The options for connecting the send transport.
   * @param {string} options.option - The type of transport to connect ("audio", "video", "screen", or both).
   * @param {Object} options.parameters - The parameters required for connecting the transport.
   * @param {Object} options.parameters.audioParams - The audio parameters.
   * @param {Object} options.parameters.videoParams - The video parameters.
   * @param {MediaStream} options.parameters.localStreamScreen - The local screen stream.
   * @param {MediaStream} options.parameters.canvasStream - The canvas stream.
   * @param {boolean} options.parameters.whiteboardStarted - Indicates if the whiteboard has started.
   * @param {boolean} options.parameters.whiteboardEnded - Indicates if the whiteboard has ended.
   * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
   * @param {string} options.parameters.islevel - The level of the screen sharing.
   * @param {Function} options.parameters.connectSendTransportAudio - Function to connect the audio send transport.
   * @param {Function} options.parameters.connectSendTransportVideo - Function to connect the video send transport.
   * @param {Function} options.parameters.connectSendTransportScreen - Function to connect the screen send transport.
   *
   * @returns {Promise<void>} A promise that resolves when the transport is connected.
   *
   * @throws Will throw an error if the connection fails.
   */

  async connectSendTransport({ option, parameters }: ConnectSendTransportOptions): Promise<void> {
    try {
      const {
        audioParams,
        videoParams,
        localStreamScreen,
        canvasStream,
        whiteboardStarted,
        whiteboardEnded,
        shared,
        islevel,
        connectSendTransportAudio,
        connectSendTransportVideo,
        connectSendTransportScreen,
      } = parameters;

      // Connect send transport based on the specified option
      if (option === 'audio') {
        await connectSendTransportAudio({
          audioParams,
          parameters,
        });
      } else if (option === 'video') {
        await connectSendTransportVideo({
          videoParams,
          parameters,
        });
      } else if (option === 'screen') {
        if (whiteboardStarted && !whiteboardEnded && canvasStream && islevel === '2' && !shared) {
          await connectSendTransportScreen({
            stream: canvasStream,
            parameters,
          });
        } else {
          if (localStreamScreen) {
            await connectSendTransportScreen({
              stream: localStreamScreen,
              parameters,
            });
          } else {
            throw new Error('localStreamScreen is null or undefined');
          }
        }
      } else {
        // Connect both audio and video send transports
        await connectSendTransportAudio({
          audioParams,
          parameters,
        });
        await connectSendTransportVideo({
          videoParams,
          parameters,
        });
      }
    } catch (error) {
      console.log('connectSendTransport error', error);
    }
  }
}
