import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Handles the voting process for a poll.
 *
 * @param {HandleVotePollOptions} options - The options for handling the vote.
 * @param {string} options.pollId - The ID of the poll.
 * @param {number} options.optionIndex - The index of the selected option.
 * @param {Socket} options.socket - The socket instance for communication.
 * @param {Function} [options.showAlert] - Optional function to show alerts.
 * @param {string} options.member - The member who is voting.
 * @param {string} options.roomName - The name of the room where the poll is conducted.
 * @param {Function} options.updateIsPollModalVisible - Function to update the visibility of the poll modal.
 *
 * @returns {Promise<void>} A promise that resolves when the vote is handled.
 *
 * @throws Will log an error message if there is an issue submitting the vote.
 *
 * @example
 * ```typescript
 * const handleVotePollService = new HandleVotePoll();
 * await handleVotePollService.handleVotePoll({
 *   pollId: '12345',
 *   optionIndex: 1,
 *   socket: socketInstance,
 *   member: 'user1',
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
export class HandleVotePoll {
    /**
     * Handles the voting process for a poll.
     *
     * @param {Object} options - The options for handling the vote.
     * @param {string} options.pollId - The ID of the poll.
     * @param {number} options.optionIndex - The index of the selected option.
     * @param {Socket} options.socket - The socket instance for communication.
     * @param {Function} [options.showAlert] - Optional function to show alerts.
     * @param {Object} options.member - The member who is voting.
     * @param {string} options.roomName - The name of the room where the poll is conducted.
     * @param {Function} options.updateIsPollModalVisible - Function to update the visibility of the poll modal.
     * @returns {Promise<void>} A promise that resolves when the vote is handled.
     *
     * @throws Will log an error message if there is an issue submitting the vote.
     */
    async handleVotePoll({ pollId, optionIndex, socket, showAlert, member, roomName, updateIsPollModalVisible, }) {
        try {
            socket.emit('votePoll', {
                roomName,
                poll_id: pollId,
                member,
                choice: optionIndex,
            }, (response) => {
                if (response.success) {
                    showAlert?.({ message: 'Vote submitted successfully', type: 'success' });
                    updateIsPollModalVisible(false);
                }
                else {
                    showAlert?.({ message: response.reason, type: 'danger' });
                }
            });
        }
        catch (error) {
            // console.log(error);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HandleVotePoll, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HandleVotePoll, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HandleVotePoll, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlLXZvdGUtcG9sbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvcG9sbHMtbWV0aG9kcy9oYW5kbGUtdm90ZS1wb2xsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFpQjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7QUFNSCxNQUFNLE9BQU8sY0FBYztJQUN6Qjs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUVILEtBQUssQ0FBQyxjQUFjLENBQUMsRUFDbkIsTUFBTSxFQUNOLFdBQVcsRUFDWCxNQUFNLEVBQ04sU0FBUyxFQUNULE1BQU0sRUFDTixRQUFRLEVBQ1Isd0JBQXdCLEdBQ0Y7UUFDdEIsSUFBSSxDQUFDO1lBQ0gsTUFBTSxDQUFDLElBQUksQ0FDVCxVQUFVLEVBQ1Y7Z0JBQ0UsUUFBUTtnQkFDUixPQUFPLEVBQUUsTUFBTTtnQkFDZixNQUFNO2dCQUNOLE1BQU0sRUFBRSxXQUFXO2FBQ3BCLEVBQ0QsQ0FBQyxRQUE4QyxFQUFFLEVBQUU7Z0JBQ2pELElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNyQixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztvQkFDekUsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xDLENBQUM7cUJBQU0sQ0FBQztvQkFDTixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUM1RCxDQUFDO1lBQ0gsQ0FBQyxDQUNGLENBQUM7UUFDSixDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLHNCQUFzQjtRQUN4QixDQUFDO0lBQ0gsQ0FBQzt1R0EvQ1UsY0FBYzsyR0FBZCxjQUFjLGNBRmIsTUFBTTs7MkZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IFNob3dBbGVydCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSGFuZGxlVm90ZVBvbGxPcHRpb25zIHtcbiAgcG9sbElkOiBzdHJpbmc7XG4gIG9wdGlvbkluZGV4OiBudW1iZXI7XG4gIHNvY2tldDogU29ja2V0O1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIG1lbWJlcjogc3RyaW5nO1xuICByb29tTmFtZTogc3RyaW5nO1xuICB1cGRhdGVJc1BvbGxNb2RhbFZpc2libGU6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIEhhbmRsZVZvdGVQb2xsVHlwZSA9IChvcHRpb25zOiBIYW5kbGVWb3RlUG9sbE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogSGFuZGxlcyB0aGUgdm90aW5nIHByb2Nlc3MgZm9yIGEgcG9sbC5cbiAqXG4gKiBAcGFyYW0ge0hhbmRsZVZvdGVQb2xsT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBoYW5kbGluZyB0aGUgdm90ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBvbGxJZCAtIFRoZSBJRCBvZiB0aGUgcG9sbC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLm9wdGlvbkluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSBzZWxlY3RlZCBvcHRpb24uXG4gKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIGZvciBjb21tdW5pY2F0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuc2hvd0FsZXJ0XSAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIHNob3cgYWxlcnRzLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubWVtYmVyIC0gVGhlIG1lbWJlciB3aG8gaXMgdm90aW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbSB3aGVyZSB0aGUgcG9sbCBpcyBjb25kdWN0ZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgcG9sbCBtb2RhbC5cbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgdm90ZSBpcyBoYW5kbGVkLlxuICpcbiAqIEB0aHJvd3MgV2lsbCBsb2cgYW4gZXJyb3IgbWVzc2FnZSBpZiB0aGVyZSBpcyBhbiBpc3N1ZSBzdWJtaXR0aW5nIHRoZSB2b3RlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBoYW5kbGVWb3RlUG9sbFNlcnZpY2UgPSBuZXcgSGFuZGxlVm90ZVBvbGwoKTtcbiAqIGF3YWl0IGhhbmRsZVZvdGVQb2xsU2VydmljZS5oYW5kbGVWb3RlUG9sbCh7XG4gKiAgIHBvbGxJZDogJzEyMzQ1JyxcbiAqICAgb3B0aW9uSW5kZXg6IDEsXG4gKiAgIHNvY2tldDogc29ja2V0SW5zdGFuY2UsXG4gKiAgIG1lbWJlcjogJ3VzZXIxJyxcbiAqICAgcm9vbU5hbWU6ICdyb29tMScsXG4gKiAgIHNob3dBbGVydDogKHsgbWVzc2FnZSwgdHlwZSB9KSA9PiB7XG4gKiAgICAgY29uc29sZS5sb2coYEFsZXJ0OiAke21lc3NhZ2V9IC0gVHlwZTogJHt0eXBlfWApO1xuICogICB9LFxuICogICB1cGRhdGVJc1BvbGxNb2RhbFZpc2libGU6IChpc1Zpc2libGUpID0+IHtcbiAqICAgICBjb25zb2xlLmxvZygnUG9sbCBtb2RhbCB2aXNpYmlsaXR5OicsIGlzVmlzaWJsZSk7XG4gKiAgIH0sXG4gKiB9KTtcbiAqIGBgYFxuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEhhbmRsZVZvdGVQb2xsIHtcbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIHZvdGluZyBwcm9jZXNzIGZvciBhIHBvbGwuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGhhbmRsaW5nIHRoZSB2b3RlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wb2xsSWQgLSBUaGUgSUQgb2YgdGhlIHBvbGwuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLm9wdGlvbkluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSBzZWxlY3RlZCBvcHRpb24uXG4gICAqIEBwYXJhbSB7U29ja2V0fSBvcHRpb25zLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgZm9yIGNvbW11bmljYXRpb24uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnNob3dBbGVydF0gLSBPcHRpb25hbCBmdW5jdGlvbiB0byBzaG93IGFsZXJ0cy5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMubWVtYmVyIC0gVGhlIG1lbWJlciB3aG8gaXMgdm90aW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tIHdoZXJlIHRoZSBwb2xsIGlzIGNvbmR1Y3RlZC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVJc1BvbGxNb2RhbFZpc2libGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgb2YgdGhlIHBvbGwgbW9kYWwuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSB2b3RlIGlzIGhhbmRsZWQuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCBsb2cgYW4gZXJyb3IgbWVzc2FnZSBpZiB0aGVyZSBpcyBhbiBpc3N1ZSBzdWJtaXR0aW5nIHRoZSB2b3RlLlxuICAgKi9cblxuICBhc3luYyBoYW5kbGVWb3RlUG9sbCh7XG4gICAgcG9sbElkLFxuICAgIG9wdGlvbkluZGV4LFxuICAgIHNvY2tldCxcbiAgICBzaG93QWxlcnQsXG4gICAgbWVtYmVyLFxuICAgIHJvb21OYW1lLFxuICAgIHVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZSxcbiAgfTogSGFuZGxlVm90ZVBvbGxPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIHNvY2tldC5lbWl0KFxuICAgICAgICAndm90ZVBvbGwnLFxuICAgICAgICB7XG4gICAgICAgICAgcm9vbU5hbWUsXG4gICAgICAgICAgcG9sbF9pZDogcG9sbElkLFxuICAgICAgICAgIG1lbWJlcixcbiAgICAgICAgICBjaG9pY2U6IG9wdGlvbkluZGV4LFxuICAgICAgICB9LFxuICAgICAgICAocmVzcG9uc2U6IHsgc3VjY2VzczogYm9vbGVhbjsgcmVhc29uOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICBzaG93QWxlcnQ/Lih7IG1lc3NhZ2U6ICdWb3RlIHN1Ym1pdHRlZCBzdWNjZXNzZnVsbHknLCB0eXBlOiAnc3VjY2VzcycgfSk7XG4gICAgICAgICAgICB1cGRhdGVJc1BvbGxNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaG93QWxlcnQ/Lih7IG1lc3NhZ2U6IHJlc3BvbnNlLnJlYXNvbiwgdHlwZTogJ2RhbmdlcicgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19