import { CloseAndResizeParameters, CloseAndResizeType, PrepopulateUserMediaParameters, PrepopulateUserMediaType, ReorderStreamsParameters, ReorderStreamsType, Transport } from '../../@types/types';
import * as i0 from "@angular/core";
export interface ProducerMediaClosedParameters extends CloseAndResizeParameters, PrepopulateUserMediaParameters, ReorderStreamsParameters {
    consumerTransports: Transport[];
    updateConsumerTransports: (transports: Transport[]) => void;
    hostLabel: string;
    shared: boolean;
    updateShared: (shared: boolean) => void;
    updateShareScreenStarted: (started: boolean) => void;
    updateScreenId: (screenId: string) => void;
    updateShareEnded: (ended: boolean) => void;
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
export type ProducerMediaClosedType = (options: ProducerMediaClosedOptions) => Promise<void>;
export declare class ProducerMediaClosed {
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
    producerMediaClosed: ({ producerId, kind, parameters, }: ProducerMediaClosedOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProducerMediaClosed, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProducerMediaClosed>;
}
