import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../sockets/socket-manager.service";
import * as i2 from "./socket-receive-methods/new-pipe-producer.service";
import * as i3 from "./socket-receive-methods/producer-closed.service";
import * as i4 from "./socket-receive-methods/join-consume-room.service";
/**
 * Connects to remote IPs and manages socket connections.
 *
 * This method establishes connections to remote IPs for media streaming, handles new pipe producer events,
 * and manages producer closure events. It updates the necessary state in the application to reflect
 * the current connections and stream configurations.
 *
 * @param {ConnectIpsOptions} options - The options for connecting IPs.
 * @param {Record<string, any>[]} options.consume_sockets - The array of current socket connections.
 * @param {string[]} options.remIP - The list of remote IPs to connect to.
 * @param {string} options.apiUserName - The API username for authentication.
 * @param {string} [options.apiKey] - The API key for authentication.
 * @param {string} [options.apiToken] - The API token for authentication.
 * @param {Function} [options.newProducerMethod] - The method to handle new pipe producer events (default: newPipeProducer).
 * @param {Function} [options.closedProducerMethod] - The method to handle producer closed events (default: producerClosed).
 * @param {Function} [options.joinConsumeRoomMethod] - The method to handle joining a consuming room (default: joinConsumeRoom).
 * @param {ConnectIpsParameters} options.parameters - Additional parameters for the operation.
 * @param {string[]} options.parameters.roomRecvIPs - The list of IPs that have been received in the room.
 * @param {Function} options.parameters.updateRoomRecvIPs - Function to update the room received IPs.
 * @param {Function} options.parameters.updateConsume_sockets - Function to update the consume sockets.
 *
 * @returns {Promise<[Record<string, any>[], string[]]>} A promise that resolves to an array containing the updated consume sockets and room received IPs.
 *
 * @throws Will throw an error if required parameters are missing or if there is an issue connecting to a remote IP.
 *
 * @example
 * ```typescript
 * const result = await connectIps({
 *   consume_sockets: currentSockets,
 *   remIP: ['192.168.1.1', '192.168.1.2'],
 *   apiUserName: 'username',
 *   apiKey: 'your-api-key',
 *   apiToken: 'your-api-token',
 *   parameters: {
 *     roomRecvIPs: [],
 *     updateRoomRecvIPs: (ips) => { },
 *     updateConsume_sockets: (sockets) => { },
 *     // ...other parameters
 *   },
 * });
 * ```
 */
export class ConnectIps {
    socketManagerService;
    newPipeProducerService;
    producerClosedService;
    joinConsumeRoomService;
    constructor(socketManagerService, newPipeProducerService, producerClosedService, joinConsumeRoomService) {
        this.socketManagerService = socketManagerService;
        this.newPipeProducerService = newPipeProducerService;
        this.producerClosedService = producerClosedService;
        this.joinConsumeRoomService = joinConsumeRoomService;
    }
    /**
     * Connects to remote IPs and manages socket connections.
     *
     * @param {Object} options - The options for connecting IPs.
     * @param {Record<string, any>[]} options.consume_sockets - The array of current socket connections.
     * @param {string[]} options.remIP - The list of remote IPs to connect to.
     * @param {string} options.apiUserName - The API username for authentication.
     * @param {string} [options.apiKey] - The API key for authentication.
     * @param {string} [options.apiToken] - The API token for authentication.
     * @param {Function} [options.newProducerMethod=newPipeProducer] - The method to handle new pipe producer events.
     * @param {Function} [options.closedProducerMethod=producerClosed] - The method to handle producer closed events.
     * @param {Function} [options.joinConsumeRoomMethod=joinConsumeRoom] - The method to handle joining a consuming room.
     * @param {Object} options.parameters - Additional parameters.
     * @param {string[]} options.parameters.roomRecvIPs - The list of IPs that have been received in the room.
     * @param {Function} options.parameters.updateRoomRecvIPs - The function to update the room received IPs.
     * @param {Function} options.parameters.updateConsume_sockets - The function to update the consume sockets.
     *
     * @returns {Promise<[Record<string, any>[], string[]]>} A promise that resolves to an array containing the updated consume sockets and room received IPs.
     *
     * @throws Will throw an error if required parameters are missing or if there is an issue connecting to a remote IP.
     */
    connectIps = async ({ consume_sockets, remIP, apiUserName, apiKey = '', apiToken = '', newProducerMethod = this.newPipeProducerService.newPipeProducer, closedProducerMethod = this.producerClosedService.producerClosed, joinConsumeRoomMethod = this.joinConsumeRoomService.joinConsumeRoom, parameters, }) => {
        try {
            const { roomRecvIPs, updateRoomRecvIPs, updateConsume_sockets } = parameters;
            if (!consume_sockets || !remIP || !apiUserName || (!apiKey && !apiToken)) {
                console.log('Missing required parameters - consume_sockets, remIP, apiUserName, apiKey, apiToken');
                return [consume_sockets, roomRecvIPs];
            }
            await Promise.all(remIP.map(async (ip) => {
                try {
                    // Check if the IP is already connected
                    const matching = consume_sockets.find((socketObj) => Object.keys(socketObj)[0] == ip);
                    if (matching || !ip || ip === '' || ip === null || ip === undefined) {
                        // Skip if the IP is already connected
                        return;
                    }
                    // Connect to the remote socket using socket.io-client
                    const remote_sock = await this.socketManagerService.connectSocket({
                        apiUserName,
                        apiKey,
                        apiToken,
                        link: `https://${ip}.mediasfu.com`,
                    });
                    // Handle successful connection to the remote socket
                    if (remote_sock.id) {
                        // Check if the IP is in the roomRecvIPs, if not, add it
                        if (!roomRecvIPs.includes(ip)) {
                            roomRecvIPs.push(ip);
                            updateRoomRecvIPs(roomRecvIPs);
                        }
                        // Handle new pipe producer event
                        remote_sock.on('new-pipe-producer', async ({ producerId, islevel }) => {
                            await newProducerMethod({ producerId, islevel, nsock: remote_sock, parameters });
                        });
                        // Handle producer closed event
                        remote_sock.on('producer-closed', async ({ remoteProducerId }) => {
                            await closedProducerMethod({ remoteProducerId, parameters });
                        });
                        // Handle new consuming room by joining the room
                        const data = await joinConsumeRoomMethod({
                            remote_sock,
                            apiToken,
                            apiUserName,
                            parameters,
                        });
                        if (!data.rtpCapabilities) {
                            return;
                        }
                        // Add the remote socket to the consume_sockets array
                        consume_sockets.push({ [ip]: remote_sock });
                        updateConsume_sockets(consume_sockets);
                    }
                }
                catch (error) {
                    // Handle the error
                    console.log('connectIps error', error);
                }
            }));
            return [consume_sockets, roomRecvIPs];
        }
        catch (error) {
            // Handle the error
            console.log('connectIps error', error);
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectIps, deps: [{ token: i1.SocketManager }, { token: i2.NewPipeProducer }, { token: i3.ProducerClosed }, { token: i4.JoinConsumeRoom }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectIps, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectIps, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.SocketManager }, { type: i2.NewPipeProducer }, { type: i3.ProducerClosed }, { type: i4.JoinConsumeRoom }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC1pcHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvY29ubmVjdC1pcHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFtRDNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlDRztBQU9ILE1BQU0sT0FBTyxVQUFVO0lBRVg7SUFDQTtJQUNBO0lBQ0E7SUFKVixZQUNVLG9CQUFtQyxFQUNuQyxzQkFBdUMsRUFDdkMscUJBQXFDLEVBQ3JDLHNCQUF1QztRQUh2Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQWU7UUFDbkMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUFpQjtRQUN2QywwQkFBcUIsR0FBckIscUJBQXFCLENBQWdCO1FBQ3JDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBaUI7SUFDOUMsQ0FBQztJQUVKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW9CRztJQUNILFVBQVUsR0FBRyxLQUFLLEVBQUUsRUFDbEIsZUFBZSxFQUNmLEtBQUssRUFDTCxXQUFXLEVBQ1gsTUFBTSxHQUFHLEVBQUUsRUFDWCxRQUFRLEdBQUcsRUFBRSxFQUNiLGlCQUFpQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLEVBQy9ELG9CQUFvQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLEVBQ2hFLHFCQUFxQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLEVBQ25FLFVBQVUsR0FDUSxFQUFnQixFQUFFO1FBQ3BDLElBQUksQ0FBQztZQUNILE1BQU0sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUscUJBQXFCLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFFN0UsSUFBSSxDQUFDLGVBQWUs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O1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLG1CQUFtQjtZQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLENBQUM7SUFDSCxDQUFDLENBQUM7dUdBMUhTLFVBQVU7MkdBQVYsVUFBVSxjQUZULE1BQU07OzJGQUVQLFVBQVU7a0JBSHRCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0TWFuYWdlciB9IGZyb20gJy4uL3NvY2tldHMvc29ja2V0LW1hbmFnZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOZXdQaXBlUHJvZHVjZXIgfSBmcm9tICcuL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvbmV3LXBpcGUtcHJvZHVjZXIuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9kdWNlckNsb3NlZCB9IGZyb20gJy4vc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9wcm9kdWNlci1jbG9zZWQuc2VydmljZSc7XG5pbXBvcnQgeyBKb2luQ29uc3VtZVJvb20gfSBmcm9tICcuL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvam9pbi1jb25zdW1lLXJvb20uc2VydmljZSc7XG5pbXBvcnQgeyBEZXZpY2UgfSBmcm9tICdtZWRpYXNvdXAtY2xpZW50L2xpYi90eXBlcyc7XG5pbXBvcnQge1xuICBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMsXG4gIFJlb3JkZXJTdHJlYW1zVHlwZSxcbiAgTmV3UGlwZVByb2R1Y2VyUGFyYW1ldGVycyxcbiAgTmV3UGlwZVByb2R1Y2VyVHlwZSxcbiAgUHJvZHVjZXJDbG9zZWRUeXBlLFxuICBQcm9kdWNlckNsb3NlZFBhcmFtZXRlcnMsXG4gIEpvaW5Db25zdW1lUm9vbVR5cGUsXG4gIEpvaW5Db25zdW1lUm9vbVBhcmFtZXRlcnMsXG4gIENvbnN1bWVTb2NrZXQsXG59IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29ubmVjdElwc1BhcmFtZXRlcnNcbiAgZXh0ZW5kcyBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMsXG4gICAgSm9pbkNvbnN1bWVSb29tUGFyYW1ldGVycyxcbiAgICBQcm9kdWNlckNsb3NlZFBhcmFtZXRlcnMsXG4gICAgTmV3UGlwZVByb2R1Y2VyUGFyYW1ldGVycyB7XG4gIGRldmljZTogRGV2aWNlIHwgbnVsbDtcbiAgcm9vbVJlY3ZJUHM6IHN0cmluZ1tdO1xuICB1cGRhdGVSb29tUmVjdklQczogKHJvb21SZWN2SVBzOiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgdXBkYXRlQ29uc3VtZV9zb2NrZXRzOiAoY29uc3VtZV9zb2NrZXRzOiBDb25zdW1lU29ja2V0W10pID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIHJlb3JkZXJTdHJlYW1zOiBSZW9yZGVyU3RyZWFtc1R5cGU7XG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IENvbm5lY3RJcHNQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29ubmVjdElwc09wdGlvbnMge1xuICBjb25zdW1lX3NvY2tldHM6IENvbnN1bWVTb2NrZXRbXTtcbiAgcmVtSVA6IHN0cmluZ1tdO1xuICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICBhcGlLZXk/OiBzdHJpbmc7XG4gIGFwaVRva2VuOiBzdHJpbmc7XG4gIG5ld1Byb2R1Y2VyTWV0aG9kPzogTmV3UGlwZVByb2R1Y2VyVHlwZTtcbiAgY2xvc2VkUHJvZHVjZXJNZXRob2Q/OiBQcm9kdWNlckNsb3NlZFR5cGU7XG4gIGpvaW5Db25zdW1lUm9vbU1ldGhvZD86IEpvaW5Db25zdW1lUm9vbVR5cGU7XG4gIHBhcmFtZXRlcnM6IENvbm5lY3RJcHNQYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBDb25uZWN0SXBzVHlwZSA9IChcbiAgb3B0aW9uczogQ29ubmVjdElwc09wdGlvbnMsXG4pID0+IFByb21pc2U8W1JlY29yZDxzdHJpbmcsIGFueT5bXSwgc3RyaW5nW11dPjtcblxuLyoqXG4gKiBDb25uZWN0cyB0byByZW1vdGUgSVBzIGFuZCBtYW5hZ2VzIHNvY2tldCBjb25uZWN0aW9ucy5cbiAqXG4gKiBUaGlzIG1ldGhvZCBlc3RhYmxpc2hlcyBjb25uZWN0aW9ucyB0byByZW1vdGUgSVBzIGZvciBtZWRpYSBzdHJlYW1pbmcsIGhhbmRsZXMgbmV3IHBpcGUgcHJvZHVjZXIgZXZlbnRzLFxuICogYW5kIG1hbmFnZXMgcHJvZHVjZXIgY2xvc3VyZSBldmVudHMuIEl0IHVwZGF0ZXMgdGhlIG5lY2Vzc2FyeSBzdGF0ZSBpbiB0aGUgYXBwbGljYXRpb24gdG8gcmVmbGVjdFxuICogdGhlIGN1cnJlbnQgY29ubmVjdGlvbnMgYW5kIHN0cmVhbSBjb25maWd1cmF0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge0Nvbm5lY3RJcHNPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNvbm5lY3RpbmcgSVBzLlxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBhbnk+W119IG9wdGlvbnMuY29uc3VtZV9zb2NrZXRzIC0gVGhlIGFycmF5IG9mIGN1cnJlbnQgc29ja2V0IGNvbm5lY3Rpb25zLlxuICogQHBhcmFtIHtzdHJpbmdbXX0gb3B0aW9ucy5yZW1JUCAtIFRoZSBsaXN0IG9mIHJlbW90ZSBJUHMgdG8gY29ubmVjdCB0by5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmFwaVVzZXJOYW1lIC0gVGhlIEFQSSB1c2VybmFtZSBmb3IgYXV0aGVudGljYXRpb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuYXBpS2V5XSAtIFRoZSBBUEkga2V5IGZvciBhdXRoZW50aWNhdGlvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5hcGlUb2tlbl0gLSBUaGUgQVBJIHRva2VuIGZvciBhdXRoZW50aWNhdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLm5ld1Byb2R1Y2VyTWV0aG9kXSAtIFRoZSBtZXRob2QgdG8gaGFuZGxlIG5ldyBwaXBlIHByb2R1Y2VyIGV2ZW50cyAoZGVmYXVsdDogbmV3UGlwZVByb2R1Y2VyKS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmNsb3NlZFByb2R1Y2VyTWV0aG9kXSAtIFRoZSBtZXRob2QgdG8gaGFuZGxlIHByb2R1Y2VyIGNsb3NlZCBldmVudHMgKGRlZmF1bHQ6IHByb2R1Y2VyQ2xvc2VkKS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmpvaW5Db25zdW1lUm9vbU1ldGhvZF0gLSBUaGUgbWV0aG9kIHRvIGhhbmRsZSBqb2luaW5nIGEgY29uc3VtaW5nIHJvb20gKGRlZmF1bHQ6IGpvaW5Db25zdW1lUm9vbSkuXG4gKiBAcGFyYW0ge0Nvbm5lY3RJcHNQYXJhbWV0ZXJzfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBBZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIHRoZSBvcGVyYXRpb24uXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBvcHRpb25zLnBhcmFtZXRlcnMucm9vbVJlY3ZJUHMgLSBUaGUgbGlzdCBvZiBJUHMgdGhhdCBoYXZlIGJlZW4gcmVjZWl2ZWQgaW4gdGhlIHJvb20uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUm9vbVJlY3ZJUHMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHJvb20gcmVjZWl2ZWQgSVBzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUNvbnN1bWVfc29ja2V0cyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgY29uc3VtZSBzb2NrZXRzLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPFtSZWNvcmQ8c3RyaW5nLCBhbnk+W10sIHN0cmluZ1tdXT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIHVwZGF0ZWQgY29uc3VtZSBzb2NrZXRzIGFuZCByb29tIHJlY2VpdmVkIElQcy5cbiAqXG4gKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgcmVxdWlyZWQgcGFyYW1ldGVycyBhcmUgbWlzc2luZyBvciBpZiB0aGVyZSBpcyBhbiBpc3N1ZSBjb25uZWN0aW5nIHRvIGEgcmVtb3RlIElQLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCByZXN1bHQgPSBhd2FpdCBjb25uZWN0SXBzKHtcbiAqICAgY29uc3VtZV9zb2NrZXRzOiBjdXJyZW50U29ja2V0cyxcbiAqICAgcmVtSVA6IFsnMTkyLjE2OC4xLjEnLCAnMTkyLjE2OC4xLjInXSxcbiAqICAgYXBpVXNlck5hbWU6ICd1c2VybmFtZScsXG4gKiAgIGFwaUtleTogJ3lvdXItYXBpLWtleScsXG4gKiAgIGFwaVRva2VuOiAneW91ci1hcGktdG9rZW4nLFxuICogICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgcm9vbVJlY3ZJUHM6IFtdLFxuICogICAgIHVwZGF0ZVJvb21SZWN2SVBzOiAoaXBzKSA9PiB7IH0sXG4gKiAgICAgdXBkYXRlQ29uc3VtZV9zb2NrZXRzOiAoc29ja2V0cykgPT4geyB9LFxuICogICAgIC8vIC4uLm90aGVyIHBhcmFtZXRlcnNcbiAqICAgfSxcbiAqIH0pO1xuICogYGBgXG4gKi9cblxuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDb25uZWN0SXBzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzb2NrZXRNYW5hZ2VyU2VydmljZTogU29ja2V0TWFuYWdlcixcbiAgICBwcml2YXRlIG5ld1BpcGVQcm9kdWNlclNlcnZpY2U6IE5ld1BpcGVQcm9kdWNlcixcbiAgICBwcml2YXRlIHByb2R1Y2VyQ2xvc2VkU2VydmljZTogUHJvZHVjZXJDbG9zZWQsXG4gICAgcHJpdmF0ZSBqb2luQ29uc3VtZVJvb21TZXJ2aWNlOiBKb2luQ29uc3VtZVJvb20sXG4gICkge31cblxuICAvKipcbiAgICogQ29ubmVjdHMgdG8gcmVtb3RlIElQcyBhbmQgbWFuYWdlcyBzb2NrZXQgY29ubmVjdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNvbm5lY3RpbmcgSVBzLlxuICAgKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIGFueT5bXX0gb3B0aW9ucy5jb25zdW1lX3NvY2tldHMgLSBUaGUgYXJyYXkgb2YgY3VycmVudCBzb2NrZXQgY29ubmVjdGlvbnMuXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IG9wdGlvbnMucmVtSVAgLSBUaGUgbGlzdCBvZiByZW1vdGUgSVBzIHRvIGNvbm5lY3QgdG8uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmFwaVVzZXJOYW1lIC0gVGhlIEFQSSB1c2VybmFtZSBmb3IgYXV0aGVudGljYXRpb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5hcGlLZXldIC0gVGhlIEFQSSBrZXkgZm9yIGF1dGhlbnRpY2F0aW9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuYXBpVG9rZW5dIC0gVGhlIEFQSSB0b2tlbiBmb3IgYXV0aGVudGljYXRpb24uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLm5ld1Byb2R1Y2VyTWV0aG9kPW5ld1BpcGVQcm9kdWNlcl0gLSBUaGUgbWV0aG9kIHRvIGhhbmRsZSBuZXcgcGlwZSBwcm9kdWNlciBldmVudHMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmNsb3NlZFByb2R1Y2VyTWV0aG9kPXByb2R1Y2VyQ2xvc2VkXSAtIFRoZSBtZXRob2QgdG8gaGFuZGxlIHByb2R1Y2VyIGNsb3NlZCBldmVudHMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmpvaW5Db25zdW1lUm9vbU1ldGhvZD1qb2luQ29uc3VtZVJvb21dIC0gVGhlIG1ldGhvZCB0byBoYW5kbGUgam9pbmluZyBhIGNvbnN1bWluZyByb29tLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gQWRkaXRpb25hbCBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBvcHRpb25zLnBhcmFtZXRlcnMucm9vbVJlY3ZJUHMgLSBUaGUgbGlzdCBvZiBJUHMgdGhhdCBoYXZlIGJlZW4gcmVjZWl2ZWQgaW4gdGhlIHJvb20uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVSb29tUmVjdklQcyAtIFRoZSBmdW5jdGlvbiB0byB1cGRhdGUgdGhlIHJvb20gcmVjZWl2ZWQgSVBzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQ29uc3VtZV9zb2NrZXRzIC0gVGhlIGZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgY29uc3VtZSBzb2NrZXRzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxbUmVjb3JkPHN0cmluZywgYW55PltdLCBzdHJpbmdbXV0+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBhcnJheSBjb250YWluaW5nIHRoZSB1cGRhdGVkIGNvbnN1bWUgc29ja2V0cyBhbmQgcm9vbSByZWNlaXZlZCBJUHMuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiByZXF1aXJlZCBwYXJhbWV0ZXJzIGFyZSBtaXNzaW5nIG9yIGlmIHRoZXJlIGlzIGFuIGlzc3VlIGNvbm5lY3RpbmcgdG8gYSByZW1vdGUgSVAuXG4gICAqL1xuICBjb25uZWN0SXBzID0gYXN5bmMgKHtcbiAgICBjb25zdW1lX3NvY2tldHMsXG4gICAgcmVtSVAsXG4gICAgYXBpVXNlck5hbWUsXG4gICAgYXBpS2V5ID0gJycsXG4gICAgYXBpVG9rZW4gPSAnJyxcbiAgICBuZXdQcm9kdWNlck1ldGhvZCA9IHRoaXMubmV3UGlwZVByb2R1Y2VyU2VydmljZS5uZXdQaXBlUHJvZHVjZXIsXG4gICAgY2xvc2VkUHJvZHVjZXJNZXRob2QgPSB0aGlzLnByb2R1Y2VyQ2xvc2VkU2VydmljZS5wcm9kdWNlckNsb3NlZCxcbiAgICBqb2luQ29uc3VtZVJvb21NZXRob2QgPSB0aGlzLmpvaW5Db25zdW1lUm9vbVNlcnZpY2Uuam9pbkNvbnN1bWVSb29tLFxuICAgIHBhcmFtZXRlcnMsXG4gIH06IENvbm5lY3RJcHNPcHRpb25zKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyByb29tUmVjdklQcywgdXBkYXRlUm9vbVJlY3ZJUHMsIHVwZGF0ZUNvbnN1bWVfc29ja2V0cyB9ID0gcGFyYW1ldGVycztcblxuICAgICAgaWYgKCFjb25zdW1lX3NvY2tldHMgfHwgIXJlbUlQIHx8ICFhcGlVc2VyTmFtZSB8fCAoIWFwaUtleSAmJiAhYXBpVG9rZW4pKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICdNaXNzaW5nIHJlcXVpcmVkIHBhcmFtZXRlcnMgLSBjb25zdW1lX3NvY2tldHMsIHJlbUlQLCBhcGlVc2VyTmFtZSwgYXBpS2V5LCBhcGlUb2tlbicsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBbY29uc3VtZV9zb2NrZXRzLCByb29tUmVjdklQc107XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICByZW1JUC5tYXAoYXN5bmMgKGlwKSA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBJUCBpcyBhbHJlYWR5IGNvbm5lY3RlZFxuICAgICAgICAgICAgY29uc3QgbWF0Y2hpbmcgPSBjb25zdW1lX3NvY2tldHMuZmluZChcbiAgICAgICAgICAgICAgKHNvY2tldE9iajogYW55KSA9PiBPYmplY3Qua2V5cyhzb2NrZXRPYmopWzBdID09IGlwLFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKG1hdGNoaW5nIHx8ICFpcCB8fCBpcCA9PT0gJycgfHwgaXAgPT09IG51bGwgfHwgaXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAvLyBTa2lwIGlmIHRoZSBJUCBpcyBhbHJlYWR5IGNvbm5lY3RlZFxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENvbm5lY3QgdG8gdGhlIHJlbW90ZSBzb2NrZXQgdXNpbmcgc29ja2V0LmlvLWNsaWVudFxuICAgICAgICAgICAgY29uc3QgcmVtb3RlX3NvY2sgPSBhd2FpdCB0aGlzLnNvY2tldE1hbmFnZXJTZXJ2aWNlLmNvbm5lY3RTb2NrZXQoe1xuICAgICAgICAgICAgICBhcGlVc2VyTmFtZSxcbiAgICAgICAgICAgICAgYXBpS2V5LFxuICAgICAgICAgICAgICBhcGlUb2tlbixcbiAgICAgICAgICAgICAgbGluazogYGh0dHBzOi8vJHtpcH0ubWVkaWFzZnUuY29tYCxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBIYW5kbGUgc3VjY2Vzc2Z1bCBjb25uZWN0aW9uIHRvIHRoZSByZW1vdGUgc29ja2V0XG4gICAgICAgICAgICBpZiAocmVtb3RlX3NvY2suaWQpIHtcbiAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIElQIGlzIGluIHRoZSByb29tUmVjdklQcywgaWYgbm90LCBhZGQgaXRcbiAgICAgICAgICAgICAgaWYgKCFyb29tUmVjdklQcy5pbmNsdWRlcyhpcCkpIHtcbiAgICAgICAgICAgICAgICByb29tUmVjdklQcy5wdXNoKGlwKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVSb29tUmVjdklQcyhyb29tUmVjdklQcyk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBIYW5kbGUgbmV3IHBpcGUgcHJvZHVjZXIgZXZlbnRcbiAgICAgICAgICAgICAgcmVtb3RlX3NvY2sub24oXG4gICAgICAgICAgICAgICAgJ25ldy1waXBlLXByb2R1Y2VyJyxcbiAgICAgICAgICAgICAgICBhc3luYyAoeyBwcm9kdWNlcklkLCBpc2xldmVsIH06IHsgcHJvZHVjZXJJZDogc3RyaW5nOyBpc2xldmVsOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgYXdhaXQgbmV3UHJvZHVjZXJNZXRob2QoeyBwcm9kdWNlcklkLCBpc2xldmVsLCBuc29jazogcmVtb3RlX3NvY2ssIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAvLyBIYW5kbGUgcHJvZHVjZXIgY2xvc2VkIGV2ZW50XG4gICAgICAgICAgICAgIHJlbW90ZV9zb2NrLm9uKFxuICAgICAgICAgICAgICAgICdwcm9kdWNlci1jbG9zZWQnLFxuICAgICAgICAgICAgICAgIGFzeW5jICh7IHJlbW90ZVByb2R1Y2VySWQgfTogeyByZW1vdGVQcm9kdWNlcklkOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgYXdhaXQgY2xvc2VkUHJvZHVjZXJNZXRob2QoeyByZW1vdGVQcm9kdWNlcklkLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgLy8gSGFuZGxlIG5ldyBjb25zdW1pbmcgcm9vbSBieSBqb2luaW5nIHRoZSByb29tXG4gICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBqb2luQ29uc3VtZVJvb21NZXRob2Qoe1xuICAgICAgICAgICAgICAgIHJlbW90ZV9zb2NrLFxuICAgICAgICAgICAgICAgIGFwaVRva2VuLFxuICAgICAgICAgICAgICAgIGFwaVVzZXJOYW1lLFxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBpZiAoIWRhdGEucnRwQ2FwYWJpbGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gQWRkIHRoZSByZW1vdGUgc29ja2V0IHRvIHRoZSBjb25zdW1lX3NvY2tldHMgYXJyYXlcbiAgICAgICAgICAgICAgY29uc3VtZV9zb2NrZXRzLnB1c2goeyBbaXBdOiByZW1vdGVfc29jayB9KTtcbiAgICAgICAgICAgICAgdXBkYXRlQ29uc3VtZV9zb2NrZXRzKGNvbnN1bWVfc29ja2V0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSB0aGUgZXJyb3JcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb25uZWN0SXBzIGVycm9yJywgZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gW2NvbnN1bWVfc29ja2V0cywgcm9vbVJlY3ZJUHNdO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBIYW5kbGUgdGhlIGVycm9yXG4gICAgICBjb25zb2xlLmxvZygnY29ubmVjdElwcyBlcnJvcicsIGVycm9yKTtcbiAgICB9XG4gIH07XG59XG4iXX0=