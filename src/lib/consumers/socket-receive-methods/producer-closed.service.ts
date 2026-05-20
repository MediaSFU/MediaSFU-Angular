import { Injectable } from '@angular/core';
import { Transport, CloseAndResizeParameters, CloseAndResizeType } from '../../@types/types';
import { producerClosed as sharedProducerClosed } from 'mediasfu-shared';

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
  async producerClosed({
    remoteProducerId,
    parameters,
  }: ProducerClosedOptions): Promise<void> {
    return sharedProducerClosed({
      remoteProducerId,
      parameters: parameters as unknown as Parameters<typeof sharedProducerClosed>[0]['parameters'],
    }) as Promise<void>;
  }
}
