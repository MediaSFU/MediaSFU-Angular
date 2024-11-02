import { Injectable } from '@angular/core';
import {
  Participant,
  Stream,
  OnScreenChangesType,
  ReorderStreamsType,
  ChangeVidsType,
  OnScreenChangesParameters,
  ReorderStreamsParameters,
  ChangeVidsParameters,
  EventType,
} from '../@types/types';
export interface ReUpdateInterParameters
  extends OnScreenChangesParameters,
    ReorderStreamsParameters,
    ChangeVidsParameters {
  screenPageLimit: number;
  itemPageLimit: number;
  reorderInterval: number;
  fastReorderInterval: number;
  eventType: EventType;
  participants: Participant[];
  allVideoStreams: (Participant | Stream)[];
  shared: boolean;
  shareScreenStarted: boolean;
  adminNameStream?: string;
  screenShareNameStream?: string;
  updateMainWindow: boolean;
  sortAudioLoudness: boolean;
  lastReorderTime: number;
  newLimitedStreams: (Participant | Stream)[];
  newLimitedStreamsIDs: string[];
  oldSoundIds: string[];
  updateUpdateMainWindow: (value: boolean) => void;
  updateSortAudioLoudness: (value: boolean) => void;
  updateLastReorderTime: (value: number) => void;
  updateNewLimitedStreams: (streams: (Participant | Stream)[]) => void;
  updateNewLimitedStreamsIDs: (ids: string[]) => void;
  updateOldSoundIds: (ids: string[]) => void;

  // mediasfu functions
  onScreenChanges: OnScreenChangesType;
  reorderStreams: ReorderStreamsType;
  changeVids: ChangeVidsType;

  getUpdatedAllParams: () => ReUpdateInterParameters;
  [key: string]: any;
}

export interface ReUpdateInterOptions {
  name: string;
  add?: boolean;
  force?: boolean;
  average?: number;
  parameters: ReUpdateInterParameters;
}

// Export the type definition for the function
export type ReUpdateInterType = (options: ReUpdateInterOptions) => Promise<void>;

/**
 * Updates the interaction state based on the provided options and parameters.
 *
 * This method handles the updating of participant interactions based on the event type, screen sharing status,
 * and various other parameters. It manages the addition and removal of streams in the context of screen sharing
 * and video/audio management.
 *
 * @param {ReUpdateInterOptions} options - The options for updating the interaction.
 * @param {string} options.name - The name of the participant.
 * @param {boolean} [options.add=false] - Whether to add the participant to the interaction.
 * @param {boolean} [options.force=false] - Whether to force the update.
 * @param {number} [options.average=127] - The average value used for determining reorder intervals.
 * @param {ReUpdateInterParameters} options.parameters - The parameters for updating the interaction.
 * @param {number} options.parameters.screenPageLimit - The screen page limit.
 * @param {number} options.parameters.itemPageLimit - The item page limit.
 * @param {number} options.parameters.reorderInterval - The reorder interval.
 * @param {number} options.parameters.fastReorderInterval - The fast reorder interval.
 * @param {string} options.parameters.eventType - The type of event (e.g., "broadcast", "chat", "conference").
 * @param {Array<Participant>} options.parameters.participants - The list of participants.
 * @param {Array<Stream | Participant>} options.parameters.allVideoStreams - The list of all video streams.
 * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
 * @param {boolean} options.parameters.shareScreenStarted - Indicates if screen sharing has started.
 * @param {string} options.parameters.adminNameStream - The admin name stream.
 * @param {string} options.parameters.screenShareNameStream - The screen share name stream.
 * @param {boolean} options.parameters.updateMainWindow - Whether to update the main window.
 * @param {boolean} options.parameters.sortAudioLoudness - Whether to sort audio by loudness.
 * @param {number} options.parameters.lastReorderTime - The last reorder time.
 * @param {Array<Stream | Participant>} options.parameters.newLimitedStreams - The list of new limited streams.
 * @param {Array<string>} options.parameters.newLimitedStreamsIDs - The list of new limited stream IDs.
 * @param {Array<string>} options.parameters.oldSoundIds - The list of old sound IDs.
 * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window.
 * @param {Function} options.parameters.updateSortAudioLoudness - Function to update the audio loudness sorting.
 * @param {Function} options.parameters.updateLastReorderTime - Function to update the last reorder time.
 * @param {Function} options.parameters.updateNewLimitedStreams - Function to update the new limited streams.
 * @param {Function} options.parameters.updateNewLimitedStreamsIDs - Function to update the new limited stream IDs.
 * @param {Function} options.parameters.updateOldSoundIds - Function to update the old sound IDs.
 * @param {Function} options.parameters.onScreenChanges - Function to handle screen changes.
 * @param {Function} options.parameters.reorderStreams - Function to reorder streams.
 * @param {Function} options.parameters.changeVids - Function to change videos.
 *
 * @returns {Promise<void>} A promise that resolves when the interaction update is complete.
 *
 * @throws {Error} Throws an error if there is an issue during the interaction update.
 *
 * @example
 * ```typescript
 * const options = {
 *   name: 'John Doe',
 *   add: true,
 *   parameters: {
 *     screenPageLimit: 5,
 *     itemPageLimit: 10,
 *     reorderInterval: 1000,
 *     fastReorderInterval: 500,
 *     eventType: 'conference',
 *     participants: [...],
 *     allVideoStreams: [...],
 *     shared: false,
 *     shareScreenStarted: false,
 *     adminNameStream: 'Admin',
 *     screenShareNameStream: 'ScreenShare',
 *     updateMainWindow: true,
 *     sortAudioLoudness: false,
 *     lastReorderTime: Date.now(),
 *     newLimitedStreams: [],
 *     newLimitedStreamsIDs: [],
 *     oldSoundIds: [],
 *     updateUpdateMainWindow: (value) => { console.log(updated) },
 *     updateSortAudioLoudness: (value) => { console.log(updated) },
 *     updateLastReorderTime: (value) => { console.log(updated) },
 *     updateNewLimitedStreams: (streams) => { console.log(updated) },
 *     updateNewLimitedStreamsIDs: (ids) => { console.log(updated) },
 *     updateOldSoundIds: (ids) => { console.log(updated) },
 *     onScreenChanges: async (opts) => {  },
 *     reorderStreams: async (opts) => {  },
 *     changeVids: async (opts) => {  },
 *   },
 * };
 *
 * await reUpdateInter(options);
 * ```
 */


@Injectable({
  providedIn: 'root',
})
export class ReUpdateInter {
  /**
   * Updates the interaction state based on the provided options and parameters.
   *
   * @param {ReUpdateInterOptions} options - The options for updating the interaction.
   * @param {string} options.name - The name of the participant.
   * @param {boolean} [options.add=false] - Whether to add the participant to the interaction.
   * @param {boolean} [options.force=false] - Whether to force the update.
   * @param {number} [options.average=127] - The average value used for determining reorder intervals.
   * @param {Object} options.parameters - The parameters for updating the interaction.
   * @param {number} options.parameters.screenPageLimit - The screen page limit.
   * @param {number} options.parameters.itemPageLimit - The item page limit.
   * @param {number} options.parameters.reorderInterval - The reorder interval.
   * @param {number} options.parameters.fastReorderInterval - The fast reorder interval.
   * @param {string} options.parameters.eventType - The type of event.
   * @param {Array} options.parameters.participants - The list of participants.
   * @param {Array} options.parameters.allVideoStreams - The list of all video streams.
   * @param {boolean} options.parameters.shared - Whether the screen is shared.
   * @param {boolean} options.parameters.shareScreenStarted - Whether screen sharing has started.
   * @param {string} options.parameters.adminNameStream - The admin name stream.
   * @param {string} options.parameters.screenShareNameStream - The screen share name stream.
   * @param {boolean} options.parameters.updateMainWindow - Whether to update the main window.
   * @param {boolean} options.parameters.sortAudioLoudness - Whether to sort audio by loudness.
   * @param {number} options.parameters.lastReorderTime - The last reorder time.
   * @param {Array} options.parameters.newLimitedStreams - The list of new limited streams.
   * @param {Array} options.parameters.newLimitedStreamsIDs - The list of new limited stream IDs.
   * @param {Array} options.parameters.oldSoundIds - The list of old sound IDs.
   * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window.
   * @param {Function} options.parameters.updateSortAudioLoudness - Function to update the audio loudness sorting.
   * @param {Function} options.parameters.updateLastReorderTime - Function to update the last reorder time.
   * @param {Function} options.parameters.updateNewLimitedStreams - Function to update the new limited streams.
   * @param {Function} options.parameters.updateNewLimitedStreamsIDs - Function to update the new limited stream IDs.
   * @param {Function} options.parameters.updateOldSoundIds - Function to update the old sound IDs.
   * @param {Function} options.parameters.onScreenChanges - Function to handle screen changes.
   * @param {Function} options.parameters.reorderStreams - Function to reorder streams.
   * @param {Function} options.parameters.changeVids - Function to change videos.
   *
   * @returns {Promise<void>} A promise that resolves when the interaction update is complete.
   */

  reUpdateInter = async ({
    name,
    add = false,
    force = false,
    average = 127,
    parameters,
  }: ReUpdateInterOptions): Promise<void> => {
    let {
      screenPageLimit,
      itemPageLimit,
      reorderInterval,
      fastReorderInterval,
      eventType,
      participants,
      allVideoStreams,
      shared,
      shareScreenStarted,
      adminNameStream,
      screenShareNameStream,
      updateMainWindow,
      sortAudioLoudness,
      lastReorderTime,
      newLimitedStreams,
      newLimitedStreamsIDs,
      oldSoundIds,
      updateUpdateMainWindow,
      updateSortAudioLoudness,
      updateLastReorderTime,
      updateNewLimitedStreams,
      updateNewLimitedStreamsIDs,
      updateOldSoundIds,
      onScreenChanges,
      reorderStreams,
      changeVids,
    } = parameters;

    if (eventType == 'broadcast' || eventType == 'chat') {
      return;
    }

    let refLimit = screenPageLimit - 1;

    if (shareScreenStarted || shared) {
      // Do something when screen is shared or screen share is started
    } else {
      refLimit = itemPageLimit - 1;

      if (add) {
        const currentTime = Date.now();
        if (
          (currentTime - lastReorderTime >= reorderInterval && average > 128.5) ||
          (average > 130 && currentTime - lastReorderTime >= fastReorderInterval)
        ) {
          lastReorderTime = currentTime;
          sortAudioLoudness = true;
          if (eventType == 'conference') {
            await onScreenChanges({ changed: true, parameters });
          } else {
            await reorderStreams({ add: false, screenChanged: true, parameters });
          }
          sortAudioLoudness = false;

          updateSortAudioLoudness(sortAudioLoudness);
          updateUpdateMainWindow(updateMainWindow);
          updateLastReorderTime(lastReorderTime);

          return;
        }
      }
    }

    let videoID: string | null = null;
    if (shareScreenStarted || shared) {
      if (add) {
        const participant = participants.find((p) => p.name === name);
        videoID = participant?.videoID ?? null;

        if (!videoID) {
          return;
        }

        if (!newLimitedStreamsIDs.includes(videoID)) {
          //first check length of newLimitedStreams to not exceed refLimit, if so remove oldSoundID from newLimitedStreams
          if (newLimitedStreams.length > refLimit) {
            let oldoldSounds = [...oldSoundIds];
            for (let i = 0; i < oldSoundIds.length; i++) {
              if (newLimitedStreams.length > refLimit) {
                // remove stream from newLimitedStreams
                if (newLimitedStreams.length < screenPageLimit) {
                  return;
                }
                const currentId = oldSoundIds[i];
                if (currentId !== screenShareNameStream && currentId !== adminNameStream) {
                  newLimitedStreams = newLimitedStreams.filter(
                    (stream) => stream.producerId !== currentId,
                  );
                  newLimitedStreamsIDs = newLimitedStreamsIDs.filter((id) => id !== currentId);
                  oldoldSounds = oldoldSounds.filter((id) => id !== currentId);
                }
              }
            }
            oldSoundIds = [...oldoldSounds];
          }

          const stream = allVideoStreams.find((s) => s.producerId === videoID);
          if (stream && newLimitedStreams.length < screenPageLimit) {
            newLimitedStreams.push(stream);
            newLimitedStreamsIDs.push(videoID);
            if (!oldSoundIds.includes(name)) {
              oldSoundIds.push(name);
            }
            await changeVids({ screenChanged: true, parameters });
          }
        }
      } else {
        if (!force) {
          try {
            // remove stream from newLimitedStreams
            if (newLimitedStreams.length < screenPageLimit) {
              return;
            }
            newLimitedStreams = newLimitedStreams.filter((stream) => stream.producerId != videoID);
            newLimitedStreamsIDs = newLimitedStreamsIDs.filter((id) => id !== videoID);
            oldSoundIds = oldSoundIds.filter((id) => id !== name);
            await changeVids({ parameters });
          } catch {
            /* handle error */
          }
        } else {
          const participant = participants.find((p) => p.name === name);
          if (participant?.muted) {
            try {
              newLimitedStreams = newLimitedStreams.filter(
                (stream) => stream.producerId !== videoID,
              );
              newLimitedStreamsIDs = newLimitedStreamsIDs.filter((id) => id !== videoID);
              oldSoundIds = oldSoundIds.filter((id) => id !== name);
              await changeVids({ parameters });
            } catch {
              /* handle error */
            }
          }
        }
      }

      updateNewLimitedStreams(newLimitedStreams);
      updateNewLimitedStreamsIDs(newLimitedStreamsIDs);
      updateOldSoundIds(oldSoundIds);
    }
  };
}
