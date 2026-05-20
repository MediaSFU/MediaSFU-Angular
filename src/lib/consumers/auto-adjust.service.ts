import { Injectable } from '@angular/core';
import { autoAdjust as sharedAutoAdjust } from 'mediasfu-shared';
import { EventType } from '../@types/types';

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


@Injectable({
  providedIn: 'root',
})
export class AutoAdjust {
  async autoAdjust({
    n,
    eventType,
    shareScreenStarted,
    shared,
  }: AutoAdjustOptions): Promise<number[]> {
    return sharedAutoAdjust({
      n,
      eventType,
      shareScreenStarted,
      shared,
    });
  }
}
