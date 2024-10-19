import { Injectable } from '@angular/core';
import { Poll, ShowAlert, PollUpdatedData } from '../../@types/types';
export interface PollUpdatedOptions {
  data: PollUpdatedData;
  polls: Poll[];
  poll: Poll;
  member: string;
  islevel: string;
  showAlert?: ShowAlert;
  updatePolls: (polls: Poll[]) => void;
  updatePoll: (poll: Poll) => void;
  updateIsPollModalVisible: (isVisible: boolean) => void;
}

// Export the type definition for the function
export type PollUpdatedType = (options: PollUpdatedOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class PollUpdated {
  /**
   * Updates the poll state based on the provided data.
   *
   * @param {Object} options - The options for updating the poll.
   * @param {any} options.data - The data containing poll information.
   * @param {any[]} options.polls - The current list of polls.
   * @param {any} options.poll - The current poll.
   * @param {string} options.member - The member identifier.
   * @param {string} options.islevel - The level of the member.
   * @param {Function} options.showAlert - Function to show alerts.
   * @param {Function} options.updatePolls - Function to update the list of polls.
   * @param {Function} options.updatePoll - Function to update the current poll.
   * @param {Function} options.updateIsPollModalVisible - Function to update the visibility of the poll modal.
   * @returns {Promise<void>} A promise that resolves when the poll update is complete.
   */

  async pollUpdated({
    data,
    polls,
    poll,
    member,
    islevel,
    showAlert,
    updatePolls,
    updatePoll,
    updateIsPollModalVisible,
  }: PollUpdatedOptions): Promise<void> {
    try {
      if (data.polls) {
        polls = data.polls;
        updatePolls(data.polls);
      } else {
        polls = [data.poll];
        updatePolls(polls);
      }

      let temp_poll = { id: '' };

      if (poll) {
        temp_poll = { ...poll };
      }

      if (data.status != 'ended') {
        poll = data.poll;
        updatePoll(data.poll);
      }

      if (data.status === 'started' && islevel !== '2') {
        if (!poll.voters || (poll.voters && !poll.voters[member])) {
          showAlert?.({ message: 'New poll started', type: 'success', duration: 3000 });
          updateIsPollModalVisible(true);
        }
      } else if (data.status === 'ended') {
        if (temp_poll.id === data.poll.id) {
          showAlert?.({ message: 'Poll ended', type: 'danger', duration: 3000 });
          // update the poll
          updatePoll(data.poll);
        }
      }
    } catch (error) {
      // console.log(error);
    }
  }
}
