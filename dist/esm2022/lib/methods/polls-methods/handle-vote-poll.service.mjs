import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlLXZvdGUtcG9sbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvcG9sbHMtbWV0aG9kcy9oYW5kbGUtdm90ZS1wb2xsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFvQjNDLE1BQU0sT0FBTyxjQUFjO0lBQ3pCOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBRUgsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUNuQixNQUFNLEVBQ04sV0FBVyxFQUNYLE1BQU0sRUFDTixTQUFTLEVBQ1QsTUFBTSxFQUNOLFFBQVEsRUFDUix3QkFBd0IsR0FDRjtRQUN0QixJQUFJLENBQUM7WUFDSCxNQUFNLENBQUMsSUFBSSxDQUNULFVBQVUsRUFDVjtnQkFDRSxRQUFRO2dCQUNSLE9BQU8sRUFBRSxNQUFNO2dCQUNmLE1BQU07Z0JBQ04sTUFBTSxFQUFFLFdBQVc7YUFDcEIsRUFDRCxDQUFDLFFBQThDLEVBQUUsRUFBRTtnQkFDakQsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ3JCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO29CQUN6RSx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEMsQ0FBQztxQkFBTSxDQUFDO29CQUNOLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQzVELENBQUM7WUFDSCxDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2Ysc0JBQXNCO1FBQ3hCLENBQUM7SUFDSCxDQUFDO3VHQS9DVSxjQUFjOzJHQUFkLGNBQWMsY0FGYixNQUFNOzsyRkFFUCxjQUFjO2tCQUgxQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHsgU2hvd0FsZXJ0IH0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBIYW5kbGVWb3RlUG9sbE9wdGlvbnMge1xuICBwb2xsSWQ6IHN0cmluZztcbiAgb3B0aW9uSW5kZXg6IG51bWJlcjtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgbWVtYmVyOiBzdHJpbmc7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIHVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgSGFuZGxlVm90ZVBvbGxUeXBlID0gKG9wdGlvbnM6IEhhbmRsZVZvdGVQb2xsT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEhhbmRsZVZvdGVQb2xsIHtcbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIHZvdGluZyBwcm9jZXNzIGZvciBhIHBvbGwuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGhhbmRsaW5nIHRoZSB2b3RlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wb2xsSWQgLSBUaGUgSUQgb2YgdGhlIHBvbGwuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLm9wdGlvbkluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSBzZWxlY3RlZCBvcHRpb24uXG4gICAqIEBwYXJhbSB7U29ja2V0fSBvcHRpb25zLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgZm9yIGNvbW11bmljYXRpb24uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnNob3dBbGVydF0gLSBPcHRpb25hbCBmdW5jdGlvbiB0byBzaG93IGFsZXJ0cy5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMubWVtYmVyIC0gVGhlIG1lbWJlciB3aG8gaXMgdm90aW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tIHdoZXJlIHRoZSBwb2xsIGlzIGNvbmR1Y3RlZC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVJc1BvbGxNb2RhbFZpc2libGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgb2YgdGhlIHBvbGwgbW9kYWwuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSB2b3RlIGlzIGhhbmRsZWQuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCBsb2cgYW4gZXJyb3IgbWVzc2FnZSBpZiB0aGVyZSBpcyBhbiBpc3N1ZSBzdWJtaXR0aW5nIHRoZSB2b3RlLlxuICAgKi9cblxuICBhc3luYyBoYW5kbGVWb3RlUG9sbCh7XG4gICAgcG9sbElkLFxuICAgIG9wdGlvbkluZGV4LFxuICAgIHNvY2tldCxcbiAgICBzaG93QWxlcnQsXG4gICAgbWVtYmVyLFxuICAgIHJvb21OYW1lLFxuICAgIHVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZSxcbiAgfTogSGFuZGxlVm90ZVBvbGxPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIHNvY2tldC5lbWl0KFxuICAgICAgICAndm90ZVBvbGwnLFxuICAgICAgICB7XG4gICAgICAgICAgcm9vbU5hbWUsXG4gICAgICAgICAgcG9sbF9pZDogcG9sbElkLFxuICAgICAgICAgIG1lbWJlcixcbiAgICAgICAgICBjaG9pY2U6IG9wdGlvbkluZGV4LFxuICAgICAgICB9LFxuICAgICAgICAocmVzcG9uc2U6IHsgc3VjY2VzczogYm9vbGVhbjsgcmVhc29uOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICBzaG93QWxlcnQ/Lih7IG1lc3NhZ2U6ICdWb3RlIHN1Ym1pdHRlZCBzdWNjZXNzZnVsbHknLCB0eXBlOiAnc3VjY2VzcycgfSk7XG4gICAgICAgICAgICB1cGRhdGVJc1BvbGxNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaG93QWxlcnQ/Lih7IG1lc3NhZ2U6IHJlc3BvbnNlLnJlYXNvbiwgdHlwZTogJ2RhbmdlcicgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19