import { Injectable } from '@angular/core';
import {
  Participant,
  PrepopulateUserMediaType,
  ReorderStreamsType,
  ReUpdateInterParameters,
  ReUpdateInterType,
  ReorderStreamsParameters,
  PrepopulateUserMediaParameters,
} from '../../@types/types';

export interface ProducerMediaPausedParameters
  extends PrepopulateUserMediaParameters,
    ReorderStreamsParameters,
    ReUpdateInterParameters {
  activeSounds: string[];
  meetingDisplayType: string;
  meetingVideoOptimized: boolean;
  participants: Participant[];
  oldSoundIds: string[];
  shared: boolean;
  shareScreenStarted: boolean;
  updateMainWindow: boolean;
  hostLabel: string;
  islevel: string;
  updateActiveSounds: (activeSounds: string[]) => void;
  updateUpdateMainWindow: (updateMainWindow: boolean) => void;

  // mediasfu functions
  reorderStreams: ReorderStreamsType;
  prepopulateUserMedia: PrepopulateUserMediaType;
  reUpdateInter: ReUpdateInterType;

  getUpdatedAllParams: () => ProducerMediaPausedParameters;
  [key: string]: any;
}

export interface ProducerMediaPausedOptions {
  producerId: string;
  kind: 'audio' | 'video' | 'screenshare' | 'screen';
  name: string;
  parameters: ProducerMediaPausedParameters;
}

// Export the type definition for the function
export type ProducerMediaPausedType = (options: ProducerMediaPausedOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class ProducerMediaPaused {
  /**
   * Handles the event when media is paused for a producer.
   *
   * @param {ProducerMediaPausedOptions} options - The options for the producer media paused event.
   * @param {string} options.producerId - The ID of the producer.
   * @param {string} options.kind - The kind of media (e.g., "audio", "video").
   * @param {string} options.name - The name of the producer.
   * @param {Parameters} options.parameters - The parameters for the event.
   *
   * @returns {Promise<void>} A promise that resolves when the media paused handling is complete.
   *
   * @description
   * This function handles the event when media is paused for a producer. It performs the following tasks:
   * - Updates the parameters.
   * - Iterates through participants and updates the UI based on their muted status and other conditions.
   * - Handles meeting display type and optimizes the UI accordingly.
   * - Manages audio media by updating the relevant participant's state.
   */
  producerMediaPaused = async ({
    producerId,
    kind,
    name,
    parameters,
  }: ProducerMediaPausedOptions): Promise<void> => {
    parameters = parameters.getUpdatedAllParams();

    let {
      activeSounds,
      meetingDisplayType,
      meetingVideoOptimized,
      participants,
      oldSoundIds,
      shared,
      shareScreenStarted,
      updateMainWindow,
      hostLabel,
      islevel,
      updateActiveSounds,
      updateUpdateMainWindow,
      reorderStreams,
      prepopulateUserMedia,
      reUpdateInter,
    } = parameters;

    await Promise.all(
      participants.map(async (participant: any) => {
        if (participant.muted) {
          try {
            if (
              participant.islevel == '2' &&
              !participant.videoID &&
              !shared &&
              !shareScreenStarted &&
              islevel != '2'
            ) {
              updateMainWindow = true;
              updateUpdateMainWindow(updateMainWindow);
              await prepopulateUserMedia({ name: hostLabel, parameters });
              updateMainWindow = false;
              updateUpdateMainWindow(updateMainWindow);
            }
          } catch {
            /* handle error */
          }

          if (shareScreenStarted || shared) {
            if (activeSounds.includes(participant.name)) {
              activeSounds = activeSounds.filter(
                (audioStream: any) => audioStream != participant.name,
              );
              updateActiveSounds(activeSounds);
            }
            await reUpdateInter({ name: participant.name, add: false, force: true, parameters });
          }
        }
      }),
    );

    let checker = false;
    if (
      meetingDisplayType == 'media' ||
      (meetingDisplayType == 'video' && !meetingVideoOptimized)
    ) {
      const participant = participants.find((obj: any) => obj.name == name);
      checker = !!participant?.videoID;
      if (!checker && !shareScreenStarted && !shared) {
        await reorderStreams({ add: false, screenChanged: true, parameters });
      }
    }

    if (kind == 'audio') {
      try {
        const participant =
          participants.find((obj: any) => obj.audioID == producerId) ||
          participants.find((obj: any) => obj.name == name);
        if (
          participant &&
          ((participant.name && oldSoundIds.includes(participant.name)) ||
            (name && oldSoundIds.includes(name)))
        ) {
          reUpdateInter({
            name: participant.name ?? '',
            add: false,
            force: true,
            parameters,
          });
        }
      } catch {
        /* handle error */
      }
    }
  };
}
