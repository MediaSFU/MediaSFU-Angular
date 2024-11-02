import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Handles the creation of a poll.
 *
 * This method sends a request to create a poll in the specified room via a socket event.
 * It also handles the response from the server to notify the user whether the poll was
 * created successfully or if there was an error.
 *
 * @param {HandleCreatePollOptions} options - The options for creating the poll.
 * @param {Poll} options.poll - The poll object containing the poll details.
 * @param {Socket} options.socket - The socket instance for emitting events.
 * @param {string} options.roomName - The name of the room where the poll will be created.
 * @param {Function} [options.showAlert] - Optional function to show alert messages.
 * @param {Function} options.updateIsPollModalVisible - Function to update the visibility of the poll modal.
 *
 * @returns {Promise<void>} A promise that resolves when the poll is created successfully.
 *
 * @throws Will handle any errors during the poll creation process silently.
 *
 * @example
 * ```typescript
 * const handleCreatePollService = new HandleCreatePoll();
 * const pollData = {
 *   question: 'What is your favorite color?',
 *   options: ['Red', 'Blue', 'Green'],
 * };
 * await handleCreatePollService.handleCreatePoll({
 *   poll: pollData,
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
export class HandleCreatePoll {
    /**
     * Handles the creation of a poll.
     *
     * @param {Object} options - The options for creating the poll.
     * @param {Poll} options.poll - The poll object containing the poll details.
     * @param {Object} options.parameters - Additional parameters for creating the poll.
     * @returns {Promise<void>} - A promise that resolves when the poll is created successfully.
     */
    async handleCreatePoll({ poll, socket, roomName, showAlert, updateIsPollModalVisible, }) {
        try {
            socket.emit('createPoll', { roomName, poll }, (response) => {
                if (response.success) {
                    showAlert?.({ message: 'Poll created successfully', type: 'success' });
                    updateIsPollModalVisible(false);
                }
                else {
                    showAlert?.({ message: response.reason || 'Failed to create poll', type: 'danger' });
                }
            });
        }
        catch {
            /* handle error */
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HandleCreatePoll, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HandleCreatePoll, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HandleCreatePoll, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlLWNyZWF0ZS1wb2xsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9wb2xscy1tZXRob2RzL2hhbmRsZS1jcmVhdGUtcG9sbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBYzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUNHO0FBS0gsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQjs7Ozs7OztPQU9HO0lBRUgsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEVBQ3JCLElBQUksRUFDSixNQUFNLEVBQ04sUUFBUSxFQUNSLFNBQVMsRUFDVCx3QkFBd0IsR0FDQTtRQUN4QixJQUFJLENBQUM7WUFDSCxNQUFNLENBQUMsSUFBSSxDQUNULFlBQVksRUFDWixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFDbEIsQ0FBQyxRQUErQyxFQUFFLEVBQUU7Z0JBQ2xELElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNyQixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztvQkFDdkUsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xDLENBQUM7cUJBQU0sQ0FBQztvQkFDTixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxJQUFJLHVCQUF1QixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUN2RixDQUFDO1lBQ0gsQ0FBQyxDQUNGLENBQUM7UUFDSixDQUFDO1FBQUMsTUFBTSxDQUFDO1lBQ1Asa0JBQWtCO1FBQ3BCLENBQUM7SUFDSCxDQUFDO3VHQWpDVSxnQkFBZ0I7MkdBQWhCLGdCQUFnQixjQUZmLE1BQU07OzJGQUVQLGdCQUFnQjtrQkFINUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb2xsLCBTaG93QWxlcnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5leHBvcnQgaW50ZXJmYWNlIEhhbmRsZUNyZWF0ZVBvbGxPcHRpb25zIHtcbiAgcG9sbDogUG9sbDtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgdXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlOiAodmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgSGFuZGxlQ3JlYXRlUG9sbFR5cGUgPSAob3B0aW9uczogSGFuZGxlQ3JlYXRlUG9sbE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogSGFuZGxlcyB0aGUgY3JlYXRpb24gb2YgYSBwb2xsLlxuICpcbiAqIFRoaXMgbWV0aG9kIHNlbmRzIGEgcmVxdWVzdCB0byBjcmVhdGUgYSBwb2xsIGluIHRoZSBzcGVjaWZpZWQgcm9vbSB2aWEgYSBzb2NrZXQgZXZlbnQuXG4gKiBJdCBhbHNvIGhhbmRsZXMgdGhlIHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlciB0byBub3RpZnkgdGhlIHVzZXIgd2hldGhlciB0aGUgcG9sbCB3YXNcbiAqIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5IG9yIGlmIHRoZXJlIHdhcyBhbiBlcnJvci5cbiAqXG4gKiBAcGFyYW0ge0hhbmRsZUNyZWF0ZVBvbGxPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRoZSBwb2xsLlxuICogQHBhcmFtIHtQb2xsfSBvcHRpb25zLnBvbGwgLSBUaGUgcG9sbCBvYmplY3QgY29udGFpbmluZyB0aGUgcG9sbCBkZXRhaWxzLlxuICogQHBhcmFtIHtTb2NrZXR9IG9wdGlvbnMuc29ja2V0IC0gVGhlIHNvY2tldCBpbnN0YW5jZSBmb3IgZW1pdHRpbmcgZXZlbnRzLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbSB3aGVyZSB0aGUgcG9sbCB3aWxsIGJlIGNyZWF0ZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5zaG93QWxlcnRdIC0gT3B0aW9uYWwgZnVuY3Rpb24gdG8gc2hvdyBhbGVydCBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBwb2xsIG1vZGFsLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBwb2xsIGlzIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LlxuICpcbiAqIEB0aHJvd3MgV2lsbCBoYW5kbGUgYW55IGVycm9ycyBkdXJpbmcgdGhlIHBvbGwgY3JlYXRpb24gcHJvY2VzcyBzaWxlbnRseS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3QgaGFuZGxlQ3JlYXRlUG9sbFNlcnZpY2UgPSBuZXcgSGFuZGxlQ3JlYXRlUG9sbCgpO1xuICogY29uc3QgcG9sbERhdGEgPSB7XG4gKiAgIHF1ZXN0aW9uOiAnV2hhdCBpcyB5b3VyIGZhdm9yaXRlIGNvbG9yPycsXG4gKiAgIG9wdGlvbnM6IFsnUmVkJywgJ0JsdWUnLCAnR3JlZW4nXSxcbiAqIH07XG4gKiBhd2FpdCBoYW5kbGVDcmVhdGVQb2xsU2VydmljZS5oYW5kbGVDcmVhdGVQb2xsKHtcbiAqICAgcG9sbDogcG9sbERhdGEsXG4gKiAgIHNvY2tldDogc29ja2V0SW5zdGFuY2UsXG4gKiAgIHJvb21OYW1lOiAncm9vbTEnLFxuICogICBzaG93QWxlcnQ6ICh7IG1lc3NhZ2UsIHR5cGUgfSkgPT4ge1xuICogICAgIGNvbnNvbGUubG9nKGBBbGVydDogJHttZXNzYWdlfSAtIFR5cGU6ICR7dHlwZX1gKTtcbiAqICAgfSxcbiAqICAgdXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlKSA9PiB7XG4gKiAgICAgY29uc29sZS5sb2coJ1BvbGwgbW9kYWwgdmlzaWJpbGl0eTonLCBpc1Zpc2libGUpO1xuICogICB9LFxuICogfSk7XG4gKiBgYGBcbiAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgSGFuZGxlQ3JlYXRlUG9sbCB7XG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBjcmVhdGlvbiBvZiBhIHBvbGwuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRoZSBwb2xsLlxuICAgKiBAcGFyYW0ge1BvbGx9IG9wdGlvbnMucG9sbCAtIFRoZSBwb2xsIG9iamVjdCBjb250YWluaW5nIHRoZSBwb2xsIGRldGFpbHMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBBZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIGNyZWF0aW5nIHRoZSBwb2xsLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBwb2xsIGlzIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LlxuICAgKi9cblxuICBhc3luYyBoYW5kbGVDcmVhdGVQb2xsKHtcbiAgICBwb2xsLFxuICAgIHNvY2tldCxcbiAgICByb29tTmFtZSxcbiAgICBzaG93QWxlcnQsXG4gICAgdXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlLFxuICB9OiBIYW5kbGVDcmVhdGVQb2xsT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBzb2NrZXQuZW1pdChcbiAgICAgICAgJ2NyZWF0ZVBvbGwnLFxuICAgICAgICB7IHJvb21OYW1lLCBwb2xsIH0sXG4gICAgICAgIChyZXNwb25zZTogeyBzdWNjZXNzOiBib29sZWFuOyByZWFzb24/OiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICBzaG93QWxlcnQ/Lih7IG1lc3NhZ2U6ICdQb2xsIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnIH0pO1xuICAgICAgICAgICAgdXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2hvd0FsZXJ0Py4oeyBtZXNzYWdlOiByZXNwb25zZS5yZWFzb24gfHwgJ0ZhaWxlZCB0byBjcmVhdGUgcG9sbCcsIHR5cGU6ICdkYW5nZXInIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICB9XG4gIH1cbn1cbiJdfQ==