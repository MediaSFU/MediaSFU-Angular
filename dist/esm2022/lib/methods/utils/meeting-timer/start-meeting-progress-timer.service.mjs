// start-meeting-progress-timer.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class StartMeetingProgressTimer {
    timeProgress;
    /**
     * Starts a timer to track the progress of a meeting.
     *
     * @param {Object} options - The options for starting the meeting progress timer.
     * @param {number} options.startTime - The custom start time for the meeting progress timer.
     * @param {Object} options.parameters - The parameters required for updating the meeting progress.
     * @param {Function} options.parameters.updateMeetingProgressTime - Function to update the meeting progress time.
     * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     *
     * @returns {void}
     */
    startMeetingProgressTimer = ({ startTime, parameters, }) => {
        let { updateMeetingProgressTime, getUpdatedAllParams } = parameters;
        const calculateElapsedTime = (startTime) => {
            const currentTime = Math.floor(new Date().getTime() / 1000);
            return currentTime - startTime;
        };
        const padNumber = (number) => {
            return number.toString().padStart(2, '0');
        };
        const formatTime = (time) => {
            const hours = Math.floor(time / 3600);
            const minutes = Math.floor((time % 3600) / 60);
            const seconds = (time % 60).toFixed(0).padStart(2, '0');
            return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(Number(seconds))}`;
        };
        let elapsedTime = calculateElapsedTime(startTime);
        this.timeProgress = setInterval(async () => {
            elapsedTime++;
            const formattedTime = formatTime(elapsedTime);
            updateMeetingProgressTime(formattedTime);
            parameters = getUpdatedAllParams();
            if (!parameters.validated || !parameters.roomName) {
                clearInterval(this.timeProgress);
                this.timeProgress = null;
            }
        }, 1000);
    };
    stopMeetingProgressTimer = () => {
        if (this.timeProgress) {
            clearInterval(this.timeProgress);
            this.timeProgress = null;
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StartMeetingProgressTimer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StartMeetingProgressTimer, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StartMeetingProgressTimer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQtbWVldGluZy1wcm9ncmVzcy10aW1lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvdXRpbHMvbWVldGluZy10aW1lci9zdGFydC1tZWV0aW5nLXByb2dyZXNzLXRpbWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMENBQTBDO0FBQzFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBc0IzQyxNQUFNLE9BQU8seUJBQXlCO0lBQzVCLFlBQVksQ0FBTTtJQUUxQjs7Ozs7Ozs7OztPQVVHO0lBRUgseUJBQXlCLEdBQUcsQ0FBQyxFQUMzQixTQUFTLEVBQ1QsVUFBVSxHQUN1QixFQUFRLEVBQUU7UUFDM0MsSUFBSSxFQUFFLHlCQUF5QixFQUFFLG1CQUFtQixFQUFFLEdBQUcsVUFBVSxDQUFDO1FBRXBFLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxTQUFpQixFQUFVLEVBQUU7WUFDekQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQzVELE9BQU8sV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUNqQyxDQUFDLENBQUM7UUFFRixNQUFNLFNBQVMsR0FBRyxDQUFDLE1BQWMsRUFBVSxFQUFFO1lBQzNDLE9BQU8sTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDO1FBRUYsTUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFZLEVBQVUsRUFBRTtZQUMxQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztZQUN0QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQy9DLE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3hELE9BQU8sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ25GLENBQUMsQ0FBQztRQUVGLElBQUksV0FBVyxHQUFHLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWxELElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3pDLFdBQVcsRUFBRSxDQUFDO1lBQ2QsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzlDLHlCQUF5QixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRXpDLFVBQVUsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1lBRW5DLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNsRCxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUMzQixDQUFDO1FBQ0gsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxDQUFDO0lBRUYsd0JBQXdCLEdBQUcsR0FBUyxFQUFFO1FBQ3BDLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3RCLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDM0IsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0ExRFMseUJBQXlCOzJHQUF6Qix5QkFBeUIsY0FGeEIsTUFBTTs7MkZBRVAseUJBQXlCO2tCQUhyQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHN0YXJ0LW1lZXRpbmctcHJvZ3Jlc3MtdGltZXIuc2VydmljZS50c1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZXhwb3J0IGludGVyZmFjZSBTdGFydE1lZXRpbmdQcm9ncmVzc1RpbWVyUGFyYW1ldGVycyB7XG4gIHVwZGF0ZU1lZXRpbmdQcm9ncmVzc1RpbWU6IChmb3JtYXR0ZWRUaW1lOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHZhbGlkYXRlZDogYm9vbGVhbjtcbiAgcm9vbU5hbWU6IHN0cmluZztcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gU3RhcnRNZWV0aW5nUHJvZ3Jlc3NUaW1lclBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdGFydE1lZXRpbmdQcm9ncmVzc1RpbWVyT3B0aW9ucyB7XG4gIHN0YXJ0VGltZTogbnVtYmVyO1xuICBwYXJhbWV0ZXJzOiBTdGFydE1lZXRpbmdQcm9ncmVzc1RpbWVyUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgU3RhcnRNZWV0aW5nUHJvZ3Jlc3NUaW1lclR5cGUgPSAob3B0aW9uczogU3RhcnRNZWV0aW5nUHJvZ3Jlc3NUaW1lck9wdGlvbnMpID0+IHZvaWQ7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBTdGFydE1lZXRpbmdQcm9ncmVzc1RpbWVyIHtcbiAgcHJpdmF0ZSB0aW1lUHJvZ3Jlc3M6IGFueTtcblxuICAvKipcbiAgICogU3RhcnRzIGEgdGltZXIgdG8gdHJhY2sgdGhlIHByb2dyZXNzIG9mIGEgbWVldGluZy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3Igc3RhcnRpbmcgdGhlIG1lZXRpbmcgcHJvZ3Jlc3MgdGltZXIuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnN0YXJ0VGltZSAtIFRoZSBjdXN0b20gc3RhcnQgdGltZSBmb3IgdGhlIG1lZXRpbmcgcHJvZ3Jlc3MgdGltZXIuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3IgdXBkYXRpbmcgdGhlIG1lZXRpbmcgcHJvZ3Jlc3MuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVNZWV0aW5nUHJvZ3Jlc3NUaW1lIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBtZWV0aW5nIHByb2dyZXNzIHRpbWUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zIC0gRnVuY3Rpb24gdG8gZ2V0IHVwZGF0ZWQgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuXG4gIHN0YXJ0TWVldGluZ1Byb2dyZXNzVGltZXIgPSAoe1xuICAgIHN0YXJ0VGltZSxcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBTdGFydE1lZXRpbmdQcm9ncmVzc1RpbWVyT3B0aW9ucyk6IHZvaWQgPT4ge1xuICAgIGxldCB7IHVwZGF0ZU1lZXRpbmdQcm9ncmVzc1RpbWUsIGdldFVwZGF0ZWRBbGxQYXJhbXMgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICBjb25zdCBjYWxjdWxhdGVFbGFwc2VkVGltZSA9IChzdGFydFRpbWU6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50VGltZSA9IE1hdGguZmxvb3IobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKTtcbiAgICAgIHJldHVybiBjdXJyZW50VGltZSAtIHN0YXJ0VGltZTtcbiAgICB9O1xuXG4gICAgY29uc3QgcGFkTnVtYmVyID0gKG51bWJlcjogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgICAgIHJldHVybiBudW1iZXIudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xuICAgIH07XG5cbiAgICBjb25zdCBmb3JtYXRUaW1lID0gKHRpbWU6IG51bWJlcik6IHN0cmluZyA9PiB7XG4gICAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IodGltZSAvIDM2MDApO1xuICAgICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHRpbWUgJSAzNjAwKSAvIDYwKTtcbiAgICAgIGNvbnN0IHNlY29uZHMgPSAodGltZSAlIDYwKS50b0ZpeGVkKDApLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgICByZXR1cm4gYCR7cGFkTnVtYmVyKGhvdXJzKX06JHtwYWROdW1iZXIobWludXRlcyl9OiR7cGFkTnVtYmVyKE51bWJlcihzZWNvbmRzKSl9YDtcbiAgICB9O1xuXG4gICAgbGV0IGVsYXBzZWRUaW1lID0gY2FsY3VsYXRlRWxhcHNlZFRpbWUoc3RhcnRUaW1lKTtcblxuICAgIHRoaXMudGltZVByb2dyZXNzID0gc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xuICAgICAgZWxhcHNlZFRpbWUrKztcbiAgICAgIGNvbnN0IGZvcm1hdHRlZFRpbWUgPSBmb3JtYXRUaW1lKGVsYXBzZWRUaW1lKTtcbiAgICAgIHVwZGF0ZU1lZXRpbmdQcm9ncmVzc1RpbWUoZm9ybWF0dGVkVGltZSk7XG5cbiAgICAgIHBhcmFtZXRlcnMgPSBnZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICAgIGlmICghcGFyYW1ldGVycy52YWxpZGF0ZWQgfHwgIXBhcmFtZXRlcnMucm9vbU5hbWUpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVQcm9ncmVzcyk7XG4gICAgICAgIHRoaXMudGltZVByb2dyZXNzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9LCAxMDAwKTtcbiAgfTtcblxuICBzdG9wTWVldGluZ1Byb2dyZXNzVGltZXIgPSAoKTogdm9pZCA9PiB7XG4gICAgaWYgKHRoaXMudGltZVByb2dyZXNzKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMudGltZVByb2dyZXNzKTtcbiAgICAgIHRoaXMudGltZVByb2dyZXNzID0gbnVsbDtcbiAgICB9XG4gIH07XG59XG4iXX0=