import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @fileoverview Service to handle user waiting functionality.
 *
 * @description
 * This service provides methods to handle the logic when a user joins the waiting room.
 * It displays an alert/notification and updates the total number of requests waiting.
 */
/**
 * Options for the userWaiting method.
 *
 * @interface UserWaitingOptions
 * @property {string} name - The name of the user joining the waiting room.
 * @property {(options: { message: string; type: string; duration: number }) => void} [showAlert] - Optional function to display an alert/notification.
 * @property {number} totalReqWait - The current total number of requests waiting.
 * @property {(total: number) => void} updateTotalReqWait - Function to update the total number of requests waiting.
 */
/**
 * Service to handle user waiting functionality.
 *
 * @class
 * @name UserWaiting
 * @description
 * This service provides methods to handle the logic when a user joins the waiting room.
 * It displays an alert/notification and updates the total number of requests waiting.
 *
 * @example
 * const userWaitingService = new UserWaiting();
 * userWaitingService.userWaiting({
 *   name: 'John Doe',
 *   showAlert: (options) => console.log(options.message),
 *   totalReqWait: 5,
 *   updateTotalReqWait: (total) => console.log(`Total requests: ${total}`),
 * });
 */
/**
 * Handles the logic when a user joins the waiting room.
 *
 * @method
 * @name userWaiting
 * @memberof UserWaiting
 * @async
 *
 * @param {UserWaitingOptions} options - The options for the user waiting method.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 *
 * @example
 * const options = {
 *   name: 'John Doe',
 *   showAlert: (options) => console.log(options.message),
 *   totalReqWait: 5,
 *   updateTotalReqWait: (total) => console.log(`Total requests: ${total}`),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci13YWl0aW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvdXNlci13YWl0aW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFZM0M7Ozs7OztHQU1HO0FBRUg7Ozs7Ozs7O0dBUUc7QUFFSDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUlILE1BQU0sT0FBTyxXQUFXO0lBQ3RCLFdBQVcsR0FBRyxLQUFLLEVBQUUsRUFDbkIsSUFBSSxFQUNKLFNBQVMsRUFDVCxZQUFZLEVBQ1osa0JBQWtCLEdBQ0MsRUFBaUIsRUFBRTtRQUN0Qyx3RUFBd0U7UUFDeEUsU0FBUyxFQUFFLENBQUM7WUFDVixPQUFPLEVBQUUsR0FBRyxJQUFJLDJCQUEyQjtZQUMzQyxJQUFJLEVBQUUsU0FBUztZQUNmLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDO1FBRUgsa0VBQWtFO1FBQ2xFLE1BQU0sU0FBUyxHQUFHLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDbkMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO3VHQWpCUyxXQUFXOzJHQUFYLFdBQVcsY0FGVixNQUFNOzsyRkFFUCxXQUFXO2tCQUh2QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNob3dBbGVydCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIFVzZXJXYWl0aW5nT3B0aW9ucyB7XG4gIG5hbWU6IHN0cmluZztcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICB0b3RhbFJlcVdhaXQ6IG51bWJlcjtcbiAgdXBkYXRlVG90YWxSZXFXYWl0OiAodG90YWw6IG51bWJlcikgPT4gdm9pZDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgVXNlcldhaXRpbmdUeXBlID0gKG9wdGlvbnM6IFVzZXJXYWl0aW5nT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IFNlcnZpY2UgdG8gaGFuZGxlIHVzZXIgd2FpdGluZyBmdW5jdGlvbmFsaXR5LlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogVGhpcyBzZXJ2aWNlIHByb3ZpZGVzIG1ldGhvZHMgdG8gaGFuZGxlIHRoZSBsb2dpYyB3aGVuIGEgdXNlciBqb2lucyB0aGUgd2FpdGluZyByb29tLlxuICogSXQgZGlzcGxheXMgYW4gYWxlcnQvbm90aWZpY2F0aW9uIGFuZCB1cGRhdGVzIHRoZSB0b3RhbCBudW1iZXIgb2YgcmVxdWVzdHMgd2FpdGluZy5cbiAqL1xuXG4vKipcbiAqIE9wdGlvbnMgZm9yIHRoZSB1c2VyV2FpdGluZyBtZXRob2QuXG4gKlxuICogQGludGVyZmFjZSBVc2VyV2FpdGluZ09wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHVzZXIgam9pbmluZyB0aGUgd2FpdGluZyByb29tLlxuICogQHByb3BlcnR5IHsob3B0aW9uczogeyBtZXNzYWdlOiBzdHJpbmc7IHR5cGU6IHN0cmluZzsgZHVyYXRpb246IG51bWJlciB9KSA9PiB2b2lkfSBbc2hvd0FsZXJ0XSAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIGRpc3BsYXkgYW4gYWxlcnQvbm90aWZpY2F0aW9uLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IHRvdGFsUmVxV2FpdCAtIFRoZSBjdXJyZW50IHRvdGFsIG51bWJlciBvZiByZXF1ZXN0cyB3YWl0aW5nLlxuICogQHByb3BlcnR5IHsodG90YWw6IG51bWJlcikgPT4gdm9pZH0gdXBkYXRlVG90YWxSZXFXYWl0IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB0b3RhbCBudW1iZXIgb2YgcmVxdWVzdHMgd2FpdGluZy5cbiAqL1xuXG4vKipcbiAqIFNlcnZpY2UgdG8gaGFuZGxlIHVzZXIgd2FpdGluZyBmdW5jdGlvbmFsaXR5LlxuICpcbiAqIEBjbGFzc1xuICogQG5hbWUgVXNlcldhaXRpbmdcbiAqIEBkZXNjcmlwdGlvblxuICogVGhpcyBzZXJ2aWNlIHByb3ZpZGVzIG1ldGhvZHMgdG8gaGFuZGxlIHRoZSBsb2dpYyB3aGVuIGEgdXNlciBqb2lucyB0aGUgd2FpdGluZyByb29tLlxuICogSXQgZGlzcGxheXMgYW4gYWxlcnQvbm90aWZpY2F0aW9uIGFuZCB1cGRhdGVzIHRoZSB0b3RhbCBudW1iZXIgb2YgcmVxdWVzdHMgd2FpdGluZy5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgdXNlcldhaXRpbmdTZXJ2aWNlID0gbmV3IFVzZXJXYWl0aW5nKCk7XG4gKiB1c2VyV2FpdGluZ1NlcnZpY2UudXNlcldhaXRpbmcoe1xuICogICBuYW1lOiAnSm9obiBEb2UnLFxuICogICBzaG93QWxlcnQ6IChvcHRpb25zKSA9PiBjb25zb2xlLmxvZyhvcHRpb25zLm1lc3NhZ2UpLFxuICogICB0b3RhbFJlcVdhaXQ6IDUsXG4gKiAgIHVwZGF0ZVRvdGFsUmVxV2FpdDogKHRvdGFsKSA9PiBjb25zb2xlLmxvZyhgVG90YWwgcmVxdWVzdHM6ICR7dG90YWx9YCksXG4gKiB9KTtcbiAqL1xuXG4vKipcbiAqIEhhbmRsZXMgdGhlIGxvZ2ljIHdoZW4gYSB1c2VyIGpvaW5zIHRoZSB3YWl0aW5nIHJvb20uXG4gKlxuICogQG1ldGhvZFxuICogQG5hbWUgdXNlcldhaXRpbmdcbiAqIEBtZW1iZXJvZiBVc2VyV2FpdGluZ1xuICogQGFzeW5jXG4gKlxuICogQHBhcmFtIHtVc2VyV2FpdGluZ09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgdGhlIHVzZXIgd2FpdGluZyBtZXRob2QuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgb3BlcmF0aW9uIGlzIGNvbXBsZXRlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBvcHRpb25zID0ge1xuICogICBuYW1lOiAnSm9obiBEb2UnLFxuICogICBzaG93QWxlcnQ6IChvcHRpb25zKSA9PiBjb25zb2xlLmxvZyhvcHRpb25zLm1lc3NhZ2UpLFxuICogICB0b3RhbFJlcVdhaXQ6IDUsXG4gKiAgIHVwZGF0ZVRvdGFsUmVxV2FpdDogKHRvdGFsKSA9PiBjb25zb2xlLmxvZyhgVG90YWwgcmVxdWVzdHM6ICR7dG90YWx9YCksXG4gKiB9O1xuICogYXdhaXQgdXNlcldhaXRpbmdTZXJ2aWNlLnVzZXJXYWl0aW5nKG9wdGlvbnMpO1xuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVXNlcldhaXRpbmcge1xuICB1c2VyV2FpdGluZyA9IGFzeW5jICh7XG4gICAgbmFtZSxcbiAgICBzaG93QWxlcnQsXG4gICAgdG90YWxSZXFXYWl0LFxuICAgIHVwZGF0ZVRvdGFsUmVxV2FpdCxcbiAgfTogVXNlcldhaXRpbmdPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgLy8gRGlzcGxheSBhbiBhbGVydC9ub3RpZmljYXRpb24gYWJvdXQgdGhlIHVzZXIgam9pbmluZyB0aGUgd2FpdGluZyByb29tXG4gICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgbWVzc2FnZTogYCR7bmFtZX0gam9pbmVkIHRoZSB3YWl0aW5nIHJvb20uYCxcbiAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgIH0pO1xuXG4gICAgLy8gVXBkYXRlIHRoZSB0b3RhbCBudW1iZXIgb2YgcmVxdWVzdHMgd2FpdGluZyBpbiB0aGUgd2FpdGluZyByb29tXG4gICAgY29uc3QgdG90YWxSZXFzID0gdG90YWxSZXFXYWl0ICsgMTtcbiAgICB1cGRhdGVUb3RhbFJlcVdhaXQodG90YWxSZXFzKTtcbiAgfTtcbn1cbiJdfQ==