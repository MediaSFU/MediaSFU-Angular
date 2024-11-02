// start-meeting-progress-timer.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Starts a timer to track the progress of a meeting.
 *
 * @param {StartMeetingProgressTimerOptions} options - The options for starting the meeting progress timer.
 * @param {number} options.startTime - The custom start time for the meeting progress timer in seconds since epoch.
 * @param {StartMeetingProgressTimerParameters} options.parameters - The parameters required for updating the meeting progress.
 * @param {Function} options.parameters.updateMeetingProgressTime - Function to update the formatted meeting progress time.
 * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
 *
 * @returns {void}
 *
 * @remarks
 * This function calculates the elapsed time since the meeting started and updates the meeting progress every second.
 * The timer will stop if the validated flag is set to false or if the room name is not valid.
 *
 * The time is formatted in HH:MM:SS format, and the update function is called with the formatted time.
 *
 * @example
 * ```typescript
 * const options: StartMeetingProgressTimerOptions = {
 *   startTime: Math.floor(Date.now() / 1000), // Current time in seconds
 *   parameters: {
 *     updateMeetingProgressTime: (formattedTime) => console.log(`Meeting Progress: ${formattedTime}`),
 *     validated: true,
 *     roomName: 'Room123',
 *     getUpdatedAllParams: () => ({
 *       validated: true,
 *       roomName: 'Room123',
 *       updateMeetingProgressTime: options.parameters.updateMeetingProgressTime,
 *     }),
 *   },
 * };
 *
 * const timerService = new StartMeetingProgressTimer();
 * timerService.startMeetingProgressTimer(options);
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQtbWVldGluZy1wcm9ncmVzcy10aW1lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvdXRpbHMvbWVldGluZy10aW1lci9zdGFydC1tZWV0aW5nLXByb2dyZXNzLXRpbWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMENBQTBDO0FBQzFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBbUIzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0NHO0FBTUgsTUFBTSxPQUFPLHlCQUF5QjtJQUM1QixZQUFZLENBQU07SUFFMUI7Ozs7Ozs7Ozs7T0FVRztJQUVILHlCQUF5QixHQUFHLENBQUMsRUFDM0IsU0FBUyxFQUNULFVBQVUsR0FDdUIsRUFBUSxFQUFFO1FBQzNDLElBQUksRUFBRSx5QkFBeUIsRUFBRSxtQkFBbUIsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUVwRSxNQUFNLG9CQUFvQixHQUFHLENBQUMsU0FBaUIsRUFBVSxFQUFFO1lBQ3pELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUM1RCxPQUFPLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFDakMsQ0FBQyxDQUFDO1FBRUYsTUFBTSxTQUFTLEdBQUcsQ0FBQyxNQUFjLEVBQVUsRUFBRTtZQUMzQyxPQUFPLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQztRQUVGLE1BQU0sVUFBVSxHQUFHLENBQUMsSUFBWSxFQUFVLEVBQUU7WUFDMUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDdEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUMvQyxNQUFNLE9BQU8sR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN4RCxPQUFPLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNuRixDQUFDLENBQUM7UUFFRixJQUFJLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUN6QyxXQUFXLEVBQUUsQ0FBQztZQUNkLE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM5Qyx5QkFBeUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUV6QyxVQUFVLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztZQUVuQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDbEQsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDM0IsQ0FBQztRQUNILENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNYLENBQUMsQ0FBQztJQUVGLHdCQUF3QixHQUFHLEdBQVMsRUFBRTtRQUNwQyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN0QixhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQzNCLENBQUM7SUFDSCxDQUFDLENBQUM7dUdBMURTLHlCQUF5QjsyR0FBekIseUJBQXlCLGNBRnhCLE1BQU07OzJGQUVQLHlCQUF5QjtrQkFIckMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzdGFydC1tZWV0aW5nLXByb2dyZXNzLXRpbWVyLnNlcnZpY2UudHNcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmV4cG9ydCBpbnRlcmZhY2UgU3RhcnRNZWV0aW5nUHJvZ3Jlc3NUaW1lclBhcmFtZXRlcnMge1xuICB1cGRhdGVNZWV0aW5nUHJvZ3Jlc3NUaW1lOiAoZm9ybWF0dGVkVGltZTogc3RyaW5nKSA9PiB2b2lkO1xuICB2YWxpZGF0ZWQ6IGJvb2xlYW47XG4gIHJvb21OYW1lOiBzdHJpbmc7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFN0YXJ0TWVldGluZ1Byb2dyZXNzVGltZXJQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhcnRNZWV0aW5nUHJvZ3Jlc3NUaW1lck9wdGlvbnMge1xuICBzdGFydFRpbWU6IG51bWJlcjtcbiAgcGFyYW1ldGVyczogU3RhcnRNZWV0aW5nUHJvZ3Jlc3NUaW1lclBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFN0YXJ0TWVldGluZ1Byb2dyZXNzVGltZXJUeXBlID0gKG9wdGlvbnM6IFN0YXJ0TWVldGluZ1Byb2dyZXNzVGltZXJPcHRpb25zKSA9PiB2b2lkO1xuXG4vKipcbiAqIFN0YXJ0cyBhIHRpbWVyIHRvIHRyYWNrIHRoZSBwcm9ncmVzcyBvZiBhIG1lZXRpbmcuXG4gKlxuICogQHBhcmFtIHtTdGFydE1lZXRpbmdQcm9ncmVzc1RpbWVyT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBzdGFydGluZyB0aGUgbWVldGluZyBwcm9ncmVzcyB0aW1lci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnN0YXJ0VGltZSAtIFRoZSBjdXN0b20gc3RhcnQgdGltZSBmb3IgdGhlIG1lZXRpbmcgcHJvZ3Jlc3MgdGltZXIgaW4gc2Vjb25kcyBzaW5jZSBlcG9jaC5cbiAqIEBwYXJhbSB7U3RhcnRNZWV0aW5nUHJvZ3Jlc3NUaW1lclBhcmFtZXRlcnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciB1cGRhdGluZyB0aGUgbWVldGluZyBwcm9ncmVzcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVNZWV0aW5nUHJvZ3Jlc3NUaW1lIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBmb3JtYXR0ZWQgbWVldGluZyBwcm9ncmVzcyB0aW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMgLSBGdW5jdGlvbiB0byBnZXQgdXBkYXRlZCBwYXJhbWV0ZXJzLlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICpcbiAqIEByZW1hcmtzXG4gKiBUaGlzIGZ1bmN0aW9uIGNhbGN1bGF0ZXMgdGhlIGVsYXBzZWQgdGltZSBzaW5jZSB0aGUgbWVldGluZyBzdGFydGVkIGFuZCB1cGRhdGVzIHRoZSBtZWV0aW5nIHByb2dyZXNzIGV2ZXJ5IHNlY29uZC5cbiAqIFRoZSB0aW1lciB3aWxsIHN0b3AgaWYgdGhlIHZhbGlkYXRlZCBmbGFnIGlzIHNldCB0byBmYWxzZSBvciBpZiB0aGUgcm9vbSBuYW1lIGlzIG5vdCB2YWxpZC5cbiAqXG4gKiBUaGUgdGltZSBpcyBmb3JtYXR0ZWQgaW4gSEg6TU06U1MgZm9ybWF0LCBhbmQgdGhlIHVwZGF0ZSBmdW5jdGlvbiBpcyBjYWxsZWQgd2l0aCB0aGUgZm9ybWF0dGVkIHRpbWUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IG9wdGlvbnM6IFN0YXJ0TWVldGluZ1Byb2dyZXNzVGltZXJPcHRpb25zID0ge1xuICogICBzdGFydFRpbWU6IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApLCAvLyBDdXJyZW50IHRpbWUgaW4gc2Vjb25kc1xuICogICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgdXBkYXRlTWVldGluZ1Byb2dyZXNzVGltZTogKGZvcm1hdHRlZFRpbWUpID0+IGNvbnNvbGUubG9nKGBNZWV0aW5nIFByb2dyZXNzOiAke2Zvcm1hdHRlZFRpbWV9YCksXG4gKiAgICAgdmFsaWRhdGVkOiB0cnVlLFxuICogICAgIHJvb21OYW1lOiAnUm9vbTEyMycsXG4gKiAgICAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gKHtcbiAqICAgICAgIHZhbGlkYXRlZDogdHJ1ZSxcbiAqICAgICAgIHJvb21OYW1lOiAnUm9vbTEyMycsXG4gKiAgICAgICB1cGRhdGVNZWV0aW5nUHJvZ3Jlc3NUaW1lOiBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWVldGluZ1Byb2dyZXNzVGltZSxcbiAqICAgICB9KSxcbiAqICAgfSxcbiAqIH07XG4gKlxuICogY29uc3QgdGltZXJTZXJ2aWNlID0gbmV3IFN0YXJ0TWVldGluZ1Byb2dyZXNzVGltZXIoKTtcbiAqIHRpbWVyU2VydmljZS5zdGFydE1lZXRpbmdQcm9ncmVzc1RpbWVyKG9wdGlvbnMpO1xuICogYGBgXG4gKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU3RhcnRNZWV0aW5nUHJvZ3Jlc3NUaW1lciB7XG4gIHByaXZhdGUgdGltZVByb2dyZXNzOiBhbnk7XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBhIHRpbWVyIHRvIHRyYWNrIHRoZSBwcm9ncmVzcyBvZiBhIG1lZXRpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHN0YXJ0aW5nIHRoZSBtZWV0aW5nIHByb2dyZXNzIHRpbWVyLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5zdGFydFRpbWUgLSBUaGUgY3VzdG9tIHN0YXJ0IHRpbWUgZm9yIHRoZSBtZWV0aW5nIHByb2dyZXNzIHRpbWVyLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgcmVxdWlyZWQgZm9yIHVwZGF0aW5nIHRoZSBtZWV0aW5nIHByb2dyZXNzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWVldGluZ1Byb2dyZXNzVGltZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWVldGluZyBwcm9ncmVzcyB0aW1lLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcyAtIEZ1bmN0aW9uIHRvIGdldCB1cGRhdGVkIHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cblxuICBzdGFydE1lZXRpbmdQcm9ncmVzc1RpbWVyID0gKHtcbiAgICBzdGFydFRpbWUsXG4gICAgcGFyYW1ldGVycyxcbiAgfTogU3RhcnRNZWV0aW5nUHJvZ3Jlc3NUaW1lck9wdGlvbnMpOiB2b2lkID0+IHtcbiAgICBsZXQgeyB1cGRhdGVNZWV0aW5nUHJvZ3Jlc3NUaW1lLCBnZXRVcGRhdGVkQWxsUGFyYW1zIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgY29uc3QgY2FsY3VsYXRlRWxhcHNlZFRpbWUgPSAoc3RhcnRUaW1lOiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XG4gICAgICByZXR1cm4gY3VycmVudFRpbWUgLSBzdGFydFRpbWU7XG4gICAgfTtcblxuICAgIGNvbnN0IHBhZE51bWJlciA9IChudW1iZXI6IG51bWJlcik6IHN0cmluZyA9PiB7XG4gICAgICByZXR1cm4gbnVtYmVyLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZm9ybWF0VGltZSA9ICh0aW1lOiBudW1iZXIpOiBzdHJpbmcgPT4ge1xuICAgICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKHRpbWUgLyAzNjAwKTtcbiAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0aW1lICUgMzYwMCkgLyA2MCk7XG4gICAgICBjb25zdCBzZWNvbmRzID0gKHRpbWUgJSA2MCkudG9GaXhlZCgwKS5wYWRTdGFydCgyLCAnMCcpO1xuICAgICAgcmV0dXJuIGAke3BhZE51bWJlcihob3Vycyl9OiR7cGFkTnVtYmVyKG1pbnV0ZXMpfToke3BhZE51bWJlcihOdW1iZXIoc2Vjb25kcykpfWA7XG4gICAgfTtcblxuICAgIGxldCBlbGFwc2VkVGltZSA9IGNhbGN1bGF0ZUVsYXBzZWRUaW1lKHN0YXJ0VGltZSk7XG5cbiAgICB0aGlzLnRpbWVQcm9ncmVzcyA9IHNldEludGVydmFsKGFzeW5jICgpID0+IHtcbiAgICAgIGVsYXBzZWRUaW1lKys7XG4gICAgICBjb25zdCBmb3JtYXR0ZWRUaW1lID0gZm9ybWF0VGltZShlbGFwc2VkVGltZSk7XG4gICAgICB1cGRhdGVNZWV0aW5nUHJvZ3Jlc3NUaW1lKGZvcm1hdHRlZFRpbWUpO1xuXG4gICAgICBwYXJhbWV0ZXJzID0gZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgICBpZiAoIXBhcmFtZXRlcnMudmFsaWRhdGVkIHx8ICFwYXJhbWV0ZXJzLnJvb21OYW1lKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lUHJvZ3Jlc3MpO1xuICAgICAgICB0aGlzLnRpbWVQcm9ncmVzcyA9IG51bGw7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gIH07XG5cbiAgc3RvcE1lZXRpbmdQcm9ncmVzc1RpbWVyID0gKCk6IHZvaWQgPT4ge1xuICAgIGlmICh0aGlzLnRpbWVQcm9ncmVzcykge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVQcm9ncmVzcyk7XG4gICAgICB0aGlzLnRpbWVQcm9ncmVzcyA9IG51bGw7XG4gICAgfVxuICB9O1xufVxuIl19