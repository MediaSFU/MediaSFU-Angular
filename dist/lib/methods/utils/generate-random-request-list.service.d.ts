import { Request, Participant } from '../../@types/types';
import * as i0 from "@angular/core";
export interface GenerateRandomRequestListOptions {
    participants: Participant[];
    hostName: string;
    coHostName?: string;
    numberOfRequests: number;
}
export type GenerateRandomRequestListType = (options: GenerateRandomRequestListOptions) => Request[];
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
