import { CoHostResponsibility, EventType, ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface UpdatedCoHostOptions {
    coHost: string;
    coHostResponsibility: CoHostResponsibility[];
    showAlert?: ShowAlert;
    eventType: EventType;
    islevel: string;
    member: string;
    youAreCoHost: boolean;
    updateCoHost: (coHost: string) => void;
    updateCoHostResponsibility: (responsibility: CoHostResponsibility[]) => void;
    updateYouAreCoHost: (youAreCoHost: boolean) => void;
}
export type UpdatedCoHostType = (options: UpdatedCoHostOptions) => Promise<void>;
export declare class UpdatedCoHost {
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
    updatedCoHost: ({ coHost, coHostResponsibility, showAlert, eventType, islevel, member, youAreCoHost, updateCoHost, updateCoHostResponsibility, updateYouAreCoHost, }: UpdatedCoHostOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpdatedCoHost, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UpdatedCoHost>;
}
