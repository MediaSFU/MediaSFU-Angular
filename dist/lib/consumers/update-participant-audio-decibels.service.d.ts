import { AudioDecibels } from '../@types/types';
import * as i0 from "@angular/core";
export interface UpdateParticipantAudioDecibelsOptions {
    name: string;
    averageLoudness: number;
    audioDecibels: AudioDecibels[];
    updateAudioDecibels: (audioDecibels: AudioDecibels[]) => void;
}
export type UpdateParticipantAudioDecibelsType = (options: UpdateParticipantAudioDecibelsOptions) => void;
export declare class UpdateParticipantAudioDecibels {
    /**
     * Updates the audio decibels for a participant.
     *
     * @param {Object} options - The options for updating participant audio decibels.
     * @param {string} options.name - The name of the participant.
     * @param {number} options.averageLoudness - The average loudness of the participant.
     * @param {Array<{ name: string, averageLoudness: number }>} options.audioDecibels - The array of audio decibels entries.
     * @param {Function} options.updateAudioDecibels - The function to update the audio decibels array.
     *
     * @returns {void}
     */
    updateParticipantAudioDecibels({ name, averageLoudness, audioDecibels, updateAudioDecibels, }: UpdateParticipantAudioDecibelsOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpdateParticipantAudioDecibels, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UpdateParticipantAudioDecibels>;
}
