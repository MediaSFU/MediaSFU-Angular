import { EventType } from '../@types/types';
import * as i0 from "@angular/core";
export interface AutoAdjustOptions {
    n: number;
    eventType: EventType;
    shareScreenStarted: boolean;
    shared: boolean;
}
export type AutoAdjustType = (options: AutoAdjustOptions) => Promise<number[]>;
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
