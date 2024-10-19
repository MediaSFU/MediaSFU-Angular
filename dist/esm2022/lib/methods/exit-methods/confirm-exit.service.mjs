// confirm-exit.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ConfirmExit {
    /**
     * Confirms the exit of a member from a room and optionally bans them.
     *
     * @param {Object} options - The options for confirming the exit.
     * @param {Socket} options.socket - The socket instance to emit the event.
     * @param {string} options.member - The member who is exiting.
     * @param {string} options.roomName - The name of the room the member is exiting from.
     * @param {boolean} [options.ban=false] - Whether to ban the member from the room.
     * @returns {Promise<void>} A promise that resolves when the exit is confirmed.
     */
    async confirmExit({ socket, member, roomName, ban = false }) {
        // Emit a socket event to disconnect the user from the room
        socket.emit('disconnectUser', { member: member, roomName: roomName, ban: ban });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConfirmExit, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConfirmExit, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConfirmExit, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1leGl0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9leGl0LW1ldGhvZHMvY29uZmlybS1leGl0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEJBQTBCO0FBRTFCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBZ0IzQyxNQUFNLE9BQU8sV0FBVztJQUN0Qjs7Ozs7Ozs7O09BU0c7SUFDSCxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLEtBQUssRUFBc0I7UUFDN0UsMkRBQTJEO1FBQzNELE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDbEYsQ0FBQzt1R0FkVSxXQUFXOzJHQUFYLFdBQVcsY0FGVixNQUFNOzsyRkFFUCxXQUFXO2tCQUh2QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIGNvbmZpcm0tZXhpdC5zZXJ2aWNlLnRzXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpcm1FeGl0T3B0aW9ucyB7XG4gIHNvY2tldDogU29ja2V0O1xuICBtZW1iZXI6IHN0cmluZztcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgYmFuPzogYm9vbGVhbjtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQ29uZmlybUV4aXRUeXBlID0gKG9wdGlvbnM6IENvbmZpcm1FeGl0T3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpcm1FeGl0IHtcbiAgLyoqXG4gICAqIENvbmZpcm1zIHRoZSBleGl0IG9mIGEgbWVtYmVyIGZyb20gYSByb29tIGFuZCBvcHRpb25hbGx5IGJhbnMgdGhlbS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY29uZmlybWluZyB0aGUgZXhpdC5cbiAgICogQHBhcmFtIHtTb2NrZXR9IG9wdGlvbnMuc29ja2V0IC0gVGhlIHNvY2tldCBpbnN0YW5jZSB0byBlbWl0IHRoZSBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubWVtYmVyIC0gVGhlIG1lbWJlciB3aG8gaXMgZXhpdGluZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbSB0aGUgbWVtYmVyIGlzIGV4aXRpbmcgZnJvbS5cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5iYW49ZmFsc2VdIC0gV2hldGhlciB0byBiYW4gdGhlIG1lbWJlciBmcm9tIHRoZSByb29tLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgZXhpdCBpcyBjb25maXJtZWQuXG4gICAqL1xuICBhc3luYyBjb25maXJtRXhpdCh7IHNvY2tldCwgbWVtYmVyLCByb29tTmFtZSwgYmFuID0gZmFsc2UgfTogQ29uZmlybUV4aXRPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gRW1pdCBhIHNvY2tldCBldmVudCB0byBkaXNjb25uZWN0IHRoZSB1c2VyIGZyb20gdGhlIHJvb21cbiAgICBzb2NrZXQuZW1pdCgnZGlzY29ubmVjdFVzZXInLCB7IG1lbWJlcjogbWVtYmVyLCByb29tTmFtZTogcm9vbU5hbWUsIGJhbjogYmFuIH0pO1xuICB9XG59XG4iXX0=