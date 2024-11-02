import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../methods/utils/validate-alphanumeric.service";
/**
 * Joins a user to a room using socket communication with validation checks.
 *
 * @param {JoinRoomOptions} options - Contains:
 *   - `socket`: Socket instance for communication.
 *   - `roomName`: Name of the room to join.
 *   - `islevel`: User's level indicator.
 *   - `member`: User identifier.
 *   - `sec`: Security token.
 *   - `apiUserName`: API username for authentication.
 *
 * - **Validation**:
 *   - Ensures `roomName`, `apiUserName`, and `member` are alphanumeric.
 *   - Verifies that `roomName` starts with 's' or 'p' and meets length requirements.
 *   - Validates `sec`, `islevel`, and `apiUserName` against specified length and format conditions.
 *
 * - **Response Handling**:
 *   - Resolves with the server's response upon a successful join.
 *   - Rejects with a descriptive error if the user is banned, suspended, or if the host has not yet joined the room.
 *
 * @returns {Promise<object>} Resolves with data from the 'joinRoom' event or rejects with validation errors.
 * @throws {Error} Throws errors encountered during validation or join process.
 *
 * @example
 * ```typescript
 * const joinOptions = {
 *   socket: mySocket,
 *   roomName: 'sMyRoom',
 *   islevel: '1',
 *   member: 'participant123',
 *   sec: '64-character-secure-key...',
 *   apiUserName: 'apiUser123',
 * };
 * joinRoom(joinOptions)
 *   .then(response => console.log('Room joined:', response))
 *   .catch(error => console.error('Join failed:', error));
 * ```
 */
export class JoinRoom {
    validateAlphanumeric;
    constructor(validateAlphanumeric) {
        this.validateAlphanumeric = validateAlphanumeric;
    }
    /**
     * Joins a user to a specified room via a socket connection.
     *
     * @param {Object} options - The options for joining the room.
     * @param {Socket} options.socket - The socket instance to use for communication.
     * @param {string} options.roomName - The name of the room to join.
     * @param {string} options.islevel - The level of the user.
     * @param {string} options.member - The member identifier.
     * @param {string} options.sec - The security token.
     * @param {string} options.apiUserName - The API username of the user.
     *
     * @returns {Promise<object>} A promise that resolves with the data received from the 'joinRoom' event or rejects with a validation error.
     *
     * @throws {Error} Throws an error if the user is banned, suspended, or if the host has not joined the room yet.
     */
    async joinRoom({ socket, roomName, islevel, member, sec, apiUserName, }) {
        return new Promise((resolve, reject) => {
            // Validate inputs
            if (!(sec && roomName && islevel && apiUserName && member)) {
                const validationError = {
                    success: false,
                    rtpCapabilities: null,
                    reason: 'Missing required parameters',
                };
                reject(validationError);
                return;
            }
            // Validate alphanumeric for roomName, apiUserName, and member
            try {
                this.validateAlphanumeric.validateAlphanumeric({ str: roomName });
                this.validateAlphanumeric.validateAlphanumeric({ str: apiUserName });
                this.validateAlphanumeric.validateAlphanumeric({ str: member });
            }
            catch (error) {
                const validationError = {
                    success: false,
                    rtpCapabilities: null,
                    reason: 'Invalid roomName or apiUserName or member',
                };
                reject(validationError);
                return;
            }
            // Validate roomName starts with 's' or 'p'
            if (!(roomName.startsWith('s') || roomName.startsWith('p'))) {
                const validationError = {
                    success: false,
                    rtpCapabilities: null,
                    reason: 'Invalid roomName, must start with s or p',
                };
                reject(validationError);
                return;
            }
            // Validate other conditions for sec, roomName, islevel, apiUserName
            if (!(sec.length === 64 &&
                roomName.length >= 8 &&
                islevel.length === 1 &&
                apiUserName.length >= 6 &&
                (islevel === '0' || islevel === '1' || islevel === '2'))) {
                const validationError = {
                    success: false,
                    rtpCapabilities: null,
                    reason: 'Invalid roomName or islevel or apiUserName or secret',
                };
                reject(validationError);
                return;
            }
            socket.emit('joinRoom', { roomName, islevel, member, sec, apiUserName }, async (data) => {
                try {
                    // Check if rtpCapabilities is null
                    if (data.rtpCapabilities === null) {
                        // Check if banned, suspended, or noAdmin
                        if (data.banned) {
                            throw new Error('User is banned.');
                        }
                        if (data.suspended) {
                            throw new Error('User is suspended.');
                        }
                        if (data.noAdmin) {
                            throw new Error('Host has not joined the room yet.');
                        }
                        // Resolve with the data received from the 'joinRoom' event
                        resolve(data);
                    }
                    else {
                        // Resolve with the data received from the 'joinRoom' event
                        resolve(data);
                    }
                }
                catch (error) {
                    // Handle errors during the joinRoom process
                    console.log('Error joining room:', error);
                    reject(error);
                }
            });
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: JoinRoom, deps: [{ token: i1.ValidateAlphanumeric }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: JoinRoom, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: JoinRoom, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.ValidateAlphanumeric }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pbi1yb29tLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3Byb2R1Y2VyLWVtaXRzL2pvaW4tcm9vbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQXVCM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQ0c7QUFNSCxNQUFNLE9BQU8sUUFBUTtJQUNDO0lBQXBCLFlBQW9CLG9CQUEwQztRQUExQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO0lBQUcsQ0FBQztJQUVsRTs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILEtBQUssQ0FBQyxRQUFRLENBQUMsRUFDYixNQUFNLEVBQ04sUUFBUSxFQUNSLE9BQU8sRUFDUCxNQUFNLEVBQ04sR0FBRyxFQUNILFdBQVcsR0FDSztRQUNoQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksUUFBUSxJQUFJLE9BQU8sSUFBSSxXQUFXLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDM0QsTUFBTSxlQUFlLEdBQUc7b0JBQ3RCLE9BQU8sRUFBRSxLQUFLO29CQUNkLGVBQWUsRUFBRSxJQUFJO29CQUNyQixNQUFNLEVBQUUsNkJBQTZCO2lCQUN0QyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDeEIsT0FBTztZQUNULENBQUM7WUFFRCw4REFBOEQ7WUFDOUQsSUFBSSxDQUFDO2dCQUNILElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRSxJ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TCxDQUFDO3VHQW5IVSxRQUFROzJHQUFSLFFBQVEsY0FGUCxNQUFNOzsyRkFFUCxRQUFRO2tCQUhwQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHsgVmFsaWRhdGVBbHBoYW51bWVyaWMgfSBmcm9tICcuLi8uLi9tZXRob2RzL3V0aWxzL3ZhbGlkYXRlLWFscGhhbnVtZXJpYy5zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBKb2luUm9vbU9wdGlvbnMge1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBtZW1iZXI6IHN0cmluZztcbiAgc2VjOiBzdHJpbmc7XG4gIGFwaVVzZXJOYW1lOiBzdHJpbmc7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIEpvaW5Sb29tVHlwZSA9IChcbiAgc29ja2V0OiBTb2NrZXQsXG4gIHJvb21OYW1lOiBzdHJpbmcsXG4gIGlzbGV2ZWw6IHN0cmluZyxcbiAgbWVtYmVyOiBzdHJpbmcsXG4gIHNlYzogc3RyaW5nLFxuICBhcGlVc2VyTmFtZTogc3RyaW5nLFxuKSA9PiBQcm9taXNlPG9iamVjdD47XG5cbi8qKlxuICogSm9pbnMgYSB1c2VyIHRvIGEgcm9vbSB1c2luZyBzb2NrZXQgY29tbXVuaWNhdGlvbiB3aXRoIHZhbGlkYXRpb24gY2hlY2tzLlxuICpcbiAqIEBwYXJhbSB7Sm9pblJvb21PcHRpb25zfSBvcHRpb25zIC0gQ29udGFpbnM6XG4gKiAgIC0gYHNvY2tldGA6IFNvY2tldCBpbnN0YW5jZSBmb3IgY29tbXVuaWNhdGlvbi5cbiAqICAgLSBgcm9vbU5hbWVgOiBOYW1lIG9mIHRoZSByb29tIHRvIGpvaW4uXG4gKiAgIC0gYGlzbGV2ZWxgOiBVc2VyJ3MgbGV2ZWwgaW5kaWNhdG9yLlxuICogICAtIGBtZW1iZXJgOiBVc2VyIGlkZW50aWZpZXIuXG4gKiAgIC0gYHNlY2A6IFNlY3VyaXR5IHRva2VuLlxuICogICAtIGBhcGlVc2VyTmFtZWA6IEFQSSB1c2VybmFtZSBmb3IgYXV0aGVudGljYXRpb24uXG4gKlxuICogLSAqKlZhbGlkYXRpb24qKjpcbiAqICAgLSBFbnN1cmVzIGByb29tTmFtZWAsIGBhcGlVc2VyTmFtZWAsIGFuZCBgbWVtYmVyYCBhcmUgYWxwaGFudW1lcmljLlxuICogICAtIFZlcmlmaWVzIHRoYXQgYHJvb21OYW1lYCBzdGFydHMgd2l0aCAncycgb3IgJ3AnIGFuZCBtZWV0cyBsZW5ndGggcmVxdWlyZW1lbnRzLlxuICogICAtIFZhbGlkYXRlcyBgc2VjYCwgYGlzbGV2ZWxgLCBhbmQgYGFwaVVzZXJOYW1lYCBhZ2FpbnN0IHNwZWNpZmllZCBsZW5ndGggYW5kIGZvcm1hdCBjb25kaXRpb25zLlxuICpcbiAqIC0gKipSZXNwb25zZSBIYW5kbGluZyoqOlxuICogICAtIFJlc29sdmVzIHdpdGggdGhlIHNlcnZlcidzIHJlc3BvbnNlIHVwb24gYSBzdWNjZXNzZnVsIGpvaW4uXG4gKiAgIC0gUmVqZWN0cyB3aXRoIGEgZGVzY3JpcHRpdmUgZXJyb3IgaWYgdGhlIHVzZXIgaXMgYmFubmVkLCBzdXNwZW5kZWQsIG9yIGlmIHRoZSBob3N0IGhhcyBub3QgeWV0IGpvaW5lZCB0aGUgcm9vbS5cbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxvYmplY3Q+fSBSZXNvbHZlcyB3aXRoIGRhdGEgZnJvbSB0aGUgJ2pvaW5Sb29tJyBldmVudCBvciByZWplY3RzIHdpdGggdmFsaWRhdGlvbiBlcnJvcnMuXG4gKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGVycm9ycyBlbmNvdW50ZXJlZCBkdXJpbmcgdmFsaWRhdGlvbiBvciBqb2luIHByb2Nlc3MuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IGpvaW5PcHRpb25zID0ge1xuICogICBzb2NrZXQ6IG15U29ja2V0LFxuICogICByb29tTmFtZTogJ3NNeVJvb20nLFxuICogICBpc2xldmVsOiAnMScsXG4gKiAgIG1lbWJlcjogJ3BhcnRpY2lwYW50MTIzJyxcbiAqICAgc2VjOiAnNjQtY2hhcmFjdGVyLXNlY3VyZS1rZXkuLi4nLFxuICogICBhcGlVc2VyTmFtZTogJ2FwaVVzZXIxMjMnLFxuICogfTtcbiAqIGpvaW5Sb29tKGpvaW5PcHRpb25zKVxuICogICAudGhlbihyZXNwb25zZSA9PiBjb25zb2xlLmxvZygnUm9vbSBqb2luZWQ6JywgcmVzcG9uc2UpKVxuICogICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignSm9pbiBmYWlsZWQ6JywgZXJyb3IpKTtcbiAqIGBgYFxuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEpvaW5Sb29tIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2YWxpZGF0ZUFscGhhbnVtZXJpYzogVmFsaWRhdGVBbHBoYW51bWVyaWMpIHt9XG5cbiAgLyoqXG4gICAqIEpvaW5zIGEgdXNlciB0byBhIHNwZWNpZmllZCByb29tIHZpYSBhIHNvY2tldCBjb25uZWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBqb2luaW5nIHRoZSByb29tLlxuICAgKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIHRvIHVzZSBmb3IgY29tbXVuaWNhdGlvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbSB0byBqb2luLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5pc2xldmVsIC0gVGhlIGxldmVsIG9mIHRoZSB1c2VyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5tZW1iZXIgLSBUaGUgbWVtYmVyIGlkZW50aWZpZXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnNlYyAtIFRoZSBzZWN1cml0eSB0b2tlbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuYXBpVXNlck5hbWUgLSBUaGUgQVBJIHVzZXJuYW1lIG9mIHRoZSB1c2VyLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxvYmplY3Q+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBkYXRhIHJlY2VpdmVkIGZyb20gdGhlICdqb2luUm9vbScgZXZlbnQgb3IgcmVqZWN0cyB3aXRoIGEgdmFsaWRhdGlvbiBlcnJvci5cbiAgICpcbiAgICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGUgdXNlciBpcyBiYW5uZWQsIHN1c3BlbmRlZCwgb3IgaWYgdGhlIGhvc3QgaGFzIG5vdCBqb2luZWQgdGhlIHJvb20geWV0LlxuICAgKi9cbiAgYXN5bmMgam9pblJvb20oe1xuICAgIHNvY2tldCxcbiAgICByb29tTmFtZSxcbiAgICBpc2xldmVsLFxuICAgIG1lbWJlcixcbiAgICBzZWMsXG4gICAgYXBpVXNlck5hbWUsXG4gIH06IEpvaW5Sb29tT3B0aW9ucyk6IFByb21pc2U8b2JqZWN0PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIFZhbGlkYXRlIGlucHV0c1xuICAgICAgaWYgKCEoc2VjICYmIHJvb21OYW1lICYmIGlzbGV2ZWwgJiYgYXBpVXNlck5hbWUgJiYgbWVtYmVyKSkge1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uRXJyb3IgPSB7XG4gICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgcnRwQ2FwYWJpbGl0aWVzOiBudWxsLFxuICAgICAgICAgIHJlYXNvbjogJ01pc3NpbmcgcmVxdWlyZWQgcGFyYW1ldGVycycsXG4gICAgICAgIH07XG4gICAgICAgIHJlamVjdCh2YWxpZGF0aW9uRXJyb3IpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFZhbGlkYXRlIGFscGhhbnVtZXJpYyBmb3Igcm9vbU5hbWUsIGFwaVVzZXJOYW1lLCBhbmQgbWVtYmVyXG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnZhbGlkYXRlQWxwaGFudW1lcmljLnZhbGlkYXRlQWxwaGFudW1lcmljKHsgc3RyOiByb29tTmFtZSB9KTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUFscGhhbnVtZXJpYy52YWxpZGF0ZUFscGhhbnVtZXJpYyh7IHN0cjogYXBpVXNlck5hbWUgfSk7XG4gICAgICAgIHRoaXMudmFsaWRhdGVBbHBoYW51bWVyaWMudmFsaWRhdGVBbHBoYW51bWVyaWMoeyBzdHI6IG1lbWJlciB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25FcnJvciA9IHtcbiAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICBydHBDYXBhYmlsaXRpZXM6IG51bGwsXG4gICAgICAgICAgcmVhc29uOiAnSW52YWxpZCByb29tTmFtZSBvciBhcGlVc2VyTmFtZSBvciBtZW1iZXInLFxuICAgICAgICB9O1xuICAgICAgICByZWplY3QodmFsaWRhdGlvbkVycm9yKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBWYWxpZGF0ZSByb29tTmFtZSBzdGFydHMgd2l0aCAncycgb3IgJ3AnXG4gICAgICBpZiAoIShyb29tTmFtZS5zdGFydHNXaXRoKCdzJykgfHwgcm9vbU5hbWUuc3RhcnRzV2l0aCgncCcpKSkge1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uRXJyb3IgPSB7XG4gICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgcnRwQ2FwYWJpbGl0aWVzOiBudWxsLFxuICAgICAgICAgIHJlYXNvbjogJ0ludmFsaWQgcm9vbU5hbWUsIG11c3Qgc3RhcnQgd2l0aCBzIG9yIHAnLFxuICAgICAgICB9O1xuICAgICAgICByZWplY3QodmFsaWRhdGlvbkVycm9yKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBWYWxpZGF0ZSBvdGhlciBjb25kaXRpb25zIGZvciBzZWMsIHJvb21OYW1lLCBpc2xldmVsLCBhcGlVc2VyTmFtZVxuICAgICAgaWYgKFxuICAgICAgICAhKFxuICAgICAgICAgIHNlYy5sZW5ndGggPT09IDY0ICYmXG4gICAgICAgICAgcm9vbU5hbWUubGVuZ3RoID49IDggJiZcbiAgICAgICAgICBpc2xldmVsLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgICAgIGFwaVVzZXJOYW1lLmxlbmd0aCA+PSA2ICYmXG4gICAgICAgICAgKGlzbGV2ZWwgPT09ICcwJyB8fCBpc2xldmVsID09PSAnMScgfHwgaXNsZXZlbCA9PT0gJzInKVxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbkVycm9yID0ge1xuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgIHJ0cENhcGFiaWxpdGllczogbnVsbCxcbiAgICAgICAgICByZWFzb246ICdJbnZhbGlkIHJvb21OYW1lIG9yIGlzbGV2ZWwgb3IgYXBpVXNlck5hbWUgb3Igc2VjcmV0JyxcbiAgICAgICAgfTtcbiAgICAgICAgcmVqZWN0KHZhbGlkYXRpb25FcnJvcik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc29ja2V0LmVtaXQoXG4gICAgICAgICdqb2luUm9vbScsXG4gICAgICAgIHsgcm9vbU5hbWUsIGlzbGV2ZWwsIG1lbWJlciwgc2VjLCBhcGlVc2VyTmFtZSB9LFxuICAgICAgICBhc3luYyAoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHJ0cENhcGFiaWxpdGllcyBpcyBudWxsXG4gICAgICAgICAgICBpZiAoZGF0YS5ydHBDYXBhYmlsaXRpZXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYmFubmVkLCBzdXNwZW5kZWQsIG9yIG5vQWRtaW5cbiAgICAgICAgICAgICAgaWYgKGRhdGEuYmFubmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVc2VyIGlzIGJhbm5lZC4nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoZGF0YS5zdXNwZW5kZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VzZXIgaXMgc3VzcGVuZGVkLicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChkYXRhLm5vQWRtaW4pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0hvc3QgaGFzIG5vdCBqb2luZWQgdGhlIHJvb20geWV0LicpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gUmVzb2x2ZSB3aXRoIHRoZSBkYXRhIHJlY2VpdmVkIGZyb20gdGhlICdqb2luUm9vbScgZXZlbnRcbiAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFJlc29sdmUgd2l0aCB0aGUgZGF0YSByZWNlaXZlZCBmcm9tIHRoZSAnam9pblJvb20nIGV2ZW50XG4gICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBlcnJvcnMgZHVyaW5nIHRoZSBqb2luUm9vbSBwcm9jZXNzXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3Igam9pbmluZyByb29tOicsIGVycm9yKTtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuIl19