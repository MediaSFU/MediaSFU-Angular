import { Participant, PrepopulateUserMediaParameters, PrepopulateUserMediaType, ReorderStreamsParameters, ReorderStreamsType } from '../../@types/types';
import * as i0 from "@angular/core";
export interface ProducerMediaResumedParameters extends PrepopulateUserMediaParameters, ReorderStreamsParameters {
    meetingDisplayType: string;
    participants: Participant[];
    shared: boolean;
    shareScreenStarted: boolean;
    mainScreenFilled: boolean;
    hostLabel: string;
    updateUpdateMainWindow: (updateMainWindow: boolean) => void;
    reorderStreams: ReorderStreamsType;
    prepopulateUserMedia: PrepopulateUserMediaType;
    getUpdatedAllParams: () => ProducerMediaResumedParameters;
    [key: string]: any;
}
export interface ProducerMediaResumedOptions {
    name: string;
    kind: 'audio';
    parameters: ProducerMediaResumedParameters;
}
export type ProducerMediaResumedType = (options: ProducerMediaResumedOptions) => Promise<void>;
export declare class ProducerMediaResumed {
    /**
     * Resumes media for a specific participant in a meeting.
     *
     * @param {ProducerMediaResumedOptions} options - The options for resuming media.
     * @param {string} options.name - The name of the participant whose media is to be resumed.
     * @param {Object} options.parameters - The parameters related to the meeting and participants.
     * @param {string} options.parameters.meetingDisplayType - The type of meeting display.
     * @param {Array} options.parameters.participants - The list of participants in the meeting.
     * @param {boolean} options.parameters.shared - Indicates if the screen is being shared.
     * @param {boolean} options.parameters.shareScreenStarted - Indicates if screen sharing has started.
     * @param {boolean} options.parameters.mainScreenFilled - Indicates if the main screen is filled.
     * @param {string} options.parameters.hostLabel - The label of the host.
     * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window.
     * @param {Function} options.parameters.reorderStreams - Function to reorder the streams.
     * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
     *
     * @returns {Promise<void>} A promise that resolves when the media has been resumed.
     */
    producerMediaResumed: ({ name, parameters, }: ProducerMediaResumedOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProducerMediaResumed, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProducerMediaResumed>;
}
