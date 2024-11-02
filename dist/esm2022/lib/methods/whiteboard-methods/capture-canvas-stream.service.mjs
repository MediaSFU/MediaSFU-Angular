/* eslint-disable @typescript-eslint/no-non-null-assertion */
// canvas.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Manages capturing and streaming from a canvas element.
 *
 * @param {CaptureCanvasStreamOptions} options - Options to control canvas streaming.
 * @param {CaptureCanvasStreamParameters} options.parameters - Object containing media settings and state management functions.
 * @param {boolean} [options.start=true] - If `true`, initiates canvas capture; if `false`, stops the capture.
 * @returns {Promise<void>} A promise that resolves once the canvas stream has started or stopped.
 *
 * The function first checks the availability of `canvasWhiteboard` to capture the canvas stream. If unavailable, it attempts multiple times until a timeout. If successful:
 * - It starts the canvas capture, creating or reconnecting the transport for streaming.
 * - If stopping, it disconnects the transport and halts the stream.
 *
 * @example
 * ```typescript
 * const captureService = new CaptureCanvasStream();
 * captureService.captureCanvasStream({
 *   parameters: {
 *     canvasWhiteboard: document.getElementById('myCanvas') as HTMLCanvasElement,
 *     updateCanvasStream: (stream) => console.log('Canvas Stream:', stream),
 *     screenProducer: null,
 *     transportCreated: false,
 *     // other required parameters...
 *   },
 *   start: true
 * });
 * ```
 *
 * This example initiates a capture of `myCanvas`, updating the canvas stream upon successful connection.
 */
export class CaptureCanvasStream {
    /**
     * Capture the canvas stream.
     * @param {Object} parameters - The parameters object.
     * @param {boolean} [start=true] - Indicates whether to start capturing the stream.
     * @returns {Promise<void>} - A promise that resolves when the canvas stream is captured.
     */
    captureCanvasStream = async ({ parameters, start = true, }) => {
        try {
            parameters = parameters.getUpdatedAllParams();
            let { canvasWhiteboard, canvasStream, updateCanvasStream, screenProducer, transportCreated, updateScreenProducer, sleep, createSendTransport, connectSendTransportScreen, disconnectSendTransportScreen, } = parameters;
            if (start && !canvasStream) {
                // Wait for canvasWhiteboard to be available
                let attempts = 0;
                const maxAttempts = 20; // 2 seconds / 100ms intervals
                while (!canvasWhiteboard && attempts < maxAttempts) {
                    await new Promise((resolve) => setTimeout(resolve, 100));
                    parameters = parameters.getUpdatedAllParams();
                    canvasWhiteboard = parameters.canvasWhiteboard;
                    attempts++;
                }
                if (!canvasWhiteboard) {
                    throw new Error('Canvas whiteboard not available.');
                }
                const stream = canvasWhiteboard.captureStream(30);
                canvasStream = stream;
                updateCanvasStream(stream);
                if (!transportCreated) {
                    await createSendTransport({ option: 'screen', parameters });
                }
                else {
                    try {
                        screenProducer.close();
                        updateScreenProducer(null);
                        await sleep({ ms: 500 });
                    }
                    catch {
                        /* handle error */
                    }
                    await connectSendTransportScreen({ stream, parameters });
                }
            }
            else {
                if (!start && canvasStream) {
                    canvasStream.getTracks().forEach((track) => track.stop());
                    canvasStream = null;
                    updateCanvasStream(null);
                    disconnectSendTransportScreen({ parameters });
                }
            }
        }
        catch (error) {
            console.log('Error in captureCanvasStream:', error);
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CaptureCanvasStream, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CaptureCanvasStream, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CaptureCanvasStream, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwdHVyZS1jYW52YXMtc3RyZWFtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy93aGl0ZWJvYXJkLW1ldGhvZHMvY2FwdHVyZS1jYW52YXMtc3RyZWFtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNkRBQTZEO0FBQzdELG9CQUFvQjtBQUNwQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXdDM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFNSCxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCOzs7OztPQUtHO0lBQ0gsbUJBQW1CLEdBQUcsS0FBSyxFQUFFLEVBQzNCLFVBQVUsRUFDVixLQUFLLEdBQUcsSUFBSSxHQUNlLEVBQWlCLEVBQUU7UUFDOUMsSUFBSSxDQUFDO1lBQ0gsVUFBVSxHQUFHLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBRTlDLElBQUksRUFDRixnQkFBZ0IsRUFDaEIsWUFBWSxFQUNaLGtCQUFrQixFQUNsQixjQUFjLEVBQ2QsZ0JBQWdCLEVBQ2hCLG9CQUFvQixFQUNwQixLQUFLLEVBQ0wsbUJBQW1CLEVBQ25CLDBCQUEwQixFQUMxQiw2QkFBNkIsR0FDOUIsR0FBRyxVQUFVLENBQUM7WUFFZixJQUFJLEtBQUssSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUMzQiw0Q0FBNEM7Z0JBQzVDLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztnQkFDakIsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUMsOEJBQThCO2dCQUN0RCxPQUFPLENBQUMsZ0JBQWdCLElBQUksUUFBUSxHQUFHLFdBQVcsRUFBRSxDQUFDO29CQUNuRCxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3pELFVBQVUsR0FBRyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztvQkFDOUMsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDO29CQUMvQyxRQUFRLEVBQUUsQ0FBQztnQkFDYixDQUFDO2dCQUVELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7Z0JBQ3RELENBQUM7Z0JBQ0QsTUFBTSxNQUFNLEdBQUcsZ0JBQWlCLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRCxZQUFZLEdBQUcsTUFBTSxDQUFDO2dCQUN0QixrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFM0IsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3RCLE1BQU0sbUJBQW1CLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBQzlELENBQUM7cUJBQU0sQ0FBQztvQkFDTixJQUFJLENBQUM7d0JBQ0gsY0FBZSxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUN4QixvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDM0IsTUFBTSxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztvQkFDM0IsQ0FBQztvQkFBQyxNQUFNLENBQUM7d0JBQ1Asa0JBQWtCO29CQUNwQixDQUFDO29CQUVELE1BQU0sMEJBQTBCLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDM0QsQ0FBQztZQUNILENBQUM7aUJBQU0sQ0FBQztnQkFDTixJQUFJLENBQUMsS0FBSyxJQUFJLFlBQVksRUFBRSxDQUFDO29CQUMzQixZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBdUIsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQzVFLFlBQVksR0FBRyxJQUFJLENBQUM7b0JBQ3BCLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN6Qiw2QkFBNkIsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBQ2hELENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3RELENBQUM7SUFDSCxDQUFDLENBQUM7dUdBckVTLG1CQUFtQjsyR0FBbkIsbUJBQW1CLGNBRmxCLE1BQU07OzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uICovXG4vLyBjYW52YXMuc2VydmljZS50c1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvZHVjZXIgfSBmcm9tICdtZWRpYXNvdXAtY2xpZW50L2xpYi90eXBlcyc7XG5pbXBvcnQge1xuICBDb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblR5cGUsXG4gIENyZWF0ZVNlbmRUcmFuc3BvcnRUeXBlLFxuICBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblR5cGUsXG4gIFNsZWVwVHlwZSxcbiAgQ3JlYXRlU2VuZFRyYW5zcG9ydFBhcmFtZXRlcnMsXG4gIERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuUGFyYW1ldGVycyxcbiAgQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5QYXJhbWV0ZXJzLFxufSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBDYXB0dXJlQ2FudmFzU3RyZWFtUGFyYW1ldGVyc1xuICBleHRlbmRzIENyZWF0ZVNlbmRUcmFuc3BvcnRQYXJhbWV0ZXJzLFxuICAgIERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuUGFyYW1ldGVycyxcbiAgICBDb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblBhcmFtZXRlcnMge1xuICBjYW52YXNXaGl0ZWJvYXJkOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw7XG4gIGNhbnZhc1N0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsO1xuICB1cGRhdGVDYW52YXNTdHJlYW06IChzdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4gdm9pZDtcbiAgc2NyZWVuUHJvZHVjZXI6IFByb2R1Y2VyIHwgbnVsbDtcbiAgdHJhbnNwb3J0Q3JlYXRlZDogYm9vbGVhbjtcbiAgdXBkYXRlU2NyZWVuUHJvZHVjZXI6IChwcm9kdWNlcjogUHJvZHVjZXIgfCBudWxsKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBzbGVlcDogU2xlZXBUeXBlO1xuICBjcmVhdGVTZW5kVHJhbnNwb3J0OiBDcmVhdGVTZW5kVHJhbnNwb3J0VHlwZTtcbiAgY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW46IENvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuVHlwZTtcbiAgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW46IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuVHlwZTtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBDYXB0dXJlQ2FudmFzU3RyZWFtUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENhcHR1cmVDYW52YXNTdHJlYW1PcHRpb25zIHtcbiAgcGFyYW1ldGVyczogQ2FwdHVyZUNhbnZhc1N0cmVhbVBhcmFtZXRlcnM7XG4gIHN0YXJ0PzogYm9vbGVhbjtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQ2FwdHVyZUNhbnZhc1N0cmVhbVR5cGUgPSAob3B0aW9uczogQ2FwdHVyZUNhbnZhc1N0cmVhbU9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogTWFuYWdlcyBjYXB0dXJpbmcgYW5kIHN0cmVhbWluZyBmcm9tIGEgY2FudmFzIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHtDYXB0dXJlQ2FudmFzU3RyZWFtT3B0aW9uc30gb3B0aW9ucyAtIE9wdGlvbnMgdG8gY29udHJvbCBjYW52YXMgc3RyZWFtaW5nLlxuICogQHBhcmFtIHtDYXB0dXJlQ2FudmFzU3RyZWFtUGFyYW1ldGVyc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gT2JqZWN0IGNvbnRhaW5pbmcgbWVkaWEgc2V0dGluZ3MgYW5kIHN0YXRlIG1hbmFnZW1lbnQgZnVuY3Rpb25zLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5zdGFydD10cnVlXSAtIElmIGB0cnVlYCwgaW5pdGlhdGVzIGNhbnZhcyBjYXB0dXJlOyBpZiBgZmFsc2VgLCBzdG9wcyB0aGUgY2FwdHVyZS5cbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyBvbmNlIHRoZSBjYW52YXMgc3RyZWFtIGhhcyBzdGFydGVkIG9yIHN0b3BwZWQuXG4gKlxuICogVGhlIGZ1bmN0aW9uIGZpcnN0IGNoZWNrcyB0aGUgYXZhaWxhYmlsaXR5IG9mIGBjYW52YXNXaGl0ZWJvYXJkYCB0byBjYXB0dXJlIHRoZSBjYW52YXMgc3RyZWFtLiBJZiB1bmF2YWlsYWJsZSwgaXQgYXR0ZW1wdHMgbXVsdGlwbGUgdGltZXMgdW50aWwgYSB0aW1lb3V0LiBJZiBzdWNjZXNzZnVsOlxuICogLSBJdCBzdGFydHMgdGhlIGNhbnZhcyBjYXB0dXJlLCBjcmVhdGluZyBvciByZWNvbm5lY3RpbmcgdGhlIHRyYW5zcG9ydCBmb3Igc3RyZWFtaW5nLlxuICogLSBJZiBzdG9wcGluZywgaXQgZGlzY29ubmVjdHMgdGhlIHRyYW5zcG9ydCBhbmQgaGFsdHMgdGhlIHN0cmVhbS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3QgY2FwdHVyZVNlcnZpY2UgPSBuZXcgQ2FwdHVyZUNhbnZhc1N0cmVhbSgpO1xuICogY2FwdHVyZVNlcnZpY2UuY2FwdHVyZUNhbnZhc1N0cmVhbSh7XG4gKiAgIHBhcmFtZXRlcnM6IHtcbiAqICAgICBjYW52YXNXaGl0ZWJvYXJkOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlDYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudCxcbiAqICAgICB1cGRhdGVDYW52YXNTdHJlYW06IChzdHJlYW0pID0+IGNvbnNvbGUubG9nKCdDYW52YXMgU3RyZWFtOicsIHN0cmVhbSksXG4gKiAgICAgc2NyZWVuUHJvZHVjZXI6IG51bGwsXG4gKiAgICAgdHJhbnNwb3J0Q3JlYXRlZDogZmFsc2UsXG4gKiAgICAgLy8gb3RoZXIgcmVxdWlyZWQgcGFyYW1ldGVycy4uLlxuICogICB9LFxuICogICBzdGFydDogdHJ1ZVxuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBUaGlzIGV4YW1wbGUgaW5pdGlhdGVzIGEgY2FwdHVyZSBvZiBgbXlDYW52YXNgLCB1cGRhdGluZyB0aGUgY2FudmFzIHN0cmVhbSB1cG9uIHN1Y2Nlc3NmdWwgY29ubmVjdGlvbi5cbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDYXB0dXJlQ2FudmFzU3RyZWFtIHtcbiAgLyoqXG4gICAqIENhcHR1cmUgdGhlIGNhbnZhcyBzdHJlYW0uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgb2JqZWN0LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtzdGFydD10cnVlXSAtIEluZGljYXRlcyB3aGV0aGVyIHRvIHN0YXJ0IGNhcHR1cmluZyB0aGUgc3RyZWFtLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBjYW52YXMgc3RyZWFtIGlzIGNhcHR1cmVkLlxuICAgKi9cbiAgY2FwdHVyZUNhbnZhc1N0cmVhbSA9IGFzeW5jICh7XG4gICAgcGFyYW1ldGVycyxcbiAgICBzdGFydCA9IHRydWUsXG4gIH06IENhcHR1cmVDYW52YXNTdHJlYW1PcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcblxuICAgICAgbGV0IHtcbiAgICAgICAgY2FudmFzV2hpdGVib2FyZCxcbiAgICAgICAgY2FudmFzU3RyZWFtLFxuICAgICAgICB1cGRhdGVDYW52YXNTdHJlYW0sXG4gICAgICAgIHNjcmVlblByb2R1Y2VyLFxuICAgICAgICB0cmFuc3BvcnRDcmVhdGVkLFxuICAgICAgICB1cGRhdGVTY3JlZW5Qcm9kdWNlcixcbiAgICAgICAgc2xlZXAsXG4gICAgICAgIGNyZWF0ZVNlbmRUcmFuc3BvcnQsXG4gICAgICAgIGNvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuLFxuICAgICAgICBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbixcbiAgICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgICBpZiAoc3RhcnQgJiYgIWNhbnZhc1N0cmVhbSkge1xuICAgICAgICAvLyBXYWl0IGZvciBjYW52YXNXaGl0ZWJvYXJkIHRvIGJlIGF2YWlsYWJsZVxuICAgICAgICBsZXQgYXR0ZW1wdHMgPSAwO1xuICAgICAgICBjb25zdCBtYXhBdHRlbXB0cyA9IDIwOyAvLyAyIHNlY29uZHMgLyAxMDBtcyBpbnRlcnZhbHNcbiAgICAgICAgd2hpbGUgKCFjYW52YXNXaGl0ZWJvYXJkICYmIGF0dGVtcHRzIDwgbWF4QXR0ZW1wdHMpIHtcbiAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDApKTtcbiAgICAgICAgICBwYXJhbWV0ZXJzID0gcGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG4gICAgICAgICAgY2FudmFzV2hpdGVib2FyZCA9IHBhcmFtZXRlcnMuY2FudmFzV2hpdGVib2FyZDtcbiAgICAgICAgICBhdHRlbXB0cysrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjYW52YXNXaGl0ZWJvYXJkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW52YXMgd2hpdGVib2FyZCBub3QgYXZhaWxhYmxlLicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0cmVhbSA9IGNhbnZhc1doaXRlYm9hcmQhLmNhcHR1cmVTdHJlYW0oMzApO1xuICAgICAgICBjYW52YXNTdHJlYW0gPSBzdHJlYW07XG4gICAgICAgIHVwZGF0ZUNhbnZhc1N0cmVhbShzdHJlYW0pO1xuXG4gICAgICAgIGlmICghdHJhbnNwb3J0Q3JlYXRlZCkge1xuICAgICAgICAgIGF3YWl0IGNyZWF0ZVNlbmRUcmFuc3BvcnQoeyBvcHRpb246ICdzY3JlZW4nLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzY3JlZW5Qcm9kdWNlciEuY2xvc2UoKTtcbiAgICAgICAgICAgIHVwZGF0ZVNjcmVlblByb2R1Y2VyKG51bGwpO1xuICAgICAgICAgICAgYXdhaXQgc2xlZXAoeyBtczogNTAwIH0pO1xuICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYXdhaXQgY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4oeyBzdHJlYW0sIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghc3RhcnQgJiYgY2FudmFzU3RyZWFtKSB7XG4gICAgICAgICAgY2FudmFzU3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goKHRyYWNrOiBNZWRpYVN0cmVhbVRyYWNrKSA9PiB0cmFjay5zdG9wKCkpO1xuICAgICAgICAgIGNhbnZhc1N0cmVhbSA9IG51bGw7XG4gICAgICAgICAgdXBkYXRlQ2FudmFzU3RyZWFtKG51bGwpO1xuICAgICAgICAgIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuKHsgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgaW4gY2FwdHVyZUNhbnZhc1N0cmVhbTonLCBlcnJvcik7XG4gICAgfVxuICB9O1xufVxuIl19