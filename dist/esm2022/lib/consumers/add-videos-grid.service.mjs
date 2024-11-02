import { Injectable } from '@angular/core';
import { MiniCard } from '../components/display-components/mini-card/mini-card.component';
import { VideoCard } from '../components/display-components/video-card/video-card.component';
import { AudioCard } from '../components/display-components/audio-card/audio-card.component';
import * as i0 from "@angular/core";
/**
 * @service AddVideosGrid
 * @description Service to manage and update video and audio components on a grid in the user interface. This service helps organize and configure participants and streams into different grid layouts.
 *
 * @method addVideosGrid
 * Adds video and audio cards to the main and alternate grids based on the parameters and configuration options provided.
 *
 * @param {AddVideosGridOptions} options - Configuration options for setting up the grid.
 * @param {(Stream | Participant)[]} options.mainGridStreams - Streams or participants to display on the main grid.
 * @param {(Stream | Participant)[]} options.altGridStreams - Streams or participants to display on the alternate grid.
 * @param {number} options.numtoadd - The number of items to add to the grid.
 * @param {number} options.numRows - The number of rows for the main grid.
 * @param {number} options.numCols - The number of columns for the main grid.
 * @param {number} options.actualRows - The actual rows currently displayed.
 * @param {number} options.lastrowcols - The number of columns in the last row of the grid.
 * @param {boolean} options.removeAltGrid - Whether to remove the alternate grid layout.
 * @param {AddVideosGridParameters} options.parameters - Additional parameters for updating the grid, controlling appearance, and handling events.
 *
 * @returns {Promise<void>} A promise that resolves once the grid layout is updated.
 *
 * @example
 * ```typescript
 * await addVideosGridService.addVideosGrid({
 *   mainGridStreams: [...],
 *   altGridStreams: [...],
 *   numtoadd: 4,
 *   numRows: 2,
 *   numCols: 2,
 *   actualRows: 2,
 *   lastrowcols: 2,
 *   removeAltGrid: false,
 *   parameters: {
 *     eventType: 'webinar',
 *     updateAddAltGrid: (value) => {},
 *     ref_participants: participantsList,
 *     islevel: '1',
 *     videoAlreadyOn: true,
 *     localStreamVideo: localStream,
 *     keepBackground: true,
 *     virtualStream: virtualStream,
 *     forceFullDisplay: false,
 *     otherGridStreams: otherStreamsArray,
 *     updateOtherGridStreams: (newStreams) => {},
 *     updateMiniCardsGrid: (params) => {},
 *     getUpdatedAllParams: () => ({ /* updated parameters * / }),
 *   },
 * });
 * ```
 */
export class AddVideosGrid {
    addVideosGrid = async ({ mainGridStreams, altGridStreams, numtoadd, numRows, numCols, actualRows, lastrowcols, removeAltGrid, parameters, }) => {
        let { getUpdatedAllParams } = parameters;
        parameters = { ...parameters, ...getUpdatedAllParams() };
        let { eventType, updateAddAltGrid, ref_participants, islevel, videoAlreadyOn, localStreamVideo, keepBackground, virtualStream, forceFullDisplay, otherGridStreams, updateOtherGridStreams, updateMiniCardsGrid, } = parameters;
        let newComponents = [[], []];
        let participant;
        let remoteProducerId = '';
        let participant_ = null;
        numtoadd = mainGridStreams.length;
        if (removeAltGrid) {
            updateAddAltGrid(false);
        }
        // Add participants to the main grid
        for (let i = 0; i < numtoadd; i++) {
            participant = mainGridStreams[i];
            remoteProducerId = participant.producerId;
            let pseudoName = !remoteProducerId || remoteProducerId === '';
            if (pseudoName) {
                participant_ = participant;
                remoteProducerId = await participant.name;
                if (Object.prototype.hasOwnProperty.call(participant, 'audioID') &&
                    participant.audioID != null &&
                    participant.audioID !== '') {
                    newComponents[0].push({
                        component: AudioCard,
                        inputs: {
                            name: participant.name,
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
                            parameters,
                            backgroundColor: 'transparent',
                            showControls: eventType !== 'chat',
                            participant,
                        },
                    });
                }
                else {
                    newComponents[0].push({
                        component: MiniCard,
                        inputs: {
                            initials: participant.name,
                            fontSize: 20,
                            customStyle: {
                                backgroundColor: 'transparent',
                                border: eventType !== 'broadcast' ? '2px solid black' : '0px solid black',
                            },
                        },
                    });
                }
            }
            else {
                if (remoteProducerId === 'youyou' || remoteProducerId === 'youyouyou') {
                    let name = 'You';
                    if (islevel === '2' && eventType !== 'chat') {
                        name = 'You (Host)';
                    }
                    if (!videoAlreadyOn) {
                        name = 'You';
                        if (islevel == '2' && eventType != 'chat') {
                            name = 'You (Host)';
                        }
                        newComponents[0].push({
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
                    }
                    else {
                        participant = {
                            id: 'youyouyou',
                            stream: keepBackground && virtualStream ? virtualStream : localStreamVideo,
                            name: 'youyouyou',
                            muted: true,
                        };
                        participant_ = {
                            id: 'youyou',
                            videoID: 'youyou',
                            name: 'youyouyou',
                            stream: keepBackground && virtualStream ? virtualStream : localStreamVideo,
                        };
                        remoteProducerId = 'youyouyou';
                        newComponents[0].push({
                            component: VideoCard,
                            inputs: {
                                videoStream: participant.stream ? participant.stream : null,
                                remoteProducerId: participant.stream ? participant.stream.id : null,
                                eventType,
                                forceFullDisplay: eventType == 'webinar' ? false : forceFullDisplay,
                                customStyle: {
                                    border: eventType !== 'broadcast' ? '2px solid black' : '0px solid black',
                                },
                                participant: participant,
                                backgroundColor: 'transparent',
                                showControls: false,
                                showInfo: false,
                                name: participant.name,
                                doMirror: true,
                                parameters,
                            },
                        });
                    }
                }
                else {
                    participant_ = ref_participants.find((obj) => obj.videoID === remoteProducerId);
                    if (participant_) {
                        newComponents[0].push({
                            component: VideoCard,
                            inputs: {
                                videoStream: participant.stream ? participant.stream : null,
                                remoteProducerId,
                                eventType,
                                forceFullDisplay,
                                customStyle: {
                                    border: eventType !== 'broadcast' ? '2px solid black' : '0px solid black',
                                },
                                participant: participant_,
                                backgroundColor: 'transparent',
                                showControls: eventType !== 'chat',
                                showInfo: true,
                                name: participant_.name,
                                doMirror: false,
                                parameters,
                            },
                        });
                    }
                }
            }
            if (i === numtoadd - 1) {
                otherGridStreams[0] = newComponents[0];
                await updateMiniCardsGrid({
                    rows: numRows,
                    cols: numCols,
                    defal: true,
                    actualRows: actualRows,
                    parameters,
                });
                updateOtherGridStreams(otherGridStreams);
                await updateMiniCardsGrid({
                    rows: numRows,
                    cols: numCols,
                    defal: true,
                    actualRows,
                    parameters,
                });
            }
        }
        // Handle the alternate grid streams
        if (!removeAltGrid) {
            for (let i = 0; i < altGridStreams.length; i++) {
                participant = altGridStreams[i];
                remoteProducerId = participant.producerId;
                let participant_;
                let pseudoName = false;
                //check if there is .name in the participant object and if it is null
                if (Object.prototype.hasOwnProperty.call(participant, 'producerId') &&
                    participant.producerId != null &&
                    participant.producerId !== '') {
                    //actual video
                    pseudoName = false;
                }
                else {
                    pseudoName = true;
                }
                if (pseudoName) {
                    participant_ = participant;
                    remoteProducerId = await participant.name;
                    if (Object.prototype.hasOwnProperty.call(participant, 'audioID') &&
                        participant.audioID != null &&
                        participant.audioID !== '') {
                        newComponents[1].push({
                            component: AudioCard,
                            inputs: {
                                name: participant.name,
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
                                parameters,
                                backgroundColor: 'transparent',
                                showControls: eventType !== 'chat',
                                participant,
                            },
                        });
                    }
                    else {
                        newComponents[1].push({
                            component: MiniCard,
                            inputs: {
                                initials: participant.name,
                                fontSize: 20,
                                customStyle: {
                                    backgroundColor: 'transparent',
                                    border: eventType !== 'broadcast' ? '2px solid black' : '0px solid black',
                                },
                            },
                        });
                    }
                }
                else {
                    participant_ = ref_participants.find((obj) => obj.videoID === remoteProducerId);
                    newComponents[1].push({
                        component: VideoCard,
                        inputs: {
                            videoStream: participant_ && participant_['stream'] ? participant_['stream'] : null,
                            remoteProducerId,
                            eventType,
                            forceFullDisplay,
                            customStyle: {
                                border: eventType !== 'broadcast' ? '2px solid black' : '0px solid black',
                            },
                            participant: participant_,
                            backgroundColor: 'transparent',
                            showControls: eventType !== 'chat',
                            showInfo: true,
                            name: participant.name,
                            doMirror: false,
                            parameters,
                        },
                    });
                }
                if (i === numtoadd - 1) {
                    otherGridStreams[1] = newComponents[1];
                    await updateMiniCardsGrid({
                        rows: 1,
                        cols: lastrowcols,
                        defal: false,
                        actualRows,
                        parameters,
                    });
                    updateOtherGridStreams(otherGridStreams);
                    await updateMiniCardsGrid({
                        rows: 1,
                        cols: lastrowcols,
                        defal: false,
                        actualRows,
                        parameters,
                    });
                }
            }
        }
        else {
            updateAddAltGrid(false);
            otherGridStreams[1] = [];
            await updateMiniCardsGrid({
                rows: 0,
                cols: 0,
                defal: false,
                actualRows: actualRows,
                parameters,
            });
            updateOtherGridStreams(otherGridStreams);
            await updateMiniCardsGrid({
                rows: 0,
                cols: 0,
                defal: false,
                actualRows,
                parameters,
            });
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AddVideosGrid, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AddVideosGrid, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AddVideosGrid, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXZpZGVvcy1ncmlkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL2FkZC12aWRlb3MtZ3JpZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdFQUFnRSxDQUFDO0FBQzFGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQztBQUM3RixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sa0VBQWtFLENBQUM7O0FBK0M3Rjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0RHO0FBTUgsTUFBTSxPQUFPLGFBQWE7SUFDeEIsYUFBYSxHQUFHLEtBQUssRUFBRSxFQUNyQixlQUFlLEVBQ2YsY0FBYyxFQUNkLFFBQVEsRUFDUixPQUFPLEVBQ1AsT0FBTyxFQUNQLFVBQVUsRUFDVixXQUFXLEVBQ1gsYUFBYSxFQUNiLFVBQVUsR0FDVyxFQUFpQixFQUFFO1FBQ3hDLElBQUksRUFBRSxtQkFBbUIsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUN6QyxVQUFVLEdBQUcsRUFBRSxHQUFHLFVBQVUsRUFBRSxHQUFHLG1CQUFtQixFQUFFLEVBQUUsQ0FBQztRQUV6RCxJQUFJLEVBQ0YsU0FBUyxFQUNULGdCQUFnQixFQUNoQixnQkFBZ0IsRUFDaEIsT0FBTyxFQUNQLGNBQWMsRUFDZCxnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLHNCQUFzQixFQUN0QixtQkFBbUIsR0FDcEIsR0FBRyxVQUFVLENBQUM7UUFFZixJQUFJLGFBQWEsR0FBd0MsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7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QUh6QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1pbmlDYXJkIH0gZnJvbSAnLi4vY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvbWluaS1jYXJkL21pbmktY2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlkZW9DYXJkIH0gZnJvbSAnLi4vY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvdmlkZW8tY2FyZC92aWRlby1jYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBdWRpb0NhcmQgfSBmcm9tICcuLi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9hdWRpby1jYXJkL2F1ZGlvLWNhcmQuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIFBhcnRpY2lwYW50LFxuICBTdHJlYW0sXG4gIFVwZGF0ZU1pbmlDYXJkc0dyaWRUeXBlLFxuICBVcGRhdGVNaW5pQ2FyZHNHcmlkUGFyYW1ldGVycyxcbiAgQXVkaW9DYXJkUGFyYW1ldGVycyxcbiAgRXZlbnRUeXBlLFxuICBDdXN0b21NZWRpYUNvbXBvbmVudCxcbn0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBBZGRWaWRlb3NHcmlkUGFyYW1ldGVyc1xuICBleHRlbmRzIFVwZGF0ZU1pbmlDYXJkc0dyaWRQYXJhbWV0ZXJzLFxuICAgIEF1ZGlvQ2FyZFBhcmFtZXRlcnMge1xuICBldmVudFR5cGU6IEV2ZW50VHlwZTtcbiAgdXBkYXRlQWRkQWx0R3JpZDogKGFkZEFsdEdyaWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHJlZl9wYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W107XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgdmlkZW9BbHJlYWR5T246IGJvb2xlYW47XG4gIGxvY2FsU3RyZWFtVmlkZW86IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAga2VlcEJhY2tncm91bmQ6IGJvb2xlYW47XG4gIHZpcnR1YWxTdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgZm9yY2VGdWxsRGlzcGxheTogYm9vbGVhbjtcbiAgb3RoZXJHcmlkU3RyZWFtczogQ3VzdG9tTWVkaWFDb21wb25lbnRbXVtdO1xuICB1cGRhdGVPdGhlckdyaWRTdHJlYW1zOiAob3RoZXJHcmlkU3RyZWFtczogQ3VzdG9tTWVkaWFDb21wb25lbnRbXVtdKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICB1cGRhdGVNaW5pQ2FyZHNHcmlkOiBVcGRhdGVNaW5pQ2FyZHNHcmlkVHlwZTtcbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gQWRkVmlkZW9zR3JpZFBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBZGRWaWRlb3NHcmlkT3B0aW9ucyB7XG4gIG1haW5HcmlkU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICBhbHRHcmlkU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICBudW10b2FkZDogbnVtYmVyO1xuICBudW1Sb3dzOiBudW1iZXI7XG4gIG51bUNvbHM6IG51bWJlcjtcbiAgYWN0dWFsUm93czogbnVtYmVyO1xuICBsYXN0cm93Y29sczogbnVtYmVyO1xuICByZW1vdmVBbHRHcmlkOiBib29sZWFuO1xuICBwYXJhbWV0ZXJzOiBBZGRWaWRlb3NHcmlkUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQWRkVmlkZW9zR3JpZFR5cGUgPSAob3B0aW9uczogQWRkVmlkZW9zR3JpZE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogQHNlcnZpY2UgQWRkVmlkZW9zR3JpZFxuICogQGRlc2NyaXB0aW9uIFNlcnZpY2UgdG8gbWFuYWdlIGFuZCB1cGRhdGUgdmlkZW8gYW5kIGF1ZGlvIGNvbXBvbmVudHMgb24gYSBncmlkIGluIHRoZSB1c2VyIGludGVyZmFjZS4gVGhpcyBzZXJ2aWNlIGhlbHBzIG9yZ2FuaXplIGFuZCBjb25maWd1cmUgcGFydGljaXBhbnRzIGFuZCBzdHJlYW1zIGludG8gZGlmZmVyZW50IGdyaWQgbGF5b3V0cy5cbiAqXG4gKiBAbWV0aG9kIGFkZFZpZGVvc0dyaWRcbiAqIEFkZHMgdmlkZW8gYW5kIGF1ZGlvIGNhcmRzIHRvIHRoZSBtYWluIGFuZCBhbHRlcm5hdGUgZ3JpZHMgYmFzZWQgb24gdGhlIHBhcmFtZXRlcnMgYW5kIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBwcm92aWRlZC5cbiAqXG4gKiBAcGFyYW0ge0FkZFZpZGVvc0dyaWRPcHRpb25zfSBvcHRpb25zIC0gQ29uZmlndXJhdGlvbiBvcHRpb25zIGZvciBzZXR0aW5nIHVwIHRoZSBncmlkLlxuICogQHBhcmFtIHsoU3RyZWFtIHwgUGFydGljaXBhbnQpW119IG9wdGlvbnMubWFpbkdyaWRTdHJlYW1zIC0gU3RyZWFtcyBvciBwYXJ0aWNpcGFudHMgdG8gZGlzcGxheSBvbiB0aGUgbWFpbiBncmlkLlxuICogQHBhcmFtIHsoU3RyZWFtIHwgUGFydGljaXBhbnQpW119IG9wdGlvbnMuYWx0R3JpZFN0cmVhbXMgLSBTdHJlYW1zIG9yIHBhcnRpY2lwYW50cyB0byBkaXNwbGF5IG9uIHRoZSBhbHRlcm5hdGUgZ3JpZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLm51bXRvYWRkIC0gVGhlIG51bWJlciBvZiBpdGVtcyB0byBhZGQgdG8gdGhlIGdyaWQuXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5udW1Sb3dzIC0gVGhlIG51bWJlciBvZiByb3dzIGZvciB0aGUgbWFpbiBncmlkLlxuICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMubnVtQ29scyAtIFRoZSBudW1iZXIgb2YgY29sdW1ucyBmb3IgdGhlIG1haW4gZ3JpZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLmFjdHVhbFJvd3MgLSBUaGUgYWN0dWFsIHJvd3MgY3VycmVudGx5IGRpc3BsYXllZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLmxhc3Ryb3djb2xzIC0gVGhlIG51bWJlciBvZiBjb2x1bW5zIGluIHRoZSBsYXN0IHJvdyBvZiB0aGUgZ3JpZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5yZW1vdmVBbHRHcmlkIC0gV2hldGhlciB0byByZW1vdmUgdGhlIGFsdGVybmF0ZSBncmlkIGxheW91dC5cbiAqIEBwYXJhbSB7QWRkVmlkZW9zR3JpZFBhcmFtZXRlcnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIEFkZGl0aW9uYWwgcGFyYW1ldGVycyBmb3IgdXBkYXRpbmcgdGhlIGdyaWQsIGNvbnRyb2xsaW5nIGFwcGVhcmFuY2UsIGFuZCBoYW5kbGluZyBldmVudHMuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIG9uY2UgdGhlIGdyaWQgbGF5b3V0IGlzIHVwZGF0ZWQuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGF3YWl0IGFkZFZpZGVvc0dyaWRTZXJ2aWNlLmFkZFZpZGVvc0dyaWQoe1xuICogICBtYWluR3JpZFN0cmVhbXM6IFsuLi5dLFxuICogICBhbHRHcmlkU3RyZWFtczogWy4uLl0sXG4gKiAgIG51bXRvYWRkOiA0LFxuICogICBudW1Sb3dzOiAyLFxuICogICBudW1Db2xzOiAyLFxuICogICBhY3R1YWxSb3dzOiAyLFxuICogICBsYXN0cm93Y29sczogMixcbiAqICAgcmVtb3ZlQWx0R3JpZDogZmFsc2UsXG4gKiAgIHBhcmFtZXRlcnM6IHtcbiAqICAgICBldmVudFR5cGU6ICd3ZWJpbmFyJyxcbiAqICAgICB1cGRhdGVBZGRBbHRHcmlkOiAodmFsdWUpID0+IHt9LFxuICogICAgIHJlZl9wYXJ0aWNpcGFudHM6IHBhcnRpY2lwYW50c0xpc3QsXG4gKiAgICAgaXNsZXZlbDogJzEnLFxuICogICAgIHZpZGVvQWxyZWFkeU9uOiB0cnVlLFxuICogICAgIGxvY2FsU3RyZWFtVmlkZW86IGxvY2FsU3RyZWFtLFxuICogICAgIGtlZXBCYWNrZ3JvdW5kOiB0cnVlLFxuICogICAgIHZpcnR1YWxTdHJlYW06IHZpcnR1YWxTdHJlYW0sXG4gKiAgICAgZm9yY2VGdWxsRGlzcGxheTogZmFsc2UsXG4gKiAgICAgb3RoZXJHcmlkU3RyZWFtczogb3RoZXJTdHJlYW1zQXJyYXksXG4gKiAgICAgdXBkYXRlT3RoZXJHcmlkU3RyZWFtczogKG5ld1N0cmVhbXMpID0+IHt9LFxuICogICAgIHVwZGF0ZU1pbmlDYXJkc0dyaWQ6IChwYXJhbXMpID0+IHt9LFxuICogICAgIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+ICh7IC8qIHVwZGF0ZWQgcGFyYW1ldGVycyAqIC8gfSksXG4gKiAgIH0sXG4gKiB9KTtcbiAqIGBgYFxuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEFkZFZpZGVvc0dyaWQge1xuICBhZGRWaWRlb3NHcmlkID0gYXN5bmMgKHtcbiAgICBtYWluR3JpZFN0cmVhbXMsXG4gICAgYWx0R3JpZFN0cmVhbXMsXG4gICAgbnVtdG9hZGQsXG4gICAgbnVtUm93cyxcbiAgICBudW1Db2xzLFxuICAgIGFjdHVhbFJvd3MsXG4gICAgbGFzdHJvd2NvbHMsXG4gICAgcmVtb3ZlQWx0R3JpZCxcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBBZGRWaWRlb3NHcmlkT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGxldCB7IGdldFVwZGF0ZWRBbGxQYXJhbXMgfSA9IHBhcmFtZXRlcnM7XG4gICAgcGFyYW1ldGVycyA9IHsgLi4ucGFyYW1ldGVycywgLi4uZ2V0VXBkYXRlZEFsbFBhcmFtcygpIH07XG5cbiAgICBsZXQge1xuICAgICAgZXZlbnRUeXBlLFxuICAgICAgdXBkYXRlQWRkQWx0R3JpZCxcbiAgICAgIHJlZl9wYXJ0aWNpcGFudHMsXG4gICAgICBpc2xldmVsLFxuICAgICAgdmlkZW9BbHJlYWR5T24sXG4gICAgICBsb2NhbFN0cmVhbVZpZGVvLFxuICAgICAga2VlcEJhY2tncm91bmQsXG4gICAgICB2aXJ0dWFsU3RyZWFtLFxuICAgICAgZm9yY2VGdWxsRGlzcGxheSxcbiAgICAgIG90aGVyR3JpZFN0cmVhbXMsXG4gICAgICB1cGRhdGVPdGhlckdyaWRTdHJlYW1zLFxuICAgICAgdXBkYXRlTWluaUNhcmRzR3JpZCxcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIGxldCBuZXdDb21wb25lbnRzOiB7IGNvbXBvbmVudDogYW55OyBpbnB1dHM6IGFueSB9W11bXSA9IFtbXSwgW11dO1xuICAgIGxldCBwYXJ0aWNpcGFudDogYW55O1xuICAgIGxldCByZW1vdGVQcm9kdWNlcklkID0gJyc7XG4gICAgbGV0IHBhcnRpY2lwYW50XyA9IG51bGw7XG5cbiAgICBudW10b2FkZCA9IG1haW5HcmlkU3RyZWFtcy5sZW5ndGg7XG5cbiAgICBpZiAocmVtb3ZlQWx0R3JpZCkge1xuICAgICAgdXBkYXRlQWRkQWx0R3JpZChmYWxzZSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHBhcnRpY2lwYW50cyB0byB0aGUgbWFpbiBncmlkXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW10b2FkZDsgaSsrKSB7XG4gICAgICBwYXJ0aWNpcGFudCA9IG1haW5HcmlkU3RyZWFtc1tpXTtcbiAgICAgIHJlbW90ZVByb2R1Y2VySWQgPSBwYXJ0aWNpcGFudC5wcm9kdWNlcklkO1xuXG4gICAgICBsZXQgcHNldWRvTmFtZSA9ICFyZW1vdGVQcm9kdWNlcklkIHx8IHJlbW90ZVByb2R1Y2VySWQgPT09ICcnO1xuXG4gICAgICBpZiAocHNldWRvTmFtZSkge1xuICAgICAgICBwYXJ0aWNpcGFudF8gPSBwYXJ0aWNpcGFudDtcbiAgICAgICAgcmVtb3RlUHJvZHVjZXJJZCA9IGF3YWl0IHBhcnRpY2lwYW50Lm5hbWU7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChwYXJ0aWNpcGFudCwgJ2F1ZGlvSUQnKSAmJlxuICAgICAgICAgIHBhcnRpY2lwYW50LmF1ZGlvSUQgIT0gbnVsbCAmJlxuICAgICAgICAgIHBhcnRpY2lwYW50LmF1ZGlvSUQgIT09ICcnXG4gICAgICAgICkge1xuICAgICAgICAgIG5ld0NvbXBvbmVudHNbMF0ucHVzaCh7XG4gICAgICAgICAgICBjb21wb25lbnQ6IEF1ZGlvQ2FyZCxcbiAgICAgICAgICAgIGlucHV0czoge1xuICAgICAgICAgICAgICBuYW1lOiBwYXJ0aWNpcGFudC5uYW1lLFxuICAgICAgICAgICAgICBiYXJDb2xvcjogJ3JlZCcsXG4gICAgICAgICAgICAgIHRleHRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgY3VzdG9tU3R5bGU6IHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgYm9yZGVyOiBldmVudFR5cGUgIT09ICdicm9hZGNhc3QnID8gJzJweCBzb2xpZCBibGFjaycgOiAnMHB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgY29udHJvbHNQb3NpdGlvbjogJ3RvcExlZnQnLFxuICAgICAgICAgICAgICBpbmZvUG9zaXRpb246ICd0b3BSaWdodCcsXG4gICAgICAgICAgICAgIHNob3dXYXZlZm9ybTogdHJ1ZSxcbiAgICAgICAgICAgICAgcm91bmRlZEltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgIHNob3dDb250cm9sczogZXZlbnRUeXBlICE9PSAnY2hhdCcsXG4gICAgICAgICAgICAgIHBhcnRpY2lwYW50LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdDb21wb25lbnRzWzBdLnB1c2goe1xuICAgICAgICAgICAgY29tcG9uZW50OiBNaW5pQ2FyZCxcbiAgICAgICAgICAgIGlucHV0czoge1xuICAgICAgICAgICAgICBpbml0aWFsczogcGFydGljaXBhbnQubmFtZSxcbiAgICAgICAgICAgICAgZm9udFNpemU6IDIwLFxuICAgICAgICAgICAgICBjdXN0b21TdHlsZToge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICBib3JkZXI6IGV2ZW50VHlwZSAhPT0gJ2Jyb2FkY2FzdCcgPyAnMnB4IHNvbGlkIGJsYWNrJyA6ICcwcHggc29saWQgYmxhY2snLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHJlbW90ZVByb2R1Y2VySWQgPT09ICd5b3V5b3UnIHx8IHJlbW90ZVByb2R1Y2VySWQgPT09ICd5b3V5b3V5b3UnKSB7XG4gICAgICAgICAgbGV0IG5hbWUgPSAnWW91JztcbiAgICAgICAgICBpZiAoaXNsZXZlbCA9PT0gJzInICYmIGV2ZW50VHlwZSAhPT0gJ2NoYXQnKSB7XG4gICAgICAgICAgICBuYW1lID0gJ1lvdSAoSG9zdCknO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghdmlkZW9BbHJlYWR5T24pIHtcbiAgICAgICAgICAgIG5hbWUgPSAnWW91JztcbiAgICAgICAgICAgIGlmIChpc2xldmVsID09ICcyJyAmJiBldmVudFR5cGUgIT0gJ2NoYXQnKSB7XG4gICAgICAgICAgICAgIG5hbWUgPSAnWW91IChIb3N0KSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5ld0NvbXBvbmVudHNbMF0ucHVzaCh7XG4gICAgICAgICAgICAgIGNvbXBvbmVudDogTWluaUNhcmQsXG4gICAgICAgICAgICAgIGlucHV0czoge1xuICAgICAgICAgICAgICAgIGluaXRpYWxzOiBuYW1lLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAyMCxcbiAgICAgICAgICAgICAgICBjdXN0b21TdHlsZToge1xuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgICAgYm9yZGVyOiBldmVudFR5cGUgIT09ICdicm9hZGNhc3QnID8gJzJweCBzb2xpZCBibGFjaycgOiAnMHB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnRpY2lwYW50ID0ge1xuICAgICAgICAgICAgICBpZDogJ3lvdXlvdXlvdScsXG4gICAgICAgICAgICAgIHN0cmVhbToga2VlcEJhY2tncm91bmQgJiYgdmlydHVhbFN0cmVhbSA/IHZpcnR1YWxTdHJlYW0gOiBsb2NhbFN0cmVhbVZpZGVvLFxuICAgICAgICAgICAgICBuYW1lOiAneW91eW91eW91JyxcbiAgICAgICAgICAgICAgbXV0ZWQ6IHRydWUsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGFydGljaXBhbnRfID0ge1xuICAgICAgICAgICAgICBpZDogJ3lvdXlvdScsXG4gICAgICAgICAgICAgIHZpZGVvSUQ6ICd5b3V5b3UnLFxuICAgICAgICAgICAgICBuYW1lOiAneW91eW91eW91JyxcbiAgICAgICAgICAgICAgc3RyZWFtOiBrZWVwQmFja2dyb3VuZCAmJiB2aXJ0dWFsU3RyZWFtID8gdmlydHVhbFN0cmVhbSA6IGxvY2FsU3RyZWFtVmlkZW8sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVtb3RlUHJvZHVjZXJJZCA9ICd5b3V5b3V5b3UnO1xuXG4gICAgICAgICAgICBuZXdDb21wb25lbnRzWzBdLnB1c2goe1xuICAgICAgICAgICAgICBjb21wb25lbnQ6IFZpZGVvQ2FyZCxcbiAgICAgICAgICAgICAgaW5wdXRzOiB7XG4gICAgICAgICAgICAgICAgdmlkZW9TdHJlYW06IHBhcnRpY2lwYW50LnN0cmVhbSA/IHBhcnRpY2lwYW50LnN0cmVhbSA6IG51bGwsXG4gICAgICAgICAgICAgICAgcmVtb3RlUHJvZHVjZXJJZDogcGFydGljaXBhbnQuc3RyZWFtID8gcGFydGljaXBhbnQuc3RyZWFtLmlkIDogbnVsbCxcbiAgICAgICAgICAgICAgICBldmVudFR5cGUsXG4gICAgICAgICAgICAgICAgZm9yY2VGdWxsRGlzcGxheTogZXZlbnRUeXBlID09ICd3ZWJpbmFyJyA/IGZhbHNlIDogZm9yY2VGdWxsRGlzcGxheSxcbiAgICAgICAgICAgICAgICBjdXN0b21TdHlsZToge1xuICAgICAgICAgICAgICAgICAgYm9yZGVyOiBldmVudFR5cGUgIT09ICdicm9hZGNhc3QnID8gJzJweCBzb2xpZCBibGFjaycgOiAnMHB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiBwYXJ0aWNpcGFudCxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgc2hvd0NvbnRyb2xzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93SW5mbzogZmFsc2UsXG4gICAgICAgICAgICAgICAgbmFtZTogcGFydGljaXBhbnQubmFtZSxcbiAgICAgICAgICAgICAgICBkb01pcnJvcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhcnRpY2lwYW50XyA9IHJlZl9wYXJ0aWNpcGFudHMuZmluZCgob2JqOiBhbnkpID0+IG9iai52aWRlb0lEID09PSByZW1vdGVQcm9kdWNlcklkKTtcbiAgICAgICAgICBpZiAocGFydGljaXBhbnRfKSB7XG4gICAgICAgICAgICBuZXdDb21wb25lbnRzWzBdLnB1c2goe1xuICAgICAgICAgICAgICBjb21wb25lbnQ6IFZpZGVvQ2FyZCxcbiAgICAgICAgICAgICAgaW5wdXRzOiB7XG4gICAgICAgICAgICAgICAgdmlkZW9TdHJlYW06IHBhcnRpY2lwYW50LnN0cmVhbSA/IHBhcnRpY2lwYW50LnN0cmVhbSA6IG51bGwsXG4gICAgICAgICAgICAgICAgcmVtb3RlUHJvZHVjZXJJZCxcbiAgICAgICAgICAgICAgICBldmVudFR5cGUsXG4gICAgICAgICAgICAgICAgZm9yY2VGdWxsRGlzcGxheSxcbiAgICAgICAgICAgICAgICBjdXN0b21TdHlsZToge1xuICAgICAgICAgICAgICAgICAgYm9yZGVyOiBldmVudFR5cGUgIT09ICdicm9hZGNhc3QnID8gJzJweCBzb2xpZCBibGFjaycgOiAnMHB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiBwYXJ0aWNpcGFudF8sXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgIHNob3dDb250cm9sczogZXZlbnRUeXBlICE9PSAnY2hhdCcsXG4gICAgICAgICAgICAgICAgc2hvd0luZm86IHRydWUsXG4gICAgICAgICAgICAgICAgbmFtZTogcGFydGljaXBhbnRfLm5hbWUsXG4gICAgICAgICAgICAgICAgZG9NaXJyb3I6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGkgPT09IG51bXRvYWRkIC0gMSkge1xuICAgICAgICBvdGhlckdyaWRTdHJlYW1zWzBdID0gbmV3Q29tcG9uZW50c1swXTtcblxuICAgICAgICBhd2FpdCB1cGRhdGVNaW5pQ2FyZHNHcmlkKHtcbiAgICAgICAgICByb3dzOiBudW1Sb3dzLFxuICAgICAgICAgIGNvbHM6IG51bUNvbHMsXG4gICAgICAgICAgZGVmYWw6IHRydWUsXG4gICAgICAgICAgYWN0dWFsUm93czogYWN0dWFsUm93cyxcbiAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICB9KTtcblxuICAgICAgICB1cGRhdGVPdGhlckdyaWRTdHJlYW1zKG90aGVyR3JpZFN0cmVhbXMpO1xuICAgICAgICBhd2FpdCB1cGRhdGVNaW5pQ2FyZHNHcmlkKHtcbiAgICAgICAgICByb3dzOiBudW1Sb3dzLFxuICAgICAgICAgIGNvbHM6IG51bUNvbHMsXG4gICAgICAgICAgZGVmYWw6IHRydWUsXG4gICAgICAgICAgYWN0dWFsUm93cyxcbiAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgdGhlIGFsdGVybmF0ZSBncmlkIHN0cmVhbXNcbiAgICBpZiAoIXJlbW92ZUFsdEdyaWQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWx0R3JpZFN0cmVhbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGFydGljaXBhbnQgPSBhbHRHcmlkU3RyZWFtc1tpXTtcbiAgICAgICAgcmVtb3RlUHJvZHVjZXJJZCA9IHBhcnRpY2lwYW50LnByb2R1Y2VySWQ7XG5cbiAgICAgICAgbGV0IHBhcnRpY2lwYW50XztcbiAgICAgICAgbGV0IHBzZXVkb05hbWUgPSBmYWxzZTtcblxuICAgICAgICAvL2NoZWNrIGlmIHRoZXJlIGlzIC5uYW1lIGluIHRoZSBwYXJ0aWNpcGFudCBvYmplY3QgYW5kIGlmIGl0IGlzIG51bGxcbiAgICAgICAgaWYgKFxuICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChwYXJ0aWNpcGFudCwgJ3Byb2R1Y2VySWQnKSAmJlxuICAgICAgICAgIHBhcnRpY2lwYW50LnByb2R1Y2VySWQgIT0gbnVsbCAmJlxuICAgICAgICAgIHBhcnRpY2lwYW50LnByb2R1Y2VySWQgIT09ICcnXG4gICAgICAgICkge1xuICAgICAgICAgIC8vYWN0dWFsIHZpZGVvXG4gICAgICAgICAgcHNldWRvTmFtZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBzZXVkb05hbWUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBzZXVkb05hbWUpIHtcbiAgICAgICAgICBwYXJ0aWNpcGFudF8gPSBwYXJ0aWNpcGFudDtcbiAgICAgICAgICByZW1vdGVQcm9kdWNlcklkID0gYXdhaXQgcGFydGljaXBhbnQubmFtZTtcblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChwYXJ0aWNpcGFudCwgJ2F1ZGlvSUQnKSAmJlxuICAgICAgICAgICAgcGFydGljaXBhbnQuYXVkaW9JRCAhPSBudWxsICYmXG4gICAgICAgICAgICBwYXJ0aWNpcGFudC5hdWRpb0lEICE9PSAnJ1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgbmV3Q29tcG9uZW50c1sxXS5wdXNoKHtcbiAgICAgICAgICAgICAgY29tcG9uZW50OiBBdWRpb0NhcmQsXG4gICAgICAgICAgICAgIGlucHV0czoge1xuICAgICAgICAgICAgICAgIG5hbWU6IHBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgYmFyQ29sb3I6ICdyZWQnLFxuICAgICAgICAgICAgICAgIHRleHRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgICBjdXN0b21TdHlsZToge1xuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgICAgYm9yZGVyOiBldmVudFR5cGUgIT09ICdicm9hZGNhc3QnID8gJzJweCBzb2xpZCBibGFjaycgOiAnMHB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbnRyb2xzUG9zaXRpb246ICd0b3BMZWZ0JyxcbiAgICAgICAgICAgICAgICBpbmZvUG9zaXRpb246ICd0b3BSaWdodCcsXG4gICAgICAgICAgICAgICAgc2hvd1dhdmVmb3JtOiB0cnVlLFxuICAgICAgICAgICAgICAgIHJvdW5kZWRJbWFnZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICBzaG93Q29udHJvbHM6IGV2ZW50VHlwZSAhPT0gJ2NoYXQnLFxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0NvbXBvbmVudHNbMV0ucHVzaCh7XG4gICAgICAgICAgICAgIGNvbXBvbmVudDogTWluaUNhcmQsXG4gICAgICAgICAgICAgIGlucHV0czoge1xuICAgICAgICAgICAgICAgIGluaXRpYWxzOiBwYXJ0aWNpcGFudC5uYW1lLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAyMCxcbiAgICAgICAgICAgICAgICBjdXN0b21TdHlsZToge1xuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgICAgYm9yZGVyOiBldmVudFR5cGUgIT09ICdicm9hZGNhc3QnID8gJzJweCBzb2xpZCBibGFjaycgOiAnMHB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhcnRpY2lwYW50XyA9IHJlZl9wYXJ0aWNpcGFudHMuZmluZCgob2JqOiBhbnkpID0+IG9iai52aWRlb0lEID09PSByZW1vdGVQcm9kdWNlcklkKTtcbiAgICAgICAgICBuZXdDb21wb25lbnRzWzFdLnB1c2goe1xuICAgICAgICAgICAgY29tcG9uZW50OiBWaWRlb0NhcmQsXG4gICAgICAgICAgICBpbnB1dHM6IHtcbiAgICAgICAgICAgICAgdmlkZW9TdHJlYW06IHBhcnRpY2lwYW50XyAmJiBwYXJ0aWNpcGFudF9bJ3N0cmVhbSddID8gcGFydGljaXBhbnRfWydzdHJlYW0nXSA6IG51bGwsXG4gICAgICAgICAgICAgIHJlbW90ZVByb2R1Y2VySWQsXG4gICAgICAgICAgICAgIGV2ZW50VHlwZSxcbiAgICAgICAgICAgICAgZm9yY2VGdWxsRGlzcGxheSxcbiAgICAgICAgICAgICAgY3VzdG9tU3R5bGU6IHtcbiAgICAgICAgICAgICAgICBib3JkZXI6IGV2ZW50VHlwZSAhPT0gJ2Jyb2FkY2FzdCcgPyAnMnB4IHNvbGlkIGJsYWNrJyA6ICcwcHggc29saWQgYmxhY2snLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBwYXJ0aWNpcGFudDogcGFydGljaXBhbnRfLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgIHNob3dDb250cm9sczogZXZlbnRUeXBlICE9PSAnY2hhdCcsXG4gICAgICAgICAgICAgIHNob3dJbmZvOiB0cnVlLFxuICAgICAgICAgICAgICBuYW1lOiBwYXJ0aWNpcGFudC5uYW1lLFxuICAgICAgICAgICAgICBkb01pcnJvcjogZmFsc2UsXG4gICAgICAgICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGkgPT09IG51bXRvYWRkIC0gMSkge1xuICAgICAgICAgIG90aGVyR3JpZFN0cmVhbXNbMV0gPSBuZXdDb21wb25lbnRzWzFdO1xuXG4gICAgICAgICAgYXdhaXQgdXBkYXRlTWluaUNhcmRzR3JpZCh7XG4gICAgICAgICAgICByb3dzOiAxLFxuICAgICAgICAgICAgY29sczogbGFzdHJvd2NvbHMsXG4gICAgICAgICAgICBkZWZhbDogZmFsc2UsXG4gICAgICAgICAgICBhY3R1YWxSb3dzLFxuICAgICAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHVwZGF0ZU90aGVyR3JpZFN0cmVhbXMob3RoZXJHcmlkU3RyZWFtcyk7XG4gICAgICAgICAgYXdhaXQgdXBkYXRlTWluaUNhcmRzR3JpZCh7XG4gICAgICAgICAgICByb3dzOiAxLFxuICAgICAgICAgICAgY29sczogbGFzdHJvd2NvbHMsXG4gICAgICAgICAgICBkZWZhbDogZmFsc2UsXG4gICAgICAgICAgICBhY3R1YWxSb3dzLFxuICAgICAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB1cGRhdGVBZGRBbHRHcmlkKGZhbHNlKTtcbiAgICAgIG90aGVyR3JpZFN0cmVhbXNbMV0gPSBbXTtcblxuICAgICAgYXdhaXQgdXBkYXRlTWluaUNhcmRzR3JpZCh7XG4gICAgICAgIHJvd3M6IDAsXG4gICAgICAgIGNvbHM6IDAsXG4gICAgICAgIGRlZmFsOiBmYWxzZSxcbiAgICAgICAgYWN0dWFsUm93czogYWN0dWFsUm93cyxcbiAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgIH0pO1xuXG4gICAgICB1cGRhdGVPdGhlckdyaWRTdHJlYW1zKG90aGVyR3JpZFN0cmVhbXMpO1xuICAgICAgYXdhaXQgdXBkYXRlTWluaUNhcmRzR3JpZCh7XG4gICAgICAgIHJvd3M6IDAsXG4gICAgICAgIGNvbHM6IDAsXG4gICAgICAgIGRlZmFsOiBmYWxzZSxcbiAgICAgICAgYWN0dWFsUm93cyxcbiAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==