import { Participant, Stream, AudioCardParameters, EventType, CustomMediaComponent } from '../@types/types';
import * as i0 from "@angular/core";
export interface PrepopulateUserMediaParameters extends AudioCardParameters {
    participants: Participant[];
    allVideoStreams: (Stream | Participant)[];
    islevel: string;
    member: string;
    shared: boolean;
    shareScreenStarted: boolean;
    eventType: EventType;
    screenId?: string;
    forceFullDisplay: boolean;
    updateMainWindow: boolean;
    mainScreenFilled: boolean;
    adminOnMainScreen: boolean;
    mainScreenPerson: string;
    videoAlreadyOn: boolean;
    audioAlreadyOn: boolean;
    oldAllStreams: (Stream | Participant)[];
    checkOrientation: () => string;
    screenForceFullDisplay: boolean;
    localStreamScreen: MediaStream | null;
    remoteScreenStream: Stream[];
    localStreamVideo: MediaStream | null;
    mainHeightWidth: number;
    isWideScreen: boolean;
    localUIMode: boolean;
    whiteboardStarted: boolean;
    whiteboardEnded: boolean;
    virtualStream: MediaStream | null;
    keepBackground: boolean;
    annotateScreenStream: boolean;
    updateMainScreenPerson: (person: string) => void;
    updateMainScreenFilled: (filled: boolean) => void;
    updateAdminOnMainScreen: (admin: boolean) => void;
    updateMainHeightWidth: (heightWidth: number) => void;
    updateScreenForceFullDisplay: (force: boolean) => void;
    updateUpdateMainWindow: (update: boolean) => void;
    updateMainGridStream: (components: CustomMediaComponent[]) => void;
    customVideoCard?: any;
    customAudioCard?: any;
    customMiniCard?: any;
    videoCardComponent?: any;
    audioCardComponent?: any;
    miniCardComponent?: any;
    getUpdatedAllParams: () => PrepopulateUserMediaParameters;
    [key: string]: any;
}
export interface PrepopulateUserMediaOptions {
    name: string;
    parameters: PrepopulateUserMediaParameters;
}
export type PrepopulateUserMediaType = (options: {
    name: string;
    parameters: any;
}) => Promise<{
    component: any;
    inputs: any;
}[] | void>;
/**
 * Prepopulates the user media based on the provided options.
 *
 * This method prepares the UI components for the user's media based on the event type and participant information.
 * It manages the display of video and audio cards, mini cards, and handles screen sharing scenarios.
 *
 * @param {PrepopulateUserMediaOptions} options - The options for prepopulating user media.
 * @param {string} options.name - The name of the user.
 * @param {PrepopulateUserMediaParameters} options.parameters - The parameters for prepopulating user media.
 * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
 * @param {Array<Participant>} options.parameters.participants - List of participants.
 * @param {Array<Stream>} options.parameters.allVideoStreams - List of all video streams.
 * @param {string} options.parameters.islevel - The level of the user.
 * @param {string} options.parameters.member - The member name.
 * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
 * @param {boolean} options.parameters.shareScreenStarted - Indicates if screen sharing has started.
 * @param {string} options.parameters.eventType - The type of event (e.g., "broadcast", "chat", "conference").
 * @param {string} options.parameters.screenId - The ID of the screen.
 * @param {boolean} options.parameters.forceFullDisplay - Indicates if full display is forced.
 * @param {Function} options.parameters.updateMainWindow - Function to update the main window.
 * @param {boolean} options.parameters.mainScreenFilled - Indicates if the main screen is filled.
 * @param {boolean} options.parameters.adminOnMainScreen - Indicates if admin is on the main screen.
 * @param {string} options.parameters.mainScreenPerson - The person on the main screen.
 * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is already on.
 * @param {boolean} options.parameters.audioAlreadyOn - Indicates if the audio is already on.
 * @param {Array<Stream>} options.parameters.oldAllStreams - List of old all streams.
 * @param {Function} options.parameters.checkOrientation - Function to check orientation.
 * @param {boolean} options.parameters.screenForceFullDisplay - Indicates if screen force full display is enabled.
 * @param {Stream} options.parameters.localStreamScreen - The local screen stream.
 * @param {Array<Stream>} options.parameters.remoteScreenStream - List of remote screen streams.
 * @param {Stream} options.parameters.localStreamVideo - The local video stream.
 * @param {number} options.parameters.mainHeightWidth - The main height and width.
 * @param {boolean} options.parameters.isWideScreen - Indicates if the screen is wide.
 * @param {boolean} options.parameters.localUIMode - Indicates if local UI mode is enabled.
 * @param {boolean} options.parameters.whiteboardStarted - Indicates if whiteboard has started.
 * @param {boolean} options.parameters.whiteboardEnded - Indicates if whiteboard has ended.
 * @param {Stream} options.parameters.virtualStream - The virtual stream.
 * @param {boolean} options.parameters.keepBackground - Indicates if background should be kept.
 * @param {Stream} options.parameters.annotateScreenStream - The annotate screen stream.
 * @param {Function} options.parameters.updateMainScreenPerson - Function to update the main screen person.
 * @param {Function} options.parameters.updateMainScreenFilled - Function to update if the main screen is filled.
 * @param {Function} options.parameters.updateAdminOnMainScreen - Function to update if admin is on the main screen.
 * @param {Function} options.parameters.updateMainHeightWidth - Function to update the main height and width.
 * @param {Function} options.parameters.updateScreenForceFullDisplay - Function to update screen force full display.
 * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window update status.
 * @param {Function} options.parameters.updateMainGridStream - Function to update the main grid stream.
 *
 * @returns {Promise<{ component: any; inputs: any }[] | void>} A promise that resolves with the components and inputs or void.
 *
 * @throws {Error} Throws an error if there is an issue preparing and populating the main screen.
 *
 * @example
 * ```typescript
 * const options = {
 *   name: 'John Doe',
 *   parameters: {
 *     getUpdatedAllParams: () => { },
 *     participants: [],
 *     allVideoStreams: [],
 *     islevel: '1',
 *     member: 'John',
 *     shared: false,
 *     shareScreenStarted: false,
 *     eventType: 'conference',
 *     screenId: 'screen123',
 *     forceFullDisplay: false,
 *     updateMainWindow: false,
 *     mainScreenFilled: false,
 *     adminOnMainScreen: false,
 *     mainScreenPerson: '',
 *     videoAlreadyOn: false,
 *     audioAlreadyOn: false,
 *     oldAllStreams: [],
 *     checkOrientation: () => 'landscape',
 *     screenForceFullDisplay: false,
 *     localStreamScreen: null,
 *     remoteScreenStream: [],
 *     localStreamVideo: null,
 *     mainHeightWidth: 100,
 *     isWideScreen: true,
 *     localUIMode: false,
 *     whiteboardStarted: false,
 *     whiteboardEnded: false,
 *     virtualStream: null,
 *     keepBackground: false,
 *     annotateScreenStream: false,
 *     updateMainScreenPerson: (person) => { console.log(updated) },
 *     updateMainScreenFilled: (filled) => { console.log(updated) },
 *     updateAdminOnMainScreen: (admin) => { console.log(updated) },
 *     updateMainHeightWidth: (heightWidth) => { console.log(updated) },
 *     updateScreenForceFullDisplay: (force) => { console.log(updated) },
 *     updateUpdateMainWindow: (update) => { console.log(updated) },
 *     updateMainGridStream: (components) => { console.log(updated) },
 *   },
 * };
 *
 * await prepopulateUserMedia(options);
 * ```
 */
export declare class PrepopulateUserMedia {
    /**
     * Prepopulates the user media based on the provided options.
     *
     * @param {PrepopulateUserMediaOptions} options - The options for prepopulating user media.
     * @param {string} options.name - The name of the user.
     * @param {Parameters} options.parameters - The parameters for prepopulating user media.
     * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     * @param {Array<Participant>} options.parameters.participants - List of participants.
     * @param {Array<Stream>} options.parameters.allVideoStreams - List of all video streams.
     * @param {string} options.parameters.islevel - The level of the user.
     * @param {string} options.parameters.member - The member name.
     * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
     * @param {boolean} options.parameters.shareScreenStarted - Indicates if screen sharing has started.
     * @param {string} options.parameters.eventType - The type of event.
     * @param {string} options.parameters.screenId - The screen ID.
     * @param {boolean} options.parameters.forceFullDisplay - Indicates if full display is forced.
     * @param {Function} options.parameters.updateMainWindow - Function to update the main window.
     * @param {boolean} options.parameters.mainScreenFilled - Indicates if the main screen is filled.
     * @param {boolean} options.parameters.adminOnMainScreen - Indicates if admin is on the main screen.
     * @param {string} options.parameters.mainScreenPerson - The person on the main screen.
     * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is already on.
     * @param {boolean} options.parameters.audioAlreadyOn - Indicates if the audio is already on.
     * @param {Array<Stream>} options.parameters.oldAllStreams - List of old all streams.
     * @param {Function} options.parameters.checkOrientation - Function to check orientation.
     * @param {boolean} options.parameters.screenForceFullDisplay - Indicates if screen force full display is enabled.
     * @param {Stream} options.parameters.localStreamScreen - The local screen stream.
     * @param {Array<Stream>} options.parameters.remoteScreenStream - List of remote screen streams.
     * @param {Stream} options.parameters.localStreamVideo - The local video stream.
     * @param {number} options.parameters.mainHeightWidth - The main height and width.
     * @param {boolean} options.parameters.isWideScreen - Indicates if the screen is wide.
     * @param {boolean} options.parameters.localUIMode - Indicates if local UI mode is enabled.
     * @param {boolean} options.parameters.whiteboardStarted - Indicates if whiteboard has started.
     * @param {boolean} options.parameters.whiteboardEnded - Indicates if whiteboard has ended.
     * @param {Stream} options.parameters.virtualStream - The virtual stream.
     * @param {boolean} options.parameters.keepBackground - Indicates if background should be kept.
     * @param {Stream} options.parameters.annotateScreenStream - The annotate screen stream.
     * @param {Function} options.parameters.updateMainScreenPerson - Function to update the main screen person.
     * @param {Function} options.parameters.updateMainScreenFilled - Function to update if the main screen is filled.
     * @param {Function} options.parameters.updateAdminOnMainScreen - Function to update if admin is on the main screen.
     * @param {Function} options.parameters.updateMainHeightWidth - Function to update the main height and width.
     * @param {Function} options.parameters.updateScreenForceFullDisplay - Function to update screen force full display.
     * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window update status.
     * @param {Function} options.parameters.updateMainGridStream - Function to update the main grid stream.
     *
     * @returns {Promise<{ component: any, inputs: any }[] | void>} A promise that resolves with the components and inputs or void.
     */
    prepopulateUserMedia: ({ name, parameters, }: PrepopulateUserMediaOptions) => Promise<{
        component: any;
        inputs: any;
    }[] | void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PrepopulateUserMedia, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PrepopulateUserMedia>;
}
