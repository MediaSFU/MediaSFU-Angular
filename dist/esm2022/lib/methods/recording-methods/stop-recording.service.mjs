import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./record-pause-timer.service";
export class StopRecording {
    RecordPauseTimerService;
    constructor(RecordPauseTimerService) {
        this.RecordPauseTimerService = RecordPauseTimerService;
    }
    async stopRecording({ parameters }) {
        let { roomName, socket, showAlert, startReport, endReport, recordStarted, recordPaused, recordStopped, updateRecordPaused, updateRecordStopped, updateStartReport, updateEndReport, updateShowRecordButtons, whiteboardStarted, whiteboardEnded, recordingMediaOptions, 
        //mediasfu functions
        captureCanvasStream, } = parameters;
        let recAttempt;
        if (recordStarted && !recordStopped) {
            let stop = await this.RecordPauseTimerService.recordPauseTimer({
                stop: true,
                isTimerRunning: parameters['isTimerRunning'],
                canPauseResume: parameters['canPauseResume'],
                showAlert: parameters.showAlert,
            });
            if (stop) {
                let action = 'stopRecord';
                await new Promise((resolve) => {
                    socket.emit(action, { roomName }, ({ success, reason, recordState, }) => {
                        if (success) {
                            startReport = false;
                            endReport = true;
                            recordPaused = false;
                            recordStopped = true;
                            recAttempt = true;
                            updateStartReport(startReport);
                            updateEndReport(endReport);
                            updateRecordPaused(recordPaused);
                            updateRecordStopped(recordStopped);
                            showAlert?.({ message: 'Recording Stopped', type: 'success' });
                            updateShowRecordButtons(false);
                        }
                        else {
                            let reasonMessage = `Recording Stop Failed: ${reason}; the recording is currently ${recordState}`;
                            showAlert?.({ message: reasonMessage, type: 'danger' });
                            recAttempt = false;
                        }
                        resolve();
                    });
                });
                try {
                    if (recAttempt && whiteboardStarted && !whiteboardEnded) {
                        if (recordingMediaOptions === 'video') {
                            captureCanvasStream({ parameters, start: false });
                        }
                    }
                }
                catch (error) {
                    console.log('Error capturing canvas stream:', error);
                }
            }
            else {
                return;
            }
        }
        else {
            showAlert?.({ message: 'Recording is not started yet or already stopped', type: 'danger' });
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StopRecording, deps: [{ token: i1.RecordPauseTimer }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StopRecording, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StopRecording, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.RecordPauseTimer }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcC1yZWNvcmRpbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3JlY29yZGluZy1tZXRob2RzL3N0b3AtcmVjb3JkaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBc0MzQyxNQUFNLE9BQU8sYUFBYTtJQUNKO0lBQXBCLFlBQW9CLHVCQUF5QztRQUF6Qyw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQWtCO0lBQUcsQ0FBQztJQUVqRSxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQUUsVUFBVSxFQUF3QjtRQUN0RCxJQUFJLEVBQ0YsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLFNBQVMsRUFDVCxhQUFhLEVBQ2IsWUFBWSxFQUNaLGFBQWEsRUFDYixrQkFBa0IsRUFDbEIsbUJBQW1CLEVBQ25CLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsdUJBQXVCLEVBRXZCLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YscUJBQXFCO1FBRXJCLG9CQUFvQjtRQUNwQixtQkFBbUIsR0FDcEIsR0FBRyxVQUFVLENBQUM7UUFFZixJQUFJLFVBQVUsQ0FBQztRQUVmLElBQUksYUFBYSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDcEMsSUFBSSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsdUJBQXVCLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzdELElBQUksRUFBRSxJQUFJO2dCQUNWLGNBQWMsRUFBRSxVQUFVLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzVDLGNBQWMsRUFBRSxVQUFVLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzVDLFNBQVMsRUFBRSxVQUFVLENBQUMsU0FBUzthQUNoQyxDQUFDLENBQUM7WUFFSCxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNULElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQztnQkFFMUIsTUFBTSxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUNsQyxNQUFNLENBQUMsSUFBSSxDQUNULE1BQU0sRUFDTixFQUFFLFFBQVEsRUFBRSxFQUNaLENBQUMsRUFDQyxPQUFPLEVBQ1AsTUFBTSxFQUNOLFdBQVcsR0FLWixFQUFFLEVBQUU7d0JBQ0gsSUFBSSxPQUFPLEVBQUUsQ0FBQzs0QkFDWixXQUFXLEdBQUcsS0FBSyxDQUFDOzRCQUNwQixTQUFTLEdBQUcsSUFBSSxDQUFDOzRCQUNqQixZQUFZLEdBQUcsS0FBSyxDQUFDOzRCQUNyQixhQUFhLEdBQUcsSUFBSSxDQUFDOzRCQUNyQixVQUFVLEdBQUcsSUFBSSxDQUFDOzRCQUVsQixpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQzs0QkFDL0IsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUMzQixrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQzs0QkFDakMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7NEJBQ25DLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDOzRCQUMvRCx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDakMsQ0FBQzs2QkFBTSxDQUFDOzRCQUNOLElBQUksYUFBYSxHQUFHLDBCQUEwQixNQUFNLGdDQUFnQyxXQUFXLEVBQUUsQ0FBQzs0QkFDbEcsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDOzRCQUN4RCxVQUFVLEdBQUcsS0FBSyxDQUFDO3dCQUNyQixDQUFDO3dCQUVELE9BQU8sRUFBRSxDQUFDO29CQUNaLENBQUMsQ0FDRixDQUFDO2dCQUNKLENBQUMsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQztvQkFDSCxJQUFJLFVBQVUsSUFBSSxpQkFBaUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO3dCQUN4RCxJQUFJLHFCQUFxQixLQUFLLE9BQU8sRUFBRSxDQUFDOzRCQUN0QyxtQkFBbUIsQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzt3QkFDcEQsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUM7Z0JBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztvQkFDZixPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN2RCxDQUFDO1lBQ0gsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE9BQU87WUFDVCxDQUFDO1FBQ0gsQ0FBQzthQUFNLENBQUM7WUFDTixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxpREFBaUQsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUM5RixDQUFDO0lBQ0gsQ0FBQzt1R0E1RlUsYUFBYTsyR0FBYixhQUFhLGNBRlosTUFBTTs7MkZBRVAsYUFBYTtrQkFIekIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWNvcmRQYXVzZVRpbWVyIH0gZnJvbSAnLi9yZWNvcmQtcGF1c2UtdGltZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTaG93QWxlcnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0b3BSZWNvcmRpbmdQYXJhbWV0ZXJzIHtcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgc29ja2V0OiBhbnk7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgc3RhcnRSZXBvcnQ6IGJvb2xlYW47XG4gIGVuZFJlcG9ydDogYm9vbGVhbjtcbiAgcmVjb3JkU3RhcnRlZDogYm9vbGVhbjtcbiAgcmVjb3JkUGF1c2VkOiBib29sZWFuO1xuICByZWNvcmRTdG9wcGVkOiBib29sZWFuO1xuICB1cGRhdGVSZWNvcmRQYXVzZWQ6IChwYXVzZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVJlY29yZFN0b3BwZWQ6IChzdG9wcGVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVTdGFydFJlcG9ydDogKHN0YXJ0UmVwb3J0OiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVFbmRSZXBvcnQ6IChlbmRSZXBvcnQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVNob3dSZWNvcmRCdXR0b25zOiAoc2hvdzogYm9vbGVhbikgPT4gdm9pZDtcbiAgd2hpdGVib2FyZFN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHdoaXRlYm9hcmRFbmRlZDogYm9vbGVhbjtcbiAgcmVjb3JkaW5nTWVkaWFPcHRpb25zOiBzdHJpbmc7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIGNhcHR1cmVDYW52YXNTdHJlYW06IChvcHRpb25zOiB7IHBhcmFtZXRlcnM6IGFueTsgc3RhcnQ/OiBib29sZWFuIH0pID0+IHZvaWQ7XG5cbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0b3BSZWNvcmRpbmdPcHRpb25zIHtcbiAgcGFyYW1ldGVyczogU3RvcFJlY29yZGluZ1BhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFN0b3BSZWNvcmRpbmdUeXBlID0gKG9wdGlvbnM6IFN0b3BSZWNvcmRpbmdPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU3RvcFJlY29yZGluZyB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgUmVjb3JkUGF1c2VUaW1lclNlcnZpY2U6IFJlY29yZFBhdXNlVGltZXIpIHt9XG5cbiAgYXN5bmMgc3RvcFJlY29yZGluZyh7IHBhcmFtZXRlcnMgfTogU3RvcFJlY29yZGluZ09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQge1xuICAgICAgcm9vbU5hbWUsXG4gICAgICBzb2NrZXQsXG4gICAgICBzaG93QWxlcnQsXG4gICAgICBzdGFydFJlcG9ydCxcbiAgICAgIGVuZFJlcG9ydCxcbiAgICAgIHJlY29yZFN0YXJ0ZWQsXG4gICAgICByZWNvcmRQYXVzZWQsXG4gICAgICByZWNvcmRTdG9wcGVkLFxuICAgICAgdXBkYXRlUmVjb3JkUGF1c2VkLFxuICAgICAgdXBkYXRlUmVjb3JkU3RvcHBlZCxcbiAgICAgIHVwZGF0ZVN0YXJ0UmVwb3J0LFxuICAgICAgdXBkYXRlRW5kUmVwb3J0LFxuICAgICAgdXBkYXRlU2hvd1JlY29yZEJ1dHRvbnMsXG5cbiAgICAgIHdoaXRlYm9hcmRTdGFydGVkLFxuICAgICAgd2hpdGVib2FyZEVuZGVkLFxuICAgICAgcmVjb3JkaW5nTWVkaWFPcHRpb25zLFxuXG4gICAgICAvL21lZGlhc2Z1IGZ1bmN0aW9uc1xuICAgICAgY2FwdHVyZUNhbnZhc1N0cmVhbSxcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIGxldCByZWNBdHRlbXB0O1xuXG4gICAgaWYgKHJlY29yZFN0YXJ0ZWQgJiYgIXJlY29yZFN0b3BwZWQpIHtcbiAgICAgIGxldCBzdG9wID0gYXdhaXQgdGhpcy5SZWNvcmRQYXVzZVRpbWVyU2VydmljZS5yZWNvcmRQYXVzZVRpbWVyKHtcbiAgICAgICAgc3RvcDogdHJ1ZSxcbiAgICAgICAgaXNUaW1lclJ1bm5pbmc6IHBhcmFtZXRlcnNbJ2lzVGltZXJSdW5uaW5nJ10sXG4gICAgICAgIGNhblBhdXNlUmVzdW1lOiBwYXJhbWV0ZXJzWydjYW5QYXVzZVJlc3VtZSddLFxuICAgICAgICBzaG93QWxlcnQ6IHBhcmFtZXRlcnMuc2hvd0FsZXJ0LFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChzdG9wKSB7XG4gICAgICAgIGxldCBhY3Rpb24gPSAnc3RvcFJlY29yZCc7XG5cbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcbiAgICAgICAgICBzb2NrZXQuZW1pdChcbiAgICAgICAgICAgIGFjdGlvbixcbiAgICAgICAgICAgIHsgcm9vbU5hbWUgfSxcbiAgICAgICAgICAgICh7XG4gICAgICAgICAgICAgIHN1Y2Nlc3MsXG4gICAgICAgICAgICAgIHJlYXNvbixcbiAgICAgICAgICAgICAgcmVjb3JkU3RhdGUsXG4gICAgICAgICAgICB9OiB7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGJvb2xlYW47XG4gICAgICAgICAgICAgIHJlYXNvbjogc3RyaW5nO1xuICAgICAgICAgICAgICByZWNvcmRTdGF0ZTogc3RyaW5nO1xuICAgICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHN0YXJ0UmVwb3J0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZW5kUmVwb3J0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZWNvcmRQYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZWNvcmRTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZWNBdHRlbXB0ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHVwZGF0ZVN0YXJ0UmVwb3J0KHN0YXJ0UmVwb3J0KTtcbiAgICAgICAgICAgICAgICB1cGRhdGVFbmRSZXBvcnQoZW5kUmVwb3J0KTtcbiAgICAgICAgICAgICAgICB1cGRhdGVSZWNvcmRQYXVzZWQocmVjb3JkUGF1c2VkKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVSZWNvcmRTdG9wcGVkKHJlY29yZFN0b3BwZWQpO1xuICAgICAgICAgICAgICAgIHNob3dBbGVydD8uKHsgbWVzc2FnZTogJ1JlY29yZGluZyBTdG9wcGVkJywgdHlwZTogJ3N1Y2Nlc3MnIH0pO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVNob3dSZWNvcmRCdXR0b25zKGZhbHNlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVhc29uTWVzc2FnZSA9IGBSZWNvcmRpbmcgU3RvcCBGYWlsZWQ6ICR7cmVhc29ufTsgdGhlIHJlY29yZGluZyBpcyBjdXJyZW50bHkgJHtyZWNvcmRTdGF0ZX1gO1xuICAgICAgICAgICAgICAgIHNob3dBbGVydD8uKHsgbWVzc2FnZTogcmVhc29uTWVzc2FnZSwgdHlwZTogJ2RhbmdlcicgfSk7XG4gICAgICAgICAgICAgICAgcmVjQXR0ZW1wdCA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChyZWNBdHRlbXB0ICYmIHdoaXRlYm9hcmRTdGFydGVkICYmICF3aGl0ZWJvYXJkRW5kZWQpIHtcbiAgICAgICAgICAgIGlmIChyZWNvcmRpbmdNZWRpYU9wdGlvbnMgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICAgICAgY2FwdHVyZUNhbnZhc1N0cmVhbSh7IHBhcmFtZXRlcnMsIHN0YXJ0OiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGNhcHR1cmluZyBjYW52YXMgc3RyZWFtOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzaG93QWxlcnQ/Lih7IG1lc3NhZ2U6ICdSZWNvcmRpbmcgaXMgbm90IHN0YXJ0ZWQgeWV0IG9yIGFscmVhZHkgc3RvcHBlZCcsIHR5cGU6ICdkYW5nZXInIH0pO1xuICAgIH1cbiAgfVxufVxuIl19