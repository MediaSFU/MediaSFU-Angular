import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ReceiveAllPipedTransports {
    /**
     * Receives all piped transports by emitting an event to the server and processing the response.
     *
     * @param {ReceiveAllPipedTransportsOptions} options - The options for receiving all piped transports.
     * @param {any} options.nsock - The socket instance used for communication.
     * @param {Object} options.parameters - The parameters for the operation.
     * @param {string} options.parameters.roomName - The name of the room.
     * @param {string} options.parameters.member - The member identifier.
     * @param {Function} options.parameters.getPipedProducersAlt - The function to get piped producers for a given level.
     *
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     *
     * @throws Will log an error message if the operation fails.
     */
    receiveAllPipedTransports = async ({ nsock, parameters, }) => {
        try {
            // Destructure parameters
            const { roomName, member, getPipedProducersAlt } = parameters;
            // Emit createReceiveAllTransportsPiped event to the server
            await new Promise((resolve, reject) => {
                nsock.emit('createReceiveAllTransportsPiped', { roomName, member }, async ({ producersExist }) => {
                    try {
                        // Array of options representing different levels
                        const options = ['0', '1', '2'];
                        // If producers exist, loop through each level and get producers
                        if (producersExist) {
                            for (const islevel of options) {
                                await getPipedProducersAlt({ nsock, islevel, parameters });
                            }
                        }
                        resolve();
                    }
                    catch (err) {
                        reject(err);
                    }
                });
            });
        }
        catch (error) {
            console.log('receiveAllPipedTransports error', error);
            // throw error;
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ReceiveAllPipedTransports, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ReceiveAllPipedTransports, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ReceiveAllPipedTransports, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjZWl2ZS1hbGwtcGlwZWQtdHJhbnNwb3J0cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9yZWNlaXZlLWFsbC1waXBlZC10cmFuc3BvcnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUEwQjNDLE1BQU0sT0FBTyx5QkFBeUI7SUFDcEM7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILHlCQUF5QixHQUFHLEtBQUssRUFBRSxFQUNqQyxLQUFLLEVBQ0wsVUFBVSxHQUN1QixFQUFpQixFQUFFO1FBQ3BELElBQUksQ0FBQztZQUNILHlCQUF5QjtZQUN6QixNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLFVBQVUsQ0FBQztZQUU5RCwyREFBMkQ7WUFDM0QsTUFBTSxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDMUMsS0FBSyxDQUFDLElBQUksQ0FDUixpQ0FBaUMsRUFDakMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQ3BCLEtBQUssRUFBRSxFQUFFLGNBQWMsRUFBK0IsRUFBRSxFQUFFO29CQUN4RCxJQUFJLENBQUM7d0JBQ0gsaURBQWlEO3dCQUNqRCxNQUFNLE9BQU8sR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBRWhDLGdFQUFnRTt3QkFDaEUsSUFBSSxjQUFjLEVBQUUsQ0FBQzs0QkFDbkIsS0FBSyxNQUFNLE9BQU8sSUFBSSxPQUFPLEVBQUUsQ0FBQztnQ0FDOUIsTUFBTSxvQkFBb0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQzs0QkFDN0QsQ0FBQzt3QkFDSCxDQUFDO3dCQUNELE9BQU8sRUFBRSxDQUFDO29CQUNaLENBQUM7b0JBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQzt3QkFDYixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2QsQ0FBQztnQkFDSCxDQUFDLENBQ0YsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3RELGVBQWU7UUFDakIsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0FsRFMseUJBQXlCOzJHQUF6Qix5QkFBeUIsY0FGeEIsTUFBTTs7MkZBRVAseUJBQXlCO2tCQUhyQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHsgR2V0UGlwZWRQcm9kdWNlcnNBbHRUeXBlLCBHZXRQaXBlZFByb2R1Y2Vyc0FsdFBhcmFtZXRlcnMgfSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHNQYXJhbWV0ZXJzIGV4dGVuZHMgR2V0UGlwZWRQcm9kdWNlcnNBbHRQYXJhbWV0ZXJzIHtcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgbWVtYmVyOiBzdHJpbmc7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIGdldFBpcGVkUHJvZHVjZXJzQWx0OiBHZXRQaXBlZFByb2R1Y2Vyc0FsdFR5cGU7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzT3B0aW9ucyB7XG4gIG5zb2NrOiBTb2NrZXQ7XG4gIHBhcmFtZXRlcnM6IFJlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHNQYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBSZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzVHlwZSA9IChcbiAgb3B0aW9uczogUmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0c09wdGlvbnMsXG4pID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBSZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzIHtcbiAgLyoqXG4gICAqIFJlY2VpdmVzIGFsbCBwaXBlZCB0cmFuc3BvcnRzIGJ5IGVtaXR0aW5nIGFuIGV2ZW50IHRvIHRoZSBzZXJ2ZXIgYW5kIHByb2Nlc3NpbmcgdGhlIHJlc3BvbnNlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHNPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHJlY2VpdmluZyBhbGwgcGlwZWQgdHJhbnNwb3J0cy5cbiAgICogQHBhcmFtIHthbnl9IG9wdGlvbnMubnNvY2sgLSBUaGUgc29ja2V0IGluc3RhbmNlIHVzZWQgZm9yIGNvbW11bmljYXRpb24uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3IgdGhlIG9wZXJhdGlvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLm1lbWJlciAtIFRoZSBtZW1iZXIgaWRlbnRpZmllci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmdldFBpcGVkUHJvZHVjZXJzQWx0IC0gVGhlIGZ1bmN0aW9uIHRvIGdldCBwaXBlZCBwcm9kdWNlcnMgZm9yIGEgZ2l2ZW4gbGV2ZWwuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBvcGVyYXRpb24gaXMgY29tcGxldGUuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCBsb2cgYW4gZXJyb3IgbWVzc2FnZSBpZiB0aGUgb3BlcmF0aW9uIGZhaWxzLlxuICAgKi9cbiAgcmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0cyA9IGFzeW5jICh7XG4gICAgbnNvY2ssXG4gICAgcGFyYW1ldGVycyxcbiAgfTogUmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0c09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgLy8gRGVzdHJ1Y3R1cmUgcGFyYW1ldGVyc1xuICAgICAgY29uc3QgeyByb29tTmFtZSwgbWVtYmVyLCBnZXRQaXBlZFByb2R1Y2Vyc0FsdCB9ID0gcGFyYW1ldGVycztcblxuICAgICAgLy8gRW1pdCBjcmVhdGVSZWNlaXZlQWxsVHJhbnNwb3J0c1BpcGVkIGV2ZW50IHRvIHRoZSBzZXJ2ZXJcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgbnNvY2suZW1pdChcbiAgICAgICAgICAnY3JlYXRlUmVjZWl2ZUFsbFRyYW5zcG9ydHNQaXBlZCcsXG4gICAgICAgICAgeyByb29tTmFtZSwgbWVtYmVyIH0sXG4gICAgICAgICAgYXN5bmMgKHsgcHJvZHVjZXJzRXhpc3QgfTogeyBwcm9kdWNlcnNFeGlzdDogYm9vbGVhbiB9KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAvLyBBcnJheSBvZiBvcHRpb25zIHJlcHJlc2VudGluZyBkaWZmZXJlbnQgbGV2ZWxzXG4gICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBbJzAnLCAnMScsICcyJ107XG5cbiAgICAgICAgICAgICAgLy8gSWYgcHJvZHVjZXJzIGV4aXN0LCBsb29wIHRocm91Z2ggZWFjaCBsZXZlbCBhbmQgZ2V0IHByb2R1Y2Vyc1xuICAgICAgICAgICAgICBpZiAocHJvZHVjZXJzRXhpc3QpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGlzbGV2ZWwgb2Ygb3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgYXdhaXQgZ2V0UGlwZWRQcm9kdWNlcnNBbHQoeyBuc29jaywgaXNsZXZlbCwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coJ3JlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHMgZXJyb3InLCBlcnJvcik7XG4gICAgICAvLyB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH07XG59XG4iXX0=