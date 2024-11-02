import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Asynchronously retrieves and updates messages for a specified room from the server.
 *
 * This method communicates with the server to request messages for a specific room and updates the messages array accordingly.
 *
 * @param {ReceiveRoomMessagesOptions} options - The function parameters.
 * @param {Socket} options.socket - The socket instance used for communication.
 * @param {string} options.roomName - The name of the room to retrieve messages for.
 * @param {function} options.updateMessages - Function to update the messages array with the retrieved messages.
 *
 * @returns {Promise<void>} A promise that resolves when the messages have been successfully retrieved and updated.
 *
 * @throws Will log an error message if an error occurs during the process of retrieving messages.
 *
 * @example
 * ```typescript
 * const options = {
 *   socket: socketInstance,
 *   roomName: 'Room1',
 *   updateMessages: (messages) => {
 *     // Logic to update messages
 *   },
 * };
 *
 * await receiveRoomMessages(options);
 * ```
 */
export class ReceiveRoomMessages {
    /**
     * Asynchronously retrieves and updates messages for a specified room from the server.
     *
     * @param {object} options - The function parameters.
     * @param {object} options.parameters - Additional parameters needed for the function.
     * @param {string} options.parameters.roomName - The name of the room to retrieve messages for.
     * @param {function} options.parameters.updateMessages - Function to update the messages array.
     */
    async receiveRoomMessages({ socket, roomName, updateMessages, }) {
        try {
            // Retrieve messages from the server
            await new Promise((resolve, reject) => {
                socket.emit('getMessage', { roomName }, async ({ messages_ }) => {
                    try {
                        const updatedMessages = messages_;
                        updateMessages(updatedMessages);
                        resolve();
                    }
                    catch (err) {
                        reject(err);
                    }
                });
            });
        }
        catch (error) {
            // Handle errors if any
            console.log('Error tuning messages:', error.message);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ReceiveRoomMessages, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ReceiveRoomMessages, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ReceiveRoomMessages, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjZWl2ZS1yb29tLW1lc3NhZ2VzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3JlY2VpdmUtcm9vbS1tZXNzYWdlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBWTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUtILE1BQU0sT0FBTyxtQkFBbUI7SUFDOUI7Ozs7Ozs7T0FPRztJQUNILEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxFQUN4QixNQUFNLEVBQ04sUUFBUSxFQUNSLGNBQWMsR0FDYTtRQUMzQixJQUFJLENBQUM7WUFDSCxvQ0FBb0M7WUFDcEMsTUFBTSxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQTRCLEVBQUUsRUFBRTtvQkFDeEYsSUFBSSxDQUFDO3dCQUNILE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQzt3QkFDbEMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO3dCQUNoQyxPQUFPLEVBQUUsQ0FBQztvQkFDWixDQUFDO29CQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7d0JBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNkLENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1lBQ3BCLHVCQUF1QjtZQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RCxDQUFDO0lBQ0gsQ0FBQzt1R0EvQlUsbUJBQW1COzJHQUFuQixtQkFBbUIsY0FGbEIsTUFBTTs7MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIFJlY2VpdmVSb29tTWVzc2FnZXNPcHRpb25zIHtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIHVwZGF0ZU1lc3NhZ2VzOiAobWVzc2FnZXM6IE1lc3NhZ2VbXSkgPT4gdm9pZDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgUmVjZWl2ZVJvb21NZXNzYWdlc1R5cGUgPSAob3B0aW9uczogUmVjZWl2ZVJvb21NZXNzYWdlc09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogQXN5bmNocm9ub3VzbHkgcmV0cmlldmVzIGFuZCB1cGRhdGVzIG1lc3NhZ2VzIGZvciBhIHNwZWNpZmllZCByb29tIGZyb20gdGhlIHNlcnZlci5cbiAqXG4gKiBUaGlzIG1ldGhvZCBjb21tdW5pY2F0ZXMgd2l0aCB0aGUgc2VydmVyIHRvIHJlcXVlc3QgbWVzc2FnZXMgZm9yIGEgc3BlY2lmaWMgcm9vbSBhbmQgdXBkYXRlcyB0aGUgbWVzc2FnZXMgYXJyYXkgYWNjb3JkaW5nbHkuXG4gKlxuICogQHBhcmFtIHtSZWNlaXZlUm9vbU1lc3NhZ2VzT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBmdW5jdGlvbiBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTb2NrZXR9IG9wdGlvbnMuc29ja2V0IC0gVGhlIHNvY2tldCBpbnN0YW5jZSB1c2VkIGZvciBjb21tdW5pY2F0aW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbSB0byByZXRyaWV2ZSBtZXNzYWdlcyBmb3IuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZU1lc3NhZ2VzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBtZXNzYWdlcyBhcnJheSB3aXRoIHRoZSByZXRyaWV2ZWQgbWVzc2FnZXMuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG1lc3NhZ2VzIGhhdmUgYmVlbiBzdWNjZXNzZnVsbHkgcmV0cmlldmVkIGFuZCB1cGRhdGVkLlxuICpcbiAqIEB0aHJvd3MgV2lsbCBsb2cgYW4gZXJyb3IgbWVzc2FnZSBpZiBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIHRoZSBwcm9jZXNzIG9mIHJldHJpZXZpbmcgbWVzc2FnZXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IG9wdGlvbnMgPSB7XG4gKiAgIHNvY2tldDogc29ja2V0SW5zdGFuY2UsXG4gKiAgIHJvb21OYW1lOiAnUm9vbTEnLFxuICogICB1cGRhdGVNZXNzYWdlczogKG1lc3NhZ2VzKSA9PiB7XG4gKiAgICAgLy8gTG9naWMgdG8gdXBkYXRlIG1lc3NhZ2VzXG4gKiAgIH0sXG4gKiB9O1xuICpcbiAqIGF3YWl0IHJlY2VpdmVSb29tTWVzc2FnZXMob3B0aW9ucyk7XG4gKiBgYGBcbiAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUmVjZWl2ZVJvb21NZXNzYWdlcyB7XG4gIC8qKlxuICAgKiBBc3luY2hyb25vdXNseSByZXRyaWV2ZXMgYW5kIHVwZGF0ZXMgbWVzc2FnZXMgZm9yIGEgc3BlY2lmaWVkIHJvb20gZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFRoZSBmdW5jdGlvbiBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gQWRkaXRpb25hbCBwYXJhbWV0ZXJzIG5lZWRlZCBmb3IgdGhlIGZ1bmN0aW9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnJvb21OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHJvb20gdG8gcmV0cmlldmUgbWVzc2FnZXMgZm9yLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWVzc2FnZXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1lc3NhZ2VzIGFycmF5LlxuICAgKi9cbiAgYXN5bmMgcmVjZWl2ZVJvb21NZXNzYWdlcyh7XG4gICAgc29ja2V0LFxuICAgIHJvb21OYW1lLFxuICAgIHVwZGF0ZU1lc3NhZ2VzLFxuICB9OiBSZWNlaXZlUm9vbU1lc3NhZ2VzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBSZXRyaWV2ZSBtZXNzYWdlcyBmcm9tIHRoZSBzZXJ2ZXJcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc29ja2V0LmVtaXQoJ2dldE1lc3NhZ2UnLCB7IHJvb21OYW1lIH0sIGFzeW5jICh7IG1lc3NhZ2VzXyB9OiB7IG1lc3NhZ2VzXzogTWVzc2FnZVtdIH0pID0+IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlZE1lc3NhZ2VzID0gbWVzc2FnZXNfO1xuICAgICAgICAgICAgdXBkYXRlTWVzc2FnZXModXBkYXRlZE1lc3NhZ2VzKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAvLyBIYW5kbGUgZXJyb3JzIGlmIGFueVxuICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHR1bmluZyBtZXNzYWdlczonLCBlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==