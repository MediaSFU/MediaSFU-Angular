import { Injectable } from '@angular/core';

import { Transport, Producer, ProducerOptions } from 'mediasoup-client/lib/types';
export interface ConnectSendTransportAudioParameters {
  audioProducer: Producer | null;
  producerTransport: Transport | null;
  localAudioProducer?: Producer | null;
  localProducerTransport?: Transport | null;
  updateAudioProducer: (producer: Producer | null) => void;
  updateProducerTransport: (transport: Transport | null) => void;
  updateLocalAudioProducer?: (localProducer: Producer | null) => void;
  updateLocalProducerTransport?: (localTransport: Transport | null) => void;
  updateAudioLevel: (level: number) => void;

  // Function to get all parameters
  getUpdatedAllParams: () => ConnectSendTransportAudioParameters;
  [key: string]: any; // Extendable for additional parameters

}

export interface ConnectSendTransportAudioOptions {
  audioParams: ProducerOptions;
  parameters: ConnectSendTransportAudioParameters;
  targetOption?: 'all' | 'local' | 'remote';
}

// Export the type definition for the function
export type ConnectSendTransportAudioType = (
  options: ConnectSendTransportAudioOptions,
) => Promise<void>;

export const updateMicLevel = async (audioProducer: Producer, updateAudioLevel: (level: number) => void) => {
  try {
    setInterval(() => {
      const sender = audioProducer!.rtpSender;
      sender?.getStats().then((stats) => {
        stats.forEach((report) => {
          if (report.type === 'media-source' && report.kind === 'audio' && report.audioLevel !== undefined) {
            const newLevel = 127.5 + (report.audioLevel * 127.5);
            updateAudioLevel(newLevel);
          }
        });
      });
    }, 1000);
  } catch {
    // Handle error
  }
};

export const connectLocalSendTransportAudio = async ({
  parameters,
  audioParams
}: ConnectSendTransportAudioOptions): Promise<void> => {
  try {
    let {
      localAudioProducer,
      localProducerTransport,
      updateLocalAudioProducer,
      updateLocalProducerTransport,
    } = parameters;

    if (localProducerTransport) {
      localAudioProducer = await localProducerTransport.produce(audioParams);

      updateLocalAudioProducer?.(localAudioProducer);
      updateLocalProducerTransport?.(localProducerTransport);
    }
  } catch (error) {
    console.error("Error connecting local audio transport:", error);
    throw error; // Re-throw to let the parent handle it
  }
};


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
 * @param {Function} [options.parameters.updateLocalAudioProducer] - Function to update the local audio producer.
 * @param {Function} [options.parameters.updateLocalProducerTransport] - Function to update the local producer transport.
 * @param {Function} options.parameters.updateAudioLevel - Function to update the audio level.
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
  *  updateLocalAudioProducer: (localProducer) => { console.log(updated) },
  *  updateLocalProducerTransport: (localTransport) => { console.log(updated) },
  *  updateAudioLevel: (level) => { console.log(level) },
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
   * @param {ConnectSendTransportAudioOptions} options - The options for connecting the send transport.
   * @param {ProducerOptions} options.audioParams - The audio parameters.
   * @param {ConnectSendTransportAudioParameters} options.parameters - The parameters required for connecting the transport.
   * @param {Producer | null} options.parameters.audioProducer - The audio producer object.
   * @param {Transport | null} options.parameters.producerTransport - The producer transport object.
   * @param {Producer | null} [options.parameters.localAudioProducer] - The local audio producer object.
   * @param {Transport | null} [options.parameters.localProducerTransport] - The local producer transport object.
   * @param {(producer: Producer | null) => void} options.parameters.updateAudioProducer - The function to update the audio producer object.
   * @param {(transport: Transport | null) => void} options.parameters.updateProducerTransport - The function to update the producer transport object.
   * @param {(localProducer: Producer | null) => void} [options.parameters.updateLocalAudioProducer] - The function to update the local audio producer object.
   * @param {(localTransport: Transport | null) => void} [options.parameters.updateLocalProducerTransport] - The function to update the local producer transport object.
   * @param {(level: number) => void} options.parameters.updateAudioLevel - The function to update the audio level.
   * @returns {Promise<void>} A promise that resolves when the connection is established.
   *
   * @throws Will throw an error if the connection fails.
   *
   * @example
   * ```typescript
   * const options = {
   *  audioParams: { codec: 'opus' },
   * parameters: {
   * audioProducer: null,
   * producerTransport: transport,
   * updateAudioProducer: (producer) => { console.log(updated) },
   * updateProducerTransport: (transport) => { console.log(updated) },
   * updateLocalAudioProducer: (localProducer) => { console.log(updated) },
   * updateLocalProducerTransport: (localTransport) => { console.log(updated) },
   * },
   * };
   *
   * connectSendTransportAudio(options)
   * .then(() => {
   * console.log('Audio transport connected successfully');
   * })
   * .catch((error) => {
   * console.error('Error connecting audio transport:', error);
   * });
   * ```
   *
  */

  async connectSendTransportAudio({
    targetOption = "all",
    audioParams,
    parameters,
  }: ConnectSendTransportAudioOptions): Promise<void> {
    try {
      let { audioProducer, producerTransport, updateAudioProducer, updateProducerTransport } =
        parameters;


      // Attempt to connect the primary send transport
      if (targetOption === "all" || targetOption === "remote") {
        audioProducer = await producerTransport!.produce(audioParams);

        // Update the audio level
        updateMicLevel(audioProducer, parameters.updateAudioLevel);

        // Update state with the new producer and transport
        updateAudioProducer(audioProducer);
        updateProducerTransport(producerTransport);
      }

      // Attempt to connect the local send transport
      if (targetOption === "all" || targetOption === "local") {
        try {
          await connectLocalSendTransportAudio({ parameters, audioParams });

          // Update the audio level
          if (targetOption === 'local' && parameters.updateAudioLevel) {
            if (!parameters.localAudioProducer) {
              parameters = parameters.getUpdatedAllParams();
            }
            updateMicLevel(parameters.localAudioProducer!, parameters.updateAudioLevel);
          }
        } catch (localError) {
          console.error("Local audio transport connection failed:", localError);
        }
      }

    } catch (primaryError) {
      console.error("audio transport connection failed:", primaryError);
      throw new Error("Failed to connect to audio transport.");
    }
  }

}
