import * as i0 from "@angular/core";
export interface MeetingStillThereOptions {
    updateIsConfirmHereModalVisible: (isVisible: boolean) => void;
}
export type MeetingStillThereType = (options: MeetingStillThereOptions) => Promise<void>;
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
