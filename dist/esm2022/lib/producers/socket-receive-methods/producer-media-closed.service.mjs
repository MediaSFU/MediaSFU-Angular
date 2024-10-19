import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjZXItbWVkaWEtY2xvc2VkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcHJvZHVjZXItbWVkaWEtY2xvc2VkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUE2QzNDLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUI7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUNILG1CQUFtQixHQUFHLEtBQUssRUFBRSxFQUMzQixVQUFVLEVBQ1YsSUFBSSxFQUNKLFVBQVUsR0FDaUIsRUFBaUIsRUFBRTtRQUM5QyxVQUFVLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFFOUMsTUFBTSxFQUNKLGtCQUFrQixFQUNsQix3QkFBd0IsRUFDeEIsU0FBUyxFQUNULE1BQU0sRUFDTixZQUFZLEVBQ1osd0JBQXdCLEVBQ3hCLGNBQWMsRUFDZCxnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLG9CQUFvQixFQUNwQixjQUFjLEdBQ2YsR0FBRyxVQUFVLENBQUM7UUFFZixNQUFNLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQzdDLENBQUMsYUFBa0IsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQ2hFLENBQUM7UUFFRixJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQztnQkFDSCxNQUFNLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3JELENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDNUQsQ0FBQztZQUVELElBQUksQ0FBQztnQkFDSCxlQUFlLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ25DLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbEQsQ0FBQztZQUVELE1BQU0seUJBQXlCLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxDQUN6RCxDQUFDLGFBQWtCLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUNoRSxDQUFDO1lBQ0Ysd0JBQXdCLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUVwRCxNQUFNLGNBQWMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN6RCxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksSUFBSSxLQUFLLGFBQWEsSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQ2hELElBQUksTUFBTSxFQUFFLENBQUM7b0JBQ1gsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0QixDQUFDO3FCQUFNLENBQUM7b0JBQ04sd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2hDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDckIsQ0FBQztnQkFDRCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkIsTUFBTSxvQkFBb0IsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDNUQsTUFBTSxjQUFjLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUN4RSxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0E3RVMsbUJBQW1COzJHQUFuQixtQkFBbUIsY0FGbEIsTUFBTTs7MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENsb3NlQW5kUmVzaXplUGFyYW1ldGVycyxcbiAgQ2xvc2VBbmRSZXNpemVUeXBlLFxuICBQcmVwb3B1bGF0ZVVzZXJNZWRpYVBhcmFtZXRlcnMsXG4gIFByZXBvcHVsYXRlVXNlck1lZGlhVHlwZSxcbiAgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzLFxuICBSZW9yZGVyU3RyZWFtc1R5cGUsXG4gIFRyYW5zcG9ydCxcbn0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBQcm9kdWNlck1lZGlhQ2xvc2VkUGFyYW1ldGVyc1xuICBleHRlbmRzIENsb3NlQW5kUmVzaXplUGFyYW1ldGVycyxcbiAgICBQcmVwb3B1bGF0ZVVzZXJNZWRpYVBhcmFtZXRlcnMsXG4gICAgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzIHtcbiAgY29uc3VtZXJUcmFuc3BvcnRzOiBUcmFuc3BvcnRbXTtcbiAgdXBkYXRlQ29uc3VtZXJUcmFuc3BvcnRzOiAodHJhbnNwb3J0czogVHJhbnNwb3J0W10pID0+IHZvaWQ7XG4gIGhvc3RMYWJlbDogc3RyaW5nO1xuICBzaGFyZWQ6IGJvb2xlYW47XG4gIHVwZGF0ZVNoYXJlZDogKHNoYXJlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkOiAoc3RhcnRlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlU2NyZWVuSWQ6IChzY3JlZW5JZDogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVTaGFyZUVuZGVkOiAoZW5kZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIGNsb3NlQW5kUmVzaXplOiBDbG9zZUFuZFJlc2l6ZVR5cGU7XG4gIHByZXBvcHVsYXRlVXNlck1lZGlhOiBQcmVwb3B1bGF0ZVVzZXJNZWRpYVR5cGU7XG4gIHJlb3JkZXJTdHJlYW1zOiBSZW9yZGVyU3RyZWFtc1R5cGU7XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gUHJvZHVjZXJNZWRpYUNsb3NlZFBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9kdWNlck1lZGlhQ2xvc2VkT3B0aW9ucyB7XG4gIHByb2R1Y2VySWQ6IHN0cmluZztcbiAga2luZDogJ3ZpZGVvJyB8ICdzY3JlZW4nIHwgJ2F1ZGlvJyB8ICdzY3JlZW5zaGFyZSc7XG4gIHBhcmFtZXRlcnM6IFByb2R1Y2VyTWVkaWFDbG9zZWRQYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBQcm9kdWNlck1lZGlhQ2xvc2VkVHlwZSA9IChvcHRpb25zOiBQcm9kdWNlck1lZGlhQ2xvc2VkT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y2VyTWVkaWFDbG9zZWQge1xuICAvKipcbiAgICogSGFuZGxlcyB0aGUgY2xvc3VyZSBvZiBhIG1lZGlhIHByb2R1Y2VyLlxuICAgKlxuICAgKiBAcGFyYW0ge1Byb2R1Y2VyTWVkaWFDbG9zZWRPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNsb3NpbmcgdGhlIG1lZGlhIHByb2R1Y2VyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wcm9kdWNlcklkIC0gVGhlIElEIG9mIHRoZSBwcm9kdWNlciB0byBjbG9zZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMua2luZCAtIFRoZSBraW5kIG9mIG1lZGlhIChlLmcuLCBcInNjcmVlbnNoYXJlXCIgb3IgXCJzY3JlZW5cIikuXG4gICAqIEBwYXJhbSB7UGFyYW1ldGVyc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0IGNvbnRhaW5pbmcgdmFyaW91cyBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBwcm9kdWNlciBoYXMgYmVlbiBjbG9zZWQgYW5kIG5lY2Vzc2FyeSB1cGRhdGVzIGFyZSBtYWRlLlxuICAgKlxuICAgKiBAcmVtYXJrc1xuICAgKiBUaGlzIGZ1bmN0aW9uIHBlcmZvcm1zIHRoZSBmb2xsb3dpbmcgc3RlcHM6XG4gICAqIDEuIFJldHJpZXZlcyB1cGRhdGVkIHBhcmFtZXRlcnMuXG4gICAqIDIuIEZpbmRzIHRoZSB0cmFuc3BvcnQgYXNzb2NpYXRlZCB3aXRoIHRoZSBwcm9kdWNlciB0byBjbG9zZS5cbiAgICogMy4gQ2xvc2VzIHRoZSBjb25zdW1lciB0cmFuc3BvcnQgYW5kIGNvbnN1bWVyIGlmIGZvdW5kLlxuICAgKiA0LiBVcGRhdGVzIHRoZSBjb25zdW1lciB0cmFuc3BvcnRzIGxpc3QuXG4gICAqIDUuIENhbGxzIGBjbG9zZUFuZFJlc2l6ZWAgd2l0aCB0aGUgbmVjZXNzYXJ5IHBhcmFtZXRlcnMuXG4gICAqIDYuIElmIHRoZSBwcm9kdWNlciBraW5kIGlzIFwic2NyZWVuc2hhcmVcIiBvciBcInNjcmVlblwiLCB1cGRhdGVzIHNoYXJlZCBzdGF0ZSBhbmQgY2FsbHMgdmFyaW91cyB1cGRhdGUgbWV0aG9kcy5cbiAgICovXG4gIHByb2R1Y2VyTWVkaWFDbG9zZWQgPSBhc3luYyAoe1xuICAgIHByb2R1Y2VySWQsXG4gICAga2luZCxcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBQcm9kdWNlck1lZGlhQ2xvc2VkT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcblxuICAgIGNvbnN0IHtcbiAgICAgIGNvbnN1bWVyVHJhbnNwb3J0cyxcbiAgICAgIHVwZGF0ZUNvbnN1bWVyVHJhbnNwb3J0cyxcbiAgICAgIGhvc3RMYWJlbCxcbiAgICAgIHNoYXJlZCxcbiAgICAgIHVwZGF0ZVNoYXJlZCxcbiAgICAgIHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZCxcbiAgICAgIHVwZGF0ZVNjcmVlbklkLFxuICAgICAgdXBkYXRlU2hhcmVFbmRlZCxcbiAgICAgIGNsb3NlQW5kUmVzaXplLFxuICAgICAgcHJlcG9wdWxhdGVVc2VyTWVkaWEsXG4gICAgICByZW9yZGVyU3RyZWFtcyxcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIGNvbnN0IHByb2R1Y2VyVG9DbG9zZSA9IGNvbnN1bWVyVHJhbnNwb3J0cy5maW5kKFxuICAgICAgKHRyYW5zcG9ydERhdGE6IGFueSkgPT4gdHJhbnNwb3J0RGF0YS5wcm9kdWNlcklkID09PSBwcm9kdWNlcklkLFxuICAgICk7XG5cbiAgICBpZiAocHJvZHVjZXJUb0Nsb3NlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBwcm9kdWNlclRvQ2xvc2VbJ2NvbnN1bWVyVHJhbnNwb3J0J10uY2xvc2UoKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNsb3NpbmcgY29uc3VtZXIgdHJhbnNwb3J0OicsIGVycm9yKTtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgcHJvZHVjZXJUb0Nsb3NlLmNvbnN1bWVyLmNsb3NlKCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjbG9zaW5nIGNvbnN1bWVyOicsIGVycm9yKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdXBkYXRlZENvbnN1bWVyVHJhbnNwb3J0cyA9IGNvbnN1bWVyVHJhbnNwb3J0cy5maWx0ZXIoXG4gICAgICAgICh0cmFuc3BvcnREYXRhOiBhbnkpID0+IHRyYW5zcG9ydERhdGEucHJvZHVjZXJJZCAhPT0gcHJvZHVjZXJJZCxcbiAgICAgICk7XG4gICAgICB1cGRhdGVDb25zdW1lclRyYW5zcG9ydHModXBkYXRlZENvbnN1bWVyVHJhbnNwb3J0cyk7XG5cbiAgICAgIGF3YWl0IGNsb3NlQW5kUmVzaXplKHsgcHJvZHVjZXJJZCwga2luZCwgcGFyYW1ldGVycyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGtpbmQgPT09ICdzY3JlZW5zaGFyZScgfHwga2luZCA9PT0gJ3NjcmVlbicpIHtcbiAgICAgICAgaWYgKHNoYXJlZCkge1xuICAgICAgICAgIHVwZGF0ZVNoYXJlZChmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkKGZhbHNlKTtcbiAgICAgICAgICB1cGRhdGVTY3JlZW5JZCgnJyk7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlU2hhcmVFbmRlZCh0cnVlKTtcbiAgICAgICAgYXdhaXQgcHJlcG9wdWxhdGVVc2VyTWVkaWEoeyBuYW1lOiBob3N0TGFiZWwsIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgIGF3YWl0IHJlb3JkZXJTdHJlYW1zKHsgYWRkOiBmYWxzZSwgc2NyZWVuQ2hhbmdlZDogdHJ1ZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG4iXX0=