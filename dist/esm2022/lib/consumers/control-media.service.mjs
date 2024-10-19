import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1tZWRpYS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9jb250cm9sLW1lZGlhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUF3QjNDLE1BQU0sT0FBTyxZQUFZO0lBQ3ZCOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUVILEtBQUssQ0FBQyxZQUFZLENBQUMsRUFDakIsYUFBYSxFQUNiLGVBQWUsRUFDZixJQUFJLEVBQ0osTUFBTSxFQUNOLG9CQUFvQixFQUNwQixZQUFZLEVBQ1osTUFBTSxFQUNOLE9BQU8sRUFDUCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFFBQVEsR0FDWTtRQUNwQixJQUFJLENBQUM7WUFDSCx5QkFBeUI7WUFDekIsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBRXZCLElBQUksQ0FBQztnQkFDSCxVQUFVO29CQUNSLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsRUFBRSxLQUFLLElBQUksS0FBSyxDQUFDO1lBQ3BGLENBQUM7WUFBQyxNQUFNLENBQUM7Z0JBQ1Asa0JBQWtCO1lBQ3BCLENBQUM7WUFFRCxJQUFJLFdBQVcsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLGVBQWUsQ0FBQyxDQUFDO1lBRWhGLElBQUksT0FBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLElBQUksVUFBVSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ2xFLDBEQUEwRDtnQkFDMUQsSUFDRSxXQUFXO29CQUNYLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxHQUFHLElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQzt3QkFDckUsQ0FBQyxXQUFXLENBQUMsT0FBTyxLQUFLLEdBQUcsSUFBSSxJQUFJLElBQUksT0FBTyxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQzdFLENBQUM7b0JBQ0Qsd0NBQXdDO29CQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ2xGLENBQUM7WUFDSCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sZ0ZBQWdGO2dCQUNoRixJQUFJLFNBQVMsRUFBRSxDQUFDO29CQUNkLFNBQVMsQ0FBQzt3QkFDUixPQUFPLEVBQUUsOERBQThEO3dCQUN2RSxJQUFJLEVBQUUsUUFBUTt3QkFDZCxRQUFRLEVBQUUsSUFBSTtxQkFDZixDQUFDLENBQUM7Z0JBQ0wsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDekMsZUFBZTtRQUNqQixDQUFDO0lBQ0gsQ0FBQzt1R0F0RVUsWUFBWTsyR0FBWixZQUFZLGNBRlgsTUFBTTs7MkZBRVAsWUFBWTtrQkFIeEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHsgQ29Ib3N0UmVzcG9uc2liaWxpdHksIFBhcnRpY2lwYW50LCBTaG93QWxlcnQgfSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbnRyb2xNZWRpYU9wdGlvbnMge1xuICBwYXJ0aWNpcGFudElkOiBzdHJpbmc7XG4gIHBhcnRpY2lwYW50TmFtZTogc3RyaW5nO1xuICB0eXBlOiAnYXVkaW8nIHwgJ3ZpZGVvJyB8ICdzY3JlZW5zaGFyZScgfCAnYWxsJztcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiBDb0hvc3RSZXNwb25zaWJpbGl0eVtdO1xuICBwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W107XG4gIG1lbWJlcjogc3RyaW5nO1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgY29Ib3N0OiBzdHJpbmc7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG59XG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBDb250cm9sTWVkaWFUeXBlID0gKG9wdGlvbnM6IENvbnRyb2xNZWRpYU9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDb250cm9sTWVkaWEge1xuICAvKipcbiAgICogQ29udHJvbHMgdGhlIG1lZGlhIG9mIGEgcGFydGljaXBhbnQgaW4gYSBtZWRpYSBzZXNzaW9uIGlmIGNlcnRhaW4gY29uZGl0aW9ucyBhcmUgbWV0LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBjb250cm9sbGluZyBtZWRpYS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFydGljaXBhbnRJZCAtIFRoZSBJRCBvZiB0aGUgcGFydGljaXBhbnQgdG8gY29udHJvbC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFydGljaXBhbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhcnRpY2lwYW50IHRvIGNvbnRyb2wuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnR5cGUgLSBUaGUgdHlwZSBvZiBtZWRpYSB0byBjb250cm9sLlxuICAgKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIGZvciBjb21tdW5pY2F0aW9uLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLmNvSG9zdFJlc3BvbnNpYmlsaXR5IC0gTGlzdCBvZiBjby1ob3N0IHJlc3BvbnNpYmlsaXRpZXMuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMucGFydGljaXBhbnRzIC0gTGlzdCBvZiBwYXJ0aWNpcGFudHMgaW4gdGhlIHNlc3Npb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm1lbWJlciAtIFRoZSBjdXJyZW50IG1lbWJlciBhdHRlbXB0aW5nIHRvIGNvbnRyb2wgbWVkaWEuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmlzbGV2ZWwgLSBUaGUgbGV2ZWwgb2YgdGhlIGN1cnJlbnQgbWVtYmVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5zaG93QWxlcnRdIC0gT3B0aW9uYWwgZnVuY3Rpb24gdG8gc2hvdyBhbGVydHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNvSG9zdCAtIFRoZSBjby1ob3N0IGluZm9ybWF0aW9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbWVkaWEgY29udHJvbCBvcGVyYXRpb24gaXMgY29tcGxldGUuXG4gICAqL1xuXG4gIGFzeW5jIGNvbnRyb2xNZWRpYSh7XG4gICAgcGFydGljaXBhbnRJZCxcbiAgICBwYXJ0aWNpcGFudE5hbWUsXG4gICAgdHlwZSxcbiAgICBzb2NrZXQsXG4gICAgY29Ib3N0UmVzcG9uc2liaWxpdHksXG4gICAgcGFydGljaXBhbnRzLFxuICAgIG1lbWJlcixcbiAgICBpc2xldmVsLFxuICAgIHNob3dBbGVydCxcbiAgICBjb0hvc3QsXG4gICAgcm9vbU5hbWUsXG4gIH06IENvbnRyb2xNZWRpYU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgLy8gRGVzdHJ1Y3R1cmUgcGFyYW1ldGVyc1xuICAgICAgbGV0IG1lZGlhVmFsdWUgPSBmYWxzZTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgbWVkaWFWYWx1ZSA9XG4gICAgICAgICAgY29Ib3N0UmVzcG9uc2liaWxpdHkuZmluZCgoaXRlbTogYW55KSA9PiBpdGVtLm5hbWUgPT09ICdtZWRpYScpPy52YWx1ZSA/PyBmYWxzZTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgIH1cblxuICAgICAgbGV0IHBhcnRpY2lwYW50ID0gcGFydGljaXBhbnRzLmZpbmQoKG9iajogYW55KSA9PiBvYmoubmFtZSA9PT0gcGFydGljaXBhbnROYW1lKTtcblxuICAgICAgaWYgKGlzbGV2ZWwgPT09ICcyJyB8fCAoY29Ib3N0ID09PSBtZW1iZXIgJiYgbWVkaWFWYWx1ZSA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHBhcnRpY2lwYW50IGlzIG5vdCBtdXRlZCBhbmQgaXMgbm90IGEgaG9zdFxuICAgICAgICBpZiAoXG4gICAgICAgICAgcGFydGljaXBhbnQgJiZcbiAgICAgICAgICAoKCFwYXJ0aWNpcGFudC5tdXRlZCAmJiBwYXJ0aWNpcGFudC5pc2xldmVsICE9PSAnMicgJiYgdHlwZSA9PSAnYXVkaW8nKSB8fFxuICAgICAgICAgICAgKHBhcnRpY2lwYW50LmlzbGV2ZWwgIT09ICcyJyAmJiB0eXBlID09ICd2aWRlbycgJiYgcGFydGljaXBhbnRbJ3ZpZGVvT24nXSkpXG4gICAgICAgICkge1xuICAgICAgICAgIC8vIEVtaXQgY29udHJvbE1lZGlhIGV2ZW50IHRvIHRoZSBzZXJ2ZXJcbiAgICAgICAgICBzb2NrZXQuZW1pdCgnY29udHJvbE1lZGlhJywgeyBwYXJ0aWNpcGFudElkLCBwYXJ0aWNpcGFudE5hbWUsIHR5cGUsIHJvb21OYW1lIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBEaXNwbGF5IGFuIGFsZXJ0IGlmIHRoZSBwYXJ0aWNpcGFudCBpcyBub3QgYWxsb3dlZCB0byBtdXRlIG90aGVyIHBhcnRpY2lwYW50c1xuICAgICAgICBpZiAoc2hvd0FsZXJ0KSB7XG4gICAgICAgICAgc2hvd0FsZXJ0KHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdZb3UgYXJlIG5vdCBhbGxvd2VkIHRvIGNvbnRyb2wgbWVkaWEgZm9yIG90aGVyIHBhcnRpY2lwYW50cy4nLFxuICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnY29udHJvbE1lZGlhIGVycm9yJywgZXJyb3IpO1xuICAgICAgLy8gdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59XG4iXX0=