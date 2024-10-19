import { ShowAlert, CoHostResponsibility } from '../../@types/types';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface ModifyCoHostSettingsOptions {
    roomName: string;
    showAlert?: ShowAlert;
    selectedParticipant: string;
    coHost: string;
    coHostResponsibility: CoHostResponsibility[];
    updateIsCoHostModalVisible: (isVisible: boolean) => void;
    updateCoHostResponsibility: (coHostResponsibility: CoHostResponsibility[]) => void;
    updateCoHost: (coHost: string) => void;
    socket: Socket;
}
export type ModifyCoHostSettingsType = (options: ModifyCoHostSettingsOptions) => Promise<void>;
export declare class ModifyCoHostSettings {
    /**
     * Modifies the co-host settings for a given room.
     *
     * @param {Object} options - The options for modifying co-host settings.
     * @param {string} options.roomName - The name of the room.
     * @param {Function} options.showAlert - Function to show an alert message.
     * @param {string} options.selectedParticipant - The participant selected to be co-host.
     * @param {string} options.coHost - The current co-host.
     * @param {string} options.coHostResponsibility - The responsibility assigned to the co-host.
     * @param {Function} options.updateIsCoHostModalVisible - Function to update the visibility of the co-host modal.
     * @param {Function} options.updateCoHostResponsibility - Function to update the co-host responsibility.
     * @param {Function} options.updateCoHost - Function to update the co-host.
     * @param {Object} options.socket - The socket instance for emitting events.
     * @returns {Promise<void>} A promise that resolves when the co-host settings have been modified.
     *
     * @remarks
     * - If the room is in demo mode (room name starts with "d"), co-host cannot be added and an alert is shown.
     * - If a valid participant is selected, they are set as the new co-host.
     * - The co-host responsibility is updated.
     * - A socket event is emitted to update the co-host information.
     * - The co-host modal is closed after updating the settings.
     */
    modifyCoHostSettings({ roomName, showAlert, selectedParticipant, coHost, coHostResponsibility, updateIsCoHostModalVisible, updateCoHostResponsibility, updateCoHost, socket, }: ModifyCoHostSettingsOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModifyCoHostSettings, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ModifyCoHostSettings>;
}
