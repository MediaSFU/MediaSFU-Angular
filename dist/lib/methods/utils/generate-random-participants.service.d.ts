import { Participant } from '../../@types/types';
import * as i0 from "@angular/core";
export interface GenerateRandomParticipantsOptions {
    member: string;
    coHost?: string;
    host: string;
    forChatBroadcast?: boolean;
}
export type GenerateRandomParticipantsType = (options: GenerateRandomParticipantsOptions) => Participant[];
export declare class GenerateRandomParticipants {
    /**
     * Generates a list of random participants with specified options.
     *
     * @param {Object} options - The options for generating participants.
     * @param {string} options.member - The member to include in the participants list.
     * @param {string} [options.coHost=""] - The co-host to include in the participants list.
     * @param {string} options.host - The host to include in the participants list.
     * @param {boolean} [options.forChatBroadcast=false] - Whether the participants are for a chat broadcast.
     * @returns {Participant[]} An array of generated participants.
     */
    generateRandomParticipants({ member, coHost, host, forChatBroadcast, }: GenerateRandomParticipantsOptions): Participant[];
    static ɵfac: i0.ɵɵFactoryDeclaration<GenerateRandomParticipants, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GenerateRandomParticipants>;
}
