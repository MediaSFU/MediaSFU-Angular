import { Transport, Producer, ProducerOptions } from 'mediasoup-client/lib/types';
import * as i0 from "@angular/core";
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
export type ConnectSendTransportAudioType = (options: ConnectSendTransportAudioOptions) => Promise<void>;
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
export declare class ConnectSendTransportAudio {
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
    connectSendTransportAudio({ audioParams, parameters, }: ConnectSendTransportAudioOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConnectSendTransportAudio, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConnectSendTransportAudio>;
}
