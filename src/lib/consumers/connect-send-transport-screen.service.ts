import { Injectable } from '@angular/core';
import { Transport, Producer, Device, ProducerOptions } from 'mediasoup-client/lib/types';
export interface ConnectSendTransportScreenParameters {
  screenProducer: Producer | null;
  device: Device | null;
  screenParams: ProducerOptions;
  producerTransport: Transport | null;
  params: ProducerOptions;
  updateScreenProducer: (producer: Producer | null) => void;
  updateProducerTransport: (transport: Transport | null) => void;

  getUpdatedAllParams: () => ConnectSendTransportScreenParameters;
  [key: string]: any; // Extendable for additional parameters
}

export interface ConnectSendTransportScreenOptions {
  stream: MediaStream | null;
  parameters: ConnectSendTransportScreenParameters;
}

// Export the type definition for the function
export type ConnectSendTransportScreenType = (
  options: ConnectSendTransportScreenOptions,
) => Promise<void>;
@Injectable({
  providedIn: 'root',
})
export class ConnectSendTransportScreen {
  /**
   * Connects and sets up the screen sharing transport for sending video streams.
   *
   * @param {Object} options - The options for connecting the screen transport.
   * @param {MediaStream} options.stream - The media stream containing the screen video track.
   * @param {ConnectSendTransportScreenOptions} options.parameters - The parameters required for setting up the transport.
   * @param {Producer} options.parameters.screenProducer - The screen producer object.
   * @param {Device} options.parameters.device - The device object containing RTP capabilities.
   * @param {Promise<ScreenParams>} options.parameters.screenParams - A promise resolving to screen share parameters.
   * @param {Transport} options.parameters.producerTransport - The transport object used for producing the screen share.
   * @param {Params} options.parameters.params - The parameters for producing the screen share.
   * @param {Function} options.parameters.updateScreenProducer - Function to update the screen producer object.
   * @param {Function} options.parameters.updateProducerTransport - Function to update the producer transport object.
   * @param {Function} options.parameters.getUpdatedAllParams - Function to fetch updated device information.
   *
   * @returns {Promise<void>} A promise that resolves when the screen transport is successfully connected and set up.
   *
   * @throws Will throw an error if the connection or setup process fails.
   */
  async connectSendTransportScreen({
    stream,
    parameters,
  }: ConnectSendTransportScreenOptions): Promise<void> {
    try {
      let {
        screenProducer,
        device,
        screenParams,
        producerTransport,
        params,
        updateScreenProducer,
        updateProducerTransport,
      } = parameters;

      device = parameters.getUpdatedAllParams().device;
      // Connect the send transport for screen share by producing screen video data
      params = screenParams;

      // Find VP9 codec for screen share
      if (!device || !device.rtpCapabilities || !device.rtpCapabilities.codecs) {
        throw new Error('Device or its RTP capabilities are not available.');
      }

      let codec = device.rtpCapabilities.codecs.find(
        (codec: any) => codec.mimeType.toLowerCase() === 'video/vp9' && codec.kind === 'video',
      );

      // Produce screen share data using the producer transport
      if (!producerTransport) {
        throw new Error('Producer transport is not available.');
      }

      screenProducer = await producerTransport.produce({
        track: stream?.getVideoTracks()[0],
        ...params,
        codec: codec,
        appData: { mediaTag: 'screen-video' },
      });

      // Update the screen producer and producer transport objects
      updateScreenProducer(screenProducer);
      updateProducerTransport(producerTransport);
    } catch (error) {
      console.log('connectSendTransportScreen error', error);
      throw error;
    }
  }
}
