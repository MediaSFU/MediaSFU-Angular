import { Request, Participant } from '../../@types/types';
import * as i0 from "@angular/core";
export interface GenerateRandomRequestListOptions {
    participants: Participant[];
    hostName: string;
    coHostName?: string;
    numberOfRequests: number;
}
export type GenerateRandomRequestListType = (options: GenerateRandomRequestListOptions) => Request[];
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
export declare class GenerateRandomRequestList {
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
    generateRandomRequestList({ participants, hostName, coHostName, numberOfRequests, }: GenerateRandomRequestListOptions): Request[];
    static ɵfac: i0.ɵɵFactoryDeclaration<GenerateRandomRequestList, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GenerateRandomRequestList>;
}
