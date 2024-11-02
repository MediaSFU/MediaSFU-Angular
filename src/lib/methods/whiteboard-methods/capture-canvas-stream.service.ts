/* eslint-disable @typescript-eslint/no-non-null-assertion */
// canvas.service.ts
import { Injectable } from '@angular/core';
import { Producer } from 'mediasoup-client/lib/types';
import {
  ConnectSendTransportScreenType,
  CreateSendTransportType,
  DisconnectSendTransportScreenType,
  SleepType,
  CreateSendTransportParameters,
  DisconnectSendTransportScreenParameters,
  ConnectSendTransportScreenParameters,
} from '../../@types/types';
export interface CaptureCanvasStreamParameters
  extends CreateSendTransportParameters,
    DisconnectSendTransportScreenParameters,
    ConnectSendTransportScreenParameters {
  canvasWhiteboard: HTMLCanvasElement | null;
  canvasStream: MediaStream | null;
  updateCanvasStream: (stream: MediaStream | null) => void;
  screenProducer: Producer | null;
  transportCreated: boolean;
  updateScreenProducer: (producer: Producer | null) => void;

  // mediasfu functions
  sleep: SleepType;
  createSendTransport: CreateSendTransportType;
  connectSendTransportScreen: ConnectSendTransportScreenType;
  disconnectSendTransportScreen: DisconnectSendTransportScreenType;

  getUpdatedAllParams: () => CaptureCanvasStreamParameters;
  [key: string]: any;
}

export interface CaptureCanvasStreamOptions {
  parameters: CaptureCanvasStreamParameters;
  start?: boolean;
}

// Export the type definition for the function
export type CaptureCanvasStreamType = (options: CaptureCanvasStreamOptions) => Promise<void>;

/**
 * Manages capturing and streaming from a canvas element.
 *
 * @param {CaptureCanvasStreamOptions} options - Options to control canvas streaming.
 * @param {CaptureCanvasStreamParameters} options.parameters - Object containing media settings and state management functions.
 * @param {boolean} [options.start=true] - If `true`, initiates canvas capture; if `false`, stops the capture.
 * @returns {Promise<void>} A promise that resolves once the canvas stream has started or stopped.
 *
 * The function first checks the availability of `canvasWhiteboard` to capture the canvas stream. If unavailable, it attempts multiple times until a timeout. If successful:
 * - It starts the canvas capture, creating or reconnecting the transport for streaming.
 * - If stopping, it disconnects the transport and halts the stream.
 *
 * @example
 * ```typescript
 * const captureService = new CaptureCanvasStream();
 * captureService.captureCanvasStream({
 *   parameters: {
 *     canvasWhiteboard: document.getElementById('myCanvas') as HTMLCanvasElement,
 *     updateCanvasStream: (stream) => console.log('Canvas Stream:', stream),
 *     screenProducer: null,
 *     transportCreated: false,
 *     // other required parameters...
 *   },
 *   start: true
 * });
 * ```
 *
 * This example initiates a capture of `myCanvas`, updating the canvas stream upon successful connection.
 */


@Injectable({
  providedIn: 'root',
})
export class CaptureCanvasStream {
  /**
   * Capture the canvas stream.
   * @param {Object} parameters - The parameters object.
   * @param {boolean} [start=true] - Indicates whether to start capturing the stream.
   * @returns {Promise<void>} - A promise that resolves when the canvas stream is captured.
   */
  captureCanvasStream = async ({
    parameters,
    start = true,
  }: CaptureCanvasStreamOptions): Promise<void> => {
    try {
      parameters = parameters.getUpdatedAllParams();

      let {
        canvasWhiteboard,
        canvasStream,
        updateCanvasStream,
        screenProducer,
        transportCreated,
        updateScreenProducer,
        sleep,
        createSendTransport,
        connectSendTransportScreen,
        disconnectSendTransportScreen,
      } = parameters;

      if (start && !canvasStream) {
        // Wait for canvasWhiteboard to be available
        let attempts = 0;
        const maxAttempts = 20; // 2 seconds / 100ms intervals
        while (!canvasWhiteboard && attempts < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          parameters = parameters.getUpdatedAllParams();
          canvasWhiteboard = parameters.canvasWhiteboard;
          attempts++;
        }

        if (!canvasWhiteboard) {
          throw new Error('Canvas whiteboard not available.');
        }
        const stream = canvasWhiteboard!.captureStream(30);
        canvasStream = stream;
        updateCanvasStream(stream);

        if (!transportCreated) {
          await createSendTransport({ option: 'screen', parameters });
        } else {
          try {
            screenProducer!.close();
            updateScreenProducer(null);
            await sleep({ ms: 500 });
          } catch {
            /* handle error */
          }

          await connectSendTransportScreen({ stream, parameters });
        }
      } else {
        if (!start && canvasStream) {
          canvasStream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
          canvasStream = null;
          updateCanvasStream(null);
          disconnectSendTransportScreen({ parameters });
        }
      }
    } catch (error) {
      console.log('Error in captureCanvasStream:', error);
    }
  };
}
