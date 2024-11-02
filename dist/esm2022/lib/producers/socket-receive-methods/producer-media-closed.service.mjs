import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
    producerMediaClosed = async ({ producerId, kind, parameters, }) => {
        parameters = parameters.getUpdatedAllParams();
        const { consumerTransports, updateConsumerTransports, hostLabel, shared, updateShared, updateShareScreenStarted, updateScreenId, updateShareEnded, closeAndResize, prepopulateUserMedia, reorderStreams, } = parameters;
        const producerToClose = consumerTransports.find((transportData) => transportData.producerId === producerId);
        if (producerToClose) {
            try {
                await producerToClose['consumerTransport'].close();
            }
            catch (error) {
                console.error('Error closing consumer transport:', error);
            }
            try {
                producerToClose.consumer.close();
            }
            catch (error) {
                console.error('Error closing consumer:', error);
            }
            const updatedConsumerTransports = consumerTransports.filter((transportData) => transportData.producerId !== producerId);
            updateConsumerTransports(updatedConsumerTransports);
            await closeAndResize({ producerId, kind, parameters });
        }
        else {
            if (kind === 'screenshare' || kind === 'screen') {
                if (shared) {
                    updateShared(false);
                }
                else {
                    updateShareScreenStarted(false);
                    updateScreenId('');
                }
                updateShareEnded(true);
                await prepopulateUserMedia({ name: hostLabel, parameters });
                await reorderStreams({ add: false, screenChanged: true, parameters });
            }
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ProducerMediaClosed, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ProducerMediaClosed, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ProducerMediaClosed, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjZXItbWVkaWEtY2xvc2VkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcHJvZHVjZXItbWVkaWEtY2xvc2VkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUEwQzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0REc7QUFLSCxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkc7SUFDSCxtQkFBbUIsR0FBRyxLQUFLLEVBQUUsRUFDM0IsVUFBVSxFQUNWLElBQUksRUFDSixVQUFVLEdBQ2lCLEVBQWlCLEVBQUU7UUFDOUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRTlDLE1BQU0sRUFDSixrQkFBa0IsRUFDbEIsd0JBQXdCLEVBQ3hCLFNBQVMsRUFDVCxNQUFNLEVBQ04sWUFBWSxFQUNaLHdCQUF3QixFQUN4QixjQUFjLEVBQ2QsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxvQkFBb0IsRUFDcEIsY0FBYyxHQUNmLEdBQUcsVUFBVSxDQUFDO1FBRWYsTUFBTSxlQUFlLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUM3QyxDQUFDLGFBQWtCLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUNoRSxDQUFDO1FBRUYsSUFBSSxlQUFlLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUM7Z0JBQ0gsTUFBTSxlQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNyRCxDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDZixPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzVELENBQUM7WUFFRCxJQUFJLENBQUM7Z0JBQ0gsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNuQyxDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDZixPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xELENBQUM7WUFFRCxNQUFNLHlCQUF5QixHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FDekQsQ0FBQyxhQUFrQixFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FDaEUsQ0FBQztZQUNGLHdCQUF3QixDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFFcEQsTUFBTSxjQUFjLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDekQsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLElBQUksS0FBSyxhQUFhLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRSxDQUFDO2dCQUNoRCxJQUFJLE1BQU0sRUFBRSxDQUFDO29CQUNYLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdEIsQ0FBQztxQkFBTSxDQUFDO29CQUNOLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNoQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3JCLENBQUM7Z0JBQ0QsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU0sb0JBQW9CLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBQzVELE1BQU0sY0FBYyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDeEUsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDLENBQUM7dUdBN0VTLG1CQUFtQjsyR0FBbkIsbUJBQW1CLGNBRmxCLE1BQU07OzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDbG9zZUFuZFJlc2l6ZVBhcmFtZXRlcnMsXG4gIENsb3NlQW5kUmVzaXplVHlwZSxcbiAgUHJlcG9wdWxhdGVVc2VyTWVkaWFQYXJhbWV0ZXJzLFxuICBQcmVwb3B1bGF0ZVVzZXJNZWRpYVR5cGUsXG4gIFJlb3JkZXJTdHJlYW1zUGFyYW1ldGVycyxcbiAgUmVvcmRlclN0cmVhbXNUeXBlLFxuICBUcmFuc3BvcnQsXG59IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZHVjZXJNZWRpYUNsb3NlZFBhcmFtZXRlcnNcbiAgZXh0ZW5kcyBDbG9zZUFuZFJlc2l6ZVBhcmFtZXRlcnMsXG4gICAgUHJlcG9wdWxhdGVVc2VyTWVkaWFQYXJhbWV0ZXJzLFxuICAgIFJlb3JkZXJTdHJlYW1zUGFyYW1ldGVycyB7XG4gIGNvbnN1bWVyVHJhbnNwb3J0czogVHJhbnNwb3J0W107XG4gIHVwZGF0ZUNvbnN1bWVyVHJhbnNwb3J0czogKHRyYW5zcG9ydHM6IFRyYW5zcG9ydFtdKSA9PiB2b2lkO1xuICBob3N0TGFiZWw6IHN0cmluZztcbiAgc2hhcmVkOiBib29sZWFuO1xuICB1cGRhdGVTaGFyZWQ6IChzaGFyZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZDogKHN0YXJ0ZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVNjcmVlbklkOiAoc2NyZWVuSWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlU2hhcmVFbmRlZDogKGVuZGVkOiBib29sZWFuKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBjbG9zZUFuZFJlc2l6ZTogQ2xvc2VBbmRSZXNpemVUeXBlO1xuICBwcmVwb3B1bGF0ZVVzZXJNZWRpYTogUHJlcG9wdWxhdGVVc2VyTWVkaWFUeXBlO1xuICByZW9yZGVyU3RyZWFtczogUmVvcmRlclN0cmVhbXNUeXBlO1xuXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFByb2R1Y2VyTWVkaWFDbG9zZWRQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZHVjZXJNZWRpYUNsb3NlZE9wdGlvbnMge1xuICBwcm9kdWNlcklkOiBzdHJpbmc7XG4gIGtpbmQ6ICd2aWRlbycgfCAnc2NyZWVuJyB8ICdhdWRpbycgfCAnc2NyZWVuc2hhcmUnO1xuICBwYXJhbWV0ZXJzOiBQcm9kdWNlck1lZGlhQ2xvc2VkUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgUHJvZHVjZXJNZWRpYUNsb3NlZFR5cGUgPSAob3B0aW9uczogUHJvZHVjZXJNZWRpYUNsb3NlZE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogU2VydmljZSB0byBoYW5kbGUgY2xvc2luZyBhIG1lZGlhIHByb2R1Y2VyIGFuZCBhc3NvY2lhdGVkIFVJIGFuZCBzdGF0ZSB1cGRhdGVzLlxuICpcbiAqIEBjbGFzc1xuICogQG5hbWUgUHJvZHVjZXJNZWRpYUNsb3NlZFxuICogQGRlc2NyaXB0aW9uXG4gKiBNYW5hZ2VzIHRoZSBjbG9zdXJlIG9mIGEgbWVkaWEgcHJvZHVjZXIgYnkgaWRlbnRpZnlpbmcgYXNzb2NpYXRlZCBjb25zdW1lciB0cmFuc3BvcnRzLCBjbG9zaW5nIG5lY2Vzc2FyeSByZXNvdXJjZXMsXG4gKiBhbmQgdXBkYXRpbmcgdGhlIHVzZXIgaW50ZXJmYWNlIHRvIHJlZmxlY3QgdGhlIGNoYW5nZS4gRm9yIHNjcmVlbiBzaGFyaW5nLCBpdCByZXNldHMgdGhlIHNoYXJlZCBzdGF0ZSBhbmQgYWRqdXN0cyB0aGUgbWFpbiB2aWV3LlxuICpcbiAqIEBtZXRob2RcbiAqIHByb2R1Y2VyTWVkaWFDbG9zZWRcbiAqXG4gKiBAcGFyYW0ge1Byb2R1Y2VyTWVkaWFDbG9zZWRPcHRpb25zfSBvcHRpb25zIC0gQ29udGFpbnMgZGV0YWlscyBvbiB0aGUgcHJvZHVjZXIgYW5kIHBhcmFtZXRlcnMgZm9yIHN0YXRlIHVwZGF0ZXM6XG4gKiAgIC0gYHByb2R1Y2VySWRgIHtzdHJpbmd9OiBJRCBvZiB0aGUgcHJvZHVjZXIgdG8gY2xvc2UuXG4gKiAgIC0gYGtpbmRgIHtzdHJpbmd9OiBUaGUgdHlwZSBvZiBtZWRpYSB0byBjbG9zZSAoZS5nLiwgXCJzY3JlZW5zaGFyZVwiIG9yIFwiYXVkaW9cIikuXG4gKiAgIC0gYHBhcmFtZXRlcnNgIHtQcm9kdWNlck1lZGlhQ2xvc2VkUGFyYW1ldGVyc306IFNldHRpbmdzIGFuZCB1cGRhdGUgZnVuY3Rpb25zIHRvIG1hbmFnZSB0aGUgY2xvc3VyZSBwcm9jZXNzLlxuICogICAgICAtIGBjb25zdW1lclRyYW5zcG9ydHNgIHtUcmFuc3BvcnRbXX06IExpc3Qgb2YgYWN0aXZlIHRyYW5zcG9ydHMgZm9yIGNvbnN1bWVycy5cbiAqICAgICAgLSBgdXBkYXRlQ29uc3VtZXJUcmFuc3BvcnRzYCB7RnVuY3Rpb259OiBVcGRhdGVzIHRoZSBsaXN0IG9mIGFjdGl2ZSBjb25zdW1lciB0cmFuc3BvcnRzLlxuICogICAgICAtIGBob3N0TGFiZWxgIHtzdHJpbmd9OiBMYWJlbCBvZiB0aGUgaG9zdCB0byByZXZlcnQgdG8gaWYgc2NyZWVuIHNoYXJpbmcgZW5kcy5cbiAqICAgICAgLSBgc2hhcmVkYCB7Ym9vbGVhbn06IEluZGljYXRlcyB3aGV0aGVyIGEgc2NyZWVuIGlzIGN1cnJlbnRseSBzaGFyZWQuXG4gKiAgICAgIC0gYHVwZGF0ZVNoYXJlZGAge0Z1bmN0aW9ufTogVXBkYXRlcyB0aGUgc2hhcmVkIHNjcmVlbiBzdGF0ZS5cbiAqICAgICAgLSBgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkYCB7RnVuY3Rpb259OiBNYXJrcyB0aGUgc3RhcnQgb3IgZW5kIG9mIHNjcmVlbiBzaGFyaW5nLlxuICogICAgICAtIGB1cGRhdGVTY3JlZW5JZGAge0Z1bmN0aW9ufTogQ2xlYXJzIHRoZSBzY3JlZW4gSUQgd2hlbiBzY3JlZW4gc2hhcmluZyBlbmRzLlxuICogICAgICAtIGB1cGRhdGVTaGFyZUVuZGVkYCB7RnVuY3Rpb259OiBNYXJrcyB0aGUgZW5kIG9mIHNjcmVlbiBzaGFyaW5nLlxuICogICAgICAtIGBjbG9zZUFuZFJlc2l6ZWAge0Z1bmN0aW9ufTogQWRqdXN0cyB0aGUgc2NyZWVuIGRpc3BsYXkgdXBvbiBjbG9zaW5nIHRoZSBtZWRpYS5cbiAqICAgICAgLSBgcHJlcG9wdWxhdGVVc2VyTWVkaWFgIHtGdW5jdGlvbn06IExvYWRzIGRlZmF1bHQgbWVkaWEgYWZ0ZXIgc2NyZWVuIHNoYXJpbmcgZW5kcy5cbiAqICAgICAgLSBgcmVvcmRlclN0cmVhbXNgIHtGdW5jdGlvbn06IFJlb3JkZXJzIHN0cmVhbXMgdG8gb3B0aW1pemUgbGF5b3V0IHdoZW4gbWVkaWEgaXMgY2xvc2VkLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBSZXNvbHZlcyB3aGVuIGFsbCB1cGRhdGVzIGFyZSBjb21wbGV0ZSBhbmQgdGhlIHByb2R1Y2VyIGNsb3N1cmUgaXMgaGFuZGxlZC5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3Qgb3B0aW9ucyA9IHtcbiAqICAgcHJvZHVjZXJJZDogJzEyMzQ1JyxcbiAqICAga2luZDogJ3NjcmVlbnNoYXJlJyxcbiAqICAgcGFyYW1ldGVyczoge1xuICogICAgIGNvbnN1bWVyVHJhbnNwb3J0czogWy4uLl0sXG4gKiAgICAgdXBkYXRlQ29uc3VtZXJUcmFuc3BvcnRzOiAodHJhbnNwb3J0cykgPT4geyAuLi4gfSxcbiAqICAgICBob3N0TGFiZWw6ICdIb3N0JyxcbiAqICAgICBzaGFyZWQ6IHRydWUsXG4gKiAgICAgdXBkYXRlU2hhcmVkOiAoc2hhcmVkKSA9PiB7IC4uLiB9LFxuICogICAgIHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZDogKHN0YXJ0ZWQpID0+IHsgLi4uIH0sXG4gKiAgICAgdXBkYXRlU2NyZWVuSWQ6IChpZCkgPT4geyAuLi4gfSxcbiAqICAgICB1cGRhdGVTaGFyZUVuZGVkOiAoZW5kZWQpID0+IHsgLi4uIH0sXG4gKiAgICAgY2xvc2VBbmRSZXNpemU6ICh7IHByb2R1Y2VySWQsIGtpbmQsIHBhcmFtZXRlcnMgfSkgPT4geyAuLi4gfSxcbiAqICAgICBwcmVwb3B1bGF0ZVVzZXJNZWRpYTogKHsgbmFtZSwgcGFyYW1ldGVycyB9KSA9PiB7IC4uLiB9LFxuICogICAgIHJlb3JkZXJTdHJlYW1zOiAoeyBhZGQsIHNjcmVlbkNoYW5nZWQsIHBhcmFtZXRlcnMgfSkgPT4geyAuLi4gfSxcbiAqICAgfVxuICogfTtcbiAqXG4gKiBwcm9kdWNlck1lZGlhQ2xvc2VkU2VydmljZS5wcm9kdWNlck1lZGlhQ2xvc2VkKG9wdGlvbnMpXG4gKiAgIC50aGVuKCgpID0+IGNvbnNvbGUubG9nKCdQcm9kdWNlciBjbG9zZWQgc3VjY2Vzc2Z1bGx5JykpXG4gKiAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKCdFcnJvcjonLCBlcnJvcikpO1xuICpcbiAqIEByZW1hcmtzXG4gKiBUaGlzIHNlcnZpY2UgcGVyZm9ybXMgdGhlIGZvbGxvd2luZyBzdGVwczpcbiAqIDEuIFJldHJpZXZlcyB1cGRhdGVkIHBhcmFtZXRlcnMuXG4gKiAyLiBGaW5kcyBhbmQgY2xvc2VzIHRoZSB0cmFuc3BvcnQgYXNzb2NpYXRlZCB3aXRoIHRoZSBwcm9kdWNlci5cbiAqIDMuIFVwZGF0ZXMgdGhlIGxpc3Qgb2YgY29uc3VtZXIgdHJhbnNwb3J0cy5cbiAqIDQuIEFkanVzdHMgdGhlIGRpc3BsYXkgbGF5b3V0IHdpdGggYGNsb3NlQW5kUmVzaXplYC5cbiAqIDUuIElmIHRoZSBwcm9kdWNlciBpcyBhIHNjcmVlbiBzaGFyZSwgcmVzZXRzIHNoYXJlZCBzdGF0ZSBhbmQgcmVsb2FkcyBkZWZhdWx0IG1lZGlhLlxuICovXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWNlck1lZGlhQ2xvc2VkIHtcbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGNsb3N1cmUgb2YgYSBtZWRpYSBwcm9kdWNlci5cbiAgICpcbiAgICogQHBhcmFtIHtQcm9kdWNlck1lZGlhQ2xvc2VkT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBjbG9zaW5nIHRoZSBtZWRpYSBwcm9kdWNlci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucHJvZHVjZXJJZCAtIFRoZSBJRCBvZiB0aGUgcHJvZHVjZXIgdG8gY2xvc2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmtpbmQgLSBUaGUga2luZCBvZiBtZWRpYSAoZS5nLiwgXCJzY3JlZW5zaGFyZVwiIG9yIFwic2NyZWVuXCIpLlxuICAgKiBAcGFyYW0ge1BhcmFtZXRlcnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdCBjb250YWluaW5nIHZhcmlvdXMgbWV0aG9kcyBhbmQgcHJvcGVydGllcy5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgcHJvZHVjZXIgaGFzIGJlZW4gY2xvc2VkIGFuZCBuZWNlc3NhcnkgdXBkYXRlcyBhcmUgbWFkZS5cbiAgICpcbiAgICogQHJlbWFya3NcbiAgICogVGhpcyBmdW5jdGlvbiBwZXJmb3JtcyB0aGUgZm9sbG93aW5nIHN0ZXBzOlxuICAgKiAxLiBSZXRyaWV2ZXMgdXBkYXRlZCBwYXJhbWV0ZXJzLlxuICAgKiAyLiBGaW5kcyB0aGUgdHJhbnNwb3J0IGFzc29jaWF0ZWQgd2l0aCB0aGUgcHJvZHVjZXIgdG8gY2xvc2UuXG4gICAqIDMuIENsb3NlcyB0aGUgY29uc3VtZXIgdHJhbnNwb3J0IGFuZCBjb25zdW1lciBpZiBmb3VuZC5cbiAgICogNC4gVXBkYXRlcyB0aGUgY29uc3VtZXIgdHJhbnNwb3J0cyBsaXN0LlxuICAgKiA1LiBDYWxscyBgY2xvc2VBbmRSZXNpemVgIHdpdGggdGhlIG5lY2Vzc2FyeSBwYXJhbWV0ZXJzLlxuICAgKiA2LiBJZiB0aGUgcHJvZHVjZXIga2luZCBpcyBcInNjcmVlbnNoYXJlXCIgb3IgXCJzY3JlZW5cIiwgdXBkYXRlcyBzaGFyZWQgc3RhdGUgYW5kIGNhbGxzIHZhcmlvdXMgdXBkYXRlIG1ldGhvZHMuXG4gICAqL1xuICBwcm9kdWNlck1lZGlhQ2xvc2VkID0gYXN5bmMgKHtcbiAgICBwcm9kdWNlcklkLFxuICAgIGtpbmQsXG4gICAgcGFyYW1ldGVycyxcbiAgfTogUHJvZHVjZXJNZWRpYUNsb3NlZE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBwYXJhbWV0ZXJzID0gcGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICBjb25zdCB7XG4gICAgICBjb25zdW1lclRyYW5zcG9ydHMsXG4gICAgICB1cGRhdGVDb25zdW1lclRyYW5zcG9ydHMsXG4gICAgICBob3N0TGFiZWwsXG4gICAgICBzaGFyZWQsXG4gICAgICB1cGRhdGVTaGFyZWQsXG4gICAgICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgICB1cGRhdGVTY3JlZW5JZCxcbiAgICAgIHVwZGF0ZVNoYXJlRW5kZWQsXG4gICAgICBjbG9zZUFuZFJlc2l6ZSxcbiAgICAgIHByZXBvcHVsYXRlVXNlck1lZGlhLFxuICAgICAgcmVvcmRlclN0cmVhbXMsXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICBjb25zdCBwcm9kdWNlclRvQ2xvc2UgPSBjb25zdW1lclRyYW5zcG9ydHMuZmluZChcbiAgICAgICh0cmFuc3BvcnREYXRhOiBhbnkpID0+IHRyYW5zcG9ydERhdGEucHJvZHVjZXJJZCA9PT0gcHJvZHVjZXJJZCxcbiAgICApO1xuXG4gICAgaWYgKHByb2R1Y2VyVG9DbG9zZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgcHJvZHVjZXJUb0Nsb3NlWydjb25zdW1lclRyYW5zcG9ydCddLmNsb3NlKCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjbG9zaW5nIGNvbnN1bWVyIHRyYW5zcG9ydDonLCBlcnJvcik7XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHByb2R1Y2VyVG9DbG9zZS5jb25zdW1lci5jbG9zZSgpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY2xvc2luZyBjb25zdW1lcjonLCBlcnJvcik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHVwZGF0ZWRDb25zdW1lclRyYW5zcG9ydHMgPSBjb25zdW1lclRyYW5zcG9ydHMuZmlsdGVyKFxuICAgICAgICAodHJhbnNwb3J0RGF0YTogYW55KSA9PiB0cmFuc3BvcnREYXRhLnByb2R1Y2VySWQgIT09IHByb2R1Y2VySWQsXG4gICAgICApO1xuICAgICAgdXBkYXRlQ29uc3VtZXJUcmFuc3BvcnRzKHVwZGF0ZWRDb25zdW1lclRyYW5zcG9ydHMpO1xuXG4gICAgICBhd2FpdCBjbG9zZUFuZFJlc2l6ZSh7IHByb2R1Y2VySWQsIGtpbmQsIHBhcmFtZXRlcnMgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChraW5kID09PSAnc2NyZWVuc2hhcmUnIHx8IGtpbmQgPT09ICdzY3JlZW4nKSB7XG4gICAgICAgIGlmIChzaGFyZWQpIHtcbiAgICAgICAgICB1cGRhdGVTaGFyZWQoZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZChmYWxzZSk7XG4gICAgICAgICAgdXBkYXRlU2NyZWVuSWQoJycpO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZVNoYXJlRW5kZWQodHJ1ZSk7XG4gICAgICAgIGF3YWl0IHByZXBvcHVsYXRlVXNlck1lZGlhKHsgbmFtZTogaG9zdExhYmVsLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICBhd2FpdCByZW9yZGVyU3RyZWFtcyh7IGFkZDogZmFsc2UsIHNjcmVlbkNoYW5nZWQ6IHRydWUsIHBhcmFtZXRlcnMgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuIl19