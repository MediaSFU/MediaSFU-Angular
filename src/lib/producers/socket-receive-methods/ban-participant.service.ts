import { Injectable } from '@angular/core';
import { Participant, ReorderStreamsType, ReorderStreamsParameters } from '../../@types/types';

export interface BanParticipantParameters extends ReorderStreamsParameters {
  activeNames: string[];
  dispActiveNames: string[];
  participants: Participant[];
  updateParticipants: (participants: Participant[]) => void;

  // mediasfu functions
  reorderStreams: ReorderStreamsType;
  [key: string]: any;
}

export interface BanParticipantOptions {
  name: string;
  parameters: BanParticipantParameters;
}

// Export the type definition for the function
export type BanParticipantType = (options: BanParticipantOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class BanParticipant {
  /**
   * Bans a participant from the session by removing them from the active and display names arrays,
   * updating the participants list, and reordering the streams.
   *
   * @param {BanParticipantOptions} options - The options for banning a participant.
   * @param {string} options.name - The name of the participant to be banned.
   * @param {Object} options.parameters - The parameters required for banning the participant.
   * @param {string[]} options.parameters.activeNames - The array of active participant names.
   * @param {string[]} options.parameters.dispActiveNames - The array of display participant names.
   * @param {Object[]} options.parameters.participants - The array of participant objects.
   * @param {Function} options.parameters.updateParticipants - The function to update the participants array.
   * @param {Function} options.parameters.reorderStreams - The function to reorder the streams.
   *
   * @returns {Promise<void>} A promise that resolves when the participant has been banned and streams reordered.
   */
  banParticipant = async ({ name, parameters }: BanParticipantOptions): Promise<void> => {
    const { activeNames, dispActiveNames, participants, updateParticipants, reorderStreams } =
      parameters;

    // Check if the participant is in the active or display names array
    if (activeNames.includes(name) || dispActiveNames.includes(name)) {
      // Filter out the banned participant from the participants array
      const updatedParticipants = participants.filter(
        (participant: Participant) => participant.name !== name,
      );

      // Update the participants array
      updateParticipants(updatedParticipants);

      // Reorder streams after participant removal
      await reorderStreams({ add: false, screenChanged: true, parameters });
    }
  };
}
