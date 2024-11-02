import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service to initiate recording for a specified room.
 *
 * @class
 * @name StartRecords
 * @description Sends a request to the server to begin recording a room, using socket communication.
 *
 * @method
 * startRecords
 *
 * @param {StartRecordsOptions} options - Options required to start the recording:
 *   - `roomName` {string}: The name of the room to record.
 *   - `member` {string}: The identifier of the member initiating the recording.
 *   - `socket` {Socket}: The socket instance for server communication.
 *
 * @returns {Promise<void>} Resolves when the server confirms the recording start request.
 *
 * @example
 * const options = {
 *   roomName: 'Room101',
 *   member: 'user123',
 *   socket: io('http://localhost:3000')
 * };
 * startRecordsService.startRecords(options);
 */
export class StartRecords {
    /**
     * Starts recording the room.
     *
     * @param {Object} options - The options for starting the recording.
     * @param {string} options.roomName - The name of the room to start recording.
     * @param {string} options.member - The member starting the recording.
     * @param {Socket} options.socket - The socket instance for communication.
     *
     * @returns {Promise<void>} A promise that resolves when the recording is started.
     */
    startRecords = async ({ roomName, member, socket }) => {
        // Send the 'startRecording' event to the server with roomName and member information
        socket.emit('startRecordIng', { roomName, member }, ({ success }) => {
            // Handle the success or failure of starting recording (if needed)
            if (success) {
                console.log('Recording started successfully');
            }
            else {
                console.log('Recording failed to start');
            }
        });
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StartRecords, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StartRecords, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StartRecords, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQtcmVjb3Jkcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3N0YXJ0LXJlY29yZHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVkzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBS0gsTUFBTSxPQUFPLFlBQVk7SUFDdkI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxHQUFHLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUF1QixFQUFpQixFQUFFO1FBQ3hGLHFGQUFxRjtRQUNyRixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQXdCLEVBQUUsRUFBRTtZQUN4RixrRUFBa0U7WUFDbEUsSUFBSSxPQUFPLEVBQUUsQ0FBQztnQkFDWixPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7WUFDaEQsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUMzQyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7dUdBckJTLFlBQVk7MkdBQVosWUFBWSxjQUZYLE1BQU07OzJGQUVQLFlBQVk7a0JBSHhCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhcnRSZWNvcmRzT3B0aW9ucyB7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIG1lbWJlcjogc3RyaW5nO1xuICBzb2NrZXQ6IFNvY2tldDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgU3RhcnRSZWNvcmRzVHlwZSA9IChvcHRpb25zOiBTdGFydFJlY29yZHNPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIFNlcnZpY2UgdG8gaW5pdGlhdGUgcmVjb3JkaW5nIGZvciBhIHNwZWNpZmllZCByb29tLlxuICpcbiAqIEBjbGFzc1xuICogQG5hbWUgU3RhcnRSZWNvcmRzXG4gKiBAZGVzY3JpcHRpb24gU2VuZHMgYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdG8gYmVnaW4gcmVjb3JkaW5nIGEgcm9vbSwgdXNpbmcgc29ja2V0IGNvbW11bmljYXRpb24uXG4gKlxuICogQG1ldGhvZFxuICogc3RhcnRSZWNvcmRzXG4gKlxuICogQHBhcmFtIHtTdGFydFJlY29yZHNPcHRpb25zfSBvcHRpb25zIC0gT3B0aW9ucyByZXF1aXJlZCB0byBzdGFydCB0aGUgcmVjb3JkaW5nOlxuICogICAtIGByb29tTmFtZWAge3N0cmluZ306IFRoZSBuYW1lIG9mIHRoZSByb29tIHRvIHJlY29yZC5cbiAqICAgLSBgbWVtYmVyYCB7c3RyaW5nfTogVGhlIGlkZW50aWZpZXIgb2YgdGhlIG1lbWJlciBpbml0aWF0aW5nIHRoZSByZWNvcmRpbmcuXG4gKiAgIC0gYHNvY2tldGAge1NvY2tldH06IFRoZSBzb2NrZXQgaW5zdGFuY2UgZm9yIHNlcnZlciBjb21tdW5pY2F0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBSZXNvbHZlcyB3aGVuIHRoZSBzZXJ2ZXIgY29uZmlybXMgdGhlIHJlY29yZGluZyBzdGFydCByZXF1ZXN0LlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBvcHRpb25zID0ge1xuICogICByb29tTmFtZTogJ1Jvb20xMDEnLFxuICogICBtZW1iZXI6ICd1c2VyMTIzJyxcbiAqICAgc29ja2V0OiBpbygnaHR0cDovL2xvY2FsaG9zdDozMDAwJylcbiAqIH07XG4gKiBzdGFydFJlY29yZHNTZXJ2aWNlLnN0YXJ0UmVjb3JkcyhvcHRpb25zKTtcbiAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU3RhcnRSZWNvcmRzIHtcbiAgLyoqXG4gICAqIFN0YXJ0cyByZWNvcmRpbmcgdGhlIHJvb20uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHN0YXJ0aW5nIHRoZSByZWNvcmRpbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJvb21OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHJvb20gdG8gc3RhcnQgcmVjb3JkaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5tZW1iZXIgLSBUaGUgbWVtYmVyIHN0YXJ0aW5nIHRoZSByZWNvcmRpbmcuXG4gICAqIEBwYXJhbSB7U29ja2V0fSBvcHRpb25zLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgZm9yIGNvbW11bmljYXRpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSByZWNvcmRpbmcgaXMgc3RhcnRlZC5cbiAgICovXG4gIHN0YXJ0UmVjb3JkcyA9IGFzeW5jICh7IHJvb21OYW1lLCBtZW1iZXIsIHNvY2tldCB9OiBTdGFydFJlY29yZHNPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgLy8gU2VuZCB0aGUgJ3N0YXJ0UmVjb3JkaW5nJyBldmVudCB0byB0aGUgc2VydmVyIHdpdGggcm9vbU5hbWUgYW5kIG1lbWJlciBpbmZvcm1hdGlvblxuICAgIHNvY2tldC5lbWl0KCdzdGFydFJlY29yZEluZycsIHsgcm9vbU5hbWUsIG1lbWJlciB9LCAoeyBzdWNjZXNzIH06IHsgc3VjY2VzczogYm9vbGVhbiB9KSA9PiB7XG4gICAgICAvLyBIYW5kbGUgdGhlIHN1Y2Nlc3Mgb3IgZmFpbHVyZSBvZiBzdGFydGluZyByZWNvcmRpbmcgKGlmIG5lZWRlZClcbiAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWNvcmRpbmcgc3RhcnRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWNvcmRpbmcgZmFpbGVkIHRvIHN0YXJ0Jyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59XG4iXX0=