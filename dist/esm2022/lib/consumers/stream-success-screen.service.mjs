import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Handles the successful initiation of screen sharing.
 *
 * This method sets up the necessary transport connections for screen sharing,
 * updates relevant application states, and notifies participants of the screen
 * sharing status.
 *
 * @param {StreamSuccessScreenOptions} options - The options for the screen sharing success handler.
 * @param {MediaStream} options.stream - The media stream to be shared.
 * @param {StreamSuccessScreenParameters} options.parameters - The parameters required for screen sharing.
 * @param {Socket} options.parameters.socket - The socket instance for real-time communication.
 * @param {boolean} options.parameters.transportCreated - Flag indicating if the transport is already created.
 * @param {MediaStream | null} options.parameters.localStreamScreen - The local screen media stream.
 * @param {boolean} options.parameters.screenAlreadyOn - Flag indicating if the screen is already being shared.
 * @param {boolean} options.parameters.screenAction - Flag indicating if the screen share action is requested.
 * @param {boolean} options.parameters.transportCreatedScreen - Flag indicating if the screen transport is created.
 * @param {string} options.parameters.hostLabel - The label of the host for this session.
 * @param {string} options.parameters.eventType - The type of event (e.g., conference).
 * @param {ShowAlert} [options.parameters.showAlert] - Optional function to show alert messages.
 * @param {boolean} options.parameters.annotateScreenStream - Flag indicating if screen annotation is enabled.
 * @param {Function} options.parameters.updateTransportCreatedScreen - Function to update the screen transport creation state.
 * @param {Function} options.parameters.updateScreenAlreadyOn - Function to update the screen sharing state.
 * @param {Function} options.parameters.updateScreenAction - Function to update the screen action state.
 * @param {Function} options.parameters.updateTransportCreated - Function to update the transport creation state.
 * @param {Function} options.parameters.updateLocalStreamScreen - Function to update the local screen stream.
 * @param {Function} options.parameters.updateShared - Function to update the shared state.
 * @param {Function} options.parameters.updateIsScreenboardModalVisible - Function to update the screenboard modal visibility.
 * @param {Function} options.parameters.sleep - Function to pause execution for a specified time.
 * @param {Function} options.parameters.createSendTransport - Function to create a send transport for screen sharing.
 * @param {Function} options.parameters.connectSendTransportScreen - Function to connect the send transport for screen sharing.
 * @param {Function} options.parameters.disconnectSendTransportScreen - Function to disconnect the send transport for screen sharing.
 * @param {Function} options.parameters.stopShareScreen - Function to stop the screen sharing process.
 * @param {Function} options.parameters.reorderStreams - Function to reorder streams based on current state.
 * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media based on current settings.
 * @param {Function} options.parameters.rePort - Function to reinitialize ports if needed.
 *
 * @returns {Promise<void>} A promise that resolves when the screen sharing setup is complete.
 *
 * @throws {Error} Throws an error if there is an issue during the screen sharing setup.
 *
 * @example
 * await streamSuccessScreen({
 *   stream: newScreenStream,
 *   parameters: {
 *     socket: socketInstance,
 *     localStreamScreen: null,
 *     // other parameters...
 *   },
 * });
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtLXN1Y2Nlc3Mtc2NyZWVuLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3N0cmVhbS1zdWNjZXNzLXNjcmVlbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBc0UzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlERztBQUtILE1BQU0sT0FBTyxtQkFBbUI7SUFDOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQ0c7SUFDSCxLQUFLLENBQUMsbUJBQW1CLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUE4QjtRQUMxRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxVQUFVLENBQUM7UUFDekMsVUFBVSxHQUFHLG1CQUFtQixFQUFFLENBQUM7UUFFbkMsSUFBSSxFQUNGLE1BQU0sRUFDTixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixZQUFZLEVBQ1osc0JBQXNCLEVBQ3RCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsU0FBUyxFQUNULG9CQUFvQjtRQUVwQix3QkFBd0I7UUFDeEIsNEJBQTRCLEVBQzVCLHFCQUFxQixFQUNyQixrQkFBa0IsRUFDbEIsc0JBQXNCLEVBQ3RCLHVCQUF1QixFQUN2QixZQUFZLEVBQ1osK0JBQStCLEVBQy9CLEtBQUs7UUFFTCxxQkFBcUI7UUFDckIsbUJBQW1CLEVBQ25CLDBCQUEwQixFQUMxQiw2QkFBNkIsRUFDN0IsZUFBZSxFQUNmLGNBQWMsRUFDZCxvQkFBb0IsRUFDcEIsTUFBTSxHQUNQLEdBQUcsVUFBVSxDQUFDO1FBRWYsMEJBQTBCO1FBQzFCLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztRQUMzQix1QkFBdUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRTNDLElBQUksQ0FBQztZQUNILHlEQUF5RDtZQUN6RCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDdEIsTUFBTSxtQkFBbUIsQ0FBQztvQkFDeEIsTUFBTSxFQUFFLFFBQVE7b0JBQ2hCLFVBQVUsRUFBRSxFQUFFLEdBQUcsVUFBVSxFQUFFLGlCQUFpQixFQUFFO2lCQUNqRCxDQUFDLENBQUM7WUFDTCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sTUFBTSwwQkFBMEIsQ0FBQztvQkFDL0IsTUFBTSxFQUFFLGlCQUFpQjtvQkFDekIsVUFBVSxFQUFFLEVBQUUsR0FBRyxVQUFVLEVBQUUsaUJBQWlCLEVBQUU7aUJBQ2pELENBQUMsQ0FBQztZQUNMLENBQUM7WUFFRCwrQ0FBK0M7WUFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1lBQ3BCLFNBQVMsRUFBRSxDQUFDO2dCQUNWLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztnQkFDdEIsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDZixDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsOEJBQThCO1FBQzlCLElBQUksQ0FBQztZQUNILFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQixNQUFNLG9CQUFvQixDQUFDO2dCQUN6QixJQUFJLEVBQUUsU0FBUztnQkFDZixVQUFVLEVBQUUsRUFBRSxHQUFHLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2FBQy9ELENBQUMsQ0FBQztRQUNMLENBQUM7UUFBQyxNQUFNLENBQUM7WUFDUCxrQkFBa0I7UUFDcEIsQ0FBQztRQUVELHNEQUFzRDtRQUN0RCxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRXZDLDhCQUE4QjtRQUM5QixJQUFJLENBQUM7WUFDSCxJQUFJLFNBQVMsSUFBSSxZQUFZLEVBQUUsQ0FBQztnQkFDOUIsTUFBTSxjQUFjLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDdEUsTUFBTSxvQkFBb0IsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUM5RCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sTUFBTSxjQUFjLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQztnQkFDSCxNQUFNLE1BQU0sQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDL0IsQ0FBQztZQUFDLE1BQU0sQ0FBQztnQkFDUCxrQkFBa0I7WUFDcEIsQ0FBQztRQUNILENBQUM7UUFFRCwwQkFBMEI7UUFDMUIsaUJBQWlCLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUs7WUFDbkQsc0RBQXNEO1lBQ3RELE1BQU0sNkJBQTZCLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sZUFBZSxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUM7UUFFRixtRUFBbUU7UUFDbkUsSUFBSSxZQUFZLElBQUksSUFBSSxFQUFFLENBQUM7WUFDekIsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO1FBQ0Qsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFakMscUNBQXFDO1FBQ3JDLHNCQUFzQixHQUFHLElBQUksQ0FBQztRQUM5Qiw0QkFBNEIsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3JELHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFekMsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQztZQUNILElBQUksb0JBQW9CLEVBQUUsQ0FBQztnQkFDekIsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO2dCQUM3QiwrQkFBK0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEMsTUFBTSxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDekIsK0JBQStCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsQ0FBQztRQUNILENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsMERBQTBEO1FBQzVELENBQUM7SUFDSCxDQUFDO3VHQWhLVSxtQkFBbUI7MkdBQW5CLG1CQUFtQixjQUZsQixNQUFNOzsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQge1xuICBTbGVlcFR5cGUsXG4gIENyZWF0ZVNlbmRUcmFuc3BvcnRUeXBlLFxuICBDb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblR5cGUsXG4gIERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuVHlwZSxcbiAgU3RvcFNoYXJlU2NyZWVuVHlwZSxcbiAgUmVvcmRlclN0cmVhbXNUeXBlLFxuICBQcmVwb3B1bGF0ZVVzZXJNZWRpYVR5cGUsXG4gIFJlUG9ydFR5cGUsXG4gIFNob3dBbGVydCxcbiAgQ3JlYXRlU2VuZFRyYW5zcG9ydFBhcmFtZXRlcnMsXG4gIENvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuUGFyYW1ldGVycyxcbiAgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5QYXJhbWV0ZXJzLFxuICBTdG9wU2hhcmVTY3JlZW5QYXJhbWV0ZXJzLFxuICBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMsXG4gIFByZXBvcHVsYXRlVXNlck1lZGlhUGFyYW1ldGVycyxcbiAgRXZlbnRUeXBlLFxufSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0cmVhbVN1Y2Nlc3NTY3JlZW5QYXJhbWV0ZXJzXG4gIGV4dGVuZHMgQ3JlYXRlU2VuZFRyYW5zcG9ydFBhcmFtZXRlcnMsXG4gICAgQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5QYXJhbWV0ZXJzLFxuICAgIERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuUGFyYW1ldGVycyxcbiAgICBTdG9wU2hhcmVTY3JlZW5QYXJhbWV0ZXJzLFxuICAgIFJlb3JkZXJTdHJlYW1zUGFyYW1ldGVycyxcbiAgICBQcmVwb3B1bGF0ZVVzZXJNZWRpYVBhcmFtZXRlcnMge1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgdHJhbnNwb3J0Q3JlYXRlZDogYm9vbGVhbjtcbiAgbG9jYWxTdHJlYW1TY3JlZW46IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgc2NyZWVuQWxyZWFkeU9uOiBib29sZWFuO1xuICBzY3JlZW5BY3Rpb246IGJvb2xlYW47XG4gIHRyYW5zcG9ydENyZWF0ZWRTY3JlZW46IGJvb2xlYW47XG4gIGhvc3RMYWJlbDogc3RyaW5nO1xuICBldmVudFR5cGU6IEV2ZW50VHlwZTtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICBhbm5vdGF0ZVNjcmVlblN0cmVhbTogYm9vbGVhbjtcbiAgc2hhcmVkOiBib29sZWFuO1xuXG4gIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRTY3JlZW46ICh0cmFuc3BvcnRDcmVhdGVkU2NyZWVuOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVTY3JlZW5BbHJlYWR5T246IChzY3JlZW5BbHJlYWR5T246IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVNjcmVlbkFjdGlvbjogKHNjcmVlbkFjdGlvbjogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZDogKHRyYW5zcG9ydENyZWF0ZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUxvY2FsU3RyZWFtU2NyZWVuOiAobG9jYWxTdHJlYW1TY3JlZW46IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlU2hhcmVkOiAoc2hhcmVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVJc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBzbGVlcDogU2xlZXBUeXBlO1xuICBjcmVhdGVTZW5kVHJhbnNwb3J0OiBDcmVhdGVTZW5kVHJhbnNwb3J0VHlwZTtcbiAgY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW46IENvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuVHlwZTtcbiAgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW46IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuVHlwZTtcbiAgc3RvcFNoYXJlU2NyZWVuOiBTdG9wU2hhcmVTY3JlZW5UeXBlO1xuICByZW9yZGVyU3RyZWFtczogUmVvcmRlclN0cmVhbXNUeXBlO1xuICBwcmVwb3B1bGF0ZVVzZXJNZWRpYTogUHJlcG9wdWxhdGVVc2VyTWVkaWFUeXBlO1xuICByZVBvcnQ6IFJlUG9ydFR5cGU7XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gU3RyZWFtU3VjY2Vzc1NjcmVlblBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdHJlYW1TdWNjZXNzU2NyZWVuT3B0aW9ucyB7XG4gIHN0cmVhbTogTWVkaWFTdHJlYW07XG4gIHBhcmFtZXRlcnM6IFN0cmVhbVN1Y2Nlc3NTY3JlZW5QYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBTdHJlYW1TdWNjZXNzU2NyZWVuVHlwZSA9IChvcHRpb25zOiBTdHJlYW1TdWNjZXNzU2NyZWVuT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBIYW5kbGVzIHRoZSBzdWNjZXNzZnVsIGluaXRpYXRpb24gb2Ygc2NyZWVuIHNoYXJpbmcuXG4gKlxuICogVGhpcyBtZXRob2Qgc2V0cyB1cCB0aGUgbmVjZXNzYXJ5IHRyYW5zcG9ydCBjb25uZWN0aW9ucyBmb3Igc2NyZWVuIHNoYXJpbmcsXG4gKiB1cGRhdGVzIHJlbGV2YW50IGFwcGxpY2F0aW9uIHN0YXRlcywgYW5kIG5vdGlmaWVzIHBhcnRpY2lwYW50cyBvZiB0aGUgc2NyZWVuXG4gKiBzaGFyaW5nIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge1N0cmVhbVN1Y2Nlc3NTY3JlZW5PcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHRoZSBzY3JlZW4gc2hhcmluZyBzdWNjZXNzIGhhbmRsZXIuXG4gKiBAcGFyYW0ge01lZGlhU3RyZWFtfSBvcHRpb25zLnN0cmVhbSAtIFRoZSBtZWRpYSBzdHJlYW0gdG8gYmUgc2hhcmVkLlxuICogQHBhcmFtIHtTdHJlYW1TdWNjZXNzU2NyZWVuUGFyYW1ldGVyc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgcmVxdWlyZWQgZm9yIHNjcmVlbiBzaGFyaW5nLlxuICogQHBhcmFtIHtTb2NrZXR9IG9wdGlvbnMucGFyYW1ldGVycy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIGZvciByZWFsLXRpbWUgY29tbXVuaWNhdGlvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnRyYW5zcG9ydENyZWF0ZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHRyYW5zcG9ydCBpcyBhbHJlYWR5IGNyZWF0ZWQuXG4gKiBAcGFyYW0ge01lZGlhU3RyZWFtIHwgbnVsbH0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuIC0gVGhlIGxvY2FsIHNjcmVlbiBtZWRpYSBzdHJlYW0uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zY3JlZW5BbHJlYWR5T24gLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHNjcmVlbiBpcyBhbHJlYWR5IGJlaW5nIHNoYXJlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNjcmVlbkFjdGlvbiAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgc2NyZWVuIHNoYXJlIGFjdGlvbiBpcyByZXF1ZXN0ZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy50cmFuc3BvcnRDcmVhdGVkU2NyZWVuIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBzY3JlZW4gdHJhbnNwb3J0IGlzIGNyZWF0ZWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmhvc3RMYWJlbCAtIFRoZSBsYWJlbCBvZiB0aGUgaG9zdCBmb3IgdGhpcyBzZXNzaW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5ldmVudFR5cGUgLSBUaGUgdHlwZSBvZiBldmVudCAoZS5nLiwgY29uZmVyZW5jZSkuXG4gKiBAcGFyYW0ge1Nob3dBbGVydH0gW29wdGlvbnMucGFyYW1ldGVycy5zaG93QWxlcnRdIC0gT3B0aW9uYWwgZnVuY3Rpb24gdG8gc2hvdyBhbGVydCBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmFubm90YXRlU2NyZWVuU3RyZWFtIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHNjcmVlbiBhbm5vdGF0aW9uIGlzIGVuYWJsZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlVHJhbnNwb3J0Q3JlYXRlZFNjcmVlbiAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgc2NyZWVuIHRyYW5zcG9ydCBjcmVhdGlvbiBzdGF0ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVTY3JlZW5BbHJlYWR5T24gLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHNjcmVlbiBzaGFyaW5nIHN0YXRlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVNjcmVlbkFjdGlvbiAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgc2NyZWVuIGFjdGlvbiBzdGF0ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVUcmFuc3BvcnRDcmVhdGVkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB0cmFuc3BvcnQgY3JlYXRpb24gc3RhdGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTG9jYWxTdHJlYW1TY3JlZW4gLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGxvY2FsIHNjcmVlbiBzdHJlYW0uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlU2hhcmVkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzaGFyZWQgc3RhdGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlSXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgc2NyZWVuYm9hcmQgbW9kYWwgdmlzaWJpbGl0eS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5zbGVlcCAtIEZ1bmN0aW9uIHRvIHBhdXNlIGV4ZWN1dGlvbiBmb3IgYSBzcGVjaWZpZWQgdGltZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jcmVhdGVTZW5kVHJhbnNwb3J0IC0gRnVuY3Rpb24gdG8gY3JlYXRlIGEgc2VuZCB0cmFuc3BvcnQgZm9yIHNjcmVlbiBzaGFyaW5nLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuIC0gRnVuY3Rpb24gdG8gY29ubmVjdCB0aGUgc2VuZCB0cmFuc3BvcnQgZm9yIHNjcmVlbiBzaGFyaW5nLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuIC0gRnVuY3Rpb24gdG8gZGlzY29ubmVjdCB0aGUgc2VuZCB0cmFuc3BvcnQgZm9yIHNjcmVlbiBzaGFyaW5nLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnN0b3BTaGFyZVNjcmVlbiAtIEZ1bmN0aW9uIHRvIHN0b3AgdGhlIHNjcmVlbiBzaGFyaW5nIHByb2Nlc3MuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMucmVvcmRlclN0cmVhbXMgLSBGdW5jdGlvbiB0byByZW9yZGVyIHN0cmVhbXMgYmFzZWQgb24gY3VycmVudCBzdGF0ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5wcmVwb3B1bGF0ZVVzZXJNZWRpYSAtIEZ1bmN0aW9uIHRvIHByZXBvcHVsYXRlIHVzZXIgbWVkaWEgYmFzZWQgb24gY3VycmVudCBzZXR0aW5ncy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZVBvcnQgLSBGdW5jdGlvbiB0byByZWluaXRpYWxpemUgcG9ydHMgaWYgbmVlZGVkLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzY3JlZW4gc2hhcmluZyBzZXR1cCBpcyBjb21wbGV0ZS5cbiAqXG4gKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZXJlIGlzIGFuIGlzc3VlIGR1cmluZyB0aGUgc2NyZWVuIHNoYXJpbmcgc2V0dXAuXG4gKlxuICogQGV4YW1wbGVcbiAqIGF3YWl0IHN0cmVhbVN1Y2Nlc3NTY3JlZW4oe1xuICogICBzdHJlYW06IG5ld1NjcmVlblN0cmVhbSxcbiAqICAgcGFyYW1ldGVyczoge1xuICogICAgIHNvY2tldDogc29ja2V0SW5zdGFuY2UsXG4gKiAgICAgbG9jYWxTdHJlYW1TY3JlZW46IG51bGwsXG4gKiAgICAgLy8gb3RoZXIgcGFyYW1ldGVycy4uLlxuICogICB9LFxuICogfSk7XG4gKi9cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFN0cmVhbVN1Y2Nlc3NTY3JlZW4ge1xuICAvKipcbiAgICogSGFuZGxlcyB0aGUgc3VjY2Vzc2Z1bCBpbml0aWF0aW9uIG9mIHNjcmVlbiBzaGFyaW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmVhbVN1Y2Nlc3NTY3JlZW5PcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHRoZSBzY3JlZW4gc2hhcmluZyBzdWNjZXNzIGhhbmRsZXIuXG4gICAqIEBwYXJhbSB7TWVkaWFTdHJlYW19IG9wdGlvbnMuc3RyZWFtIC0gVGhlIG1lZGlhIHN0cmVhbSB0byBiZSBzaGFyZWQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3Igc2NyZWVuIHNoYXJpbmcuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zIC0gRnVuY3Rpb24gdG8gZ2V0IHVwZGF0ZWQgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtTb2NrZXR9IG9wdGlvbnMucGFyYW1ldGVycy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIGZvciBjb21tdW5pY2F0aW9uLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy50cmFuc3BvcnRDcmVhdGVkIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSB0cmFuc3BvcnQgaXMgYWxyZWFkeSBjcmVhdGVkLlxuICAgKiBAcGFyYW0ge01lZGlhU3RyZWFtfSBvcHRpb25zLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1TY3JlZW4gLSBUaGUgbG9jYWwgc2NyZWVuIG1lZGlhIHN0cmVhbS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2NyZWVuQWxyZWFkeU9uIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBzY3JlZW4gaXMgYWxyZWFkeSBiZWluZyBzaGFyZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNjcmVlbkFjdGlvbiAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgc2NyZWVuIHNoYXJlIGFjdGlvbiBpcyByZXF1ZXN0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnRyYW5zcG9ydENyZWF0ZWRTY3JlZW4gLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHNjcmVlbiB0cmFuc3BvcnQgaXMgY3JlYXRlZC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5ob3N0TGFiZWwgLSBUaGUgbGFiZWwgb2YgdGhlIGhvc3QuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuZXZlbnRUeXBlIC0gVGhlIHR5cGUgb2YgdGhlIGV2ZW50IChlLmcuLCBjb25mZXJlbmNlKS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNob3dBbGVydCAtIEZ1bmN0aW9uIHRvIHNob3cgYWxlcnRzLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5hbm5vdGF0ZVNjcmVlblN0cmVhbSAtIEZsYWcgaW5kaWNhdGluZyBpZiBzY3JlZW4gYW5ub3RhdGlvbiBpcyBlbmFibGVkLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlVHJhbnNwb3J0Q3JlYXRlZFNjcmVlbiAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgc2NyZWVuIHRyYW5zcG9ydCBjcmVhdGlvbiBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVNjcmVlbkFscmVhZHlPbiAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgc2NyZWVuIHNoYXJpbmcgc3RhdGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVTY3JlZW5BY3Rpb24gLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHNjcmVlbiBhY3Rpb24gc3RhdGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVUcmFuc3BvcnRDcmVhdGVkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB0cmFuc3BvcnQgY3JlYXRpb24gc3RhdGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVMb2NhbFN0cmVhbVNjcmVlbiAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbG9jYWwgc2NyZWVuIHN0cmVhbS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVNoYXJlZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgc2hhcmVkIHN0YXRlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlSXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgc2NyZWVuYm9hcmQgbW9kYWwgdmlzaWJpbGl0eS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNsZWVwIC0gRnVuY3Rpb24gdG8gcGF1c2UgZXhlY3V0aW9uIGZvciBhIHNwZWNpZmllZCBkdXJhdGlvbi5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNyZWF0ZVNlbmRUcmFuc3BvcnQgLSBGdW5jdGlvbiB0byBjcmVhdGUgYSBzZW5kIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuIC0gRnVuY3Rpb24gdG8gY29ubmVjdCB0aGUgc2VuZCB0cmFuc3BvcnQgZm9yIHNjcmVlbiBzaGFyaW5nLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4gLSBGdW5jdGlvbiB0byBkaXNjb25uZWN0IHRoZSBzZW5kIHRyYW5zcG9ydCBmb3Igc2NyZWVuIHNoYXJpbmcuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5zdG9wU2hhcmVTY3JlZW4gLSBGdW5jdGlvbiB0byBzdG9wIHNjcmVlbiBzaGFyaW5nLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMucmVvcmRlclN0cmVhbXMgLSBGdW5jdGlvbiB0byByZW9yZGVyIHN0cmVhbXMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5wcmVwb3B1bGF0ZVVzZXJNZWRpYSAtIEZ1bmN0aW9uIHRvIHByZXBvcHVsYXRlIHVzZXIgbWVkaWEuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5yZVBvcnQgLSBGdW5jdGlvbiB0byByZWluaXRpYWxpemUgcG9ydHMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzY3JlZW4gc2hhcmluZyBzZXR1cCBpcyBjb21wbGV0ZS5cbiAgICovXG4gIGFzeW5jIHN0cmVhbVN1Y2Nlc3NTY3JlZW4oeyBzdHJlYW0sIHBhcmFtZXRlcnMgfTogU3RyZWFtU3VjY2Vzc1NjcmVlbk9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgeyBnZXRVcGRhdGVkQWxsUGFyYW1zIH0gPSBwYXJhbWV0ZXJzO1xuICAgIHBhcmFtZXRlcnMgPSBnZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICBsZXQge1xuICAgICAgc29ja2V0LFxuICAgICAgdHJhbnNwb3J0Q3JlYXRlZCxcbiAgICAgIGxvY2FsU3RyZWFtU2NyZWVuLFxuICAgICAgc2NyZWVuQWxyZWFkeU9uLFxuICAgICAgc2NyZWVuQWN0aW9uLFxuICAgICAgdHJhbnNwb3J0Q3JlYXRlZFNjcmVlbixcbiAgICAgIGhvc3RMYWJlbCxcbiAgICAgIGV2ZW50VHlwZSxcbiAgICAgIHNob3dBbGVydCxcbiAgICAgIGFubm90YXRlU2NyZWVuU3RyZWFtLFxuXG4gICAgICAvLyB1cGRhdGVzIGZvciB0aGUgYWJvdmVcbiAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWRTY3JlZW4sXG4gICAgICB1cGRhdGVTY3JlZW5BbHJlYWR5T24sXG4gICAgICB1cGRhdGVTY3JlZW5BY3Rpb24sXG4gICAgICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkLFxuICAgICAgdXBkYXRlTG9jYWxTdHJlYW1TY3JlZW4sXG4gICAgICB1cGRhdGVTaGFyZWQsXG4gICAgICB1cGRhdGVJc1NjcmVlbmJvYXJkTW9kYWxWaXNpYmxlLFxuICAgICAgc2xlZXAsXG5cbiAgICAgIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICAgICAgY3JlYXRlU2VuZFRyYW5zcG9ydCxcbiAgICAgIGNvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuLFxuICAgICAgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4sXG4gICAgICBzdG9wU2hhcmVTY3JlZW4sXG4gICAgICByZW9yZGVyU3RyZWFtcyxcbiAgICAgIHByZXBvcHVsYXRlVXNlck1lZGlhLFxuICAgICAgcmVQb3J0LFxuICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgLy8gU2hhcmUgc2NyZWVuIG9uIHN1Y2Nlc3NcbiAgICBsb2NhbFN0cmVhbVNjcmVlbiA9IHN0cmVhbTtcbiAgICB1cGRhdGVMb2NhbFN0cmVhbVNjcmVlbihsb2NhbFN0cmVhbVNjcmVlbik7XG5cbiAgICB0cnkge1xuICAgICAgLy8gQ3JlYXRlIHRyYW5zcG9ydCBpZiBub3QgY3JlYXRlZCBlbHNlIGNvbm5lY3QgdHJhbnNwb3J0XG4gICAgICBpZiAoIXRyYW5zcG9ydENyZWF0ZWQpIHtcbiAgICAgICAgYXdhaXQgY3JlYXRlU2VuZFRyYW5zcG9ydCh7XG4gICAgICAgICAgb3B0aW9uOiAnc2NyZWVuJyxcbiAgICAgICAgICBwYXJhbWV0ZXJzOiB7IC4uLnBhcmFtZXRlcnMsIGxvY2FsU3RyZWFtU2NyZWVuIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4oe1xuICAgICAgICAgIHN0cmVhbTogbG9jYWxTdHJlYW1TY3JlZW4sXG4gICAgICAgICAgcGFyYW1ldGVyczogeyAuLi5wYXJhbWV0ZXJzLCBsb2NhbFN0cmVhbVNjcmVlbiB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gQWxlcnQgdGhlIHNvY2tldCB0aGF0IHlvdSBhcmUgc2hhcmluZyBzY3JlZW5cbiAgICAgIHNvY2tldC5lbWl0KCdzdGFydFNjcmVlblNoYXJlJyk7XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBSZXVwZGF0ZSB0aGUgc2NyZWVuIGRpc3BsYXlcbiAgICB0cnkge1xuICAgICAgdXBkYXRlU2hhcmVkKHRydWUpO1xuICAgICAgYXdhaXQgcHJlcG9wdWxhdGVVc2VyTWVkaWEoe1xuICAgICAgICBuYW1lOiBob3N0TGFiZWwsXG4gICAgICAgIHBhcmFtZXRlcnM6IHsgLi4ucGFyYW1ldGVycywgbG9jYWxTdHJlYW1TY3JlZW4sIHNoYXJlZDogdHJ1ZSB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgdGhlIHBhcnRpY2lwYW50cyBhcnJheSB0byByZWZsZWN0IHRoZSBjaGFuZ2VcbiAgICBzY3JlZW5BbHJlYWR5T24gPSB0cnVlO1xuICAgIHVwZGF0ZVNjcmVlbkFscmVhZHlPbihzY3JlZW5BbHJlYWR5T24pO1xuXG4gICAgLy8gUmVvcmRlciBzdHJlYW1zIGlmIHJlcXVpcmVkXG4gICAgdHJ5IHtcbiAgICAgIGlmIChldmVudFR5cGUgPT0gJ2NvbmZlcmVuY2UnKSB7XG4gICAgICAgIGF3YWl0IHJlb3JkZXJTdHJlYW1zKHsgYWRkOiBmYWxzZSwgc2NyZWVuQ2hhbmdlZDogdHJ1ZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgYXdhaXQgcHJlcG9wdWxhdGVVc2VyTWVkaWEoeyBuYW1lOiBob3N0TGFiZWwsIHBhcmFtZXRlcnMgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCByZW9yZGVyU3RyZWFtcyh7IHBhcmFtZXRlcnMgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHJlUG9ydCh7IHBhcmFtZXRlcnMgfSk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHNjcmVlbiBzaGFyZSBlbmRcbiAgICBsb2NhbFN0cmVhbVNjcmVlbi5nZXRWaWRlb1RyYWNrcygpWzBdLm9uZW5kZWQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBTdXBwb3J0cyBib3RoIG1hbnVhbCBhbmQgYXV0b21hdGljIHNjcmVlbiBzaGFyZSBlbmRcbiAgICAgIGF3YWl0IGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuKHsgcGFyYW1ldGVycyB9KTtcbiAgICAgIGF3YWl0IHN0b3BTaGFyZVNjcmVlbih7IHBhcmFtZXRlcnMgfSk7XG4gICAgfTtcblxuICAgIC8vIElmIHVzZXIgcmVxdWVzdGVkIHRvIHNoYXJlIHNjcmVlbiwgdXBkYXRlIHRoZSBzY3JlZW5BY3Rpb24gc3RhdGVcbiAgICBpZiAoc2NyZWVuQWN0aW9uID09IHRydWUpIHtcbiAgICAgIHNjcmVlbkFjdGlvbiA9IGZhbHNlO1xuICAgIH1cbiAgICB1cGRhdGVTY3JlZW5BY3Rpb24oc2NyZWVuQWN0aW9uKTtcblxuICAgIC8vIFVwZGF0ZSB0aGUgdHJhbnNwb3J0IGNyZWF0ZWQgc3RhdGVcbiAgICB0cmFuc3BvcnRDcmVhdGVkU2NyZWVuID0gdHJ1ZTtcbiAgICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkU2NyZWVuKHRyYW5zcG9ydENyZWF0ZWRTY3JlZW4pO1xuICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWQodHJhbnNwb3J0Q3JlYXRlZCk7XG5cbiAgICAvLyBIYW5kbGUgc2NyZWVuIGFubm90YXRpb24gbW9kYWxcbiAgICB0cnkge1xuICAgICAgaWYgKGFubm90YXRlU2NyZWVuU3RyZWFtKSB7XG4gICAgICAgIGFubm90YXRlU2NyZWVuU3RyZWFtID0gZmFsc2U7XG4gICAgICAgIHVwZGF0ZUlzU2NyZWVuYm9hcmRNb2RhbFZpc2libGUodHJ1ZSk7XG4gICAgICAgIGF3YWl0IHNsZWVwKHsgbXM6IDUwMCB9KTtcbiAgICAgICAgdXBkYXRlSXNTY3JlZW5ib2FyZE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vY29uc29sZS5sb2coJ0Vycm9yIGhhbmRsaW5nIHNjcmVlbiBhbm5vdGF0aW9uOicsIGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==