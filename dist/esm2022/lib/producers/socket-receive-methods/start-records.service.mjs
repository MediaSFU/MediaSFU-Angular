import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQtcmVjb3Jkcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3N0YXJ0LXJlY29yZHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWUzQyxNQUFNLE9BQU8sWUFBWTtJQUN2Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLEdBQUcsS0FBSyxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQXVCLEVBQWlCLEVBQUU7UUFDeEYscUZBQXFGO1FBQ3JGLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBd0IsRUFBRSxFQUFFO1lBQ3hGLGtFQUFrRTtZQUNsRSxJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztZQUNoRCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQzNDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQzt1R0FyQlMsWUFBWTsyR0FBWixZQUFZLGNBRlgsTUFBTTs7MkZBRVAsWUFBWTtrQkFIeEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBTdGFydFJlY29yZHNPcHRpb25zIHtcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgbWVtYmVyOiBzdHJpbmc7XG4gIHNvY2tldDogU29ja2V0O1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBTdGFydFJlY29yZHNUeXBlID0gKG9wdGlvbnM6IFN0YXJ0UmVjb3Jkc09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBTdGFydFJlY29yZHMge1xuICAvKipcbiAgICogU3RhcnRzIHJlY29yZGluZyB0aGUgcm9vbS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3Igc3RhcnRpbmcgdGhlIHJlY29yZGluZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbSB0byBzdGFydCByZWNvcmRpbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm1lbWJlciAtIFRoZSBtZW1iZXIgc3RhcnRpbmcgdGhlIHJlY29yZGluZy5cbiAgICogQHBhcmFtIHtTb2NrZXR9IG9wdGlvbnMuc29ja2V0IC0gVGhlIHNvY2tldCBpbnN0YW5jZSBmb3IgY29tbXVuaWNhdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHJlY29yZGluZyBpcyBzdGFydGVkLlxuICAgKi9cbiAgc3RhcnRSZWNvcmRzID0gYXN5bmMgKHsgcm9vbU5hbWUsIG1lbWJlciwgc29ja2V0IH06IFN0YXJ0UmVjb3Jkc09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAvLyBTZW5kIHRoZSAnc3RhcnRSZWNvcmRpbmcnIGV2ZW50IHRvIHRoZSBzZXJ2ZXIgd2l0aCByb29tTmFtZSBhbmQgbWVtYmVyIGluZm9ybWF0aW9uXG4gICAgc29ja2V0LmVtaXQoJ3N0YXJ0UmVjb3JkSW5nJywgeyByb29tTmFtZSwgbWVtYmVyIH0sICh7IHN1Y2Nlc3MgfTogeyBzdWNjZXNzOiBib29sZWFuIH0pID0+IHtcbiAgICAgIC8vIEhhbmRsZSB0aGUgc3VjY2VzcyBvciBmYWlsdXJlIG9mIHN0YXJ0aW5nIHJlY29yZGluZyAoaWYgbmVlZGVkKVxuICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1JlY29yZGluZyBzdGFydGVkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1JlY29yZGluZyBmYWlsZWQgdG8gc3RhcnQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn1cbiJdfQ==