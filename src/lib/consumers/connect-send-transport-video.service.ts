import { Injectable } from '@angular/core';
import { Device, Producer, ProducerOptions, Transport } from 'mediasoup-client/lib/types';
export interface ConnectSendTransportVideoParameters {
  videoProducer: Producer | null;
  device: Device | null;
  producerTransport: Transport | null;
  islevel: string;
  updateMainWindow: boolean;
  updateVideoProducer: (producer: Producer | null) => void;
  updateProducerTransport: (transport: Transport | null) => void;
  updateUpdateMainWindow: (state: boolean) => void;
  [key: string]: any; // Extendable for additional parameters
}

export interface ConnectSendTransportVideoOptions {
  videoParams: ProducerOptions;
  parameters: ConnectSendTransportVideoParameters;
}

// Export the type definition for the function
export type ConnectSendTransportVideoType = (
  options: ConnectSendTransportVideoOptions,
) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class ConnectSendTransportVideo {
  /**
   * Connects the send transport for video by producing video data and updates the relevant states.
   *
   * @param {ConnectSendTransportVideoOptions} options - The options for connecting the send transport for video.
   * @param {Object} options.videoParams - The parameters for producing video data.
   * @param {Object} options.parameters - The parameters for updating the state.
   * @param {Producer} options.parameters.videoProducer - The video producer instance.
   * @param {Transport} options.parameters.producerTransport - The transport instance used for producing video.
   * @param {string} options.parameters.islevel - The connection level.
   * @param {boolean} options.parameters.updateMainWindow - The state of the main window update.
   * @param {Function} options.parameters.updateVideoProducer - Function to update the video producer.
   * @param {Function} options.parameters.updateProducerTransport - Function to update the producer transport.
   * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window state.
   *
   * @returns {Promise<void>} A promise that resolves when the send transport for video is connected.
   *
   * @throws Will throw an error if the connection fails.
   */
  connectSendTransportVideo = async ({
    videoParams,
    parameters,
  }: ConnectSendTransportVideoOptions): Promise<void> => {
    try {
      let {
        videoProducer,
        producerTransport,
        islevel,
        updateMainWindow,
        updateVideoProducer,
        updateProducerTransport,
        updateUpdateMainWindow,
      } = parameters;

      // Connect the send transport for video by producing video data
      if (producerTransport) {
        videoProducer = await producerTransport.produce(videoParams);
      } else {
        throw new Error('Producer transport is null');
      }

      // Update main window state based on the video connection level
      if (islevel === '2') {
        updateMainWindow = true;
      }

      // Update the video producer and producer transport objects
      updateVideoProducer(videoProducer);
      updateProducerTransport(producerTransport);
      updateUpdateMainWindow(updateMainWindow);
    } catch (error) {
      console.log('connectSendTransportVideo error', error);
      throw error;
    }
  };
}
