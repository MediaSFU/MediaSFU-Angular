import { Injectable } from '@angular/core';
import { types } from 'mediasoup-client';
type Transport = types.Transport;
type Producer = types.Producer;
type Device = types.Device;
type ProducerOptions = types.ProducerOptions;
export interface ConnectSendTransportScreenParameters {
  screenProducer: Producer | null;
  localScreenProducer?: Producer | null;
  device: Device | null;
  screenParams: ProducerOptions;
  producerTransport: Transport | null;
  localProducerTransport?: Transport | null;
  params: ProducerOptions;
  updateScreenProducer: (producer: Producer | null) => void;
  updateLocalScreenProducer?: (localProducer: Producer | null) => void;
  updateProducerTransport: (transport: Transport | null) => void;
  updateLocalProducerTransport?: (localTransport: Transport | null) => void;

  getUpdatedAllParams: () => ConnectSendTransportScreenParameters;
  [key: string]: any; // Extendable for additional parameters
}

export interface ConnectSendTransportScreenOptions {
  stream: MediaStream | null;
  parameters: ConnectSendTransportScreenParameters;
  targetOption?: "all" | "local" | "remote";
}

// Export the type definition for the function
export type ConnectSendTransportScreenType = (
  options: ConnectSendTransportScreenOptions,
) => Promise<void>;

export const connectLocalSendTransportScreen = async({
  stream,
  parameters,
}: ConnectSendTransportScreenOptions): Promise<void> => {
  try {
    let {
      localScreenProducer,
      localProducerTransport,
      updateLocalScreenProducer,
      updateLocalProducerTransport,
      device,
    } = parameters;

    // Find VP9 codec for local screen share
    const codec = device?.rtpCapabilities?.codecs?.find(
      (codec: { mimeType: string }) =>
        codec.mimeType.toLowerCase() === "video/vp9"
    );

    // Produce local screen share data
    if (localProducerTransport) {
      localScreenProducer = await localProducerTransport.produce({
        track: stream?.getVideoTracks()[0],
        codec,
        appData: { mediaTag: "screen-video" },
      });

      // Update the local producer and transport objects
      updateLocalScreenProducer?.(localScreenProducer);
      updateLocalProducerTransport?.(localProducerTransport);
    }
  } catch (error) {
    console.error("Error connecting local screen transport:", error);
    throw error; // Re-throw to propagate the error
  }
};


/**
 * Sets up and connects a screen sharing transport for sending video streams.
 *
 * This function supports both a primary and a local screen producer, delegating local handling to a separate function.
 *
 * @param {ConnectSendTransportScreenOptions} options - The configuration options for setting up the screen transport.
 * @param {"all" | "local" | "remote"} [options.targetOption] - The target option for connecting the transport.
 * @param {MediaStream} options.stream - The screen stream to be shared.
 * @param {ConnectSendTransportScreenParameters} options.parameters - The parameters required for setting up the screen transport.
 * @param {Producer | null} options.parameters.screenProducer - The screen producer object to be updated.
 * @param {Device | null} options.parameters.device - The device object for media capabilities.
 * @param {ProducerOptions} options.parameters.screenParams - The parameters for the screen producer.
 * @param {Transport | null} options.parameters.producerTransport - The producer transport object.
 * @param {ProducerOptions} options.parameters.params - The parameters for the producer.
 * @param {Function} options.parameters.updateScreenProducer - The function to update the screen producer object.
 * @param {Function} options.parameters.updateProducerTransport - The function to update the producer transport object.
 * @param {Function} [options.parameters.updateLocalScreenProducer] - The function to update the local screen producer object.
 * @param {Function} [options.parameters.updateLocalProducerTransport] - The function to update the local producer transport object.
 * @param {Function} options.parameters.getUpdatedAllParams - The function to get updated parameters.
 * @param {Object} [options.parameters.*] - Additional parameters for future use.
 *
 * @returns {Promise<void>} - A promise that resolves once the screen transport is successfully connected and set up.
 *
 * @throws Will throw an error if there is an issue with the connection or setup process.
 *
 * @example
 * ```typescript
 * await connectSendTransportScreen({
 *   stream: screenStream,
 *   targetOption: "all",
 *   parameters: {
 *     screenProducer: null,
 *     localScreenProducer: null,
 *     device: mediaDevice,
 *     screenParams: { encodings: [{ maxBitrate: 1500000 }] },
 *     producerTransport: sendTransport,
 *     localProducerTransport: localSendTransport,
 *     params: { track: screenStream.getVideoTracks()[0] },
 *     updateScreenProducer: setScreenProducer,
 *     updateLocalScreenProducer: setLocalScreenProducer,
 *     updateProducerTransport: setProducerTransport,
 *     updateLocalProducerTransport: setLocalProducerTransport,
 *     getUpdatedAllParams: getParams,
 *   },
 * });
 * ```
 */

@Injectable({
  providedIn: 'root',
})
export class ConnectSendTransportScreen {

  /**
   * Sets up and connects a screen sharing transport for sending video streams.
   *
   * This function supports both a primary and a local screen producer, delegating local handling to a separate function.
   *
   * @param {ConnectSendTransportScreenOptions} options - The configuration options for setting up the screen transport.
   * @param {"all" | "local" | "remote"} [options.targetOption] - The target option for connecting the transport.
   * @param {MediaStream} options.stream - The screen stream to be shared.
   * @param {ConnectSendTransportScreenParameters} options.parameters - The parameters required for setting up the screen transport.
   * @param {Producer | null} options.parameters.screenProducer - The screen producer object to be updated.
   * @param {Device | null} options.parameters.device - The device object for media capabilities.
   * @param {ProducerOptions} options.parameters.screenParams - The parameters for the screen producer.
   * @param {Transport | null} options.parameters.producerTransport - The producer transport object.
   * @param {ProducerOptions} options.parameters.params - The parameters for the producer.
   * @param {Function} options.parameters.updateScreenProducer - The function to update the screen producer object.
   * @param {Function} options.parameters.updateProducerTransport - The function to update the producer transport object.
   * @param {Function} [options.parameters.updateLocalScreenProducer] - The function to update the local screen producer object.
   * @param {Function} [options.parameters.updateLocalProducerTransport] - The function to update the local producer transport object.
   * @param {Function} options.parameters.getUpdatedAllParams - The function to get updated parameters.
   * @param {Object} [options.parameters.*] - Additional parameters for future use.
   *
   * @returns {Promise<void>} - A promise that resolves once the screen transport is successfully connected and set up.
   *
   * @throws Will throw an error if there is an issue with the connection or setup process.
   *
   * @example
   * ```typescript
   * await connectSendTransportScreen({
   *   stream: screenStream,
   *   targetOption: "all",
   *   parameters: {
   *     screenProducer: null,
   *     localScreenProducer: null,
   *     device: mediaDevice,
   *     screenParams: { encodings: [{ maxBitrate: 1500000 }] },
   *     producerTransport: sendTransport,
   *     localProducerTransport: localSendTransport,
   *     params: { track: screenStream.getVideoTracks()[0] },
   *     updateScreenProducer: setScreenProducer,
   *     updateLocalScreenProducer: setLocalScreenProducer,
   *     updateProducerTransport: setProducerTransport,
   *     updateLocalProducerTransport: setLocalProducerTransport,
   *     getUpdatedAllParams: getParams,
   *   },
   * });
   * ```
   */

  async connectSendTransportScreen({
    stream,
    parameters,
    targetOption = "all",
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

      // Retrieve screen share parameters
      params = screenParams;

      // Find VP9 codec for screen share
      const codec = device?.rtpCapabilities?.codecs?.find(
        (codec: { mimeType: string }) =>
          codec.mimeType.toLowerCase() === "video/vp9"
      );

      // Produce screen share data using the producer transport
      if (targetOption === "remote" || targetOption === "all") {
        screenProducer = await producerTransport!.produce({
          track: stream?.getVideoTracks()[0],
          ...params,
          codec,
          appData: { mediaTag: "screen-video" },
        });

        // Update the screen producer and producer transport objects
        updateScreenProducer(screenProducer);
        updateProducerTransport(producerTransport);
      }

      // Produce screen share data using the local producer transport
      if (targetOption === "local" || targetOption === "all") {
        try {
          await connectLocalSendTransportScreen({ stream, parameters });
        } catch (localError) {
          console.log("Error connecting local screen transport:", localError);
        }
      }

    } catch (error) {
      console.log("connectSendTransportScreen error", error);
      throw error;
    }
  }
}
