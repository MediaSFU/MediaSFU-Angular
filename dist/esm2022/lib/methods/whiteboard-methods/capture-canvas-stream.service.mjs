/* eslint-disable @typescript-eslint/no-non-null-assertion */
// canvas.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwdHVyZS1jYW52YXMtc3RyZWFtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy93aGl0ZWJvYXJkLW1ldGhvZHMvY2FwdHVyZS1jYW52YXMtc3RyZWFtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNkRBQTZEO0FBQzdELG9CQUFvQjtBQUNwQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQTJDM0MsTUFBTSxPQUFPLG1CQUFtQjtJQUM5Qjs7Ozs7T0FLRztJQUNILG1CQUFtQixHQUFHLEtBQUssRUFBRSxFQUMzQixVQUFVLEVBQ1YsS0FBSyxHQUFHLElBQUksR0FDZSxFQUFpQixFQUFFO1FBQzlDLElBQUksQ0FBQztZQUNILFVBQVUsR0FBRyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUU5QyxJQUFJLEVBQ0YsZ0JBQWdCLEVBQ2hCLFlBQVksRUFDWixrQkFBa0IsRUFDbEIsY0FBYyxFQUNkLGdCQUFnQixFQUNoQixvQkFBb0IsRUFDcEIsS0FBSyxFQUNMLG1CQUFtQixFQUNuQiwwQkFBMEIsRUFDMUIsNkJBQTZCLEdBQzlCLEdBQUcsVUFBVSxDQUFDO1lBRWYsSUFBSSxLQUFLLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDM0IsNENBQTRDO2dCQUM1QyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxDQUFDLDhCQUE4QjtnQkFDdEQsT0FBTyxDQUFDLGdCQUFnQixJQUFJLFFBQVEsR0FBRyxXQUFXLEVBQUUsQ0FBQztvQkFDbkQsTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUN6RCxVQUFVLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7b0JBQzlDLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDL0MsUUFBUSxFQUFFLENBQUM7Z0JBQ2IsQ0FBQztnQkFFRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO2dCQUN0RCxDQUFDO2dCQUNELE1BQU0sTUFBTSxHQUFHLGdCQUFpQixDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDbkQsWUFBWSxHQUFHLE1BQU0sQ0FBQztnQkFDdEIsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRTNCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN0QixNQUFNLG1CQUFtQixDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO2dCQUM5RCxDQUFDO3FCQUFNLENBQUM7b0JBQ04sSUFBSSxDQUFDO3dCQUNILGNBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3QkFDeEIsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzNCLE1BQU0sS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBQzNCLENBQUM7b0JBQUMsTUFBTSxDQUFDO3dCQUNQLGtCQUFrQjtvQkFDcEIsQ0FBQztvQkFFRCxNQUFNLDBCQUEwQixDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBQzNELENBQUM7WUFDSCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sSUFBSSxDQUFDLEtBQUssSUFBSSxZQUFZLEVBQUUsQ0FBQztvQkFDM0IsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQXVCLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUM1RSxZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUNwQixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDekIsNkJBQTZCLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0RCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO3VHQXJFUyxtQkFBbUI7MkdBQW5CLG1CQUFtQixjQUZsQixNQUFNOzsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvbiAqL1xuLy8gY2FudmFzLnNlcnZpY2UudHNcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb2R1Y2VyIH0gZnJvbSAnbWVkaWFzb3VwLWNsaWVudC9saWIvdHlwZXMnO1xuaW1wb3J0IHtcbiAgQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5UeXBlLFxuICBDcmVhdGVTZW5kVHJhbnNwb3J0VHlwZSxcbiAgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5UeXBlLFxuICBTbGVlcFR5cGUsXG4gIENyZWF0ZVNlbmRUcmFuc3BvcnRQYXJhbWV0ZXJzLFxuICBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblBhcmFtZXRlcnMsXG4gIENvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuUGFyYW1ldGVycyxcbn0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcbmV4cG9ydCBpbnRlcmZhY2UgQ2FwdHVyZUNhbnZhc1N0cmVhbVBhcmFtZXRlcnNcbiAgZXh0ZW5kcyBDcmVhdGVTZW5kVHJhbnNwb3J0UGFyYW1ldGVycyxcbiAgICBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblBhcmFtZXRlcnMsXG4gICAgQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5QYXJhbWV0ZXJzIHtcbiAgY2FudmFzV2hpdGVib2FyZDogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsO1xuICBjYW52YXNTdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgdXBkYXRlQ2FudmFzU3RyZWFtOiAoc3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHZvaWQ7XG4gIHNjcmVlblByb2R1Y2VyOiBQcm9kdWNlciB8IG51bGw7XG4gIHRyYW5zcG9ydENyZWF0ZWQ6IGJvb2xlYW47XG4gIHVwZGF0ZVNjcmVlblByb2R1Y2VyOiAocHJvZHVjZXI6IFByb2R1Y2VyIHwgbnVsbCkgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgc2xlZXA6IFNsZWVwVHlwZTtcbiAgY3JlYXRlU2VuZFRyYW5zcG9ydDogQ3JlYXRlU2VuZFRyYW5zcG9ydFR5cGU7XG4gIGNvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuOiBDb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblR5cGU7XG4gIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuOiBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblR5cGU7XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gQ2FwdHVyZUNhbnZhc1N0cmVhbVBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDYXB0dXJlQ2FudmFzU3RyZWFtT3B0aW9ucyB7XG4gIHBhcmFtZXRlcnM6IENhcHR1cmVDYW52YXNTdHJlYW1QYXJhbWV0ZXJzO1xuICBzdGFydD86IGJvb2xlYW47XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENhcHR1cmVDYW52YXNTdHJlYW1UeXBlID0gKG9wdGlvbnM6IENhcHR1cmVDYW52YXNTdHJlYW1PcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2FwdHVyZUNhbnZhc1N0cmVhbSB7XG4gIC8qKlxuICAgKiBDYXB0dXJlIHRoZSBjYW52YXMgc3RyZWFtLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdC5cbiAgICogQHBhcmFtIHtib29sZWFufSBbc3RhcnQ9dHJ1ZV0gLSBJbmRpY2F0ZXMgd2hldGhlciB0byBzdGFydCBjYXB0dXJpbmcgdGhlIHN0cmVhbS5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgY2FudmFzIHN0cmVhbSBpcyBjYXB0dXJlZC5cbiAgICovXG4gIGNhcHR1cmVDYW52YXNTdHJlYW0gPSBhc3luYyAoe1xuICAgIHBhcmFtZXRlcnMsXG4gICAgc3RhcnQgPSB0cnVlLFxuICB9OiBDYXB0dXJlQ2FudmFzU3RyZWFtT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBwYXJhbWV0ZXJzID0gcGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICAgIGxldCB7XG4gICAgICAgIGNhbnZhc1doaXRlYm9hcmQsXG4gICAgICAgIGNhbnZhc1N0cmVhbSxcbiAgICAgICAgdXBkYXRlQ2FudmFzU3RyZWFtLFxuICAgICAgICBzY3JlZW5Qcm9kdWNlcixcbiAgICAgICAgdHJhbnNwb3J0Q3JlYXRlZCxcbiAgICAgICAgdXBkYXRlU2NyZWVuUHJvZHVjZXIsXG4gICAgICAgIHNsZWVwLFxuICAgICAgICBjcmVhdGVTZW5kVHJhbnNwb3J0LFxuICAgICAgICBjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbixcbiAgICAgICAgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4sXG4gICAgICB9ID0gcGFyYW1ldGVycztcblxuICAgICAgaWYgKHN0YXJ0ICYmICFjYW52YXNTdHJlYW0pIHtcbiAgICAgICAgLy8gV2FpdCBmb3IgY2FudmFzV2hpdGVib2FyZCB0byBiZSBhdmFpbGFibGVcbiAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICAgICAgY29uc3QgbWF4QXR0ZW1wdHMgPSAyMDsgLy8gMiBzZWNvbmRzIC8gMTAwbXMgaW50ZXJ2YWxzXG4gICAgICAgIHdoaWxlICghY2FudmFzV2hpdGVib2FyZCAmJiBhdHRlbXB0cyA8IG1heEF0dGVtcHRzKSB7XG4gICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwKSk7XG4gICAgICAgICAgcGFyYW1ldGVycyA9IHBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuICAgICAgICAgIGNhbnZhc1doaXRlYm9hcmQgPSBwYXJhbWV0ZXJzLmNhbnZhc1doaXRlYm9hcmQ7XG4gICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY2FudmFzV2hpdGVib2FyZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FudmFzIHdoaXRlYm9hcmQgbm90IGF2YWlsYWJsZS4nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdHJlYW0gPSBjYW52YXNXaGl0ZWJvYXJkIS5jYXB0dXJlU3RyZWFtKDMwKTtcbiAgICAgICAgY2FudmFzU3RyZWFtID0gc3RyZWFtO1xuICAgICAgICB1cGRhdGVDYW52YXNTdHJlYW0oc3RyZWFtKTtcblxuICAgICAgICBpZiAoIXRyYW5zcG9ydENyZWF0ZWQpIHtcbiAgICAgICAgICBhd2FpdCBjcmVhdGVTZW5kVHJhbnNwb3J0KHsgb3B0aW9uOiAnc2NyZWVuJywgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2NyZWVuUHJvZHVjZXIhLmNsb3NlKCk7XG4gICAgICAgICAgICB1cGRhdGVTY3JlZW5Qcm9kdWNlcihudWxsKTtcbiAgICAgICAgICAgIGF3YWl0IHNsZWVwKHsgbXM6IDUwMCB9KTtcbiAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGF3YWl0IGNvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuKHsgc3RyZWFtLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXN0YXJ0ICYmIGNhbnZhc1N0cmVhbSkge1xuICAgICAgICAgIGNhbnZhc1N0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKCh0cmFjazogTWVkaWFTdHJlYW1UcmFjaykgPT4gdHJhY2suc3RvcCgpKTtcbiAgICAgICAgICBjYW52YXNTdHJlYW0gPSBudWxsO1xuICAgICAgICAgIHVwZGF0ZUNhbnZhc1N0cmVhbShudWxsKTtcbiAgICAgICAgICBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbih7IHBhcmFtZXRlcnMgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGluIGNhcHR1cmVDYW52YXNTdHJlYW06JywgZXJyb3IpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==