import { Poll, ShowAlert, PollUpdatedData } from '../../@types/types';
import * as i0 from "@angular/core";
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
export type PollUpdatedType = (options: PollUpdatedOptions) => Promise<void>;
/**
 * Updates the poll state based on the provided data.
 *
 * @param {PollUpdatedOptions} options - The options for updating the poll.
 * @param {PollUpdatedData} options.data - The data containing poll information.
 * @param {Poll[]} options.polls - The current list of polls.
 * @param {Poll} options.poll - The current poll.
 * @param {string} options.member - The member identifier.
 * @param {string} options.islevel - The level of the member.
 * @param {Function} [options.showAlert] - Function to show alerts.
 * @param {Function} options.updatePolls - Function to update the list of polls.
 * @param {Function} options.updatePoll - Function to update the current poll.
 * @param {Function} options.updateIsPollModalVisible - Function to update the visibility of the poll modal.
 * @returns {Promise<void>} A promise that resolves when the poll update is complete.
 *
 * @example
 * ```typescript
 * const pollUpdatedService = new PollUpdated();
 * pollUpdatedService.pollUpdated({
 *   data: { polls: [], poll: { id: '123', question: 'Sample Poll?', status: 'started' } },
 *   polls: [],
 *   poll: { id: '123', question: 'Sample Poll?', status: 'started' },
 *   member: 'user1',
 *   islevel: '1',
 *   showAlert: (alert) => console.log(alert.message),
 *   updatePolls: (polls) => console.log('Updated polls:', polls),
 *   updatePoll: (poll) => console.log('Updated poll:', poll),
 *   updateIsPollModalVisible: (visible) => console.log('Poll modal visibility:', visible),
 * });
 * ```
 */
export declare class PollUpdated {
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
    pollUpdated({ data, polls, poll, member, islevel, showAlert, updatePolls, updatePoll, updateIsPollModalVisible, }: PollUpdatedOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PollUpdated, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PollUpdated>;
}
