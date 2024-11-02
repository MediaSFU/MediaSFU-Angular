import { Injectable } from '@angular/core';
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
  async autoAdjust({
    n,
    eventType,
    shareScreenStarted,
    shared,
  }: AutoAdjustOptions): Promise<number[]> {
    // Default values
    let val1 = 6;
    let val2 = 12 - val1;

    // Calculate percentage values

    // Adjust values based on eventType and other conditions
    if (eventType === 'broadcast') {
      val1 = 0;
      val2 = 12 - val1;
    } else if (
      eventType === 'chat' ||
      (eventType === 'conference' && !(shareScreenStarted || shared))
    ) {
      val1 = 12;
      val2 = 12 - val1;
    } else {
      if (shareScreenStarted || shared) {
        val2 = 10;
        val1 = 12 - val2;
      } else {
        // Adjust values based on the number of participants (n)
        if (n === 0) {
          val1 = 1;
          val2 = 12 - val1;
        } else if (n >= 1 && n < 4) {
          val1 = 4;
          val2 = 12 - val1;
        } else if (n >= 4 && n < 6) {
          val1 = 6;
          val2 = 12 - val1;
        } else if (n >= 6 && n < 9) {
          val1 = 6;
          val2 = 12 - val1;
        } else if (n >= 9 && n < 12) {
          val1 = 6;
          val2 = 12 - val1;
        } else if (n >= 12 && n < 20) {
          val1 = 8;
          val2 = 12 - val1;
        } else if (n >= 20 && n < 50) {
          val1 = 8;
          val2 = 12 - val1;
        } else {
          val1 = 10;
          val2 = 12 - val1;
        }
      }
    }

    // Return an array with adjusted values
    return [val1, val2];
  }
}
