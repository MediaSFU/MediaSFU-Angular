import { ReorderStreamsType, ReorderStreamsParameters, EventType } from '../@types/types';
import * as i0 from "@angular/core";
export interface OnScreenChangesParameters extends ReorderStreamsParameters {
    eventType: EventType;
    shareScreenStarted: boolean;
    shared: boolean;
    addForBasic: boolean;
    updateAddForBasic: (value: boolean) => void;
    itemPageLimit: number;
    updateItemPageLimit: (value: number) => void;
    updateMainHeightWidth: (value: number) => void;
    reorderStreams: ReorderStreamsType;
    [key: string]: any;
}
export interface OnScreenChangesOptions {
    changed?: boolean;
    parameters: OnScreenChangesParameters;
}
export type OnScreenChangesType = (options: OnScreenChangesOptions) => Promise<void>;
export declare class OnScreenChanges {
    /**
     * Handles changes in screen events such as broadcast, chat, and conference.
     *
     * @param {OnScreenChangesOptions} options - The options for handling screen changes.
     * @param {boolean} options.changed - Indicates if the screen has changed.
     * @param {object} options.parameters - The parameters for handling screen changes.
     * @param {string} options.parameters.eventType - The type of event (e.g., "broadcast", "chat", "conference").
     * @param {boolean} options.parameters.shareScreenStarted - Indicates if screen sharing has started.
     * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
     * @param {boolean} options.parameters.addForBasic - Flag to add basic controls.
     * @param {function} options.parameters.updateMainHeightWidth - Function to update the main height and width.
     * @param {function} options.parameters.updateAddForBasic - Function to update the addForBasic flag.
     * @param {number} options.parameters.itemPageLimit - The limit for item pages.
     * @param {function} options.parameters.updateItemPageLimit - Function to update the item page limit.
     * @param {function} options.parameters.reorderStreams - Function to reorder streams.
     *
     * @returns {Promise<void>} A promise that resolves when the screen changes have been handled.
     *
     * @throws {Error} Throws an error if there is an issue handling screen changes.
     */
    onScreenChanges: ({ changed, parameters, }: OnScreenChangesOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OnScreenChanges, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OnScreenChanges>;
}
