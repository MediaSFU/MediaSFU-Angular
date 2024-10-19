import { Injectable } from '@angular/core';
import { MiniCard } from '../components/display-components/mini-card/mini-card.component';
import { VideoCard } from '../components/display-components/video-card/video-card.component';
import { AudioCard } from '../components/display-components/audio-card/audio-card.component';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlcG9wdWxhdGUtdXNlci1tZWRpYS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9wcmVwb3B1bGF0ZS11c2VyLW1lZGlhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0VBQWdFLENBQUM7QUFDMUYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtFQUFrRSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQzs7QUFrRTdGLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTZDRztJQUNILG9CQUFvQixHQUFHLEtBQUssRUFBRSxFQUM1QixJQUFJLEVBQ0osVUFBVSxHQUNrQixFQUFxRCxFQUFFO1FBQ25GLElBQUksQ0FBQztZQUNILHlCQUF5QjtZQUV6QixJQUFJLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDekMsVUFBVSxHQUFHLG1CQUFtQixFQUFFLENBQUM7WUFFbkMsSUFBSSxFQUNGLFlBQVksRUFDWixlQUFlLEVBQ2YsT0FBTyxFQUNQLE1BQU0sRUFDTixNQUFNLEVBQ04sa0JBQWtCLEVBQ2xCLFNBQVMsRUFDVCxRQUFRLEVBQ1IsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixjQUFjLEVBQ2QsY0FBYyxFQUNkLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsc0JBQXNCLEVBRXRCLGlCQUFpQixFQUNqQixrQkFBa0IsRUFDbEIsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixZQUFZLEVBQ1os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S0FBSyxDQUFDO1lBQ3pCLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFekMsT0FBTyxhQUFhLENBQUM7UUFDdkIsQ0FBQztRQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7WUFDcEIsK0VBQStFO1lBQy9FLE9BQU8sQ0FBQyxHQUFHLENBQUMsaURBQWlELEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlFLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQztJQUNILENBQUMsQ0FBQzt1R0FwZlMsb0JBQW9COzJHQUFwQixvQkFBb0IsY0FGbkIsTUFBTTs7MkZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1pbmlDYXJkIH0gZnJvbSAnLi4vY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvbWluaS1jYXJkL21pbmktY2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlkZW9DYXJkIH0gZnJvbSAnLi4vY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvdmlkZW8tY2FyZC92aWRlby1jYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBdWRpb0NhcmQgfSBmcm9tICcuLi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9hdWRpby1jYXJkL2F1ZGlvLWNhcmQuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIFBhcnRpY2lwYW50LFxuICBTdHJlYW0sXG4gIEF1ZGlvQ2FyZFBhcmFtZXRlcnMsXG4gIEV2ZW50VHlwZSxcbiAgQ3VzdG9tTWVkaWFDb21wb25lbnQsXG59IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJlcG9wdWxhdGVVc2VyTWVkaWFQYXJhbWV0ZXJzIGV4dGVuZHMgQXVkaW9DYXJkUGFyYW1ldGVycyB7XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgYWxsVmlkZW9TdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW107XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgbWVtYmVyOiBzdHJpbmc7XG4gIHNoYXJlZDogYm9vbGVhbjtcbiAgc2hhcmVTY3JlZW5TdGFydGVkOiBib29sZWFuO1xuICBldmVudFR5cGU6IEV2ZW50VHlwZTtcbiAgc2NyZWVuSWQ/OiBzdHJpbmc7XG4gIGZvcmNlRnVsbERpc3BsYXk6IGJvb2xlYW47XG4gIHVwZGF0ZU1haW5XaW5kb3c6IGJvb2xlYW47XG4gIG1haW5TY3JlZW5GaWxsZWQ6IGJvb2xlYW47XG4gIGFkbWluT25NYWluU2NyZWVuOiBib29sZWFuO1xuICBtYWluU2NyZWVuUGVyc29uOiBzdHJpbmc7XG4gIHZpZGVvQWxyZWFkeU9uOiBib29sZWFuO1xuICBhdWRpb0FscmVhZHlPbjogYm9vbGVhbjtcbiAgb2xkQWxsU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICBjaGVja09yaWVudGF0aW9uOiAoKSA9PiBzdHJpbmc7XG4gIHNjcmVlbkZvcmNlRnVsbERpc3BsYXk6IGJvb2xlYW47XG4gIGxvY2FsU3RyZWFtU2NyZWVuOiBNZWRpYVN0cmVhbSB8IG51bGw7XG4gIHJlbW90ZVNjcmVlblN0cmVhbTogU3RyZWFtW107XG4gIGxvY2FsU3RyZWFtVmlkZW86IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgbWFpbkhlaWdodFdpZHRoOiBudW1iZXI7XG4gIGlzV2lkZVNjcmVlbjogYm9vbGVhbjtcbiAgbG9jYWxVSU1vZGU6IGJvb2xlYW47XG4gIHdoaXRlYm9hcmRTdGFydGVkOiBib29sZWFuO1xuICB3aGl0ZWJvYXJkRW5kZWQ6IGJvb2xlYW47XG4gIHZpcnR1YWxTdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAga2VlcEJhY2tncm91bmQ6IGJvb2xlYW47XG4gIGFubm90YXRlU2NyZWVuU3RyZWFtOiBib29sZWFuO1xuICB1cGRhdGVNYWluU2NyZWVuUGVyc29uOiAocGVyc29uOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZU1haW5TY3JlZW5GaWxsZWQ6IChmaWxsZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUFkbWluT25NYWluU2NyZWVuOiAoYWRtaW46IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZU1haW5IZWlnaHRXaWR0aDogKGhlaWdodFdpZHRoOiBudW1iZXIpID0+IHZvaWQ7XG4gIHVwZGF0ZVNjcmVlbkZvcmNlRnVsbERpc3BsYXk6IChmb3JjZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdzogKHVwZGF0ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlTWFpbkdyaWRTdHJlYW06IChjb21wb25lbnRzOiBDdXN0b21NZWRpYUNvbXBvbmVudFtdKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBQcmVwb3B1bGF0ZVVzZXJNZWRpYVBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcmVwb3B1bGF0ZVVzZXJNZWRpYU9wdGlvbnMge1xuICBuYW1lOiBzdHJpbmc7XG4gIHBhcmFtZXRlcnM6IFByZXBvcHVsYXRlVXNlck1lZGlhUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgUHJlcG9wdWxhdGVVc2VyTWVkaWFUeXBlID0gKG9wdGlvbnM6IHtcbiAgbmFtZTogc3RyaW5nO1xuICBwYXJhbWV0ZXJzOiBhbnk7XG59KSA9PiBQcm9taXNlPHsgY29tcG9uZW50OiBhbnk7IGlucHV0czogYW55IH1bXSB8IHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUHJlcG9wdWxhdGVVc2VyTWVkaWEge1xuICAvKipcbiAgICogUHJlcG9wdWxhdGVzIHRoZSB1c2VyIG1lZGlhIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBvcHRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0ge1ByZXBvcHVsYXRlVXNlck1lZGlhT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBwcmVwb3B1bGF0aW5nIHVzZXIgbWVkaWEuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgdXNlci5cbiAgICogQHBhcmFtIHtQYXJhbWV0ZXJzfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3IgcHJlcG9wdWxhdGluZyB1c2VyIG1lZGlhLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcyAtIEZ1bmN0aW9uIHRvIGdldCB1cGRhdGVkIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7QXJyYXk8UGFydGljaXBhbnQ+fSBvcHRpb25zLnBhcmFtZXRlcnMucGFydGljaXBhbnRzIC0gTGlzdCBvZiBwYXJ0aWNpcGFudHMuXG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyZWFtPn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmFsbFZpZGVvU3RyZWFtcyAtIExpc3Qgb2YgYWxsIHZpZGVvIHN0cmVhbXMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuaXNsZXZlbCAtIFRoZSBsZXZlbCBvZiB0aGUgdXNlci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5tZW1iZXIgLSBUaGUgbWVtYmVyIG5hbWUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNoYXJlZCAtIEluZGljYXRlcyBpZiB0aGUgc2NyZWVuIGlzIHNoYXJlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVTY3JlZW5TdGFydGVkIC0gSW5kaWNhdGVzIGlmIHNjcmVlbiBzaGFyaW5nIGhhcyBzdGFydGVkLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmV2ZW50VHlwZSAtIFRoZSB0eXBlIG9mIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnNjcmVlbklkIC0gVGhlIHNjcmVlbiBJRC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuZm9yY2VGdWxsRGlzcGxheSAtIEluZGljYXRlcyBpZiBmdWxsIGRpc3BsYXkgaXMgZm9yY2VkLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWFpbldpbmRvdyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWFpbiB3aW5kb3cuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLm1haW5TY3JlZW5GaWxsZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIG1haW4gc2NyZWVuIGlzIGZpbGxlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYWRtaW5Pbk1haW5TY3JlZW4gLSBJbmRpY2F0ZXMgaWYgYWRtaW4gaXMgb24gdGhlIG1haW4gc2NyZWVuLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLm1haW5TY3JlZW5QZXJzb24gLSBUaGUgcGVyc29uIG9uIHRoZSBtYWluIHNjcmVlbi5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMudmlkZW9BbHJlYWR5T24gLSBJbmRpY2F0ZXMgaWYgdGhlIHZpZGVvIGlzIGFscmVhZHkgb24uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmF1ZGlvQWxyZWFkeU9uIC0gSW5kaWNhdGVzIGlmIHRoZSBhdWRpbyBpcyBhbHJlYWR5IG9uLlxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmVhbT59IG9wdGlvbnMucGFyYW1ldGVycy5vbGRBbGxTdHJlYW1zIC0gTGlzdCBvZiBvbGQgYWxsIHN0cmVhbXMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jaGVja09yaWVudGF0aW9uIC0gRnVuY3Rpb24gdG8gY2hlY2sgb3JpZW50YXRpb24uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNjcmVlbkZvcmNlRnVsbERpc3BsYXkgLSBJbmRpY2F0ZXMgaWYgc2NyZWVuIGZvcmNlIGZ1bGwgZGlzcGxheSBpcyBlbmFibGVkLlxuICAgKiBAcGFyYW0ge1N0cmVhbX0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuIC0gVGhlIGxvY2FsIHNjcmVlbiBzdHJlYW0uXG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyZWFtPn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlbW90ZVNjcmVlblN0cmVhbSAtIExpc3Qgb2YgcmVtb3RlIHNjcmVlbiBzdHJlYW1zLlxuICAgKiBAcGFyYW0ge1N0cmVhbX0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtVmlkZW8gLSBUaGUgbG9jYWwgdmlkZW8gc3RyZWFtLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLm1haW5IZWlnaHRXaWR0aCAtIFRoZSBtYWluIGhlaWdodCBhbmQgd2lkdGguXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzV2lkZVNjcmVlbiAtIEluZGljYXRlcyBpZiB0aGUgc2NyZWVuIGlzIHdpZGUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2FsVUlNb2RlIC0gSW5kaWNhdGVzIGlmIGxvY2FsIFVJIG1vZGUgaXMgZW5hYmxlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMud2hpdGVib2FyZFN0YXJ0ZWQgLSBJbmRpY2F0ZXMgaWYgd2hpdGVib2FyZCBoYXMgc3RhcnRlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMud2hpdGVib2FyZEVuZGVkIC0gSW5kaWNhdGVzIGlmIHdoaXRlYm9hcmQgaGFzIGVuZGVkLlxuICAgKiBAcGFyYW0ge1N0cmVhbX0gb3B0aW9ucy5wYXJhbWV0ZXJzLnZpcnR1YWxTdHJlYW0gLSBUaGUgdmlydHVhbCBzdHJlYW0uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmtlZXBCYWNrZ3JvdW5kIC0gSW5kaWNhdGVzIGlmIGJhY2tncm91bmQgc2hvdWxkIGJlIGtlcHQuXG4gICAqIEBwYXJhbSB7U3RyZWFtfSBvcHRpb25zLnBhcmFtZXRlcnMuYW5ub3RhdGVTY3JlZW5TdHJlYW0gLSBUaGUgYW5ub3RhdGUgc2NyZWVuIHN0cmVhbS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU1haW5TY3JlZW5QZXJzb24gLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1haW4gc2NyZWVuIHBlcnNvbi5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU1haW5TY3JlZW5GaWxsZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgaWYgdGhlIG1haW4gc2NyZWVuIGlzIGZpbGxlZC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUFkbWluT25NYWluU2NyZWVuIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGlmIGFkbWluIGlzIG9uIHRoZSBtYWluIHNjcmVlbi5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU1haW5IZWlnaHRXaWR0aCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWFpbiBoZWlnaHQgYW5kIHdpZHRoLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlU2NyZWVuRm9yY2VGdWxsRGlzcGxheSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBzY3JlZW4gZm9yY2UgZnVsbCBkaXNwbGF5LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlVXBkYXRlTWFpbldpbmRvdyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWFpbiB3aW5kb3cgdXBkYXRlIHN0YXR1cy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU1haW5HcmlkU3RyZWFtIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBtYWluIGdyaWQgc3RyZWFtLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx7IGNvbXBvbmVudDogYW55LCBpbnB1dHM6IGFueSB9W10gfCB2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY29tcG9uZW50cyBhbmQgaW5wdXRzIG9yIHZvaWQuXG4gICAqL1xuICBwcmVwb3B1bGF0ZVVzZXJNZWRpYSA9IGFzeW5jICh7XG4gICAgbmFtZSxcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBQcmVwb3B1bGF0ZVVzZXJNZWRpYU9wdGlvbnMpOiBQcm9taXNlPHsgY29tcG9uZW50OiBhbnk7IGlucHV0czogYW55IH1bXSB8IHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgLy8gRGVzdHJ1Y3R1cmUgcGFyYW1ldGVyc1xuXG4gICAgICBsZXQgeyBnZXRVcGRhdGVkQWxsUGFyYW1zIH0gPSBwYXJhbWV0ZXJzO1xuICAgICAgcGFyYW1ldGVycyA9IGdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcblxuICAgICAgbGV0IHtcbiAgICAgICAgcGFydGljaXBhbnRzLFxuICAgICAgICBhbGxWaWRlb1N0cmVhbXMsXG4gICAgICAgIGlzbGV2ZWwsXG4gICAgICAgIG1lbWJlcixcbiAgICAgICAgc2hhcmVkLFxuICAgICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgICAgIGV2ZW50VHlwZSxcbiAgICAgICAgc2NyZWVuSWQsXG4gICAgICAgIGZvcmNlRnVsbERpc3BsYXksXG4gICAgICAgIHVwZGF0ZU1haW5XaW5kb3csXG4gICAgICAgIG1haW5TY3JlZW5GaWxsZWQsXG4gICAgICAgIGFkbWluT25NYWluU2NyZWVuLFxuICAgICAgICBtYWluU2NyZWVuUGVyc29uLFxuICAgICAgICB2aWRlb0FscmVhZHlPbixcbiAgICAgICAgYXVkaW9BbHJlYWR5T24sXG4gICAgICAgIG9sZEFsbFN0cmVhbXMsXG4gICAgICAgIGNoZWNrT3JpZW50YXRpb24sXG4gICAgICAgIHNjcmVlbkZvcmNlRnVsbERpc3BsYXksXG5cbiAgICAgICAgbG9jYWxTdHJlYW1TY3JlZW4sXG4gICAgICAgIHJlbW90ZVNjcmVlblN0cmVhbSxcbiAgICAgICAgbG9jYWxTdHJlYW1WaWRlbyxcbiAgICAgICAgbWFpbkhlaWdodFdpZHRoLFxuICAgICAgICBpc1dpZGVTY3JlZW4sXG4gICAgICAgIGxvY2FsVUlNb2RlLFxuICAgICAgICB3aGl0ZWJvYXJkU3RhcnRlZCxcbiAgICAgICAgd2hpdGVib2FyZEVuZGVkLFxuXG4gICAgICAgIHZpcnR1YWxTdHJlYW0sXG4gICAgICAgIGtlZXBCYWNrZ3JvdW5kLFxuICAgICAgICBhbm5vdGF0ZVNjcmVlblN0cmVhbSxcblxuICAgICAgICB1cGRhdGVNYWluU2NyZWVuUGVyc29uLFxuICAgICAgICB1cGRhdGVNYWluU2NyZWVuRmlsbGVkLFxuICAgICAgICB1cGRhdGVBZG1pbk9uTWFpblNjcmVlbixcbiAgICAgICAgdXBkYXRlTWFpbkhlaWdodFdpZHRoLFxuICAgICAgICB1cGRhdGVTY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5LFxuICAgICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93LFxuICAgICAgICB1cGRhdGVNYWluR3JpZFN0cmVhbSxcbiAgICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgICAvLyBJZiB0aGUgZXZlbnQgdHlwZSBpcyAnY2hhdCcsIHJldHVybiBlYXJseVxuICAgICAgaWYgKGV2ZW50VHlwZSA9PSAnY2hhdCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBJbml0aWFsaXplIHZhcmlhYmxlc1xuICAgICAgbGV0IGhvc3Q6IFBhcnRpY2lwYW50IHwgbnVsbDtcbiAgICAgIGxldCBob3N0U3RyZWFtOiBhbnk7XG4gICAgICBsZXQgbmV3Q29tcG9uZW50czogeyBjb21wb25lbnQ6IGFueTsgaW5wdXRzOiBhbnkgfVtdID0gW107XG5cbiAgICAgIC8vIENoZWNrIGlmIHNjcmVlbiBzaGFyaW5nIGlzIHN0YXJ0ZWQgb3Igc2hhcmVkXG4gICAgICBpZiAoc2hhcmVTY3JlZW5TdGFydGVkIHx8IHNoYXJlZCkge1xuICAgICAgICAvLyBIYW5kbGUgbWFpbiBncmlkIHZpc2liaWxpdHkgYmFzZWQgb24gdGhlIGV2ZW50IHR5cGVcbiAgICAgICAgaWYgKGV2ZW50VHlwZSA9PSAnY29uZmVyZW5jZScpIHtcbiAgICAgICAgICBpZiAoc2hhcmVkIHx8IHNoYXJlU2NyZWVuU3RhcnRlZCkge1xuICAgICAgICAgICAgaWYgKG1haW5IZWlnaHRXaWR0aCA9PSAwKSB7XG4gICAgICAgICAgICAgIC8vIEFkZCB0aGUgbWFpbiBncmlkIGlmIG5vdCBwcmVzZW50XG4gICAgICAgICAgICAgIHVwZGF0ZU1haW5IZWlnaHRXaWR0aCg4NCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgbWFpbiBncmlkIGlmIG5vdCBzaGFyZWQgb3Igc3RhcnRlZFxuICAgICAgICAgICAgdXBkYXRlTWFpbkhlaWdodFdpZHRoKDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN3aXRjaCBkaXNwbGF5IHRvIG9wdGltaXplIGZvciBzY3JlZW4gc2hhcmVcbiAgICAgICAgc2NyZWVuRm9yY2VGdWxsRGlzcGxheSA9IGZvcmNlRnVsbERpc3BsYXk7XG5cbiAgICAgICAgdXBkYXRlU2NyZWVuRm9yY2VGdWxsRGlzcGxheShzY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5KTtcblxuICAgICAgICAvLyBHZXQgdGhlIG9yaWVudGF0aW9uIGFuZCBhZGp1c3QgZm9yY2VGdWxsRGlzcGxheVxuICAgICAgICBsZXQgb3JpZW50YXRpb24gPSBjaGVja09yaWVudGF0aW9uKCk7XG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PSAncG9ydHJhaXQnIHx8ICFpc1dpZGVTY3JlZW4pIHtcbiAgICAgICAgICBpZiAoc2hhcmVTY3JlZW5TdGFydGVkIHx8IHNoYXJlZCkge1xuICAgICAgICAgICAgc2NyZWVuRm9yY2VGdWxsRGlzcGxheSA9IGZhbHNlO1xuICAgICAgICAgICAgdXBkYXRlU2NyZWVuRm9yY2VGdWxsRGlzcGxheShzY3JlZW5Gb3JjZUZ1bGxEaXNwbGF5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgdXNlciBpcyBzaGFyaW5nIHRoZSBzY3JlZW5cbiAgICAgICAgaWYgKHNoYXJlZCkge1xuICAgICAgICAgIC8vIFVzZXIgaXMgc2hhcmluZ1xuICAgICAgICAgIGhvc3QgPSB7IG5hbWU6IG1lbWJlciwgYXVkaW9JRDogJycsIHZpZGVvSUQ6ICcnIH07XG4gICAgICAgICAgaG9zdFN0cmVhbSA9IGxvY2FsU3RyZWFtU2NyZWVuO1xuXG4gICAgICAgICAgLy8gVXBkYXRlIGFkbWluIG9uIHRoZSBtYWluIHNjcmVlblxuICAgICAgICAgIGFkbWluT25NYWluU2NyZWVuID0gaXNsZXZlbCA9PSAnMic7XG4gICAgICAgICAgdXBkYXRlQWRtaW5Pbk1haW5TY3JlZW4oYWRtaW5Pbk1haW5TY3JlZW4pO1xuXG4gICAgICAgICAgLy8gVXBkYXRlIG1haW4gc2NyZWVuIHBlcnNvblxuICAgICAgICAgIG1haW5TY3JlZW5QZXJzb24gPSBob3N0Lm5hbWUgfHwgJyc7XG4gICAgICAgICAgdXBkYXRlTWFpblNjcmVlblBlcnNvbihtYWluU2NyZWVuUGVyc29uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvL3NvbWVvbmUgZWxzZSBpcyBzaGFyaW5nXG4gICAgICAgICAgaG9zdCA9XG4gICAgICAgICAgICBwYXJ0aWNpcGFudHMuZmluZChcbiAgICAgICAgICAgICAgKHBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudCkgPT5cbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudC5TY3JlZW5JRCA9PSBzY3JlZW5JZCAmJiBwYXJ0aWNpcGFudC5TY3JlZW5PbiA9PSB0cnVlLFxuICAgICAgICAgICAgKSA/PyBudWxsO1xuXG4gICAgICAgICAgaWYgKHdoaXRlYm9hcmRTdGFydGVkICYmICF3aGl0ZWJvYXJkRW5kZWQpIHtcbiAgICAgICAgICAgIGhvc3QgPSB7IG5hbWU6ICdXaGl0ZWJvYXJkQWN0aXZlJywgaXNsZXZlbDogJzInLCBhdWRpb0lEOiAnJywgdmlkZW9JRDogJycgfTtcbiAgICAgICAgICAgIGhvc3RTdHJlYW0gPSB7IHByb2R1Y2VySWQ6ICdXaGl0ZWJvYXJkQWN0aXZlJyB9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChob3N0ID09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIHJlbW90ZVNjcmVlblN0cmVhbVxuICAgICAgICAgICAgaG9zdCA9XG4gICAgICAgICAgICAgIHBhcnRpY2lwYW50cy5maW5kKChwYXJ0aWNpcGFudDogUGFydGljaXBhbnQpID0+IHBhcnRpY2lwYW50LlNjcmVlbk9uID09IHRydWUpID8/IG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gY2hlY2sgcmVtb3RlU2NyZWVuU3RyZWFtXG4gICAgICAgICAgaWYgKGhvc3QgIT0gbnVsbCAmJiAhaG9zdD8ubmFtZT8uaW5jbHVkZXMoJ1doaXRlYm9hcmRBY3RpdmUnKSkge1xuICAgICAgICAgICAgaWYgKHJlbW90ZVNjcmVlblN0cmVhbS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICBob3N0U3RyZWFtID1cbiAgICAgICAgICAgICAgICBhbGxWaWRlb1N0cmVhbXMuZmluZChcbiAgICAgICAgICAgICAgICAgIChzdHJlYW06IFN0cmVhbSB8IFBhcnRpY2lwYW50KSA9PiBzdHJlYW0ucHJvZHVjZXJJZCA9PSBob3N0Py5TY3JlZW5JRCxcbiAgICAgICAgICAgICAgICApID8/IG51bGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBob3N0U3RyZWFtID0gcmVtb3RlU2NyZWVuU3RyZWFtWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFVwZGF0ZSBhZG1pbiBvbiB0aGUgbWFpbiBzY3JlZW5cbiAgICAgICAgICBhZG1pbk9uTWFpblNjcmVlbiA9IChob3N0ICYmIGhvc3QuaXNsZXZlbCA9PSAnMicpID8/IGZhbHNlO1xuICAgICAgICAgIHVwZGF0ZUFkbWluT25NYWluU2NyZWVuKGFkbWluT25NYWluU2NyZWVuKTtcblxuICAgICAgICAgIC8vIFVwZGF0ZSBtYWluIHNjcmVlbiBwZXJzb25cbiAgICAgICAgICBtYWluU2NyZWVuUGVyc29uID0gaG9zdD8ubmFtZSA/PyAnJztcbiAgICAgICAgICB1cGRhdGVNYWluU2NyZWVuUGVyc29uKG1haW5TY3JlZW5QZXJzb24pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBTY3JlZW4gc2hhcmUgbm90IHN0YXJ0ZWRcbiAgICAgICAgaWYgKGV2ZW50VHlwZSA9PSAnY29uZmVyZW5jZScpIHtcbiAgICAgICAgICAvLyBObyBtYWluIGdyaWQgZm9yIGNvbmZlcmVuY2VzXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmluZCB0aGUgaG9zdCB3aXRoIGxldmVsICcyJ1xuICAgICAgICBob3N0ID0gcGFydGljaXBhbnRzLmZpbmQoKHBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudCkgPT4gcGFydGljaXBhbnQuaXNsZXZlbCA9PSAnMicpID8/IG51bGw7XG5cbiAgICAgICAgLy8gVXBkYXRlIG1haW4gc2NyZWVuIHBlcnNvblxuICAgICAgICBtYWluU2NyZWVuUGVyc29uID0gaG9zdD8ubmFtZSA/PyAnJztcbiAgICAgICAgdXBkYXRlTWFpblNjcmVlblBlcnNvbihtYWluU2NyZWVuUGVyc29uKTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgaG9zdCBpcyBub3QgbnVsbCwgY2hlY2sgaWYgaG9zdCB2aWRlb0lzT25cbiAgICAgIGlmIChob3N0KSB7XG4gICAgICAgIC8vIFBvcHVsYXRlIHRoZSBtYWluIHNjcmVlbiB3aXRoIHRoZSBob3N0IHZpZGVvXG4gICAgICAgIGlmIChzaGFyZVNjcmVlblN0YXJ0ZWQgfHwgc2hhcmVkKSB7XG4gICAgICAgICAgZm9yY2VGdWxsRGlzcGxheSA9IHNjcmVlbkZvcmNlRnVsbERpc3BsYXk7XG4gICAgICAgICAgaWYgKHdoaXRlYm9hcmRTdGFydGVkICYmICF3aGl0ZWJvYXJkRW5kZWQpIHtcbiAgICAgICAgICAgIC8vIFdoaXRlYm9hcmQgaXMgYWN0aXZlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0NvbXBvbmVudHMucHVzaCh7XG4gICAgICAgICAgICAgIGNvbXBvbmVudDogVmlkZW9DYXJkLFxuICAgICAgICAgICAgICBpbnB1dHM6IHtcbiAgICAgICAgICAgICAgICB2aWRlb1N0cmVhbTogc2hhcmVkID8gaG9zdFN0cmVhbSA6IGhvc3RTdHJlYW0uc3RyZWFtLFxuICAgICAgICAgICAgICAgIHJlbW90ZVByb2R1Y2VySWQ6IGhvc3QuU2NyZWVuSUQsXG4gICAgICAgICAgICAgICAgZXZlbnRUeXBlLFxuICAgICAgICAgICAgICAgIGZvcmNlRnVsbERpc3BsYXk6IGFubm90YXRlU2NyZWVuU3RyZWFtICYmIHNoYXJlZCA/IGZhbHNlIDogZm9yY2VGdWxsRGlzcGxheSxcbiAgICAgICAgICAgICAgICBjdXN0b21TdHlsZToge1xuICAgICAgICAgICAgICAgICAgYm9yZGVyOiBldmVudFR5cGUgIT09ICdicm9hZGNhc3QnID8gJzJweCBzb2xpZCBibGFjaycgOiAnMHB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiBob3N0LFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknLFxuICAgICAgICAgICAgICAgIHNob3dDb250cm9sczogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd0luZm86IHRydWUsXG4gICAgICAgICAgICAgICAgbmFtZTogaG9zdC5uYW1lLFxuICAgICAgICAgICAgICAgIGRvTWlycm9yOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdXBkYXRlTWFpbkdyaWRTdHJlYW0obmV3Q29tcG9uZW50cyk7XG5cbiAgICAgICAgICBtYWluU2NyZWVuRmlsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB1cGRhdGVNYWluU2NyZWVuRmlsbGVkKG1haW5TY3JlZW5GaWxsZWQpO1xuICAgICAgICAgIGFkbWluT25NYWluU2NyZWVuID0gaG9zdC5pc2xldmVsID09ICcyJztcbiAgICAgICAgICB1cGRhdGVBZG1pbk9uTWFpblNjcmVlbihhZG1pbk9uTWFpblNjcmVlbik7XG4gICAgICAgICAgbWFpblNjcmVlblBlcnNvbiA9IGhvc3QubmFtZSA/PyAnJztcbiAgICAgICAgICB1cGRhdGVNYWluU2NyZWVuUGVyc29uKG1haW5TY3JlZW5QZXJzb24pO1xuXG4gICAgICAgICAgcmV0dXJuIG5ld0NvbXBvbmVudHM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBpZiB2aWRlbyBpcyBhbHJlYWR5IG9uIG9yIG5vdFxuICAgICAgICBpZiAoXG4gICAgICAgICAgKGlzbGV2ZWwgIT0gJzInICYmICFob3N0Wyd2aWRlb09uJ10pIHx8XG4gICAgICAgICAgKGlzbGV2ZWwgPT0gJzInICYmICghaG9zdFsndmlkZW9PbiddIHx8ICF2aWRlb0FscmVhZHlPbikpIHx8XG4gICAgICAgICAgbG9jYWxVSU1vZGUgPT0gdHJ1ZVxuICAgICAgICApIHtcbiAgICAgICAgICAvLyBWaWRlbyBpcyBvZmZcbiAgICAgICAgICBpZiAoaXNsZXZlbCA9PSAnMicgJiYgdmlkZW9BbHJlYWR5T24pIHtcbiAgICAgICAgICAgIC8vIEFkbWluJ3MgdmlkZW8gaXMgb25cbiAgICAgICAgICAgIG5ld0NvbXBvbmVudHMucHVzaCh7XG4gICAgICAgICAgICAgIGNvbXBvbmVudDogVmlkZW9DYXJkLFxuICAgICAgICAgICAgICBpbnB1dHM6IHtcbiAgICAgICAgICAgICAgICB2aWRlb1N0cmVhbToga2VlcEJhY2tncm91bmQgJiYgdmlydHVhbFN0cmVhbSA/IHZpcnR1YWxTdHJlYW0gOiBsb2NhbFN0cmVhbVZpZGVvLFxuICAgICAgICAgICAgICAgIHJlbW90ZVByb2R1Y2VySWQ6IGhvc3QudmlkZW9JRCxcbiAgICAgICAgICAgICAgICBldmVudFR5cGUsXG4gICAgICAgICAgICAgICAgZm9yY2VGdWxsRGlzcGxheSxcbiAgICAgICAgICAgICAgICBjdXN0b21TdHlsZToge1xuICAgICAgICAgICAgICAgICAgYm9yZGVyOiBldmVudFR5cGUgIT09ICdicm9hZGNhc3QnID8gJzJweCBzb2xpZCBibGFjaycgOiAnMHB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiBob3N0LFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMjE3LCAyMjcsIDIzNCwgMC45OSknLFxuICAgICAgICAgICAgICAgIHNob3dDb250cm9sczogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd0luZm86IHRydWUsXG4gICAgICAgICAgICAgICAgbmFtZTogaG9zdC5uYW1lLFxuICAgICAgICAgICAgICAgIGRvTWlycm9yOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHVwZGF0ZU1haW5HcmlkU3RyZWFtKG5ld0NvbXBvbmVudHMpO1xuXG4gICAgICAgICAgICBtYWluU2NyZWVuRmlsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHVwZGF0ZU1haW5TY3JlZW5GaWxsZWQobWFpblNjcmVlbkZpbGxlZCk7XG4gICAgICAgICAgICBhZG1pbk9uTWFpblNjcmVlbiA9IHRydWU7XG4gICAgICAgICAgICB1cGRhdGVBZG1pbk9uTWFpblNjcmVlbihhZG1pbk9uTWFpblNjcmVlbik7XG4gICAgICAgICAgICBtYWluU2NyZWVuUGVyc29uID0gaG9zdC5uYW1lID8/ICcnO1xuICAgICAgICAgICAgdXBkYXRlTWFpblNjcmVlblBlcnNvbihtYWluU2NyZWVuUGVyc29uKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVmlkZW8gaXMgb2ZmIGFuZCBub3QgYWRtaW5cbiAgICAgICAgICAgIGxldCBhdWRPbjtcblxuICAgICAgICAgICAgaWYgKGlzbGV2ZWwgPT0gJzInICYmIGF1ZGlvQWxyZWFkeU9uKSB7XG4gICAgICAgICAgICAgIGF1ZE9uID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChob3N0ICE9IG51bGwgJiYgaXNsZXZlbCAhPSAnMicpIHtcbiAgICAgICAgICAgICAgICBhdWRPbiA9IGhvc3RbJ211dGVkJ10gPT0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGF1ZE9uKSB7XG4gICAgICAgICAgICAgIC8vIEF1ZGlvIGlzIG9uXG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbmV3Q29tcG9uZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogQXVkaW9DYXJkLFxuICAgICAgICAgICAgICAgICAgaW5wdXRzOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGhvc3QubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgYmFyQ29sb3I6ICdyZWQnLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogZXZlbnRUeXBlICE9PSAnYnJvYWRjYXN0JyA/ICcycHggc29saWQgYmxhY2snIDogJzBweCBzb2xpZCBibGFjaycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzUG9zaXRpb246ICd0b3BMZWZ0JyxcbiAgICAgICAgICAgICAgICAgICAgaW5mb1Bvc2l0aW9uOiAndG9wUmlnaHQnLFxuICAgICAgICAgICAgICAgICAgICBzaG93V2F2ZWZvcm06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHJvdW5kZWRJbWFnZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyczogcGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NvbnRyb2xzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHVwZGF0ZU1haW5HcmlkU3RyZWFtKG5ld0NvbXBvbmVudHMpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBhdWRpbyBjYXJkIGNyZWF0aW9uIGVycm9yXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBtYWluU2NyZWVuRmlsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdXBkYXRlTWFpblNjcmVlbkZpbGxlZChtYWluU2NyZWVuRmlsbGVkKTtcbiAgICAgICAgICAgICAgYWRtaW5Pbk1haW5TY3JlZW4gPSBpc2xldmVsID09ICcyJztcbiAgICAgICAgICAgICAgdXBkYXRlQWRtaW5Pbk1haW5TY3JlZW4oYWRtaW5Pbk1haW5TY3JlZW4pO1xuICAgICAgICAgICAgICBtYWluU2NyZWVuUGVyc29uID0gaG9zdC5uYW1lID8/ICcnO1xuICAgICAgICAgICAgICB1cGRhdGVNYWluU2NyZWVuUGVyc29uKG1haW5TY3JlZW5QZXJzb24pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gQXVkaW8gaXMgb2ZmXG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbmV3Q29tcG9uZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogTWluaUNhcmQsXG4gICAgICAgICAgICAgICAgICBpbnB1dHM6IHtcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbHM6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAyMCxcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tU3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBldmVudFR5cGUgIT09ICdicm9hZGNhc3QnID8gJzJweCBzb2xpZCBibGFjaycgOiAnMHB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdXBkYXRlTWFpbkdyaWRTdHJlYW0obmV3Q29tcG9uZW50cyk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIG1pbmkgY2FyZCBjcmVhdGlvbiBlcnJvclxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgbWFpblNjcmVlbkZpbGxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICB1cGRhdGVNYWluU2NyZWVuRmlsbGVkKG1haW5TY3JlZW5GaWxsZWQpO1xuICAgICAgICAgICAgICBhZG1pbk9uTWFpblNjcmVlbiA9IGlzbGV2ZWwgPT0gJzInO1xuICAgICAgICAgICAgICB1cGRhdGVBZG1pbk9uTWFpblNjcmVlbihhZG1pbk9uTWFpblNjcmVlbik7XG4gICAgICAgICAgICAgIG1haW5TY3JlZW5QZXJzb24gPSBob3N0Lm5hbWUgPz8gJyc7XG4gICAgICAgICAgICAgIHVwZGF0ZU1haW5TY3JlZW5QZXJzb24obWFpblNjcmVlblBlcnNvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFZpZGVvIGlzIG9uXG4gICAgICAgICAgaWYgKHNoYXJlU2NyZWVuU3RhcnRlZCB8fCBzaGFyZWQpIHtcbiAgICAgICAgICAgIC8vIFNjcmVlbiBzaGFyZSBpcyBvblxuICAgICAgICAgICAgaWYgKHdoaXRlYm9hcmRTdGFydGVkICYmICF3aGl0ZWJvYXJkRW5kZWQpIHtcbiAgICAgICAgICAgICAgLy8gV2hpdGVib2FyZCBpcyBhY3RpdmVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbmV3Q29tcG9uZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogVmlkZW9DYXJkLFxuICAgICAgICAgICAgICAgICAgaW5wdXRzOiB7XG4gICAgICAgICAgICAgICAgICAgIHZpZGVvU3RyZWFtOiBzaGFyZWQgPyBob3N0U3RyZWFtIDogaG9zdFN0cmVhbS5zdHJlYW0sXG4gICAgICAgICAgICAgICAgICAgIHJlbW90ZVByb2R1Y2VySWQ6IGhvc3QuU2NyZWVuSUQsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50VHlwZSxcbiAgICAgICAgICAgICAgICAgICAgZm9yY2VGdWxsRGlzcGxheSxcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tU3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IGV2ZW50VHlwZSAhPT0gJ2Jyb2FkY2FzdCcgPyAnMnB4IHNvbGlkIGJsYWNrJyA6ICcwcHggc29saWQgYmxhY2snLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudDogaG9zdCxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgyMTcsIDIyNywgMjM0LCAwLjk5KScsXG4gICAgICAgICAgICAgICAgICAgIHNob3dDb250cm9sczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHNob3dJbmZvOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBob3N0Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGRvTWlycm9yOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB1cGRhdGVNYWluR3JpZFN0cmVhbShuZXdDb21wb25lbnRzKTtcblxuICAgICAgICAgICAgICAgIG1haW5TY3JlZW5GaWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHVwZGF0ZU1haW5TY3JlZW5GaWxsZWQobWFpblNjcmVlbkZpbGxlZCk7XG4gICAgICAgICAgICAgICAgYWRtaW5Pbk1haW5TY3JlZW4gPSBob3N0LmlzbGV2ZWwgPT0gJzInO1xuICAgICAgICAgICAgICAgIHVwZGF0ZUFkbWluT25NYWluU2NyZWVuKGFkbWluT25NYWluU2NyZWVuKTtcbiAgICAgICAgICAgICAgICBtYWluU2NyZWVuUGVyc29uID0gaG9zdC5uYW1lID8/ICcnO1xuICAgICAgICAgICAgICAgIHVwZGF0ZU1haW5TY3JlZW5QZXJzb24obWFpblNjcmVlblBlcnNvbik7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIHZpZGVvIGNhcmQgY3JlYXRpb24gZXJyb3JcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBTY3JlZW4gc2hhcmUgaXMgb2ZmXG4gICAgICAgICAgICBsZXQgc3RyZWFtZTtcbiAgICAgICAgICAgIGlmIChpc2xldmVsID09ICcyJykge1xuICAgICAgICAgICAgICBob3N0WydzdHJlYW0nXSA9IGtlZXBCYWNrZ3JvdW5kICYmIHZpcnR1YWxTdHJlYW0gPyB2aXJ0dWFsU3RyZWFtIDogbG9jYWxTdHJlYW1WaWRlbztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHN0cmVhbWUgPSBvbGRBbGxTdHJlYW1zLmZpbmQoXG4gICAgICAgICAgICAgICAgKHN0cmVhbWU6IFN0cmVhbSB8IFBhcnRpY2lwYW50KSA9PiBzdHJlYW1lLnByb2R1Y2VySWQgPT0gaG9zdC52aWRlb0lELFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBob3N0WydzdHJlYW0nXSA9IHN0cmVhbWUgJiYgc3RyZWFtZS5zdHJlYW07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGlmIChob3N0WydzdHJlYW0nXSkge1xuICAgICAgICAgICAgICAgIG5ld0NvbXBvbmVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBjb21wb25lbnQ6IFZpZGVvQ2FyZCxcbiAgICAgICAgICAgICAgICAgIGlucHV0czoge1xuICAgICAgICAgICAgICAgICAgICB2aWRlb1N0cmVhbTogaG9zdFsnc3RyZWFtJ10sXG4gICAgICAgICAgICAgICAgICAgIHJlbW90ZVByb2R1Y2VySWQ6IGhvc3QudmlkZW9JRCxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRUeXBlLFxuICAgICAgICAgICAgICAgICAgICBmb3JjZUZ1bGxEaXNwbGF5LFxuICAgICAgICAgICAgICAgICAgICBjdXN0b21TdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogZXZlbnRUeXBlICE9PSAnYnJvYWRjYXN0JyA/ICcycHggc29saWQgYmxhY2snIDogJzBweCBzb2xpZCBibGFjaycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiBob3N0LFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDIxNywgMjI3LCAyMzQsIDAuOTkpJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NvbnRyb2xzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgc2hvd0luZm86IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGhvc3QubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZG9NaXJyb3I6IG1lbWJlciA9PSBob3N0Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdXBkYXRlTWFpbkdyaWRTdHJlYW0obmV3Q29tcG9uZW50cyk7XG5cbiAgICAgICAgICAgICAgICBtYWluU2NyZWVuRmlsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhZG1pbk9uTWFpblNjcmVlbiA9IGhvc3QuaXNsZXZlbCA9PSAnMic7XG4gICAgICAgICAgICAgICAgbWFpblNjcmVlblBlcnNvbiA9IGhvc3QubmFtZSA/PyAnJztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdDb21wb25lbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBNaW5pQ2FyZCxcbiAgICAgICAgICAgICAgICAgIGlucHV0czoge1xuICAgICAgICAgICAgICAgICAgICBpbml0aWFsczogbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDIwLFxuICAgICAgICAgICAgICAgICAgICBjdXN0b21TdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IGV2ZW50VHlwZSAhPT0gJ2Jyb2FkY2FzdCcgPyAnMnB4IHNvbGlkIGJsYWNrJyA6ICcwcHggc29saWQgYmxhY2snLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHVwZGF0ZU1haW5HcmlkU3RyZWFtKG5ld0NvbXBvbmVudHMpO1xuICAgICAgICAgICAgICAgIG1haW5TY3JlZW5GaWxsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBhZG1pbk9uTWFpblNjcmVlbiA9IGlzbGV2ZWwgPT0gJzInO1xuICAgICAgICAgICAgICAgIG1haW5TY3JlZW5QZXJzb24gPSBob3N0Lm5hbWUgPz8gJyc7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB1cGRhdGVNYWluU2NyZWVuRmlsbGVkKG1haW5TY3JlZW5GaWxsZWQpO1xuXG4gICAgICAgICAgICAgIHVwZGF0ZUFkbWluT25NYWluU2NyZWVuKGFkbWluT25NYWluU2NyZWVuKTtcblxuICAgICAgICAgICAgICB1cGRhdGVNYWluU2NyZWVuUGVyc29uKG1haW5TY3JlZW5QZXJzb24pO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgLy8gSGFuZGxlIHZpZGVvIGNhcmQgY3JlYXRpb24gZXJyb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEhvc3QgaXMgbnVsbCwgYWRkIGEgbWluaSBjYXJkXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbmV3Q29tcG9uZW50cy5wdXNoKHtcbiAgICAgICAgICAgIGNvbXBvbmVudDogTWluaUNhcmQsXG4gICAgICAgICAgICBpbnB1dHM6IHtcbiAgICAgICAgICAgICAgaW5pdGlhbHM6IG5hbWUsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiAyMCxcbiAgICAgICAgICAgICAgY3VzdG9tU3R5bGU6IHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgYm9yZGVyOiBldmVudFR5cGUgIT09ICdicm9hZGNhc3QnID8gJzJweCBzb2xpZCBibGFjaycgOiAnMHB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB1cGRhdGVNYWluR3JpZFN0cmVhbShuZXdDb21wb25lbnRzKTtcblxuICAgICAgICAgIG1haW5TY3JlZW5GaWxsZWQgPSBmYWxzZTtcbiAgICAgICAgICBhZG1pbk9uTWFpblNjcmVlbiA9IGZhbHNlO1xuICAgICAgICAgIG1haW5TY3JlZW5QZXJzb24gPSAnJztcbiAgICAgICAgICB1cGRhdGVNYWluU2NyZWVuRmlsbGVkKG1haW5TY3JlZW5GaWxsZWQpO1xuICAgICAgICAgIHVwZGF0ZUFkbWluT25NYWluU2NyZWVuKGFkbWluT25NYWluU2NyZWVuKTtcbiAgICAgICAgICB1cGRhdGVNYWluU2NyZWVuUGVyc29uKG1haW5TY3JlZW5QZXJzb24pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIC8vIEhhbmRsZSBtaW5pIGNhcmQgY3JlYXRpb24gZXJyb3JcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB1cGRhdGVNYWluV2luZG93ID0gZmFsc2U7XG4gICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93KHVwZGF0ZU1haW5XaW5kb3cpO1xuXG4gICAgICByZXR1cm4gbmV3Q29tcG9uZW50cztcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAvLyBIYW5kbGUgZXJyb3JzIGR1cmluZyB0aGUgcHJvY2VzcyBvZiBwcmVwYXJpbmcgYW5kIHBvcHVsYXRpbmcgdGhlIG1haW4gc2NyZWVuXG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgcHJlcGFyaW5nIGFuZCBwb3B1bGF0aW5nIHRoZSBtYWluIHNjcmVlbjonLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH07XG59XG4iXX0=