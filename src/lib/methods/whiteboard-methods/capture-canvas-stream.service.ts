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
