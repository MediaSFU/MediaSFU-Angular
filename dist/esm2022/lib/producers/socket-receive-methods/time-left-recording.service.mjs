import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class TimeLeftRecording {
    /**
     * Displays an alert message indicating the remaining time left for recording.
     *
     * @param {TimeLeftRecordingOptions} options - The options for the time left recording.
     * @param {number} options.timeLeft - The amount of time left in seconds.
     * @param {Function} options.showAlert - The function to display the alert message.
     *
     * @throws {Error} If there is an issue displaying the alert message.
     */
    timeLeftRecording = ({ timeLeft, showAlert }) => {
        try {
            // Display alert message
            showAlert?.({
                message: `The recording will stop in less than ${timeLeft} seconds.`,
                duration: 3000,
                type: 'danger',
            });
        }
        catch (error) {
            console.log('Error in timeLeftRecording: ', error);
            // throw new Error("Failed to display the time left alert message.");
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: TimeLeftRecording, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: TimeLeftRecording, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: TimeLeftRecording, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1sZWZ0LXJlY29yZGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3RpbWUtbGVmdC1yZWNvcmRpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWMzQyxNQUFNLE9BQU8saUJBQWlCO0lBQzVCOzs7Ozs7OztPQVFHO0lBQ0gsaUJBQWlCLEdBQUcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQTRCLEVBQVEsRUFBRTtRQUM5RSxJQUFJLENBQUM7WUFDSCx3QkFBd0I7WUFFeEIsU0FBUyxFQUFFLENBQUM7Z0JBQ1YsT0FBTyxFQUFFLHdDQUF3QyxRQUFRLFdBQVc7Z0JBQ3BFLFFBQVEsRUFBRSxJQUFJO2dCQUNkLElBQUksRUFBRSxRQUFRO2FBQ2YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ25ELHFFQUFxRTtRQUN2RSxDQUFDO0lBQ0gsQ0FBQyxDQUFDO3VHQXZCUyxpQkFBaUI7MkdBQWpCLGlCQUFpQixjQUZoQixNQUFNOzsyRkFFUCxpQkFBaUI7a0JBSDdCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2hvd0FsZXJ0IH0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBUaW1lTGVmdFJlY29yZGluZ09wdGlvbnMge1xuICB0aW1lTGVmdDogbnVtYmVyO1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFRpbWVMZWZ0UmVjb3JkaW5nVHlwZSA9IChvcHRpb25zOiBUaW1lTGVmdFJlY29yZGluZ09wdGlvbnMpID0+IHZvaWQ7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBUaW1lTGVmdFJlY29yZGluZyB7XG4gIC8qKlxuICAgKiBEaXNwbGF5cyBhbiBhbGVydCBtZXNzYWdlIGluZGljYXRpbmcgdGhlIHJlbWFpbmluZyB0aW1lIGxlZnQgZm9yIHJlY29yZGluZy5cbiAgICpcbiAgICogQHBhcmFtIHtUaW1lTGVmdFJlY29yZGluZ09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgdGhlIHRpbWUgbGVmdCByZWNvcmRpbmcuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnRpbWVMZWZ0IC0gVGhlIGFtb3VudCBvZiB0aW1lIGxlZnQgaW4gc2Vjb25kcy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5zaG93QWxlcnQgLSBUaGUgZnVuY3Rpb24gdG8gZGlzcGxheSB0aGUgYWxlcnQgbWVzc2FnZS5cbiAgICpcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZXJlIGlzIGFuIGlzc3VlIGRpc3BsYXlpbmcgdGhlIGFsZXJ0IG1lc3NhZ2UuXG4gICAqL1xuICB0aW1lTGVmdFJlY29yZGluZyA9ICh7IHRpbWVMZWZ0LCBzaG93QWxlcnQgfTogVGltZUxlZnRSZWNvcmRpbmdPcHRpb25zKTogdm9pZCA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIERpc3BsYXkgYWxlcnQgbWVzc2FnZVxuXG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6IGBUaGUgcmVjb3JkaW5nIHdpbGwgc3RvcCBpbiBsZXNzIHRoYW4gJHt0aW1lTGVmdH0gc2Vjb25kcy5gLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGluIHRpbWVMZWZ0UmVjb3JkaW5nOiAnLCBlcnJvcik7XG4gICAgICAvLyB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZGlzcGxheSB0aGUgdGltZSBsZWZ0IGFsZXJ0IG1lc3NhZ2UuXCIpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==