import * as i0 from "@angular/core";
export interface LaunchParticipantsOptions {
    updateIsParticipantsModalVisible: (isVisible: boolean) => void;
    isParticipantsModalVisible: boolean;
}
export type LaunchParticipantsType = (options: LaunchParticipantsOptions) => void;
export declare class LaunchParticipants {
    /**
     * Toggles the visibility of the participants modal.
     * @function
     * @param {Object} options - The options object containing necessary variables and functions.
     * @param {Function} options.updateIsParticipantsModalVisible - Function to update the visibility state of the participants modal.
     * @param {boolean} options.isParticipantsModalVisible - Current visibility state of the participants modal.
     */
    launchParticipants({ updateIsParticipantsModalVisible, isParticipantsModalVisible, }: LaunchParticipantsOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LaunchParticipants, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LaunchParticipants>;
}
