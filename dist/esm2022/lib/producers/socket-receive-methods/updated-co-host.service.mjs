import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service for updating co-host information, responsibilities, and the user's co-host status.
 *
 * @class
 * @name UpdatedCoHost
 * @description Manages co-host updates for different event types, assigning responsibilities and notifying the user if their co-host status changes.
 *
 * @method
 * updatedCoHost
 * @async
 *
 * @param {UpdatedCoHostOptions} options - The options for co-host updates:
 *   - `coHost` {string}: The name of the co-host.
 *   - `coHostResponsibility` {CoHostResponsibility[]}: List of responsibilities assigned to the co-host.
 *   - `showAlert` {ShowAlert}: Optional function to display an alert message.
 *   - `eventType` {EventType}: Type of the event, determining if co-host can be updated.
 *   - `islevel` {string}: Current level of the event.
 *   - `member` {string}: The current user's identifier.
 *   - `youAreCoHost` {boolean}: Current user's co-host status.
 *   - `updateCoHost` {Function}: Function to set the new co-host.
 *   - `updateCoHostResponsibility` {Function}: Function to assign responsibilities to the co-host.
 *   - `updateYouAreCoHost` {Function}: Function to update the user's co-host status.
 *
 * @returns {Promise<void>} Resolves after co-host information is updated.
 *
 * @example
 * const options = {
 *   coHost: 'Alice',
 *   coHostResponsibility: ['moderate', 'manageParticipants'],
 *   showAlert: ({ message, type, duration }) => console.log(message),
 *   eventType: 'conference',
 *   islevel: '1',
 *   member: 'Alice',
 *   youAreCoHost: false,
 *   updateCoHost: (newCoHost) => console.log(`Updated co-host: ${newCoHost}`),
 *   updateCoHostResponsibility: (responsibilities) => console.log(responsibilities),
 *   updateYouAreCoHost: (status) => console.log(`You are co-host: ${status}`)
 * };
 * await updatedCoHostService.updatedCoHost(options);
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlZC1jby1ob3N0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvdXBkYXRlZC1jby1ob3N0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFrQjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Q0c7QUFNSCxNQUFNLE9BQU8sYUFBYTtJQUN4Qjs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILGFBQWEsR0FBRyxLQUFLLEVBQUUsRUFDckIsTUFBTSxFQUNOLG9CQUFvQixFQUNwQixTQUFTLEVBQ1QsU0FBUyxFQUNULE9BQU8sRUFDUCxNQUFNLEVBQ04sWUFBWSxFQUNaLFlBQVksRUFDWiwwQkFBMEIsRUFDMUIsa0JBQWtCLEdBQ0csRUFBaUIsRUFBRTtRQUN4Qyx3RUFBd0U7UUFDeEUsSUFBSSxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVMsS0FBSyxNQUFNLEVBQUUsQ0FBQztZQUN0RCxxRUFBcUU7WUFDckUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JCLDBCQUEwQixDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFFakQsSUFBSSxNQUFNLEtBQUssTUFBTSxFQUFFLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDbEIsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRXpCLFNBQVMsRUFBRSxDQUFDO3dCQUNWLE9BQU8sRUFBRSx3QkFBd0I7d0JBQ2pDLElBQUksRUFBRSxTQUFTO3dCQUNmLFFBQVEsRUFBRSxJQUFJO3FCQUNmLENBQUMsQ0FBQztnQkFDTCxDQUFDO1lBQ0gsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLENBQUM7UUFDSCxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksT0FBTyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNwQixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0F0RFMsYUFBYTsyR0FBYixhQUFhLGNBRlosTUFBTTs7MkZBRVAsYUFBYTtrQkFIekIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb0hvc3RSZXNwb25zaWJpbGl0eSwgRXZlbnRUeXBlLCBTaG93QWxlcnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVkQ29Ib3N0T3B0aW9ucyB7XG4gIGNvSG9zdDogc3RyaW5nO1xuICBjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXTtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICBldmVudFR5cGU6IEV2ZW50VHlwZTtcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBtZW1iZXI6IHN0cmluZztcbiAgeW91QXJlQ29Ib3N0OiBib29sZWFuO1xuICB1cGRhdGVDb0hvc3Q6IChjb0hvc3Q6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHk6IChyZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXSkgPT4gdm9pZDtcbiAgdXBkYXRlWW91QXJlQ29Ib3N0OiAoeW91QXJlQ29Ib3N0OiBib29sZWFuKSA9PiB2b2lkO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBVcGRhdGVkQ29Ib3N0VHlwZSA9IChvcHRpb25zOiBVcGRhdGVkQ29Ib3N0T3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBTZXJ2aWNlIGZvciB1cGRhdGluZyBjby1ob3N0IGluZm9ybWF0aW9uLCByZXNwb25zaWJpbGl0aWVzLCBhbmQgdGhlIHVzZXIncyBjby1ob3N0IHN0YXR1cy5cbiAqXG4gKiBAY2xhc3NcbiAqIEBuYW1lIFVwZGF0ZWRDb0hvc3RcbiAqIEBkZXNjcmlwdGlvbiBNYW5hZ2VzIGNvLWhvc3QgdXBkYXRlcyBmb3IgZGlmZmVyZW50IGV2ZW50IHR5cGVzLCBhc3NpZ25pbmcgcmVzcG9uc2liaWxpdGllcyBhbmQgbm90aWZ5aW5nIHRoZSB1c2VyIGlmIHRoZWlyIGNvLWhvc3Qgc3RhdHVzIGNoYW5nZXMuXG4gKlxuICogQG1ldGhvZFxuICogdXBkYXRlZENvSG9zdFxuICogQGFzeW5jXG4gKlxuICogQHBhcmFtIHtVcGRhdGVkQ29Ib3N0T3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBjby1ob3N0IHVwZGF0ZXM6XG4gKiAgIC0gYGNvSG9zdGAge3N0cmluZ306IFRoZSBuYW1lIG9mIHRoZSBjby1ob3N0LlxuICogICAtIGBjb0hvc3RSZXNwb25zaWJpbGl0eWAge0NvSG9zdFJlc3BvbnNpYmlsaXR5W119OiBMaXN0IG9mIHJlc3BvbnNpYmlsaXRpZXMgYXNzaWduZWQgdG8gdGhlIGNvLWhvc3QuXG4gKiAgIC0gYHNob3dBbGVydGAge1Nob3dBbGVydH06IE9wdGlvbmFsIGZ1bmN0aW9uIHRvIGRpc3BsYXkgYW4gYWxlcnQgbWVzc2FnZS5cbiAqICAgLSBgZXZlbnRUeXBlYCB7RXZlbnRUeXBlfTogVHlwZSBvZiB0aGUgZXZlbnQsIGRldGVybWluaW5nIGlmIGNvLWhvc3QgY2FuIGJlIHVwZGF0ZWQuXG4gKiAgIC0gYGlzbGV2ZWxgIHtzdHJpbmd9OiBDdXJyZW50IGxldmVsIG9mIHRoZSBldmVudC5cbiAqICAgLSBgbWVtYmVyYCB7c3RyaW5nfTogVGhlIGN1cnJlbnQgdXNlcidzIGlkZW50aWZpZXIuXG4gKiAgIC0gYHlvdUFyZUNvSG9zdGAge2Jvb2xlYW59OiBDdXJyZW50IHVzZXIncyBjby1ob3N0IHN0YXR1cy5cbiAqICAgLSBgdXBkYXRlQ29Ib3N0YCB7RnVuY3Rpb259OiBGdW5jdGlvbiB0byBzZXQgdGhlIG5ldyBjby1ob3N0LlxuICogICAtIGB1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eWAge0Z1bmN0aW9ufTogRnVuY3Rpb24gdG8gYXNzaWduIHJlc3BvbnNpYmlsaXRpZXMgdG8gdGhlIGNvLWhvc3QuXG4gKiAgIC0gYHVwZGF0ZVlvdUFyZUNvSG9zdGAge0Z1bmN0aW9ufTogRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB1c2VyJ3MgY28taG9zdCBzdGF0dXMuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IFJlc29sdmVzIGFmdGVyIGNvLWhvc3QgaW5mb3JtYXRpb24gaXMgdXBkYXRlZC5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3Qgb3B0aW9ucyA9IHtcbiAqICAgY29Ib3N0OiAnQWxpY2UnLFxuICogICBjb0hvc3RSZXNwb25zaWJpbGl0eTogWydtb2RlcmF0ZScsICdtYW5hZ2VQYXJ0aWNpcGFudHMnXSxcbiAqICAgc2hvd0FsZXJ0OiAoeyBtZXNzYWdlLCB0eXBlLCBkdXJhdGlvbiB9KSA9PiBjb25zb2xlLmxvZyhtZXNzYWdlKSxcbiAqICAgZXZlbnRUeXBlOiAnY29uZmVyZW5jZScsXG4gKiAgIGlzbGV2ZWw6ICcxJyxcbiAqICAgbWVtYmVyOiAnQWxpY2UnLFxuICogICB5b3VBcmVDb0hvc3Q6IGZhbHNlLFxuICogICB1cGRhdGVDb0hvc3Q6IChuZXdDb0hvc3QpID0+IGNvbnNvbGUubG9nKGBVcGRhdGVkIGNvLWhvc3Q6ICR7bmV3Q29Ib3N0fWApLFxuICogICB1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eTogKHJlc3BvbnNpYmlsaXRpZXMpID0+IGNvbnNvbGUubG9nKHJlc3BvbnNpYmlsaXRpZXMpLFxuICogICB1cGRhdGVZb3VBcmVDb0hvc3Q6IChzdGF0dXMpID0+IGNvbnNvbGUubG9nKGBZb3UgYXJlIGNvLWhvc3Q6ICR7c3RhdHVzfWApXG4gKiB9O1xuICogYXdhaXQgdXBkYXRlZENvSG9zdFNlcnZpY2UudXBkYXRlZENvSG9zdChvcHRpb25zKTtcbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBVcGRhdGVkQ29Ib3N0IHtcbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGNvLWhvc3QgaW5mb3JtYXRpb24sIHJlc3BvbnNpYmlsaXR5LCBhbmQgdXNlcidzIGNvLWhvc3Qgc3RhdHVzIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBvcHRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciB1cGRhdGluZyB0aGUgY28taG9zdC5cbiAgICogQHBhcmFtIG9wdGlvbnMuY29Ib3N0IC0gVGhlIGNvLWhvc3QgdG8gYmUgdXBkYXRlZC5cbiAgICogQHBhcmFtIG9wdGlvbnMuY29Ib3N0UmVzcG9uc2liaWxpdHkgLSBUaGUgcmVzcG9uc2liaWxpdHkgb2YgdGhlIGNvLWhvc3QuXG4gICAqIEBwYXJhbSBvcHRpb25zLnNob3dBbGVydCAtIEEgZnVuY3Rpb24gdG8gc2hvdyBhbGVydHMuXG4gICAqIEBwYXJhbSBvcHRpb25zLmV2ZW50VHlwZSAtIFRoZSB0eXBlIG9mIGV2ZW50IHRyaWdnZXJpbmcgdGhlIHVwZGF0ZS5cbiAgICogQHBhcmFtIG9wdGlvbnMuaXNsZXZlbCAtIFRoZSBsZXZlbCBvZiB0aGUgZXZlbnQuXG4gICAqIEBwYXJhbSBvcHRpb25zLm1lbWJlciAtIFRoZSBtZW1iZXIgdG8gYmUgY2hlY2tlZCBhZ2FpbnN0IHRoZSBjby1ob3N0LlxuICAgKiBAcGFyYW0gb3B0aW9ucy55b3VBcmVDb0hvc3QgLSBUaGUgY3VycmVudCBjby1ob3N0IHN0YXR1cyBvZiB0aGUgdXNlci5cbiAgICogQHBhcmFtIG9wdGlvbnMudXBkYXRlQ29Ib3N0IC0gQSBmdW5jdGlvbiB0byB1cGRhdGUgdGhlIGNvLWhvc3QuXG4gICAqIEBwYXJhbSBvcHRpb25zLnVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5IC0gQSBmdW5jdGlvbiB0byB1cGRhdGUgdGhlIGNvLWhvc3QncyByZXNwb25zaWJpbGl0eS5cbiAgICogQHBhcmFtIG9wdGlvbnMudXBkYXRlWW91QXJlQ29Ib3N0IC0gQSBmdW5jdGlvbiB0byB1cGRhdGUgdGhlIHVzZXIncyBjby1ob3N0IHN0YXR1cy5cbiAgICpcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgY28taG9zdCBpbmZvcm1hdGlvbiBoYXMgYmVlbiB1cGRhdGVkLlxuICAgKi9cbiAgdXBkYXRlZENvSG9zdCA9IGFzeW5jICh7XG4gICAgY29Ib3N0LFxuICAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICAgIHNob3dBbGVydCxcbiAgICBldmVudFR5cGUsXG4gICAgaXNsZXZlbCxcbiAgICBtZW1iZXIsXG4gICAgeW91QXJlQ29Ib3N0LFxuICAgIHVwZGF0ZUNvSG9zdCxcbiAgICB1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eSxcbiAgICB1cGRhdGVZb3VBcmVDb0hvc3QsXG4gIH06IFVwZGF0ZWRDb0hvc3RPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgLy8gVXBkYXRlIGNvLWhvc3QgaW5mb3JtYXRpb24sIHJlc3BvbnNpYmlsaXR5LCBhbmQgdXNlcidzIGNvLWhvc3Qgc3RhdHVzXG4gICAgaWYgKGV2ZW50VHlwZSAhPT0gJ2Jyb2FkY2FzdCcgJiYgZXZlbnRUeXBlICE9PSAnY2hhdCcpIHtcbiAgICAgIC8vIE9ubHkgdXBkYXRlIHRoZSBjby1ob3N0IGlmIHRoZSBldmVudCB0eXBlIGlzIG5vdCBicm9hZGNhc3Qgb3IgY2hhdFxuICAgICAgdXBkYXRlQ29Ib3N0KGNvSG9zdCk7XG4gICAgICB1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eShjb0hvc3RSZXNwb25zaWJpbGl0eSk7XG5cbiAgICAgIGlmIChtZW1iZXIgPT09IGNvSG9zdCkge1xuICAgICAgICBpZiAoIXlvdUFyZUNvSG9zdCkge1xuICAgICAgICAgIHVwZGF0ZVlvdUFyZUNvSG9zdCh0cnVlKTtcblxuICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdZb3UgYXJlIG5vdyBhIGNvLWhvc3QuJyxcbiAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cGRhdGVZb3VBcmVDb0hvc3QoZmFsc2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaXNsZXZlbCAhPT0gJzInKSB7XG4gICAgICAgIHVwZGF0ZVlvdUFyZUNvSG9zdCh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG4iXX0=