import { Injectable } from '@angular/core';
// Socket manager for media socket.
import io from 'socket.io-client'; // Importing socket type
import * as i0 from "@angular/core";
/**
 * Manages connections to a media socket, allowing users to connect or disconnect based on API credentials.
 *
 * @class
 * @name SocketManager
 * @description Provides methods to connect and disconnect from a media socket using a provided API key or token.
 *
 * @method
 * validateApiKeyToken - Validates the API key or token for correct format.
 * connectSocket - Establishes a connection to the media socket using either the API key or token.
 * disconnectSocket - Disconnects an active socket connection.
 *
 * @example
 * ```typescript
 * const socketManager = new SocketManager();
 *
 * // Example of connecting to the socket
 * const socketConnection = await socketManager.connectSocket({
 *   apiUserName: 'user123',
 *   apiKey: 'validApiKeyOf64Characters',
 *   link: 'https://socketserver.example.com'
 * });
 *
 * // Example of disconnecting the socket
 * const isDisconnected = await socketManager.disconnectSocket({
 *   socket: socketConnection
 * });
 * ```
 *
 * @typedef {Object} ConnectSocketOptions
 * @property {string} apiUserName - Username for the API.
 * @property {string} [apiKey] - The API key for authentication.
 * @property {string} [apiToken] - The API token for authentication.
 * @property {string} link - The socket server link.
 *
 * @typedef {Object} DisconnectSocketOptions
 * @property {Socket} socket - The socket instance to disconnect.
 *
 * @returns {Promise<Socket | boolean>} The active socket instance on connection, or a boolean indicating disconnection success.
 */
export class SocketManager {
    socket;
    async validateApiKeyToken(value) {
        if (!/^[a-z0-9]{64}$/i.test(value)) {
            throw new Error('Invalid API key or token.');
        }
        return true;
    }
    connectSocket = async ({ apiUserName, apiKey, apiToken, link, }) => {
        if (!apiUserName) {
            throw new Error('API username required.');
        }
        if (!(apiKey || apiToken)) {
            throw new Error('API key or token required.');
        }
        if (!link) {
            throw new Error('Socket link required.');
        }
        let useKey = false;
        try {
            if (apiKey && apiKey.length === 64) {
                await this.validateApiKeyToken(apiKey);
                useKey = true;
            }
            else {
                if (apiToken) {
                    await this.validateApiKeyToken(apiToken);
                }
                else {
                    throw new Error('API token is required.');
                }
                useKey = false;
            }
        }
        catch (error) {
            throw new Error('Invalid API key or token.');
        }
        return new Promise((resolve, reject) => {
            const query = useKey ? { apiUserName, apiKey } : { apiUserName, apiToken };
            this.socket = io(`${link}/media`, {
                transports: ['websocket'],
                query,
            });
            this.socket.on('connect', () => {
                console.log('Connected to media socket.', this.socket.id);
                resolve(this.socket);
            });
            this.socket.on('connect_error', () => {
                reject(new Error('Error connecting to media socket.'));
            });
        });
    };
    disconnectSocket = async ({ socket }) => {
        if (socket) {
            socket.disconnect();
            return true;
        }
        return false;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SocketManager, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SocketManager, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SocketManager, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LW1hbmFnZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9zb2NrZXRzL3NvY2tldC1tYW5hZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxtQ0FBbUM7QUFDbkMsT0FBTyxFQUFjLE1BQU0sa0JBQWtCLENBQUMsQ0FBQyx3QkFBd0I7O0FBdUJ2RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNHO0FBTUgsTUFBTSxPQUFPLGFBQWE7SUFDaEIsTUFBTSxDQUFVO0lBRXhCLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxLQUFhO1FBQ3JDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELGFBQWEsR0FBRyxLQUFLLEVBQUUsRUFDckIsV0FBVyxFQUNYLE1BQU0sRUFDTixRQUFRLEVBQ1IsSUFBSSxHQUNpQixFQUFtQixFQUFFO1FBQzFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFFRCxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDO1lBQ0gsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUUsQ0FBQztnQkFDbkMsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDaEIsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLElBQUksUUFBUSxFQUFFLENBQUM7b0JBQ2IsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzNDLENBQUM7cUJBQU0sQ0FBQztvQkFDTixNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7Z0JBQzVDLENBQUM7Z0JBQ0QsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNqQixDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLENBQUM7WUFFM0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLFFBQVEsRUFBRTtnQkFDaEMsVUFBVSxFQUFFLENBQUMsV0FBVyxDQUFDO2dCQUN6QixLQUFLO2FBQ04sQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtnQkFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtnQkFDbkMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsQ0FBQztZQUN6RCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0lBRUYsZ0JBQWdCLEdBQUcsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUEyQixFQUFvQixFQUFFO1FBQ2pGLElBQUksTUFBTSxFQUFFLENBQUM7WUFDWCxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDcEIsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDLENBQUM7dUdBcEVTLGFBQWE7MkdBQWIsYUFBYSxjQUZaLE1BQU07OzJGQUVQLGFBQWE7a0JBSHpCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gU29ja2V0IG1hbmFnZXIgZm9yIG1lZGlhIHNvY2tldC5cbmltcG9ydCBpbywgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JzsgLy8gSW1wb3J0aW5nIHNvY2tldCB0eXBlXG5cbi8qKlxuICogVmFsaWRhdGVzIHRoZSBwcm92aWRlZCBBUEkga2V5IG9yIHRva2VuLlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gVGhlIEFQSSBrZXkgb3IgdG9rZW4gdG8gdmFsaWRhdGUuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxCb29sZWFuPn0gLSBUcnVlIGlmIHRoZSBBUEkga2V5IG9yIHRva2VuIGlzIHZhbGlkLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBDb25uZWN0U29ja2V0T3B0aW9ucyB7XG4gIGFwaVVzZXJOYW1lOiBzdHJpbmc7XG4gIGFwaUtleT86IHN0cmluZztcbiAgYXBpVG9rZW4/OiBzdHJpbmc7XG4gIGxpbms6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEaXNjb25uZWN0U29ja2V0T3B0aW9ucyB7XG4gIHNvY2tldDogU29ja2V0O1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBDb25uZWN0U29ja2V0VHlwZSA9IChvcHRpb25zOiBDb25uZWN0U29ja2V0T3B0aW9ucykgPT4gUHJvbWlzZTxTb2NrZXQ+O1xuZXhwb3J0IHR5cGUgRGlzY29ubmVjdFNvY2tldFR5cGUgPSAob3B0aW9uczogRGlzY29ubmVjdFNvY2tldE9wdGlvbnMpID0+IFByb21pc2U8Ym9vbGVhbj47XG5cbi8qKlxuICogTWFuYWdlcyBjb25uZWN0aW9ucyB0byBhIG1lZGlhIHNvY2tldCwgYWxsb3dpbmcgdXNlcnMgdG8gY29ubmVjdCBvciBkaXNjb25uZWN0IGJhc2VkIG9uIEFQSSBjcmVkZW50aWFscy5cbiAqXG4gKiBAY2xhc3NcbiAqIEBuYW1lIFNvY2tldE1hbmFnZXJcbiAqIEBkZXNjcmlwdGlvbiBQcm92aWRlcyBtZXRob2RzIHRvIGNvbm5lY3QgYW5kIGRpc2Nvbm5lY3QgZnJvbSBhIG1lZGlhIHNvY2tldCB1c2luZyBhIHByb3ZpZGVkIEFQSSBrZXkgb3IgdG9rZW4uXG4gKlxuICogQG1ldGhvZFxuICogdmFsaWRhdGVBcGlLZXlUb2tlbiAtIFZhbGlkYXRlcyB0aGUgQVBJIGtleSBvciB0b2tlbiBmb3IgY29ycmVjdCBmb3JtYXQuXG4gKiBjb25uZWN0U29ja2V0IC0gRXN0YWJsaXNoZXMgYSBjb25uZWN0aW9uIHRvIHRoZSBtZWRpYSBzb2NrZXQgdXNpbmcgZWl0aGVyIHRoZSBBUEkga2V5IG9yIHRva2VuLlxuICogZGlzY29ubmVjdFNvY2tldCAtIERpc2Nvbm5lY3RzIGFuIGFjdGl2ZSBzb2NrZXQgY29ubmVjdGlvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3Qgc29ja2V0TWFuYWdlciA9IG5ldyBTb2NrZXRNYW5hZ2VyKCk7XG4gKlxuICogLy8gRXhhbXBsZSBvZiBjb25uZWN0aW5nIHRvIHRoZSBzb2NrZXRcbiAqIGNvbnN0IHNvY2tldENvbm5lY3Rpb24gPSBhd2FpdCBzb2NrZXRNYW5hZ2VyLmNvbm5lY3RTb2NrZXQoe1xuICogICBhcGlVc2VyTmFtZTogJ3VzZXIxMjMnLFxuICogICBhcGlLZXk6ICd2YWxpZEFwaUtleU9mNjRDaGFyYWN0ZXJzJyxcbiAqICAgbGluazogJ2h0dHBzOi8vc29ja2V0c2VydmVyLmV4YW1wbGUuY29tJ1xuICogfSk7XG4gKlxuICogLy8gRXhhbXBsZSBvZiBkaXNjb25uZWN0aW5nIHRoZSBzb2NrZXRcbiAqIGNvbnN0IGlzRGlzY29ubmVjdGVkID0gYXdhaXQgc29ja2V0TWFuYWdlci5kaXNjb25uZWN0U29ja2V0KHtcbiAqICAgc29ja2V0OiBzb2NrZXRDb25uZWN0aW9uXG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IENvbm5lY3RTb2NrZXRPcHRpb25zXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYXBpVXNlck5hbWUgLSBVc2VybmFtZSBmb3IgdGhlIEFQSS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbYXBpS2V5XSAtIFRoZSBBUEkga2V5IGZvciBhdXRoZW50aWNhdGlvbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbYXBpVG9rZW5dIC0gVGhlIEFQSSB0b2tlbiBmb3IgYXV0aGVudGljYXRpb24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbGluayAtIFRoZSBzb2NrZXQgc2VydmVyIGxpbmsuXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gRGlzY29ubmVjdFNvY2tldE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7U29ja2V0fSBzb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIHRvIGRpc2Nvbm5lY3QuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8U29ja2V0IHwgYm9vbGVhbj59IFRoZSBhY3RpdmUgc29ja2V0IGluc3RhbmNlIG9uIGNvbm5lY3Rpb24sIG9yIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGRpc2Nvbm5lY3Rpb24gc3VjY2Vzcy5cbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBTb2NrZXRNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBzb2NrZXQhOiBTb2NrZXQ7XG5cbiAgYXN5bmMgdmFsaWRhdGVBcGlLZXlUb2tlbih2YWx1ZTogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKCEvXlthLXowLTldezY0fSQvaS50ZXN0KHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIEFQSSBrZXkgb3IgdG9rZW4uJyk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29ubmVjdFNvY2tldCA9IGFzeW5jICh7XG4gICAgYXBpVXNlck5hbWUsXG4gICAgYXBpS2V5LFxuICAgIGFwaVRva2VuLFxuICAgIGxpbmssXG4gIH06IENvbm5lY3RTb2NrZXRPcHRpb25zKTogUHJvbWlzZTxTb2NrZXQ+ID0+IHtcbiAgICBpZiAoIWFwaVVzZXJOYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FQSSB1c2VybmFtZSByZXF1aXJlZC4nKTtcbiAgICB9XG4gICAgaWYgKCEoYXBpS2V5IHx8IGFwaVRva2VuKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBUEkga2V5IG9yIHRva2VuIHJlcXVpcmVkLicpO1xuICAgIH1cbiAgICBpZiAoIWxpbmspIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU29ja2V0IGxpbmsgcmVxdWlyZWQuJyk7XG4gICAgfVxuXG4gICAgbGV0IHVzZUtleSA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBpZiAoYXBpS2V5ICYmIGFwaUtleS5sZW5ndGggPT09IDY0KSB7XG4gICAgICAgIGF3YWl0IHRoaXMudmFsaWRhdGVBcGlLZXlUb2tlbihhcGlLZXkpO1xuICAgICAgICB1c2VLZXkgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGFwaVRva2VuKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy52YWxpZGF0ZUFwaUtleVRva2VuKGFwaVRva2VuKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FQSSB0b2tlbiBpcyByZXF1aXJlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICB1c2VLZXkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIEFQSSBrZXkgb3IgdG9rZW4uJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gdXNlS2V5ID8geyBhcGlVc2VyTmFtZSwgYXBpS2V5IH0gOiB7IGFwaVVzZXJOYW1lLCBhcGlUb2tlbiB9O1xuXG4gICAgICB0aGlzLnNvY2tldCA9IGlvKGAke2xpbmt9L21lZGlhYCwge1xuICAgICAgICB0cmFuc3BvcnRzOiBbJ3dlYnNvY2tldCddLFxuICAgICAgICBxdWVyeSxcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC5vbignY29ubmVjdCcsICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Nvbm5lY3RlZCB0byBtZWRpYSBzb2NrZXQuJywgdGhpcy5zb2NrZXQuaWQpO1xuICAgICAgICByZXNvbHZlKHRoaXMuc29ja2V0KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldC5vbignY29ubmVjdF9lcnJvcicsICgpID0+IHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignRXJyb3IgY29ubmVjdGluZyB0byBtZWRpYSBzb2NrZXQuJykpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgZGlzY29ubmVjdFNvY2tldCA9IGFzeW5jICh7IHNvY2tldCB9OiBEaXNjb25uZWN0U29ja2V0T3B0aW9ucyk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICAgIGlmIChzb2NrZXQpIHtcbiAgICAgIHNvY2tldC5kaXNjb25uZWN0KCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xufVxuIl19