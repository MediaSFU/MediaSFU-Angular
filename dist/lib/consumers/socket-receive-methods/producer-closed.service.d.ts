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