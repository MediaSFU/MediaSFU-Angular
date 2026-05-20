import { Injectable } from '@angular/core';
import { ReorderStreamsType, ReorderStreamsParameters, EventType } from '../@types/types';
import { onScreenChanges as sharedOnScreenChanges } from 'mediasfu-shared';
export interface OnScreenChangesParameters extends ReorderStreamsParameters {
  eventType: EventType;
  shareScreenStarted: boolean;
  shared: boolean;
  addForBasic: boolean;
  updateAddForBasic: (value: boolean) => void;
  itemPageLimit: number;
  updateItemPageLimit: (value: number) => void;
  updateMainHeightWidth: (value: number) => void;

  //mediasfu functions
  reorderStreams: ReorderStreamsType;
  [key: string]: any;
}

export interface OnScreenChangesOptions {
  changed?: boolean;
  parameters: OnScreenChangesParameters;
}

// Export the type definition for the function
export type OnScreenChangesType = (options: OnScreenChangesOptions) => Promise<void>;

/**
 * Handles changes in screen events such as broadcast, chat, and conference.
 *
 * @param {OnScreenChangesOptions} options - The options for handling screen changes.
 * @param {boolean} [options.changed=false] - Indicates if the screen has changed.
 * @param {OnScreenChangesParameters} options.parameters - The parameters for handling screen changes.
 * @param {string} options.parameters.eventType - The type of event (e.g., "broadcast", "chat", "conference").
 * @param {boolean} options.parameters.shareScreenStarted - Indicates if screen sharing has started.
 * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
 * @param {boolean} options.parameters.addForBasic - Flag to add basic controls.
 * @param {Function} options.parameters.updateMainHeightWidth - Function to update the main height and width.
 * @param {Function} options.parameters.updateAddForBasic - Function to update the addForBasic flag.
 * @param {number} options.parameters.itemPageLimit - The limit for item pages.
 * @param {Function} options.parameters.updateItemPageLimit - Function to update the item page limit.
 * @param {Function} options.parameters.reorderStreams - Function to reorder streams.
 *
 * @returns {Promise<void>} A promise that resolves when the screen changes have been handled.
 *
 * @throws {Error} Throws an error if there is an issue handling screen changes.
 *
 * @example
 * ```typescript
 * const options = {
 *   changed: true,
 *   parameters: {
 *     eventType: 'broadcast',
 *     shareScreenStarted: false,
 *     shared: false,
 *     addForBasic: false,
 *     updateMainHeightWidth: (value) => { console.log(updated) },
 *     updateAddForBasic: (value) => { console.log(updated) },
 *     itemPageLimit: 1,
 *     updateItemPageLimit: (value) => { console.log(updated) },
 *     reorderStreams: async (params) => { },
 *   },
 * };
 *
 * await onScreenChanges(options);
 * ```
 */


@Injectable({
  providedIn: 'root',
})
export class OnScreenChanges {
  async onScreenChanges({
    changed = false,
    parameters,
  }: OnScreenChangesOptions): Promise<void> {
    return sharedOnScreenChanges({
      changed,
      parameters: parameters as unknown as Parameters<typeof sharedOnScreenChanges>[0]['parameters'],
    }) as Promise<void>;
  }
}
