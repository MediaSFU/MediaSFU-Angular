import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../producers/producer-emits/join-room.service";
import * as i2 from "../../producers/producer-emits/join-con-room.service";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pbi1yb29tLWNsaWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL3Byb2R1Y2VyLWNsaWVudC9wcm9kdWNlci1jbGllbnQtZW1pdHMvam9pbi1yb29tLWNsaWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFxQjNDLE1BQU0sT0FBTyxjQUFjO0lBQ0w7SUFBbUM7SUFBdkQsWUFBb0IsZUFBeUIsRUFBVSxrQkFBK0I7UUFBbEUsb0JBQWUsR0FBZixlQUFlLENBQVU7UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQWE7SUFBRyxDQUFDO0lBRTFGOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQ25CLE1BQU0sRUFDTixRQUFRLEVBQ1IsT0FBTyxFQUNQLE1BQU0sRUFDTixHQUFHLEVBQ0gsV0FBVyxFQUNYLE9BQU8sR0FBRyxLQUFLLEdBQ087UUFDdEIsSUFBSSxDQUFDO1lBQ0gsSUFBSSxJQUErQixDQUFDO1lBRXBDLElBQUksT0FBTyxFQUFFLENBQUM7Z0JBQ1osSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztvQkFDL0MsTUFBTTtvQkFDTixRQUFRO29CQUNSLE9BQU87b0JBQ1AsTUFBTTtvQkFDTixHQUFHO29CQUNILFdBQVc7aUJBQ1osQ0FBQyxDQUFDO1lBQ0wsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO29CQUN6QyxNQUFNO29CQUNOLFFBQVE7b0JBQ1IsT0FBTztvQkFDUCxNQUFNO29CQUNOLEdBQUc7b0JBQ0gsV0FBVztpQkFDWixDQUFDLENBQUM7WUFDTCxDQUFDO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxzRUFBc0UsQ0FBQyxDQUFDO1FBQzFGLENBQUM7SUFDSCxDQUFDO3VHQXREVSxjQUFjOzJHQUFkLGNBQWMsY0FGYixNQUFNOzsyRkFFUCxjQUFjO2tCQUgxQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEpvaW5Sb29tIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3Byb2R1Y2VyLWVtaXRzL2pvaW4tcm9vbS5zZXJ2aWNlJztcbmltcG9ydCB7IEpvaW5Db25Sb29tIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3Byb2R1Y2VyLWVtaXRzL2pvaW4tY29uLXJvb20uc2VydmljZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IFJlc3BvbnNlSm9pblJvb20gfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEpvaW5Sb29tQ2xpZW50T3B0aW9ucyB7XG4gIHNvY2tldDogU29ja2V0O1xuICByb29tTmFtZTogc3RyaW5nO1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIG1lbWJlcjogc3RyaW5nO1xuICBzZWM6IHN0cmluZztcbiAgYXBpVXNlck5hbWU6IHN0cmluZztcbiAgY29uc3VtZT86IGJvb2xlYW47XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIEpvaW5Sb29tQ2xpZW50VHlwZSA9IChwYXJhbXM6IEpvaW5Sb29tQ2xpZW50T3B0aW9ucykgPT4gUHJvbWlzZTxhbnk+O1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEpvaW5Sb29tQ2xpZW50IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBKb2luUm9vbVNlcnZpY2U6IEpvaW5Sb29tLCBwcml2YXRlIEpvaW5Db25Sb29tU2VydmljZTogSm9pbkNvblJvb20pIHt9XG5cbiAgLyoqXG4gICAqIEpvaW5zIGEgcm9vbSBieSBlbWl0dGluZyB0aGUgYGpvaW5Sb29tYCBldmVudCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBwcm92aWRlZCBzb2NrZXQuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGpvaW5pbmcgdGhlIHJvb20uXG4gICAqIEBwYXJhbSB7U29ja2V0fSBvcHRpb25zLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgdG8gdXNlIGZvciBjb21tdW5pY2F0aW9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tIHRvIGpvaW4uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5pc2xldmVsIC0gVGhlIGxldmVsIGluZGljYXRvciBmb3IgdGhlIHJvb20uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm1lbWJlciAtIFRoZSBtZW1iZXIgaWRlbnRpZmllci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuc2VjIC0gVGhlIHNlY3VyaXR5IHRva2VuIG9yIGlkZW50aWZpZXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmFwaVVzZXJOYW1lIC0gVGhlIEFQSSB1c2VybmFtZSBmb3IgYXV0aGVudGljYXRpb24uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuY29uc3VtZT1mYWxzZV0gLSBGbGFnIHRvIGRldGVybWluZSB3aGljaCBqb2luIGZ1bmN0aW9uIHRvIHVzZS5cbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgZGF0YSByZXR1cm5lZCBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIHJvb20gam9pbmluZyBwcm9jZXNzIGZhaWxzLlxuICAgKi9cbiAgYXN5bmMgam9pblJvb21DbGllbnQoe1xuICAgIHNvY2tldCxcbiAgICByb29tTmFtZSxcbiAgICBpc2xldmVsLFxuICAgIG1lbWJlcixcbiAgICBzZWMsXG4gICAgYXBpVXNlck5hbWUsXG4gICAgY29uc3VtZSA9IGZhbHNlLFxuICB9OiBKb2luUm9vbUNsaWVudE9wdGlvbnMpOiBQcm9taXNlPGFueT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZGF0YTogUGFydGlhbDxSZXNwb25zZUpvaW5Sb29tPjtcblxuICAgICAgaWYgKGNvbnN1bWUpIHtcbiAgICAgICAgZGF0YSA9IGF3YWl0IHRoaXMuSm9pbkNvblJvb21TZXJ2aWNlLmpvaW5Db25Sb29tKHtcbiAgICAgICAgICBzb2NrZXQsXG4gICAgICAgICAgcm9vbU5hbWUsXG4gICAgICAgICAgaXNsZXZlbCxcbiAgICAgICAgICBtZW1iZXIsXG4gICAgICAgICAgc2VjLFxuICAgICAgICAgIGFwaVVzZXJOYW1lLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGEgPSBhd2FpdCB0aGlzLkpvaW5Sb29tU2VydmljZS5qb2luUm9vbSh7XG4gICAgICAgICAgc29ja2V0LFxuICAgICAgICAgIHJvb21OYW1lLFxuICAgICAgICAgIGlzbGV2ZWwsXG4gICAgICAgICAgbWVtYmVyLFxuICAgICAgICAgIHNlYyxcbiAgICAgICAgICBhcGlVc2VyTmFtZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGpvaW4gdGhlIHJvb20uIFBsZWFzZSBjaGVjayB5b3VyIGNvbm5lY3Rpb24gYW5kIHRyeSBhZ2Fpbi4nKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==