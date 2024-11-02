import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service to handle disconnection logic, providing options to redirect or display an alert message.
 *
 * @class
 * @name Disconnect
 * @description This service manages user disconnection by either redirecting the user to a specified URL (for web platforms) or showing a custom alert message.
 *
 * @method
 * disconnect
 * @async
 * @param {DisconnectOptions} options - The options for handling disconnection.
 * @param {Function} options.showAlert - Function to display an alert message if a redirect is not needed.
 * @param {string} options.redirectURL - The URL to redirect to upon disconnection, if applicable.
 * @param {boolean} options.onWeb - Flag indicating if the application is running on the web.
 * @param {Function} [options.updateValidated] - Optional function to update validation state, primarily for native applications.
 * @returns {Promise<void>} A promise that resolves when the disconnection process completes.
 *
 * @example
 * const disconnectOptions = {
 *   showAlert: (alert) => console.log(alert.message),
 *   redirectURL: 'https://example.com/home',
 *   onWeb: true,
 *   updateValidated: (isValid) => console.log(`Validation updated: ${isValid}`)
 * };
 * disconnectService.disconnect(disconnectOptions);
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY29ubmVjdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2Rpc2Nvbm5lY3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWEzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUtILE1BQU0sT0FBTyxVQUFVO0lBQ3JCOzs7Ozs7OztPQVFHO0lBQ0gsVUFBVSxHQUFHLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFxQixFQUFpQixFQUFFO1FBQ3pGLDJDQUEyQztRQUMzQyxJQUFJLEtBQUssSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUN6QixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7UUFDckMsQ0FBQzthQUFNLENBQUM7WUFDTixrREFBa0Q7WUFDbEQsSUFBSSxTQUFTLEVBQUUsQ0FBQztnQkFDZCxTQUFTLENBQUM7b0JBQ1IsT0FBTyxFQUFFLDhDQUE4QztvQkFDdkQsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsUUFBUSxFQUFFLElBQUk7aUJBQ2YsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDLENBQUM7dUdBeEJTLFVBQVU7MkdBQVYsVUFBVSxjQUZULE1BQU07OzJGQUVQLFVBQVU7a0JBSHRCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2hvd0FsZXJ0IH0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBEaXNjb25uZWN0T3B0aW9ucyB7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgcmVkaXJlY3RVUkw/OiBzdHJpbmc7XG4gIG9uV2ViOiBib29sZWFuO1xuICB1cGRhdGVWYWxpZGF0ZWQ/OiAoaXNWYWxpZGF0ZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIERpc2Nvbm5lY3RUeXBlID0gKG9wdGlvbnM6IERpc2Nvbm5lY3RPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIFNlcnZpY2UgdG8gaGFuZGxlIGRpc2Nvbm5lY3Rpb24gbG9naWMsIHByb3ZpZGluZyBvcHRpb25zIHRvIHJlZGlyZWN0IG9yIGRpc3BsYXkgYW4gYWxlcnQgbWVzc2FnZS5cbiAqXG4gKiBAY2xhc3NcbiAqIEBuYW1lIERpc2Nvbm5lY3RcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIHNlcnZpY2UgbWFuYWdlcyB1c2VyIGRpc2Nvbm5lY3Rpb24gYnkgZWl0aGVyIHJlZGlyZWN0aW5nIHRoZSB1c2VyIHRvIGEgc3BlY2lmaWVkIFVSTCAoZm9yIHdlYiBwbGF0Zm9ybXMpIG9yIHNob3dpbmcgYSBjdXN0b20gYWxlcnQgbWVzc2FnZS5cbiAqXG4gKiBAbWV0aG9kXG4gKiBkaXNjb25uZWN0XG4gKiBAYXN5bmNcbiAqIEBwYXJhbSB7RGlzY29ubmVjdE9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgaGFuZGxpbmcgZGlzY29ubmVjdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMuc2hvd0FsZXJ0IC0gRnVuY3Rpb24gdG8gZGlzcGxheSBhbiBhbGVydCBtZXNzYWdlIGlmIGEgcmVkaXJlY3QgaXMgbm90IG5lZWRlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJlZGlyZWN0VVJMIC0gVGhlIFVSTCB0byByZWRpcmVjdCB0byB1cG9uIGRpc2Nvbm5lY3Rpb24sIGlmIGFwcGxpY2FibGUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMub25XZWIgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIGFwcGxpY2F0aW9uIGlzIHJ1bm5pbmcgb24gdGhlIHdlYi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnVwZGF0ZVZhbGlkYXRlZF0gLSBPcHRpb25hbCBmdW5jdGlvbiB0byB1cGRhdGUgdmFsaWRhdGlvbiBzdGF0ZSwgcHJpbWFyaWx5IGZvciBuYXRpdmUgYXBwbGljYXRpb25zLlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGRpc2Nvbm5lY3Rpb24gcHJvY2VzcyBjb21wbGV0ZXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IGRpc2Nvbm5lY3RPcHRpb25zID0ge1xuICogICBzaG93QWxlcnQ6IChhbGVydCkgPT4gY29uc29sZS5sb2coYWxlcnQubWVzc2FnZSksXG4gKiAgIHJlZGlyZWN0VVJMOiAnaHR0cHM6Ly9leGFtcGxlLmNvbS9ob21lJyxcbiAqICAgb25XZWI6IHRydWUsXG4gKiAgIHVwZGF0ZVZhbGlkYXRlZDogKGlzVmFsaWQpID0+IGNvbnNvbGUubG9nKGBWYWxpZGF0aW9uIHVwZGF0ZWQ6ICR7aXNWYWxpZH1gKVxuICogfTtcbiAqIGRpc2Nvbm5lY3RTZXJ2aWNlLmRpc2Nvbm5lY3QoZGlzY29ubmVjdE9wdGlvbnMpO1xuICovXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBEaXNjb25uZWN0IHtcbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGRpc2Nvbm5lY3Rpb24gbG9naWMgYnkgZWl0aGVyIHJlZGlyZWN0aW5nIHRvIGEgc3BlY2lmaWVkIFVSTCBvciBzaG93aW5nIGFuIGFsZXJ0LlxuICAgKlxuICAgKiBAcGFyYW0ge0Rpc2Nvbm5lY3RPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGhhbmRsaW5nIGRpc2Nvbm5lY3Rpb24uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMuc2hvd0FsZXJ0IC0gRnVuY3Rpb24gdG8gZGlzcGxheSBhbiBhbGVydCBtZXNzYWdlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yZWRpcmVjdFVSTCAtIFVSTCB0byByZWRpcmVjdCB0byBpZiBvbiB0aGUgd2ViLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMub25XZWIgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIG9wZXJhdGlvbiBpcyBvbiB0aGUgd2ViLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgZGlzY29ubmVjdGlvbiBoYW5kbGluZyBpcyBjb21wbGV0ZS5cbiAgICovXG4gIGRpc2Nvbm5lY3QgPSBhc3luYyAoeyBzaG93QWxlcnQsIHJlZGlyZWN0VVJMLCBvbldlYiB9OiBEaXNjb25uZWN0T3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIC8vIFJlZGlyZWN0IHRvIHRoZSBzcGVjaWZpZWQgVVJMIG9uIHRoZSB3ZWJcbiAgICBpZiAob25XZWIgJiYgcmVkaXJlY3RVUkwpIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVkaXJlY3RVUkw7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERpc3BsYXkgYW4gYWxlcnQgYW5kIHVwZGF0ZSB0aGUgdmFsaWRhdGVkIHN0YXRlXG4gICAgICBpZiAoc2hvd0FsZXJ0KSB7XG4gICAgICAgIHNob3dBbGVydCh7XG4gICAgICAgICAgbWVzc2FnZTogJ1lvdSBoYXZlIGJlZW4gZGlzY29ubmVjdGVkIGZyb20gdGhlIHNlc3Npb24uJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMjAwMCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuIl19