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

/**
 * Service to handle closing a media producer and associated UI and state updates.
 *
 * @class
 * @name ProducerMediaClosed
 * @description
 * Manages the closure of a media producer by identifying associated consumer transports, closing necessary resources,
 * and updating the user interface to reflect the change. For screen sharing, it resets the shared state and adjusts the main view.
 *
 * @method
 * producerMediaClosed
 *
 * @param {ProducerMediaClosedOptions} options - Contains details on the producer and parameters for state updates:
 *   - `producerId` {string}: ID of the producer to close.
 *   - `kind` {string}: The type of media to close (e.g., "screenshare" or "audio").
 *   - `parameters` {ProducerMediaClosedParameters}: Settings and update functions to manage the closure process.
 *      - `consumerTransports` {Transport[]}: List of active transports for consumers.
 *      - `updateConsumerTransports` {Function}: Updates the list of active consumer transports.
 *      - `hostLabel` {string}: Label of the host to revert to if screen sharing ends.
 *      - `shared` {boolean}: Indicates whether a screen is currently shared.
 *      - `updateShared` {Function}: Updates the shared screen state.
 *      - `updateShareScreenStarted` {Function}: Marks the start or end of screen sharing.
 *      - `updateScreenId` {Function}: Clears the screen ID when screen sharing ends.
 *      - `updateShareEnded` {Function}: Marks the end of screen sharing.
 *      - `closeAndResize` {Function}: Adjusts the screen display upon closing the media.
 *      - `prepopulateUserMedia` {Function}: Loads default media after screen sharing ends.
 *      - `reorderStreams` {Function}: Reorders streams to optimize layout when media is closed.
 *
 * @returns {Promise<void>} Resolves when all updates are complete and the producer closure is handled.
 *
 * @example
 * const options = {
 *   producerId: '12345',
 *   kind: 'screenshare',
 *   parameters: {
 *     consumerTransports: [...],
 *     updateConsumerTransports: (transports) => { ... },
 *     hostLabel: 'Host',
 *     shared: true,
 *     updateShared: (shared) => { ... },
 *     updateShareScreenStarted: (started) => { ... },
 *     updateScreenId: (id) => { ... },
 *     updateShareEnded: (ended) => { ... },
 *     closeAndResize: ({ producerId, kind, parameters }) => { ... },
 *     prepopulateUserMedia: ({ name, parameters }) => { ... },
 *     reorderStreams: ({ add, screenChanged, parameters }) => { ... },
 *   }
 * };
 *
 * producerMediaClosedService.producerMediaClosed(options)
 *   .then(() => console.log('Producer closed successfully'))
 *   .catch(error => console.error('Error:', error));
 *
 * @remarks
 * This service performs the following steps:
 * 1. Retrieves updated parameters.
 * 2. Finds and closes the transport associated with the producer.
 * 3. Updates the list of consumer transports.
 * 4. Adjusts the display layout with `closeAndResize`.
 * 5. If the producer is a screen share, resets shared state and reloads default media.
 */

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
