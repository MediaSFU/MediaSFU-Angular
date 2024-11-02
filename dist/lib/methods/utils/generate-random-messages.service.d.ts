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
/**
 * GenerateRandomMessages - Service to generate random chat messages from participants.
 *
 * This service generates random direct and group messages based on participants and a given host setup,
 * with options to tailor messages for chat broadcast.
 *
 * @class
 * @name GenerateRandomMessages
 * @example
 * ```typescript
 * const generateRandomMessagesService = new GenerateRandomMessages();
 * const messages = generateRandomMessagesService.generateRandomMessages({
 *   participants: [
 *     { name: 'Alice' },
 *     { name: 'Bob' },
 *     { name: 'Charlie' }
 *   ],
 *   member: 'Alice',
 *   coHost: 'Bob',
 *   host: 'Charlie',
 *   forChatBroadcast: true
 * });
 * console.log(messages);
 * ```
 *
 * @param {Object} options - Options for generating random messages.
 * @param {Participant[]} options.participants - List of participants for message generation.
 * @param {string} options.member - The primary member in the chat.
 * @param {string} [options.coHost] - Optional co-host participant.
 * @param {string} options.host - The chat host.
 * @param {boolean} [options.forChatBroadcast=false] - Flag to indicate if messages are for chat broadcast.
 * @returns {Message[]} Array of randomly generated messages with direct and group messaging.
 */
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
