import { Injectable } from '@angular/core';
import { MiniCard } from '../components/display-components/mini-card/mini-card.component';
import { VideoCard } from '../components/display-components/video-card/video-card.component';
import { AudioCard } from '../components/display-components/audio-card/audio-card.component';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXZpZGVvcy1ncmlkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL2FkZC12aWRlb3MtZ3JpZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdFQUFnRSxDQUFDO0FBQzFGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQztBQUM3RixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sa0VBQWtFLENBQUM7O0FBa0Q3RixNQUFNLE9BQU8sYUFBYTtJQUN4QixhQUFhLEdBQUcsS0FBSyxFQUFFLEVBQ3JCLGVBQWUsRUFDZixjQUFjLEVBQ2QsUUFBUSxFQUNSLE9BQU8sRUFDUCxPQUFPLEVBQ1AsVUFBVSxFQUNWLFdBQVcsRUFDWCxhQUFhLEVBQ2IsVUFBVSxHQUNXLEVBQWlCLEVBQUU7UUFDeEMsSUFBSSxFQUFFLG1CQUFtQixFQUFFLEdBQUcsVUFBVSxDQUFDO1FBQ3pDLFVBQVUsR0FBRyxFQUFFLEdBQUcsVUFBVSxFQUFFLEdBQUcsbUJBQW1CLEVBQUUsRUFBRSxDQUFDO1FBRXpELElBQUksRUFDRixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixPQUFPLEVBQ1AsY0FBYyxFQUNkLGdCQUFnQixFQUNoQixjQUFjLEVBQ2QsYUFBYSxFQUNiLGdCQUFnQixFQUNoQixnQkFBZ0IsRUFDaEIsc0JBQXNCLEVBQ3RCLG1CQUFtQixHQUNwQixHQUFHLFVBQVUsQ0FBQztRQUVmLElBQUksYUFBYSxHQUF3QyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsRSxJQUFJLFdBQWdCLENBQUM7UUFDckIsSUFBSSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFD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bnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWluaUNhcmQgfSBmcm9tICcuLi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9taW5pLWNhcmQvbWluaS1jYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWRlb0NhcmQgfSBmcm9tICcuLi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy92aWRlby1jYXJkL3ZpZGVvLWNhcmQuY29tcG9uZW50JztcbmltcG9ydCB7IEF1ZGlvQ2FyZCB9IGZyb20gJy4uL2NvbXBvbmVudHMvZGlzcGxheS1jb21wb25lbnRzL2F1ZGlvLWNhcmQvYXVkaW8tY2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgUGFydGljaXBhbnQsXG4gIFN0cmVhbSxcbiAgVXBkYXRlTWluaUNhcmRzR3JpZFR5cGUsXG4gIFVwZGF0ZU1pbmlDYXJkc0dyaWRQYXJhbWV0ZXJzLFxuICBBdWRpb0NhcmRQYXJhbWV0ZXJzLFxuICBFdmVudFR5cGUsXG4gIEN1c3RvbU1lZGlhQ29tcG9uZW50LFxufSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFkZFZpZGVvc0dyaWRQYXJhbWV0ZXJzXG4gIGV4dGVuZHMgVXBkYXRlTWluaUNhcmRzR3JpZFBhcmFtZXRlcnMsXG4gICAgQXVkaW9DYXJkUGFyYW1ldGVycyB7XG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlO1xuICB1cGRhdGVBZGRBbHRHcmlkOiAoYWRkQWx0R3JpZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgcmVmX3BhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgaXNsZXZlbDogc3RyaW5nO1xuICB2aWRlb0FscmVhZHlPbjogYm9vbGVhbjtcbiAgbG9jYWxTdHJlYW1WaWRlbzogTWVkaWFTdHJlYW0gfCBudWxsO1xuICBrZWVwQmFja2dyb3VuZDogYm9vbGVhbjtcbiAgdmlydHVhbFN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsO1xuICBmb3JjZUZ1bGxEaXNwbGF5OiBib29sZWFuO1xuICBvdGhlckdyaWRTdHJlYW1zOiBDdXN0b21NZWRpYUNvbXBvbmVudFtdW107XG4gIHVwZGF0ZU90aGVyR3JpZFN0cmVhbXM6IChvdGhlckdyaWRTdHJlYW1zOiBDdXN0b21NZWRpYUNvbXBvbmVudFtdW10pID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIHVwZGF0ZU1pbmlDYXJkc0dyaWQ6IFVwZGF0ZU1pbmlDYXJkc0dyaWRUeXBlO1xuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBBZGRWaWRlb3NHcmlkUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFkZFZpZGVvc0dyaWRPcHRpb25zIHtcbiAgbWFpbkdyaWRTdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW107XG4gIGFsdEdyaWRTdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW107XG4gIG51bXRvYWRkOiBudW1iZXI7XG4gIG51bVJvd3M6IG51bWJlcjtcbiAgbnVtQ29sczogbnVtYmVyO1xuICBhY3R1YWxSb3dzOiBudW1iZXI7XG4gIGxhc3Ryb3djb2xzOiBudW1iZXI7XG4gIHJlbW92ZUFsdEdyaWQ6IGJvb2xlYW47XG4gIHBhcmFtZXRlcnM6IEFkZFZpZGVvc0dyaWRQYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBBZGRWaWRlb3NHcmlkVHlwZSA9IChvcHRpb25zOiBBZGRWaWRlb3NHcmlkT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEFkZFZpZGVvc0dyaWQge1xuICBhZGRWaWRlb3NHcmlkID0gYXN5bmMgKHtcbiAgICBtYWluR3JpZFN0cmVhbXMsXG4gICAgYWx0R3JpZFN0cmVhbXMsXG4gICAgbnVtdG9hZGQsXG4gICAgbnVtUm93cyxcbiAgICBudW1Db2xzLFxuICAgIGFjdHVhbFJvd3MsXG4gICAgbGFzdHJvd2NvbHMsXG4gICAgcmVtb3ZlQWx0R3JpZCxcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBBZGRWaWRlb3NHcmlkT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGxldCB7IGdldFVwZGF0ZWRBbGxQYXJhbXMgfSA9IHBhcmFtZXRlcnM7XG4gICAgcGFyYW1ldGVycyA9IHsgLi4ucGFyYW1ldGVycywgLi4uZ2V0VXBkYXRlZEFsbFBhcmFtcygpIH07XG5cbiAgICBsZXQge1xuICAgICAgZXZlbnRUeXBlLFxuICAgICAgdXBkYXRlQWRkQWx0R3JpZCxcbiAgICAgIHJlZl9wYXJ0aWNpcGFudHMsXG4gICAgICBpc2xldmVsLFxuICAgICAgdmlkZW9BbHJlYWR5T24sXG4gICAgICBsb2NhbFN0cmVhbVZpZGVvLFxuICAgICAga2VlcEJhY2tncm91bmQsXG4gICAgICB2aXJ0dWFsU3RyZWFtLFxuICAgICAgZm9yY2VGdWxsRGlzcGxheSxcbiAgICAgIG90aGVyR3JpZFN0cmVhbXMsXG4gICAgICB1cGRhdGVPdGhlckdyaWRTdHJlYW1zLFxuICAgICAgdXBkYXRlTWluaUNhcmRzR3JpZCxcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIGxldCBuZXdDb21wb25lbnRzOiB7IGNvbXBvbmVudDogYW55OyBpbnB1dHM6IGFueSB9W11bXSA9IFtbXSwgW11dO1xuICAgIGxldCBwYXJ0aWNpcGFudDogYW55O1xuICAgIGxldCByZW1vdGVQcm9kdWNlcklkID0gJyc7XG4gICAgbGV0IHBhcnRpY2lwYW50XyA9IG51bGw7XG5cbiAgICBudW10b2FkZCA9IG1haW5HcmlkU3RyZWFtcy5sZW5ndGg7XG5cbiAgICBpZiAocmVtb3ZlQWx0R3JpZCkge1xuICAgICAgdXBkYXRlQWRkQWx0R3JpZChmYWxzZSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHBhcnRpY2lwYW50cyB0byB0aGUgbWFpbiBncmlkXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW10b2FkZDsgaSsrKSB7XG4gICAgICBwYXJ0aWNpcGFudCA9IG1haW5HcmlkU3RyZWFtc1tpXTtcbiAgICAgIHJlbW90ZVByb2R1Y2VySWQgPSBwYXJ0aWNpcGFudC5wcm9kdWNlcklkO1xuXG4gICAgICBsZXQgcHNldWRvTmFtZSA9ICFyZW1vdGVQcm9kdWNlcklkIHx8IHJlbW90ZVByb2R1Y2VySWQgPT09ICcnO1xuXG4gICAgICBpZiAocHNldWRvTmFtZSkge1xuICAgICAgICBwYXJ0aWNpcGFudF8gPSBwYXJ0aWNpcGFudDtcbiAgICAgICAgcmVtb3RlUHJvZHVjZXJJZCA9IGF3YWl0IHBhcnRpY2lwYW50Lm5hbWU7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChwYXJ0aWNpcGFudCwgJ2F1ZGlvSUQnKSAmJlxuICAgICAgICAgIHBhcnRpY2lwYW50LmF1ZGlvSUQgIT0gbnVsbCAmJlxuICAgICAgICAgIHBhcnRpY2lwYW50LmF1ZGlvSUQgIT09ICcnXG4gICAgICAgICkge1xuICAgICAgICAgIG5ld0NvbXBvbmVudHNbMF0ucHVzaCh7XG4gICAgICAgICAgICBjb21wb25lbnQ6IEF1ZGlvQ2FyZCxcbiAgICAgICAgICAgIGlucHV0czoge1xuICAgICAgICAgICAgICBuYW1lOiBwYXJ0aWNpcGFudC5uYW1lLFxuICAgICAgICAgICAgICBiYXJDb2xvcjogJ3JlZCcsXG4gICAgICAgICAgICAgIHRleHRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgY3VzdG9tU3R5bGU6IHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgYm9yZGVyOiBldmVudFR5cGUgIT09ICdicm9hZGNhc3QnID8gJzJweCBzb2xpZCBibGFjaycgOiAnMHB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgY29udHJvbHNQb3NpdGlvbjogJ3RvcExlZnQnLFxuICAgICAgICAgICAgICBpbmZvUG9zaXRpb246ICd0b3BSaWdodCcsXG4gICAgICAgICAgICAgIHNob3dXYXZlZm9ybTogdHJ1ZSxcbiAgICAgICAgICAgICAgcm91bmRlZEltYWdlOiB0cnVlLFxuICAgICAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgIHNob3dDb250cm9sczogZXZlbnRUeXBlICE9PSAnY2hhdCcsXG4gICAgICAgICAgICAgIHBhcnRpY2lwYW50LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdDb21wb25lbnRzWzBdLnB1c2goe1xuICAgICAgICAgICAgY29tcG9uZW50OiBNaW5pQ2FyZCxcbiAgICAgICAgICAgIGlucHV0czoge1xuICAgICAgICAgICAgICBpbml0aWFsczogcGFydGljaXBhbnQubmFtZSxcbiAgICAgICAgICAgICAgZm9udFNpemU6IDIwLFxuICAgICAgICAgICAgICBjdXN0b21TdHlsZToge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICBib3JkZXI6IGV2ZW50VHlwZSAhPT0gJ2Jyb2FkY2FzdCcgPyAnMnB4IHNvbGlkIGJsYWNrJyA6ICcwcHggc29saWQgYmxhY2snLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHJlbW90ZVByb2R1Y2VySWQgPT09ICd5b3V5b3UnIHx8IHJlbW90ZVByb2R1Y2VySWQgPT09ICd5b3V5b3V5b3UnKSB7XG4gICAgICAgICAgbGV0IG5hbWUgPSAnWW91JztcbiAgICAgICAgICBpZiAoaXNsZXZlbCA9PT0gJzInICYmIGV2ZW50VHlwZSAhPT0gJ2NoYXQnKSB7XG4gICAgICAgICAgICBuYW1lID0gJ1lvdSAoSG9zdCknO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghdmlkZW9BbHJlYWR5T24pIHtcbiAgICAgICAgICAgIG5hbWUgPSAnWW91JztcbiAgICAgICAgICAgIGlmIChpc2xldmVsID09ICcyJyAmJiBldmVudFR5cGUgIT0gJ2NoYXQnKSB7XG4gICAgICAgICAgICAgIG5hbWUgPSAnWW91IChIb3N0KSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5ld0NvbXBvbmVudHNbMF0ucHVzaCh7XG4gICAgICAgICAgICAgIGNvbXBvbmVudDogTWluaUNhcmQsXG4gICAgICAgICAgICAgIGlucHV0czoge1xuICAgICAgICAgICAgICAgIGluaXRpYWxzOiBuYW1lLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAyMCxcbiAgICAgICAgICAgICAgICBjdXN0b21TdHlsZToge1xuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgICAgYm9yZGVyOiBldmVudFR5cGUgIT09ICdicm9hZGNhc3QnID8gJzJweCBzb2xpZCBibGFjaycgOiAnMHB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnRpY2lwYW50ID0ge1xuICAgICAgICAgICAgICBpZDogJ3lvdXlvdXlvdScsXG4gICAgICAgICAgICAgIHN0cmVhbToga2VlcEJhY2tncm91bmQgJiYgdmlydHVhbFN0cmVhbSA/IHZpcnR1YWxTdHJlYW0gOiBsb2NhbFN0cmVhbVZpZGVvLFxuICAgICAgICAgICAgICBuYW1lOiAneW91eW91eW91JyxcbiAgICAgICAgICAgICAgbXV0ZWQ6IHRydWUsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGFydGljaXBhbnRfID0ge1xuICAgICAgICAgICAgICBpZDogJ3lvdXlvdScsXG4gICAgICAgICAgICAgIHZpZGVvSUQ6ICd5b3V5b3UnLFxuICAgICAgICAgICAgICBuYW1lOiAneW91eW91eW91JyxcbiAgICAgICAgICAgICAgc3RyZWFtOiBrZWVwQmFja2dyb3VuZCAmJiB2aXJ0dWFsU3RyZWFtID8gdmlydHVhbFN0cmVhbSA6IGxvY2FsU3RyZWFtVmlkZW8sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVtb3RlUHJvZHVjZXJJZCA9ICd5b3V5b3V5b3UnO1xuXG4gICAgICAgICAgICBuZXdDb21wb25lbnRzWzBdLnB1c2goe1xuICAgICAgICAgICAgICBjb21wb25lbnQ6IFZpZGVvQ2FyZCxcbiAgICAgICAgICAgICAgaW5wdXRzOiB7XG4gICAgICAgICAgICAgICAgdmlkZW9TdHJlYW06IHBhcnRpY2lwYW50LnN0cmVhbSA/IHBhcnRpY2lwYW50LnN0cmVhbSA6IG51bGwsXG4gICAgICAgICAgICAgICAgcmVtb3RlUHJvZHVjZXJJZDogcGFydGljaXBhbnQuc3RyZWFtID8gcGFydGljaXBhbnQuc3RyZWFtLmlkIDogbnVsbCxcbiAgICAgICAgICAgICAgICBldmVudFR5cGUsXG4gICAgICAgICAgICAgICAgZm9yY2VGdWxsRGlzcGxheTogZXZlbnRUeXBlID09ICd3ZWJpbmFyJyA/IGZhbHNlIDogZm9yY2VGdWxsRGlzcGxheSxcbiAgICAgICAgICAgICAgICBjdXN0b21TdHlsZToge1xuICAgICAgICAgICAgICAgICAgYm9yZGVyOiBldmVudFR5cGUgIT09ICdicm9hZGNhc3QnID8gJzJweCBzb2xpZCBibGFjaycgOiAnMHB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiBwYXJ0aWNpcGFudCxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgc2hvd0NvbnRyb2xzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93SW5mbzogZmFsc2UsXG4gICAgICAgICAgICAgICAgbmFtZTogcGFydGljaXBhbnQubmFtZSxcbiAgICAgICAgICAgICAgICBkb01pcnJvcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhcnRpY2lwYW50XyA9IHJlZl9wYXJ0aWNpcGFudHMuZmluZCgob2JqOiBhbnkpID0+IG9iai52aWRlb0lEID09PSByZW1vdGVQcm9kdWNlcklkKTtcbiAgICAgICAgICBpZiAocGFydGljaXBhbnRfKSB7XG4gICAgICAgICAgICBuZXdDb21wb25lbnRzWzBdLnB1c2goe1xuICAgICAgICAgICAgICBjb21wb25lbnQ6IFZpZGVvQ2FyZCxcbiAgICAgICAgICAgICAgaW5wdXRzOiB7XG4gICAgICAgICAgICAgICAgdmlkZW9TdHJlYW06IHBhcnRpY2lwYW50LnN0cmVhbSA/IHBhcnRpY2lwYW50LnN0cmVhbSA6IG51bGwsXG4gICAgICAgICAgICAgICAgcmVtb3RlUHJvZHVjZXJJZCxcbiAgICAgICAgICAgICAgICBldmVudFR5cGUsXG4gICAgICAgICAgICAgICAgZm9yY2VGdWxsRGlzcGxheSxcbiAgICAgICAgICAgICAgICBjdXN0b21TdHlsZToge1xuICAgICAgICAgICAgICAgICAgYm9yZGVyOiBldmVudFR5cGUgIT09ICdicm9hZGNhc3QnID8gJzJweCBzb2xpZCBibGFjaycgOiAnMHB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiBwYXJ0aWNpcGFudF8sXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgIHNob3dDb250cm9sczogZXZlbnRUeXBlICE9PSAnY2hhdCcsXG4gICAgICAgICAgICAgICAgc2hvd0luZm86IHRydWUsXG4gICAgICAgICAgICAgICAgbmFtZTogcGFydGljaXBhbnRfLm5hbWUsXG4gICAgICAgICAgICAgICAgZG9NaXJyb3I6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGkgPT09IG51bXRvYWRkIC0gMSkge1xuICAgICAgICBvdGhlckdyaWRTdHJlYW1zWzBdID0gbmV3Q29tcG9uZW50c1swXTtcblxuICAgICAgICBhd2FpdCB1cGRhdGVNaW5pQ2FyZHNHcmlkKHtcbiAgICAgICAgICByb3dzOiBudW1Sb3dzLFxuICAgICAgICAgIGNvbHM6IG51bUNvbHMsXG4gICAgICAgICAgZGVmYWw6IHRydWUsXG4gICAgICAgICAgYWN0dWFsUm93czogYWN0dWFsUm93cyxcbiAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICB9KTtcblxuICAgICAgICB1cGRhdGVPdGhlckdyaWRTdHJlYW1zKG90aGVyR3JpZFN0cmVhbXMpO1xuICAgICAgICBhd2FpdCB1cGRhdGVNaW5pQ2FyZHNHcmlkKHtcbiAgICAgICAgICByb3dzOiBudW1Sb3dzLFxuICAgICAgICAgIGNvbHM6IG51bUNvbHMsXG4gICAgICAgICAgZGVmYWw6IHRydWUsXG4gICAgICAgICAgYWN0dWFsUm93cyxcbiAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgdGhlIGFsdGVybmF0ZSBncmlkIHN0cmVhbXNcbiAgICBpZiAoIXJlbW92ZUFsdEdyaWQpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWx0R3JpZFN0cmVhbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGFydGljaXBhbnQgPSBhbHRHcmlkU3RyZWFtc1tpXTtcbiAgICAgICAgcmVtb3RlUHJvZHVjZXJJZCA9IHBhcnRpY2lwYW50LnByb2R1Y2VySWQ7XG5cbiAgICAgICAgbGV0IHBhcnRpY2lwYW50XztcbiAgICAgICAgbGV0IHBzZXVkb05hbWUgPSBmYWxzZTtcblxuICAgICAgICAvL2NoZWNrIGlmIHRoZXJlIGlzIC5uYW1lIGluIHRoZSBwYXJ0aWNpcGFudCBvYmplY3QgYW5kIGlmIGl0IGlzIG51bGxcbiAgICAgICAgaWYgKFxuICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChwYXJ0aWNpcGFudCwgJ3Byb2R1Y2VySWQnKSAmJlxuICAgICAgICAgIHBhcnRpY2lwYW50LnByb2R1Y2VySWQgIT0gbnVsbCAmJlxuICAgICAgICAgIHBhcnRpY2lwYW50LnByb2R1Y2VySWQgIT09ICcnXG4gICAgICAgICkge1xuICAgICAgICAgIC8vYWN0dWFsIHZpZGVvXG4gICAgICAgICAgcHNldWRvTmFtZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBzZXVkb05hbWUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBzZXVkb05hbWUpIHtcbiAgICAgICAgICBwYXJ0aWNpcGFudF8gPSBwYXJ0aWNpcGFudDtcbiAgICAgICAgICByZW1vdGVQcm9kdWNlcklkID0gYXdhaXQgcGFydGljaXBhbnQubmFtZTtcblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChwYXJ0aWNpcGFudCwgJ2F1ZGlvSUQnKSAmJlxuICAgICAgICAgICAgcGFydGljaXBhbnQuYXVkaW9JRCAhPSBudWxsICYmXG4gICAgICAgICAgICBwYXJ0aWNpcGFudC5hdWRpb0lEICE9PSAnJ1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgbmV3Q29tcG9uZW50c1sxXS5wdXNoKHtcbiAgICAgICAgICAgICAgY29tcG9uZW50OiBBdWRpb0NhcmQsXG4gICAgICAgICAgICAgIGlucHV0czoge1xuICAgICAgICAgICAgICAgIG5hbWU6IHBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgYmFyQ29sb3I6ICdyZWQnLFxuICAgICAgICAgICAgICAgIHRleHRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgICBjdXN0b21TdHlsZToge1xuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgICAgYm9yZGVyOiBldmVudFR5cGUgIT09ICdicm9hZGNhc3QnID8gJzJweCBzb2xpZCBibGFjaycgOiAnMHB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbnRyb2xzUG9zaXRpb246ICd0b3BMZWZ0JyxcbiAgICAgICAgICAgICAgICBpbmZvUG9zaXRpb246ICd0b3BSaWdodCcsXG4gICAgICAgICAgICAgICAgc2hvd1dhdmVmb3JtOiB0cnVlLFxuICAgICAgICAgICAgICAgIHJvdW5kZWRJbWFnZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICBzaG93Q29udHJvbHM6IGV2ZW50VHlwZSAhPT0gJ2NoYXQnLFxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0NvbXBvbmVudHNbMV0ucHVzaCh7XG4gICAgICAgICAgICAgIGNvbXBvbmVudDogTWluaUNhcmQsXG4gICAgICAgICAgICAgIGlucHV0czoge1xuICAgICAgICAgICAgICAgIGluaXRpYWxzOiBwYXJ0aWNpcGFudC5uYW1lLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAyMCxcbiAgICAgICAgICAgICAgICBjdXN0b21TdHlsZToge1xuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgICAgYm9yZGVyOiBldmVudFR5cGUgIT09ICdicm9hZGNhc3QnID8gJzJweCBzb2xpZCBibGFjaycgOiAnMHB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhcnRpY2lwYW50XyA9IHJlZl9wYXJ0aWNpcGFudHMuZmluZCgob2JqOiBhbnkpID0+IG9iai52aWRlb0lEID09PSByZW1vdGVQcm9kdWNlcklkKTtcbiAgICAgICAgICBuZXdDb21wb25lbnRzWzFdLnB1c2goe1xuICAgICAgICAgICAgY29tcG9uZW50OiBWaWRlb0NhcmQsXG4gICAgICAgICAgICBpbnB1dHM6IHtcbiAgICAgICAgICAgICAgdmlkZW9TdHJlYW06IHBhcnRpY2lwYW50XyAmJiBwYXJ0aWNpcGFudF9bJ3N0cmVhbSddID8gcGFydGljaXBhbnRfWydzdHJlYW0nXSA6IG51bGwsXG4gICAgICAgICAgICAgIHJlbW90ZVByb2R1Y2VySWQsXG4gICAgICAgICAgICAgIGV2ZW50VHlwZSxcbiAgICAgICAgICAgICAgZm9yY2VGdWxsRGlzcGxheSxcbiAgICAgICAgICAgICAgY3VzdG9tU3R5bGU6IHtcbiAgICAgICAgICAgICAgICBib3JkZXI6IGV2ZW50VHlwZSAhPT0gJ2Jyb2FkY2FzdCcgPyAnMnB4IHNvbGlkIGJsYWNrJyA6ICcwcHggc29saWQgYmxhY2snLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBwYXJ0aWNpcGFudDogcGFydGljaXBhbnRfLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgIHNob3dDb250cm9sczogZXZlbnRUeXBlICE9PSAnY2hhdCcsXG4gICAgICAgICAgICAgIHNob3dJbmZvOiB0cnVlLFxuICAgICAgICAgICAgICBuYW1lOiBwYXJ0aWNpcGFudC5uYW1lLFxuICAgICAgICAgICAgICBkb01pcnJvcjogZmFsc2UsXG4gICAgICAgICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGkgPT09IG51bXRvYWRkIC0gMSkge1xuICAgICAgICAgIG90aGVyR3JpZFN0cmVhbXNbMV0gPSBuZXdDb21wb25lbnRzWzFdO1xuXG4gICAgICAgICAgYXdhaXQgdXBkYXRlTWluaUNhcmRzR3JpZCh7XG4gICAgICAgICAgICByb3dzOiAxLFxuICAgICAgICAgICAgY29sczogbGFzdHJvd2NvbHMsXG4gICAgICAgICAgICBkZWZhbDogZmFsc2UsXG4gICAgICAgICAgICBhY3R1YWxSb3dzLFxuICAgICAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHVwZGF0ZU90aGVyR3JpZFN0cmVhbXMob3RoZXJHcmlkU3RyZWFtcyk7XG4gICAgICAgICAgYXdhaXQgdXBkYXRlTWluaUNhcmRzR3JpZCh7XG4gICAgICAgICAgICByb3dzOiAxLFxuICAgICAgICAgICAgY29sczogbGFzdHJvd2NvbHMsXG4gICAgICAgICAgICBkZWZhbDogZmFsc2UsXG4gICAgICAgICAgICBhY3R1YWxSb3dzLFxuICAgICAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB1cGRhdGVBZGRBbHRHcmlkKGZhbHNlKTtcbiAgICAgIG90aGVyR3JpZFN0cmVhbXNbMV0gPSBbXTtcblxuICAgICAgYXdhaXQgdXBkYXRlTWluaUNhcmRzR3JpZCh7XG4gICAgICAgIHJvd3M6IDAsXG4gICAgICAgIGNvbHM6IDAsXG4gICAgICAgIGRlZmFsOiBmYWxzZSxcbiAgICAgICAgYWN0dWFsUm93czogYWN0dWFsUm93cyxcbiAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgIH0pO1xuXG4gICAgICB1cGRhdGVPdGhlckdyaWRTdHJlYW1zKG90aGVyR3JpZFN0cmVhbXMpO1xuICAgICAgYXdhaXQgdXBkYXRlTWluaUNhcmRzR3JpZCh7XG4gICAgICAgIHJvd3M6IDAsXG4gICAgICAgIGNvbHM6IDAsXG4gICAgICAgIGRlZmFsOiBmYWxzZSxcbiAgICAgICAgYWN0dWFsUm93cyxcbiAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==