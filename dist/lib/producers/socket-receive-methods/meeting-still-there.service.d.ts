import * as i0 from "@angular/core";
export interface MeetingStillThereOptions {
    updateIsConfirmHereModalVisible: (isVisible: boolean) => void;
}
export type MeetingStillThereType = (options: MeetingStillThereOptions) => Promise<void>;
/**
 * Service to handle the "still there?" check in a meeting by showing a confirmation modal.
 *
 * @class
 * @name MeetingStillThere
 * @description
 * This service provides a method to display a "still there?" confirmation modal to check if participants are still active in the meeting.
 *
 * @method
 * meetingStillThere
 *
 * @param {MeetingStillThereOptions} options - Options for managing the modal visibility:
 *   - `updateIsConfirmHereModalVisible` {Function}: Function to set the visibility of the "still there?" confirmation modal.
 *
 * @returns {Promise<void>} Updates modal visibility when checking if the user is still present.
 *
 * @example
 * const options = {
 *   updateIsConfirmHereModalVisible: (isVisible) => console.log(`Modal visibility: ${isVisible}`),
 * };
 * meetingStillThereService.meetingStillThere(options);
 * // Output: Sets and logs modal visibility to true
 */
export declare class MeetingStillThere {
    /**
     * Handles the "still there?" meeting check by updating the visibility of the confirmation modal.
     *
     * @param {Object} options - The options for the meeting still there check.
     * @param {Function} options.updateIsConfirmHereModalVisible - Function to update the visibility of the "still there?" modal.
     * @returns {Promise<void>} A promise that resolves when the modal visibility is updated.
     */
    meetingStillThere: ({ updateIsConfirmHereModalVisible }: MeetingStillThereOptions) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MeetingStillThere, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MeetingStillThere>;
}
