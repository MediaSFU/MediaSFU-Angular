import { Transport, CloseAndResizeParameters, CloseAndResizeType } from '../../@types/types';
import * as i0 from "@angular/core";
export interface ProducerClosedParameters extends CloseAndResizeParameters {
    consumerTransports: Transport[];
    screenId?: string;
    updateConsumerTransports: (transports: Transport[]) => void;
    closeAndResize: CloseAndResizeType;
    getUpdatedAllParams: () => ProducerClosedParameters;
    [key: string]: any;
}
export interface ProducerClosedOptions {
    remoteProducerId: string;
    parameters: ProducerClosedParameters;
}
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
export declare class ProducerClosed {
    /**
     * Handles the closing of a producer and resizes video elements.
     * @param {Object} options - The options object containing necessary variables.
     * @param {string} options.remoteProducerId - The ID of the remote producer.
     * @param {any} options.parameters - Additional parameters required for the function.
     * @returns {Promise<void>}
     */
    producerClosed: ({ remoteProducerId, parameters, }: ProducerClosedOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProducerClosed, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProducerClosed>;
}
