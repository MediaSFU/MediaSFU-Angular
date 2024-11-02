import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../methods/utils/validate-alphanumeric.service";
/**
 * Joins a conference room with the provided options and performs validation checks.
 *
 * @param {JoinConRoomOptions} options - Contains:
 *   - socket: Socket instance for communication.
 *   - roomName: Name of the room to join.
 *   - islevel: User level within the room.
 *   - member: Member identifier.
 *   - sec: Security token.
 *   - apiUserName: API username for authentication.
 *
 * - **Validation**:
 *   - Checks that `roomName`, `apiUserName`, and `member` are alphanumeric.
 *   - Ensures `roomName` starts with 's' or 'p' and meets length requirements.
 *   - Verifies `sec`, `islevel`, and `apiUserName` comply with length and format expectations.
 *
 * - **Response Handling**:
 *   - Resolves to the server's response data upon a successful join.
 *   - Rejects with specific reasons if the user is banned, suspended, or if the room host is not present.
 *
 * @returns {Promise<JoinConRoomResponse>} Resolves with the join response data, or rejects with error details.
 * @throws {Error} Throws validation errors or issues encountered while joining the room.
 *
 * @example
 * ```typescript
 * const joinOptions = {
 *   socket: mySocket,
 *   roomName: 'sMyRoom',
 *   islevel: '1',
 *   member: 'participant123',
 *   sec: '64-character-long-secret-key-here...',
 *   apiUserName: 'apiUser123',
 * };
 * joinConRoom(joinOptions)
 *   .then(response => console.log('Joined room:', response))
 *   .catch(error => console.error('Failed to join room:', error));
 * ```
 */
export class JoinConRoom {
    validateAlphanumeric;
    constructor(validateAlphanumeric) {
        this.validateAlphanumeric = validateAlphanumeric;
    }
    /**
     * Joins a conference room using the provided options.
     *
     * @param {JoinConRoomOptions} options - The options for joining the conference room.
     * @param {Socket} options.socket - The socket instance to use for communication.
     * @param {string} options.roomName - The name of the room to join.
     * @param {string} options.islevel - The level of the user.
     * @param {string} options.member - The member identifier.
     * @param {string} options.sec - The security token.
     * @param {string} options.apiUserName - The API username.
     * @returns {Promise<JoinConRoomResponse>} A promise that resolves with the response of the join operation.
     *
     * @throws {Error} If any of the required parameters are missing or invalid.
     * @throws {Error} If the user is banned, suspended, or if the host has not joined the room yet.
     */
    async joinConRoom({ socket, roomName, islevel, member, sec, apiUserName, }) {
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
            socket.emit('joinConRoom', { roomName, islevel, member, sec, apiUserName }, async (data) => {
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
                        // Resolve with the data received from the 'joinConRoom' event
                        resolve(data);
                    }
                    else {
                        // Resolve with the data received from the 'joinConRoom' event
                        resolve(data);
                    }
                }
                catch (error) {
                    // Handle errors during the joinConRoom process
                    console.log('Error joining room:', error);
                    reject(error);
                }
            });
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: JoinConRoom, deps: [{ token: i1.ValidateAlphanumeric }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: JoinConRoom, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: JoinConRoom, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.ValidateAlphanumeric }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pbi1jb24tcm9vbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL3Byb2R1Y2Vycy9wcm9kdWNlci1lbWl0cy9qb2luLWNvbi1yb29tLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBMkIzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFDRztBQUtILE1BQU0sT0FBTyxXQUFXO0lBQ0Y7SUFBcEIsWUFBb0Isb0JBQTBDO1FBQTFDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7SUFBRyxDQUFDO0lBRWxFOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUNoQixNQUFNLEVBQ04sUUFBUSxFQUNSLE9BQU8sRUFDUCxNQUFNLEVBQ04sR0FBRyxFQUNILFdBQVcsR0FDUTtRQUNuQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksUUFBUSxJQUFJLE9BQU8sSUFBSSxXQUFXLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDM0QsTUFBTSxlQUFlLEdBQUc7b0JBQ3RCLE9BQU8sRUFBRSxLQUFLO29CQUNkLGVBQWUsRUFBRSxJQUFJO29CQUNyQixNQUFNLEVBQUUsNkJBQTZCO2lCQUN0QyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDeEIsT0FBTztZQUNULENBQUM7WUFFRCw4REFBOEQ7WUFDOUQsSUFBSSxDQUFDO2dCQUNILElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFD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LENBQUM7SUFDTCxDQUFDO3VHQW5IVSxXQUFXOzJHQUFYLFdBQVcsY0FGVixNQUFNOzsyRkFFUCxXQUFXO2tCQUh2QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHsgVmFsaWRhdGVBbHBoYW51bWVyaWMgfSBmcm9tICcuLi8uLi9tZXRob2RzL3V0aWxzL3ZhbGlkYXRlLWFscGhhbnVtZXJpYy5zZXJ2aWNlJztcbmltcG9ydCB7IFJ0cENhcGFiaWxpdGllcyB9IGZyb20gJ21lZGlhc291cC1jbGllbnQvbGliL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBKb2luQ29uUm9vbU9wdGlvbnMge1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBtZW1iZXI6IHN0cmluZztcbiAgc2VjOiBzdHJpbmc7XG4gIGFwaVVzZXJOYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSm9pbkNvblJvb21SZXNwb25zZSB7XG4gIHN1Y2Nlc3M6IGJvb2xlYW47XG4gIHJ0cENhcGFiaWxpdGllczogUnRwQ2FwYWJpbGl0aWVzIHwgbnVsbDtcbiAgcmVhc29uPzogc3RyaW5nO1xuICBiYW5uZWQ/OiBib29sZWFuO1xuICBzdXNwZW5kZWQ/OiBib29sZWFuO1xuICBub0FkbWluPzogYm9vbGVhbjtcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBKb2luQ29uUm9vbVR5cGUgPSAob3B0aW9uczogSm9pbkNvblJvb21PcHRpb25zKSA9PiBQcm9taXNlPEpvaW5Db25Sb29tUmVzcG9uc2U+O1xuXG4vKipcbiAqIEpvaW5zIGEgY29uZmVyZW5jZSByb29tIHdpdGggdGhlIHByb3ZpZGVkIG9wdGlvbnMgYW5kIHBlcmZvcm1zIHZhbGlkYXRpb24gY2hlY2tzLlxuICpcbiAqIEBwYXJhbSB7Sm9pbkNvblJvb21PcHRpb25zfSBvcHRpb25zIC0gQ29udGFpbnM6XG4gKiAgIC0gc29ja2V0OiBTb2NrZXQgaW5zdGFuY2UgZm9yIGNvbW11bmljYXRpb24uXG4gKiAgIC0gcm9vbU5hbWU6IE5hbWUgb2YgdGhlIHJvb20gdG8gam9pbi5cbiAqICAgLSBpc2xldmVsOiBVc2VyIGxldmVsIHdpdGhpbiB0aGUgcm9vbS5cbiAqICAgLSBtZW1iZXI6IE1lbWJlciBpZGVudGlmaWVyLlxuICogICAtIHNlYzogU2VjdXJpdHkgdG9rZW4uXG4gKiAgIC0gYXBpVXNlck5hbWU6IEFQSSB1c2VybmFtZSBmb3IgYXV0aGVudGljYXRpb24uXG4gKlxuICogLSAqKlZhbGlkYXRpb24qKjpcbiAqICAgLSBDaGVja3MgdGhhdCBgcm9vbU5hbWVgLCBgYXBpVXNlck5hbWVgLCBhbmQgYG1lbWJlcmAgYXJlIGFscGhhbnVtZXJpYy5cbiAqICAgLSBFbnN1cmVzIGByb29tTmFtZWAgc3RhcnRzIHdpdGggJ3MnIG9yICdwJyBhbmQgbWVldHMgbGVuZ3RoIHJlcXVpcmVtZW50cy5cbiAqICAgLSBWZXJpZmllcyBgc2VjYCwgYGlzbGV2ZWxgLCBhbmQgYGFwaVVzZXJOYW1lYCBjb21wbHkgd2l0aCBsZW5ndGggYW5kIGZvcm1hdCBleHBlY3RhdGlvbnMuXG4gKlxuICogLSAqKlJlc3BvbnNlIEhhbmRsaW5nKio6XG4gKiAgIC0gUmVzb2x2ZXMgdG8gdGhlIHNlcnZlcidzIHJlc3BvbnNlIGRhdGEgdXBvbiBhIHN1Y2Nlc3NmdWwgam9pbi5cbiAqICAgLSBSZWplY3RzIHdpdGggc3BlY2lmaWMgcmVhc29ucyBpZiB0aGUgdXNlciBpcyBiYW5uZWQsIHN1c3BlbmRlZCwgb3IgaWYgdGhlIHJvb20gaG9zdCBpcyBub3QgcHJlc2VudC5cbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxKb2luQ29uUm9vbVJlc3BvbnNlPn0gUmVzb2x2ZXMgd2l0aCB0aGUgam9pbiByZXNwb25zZSBkYXRhLCBvciByZWplY3RzIHdpdGggZXJyb3IgZGV0YWlscy5cbiAqIEB0aHJvd3Mge0Vycm9yfSBUaHJvd3MgdmFsaWRhdGlvbiBlcnJvcnMgb3IgaXNzdWVzIGVuY291bnRlcmVkIHdoaWxlIGpvaW5pbmcgdGhlIHJvb20uXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IGpvaW5PcHRpb25zID0ge1xuICogICBzb2NrZXQ6IG15U29ja2V0LFxuICogICByb29tTmFtZTogJ3NNeVJvb20nLFxuICogICBpc2xldmVsOiAnMScsXG4gKiAgIG1lbWJlcjogJ3BhcnRpY2lwYW50MTIzJyxcbiAqICAgc2VjOiAnNjQtY2hhcmFjdGVyLWxvbmctc2VjcmV0LWtleS1oZXJlLi4uJyxcbiAqICAgYXBpVXNlck5hbWU6ICdhcGlVc2VyMTIzJyxcbiAqIH07XG4gKiBqb2luQ29uUm9vbShqb2luT3B0aW9ucylcbiAqICAgLnRoZW4ocmVzcG9uc2UgPT4gY29uc29sZS5sb2coJ0pvaW5lZCByb29tOicsIHJlc3BvbnNlKSlcbiAqICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBqb2luIHJvb206JywgZXJyb3IpKTtcbiAqIGBgYFxuICovXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBKb2luQ29uUm9vbSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmFsaWRhdGVBbHBoYW51bWVyaWM6IFZhbGlkYXRlQWxwaGFudW1lcmljKSB7fVxuXG4gIC8qKlxuICAgKiBKb2lucyBhIGNvbmZlcmVuY2Ugcm9vbSB1c2luZyB0aGUgcHJvdmlkZWQgb3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtKb2luQ29uUm9vbU9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3Igam9pbmluZyB0aGUgY29uZmVyZW5jZSByb29tLlxuICAgKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIHRvIHVzZSBmb3IgY29tbXVuaWNhdGlvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbSB0byBqb2luLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5pc2xldmVsIC0gVGhlIGxldmVsIG9mIHRoZSB1c2VyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5tZW1iZXIgLSBUaGUgbWVtYmVyIGlkZW50aWZpZXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnNlYyAtIFRoZSBzZWN1cml0eSB0b2tlbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuYXBpVXNlck5hbWUgLSBUaGUgQVBJIHVzZXJuYW1lLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxKb2luQ29uUm9vbVJlc3BvbnNlPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2Ugb2YgdGhlIGpvaW4gb3BlcmF0aW9uLlxuICAgKlxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgYW55IG9mIHRoZSByZXF1aXJlZCBwYXJhbWV0ZXJzIGFyZSBtaXNzaW5nIG9yIGludmFsaWQuXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgdXNlciBpcyBiYW5uZWQsIHN1c3BlbmRlZCwgb3IgaWYgdGhlIGhvc3QgaGFzIG5vdCBqb2luZWQgdGhlIHJvb20geWV0LlxuICAgKi9cbiAgYXN5bmMgam9pbkNvblJvb20oe1xuICAgIHNvY2tldCxcbiAgICByb29tTmFtZSxcbiAgICBpc2xldmVsLFxuICAgIG1lbWJlcixcbiAgICBzZWMsXG4gICAgYXBpVXNlck5hbWUsXG4gIH06IEpvaW5Db25Sb29tT3B0aW9ucyk6IFByb21pc2U8b2JqZWN0PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIFZhbGlkYXRlIGlucHV0c1xuICAgICAgaWYgKCEoc2VjICYmIHJvb21OYW1lICYmIGlzbGV2ZWwgJiYgYXBpVXNlck5hbWUgJiYgbWVtYmVyKSkge1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uRXJyb3IgPSB7XG4gICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgcnRwQ2FwYWJpbGl0aWVzOiBudWxsLFxuICAgICAgICAgIHJlYXNvbjogJ01pc3NpbmcgcmVxdWlyZWQgcGFyYW1ldGVycycsXG4gICAgICAgIH07XG4gICAgICAgIHJlamVjdCh2YWxpZGF0aW9uRXJyb3IpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFZhbGlkYXRlIGFscGhhbnVtZXJpYyBmb3Igcm9vbU5hbWUsIGFwaVVzZXJOYW1lLCBhbmQgbWVtYmVyXG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnZhbGlkYXRlQWxwaGFudW1lcmljLnZhbGlkYXRlQWxwaGFudW1lcmljKHsgc3RyOiByb29tTmFtZSB9KTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUFscGhhbnVtZXJpYy52YWxpZGF0ZUFscGhhbnVtZXJpYyh7IHN0cjogYXBpVXNlck5hbWUgfSk7XG4gICAgICAgIHRoaXMudmFsaWRhdGVBbHBoYW51bWVyaWMudmFsaWRhdGVBbHBoYW51bWVyaWMoeyBzdHI6IG1lbWJlciB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25FcnJvciA9IHtcbiAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICBydHBDYXBhYmlsaXRpZXM6IG51bGwsXG4gICAgICAgICAgcmVhc29uOiAnSW52YWxpZCByb29tTmFtZSBvciBhcGlVc2VyTmFtZSBvciBtZW1iZXInLFxuICAgICAgICB9O1xuICAgICAgICByZWplY3QodmFsaWRhdGlvbkVycm9yKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBWYWxpZGF0ZSByb29tTmFtZSBzdGFydHMgd2l0aCAncycgb3IgJ3AnXG4gICAgICBpZiAoIShyb29tTmFtZS5zdGFydHNXaXRoKCdzJykgfHwgcm9vbU5hbWUuc3RhcnRzV2l0aCgncCcpKSkge1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uRXJyb3IgPSB7XG4gICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgcnRwQ2FwYWJpbGl0aWVzOiBudWxsLFxuICAgICAgICAgIHJlYXNvbjogJ0ludmFsaWQgcm9vbU5hbWUsIG11c3Qgc3RhcnQgd2l0aCBzIG9yIHAnLFxuICAgICAgICB9O1xuICAgICAgICByZWplY3QodmFsaWRhdGlvbkVycm9yKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBWYWxpZGF0ZSBvdGhlciBjb25kaXRpb25zIGZvciBzZWMsIHJvb21OYW1lLCBpc2xldmVsLCBhcGlVc2VyTmFtZVxuICAgICAgaWYgKFxuICAgICAgICAhKFxuICAgICAgICAgIHNlYy5sZW5ndGggPT09IDY0ICYmXG4gICAgICAgICAgcm9vbU5hbWUubGVuZ3RoID49IDggJiZcbiAgICAgICAgICBpc2xldmVsLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgICAgIGFwaVVzZXJOYW1lLmxlbmd0aCA+PSA2ICYmXG4gICAgICAgICAgKGlzbGV2ZWwgPT09ICcwJyB8fCBpc2xldmVsID09PSAnMScgfHwgaXNsZXZlbCA9PT0gJzInKVxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbkVycm9yID0ge1xuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgIHJ0cENhcGFiaWxpdGllczogbnVsbCxcbiAgICAgICAgICByZWFzb246ICdJbnZhbGlkIHJvb21OYW1lIG9yIGlzbGV2ZWwgb3IgYXBpVXNlck5hbWUgb3Igc2VjcmV0JyxcbiAgICAgICAgfTtcbiAgICAgICAgcmVqZWN0KHZhbGlkYXRpb25FcnJvcik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc29ja2V0LmVtaXQoXG4gICAgICAgICdqb2luQ29uUm9vbScsXG4gICAgICAgIHsgcm9vbU5hbWUsIGlzbGV2ZWwsIG1lbWJlciwgc2VjLCBhcGlVc2VyTmFtZSB9LFxuICAgICAgICBhc3luYyAoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHJ0cENhcGFiaWxpdGllcyBpcyBudWxsXG4gICAgICAgICAgICBpZiAoZGF0YS5ydHBDYXBhYmlsaXRpZXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYmFubmVkLCBzdXNwZW5kZWQsIG9yIG5vQWRtaW5cbiAgICAgICAgICAgICAgaWYgKGRhdGEuYmFubmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVc2VyIGlzIGJhbm5lZC4nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoZGF0YS5zdXNwZW5kZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VzZXIgaXMgc3VzcGVuZGVkLicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChkYXRhLm5vQWRtaW4pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0hvc3QgaGFzIG5vdCBqb2luZWQgdGhlIHJvb20geWV0LicpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gUmVzb2x2ZSB3aXRoIHRoZSBkYXRhIHJlY2VpdmVkIGZyb20gdGhlICdqb2luQ29uUm9vbScgZXZlbnRcbiAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFJlc29sdmUgd2l0aCB0aGUgZGF0YSByZWNlaXZlZCBmcm9tIHRoZSAnam9pbkNvblJvb20nIGV2ZW50XG4gICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBlcnJvcnMgZHVyaW5nIHRoZSBqb2luQ29uUm9vbSBwcm9jZXNzXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3Igam9pbmluZyByb29tOicsIGVycm9yKTtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuIl19