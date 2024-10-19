import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../methods/utils/validate-alphanumeric.service";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pbi1jb24tcm9vbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL3Byb2R1Y2Vycy9wcm9kdWNlci1lbWl0cy9qb2luLWNvbi1yb29tLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBOEIzQyxNQUFNLE9BQU8sV0FBVztJQUNGO0lBQXBCLFlBQW9CLG9CQUEwQztRQUExQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO0lBQUcsQ0FBQztJQUVsRTs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILEtBQUssQ0FBQyxXQUFXLENBQUMsRUFDaEIsTUFBTSxFQUNOLFFBQVEsRUFDUixPQUFPLEVBQ1AsTUFBTSxFQUNOLEdBQUcsRUFDSCxXQUFXLEdBQ1E7UUFDbkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxrQkFBa0I7WUFDbEIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLFFBQVEsSUFBSSxPQUFPLElBQUksV0FBVyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQzNELE1BQU0sZUFBZSxHQUFHO29CQUN0QixPQUFPLEVBQUUsS0FBSztvQkFDZCxlQUFlLEVBQUUsSUFBSTtvQkFDckIsTUFBTSxFQUFFLDZCQUE2QjtpQkFDdEMsQ0FBQztnQkFDRixNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3hCLE9BQU87WUFDVCxDQUFDO1lBRUQsOERBQThEO1lBQzlELElBQUksQ0FBQztnQkFDSCxJQUFJLENBQUMsb0JBQW9CLENBQUMsb0JBQW9CLENBQUMsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLG9CQUFvQixDQUFDLEVBQUUs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TTs7MkZBRVAsV0FBVztrQkFIdkIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IFZhbGlkYXRlQWxwaGFudW1lcmljIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy91dGlscy92YWxpZGF0ZS1hbHBoYW51bWVyaWMuc2VydmljZSc7XG5pbXBvcnQgeyBSdHBDYXBhYmlsaXRpZXMgfSBmcm9tICdtZWRpYXNvdXAtY2xpZW50L2xpYi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSm9pbkNvblJvb21PcHRpb25zIHtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgbWVtYmVyOiBzdHJpbmc7XG4gIHNlYzogc3RyaW5nO1xuICBhcGlVc2VyTmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEpvaW5Db25Sb29tUmVzcG9uc2Uge1xuICBzdWNjZXNzOiBib29sZWFuO1xuICBydHBDYXBhYmlsaXRpZXM6IFJ0cENhcGFiaWxpdGllcyB8IG51bGw7XG4gIHJlYXNvbj86IHN0cmluZztcbiAgYmFubmVkPzogYm9vbGVhbjtcbiAgc3VzcGVuZGVkPzogYm9vbGVhbjtcbiAgbm9BZG1pbj86IGJvb2xlYW47XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgSm9pbkNvblJvb21UeXBlID0gKG9wdGlvbnM6IEpvaW5Db25Sb29tT3B0aW9ucykgPT4gUHJvbWlzZTxKb2luQ29uUm9vbVJlc3BvbnNlPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEpvaW5Db25Sb29tIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2YWxpZGF0ZUFscGhhbnVtZXJpYzogVmFsaWRhdGVBbHBoYW51bWVyaWMpIHt9XG5cbiAgLyoqXG4gICAqIEpvaW5zIGEgY29uZmVyZW5jZSByb29tIHVzaW5nIHRoZSBwcm92aWRlZCBvcHRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0ge0pvaW5Db25Sb29tT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBqb2luaW5nIHRoZSBjb25mZXJlbmNlIHJvb20uXG4gICAqIEBwYXJhbSB7U29ja2V0fSBvcHRpb25zLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgdG8gdXNlIGZvciBjb21tdW5pY2F0aW9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tIHRvIGpvaW4uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmlzbGV2ZWwgLSBUaGUgbGV2ZWwgb2YgdGhlIHVzZXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm1lbWJlciAtIFRoZSBtZW1iZXIgaWRlbnRpZmllci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuc2VjIC0gVGhlIHNlY3VyaXR5IHRva2VuLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5hcGlVc2VyTmFtZSAtIFRoZSBBUEkgdXNlcm5hbWUuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEpvaW5Db25Sb29tUmVzcG9uc2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZSBvZiB0aGUgam9pbiBvcGVyYXRpb24uXG4gICAqXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiBhbnkgb2YgdGhlIHJlcXVpcmVkIHBhcmFtZXRlcnMgYXJlIG1pc3Npbmcgb3IgaW52YWxpZC5cbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSB1c2VyIGlzIGJhbm5lZCwgc3VzcGVuZGVkLCBvciBpZiB0aGUgaG9zdCBoYXMgbm90IGpvaW5lZCB0aGUgcm9vbSB5ZXQuXG4gICAqL1xuICBhc3luYyBqb2luQ29uUm9vbSh7XG4gICAgc29ja2V0LFxuICAgIHJvb21OYW1lLFxuICAgIGlzbGV2ZWwsXG4gICAgbWVtYmVyLFxuICAgIHNlYyxcbiAgICBhcGlVc2VyTmFtZSxcbiAgfTogSm9pbkNvblJvb21PcHRpb25zKTogUHJvbWlzZTxvYmplY3Q+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gVmFsaWRhdGUgaW5wdXRzXG4gICAgICBpZiAoIShzZWMgJiYgcm9vbU5hbWUgJiYgaXNsZXZlbCAmJiBhcGlVc2VyTmFtZSAmJiBtZW1iZXIpKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25FcnJvciA9IHtcbiAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICBydHBDYXBhYmlsaXRpZXM6IG51bGwsXG4gICAgICAgICAgcmVhc29uOiAnTWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXJzJyxcbiAgICAgICAgfTtcbiAgICAgICAgcmVqZWN0KHZhbGlkYXRpb25FcnJvcik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVmFsaWRhdGUgYWxwaGFudW1lcmljIGZvciByb29tTmFtZSwgYXBpVXNlck5hbWUsIGFuZCBtZW1iZXJcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVBbHBoYW51bWVyaWMudmFsaWRhdGVBbHBoYW51bWVyaWMoeyBzdHI6IHJvb21OYW1lIH0pO1xuICAgICAgICB0aGlzLnZhbGlkYXRlQWxwaGFudW1lcmljLnZhbGlkYXRlQWxwaGFudW1lcmljKHsgc3RyOiBhcGlVc2VyTmFtZSB9KTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUFscGhhbnVtZXJpYy52YWxpZGF0ZUFscGhhbnVtZXJpYyh7IHN0cjogbWVtYmVyIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbkVycm9yID0ge1xuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgIHJ0cENhcGFiaWxpdGllczogbnVsbCxcbiAgICAgICAgICByZWFzb246ICdJbnZhbGlkIHJvb21OYW1lIG9yIGFwaVVzZXJOYW1lIG9yIG1lbWJlcicsXG4gICAgICAgIH07XG4gICAgICAgIHJlamVjdCh2YWxpZGF0aW9uRXJyb3IpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFZhbGlkYXRlIHJvb21OYW1lIHN0YXJ0cyB3aXRoICdzJyBvciAncCdcbiAgICAgIGlmICghKHJvb21OYW1lLnN0YXJ0c1dpdGgoJ3MnKSB8fCByb29tTmFtZS5zdGFydHNXaXRoKCdwJykpKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25FcnJvciA9IHtcbiAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICBydHBDYXBhYmlsaXRpZXM6IG51bGwsXG4gICAgICAgICAgcmVhc29uOiAnSW52YWxpZCByb29tTmFtZSwgbXVzdCBzdGFydCB3aXRoIHMgb3IgcCcsXG4gICAgICAgIH07XG4gICAgICAgIHJlamVjdCh2YWxpZGF0aW9uRXJyb3IpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFZhbGlkYXRlIG90aGVyIGNvbmRpdGlvbnMgZm9yIHNlYywgcm9vbU5hbWUsIGlzbGV2ZWwsIGFwaVVzZXJOYW1lXG4gICAgICBpZiAoXG4gICAgICAgICEoXG4gICAgICAgICAgc2VjLmxlbmd0aCA9PT0gNjQgJiZcbiAgICAgICAgICByb29tTmFtZS5sZW5ndGggPj0gOCAmJlxuICAgICAgICAgIGlzbGV2ZWwubGVuZ3RoID09PSAxICYmXG4gICAgICAgICAgYXBpVXNlck5hbWUubGVuZ3RoID49IDYgJiZcbiAgICAgICAgICAoaXNsZXZlbCA9PT0gJzAnIHx8IGlzbGV2ZWwgPT09ICcxJyB8fCBpc2xldmVsID09PSAnMicpXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uRXJyb3IgPSB7XG4gICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgcnRwQ2FwYWJpbGl0aWVzOiBudWxsLFxuICAgICAgICAgIHJlYXNvbjogJ0ludmFsaWQgcm9vbU5hbWUgb3IgaXNsZXZlbCBvciBhcGlVc2VyTmFtZSBvciBzZWNyZXQnLFxuICAgICAgICB9O1xuICAgICAgICByZWplY3QodmFsaWRhdGlvbkVycm9yKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzb2NrZXQuZW1pdChcbiAgICAgICAgJ2pvaW5Db25Sb29tJyxcbiAgICAgICAgeyByb29tTmFtZSwgaXNsZXZlbCwgbWVtYmVyLCBzZWMsIGFwaVVzZXJOYW1lIH0sXG4gICAgICAgIGFzeW5jIChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgcnRwQ2FwYWJpbGl0aWVzIGlzIG51bGxcbiAgICAgICAgICAgIGlmIChkYXRhLnJ0cENhcGFiaWxpdGllcyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAvLyBDaGVjayBpZiBiYW5uZWQsIHN1c3BlbmRlZCwgb3Igbm9BZG1pblxuICAgICAgICAgICAgICBpZiAoZGF0YS5iYW5uZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VzZXIgaXMgYmFubmVkLicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChkYXRhLnN1c3BlbmRlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVXNlciBpcyBzdXNwZW5kZWQuJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGRhdGEubm9BZG1pbikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSG9zdCBoYXMgbm90IGpvaW5lZCB0aGUgcm9vbSB5ZXQuJyk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBSZXNvbHZlIHdpdGggdGhlIGRhdGEgcmVjZWl2ZWQgZnJvbSB0aGUgJ2pvaW5Db25Sb29tJyBldmVudFxuICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gUmVzb2x2ZSB3aXRoIHRoZSBkYXRhIHJlY2VpdmVkIGZyb20gdGhlICdqb2luQ29uUm9vbScgZXZlbnRcbiAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGVycm9ycyBkdXJpbmcgdGhlIGpvaW5Db25Sb29tIHByb2Nlc3NcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBqb2luaW5nIHJvb206JywgZXJyb3IpO1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0pO1xuICB9XG59XG4iXX0=