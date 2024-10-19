import { Injectable } from '@angular/core';
import { ReorderStreamsType, ReorderStreamsParameters, EventType } from '../@types/types';
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

@Injectable({
  providedIn: 'root',
})
export class OnScreenChanges {
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
  onScreenChanges = async ({
    changed = false,
    parameters,
  }: OnScreenChangesOptions): Promise<void> => {
    try {
      // Destructure parameters
      let {
        eventType,
        shareScreenStarted,
        shared,
        addForBasic,
        updateMainHeightWidth,
        updateAddForBasic,
        itemPageLimit,
        updateItemPageLimit,

        // mediasfu functions
        reorderStreams,
      } = parameters;

      // Remove element with id 'controlButtons'
      addForBasic = false;
      updateAddForBasic(addForBasic);

      if (eventType == 'broadcast' || eventType == 'chat') {
        addForBasic = true;
        updateAddForBasic(addForBasic);

        itemPageLimit = eventType == 'broadcast' ? 1 : 2;
        updateItemPageLimit(itemPageLimit);
        updateMainHeightWidth(eventType == 'broadcast' ? 100 : 0);
      } else {
        if (eventType == 'conference' && !(shareScreenStarted || shared)) {
          updateMainHeightWidth(0);
        }
      }

      // Update the mini cards grid
      await reorderStreams({ add: false, screenChanged: changed, parameters });
    } catch (error: any) {
      // Handle errors during the process of handling screen changes
      console.log('Error handling screen changes:', error.message);
      // throw error;
    }
  };
}
