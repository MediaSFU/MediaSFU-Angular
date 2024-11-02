import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Asynchronously processes and updates video streams by filtering out the admin's video stream.
 *
 * @param {GetVideosOptions} options - The options for getting videos.
 * @param {Participant[]} options.participants - The list of participants.
 * @param {Stream[]} options.allVideoStreams - The list of all video streams.
 * @param {(Stream | Participant)[]} options.oldAllStreams - The list of old video streams.
 * @param {string} [options.adminVidID] - The ID of the admin's video stream.
 * @param {Function} options.updateAllVideoStreams - Function to update the state variable for all video streams.
 * @param {Function} options.updateOldAllStreams - Function to update the state variable for old video streams.
 * @returns {Promise<void>} A promise that resolves when the video streams have been processed and updated.
 *
 * @throws {Error} If an error occurs during the process of updating video streams.
 *
 * @example
 * ```typescript
 * const options = {
 *   participants: participantList,
 *   allVideoStreams: currentVideoStreams,
 *   oldAllStreams: previousVideoStreams,
 *   updateAllVideoStreams: (streams) => {
 *     console.log('Updated all video streams:', streams);
 *   },
 *   updateOldAllStreams: (streams) => {
 *     console.log('Updated old video streams:', streams);
 *   },
 * };
 *
 * const getVideosService = new GetVideos();
 * await getVideosService.getVideos(options);
 * console.log('Video streams processed successfully.');
 * ```
 */
export class GetVideos {
    /**
     * Asynchronously processes and updates video streams by filtering out the admin's video stream.
     *
     * @param {GetVideosOptions} options - The options for getting videos.
     * @param {Participant[]} options.participants - The list of participants.
     * @param {Stream[]} options.allVideoStreams - The list of all video streams.
     * @param {(Stream | Participant)[]} options.oldAllStreams - The list of old video streams.
     * @param {string} options.adminVidID - The ID of the admin's video stream.
     * @param {Function} options.updateAllVideoStreams - Function to update the state variable for all video streams.
     * @param {Function} options.updateOldAllStreams - Function to update the state variable for old video streams.
     * @returns {Promise<void>} A promise that resolves when the video streams have been processed and updated.
     */
    async getVideos({ participants, allVideoStreams, oldAllStreams, adminVidID, updateAllVideoStreams, updateOldAllStreams, }) {
        try {
            // Filter out the admin's video stream and update state variables
            let admin = participants.filter((participant) => participant.islevel === '2');
            if (admin.length > 0) {
                adminVidID = admin[0].videoID;
                if (adminVidID != null && adminVidID !== '') {
                    let oldAllStreams_ = [];
                    // Check if the length of oldAllStreams is greater than 0
                    if (oldAllStreams.length > 0) {
                        oldAllStreams_ = oldAllStreams;
                    }
                    // Filter out admin's video stream from oldAllStreams
                    oldAllStreams = allVideoStreams.filter((streame) => streame.producerId === adminVidID);
                    // If no admin's video stream found, revert to the previous state
                    if (oldAllStreams.length < 1) {
                        oldAllStreams = oldAllStreams_;
                    }
                    // Update the state variable for old video streams
                    updateOldAllStreams(oldAllStreams);
                    // Filter out admin's video stream from allVideoStreams
                    allVideoStreams = allVideoStreams.filter((streame) => streame.producerId !== adminVidID);
                    // Update the state variable for all video streams
                    updateAllVideoStreams(allVideoStreams);
                }
            }
        }
        catch (error) {
            // Handle errors during the process of updating video streams
            console.log('Error updating video streams:', error.message);
            // throw error;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GetVideos, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GetVideos, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GetVideos, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXZpZGVvcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9nZXQtdmlkZW9zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFjM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0NHO0FBTUgsTUFBTSxPQUFPLFNBQVM7SUFDcEI7Ozs7Ozs7Ozs7O09BV0c7SUFFSCxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQ2QsWUFBWSxFQUNaLGVBQWUsRUFDZixhQUFhLEVBQ2IsVUFBVSxFQUNWLHFCQUFxQixFQUNyQixtQkFBbUIsR0FDRjtRQUNqQixJQUFJLENBQUM7WUFDSCxpRUFBaUU7WUFDakUsSUFBSSxLQUFLLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQWdCLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEtBQUssR0FBRyxDQUFDLENBQUM7WUFFbkYsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUNyQixVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFFOUIsSUFBSSxVQUFVLElBQUksSUFBSSxJQUFJLFVBQVUsS0FBSyxFQUFFLEVBQUUsQ0FBQztvQkFDNUMsSUFBSSxjQUFjLEdBQVUsRUFBRSxDQUFDO29CQUUvQix5REFBeUQ7b0JBQ3pELElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQzt3QkFDN0IsY0FBYyxHQUFHLGFBQWEsQ0FBQztvQkFDakMsQ0FBQztvQkFFRCxxREFBcUQ7b0JBQ3JELGFBQWEsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUNwQyxDQUFDLE9BQVksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQ3BELENBQUM7b0JBRUYsaUVBQWlFO29CQUNqRSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0JBQzdCLGFBQWEsR0FBRyxjQUFjLENBQUM7b0JBQ2pDLENBQUM7b0JBRUQsa0RBQWtEO29CQUNsRCxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFFbkMsdURBQXVEO29CQUN2RCxlQUFlLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FDdEMsQ0FBQyxPQUFZLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUNwRCxDQUFDO29CQUVGLGtEQUFrRDtvQkFDbEQscUJBQXFCLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3pDLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7WUFDcEIsNkRBQTZEO1lBQzdELE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVELGVBQWU7UUFDakIsQ0FBQztJQUNILENBQUM7dUdBaEVVLFNBQVM7MkdBQVQsU0FBUyxjQUZSLE1BQU07OzJGQUVQLFNBQVM7a0JBSHJCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RyZWFtLCBQYXJ0aWNpcGFudCB9IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIEdldFZpZGVvc09wdGlvbnMge1xuICBwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W107XG4gIGFsbFZpZGVvU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICBvbGRBbGxTdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW107XG4gIGFkbWluVmlkSUQ/OiBzdHJpbmc7XG4gIHVwZGF0ZUFsbFZpZGVvU3RyZWFtczogKHN0cmVhbXM6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXSkgPT4gdm9pZDtcbiAgdXBkYXRlT2xkQWxsU3RyZWFtczogKHN0cmVhbXM6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXSkgPT4gdm9pZDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgR2V0VmlkZW9zVHlwZSA9IChvcHRpb25zOiBHZXRWaWRlb3NPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIEFzeW5jaHJvbm91c2x5IHByb2Nlc3NlcyBhbmQgdXBkYXRlcyB2aWRlbyBzdHJlYW1zIGJ5IGZpbHRlcmluZyBvdXQgdGhlIGFkbWluJ3MgdmlkZW8gc3RyZWFtLlxuICpcbiAqIEBwYXJhbSB7R2V0VmlkZW9zT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBnZXR0aW5nIHZpZGVvcy5cbiAqIEBwYXJhbSB7UGFydGljaXBhbnRbXX0gb3B0aW9ucy5wYXJ0aWNpcGFudHMgLSBUaGUgbGlzdCBvZiBwYXJ0aWNpcGFudHMuXG4gKiBAcGFyYW0ge1N0cmVhbVtdfSBvcHRpb25zLmFsbFZpZGVvU3RyZWFtcyAtIFRoZSBsaXN0IG9mIGFsbCB2aWRlbyBzdHJlYW1zLlxuICogQHBhcmFtIHsoU3RyZWFtIHwgUGFydGljaXBhbnQpW119IG9wdGlvbnMub2xkQWxsU3RyZWFtcyAtIFRoZSBsaXN0IG9mIG9sZCB2aWRlbyBzdHJlYW1zLlxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmFkbWluVmlkSURdIC0gVGhlIElEIG9mIHRoZSBhZG1pbidzIHZpZGVvIHN0cmVhbS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlQWxsVmlkZW9TdHJlYW1zIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzdGF0ZSB2YXJpYWJsZSBmb3IgYWxsIHZpZGVvIHN0cmVhbXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZU9sZEFsbFN0cmVhbXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHN0YXRlIHZhcmlhYmxlIGZvciBvbGQgdmlkZW8gc3RyZWFtcy5cbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSB2aWRlbyBzdHJlYW1zIGhhdmUgYmVlbiBwcm9jZXNzZWQgYW5kIHVwZGF0ZWQuXG4gKlxuICogQHRocm93cyB7RXJyb3J9IElmIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgdGhlIHByb2Nlc3Mgb2YgdXBkYXRpbmcgdmlkZW8gc3RyZWFtcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3Qgb3B0aW9ucyA9IHtcbiAqICAgcGFydGljaXBhbnRzOiBwYXJ0aWNpcGFudExpc3QsXG4gKiAgIGFsbFZpZGVvU3RyZWFtczogY3VycmVudFZpZGVvU3RyZWFtcyxcbiAqICAgb2xkQWxsU3RyZWFtczogcHJldmlvdXNWaWRlb1N0cmVhbXMsXG4gKiAgIHVwZGF0ZUFsbFZpZGVvU3RyZWFtczogKHN0cmVhbXMpID0+IHtcbiAqICAgICBjb25zb2xlLmxvZygnVXBkYXRlZCBhbGwgdmlkZW8gc3RyZWFtczonLCBzdHJlYW1zKTtcbiAqICAgfSxcbiAqICAgdXBkYXRlT2xkQWxsU3RyZWFtczogKHN0cmVhbXMpID0+IHtcbiAqICAgICBjb25zb2xlLmxvZygnVXBkYXRlZCBvbGQgdmlkZW8gc3RyZWFtczonLCBzdHJlYW1zKTtcbiAqICAgfSxcbiAqIH07XG4gKlxuICogY29uc3QgZ2V0VmlkZW9zU2VydmljZSA9IG5ldyBHZXRWaWRlb3MoKTtcbiAqIGF3YWl0IGdldFZpZGVvc1NlcnZpY2UuZ2V0VmlkZW9zKG9wdGlvbnMpO1xuICogY29uc29sZS5sb2coJ1ZpZGVvIHN0cmVhbXMgcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS4nKTtcbiAqIGBgYFxuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEdldFZpZGVvcyB7XG4gIC8qKlxuICAgKiBBc3luY2hyb25vdXNseSBwcm9jZXNzZXMgYW5kIHVwZGF0ZXMgdmlkZW8gc3RyZWFtcyBieSBmaWx0ZXJpbmcgb3V0IHRoZSBhZG1pbidzIHZpZGVvIHN0cmVhbS5cbiAgICpcbiAgICogQHBhcmFtIHtHZXRWaWRlb3NPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGdldHRpbmcgdmlkZW9zLlxuICAgKiBAcGFyYW0ge1BhcnRpY2lwYW50W119IG9wdGlvbnMucGFydGljaXBhbnRzIC0gVGhlIGxpc3Qgb2YgcGFydGljaXBhbnRzLlxuICAgKiBAcGFyYW0ge1N0cmVhbVtdfSBvcHRpb25zLmFsbFZpZGVvU3RyZWFtcyAtIFRoZSBsaXN0IG9mIGFsbCB2aWRlbyBzdHJlYW1zLlxuICAgKiBAcGFyYW0geyhTdHJlYW0gfCBQYXJ0aWNpcGFudClbXX0gb3B0aW9ucy5vbGRBbGxTdHJlYW1zIC0gVGhlIGxpc3Qgb2Ygb2xkIHZpZGVvIHN0cmVhbXMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmFkbWluVmlkSUQgLSBUaGUgSUQgb2YgdGhlIGFkbWluJ3MgdmlkZW8gc3RyZWFtLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZUFsbFZpZGVvU3RyZWFtcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgc3RhdGUgdmFyaWFibGUgZm9yIGFsbCB2aWRlbyBzdHJlYW1zLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZU9sZEFsbFN0cmVhbXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHN0YXRlIHZhcmlhYmxlIGZvciBvbGQgdmlkZW8gc3RyZWFtcy5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHZpZGVvIHN0cmVhbXMgaGF2ZSBiZWVuIHByb2Nlc3NlZCBhbmQgdXBkYXRlZC5cbiAgICovXG5cbiAgYXN5bmMgZ2V0VmlkZW9zKHtcbiAgICBwYXJ0aWNpcGFudHMsXG4gICAgYWxsVmlkZW9TdHJlYW1zLFxuICAgIG9sZEFsbFN0cmVhbXMsXG4gICAgYWRtaW5WaWRJRCxcbiAgICB1cGRhdGVBbGxWaWRlb1N0cmVhbXMsXG4gICAgdXBkYXRlT2xkQWxsU3RyZWFtcyxcbiAgfTogR2V0VmlkZW9zT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBGaWx0ZXIgb3V0IHRoZSBhZG1pbidzIHZpZGVvIHN0cmVhbSBhbmQgdXBkYXRlIHN0YXRlIHZhcmlhYmxlc1xuICAgICAgbGV0IGFkbWluID0gcGFydGljaXBhbnRzLmZpbHRlcigocGFydGljaXBhbnQ6IGFueSkgPT4gcGFydGljaXBhbnQuaXNsZXZlbCA9PT0gJzInKTtcblxuICAgICAgaWYgKGFkbWluLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYWRtaW5WaWRJRCA9IGFkbWluWzBdLnZpZGVvSUQ7XG5cbiAgICAgICAgaWYgKGFkbWluVmlkSUQgIT0gbnVsbCAmJiBhZG1pblZpZElEICE9PSAnJykge1xuICAgICAgICAgIGxldCBvbGRBbGxTdHJlYW1zXzogYW55W10gPSBbXTtcblxuICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBsZW5ndGggb2Ygb2xkQWxsU3RyZWFtcyBpcyBncmVhdGVyIHRoYW4gMFxuICAgICAgICAgIGlmIChvbGRBbGxTdHJlYW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG9sZEFsbFN0cmVhbXNfID0gb2xkQWxsU3RyZWFtcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBGaWx0ZXIgb3V0IGFkbWluJ3MgdmlkZW8gc3RyZWFtIGZyb20gb2xkQWxsU3RyZWFtc1xuICAgICAgICAgIG9sZEFsbFN0cmVhbXMgPSBhbGxWaWRlb1N0cmVhbXMuZmlsdGVyKFxuICAgICAgICAgICAgKHN0cmVhbWU6IGFueSkgPT4gc3RyZWFtZS5wcm9kdWNlcklkID09PSBhZG1pblZpZElELFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICAvLyBJZiBubyBhZG1pbidzIHZpZGVvIHN0cmVhbSBmb3VuZCwgcmV2ZXJ0IHRvIHRoZSBwcmV2aW91cyBzdGF0ZVxuICAgICAgICAgIGlmIChvbGRBbGxTdHJlYW1zLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIG9sZEFsbFN0cmVhbXMgPSBvbGRBbGxTdHJlYW1zXztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBVcGRhdGUgdGhlIHN0YXRlIHZhcmlhYmxlIGZvciBvbGQgdmlkZW8gc3RyZWFtc1xuICAgICAgICAgIHVwZGF0ZU9sZEFsbFN0cmVhbXMob2xkQWxsU3RyZWFtcyk7XG5cbiAgICAgICAgICAvLyBGaWx0ZXIgb3V0IGFkbWluJ3MgdmlkZW8gc3RyZWFtIGZyb20gYWxsVmlkZW9TdHJlYW1zXG4gICAgICAgICAgYWxsVmlkZW9TdHJlYW1zID0gYWxsVmlkZW9TdHJlYW1zLmZpbHRlcihcbiAgICAgICAgICAgIChzdHJlYW1lOiBhbnkpID0+IHN0cmVhbWUucHJvZHVjZXJJZCAhPT0gYWRtaW5WaWRJRCxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgLy8gVXBkYXRlIHRoZSBzdGF0ZSB2YXJpYWJsZSBmb3IgYWxsIHZpZGVvIHN0cmVhbXNcbiAgICAgICAgICB1cGRhdGVBbGxWaWRlb1N0cmVhbXMoYWxsVmlkZW9TdHJlYW1zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIC8vIEhhbmRsZSBlcnJvcnMgZHVyaW5nIHRoZSBwcm9jZXNzIG9mIHVwZGF0aW5nIHZpZGVvIHN0cmVhbXNcbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvciB1cGRhdGluZyB2aWRlbyBzdHJlYW1zOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgLy8gdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59XG4iXX0=