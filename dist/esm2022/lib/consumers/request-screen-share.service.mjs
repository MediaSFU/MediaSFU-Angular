import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Requests to start screen sharing.
 *
 * This method initiates a screen sharing request and handles the response
 * from the server to determine if screen sharing is allowed. It also configures
 * the target resolution for the screen share based on the user's input and
 * parameters.
 *
 * @param {RequestScreenShareOptions} options - The options for requesting screen share.
 * @param {Object} options.parameters - The parameters for the screen share request.
 * @param {Socket} options.parameters.socket - The socket instance to communicate with the server.
 * @param {Function} [options.parameters.showAlert] - Optional function to show alerts to the user.
 * @param {boolean} options.parameters.localUIMode - Indicates if the user is in local UI mode.
 * @param {string} [options.parameters.targetResolution] - The target resolution for screen sharing.
 * @param {string} [options.parameters.targetResolutionHost] - The target resolution for the host screen.
 * @param {Function} options.parameters.startShareScreen - Function to start screen sharing.
 *
 * @returns {Promise<void>} A promise that resolves when the screen share request is processed.
 *
 * @throws {Error} Throws an error if there is an issue during the screen share request process.
 *
 * @example
 * ```typescript
 * await requestScreenShare({
 *   parameters: {
 *     socket: mySocket,
 *     localUIMode: false,
 *     targetResolution: 'fhd',
 *     startShareScreen: myStartShareScreenFunction,
 *     showAlert: myShowAlertFunction,
 *   },
 * });
 * ```
 */
export class RequestScreenShare {
    /**
     * Requests to start screen sharing.
     *
     * @param {RequestScreenShareOptions} options - The options for requesting screen share.
     * @param {Object} options.parameters - The parameters for the screen share request.
     * @param {Socket} options.parameters.socket - The socket instance to communicate with the server.
     * @param {Function} [options.parameters.showAlert] - Optional function to show alerts to the user.
     * @param {boolean} options.parameters.localUIMode - Indicates if the user is in local UI mode.
     * @param {string} [options.parameters.targetResolution] - The target resolution for screen sharing.
     * @param {string} [options.parameters.targetResolutionHost] - The target resolution for the host screen.
     * @param {Function} options.parameters.startShareScreen - Function to start screen sharing.
     *
     * @returns {Promise<void>} A promise that resolves when the screen share request is processed.
     *
     * @throws {Error} Throws an error if there is an issue during the screen share request process.
     */
    requestScreenShare = async ({ parameters }) => {
        try {
            // Destructure parameters
            const { showAlert, localUIMode, startShareScreen, socket, targetResolution = 'hd', targetResolutionHost = 'hd', } = parameters;
            // Check if the user is in local UI mode
            if (localUIMode === true) {
                await startShareScreen({ parameters });
                return;
            }
            let targetWidth = 1280;
            let targetHeight = 720;
            if (targetResolution == 'qhd' || targetResolutionHost == 'qhd') {
                targetWidth = 2560;
                targetHeight = 1440;
            }
            else if (targetResolution == 'fhd' || targetResolutionHost == 'fhd') {
                targetWidth = 1920;
                targetHeight = 1080;
            }
            socket.emit('requestScreenShare', async ({ allowScreenShare }) => {
                if (!allowScreenShare) {
                    // Send an alert to the user
                    showAlert?.({
                        message: 'You are not allowed to share screen',
                        type: 'danger',
                        duration: 3000,
                    });
                }
                else {
                    await startShareScreen({ parameters: { ...parameters, targetWidth, targetHeight } });
                }
            });
        }
        catch (error) {
            // Handle errors during the process of requesting screen share
            console.error('Error during requesting screen share: ', error);
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RequestScreenShare, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RequestScreenShare, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RequestScreenShare, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1zY3JlZW4tc2hhcmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvcmVxdWVzdC1zY3JlZW4tc2hhcmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXdCM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQU1ILE1BQU0sT0FBTyxrQkFBa0I7SUFDN0I7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsa0JBQWtCLEdBQUcsS0FBSyxFQUFFLEVBQUUsVUFBVSxFQUE2QixFQUFpQixFQUFFO1FBQ3RGLElBQUksQ0FBQztZQUNILHlCQUF5QjtZQUN6QixNQUFNLEVBQ0osU0FBUyxFQUNULFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsTUFBTSxFQUNOLGdCQUFnQixHQUFHLElBQUksRUFDdkIsb0JBQW9CLEdBQUcsSUFBSSxHQUM1QixHQUFHLFVBQVUsQ0FBQztZQUVmLHdDQUF3QztZQUN4QyxJQUFJLFdBQVcsS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDekIsTUFBTSxnQkFBZ0IsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZDLE9BQU87WUFDVCxDQUFDO1lBRUQsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksWUFBWSxHQUFHLEdBQUcsQ0FBQztZQUV2QixJQUFJLGdCQUFnQixJQUFJLEtBQUssSUFBSSxvQkFBb0IsSUFBSSxLQUFLLEVBQUUsQ0FBQztnQkFDL0QsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDbkIsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN0QixDQUFDO2lCQUFNLElBQUksZ0JBQWdCLElBQUksS0FBSyxJQUFJLG9CQUFvQixJQUFJLEtBQUssRUFBRSxDQUFDO2dCQUN0RSxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUNULG9CQUFvQixFQUNwQixLQUFLLEVBQUUsRUFBRSxnQkFBZ0IsRUFBaUMsRUFBRSxFQUFFO2dCQUM1RCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDdEIsNEJBQTRCO29CQUM1QixTQUFTLEVBQUUsQ0FBQzt3QkFDVixPQUFPLEVBQUUscUNBQXFDO3dCQUM5QyxJQUFJLEVBQUUsUUFBUTt3QkFDZCxRQUFRLEVBQUUsSUFBSTtxQkFDZixDQUFDLENBQUM7Z0JBQ0wsQ0FBQztxQkFBTSxDQUFDO29CQUNOLE1BQU0sZ0JBQWdCLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUN2RixDQUFDO1lBQ0gsQ0FBQyxDQUNGLENBQUM7UUFDSixDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLDhEQUE4RDtZQUM5RCxPQUFPLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pFLENBQUM7SUFDSCxDQUFDLENBQUM7dUdBakVTLGtCQUFrQjsyR0FBbEIsa0JBQWtCLGNBRmpCLE1BQU07OzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IFNob3dBbGVydCwgU3RhcnRTaGFyZVNjcmVlblR5cGUsIFN0YXJ0U2hhcmVTY3JlZW5QYXJhbWV0ZXJzIH0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0U2NyZWVuU2hhcmVQYXJhbWV0ZXJzIGV4dGVuZHMgU3RhcnRTaGFyZVNjcmVlblBhcmFtZXRlcnMge1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICBsb2NhbFVJTW9kZTogYm9vbGVhbjtcbiAgdGFyZ2V0UmVzb2x1dGlvbj86IHN0cmluZztcbiAgdGFyZ2V0UmVzb2x1dGlvbkhvc3Q/OiBzdHJpbmc7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIHN0YXJ0U2hhcmVTY3JlZW46IFN0YXJ0U2hhcmVTY3JlZW5UeXBlO1xuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBSZXF1ZXN0U2NyZWVuU2hhcmVQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdFNjcmVlblNoYXJlT3B0aW9ucyB7XG4gIHBhcmFtZXRlcnM6IFJlcXVlc3RTY3JlZW5TaGFyZVBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFJlcXVlc3RTY3JlZW5TaGFyZVR5cGUgPSAob3B0aW9uczogUmVxdWVzdFNjcmVlblNoYXJlT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBSZXF1ZXN0cyB0byBzdGFydCBzY3JlZW4gc2hhcmluZy5cbiAqXG4gKiBUaGlzIG1ldGhvZCBpbml0aWF0ZXMgYSBzY3JlZW4gc2hhcmluZyByZXF1ZXN0IGFuZCBoYW5kbGVzIHRoZSByZXNwb25zZVxuICogZnJvbSB0aGUgc2VydmVyIHRvIGRldGVybWluZSBpZiBzY3JlZW4gc2hhcmluZyBpcyBhbGxvd2VkLiBJdCBhbHNvIGNvbmZpZ3VyZXNcbiAqIHRoZSB0YXJnZXQgcmVzb2x1dGlvbiBmb3IgdGhlIHNjcmVlbiBzaGFyZSBiYXNlZCBvbiB0aGUgdXNlcidzIGlucHV0IGFuZFxuICogcGFyYW1ldGVycy5cbiAqXG4gKiBAcGFyYW0ge1JlcXVlc3RTY3JlZW5TaGFyZU9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgcmVxdWVzdGluZyBzY3JlZW4gc2hhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHRoZSBzY3JlZW4gc2hhcmUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7U29ja2V0fSBvcHRpb25zLnBhcmFtZXRlcnMuc29ja2V0IC0gVGhlIHNvY2tldCBpbnN0YW5jZSB0byBjb21tdW5pY2F0ZSB3aXRoIHRoZSBzZXJ2ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5wYXJhbWV0ZXJzLnNob3dBbGVydF0gLSBPcHRpb25hbCBmdW5jdGlvbiB0byBzaG93IGFsZXJ0cyB0byB0aGUgdXNlci5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2FsVUlNb2RlIC0gSW5kaWNhdGVzIGlmIHRoZSB1c2VyIGlzIGluIGxvY2FsIFVJIG1vZGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucGFyYW1ldGVycy50YXJnZXRSZXNvbHV0aW9uXSAtIFRoZSB0YXJnZXQgcmVzb2x1dGlvbiBmb3Igc2NyZWVuIHNoYXJpbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucGFyYW1ldGVycy50YXJnZXRSZXNvbHV0aW9uSG9zdF0gLSBUaGUgdGFyZ2V0IHJlc29sdXRpb24gZm9yIHRoZSBob3N0IHNjcmVlbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5zdGFydFNoYXJlU2NyZWVuIC0gRnVuY3Rpb24gdG8gc3RhcnQgc2NyZWVuIHNoYXJpbmcuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNjcmVlbiBzaGFyZSByZXF1ZXN0IGlzIHByb2Nlc3NlZC5cbiAqXG4gKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZXJlIGlzIGFuIGlzc3VlIGR1cmluZyB0aGUgc2NyZWVuIHNoYXJlIHJlcXVlc3QgcHJvY2Vzcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogYXdhaXQgcmVxdWVzdFNjcmVlblNoYXJlKHtcbiAqICAgcGFyYW1ldGVyczoge1xuICogICAgIHNvY2tldDogbXlTb2NrZXQsXG4gKiAgICAgbG9jYWxVSU1vZGU6IGZhbHNlLFxuICogICAgIHRhcmdldFJlc29sdXRpb246ICdmaGQnLFxuICogICAgIHN0YXJ0U2hhcmVTY3JlZW46IG15U3RhcnRTaGFyZVNjcmVlbkZ1bmN0aW9uLFxuICogICAgIHNob3dBbGVydDogbXlTaG93QWxlcnRGdW5jdGlvbixcbiAqICAgfSxcbiAqIH0pO1xuICogYGBgXG4gKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUmVxdWVzdFNjcmVlblNoYXJlIHtcbiAgLyoqXG4gICAqIFJlcXVlc3RzIHRvIHN0YXJ0IHNjcmVlbiBzaGFyaW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlcXVlc3RTY3JlZW5TaGFyZU9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgcmVxdWVzdGluZyBzY3JlZW4gc2hhcmUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3IgdGhlIHNjcmVlbiBzaGFyZSByZXF1ZXN0LlxuICAgKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgdG8gY29tbXVuaWNhdGUgd2l0aCB0aGUgc2VydmVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5wYXJhbWV0ZXJzLnNob3dBbGVydF0gLSBPcHRpb25hbCBmdW5jdGlvbiB0byBzaG93IGFsZXJ0cyB0byB0aGUgdXNlci5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMubG9jYWxVSU1vZGUgLSBJbmRpY2F0ZXMgaWYgdGhlIHVzZXIgaXMgaW4gbG9jYWwgVUkgbW9kZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnBhcmFtZXRlcnMudGFyZ2V0UmVzb2x1dGlvbl0gLSBUaGUgdGFyZ2V0IHJlc29sdXRpb24gZm9yIHNjcmVlbiBzaGFyaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucGFyYW1ldGVycy50YXJnZXRSZXNvbHV0aW9uSG9zdF0gLSBUaGUgdGFyZ2V0IHJlc29sdXRpb24gZm9yIHRoZSBob3N0IHNjcmVlbi5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnN0YXJ0U2hhcmVTY3JlZW4gLSBGdW5jdGlvbiB0byBzdGFydCBzY3JlZW4gc2hhcmluZy5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNjcmVlbiBzaGFyZSByZXF1ZXN0IGlzIHByb2Nlc3NlZC5cbiAgICpcbiAgICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGVyZSBpcyBhbiBpc3N1ZSBkdXJpbmcgdGhlIHNjcmVlbiBzaGFyZSByZXF1ZXN0IHByb2Nlc3MuXG4gICAqL1xuICByZXF1ZXN0U2NyZWVuU2hhcmUgPSBhc3luYyAoeyBwYXJhbWV0ZXJzIH06IFJlcXVlc3RTY3JlZW5TaGFyZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgLy8gRGVzdHJ1Y3R1cmUgcGFyYW1ldGVyc1xuICAgICAgY29uc3Qge1xuICAgICAgICBzaG93QWxlcnQsXG4gICAgICAgIGxvY2FsVUlNb2RlLFxuICAgICAgICBzdGFydFNoYXJlU2NyZWVuLFxuICAgICAgICBzb2NrZXQsXG4gICAgICAgIHRhcmdldFJlc29sdXRpb24gPSAnaGQnLFxuICAgICAgICB0YXJnZXRSZXNvbHV0aW9uSG9zdCA9ICdoZCcsXG4gICAgICB9ID0gcGFyYW1ldGVycztcblxuICAgICAgLy8gQ2hlY2sgaWYgdGhlIHVzZXIgaXMgaW4gbG9jYWwgVUkgbW9kZVxuICAgICAgaWYgKGxvY2FsVUlNb2RlID09PSB0cnVlKSB7XG4gICAgICAgIGF3YWl0IHN0YXJ0U2hhcmVTY3JlZW4oeyBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCB0YXJnZXRXaWR0aCA9IDEyODA7XG4gICAgICBsZXQgdGFyZ2V0SGVpZ2h0ID0gNzIwO1xuXG4gICAgICBpZiAodGFyZ2V0UmVzb2x1dGlvbiA9PSAncWhkJyB8fCB0YXJnZXRSZXNvbHV0aW9uSG9zdCA9PSAncWhkJykge1xuICAgICAgICB0YXJnZXRXaWR0aCA9IDI1NjA7XG4gICAgICAgIHRhcmdldEhlaWdodCA9IDE0NDA7XG4gICAgICB9IGVsc2UgaWYgKHRhcmdldFJlc29sdXRpb24gPT0gJ2ZoZCcgfHwgdGFyZ2V0UmVzb2x1dGlvbkhvc3QgPT0gJ2ZoZCcpIHtcbiAgICAgICAgdGFyZ2V0V2lkdGggPSAxOTIwO1xuICAgICAgICB0YXJnZXRIZWlnaHQgPSAxMDgwO1xuICAgICAgfVxuXG4gICAgICBzb2NrZXQuZW1pdChcbiAgICAgICAgJ3JlcXVlc3RTY3JlZW5TaGFyZScsXG4gICAgICAgIGFzeW5jICh7IGFsbG93U2NyZWVuU2hhcmUgfTogeyBhbGxvd1NjcmVlblNoYXJlOiBib29sZWFuIH0pID0+IHtcbiAgICAgICAgICBpZiAoIWFsbG93U2NyZWVuU2hhcmUpIHtcbiAgICAgICAgICAgIC8vIFNlbmQgYW4gYWxlcnQgdG8gdGhlIHVzZXJcbiAgICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ1lvdSBhcmUgbm90IGFsbG93ZWQgdG8gc2hhcmUgc2NyZWVuJyxcbiAgICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IHN0YXJ0U2hhcmVTY3JlZW4oeyBwYXJhbWV0ZXJzOiB7IC4uLnBhcmFtZXRlcnMsIHRhcmdldFdpZHRoLCB0YXJnZXRIZWlnaHQgfSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBIYW5kbGUgZXJyb3JzIGR1cmluZyB0aGUgcHJvY2VzcyBvZiByZXF1ZXN0aW5nIHNjcmVlbiBzaGFyZVxuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZHVyaW5nIHJlcXVlc3Rpbmcgc2NyZWVuIHNoYXJlOiAnLCBlcnJvcik7XG4gICAgfVxuICB9O1xufVxuIl19