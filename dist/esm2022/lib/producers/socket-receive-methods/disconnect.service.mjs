import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class Disconnect {
    /**
     * Handles the disconnection logic by either redirecting to a specified URL or showing an alert.
     *
     * @param {DisconnectOptions} options - The options for handling disconnection.
     * @param {Function} options.showAlert - Function to display an alert message.
     * @param {string} options.redirectURL - URL to redirect to if on the web.
     * @param {boolean} options.onWeb - Flag indicating if the operation is on the web.
     * @returns {Promise<void>} A promise that resolves when the disconnection handling is complete.
     */
    disconnect = async ({ showAlert, redirectURL, onWeb }) => {
        // Redirect to the specified URL on the web
        if (onWeb && redirectURL) {
            window.location.href = redirectURL;
        }
        else {
            // Display an alert and update the validated state
            if (showAlert) {
                showAlert({
                    message: 'You have been disconnected from the session.',
                    type: 'danger',
                    duration: 2000,
                });
            }
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: Disconnect, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: Disconnect, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: Disconnect, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY29ubmVjdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2Rpc2Nvbm5lY3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWdCM0MsTUFBTSxPQUFPLFVBQVU7SUFDckI7Ozs7Ozs7O09BUUc7SUFDSCxVQUFVLEdBQUcsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQXFCLEVBQWlCLEVBQUU7UUFDekYsMkNBQTJDO1FBQzNDLElBQUksS0FBSyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztRQUNyQyxDQUFDO2FBQU0sQ0FBQztZQUNOLGtEQUFrRDtZQUNsRCxJQUFJLFNBQVMsRUFBRSxDQUFDO2dCQUNkLFNBQVMsQ0FBQztvQkFDUixPQUFPLEVBQUUsOENBQThDO29CQUN2RCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxRQUFRLEVBQUUsSUFBSTtpQkFDZixDQUFDLENBQUM7WUFDTCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0F4QlMsVUFBVTsyR0FBVixVQUFVLGNBRlQsTUFBTTs7MkZBRVAsVUFBVTtrQkFIdEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaG93QWxlcnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIERpc2Nvbm5lY3RPcHRpb25zIHtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICByZWRpcmVjdFVSTD86IHN0cmluZztcbiAgb25XZWI6IGJvb2xlYW47XG4gIHVwZGF0ZVZhbGlkYXRlZD86IChpc1ZhbGlkYXRlZDogYm9vbGVhbikgPT4gdm9pZDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgRGlzY29ubmVjdFR5cGUgPSAob3B0aW9uczogRGlzY29ubmVjdE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBEaXNjb25uZWN0IHtcbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGRpc2Nvbm5lY3Rpb24gbG9naWMgYnkgZWl0aGVyIHJlZGlyZWN0aW5nIHRvIGEgc3BlY2lmaWVkIFVSTCBvciBzaG93aW5nIGFuIGFsZXJ0LlxuICAgKlxuICAgKiBAcGFyYW0ge0Rpc2Nvbm5lY3RPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGhhbmRsaW5nIGRpc2Nvbm5lY3Rpb24uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMuc2hvd0FsZXJ0IC0gRnVuY3Rpb24gdG8gZGlzcGxheSBhbiBhbGVydCBtZXNzYWdlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yZWRpcmVjdFVSTCAtIFVSTCB0byByZWRpcmVjdCB0byBpZiBvbiB0aGUgd2ViLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMub25XZWIgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIG9wZXJhdGlvbiBpcyBvbiB0aGUgd2ViLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgZGlzY29ubmVjdGlvbiBoYW5kbGluZyBpcyBjb21wbGV0ZS5cbiAgICovXG4gIGRpc2Nvbm5lY3QgPSBhc3luYyAoeyBzaG93QWxlcnQsIHJlZGlyZWN0VVJMLCBvbldlYiB9OiBEaXNjb25uZWN0T3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIC8vIFJlZGlyZWN0IHRvIHRoZSBzcGVjaWZpZWQgVVJMIG9uIHRoZSB3ZWJcbiAgICBpZiAob25XZWIgJiYgcmVkaXJlY3RVUkwpIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVkaXJlY3RVUkw7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERpc3BsYXkgYW4gYWxlcnQgYW5kIHVwZGF0ZSB0aGUgdmFsaWRhdGVkIHN0YXRlXG4gICAgICBpZiAoc2hvd0FsZXJ0KSB7XG4gICAgICAgIHNob3dBbGVydCh7XG4gICAgICAgICAgbWVzc2FnZTogJ1lvdSBoYXZlIGJlZW4gZGlzY29ubmVjdGVkIGZyb20gdGhlIHNlc3Npb24uJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMjAwMCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuIl19