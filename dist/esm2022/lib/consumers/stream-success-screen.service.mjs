import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class StreamSuccessScreen {
    /**
     * Handles the successful initiation of screen sharing.
     *
     * @param {StreamSuccessScreenOptions} options - The options for the screen sharing success handler.
     * @param {MediaStream} options.stream - The media stream to be shared.
     * @param {Object} options.parameters - The parameters required for screen sharing.
     * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     * @param {Socket} options.parameters.socket - The socket instance for communication.
     * @param {boolean} options.parameters.transportCreated - Flag indicating if the transport is already created.
     * @param {MediaStream} options.parameters.localStreamScreen - The local screen media stream.
     * @param {boolean} options.parameters.screenAlreadyOn - Flag indicating if the screen is already being shared.
     * @param {boolean} options.parameters.screenAction - Flag indicating if the screen share action is requested.
     * @param {boolean} options.parameters.transportCreatedScreen - Flag indicating if the screen transport is created.
     * @param {string} options.parameters.hostLabel - The label of the host.
     * @param {string} options.parameters.eventType - The type of the event (e.g., conference).
     * @param {Function} options.parameters.showAlert - Function to show alerts.
     * @param {boolean} options.parameters.annotateScreenStream - Flag indicating if screen annotation is enabled.
     * @param {Function} options.parameters.updateTransportCreatedScreen - Function to update the screen transport creation state.
     * @param {Function} options.parameters.updateScreenAlreadyOn - Function to update the screen sharing state.
     * @param {Function} options.parameters.updateScreenAction - Function to update the screen action state.
     * @param {Function} options.parameters.updateTransportCreated - Function to update the transport creation state.
     * @param {Function} options.parameters.updateLocalStreamScreen - Function to update the local screen stream.
     * @param {Function} options.parameters.updateShared - Function to update the shared state.
     * @param {Function} options.parameters.updateIsScreenboardModalVisible - Function to update the screenboard modal visibility.
     * @param {Function} options.parameters.sleep - Function to pause execution for a specified duration.
     * @param {Function} options.parameters.createSendTransport - Function to create a send transport.
     * @param {Function} options.parameters.connectSendTransportScreen - Function to connect the send transport for screen sharing.
     * @param {Function} options.parameters.disconnectSendTransportScreen - Function to disconnect the send transport for screen sharing.
     * @param {Function} options.parameters.stopShareScreen - Function to stop screen sharing.
     * @param {Function} options.parameters.reorderStreams - Function to reorder streams.
     * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
     * @param {Function} options.parameters.rePort - Function to reinitialize ports.
     *
     * @returns {Promise<void>} A promise that resolves when the screen sharing setup is complete.
     */
    async streamSuccessScreen({ stream, parameters }) {
        let { getUpdatedAllParams } = parameters;
        parameters = getUpdatedAllParams();
        let { socket, transportCreated, localStreamScreen, screenAlreadyOn, screenAction, transportCreatedScreen, hostLabel, eventType, showAlert, annotateScreenStream, 
        // updates for the above
        updateTransportCreatedScreen, updateScreenAlreadyOn, updateScreenAction, updateTransportCreated, updateLocalStreamScreen, updateShared, updateIsScreenboardModalVisible, sleep, 
        // mediasfu functions
        createSendTransport, connectSendTransportScreen, disconnectSendTransportScreen, stopShareScreen, reorderStreams, prepopulateUserMedia, rePort, } = parameters;
        // Share screen on success
        localStreamScreen = stream;
        updateLocalStreamScreen(localStreamScreen);
        try {
            // Create transport if not created else connect transport
            if (!transportCreated) {
                await createSendTransport({
                    option: 'screen',
                    parameters: { ...parameters, localStreamScreen },
                });
            }
            else {
                await connectSendTransportScreen({
                    stream: localStreamScreen,
                    parameters: { ...parameters, localStreamScreen },
                });
            }
            // Alert the socket that you are sharing screen
            socket.emit('startScreenShare');
        }
        catch (error) {
            showAlert?.({
                message: error.message,
                type: 'danger',
                duration: 3000,
            });
        }
        // Reupdate the screen display
        try {
            updateShared(true);
            await prepopulateUserMedia({
                name: hostLabel,
                parameters: { ...parameters, localStreamScreen, shared: true },
            });
        }
        catch {
            /* handle error */
        }
        // Update the participants array to reflect the change
        screenAlreadyOn = true;
        updateScreenAlreadyOn(screenAlreadyOn);
        // Reorder streams if required
        try {
            if (eventType == 'conference') {
                await reorderStreams({ add: false, screenChanged: true, parameters });
                await prepopulateUserMedia({ name: hostLabel, parameters });
            }
            else {
                await reorderStreams({ parameters });
            }
        }
        catch (error) {
            try {
                await rePort({ parameters });
            }
            catch {
                /* handle error */
            }
        }
        // Handle screen share end
        localStreamScreen.getVideoTracks()[0].onended = async function () {
            // Supports both manual and automatic screen share end
            await disconnectSendTransportScreen({ parameters });
            await stopShareScreen({ parameters });
        };
        // If user requested to share screen, update the screenAction state
        if (screenAction == true) {
            screenAction = false;
        }
        updateScreenAction(screenAction);
        // Update the transport created state
        transportCreatedScreen = true;
        updateTransportCreatedScreen(transportCreatedScreen);
        updateTransportCreated(transportCreated);
        // Handle screen annotation modal
        try {
            if (annotateScreenStream) {
                annotateScreenStream = false;
                updateIsScreenboardModalVisible(true);
                await sleep({ ms: 500 });
                updateIsScreenboardModalVisible(false);
            }
        }
        catch (error) {
            //console.log('Error handling screen annotation:', error);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StreamSuccessScreen, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StreamSuccessScreen, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StreamSuccessScreen, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtLXN1Y2Nlc3Mtc2NyZWVuLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3N0cmVhbS1zdWNjZXNzLXNjcmVlbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBd0UzQyxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0NHO0lBQ0gsS0FBSyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBOEI7UUFDMUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLEdBQUcsVUFBVSxDQUFDO1FBQ3pDLFVBQVUsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1FBRW5DLElBQUksRUFDRixNQUFNLEVBQ04sZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsWUFBWSxFQUNaLHNCQUFzQixFQUN0QixTQUFTLEVBQ1QsU0FBUyxFQUNULFNBQVMsRUFDVCxvQkFBb0I7UUFFcEIsd0JBQXdCO1FBQ3hCLDRCQUE0QixFQUM1QixxQkFBcUIsRUFDckIsa0JBQWtCLEVBQ2xCLHNCQUFzQixFQUN0Qix1QkFBdUIsRUFDdkIsWUFBWSxFQUNaLCtCQUErQixFQUMvQixLQUFLO1FBRUwscUJBQXFCO1FBQ3JCLG1CQUFtQixFQUNuQiwwQkFBMEIsRUFDMUIsNkJBQTZCLEVBQzdCLGVBQWUsRUFDZixjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3BCLE1BQU0sR0FDUCxHQUFHLFVBQVUsQ0FBQztRQUVmLDBCQUEwQjtRQUMxQixpQkFBaUIsR0FBRyxNQUFNLENBQUM7UUFDM0IsdUJBQXVCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUUzQyxJQUFJLENBQUM7WUFDSCx5REFBeUQ7WUFDekQsSUFB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Q3RDLE1BQU0sS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQ3pCLCtCQUErQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLDBEQUEwRDtRQUM1RCxDQUFDO0lBQ0gsQ0FBQzt1R0FoS1UsbUJBQW1COzJHQUFuQixtQkFBbUIsY0FGbEIsTUFBTTs7MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHtcbiAgU2xlZXBUeXBlLFxuICBDcmVhdGVTZW5kVHJhbnNwb3J0VHlwZSxcbiAgQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5UeXBlLFxuICBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblR5cGUsXG4gIFN0b3BTaGFyZVNjcmVlblR5cGUsXG4gIFJlb3JkZXJTdHJlYW1zVHlwZSxcbiAgUHJlcG9wdWxhdGVVc2VyTWVkaWFUeXBlLFxuICBSZVBvcnRUeXBlLFxuICBTaG93QWxlcnQsXG4gIENyZWF0ZVNlbmRUcmFuc3BvcnRQYXJhbWV0ZXJzLFxuICBDb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblBhcmFtZXRlcnMsXG4gIERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuUGFyYW1ldGVycyxcbiAgU3RvcFNoYXJlU2NyZWVuUGFyYW1ldGVycyxcbiAgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzLFxuICBQcmVwb3B1bGF0ZVVzZXJNZWRpYVBhcmFtZXRlcnMsXG4gIEV2ZW50VHlwZSxcbn0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBTdHJlYW1TdWNjZXNzU2NyZWVuUGFyYW1ldGVyc1xuICBleHRlbmRzIENyZWF0ZVNlbmRUcmFuc3BvcnRQYXJhbWV0ZXJzLFxuICAgIENvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuUGFyYW1ldGVycyxcbiAgICBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblBhcmFtZXRlcnMsXG4gICAgU3RvcFNoYXJlU2NyZWVuUGFyYW1ldGVycyxcbiAgICBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMsXG4gICAgUHJlcG9wdWxhdGVVc2VyTWVkaWFQYXJhbWV0ZXJzIHtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIHRyYW5zcG9ydENyZWF0ZWQ6IGJvb2xlYW47XG4gIGxvY2FsU3RyZWFtU2NyZWVuOiBNZWRpYVN0cmVhbSB8IG51bGw7XG4gIHNjcmVlbkFscmVhZHlPbjogYm9vbGVhbjtcbiAgc2NyZWVuQWN0aW9uOiBib29sZWFuO1xuICB0cmFuc3BvcnRDcmVhdGVkU2NyZWVuOiBib29sZWFuO1xuICBob3N0TGFiZWw6IHN0cmluZztcbiAgZXZlbnRUeXBlOiBFdmVudFR5cGU7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgYW5ub3RhdGVTY3JlZW5TdHJlYW06IGJvb2xlYW47XG4gIHNoYXJlZDogYm9vbGVhbjtcblxuICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkU2NyZWVuOiAodHJhbnNwb3J0Q3JlYXRlZFNjcmVlbjogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlU2NyZWVuQWxyZWFkeU9uOiAoc2NyZWVuQWxyZWFkeU9uOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVTY3JlZW5BY3Rpb246IChzY3JlZW5BY3Rpb246IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWQ6ICh0cmFuc3BvcnRDcmVhdGVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVMb2NhbFN0cmVhbVNjcmVlbjogKGxvY2FsU3RyZWFtU2NyZWVuOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZVNoYXJlZDogKHNoYXJlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlSXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgc2xlZXA6IFNsZWVwVHlwZTtcbiAgY3JlYXRlU2VuZFRyYW5zcG9ydDogQ3JlYXRlU2VuZFRyYW5zcG9ydFR5cGU7XG4gIGNvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuOiBDb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblR5cGU7XG4gIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuOiBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblR5cGU7XG4gIHN0b3BTaGFyZVNjcmVlbjogU3RvcFNoYXJlU2NyZWVuVHlwZTtcbiAgcmVvcmRlclN0cmVhbXM6IFJlb3JkZXJTdHJlYW1zVHlwZTtcbiAgcHJlcG9wdWxhdGVVc2VyTWVkaWE6IFByZXBvcHVsYXRlVXNlck1lZGlhVHlwZTtcbiAgcmVQb3J0OiBSZVBvcnRUeXBlO1xuXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFN0cmVhbVN1Y2Nlc3NTY3JlZW5QYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RyZWFtU3VjY2Vzc1NjcmVlbk9wdGlvbnMge1xuICBzdHJlYW06IE1lZGlhU3RyZWFtO1xuICBwYXJhbWV0ZXJzOiBTdHJlYW1TdWNjZXNzU2NyZWVuUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgU3RyZWFtU3VjY2Vzc1NjcmVlblR5cGUgPSAob3B0aW9uczogU3RyZWFtU3VjY2Vzc1NjcmVlbk9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU3RyZWFtU3VjY2Vzc1NjcmVlbiB7XG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBzdWNjZXNzZnVsIGluaXRpYXRpb24gb2Ygc2NyZWVuIHNoYXJpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyZWFtU3VjY2Vzc1NjcmVlbk9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgdGhlIHNjcmVlbiBzaGFyaW5nIHN1Y2Nlc3MgaGFuZGxlci5cbiAgICogQHBhcmFtIHtNZWRpYVN0cmVhbX0gb3B0aW9ucy5zdHJlYW0gLSBUaGUgbWVkaWEgc3RyZWFtIHRvIGJlIHNoYXJlZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciBzY3JlZW4gc2hhcmluZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMgLSBGdW5jdGlvbiB0byBnZXQgdXBkYXRlZCBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgZm9yIGNvbW11bmljYXRpb24uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnRyYW5zcG9ydENyZWF0ZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHRyYW5zcG9ydCBpcyBhbHJlYWR5IGNyZWF0ZWQuXG4gICAqIEBwYXJhbSB7TWVkaWFTdHJlYW19IG9wdGlvbnMucGFyYW1ldGVycy5sb2NhbFN0cmVhbVNjcmVlbiAtIFRoZSBsb2NhbCBzY3JlZW4gbWVkaWEgc3RyZWFtLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zY3JlZW5BbHJlYWR5T24gLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHNjcmVlbiBpcyBhbHJlYWR5IGJlaW5nIHNoYXJlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2NyZWVuQWN0aW9uIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBzY3JlZW4gc2hhcmUgYWN0aW9uIGlzIHJlcXVlc3RlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMudHJhbnNwb3J0Q3JlYXRlZFNjcmVlbiAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgc2NyZWVuIHRyYW5zcG9ydCBpcyBjcmVhdGVkLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmhvc3RMYWJlbCAtIFRoZSBsYWJlbCBvZiB0aGUgaG9zdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5ldmVudFR5cGUgLSBUaGUgdHlwZSBvZiB0aGUgZXZlbnQgKGUuZy4sIGNvbmZlcmVuY2UpLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hvd0FsZXJ0IC0gRnVuY3Rpb24gdG8gc2hvdyBhbGVydHMuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmFubm90YXRlU2NyZWVuU3RyZWFtIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHNjcmVlbiBhbm5vdGF0aW9uIGlzIGVuYWJsZWQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVUcmFuc3BvcnRDcmVhdGVkU2NyZWVuIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzY3JlZW4gdHJhbnNwb3J0IGNyZWF0aW9uIHN0YXRlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlU2NyZWVuQWxyZWFkeU9uIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzY3JlZW4gc2hhcmluZyBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVNjcmVlbkFjdGlvbiAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgc2NyZWVuIGFjdGlvbiBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVRyYW5zcG9ydENyZWF0ZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHRyYW5zcG9ydCBjcmVhdGlvbiBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUxvY2FsU3RyZWFtU2NyZWVuIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBsb2NhbCBzY3JlZW4gc3RyZWFtLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlU2hhcmVkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzaGFyZWQgc3RhdGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVJc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzY3JlZW5ib2FyZCBtb2RhbCB2aXNpYmlsaXR5LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc2xlZXAgLSBGdW5jdGlvbiB0byBwYXVzZSBleGVjdXRpb24gZm9yIGEgc3BlY2lmaWVkIGR1cmF0aW9uLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuY3JlYXRlU2VuZFRyYW5zcG9ydCAtIEZ1bmN0aW9uIHRvIGNyZWF0ZSBhIHNlbmQgdHJhbnNwb3J0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4gLSBGdW5jdGlvbiB0byBjb25uZWN0IHRoZSBzZW5kIHRyYW5zcG9ydCBmb3Igc2NyZWVuIHNoYXJpbmcuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5kaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbiAtIEZ1bmN0aW9uIHRvIGRpc2Nvbm5lY3QgdGhlIHNlbmQgdHJhbnNwb3J0IGZvciBzY3JlZW4gc2hhcmluZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnN0b3BTaGFyZVNjcmVlbiAtIEZ1bmN0aW9uIHRvIHN0b3Agc2NyZWVuIHNoYXJpbmcuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZW9yZGVyU3RyZWFtcyAtIEZ1bmN0aW9uIHRvIHJlb3JkZXIgc3RyZWFtcy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnByZXBvcHVsYXRlVXNlck1lZGlhIC0gRnVuY3Rpb24gdG8gcHJlcG9wdWxhdGUgdXNlciBtZWRpYS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlUG9ydCAtIEZ1bmN0aW9uIHRvIHJlaW5pdGlhbGl6ZSBwb3J0cy5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNjcmVlbiBzaGFyaW5nIHNldHVwIGlzIGNvbXBsZXRlLlxuICAgKi9cbiAgYXN5bmMgc3RyZWFtU3VjY2Vzc1NjcmVlbih7IHN0cmVhbSwgcGFyYW1ldGVycyB9OiBTdHJlYW1TdWNjZXNzU2NyZWVuT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB7IGdldFVwZGF0ZWRBbGxQYXJhbXMgfSA9IHBhcmFtZXRlcnM7XG4gICAgcGFyYW1ldGVycyA9IGdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcblxuICAgIGxldCB7XG4gICAgICBzb2NrZXQsXG4gICAgICB0cmFuc3BvcnRDcmVhdGVkLFxuICAgICAgbG9jYWxTdHJlYW1TY3JlZW4sXG4gICAgICBzY3JlZW5BbHJlYWR5T24sXG4gICAgICBzY3JlZW5BY3Rpb24sXG4gICAgICB0cmFuc3BvcnRDcmVhdGVkU2NyZWVuLFxuICAgICAgaG9zdExhYmVsLFxuICAgICAgZXZlbnRUeXBlLFxuICAgICAgc2hvd0FsZXJ0LFxuICAgICAgYW5ub3RhdGVTY3JlZW5TdHJlYW0sXG5cbiAgICAgIC8vIHVwZGF0ZXMgZm9yIHRoZSBhYm92ZVxuICAgICAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZFNjcmVlbixcbiAgICAgIHVwZGF0ZVNjcmVlbkFscmVhZHlPbixcbiAgICAgIHVwZGF0ZVNjcmVlbkFjdGlvbixcbiAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWQsXG4gICAgICB1cGRhdGVMb2NhbFN0cmVhbVNjcmVlbixcbiAgICAgIHVwZGF0ZVNoYXJlZCxcbiAgICAgIHVwZGF0ZUlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGUsXG4gICAgICBzbGVlcCxcblxuICAgICAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gICAgICBjcmVhdGVTZW5kVHJhbnNwb3J0LFxuICAgICAgY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4sXG4gICAgICBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbixcbiAgICAgIHN0b3BTaGFyZVNjcmVlbixcbiAgICAgIHJlb3JkZXJTdHJlYW1zLFxuICAgICAgcHJlcG9wdWxhdGVVc2VyTWVkaWEsXG4gICAgICByZVBvcnQsXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAvLyBTaGFyZSBzY3JlZW4gb24gc3VjY2Vzc1xuICAgIGxvY2FsU3RyZWFtU2NyZWVuID0gc3RyZWFtO1xuICAgIHVwZGF0ZUxvY2FsU3RyZWFtU2NyZWVuKGxvY2FsU3RyZWFtU2NyZWVuKTtcblxuICAgIHRyeSB7XG4gICAgICAvLyBDcmVhdGUgdHJhbnNwb3J0IGlmIG5vdCBjcmVhdGVkIGVsc2UgY29ubmVjdCB0cmFuc3BvcnRcbiAgICAgIGlmICghdHJhbnNwb3J0Q3JlYXRlZCkge1xuICAgICAgICBhd2FpdCBjcmVhdGVTZW5kVHJhbnNwb3J0KHtcbiAgICAgICAgICBvcHRpb246ICdzY3JlZW4nLFxuICAgICAgICAgIHBhcmFtZXRlcnM6IHsgLi4ucGFyYW1ldGVycywgbG9jYWxTdHJlYW1TY3JlZW4gfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCBjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbih7XG4gICAgICAgICAgc3RyZWFtOiBsb2NhbFN0cmVhbVNjcmVlbixcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnBhcmFtZXRlcnMsIGxvY2FsU3RyZWFtU2NyZWVuIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBBbGVydCB0aGUgc29ja2V0IHRoYXQgeW91IGFyZSBzaGFyaW5nIHNjcmVlblxuICAgICAgc29ja2V0LmVtaXQoJ3N0YXJ0U2NyZWVuU2hhcmUnKTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFJldXBkYXRlIHRoZSBzY3JlZW4gZGlzcGxheVxuICAgIHRyeSB7XG4gICAgICB1cGRhdGVTaGFyZWQodHJ1ZSk7XG4gICAgICBhd2FpdCBwcmVwb3B1bGF0ZVVzZXJNZWRpYSh7XG4gICAgICAgIG5hbWU6IGhvc3RMYWJlbCxcbiAgICAgICAgcGFyYW1ldGVyczogeyAuLi5wYXJhbWV0ZXJzLCBsb2NhbFN0cmVhbVNjcmVlbiwgc2hhcmVkOiB0cnVlIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSB0aGUgcGFydGljaXBhbnRzIGFycmF5IHRvIHJlZmxlY3QgdGhlIGNoYW5nZVxuICAgIHNjcmVlbkFscmVhZHlPbiA9IHRydWU7XG4gICAgdXBkYXRlU2NyZWVuQWxyZWFkeU9uKHNjcmVlbkFscmVhZHlPbik7XG5cbiAgICAvLyBSZW9yZGVyIHN0cmVhbXMgaWYgcmVxdWlyZWRcbiAgICB0cnkge1xuICAgICAgaWYgKGV2ZW50VHlwZSA9PSAnY29uZmVyZW5jZScpIHtcbiAgICAgICAgYXdhaXQgcmVvcmRlclN0cmVhbXMoeyBhZGQ6IGZhbHNlLCBzY3JlZW5DaGFuZ2VkOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICBhd2FpdCBwcmVwb3B1bGF0ZVVzZXJNZWRpYSh7IG5hbWU6IGhvc3RMYWJlbCwgcGFyYW1ldGVycyB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHJlb3JkZXJTdHJlYW1zKHsgcGFyYW1ldGVycyB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgcmVQb3J0KHsgcGFyYW1ldGVycyB9KTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgc2NyZWVuIHNoYXJlIGVuZFxuICAgIGxvY2FsU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKClbMF0ub25lbmRlZCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIFN1cHBvcnRzIGJvdGggbWFudWFsIGFuZCBhdXRvbWF0aWMgc2NyZWVuIHNoYXJlIGVuZFxuICAgICAgYXdhaXQgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4oeyBwYXJhbWV0ZXJzIH0pO1xuICAgICAgYXdhaXQgc3RvcFNoYXJlU2NyZWVuKHsgcGFyYW1ldGVycyB9KTtcbiAgICB9O1xuXG4gICAgLy8gSWYgdXNlciByZXF1ZXN0ZWQgdG8gc2hhcmUgc2NyZWVuLCB1cGRhdGUgdGhlIHNjcmVlbkFjdGlvbiBzdGF0ZVxuICAgIGlmIChzY3JlZW5BY3Rpb24gPT0gdHJ1ZSkge1xuICAgICAgc2NyZWVuQWN0aW9uID0gZmFsc2U7XG4gICAgfVxuICAgIHVwZGF0ZVNjcmVlbkFjdGlvbihzY3JlZW5BY3Rpb24pO1xuXG4gICAgLy8gVXBkYXRlIHRoZSB0cmFuc3BvcnQgY3JlYXRlZCBzdGF0ZVxuICAgIHRyYW5zcG9ydENyZWF0ZWRTY3JlZW4gPSB0cnVlO1xuICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRTY3JlZW4odHJhbnNwb3J0Q3JlYXRlZFNjcmVlbik7XG4gICAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZCh0cmFuc3BvcnRDcmVhdGVkKTtcblxuICAgIC8vIEhhbmRsZSBzY3JlZW4gYW5ub3RhdGlvbiBtb2RhbFxuICAgIHRyeSB7XG4gICAgICBpZiAoYW5ub3RhdGVTY3JlZW5TdHJlYW0pIHtcbiAgICAgICAgYW5ub3RhdGVTY3JlZW5TdHJlYW0gPSBmYWxzZTtcbiAgICAgICAgdXBkYXRlSXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZSh0cnVlKTtcbiAgICAgICAgYXdhaXQgc2xlZXAoeyBtczogNTAwIH0pO1xuICAgICAgICB1cGRhdGVJc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy9jb25zb2xlLmxvZygnRXJyb3IgaGFuZGxpbmcgc2NyZWVuIGFubm90YXRpb246JywgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19