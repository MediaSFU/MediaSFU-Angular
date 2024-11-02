import { Injectable } from '@angular/core';
import { MiniCard } from '../components/display-components/mini-card/mini-card.component';
import { VideoCard } from '../components/display-components/video-card/video-card.component';
import { AudioCard } from '../components/display-components/audio-card/audio-card.component';
import * as i0 from "@angular/core";
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
export class PrepopulateUserMedia {
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
    prepopulateUserMedia = async ({ name, parameters, }) => {
        try {
            // Destructure parameters
            let { getUpdatedAllParams } = parameters;
            parameters = getUpdatedAllParams();
            let { participants, allVideoStreams, islevel, member, shared, shareScreenStarted, eventType, screenId, forceFullDisplay, updateMainWindow, mainScreenFilled, adminOnMainScreen, mainScreenPerson, videoAlreadyOn, audioAlreadyOn, oldAllStreams, checkOrientation, screenForceFullDisplay, localStreamScreen, remoteScreenStream, localStreamVideo, mainHeightWidth, isWideScreen, localUIMode, whiteboardStarted, whiteboardEnded, virtualStream, keepBackground, annotateScreenStream, updateMainScreenPerson, updateMainScreenFilled, updateAdminOnMainScreen, updateMainHeightWidth, updateScreenForceFullDisplay, updateUpdateMainWindow, updateMainGridStream, } = parameters;
            // If the event type is 'chat', return early
            if (eventType == 'chat') {
                return;
            }
            // Initialize variables
            let host;
            let hostStream;
            let newComponents = [];
            // Check if screen sharing is started or shared
            if (shareScreenStarted || shared) {
                // Handle main grid visibility based on the event type
                if (eventType == 'conference') {
                    if (shared || shareScreenStarted) {
                        if (mainHeightWidth == 0) {
                            // Add the main grid if not present
                            updateMainHeightWidth(84);
                        }
                    }
                    else {
                        // Remove the main grid if not shared or started
                        updateMainHeightWidth(0);
                    }
                }
                // Switch display to optimize for screen share
                screenForceFullDisplay = forceFullDisplay;
                updateScreenForceFullDisplay(screenForceFullDisplay);
                // Get the orientation and adjust forceFullDisplay
                let orientation = checkOrientation();
                if (orientation == 'portrait' || !isWideScreen) {
                    if (shareScreenStarted || shared) {
                        screenForceFullDisplay = false;
                        updateScreenForceFullDisplay(screenForceFullDisplay);
                    }
                }
                // Check if the user is sharing the screen
                if (shared) {
                    // User is sharing
                    host = { name: member, audioID: '', videoID: '' };
                    hostStream = localStreamScreen;
                    // Update admin on the main screen
                    adminOnMainScreen = islevel == '2';
                    updateAdminOnMainScreen(adminOnMainScreen);
                    // Update main screen person
                    mainScreenPerson = host.name || '';
                    updateMainScreenPerson(mainScreenPerson);
                }
                else {
                    //someone else is sharing
                    host =
                        participants.find((participant) => participant.ScreenID == screenId && participant.ScreenOn == true) ?? null;
                    if (whiteboardStarted && !whiteboardEnded) {
                        host = { name: 'WhiteboardActive', islevel: '2', audioID: '', videoID: '' };
                        hostStream = { producerId: 'WhiteboardActive' };
                    }
                    if (host == null) {
                        // remoteScreenStream
                        host =
                            participants.find((participant) => participant.ScreenOn == true) ?? null;
                    }
                    // check remoteScreenStream
                    if (host != null && !host?.name?.includes('WhiteboardActive')) {
                        if (remoteScreenStream.length == 0) {
                            hostStream =
                                allVideoStreams.find((stream) => stream.producerId == host?.ScreenID) ?? null;
                        }
                        else {
                            hostStream = remoteScreenStream[0];
                        }
                    }
                    // Update admin on the main screen
                    adminOnMainScreen = (host && host.islevel == '2') ?? false;
                    updateAdminOnMainScreen(adminOnMainScreen);
                    // Update main screen person
                    mainScreenPerson = host?.name ?? '';
                    updateMainScreenPerson(mainScreenPerson);
                }
            }
            else {
                // Screen share not started
                if (eventType == 'conference') {
                    // No main grid for conferences
                    return;
                }
                // Find the host with level '2'
                host = participants.find((participant) => participant.islevel == '2') ?? null;
                // Update main screen person
                mainScreenPerson = host?.name ?? '';
                updateMainScreenPerson(mainScreenPerson);
            }
            // If host is not null, check if host videoIsOn
            if (host) {
                // Populate the main screen with the host video
                if (shareScreenStarted || shared) {
                    forceFullDisplay = screenForceFullDisplay;
                    if (whiteboardStarted && !whiteboardEnded) {
                        // Whiteboard is active
                    }
                    else {
                        newComponents.push({
                            component: VideoCard,
                            inputs: {
                                videoStream: shared ? hostStream : hostStream.stream,
                                remoteProducerId: host.ScreenID,
                                eventType,
                                forceFullDisplay: annotateScreenStream && shared ? false : forceFullDisplay,
                                customStyle: {
                                    border: eventType !== 'broadcast' ? '2px solid black' : '0px solid black',
                                },
                                participant: host,
                                backgroundColor: 'rgba(217, 227, 234, 0.99)',
                                showControls: false,
                                showInfo: true,
                                name: host.name,
                                doMirror: false,
                                parameters,
                            },
                        });
                    }
                    updateMainGridStream(newComponents);
                    mainScreenFilled = true;
                    updateMainScreenFilled(mainScreenFilled);
                    adminOnMainScreen = host.islevel == '2';
                    updateAdminOnMainScreen(adminOnMainScreen);
                    mainScreenPerson = host.name ?? '';
                    updateMainScreenPerson(mainScreenPerson);
                    return newComponents;
                }
                // Check if video is already on or not
                if ((islevel != '2' && !host['videoOn']) ||
                    (islevel == '2' && (!host['videoOn'] || !videoAlreadyOn)) ||
                    localUIMode == true) {
                    // Video is off
                    if (islevel == '2' && videoAlreadyOn) {
                        // Admin's video is on
                        newComponents.push({
                            component: VideoCard,
                            inputs: {
                                videoStream: keepBackground && virtualStream ? virtualStream : localStreamVideo,
                                remoteProducerId: host.videoID,
                                eventType,
                                forceFullDisplay,
                                customStyle: {
                                    border: eventType !== 'broadcast' ? '2px solid black' : '0px solid black',
                                },
                                participant: host,
                                backgroundColor: 'rgba(217, 227, 234, 0.99)',
                                showControls: false,
                                showInfo: true,
                                name: host.name,
                                doMirror: true,
                                parameters,
                            },
                        });
                        updateMainGridStream(newComponents);
                        mainScreenFilled = true;
                        updateMainScreenFilled(mainScreenFilled);
                        adminOnMainScreen = true;
                        updateAdminOnMainScreen(adminOnMainScreen);
                        mainScreenPerson = host.name ?? '';
                        updateMainScreenPerson(mainScreenPerson);
                    }
                    else {
                        // Video is off and not admin
                        let audOn;
                        if (islevel == '2' && audioAlreadyOn) {
                            audOn = true;
                        }
                        else {
                            if (host != null && islevel != '2') {
                                audOn = host['muted'] == false;
                            }
                        }
                        if (audOn) {
                            // Audio is on
                            try {
                                newComponents.push({
                                    component: AudioCard,
                                    inputs: {
                                        name: host.name,
                                        barColor: 'red',
                                        textColor: 'white',
                                        customStyle: {
                                            backgroundColor: 'transparent',
                                            border: eventType !== 'broadcast' ? '2px solid black' : '0px solid black',
                                        },
                                        controlsPosition: 'topLeft',
                                        infoPosition: 'topRight',
                                        showWaveform: true,
                                        roundedImage: true,
                                        parameters: parameters,
                                        showControls: false,
                                        backgroundColor: 'transparent',
                                    },
                                });
                                updateMainGridStream(newComponents);
                            }
                            catch (error) {
                                // Handle audio card creation error
                            }
                            mainScreenFilled = true;
                            updateMainScreenFilled(mainScreenFilled);
                            adminOnMainScreen = islevel == '2';
                            updateAdminOnMainScreen(adminOnMainScreen);
                            mainScreenPerson = host.name ?? '';
                            updateMainScreenPerson(mainScreenPerson);
                        }
                        else {
                            // Audio is off
                            try {
                                newComponents.push({
                                    component: MiniCard,
                                    inputs: {
                                        initials: name,
                                        fontSize: 20,
                                        customStyle: {
                                            backgroundColor: 'transparent',
                                            border: eventType !== 'broadcast' ? '2px solid black' : '0px solid black',
                                        },
                                    },
                                });
                                updateMainGridStream(newComponents);
                            }
                            catch (error) {
                                // Handle mini card creation error
                            }
                            mainScreenFilled = false;
                            updateMainScreenFilled(mainScreenFilled);
                            adminOnMainScreen = islevel == '2';
                            updateAdminOnMainScreen(adminOnMainScreen);
                            mainScreenPerson = host.name ?? '';
                            updateMainScreenPerson(mainScreenPerson);
                        }
                    }
                }
                else {
                    // Video is on
                    if (shareScreenStarted || shared) {
                        // Screen share is on
                        if (whiteboardStarted && !whiteboardEnded) {
                            // Whiteboard is active
                        }
                        else {
                            try {
                                newComponents.push({
                                    component: VideoCard,
                                    inputs: {
                                        videoStream: shared ? hostStream : hostStream.stream,
                                        remoteProducerId: host.ScreenID,
                                        eventType,
                                        forceFullDisplay,
                                        customStyle: {
                                            border: eventType !== 'broadcast' ? '2px solid black' : '0px solid black',
                                        },
                                        participant: host,
                                        backgroundColor: 'rgba(217, 227, 234, 0.99)',
                                        showControls: false,
                                        showInfo: true,
                                        name: host.name,
                                        doMirror: false,
                                        parameters,
                                    },
                                });
                                updateMainGridStream(newComponents);
                                mainScreenFilled = true;
                                updateMainScreenFilled(mainScreenFilled);
                                adminOnMainScreen = host.islevel == '2';
                                updateAdminOnMainScreen(adminOnMainScreen);
                                mainScreenPerson = host.name ?? '';
                                updateMainScreenPerson(mainScreenPerson);
                            }
                            catch (error) {
                                // Handle video card creation error
                            }
                        }
                    }
                    else {
                        // Screen share is off
                        let streame;
                        if (islevel == '2') {
                            host['stream'] = keepBackground && virtualStream ? virtualStream : localStreamVideo;
                        }
                        else {
                            streame = oldAllStreams.find((streame) => streame.producerId == host.videoID);
                            host['stream'] = streame && streame.stream;
                        }
                        try {
                            if (host['stream']) {
                                newComponents.push({
                                    component: VideoCard,
                                    inputs: {
                                        videoStream: host['stream'],
                                        remoteProducerId: host.videoID,
                                        eventType,
                                        forceFullDisplay,
                                        customStyle: {
                                            border: eventType !== 'broadcast' ? '2px solid black' : '0px solid black',
                                        },
                                        participant: host,
                                        backgroundColor: 'rgba(217, 227, 234, 0.99)',
                                        showControls: false,
                                        showInfo: true,
                                        name: host.name,
                                        doMirror: member == host.name,
                                        parameters,
                                    },
                                });
                                updateMainGridStream(newComponents);
                                mainScreenFilled = true;
                                adminOnMainScreen = host.islevel == '2';
                                mainScreenPerson = host.name ?? '';
                            }
                            else {
                                newComponents.push({
                                    component: MiniCard,
                                    inputs: {
                                        initials: name,
                                        fontSize: 20,
                                        customStyle: {
                                            backgroundColor: 'transparent',
                                            border: eventType !== 'broadcast' ? '2px solid black' : '0px solid black',
                                        },
                                    },
                                });
                                updateMainGridStream(newComponents);
                                mainScreenFilled = false;
                                adminOnMainScreen = islevel == '2';
                                mainScreenPerson = host.name ?? '';
                            }
                            updateMainScreenFilled(mainScreenFilled);
                            updateAdminOnMainScreen(adminOnMainScreen);
                            updateMainScreenPerson(mainScreenPerson);
                        }
                        catch (error) {
                            // Handle video card creation error
                        }
                    }
                }
            }
            else {
                // Host is null, add a mini card
                try {
                    newComponents.push({
                        component: MiniCard,
                        inputs: {
                            initials: name,
                            fontSize: 20,
                            customStyle: {
                                backgroundColor: 'transparent',
                                border: eventType !== 'broadcast' ? '2px solid black' : '0px solid black',
                            },
                        },
                    });
                    updateMainGridStream(newComponents);
                    mainScreenFilled = false;
                    adminOnMainScreen = false;
                    mainScreenPerson = '';
                    updateMainScreenFilled(mainScreenFilled);
                    updateAdminOnMainScreen(adminOnMainScreen);
                    updateMainScreenPerson(mainScreenPerson);
                }
                catch (error) {
                    // Handle mini card creation error
                }
            }
            updateMainWindow = false;
            updateUpdateMainWindow(updateMainWindow);
            return newComponents;
        }
        catch (error) {
            // Handle errors during the process of preparing and populating the main screen
            console.log('Error preparing and populating the main screen:', error.message);
            return [];
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: PrepopulateUserMedia, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: PrepopulateUserMedia, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: PrepopulateUserMedia, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlcG9wdWxhdGUtdXNlci1tZWRpYS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9wcmVwb3B1bGF0ZS11c2VyLW1lZGlhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0VBQWdFLENBQUM7QUFDMUYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtFQUFrRSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQzs7QUErRDdGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtHRztBQUtILE1BQU0sT0FBTyxvQkFBb0I7SUFDL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTZDRztJQUNILG9CQUFvQixHQUFHLEtBQUssRUFBRSxFQUM1QixJQUFJLEVBQ0osVUFBVSxHQUNrQixFQUFxRCxFQUFFO1FBQ25GLElBQUksQ0FBQztZQUNILHlCQUF5QjtZQUV6QixJQUFJLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDekMsVUFBVSxHQUFHLG1CQUFtQixFQUFFLENBQUM7WUFFbkMsSUFBSSxFQUNGLFlBQVksRUFDWixlQUFlLEVBQ2YsT0FBTyxFQUNQLE1BQU0sRUFDTixNQUFNLEVBQ04sa0JBQWtCLEVBQ2xCLFNBQVMsRUFDVCxRQUFRLEVBQ1IsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixjQUFjLEVB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LGdCQUFnQixDQUFDLENBQUM7Z0JBQzNDLENBQUM7Z0JBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztvQkFDZixrQ0FBa0M7Z0JBQ3BDLENBQUM7WUFDSCxDQUFDO1lBRUQsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFekMsT0FBTyxhQUFhLENBQUM7UUFDdkIsQ0FBQztRQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7WUFDcEIsK0VBQStFO1lBQy9FLE9BQU8sQ0FBQyxHQUFHLENBQUMsaURBQWlELEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlFLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQztJQUNILENBQUMsQ0FBQzt1R0FwZlMsb0JBQW9COzJHQUFwQixvQkFBb0IsY0FGbkIsTUFBTTs7MkZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1pbmlDYXJkIH0gZnJvbSAnLi4vY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvbWluaS1jYXJkL21pbmktY2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlkZW9DYXJkIH0gZnJvbSAnLi4vY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvdmlkZW8tY2FyZC92aWRlby1jYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBdWRpb0NhcmQgfSBmcm9tICcuLi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9hdWRpby1jYXJkL2F1ZGlvLWNhcmQuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIFBhcnRpY2lwYW50LFxuICBTdHJlYW0sXG4gIEF1ZGlvQ2FyZFBhcmFtZXRlcnMsXG4gIEV2ZW50VHlwZSxcbiAgQ3VzdG9tTWVkaWFDb21wb25lbnQsXG59IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJlcG9wdWxhdGVVc2VyTWVkaWFQYXJhbWV0ZXJzIGV4dGVuZHMgQXVkaW9DYXJkUGFyYW1ldGVycyB7XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgYWxsVmlkZW9TdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW107XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgbWVtYmVyOiBzdHJpbmc7XG4gIHNoYXJlZDogYm9vbGVhbjtcbiAgc2hhcmVTY3JlZW5TdGFydGVkOiBib29sZWFuO1xuICBldmVudFR5cGU6IEV2ZW50VHlwZTtcbiAgc2NyZWVuSWQ/OiBzdHJpbmc7XG4gIGZvcmNlRnVsbERpc3BsYXk6IGJvb2xlYW47XG4gIHVwZGF0ZU1haW5XaW5kb3c6IGJvb2xlYW47XG4gIG1haW5TY3JlZW5GaWxsZWQ6IGJvb2xlYW47XG4gIGFkbWluT25NYWluU2NyZWVuOiBib29sZWFuO1xuICBtYWluU2NyZWVuUGVyc29uOiBzdHJpbmc7XG4gIHZpZGVvQWxyZWFkeU9uOiBib29sZWFuO1xuICBhdWRpb0FscmVhZHlPbjogYm9vbGVhbjtcbiAgb2xkQWxsU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICBjaGVja09yaWVudGF0aW9uOiAoKSA9PiBzdHJpbmc7XG4gIHNjcmVlbkZvcmNlRnVsbERpc3BsYXk6IGJvb2xlYW47XG4gIGxvY2FsU3RyZWFtU2NyZWVuOiBNZWRpYVN0cmVhbSB8IG51bGw7XG4gIHJlbW90ZVNjcmVlblN0cmVhbTogU3RyZWFtW107XG4gIGxvY2FsU3RyZWFtVmlkZW86IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgbWFpbkhlaWdodFdpZHRoOiBudW1iZXI7XG4gIGlzV2lkZVNjcmVlbjogYm9vbGVhbjtcbiAgbG9jYWxVSU1vZGU6IGJvb2xlYW47XG4gIHdoaXRlYm9hcmRTdGFydGVkOiBib29sZWFuO1xuICB3aGl0ZWJvYXJkRW5kZWQ6IGJvb2xlYW47XG4gIHZpcnR1YWxTdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAga2VlcEJhY2tncm91bmQ6IGJvb2xlYW47XG4gIGFubm90YXRlU2NyZWVuU3RyZWFtOiBib29sZWFuO1xuICB1cGRhdGVNYWluU2NyZWVuUGVyc29uOiAocGVyc29uOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZU1haW5TY3JlZW5GaWxsZWQ6IChmaWxsZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUFkbWluT25NYWluU2NyZWVuOiAoYWRtaW46IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZU1haW5IZWlnaHRXaWR0aDogKGhlaWdodFdpZHRoOiBudW1iZXIpID0+IHZvaWQ7XG4gIHVwZGF0ZVNjcmVlbkZvcmNlRnVsbERpc3BsYXk6IChmb3JjZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdzogKHVwZGF0ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlTWFpbkdyaWRTdHJlYW06IChjb21wb25lbnRzOiBDdXN0b21NZWRpYUNvbXBvbmVudFtdKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBQcmVwb3B1bGF0ZVVzZXJNZWRpYVBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcmVwb3B1bGF0ZVVzZXJNZWRpYU9wdGlvbnMge1xuICBuYW1lOiBzdHJpbmc7XG4gIHBhcmFtZXRlcnM6IFByZXBvcHVsYXRlVXNlck1lZGlhUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgUHJlcG9wdWxhdGVVc2VyTWVkaWFUeXBlID0gKG9wdGlvbnM6IHtcbiAgbmFtZTogc3RyaW5nO1xuICBwYXJhbWV0ZXJzOiBhbnk7XG59KSA9PiBQcm9taXNlPHsgY29tcG9uZW50OiBhbnk7IGlucHV0czogYW55IH1bXSB8IHZvaWQ+O1xuXG4vKipcbiAqIFByZXBvcHVsYXRlcyB0aGUgdXNlciBtZWRpYSBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgb3B0aW9ucy5cbiAqXG4gKiBUaGlzIG1ldGhvZCBwcmVwYXJlcyB0aGUgVUkgY29tcG9uZW50cyBmb3IgdGhlIHVzZXIncyBtZWRpYSBiYXNlZCBvbiB0aGUgZXZlbnQgdHlwZSBhbmQgcGFydGljaXBhbnQgaW5mb3JtYXRpb24uXG4gKiBJdCBtYW5hZ2VzIHRoZSBkaXNwbGF5IG9mIHZpZGVvIGFuZCBhdWRpbyBjYXJkcywgbWluaSBjYXJkcywgYW5kIGhhbmRsZXMgc2NyZWVuIHNoYXJpbmcgc2NlbmFyaW9zLlxuICpcbiAqIEBwYXJhbSB7UHJlcG9wdWxhdGVVc2VyTWVkaWFPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHByZXBvcHVsYXRpbmcgdXNlciBtZWRpYS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgdXNlci5cbiAqIEBwYXJhbSB7UHJlcG9wdWxhdGVVc2VyTWVkaWFQYXJhbWV0ZXJzfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3IgcHJlcG9wdWxhdGluZyB1c2VyIG1lZGlhLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMgLSBGdW5jdGlvbiB0byBnZXQgdXBkYXRlZCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtBcnJheTxQYXJ0aWNpcGFudD59IG9wdGlvbnMucGFyYW1ldGVycy5wYXJ0aWNpcGFudHMgLSBMaXN0IG9mIHBhcnRpY2lwYW50cy5cbiAqIEBwYXJhbSB7QXJyYXk8U3RyZWFtPn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmFsbFZpZGVvU3RyZWFtcyAtIExpc3Qgb2YgYWxsIHZpZGVvIHN0cmVhbXMuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzbGV2ZWwgLSBUaGUgbGV2ZWwgb2YgdGhlIHVzZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLm1lbWJlciAtIFRoZSBtZW1iZXIgbmFtZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNoYXJlZCAtIEluZGljYXRlcyBpZiB0aGUgc2NyZWVuIGlzIHNoYXJlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNoYXJlU2NyZWVuU3RhcnRlZCAtIEluZGljYXRlcyBpZiBzY3JlZW4gc2hhcmluZyBoYXMgc3RhcnRlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuZXZlbnRUeXBlIC0gVGhlIHR5cGUgb2YgZXZlbnQgKGUuZy4sIFwiYnJvYWRjYXN0XCIsIFwiY2hhdFwiLCBcImNvbmZlcmVuY2VcIikuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnNjcmVlbklkIC0gVGhlIElEIG9mIHRoZSBzY3JlZW4uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5mb3JjZUZ1bGxEaXNwbGF5IC0gSW5kaWNhdGVzIGlmIGZ1bGwgZGlzcGxheSBpcyBmb3JjZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWFpbldpbmRvdyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWFpbiB3aW5kb3cuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5tYWluU2NyZWVuRmlsbGVkIC0gSW5kaWNhdGVzIGlmIHRoZSBtYWluIHNjcmVlbiBpcyBmaWxsZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5hZG1pbk9uTWFpblNjcmVlbiAtIEluZGljYXRlcyBpZiBhZG1pbiBpcyBvbiB0aGUgbWFpbiBzY3JlZW4uXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLm1haW5TY3JlZW5QZXJzb24gLSBUaGUgcGVyc29uIG9uIHRoZSBtYWluIHNjcmVlbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnZpZGVvQWxyZWFkeU9uIC0gSW5kaWNhdGVzIGlmIHRoZSB2aWRlbyBpcyBhbHJlYWR5IG9uLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9BbHJlYWR5T24gLSBJbmRpY2F0ZXMgaWYgdGhlIGF1ZGlvIGlzIGFscmVhZHkgb24uXG4gKiBAcGFyYW0ge0FycmF5PFN0cmVhbT59IG9wdGlvbnMucGFyYW1ldGVycy5vbGRBbGxTdHJlYW1zIC0gTGlzdCBvZiBvbGQgYWxsIHN0cmVhbXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuY2hlY2tPcmllbnRhdGlvbiAtIEZ1bmN0aW9uIHRvIGNoZWNrIG9yaWVudGF0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2NyZWVuRm9yY2VGdWxsRGlzcGxheSAtIEluZGljYXRlcyBpZiBzY3JlZW4gZm9yY2UgZnVsbCBkaXNwbGF5IGlzIGVuYWJsZWQuXG4gKiBAcGFyYW0ge1N0cmVhbX0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuIC0gVGhlIGxvY2FsIHNjcmVlbiBzdHJlYW0uXG4gKiBAcGFyYW0ge0FycmF5PFN0cmVhbT59IG9wdGlvbnMucGFyYW1ldGVycy5yZW1vdGVTY3JlZW5TdHJlYW0gLSBMaXN0IG9mIHJlbW90ZSBzY3JlZW4gc3RyZWFtcy5cbiAqIEBwYXJhbSB7U3RyZWFtfSBvcHRpb25zLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1WaWRlbyAtIFRoZSBsb2NhbCB2aWRlbyBzdHJlYW0uXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLm1haW5IZWlnaHRXaWR0aCAtIFRoZSBtYWluIGhlaWdodCBhbmQgd2lkdGguXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5pc1dpZGVTY3JlZW4gLSBJbmRpY2F0ZXMgaWYgdGhlIHNjcmVlbiBpcyB3aWRlLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMubG9jYWxVSU1vZGUgLSBJbmRpY2F0ZXMgaWYgbG9jYWwgVUkgbW9kZSBpcyBlbmFibGVkLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMud2hpdGVib2FyZFN0YXJ0ZWQgLSBJbmRpY2F0ZXMgaWYgd2hpdGVib2FyZCBoYXMgc3RhcnRlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLndoaXRlYm9hcmRFbmRlZCAtIEluZGljYXRlcyBpZiB3aGl0ZWJvYXJkIGhhcyBlbmRlZC5cbiAqIEBwYXJhbSB7U3RyZWFtfSBvcHRpb25zLnBhcmFtZXRlcnMudmlydHVhbFN0cmVhbSAtIFRoZSB2aXJ0dWFsIHN0cmVhbS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmtlZXBCYWNrZ3JvdW5kIC0gSW5kaWNhdGVzIGlmIGJhY2tncm91bmQgc2hvdWxkIGJlIGtlcHQuXG4gKiBAcGFyYW0ge1N0cmVhbX0gb3B0aW9ucy5wYXJhbWV0ZXJzLmFubm90YXRlU2NyZWVuU3RyZWFtIC0gVGhlIGFubm90YXRlIHNjcmVlbiBzdHJlYW0uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWFpblNjcmVlblBlcnNvbiAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWFpbiBzY3JlZW4gcGVyc29uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU1haW5TY3JlZW5GaWxsZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgaWYgdGhlIG1haW4gc2NyZWVuIGlzIGZpbGxlZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVBZG1pbk9uTWFpblNjcmVlbiAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBpZiBhZG1pbiBpcyBvbiB0aGUgbWFpbiBzY3JlZW4uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWFpbkhlaWdodFdpZHRoIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBtYWluIGhlaWdodCBhbmQgd2lkdGguXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlU2NyZWVuRm9yY2VGdWxsRGlzcGxheSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBzY3JlZW4gZm9yY2UgZnVsbCBkaXNwbGF5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVVwZGF0ZU1haW5XaW5kb3cgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1haW4gd2luZG93IHVwZGF0ZSBzdGF0dXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWFpbkdyaWRTdHJlYW0gLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1haW4gZ3JpZCBzdHJlYW0uXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8eyBjb21wb25lbnQ6IGFueTsgaW5wdXRzOiBhbnkgfVtdIHwgdm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNvbXBvbmVudHMgYW5kIGlucHV0cyBvciB2b2lkLlxuICpcbiAqIEB0aHJvd3Mge0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlcmUgaXMgYW4gaXNzdWUgcHJlcGFyaW5nIGFuZCBwb3B1bGF0aW5nIHRoZSBtYWluIHNjcmVlbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3Qgb3B0aW9ucyA9IHtcbiAqICAgbmFtZTogJ0pvaG4gRG9lJyxcbiAqICAgcGFyYW1ldGVyczoge1xuICogICAgIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IHsgfSxcbiAqICAgICBwYXJ0aWNpcGFudHM6IFtdLFxuICogICAgIGFsbFZpZGVvU3RyZWFtczogW10sXG4gKiAgICAgaXNsZXZlbDogJzEnLFxuICogICAgIG1lbWJlcjogJ0pvaG4nLFxuICogICAgIHNoYXJlZDogZmFsc2UsXG4gKiAgICAgc2hhcmVTY3JlZW5TdGFydGVkOiBmYWxzZSxcbiAqICAgICBldmVudFR5cGU6ICdjb25mZXJlbmNlJyxcbiAqICAgICBzY3JlZW5JZDogJ3NjcmVlbjEyMycsXG4gKiAgICAgZm9yY2VGdWxsRGlzcGxheTogZmFsc2UsXG4gKiAgICAgdXBkYXRlTWFpbldpbmRvdzogZmFsc2UsXG4gKiAgICAgbWFpblNjcmVlbkZpbGxlZDogZmFsc2UsXG4gKiAgICAgYWRtaW5Pbk1haW5TY3JlZW46IGZhbHNlLFxuICogICAgIG1haW5TY3JlZW5QZXJzb246ICcnLFxuICogICAgIHZpZGVvQWxyZWFkeU9uOiBmYWxzZSxcbiAqICAgICBhdWRpb0FscmVhZHlPbjogZmFsc2UsXG4gKiAgICAgb2xkQWxsU3RyZWFtczogW10sXG4gKiAgICAgY2hlY2tPcmllbnRhdGlvbjogKCkgPT4gJ2xhbmRzY2FwZScsXG4gKiAgICAgc2NyZWVuRm9yY2VGdWxsRGlzcGxheTogZmFsc2UsXG4gKiAgICAgbG9jYWxTdHJlYW1TY3JlZW46IG51bGwsXG4gKiAgICAgcmVtb3RlU2NyZWVuU3RyZWFtOiBbXSxcbiAqICAgICBsb2NhbFN0cmVhbVZpZGVvOiBudWxsLFxuICogICAgIG1haW5IZWlnaHRXaWR0aDogMTAwLFxuICogICAgIGlzV2lkZVNjcmVlbjogdHJ1ZSxcbiAqICAgICBsb2NhbFVJTW9kZTogZmFsc2UsXG4gKiAgICAgd2hpdGVib2FyZFN0YXJ0ZWQ6IGZhbHNlLFxuICogICAgIHdoaXRlYm9hcmRFbmRlZDogZmFsc2UsXG4gKiAgICAgdmlydHVhbFN0cmVhbTogbnVsbCxcbiAqICAgICBrZWVwQmFja2dyb3VuZDogZmFsc2UsXG4gKiAgICAgYW5ub3RhdGVTY3JlZW5TdHJlYW06IGZhbHNlLFxuICogICAgIHVwZGF0ZU1haW5TY3JlZW5QZXJzb246IChwZXJzb24pID0+IHsgY29uc29sZS5sb2codXBkYXRlZCkgfSxcbiAqICAgICB1cGRhdGVNYWluU2NyZWVuRmlsbGVkOiAoZmlsbGVkKSA9PiB7IGNvbnNvbGUubG9nKHVwZGF0ZWQpIH0sXG4gKiAgICAgdXBkYXRlQWRtaW5Pbk1haW5TY3JlZW46IChhZG1pbikgPT4geyBjb25zb2xlLmxvZyh1cGRhdGVkKSB9LFxuICogICAgIHVwZGF0ZU1haW5IZWlnaHRXaWR0aDogKGhlaWdodFdpZHRoKSA9PiB7IGNvbnNvbGUubG9nKHVwZGF0ZWQpIH0sXG4gKiAgICAgdXBkYXRlU2NyZWVuRm9yY2VGdWxsRGlzcGxheTogKGZvcmNlKSA9PiB7IGNvbnNvbGUubG9nKHVwZGF0ZWQpIH0sXG4gKiAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdzogKHVwZGF0ZSkgPT4geyBjb25zb2xlLmxvZyh1cGRhdGVkKSB9LFxuICogICAgIHVwZGF0ZU1haW5HcmlkU3RyZWFtOiAoY29tcG9uZW50cykgPT4geyBjb25zb2xlLmxvZyh1cGRhdGVkKSB9LFxuICogICB9LFxuICogfTtcbiAqXG4gKiBhd2FpdCBwcmVwb3B1bGF0ZVVzZXJNZWRpYShvcHRpb25zKTtcbiAqIGBgYFxuICovXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBQcmVwb3B1bGF0ZVVzZXJNZWRpYSB7XG4gIC8qKlxuICAgKiBQcmVwb3B1bGF0ZXMgdGhlIHVzZXIgbWVkaWEgYmFzZWQgb24gdGhlIHByb3ZpZGVkIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7UHJlcG9wdWxhdGVVc2VyTWVkaWFPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHByZXBvcHVsYXRpbmcgdXNlciBtZWRpYS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubmFtZSAtIFRoZSBuYW1lIG9mIHRoZSB1c2VyLlxuICAgKiBAcGFyYW0ge1BhcmFtZXRlcnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGZvciBwcmVwb3B1bGF0aW5nIHVzZXIgbWVkaWEuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zIC0gRnVuY3Rpb24gdG8gZ2V0IHVwZGF0ZWQgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtBcnJheTxQYXJ0aWNpcGFudD59IG9wdGlvbnMucGFyYW1ldGVycy5wYXJ0aWNpcGFudHMgLSBMaXN0IG9mIHBhcnRpY2lwYW50cy5cbiAgICogQHBhcmFtIHtBcnJheTxTdHJlYW0+fSBvcHRpb25zLnBhcmFtZXRlcnMuYWxsVmlkZW9TdHJlYW1zIC0gTGlzdCBvZiBhbGwgdmlkZW8gc3RyZWFtcy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5pc2xldmVsIC0gVGhlIGxldmVsIG9mIHRoZSB1c2VyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLm1lbWJlciAtIFRoZSBtZW1iZXIgbmFtZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVkIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaXMgc2hhcmVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zaGFyZVNjcmVlblN0YXJ0ZWQgLSBJbmRpY2F0ZXMgaWYgc2NyZWVuIHNoYXJpbmcgaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuZXZlbnRUeXBlIC0gVGhlIHR5cGUgb2YgZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuc2NyZWVuSWQgLSBUaGUgc2NyZWVuIElELlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5mb3JjZUZ1bGxEaXNwbGF5IC0gSW5kaWNhdGVzIGlmIGZ1bGwgZGlzcGxheSBpcyBmb3JjZWQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVNYWluV2luZG93IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBtYWluIHdpbmRvdy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMubWFpblNjcmVlbkZpbGxlZCAtIEluZGljYXRlcyBpZiB0aGUgbWFpbiBzY3JlZW4gaXMgZmlsbGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5hZG1pbk9uTWFpblNjcmVlbiAtIEluZGljYXRlcyBpZiBhZG1pbiBpcyBvbiB0aGUgbWFpbiBzY3JlZW4uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMubWFpblNjcmVlblBlcnNvbiAtIFRoZSBwZXJzb24gb24gdGhlIG1haW4gc2NyZWVuLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy52aWRlb0FscmVhZHlPbiAtIEluZGljYXRlcyBpZiB0aGUgdmlkZW8gaXMgYWxyZWFkeSBvbi5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9BbHJlYWR5T24gLSBJbmRpY2F0ZXMgaWYgdGhlIGF1ZGlvIGlzIGFscmVhZHkgb24uXG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyZWFtPn0gb3B0aW9ucy5wYXJhbWV0ZXJzLm9sZEFsbFN0cmVhbXMgLSBMaXN0IG9mIG9sZCBhbGwgc3RyZWFtcy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNoZWNrT3JpZW50YXRpb24gLSBGdW5jdGlvbiB0byBjaGVjayBvcmllbnRhdGlvbi5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2NyZWVuRm9yY2VGdWxsRGlzcGxheSAtIEluZGljYXRlcyBpZiBzY3JlZW4gZm9yY2UgZnVsbCBkaXNwbGF5IGlzIGVuYWJsZWQuXG4gICAqIEBwYXJhbSB7U3RyZWFtfSBvcHRpb25zLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1TY3JlZW4gLSBUaGUgbG9jYWwgc2NyZWVuIHN0cmVhbS5cbiAgICogQHBhcmFtIHtBcnJheTxTdHJlYW0+fSBvcHRpb25zLnBhcmFtZXRlcnMucmVtb3RlU2NyZWVuU3RyZWFtIC0gTGlzdCBvZiByZW1vdGUgc2NyZWVuIHN0cmVhbXMuXG4gICAqIEBwYXJhbSB7U3RyZWFtfSBvcHRpb25zLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1WaWRlbyAtIFRoZSBsb2NhbCB2aWRlbyBzdHJlYW0uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMubWFpbkhlaWdodFdpZHRoIC0gVGhlIG1haW4gaGVpZ2h0IGFuZCB3aWR0aC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuaXNXaWRlU2NyZWVuIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaXMgd2lkZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMubG9jYWxVSU1vZGUgLSBJbmRpY2F0ZXMgaWYgbG9jYWwgVUkgbW9kZSBpcyBlbmFibGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy53aGl0ZWJvYXJkU3RhcnRlZCAtIEluZGljYXRlcyBpZiB3aGl0ZWJvYXJkIGhhcyBzdGFydGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy53aGl0ZWJvYXJkRW5kZWQgLSBJbmRpY2F0ZXMgaWYgd2hpdGVib2FyZCBoYXMgZW5kZWQuXG4gICAqIEBwYXJhbSB7U3RyZWFtfSBvcHRpb25zLnBhcmFtZXRlcnMudmlydHVhbFN0cmVhbSAtIFRoZSB2aXJ0dWFsIHN0cmVhbS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMua2VlcEJhY2tncm91bmQgLSBJbmRpY2F0ZXMgaWYgYmFja2dyb3VuZCBzaG91bGQgYmUga2VwdC5cbiAgICogQHBhcmFtIHtTdHJlYW19IG9wdGlvbnMucGFyYW1ldGVycy5hbm5vdGF0ZVNjcmVlblN0cmVhbSAtIFRoZSBhbm5vdGF0ZSBzY3JlZW4gc3RyZWFtLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWFpblNjcmVlblBlcnNvbiAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWFpbiBzY3JlZW4gcGVyc29uLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWFpblNjcmVlbkZpbGxlZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBpZiB0aGUgbWFpbiBzY3JlZW4gaXMgZmlsbGVkLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQWRtaW5Pbk1haW5TY3JlZW4gLSBGdW5jdGlvbiB0byB1cGRhdGUgaWYgYWRtaW4gaXMgb24gdGhlIG1haW4gc2NyZWVuLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWFpbkhlaWdodFdpZHRoIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBtYWluIGhlaWdodCBhbmQgd2lkdGguXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVTY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHNjcmVlbiBmb3JjZSBmdWxsIGRpc3BsYXkuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVVcGRhdGVNYWluV2luZG93IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBtYWluIHdpbmRvdyB1cGRhdGUgc3RhdHVzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWFpbkdyaWRTdHJlYW0gLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1haW4gZ3JpZCBzdHJlYW0uXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHsgY29tcG9uZW50OiBhbnksIGlucHV0czogYW55IH1bXSB8IHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBjb21wb25lbnRzIGFuZCBpbnB1dHMgb3Igdm9pZC5cbiAgICovXG4gIHByZXBvcHVsYXRlVXNlck1lZGlhID0gYXN5bmMgKHtcbiAgICBuYW1lLFxuICAgIHBhcmFtZXRlcnMsXG4gIH06IFByZXBvcHVsYXRlVXNlck1lZGlhT3B0aW9ucyk6IFByb21pc2U8eyBjb21wb25lbnQ6IGFueTsgaW5wdXRzOiBhbnkgfVtdIHwgdm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBEZXN0cnVjdHVyZSBwYXJhbWV0ZXJzXG5cbiAgICAgIGxldCB7IGdldFVwZGF0ZWRBbGxQYXJhbXMgfSA9IHBhcmFtZXRlcnM7XG4gICAgICBwYXJhbWV0ZXJzID0gZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgICBsZXQge1xuICAgICAgICBwYXJ0aWNpcGFudHMsXG4gICAgICAgIGFsbFZpZGVvU3RyZWFtcyxcbiAgICAgICAgaXNsZXZlbCxcbiAgICAgICAgbWVtYmVyLFxuICAgICAgICBzaGFyZWQsXG4gICAgICAgIHNoYXJlU2NyZWVuU3RhcnRlZCxcbiAgICAgICAgZXZlbnRUeXBlLFxuICAgICAgICBzY3JlZW5JZCxcbiAgICAgICAgZm9yY2VGdWxsRGlzcGxheSxcbiAgICAgICAgdXBkYXRlTWFpbldpbmRvdyxcbiAgICAgICAgbWFpblNjcmVlbkZpbGxlZCxcbiAgICAgICAgYWRtaW5Pbk1haW5TY3JlZW4sXG4gICAgICAgIG1haW5TY3JlZW5QZXJzb24sXG4gICAgICAgIHZpZGVvQWxyZWFkeU9uLFxuICAgICAgICBhdWRpb0FscmVhZHlPbixcbiAgICAgICAgb2xkQWxsU3RyZWFtcyxcbiAgICAgICAgY2hlY2tPcmllbnRhdGlvbixcbiAgICAgICAgc2NyZWVuRm9yY2VGdWxsRGlzcGxheSxcblxuICAgICAgICBsb2NhbFN0cmVhbVNjcmVlbixcbiAgICAgICAgcmVtb3RlU2NyZWVuU3RyZWFtLFxuICAgICAgICBsb2NhbFN0cmVhbVZpZGVvLFxuICAgICAgICBtYWluSGVpZ2h0V2lkdGgsXG4gICAgICAgIGlzV2lkZVNjcmVlbixcbiAgICAgICAgbG9jYWxVSU1vZGUsXG4gICAgICAgIHdoaXRlYm9hcmRTdGFydGVkLFxuICAgICAgICB3aGl0ZWJvYXJkRW5kZWQsXG5cbiAgICAgICAgdmlydHVhbFN0cmVhbSxcbiAgICAgICAga2VlcEJhY2tncm91bmQsXG4gICAgICAgIGFubm90YXRlU2NyZWVuU3RyZWFtLFxuXG4gICAgICAgIHVwZGF0ZU1haW5TY3JlZW5QZXJzb24sXG4gICAgICAgIHVwZGF0ZU1haW5TY3JlZW5GaWxsZWQsXG4gICAgICAgIHVwZGF0ZUFkbWluT25NYWluU2NyZWVuLFxuICAgICAgICB1cGRhdGVNYWluSGVpZ2h0V2lkdGgsXG4gICAgICAgIHVwZGF0ZVNjcmVlbkZvcmNlRnVsbERpc3BsYXksXG4gICAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3csXG4gICAgICAgIHVwZGF0ZU1haW5HcmlkU3RyZWFtLFxuICAgICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAgIC8vIElmIHRoZSBldmVudCB0eXBlIGlzICdjaGF0JywgcmV0dXJuIGVhcmx5XG4gICAgICBpZiAoZXZlbnRUeXBlID09ICdjaGF0Jykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEluaXRpYWxpemUgdmFyaWFibGVzXG4gICAgICBsZXQgaG9zdDogUGFydGljaXBhbnQgfCBudWxsO1xuICAgICAgbGV0IGhvc3RTdHJlYW06IGFueTtcbiAgICAgIGxldCBuZXdDb21wb25lbnRzOiB7IGNvbXBvbmVudDogYW55OyBpbnB1dHM6IGFueSB9W10gPSBbXTtcblxuICAgICAgLy8gQ2hlY2sgaWYgc2NyZWVuIHNoYXJpbmcgaXMgc3RhcnRlZCBvciBzaGFyZWRcbiAgICAgIGlmIChzaGFyZVNjcmVlblN0YXJ0ZWQgfHwgc2hhcmVkKSB7XG4gICAgICAgIC8vIEhhbmRsZSBtYWluIGdyaWQgdmlzaWJpbGl0eSBiYXNlZCBvbiB0aGUgZXZlbnQgdHlwZVxuICAgICAgICBpZiAoZXZlbnRUeXBlID09ICdjb25mZXJlbmNlJykge1xuICAgICAgICAgIGlmIChzaGFyZWQgfHwgc2hhcmVTY3JlZW5TdGFydGVkKSB7XG4gICAgICAgICAgICBpZiAobWFpbkhlaWdodFdpZHRoID09IDApIHtcbiAgICAgICAgICAgICAgLy8gQWRkIHRoZSBtYWluIGdyaWQgaWYgbm90IHByZXNlbnRcbiAgICAgICAgICAgICAgdXBkYXRlTWFpbkhlaWdodFdpZHRoKDg0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBtYWluIGdyaWQgaWYgbm90IHNoYXJlZCBvciBzdGFydGVkXG4gICAgICAgICAgICB1cGRhdGVNYWluSGVpZ2h0V2lkdGgoMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3dpdGNoIGRpc3BsYXkgdG8gb3B0aW1pemUgZm9yIHNjcmVlbiBzaGFyZVxuICAgICAgICBzY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5ID0gZm9yY2VGdWxsRGlzcGxheTtcblxuICAgICAgICB1cGRhdGVTY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5KHNjcmVlbkZvcmNlRnVsbERpc3BsYXkpO1xuXG4gICAgICAgIC8vIEdldCB0aGUgb3JpZW50YXRpb24gYW5kIGFkanVzdCBmb3JjZUZ1bGxEaXNwbGF5XG4gICAgICAgIGxldCBvcmllbnRhdGlvbiA9IGNoZWNrT3JpZW50YXRpb24oKTtcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09ICdwb3J0cmFpdCcgfHwgIWlzV2lkZVNjcmVlbikge1xuICAgICAgICAgIGlmIChzaGFyZVNjcmVlblN0YXJ0ZWQgfHwgc2hhcmVkKSB7XG4gICAgICAgICAgICBzY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5ID0gZmFsc2U7XG4gICAgICAgICAgICB1cGRhdGVTY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5KHNjcmVlbkZvcmNlRnVsbERpc3BsYXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSB1c2VyIGlzIHNoYXJpbmcgdGhlIHNjcmVlblxuICAgICAgICBpZiAoc2hhcmVkKSB7XG4gICAgICAgICAgLy8gVXNlciBpcyBzaGFyaW5nXG4gICAgICAgICAgaG9zdCA9IHsgbmFtZTogbWVtYmVyLCBhdWRpb0lEOiAnJywgdmlkZW9JRDogJycgfTtcbiAgICAgICAgICBob3N0U3RyZWFtID0gbG9jYWxTdHJlYW1TY3JlZW47XG5cbiAgICAgICAgICAvLyBVcGRhdGUgYWRtaW4gb24gdGhlIG1haW4gc2NyZWVuXG4gICAgICAgICAgYWRtaW5Pbk1haW5TY3JlZW4gPSBpc2xldmVsID09ICcyJztcbiAgICAgICAgICB1cGRhdGVBZG1pbk9uTWFpblNjcmVlbihhZG1pbk9uTWFpblNjcmVlbik7XG5cbiAgICAgICAgICAvLyBVcGRhdGUgbWFpbiBzY3JlZW4gcGVyc29uXG4gICAgICAgICAgbWFpblNjcmVlblBlcnNvbiA9IGhvc3QubmFtZSB8fCAnJztcbiAgICAgICAgICB1cGRhdGVNYWluU2NyZWVuUGVyc29uKG1haW5TY3JlZW5QZXJzb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vc29tZW9uZSBlbHNlIGlzIHNoYXJpbmdcbiAgICAgICAgICBob3N0ID1cbiAgICAgICAgICAgIHBhcnRpY2lwYW50cy5maW5kKFxuICAgICAgICAgICAgICAocGFydGljaXBhbnQ6IFBhcnRpY2lwYW50KSA9PlxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50LlNjcmVlbklEID09IHNjcmVlbklkICYmIHBhcnRpY2lwYW50LlNjcmVlbk9uID09IHRydWUsXG4gICAgICAgICAgICApID8/IG51bGw7XG5cbiAgICAgICAgICBpZiAod2hpdGVib2FyZFN0YXJ0ZWQgJiYgIXdoaXRlYm9hcmRFbmRlZCkge1xuICAgICAgICAgICAgaG9zdCA9IHsgbmFtZTogJ1doaXRlYm9hcmRBY3RpdmUnLCBpc2xldmVsOiAnMicsIGF1ZGlvSUQ6ICcnLCB2aWRlb0lEOiAnJyB9O1xuICAgICAgICAgICAgaG9zdFN0cmVhbSA9IHsgcHJvZHVjZXJJZDogJ1doaXRlYm9hcmRBY3RpdmUnIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGhvc3QgPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gcmVtb3RlU2NyZWVuU3RyZWFtXG4gICAgICAgICAgICBob3N0ID1cbiAgICAgICAgICAgICAgcGFydGljaXBhbnRzLmZpbmQoKHBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudCkgPT4gcGFydGljaXBhbnQuU2NyZWVuT24gPT0gdHJ1ZSkgPz8gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBjaGVjayByZW1vdGVTY3JlZW5TdHJlYW1cbiAgICAgICAgICBpZiAoaG9zdCAhPSBudWxsICYmICFob3N0Py5uYW1lPy5pbmNsdWRlcygnV2hpdGVib2FyZEFjdGl2ZScpKSB7XG4gICAgICAgICAgICBpZiAocmVtb3RlU2NyZWVuU3RyZWFtLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgIGhvc3RTdHJlYW0gPVxuICAgICAgICAgICAgICAgIGFsbFZpZGVvU3RyZWFtcy5maW5kKFxuICAgICAgICAgICAgICAgICAgKHN0cmVhbTogU3RyZWFtIHwgUGFydGljaXBhbnQpID0+IHN0cmVhbS5wcm9kdWNlcklkID09IGhvc3Q/LlNjcmVlbklELFxuICAgICAgICAgICAgICAgICkgPz8gbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGhvc3RTdHJlYW0gPSByZW1vdGVTY3JlZW5TdHJlYW1bMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gVXBkYXRlIGFkbWluIG9uIHRoZSBtYWluIHNjcmVlblxuICAgICAgICAgIGFkbWluT25NYWluU2NyZWVuID0gKGhvc3QgJiYgaG9zdC5pc2xldmVsID09ICcyJykgPz8gZmFsc2U7XG4gICAgICAgICAgdXBkYXRlQWRtaW5Pbk1haW5TY3JlZW4oYWRtaW5Pbk1haW5TY3JlZW4pO1xuXG4gICAgICAgICAgLy8gVXBkYXRlIG1haW4gc2NyZWVuIHBlcnNvblxuICAgICAgICAgIG1haW5TY3JlZW5QZXJzb24gPSBob3N0Py5uYW1lID8/ICcnO1xuICAgICAgICAgIHVwZGF0ZU1haW5TY3JlZW5QZXJzb24obWFpblNjcmVlblBlcnNvbik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFNjcmVlbiBzaGFyZSBub3Qgc3RhcnRlZFxuICAgICAgICBpZiAoZXZlbnRUeXBlID09ICdjb25mZXJlbmNlJykge1xuICAgICAgICAgIC8vIE5vIG1haW4gZ3JpZCBmb3IgY29uZmVyZW5jZXNcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaW5kIHRoZSBob3N0IHdpdGggbGV2ZWwgJzInXG4gICAgICAgIGhvc3QgPSBwYXJ0aWNpcGFudHMuZmluZCgocGFydGljaXBhbnQ6IFBhcnRpY2lwYW50KSA9PiBwYXJ0aWNpcGFudC5pc2xldmVsID09ICcyJykgPz8gbnVsbDtcblxuICAgICAgICAvLyBVcGRhdGUgbWFpbiBzY3JlZW4gcGVyc29uXG4gICAgICAgIG1haW5TY3JlZW5QZXJzb24gPSBob3N0Py5uYW1lID8/ICcnO1xuICAgICAgICB1cGRhdGVNYWluU2NyZWVuUGVyc29uKG1haW5TY3JlZW5QZXJzb24pO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBob3N0IGlzIG5vdCBudWxsLCBjaGVjayBpZiBob3N0IHZpZGVvSXNPblxuICAgICAgaWYgKGhvc3QpIHtcbiAgICAgICAgLy8gUG9wdWxhdGUgdGhlIG1haW4gc2NyZWVuIHdpdGggdGhlIGhvc3QgdmlkZW9cbiAgICAgICAgaWYgKHNoYXJlU2NyZWVuU3RhcnRlZCB8fCBzaGFyZWQpIHtcbiAgICAgICAgICBmb3JjZUZ1bGxEaXNwbGF5ID0gc2NyZWVuRm9yY2VGdWxsRGlzcGxheTtcbiAgICAgICAgICBpZiAod2hpdGVib2FyZFN0YXJ0ZWQgJiYgIXdoaXRlYm9hcmRFbmRlZCkge1xuICAgICAgICAgICAgLy8gV2hpdGVib2FyZCBpcyBhY3RpdmVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3Q29tcG9uZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgY29tcG9uZW50OiBWaWRlb0NhcmQsXG4gICAgICAgICAgICAgIGlucHV0czoge1xuICAgICAgICAgICAgICAgIHZpZGVvU3RyZWFtOiBzaGFyZWQgPyBob3N0U3RyZWFtIDogaG9zdFN0cmVhbS5zdHJlYW0sXG4gICAgICAgICAgICAgICAgcmVtb3RlUHJvZHVjZXJJZDogaG9zdC5TY3JlZW5JRCxcbiAgICAgICAgICAgICAgICBldmVudFR5cGUsXG4gICAgICAgICAgICAgICAgZm9yY2VGdWxsRGlzcGxheTogYW5ub3RhdGVTY3JlZW5TdHJlYW0gJiYgc2hhcmVkID8gZmFsc2UgOiBmb3JjZUZ1bGxEaXNwbGF5LFxuICAgICAgICAgICAgICAgIGN1c3RvbVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICBib3JkZXI6IGV2ZW50VHlwZSAhPT0gJ2Jyb2FkY2FzdCcgPyAnMnB4IHNvbGlkIGJsYWNrJyA6ICcwcHggc29saWQgYmxhY2snLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IGhvc3QsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KScsXG4gICAgICAgICAgICAgICAgc2hvd0NvbnRyb2xzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93SW5mbzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBuYW1lOiBob3N0Lm5hbWUsXG4gICAgICAgICAgICAgICAgZG9NaXJyb3I6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB1cGRhdGVNYWluR3JpZFN0cmVhbShuZXdDb21wb25lbnRzKTtcblxuICAgICAgICAgIG1haW5TY3JlZW5GaWxsZWQgPSB0cnVlO1xuICAgICAgICAgIHVwZGF0ZU1haW5TY3JlZW5GaWxsZWQobWFpblNjcmVlbkZpbGxlZCk7XG4gICAgICAgICAgYWRtaW5Pbk1haW5TY3JlZW4gPSBob3N0LmlzbGV2ZWwgPT0gJzInO1xuICAgICAgICAgIHVwZGF0ZUFkbWluT25NYWluU2NyZWVuKGFkbWluT25NYWluU2NyZWVuKTtcbiAgICAgICAgICBtYWluU2NyZWVuUGVyc29uID0gaG9zdC5uYW1lID8/ICcnO1xuICAgICAgICAgIHVwZGF0ZU1haW5TY3JlZW5QZXJzb24obWFpblNjcmVlblBlcnNvbik7XG5cbiAgICAgICAgICByZXR1cm4gbmV3Q29tcG9uZW50cztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIHZpZGVvIGlzIGFscmVhZHkgb24gb3Igbm90XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoaXNsZXZlbCAhPSAnMicgJiYgIWhvc3RbJ3ZpZGVvT24nXSkgfHxcbiAgICAgICAgICAoaXNsZXZlbCA9PSAnMicgJiYgKCFob3N0Wyd2aWRlb09uJ10gfHwgIXZpZGVvQWxyZWFkeU9uKSkgfHxcbiAgICAgICAgICBsb2NhbFVJTW9kZSA9PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIC8vIFZpZGVvIGlzIG9mZlxuICAgICAgICAgIGlmIChpc2xldmVsID09ICcyJyAmJiB2aWRlb0FscmVhZHlPbikge1xuICAgICAgICAgICAgLy8gQWRtaW4ncyB2aWRlbyBpcyBvblxuICAgICAgICAgICAgbmV3Q29tcG9uZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgY29tcG9uZW50OiBWaWRlb0NhcmQsXG4gICAgICAgICAgICAgIGlucHV0czoge1xuICAgICAgICAgICAgICAgIHZpZGVvU3RyZWFtOiBrZWVwQmFja2dyb3VuZCAmJiB2aXJ0dWFsU3RyZWFtID8gdmlydHVhbFN0cmVhbSA6IGxvY2FsU3RyZWFtVmlkZW8sXG4gICAgICAgICAgICAgICAgcmVtb3RlUHJvZHVjZXJJZDogaG9zdC52aWRlb0lELFxuICAgICAgICAgICAgICAgIGV2ZW50VHlwZSxcbiAgICAgICAgICAgICAgICBmb3JjZUZ1bGxEaXNwbGF5LFxuICAgICAgICAgICAgICAgIGN1c3RvbVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICBib3JkZXI6IGV2ZW50VHlwZSAhPT0gJ2Jyb2FkY2FzdCcgPyAnMnB4IHNvbGlkIGJsYWNrJyA6ICcwcHggc29saWQgYmxhY2snLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IGhvc3QsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KScsXG4gICAgICAgICAgICAgICAgc2hvd0NvbnRyb2xzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93SW5mbzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBuYW1lOiBob3N0Lm5hbWUsXG4gICAgICAgICAgICAgICAgZG9NaXJyb3I6IHRydWUsXG4gICAgICAgICAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXBkYXRlTWFpbkdyaWRTdHJlYW0obmV3Q29tcG9uZW50cyk7XG5cbiAgICAgICAgICAgIG1haW5TY3JlZW5GaWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdXBkYXRlTWFpblNjcmVlbkZpbGxlZChtYWluU2NyZWVuRmlsbGVkKTtcbiAgICAgICAgICAgIGFkbWluT25NYWluU2NyZWVuID0gdHJ1ZTtcbiAgICAgICAgICAgIHVwZGF0ZUFkbWluT25NYWluU2NyZWVuKGFkbWluT25NYWluU2NyZWVuKTtcbiAgICAgICAgICAgIG1haW5TY3JlZW5QZXJzb24gPSBob3N0Lm5hbWUgPz8gJyc7XG4gICAgICAgICAgICB1cGRhdGVNYWluU2NyZWVuUGVyc29uKG1haW5TY3JlZW5QZXJzb24pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBWaWRlbyBpcyBvZmYgYW5kIG5vdCBhZG1pblxuICAgICAgICAgICAgbGV0IGF1ZE9uO1xuXG4gICAgICAgICAgICBpZiAoaXNsZXZlbCA9PSAnMicgJiYgYXVkaW9BbHJlYWR5T24pIHtcbiAgICAgICAgICAgICAgYXVkT24gPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGhvc3QgIT0gbnVsbCAmJiBpc2xldmVsICE9ICcyJykge1xuICAgICAgICAgICAgICAgIGF1ZE9uID0gaG9zdFsnbXV0ZWQnXSA9PSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYXVkT24pIHtcbiAgICAgICAgICAgICAgLy8gQXVkaW8gaXMgb25cbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBuZXdDb21wb25lbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBBdWRpb0NhcmQsXG4gICAgICAgICAgICAgICAgICBpbnB1dHM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogaG9zdC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBiYXJDb2xvcjogJ3JlZCcsXG4gICAgICAgICAgICAgICAgICAgIHRleHRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tU3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBldmVudFR5cGUgIT09ICdicm9hZGNhc3QnID8gJzJweCBzb2xpZCBibGFjaycgOiAnMHB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHNQb3NpdGlvbjogJ3RvcExlZnQnLFxuICAgICAgICAgICAgICAgICAgICBpbmZvUG9zaXRpb246ICd0b3BSaWdodCcsXG4gICAgICAgICAgICAgICAgICAgIHNob3dXYXZlZm9ybTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcm91bmRlZEltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiBwYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICAgICAgICBzaG93Q29udHJvbHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdXBkYXRlTWFpbkdyaWRTdHJlYW0obmV3Q29tcG9uZW50cyk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIGF1ZGlvIGNhcmQgY3JlYXRpb24gZXJyb3JcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIG1haW5TY3JlZW5GaWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB1cGRhdGVNYWluU2NyZWVuRmlsbGVkKG1haW5TY3JlZW5GaWxsZWQpO1xuICAgICAgICAgICAgICBhZG1pbk9uTWFpblNjcmVlbiA9IGlzbGV2ZWwgPT0gJzInO1xuICAgICAgICAgICAgICB1cGRhdGVBZG1pbk9uTWFpblNjcmVlbihhZG1pbk9uTWFpblNjcmVlbik7XG4gICAgICAgICAgICAgIG1haW5TY3JlZW5QZXJzb24gPSBob3N0Lm5hbWUgPz8gJyc7XG4gICAgICAgICAgICAgIHVwZGF0ZU1haW5TY3JlZW5QZXJzb24obWFpblNjcmVlblBlcnNvbik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBBdWRpbyBpcyBvZmZcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBuZXdDb21wb25lbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBNaW5pQ2FyZCxcbiAgICAgICAgICAgICAgICAgIGlucHV0czoge1xuICAgICAgICAgICAgICAgICAgICBpbml0aWFsczogbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDIwLFxuICAgICAgICAgICAgICAgICAgICBjdXN0b21TdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IGV2ZW50VHlwZSAhPT0gJ2Jyb2FkY2FzdCcgPyAnMnB4IHNvbGlkIGJsYWNrJyA6ICcwcHggc29saWQgYmxhY2snLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB1cGRhdGVNYWluR3JpZFN0cmVhbShuZXdDb21wb25lbnRzKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgbWluaSBjYXJkIGNyZWF0aW9uIGVycm9yXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBtYWluU2NyZWVuRmlsbGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIHVwZGF0ZU1haW5TY3JlZW5GaWxsZWQobWFpblNjcmVlbkZpbGxlZCk7XG4gICAgICAgICAgICAgIGFkbWluT25NYWluU2NyZWVuID0gaXNsZXZlbCA9PSAnMic7XG4gICAgICAgICAgICAgIHVwZGF0ZUFkbWluT25NYWluU2NyZWVuKGFkbWluT25NYWluU2NyZWVuKTtcbiAgICAgICAgICAgICAgbWFpblNjcmVlblBlcnNvbiA9IGhvc3QubmFtZSA/PyAnJztcbiAgICAgICAgICAgICAgdXBkYXRlTWFpblNjcmVlblBlcnNvbihtYWluU2NyZWVuUGVyc29uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gVmlkZW8gaXMgb25cbiAgICAgICAgICBpZiAoc2hhcmVTY3JlZW5TdGFydGVkIHx8IHNoYXJlZCkge1xuICAgICAgICAgICAgLy8gU2NyZWVuIHNoYXJlIGlzIG9uXG4gICAgICAgICAgICBpZiAod2hpdGVib2FyZFN0YXJ0ZWQgJiYgIXdoaXRlYm9hcmRFbmRlZCkge1xuICAgICAgICAgICAgICAvLyBXaGl0ZWJvYXJkIGlzIGFjdGl2ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBuZXdDb21wb25lbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBWaWRlb0NhcmQsXG4gICAgICAgICAgICAgICAgICBpbnB1dHM6IHtcbiAgICAgICAgICAgICAgICAgICAgdmlkZW9TdHJlYW06IHNoYXJlZCA/IGhvc3RTdHJlYW0gOiBob3N0U3RyZWFtLnN0cmVhbSxcbiAgICAgICAgICAgICAgICAgICAgcmVtb3RlUHJvZHVjZXJJZDogaG9zdC5TY3JlZW5JRCxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRUeXBlLFxuICAgICAgICAgICAgICAgICAgICBmb3JjZUZ1bGxEaXNwbGF5LFxuICAgICAgICAgICAgICAgICAgICBjdXN0b21TdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogZXZlbnRUeXBlICE9PSAnYnJvYWRjYXN0JyA/ICcycHggc29saWQgYmxhY2snIDogJzBweCBzb2xpZCBibGFjaycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiBob3N0LFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NvbnRyb2xzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgc2hvd0luZm86IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGhvc3QubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZG9NaXJyb3I6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHVwZGF0ZU1haW5HcmlkU3RyZWFtKG5ld0NvbXBvbmVudHMpO1xuXG4gICAgICAgICAgICAgICAgbWFpblNjcmVlbkZpbGxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdXBkYXRlTWFpblNjcmVlbkZpbGxlZChtYWluU2NyZWVuRmlsbGVkKTtcbiAgICAgICAgICAgICAgICBhZG1pbk9uTWFpblNjcmVlbiA9IGhvc3QuaXNsZXZlbCA9PSAnMic7XG4gICAgICAgICAgICAgICAgdXBkYXRlQWRtaW5Pbk1haW5TY3JlZW4oYWRtaW5Pbk1haW5TY3JlZW4pO1xuICAgICAgICAgICAgICAgIG1haW5TY3JlZW5QZXJzb24gPSBob3N0Lm5hbWUgPz8gJyc7XG4gICAgICAgICAgICAgICAgdXBkYXRlTWFpblNjcmVlblBlcnNvbihtYWluU2NyZWVuUGVyc29uKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgdmlkZW8gY2FyZCBjcmVhdGlvbiBlcnJvclxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFNjcmVlbiBzaGFyZSBpcyBvZmZcbiAgICAgICAgICAgIGxldCBzdHJlYW1lO1xuICAgICAgICAgICAgaWYgKGlzbGV2ZWwgPT0gJzInKSB7XG4gICAgICAgICAgICAgIGhvc3RbJ3N0cmVhbSddID0ga2VlcEJhY2tncm91bmQgJiYgdmlydHVhbFN0cmVhbSA/IHZpcnR1YWxTdHJlYW0gOiBsb2NhbFN0cmVhbVZpZGVvO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3RyZWFtZSA9IG9sZEFsbFN0cmVhbXMuZmluZChcbiAgICAgICAgICAgICAgICAoc3RyZWFtZTogU3RyZWFtIHwgUGFydGljaXBhbnQpID0+IHN0cmVhbWUucHJvZHVjZXJJZCA9PSBob3N0LnZpZGVvSUQsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGhvc3RbJ3N0cmVhbSddID0gc3RyZWFtZSAmJiBzdHJlYW1lLnN0cmVhbTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgaWYgKGhvc3RbJ3N0cmVhbSddKSB7XG4gICAgICAgICAgICAgICAgbmV3Q29tcG9uZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogVmlkZW9DYXJkLFxuICAgICAgICAgICAgICAgICAgaW5wdXRzOiB7XG4gICAgICAgICAgICAgICAgICAgIHZpZGVvU3RyZWFtOiBob3N0WydzdHJlYW0nXSxcbiAgICAgICAgICAgICAgICAgICAgcmVtb3RlUHJvZHVjZXJJZDogaG9zdC52aWRlb0lELFxuICAgICAgICAgICAgICAgICAgICBldmVudFR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGZvcmNlRnVsbERpc3BsYXksXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBldmVudFR5cGUgIT09ICdicm9hZGNhc3QnID8gJzJweCBzb2xpZCBibGFjaycgOiAnMHB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IGhvc3QsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknLFxuICAgICAgICAgICAgICAgICAgICBzaG93Q29udHJvbHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBzaG93SW5mbzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogaG9zdC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBkb01pcnJvcjogbWVtYmVyID09IGhvc3QubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB1cGRhdGVNYWluR3JpZFN0cmVhbShuZXdDb21wb25lbnRzKTtcblxuICAgICAgICAgICAgICAgIG1haW5TY3JlZW5GaWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGFkbWluT25NYWluU2NyZWVuID0gaG9zdC5pc2xldmVsID09ICcyJztcbiAgICAgICAgICAgICAgICBtYWluU2NyZWVuUGVyc29uID0gaG9zdC5uYW1lID8/ICcnO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0NvbXBvbmVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBjb21wb25lbnQ6IE1pbmlDYXJkLFxuICAgICAgICAgICAgICAgICAgaW5wdXRzOiB7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxzOiBuYW1lLFxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMjAsXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogZXZlbnRUeXBlICE9PSAnYnJvYWRjYXN0JyA/ICcycHggc29saWQgYmxhY2snIDogJzBweCBzb2xpZCBibGFjaycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdXBkYXRlTWFpbkdyaWRTdHJlYW0obmV3Q29tcG9uZW50cyk7XG4gICAgICAgICAgICAgICAgbWFpblNjcmVlbkZpbGxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGFkbWluT25NYWluU2NyZWVuID0gaXNsZXZlbCA9PSAnMic7XG4gICAgICAgICAgICAgICAgbWFpblNjcmVlblBlcnNvbiA9IGhvc3QubmFtZSA/PyAnJztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHVwZGF0ZU1haW5TY3JlZW5GaWxsZWQobWFpblNjcmVlbkZpbGxlZCk7XG5cbiAgICAgICAgICAgICAgdXBkYXRlQWRtaW5Pbk1haW5TY3JlZW4oYWRtaW5Pbk1haW5TY3JlZW4pO1xuXG4gICAgICAgICAgICAgIHVwZGF0ZU1haW5TY3JlZW5QZXJzb24obWFpblNjcmVlblBlcnNvbik7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAvLyBIYW5kbGUgdmlkZW8gY2FyZCBjcmVhdGlvbiBlcnJvclxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSG9zdCBpcyBudWxsLCBhZGQgYSBtaW5pIGNhcmRcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBuZXdDb21wb25lbnRzLnB1c2goe1xuICAgICAgICAgICAgY29tcG9uZW50OiBNaW5pQ2FyZCxcbiAgICAgICAgICAgIGlucHV0czoge1xuICAgICAgICAgICAgICBpbml0aWFsczogbmFtZSxcbiAgICAgICAgICAgICAgZm9udFNpemU6IDIwLFxuICAgICAgICAgICAgICBjdXN0b21TdHlsZToge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICBib3JkZXI6IGV2ZW50VHlwZSAhPT0gJ2Jyb2FkY2FzdCcgPyAnMnB4IHNvbGlkIGJsYWNrJyA6ICcwcHggc29saWQgYmxhY2snLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHVwZGF0ZU1haW5HcmlkU3RyZWFtKG5ld0NvbXBvbmVudHMpO1xuXG4gICAgICAgICAgbWFpblNjcmVlbkZpbGxlZCA9IGZhbHNlO1xuICAgICAgICAgIGFkbWluT25NYWluU2NyZWVuID0gZmFsc2U7XG4gICAgICAgICAgbWFpblNjcmVlblBlcnNvbiA9ICcnO1xuICAgICAgICAgIHVwZGF0ZU1haW5TY3JlZW5GaWxsZWQobWFpblNjcmVlbkZpbGxlZCk7XG4gICAgICAgICAgdXBkYXRlQWRtaW5Pbk1haW5TY3JlZW4oYWRtaW5Pbk1haW5TY3JlZW4pO1xuICAgICAgICAgIHVwZGF0ZU1haW5TY3JlZW5QZXJzb24obWFpblNjcmVlblBlcnNvbik7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgLy8gSGFuZGxlIG1pbmkgY2FyZCBjcmVhdGlvbiBlcnJvclxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZU1haW5XaW5kb3cgPSBmYWxzZTtcbiAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3codXBkYXRlTWFpbldpbmRvdyk7XG5cbiAgICAgIHJldHVybiBuZXdDb21wb25lbnRzO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIC8vIEhhbmRsZSBlcnJvcnMgZHVyaW5nIHRoZSBwcm9jZXNzIG9mIHByZXBhcmluZyBhbmQgcG9wdWxhdGluZyB0aGUgbWFpbiBzY3JlZW5cbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBwcmVwYXJpbmcgYW5kIHBvcHVsYXRpbmcgdGhlIG1haW4gc2NyZWVuOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==