import { Producer } from 'mediasoup-client/lib/types';
import { PrepopulateUserMediaParameters, PrepopulateUserMediaType } from '../@types/types';
import * as i0 from "@angular/core";
export interface ResumeSendTransportAudioParameters extends PrepopulateUserMediaParameters {
    audioProducer: Producer | null;
    islevel: string;
    hostLabel: string;
    lock_screen: boolean;
    shared: boolean;
    videoAlreadyOn: boolean;
    updateAudioProducer: (audioProducer: Producer | null) => void;
    updateUpdateMainWindow: (updateMainWindow: boolean) => void;
    prepopulateUserMedia: PrepopulateUserMediaType;
    [key: string]: any;
}
export interface ResumeSendTransportAudioOptions {
    parameters: ResumeSendTransportAudioParameters;
}
export type ResumeSendTransportAudioType = (options: ResumeSendTransportAudioOptions) => Promise<void>;
export declare class ResumeSendTransportAudio {
    /**
     * Resumes the send transport for audio and updates the UI and audio producer state accordingly.
     *
     * @param {ResumeSendTransportAudioOptions} options - The options for resuming the send transport.
     * @param {Object} options.parameters - The parameters required for resuming the send transport.
     * @param {Producer} options.parameters.audioProducer - The audio producer to be resumed.
     * @param {string} options.parameters.islevel - The level of the user.
     * @param {string} options.parameters.hostLabel - The label of the host.
     * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked.
     * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
     * @param {Function} options.parameters.updateAudioProducer - Function to update the audio producer state.
     * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is already on.
     * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window state.
     * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
     *
     * @returns {Promise<void>} A promise that resolves when the send transport is resumed and the UI is updated.
     *
     * @throws {Error} Throws an error if there is an issue during the process of resuming the audio send transport.
     */
    resumeSendTransportAudio({ parameters }: ResumeSendTransportAudioOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ResumeSendTransportAudio, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ResumeSendTransportAudio>;
}
