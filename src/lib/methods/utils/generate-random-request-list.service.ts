import { Injectable } from '@angular/core';
import { Request, Participant } from '../../@types/types';

export interface GenerateRandomRequestListOptions {
  participants: Participant[];
  hostName: string;
  coHostName?: string;
  numberOfRequests: number;
}

// Export the type definition for the function
export type GenerateRandomRequestListType = (
  options: GenerateRandomRequestListOptions,
) => Request[];

 /**
   * Generates a random list of requests for participants, ensuring unique icons per participant
   * and excluding the host and co-host from the request list.
   *
   * @param {GenerateRandomRequestListOptions} options - Configuration options for generating requests.
   * @param {Participant[]} options.participants - Array of participant objects.
   * @param {string} options.hostName - Name of the host to be excluded.
   * @param {string} [options.coHostName] - Optional name of the co-host to be excluded.
   * @param {number} options.numberOfRequests - Number of requests to generate per participant.
   * @returns {Request[]} Array of requests, each uniquely associated with a participant.
   *
   * @example
   * ```typescript
   * const requestService = new GenerateRandomRequestList();
   * const participants = [
   *   { id: '1', name: 'Alice' },
   *   { id: '2', name: 'Bob' },
   *   { id: '3', name: 'Charlie' }
   * ];
   * const options = {
   *   participants,
   *   hostName: 'Alice',
   *   coHostName: 'Bob',
   *   numberOfRequests: 2
   * };
   *
   * const requests = requestService.generateRandomRequestList(options);
   *
   * console.log(requests);
   * // Output:
   * // [
   * //   { id: '3', name: 'charlie', icon: 'fa-microphone', username: 'charlie' },
   * //   { id: '3', name: 'charlie', icon: 'fa-desktop', username: 'charlie' }
   * // ]
   * ```
   */

@Injectable({
  providedIn: 'root',
})
export class GenerateRandomRequestList {
  /**
   * Generates a list of random requests for participants, excluding the host and co-host.
   *
   * @param {GenerateRandomRequestListOptions} options - The options for generating the request list.
   * @param {Participant[]} options.participants - The list of participants.
   * @param {string} options.hostName - The name of the host.
   * @param {string} options.coHostName - The name of the co-host.
   * @param {number} options.numberOfRequests - The number of requests to generate for each participant.
   * @returns {Request[]} The generated list of requests.
   */
  generateRandomRequestList({
    participants,
    hostName,
    coHostName,
    numberOfRequests,
  }: GenerateRandomRequestListOptions): Request[] {
    // Filter out the host and co-host from the participants
    const filteredParticipants = participants.filter(
      (participant) => participant.name !== hostName && participant.name !== coHostName,
    );

    // Create an array with three possible request icons
    const requestIcons = ['fa-video', 'fa-desktop', 'fa-microphone'];

    // Shuffle the request icons array to ensure unique icons for each participant and randomly select a minimum of 1 and a maximum of 3 icons
    for (let i = requestIcons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [requestIcons[i], requestIcons[j]] = [requestIcons[j], requestIcons[i]];
    }

    // Generate unique requests for each participant with unique icons
    const requestList = filteredParticipants.flatMap((participant) => {
      const uniqueIcons = new Set<string>(); // To ensure unique icons for each participant

      const requests = [];
      for (let i = 0; i < numberOfRequests; i++) {
        let randomIcon;
        do {
          randomIcon = requestIcons[Math.floor(Math.random() * requestIcons.length)];
        } while (uniqueIcons.has(randomIcon));

        uniqueIcons.add(randomIcon);

        requests.push({
          id: participant.id || '',
          name: participant.name.toLowerCase().replace(/\s/g, '_'),
          icon: randomIcon,
          username: participant.name.toLowerCase().replace(/\s/g, '_'),
        });
      }

      return requests;
    });

    return requestList;
  }
}
