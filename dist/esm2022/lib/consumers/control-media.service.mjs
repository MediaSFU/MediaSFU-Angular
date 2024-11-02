import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Controls the media of a participant in a media session if certain conditions are met.
 *
 * @param {ControlMediaOptions} options - The options for controlling media.
 * @param {string} options.participantId - The ID of the participant to control.
 * @param {string} options.participantName - The name of the participant to control.
 * @param {'audio' | 'video' | 'screenshare' | 'all'} options.type - The type of media to control.
 * @param {Socket} options.socket - The socket instance for communication.
 * @param {CoHostResponsibility[]} options.coHostResponsibility - List of co-host responsibilities.
 * @param {Participant[]} options.participants - List of participants in the session.
 * @param {string} options.member - The current member attempting to control media.
 * @param {string} options.islevel - The level of the current member.
 * @param {Function} [options.showAlert] - Optional function to show alerts.
 * @param {string} options.coHost - The co-host information.
 * @param {string} options.roomName - The name of the room.
 *
 * @returns {Promise<void>} A promise that resolves when the media control operation is complete.
 *
 * @throws Will log an error message if the operation fails.
 *
 * @example
 * ```typescript
 * const options = {
 *   participantId: '12345',
 *   participantName: 'John Doe',
 *   type: 'audio',
 *   socket: socketInstance,
 *   coHostResponsibility: [{ name: 'media', value: true }],
 *   participants: participantList,
 *   member: 'currentMember',
 *   islevel: '2',
 *   showAlert: showAlertFunction,
 *   coHost: 'coHostName',
 *   roomName: 'Room A',
 * };
 *
 * controlMediaService.controlMedia(options)
 *   .then(() => {
 *     console.log('Media control action completed');
 *   })
 *   .catch((error) => {
 *     console.error('Error controlling media:', error);
 *   });
 * ```
 */
export class ControlMedia {
    /**
     * Controls the media of a participant in a media session if certain conditions are met.
     *
     * @param {Object} options - The options for controlling media.
     * @param {string} options.participantId - The ID of the participant to control.
     * @param {string} options.participantName - The name of the participant to control.
     * @param {string} options.type - The type of media to control.
     * @param {Socket} options.socket - The socket instance for communication.
     * @param {Array} options.coHostResponsibility - List of co-host responsibilities.
     * @param {Array} options.participants - List of participants in the session.
     * @param {string} options.member - The current member attempting to control media.
     * @param {string} options.islevel - The level of the current member.
     * @param {Function} [options.showAlert] - Optional function to show alerts.
     * @param {string} options.coHost - The co-host information.
     * @param {string} options.roomName - The name of the room.
     *
     * @returns {Promise<void>} A promise that resolves when the media control operation is complete.
     */
    async controlMedia({ participantId, participantName, type, socket, coHostResponsibility, participants, member, islevel, showAlert, coHost, roomName, }) {
        try {
            // Destructure parameters
            let mediaValue = false;
            try {
                mediaValue =
                    coHostResponsibility.find((item) => item.name === 'media')?.value ?? false;
            }
            catch {
                /* handle error */
            }
            let participant = participants.find((obj) => obj.name === participantName);
            if (islevel === '2' || (coHost === member && mediaValue === true)) {
                // Check if the participant is not muted and is not a host
                if (participant &&
                    ((!participant.muted && participant.islevel !== '2' && type == 'audio') ||
                        (participant.islevel !== '2' && type == 'video' && participant['videoOn']))) {
                    // Emit controlMedia event to the server
                    socket.emit('controlMedia', { participantId, participantName, type, roomName });
                }
            }
            else {
                // Display an alert if the participant is not allowed to mute other participants
                if (showAlert) {
                    showAlert({
                        message: 'You are not allowed to control media for other participants.',
                        type: 'danger',
                        duration: 3000,
                    });
                }
            }
        }
        catch (error) {
            console.log('controlMedia error', error);
            // throw error;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ControlMedia, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ControlMedia, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ControlMedia, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1tZWRpYS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9jb250cm9sLW1lZGlhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFxQnpDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRDRztBQU1MLE1BQU0sT0FBTyxZQUFZO0lBQ3ZCOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUVILEtBQUssQ0FBQyxZQUFZLENBQUMsRUFDakIsYUFBYSxFQUNiLGVBQWUsRUFDZixJQUFJLEVBQ0osTUFBTSxFQUNOLG9CQUFvQixFQUNwQixZQUFZLEVBQ1osTUFBTSxFQUNOLE9BQU8sRUFDUCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFFBQVEsR0FDWTtRQUNwQixJQUFJLENBQUM7WUFDSCx5QkFBeUI7WUFDekIsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBRXZCLElBQUksQ0FBQztnQkFDSCxVQUFVO29CQUNSLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsRUFBRSxLQUFLLElBQUksS0FBSyxDQUFDO1lBQ3BGLENBQUM7WUFBQyxNQUFNLENBQUM7Z0JBQ1Asa0JBQWtCO1lBQ3BCLENBQUM7WUFFRCxJQUFJLFdBQVcsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLGVBQWUsQ0FBQyxDQUFDO1lBRWhGLElBQUksT0FBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLElBQUksVUFBVSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ2xFLDBEQUEwRDtnQkFDMUQsSUFDRSxXQUFXO29CQUNYLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxHQUFHLElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQzt3QkFDckUsQ0FBQyxXQUFXLENBQUMsT0FBTyxLQUFLLEdBQUcsSUFBSSxJQUFJLElBQUksT0FBTyxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQzdFLENBQUM7b0JBQ0Qsd0NBQXdDO29CQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ2xGLENBQUM7WUFDSCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sZ0ZBQWdGO2dCQUNoRixJQUFJLFNBQVMsRUFBRSxDQUFDO29CQUNkLFNBQVMsQ0FBQzt3QkFDUixPQUFPLEVBQUUsOERBQThEO3dCQUN2RSxJQUFJLEVBQUUsUUFBUTt3QkFDZCxRQUFRLEVBQUUsSUFBSTtxQkFDZixDQUFDLENBQUM7Z0JBQ0wsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDekMsZUFBZTtRQUNqQixDQUFDO0lBQ0gsQ0FBQzt1R0F0RVUsWUFBWTsyR0FBWixZQUFZLGNBRlgsTUFBTTs7MkZBRVAsWUFBWTtrQkFIeEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHsgQ29Ib3N0UmVzcG9uc2liaWxpdHksIFBhcnRpY2lwYW50LCBTaG93QWxlcnQgfSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbnRyb2xNZWRpYU9wdGlvbnMge1xuICBwYXJ0aWNpcGFudElkOiBzdHJpbmc7XG4gIHBhcnRpY2lwYW50TmFtZTogc3RyaW5nO1xuICB0eXBlOiAnYXVkaW8nIHwgJ3ZpZGVvJyB8ICdzY3JlZW5zaGFyZScgfCAnYWxsJztcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiBDb0hvc3RSZXNwb25zaWJpbGl0eVtdO1xuICBwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W107XG4gIG1lbWJlcjogc3RyaW5nO1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgY29Ib3N0OiBzdHJpbmc7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG59XG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBDb250cm9sTWVkaWFUeXBlID0gKG9wdGlvbnM6IENvbnRyb2xNZWRpYU9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIENvbnRyb2xzIHRoZSBtZWRpYSBvZiBhIHBhcnRpY2lwYW50IGluIGEgbWVkaWEgc2Vzc2lvbiBpZiBjZXJ0YWluIGNvbmRpdGlvbnMgYXJlIG1ldC5cbiAgICpcbiAgICogQHBhcmFtIHtDb250cm9sTWVkaWFPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNvbnRyb2xsaW5nIG1lZGlhLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJ0aWNpcGFudElkIC0gVGhlIElEIG9mIHRoZSBwYXJ0aWNpcGFudCB0byBjb250cm9sLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJ0aWNpcGFudE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGFydGljaXBhbnQgdG8gY29udHJvbC5cbiAgICogQHBhcmFtIHsnYXVkaW8nIHwgJ3ZpZGVvJyB8ICdzY3JlZW5zaGFyZScgfCAnYWxsJ30gb3B0aW9ucy50eXBlIC0gVGhlIHR5cGUgb2YgbWVkaWEgdG8gY29udHJvbC5cbiAgICogQHBhcmFtIHtTb2NrZXR9IG9wdGlvbnMuc29ja2V0IC0gVGhlIHNvY2tldCBpbnN0YW5jZSBmb3IgY29tbXVuaWNhdGlvbi5cbiAgICogQHBhcmFtIHtDb0hvc3RSZXNwb25zaWJpbGl0eVtdfSBvcHRpb25zLmNvSG9zdFJlc3BvbnNpYmlsaXR5IC0gTGlzdCBvZiBjby1ob3N0IHJlc3BvbnNpYmlsaXRpZXMuXG4gICAqIEBwYXJhbSB7UGFydGljaXBhbnRbXX0gb3B0aW9ucy5wYXJ0aWNpcGFudHMgLSBMaXN0IG9mIHBhcnRpY2lwYW50cyBpbiB0aGUgc2Vzc2lvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubWVtYmVyIC0gVGhlIGN1cnJlbnQgbWVtYmVyIGF0dGVtcHRpbmcgdG8gY29udHJvbCBtZWRpYS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaXNsZXZlbCAtIFRoZSBsZXZlbCBvZiB0aGUgY3VycmVudCBtZW1iZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnNob3dBbGVydF0gLSBPcHRpb25hbCBmdW5jdGlvbiB0byBzaG93IGFsZXJ0cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuY29Ib3N0IC0gVGhlIGNvLWhvc3QgaW5mb3JtYXRpb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJvb21OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHJvb20uXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBtZWRpYSBjb250cm9sIG9wZXJhdGlvbiBpcyBjb21wbGV0ZS5cbiAgICpcbiAgICogQHRocm93cyBXaWxsIGxvZyBhbiBlcnJvciBtZXNzYWdlIGlmIHRoZSBvcGVyYXRpb24gZmFpbHMuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogY29uc3Qgb3B0aW9ucyA9IHtcbiAgICogICBwYXJ0aWNpcGFudElkOiAnMTIzNDUnLFxuICAgKiAgIHBhcnRpY2lwYW50TmFtZTogJ0pvaG4gRG9lJyxcbiAgICogICB0eXBlOiAnYXVkaW8nLFxuICAgKiAgIHNvY2tldDogc29ja2V0SW5zdGFuY2UsXG4gICAqICAgY29Ib3N0UmVzcG9uc2liaWxpdHk6IFt7IG5hbWU6ICdtZWRpYScsIHZhbHVlOiB0cnVlIH1dLFxuICAgKiAgIHBhcnRpY2lwYW50czogcGFydGljaXBhbnRMaXN0LFxuICAgKiAgIG1lbWJlcjogJ2N1cnJlbnRNZW1iZXInLFxuICAgKiAgIGlzbGV2ZWw6ICcyJyxcbiAgICogICBzaG93QWxlcnQ6IHNob3dBbGVydEZ1bmN0aW9uLFxuICAgKiAgIGNvSG9zdDogJ2NvSG9zdE5hbWUnLFxuICAgKiAgIHJvb21OYW1lOiAnUm9vbSBBJyxcbiAgICogfTtcbiAgICpcbiAgICogY29udHJvbE1lZGlhU2VydmljZS5jb250cm9sTWVkaWEob3B0aW9ucylcbiAgICogICAudGhlbigoKSA9PiB7XG4gICAqICAgICBjb25zb2xlLmxvZygnTWVkaWEgY29udHJvbCBhY3Rpb24gY29tcGxldGVkJyk7XG4gICAqICAgfSlcbiAgICogICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAqICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjb250cm9sbGluZyBtZWRpYTonLCBlcnJvcik7XG4gICAqICAgfSk7XG4gICAqIGBgYFxuICAgKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ29udHJvbE1lZGlhIHtcbiAgLyoqXG4gICAqIENvbnRyb2xzIHRoZSBtZWRpYSBvZiBhIHBhcnRpY2lwYW50IGluIGEgbWVkaWEgc2Vzc2lvbiBpZiBjZXJ0YWluIGNvbmRpdGlvbnMgYXJlIG1ldC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY29udHJvbGxpbmcgbWVkaWEuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcnRpY2lwYW50SWQgLSBUaGUgSUQgb2YgdGhlIHBhcnRpY2lwYW50IHRvIGNvbnRyb2wuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcnRpY2lwYW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYXJ0aWNpcGFudCB0byBjb250cm9sLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy50eXBlIC0gVGhlIHR5cGUgb2YgbWVkaWEgdG8gY29udHJvbC5cbiAgICogQHBhcmFtIHtTb2NrZXR9IG9wdGlvbnMuc29ja2V0IC0gVGhlIHNvY2tldCBpbnN0YW5jZSBmb3IgY29tbXVuaWNhdGlvbi5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5jb0hvc3RSZXNwb25zaWJpbGl0eSAtIExpc3Qgb2YgY28taG9zdCByZXNwb25zaWJpbGl0aWVzLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnBhcnRpY2lwYW50cyAtIExpc3Qgb2YgcGFydGljaXBhbnRzIGluIHRoZSBzZXNzaW9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5tZW1iZXIgLSBUaGUgY3VycmVudCBtZW1iZXIgYXR0ZW1wdGluZyB0byBjb250cm9sIG1lZGlhLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5pc2xldmVsIC0gVGhlIGxldmVsIG9mIHRoZSBjdXJyZW50IG1lbWJlci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuc2hvd0FsZXJ0XSAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIHNob3cgYWxlcnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jb0hvc3QgLSBUaGUgY28taG9zdCBpbmZvcm1hdGlvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbS5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG1lZGlhIGNvbnRyb2wgb3BlcmF0aW9uIGlzIGNvbXBsZXRlLlxuICAgKi9cblxuICBhc3luYyBjb250cm9sTWVkaWEoe1xuICAgIHBhcnRpY2lwYW50SWQsXG4gICAgcGFydGljaXBhbnROYW1lLFxuICAgIHR5cGUsXG4gICAgc29ja2V0LFxuICAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICAgIHBhcnRpY2lwYW50cyxcbiAgICBtZW1iZXIsXG4gICAgaXNsZXZlbCxcbiAgICBzaG93QWxlcnQsXG4gICAgY29Ib3N0LFxuICAgIHJvb21OYW1lLFxuICB9OiBDb250cm9sTWVkaWFPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIERlc3RydWN0dXJlIHBhcmFtZXRlcnNcbiAgICAgIGxldCBtZWRpYVZhbHVlID0gZmFsc2U7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIG1lZGlhVmFsdWUgPVxuICAgICAgICAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5LmZpbmQoKGl0ZW06IGFueSkgPT4gaXRlbS5uYW1lID09PSAnbWVkaWEnKT8udmFsdWUgPz8gZmFsc2U7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICB9XG5cbiAgICAgIGxldCBwYXJ0aWNpcGFudCA9IHBhcnRpY2lwYW50cy5maW5kKChvYmo6IGFueSkgPT4gb2JqLm5hbWUgPT09IHBhcnRpY2lwYW50TmFtZSk7XG5cbiAgICAgIGlmIChpc2xldmVsID09PSAnMicgfHwgKGNvSG9zdCA9PT0gbWVtYmVyICYmIG1lZGlhVmFsdWUgPT09IHRydWUpKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBwYXJ0aWNpcGFudCBpcyBub3QgbXV0ZWQgYW5kIGlzIG5vdCBhIGhvc3RcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHBhcnRpY2lwYW50ICYmXG4gICAgICAgICAgKCghcGFydGljaXBhbnQubXV0ZWQgJiYgcGFydGljaXBhbnQuaXNsZXZlbCAhPT0gJzInICYmIHR5cGUgPT0gJ2F1ZGlvJykgfHxcbiAgICAgICAgICAgIChwYXJ0aWNpcGFudC5pc2xldmVsICE9PSAnMicgJiYgdHlwZSA9PSAndmlkZW8nICYmIHBhcnRpY2lwYW50Wyd2aWRlb09uJ10pKVxuICAgICAgICApIHtcbiAgICAgICAgICAvLyBFbWl0IGNvbnRyb2xNZWRpYSBldmVudCB0byB0aGUgc2VydmVyXG4gICAgICAgICAgc29ja2V0LmVtaXQoJ2NvbnRyb2xNZWRpYScsIHsgcGFydGljaXBhbnRJZCwgcGFydGljaXBhbnROYW1lLCB0eXBlLCByb29tTmFtZSB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRGlzcGxheSBhbiBhbGVydCBpZiB0aGUgcGFydGljaXBhbnQgaXMgbm90IGFsbG93ZWQgdG8gbXV0ZSBvdGhlciBwYXJ0aWNpcGFudHNcbiAgICAgICAgaWYgKHNob3dBbGVydCkge1xuICAgICAgICAgIHNob3dBbGVydCh7XG4gICAgICAgICAgICBtZXNzYWdlOiAnWW91IGFyZSBub3QgYWxsb3dlZCB0byBjb250cm9sIG1lZGlhIGZvciBvdGhlciBwYXJ0aWNpcGFudHMuJyxcbiAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coJ2NvbnRyb2xNZWRpYSBlcnJvcicsIGVycm9yKTtcbiAgICAgIC8vIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxufVxuIl19