import { Injectable } from '@angular/core';

import { Transport, Producer, ProducerOptions } from 'mediasoup-client/lib/types';
export interface ConnectSendTransportAudioParameters {
  audioProducer: Producer | null;
  producerTransport: Transport | null;
  updateAudioProducer: (producer: Producer | null) => void;
  updateProducerTransport: (transport: Transport | null) => void;
}

export interface ConnectSendTransportAudioOptions {
  audioParams: ProducerOptions;
  parameters: ConnectSendTransportAudioParameters;
}

// Export the type definition for the function
export type ConnectSendTransportAudioType = (
  options: ConnectSendTransportAudioOptions,
) => Promise<void>;

/**
 * Connects the send transport for audio by producing audio data and updating the audio producer and producer transport objects.
 *
 * @param {ConnectSendTransportAudioOptions} options - The parameters for connecting the send transport.
 * @param {ProducerOptions} options.audioParams - The options for the audio producer.
 * @param {ConnectSendTransportAudioParameters} options.parameters - The parameters containing the audio producer, producer transport, and update functions.
 * @param {Producer} options.parameters.audioProducer - The current audio producer.
 * @param {Transport} options.parameters.producerTransport - The transport used to produce audio data.
 * @param {Function} options.parameters.updateAudioProducer - Function to update the audio producer.
 * @param {Function} options.parameters.updateProducerTransport - Function to update the producer transport.
 *
 * @returns {Promise<void>} A promise that resolves when the audio transport is successfully connected.
 *
 * @throws Will throw an error if the connection fails.
 *
 * @example
 * ```typescript
 * const audioParams: ProducerOptions = {
 *   codec: 'opus',
 *   // other options
 * };
 *
 * const parameters = {
 *   audioProducer: null,
 *   producerTransport: transport,
 *   updateAudioProducer: (producer) => { console.log(updated) },
  *   updateProducerTransport: (transport) => { console.log(updated) },
  * };
  *
  * connectSendTransportAudio({ audioParams, parameters })
  *   .then(() => {
  *     console.log('Audio transport connected successfully');
  *   })
  *   .catch((error) => {
  *     console.error('Error connecting audio transport:', error);
  *   });
  * ```
  */

@Injectable({
  providedIn: 'root',
})
export class ConnectSendTransportAudio {
  /**
   * Connects the send transport for audio by producing audio data and updating the audio producer and producer transport objects.
   *
   * @param {Object} params - The parameters for connecting the send transport.
   * @param {ProducerOptions} params.audioParams - The options for the audio producer.
   * @param {ConnectSendTransportAudioParameters} params.parameters - The parameters containing the audio producer, producer transport, and update functions.
   * @param {Producer} params.parameters.audioProducer - The current audio producer.
   * @param {Transport} params.parameters.producerTransport - The transport used to produce audio data.
   * @param {Function} params.parameters.updateAudioProducer - Function to update the audio producer.
   * @param {Function} params.parameters.updateProducerTransport - Function to update the producer transport.
   *
   * @returns {Promise<void>} A promise that resolves when the audio transport is successfully connected.
   *
   * @throws Will throw an error if the connection fails.
   */

  async connectSendTransportAudio({
    audioParams,
    parameters,
  }: ConnectSendTransportAudioOptions): Promise<void> {
    try {
      let { audioProducer, producerTransport, updateAudioProducer, updateProducerTransport } =
        parameters;

      // Connect the send transport for audio by producing audio data
      if (producerTransport) {
        audioProducer = await producerTransport.produce(audioParams);
      } else {
        throw new Error('Producer transport is null');
      }

      // Update the audio producer and producer transport objects
      updateAudioProducer(audioProducer);
      updateProducerTransport(producerTransport);
    } catch (error) {
      console.log('connectSendTransportAudio error', error);
    }
  }
}
