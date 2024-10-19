import { Injectable } from '@angular/core';
import {
  Stream,
  Participant,
  ReorderStreamsType,
  ReorderStreamsParameters,
  PrepopulateUserMediaParameters,
  PrepopulateUserMediaType,
  GetVideosType,
  RePortType,
  RePortParameters,
  EventType,
} from '../@types/types';

export interface CloseAndResizeParameters
  extends ReorderStreamsParameters,
    PrepopulateUserMediaParameters,
    RePortParameters {
  allAudioStreams: (Stream | Participant)[];
  allVideoStreams: (Stream | Participant)[];
  activeNames: string[];
  participants: Participant[];
  streamNames: Stream[];
  recordingDisplayType: 'video' | 'media' | 'all';
  recordingVideoOptimized: boolean;
  adminIDStream?: string;
  newLimitedStreams: (Stream | Participant)[];
  newLimitedStreamsIDs: string[];
  oldAllStreams: (Stream | Participant)[];
  shareScreenStarted: boolean;
  shared: boolean;
  meetingDisplayType: string;
  defer_receive: boolean;
  lock_screen: boolean;
  firstAll: boolean;
  first_round: boolean;
  gotAllVids: boolean;
  eventType: EventType;
  hostLabel: string;
  shareEnded: boolean;
  updateMainWindow: boolean;
  updateActiveNames: (activeNames: string[]) => void;
  updateAllAudioStreams: (allAudioStreams: (Stream | Participant)[]) => void;
  updateShareScreenStarted: (shareScreenStarted: boolean) => void;
  updateUpdateMainWindow: (updateMainWindow: boolean) => void;
  updateNewLimitedStreams: (newLimitedStreams: (Stream | Participant)[]) => void;
  updateOldAllStreams: (oldAllStreams: (Stream | Participant)[]) => void;
  updateDefer_receive: (defer_receive: boolean) => void;
  updateMainHeightWidth: (heightWidth: number) => void;
  updateShareEnded: (shareEnded: boolean) => void;
  updateLock_screen: (lock_screen: boolean) => void;
  updateFirstAll: (firstAll: boolean) => void;
  updateFirst_round: (first_round: boolean) => void;

  // mediasfu functions
  reorderStreams: ReorderStreamsType;
  prepopulateUserMedia: PrepopulateUserMediaType;
  getVideos: GetVideosType;
  rePort: RePortType;
  getUpdatedAllParams: () => CloseAndResizeParameters;
  [key: string]: any;
}

export interface CloseAndResizeOptions {
  producerId: string;
  kind: string;
  parameters: CloseAndResizeParameters;
}

// Export the type definition for the function
export type CloseAndResizeType = (options: CloseAndResizeOptions) => Promise<void>;
@Injectable({
  providedIn: 'root',
})
export class CloseAndResize {
  /**
   * Closes and resizes the video and audio elements based on the provided options.
   *
   * @param {CloseAndResizeOptions} options - The options for closing and resizing.
   * @param {string} options.producerId - The ID of the producer.
   * @param {string} options.kind - The kind of media (audio, video, screenshare, or screen).
   * @param {object} options.parameters - The parameters for the operation.
   * @param {function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
   * @param {Array} options.parameters.allAudioStreams - Array of all audio streams.
   * @param {Array} options.parameters.allVideoStreams - Array of all video streams.
   * @param {Array} options.parameters.activeNames - Array of active participant names.
   * @param {Array} options.parameters.participants - Array of participants.
   * @param {Array} options.parameters.streamNames - Array of stream names.
   * @param {string} options.parameters.recordingDisplayType - Type of recording display.
   * @param {boolean} options.parameters.recordingVideoOptimized - Whether recording is video optimized.
   * @param {string} options.parameters.adminIDStream - ID of the admin stream.
   * @param {Array} options.parameters.newLimitedStreams - Array of new limited streams.
   * @param {Array} options.parameters.newLimitedStreamsIDs - Array of new limited stream IDs.
   * @param {Array} options.parameters.oldAllStreams - Array of old all streams.
   * @param {boolean} options.parameters.shareScreenStarted - Whether screen sharing has started.
   * @param {boolean} options.parameters.shared - Whether sharing is active.
   * @param {string} options.parameters.meetingDisplayType - Type of meeting display.
   * @param {boolean} options.parameters.defer_receive - Whether to defer receiving.
   * @param {boolean} options.parameters.lock_screen - Whether the screen is locked.
   * @param {boolean} options.parameters.firstAll - Whether it is the first all.
   * @param {boolean} options.parameters.first_round - Whether it is the first round.
   * @param {boolean} options.parameters.gotAllVids - Whether all videos are received.
   * @param {string} options.parameters.eventType - Type of event.
   * @param {string} options.parameters.hostLabel - Label of the host.
   * @param {boolean} options.parameters.shareEnded - Whether sharing has ended.
   * @param {boolean} options.parameters.updateMainWindow - Whether to update the main window.
   * @param {function} options.parameters.updateActiveNames - Function to update active names.
   * @param {function} options.parameters.updateAllAudioStreams - Function to update all audio streams.
   * @param {function} options.parameters.updateAllVideoStreams - Function to update all video streams.
   * @param {function} options.parameters.updateShareScreenStarted - Function to update share screen started status.
   * @param {function} options.parameters.updateUpdateMainWindow - Function to update main window status.
   * @param {function} options.parameters.updateNewLimitedStreams - Function to update new limited streams.
   * @param {function} options.parameters.updateOldAllStreams - Function to update old all streams.
   * @param {function} options.parameters.updateDefer_receive - Function to update defer receive status.
   * @param {function} options.parameters.updateMainHeightWidth - Function to update main height and width.
   * @param {function} options.parameters.updateShareEnded - Function to update share ended status.
   * @param {function} options.parameters.updateLock_screen - Function to update lock screen status.
   * @param {function} options.parameters.updateFirstAll - Function to update first all status.
   * @param {function} options.parameters.updateFirst_round - Function to update first round status.
   * @param {function} options.parameters.reorderStreams - Function to reorder streams.
   * @param {function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
   * @param {function} options.parameters.getVideos - Function to get videos.
   * @param {function} options.parameters.rePort - Function to report.
   *
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */

  closeAndResize = async ({
    producerId,
    kind,
    parameters,
  }: CloseAndResizeOptions): Promise<void> => {
    let { getUpdatedAllParams } = parameters;
    parameters = getUpdatedAllParams();

    let {
      allAudioStreams,
      allVideoStreams,
      activeNames,
      participants,
      streamNames,
      recordingDisplayType,
      recordingVideoOptimized,
      adminIDStream,
      newLimitedStreams,
      newLimitedStreamsIDs,
      oldAllStreams,
      shareScreenStarted,
      shared,
      meetingDisplayType,
      defer_receive,
      lock_screen,
      firstAll,
      first_round,
      gotAllVids,
      eventType,

      hostLabel,
      shareEnded,
      updateMainWindow,
      updateActiveNames,
      updateAllAudioStreams,
      updateAllVideoStreams,

      updateShareScreenStarted,
      updateUpdateMainWindow,
      updateNewLimitedStreams,
      updateOldAllStreams,
      updateDefer_receive,
      updateMainHeightWidth,
      updateShareEnded,
      updateLock_screen,
      updateFirstAll,
      updateFirst_round,

      //mediasfu functions
      reorderStreams,
      prepopulateUserMedia,
      getVideos,
      rePort,
    } = parameters;

    //function to close and resize the video and audio elements

    let participant: Participant | undefined;

    if (kind === 'audio') {
      //stop the audio by removing the miniAudio with id = producerId

      //remove the audio from the allAudioStreams array
      allAudioStreams = allAudioStreams.filter(function (audioStream) {
        return audioStream.producerId !== producerId;
      });

      updateAllAudioStreams(allAudioStreams);

      if (recordingDisplayType == 'video' && recordingVideoOptimized == true) {
        // do nothing
      } else {
        //get the name of the participant with the producerId
        participant = participants.find((obj) => obj.audioID === producerId);

        if (participant) {
          //check if the participants videoID is not null or ""
          if (participant.videoID !== null && participant.videoID !== '') {
            // do nothing
          } else {
            //remove the participant from the activeNames array
            activeNames = activeNames.filter(function (name) {
              return name !== participant?.name;
            });
            updateActiveNames(activeNames);
          }
        }
      }

      let checker = false;
      let alt_checker = false;

      if (meetingDisplayType == 'video' && participant) {
        checker =
          participant[0].videoID != null &&
          participant[0].videoID != '' &&
          participant[0].videoID != undefined;
      } else {
        checker = true;
        alt_checker = true;
      }

      if (checker) {
        if (shareScreenStarted || shared) {
          if (!alt_checker) {
            await reorderStreams({ parameters });
          }
        } else {
          if (alt_checker && meetingDisplayType != 'video') {
            await reorderStreams({ add: false, screenChanged: true, parameters });
          }
        }
      }
    } else if (kind === 'video') {
      //update the video elements by removing the miniVideo with id = producerId
      //remove the video from the allVideoStreams array

      //check if producerId == adminidstream
      if (producerId == adminIDStream) {
        updateMainWindow = true;
        updateUpdateMainWindow(updateMainWindow);
      }

      try {
        allVideoStreams = allVideoStreams.filter(function (videoStream) {
          return videoStream.producerId !== producerId;
        });

        updateAllVideoStreams(allVideoStreams);

        try {
          //try remove it from oldVideoStreams
          oldAllStreams = oldAllStreams.filter(function (videoStream) {
            return videoStream.producerId !== producerId;
          });

          updateOldAllStreams(oldAllStreams);
        } catch {
          /* handle error */
        }

        try {
          //try remove it from newLimitedStreams
          newLimitedStreams = newLimitedStreams.filter(function (videoStream) {
            return videoStream.producerId !== producerId;
          });

          updateNewLimitedStreams(newLimitedStreams);
        } catch {
          /* handle error */
        }
      } catch (error) {
        try {
          //try remove it from oldVideoStreams
          oldAllStreams = oldAllStreams.filter(function (videoStream) {
            return videoStream.producerId !== producerId;
          });
          updateOldAllStreams(oldAllStreams);
        } catch {
          /* handle error */
        }
      }

      try {
        //remove the participant from activeNames
        activeNames = activeNames.filter(function (name) {
          //get the participant with the producerId
          let participant = streamNames.find((obj) => obj.producerId === producerId);

          return name !== (participant?.name ?? '');
        });

        updateActiveNames(activeNames);
      } catch {
        /* handle error */
      }

      if (lock_screen) {
        defer_receive = true;
        // check if the video is the one being displayed (i.e. (newLimitedStreamsIDs))
        if (newLimitedStreamsIDs.includes(producerId)) {
          await prepopulateUserMedia({ name: hostLabel, parameters });
          await reorderStreams({ add: false, screenChanged: true, parameters });
        }
      } else {
        await prepopulateUserMedia({ name: hostLabel, parameters });
        await reorderStreams({ add: false, screenChanged: true, parameters });
      }
    } else if (kind === 'screenshare' || kind === 'screen') {
      //update the video elements by removing the mainVideo with id = producerId
      updateMainWindow = true;

      //screenshare stuff
      shareScreenStarted = false;
      shareEnded = true;

      lock_screen = false;
      firstAll = false;
      first_round = false;

      updateUpdateMainWindow(updateMainWindow);
      updateShareScreenStarted(shareScreenStarted);
      updateShareEnded(shareEnded);
      updateLock_screen(lock_screen);
      updateFirstAll(firstAll);
      updateFirst_round(first_round);

      if (!gotAllVids || defer_receive) {
        defer_receive = false;
        updateDefer_receive(defer_receive);
        await getVideos({
          participants,
          allVideoStreams,
          oldAllStreams,
          updateAllVideoStreams,
          updateOldAllStreams,
        });
        await rePort({ parameters });
      }

      if (eventType == 'conference') {
        updateMainHeightWidth(0);
      }

      await prepopulateUserMedia({ name: hostLabel, parameters });
      await reorderStreams({ add: false, screenChanged: true, parameters });
    }
  };
}
