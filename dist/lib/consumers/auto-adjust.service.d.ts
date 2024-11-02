import { EventType } from '../@types/types';
import * as i0 from "@angular/core";
export interface AutoAdjustOptions {
    n: number;
    eventType: EventType;
    shareScreenStarted: boolean;
    shared: boolean;
}
export type AutoAdjustType = (options: AutoAdjustOptions) => Promise<number[]>;
/**
 * @service AutoAdjust
 * @description Service to auto-adjust layout values based on the event type, number of participants, and sharing conditions. Useful for dynamically adjusting UI elements in different event settings.
 *
 * @method autoAdjust
 * Dynamically calculates and adjusts layout values (e.g., grid columns) based on conditions such as event type, participant count, and sharing status.
 *
 * @param {AutoAdjustOptions} options - Configuration options for the auto-adjustment.
 * @param {number} options.n - Number of participants in the event.
 * @param {EventType} options.eventType - Type of event (e.g., 'broadcast', 'chat', 'conference').
 * @param {boolean} options.shareScreenStarted - Indicates whether screen sharing is active.
 * @param {boolean} options.shared - Indicates if another resource is currently shared.
 *
 * @returns {Promise<number[]>} A promise resolving to an array of two adjusted layout values.
 *
 * @example
 * ```typescript
 * const [primaryLayout, secondaryLayout] = await autoAdjustService.autoAdjust({
 *   n: 5,
 *   eventType: 'conference',
 *   shareScreenStarted: false,
 *   shared: false,
 * });
 * console.log(primaryLayout, secondaryLayout); // Adjusted layout values based on inputs
 * ```
 */
export declare class AutoAdjust {
    /**
     * Adjusts values based on the provided options.
     *
     * @param {AutoAdjustOptions} options - The options for auto adjustment.
     * @param {number} options.n - The number of participants.
     * @param {string} options.eventType - The type of event (e.g., 'broadcast', 'chat', 'conference').
     * @param {boolean} options.shareScreenStarted - Indicates if screen sharing has started.
     * @param {boolean} options.shared - Indicates if something is shared.
     *
     * @returns {Promise<number[]>} A promise that resolves to an array containing the adjusted values.
     */
    autoAdjust({ n, eventType, shareScreenStarted, shared, }: AutoAdjustOptions): Promise<number[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutoAdjust, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AutoAdjust>;
}
