import { Injectable } from '@angular/core';
import { Participant } from '../../@types/types';

export interface ScreenProducerIdOptions {
  producerId: string;
  screenId: string;
  membersReceived: boolean;
  shareScreenStarted: boolean;
  deferScreenReceived: boolean;
  participants: Participant[];
  updateScreenId: (id: string) => void;
  updateShareScreenStarted: (started: boolean) => void;
  updateDeferScreenReceived: (received: boolean) => void;
}

// Export the type definition for the function
export type ScreenProducerIdType = (options: ScreenProducerIdOptions) => void;

@Injectable({
  providedIn: 'root',
})
export class ScreenProducerId {
  /**
   * Handles the screen producer id.
   *
   * @param producerId - The id of the producer.
   * @param screenId - The id of the screen.
   * @param membersReceived - Whether the members data has been received.
   * @param shareScreenStarted - Whether the screen sharing has started.
   * @param deferScreenReceived - Whether the screen sharing has been deferred.
   * @param participants - The list of participants.
   * @param updateScreenId - Function to update the screen id.
   * @param updateShareScreenStarted - Function to update the screen sharing status.
   * @param updateDeferScreenReceived - Function to update the screen sharing defer status.
   */
  screenProducerId = ({
    producerId,
    screenId,
    membersReceived,
    shareScreenStarted,
    deferScreenReceived,
    participants,
    updateScreenId,
    updateShareScreenStarted,
    updateDeferScreenReceived,
  }: ScreenProducerIdOptions): void => {
    // Check if members data has been received with the screenId participant in it
    let host = participants.find(
      (participant: Participant) =>
        participant.ScreenID === screenId && participant.ScreenOn === true,
    );

    // Operations to update the UI
    if (host && membersReceived) {
      screenId = producerId;
      shareScreenStarted = true;
      deferScreenReceived = false;

      updateScreenId(screenId);
      updateShareScreenStarted(shareScreenStarted);
      updateDeferScreenReceived(deferScreenReceived);
    } else {
      deferScreenReceived = true;
      screenId = producerId;

      updateScreenId(screenId);
      updateDeferScreenReceived(deferScreenReceived);
    }
  };
}
