import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../producers/producer-emits/join-room.service";
import * as i2 from "../../producers/producer-emits/join-con-room.service";
/**
 * Facilitates joining a room by emitting the `joinRoom` event to the server through a socket connection.
 *
 * @param {JoinRoomClientOptions} options - Configuration options for joining the room.
 * @param {Socket} options.socket - The socket instance for server communication.
 * @param {string} options.roomName - The name of the room to join.
 * @param {string} options.islevel - Level identifier for the user in the room.
 * @param {string} options.member - Member identifier for the joining user.
 * @param {string} options.sec - Security token or identifier for access.
 * @param {string} options.apiUserName - API username for server authentication.
 * @param {boolean} [options.consume=false] - If `true`, joins via `joinConRoom`; otherwise, joins via `joinRoom`.
 * @returns {Promise<any>} - A promise resolving with the server response data.
 * @throws {Error} - Throws an error if the room joining attempt fails.
 *
 * @example
 * ```typescript
 * const joinRoomClient = new JoinRoomClient(joinRoomService, joinConRoomService);
 * const response = await joinRoomClient.joinRoomClient({
 *   socket: mySocket,
 *   roomName: 'myRoom',
 *   islevel: '1',
 *   member: 'user123',
 *   sec: 'secureToken',
 *   apiUserName: 'apiUser',
 *   consume: true,
 * });
 * console.log('Joined room with response:', response);
 * ```
 *
 * This example demonstrates using `joinRoomClient` to join a room, either as a consumer or a producer, based on the `consume` flag.
 */
export class JoinRoomClient {
    JoinRoomService;
    JoinConRoomService;
    constructor(JoinRoomService, JoinConRoomService) {
        this.JoinRoomService = JoinRoomService;
        this.JoinConRoomService = JoinConRoomService;
    }
    /**
     * Joins a room by emitting the `joinRoom` event to the server using the provided socket.
     *
     * @param {Object} options - The options for joining the room.
     * @param {Socket} options.socket - The socket instance to use for communication.
     * @param {string} options.roomName - The name of the room to join.
     * @param {boolean} options.islevel - The level indicator for the room.
     * @param {string} options.member - The member identifier.
     * @param {string} options.sec - The security token or identifier.
     * @param {string} options.apiUserName - The API username for authentication.
     * @param {boolean} [options.consume=false] - Flag to determine which join function to use.
     * @returns {Promise<any>} A promise that resolves with the data returned from the server.
     * @throws {Error} Throws an error if the room joining process fails.
     */
    async joinRoomClient({ socket, roomName, islevel, member, sec, apiUserName, consume = false, }) {
        try {
            let data;
            if (consume) {
                data = await this.JoinConRoomService.joinConRoom({
                    socket,
                    roomName,
                    islevel,
                    member,
                    sec,
                    apiUserName,
                });
            }
            else {
                data = await this.JoinRoomService.joinRoom({
                    socket,
                    roomName,
                    islevel,
                    member,
                    sec,
                    apiUserName,
                });
            }
            return data;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to join the room. Please check your connection and try again.');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: JoinRoomClient, deps: [{ token: i1.JoinRoom }, { token: i2.JoinConRoom }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: JoinRoomClient, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: JoinRoomClient, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.JoinRoom }, { type: i2.JoinConRoom }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pbi1yb29tLWNsaWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL3Byb2R1Y2VyLWNsaWVudC9wcm9kdWNlci1jbGllbnQtZW1pdHMvam9pbi1yb29tLWNsaWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFtQjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFLSCxNQUFNLE9BQU8sY0FBYztJQUNMO0lBQW1DO0lBQXZELFlBQW9CLGVBQXlCLEVBQVUsa0JBQStCO1FBQWxFLG9CQUFlLEdBQWYsZUFBZSxDQUFVO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFhO0lBQUcsQ0FBQztJQUUxRjs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUNuQixNQUFNLEVBQ04sUUFBUSxFQUNSLE9BQU8sRUFDUCxNQUFNLEVBQ04sR0FBRyxFQUNILFdBQVcsRUFDWCxPQUFPLEdBQUcsS0FBSyxHQUNPO1FBQ3RCLElBQUksQ0FBQztZQUNILElBQUksSUFBK0IsQ0FBQztZQUVwQyxJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUNaLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUM7b0JBQy9DLE1BQU07b0JBQ04sUUFBUTtvQkFDUixPQUFPO29CQUNQLE1BQU07b0JBQ04sR0FBRztvQkFDSCxXQUFXO2lCQUNaLENBQUMsQ0FBQztZQUNMLENBQUM7aUJBQU0sQ0FBQztnQkFDTixJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQztvQkFDekMsTUFBTTtvQkFDTixRQUFRO29CQUNSLE9BQU87b0JBQ1AsTUFBTTtvQkFDTixHQUFHO29CQUNILFdBQVc7aUJBQ1osQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsc0VBQXNFLENBQUMsQ0FBQztRQUMxRixDQUFDO0lBQ0gsQ0FBQzt1R0F0RFUsY0FBYzsyR0FBZCxjQUFjLGNBRmIsTUFBTTs7MkZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBKb2luUm9vbSB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9wcm9kdWNlci1lbWl0cy9qb2luLXJvb20uc2VydmljZSc7XG5pbXBvcnQgeyBKb2luQ29uUm9vbSB9IGZyb20gJy4uLy4uL3Byb2R1Y2Vycy9wcm9kdWNlci1lbWl0cy9qb2luLWNvbi1yb29tLnNlcnZpY2UnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQgeyBSZXNwb25zZUpvaW5Sb29tIH0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBKb2luUm9vbUNsaWVudE9wdGlvbnMge1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBtZW1iZXI6IHN0cmluZztcbiAgc2VjOiBzdHJpbmc7XG4gIGFwaVVzZXJOYW1lOiBzdHJpbmc7XG4gIGNvbnN1bWU/OiBib29sZWFuO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBKb2luUm9vbUNsaWVudFR5cGUgPSAocGFyYW1zOiBKb2luUm9vbUNsaWVudE9wdGlvbnMpID0+IFByb21pc2U8YW55PjtcblxuLyoqXG4gKiBGYWNpbGl0YXRlcyBqb2luaW5nIGEgcm9vbSBieSBlbWl0dGluZyB0aGUgYGpvaW5Sb29tYCBldmVudCB0byB0aGUgc2VydmVyIHRocm91Z2ggYSBzb2NrZXQgY29ubmVjdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0pvaW5Sb29tQ2xpZW50T3B0aW9uc30gb3B0aW9ucyAtIENvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3Igam9pbmluZyB0aGUgcm9vbS5cbiAqIEBwYXJhbSB7U29ja2V0fSBvcHRpb25zLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgZm9yIHNlcnZlciBjb21tdW5pY2F0aW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbSB0byBqb2luLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaXNsZXZlbCAtIExldmVsIGlkZW50aWZpZXIgZm9yIHRoZSB1c2VyIGluIHRoZSByb29tLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubWVtYmVyIC0gTWVtYmVyIGlkZW50aWZpZXIgZm9yIHRoZSBqb2luaW5nIHVzZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5zZWMgLSBTZWN1cml0eSB0b2tlbiBvciBpZGVudGlmaWVyIGZvciBhY2Nlc3MuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5hcGlVc2VyTmFtZSAtIEFQSSB1c2VybmFtZSBmb3Igc2VydmVyIGF1dGhlbnRpY2F0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5jb25zdW1lPWZhbHNlXSAtIElmIGB0cnVlYCwgam9pbnMgdmlhIGBqb2luQ29uUm9vbWA7IG90aGVyd2lzZSwgam9pbnMgdmlhIGBqb2luUm9vbWAuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSAtIEEgcHJvbWlzZSByZXNvbHZpbmcgd2l0aCB0aGUgc2VydmVyIHJlc3BvbnNlIGRhdGEuXG4gKiBAdGhyb3dzIHtFcnJvcn0gLSBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIHJvb20gam9pbmluZyBhdHRlbXB0IGZhaWxzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBqb2luUm9vbUNsaWVudCA9IG5ldyBKb2luUm9vbUNsaWVudChqb2luUm9vbVNlcnZpY2UsIGpvaW5Db25Sb29tU2VydmljZSk7XG4gKiBjb25zdCByZXNwb25zZSA9IGF3YWl0IGpvaW5Sb29tQ2xpZW50LmpvaW5Sb29tQ2xpZW50KHtcbiAqICAgc29ja2V0OiBteVNvY2tldCxcbiAqICAgcm9vbU5hbWU6ICdteVJvb20nLFxuICogICBpc2xldmVsOiAnMScsXG4gKiAgIG1lbWJlcjogJ3VzZXIxMjMnLFxuICogICBzZWM6ICdzZWN1cmVUb2tlbicsXG4gKiAgIGFwaVVzZXJOYW1lOiAnYXBpVXNlcicsXG4gKiAgIGNvbnN1bWU6IHRydWUsXG4gKiB9KTtcbiAqIGNvbnNvbGUubG9nKCdKb2luZWQgcm9vbSB3aXRoIHJlc3BvbnNlOicsIHJlc3BvbnNlKTtcbiAqIGBgYFxuICpcbiAqIFRoaXMgZXhhbXBsZSBkZW1vbnN0cmF0ZXMgdXNpbmcgYGpvaW5Sb29tQ2xpZW50YCB0byBqb2luIGEgcm9vbSwgZWl0aGVyIGFzIGEgY29uc3VtZXIgb3IgYSBwcm9kdWNlciwgYmFzZWQgb24gdGhlIGBjb25zdW1lYCBmbGFnLlxuICovXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBKb2luUm9vbUNsaWVudCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgSm9pblJvb21TZXJ2aWNlOiBKb2luUm9vbSwgcHJpdmF0ZSBKb2luQ29uUm9vbVNlcnZpY2U6IEpvaW5Db25Sb29tKSB7fVxuXG4gIC8qKlxuICAgKiBKb2lucyBhIHJvb20gYnkgZW1pdHRpbmcgdGhlIGBqb2luUm9vbWAgZXZlbnQgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgcHJvdmlkZWQgc29ja2V0LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBqb2luaW5nIHRoZSByb29tLlxuICAgKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIHRvIHVzZSBmb3IgY29tbXVuaWNhdGlvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbSB0byBqb2luLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuaXNsZXZlbCAtIFRoZSBsZXZlbCBpbmRpY2F0b3IgZm9yIHRoZSByb29tLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5tZW1iZXIgLSBUaGUgbWVtYmVyIGlkZW50aWZpZXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnNlYyAtIFRoZSBzZWN1cml0eSB0b2tlbiBvciBpZGVudGlmaWVyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5hcGlVc2VyTmFtZSAtIFRoZSBBUEkgdXNlcm5hbWUgZm9yIGF1dGhlbnRpY2F0aW9uLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmNvbnN1bWU9ZmFsc2VdIC0gRmxhZyB0byBkZXRlcm1pbmUgd2hpY2ggam9pbiBmdW5jdGlvbiB0byB1c2UuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGRhdGEgcmV0dXJuZWQgZnJvbSB0aGUgc2VydmVyLlxuICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZSByb29tIGpvaW5pbmcgcHJvY2VzcyBmYWlscy5cbiAgICovXG4gIGFzeW5jIGpvaW5Sb29tQ2xpZW50KHtcbiAgICBzb2NrZXQsXG4gICAgcm9vbU5hbWUsXG4gICAgaXNsZXZlbCxcbiAgICBtZW1iZXIsXG4gICAgc2VjLFxuICAgIGFwaVVzZXJOYW1lLFxuICAgIGNvbnN1bWUgPSBmYWxzZSxcbiAgfTogSm9pblJvb21DbGllbnRPcHRpb25zKTogUHJvbWlzZTxhbnk+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRhdGE6IFBhcnRpYWw8UmVzcG9uc2VKb2luUm9vbT47XG5cbiAgICAgIGlmIChjb25zdW1lKSB7XG4gICAgICAgIGRhdGEgPSBhd2FpdCB0aGlzLkpvaW5Db25Sb29tU2VydmljZS5qb2luQ29uUm9vbSh7XG4gICAgICAgICAgc29ja2V0LFxuICAgICAgICAgIHJvb21OYW1lLFxuICAgICAgICAgIGlzbGV2ZWwsXG4gICAgICAgICAgbWVtYmVyLFxuICAgICAgICAgIHNlYyxcbiAgICAgICAgICBhcGlVc2VyTmFtZSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhID0gYXdhaXQgdGhpcy5Kb2luUm9vbVNlcnZpY2Uuam9pblJvb20oe1xuICAgICAgICAgIHNvY2tldCxcbiAgICAgICAgICByb29tTmFtZSxcbiAgICAgICAgICBpc2xldmVsLFxuICAgICAgICAgIG1lbWJlcixcbiAgICAgICAgICBzZWMsXG4gICAgICAgICAgYXBpVXNlck5hbWUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBqb2luIHRoZSByb29tLiBQbGVhc2UgY2hlY2sgeW91ciBjb25uZWN0aW9uIGFuZCB0cnkgYWdhaW4uJyk7XG4gICAgfVxuICB9XG59XG4iXX0=