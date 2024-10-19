import { Injectable } from '@angular/core';
import {
  Stream,
  Participant,
  DispStreamsType,
  DispStreamsParameters,
  AudioDecibels,
  MixStreamsType,
  BreakoutParticipant,
  EventType,
} from '../@types/types';

export interface ChangeVidsParameters extends DispStreamsParameters {
  allVideoStreams: (Stream | Participant)[];
  p_activeNames: string[];
  activeNames: string[];
  dispActiveNames: string[];
  shareScreenStarted: boolean;
  shared: boolean;
  newLimitedStreams: (Stream | Participant)[];
  non_alVideoStreams: Participant[];
  ref_participants: Participant[];
  participants: Participant[];
  eventType: EventType;
  islevel: string;
  member: string;
  sortAudioLoudness: boolean;
  audioDecibels: AudioDecibels[];
  mixed_alVideoStreams: (Stream | Participant)[];
  non_alVideoStreams_muted: Participant[];
  remoteProducerId?: string;
  localStreamVideo: MediaStream | null;
  oldAllStreams: (Stream | Participant)[];
  screenPageLimit: number;
  meetingDisplayType: string;
  meetingVideoOptimized: boolean;
  recordingVideoOptimized: boolean;
  recordingDisplayType: 'video' | 'media' | 'all';
  paginatedStreams: (Stream | Participant)[][];
  itemPageLimit: number;
  doPaginate: boolean;
  prevDoPaginate: boolean;
  currentUserPage: number;
  breakoutRooms: BreakoutParticipant[][];
  hostNewRoom: number;
  breakOutRoomStarted: boolean;
  breakOutRoomEnded: boolean;
  virtualStream: MediaStream | null;
  mainRoomsLength: number;
  memberRoom: number;
  updateP_activeNames: (names: string[]) => void;
  updateActiveNames: (names: string[]) => void;
  updateDispActiveNames: (names: string[]) => void;
  updateNewLimitedStreams: (streams: (Stream | Participant)[]) => void;
  updateNon_alVideoStreams: (participants: Participant[]) => void;
  updateRef_participants: (participants: Participant[]) => void;
  updateSortAudioLoudness: (sort: boolean) => void;
  updateMixed_alVideoStreams: (streams: (Stream | Participant)[]) => void;
  updateNon_alVideoStreams_muted: (participants: Participant[]) => void;
  updatePaginatedStreams: (streams: (Stream | Participant)[][]) => void;
  updateDoPaginate: (paginate: boolean) => void;
  updatePrevDoPaginate: (paginate: boolean) => void;
  updateCurrentUserPage: (page: number) => void;
  updateNumberPages: (pages: number) => void;
  updateMainRoomsLength: (length: number) => void;
  updateMemberRoom: (room: number) => void;

  // mediasfu functions
  mixStreams: MixStreamsType;
  dispStreams: DispStreamsType;
  getUpdatedAllParams: () => ChangeVidsParameters;
  [key: string]: any;
}

export interface ChangeVidsOptions {
  screenChanged?: boolean;
  parameters: ChangeVidsParameters;
}

// Export the type definition for the function
export type ChangeVidsType = (options: ChangeVidsOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class ChangeVids {
  /**
   * Asynchronously changes the video streams based on the provided options.
   *
   * @param {Object} options - The options for changing video streams.
   * @param {boolean} [options.screenChanged=false] - Indicates if the screen has changed.
   * @param {ChangeVidsOptions} options.parameters - The parameters for changing video streams.
   * @returns {Promise<void>} A promise that resolves when the video streams have been changed.
   *
   * @typedef {Object} ChangeVidsOptions
   * @property {Function} getUpdatedAllParams - Function to get updated parameters.
   * @property {Array} allVideoStreams - Array of all video streams.
   * @property {Array} p_activeNames - Array of active participant names.
   * @property {Array} activeNames - Array of active names.
   * @property {Array} dispActiveNames - Array of displayed active names.
   * @property {boolean} shareScreenStarted - Indicates if screen sharing has started.
   * @property {boolean} shared - Indicates if the screen is shared.
   * @property {Array} newLimitedStreams - Array of new limited streams.
   * @property {Array} non_alVideoStreams - Array of non-al video streams.
   * @property {Array} ref_participants - Array of reference participants.
   * @property {Array} participants - Array of participants.
   * @property {string} eventType - Type of the event.
   * @property {string} islevel - Level of the participant.
   * @property {string} member - Name of the member.
   * @property {boolean} sortAudioLoudness - Indicates if audio loudness should be sorted.
   * @property {Array} audioDecibels - Array of audio decibels.
   * @property {Array} mixed_alVideoStreams - Array of mixed al video streams.
   * @property {Array} non_alVideoStreams_muted - Array of muted non-al video streams.
   * @property {string} remoteProducerId - ID of the remote producer.
   * @property {Object} localStreamVideo - Local stream video object.
   * @property {Array} oldAllStreams - Array of old all streams.
   * @property {number} screenPageLimit - Limit of streams per screen page.
   * @property {string} meetingDisplayType - Type of meeting display.
   * @property {boolean} meetingVideoOptimized - Indicates if meeting video is optimized.
   * @property {boolean} recordingVideoOptimized - Indicates if recording video is optimized.
   * @property {string} recordingDisplayType - Type of recording display.
   * @property {Array} paginatedStreams - Array of paginated streams.
   * @property {number} itemPageLimit - Limit of items per page.
   * @property {boolean} doPaginate - Indicates if pagination should be done.
   * @property {boolean} prevDoPaginate - Indicates if pagination was previously done.
   * @property {number} currentUserPage - Current user page number.
   * @property {Array} breakoutRooms - Array of breakout rooms.
   * @property {number} hostNewRoom - Index of the new room for the host.
   * @property {boolean} breakOutRoomStarted - Indicates if breakout room has started.
   * @property {boolean} breakOutRoomEnded - Indicates if breakout room has ended.
   * @property {Object} virtualStream - Virtual stream object.
   * @property {number} mainRoomsLength - Length of main rooms.
   * @property {string} memberRoom - Room of the member.
   * @property {Function} updateP_activeNames - Function to update active participant names.
   * @property {Function} updateActiveNames - Function to update active names.
   * @property {Function} updateDispActiveNames - Function to update displayed active names.
   * @property {Function} updateNewLimitedStreams - Function to update new limited streams.
   * @property {Function} updateNon_alVideoStreams - Function to update non-al video streams.
   * @property {Function} updateRef_participants - Function to update reference participants.
   * @property {Function} updateSortAudioLoudness - Function to update audio loudness sorting.
   * @property {Function} updateMixed_alVideoStreams - Function to update mixed al video streams.
   * @property {Function} updateNon_alVideoStreams_muted - Function to update muted non-al video streams.
   * @property {Function} updatePaginatedStreams - Function to update paginated streams.
   * @property {Function} updateDoPaginate - Function to update pagination status.
   * @property {Function} updatePrevDoPaginate - Function to update previous pagination status.
   * @property {Function} updateCurrentUserPage - Function to update current user page.
   * @property {Function} updateNumberPages - Function to update number of pages.
   * @property {Function} updateMainRoomsLength - Function to update main rooms length.
   * @property {Function} updateMemberRoom - Function to update member room.
   * @property {Function} mixStreams - Function to mix streams.
   * @property {Function} dispStreams - Function to display streams.
   */
  changeVids = async ({ screenChanged = false, parameters }: ChangeVidsOptions): Promise<void> => {
    let { getUpdatedAllParams } = parameters;
    parameters = getUpdatedAllParams();

    let {
      allVideoStreams,
      p_activeNames,
      activeNames,
      dispActiveNames,
      shareScreenStarted,
      shared,
      newLimitedStreams,
      non_alVideoStreams,
      ref_participants,
      participants,
      eventType,
      islevel,
      member,
      sortAudioLoudness,
      audioDecibels,
      mixed_alVideoStreams,
      non_alVideoStreams_muted,
      remoteProducerId,
      localStreamVideo,
      oldAllStreams,
      screenPageLimit,
      meetingDisplayType,
      meetingVideoOptimized,
      recordingVideoOptimized,
      recordingDisplayType,
      paginatedStreams,
      itemPageLimit,
      doPaginate,
      prevDoPaginate,
      currentUserPage,

      breakoutRooms,
      hostNewRoom,
      breakOutRoomStarted,
      breakOutRoomEnded,
      virtualStream,
      mainRoomsLength,
      memberRoom,

      updateP_activeNames,
      updateActiveNames,
      updateDispActiveNames,
      updateNewLimitedStreams,
      updateNon_alVideoStreams,
      updateRef_participants,
      updateSortAudioLoudness,
      updateMixed_alVideoStreams,
      updateNon_alVideoStreams_muted,
      updatePaginatedStreams,
      updateDoPaginate,
      updatePrevDoPaginate,
      updateCurrentUserPage,
      updateNumberPages,

      updateMainRoomsLength,
      updateMemberRoom,

      // mediasfu functions
      mixStreams,
      dispStreams,
    } = parameters;

    try {
      let alVideoStreams = [...allVideoStreams];
      p_activeNames = [...activeNames];

      let streame;

      if (shareScreenStarted || shared) {
        alVideoStreams = [...newLimitedStreams];
        activeNames = [];
      }

      activeNames = [];
      dispActiveNames = [];
      ref_participants = participants;

      let temp = alVideoStreams;

      await Promise.all(
        temp.map(async (stream) => {
          let participant = ref_participants.find((obj) => obj.videoID === stream.producerId);
          if (!participant && stream.producerId !== 'youyou' && stream.producerId !== 'youyouyou') {
            alVideoStreams = alVideoStreams.filter((obj) => obj.producerId !== stream.producerId);
          }
        }),
      );

      if (eventType === 'broadcast' || eventType === 'chat') {
        sortAudioLoudness = false;
      }

      if (shareScreenStarted || shared) {
        non_alVideoStreams = [];
        non_alVideoStreams_muted = [];
        mixed_alVideoStreams = [];
      } else {
        if (alVideoStreams.length > screenPageLimit) {
          alVideoStreams = alVideoStreams.filter(
            (obj) => obj.producerId !== 'youyou' && obj.producerId !== 'youyouyou',
          );

          ref_participants = ref_participants.sort((a, b) =>
            (a.muted ?? false) > (b.muted ?? false) ? 1 : -1,
          );

          let temp: (Stream | Participant)[] = [];
          await Promise.all(
            ref_participants.map((participant) => {
              let stream = alVideoStreams.find((obj) => obj.producerId === participant.videoID);
              if (stream) {
                temp.push(stream);
              }
            }),
          );

          alVideoStreams = temp;

          let youyou = allVideoStreams.find((obj) => obj.producerId === 'youyou');
          if (!youyou) {
            let youyouyou = allVideoStreams.find((obj) => obj.producerId === 'youyouyou');
            if (youyouyou) {
              alVideoStreams.unshift(youyouyou);
            }
          } else {
            if (youyou) {
              alVideoStreams.unshift(youyou);
            }
          }
        }

        const admin = participants.filter((participant) => participant.islevel === '2');
        let adminName = '';
        if (admin.length > 0) {
          adminName = admin[0].name || '';
        }

        non_alVideoStreams = [];

        await Promise.all(
          ref_participants.map(async (participant) => {
            let stream = alVideoStreams.find((obj) => obj.producerId === participant.videoID);
            if (eventType !== 'chat' && eventType !== 'conference') {
              if (
                !stream &&
                participant.name !== member &&
                !participant['muted'] &&
                participant.name !== adminName
              ) {
                non_alVideoStreams.push(participant);
              }
            } else {
              if (!stream && participant.name !== member && !participant['muted']) {
                non_alVideoStreams.push(participant);
              }
            }
          }),
        );

        if (sortAudioLoudness) {
          non_alVideoStreams.sort((a, b) => {
            const avgLoudnessA =
              audioDecibels.find((obj) => obj.name === a.name)?.averageLoudness || 127;
            const avgLoudnessB =
              audioDecibels.find((obj) => obj.name === b.name)?.averageLoudness || 127;
            return avgLoudnessB - avgLoudnessA;
          });

          if (
            !(meetingDisplayType === 'video' && meetingVideoOptimized) ||
            !(recordingVideoOptimized && recordingDisplayType === 'video')
          ) {
            mixed_alVideoStreams = await mixStreams({
              alVideoStreams,
              non_alVideoStreams,
              ref_participants,
            });
          }
        }

        non_alVideoStreams_muted = [];
        await Promise.all(
          ref_participants.map(async (participant) => {
            let stream = alVideoStreams.find((obj) => obj.producerId === participant.videoID);
            if (eventType !== 'chat' && eventType !== 'conference') {
              if (
                !stream &&
                participant.name !== member &&
                participant['muted'] &&
                participant.name !== adminName
              ) {
                non_alVideoStreams_muted.push(participant);
              }
            } else {
              if (!stream && participant.name !== member && participant['muted']) {
                non_alVideoStreams_muted.push(participant);
              }
            }
          }),
        );
      }

      if (eventType === 'conference' && islevel !== '2') {
        let host = participants.find((obj) => obj.islevel === '2');
        if (host) {
          if (host.videoID) {
            remoteProducerId = host.videoID;
          }
          if (islevel === '2') {
            host['stream'] = virtualStream || localStreamVideo;
          } else {
            let hostVideo = alVideoStreams.find((obj) => obj.producerId === remoteProducerId);
            if (!hostVideo) {
              streame = oldAllStreams.find((streame) => streame.producerId === remoteProducerId);
              if (streame) {
                alVideoStreams = alVideoStreams.filter((obj) => obj.producerId !== host.videoID);
                non_alVideoStreams = non_alVideoStreams.filter((obj) => obj.name !== host.name);
                non_alVideoStreams_muted = non_alVideoStreams_muted.filter(
                  (obj) => obj.name !== host.name,
                );
                if (sortAudioLoudness) {
                  mixed_alVideoStreams = mixed_alVideoStreams.filter(
                    (obj) => obj.name !== host.name,
                  );
                  non_alVideoStreams_muted = non_alVideoStreams_muted.filter(
                    (obj) => obj.name !== host.name,
                  );
                  if (meetingDisplayType == 'video' && meetingVideoOptimized) {
                    alVideoStreams.unshift(streame);
                  } else {
                    mixed_alVideoStreams.unshift(streame);
                  }
                } else {
                  alVideoStreams.unshift(streame);
                }
              } else {
                await Promise.all(
                  ref_participants.map(async (participant) => {
                    let stream = alVideoStreams.find(
                      (obj) =>
                        obj.producerId == participant.videoID && participant.name == host.name,
                    );
                    if (stream) {
                      if (sortAudioLoudness) {
                        mixed_alVideoStreams = mixed_alVideoStreams.filter(
                          (obj) => obj.name !== host.name,
                        );
                        non_alVideoStreams_muted = non_alVideoStreams_muted.filter(
                          (obj) => obj.name !== host.name,
                        );
                        mixed_alVideoStreams.unshift(participant);
                      } else {
                        non_alVideoStreams = non_alVideoStreams.filter(
                          (obj) => obj.name !== host.name,
                        );
                        non_alVideoStreams.unshift(participant);
                        return;
                      }
                    }
                  }),
                );
              }
            }
          }
        }
      }

      let allStreamsPaged: (Stream | Participant)[] = [];
      if (sortAudioLoudness) {
        if (meetingDisplayType === 'video') {
          if (meetingVideoOptimized) {
            allStreamsPaged = [...alVideoStreams];
          } else {
            allStreamsPaged = [...mixed_alVideoStreams];
          }
        } else if (meetingDisplayType === 'media') {
          allStreamsPaged = [...mixed_alVideoStreams];
        } else if (meetingDisplayType === 'all') {
          allStreamsPaged = [...mixed_alVideoStreams, ...non_alVideoStreams_muted];
        }
      } else {
        if (meetingDisplayType === 'video') {
          allStreamsPaged = [...alVideoStreams];
        } else if (meetingDisplayType === 'media') {
          allStreamsPaged = [...alVideoStreams, ...non_alVideoStreams];
        } else if (meetingDisplayType === 'all') {
          allStreamsPaged = [...alVideoStreams, ...non_alVideoStreams, ...non_alVideoStreams_muted];
        }
      }

      paginatedStreams = [];
      let limit = itemPageLimit;

      if (shareScreenStarted || shared) {
        limit = screenPageLimit;
      }

      let firstPage: (Stream | Participant)[] = [];
      let page: (Stream | Participant)[] = [];
      let limit_ = limit + 1;

      if (eventType === 'conference' && !shared && !shareScreenStarted) {
        limit_ = limit_ - 1;
      }

      // Create pagination
      let memberInRoom = false;
      let filterHost = false;
      if (breakOutRoomStarted && !breakOutRoomEnded) {
        let tempBreakoutRooms = JSON.parse(JSON.stringify(breakoutRooms));
        let host = participants.find((obj) => obj.islevel == '2');
        for (let room of tempBreakoutRooms) {
          try {
            let currentStreams = [];
            const roomIndex = tempBreakoutRooms.indexOf(room);
            if (hostNewRoom != -1 && roomIndex == hostNewRoom) {
              if (host) {
                if (!room.map((obj: any) => obj.name).includes(host.name)) {
                  room = [...room, { name: host.name, breakRoom: roomIndex }];
                  filterHost = true;
                }
              }
            }
            for (let participant of room) {
              if (participant.name == member && !memberInRoom) {
                memberInRoom = true;
                memberRoom = participant.breakRoom;
                updateMemberRoom(memberRoom);
              }
              let streams = allStreamsPaged.filter((stream) => {
                if (
                  (Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
                    stream.producerId != null &&
                    stream.producerId !== '') ||
                  (Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
                    stream['audioID'] != null &&
                    stream['audioID'] !== '')
                ) {
                  let producerId = stream.producerId || stream['audioID'];
                  let matchingParticipant = ref_participants.find(
                    (obj) =>
                      obj['audioID'] === producerId ||
                      obj.videoID === producerId ||
                      ((producerId == 'youyou' || producerId == 'youyouyou') &&
                        member == participant.name),
                  );
                  return (
                    (matchingParticipant && matchingParticipant.name === participant.name) ||
                    (participant.name == member &&
                      (producerId == 'youyou' || producerId == 'youyouyou'))
                  );
                } else {
                  return (
                    Object.prototype.hasOwnProperty.call(stream, 'name') &&
                    stream.name == participant.name
                  );
                }
              });
              for (let stream of streams) {
                if (currentStreams.length < limit_) {
                  currentStreams.push(stream);
                }
              }
            }
            paginatedStreams.push(currentStreams);
          } catch {
            /* handle error */
          }
        }

        let remainingStreams = allStreamsPaged.filter((stream) => {
          if (
            (Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
              stream.producerId != null &&
              stream.producerId !== '') ||
            (Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
              stream['audioID'] != null &&
              stream['audioID'] !== '')
          ) {
            let producerId = stream.producerId || stream['audioID'];
            let matchingParticipant = ref_participants.find(
              (obj) =>
                obj['audioID'] === producerId ||
                obj.videoID === producerId ||
                ((producerId == 'youyou' || producerId == 'youyouyou') && member == obj.name),
            );
            return (
              matchingParticipant &&
              !breakoutRooms
                .flat()
                .map((obj) => obj.name)
                .includes(matchingParticipant.name) &&
              (!filterHost || matchingParticipant.name != host?.name)
            );
          } else {
            return (
              !breakoutRooms
                .flat()
                .map((obj) => obj.name)
                .includes(stream.name ?? '') &&
              (!filterHost || stream.name != host?.name)
            );
          }
        });

        if (memberInRoom) {
          let memberStream = allStreamsPaged.find((stream) => {
            if (
              Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
              stream.producerId != null &&
              stream.producerId !== ''
            ) {
              return stream.producerId == 'youyou' || stream.producerId == 'youyouyou';
            }
            return false; // Add a return statement here
          });
          if (memberStream && !remainingStreams.includes(memberStream)) {
            remainingStreams.unshift(memberStream);
          }
        }
        let remainingPaginatedStreams = [];

        if (remainingStreams.length > 0) {
          firstPage = remainingStreams.slice(0, limit_);
          remainingPaginatedStreams.push(firstPage);
          for (let i = limit_; i < remainingStreams.length; i += limit) {
            page = remainingStreams.slice(i, i + limit);
            remainingPaginatedStreams.push(page);
          }
        }

        mainRoomsLength = remainingPaginatedStreams.length;
        updateMainRoomsLength(mainRoomsLength);
        // Add the remaining streams to the beginning of the paginatedStreams
        for (let i = remainingPaginatedStreams.length - 1; i >= 0; i--) {
          paginatedStreams.unshift(remainingPaginatedStreams[i]);
        }
      } else {
        firstPage = allStreamsPaged.slice(0, limit_);
        paginatedStreams.push(firstPage);

        for (let i = limit_; i < allStreamsPaged.length; i += limit) {
          page = allStreamsPaged.slice(i, i + limit);
          paginatedStreams.push(page);
        }
      }

      // State updates
      updateP_activeNames(p_activeNames);
      updateActiveNames(activeNames);
      updateDispActiveNames(dispActiveNames);
      updateNewLimitedStreams(newLimitedStreams);
      updateNon_alVideoStreams(non_alVideoStreams);
      updateRef_participants(ref_participants);
      updateSortAudioLoudness(sortAudioLoudness);
      updateMixed_alVideoStreams(mixed_alVideoStreams);
      updateNon_alVideoStreams_muted(non_alVideoStreams_muted);
      updatePaginatedStreams(paginatedStreams);

      prevDoPaginate = doPaginate;
      doPaginate = false;
      updatePrevDoPaginate(prevDoPaginate);
      updateDoPaginate(doPaginate);

      let isActive = false;

      if (paginatedStreams.length > 1) {
        if (!shareScreenStarted && !shared) {
          doPaginate = true;
        }
        updateDoPaginate(doPaginate);

        if (currentUserPage > paginatedStreams.length - 1) {
          if (breakOutRoomStarted && !breakOutRoomEnded) {
            currentUserPage = 0;
          } else {
            currentUserPage = paginatedStreams.length - 1;
          }
        } else if (currentUserPage == 0) {
          isActive = true;
        }
        updateCurrentUserPage(currentUserPage);
        updateNumberPages(paginatedStreams.length - 1);

        if (screenChanged) {
          await dispStreams({
            lStreams: paginatedStreams[0],
            ind: 0,
            parameters,
          });
        } else {
          await dispStreams({
            lStreams: paginatedStreams[0],
            ind: 0,
            auto: true,
            parameters,
          });
        }

        if (!isActive) {
          const currentPageBreak = currentUserPage - mainRoomsLength;
          await dispStreams({
            lStreams: paginatedStreams[currentUserPage],
            ind: currentUserPage,
            parameters,
            breakRoom: currentPageBreak,
            inBreakRoom: currentPageBreak >= 0,
          });
        }
      } else {
        currentUserPage = 0;
        updateCurrentUserPage(currentUserPage);

        if (screenChanged) {
          await dispStreams({
            lStreams: paginatedStreams[0],
            ind: 0,
            parameters,
          });
        } else {
          await dispStreams({
            lStreams: paginatedStreams[0],
            ind: 0,
            auto: true,
            parameters,
          });
        }
      }
    } catch (error) {
      console.log('changeVids error', error);
    }
  };
}
