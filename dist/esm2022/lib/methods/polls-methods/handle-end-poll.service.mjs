import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class HandleEndPoll {
    /**
     * Handles the end of a poll by emitting an "endPoll" event through the provided socket.
     * Displays an alert based on the success or failure of the operation.
     *
     * @param {Object} options - The options for ending the poll.
     * @param {string} options.pollId - The ID of the poll to end.
     * @param {Socket} options.socket - The socket instance to emit the event.
     * @param {Function} [options.showAlert] - Optional function to display alerts.
     * @param {string} options.roomName - The name of the room where the poll is being conducted.
     * @returns {Promise<void>} A promise that resolves when the poll end operation is complete.
     */
    async handleEndPoll({ pollId, socket, showAlert, roomName, updateIsPollModalVisible, }) {
        try {
            socket.emit('endPoll', { roomName, poll_id: pollId }, (response) => {
                if (response.success) {
                    showAlert?.({ message: 'Poll ended successfully', type: 'success' });
                    updateIsPollModalVisible(false);
                }
                else {
                    showAlert?.({ message: response.reason || 'Failed to end poll', type: 'danger' });
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HandleEndPoll, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HandleEndPoll, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HandleEndPoll, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlLWVuZC1wb2xsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9wb2xscy1tZXRob2RzL2hhbmRsZS1lbmQtcG9sbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBa0IzQyxNQUFNLE9BQU8sYUFBYTtJQUN4Qjs7Ozs7Ozs7OztPQVVHO0lBRUgsS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUNsQixNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsRUFDVCxRQUFRLEVBQ1Isd0JBQXdCLEdBQ0g7UUFDckIsSUFBSSxDQUFDO1lBQ0gsTUFBTSxDQUFDLElBQUksQ0FDVCxTQUFTLEVBQ1QsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUM3QixDQUFDLFFBQStDLEVBQUUsRUFBRTtnQkFDbEQsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ3JCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO29CQUNyRSx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEMsQ0FBQztxQkFBTSxDQUFDO29CQUNOLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLElBQUksb0JBQW9CLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ3BGLENBQUM7WUFDSCxDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixDQUFDO0lBQ0gsQ0FBQzt1R0FwQ1UsYUFBYTsyR0FBYixhQUFhLGNBRlosTUFBTTs7MkZBRVAsYUFBYTtrQkFIekIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IFNob3dBbGVydCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSGFuZGxlRW5kUG9sbE9wdGlvbnMge1xuICBwb2xsSWQ6IHN0cmluZztcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgdXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlOiAodmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgSGFuZGxlRW5kUG9sbFR5cGUgPSAob3B0aW9uczogSGFuZGxlRW5kUG9sbE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBIYW5kbGVFbmRQb2xsIHtcbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGVuZCBvZiBhIHBvbGwgYnkgZW1pdHRpbmcgYW4gXCJlbmRQb2xsXCIgZXZlbnQgdGhyb3VnaCB0aGUgcHJvdmlkZWQgc29ja2V0LlxuICAgKiBEaXNwbGF5cyBhbiBhbGVydCBiYXNlZCBvbiB0aGUgc3VjY2VzcyBvciBmYWlsdXJlIG9mIHRoZSBvcGVyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGVuZGluZyB0aGUgcG9sbC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucG9sbElkIC0gVGhlIElEIG9mIHRoZSBwb2xsIHRvIGVuZC5cbiAgICogQHBhcmFtIHtTb2NrZXR9IG9wdGlvbnMuc29ja2V0IC0gVGhlIHNvY2tldCBpbnN0YW5jZSB0byBlbWl0IHRoZSBldmVudC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuc2hvd0FsZXJ0XSAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIGRpc3BsYXkgYWxlcnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tIHdoZXJlIHRoZSBwb2xsIGlzIGJlaW5nIGNvbmR1Y3RlZC5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHBvbGwgZW5kIG9wZXJhdGlvbiBpcyBjb21wbGV0ZS5cbiAgICovXG5cbiAgYXN5bmMgaGFuZGxlRW5kUG9sbCh7XG4gICAgcG9sbElkLFxuICAgIHNvY2tldCxcbiAgICBzaG93QWxlcnQsXG4gICAgcm9vbU5hbWUsXG4gICAgdXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlLFxuICB9OiBIYW5kbGVFbmRQb2xsT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBzb2NrZXQuZW1pdChcbiAgICAgICAgJ2VuZFBvbGwnLFxuICAgICAgICB7IHJvb21OYW1lLCBwb2xsX2lkOiBwb2xsSWQgfSxcbiAgICAgICAgKHJlc3BvbnNlOiB7IHN1Y2Nlc3M6IGJvb2xlYW47IHJlYXNvbj86IHN0cmluZyB9KSA9PiB7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHNob3dBbGVydD8uKHsgbWVzc2FnZTogJ1BvbGwgZW5kZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnIH0pO1xuICAgICAgICAgICAgdXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2hvd0FsZXJ0Py4oeyBtZXNzYWdlOiByZXNwb25zZS5yZWFzb24gfHwgJ0ZhaWxlZCB0byBlbmQgcG9sbCcsIHR5cGU6ICdkYW5nZXInIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==