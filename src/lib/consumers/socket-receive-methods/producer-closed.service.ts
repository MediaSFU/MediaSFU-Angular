import { Injectable } from '@angular/core';
import { Transport, CloseAndResizeParameters, CloseAndResizeType } from '../../@types/types';

export interface ProducerClosedParameters extends CloseAndResizeParameters {
  consumerTransports: Transport[];
  screenId?: string;
  updateConsumerTransports: (transports: Transport[]) => void;

  // mediasfu functions
  closeAndResize: CloseAndResizeType;
  getUpdatedAllParams: () => ProducerClosedParameters;
  [key: string]: any;
}

export interface ProducerClosedOptions {
  remoteProducerId: string;
  parameters: ProducerClosedParameters;
}

// Export the type definition for the function
export type ProducerClosedType = (options: ProducerClosedOptions) => Promise<void>;

/**
 * @service ProducerClosed
 * @description Service to manage the closing of a producer, including resizing video elements and updating consumer transports.
 *
 * @method producerClosed
 * Closes a specific producer by its ID, adjusts any associated video elements, and updates the list of consumer transports.
 *
 * @param {ProducerClosedOptions} options - Options for closing the specified producer.
 * @param {string} options.remoteProducerId - Unique ID for the producer to close.
 * @param {ProducerClosedParameters} options.parameters - Parameters to configure the producer closure and related updates.
 *
 * @returns {Promise<void>} A promise that resolves when the producer has been closed and relevant updates have been made.
 *
 * @example
 * ```typescript
 * await producerClosedService.producerClosed({
 *   remoteProducerId: 'producer123',
 *   parameters: {
 *     consumerTransports: currentTransports,
 *     screenId: 'screen123',
 *     updateConsumerTransports: updateTransportList,
 *     closeAndResize: closeAndResizeFunction,
 *     getUpdatedAllParams: getUpdatedParamsFunction,
 *   }
 * });
 * ```
 */


@Injectable({
  providedIn: 'root',
})
export class ProducerClosed {
  /**
   * Handles the closing of a producer and resizes video elements.
   * @param {Object} options - The options object containing necessary variables.
   * @param {string} options.remoteProducerId - The ID of the remote producer.
   * @param {any} options.parameters - Additional parameters required for the function.
   * @returns {Promise<void>}
   */
  producerClosed = async ({
    remoteProducerId,
    parameters,
  }: ProducerClosedOptions): Promise<void> => {
    let {
      consumerTransports,
      screenId,
      updateConsumerTransports,

      // mediasfu functions
      closeAndResize,
    } = parameters;

    // Handle producer closed
    const producerToClose = consumerTransports.find(
      (transportData: any) => transportData.producerId === remoteProducerId,
    );

    if (!producerToClose) {
      return;
    }

    // Check if the ID of the producer to close is == screenId
    let kind: string = producerToClose.consumer.kind;

    if (producerToClose.producerId == screenId) {
      kind = 'screenshare';
    }
    try {
      await producerToClose['consumerTransport'].close();
    } catch (error) {
      console.error('Error closing consumerTransport:', error);
    }

    try {
      producerToClose.consumer.close();
    } catch (error) {
      console.error('Error closing consumer:', error);
    }

    consumerTransports = consumerTransports.filter(
      (transportData: any) => transportData.producerId !== remoteProducerId,
    );
    updateConsumerTransports(consumerTransports);

    // Close and resize the videos
    await closeAndResize({ producerId: remoteProducerId, kind: kind, parameters: parameters });
  };
}
