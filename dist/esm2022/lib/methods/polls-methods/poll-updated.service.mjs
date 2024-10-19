import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class PollUpdated {
    /**
     * Updates the poll state based on the provided data.
     *
     * @param {Object} options - The options for updating the poll.
     * @param {any} options.data - The data containing poll information.
     * @param {any[]} options.polls - The current list of polls.
     * @param {any} options.poll - The current poll.
     * @param {string} options.member - The member identifier.
     * @param {string} options.islevel - The level of the member.
     * @param {Function} options.showAlert - Function to show alerts.
     * @param {Function} options.updatePolls - Function to update the list of polls.
     * @param {Function} options.updatePoll - Function to update the current poll.
     * @param {Function} options.updateIsPollModalVisible - Function to update the visibility of the poll modal.
     * @returns {Promise<void>} A promise that resolves when the poll update is complete.
     */
    async pollUpdated({ data, polls, poll, member, islevel, showAlert, updatePolls, updatePoll, updateIsPollModalVisible, }) {
        try {
            if (data.polls) {
                polls = data.polls;
                updatePolls(data.polls);
            }
            else {
                polls = [data.poll];
                updatePolls(polls);
            }
            let temp_poll = { id: '' };
            if (poll) {
                temp_poll = { ...poll };
            }
            if (data.status != 'ended') {
                poll = data.poll;
                updatePoll(data.poll);
            }
            if (data.status === 'started' && islevel !== '2') {
                if (!poll.voters || (poll.voters && !poll.voters[member])) {
                    showAlert?.({ message: 'New poll started', type: 'success', duration: 3000 });
                    updateIsPollModalVisible(true);
                }
            }
            else if (data.status === 'ended') {
                if (temp_poll.id === data.poll.id) {
                    showAlert?.({ message: 'Poll ended', type: 'danger', duration: 3000 });
                    // update the poll
                    updatePoll(data.poll);
                }
            }
        }
        catch (error) {
            // console.log(error);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: PollUpdated, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: PollUpdated, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: PollUpdated, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sbC11cGRhdGVkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9wb2xscy1tZXRob2RzL3BvbGwtdXBkYXRlZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBb0IzQyxNQUFNLE9BQU8sV0FBVztJQUN0Qjs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUVILEtBQUssQ0FBQyxXQUFXLENBQUMsRUFDaEIsSUFBSSxFQUNKLEtBQUssRUFDTCxJQUFJLEVBQ0osTUFBTSxFQUNOLE9BQU8sRUFDUCxTQUFTLEVBQ1QsV0FBVyxFQUNYLFVBQVUsRUFDVix3QkFBd0IsR0FDTDtRQUNuQixJQUFJLENBQUM7WUFDSCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDZixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDbkIsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixDQUFDO2lCQUFNLENBQUM7Z0JBQ04sS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQixXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsQ0FBQztZQUVELElBQUksU0FBUyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBRTNCLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ1QsU0FBUyxHQUFHLEVBQUUsR0FBRyxJQUFJLEVBQUUsQ0FBQztZQUMxQixDQUFDO1lBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUMzQixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDakIsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixDQUFDO1lBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsSUFBSSxPQUFPLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUMxRCxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUM5RSx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakMsQ0FBQztZQUNILENBQUM7aUJBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRSxDQUFDO2dCQUNuQyxJQUFJLFNBQVMsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDbEMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQ3ZFLGtCQUFrQjtvQkFDbEIsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDeEIsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLHNCQUFzQjtRQUN4QixDQUFDO0lBQ0gsQ0FBQzt1R0EvRFUsV0FBVzsyR0FBWCxXQUFXLGNBRlYsTUFBTTs7MkZBRVAsV0FBVztrQkFIdkIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb2xsLCBTaG93QWxlcnQsIFBvbGxVcGRhdGVkRGF0YSB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIFBvbGxVcGRhdGVkT3B0aW9ucyB7XG4gIGRhdGE6IFBvbGxVcGRhdGVkRGF0YTtcbiAgcG9sbHM6IFBvbGxbXTtcbiAgcG9sbDogUG9sbDtcbiAgbWVtYmVyOiBzdHJpbmc7XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICB1cGRhdGVQb2xsczogKHBvbGxzOiBQb2xsW10pID0+IHZvaWQ7XG4gIHVwZGF0ZVBvbGw6IChwb2xsOiBQb2xsKSA9PiB2b2lkO1xuICB1cGRhdGVJc1BvbGxNb2RhbFZpc2libGU6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFBvbGxVcGRhdGVkVHlwZSA9IChvcHRpb25zOiBQb2xsVXBkYXRlZE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBQb2xsVXBkYXRlZCB7XG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBwb2xsIHN0YXRlIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBkYXRhLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciB1cGRhdGluZyB0aGUgcG9sbC5cbiAgICogQHBhcmFtIHthbnl9IG9wdGlvbnMuZGF0YSAtIFRoZSBkYXRhIGNvbnRhaW5pbmcgcG9sbCBpbmZvcm1hdGlvbi5cbiAgICogQHBhcmFtIHthbnlbXX0gb3B0aW9ucy5wb2xscyAtIFRoZSBjdXJyZW50IGxpc3Qgb2YgcG9sbHMuXG4gICAqIEBwYXJhbSB7YW55fSBvcHRpb25zLnBvbGwgLSBUaGUgY3VycmVudCBwb2xsLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5tZW1iZXIgLSBUaGUgbWVtYmVyIGlkZW50aWZpZXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmlzbGV2ZWwgLSBUaGUgbGV2ZWwgb2YgdGhlIG1lbWJlci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5zaG93QWxlcnQgLSBGdW5jdGlvbiB0byBzaG93IGFsZXJ0cy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVQb2xscyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbGlzdCBvZiBwb2xscy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVQb2xsIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBjdXJyZW50IHBvbGwuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBwb2xsIG1vZGFsLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgcG9sbCB1cGRhdGUgaXMgY29tcGxldGUuXG4gICAqL1xuXG4gIGFzeW5jIHBvbGxVcGRhdGVkKHtcbiAgICBkYXRhLFxuICAgIHBvbGxzLFxuICAgIHBvbGwsXG4gICAgbWVtYmVyLFxuICAgIGlzbGV2ZWwsXG4gICAgc2hvd0FsZXJ0LFxuICAgIHVwZGF0ZVBvbGxzLFxuICAgIHVwZGF0ZVBvbGwsXG4gICAgdXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlLFxuICB9OiBQb2xsVXBkYXRlZE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKGRhdGEucG9sbHMpIHtcbiAgICAgICAgcG9sbHMgPSBkYXRhLnBvbGxzO1xuICAgICAgICB1cGRhdGVQb2xscyhkYXRhLnBvbGxzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvbGxzID0gW2RhdGEucG9sbF07XG4gICAgICAgIHVwZGF0ZVBvbGxzKHBvbGxzKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHRlbXBfcG9sbCA9IHsgaWQ6ICcnIH07XG5cbiAgICAgIGlmIChwb2xsKSB7XG4gICAgICAgIHRlbXBfcG9sbCA9IHsgLi4ucG9sbCB9O1xuICAgICAgfVxuXG4gICAgICBpZiAoZGF0YS5zdGF0dXMgIT0gJ2VuZGVkJykge1xuICAgICAgICBwb2xsID0gZGF0YS5wb2xsO1xuICAgICAgICB1cGRhdGVQb2xsKGRhdGEucG9sbCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ3N0YXJ0ZWQnICYmIGlzbGV2ZWwgIT09ICcyJykge1xuICAgICAgICBpZiAoIXBvbGwudm90ZXJzIHx8IChwb2xsLnZvdGVycyAmJiAhcG9sbC52b3RlcnNbbWVtYmVyXSkpIHtcbiAgICAgICAgICBzaG93QWxlcnQ/Lih7IG1lc3NhZ2U6ICdOZXcgcG9sbCBzdGFydGVkJywgdHlwZTogJ3N1Y2Nlc3MnLCBkdXJhdGlvbjogMzAwMCB9KTtcbiAgICAgICAgICB1cGRhdGVJc1BvbGxNb2RhbFZpc2libGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5zdGF0dXMgPT09ICdlbmRlZCcpIHtcbiAgICAgICAgaWYgKHRlbXBfcG9sbC5pZCA9PT0gZGF0YS5wb2xsLmlkKSB7XG4gICAgICAgICAgc2hvd0FsZXJ0Py4oeyBtZXNzYWdlOiAnUG9sbCBlbmRlZCcsIHR5cGU6ICdkYW5nZXInLCBkdXJhdGlvbjogMzAwMCB9KTtcbiAgICAgICAgICAvLyB1cGRhdGUgdGhlIHBvbGxcbiAgICAgICAgICB1cGRhdGVQb2xsKGRhdGEucG9sbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19