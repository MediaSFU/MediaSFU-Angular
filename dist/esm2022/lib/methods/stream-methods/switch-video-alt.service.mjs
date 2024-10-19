import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class SwitchVideoAlt {
    async switchVideoAlt({ parameters }) {
        let { recordStarted, recordResumed, recordStopped, recordPaused, recordingMediaOptions, videoAlreadyOn, currentFacingMode, allowed, audioOnlyRoom, updateCurrentFacingMode, updateIsMediaSettingsModalVisible, showAlert, 
        //media functions
        switchUserVideoAlt, } = parameters;
        if (audioOnlyRoom) {
            showAlert?.({
                message: 'You cannot turn on your camera in an audio-only event.',
                type: 'danger',
                duration: 3000,
            });
            return;
        }
        let checkoff = false;
        if ((recordStarted || recordResumed) &&
            !recordStopped &&
            !recordPaused &&
            recordingMediaOptions === 'video') {
            checkoff = true;
        }
        if (!allowed) {
            showAlert?.({
                message: 'Allow access to your camera by starting it for the first time.',
                type: 'danger',
                duration: 3000,
            });
            return;
        }
        if (checkoff) {
            if (videoAlreadyOn) {
                showAlert?.({
                    message: 'Please turn off your video before switching.',
                    type: 'danger',
                    duration: 3000,
                });
                return;
            }
        }
        else {
            if (!videoAlreadyOn) {
                showAlert?.({
                    message: 'Please turn on your video before switching.',
                    type: 'danger',
                    duration: 3000,
                });
                return;
            }
        }
        // Camera switching logic here
        let newFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
        updateCurrentFacingMode(newFacingMode);
        updateIsMediaSettingsModalVisible(false);
        await switchUserVideoAlt({ videoPreference: newFacingMode, checkoff, parameters });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchVideoAlt, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchVideoAlt, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SwitchVideoAlt, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLXZpZGVvLWFsdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvc3RyZWFtLW1ldGhvZHMvc3dpdGNoLXZpZGVvLWFsdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBb0MzQyxNQUFNLE9BQU8sY0FBYztJQUN6QixLQUFLLENBQUMsY0FBYyxDQUFDLEVBQUUsVUFBVSxFQUF5QjtRQUN4RCxJQUFJLEVBQ0YsYUFBYSxFQUNiLGFBQWEsRUFDYixhQUFhLEVBQ2IsWUFBWSxFQUNaLHFCQUFxQixFQUNyQixjQUFjLEVBQ2QsaUJBQWlCLEVBQ2pCLE9BQU8sRUFDUCxhQUFhLEVBQ2IsdUJBQXVCLEVBQ3ZCLGlDQUFpQyxFQUVqQyxTQUFTO1FBRVQsaUJBQWlCO1FBQ2pCLGtCQUFrQixHQUNuQixHQUFHLFVBQVUsQ0FBQztRQUVmLElBQUksYUFBYSxFQUFFLENBQUM7WUFDbEIsU0FBUyxFQUFFLENBQUM7Z0JBQ1YsT0FBTyxFQUFFLHdEQUF3RDtnQkFDakUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDZixDQUFDLENBQUM7WUFDSCxPQUFPO1FBQ1QsQ0FBQztRQUVELElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUNFLENBQUMsYUFBYSxJQUFJLGFBQWEsQ0FBQztZQUNoQyxDQUFDLGFBQWE7WUFDZCxDQUFDLFlBQVk7WUFDYixxQkFBcUIsS0FBSyxPQUFPLEVBQ2pDLENBQUM7WUFDRCxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLENBQUM7UUFFRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDYixTQUFTLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsZ0VBQWdFO2dCQUN6RSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztZQUNILE9BQU87UUFDVCxDQUFDO1FBRUQsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNiLElBQUksY0FBYyxFQUFFLENBQUM7Z0JBQ25CLFNBQVMsRUFBRSxDQUFDO29CQUNWLE9BQU8sRUFBRSw4Q0FBOEM7b0JBQ3ZELElBQUksRUFBRSxRQUFRO29CQUNkLFFBQVEsRUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FBQztnQkFDSCxPQUFPO1lBQ1QsQ0FBQztRQUNILENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUNwQixTQUFTLEVBQUUsQ0FBQztvQkFDVixPQUFPLEVBQUUsNkNBQTZDO29CQUN0RCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxRQUFRLEVBQUUsSUFBSTtpQkFDZixDQUFDLENBQUM7Z0JBQ0gsT0FBTztZQUNULENBQUM7UUFDSCxDQUFDO1FBRUQsOEJBQThCO1FBQzlCLElBQUksYUFBYSxHQUFHLGlCQUFpQixLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7UUFFakYsdUJBQXVCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkMsaUNBQWlDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFekMsTUFBTSxrQkFBa0IsQ0FBQyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDckYsQ0FBQzt1R0E1RVUsY0FBYzsyR0FBZCxjQUFjLGNBRmIsTUFBTTs7MkZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaG93QWxlcnQsIFN3aXRjaFVzZXJWaWRlb0FsdFR5cGUsIFN3aXRjaFVzZXJWaWRlb1BhcmFtZXRlcnMgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN3aXRjaFZpZGVvQWx0UGFyYW1ldGVycyBleHRlbmRzIFN3aXRjaFVzZXJWaWRlb1BhcmFtZXRlcnMge1xuICByZWNvcmRTdGFydGVkOiBib29sZWFuO1xuICByZWNvcmRSZXN1bWVkOiBib29sZWFuO1xuICByZWNvcmRTdG9wcGVkOiBib29sZWFuO1xuICByZWNvcmRQYXVzZWQ6IGJvb2xlYW47XG4gIHJlY29yZGluZ01lZGlhT3B0aW9uczogc3RyaW5nO1xuICB2aWRlb0FscmVhZHlPbjogYm9vbGVhbjtcbiAgY3VycmVudEZhY2luZ01vZGU6IHN0cmluZztcbiAgcHJldkZhY2luZ01vZGU6IHN0cmluZztcbiAgYWxsb3dlZDogYm9vbGVhbjtcbiAgYXVkaW9Pbmx5Um9vbTogYm9vbGVhbjtcbiAgdXBkYXRlQ3VycmVudEZhY2luZ01vZGU6IChtb2RlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZVByZXZGYWNpbmdNb2RlOiAobW9kZTogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGU6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgc3dpdGNoVXNlclZpZGVvQWx0OiBTd2l0Y2hVc2VyVmlkZW9BbHRUeXBlO1xuXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFN3aXRjaFZpZGVvQWx0UGFyYW1ldGVycztcbiAgLy8gW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN3aXRjaFZpZGVvQWx0T3B0aW9ucyB7XG4gIHBhcmFtZXRlcnM6IFN3aXRjaFZpZGVvQWx0UGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgU3dpdGNoVmlkZW9BbHRUeXBlID0gKG9wdGlvbnM6IFN3aXRjaFZpZGVvQWx0T3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFN3aXRjaFZpZGVvQWx0IHtcbiAgYXN5bmMgc3dpdGNoVmlkZW9BbHQoeyBwYXJhbWV0ZXJzIH06IFN3aXRjaFZpZGVvQWx0T3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB7XG4gICAgICByZWNvcmRTdGFydGVkLFxuICAgICAgcmVjb3JkUmVzdW1lZCxcbiAgICAgIHJlY29yZFN0b3BwZWQsXG4gICAgICByZWNvcmRQYXVzZWQsXG4gICAgICByZWNvcmRpbmdNZWRpYU9wdGlvbnMsXG4gICAgICB2aWRlb0FscmVhZHlPbixcbiAgICAgIGN1cnJlbnRGYWNpbmdNb2RlLFxuICAgICAgYWxsb3dlZCxcbiAgICAgIGF1ZGlvT25seVJvb20sXG4gICAgICB1cGRhdGVDdXJyZW50RmFjaW5nTW9kZSxcbiAgICAgIHVwZGF0ZUlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZSxcblxuICAgICAgc2hvd0FsZXJ0LFxuXG4gICAgICAvL21lZGlhIGZ1bmN0aW9uc1xuICAgICAgc3dpdGNoVXNlclZpZGVvQWx0LFxuICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgaWYgKGF1ZGlvT25seVJvb20pIHtcbiAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ1lvdSBjYW5ub3QgdHVybiBvbiB5b3VyIGNhbWVyYSBpbiBhbiBhdWRpby1vbmx5IGV2ZW50LicsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBjaGVja29mZiA9IGZhbHNlO1xuICAgIGlmIChcbiAgICAgIChyZWNvcmRTdGFydGVkIHx8IHJlY29yZFJlc3VtZWQpICYmXG4gICAgICAhcmVjb3JkU3RvcHBlZCAmJlxuICAgICAgIXJlY29yZFBhdXNlZCAmJlxuICAgICAgcmVjb3JkaW5nTWVkaWFPcHRpb25zID09PSAndmlkZW8nXG4gICAgKSB7XG4gICAgICBjaGVja29mZiA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCFhbGxvd2VkKSB7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdBbGxvdyBhY2Nlc3MgdG8geW91ciBjYW1lcmEgYnkgc3RhcnRpbmcgaXQgZm9yIHRoZSBmaXJzdCB0aW1lLicsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjaGVja29mZikge1xuICAgICAgaWYgKHZpZGVvQWxyZWFkeU9uKSB7XG4gICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICBtZXNzYWdlOiAnUGxlYXNlIHR1cm4gb2ZmIHlvdXIgdmlkZW8gYmVmb3JlIHN3aXRjaGluZy4nLFxuICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXZpZGVvQWxyZWFkeU9uKSB7XG4gICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICBtZXNzYWdlOiAnUGxlYXNlIHR1cm4gb24geW91ciB2aWRlbyBiZWZvcmUgc3dpdGNoaW5nLicsXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2FtZXJhIHN3aXRjaGluZyBsb2dpYyBoZXJlXG4gICAgbGV0IG5ld0ZhY2luZ01vZGUgPSBjdXJyZW50RmFjaW5nTW9kZSA9PT0gJ2Vudmlyb25tZW50JyA/ICd1c2VyJyA6ICdlbnZpcm9ubWVudCc7XG5cbiAgICB1cGRhdGVDdXJyZW50RmFjaW5nTW9kZShuZXdGYWNpbmdNb2RlKTtcbiAgICB1cGRhdGVJc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUoZmFsc2UpO1xuXG4gICAgYXdhaXQgc3dpdGNoVXNlclZpZGVvQWx0KHsgdmlkZW9QcmVmZXJlbmNlOiBuZXdGYWNpbmdNb2RlLCBjaGVja29mZiwgcGFyYW1ldGVycyB9KTtcbiAgfVxufVxuIl19