import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Receives all piped transports by emitting an event to the server and processing the response.
 *
 * This method communicates with the server to request piped transports for a specific room and member.
 * It checks if any producers exist and, if so, iterates through different levels to retrieve piped producers.
 *
 * @param {ReceiveAllPipedTransportsOptions} options - The options for receiving all piped transports.
 * @param {Socket} options.nsock - The socket instance used for communication.
 * @param {ReceiveAllPipedTransportsParameters} options.parameters - The parameters for the operation.
 * @param {string} options.parameters.roomName - The name of the room.
 * @param {string} options.parameters.member - The member identifier.
 * @param {GetPipedProducersAltType} options.parameters.getPipedProducersAlt - The function to get piped producers for a given level.
 *
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 *
 * @throws Will log an error message if the operation fails.
 *
 * @example
 * ```typescript
 * const options = {
 *   nsock: socketInstance,
 *   parameters: {
 *     roomName: 'Room1',
 *     member: 'Member1',
 *     getPipedProducersAlt: getPipedProducersAltFunction,
 *   },
 * };
 *
 * await receiveAllPipedTransports(options);
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjZWl2ZS1hbGwtcGlwZWQtdHJhbnNwb3J0cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9yZWNlaXZlLWFsbC1waXBlZC10cmFuc3BvcnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUF1QjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFLSCxNQUFNLE9BQU8seUJBQXlCO0lBQ3BDOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCx5QkFBeUIsR0FBRyxLQUFLLEVBQUUsRUFDakMsS0FBSyxFQUNMLFVBQVUsR0FDdUIsRUFBaUIsRUFBRTtRQUNwRCxJQUFJLENBQUM7WUFDSCx5QkFBeUI7WUFDekIsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFFOUQsMkRBQTJEO1lBQzNELE1BQU0sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQzFDLEtBQUssQ0FBQyxJQUFJLENBQ1IsaUNBQWlDLEVBQ2pDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUNwQixLQUFLLEVBQUUsRUFBRSxjQUFjLEVBQStCLEVBQUUsRUFBRTtvQkFDeEQsSUFBSSxDQUFDO3dCQUNILGlEQUFpRDt3QkFDakQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUVoQyxnRUFBZ0U7d0JBQ2hFLElBQUksY0FBYyxFQUFFLENBQUM7NEJBQ25CLEtBQUssTUFBTSxPQUFPLElBQUksT0FBTyxFQUFFLENBQUM7Z0NBQzlCLE1BQU0sb0JBQW9CLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7NEJBQzdELENBQUM7d0JBQ0gsQ0FBQzt3QkFDRCxPQUFPLEVBQUUsQ0FBQztvQkFDWixDQUFDO29CQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7d0JBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNkLENBQUM7Z0JBQ0gsQ0FBQyxDQUNGLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN0RCxlQUFlO1FBQ2pCLENBQUM7SUFDSCxDQUFDLENBQUM7dUdBbERTLHlCQUF5QjsyR0FBekIseUJBQXlCLGNBRnhCLE1BQU07OzJGQUVQLHlCQUF5QjtrQkFIckMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IEdldFBpcGVkUHJvZHVjZXJzQWx0VHlwZSwgR2V0UGlwZWRQcm9kdWNlcnNBbHRQYXJhbWV0ZXJzIH0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBSZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzUGFyYW1ldGVycyBleHRlbmRzIEdldFBpcGVkUHJvZHVjZXJzQWx0UGFyYW1ldGVycyB7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIG1lbWJlcjogc3RyaW5nO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBnZXRQaXBlZFByb2R1Y2Vyc0FsdDogR2V0UGlwZWRQcm9kdWNlcnNBbHRUeXBlO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0c09wdGlvbnMge1xuICBuc29jazogU29ja2V0O1xuICBwYXJhbWV0ZXJzOiBSZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgUmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0c1R5cGUgPSAoXG4gIG9wdGlvbnM6IFJlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHNPcHRpb25zLFxuKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIFJlY2VpdmVzIGFsbCBwaXBlZCB0cmFuc3BvcnRzIGJ5IGVtaXR0aW5nIGFuIGV2ZW50IHRvIHRoZSBzZXJ2ZXIgYW5kIHByb2Nlc3NpbmcgdGhlIHJlc3BvbnNlLlxuICpcbiAqIFRoaXMgbWV0aG9kIGNvbW11bmljYXRlcyB3aXRoIHRoZSBzZXJ2ZXIgdG8gcmVxdWVzdCBwaXBlZCB0cmFuc3BvcnRzIGZvciBhIHNwZWNpZmljIHJvb20gYW5kIG1lbWJlci5cbiAqIEl0IGNoZWNrcyBpZiBhbnkgcHJvZHVjZXJzIGV4aXN0IGFuZCwgaWYgc28sIGl0ZXJhdGVzIHRocm91Z2ggZGlmZmVyZW50IGxldmVscyB0byByZXRyaWV2ZSBwaXBlZCBwcm9kdWNlcnMuXG4gKlxuICogQHBhcmFtIHtSZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciByZWNlaXZpbmcgYWxsIHBpcGVkIHRyYW5zcG9ydHMuXG4gKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5uc29jayAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgdXNlZCBmb3IgY29tbXVuaWNhdGlvbi5cbiAqIEBwYXJhbSB7UmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0c1BhcmFtZXRlcnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGZvciB0aGUgb3BlcmF0aW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5tZW1iZXIgLSBUaGUgbWVtYmVyIGlkZW50aWZpZXIuXG4gKiBAcGFyYW0ge0dldFBpcGVkUHJvZHVjZXJzQWx0VHlwZX0gb3B0aW9ucy5wYXJhbWV0ZXJzLmdldFBpcGVkUHJvZHVjZXJzQWx0IC0gVGhlIGZ1bmN0aW9uIHRvIGdldCBwaXBlZCBwcm9kdWNlcnMgZm9yIGEgZ2l2ZW4gbGV2ZWwuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG9wZXJhdGlvbiBpcyBjb21wbGV0ZS5cbiAqXG4gKiBAdGhyb3dzIFdpbGwgbG9nIGFuIGVycm9yIG1lc3NhZ2UgaWYgdGhlIG9wZXJhdGlvbiBmYWlscy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3Qgb3B0aW9ucyA9IHtcbiAqICAgbnNvY2s6IHNvY2tldEluc3RhbmNlLFxuICogICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgcm9vbU5hbWU6ICdSb29tMScsXG4gKiAgICAgbWVtYmVyOiAnTWVtYmVyMScsXG4gKiAgICAgZ2V0UGlwZWRQcm9kdWNlcnNBbHQ6IGdldFBpcGVkUHJvZHVjZXJzQWx0RnVuY3Rpb24sXG4gKiAgIH0sXG4gKiB9O1xuICpcbiAqIGF3YWl0IHJlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHMob3B0aW9ucyk7XG4gKiBgYGBcbiAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUmVjZWl2ZUFsbFBpcGVkVHJhbnNwb3J0cyB7XG4gIC8qKlxuICAgKiBSZWNlaXZlcyBhbGwgcGlwZWQgdHJhbnNwb3J0cyBieSBlbWl0dGluZyBhbiBldmVudCB0byB0aGUgc2VydmVyIGFuZCBwcm9jZXNzaW5nIHRoZSByZXNwb25zZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciByZWNlaXZpbmcgYWxsIHBpcGVkIHRyYW5zcG9ydHMuXG4gICAqIEBwYXJhbSB7YW55fSBvcHRpb25zLm5zb2NrIC0gVGhlIHNvY2tldCBpbnN0YW5jZSB1c2VkIGZvciBjb21tdW5pY2F0aW9uLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHRoZSBvcGVyYXRpb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5tZW1iZXIgLSBUaGUgbWVtYmVyIGlkZW50aWZpZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5nZXRQaXBlZFByb2R1Y2Vyc0FsdCAtIFRoZSBmdW5jdGlvbiB0byBnZXQgcGlwZWQgcHJvZHVjZXJzIGZvciBhIGdpdmVuIGxldmVsLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgb3BlcmF0aW9uIGlzIGNvbXBsZXRlLlxuICAgKlxuICAgKiBAdGhyb3dzIFdpbGwgbG9nIGFuIGVycm9yIG1lc3NhZ2UgaWYgdGhlIG9wZXJhdGlvbiBmYWlscy5cbiAgICovXG4gIHJlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHMgPSBhc3luYyAoe1xuICAgIG5zb2NrLFxuICAgIHBhcmFtZXRlcnMsXG4gIH06IFJlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHNPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIERlc3RydWN0dXJlIHBhcmFtZXRlcnNcbiAgICAgIGNvbnN0IHsgcm9vbU5hbWUsIG1lbWJlciwgZ2V0UGlwZWRQcm9kdWNlcnNBbHQgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAgIC8vIEVtaXQgY3JlYXRlUmVjZWl2ZUFsbFRyYW5zcG9ydHNQaXBlZCBldmVudCB0byB0aGUgc2VydmVyXG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIG5zb2NrLmVtaXQoXG4gICAgICAgICAgJ2NyZWF0ZVJlY2VpdmVBbGxUcmFuc3BvcnRzUGlwZWQnLFxuICAgICAgICAgIHsgcm9vbU5hbWUsIG1lbWJlciB9LFxuICAgICAgICAgIGFzeW5jICh7IHByb2R1Y2Vyc0V4aXN0IH06IHsgcHJvZHVjZXJzRXhpc3Q6IGJvb2xlYW4gfSkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgLy8gQXJyYXkgb2Ygb3B0aW9ucyByZXByZXNlbnRpbmcgZGlmZmVyZW50IGxldmVsc1xuICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0gWycwJywgJzEnLCAnMiddO1xuXG4gICAgICAgICAgICAgIC8vIElmIHByb2R1Y2VycyBleGlzdCwgbG9vcCB0aHJvdWdoIGVhY2ggbGV2ZWwgYW5kIGdldCBwcm9kdWNlcnNcbiAgICAgICAgICAgICAgaWYgKHByb2R1Y2Vyc0V4aXN0KSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpc2xldmVsIG9mIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgIGF3YWl0IGdldFBpcGVkUHJvZHVjZXJzQWx0KHsgbnNvY2ssIGlzbGV2ZWwsIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdyZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzIGVycm9yJywgZXJyb3IpO1xuICAgICAgLy8gdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9O1xufVxuIl19