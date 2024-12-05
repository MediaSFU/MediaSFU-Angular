import { Producer } from 'mediasoup-client/lib/types';
import { PrepopulateUserMediaParameters, PrepopulateUserMediaType } from '../@types/types';
import * as i0 from "@angular/core";
export interface ResumeSendTransportAudioParameters extends PrepopulateUserMediaParameters {
    audioProducer: Producer | null;
    localAudioProducer?: Producer | null;
    islevel: string;
    hostLabel: string;
    lock_screen: boolean;
    shared: boolean;
    videoAlreadyOn: boolean;
    updateAudioProducer: (audioProducer: Producer | null) => void;
    updateLocalAudioProducer?: (localAudioProducer: Producer | null) => void;
    updateUpdateMainWindow: (updateMainWindow: boolean) => void;
    prepopulateUserMedia: PrepopulateUserMediaType;
    prepopulateLocalUserMedia?: PrepopulateUserMediaType;
    [key: string]: any;
}
export interface ResumeSendTransportAudioOptions {
    parameters: ResumeSendTransportAudioParameters;
}
export type ResumeSendTransportAudioType = (options: ResumeSendTransportAudioOptions) => Promise<void>;
/**
 * Resumes the send transport for audio and updates the UI and audio producer state accordingly.
 *
 * This function supports both a primary and a local audio producer, delegating the local logic to a separate function.
 *
 * @param {ResumeSendTransportAudioOptions} options - The options for resuming the send transport.
 * @param {ResumeSendTransportAudioParameters} options.parameters - The parameters for resuming the send transport.
 * @param {Producer} options.parameters.audioProducer - The primary audio producer to resume.
 * @param {Producer} [options.parameters.localAudioProducer] - The local audio producer to resume.
 * @param {string} options.parameters.islevel - The level of the audio producer.
 * @param {string} options.parameters.hostLabel - The label for the host.
 * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked.
 * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
 * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is already on.
 * @param {Function} options.parameters.updateAudioProducer - Function to update the audio producer state.
 * @param {Function} [options.parameters.updateLocalAudioProducer] - Function to update the local audio producer state.
 * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window.
 * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
 * @returns {Promise<void>} A promise that resolves when the send transport is resumed and the UI is updated.
 *
 * @throws {Error} Throws an error if there is an issue during the process of resuming the audio send transport.
 *
 * @example
 * ```typescript
 * await resumeSendTransportAudio({
 *   parameters: {
 *     audioProducer: producer,
 *     localAudioProducer: localProducer,
 *     islevel: '1',
 *     hostLabel: 'Host',
 *     lock_screen: false,
 *     shared: false,
 *     updateAudioProducer: updateProducerFunction,
 *     updateLocalAudioProducer: updateLocalProducerFunction,
 *     videoAlreadyOn: false,
 *     updateUpdateMainWindow: updateWindowFunction,
 *     prepopulateUserMedia: prepopulateFunction,
 *     prepopulateLocalUserMedia: prepopulateLocalFunction,
 *   },
 * });
 * ```
 */
export declare class ResumeSendTransportAudio {
    resumeLocalSendTransportAudio({ parameters, }: ResumeSendTransportAudioOptions): Promise<void>;
    /**
     * Resumes the send transport for audio and updates the UI and audio producer state accordingly.
     *
     * This function supports both a primary and a local audio producer, delegating the local logic to a separate function.
     *
     * @param {ResumeSendTransportAudioOptions} options - The options for resuming the send transport.
     * @param {ResumeSendTransportAudioParameters} options.parameters - The parameters for resuming the send transport.
     * @param {Producer} options.parameters.audioProducer - The primary audio producer to resume.
     * @param {Producer} [options.parameters.localAudioProducer] - The local audio producer to resume.
     * @param {string} options.parameters.islevel - The level of the audio producer.
     * @param {string} options.parameters.hostLabel - The label for the host.
     * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked.
     * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
     * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is already on.
     * @param {Function} options.parameters.updateAudioProducer - Function to update the audio producer state.
     * @param {Function} [options.parameters.updateLocalAudioProducer] - Function to update the local audio producer state.
     * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window.
     * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
     * @returns {Promise<void>} A promise that resolves when the send transport is resumed and the UI is updated.
     *
     * @throws {Error} Throws an error if there is an issue during the process of resuming the audio send transport.
     *
     * @example
     * ```typescript
     * await resumeSendTransportAudio({
     *   parameters: {
     *     audioProducer: producer,
     *     localAudioProducer: localProducer,
     *     islevel: '1',
     *     hostLabel: 'Host',
     *     lock_screen: false,
     *     shared: false,
     *     updateAudioProducer: updateProducerFunction,
     *     updateLocalAudioProducer: updateLocalProducerFunction,
     *     videoAlreadyOn: false,
     *     updateUpdateMainWindow: updateWindowFunction,
     *     prepopulateUserMedia: prepopulateFunction,
     *     prepopulateLocalUserMedia: prepopulateLocalFunction,
     *   },
     * });
     * ```
     */
    resumeSendTransportAudio({ parameters }: ResumeSendTransportAudioOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ResumeSendTransportAudio, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ResumeSendTransportAudio>;
}
