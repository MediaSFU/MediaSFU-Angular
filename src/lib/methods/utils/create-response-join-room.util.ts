import { ResponseJoinLocalRoom, ResponseJoinRoom } from "../../@types/types";

export interface CreateResponseJoinRoomOptions {
  localRoom: ResponseJoinLocalRoom;
}

// Export the type definition for the function
export type CreateResponseJoinRoomType = (options: CreateResponseJoinRoomOptions) => Promise<ResponseJoinRoom>;

/**
 * Creates a ResponseJoinRoom object from a ResponseJoinLocalRoom object.
 *
 * @param {CreateResponseJoinRoomOptions} options - The options containing the ResponseJoinLocalRoom object.
 * @returns {Promise<ResponseJoinRoom>} - A promise that resolves to a ResponseJoinRoom object.
 *
 * @example
 * ```typescript
 * const localRoom: ResponseJoinLocalRoom = {
 *   rtpCapabilities: null,
 *   isHost: true,
 *   eventStarted: false,
 *   isBanned: false,
 *   hostNotJoined: false,
 *   eventRoomParams: { /* MeetingRoomParams * / },
 *   recordingParams: { /* RecordingParams * / },
 *   secureCode: "12345",
 *   mediasfuURL: "https://example.com",
 *   apiKey: "api-key",
 *   apiUserName: "user-name",
 *   allowRecord: true,
 * };
 *
 * const joinRoom = await createResponseJoinRoom({ localRoom });
 * console.log(joinRoom);
 * ```
 */

export const createResponseJoinRoom: CreateResponseJoinRoomType = async ({
  localRoom,
}: CreateResponseJoinRoomOptions): Promise<ResponseJoinRoom> => {
  return {
    rtpCapabilities: localRoom.rtpCapabilities ?? null,
    success: localRoom.rtpCapabilities !== null,
    roomRecvIPs: [], // Placeholder; populate with necessary values
    meetingRoomParams: localRoom.eventRoomParams,
    recordingParams: localRoom.recordingParams,
    secureCode: localRoom.secureCode,
    recordOnly: false, // Default assumption unless additional logic applies
    isHost: localRoom.isHost,
    safeRoom: false, // Default assumption unless additional logic applies
    autoStartSafeRoom: false, // Default assumption unless additional logic applies
    safeRoomStarted: false, // Default assumption unless additional logic applies
    safeRoomEnded: false, // Default assumption unless additional logic applies
    reason: localRoom.isBanned ? "User is banned from the room." : undefined,
    banned: localRoom.isBanned,
    suspended: false, // Default assumption unless additional logic applies
    noAdmin: localRoom.hostNotJoined,
  };
};
