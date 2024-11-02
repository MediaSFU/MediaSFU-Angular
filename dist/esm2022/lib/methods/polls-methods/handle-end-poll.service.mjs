import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Handles the end of a poll by emitting an "endPoll" event through the provided socket.
 * Displays an alert based on the success or failure of the operation.
 *
 * @param {HandleEndPollOptions} options - The options for ending the poll.
 * @param {string} options.pollId - The ID of the poll to end.
 * @param {Socket} options.socket - The socket instance to emit the event.
 * @param {Function} [options.showAlert] - Optional function to display alerts.
 * @param {string} options.roomName - The name of the room where the poll is being conducted.
 * @param {Function} options.updateIsPollModalVisible - Function to update the visibility of the poll modal.
 *
 * @returns {Promise<void>} A promise that resolves when the poll end operation is complete.
 *
 * @throws Will log an error if the operation fails to emit the end poll event.
 *
 * @example
 * ```typescript
 * const handleEndPollService = new HandleEndPoll();
 * const pollId = '12345';
 * await handleEndPollService.handleEndPoll({
 *   pollId: pollId,
 *   socket: socketInstance,
 *   roomName: 'room1',
 *   showAlert: ({ message, type }) => {
 *     console.log(`Alert: ${message} - Type: ${type}`);
 *   },
 *   updateIsPollModalVisible: (isVisible) => {
 *     console.log('Poll modal visibility:', isVisible);
 *   },
 * });
 * ```
 */
export class HandleEndPoll {
    /**
     * Handles the end of a poll by emitting an "endPoll" event through the provided socket.
     * Displays an alert based on the success or failure of the operation.
     *
     * @param {Object} options - The options for ending the poll.
     * @param {string} options.pollId - The ID of the poll to end.
     * @param {Socket} options.socket - The socket instance to emit the event.
     * @param {Function} [options.showAlert] - Optional function to display alerts.
     * @param {string} options.roomName - The name of the room where the poll is being conducted.
     * @returns {Promise<void>} A promise that resolves when the poll end operation is complete.
     */
    async handleEndPoll({ pollId, socket, showAlert, roomName, updateIsPollModalVisible, }) {
        try {
            socket.emit('endPoll', { roomName, poll_id: pollId }, (response) => {
                if (response.success) {
                    showAlert?.({ message: 'Poll ended successfully', type: 'success' });
                    updateIsPollModalVisible(false);
                }
                else {
                    showAlert?.({ message: response.reason || 'Failed to end poll', type: 'danger' });
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HandleEndPoll, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HandleEndPoll, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HandleEndPoll, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlLWVuZC1wb2xsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9wb2xscy1tZXRob2RzL2hhbmRsZS1lbmQtcG9sbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBZTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JHO0FBTUgsTUFBTSxPQUFPLGFBQWE7SUFDeEI7Ozs7Ozs7Ozs7T0FVRztJQUVILEtBQUssQ0FBQyxhQUFhLENBQUMsRUFDbEIsTUFBTSxFQUNOLE1BQU0sRUFDTixTQUFTLEVBQ1QsUUFBUSxFQUNSLHdCQUF3QixHQUNIO1FBQ3JCLElBQUksQ0FBQztZQUNILE1BQU0sQ0FBQyxJQUFJLENBQ1QsU0FBUyxFQUNULEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFDN0IsQ0FBQyxRQUErQyxFQUFFLEVBQUU7Z0JBQ2xELElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNyQixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztvQkFDckUsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xDLENBQUM7cUJBQU0sQ0FBQztvQkFDTixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxJQUFJLG9CQUFvQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUNwRixDQUFDO1lBQ0gsQ0FBQyxDQUNGLENBQUM7UUFDSixDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsQ0FBQztJQUNILENBQUM7dUdBcENVLGFBQWE7MkdBQWIsYUFBYSxjQUZaLE1BQU07OzJGQUVQLGFBQWE7a0JBSHpCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQgeyBTaG93QWxlcnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhhbmRsZUVuZFBvbGxPcHRpb25zIHtcbiAgcG9sbElkOiBzdHJpbmc7XG4gIHNvY2tldDogU29ja2V0O1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIHVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZTogKHZpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIEhhbmRsZUVuZFBvbGxUeXBlID0gKG9wdGlvbnM6IEhhbmRsZUVuZFBvbGxPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIEhhbmRsZXMgdGhlIGVuZCBvZiBhIHBvbGwgYnkgZW1pdHRpbmcgYW4gXCJlbmRQb2xsXCIgZXZlbnQgdGhyb3VnaCB0aGUgcHJvdmlkZWQgc29ja2V0LlxuICogRGlzcGxheXMgYW4gYWxlcnQgYmFzZWQgb24gdGhlIHN1Y2Nlc3Mgb3IgZmFpbHVyZSBvZiB0aGUgb3BlcmF0aW9uLlxuICpcbiAqIEBwYXJhbSB7SGFuZGxlRW5kUG9sbE9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgZW5kaW5nIHRoZSBwb2xsLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucG9sbElkIC0gVGhlIElEIG9mIHRoZSBwb2xsIHRvIGVuZC5cbiAqIEBwYXJhbSB7U29ja2V0fSBvcHRpb25zLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgdG8gZW1pdCB0aGUgZXZlbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5zaG93QWxlcnRdIC0gT3B0aW9uYWwgZnVuY3Rpb24gdG8gZGlzcGxheSBhbGVydHMuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tIHdoZXJlIHRoZSBwb2xsIGlzIGJlaW5nIGNvbmR1Y3RlZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBwb2xsIG1vZGFsLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBwb2xsIGVuZCBvcGVyYXRpb24gaXMgY29tcGxldGUuXG4gKlxuICogQHRocm93cyBXaWxsIGxvZyBhbiBlcnJvciBpZiB0aGUgb3BlcmF0aW9uIGZhaWxzIHRvIGVtaXQgdGhlIGVuZCBwb2xsIGV2ZW50LlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBoYW5kbGVFbmRQb2xsU2VydmljZSA9IG5ldyBIYW5kbGVFbmRQb2xsKCk7XG4gKiBjb25zdCBwb2xsSWQgPSAnMTIzNDUnO1xuICogYXdhaXQgaGFuZGxlRW5kUG9sbFNlcnZpY2UuaGFuZGxlRW5kUG9sbCh7XG4gKiAgIHBvbGxJZDogcG9sbElkLFxuICogICBzb2NrZXQ6IHNvY2tldEluc3RhbmNlLFxuICogICByb29tTmFtZTogJ3Jvb20xJyxcbiAqICAgc2hvd0FsZXJ0OiAoeyBtZXNzYWdlLCB0eXBlIH0pID0+IHtcbiAqICAgICBjb25zb2xlLmxvZyhgQWxlcnQ6ICR7bWVzc2FnZX0gLSBUeXBlOiAke3R5cGV9YCk7XG4gKiAgIH0sXG4gKiAgIHVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZTogKGlzVmlzaWJsZSkgPT4ge1xuICogICAgIGNvbnNvbGUubG9nKCdQb2xsIG1vZGFsIHZpc2liaWxpdHk6JywgaXNWaXNpYmxlKTtcbiAqICAgfSxcbiAqIH0pO1xuICogYGBgXG4gKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgSGFuZGxlRW5kUG9sbCB7XG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBlbmQgb2YgYSBwb2xsIGJ5IGVtaXR0aW5nIGFuIFwiZW5kUG9sbFwiIGV2ZW50IHRocm91Z2ggdGhlIHByb3ZpZGVkIHNvY2tldC5cbiAgICogRGlzcGxheXMgYW4gYWxlcnQgYmFzZWQgb24gdGhlIHN1Y2Nlc3Mgb3IgZmFpbHVyZSBvZiB0aGUgb3BlcmF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBlbmRpbmcgdGhlIHBvbGwuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBvbGxJZCAtIFRoZSBJRCBvZiB0aGUgcG9sbCB0byBlbmQuXG4gICAqIEBwYXJhbSB7U29ja2V0fSBvcHRpb25zLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgdG8gZW1pdCB0aGUgZXZlbnQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnNob3dBbGVydF0gLSBPcHRpb25hbCBmdW5jdGlvbiB0byBkaXNwbGF5IGFsZXJ0cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbSB3aGVyZSB0aGUgcG9sbCBpcyBiZWluZyBjb25kdWN0ZWQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBwb2xsIGVuZCBvcGVyYXRpb24gaXMgY29tcGxldGUuXG4gICAqL1xuXG4gIGFzeW5jIGhhbmRsZUVuZFBvbGwoe1xuICAgIHBvbGxJZCxcbiAgICBzb2NrZXQsXG4gICAgc2hvd0FsZXJ0LFxuICAgIHJvb21OYW1lLFxuICAgIHVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZSxcbiAgfTogSGFuZGxlRW5kUG9sbE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgc29ja2V0LmVtaXQoXG4gICAgICAgICdlbmRQb2xsJyxcbiAgICAgICAgeyByb29tTmFtZSwgcG9sbF9pZDogcG9sbElkIH0sXG4gICAgICAgIChyZXNwb25zZTogeyBzdWNjZXNzOiBib29sZWFuOyByZWFzb24/OiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICBzaG93QWxlcnQ/Lih7IG1lc3NhZ2U6ICdQb2xsIGVuZGVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6ICdzdWNjZXNzJyB9KTtcbiAgICAgICAgICAgIHVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNob3dBbGVydD8uKHsgbWVzc2FnZTogcmVzcG9uc2UucmVhc29uIHx8ICdGYWlsZWQgdG8gZW5kIHBvbGwnLCB0eXBlOiAnZGFuZ2VyJyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=