import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1zY3JlZW4tc2hhcmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvcmVxdWVzdC1zY3JlZW4tc2hhcmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQTJCM0MsTUFBTSxPQUFPLGtCQUFrQjtJQUM3Qjs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxrQkFBa0IsR0FBRyxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQTZCLEVBQWlCLEVBQUU7UUFDdEYsSUFBSSxDQUFDO1lBQ0gseUJBQXlCO1lBQ3pCLE1BQU0sRUFDSixTQUFTLEVBQ1QsV0FBVyxFQUNYLGdCQUFnQixFQUNoQixNQUFNLEVBQ04sZ0JBQWdCLEdBQUcsSUFBSSxFQUN2QixvQkFBb0IsR0FBRyxJQUFJLEdBQzVCLEdBQUcsVUFBVSxDQUFDO1lBRWYsd0NBQXdDO1lBQ3hDLElBQUksV0FBVyxLQUFLLElBQUksRUFBRSxDQUFDO2dCQUN6QixNQUFNLGdCQUFnQixDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDdkMsT0FBTztZQUNULENBQUM7WUFFRCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDdkIsSUFBSSxZQUFZLEdBQUcsR0FBRyxDQUFDO1lBRXZCLElBQUksZ0JBQWdCLElBQUksS0FBSyxJQUFJLG9CQUFvQixJQUFJLEtBQUssRUFBRSxDQUFDO2dCQUMvRCxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLENBQUM7aUJBQU0sSUFBSSxnQkFBZ0IsSUFBSSxLQUFLLElBQUksb0JBQW9CLElBQUksS0FBSyxFQUFFLENBQUM7Z0JBQ3RFLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ25CLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDdEIsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQ1Qsb0JBQW9CLEVBQ3BCLEtBQUssRUFBRSxFQUFFLGdCQUFnQixFQUFpQyxFQUFFLEVBQUU7Z0JBQzVELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN0Qiw0QkFBNEI7b0JBQzVCLFNBQVMsRUFBRSxDQUFDO3dCQUNWLE9BQU8sRUFBRSxxQ0FBcUM7d0JBQzlDLElBQUksRUFBRSxRQUFRO3dCQUNkLFFBQVEsRUFBRSxJQUFJO3FCQUNmLENBQUMsQ0FBQztnQkFDTCxDQUFDO3FCQUFNLENBQUM7b0JBQ04sTUFBTSxnQkFBZ0IsQ0FBQyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUcsVUFBVSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZGLENBQUM7WUFDSCxDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsOERBQThEO1lBQzlELE9BQU8sQ0FBQyxLQUFLLENBQUMsd0NBQXdDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDakUsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0FqRVMsa0JBQWtCOzJHQUFsQixrQkFBa0IsY0FGakIsTUFBTTs7MkZBRVAsa0JBQWtCO2tCQUg5QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHsgU2hvd0FsZXJ0LCBTdGFydFNoYXJlU2NyZWVuVHlwZSwgU3RhcnRTaGFyZVNjcmVlblBhcmFtZXRlcnMgfSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RTY3JlZW5TaGFyZVBhcmFtZXRlcnMgZXh0ZW5kcyBTdGFydFNoYXJlU2NyZWVuUGFyYW1ldGVycyB7XG4gIHNvY2tldDogU29ja2V0O1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIGxvY2FsVUlNb2RlOiBib29sZWFuO1xuICB0YXJnZXRSZXNvbHV0aW9uPzogc3RyaW5nO1xuICB0YXJnZXRSZXNvbHV0aW9uSG9zdD86IHN0cmluZztcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgc3RhcnRTaGFyZVNjcmVlbjogU3RhcnRTaGFyZVNjcmVlblR5cGU7XG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFJlcXVlc3RTY3JlZW5TaGFyZVBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0U2NyZWVuU2hhcmVPcHRpb25zIHtcbiAgcGFyYW1ldGVyczogUmVxdWVzdFNjcmVlblNoYXJlUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgUmVxdWVzdFNjcmVlblNoYXJlVHlwZSA9IChvcHRpb25zOiBSZXF1ZXN0U2NyZWVuU2hhcmVPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUmVxdWVzdFNjcmVlblNoYXJlIHtcbiAgLyoqXG4gICAqIFJlcXVlc3RzIHRvIHN0YXJ0IHNjcmVlbiBzaGFyaW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlcXVlc3RTY3JlZW5TaGFyZU9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgcmVxdWVzdGluZyBzY3JlZW4gc2hhcmUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3IgdGhlIHNjcmVlbiBzaGFyZSByZXF1ZXN0LlxuICAgKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgdG8gY29tbXVuaWNhdGUgd2l0aCB0aGUgc2VydmVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5wYXJhbWV0ZXJzLnNob3dBbGVydF0gLSBPcHRpb25hbCBmdW5jdGlvbiB0byBzaG93IGFsZXJ0cyB0byB0aGUgdXNlci5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMubG9jYWxVSU1vZGUgLSBJbmRpY2F0ZXMgaWYgdGhlIHVzZXIgaXMgaW4gbG9jYWwgVUkgbW9kZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnBhcmFtZXRlcnMudGFyZ2V0UmVzb2x1dGlvbl0gLSBUaGUgdGFyZ2V0IHJlc29sdXRpb24gZm9yIHNjcmVlbiBzaGFyaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucGFyYW1ldGVycy50YXJnZXRSZXNvbHV0aW9uSG9zdF0gLSBUaGUgdGFyZ2V0IHJlc29sdXRpb24gZm9yIHRoZSBob3N0IHNjcmVlbi5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnN0YXJ0U2hhcmVTY3JlZW4gLSBGdW5jdGlvbiB0byBzdGFydCBzY3JlZW4gc2hhcmluZy5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNjcmVlbiBzaGFyZSByZXF1ZXN0IGlzIHByb2Nlc3NlZC5cbiAgICpcbiAgICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGVyZSBpcyBhbiBpc3N1ZSBkdXJpbmcgdGhlIHNjcmVlbiBzaGFyZSByZXF1ZXN0IHByb2Nlc3MuXG4gICAqL1xuICByZXF1ZXN0U2NyZWVuU2hhcmUgPSBhc3luYyAoeyBwYXJhbWV0ZXJzIH06IFJlcXVlc3RTY3JlZW5TaGFyZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgLy8gRGVzdHJ1Y3R1cmUgcGFyYW1ldGVyc1xuICAgICAgY29uc3Qge1xuICAgICAgICBzaG93QWxlcnQsXG4gICAgICAgIGxvY2FsVUlNb2RlLFxuICAgICAgICBzdGFydFNoYXJlU2NyZWVuLFxuICAgICAgICBzb2NrZXQsXG4gICAgICAgIHRhcmdldFJlc29sdXRpb24gPSAnaGQnLFxuICAgICAgICB0YXJnZXRSZXNvbHV0aW9uSG9zdCA9ICdoZCcsXG4gICAgICB9ID0gcGFyYW1ldGVycztcblxuICAgICAgLy8gQ2hlY2sgaWYgdGhlIHVzZXIgaXMgaW4gbG9jYWwgVUkgbW9kZVxuICAgICAgaWYgKGxvY2FsVUlNb2RlID09PSB0cnVlKSB7XG4gICAgICAgIGF3YWl0IHN0YXJ0U2hhcmVTY3JlZW4oeyBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCB0YXJnZXRXaWR0aCA9IDEyODA7XG4gICAgICBsZXQgdGFyZ2V0SGVpZ2h0ID0gNzIwO1xuXG4gICAgICBpZiAodGFyZ2V0UmVzb2x1dGlvbiA9PSAncWhkJyB8fCB0YXJnZXRSZXNvbHV0aW9uSG9zdCA9PSAncWhkJykge1xuICAgICAgICB0YXJnZXRXaWR0aCA9IDI1NjA7XG4gICAgICAgIHRhcmdldEhlaWdodCA9IDE0NDA7XG4gICAgICB9IGVsc2UgaWYgKHRhcmdldFJlc29sdXRpb24gPT0gJ2ZoZCcgfHwgdGFyZ2V0UmVzb2x1dGlvbkhvc3QgPT0gJ2ZoZCcpIHtcbiAgICAgICAgdGFyZ2V0V2lkdGggPSAxOTIwO1xuICAgICAgICB0YXJnZXRIZWlnaHQgPSAxMDgwO1xuICAgICAgfVxuXG4gICAgICBzb2NrZXQuZW1pdChcbiAgICAgICAgJ3JlcXVlc3RTY3JlZW5TaGFyZScsXG4gICAgICAgIGFzeW5jICh7IGFsbG93U2NyZWVuU2hhcmUgfTogeyBhbGxvd1NjcmVlblNoYXJlOiBib29sZWFuIH0pID0+IHtcbiAgICAgICAgICBpZiAoIWFsbG93U2NyZWVuU2hhcmUpIHtcbiAgICAgICAgICAgIC8vIFNlbmQgYW4gYWxlcnQgdG8gdGhlIHVzZXJcbiAgICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ1lvdSBhcmUgbm90IGFsbG93ZWQgdG8gc2hhcmUgc2NyZWVuJyxcbiAgICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IHN0YXJ0U2hhcmVTY3JlZW4oeyBwYXJhbWV0ZXJzOiB7IC4uLnBhcmFtZXRlcnMsIHRhcmdldFdpZHRoLCB0YXJnZXRIZWlnaHQgfSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBIYW5kbGUgZXJyb3JzIGR1cmluZyB0aGUgcHJvY2VzcyBvZiByZXF1ZXN0aW5nIHNjcmVlbiBzaGFyZVxuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZHVyaW5nIHJlcXVlc3Rpbmcgc2NyZWVuIHNoYXJlOiAnLCBlcnJvcik7XG4gICAgfVxuICB9O1xufVxuIl19