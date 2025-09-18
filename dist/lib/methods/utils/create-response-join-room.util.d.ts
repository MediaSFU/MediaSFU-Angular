import { ResponseJoinLocalRoom, ResponseJoinRoom } from "../../@types/types";
export interface CreateResponseJoinRoomOptions {
    localRoom: ResponseJoinLocalRoom;
}
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
export declare const createResponseJoinRoom: CreateResponseJoinRoomType;
