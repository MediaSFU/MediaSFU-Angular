import { Injectable } from '@angular/core';
import { CoHostResponsibility, EventType, ShowAlert } from '../../@types/types';
export interface UpdatedCoHostOptions {
  coHost: string;
  coHostResponsibility: CoHostResponsibility[];
  showAlert?: ShowAlert;
  eventType: EventType;
  islevel: string;
  member: string;
  youAreCoHost: boolean;
  updateCoHost: (coHost: string) => void;
  updateCoHostResponsibility: (responsibility: CoHostResponsibility[]) => void;
  updateYouAreCoHost: (youAreCoHost: boolean) => void;
}

// Export the type definition for the function
export type UpdatedCoHostType = (options: UpdatedCoHostOptions) => Promise<void>;

/**
 * Service for updating co-host information, responsibilities, and the user's co-host status.
 *
 * @class
 * @name UpdatedCoHost
 * @description Manages co-host updates for different event types, assigning responsibilities and notifying the user if their co-host status changes.
 *
 * @method
 * updatedCoHost
 * @async
 *
 * @param {UpdatedCoHostOptions} options - The options for co-host updates:
 *   - `coHost` {string}: The name of the co-host.
 *   - `coHostResponsibility` {CoHostResponsibility[]}: List of responsibilities assigned to the co-host.
 *   - `showAlert` {ShowAlert}: Optional function to display an alert message.
 *   - `eventType` {EventType}: Type of the event, determining if co-host can be updated.
 *   - `islevel` {string}: Current level of the event.
 *   - `member` {string}: The current user's identifier.
 *   - `youAreCoHost` {boolean}: Current user's co-host status.
 *   - `updateCoHost` {Function}: Function to set the new co-host.
 *   - `updateCoHostResponsibility` {Function}: Function to assign responsibilities to the co-host.
 *   - `updateYouAreCoHost` {Function}: Function to update the user's co-host status.
 *
 * @returns {Promise<void>} Resolves after co-host information is updated.
 *
 * @example
 * const options = {
 *   coHost: 'Alice',
 *   coHostResponsibility: ['moderate', 'manageParticipants'],
 *   showAlert: ({ message, type, duration }) => console.log(message),
 *   eventType: 'conference',
 *   islevel: '1',
 *   member: 'Alice',
 *   youAreCoHost: false,
 *   updateCoHost: (newCoHost) => console.log(`Updated co-host: ${newCoHost}`),
 *   updateCoHostResponsibility: (responsibilities) => console.log(responsibilities),
 *   updateYouAreCoHost: (status) => console.log(`You are co-host: ${status}`)
 * };
 * await updatedCoHostService.updatedCoHost(options);
 */


@Injectable({
  providedIn: 'root',
})
export class UpdatedCoHost {
  /**
   * Updates the co-host information, responsibility, and user's co-host status based on the provided options.
   *
   * @param options - The options for updating the co-host.
   * @param options.coHost - The co-host to be updated.
   * @param options.coHostResponsibility - The responsibility of the co-host.
   * @param options.showAlert - A function to show alerts.
   * @param options.eventType - The type of event triggering the update.
   * @param options.islevel - The level of the event.
   * @param options.member - The member to be checked against the co-host.
   * @param options.youAreCoHost - The current co-host status of the user.
   * @param options.updateCoHost - A function to update the co-host.
   * @param options.updateCoHostResponsibility - A function to update the co-host's responsibility.
   * @param options.updateYouAreCoHost - A function to update the user's co-host status.
   *
   * @returns A promise that resolves when the co-host information has been updated.
   */
  updatedCoHost = async ({
    coHost,
    coHostResponsibility,
    showAlert,
    eventType,
    islevel,
    member,
    youAreCoHost,
    updateCoHost,
    updateCoHostResponsibility,
    updateYouAreCoHost,
  }: UpdatedCoHostOptions): Promise<void> => {
    // Update co-host information, responsibility, and user's co-host status
    if (eventType !== 'broadcast' && eventType !== 'chat') {
      // Only update the co-host if the event type is not broadcast or chat
      updateCoHost(coHost);
      updateCoHostResponsibility(coHostResponsibility);

      if (member === coHost) {
        if (!youAreCoHost) {
          updateYouAreCoHost(true);

          showAlert?.({
            message: 'You are now a co-host.',
            type: 'success',
            duration: 3000,
          });
        }
      } else {
        updateYouAreCoHost(false);
      }
    } else {
      if (islevel !== '2') {
        updateYouAreCoHost(true);
      }
    }
  };
}
