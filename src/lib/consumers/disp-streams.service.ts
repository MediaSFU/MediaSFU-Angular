import { Injectable } from '@angular/core';

import {
  Stream,
  Participant,
  Transport,
  PrepopulateUserMediaParameters,
  PrepopulateUserMediaType,
  RePortParameters,
  RePortType,
  ProcessConsumerTransportsParameters,
  ProcessConsumerTransportsType,
  ResumePauseStreamsParameters,
  ResumePauseStreamsType,
  ReadjustParameters,
  ReadjustType,
  AddVideosGridType,
  AddVideosGridParameters,
  GetEstimateType,
  CheckGridType,
  ResumePauseAudioStreamsParameters,
  ResumePauseAudioStreamsType,
  GetEstimateParameters,
  EventType,
} from '../@types/types';

export interface DispStreamsParameters
  extends PrepopulateUserMediaParameters,
    RePortParameters,
    ProcessConsumerTransportsParameters,
    ResumePauseStreamsParameters,
    ReadjustParameters,
    ResumePauseAudioStreamsParameters,
    GetEstimateParameters,
    AddVideosGridParameters {
  consumerTransports: Transport[];
  streamNames: Stream[];
  audStreamNames: Stream[];
  participants: Participant[];
  ref_participants: Participant[];
  recordingDisplayType: 'video' | 'media' | 'all';
  recordingVideoOptimized: boolean;
  meetingDisplayType: string;
  meetingVideoOptimized: boolean;
  currentUserPage: number;
  hostLabel: string;
  mainHeightWidth: number;
  prevMainHeightWidth: number;
  prevDoPaginate: boolean;
  doPaginate: boolean;
  firstAll: boolean;
  shared: boolean;
  shareScreenStarted: boolean;
  shareEnded: boolean;
  oldAllStreams: (Stream | Participant)[];
  updateMainWindow: boolean;
  remoteProducerId?: string;
  activeNames: string[];
  dispActiveNames: string[];
  p_dispActiveNames: string[];
  nForReadjustRecord: number;
  first_round: boolean;
  lock_screen: boolean;
  chatRefStreams: (Stream | Participant)[];
  eventType: EventType;
  islevel: string;
  localStreamVideo: MediaStream | null;

  breakOutRoomStarted: boolean;
  breakOutRoomEnded: boolean;
  keepBackground: boolean;
  virtualStream: MediaStream | null;

  updateActiveNames: (names: string[]) => void;
  updateDispActiveNames: (names: string[]) => void;
  updateLStreams: (streams: (Stream | Participant)[]) => void;
  updateChatRefStreams: (streams: (Stream | Participant)[]) => void;
  updateNForReadjustRecord: (n: number) => void;
  updateUpdateMainWindow: (value: boolean) => void;
  updateShowMiniView: (value: boolean) => void;

  // mediasfu functions
  prepopulateUserMedia: PrepopulateUserMediaType;
  rePort: RePortType;
  processConsumerTransports: ProcessConsumerTransportsType;
  resumePauseStreams: ResumePauseStreamsType;
  readjust: ReadjustType;
  addVideosGrid: AddVideosGridType;
  getEstimate: GetEstimateType;
  checkGrid: CheckGridType;
  resumePauseAudioStreams: ResumePauseAudioStreamsType;

  getUpdatedAllParams: () => DispStreamsParameters;
  [key: string]: any;
}

export interface DispStreamsOptions {
  lStreams: (Stream | Participant)[];
  ind: number;
  auto?: boolean;
  ChatSkip?: boolean;
  forChatCard?: any;
  forChatID?: any;
  parameters: DispStreamsParameters;
  breakRoom?: number;
  inBreakRoom?: boolean;
}

// Export the type definition for the function
export type DispStreamsType = (options: DispStreamsOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class DispStreams {
  /**
   * Function to display streams based on various parameters and conditions.
   *
   * @param {Object} options - The options object.
   * @param {Array} options.lStreams - List of streams.
   * @param {number} options.ind - Index of the current stream.
   * @param {boolean} [options.auto=false] - Flag to indicate if the function should run automatically.
   * @param {boolean} [options.ChatSkip=false] - Flag to indicate if chat should be skipped.
   * @param {string|null} [options.forChatID=null] - ID for chat reference.
   * @param {Object} options.parameters - Parameters object containing various settings and functions.
   * @param {number} [options.breakRoom=-1] - Break room number.
   * @param {boolean} [options.inBreakRoom=false] - Flag to indicate if in break room.
   *
   * @returns {Promise<void>} - A promise that resolves when the function completes.
   *
   * @async
   */
  dispStreams = async ({
    lStreams,
    ind,
    auto = false,
    ChatSkip = false,
    forChatID = null,
    parameters,
    breakRoom = -1,
    inBreakRoom = false,
  }: DispStreamsOptions): Promise<void> => {
    // function to display streams
    let { getUpdatedAllParams } = parameters;
    parameters = getUpdatedAllParams();

    let {
      consumerTransports,
      streamNames,
      audStreamNames,
      participants,
      ref_participants,
      recordingDisplayType,
      recordingVideoOptimized,
      meetingDisplayType,
      meetingVideoOptimized,
      currentUserPage,
      hostLabel,
      mainHeightWidth,
      prevMainHeightWidth,
      prevDoPaginate,
      doPaginate,
      firstAll,
      shared,
      shareScreenStarted,
      shareEnded,
      oldAllStreams,
      updateMainWindow,
      remoteProducerId,
      activeNames,
      dispActiveNames,
      p_dispActiveNames,
      nForReadjustRecord,
      first_round,
      lock_screen,
      chatRefStreams,
      eventType,
      islevel,
      localStreamVideo,

      breakOutRoomStarted,
      breakOutRoomEnded,
      keepBackground,
      virtualStream,

      updateActiveNames,
      updateDispActiveNames,
      updateLStreams,
      updateChatRefStreams,
      updateNForReadjustRecord,
      updateUpdateMainWindow,
      updateShowMiniView,

      prepopulateUserMedia,
      rePort,
      processConsumerTransports,
      resumePauseStreams,
      readjust,
      addVideosGrid,
      checkGrid,
      getEstimate,
      resumePauseAudioStreams,
    } = parameters;

    let proceed = true;

    let lStreams_ = lStreams.filter(
      (stream) => stream.producerId !== 'youyou' && stream.producerId !== 'youyouyou',
    );
    lStreams_ = lStreams_.filter(
      (stream) =>
        stream.id !== 'youyou' &&
        stream.id !== 'youyouyou' &&
        stream.name !== 'youyou' &&
        stream.name !== 'youyouyou',
    );

    if (eventType === 'chat') {
      proceed = true;
    } else if (ind === 0 || (islevel !== '2' && currentUserPage === ind)) {
      proceed = false;

      lStreams_.forEach((stream) => {
        let checker = false;
        let check_level = 0;

        if (recordingDisplayType === 'video') {
          if (recordingVideoOptimized) {
            if (
              Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
              stream.producerId != null &&
              stream.producerId !== ''
            ) {
              checker = true;
              check_level = 0;
            }
          } else {
            if (
              (Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
                stream.producerId != null &&
                stream.producerId !== '') ||
              (Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
                stream.audioID != null &&
                stream.audioID !== '')
            ) {
              checker = true;
              check_level = 1;
            }
          }
        } else if (recordingDisplayType === 'media') {
          if (
            (Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
              stream.producerId != null &&
              stream.producerId !== '') ||
            (Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
              stream.audioID != null &&
              stream.audioID !== '')
          ) {
            checker = true;
            check_level = 1;
          }
        } else {
          if (
            (Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
              stream.producerId != null &&
              stream.producerId !== '') ||
            (Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
              stream.audioID != null &&
              stream.audioID !== '') ||
            (Object.prototype.hasOwnProperty.call(stream, 'name') &&
              stream.name !== null &&
              stream.name != '')
          ) {
            checker = true;
            check_level = 2;
          }
        }

        let participant;

        if (checker) {
          if (check_level === 0) {
            if (
              Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
              stream.producerId != null &&
              stream.producerId !== ''
            ) {
              participant = streamNames.find((obj: any) => obj.producerId === stream.producerId);
            }
          } else if (check_level === 1) {
            if (
              Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
              stream.producerId != null &&
              stream.producerId !== ''
            ) {
              participant = streamNames.find((obj: any) => obj.producerId === stream.producerId);
            }
            if (!participant) {
              if (
                Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
                stream.audioID != null &&
                stream.audioID !== ''
              ) {
                participant = audStreamNames.find((obj: any) => obj.producerId === stream.audioID);
                if (!participant) {
                  participant = ref_participants.find((obj: any) => obj.audioID === stream.audioID);
                }
              }
            }
          } else if (check_level === 2) {
            if (
              Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
              stream.producerId != null &&
              stream.producerId !== ''
            ) {
              participant = streamNames.find((obj: any) => obj.producerId === stream.producerId);
            }
            if (!participant) {
              if (
                Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
                stream.audioID != null &&
                stream.audioID !== ''
              ) {
                participant = audStreamNames.find((obj: any) => obj.producerId === stream.audioID);
                if (!participant) {
                  participant = ref_participants.find((obj: any) => obj.audioID === stream.audioID);
                }
              }
            }
            if (!participant) {
              if (
                Object.prototype.hasOwnProperty.call(stream, 'name') &&
                stream.name !== null &&
                stream.name != ''
              ) {
                participant = ref_participants.find((obj: any) => obj.name === stream.name);
              }
            }
          }

          if (participant) {
            if (participant.name && !activeNames.includes(participant.name)) {
              activeNames.push(participant.name);
            }
          }
        }
      });

      updateActiveNames(activeNames);

      lStreams_.forEach((stream) => {
        let disp_checker = false;
        let disp_check_level = 0;

        if (meetingDisplayType === 'video') {
          if (meetingVideoOptimized) {
            if (
              Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
              stream.producerId != null &&
              stream.producerId !== ''
            ) {
              disp_checker = true;
              disp_check_level = 0;
            }
          } else {
            if (
              (Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
                stream.producerId != null &&
                stream.producerId !== '') ||
              (Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
                stream.audioID != null &&
                stream.audioID !== '')
            ) {
              disp_checker = true;
              disp_check_level = 1;
            }
          }
        } else if (meetingDisplayType === 'media') {
          if (
            (Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
              stream.producerId != null &&
              stream.producerId !== '') ||
            (Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
              stream.audioID != null &&
              stream.audioID !== '')
          ) {
            disp_checker = true;
            disp_check_level = 1;
          }
        } else {
          if (
            (Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
              stream.producerId != null &&
              stream.producerId !== '') ||
            (Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
              stream.audioID != null &&
              stream.audioID !== '') ||
            (Object.prototype.hasOwnProperty.call(stream, 'name') &&
              stream.name !== null &&
              stream.name != '')
          ) {
            disp_checker = true;
            disp_check_level = 2;
          }
        }

        let participant_;

        if (disp_checker) {
          if (disp_check_level === 0) {
            if (
              Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
              stream.producerId != null &&
              stream.producerId !== ''
            ) {
              participant_ = streamNames.find((obj: any) => obj.producerId === stream.producerId);
            }
          } else if (disp_check_level === 1) {
            if (
              Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
              stream.producerId != null &&
              stream.producerId !== ''
            ) {
              participant_ = streamNames.find((obj: any) => obj.producerId === stream.producerId);
            }
            if (!participant_) {
              if (
                Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
                stream.audioID != null &&
                stream.audioID !== ''
              ) {
                participant_ = audStreamNames.find((obj: any) => obj.producerId === stream.audioID);
                if (!participant_) {
                  participant_ = ref_participants.find(
                    (obj: any) => obj.audioID === stream.audioID,
                  );
                }
              }
            }
          } else if (disp_check_level === 2) {
            if (
              Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
              stream.producerId != null &&
              stream.producerId !== ''
            ) {
              participant_ = streamNames.find((obj: any) => obj.producerId === stream.producerId);
            }
            if (!participant_) {
              if (
                Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
                stream.audioID != null &&
                stream.audioID !== ''
              ) {
                participant_ = audStreamNames.find((obj: any) => obj.producerId === stream.audioID);
                if (!participant_) {
                  participant_ = ref_participants.find(
                    (obj: any) => obj.audioID === stream.audioID,
                  );
                }
              }
            }
            if (!participant_) {
              if (
                Object.prototype.hasOwnProperty.call(stream, 'name') &&
                stream.name !== null &&
                stream.name != ''
              ) {
                participant_ = ref_participants.find((obj: any) => obj.name === stream.name);
              }
            }
          }

          if (participant_) {
            if (participant_.name && !dispActiveNames.includes(participant_.name)) {
              dispActiveNames.push(participant_.name);
              if (!p_dispActiveNames.includes(participant_.name)) {
                proceed = true;
              }
            }
          }
        }
      });

      updateDispActiveNames(dispActiveNames);

      if (lStreams_.length < 1) {
        if (shareScreenStarted || shared) {
          proceed = true;
        } else if (!firstAll) {
          proceed = true;
        }
      }

      if (shareScreenStarted || shared) {
        // screen share started
      } else {
        if (prevMainHeightWidth !== mainHeightWidth) {
          updateMainWindow = true;
          updateUpdateMainWindow(updateMainWindow);
        }
      }

      nForReadjustRecord = activeNames.length;
      updateNForReadjustRecord(nForReadjustRecord);
    }

    if (!proceed && auto) {
      if (updateMainWindow) {
        if (!lock_screen && !shared) {
          await prepopulateUserMedia({ name: hostLabel, parameters });
        } else {
          if (!first_round) {
            await prepopulateUserMedia({ name: hostLabel, parameters });
          }
        }
      }

      if (ind === 0 && eventType !== 'chat') {
        await rePort({ parameters });
      }
      return;
    }

    if (eventType === 'broadcast') {
      lStreams = lStreams_;
      updateLStreams(lStreams);
    } else if (eventType === 'chat') {
      if (forChatID != null) {
        lStreams = chatRefStreams;
        updateLStreams(lStreams);
      } else {
        updateShowMiniView(false);

        if (islevel !== '2') {
          let host = participants.find((obj: any) => obj.islevel === '2');
          if (host) {
            let streame;
            remoteProducerId = host.videoID;
            if (islevel === '2') {
              host['stream'] = keepBackground && virtualStream ? virtualStream : localStreamVideo;
            } else {
              streame = oldAllStreams.find(
                (streame: any) => streame.producerId === remoteProducerId,
              );
              if (streame) {
                lStreams = lStreams.filter((stream) => stream.name !== host.name);
                lStreams.push(streame);
              }
            }
          }
        }

        let youyou = lStreams.find(
          (obj: any) => obj.producerId === 'youyou' || obj.producerId === 'youyouyou',
        );
        lStreams = lStreams.filter(
          (stream) => stream.producerId !== 'youyou' && stream.producerId !== 'youyouyou',
        );
        if (youyou) {
          lStreams.push(youyou);
        }

        chatRefStreams = lStreams;
        updateLStreams(lStreams);
        updateChatRefStreams(chatRefStreams);
      }
    }

    let refLength = lStreams.length;

    const [, rows, cols] = getEstimate({ n: refLength, parameters });
    let result = (await checkGrid({ rows, cols, actives: refLength })) || [false, 0, 0, 0, 0, 0, 0];
    let [removeAltGrid, numtoaddd, numRows, numCols, , actualRows, lastrowcols] = result;

    if (ChatSkip && eventType == 'chat') {
      numRows = 1;
      numCols = 1;
      actualRows = 1;
    }

    //if removeAltGrid is true then remove everyting from altGrid and add to mainGrid,check for streams on alvideoStreams and add to mainGrid that are not on mainGrid and add switching to true

    await readjust({ n: lStreams.length, state: ind, parameters });

    // split the streams into two arrays, one for mainGrid and one for altGrid
    // take up to numtoadd from the lStreams and add to mainGridStreams
    let mainGridStreams = lStreams.slice(0, numtoaddd);
    // take the rest of the streams and add to altGridStreams
    let altGridStreams = lStreams.slice(numtoaddd, lStreams.length);
    //add to grids

    if (
      doPaginate == true ||
      prevDoPaginate != doPaginate ||
      shared ||
      shareScreenStarted ||
      shareEnded
    ) {
      let lStreams_alt = lStreams_;
      await processConsumerTransports({ consumerTransports, lStreams_: lStreams_alt, parameters });

      try {
        if (breakOutRoomStarted && !breakOutRoomEnded) {
          await resumePauseAudioStreams({ inBreakRoom, breakRoom, parameters });
        }
      } catch (error) {
        // console.log('Error in resumePauseAudioStreams:', error);
      }

      try {
        if (!breakOutRoomStarted || (breakOutRoomStarted && breakOutRoomEnded)) {
          await resumePauseStreams({ parameters });
        }
      } catch {
        /* handle error */
      }

      if (shareEnded) {
        shareEnded = false;
      }
    }

    if (ChatSkip && eventType == 'chat') {
      await addVideosGrid({
        mainGridStreams,
        altGridStreams,
        numtoadd: numtoaddd - 1,
        numRows,
        numCols,
        actualRows,
        lastrowcols,
        removeAltGrid,
        parameters,
      });
    } else {
      await addVideosGrid({
        mainGridStreams,
        altGridStreams,
        numtoadd: numtoaddd,
        numRows,
        numCols,
        actualRows,
        lastrowcols,
        removeAltGrid,
        parameters,
      });
    }

    if (updateMainWindow) {
      if (!lock_screen && !shared) {
        await prepopulateUserMedia({ name: hostLabel, parameters });
      } else {
        if (!first_round) {
          await prepopulateUserMedia({ name: hostLabel, parameters });
        }
      }
    }

    if (ind == 0 && eventType !== 'chat') {
      await rePort({ parameters });
    }
  };
}
