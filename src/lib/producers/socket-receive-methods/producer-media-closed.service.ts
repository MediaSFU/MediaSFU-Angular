import { Injectable } from '@angular/core';
import {
  CloseAndResizeParameters,
  CloseAndResizeType,
  PrepopulateUserMediaParameters,
  PrepopulateUserMediaType,
  ReorderStreamsParameters,
  ReorderStreamsType,
  Transport,
} from '../../@types/types';

export interface ProducerMediaClosedParameters
  extends CloseAndResizeParameters,
    PrepopulateUserMediaParameters,
    ReorderStreamsParameters {
  consumerTransports: Transport[];
  updateConsumerTransports: (transports: Transport[]) => void;
  hostLabel: string;
  shared: boolean;
  updateShared: (shared: boolean) => void;
  updateShareScreenStarted: (started: boolean) => void;
  updateScreenId: (screenId: string) => void;
  updateShareEnded: (ended: boolean) => void;

  // mediasfu functions
  closeAndResize: CloseAndResizeType;
  prepopulateUserMedia: PrepopulateUserMediaType;
  reorderStreams: ReorderStreamsType;

  getUpdatedAllParams: () => ProducerMediaClosedParameters;
  [key: string]: any;
}

export interface ProducerMediaClosedOptions {
  producerId: string;
  kind: 'video' | 'screen' | 'audio' | 'screenshare';
  parameters: ProducerMediaClosedParameters;
}

// Export the type definition for the function
export type ProducerMediaClosedType = (options: ProducerMediaClosedOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class ProducerMediaClosed {
  /**
   * Handles the closure of a media producer.
   *
   * @param {ProducerMediaClosedOptions} options - The options for closing the media producer.
   * @param {string} options.producerId - The ID of the producer to close.
   * @param {string} options.kind - The kind of media (e.g., "screenshare" or "screen").
   * @param {Parameters} options.parameters - The parameters object containing various methods and properties.
   *
   * @returns {Promise<void>} - A promise that resolves when the producer has been closed and necessary updates are made.
   *
   * @remarks
   * This function performs the following steps:
   * 1. Retrieves updated parameters.
   * 2. Finds the transport associated with the producer to close.
   * 3. Closes the consumer transport and consumer if found.
   * 4. Updates the consumer transports list.
   * 5. Calls `closeAndResize` with the necessary parameters.
   * 6. If the producer kind is "screenshare" or "screen", updates shared state and calls various update methods.
   */
  producerMediaClosed = async ({
    producerId,
    kind,
    parameters,
  }: ProducerMediaClosedOptions): Promise<void> => {
    parameters = parameters.getUpdatedAllParams();

    const {
      consumerTransports,
      updateConsumerTransports,
      hostLabel,
      shared,
      updateShared,
      updateShareScreenStarted,
      updateScreenId,
      updateShareEnded,
      closeAndResize,
      prepopulateUserMedia,
      reorderStreams,
    } = parameters;

    const producerToClose = consumerTransports.find(
      (transportData: any) => transportData.producerId === producerId,
    );

    if (producerToClose) {
      try {
        await producerToClose['consumerTransport'].close();
      } catch (error) {
        console.error('Error closing consumer transport:', error);
      }

      try {
        producerToClose.consumer.close();
      } catch (error) {
        console.error('Error closing consumer:', error);
      }

      const updatedConsumerTransports = consumerTransports.filter(
        (transportData: any) => transportData.producerId !== producerId,
      );
      updateConsumerTransports(updatedConsumerTransports);

      await closeAndResize({ producerId, kind, parameters });
    } else {
      if (kind === 'screenshare' || kind === 'screen') {
        if (shared) {
          updateShared(false);
        } else {
          updateShareScreenStarted(false);
          updateScreenId('');
        }
        updateShareEnded(true);
        await prepopulateUserMedia({ name: hostLabel, parameters });
        await reorderStreams({ add: false, screenChanged: true, parameters });
      }
    }
  };
}
