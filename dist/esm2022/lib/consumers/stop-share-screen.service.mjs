import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Stops the screen sharing process and updates the relevant parameters and states.
 *
 * This method updates the internal state to reflect that screen sharing has ended,
 * cleans up local media tracks, and reorders the streams in the application.
 *
 * @param {StopShareScreenOptions} options - The options for stopping the screen share.
 * @param {Object} options.parameters - The parameters required for stopping the screen share.
 * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
 * @param {boolean} options.parameters.shared - Indicates if the screen is currently shared.
 * @param {boolean} options.parameters.shareScreenStarted - Indicates if the screen sharing has started.
 * @param {boolean} options.parameters.shareEnded - Indicates if the screen sharing has ended.
 * @param {boolean} options.parameters.updateMainWindow - Indicates if the main window needs to be updated.
 * @param {boolean} options.parameters.defer_receive - Indicates if receiving is deferred.
 * @param {string} options.parameters.hostLabel - The label of the host.
 * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked.
 * @param {boolean} options.parameters.forceFullDisplay - Indicates if full display is forced.
 * @param {boolean} options.parameters.firstAll - Indicates if it is the first all.
 * @param {boolean} options.parameters.first_round - Indicates if it is the first round.
 * @param {MediaStream} options.parameters.localStreamScreen - The local screen stream.
 * @param {string} options.parameters.eventType - The type of event (e.g., "conference").
 * @param {boolean} options.parameters.prevForceFullDisplay - Indicates if full display was previously forced.
 * @param {boolean} options.parameters.annotateScreenStream - Indicates if the screen stream is annotated.
 * @param {Function} options.parameters.updateShared - Function to update the shared state.
 * @param {Function} options.parameters.updateShareScreenStarted - Function to update the share screen started state.
 * @param {Function} options.parameters.updateShareEnded - Function to update the share ended state.
 * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window state.
 * @param {Function} options.parameters.updateDefer_receive - Function to update the defer receive state.
 * @param {Function} options.parameters.updateLock_screen - Function to update the lock screen state.
 * @param {Function} options.parameters.updateForceFullDisplay - Function to update the force full display state.
 * @param {Function} options.parameters.updateFirstAll - Function to update the first all state.
 * @param {Function} options.parameters.updateFirst_round - Function to update the first round state.
 * @param {Function} options.parameters.updateLocalStreamScreen - Function to update the local screen stream.
 * @param {Function} options.parameters.updateMainHeightWidth - Function to update the main height and width.
 * @param {Function} options.parameters.updateAnnotateScreenStream - Function to update the annotate screen stream state.
 * @param {Function} options.parameters.updateIsScreenboardModalVisible - Function to update the screenboard modal visibility.
 * @param {Function} options.parameters.disconnectSendTransportScreen - Function to disconnect the send transport screen.
 * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
 * @param {Function} options.parameters.reorderStreams - Function to reorder streams.
 * @param {Function} options.parameters.getVideos - Function to get videos.
 *
 * @returns {Promise<void>} A promise that resolves when the screen sharing process is stopped.
 *
 * @throws {Error} Throws an error if there is an issue during the screen share stopping process.
 *
 * @example
 * await stopShareScreen({
 *   parameters: {
 *     socket: mySocket,
 *     shared: true,
 *     shareScreenStarted: true,
 *     // other parameters...
 *   },
 * });
 */
export class StopShareScreen {
    /**
     * Stops the screen sharing process and updates the relevant parameters and states.
     *
     * @param {StopShareScreenOptions} options - The options for stopping the screen share.
     * @param {Object} options.parameters - The parameters required for stopping the screen share.
     * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     * @param {boolean} options.parameters.shared - Indicates if the screen is currently shared.
     * @param {boolean} options.parameters.shareScreenStarted - Indicates if the screen sharing has started.
     * @param {boolean} options.parameters.shareEnded - Indicates if the screen sharing has ended.
     * @param {boolean} options.parameters.updateMainWindow - Indicates if the main window needs to be updated.
     * @param {boolean} options.parameters.defer_receive - Indicates if receiving is deferred.
     * @param {string} options.parameters.hostLabel - The label of the host.
     * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked.
     * @param {boolean} options.parameters.forceFullDisplay - Indicates if full display is forced.
     * @param {boolean} options.parameters.firstAll - Indicates if it is the first all.
     * @param {boolean} options.parameters.first_round - Indicates if it is the first round.
     * @param {MediaStream} options.parameters.localStreamScreen - The local screen stream.
     * @param {string} options.parameters.eventType - The type of event.
     * @param {boolean} options.parameters.prevForceFullDisplay - Indicates if full display was previously forced.
     * @param {boolean} options.parameters.annotateScreenStream - Indicates if the screen stream is annotated.
     * @param {Function} options.parameters.updateShared - Function to update the shared state.
     * @param {Function} options.parameters.updateShareScreenStarted - Function to update the share screen started state.
     * @param {Function} options.parameters.updateShareEnded - Function to update the share ended state.
     * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window state.
     * @param {Function} options.parameters.updateDefer_receive - Function to update the defer receive state.
     * @param {Function} options.parameters.updateLock_screen - Function to update the lock screen state.
     * @param {Function} options.parameters.updateForceFullDisplay - Function to update the force full display state.
     * @param {Function} options.parameters.updateFirstAll - Function to update the first all state.
     * @param {Function} options.parameters.updateFirst_round - Function to update the first round state.
     * @param {Function} options.parameters.updateLocalStreamScreen - Function to update the local screen stream.
     * @param {Function} options.parameters.updateMainHeightWidth - Function to update the main height and width.
     * @param {Function} options.parameters.updateAnnotateScreenStream - Function to update the annotate screen stream state.
     * @param {Function} options.parameters.updateIsScreenboardModalVisible - Function to update the screenboard modal visibility.
     * @param {Function} options.parameters.disconnectSendTransportScreen - Function to disconnect the send transport screen.
     * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
     * @param {Function} options.parameters.reorderStreams - Function to reorder streams.
     * @param {Function} options.parameters.getVideos - Function to get videos.
     *
     * @returns {Promise<void>} A promise that resolves when the screen sharing process is stopped.
     */
    stopShareScreen = async ({ parameters }) => {
        let { getUpdatedAllParams } = parameters;
        parameters = getUpdatedAllParams();
        let { shared, shareScreenStarted, shareEnded, updateMainWindow, defer_receive, hostLabel, lock_screen, forceFullDisplay, firstAll, first_round, localStreamScreen, eventType, prevForceFullDisplay, annotateScreenStream, 
        // updates for the above
        updateShared, updateShareScreenStarted, updateShareEnded, updateUpdateMainWindow, updateDefer_receive, updateLock_screen, updateForceFullDisplay, updateFirstAll, updateFirst_round, updateLocalStreamScreen, updateMainHeightWidth, updateAnnotateScreenStream, updateIsScreenboardModalVisible, 
        // mediasfu functions
        disconnectSendTransportScreen, prepopulateUserMedia, reorderStreams, getVideos, } = parameters;
        shared = false;
        updateShared(shared);
        shareScreenStarted = false;
        updateShareScreenStarted(shareScreenStarted);
        shareEnded = true;
        updateShareEnded(shareEnded);
        updateMainWindow = true;
        updateUpdateMainWindow(updateMainWindow);
        if (defer_receive) {
            defer_receive = false;
            updateDefer_receive(defer_receive);
            await getVideos({
                participants: parameters.participants,
                allVideoStreams: parameters.allVideoStreams,
                oldAllStreams: parameters.oldAllStreams,
                adminVidID: parameters.adminVidID,
                updateAllVideoStreams: parameters['updateAllVideoStreams'],
                updateOldAllStreams: parameters['updateOldAllStreams'],
            });
        }
        localStreamScreen?.getTracks().forEach((track) => track.stop());
        updateLocalStreamScreen(localStreamScreen);
        await disconnectSendTransportScreen({ parameters });
        try {
            if (annotateScreenStream) {
                annotateScreenStream = false;
                updateAnnotateScreenStream(annotateScreenStream);
                updateIsScreenboardModalVisible(true);
                await new Promise((resolve) => setTimeout(resolve, 500));
                updateIsScreenboardModalVisible(false);
            }
        }
        catch (error) {
            console.log('Error handling screen annotation:', error);
        }
        if (eventType == 'conference') {
            updateMainHeightWidth(0);
        }
        try {
            await prepopulateUserMedia({ name: hostLabel, parameters });
        }
        catch (error) {
            console.log('Error in prepopulateUserMedia:', error);
        }
        try {
            await reorderStreams({ add: false, screenChanged: true, parameters });
        }
        catch (error) {
            console.log('Error in reorderStreams:', error);
        }
        lock_screen = false;
        updateLock_screen(lock_screen);
        forceFullDisplay = prevForceFullDisplay;
        updateForceFullDisplay(forceFullDisplay);
        firstAll = false;
        updateFirstAll(firstAll);
        first_round = false;
        updateFirst_round(first_round);
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StopShareScreen, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StopShareScreen, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StopShareScreen, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcC1zaGFyZS1zY3JlZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvc3RvcC1zaGFyZS1zY3JlZW4uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQTZEM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNERztBQU1ILE1BQU0sT0FBTyxlQUFlO0lBQzFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Q0c7SUFDSCxlQUFlLEdBQUcsS0FBSyxFQUFFLEVBQUUsVUFBVSxFQUEwQixFQUFpQixFQUFFO1FBQ2hGLElBQUksRUFBRSxtQkFBbUIsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUN6QyxVQUFVLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztRQUVuQyxJQUFJLEVBQ0YsTUFBTSxFQUNOLGtCQUFrQixFQUNsQixVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixTQUFTLEVBQ1QsV0FBVyxFQUNYLGdCQUFnQixFQUNoQixRQUFRLEVBQ1IsV0FBVyxFQUNYLGlCQUFpQixFQUNqQixTQUFTLEVBQ1Qsb0JBQW9CLEVBQ3BCLG9CQUFvQjtRQUVwQix3QkFBd0I7UUFDeEIsWUFBWSxFQUNaLHdCQUF3QixFQUN4QixnQkFBZ0IsRUFDaEIsc0JBQXNCLEVBQ3RCLG1CQUFtQixFQUNuQixpQkFBaUIsRUFDakIsc0JBQXNCLEVBQ3RCLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLHFCQUFxQixFQUNyQiwwQkFBMEIsRUFDMUIsK0JBQStCO1FBRS9CLHFCQUFxQjtRQUNyQiw2QkFBNkIsRUFDN0Isb0JBQW9CLEVBQ3BCLGNBQWMsRUFDZCxTQUFT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QUN6QixXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQzt1R0FqSlMsZUFBZTsyR0FBZixlQUFlLGNBRmQsTUFBTTs7MkZBRVAsZUFBZTtrQkFIM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblR5cGUsXG4gIFByZXBvcHVsYXRlVXNlck1lZGlhVHlwZSxcbiAgUmVvcmRlclN0cmVhbXNUeXBlLFxuICBHZXRWaWRlb3NUeXBlLFxuICBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblBhcmFtZXRlcnMsXG4gIFByZXBvcHVsYXRlVXNlck1lZGlhUGFyYW1ldGVycyxcbiAgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzLFxuICBFdmVudFR5cGUsXG59IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIFN0b3BTaGFyZVNjcmVlblBhcmFtZXRlcnNcbiAgZXh0ZW5kcyBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblBhcmFtZXRlcnMsXG4gICAgUHJlcG9wdWxhdGVVc2VyTWVkaWFQYXJhbWV0ZXJzLFxuICAgIFJlb3JkZXJTdHJlYW1zUGFyYW1ldGVycyB7XG4gIHNoYXJlZDogYm9vbGVhbjtcbiAgc2hhcmVTY3JlZW5TdGFydGVkOiBib29sZWFuO1xuICBzaGFyZUVuZGVkOiBib29sZWFuO1xuICB1cGRhdGVNYWluV2luZG93OiBib29sZWFuO1xuICBkZWZlcl9yZWNlaXZlOiBib29sZWFuO1xuICBob3N0TGFiZWw6IHN0cmluZztcbiAgbG9ja19zY3JlZW46IGJvb2xlYW47XG4gIGZvcmNlRnVsbERpc3BsYXk6IGJvb2xlYW47XG4gIGZpcnN0QWxsOiBib29sZWFuO1xuICBmaXJzdF9yb3VuZDogYm9vbGVhbjtcbiAgbG9jYWxTdHJlYW1TY3JlZW46IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgZXZlbnRUeXBlOiBFdmVudFR5cGU7XG4gIHByZXZGb3JjZUZ1bGxEaXNwbGF5OiBib29sZWFuO1xuICBhbm5vdGF0ZVNjcmVlblN0cmVhbTogYm9vbGVhbjtcblxuICB1cGRhdGVTaGFyZWQ6IChzaGFyZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZDogKHNoYXJlU2NyZWVuU3RhcnRlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlU2hhcmVFbmRlZDogKHNoYXJlRW5kZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3c6ICh1cGRhdGVNYWluV2luZG93OiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVEZWZlcl9yZWNlaXZlOiAoZGVmZXJfcmVjZWl2ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlTG9ja19zY3JlZW46IChsb2NrX3NjcmVlbjogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlRm9yY2VGdWxsRGlzcGxheTogKGZvcmNlRnVsbERpc3BsYXk6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUZpcnN0QWxsOiAoZmlyc3RBbGw6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUZpcnN0X3JvdW5kOiAoZmlyc3Rfcm91bmQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUxvY2FsU3RyZWFtU2NyZWVuOiAobG9jYWxTdHJlYW1TY3JlZW46IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlTWFpbkhlaWdodFdpZHRoOiAobWFpbkhlaWdodFdpZHRoOiBudW1iZXIpID0+IHZvaWQ7XG4gIHVwZGF0ZUFubm90YXRlU2NyZWVuU3RyZWFtOiAoYW5ub3RhdGVTY3JlZW5TdHJlYW06IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGU6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuOiBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblR5cGU7XG4gIHByZXBvcHVsYXRlVXNlck1lZGlhOiBQcmVwb3B1bGF0ZVVzZXJNZWRpYVR5cGU7XG4gIHJlb3JkZXJTdHJlYW1zOiBSZW9yZGVyU3RyZWFtc1R5cGU7XG4gIGdldFZpZGVvczogR2V0VmlkZW9zVHlwZTtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBTdG9wU2hhcmVTY3JlZW5QYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RvcFNoYXJlU2NyZWVuT3B0aW9ucyB7XG4gIHBhcmFtZXRlcnM6IFN0b3BTaGFyZVNjcmVlblBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFN0b3BTaGFyZVNjcmVlblR5cGUgPSAob3B0aW9uczogU3RvcFNoYXJlU2NyZWVuT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBTdG9wcyB0aGUgc2NyZWVuIHNoYXJpbmcgcHJvY2VzcyBhbmQgdXBkYXRlcyB0aGUgcmVsZXZhbnQgcGFyYW1ldGVycyBhbmQgc3RhdGVzLlxuICpcbiAqIFRoaXMgbWV0aG9kIHVwZGF0ZXMgdGhlIGludGVybmFsIHN0YXRlIHRvIHJlZmxlY3QgdGhhdCBzY3JlZW4gc2hhcmluZyBoYXMgZW5kZWQsXG4gKiBjbGVhbnMgdXAgbG9jYWwgbWVkaWEgdHJhY2tzLCBhbmQgcmVvcmRlcnMgdGhlIHN0cmVhbXMgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICpcbiAqIEBwYXJhbSB7U3RvcFNoYXJlU2NyZWVuT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBzdG9wcGluZyB0aGUgc2NyZWVuIHNoYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciBzdG9wcGluZyB0aGUgc2NyZWVuIHNoYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMgLSBGdW5jdGlvbiB0byBnZXQgdXBkYXRlZCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVkIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaXMgY3VycmVudGx5IHNoYXJlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNoYXJlU2NyZWVuU3RhcnRlZCAtIEluZGljYXRlcyBpZiB0aGUgc2NyZWVuIHNoYXJpbmcgaGFzIHN0YXJ0ZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zaGFyZUVuZGVkIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gc2hhcmluZyBoYXMgZW5kZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVNYWluV2luZG93IC0gSW5kaWNhdGVzIGlmIHRoZSBtYWluIHdpbmRvdyBuZWVkcyB0byBiZSB1cGRhdGVkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuZGVmZXJfcmVjZWl2ZSAtIEluZGljYXRlcyBpZiByZWNlaXZpbmcgaXMgZGVmZXJyZWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmhvc3RMYWJlbCAtIFRoZSBsYWJlbCBvZiB0aGUgaG9zdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2tfc2NyZWVuIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaXMgbG9ja2VkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuZm9yY2VGdWxsRGlzcGxheSAtIEluZGljYXRlcyBpZiBmdWxsIGRpc3BsYXkgaXMgZm9yY2VkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuZmlyc3RBbGwgLSBJbmRpY2F0ZXMgaWYgaXQgaXMgdGhlIGZpcnN0IGFsbC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmZpcnN0X3JvdW5kIC0gSW5kaWNhdGVzIGlmIGl0IGlzIHRoZSBmaXJzdCByb3VuZC5cbiAqIEBwYXJhbSB7TWVkaWFTdHJlYW19IG9wdGlvbnMucGFyYW1ldGVycy5sb2NhbFN0cmVhbVNjcmVlbiAtIFRoZSBsb2NhbCBzY3JlZW4gc3RyZWFtLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5ldmVudFR5cGUgLSBUaGUgdHlwZSBvZiBldmVudCAoZS5nLiwgXCJjb25mZXJlbmNlXCIpLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucHJldkZvcmNlRnVsbERpc3BsYXkgLSBJbmRpY2F0ZXMgaWYgZnVsbCBkaXNwbGF5IHdhcyBwcmV2aW91c2x5IGZvcmNlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmFubm90YXRlU2NyZWVuU3RyZWFtIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gc3RyZWFtIGlzIGFubm90YXRlZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVTaGFyZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHNoYXJlZCBzdGF0ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHNoYXJlIHNjcmVlbiBzdGFydGVkIHN0YXRlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVNoYXJlRW5kZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHNoYXJlIGVuZGVkIHN0YXRlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVVwZGF0ZU1haW5XaW5kb3cgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1haW4gd2luZG93IHN0YXRlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZURlZmVyX3JlY2VpdmUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGRlZmVyIHJlY2VpdmUgc3RhdGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTG9ja19zY3JlZW4gLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGxvY2sgc2NyZWVuIHN0YXRlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUZvcmNlRnVsbERpc3BsYXkgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGZvcmNlIGZ1bGwgZGlzcGxheSBzdGF0ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVGaXJzdEFsbCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgZmlyc3QgYWxsIHN0YXRlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUZpcnN0X3JvdW5kIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBmaXJzdCByb3VuZCBzdGF0ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVMb2NhbFN0cmVhbVNjcmVlbiAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbG9jYWwgc2NyZWVuIHN0cmVhbS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVNYWluSGVpZ2h0V2lkdGggLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1haW4gaGVpZ2h0IGFuZCB3aWR0aC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVBbm5vdGF0ZVNjcmVlblN0cmVhbSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgYW5ub3RhdGUgc2NyZWVuIHN0cmVhbSBzdGF0ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVJc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzY3JlZW5ib2FyZCBtb2RhbCB2aXNpYmlsaXR5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuIC0gRnVuY3Rpb24gdG8gZGlzY29ubmVjdCB0aGUgc2VuZCB0cmFuc3BvcnQgc2NyZWVuLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnByZXBvcHVsYXRlVXNlck1lZGlhIC0gRnVuY3Rpb24gdG8gcHJlcG9wdWxhdGUgdXNlciBtZWRpYS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZW9yZGVyU3RyZWFtcyAtIEZ1bmN0aW9uIHRvIHJlb3JkZXIgc3RyZWFtcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5nZXRWaWRlb3MgLSBGdW5jdGlvbiB0byBnZXQgdmlkZW9zLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzY3JlZW4gc2hhcmluZyBwcm9jZXNzIGlzIHN0b3BwZWQuXG4gKlxuICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGVyZSBpcyBhbiBpc3N1ZSBkdXJpbmcgdGhlIHNjcmVlbiBzaGFyZSBzdG9wcGluZyBwcm9jZXNzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBhd2FpdCBzdG9wU2hhcmVTY3JlZW4oe1xuICogICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgc29ja2V0OiBteVNvY2tldCxcbiAqICAgICBzaGFyZWQ6IHRydWUsXG4gKiAgICAgc2hhcmVTY3JlZW5TdGFydGVkOiB0cnVlLFxuICogICAgIC8vIG90aGVyIHBhcmFtZXRlcnMuLi5cbiAqICAgfSxcbiAqIH0pO1xuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFN0b3BTaGFyZVNjcmVlbiB7XG4gIC8qKlxuICAgKiBTdG9wcyB0aGUgc2NyZWVuIHNoYXJpbmcgcHJvY2VzcyBhbmQgdXBkYXRlcyB0aGUgcmVsZXZhbnQgcGFyYW1ldGVycyBhbmQgc3RhdGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0b3BTaGFyZVNjcmVlbk9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3Igc3RvcHBpbmcgdGhlIHNjcmVlbiBzaGFyZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciBzdG9wcGluZyB0aGUgc2NyZWVuIHNoYXJlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcyAtIEZ1bmN0aW9uIHRvIGdldCB1cGRhdGVkIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNoYXJlZCAtIEluZGljYXRlcyBpZiB0aGUgc2NyZWVuIGlzIGN1cnJlbnRseSBzaGFyZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNoYXJlU2NyZWVuU3RhcnRlZCAtIEluZGljYXRlcyBpZiB0aGUgc2NyZWVuIHNoYXJpbmcgaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNoYXJlRW5kZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHNjcmVlbiBzaGFyaW5nIGhhcyBlbmRlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWFpbldpbmRvdyAtIEluZGljYXRlcyBpZiB0aGUgbWFpbiB3aW5kb3cgbmVlZHMgdG8gYmUgdXBkYXRlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuZGVmZXJfcmVjZWl2ZSAtIEluZGljYXRlcyBpZiByZWNlaXZpbmcgaXMgZGVmZXJyZWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuaG9zdExhYmVsIC0gVGhlIGxhYmVsIG9mIHRoZSBob3N0LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5sb2NrX3NjcmVlbiAtIEluZGljYXRlcyBpZiB0aGUgc2NyZWVuIGlzIGxvY2tlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuZm9yY2VGdWxsRGlzcGxheSAtIEluZGljYXRlcyBpZiBmdWxsIGRpc3BsYXkgaXMgZm9yY2VkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5maXJzdEFsbCAtIEluZGljYXRlcyBpZiBpdCBpcyB0aGUgZmlyc3QgYWxsLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5maXJzdF9yb3VuZCAtIEluZGljYXRlcyBpZiBpdCBpcyB0aGUgZmlyc3Qgcm91bmQuXG4gICAqIEBwYXJhbSB7TWVkaWFTdHJlYW19IG9wdGlvbnMucGFyYW1ldGVycy5sb2NhbFN0cmVhbVNjcmVlbiAtIFRoZSBsb2NhbCBzY3JlZW4gc3RyZWFtLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmV2ZW50VHlwZSAtIFRoZSB0eXBlIG9mIGV2ZW50LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5wcmV2Rm9yY2VGdWxsRGlzcGxheSAtIEluZGljYXRlcyBpZiBmdWxsIGRpc3BsYXkgd2FzIHByZXZpb3VzbHkgZm9yY2VkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5hbm5vdGF0ZVNjcmVlblN0cmVhbSAtIEluZGljYXRlcyBpZiB0aGUgc2NyZWVuIHN0cmVhbSBpcyBhbm5vdGF0ZWQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVTaGFyZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHNoYXJlZCBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgc2hhcmUgc2NyZWVuIHN0YXJ0ZWQgc3RhdGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVTaGFyZUVuZGVkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzaGFyZSBlbmRlZCBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVVwZGF0ZU1haW5XaW5kb3cgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1haW4gd2luZG93IHN0YXRlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlRGVmZXJfcmVjZWl2ZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgZGVmZXIgcmVjZWl2ZSBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUxvY2tfc2NyZWVuIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBsb2NrIHNjcmVlbiBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUZvcmNlRnVsbERpc3BsYXkgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGZvcmNlIGZ1bGwgZGlzcGxheSBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUZpcnN0QWxsIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBmaXJzdCBhbGwgc3RhdGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVGaXJzdF9yb3VuZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgZmlyc3Qgcm91bmQgc3RhdGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVMb2NhbFN0cmVhbVNjcmVlbiAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbG9jYWwgc2NyZWVuIHN0cmVhbS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU1haW5IZWlnaHRXaWR0aCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWFpbiBoZWlnaHQgYW5kIHdpZHRoLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQW5ub3RhdGVTY3JlZW5TdHJlYW0gLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGFubm90YXRlIHNjcmVlbiBzdHJlYW0gc3RhdGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVJc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzY3JlZW5ib2FyZCBtb2RhbCB2aXNpYmlsaXR5LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4gLSBGdW5jdGlvbiB0byBkaXNjb25uZWN0IHRoZSBzZW5kIHRyYW5zcG9ydCBzY3JlZW4uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5wcmVwb3B1bGF0ZVVzZXJNZWRpYSAtIEZ1bmN0aW9uIHRvIHByZXBvcHVsYXRlIHVzZXIgbWVkaWEuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZW9yZGVyU3RyZWFtcyAtIEZ1bmN0aW9uIHRvIHJlb3JkZXIgc3RyZWFtcy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmdldFZpZGVvcyAtIEZ1bmN0aW9uIHRvIGdldCB2aWRlb3MuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzY3JlZW4gc2hhcmluZyBwcm9jZXNzIGlzIHN0b3BwZWQuXG4gICAqL1xuICBzdG9wU2hhcmVTY3JlZW4gPSBhc3luYyAoeyBwYXJhbWV0ZXJzIH06IFN0b3BTaGFyZVNjcmVlbk9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBsZXQgeyBnZXRVcGRhdGVkQWxsUGFyYW1zIH0gPSBwYXJhbWV0ZXJzO1xuICAgIHBhcmFtZXRlcnMgPSBnZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICBsZXQge1xuICAgICAgc2hhcmVkLFxuICAgICAgc2hhcmVTY3JlZW5TdGFydGVkLFxuICAgICAgc2hhcmVFbmRlZCxcbiAgICAgIHVwZGF0ZU1haW5XaW5kb3csXG4gICAgICBkZWZlcl9yZWNlaXZlLFxuICAgICAgaG9zdExhYmVsLFxuICAgICAgbG9ja19zY3JlZW4sXG4gICAgICBmb3JjZUZ1bGxEaXNwbGF5LFxuICAgICAgZmlyc3RBbGwsXG4gICAgICBmaXJzdF9yb3VuZCxcbiAgICAgIGxvY2FsU3RyZWFtU2NyZWVuLFxuICAgICAgZXZlbnRUeXBlLFxuICAgICAgcHJldkZvcmNlRnVsbERpc3BsYXksXG4gICAgICBhbm5vdGF0ZVNjcmVlblN0cmVhbSxcblxuICAgICAgLy8gdXBkYXRlcyBmb3IgdGhlIGFib3ZlXG4gICAgICB1cGRhdGVTaGFyZWQsXG4gICAgICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgICB1cGRhdGVTaGFyZUVuZGVkLFxuICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyxcbiAgICAgIHVwZGF0ZURlZmVyX3JlY2VpdmUsXG4gICAgICB1cGRhdGVMb2NrX3NjcmVlbixcbiAgICAgIHVwZGF0ZUZvcmNlRnVsbERpc3BsYXksXG4gICAgICB1cGRhdGVGaXJzdEFsbCxcbiAgICAgIHVwZGF0ZUZpcnN0X3JvdW5kLFxuICAgICAgdXBkYXRlTG9jYWxTdHJlYW1TY3JlZW4sXG4gICAgICB1cGRhdGVNYWluSGVpZ2h0V2lkdGgsXG4gICAgICB1cGRhdGVBbm5vdGF0ZVNjcmVlblN0cmVhbSxcbiAgICAgIHVwZGF0ZUlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGUsXG5cbiAgICAgIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICAgICAgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4sXG4gICAgICBwcmVwb3B1bGF0ZVVzZXJNZWRpYSxcbiAgICAgIHJlb3JkZXJTdHJlYW1zLFxuICAgICAgZ2V0VmlkZW9zLFxuICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgc2hhcmVkID0gZmFsc2U7XG4gICAgdXBkYXRlU2hhcmVkKHNoYXJlZCk7XG4gICAgc2hhcmVTY3JlZW5TdGFydGVkID0gZmFsc2U7XG4gICAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkKHNoYXJlU2NyZWVuU3RhcnRlZCk7XG4gICAgc2hhcmVFbmRlZCA9IHRydWU7XG4gICAgdXBkYXRlU2hhcmVFbmRlZChzaGFyZUVuZGVkKTtcbiAgICB1cGRhdGVNYWluV2luZG93ID0gdHJ1ZTtcbiAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93KHVwZGF0ZU1haW5XaW5kb3cpO1xuXG4gICAgaWYgKGRlZmVyX3JlY2VpdmUpIHtcbiAgICAgIGRlZmVyX3JlY2VpdmUgPSBmYWxzZTtcbiAgICAgIHVwZGF0ZURlZmVyX3JlY2VpdmUoZGVmZXJfcmVjZWl2ZSk7XG4gICAgICBhd2FpdCBnZXRWaWRlb3Moe1xuICAgICAgICBwYXJ0aWNpcGFudHM6IHBhcmFtZXRlcnMucGFydGljaXBhbnRzLFxuICAgICAgICBhbGxWaWRlb1N0cmVhbXM6IHBhcmFtZXRlcnMuYWxsVmlkZW9TdHJlYW1zLFxuICAgICAgICBvbGRBbGxTdHJlYW1zOiBwYXJhbWV0ZXJzLm9sZEFsbFN0cmVhbXMsXG4gICAgICAgIGFkbWluVmlkSUQ6IHBhcmFtZXRlcnMuYWRtaW5WaWRJRCxcbiAgICAgICAgdXBkYXRlQWxsVmlkZW9TdHJlYW1zOiBwYXJhbWV0ZXJzWyd1cGRhdGVBbGxWaWRlb1N0cmVhbXMnXSxcbiAgICAgICAgdXBkYXRlT2xkQWxsU3RyZWFtczogcGFyYW1ldGVyc1sndXBkYXRlT2xkQWxsU3RyZWFtcyddLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9jYWxTdHJlYW1TY3JlZW4/LmdldFRyYWNrcygpLmZvckVhY2goKHRyYWNrOiBNZWRpYVN0cmVhbVRyYWNrKSA9PiB0cmFjay5zdG9wKCkpO1xuICAgIHVwZGF0ZUxvY2FsU3RyZWFtU2NyZWVuKGxvY2FsU3RyZWFtU2NyZWVuKTtcbiAgICBhd2FpdCBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbih7IHBhcmFtZXRlcnMgfSk7XG5cbiAgICB0cnkge1xuICAgICAgaWYgKGFubm90YXRlU2NyZWVuU3RyZWFtKSB7XG4gICAgICAgIGFubm90YXRlU2NyZWVuU3RyZWFtID0gZmFsc2U7XG4gICAgICAgIHVwZGF0ZUFubm90YXRlU2NyZWVuU3RyZWFtKGFubm90YXRlU2NyZWVuU3RyZWFtKTtcbiAgICAgICAgdXBkYXRlSXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZSh0cnVlKTtcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgNTAwKSk7XG4gICAgICAgIHVwZGF0ZUlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgaGFuZGxpbmcgc2NyZWVuIGFubm90YXRpb246JywgZXJyb3IpO1xuICAgIH1cblxuICAgIGlmIChldmVudFR5cGUgPT0gJ2NvbmZlcmVuY2UnKSB7XG4gICAgICB1cGRhdGVNYWluSGVpZ2h0V2lkdGgoMCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHByZXBvcHVsYXRlVXNlck1lZGlhKHsgbmFtZTogaG9zdExhYmVsLCBwYXJhbWV0ZXJzIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgaW4gcHJlcG9wdWxhdGVVc2VyTWVkaWE6JywgZXJyb3IpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCByZW9yZGVyU3RyZWFtcyh7IGFkZDogZmFsc2UsIHNjcmVlbkNoYW5nZWQ6IHRydWUsIHBhcmFtZXRlcnMgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBpbiByZW9yZGVyU3RyZWFtczonLCBlcnJvcik7XG4gICAgfVxuXG4gICAgbG9ja19zY3JlZW4gPSBmYWxzZTtcbiAgICB1cGRhdGVMb2NrX3NjcmVlbihsb2NrX3NjcmVlbik7XG4gICAgZm9yY2VGdWxsRGlzcGxheSA9IHByZXZGb3JjZUZ1bGxEaXNwbGF5O1xuICAgIHVwZGF0ZUZvcmNlRnVsbERpc3BsYXkoZm9yY2VGdWxsRGlzcGxheSk7XG4gICAgZmlyc3RBbGwgPSBmYWxzZTtcbiAgICB1cGRhdGVGaXJzdEFsbChmaXJzdEFsbCk7XG4gICAgZmlyc3Rfcm91bmQgPSBmYWxzZTtcbiAgICB1cGRhdGVGaXJzdF9yb3VuZChmaXJzdF9yb3VuZCk7XG4gIH07XG59XG4iXX0=