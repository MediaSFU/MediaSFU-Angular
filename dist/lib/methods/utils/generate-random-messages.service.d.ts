import { Message, Participant } from '../../@types/types';
import * as i0 from "@angular/core";
export interface GenerateRandomMessagesOptions {
    participants: Participant[];
    member: string;
    coHost?: string;
    host: string;
    forChatBroadcast?: boolean;
}
export type GenerateRandomMessagesType = (options: GenerateRandomMessagesOptions) => Message[];
export declare class GenerateRandomMessages {
    /**
     * Generates random messages for a given set of participants.
     *
     * @param {Object} options - The options for generating random messages.
     * @param {Array} options.participants - The list of participants.
     * @param {string} options.member - The member who is part of the chat.
     * @param {string} [options.coHost=""] - The co-host of the chat.
     * @param {string} options.host - The host of the chat.
     * @param {boolean} [options.forChatBroadcast=false] - Flag to indicate if the messages are for chat broadcast.
     * @returns {Message[]} An array of generated messages.
     */
    generateRandomMessages({ participants, member, coHost, host, forChatBroadcast, }: GenerateRandomMessagesOptions): Message[];
    static ɵfac: i0.ɵɵFactoryDeclaration<GenerateRandomMessages, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GenerateRandomMessages>;
}
