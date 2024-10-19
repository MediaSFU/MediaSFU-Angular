import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../sockets/socket-manager.service";
import * as i2 from "./socket-receive-methods/new-pipe-producer.service";
import * as i3 from "./socket-receive-methods/producer-closed.service";
import * as i4 from "./socket-receive-methods/join-consume-room.service";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC1pcHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvY29ubmVjdC1pcHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFzRDNDLE1BQU0sT0FBTyxVQUFVO0lBRVg7SUFDQTtJQUNBO0lBQ0E7SUFKVixZQUNVLG9CQUFtQyxFQUNuQyxzQkFBdUMsRUFDdkMscUJBQXFDLEVBQ3JDLHNCQUF1QztRQUh2Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQWU7UUFDbkMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUFpQjtRQUN2QywwQkFBcUIsR0FBckIscUJBQXFCLENBQWdCO1FBQ3JDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBaUI7SUFDOUMsQ0FBQztJQUVKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW9CRztJQUNILFVBQVUsR0FBRyxLQUFLLEVBQUUsRUFDbEIsZUFBZSxFQUNmLEtBQUssRUFDTCxXQUFXLEVBQ1gsTUFBTSxHQUFHLEVBQUUsRUFDWCxRQUFRLEdBQUcsRUFBRSxFQUNiLGlCQUFpQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLEVBQy9ELG9CQUFvQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLEVBQ2hFLHFCQUFxQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLEVBQ25FLFVBQVUsR0FDUSxFQUFnQixFQUFFO1FBQ3BDLElBQUksQ0FBQztZQUNILE1BQU0sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUscUJBQXFCLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFFN0UsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsTUFBTSxJ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QUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLENBQUM7SUFDSCxDQUFDLENBQUM7dUdBMUhTLFVBQVU7MkdBQVYsVUFBVSxjQUZULE1BQU07OzJGQUVQLFVBQVU7a0JBSHRCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0TWFuYWdlciB9IGZyb20gJy4uL3NvY2tldHMvc29ja2V0LW1hbmFnZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOZXdQaXBlUHJvZHVjZXIgfSBmcm9tICcuL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvbmV3LXBpcGUtcHJvZHVjZXIuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9kdWNlckNsb3NlZCB9IGZyb20gJy4vc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9wcm9kdWNlci1jbG9zZWQuc2VydmljZSc7XG5pbXBvcnQgeyBKb2luQ29uc3VtZVJvb20gfSBmcm9tICcuL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvam9pbi1jb25zdW1lLXJvb20uc2VydmljZSc7XG5pbXBvcnQgeyBEZXZpY2UgfSBmcm9tICdtZWRpYXNvdXAtY2xpZW50L2xpYi90eXBlcyc7XG5pbXBvcnQge1xuICBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMsXG4gIFJlb3JkZXJTdHJlYW1zVHlwZSxcbiAgTmV3UGlwZVByb2R1Y2VyUGFyYW1ldGVycyxcbiAgTmV3UGlwZVByb2R1Y2VyVHlwZSxcbiAgUHJvZHVjZXJDbG9zZWRUeXBlLFxuICBQcm9kdWNlckNsb3NlZFBhcmFtZXRlcnMsXG4gIEpvaW5Db25zdW1lUm9vbVR5cGUsXG4gIEpvaW5Db25zdW1lUm9vbVBhcmFtZXRlcnMsXG4gIENvbnN1bWVTb2NrZXQsXG59IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29ubmVjdElwc1BhcmFtZXRlcnNcbiAgZXh0ZW5kcyBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMsXG4gICAgSm9pbkNvbnN1bWVSb29tUGFyYW1ldGVycyxcbiAgICBQcm9kdWNlckNsb3NlZFBhcmFtZXRlcnMsXG4gICAgTmV3UGlwZVByb2R1Y2VyUGFyYW1ldGVycyB7XG4gIGRldmljZTogRGV2aWNlIHwgbnVsbDtcbiAgcm9vbVJlY3ZJUHM6IHN0cmluZ1tdO1xuICB1cGRhdGVSb29tUmVjdklQczogKHJvb21SZWN2SVBzOiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgdXBkYXRlQ29uc3VtZV9zb2NrZXRzOiAoY29uc3VtZV9zb2NrZXRzOiBDb25zdW1lU29ja2V0W10pID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIHJlb3JkZXJTdHJlYW1zOiBSZW9yZGVyU3RyZWFtc1R5cGU7XG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IENvbm5lY3RJcHNQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29ubmVjdElwc09wdGlvbnMge1xuICBjb25zdW1lX3NvY2tldHM6IENvbnN1bWVTb2NrZXRbXTtcbiAgcmVtSVA6IHN0cmluZ1tdO1xuICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICBhcGlLZXk/OiBzdHJpbmc7XG4gIGFwaVRva2VuOiBzdHJpbmc7XG4gIG5ld1Byb2R1Y2VyTWV0aG9kPzogTmV3UGlwZVByb2R1Y2VyVHlwZTtcbiAgY2xvc2VkUHJvZHVjZXJNZXRob2Q/OiBQcm9kdWNlckNsb3NlZFR5cGU7XG4gIGpvaW5Db25zdW1lUm9vbU1ldGhvZD86IEpvaW5Db25zdW1lUm9vbVR5cGU7XG4gIHBhcmFtZXRlcnM6IENvbm5lY3RJcHNQYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBDb25uZWN0SXBzVHlwZSA9IChcbiAgb3B0aW9uczogQ29ubmVjdElwc09wdGlvbnMsXG4pID0+IFByb21pc2U8W1JlY29yZDxzdHJpbmcsIGFueT5bXSwgc3RyaW5nW11dPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENvbm5lY3RJcHMge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHNvY2tldE1hbmFnZXJTZXJ2aWNlOiBTb2NrZXRNYW5hZ2VyLFxuICAgIHByaXZhdGUgbmV3UGlwZVByb2R1Y2VyU2VydmljZTogTmV3UGlwZVByb2R1Y2VyLFxuICAgIHByaXZhdGUgcHJvZHVjZXJDbG9zZWRTZXJ2aWNlOiBQcm9kdWNlckNsb3NlZCxcbiAgICBwcml2YXRlIGpvaW5Db25zdW1lUm9vbVNlcnZpY2U6IEpvaW5Db25zdW1lUm9vbSxcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBDb25uZWN0cyB0byByZW1vdGUgSVBzIGFuZCBtYW5hZ2VzIHNvY2tldCBjb25uZWN0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY29ubmVjdGluZyBJUHMuXG4gICAqIEBwYXJhbSB7UmVjb3JkPHN0cmluZywgYW55PltdfSBvcHRpb25zLmNvbnN1bWVfc29ja2V0cyAtIFRoZSBhcnJheSBvZiBjdXJyZW50IHNvY2tldCBjb25uZWN0aW9ucy5cbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gb3B0aW9ucy5yZW1JUCAtIFRoZSBsaXN0IG9mIHJlbW90ZSBJUHMgdG8gY29ubmVjdCB0by5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuYXBpVXNlck5hbWUgLSBUaGUgQVBJIHVzZXJuYW1lIGZvciBhdXRoZW50aWNhdGlvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmFwaUtleV0gLSBUaGUgQVBJIGtleSBmb3IgYXV0aGVudGljYXRpb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5hcGlUb2tlbl0gLSBUaGUgQVBJIHRva2VuIGZvciBhdXRoZW50aWNhdGlvbi5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMubmV3UHJvZHVjZXJNZXRob2Q9bmV3UGlwZVByb2R1Y2VyXSAtIFRoZSBtZXRob2QgdG8gaGFuZGxlIG5ldyBwaXBlIHByb2R1Y2VyIGV2ZW50cy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuY2xvc2VkUHJvZHVjZXJNZXRob2Q9cHJvZHVjZXJDbG9zZWRdIC0gVGhlIG1ldGhvZCB0byBoYW5kbGUgcHJvZHVjZXIgY2xvc2VkIGV2ZW50cy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuam9pbkNvbnN1bWVSb29tTWV0aG9kPWpvaW5Db25zdW1lUm9vbV0gLSBUaGUgbWV0aG9kIHRvIGhhbmRsZSBqb2luaW5nIGEgY29uc3VtaW5nIHJvb20uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBBZGRpdGlvbmFsIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IG9wdGlvbnMucGFyYW1ldGVycy5yb29tUmVjdklQcyAtIFRoZSBsaXN0IG9mIElQcyB0aGF0IGhhdmUgYmVlbiByZWNlaXZlZCBpbiB0aGUgcm9vbS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVJvb21SZWN2SVBzIC0gVGhlIGZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcm9vbSByZWNlaXZlZCBJUHMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVDb25zdW1lX3NvY2tldHMgLSBUaGUgZnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBjb25zdW1lIHNvY2tldHMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFtSZWNvcmQ8c3RyaW5nLCBhbnk+W10sIHN0cmluZ1tdXT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIHVwZGF0ZWQgY29uc3VtZSBzb2NrZXRzIGFuZCByb29tIHJlY2VpdmVkIElQcy5cbiAgICpcbiAgICogQHRocm93cyBXaWxsIHRocm93IGFuIGVycm9yIGlmIHJlcXVpcmVkIHBhcmFtZXRlcnMgYXJlIG1pc3Npbmcgb3IgaWYgdGhlcmUgaXMgYW4gaXNzdWUgY29ubmVjdGluZyB0byBhIHJlbW90ZSBJUC5cbiAgICovXG4gIGNvbm5lY3RJcHMgPSBhc3luYyAoe1xuICAgIGNvbnN1bWVfc29ja2V0cyxcbiAgICByZW1JUCxcbiAgICBhcGlVc2VyTmFtZSxcbiAgICBhcGlLZXkgPSAnJyxcbiAgICBhcGlUb2tlbiA9ICcnLFxuICAgIG5ld1Byb2R1Y2VyTWV0aG9kID0gdGhpcy5uZXdQaXBlUHJvZHVjZXJTZXJ2aWNlLm5ld1BpcGVQcm9kdWNlcixcbiAgICBjbG9zZWRQcm9kdWNlck1ldGhvZCA9IHRoaXMucHJvZHVjZXJDbG9zZWRTZXJ2aWNlLnByb2R1Y2VyQ2xvc2VkLFxuICAgIGpvaW5Db25zdW1lUm9vbU1ldGhvZCA9IHRoaXMuam9pbkNvbnN1bWVSb29tU2VydmljZS5qb2luQ29uc3VtZVJvb20sXG4gICAgcGFyYW1ldGVycyxcbiAgfTogQ29ubmVjdElwc09wdGlvbnMpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHJvb21SZWN2SVBzLCB1cGRhdGVSb29tUmVjdklQcywgdXBkYXRlQ29uc3VtZV9zb2NrZXRzIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgICBpZiAoIWNvbnN1bWVfc29ja2V0cyB8fCAhcmVtSVAgfHwgIWFwaVVzZXJOYW1lIHx8ICghYXBpS2V5ICYmICFhcGlUb2tlbikpIHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgJ01pc3NpbmcgcmVxdWlyZWQgcGFyYW1ldGVycyAtIGNvbnN1bWVfc29ja2V0cywgcmVtSVAsIGFwaVVzZXJOYW1lLCBhcGlLZXksIGFwaVRva2VuJyxcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIFtjb25zdW1lX3NvY2tldHMsIHJvb21SZWN2SVBzXTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIHJlbUlQLm1hcChhc3luYyAoaXApID0+IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIElQIGlzIGFscmVhZHkgY29ubmVjdGVkXG4gICAgICAgICAgICBjb25zdCBtYXRjaGluZyA9IGNvbnN1bWVfc29ja2V0cy5maW5kKFxuICAgICAgICAgICAgICAoc29ja2V0T2JqOiBhbnkpID0+IE9iamVjdC5rZXlzKHNvY2tldE9iailbMF0gPT0gaXAsXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hpbmcgfHwgIWlwIHx8IGlwID09PSAnJyB8fCBpcCA9PT0gbnVsbCB8fCBpcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIC8vIFNraXAgaWYgdGhlIElQIGlzIGFscmVhZHkgY29ubmVjdGVkXG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ29ubmVjdCB0byB0aGUgcmVtb3RlIHNvY2tldCB1c2luZyBzb2NrZXQuaW8tY2xpZW50XG4gICAgICAgICAgICBjb25zdCByZW1vdGVfc29jayA9IGF3YWl0IHRoaXMuc29ja2V0TWFuYWdlclNlcnZpY2UuY29ubmVjdFNvY2tldCh7XG4gICAgICAgICAgICAgIGFwaVVzZXJOYW1lLFxuICAgICAgICAgICAgICBhcGlLZXksXG4gICAgICAgICAgICAgIGFwaVRva2VuLFxuICAgICAgICAgICAgICBsaW5rOiBgaHR0cHM6Ly8ke2lwfS5tZWRpYXNmdS5jb21gLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEhhbmRsZSBzdWNjZXNzZnVsIGNvbm5lY3Rpb24gdG8gdGhlIHJlbW90ZSBzb2NrZXRcbiAgICAgICAgICAgIGlmIChyZW1vdGVfc29jay5pZCkge1xuICAgICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgSVAgaXMgaW4gdGhlIHJvb21SZWN2SVBzLCBpZiBub3QsIGFkZCBpdFxuICAgICAgICAgICAgICBpZiAoIXJvb21SZWN2SVBzLmluY2x1ZGVzKGlwKSkge1xuICAgICAgICAgICAgICAgIHJvb21SZWN2SVBzLnB1c2goaXApO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVJvb21SZWN2SVBzKHJvb21SZWN2SVBzKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIEhhbmRsZSBuZXcgcGlwZSBwcm9kdWNlciBldmVudFxuICAgICAgICAgICAgICByZW1vdGVfc29jay5vbihcbiAgICAgICAgICAgICAgICAnbmV3LXBpcGUtcHJvZHVjZXInLFxuICAgICAgICAgICAgICAgIGFzeW5jICh7IHByb2R1Y2VySWQsIGlzbGV2ZWwgfTogeyBwcm9kdWNlcklkOiBzdHJpbmc7IGlzbGV2ZWw6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICBhd2FpdCBuZXdQcm9kdWNlck1ldGhvZCh7IHByb2R1Y2VySWQsIGlzbGV2ZWwsIG5zb2NrOiByZW1vdGVfc29jaywgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgIC8vIEhhbmRsZSBwcm9kdWNlciBjbG9zZWQgZXZlbnRcbiAgICAgICAgICAgICAgcmVtb3RlX3NvY2sub24oXG4gICAgICAgICAgICAgICAgJ3Byb2R1Y2VyLWNsb3NlZCcsXG4gICAgICAgICAgICAgICAgYXN5bmMgKHsgcmVtb3RlUHJvZHVjZXJJZCB9OiB7IHJlbW90ZVByb2R1Y2VySWQ6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICBhd2FpdCBjbG9zZWRQcm9kdWNlck1ldGhvZCh7IHJlbW90ZVByb2R1Y2VySWQsIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAvLyBIYW5kbGUgbmV3IGNvbnN1bWluZyByb29tIGJ5IGpvaW5pbmcgdGhlIHJvb21cbiAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGpvaW5Db25zdW1lUm9vbU1ldGhvZCh7XG4gICAgICAgICAgICAgICAgcmVtb3RlX3NvY2ssXG4gICAgICAgICAgICAgICAgYXBpVG9rZW4sXG4gICAgICAgICAgICAgICAgYXBpVXNlck5hbWUsXG4gICAgICAgICAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGlmICghZGF0YS5ydHBDYXBhYmlsaXRpZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBBZGQgdGhlIHJlbW90ZSBzb2NrZXQgdG8gdGhlIGNvbnN1bWVfc29ja2V0cyBhcnJheVxuICAgICAgICAgICAgICBjb25zdW1lX3NvY2tldHMucHVzaCh7IFtpcF06IHJlbW90ZV9zb2NrIH0pO1xuICAgICAgICAgICAgICB1cGRhdGVDb25zdW1lX3NvY2tldHMoY29uc3VtZV9zb2NrZXRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8gSGFuZGxlIHRoZSBlcnJvclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Nvbm5lY3RJcHMgZXJyb3InLCBlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBbY29uc3VtZV9zb2NrZXRzLCByb29tUmVjdklQc107XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIEhhbmRsZSB0aGUgZXJyb3JcbiAgICAgIGNvbnNvbGUubG9nKCdjb25uZWN0SXBzIGVycm9yJywgZXJyb3IpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==