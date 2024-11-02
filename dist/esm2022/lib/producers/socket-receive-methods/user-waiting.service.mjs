import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service for handling user waiting room actions, including notifications and updating request counts.
 *
 * @class
 * @name UserWaiting
 * @description Manages the logic when a user joins the waiting room by displaying alerts and incrementing the total request count.
 *
 * @method
 * userWaiting
 * @async
 *
 * @param {UserWaitingOptions} options - The options for handling user waiting actions:
 *   - `name` {string}: Name of the user joining the waiting room.
 *   - `showAlert` {ShowAlert}: Optional function for showing an alert with a customizable message, type, and duration.
 *   - `totalReqWait` {number}: Current count of waiting requests.
 *   - `updateTotalReqWait` {Function}: Updates the total waiting request count.
 *
 * @returns {Promise<void>} Resolves after alert is shown and request count is updated.
 *
 * @example
 * const options = {
 *   name: 'Alice',
 *   showAlert: ({ message, type, duration }) => console.log(message),
 *   totalReqWait: 3,
 *   updateTotalReqWait: (newTotal) => console.log(`Updated count: ${newTotal}`)
 * };
 * await userWaitingService.userWaiting(options);
 */
export class UserWaiting {
    userWaiting = async ({ name, showAlert, totalReqWait, updateTotalReqWait, }) => {
        // Display an alert/notification about the user joining the waiting room
        showAlert?.({
            message: `${name} joined the waiting room.`,
            type: 'success',
            duration: 3000,
        });
        // Update the total number of requests waiting in the waiting room
        const totalReqs = totalReqWait + 1;
        updateTotalReqWait(totalReqs);
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UserWaiting, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UserWaiting, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UserWaiting, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci13YWl0aW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvdXNlci13YWl0aW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFZM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUtILE1BQU0sT0FBTyxXQUFXO0lBQ3RCLFdBQVcsR0FBRyxLQUFLLEVBQUUsRUFDbkIsSUFBSSxFQUNKLFNBQVMsRUFDVCxZQUFZLEVBQ1osa0JBQWtCLEdBQ0MsRUFBaUIsRUFBRTtRQUN0Qyx3RUFBd0U7UUFDeEUsU0FBUyxFQUFFLENBQUM7WUFDVixPQUFPLEVBQUUsR0FBRyxJQUFJLDJCQUEyQjtZQUMzQyxJQUFJLEVBQUUsU0FBUztZQUNmLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDO1FBRUgsa0VBQWtFO1FBQ2xFLE1BQU0sU0FBUyxHQUFHLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDbkMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO3VHQWpCUyxXQUFXOzJHQUFYLFdBQVcsY0FGVixNQUFNOzsyRkFFUCxXQUFXO2tCQUh2QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNob3dBbGVydCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIFVzZXJXYWl0aW5nT3B0aW9ucyB7XG4gIG5hbWU6IHN0cmluZztcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICB0b3RhbFJlcVdhaXQ6IG51bWJlcjtcbiAgdXBkYXRlVG90YWxSZXFXYWl0OiAodG90YWw6IG51bWJlcikgPT4gdm9pZDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgVXNlcldhaXRpbmdUeXBlID0gKG9wdGlvbnM6IFVzZXJXYWl0aW5nT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBTZXJ2aWNlIGZvciBoYW5kbGluZyB1c2VyIHdhaXRpbmcgcm9vbSBhY3Rpb25zLCBpbmNsdWRpbmcgbm90aWZpY2F0aW9ucyBhbmQgdXBkYXRpbmcgcmVxdWVzdCBjb3VudHMuXG4gKlxuICogQGNsYXNzXG4gKiBAbmFtZSBVc2VyV2FpdGluZ1xuICogQGRlc2NyaXB0aW9uIE1hbmFnZXMgdGhlIGxvZ2ljIHdoZW4gYSB1c2VyIGpvaW5zIHRoZSB3YWl0aW5nIHJvb20gYnkgZGlzcGxheWluZyBhbGVydHMgYW5kIGluY3JlbWVudGluZyB0aGUgdG90YWwgcmVxdWVzdCBjb3VudC5cbiAqXG4gKiBAbWV0aG9kXG4gKiB1c2VyV2FpdGluZ1xuICogQGFzeW5jXG4gKlxuICogQHBhcmFtIHtVc2VyV2FpdGluZ09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgaGFuZGxpbmcgdXNlciB3YWl0aW5nIGFjdGlvbnM6XG4gKiAgIC0gYG5hbWVgIHtzdHJpbmd9OiBOYW1lIG9mIHRoZSB1c2VyIGpvaW5pbmcgdGhlIHdhaXRpbmcgcm9vbS5cbiAqICAgLSBgc2hvd0FsZXJ0YCB7U2hvd0FsZXJ0fTogT3B0aW9uYWwgZnVuY3Rpb24gZm9yIHNob3dpbmcgYW4gYWxlcnQgd2l0aCBhIGN1c3RvbWl6YWJsZSBtZXNzYWdlLCB0eXBlLCBhbmQgZHVyYXRpb24uXG4gKiAgIC0gYHRvdGFsUmVxV2FpdGAge251bWJlcn06IEN1cnJlbnQgY291bnQgb2Ygd2FpdGluZyByZXF1ZXN0cy5cbiAqICAgLSBgdXBkYXRlVG90YWxSZXFXYWl0YCB7RnVuY3Rpb259OiBVcGRhdGVzIHRoZSB0b3RhbCB3YWl0aW5nIHJlcXVlc3QgY291bnQuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IFJlc29sdmVzIGFmdGVyIGFsZXJ0IGlzIHNob3duIGFuZCByZXF1ZXN0IGNvdW50IGlzIHVwZGF0ZWQuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IG9wdGlvbnMgPSB7XG4gKiAgIG5hbWU6ICdBbGljZScsXG4gKiAgIHNob3dBbGVydDogKHsgbWVzc2FnZSwgdHlwZSwgZHVyYXRpb24gfSkgPT4gY29uc29sZS5sb2cobWVzc2FnZSksXG4gKiAgIHRvdGFsUmVxV2FpdDogMyxcbiAqICAgdXBkYXRlVG90YWxSZXFXYWl0OiAobmV3VG90YWwpID0+IGNvbnNvbGUubG9nKGBVcGRhdGVkIGNvdW50OiAke25ld1RvdGFsfWApXG4gKiB9O1xuICogYXdhaXQgdXNlcldhaXRpbmdTZXJ2aWNlLnVzZXJXYWl0aW5nKG9wdGlvbnMpO1xuICovXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyV2FpdGluZyB7XG4gIHVzZXJXYWl0aW5nID0gYXN5bmMgKHtcbiAgICBuYW1lLFxuICAgIHNob3dBbGVydCxcbiAgICB0b3RhbFJlcVdhaXQsXG4gICAgdXBkYXRlVG90YWxSZXFXYWl0LFxuICB9OiBVc2VyV2FpdGluZ09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAvLyBEaXNwbGF5IGFuIGFsZXJ0L25vdGlmaWNhdGlvbiBhYm91dCB0aGUgdXNlciBqb2luaW5nIHRoZSB3YWl0aW5nIHJvb21cbiAgICBzaG93QWxlcnQ/Lih7XG4gICAgICBtZXNzYWdlOiBgJHtuYW1lfSBqb2luZWQgdGhlIHdhaXRpbmcgcm9vbS5gLFxuICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgfSk7XG5cbiAgICAvLyBVcGRhdGUgdGhlIHRvdGFsIG51bWJlciBvZiByZXF1ZXN0cyB3YWl0aW5nIGluIHRoZSB3YWl0aW5nIHJvb21cbiAgICBjb25zdCB0b3RhbFJlcXMgPSB0b3RhbFJlcVdhaXQgKyAxO1xuICAgIHVwZGF0ZVRvdGFsUmVxV2FpdCh0b3RhbFJlcXMpO1xuICB9O1xufVxuIl19