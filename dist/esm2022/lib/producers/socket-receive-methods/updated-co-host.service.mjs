import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class UpdatedCoHost {
    /**
     * Updates the co-host information, responsibility, and user's co-host status based on the provided options.
     *
     * @param options - The options for updating the co-host.
     * @param options.coHost - The co-host to be updated.
     * @param options.coHostResponsibility - The responsibility of the co-host.
     * @param options.showAlert - A function to show alerts.
     * @param options.eventType - The type of event triggering the update.
     * @param options.islevel - The level of the event.
     * @param options.member - The member to be checked against the co-host.
     * @param options.youAreCoHost - The current co-host status of the user.
     * @param options.updateCoHost - A function to update the co-host.
     * @param options.updateCoHostResponsibility - A function to update the co-host's responsibility.
     * @param options.updateYouAreCoHost - A function to update the user's co-host status.
     *
     * @returns A promise that resolves when the co-host information has been updated.
     */
    updatedCoHost = async ({ coHost, coHostResponsibility, showAlert, eventType, islevel, member, youAreCoHost, updateCoHost, updateCoHostResponsibility, updateYouAreCoHost, }) => {
        // Update co-host information, responsibility, and user's co-host status
        if (eventType !== 'broadcast' && eventType !== 'chat') {
            // Only update the co-host if the event type is not broadcast or chat
            updateCoHost(coHost);
            updateCoHostResponsibility(coHostResponsibility);
            if (member === coHost) {
                if (!youAreCoHost) {
                    updateYouAreCoHost(true);
                    showAlert?.({
                        message: 'You are now a co-host.',
                        type: 'success',
                        duration: 3000,
                    });
                }
            }
            else {
                updateYouAreCoHost(false);
            }
        }
        else {
            if (islevel !== '2') {
                updateYouAreCoHost(true);
            }
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UpdatedCoHost, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UpdatedCoHost, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UpdatedCoHost, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlZC1jby1ob3N0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvdXBkYXRlZC1jby1ob3N0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFxQjNDLE1BQU0sT0FBTyxhQUFhO0lBQ3hCOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsYUFBYSxHQUFHLEtBQUssRUFBRSxFQUNyQixNQUFNLEVBQ04sb0JBQW9CLEVBQ3BCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsT0FBTyxFQUNQLE1BQU0sRUFDTixZQUFZLEVBQ1osWUFBWSxFQUNaLDBCQUEwQixFQUMxQixrQkFBa0IsR0FDRyxFQUFpQixFQUFFO1FBQ3hDLHdFQUF3RTtRQUN4RSxJQUFJLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxLQUFLLE1BQU0sRUFBRSxDQUFDO1lBQ3RELHFFQUFxRTtZQUNyRSxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckIsMEJBQTBCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUVqRCxJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUNsQixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFekIsU0FBUyxFQUFFLENBQUM7d0JBQ1YsT0FBTyxFQUFFLHdCQUF3Qjt3QkFDakMsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsUUFBUSxFQUFFLElBQUk7cUJBQ2YsQ0FBQyxDQUFDO2dCQUNMLENBQUM7WUFDSCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsQ0FBQztRQUNILENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxPQUFPLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ3BCLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO3VHQXREUyxhQUFhOzJHQUFiLGFBQWEsY0FGWixNQUFNOzsyRkFFUCxhQUFhO2tCQUh6QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvSG9zdFJlc3BvbnNpYmlsaXR5LCBFdmVudFR5cGUsIFNob3dBbGVydCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIFVwZGF0ZWRDb0hvc3RPcHRpb25zIHtcbiAgY29Ib3N0OiBzdHJpbmc7XG4gIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiBDb0hvc3RSZXNwb25zaWJpbGl0eVtdO1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlO1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIG1lbWJlcjogc3RyaW5nO1xuICB5b3VBcmVDb0hvc3Q6IGJvb2xlYW47XG4gIHVwZGF0ZUNvSG9zdDogKGNvSG9zdDogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eTogKHJlc3BvbnNpYmlsaXR5OiBDb0hvc3RSZXNwb25zaWJpbGl0eVtdKSA9PiB2b2lkO1xuICB1cGRhdGVZb3VBcmVDb0hvc3Q6ICh5b3VBcmVDb0hvc3Q6IGJvb2xlYW4pID0+IHZvaWQ7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFVwZGF0ZWRDb0hvc3RUeXBlID0gKG9wdGlvbnM6IFVwZGF0ZWRDb0hvc3RPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVXBkYXRlZENvSG9zdCB7XG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBjby1ob3N0IGluZm9ybWF0aW9uLCByZXNwb25zaWJpbGl0eSwgYW5kIHVzZXIncyBjby1ob3N0IHN0YXR1cyBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgb3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgdXBkYXRpbmcgdGhlIGNvLWhvc3QuXG4gICAqIEBwYXJhbSBvcHRpb25zLmNvSG9zdCAtIFRoZSBjby1ob3N0IHRvIGJlIHVwZGF0ZWQuXG4gICAqIEBwYXJhbSBvcHRpb25zLmNvSG9zdFJlc3BvbnNpYmlsaXR5IC0gVGhlIHJlc3BvbnNpYmlsaXR5IG9mIHRoZSBjby1ob3N0LlxuICAgKiBAcGFyYW0gb3B0aW9ucy5zaG93QWxlcnQgLSBBIGZ1bmN0aW9uIHRvIHNob3cgYWxlcnRzLlxuICAgKiBAcGFyYW0gb3B0aW9ucy5ldmVudFR5cGUgLSBUaGUgdHlwZSBvZiBldmVudCB0cmlnZ2VyaW5nIHRoZSB1cGRhdGUuXG4gICAqIEBwYXJhbSBvcHRpb25zLmlzbGV2ZWwgLSBUaGUgbGV2ZWwgb2YgdGhlIGV2ZW50LlxuICAgKiBAcGFyYW0gb3B0aW9ucy5tZW1iZXIgLSBUaGUgbWVtYmVyIHRvIGJlIGNoZWNrZWQgYWdhaW5zdCB0aGUgY28taG9zdC5cbiAgICogQHBhcmFtIG9wdGlvbnMueW91QXJlQ29Ib3N0IC0gVGhlIGN1cnJlbnQgY28taG9zdCBzdGF0dXMgb2YgdGhlIHVzZXIuXG4gICAqIEBwYXJhbSBvcHRpb25zLnVwZGF0ZUNvSG9zdCAtIEEgZnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBjby1ob3N0LlxuICAgKiBAcGFyYW0gb3B0aW9ucy51cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eSAtIEEgZnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBjby1ob3N0J3MgcmVzcG9uc2liaWxpdHkuXG4gICAqIEBwYXJhbSBvcHRpb25zLnVwZGF0ZVlvdUFyZUNvSG9zdCAtIEEgZnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB1c2VyJ3MgY28taG9zdCBzdGF0dXMuXG4gICAqXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGNvLWhvc3QgaW5mb3JtYXRpb24gaGFzIGJlZW4gdXBkYXRlZC5cbiAgICovXG4gIHVwZGF0ZWRDb0hvc3QgPSBhc3luYyAoe1xuICAgIGNvSG9zdCxcbiAgICBjb0hvc3RSZXNwb25zaWJpbGl0eSxcbiAgICBzaG93QWxlcnQsXG4gICAgZXZlbnRUeXBlLFxuICAgIGlzbGV2ZWwsXG4gICAgbWVtYmVyLFxuICAgIHlvdUFyZUNvSG9zdCxcbiAgICB1cGRhdGVDb0hvc3QsXG4gICAgdXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHksXG4gICAgdXBkYXRlWW91QXJlQ29Ib3N0LFxuICB9OiBVcGRhdGVkQ29Ib3N0T3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIC8vIFVwZGF0ZSBjby1ob3N0IGluZm9ybWF0aW9uLCByZXNwb25zaWJpbGl0eSwgYW5kIHVzZXIncyBjby1ob3N0IHN0YXR1c1xuICAgIGlmIChldmVudFR5cGUgIT09ICdicm9hZGNhc3QnICYmIGV2ZW50VHlwZSAhPT0gJ2NoYXQnKSB7XG4gICAgICAvLyBPbmx5IHVwZGF0ZSB0aGUgY28taG9zdCBpZiB0aGUgZXZlbnQgdHlwZSBpcyBub3QgYnJvYWRjYXN0IG9yIGNoYXRcbiAgICAgIHVwZGF0ZUNvSG9zdChjb0hvc3QpO1xuICAgICAgdXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHkoY29Ib3N0UmVzcG9uc2liaWxpdHkpO1xuXG4gICAgICBpZiAobWVtYmVyID09PSBjb0hvc3QpIHtcbiAgICAgICAgaWYgKCF5b3VBcmVDb0hvc3QpIHtcbiAgICAgICAgICB1cGRhdGVZb3VBcmVDb0hvc3QodHJ1ZSk7XG5cbiAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICBtZXNzYWdlOiAnWW91IGFyZSBub3cgYSBjby1ob3N0LicsXG4gICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXBkYXRlWW91QXJlQ29Ib3N0KGZhbHNlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzbGV2ZWwgIT09ICcyJykge1xuICAgICAgICB1cGRhdGVZb3VBcmVDb0hvc3QodHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuIl19