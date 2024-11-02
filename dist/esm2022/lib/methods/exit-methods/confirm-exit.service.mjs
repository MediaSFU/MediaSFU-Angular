// confirm-exit.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Confirms the exit of a member from a room and optionally bans them.
 *
 * This method emits a socket event to disconnect the specified member from the given room.
 * If the `ban` option is set to true, the member will be banned from rejoining the room.
 *
 * @param {ConfirmExitOptions} options - The options for confirming the exit.
 * @param {Socket} options.socket - The socket instance to emit the event.
 * @param {string} options.member - The member who is exiting.
 * @param {string} options.roomName - The name of the room the member is exiting from.
 * @param {boolean} [options.ban=false] - Whether to ban the member from the room.
 * @returns {Promise<void>} A promise that resolves when the exit is confirmed.
 *
 * @example
 * ```typescript
 * const confirmExitService = new ConfirmExit();
 * await confirmExitService.confirmExit({
 *   socket: socketInstance,
 *   member: 'JohnDoe',
 *   roomName: 'Room1',
 *   ban: true, // Optional: set to true if you want to ban the member
 * });
 * ```
 */
export class ConfirmExit {
    /**
     * Confirms the exit of a member from a room and optionally bans them.
     *
     * @param {Object} options - The options for confirming the exit.
     * @param {Socket} options.socket - The socket instance to emit the event.
     * @param {string} options.member - The member who is exiting.
     * @param {string} options.roomName - The name of the room the member is exiting from.
     * @param {boolean} [options.ban=false] - Whether to ban the member from the room.
     * @returns {Promise<void>} A promise that resolves when the exit is confirmed.
     */
    async confirmExit({ socket, member, roomName, ban = false }) {
        // Emit a socket event to disconnect the user from the room
        socket.emit('disconnectUser', { member: member, roomName: roomName, ban: ban });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConfirmExit, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConfirmExit, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConfirmExit, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1leGl0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9leGl0LW1ldGhvZHMvY29uZmlybS1leGl0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEJBQTBCO0FBRTFCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBYTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUtILE1BQU0sT0FBTyxXQUFXO0lBQ3RCOzs7Ozs7Ozs7T0FTRztJQUNILEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEdBQUcsS0FBSyxFQUFzQjtRQUM3RSwyREFBMkQ7UUFDM0QsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNsRixDQUFDO3VHQWRVLFdBQVc7MkdBQVgsV0FBVyxjQUZWLE1BQU07OzJGQUVQLFdBQVc7a0JBSHZCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLy8gY29uZmlybS1leGl0LnNlcnZpY2UudHNcblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlybUV4aXRPcHRpb25zIHtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIG1lbWJlcjogc3RyaW5nO1xuICByb29tTmFtZTogc3RyaW5nO1xuICBiYW4/OiBib29sZWFuO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBDb25maXJtRXhpdFR5cGUgPSAob3B0aW9uczogQ29uZmlybUV4aXRPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIENvbmZpcm1zIHRoZSBleGl0IG9mIGEgbWVtYmVyIGZyb20gYSByb29tIGFuZCBvcHRpb25hbGx5IGJhbnMgdGhlbS5cbiAqXG4gKiBUaGlzIG1ldGhvZCBlbWl0cyBhIHNvY2tldCBldmVudCB0byBkaXNjb25uZWN0IHRoZSBzcGVjaWZpZWQgbWVtYmVyIGZyb20gdGhlIGdpdmVuIHJvb20uXG4gKiBJZiB0aGUgYGJhbmAgb3B0aW9uIGlzIHNldCB0byB0cnVlLCB0aGUgbWVtYmVyIHdpbGwgYmUgYmFubmVkIGZyb20gcmVqb2luaW5nIHRoZSByb29tLlxuICpcbiAqIEBwYXJhbSB7Q29uZmlybUV4aXRPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNvbmZpcm1pbmcgdGhlIGV4aXQuXG4gKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIHRvIGVtaXQgdGhlIGV2ZW50LlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubWVtYmVyIC0gVGhlIG1lbWJlciB3aG8gaXMgZXhpdGluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJvb21OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHJvb20gdGhlIG1lbWJlciBpcyBleGl0aW5nIGZyb20uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmJhbj1mYWxzZV0gLSBXaGV0aGVyIHRvIGJhbiB0aGUgbWVtYmVyIGZyb20gdGhlIHJvb20uXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgZXhpdCBpcyBjb25maXJtZWQuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IGNvbmZpcm1FeGl0U2VydmljZSA9IG5ldyBDb25maXJtRXhpdCgpO1xuICogYXdhaXQgY29uZmlybUV4aXRTZXJ2aWNlLmNvbmZpcm1FeGl0KHtcbiAqICAgc29ja2V0OiBzb2NrZXRJbnN0YW5jZSxcbiAqICAgbWVtYmVyOiAnSm9obkRvZScsXG4gKiAgIHJvb21OYW1lOiAnUm9vbTEnLFxuICogICBiYW46IHRydWUsIC8vIE9wdGlvbmFsOiBzZXQgdG8gdHJ1ZSBpZiB5b3Ugd2FudCB0byBiYW4gdGhlIG1lbWJlclxuICogfSk7XG4gKiBgYGBcbiAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlybUV4aXQge1xuICAvKipcbiAgICogQ29uZmlybXMgdGhlIGV4aXQgb2YgYSBtZW1iZXIgZnJvbSBhIHJvb20gYW5kIG9wdGlvbmFsbHkgYmFucyB0aGVtLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBjb25maXJtaW5nIHRoZSBleGl0LlxuICAgKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIHRvIGVtaXQgdGhlIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5tZW1iZXIgLSBUaGUgbWVtYmVyIHdobyBpcyBleGl0aW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tIHRoZSBtZW1iZXIgaXMgZXhpdGluZyBmcm9tLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmJhbj1mYWxzZV0gLSBXaGV0aGVyIHRvIGJhbiB0aGUgbWVtYmVyIGZyb20gdGhlIHJvb20uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBleGl0IGlzIGNvbmZpcm1lZC5cbiAgICovXG4gIGFzeW5jIGNvbmZpcm1FeGl0KHsgc29ja2V0LCBtZW1iZXIsIHJvb21OYW1lLCBiYW4gPSBmYWxzZSB9OiBDb25maXJtRXhpdE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBFbWl0IGEgc29ja2V0IGV2ZW50IHRvIGRpc2Nvbm5lY3QgdGhlIHVzZXIgZnJvbSB0aGUgcm9vbVxuICAgIHNvY2tldC5lbWl0KCdkaXNjb25uZWN0VXNlcicsIHsgbWVtYmVyOiBtZW1iZXIsIHJvb21OYW1lOiByb29tTmFtZSwgYmFuOiBiYW4gfSk7XG4gIH1cbn1cbiJdfQ==