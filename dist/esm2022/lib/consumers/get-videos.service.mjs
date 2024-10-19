import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXZpZGVvcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9nZXQtdmlkZW9zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFpQjNDLE1BQU0sT0FBTyxTQUFTO0lBQ3BCOzs7Ozs7Ozs7OztPQVdHO0lBRUgsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUNkLFlBQVksRUFDWixlQUFlLEVBQ2YsYUFBYSxFQUNiLFVBQVUsRUFDVixxQkFBcUIsRUFDckIsbUJBQW1CLEdBQ0Y7UUFDakIsSUFBSSxDQUFDO1lBQ0gsaUVBQWlFO1lBQ2pFLElBQUksS0FBSyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFnQixFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBRW5GLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDckIsVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBRTlCLElBQUksVUFBVSxJQUFJLElBQUksSUFBSSxVQUFVLEtBQUssRUFBRSxFQUFFLENBQUM7b0JBQzVDLElBQUksY0FBYyxHQUFVLEVBQUUsQ0FBQztvQkFFL0IseURBQXlEO29CQUN6RCxJQUFJLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0JBQzdCLGNBQWMsR0FBRyxhQUFhLENBQUM7b0JBQ2pDLENBQUM7b0JBRUQscURBQXFEO29CQUNyRCxhQUFhLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FDcEMsQ0FBQyxPQUFZLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUNwRCxDQUFDO29CQUVGLGlFQUFpRTtvQkFDakUsSUFBSSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO3dCQUM3QixhQUFhLEdBQUcsY0FBYyxDQUFDO29CQUNqQyxDQUFDO29CQUVELGtEQUFrRDtvQkFDbEQsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBRW5DLHVEQUF1RDtvQkFDdkQsZUFBZSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQ3RDLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FDcEQsQ0FBQztvQkFFRixrREFBa0Q7b0JBQ2xELHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUN6QyxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1lBQ3BCLDZEQUE2RDtZQUM3RCxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1RCxlQUFlO1FBQ2pCLENBQUM7SUFDSCxDQUFDO3VHQWhFVSxTQUFTOzJHQUFULFNBQVMsY0FGUixNQUFNOzsyRkFFUCxTQUFTO2tCQUhyQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0cmVhbSwgUGFydGljaXBhbnQgfSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBHZXRWaWRlb3NPcHRpb25zIHtcbiAgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICBhbGxWaWRlb1N0cmVhbXM6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXTtcbiAgb2xkQWxsU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICBhZG1pblZpZElEPzogc3RyaW5nO1xuICB1cGRhdGVBbGxWaWRlb1N0cmVhbXM6IChzdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW10pID0+IHZvaWQ7XG4gIHVwZGF0ZU9sZEFsbFN0cmVhbXM6IChzdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW10pID0+IHZvaWQ7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIEdldFZpZGVvc1R5cGUgPSAob3B0aW9uczogR2V0VmlkZW9zT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEdldFZpZGVvcyB7XG4gIC8qKlxuICAgKiBBc3luY2hyb25vdXNseSBwcm9jZXNzZXMgYW5kIHVwZGF0ZXMgdmlkZW8gc3RyZWFtcyBieSBmaWx0ZXJpbmcgb3V0IHRoZSBhZG1pbidzIHZpZGVvIHN0cmVhbS5cbiAgICpcbiAgICogQHBhcmFtIHtHZXRWaWRlb3NPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGdldHRpbmcgdmlkZW9zLlxuICAgKiBAcGFyYW0ge1BhcnRpY2lwYW50W119IG9wdGlvbnMucGFydGljaXBhbnRzIC0gVGhlIGxpc3Qgb2YgcGFydGljaXBhbnRzLlxuICAgKiBAcGFyYW0ge1N0cmVhbVtdfSBvcHRpb25zLmFsbFZpZGVvU3RyZWFtcyAtIFRoZSBsaXN0IG9mIGFsbCB2aWRlbyBzdHJlYW1zLlxuICAgKiBAcGFyYW0geyhTdHJlYW0gfCBQYXJ0aWNpcGFudClbXX0gb3B0aW9ucy5vbGRBbGxTdHJlYW1zIC0gVGhlIGxpc3Qgb2Ygb2xkIHZpZGVvIHN0cmVhbXMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmFkbWluVmlkSUQgLSBUaGUgSUQgb2YgdGhlIGFkbWluJ3MgdmlkZW8gc3RyZWFtLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZUFsbFZpZGVvU3RyZWFtcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgc3RhdGUgdmFyaWFibGUgZm9yIGFsbCB2aWRlbyBzdHJlYW1zLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZU9sZEFsbFN0cmVhbXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHN0YXRlIHZhcmlhYmxlIGZvciBvbGQgdmlkZW8gc3RyZWFtcy5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHZpZGVvIHN0cmVhbXMgaGF2ZSBiZWVuIHByb2Nlc3NlZCBhbmQgdXBkYXRlZC5cbiAgICovXG5cbiAgYXN5bmMgZ2V0VmlkZW9zKHtcbiAgICBwYXJ0aWNpcGFudHMsXG4gICAgYWxsVmlkZW9TdHJlYW1zLFxuICAgIG9sZEFsbFN0cmVhbXMsXG4gICAgYWRtaW5WaWRJRCxcbiAgICB1cGRhdGVBbGxWaWRlb1N0cmVhbXMsXG4gICAgdXBkYXRlT2xkQWxsU3RyZWFtcyxcbiAgfTogR2V0VmlkZW9zT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBGaWx0ZXIgb3V0IHRoZSBhZG1pbidzIHZpZGVvIHN0cmVhbSBhbmQgdXBkYXRlIHN0YXRlIHZhcmlhYmxlc1xuICAgICAgbGV0IGFkbWluID0gcGFydGljaXBhbnRzLmZpbHRlcigocGFydGljaXBhbnQ6IGFueSkgPT4gcGFydGljaXBhbnQuaXNsZXZlbCA9PT0gJzInKTtcblxuICAgICAgaWYgKGFkbWluLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYWRtaW5WaWRJRCA9IGFkbWluWzBdLnZpZGVvSUQ7XG5cbiAgICAgICAgaWYgKGFkbWluVmlkSUQgIT0gbnVsbCAmJiBhZG1pblZpZElEICE9PSAnJykge1xuICAgICAgICAgIGxldCBvbGRBbGxTdHJlYW1zXzogYW55W10gPSBbXTtcblxuICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBsZW5ndGggb2Ygb2xkQWxsU3RyZWFtcyBpcyBncmVhdGVyIHRoYW4gMFxuICAgICAgICAgIGlmIChvbGRBbGxTdHJlYW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG9sZEFsbFN0cmVhbXNfID0gb2xkQWxsU3RyZWFtcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBGaWx0ZXIgb3V0IGFkbWluJ3MgdmlkZW8gc3RyZWFtIGZyb20gb2xkQWxsU3RyZWFtc1xuICAgICAgICAgIG9sZEFsbFN0cmVhbXMgPSBhbGxWaWRlb1N0cmVhbXMuZmlsdGVyKFxuICAgICAgICAgICAgKHN0cmVhbWU6IGFueSkgPT4gc3RyZWFtZS5wcm9kdWNlcklkID09PSBhZG1pblZpZElELFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICAvLyBJZiBubyBhZG1pbidzIHZpZGVvIHN0cmVhbSBmb3VuZCwgcmV2ZXJ0IHRvIHRoZSBwcmV2aW91cyBzdGF0ZVxuICAgICAgICAgIGlmIChvbGRBbGxTdHJlYW1zLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIG9sZEFsbFN0cmVhbXMgPSBvbGRBbGxTdHJlYW1zXztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBVcGRhdGUgdGhlIHN0YXRlIHZhcmlhYmxlIGZvciBvbGQgdmlkZW8gc3RyZWFtc1xuICAgICAgICAgIHVwZGF0ZU9sZEFsbFN0cmVhbXMob2xkQWxsU3RyZWFtcyk7XG5cbiAgICAgICAgICAvLyBGaWx0ZXIgb3V0IGFkbWluJ3MgdmlkZW8gc3RyZWFtIGZyb20gYWxsVmlkZW9TdHJlYW1zXG4gICAgICAgICAgYWxsVmlkZW9TdHJlYW1zID0gYWxsVmlkZW9TdHJlYW1zLmZpbHRlcihcbiAgICAgICAgICAgIChzdHJlYW1lOiBhbnkpID0+IHN0cmVhbWUucHJvZHVjZXJJZCAhPT0gYWRtaW5WaWRJRCxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgLy8gVXBkYXRlIHRoZSBzdGF0ZSB2YXJpYWJsZSBmb3IgYWxsIHZpZGVvIHN0cmVhbXNcbiAgICAgICAgICB1cGRhdGVBbGxWaWRlb1N0cmVhbXMoYWxsVmlkZW9TdHJlYW1zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIC8vIEhhbmRsZSBlcnJvcnMgZHVyaW5nIHRoZSBwcm9jZXNzIG9mIHVwZGF0aW5nIHZpZGVvIHN0cmVhbXNcbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvciB1cGRhdGluZyB2aWRlbyBzdHJlYW1zOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgLy8gdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59XG4iXX0=