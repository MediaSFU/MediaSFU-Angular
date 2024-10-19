import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../methods/utils/validate-alphanumeric.service";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pbi1yb29tLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3Byb2R1Y2VyLWVtaXRzL2pvaW4tcm9vbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQTBCM0MsTUFBTSxPQUFPLFFBQVE7SUFDQztJQUFwQixZQUFvQixvQkFBMEM7UUFBMUMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtJQUFHLENBQUM7SUFFbEU7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQ2IsTUFBTSxFQUNOLFFBQVEsRUFDUixPQUFPLEVBQ1AsTUFBTSxFQUNOLEdBQUcsRUFDSCxXQUFXLEdBQ0s7UUFDaEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxrQkFBa0I7WUFDbEIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLFFBQVEsSUFBSSxPQUFPLElBQUksV0FBVyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQzNELE1BQU0sZUFBZSxHQUFHO29CQUN0QixPQUFPLEVBQUUsS0FBSztvQkFDZCxlQUFlLEVBQUUsSUFBSTtvQkFDckIsTUFBTSxFQUFFLDZCQUE2QjtpQkFDdEMsQ0FBQztnQkFDRixNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3hCLE9BQU87WUFDVCxDQUFDO1lBRUQsOERBQThEO1lBQzlELElBQUksQ0FBQztnQkFDSCxJQUFJLENBQUMsb0JBQW9CLENBQUMsb0JBQW9CLENBQUMsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLG9CQUFvQixDQUFDLEVBQUUsR0FBRyxFQUFF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UUFBUTtrQkFIcEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IFZhbGlkYXRlQWxwaGFudW1lcmljIH0gZnJvbSAnLi4vLi4vbWV0aG9kcy91dGlscy92YWxpZGF0ZS1hbHBoYW51bWVyaWMuc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSm9pblJvb21PcHRpb25zIHtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgbWVtYmVyOiBzdHJpbmc7XG4gIHNlYzogc3RyaW5nO1xuICBhcGlVc2VyTmFtZTogc3RyaW5nO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBKb2luUm9vbVR5cGUgPSAoXG4gIHNvY2tldDogU29ja2V0LFxuICByb29tTmFtZTogc3RyaW5nLFxuICBpc2xldmVsOiBzdHJpbmcsXG4gIG1lbWJlcjogc3RyaW5nLFxuICBzZWM6IHN0cmluZyxcbiAgYXBpVXNlck5hbWU6IHN0cmluZyxcbikgPT4gUHJvbWlzZTxvYmplY3Q+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgSm9pblJvb20ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZhbGlkYXRlQWxwaGFudW1lcmljOiBWYWxpZGF0ZUFscGhhbnVtZXJpYykge31cblxuICAvKipcbiAgICogSm9pbnMgYSB1c2VyIHRvIGEgc3BlY2lmaWVkIHJvb20gdmlhIGEgc29ja2V0IGNvbm5lY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGpvaW5pbmcgdGhlIHJvb20uXG4gICAqIEBwYXJhbSB7U29ja2V0fSBvcHRpb25zLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgdG8gdXNlIGZvciBjb21tdW5pY2F0aW9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tIHRvIGpvaW4uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmlzbGV2ZWwgLSBUaGUgbGV2ZWwgb2YgdGhlIHVzZXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm1lbWJlciAtIFRoZSBtZW1iZXIgaWRlbnRpZmllci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuc2VjIC0gVGhlIHNlY3VyaXR5IHRva2VuLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5hcGlVc2VyTmFtZSAtIFRoZSBBUEkgdXNlcm5hbWUgb2YgdGhlIHVzZXIuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG9iamVjdD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGRhdGEgcmVjZWl2ZWQgZnJvbSB0aGUgJ2pvaW5Sb29tJyBldmVudCBvciByZWplY3RzIHdpdGggYSB2YWxpZGF0aW9uIGVycm9yLlxuICAgKlxuICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZSB1c2VyIGlzIGJhbm5lZCwgc3VzcGVuZGVkLCBvciBpZiB0aGUgaG9zdCBoYXMgbm90IGpvaW5lZCB0aGUgcm9vbSB5ZXQuXG4gICAqL1xuICBhc3luYyBqb2luUm9vbSh7XG4gICAgc29ja2V0LFxuICAgIHJvb21OYW1lLFxuICAgIGlzbGV2ZWwsXG4gICAgbWVtYmVyLFxuICAgIHNlYyxcbiAgICBhcGlVc2VyTmFtZSxcbiAgfTogSm9pblJvb21PcHRpb25zKTogUHJvbWlzZTxvYmplY3Q+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gVmFsaWRhdGUgaW5wdXRzXG4gICAgICBpZiAoIShzZWMgJiYgcm9vbU5hbWUgJiYgaXNsZXZlbCAmJiBhcGlVc2VyTmFtZSAmJiBtZW1iZXIpKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25FcnJvciA9IHtcbiAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICBydHBDYXBhYmlsaXRpZXM6IG51bGwsXG4gICAgICAgICAgcmVhc29uOiAnTWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXJzJyxcbiAgICAgICAgfTtcbiAgICAgICAgcmVqZWN0KHZhbGlkYXRpb25FcnJvcik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVmFsaWRhdGUgYWxwaGFudW1lcmljIGZvciByb29tTmFtZSwgYXBpVXNlck5hbWUsIGFuZCBtZW1iZXJcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVBbHBoYW51bWVyaWMudmFsaWRhdGVBbHBoYW51bWVyaWMoeyBzdHI6IHJvb21OYW1lIH0pO1xuICAgICAgICB0aGlzLnZhbGlkYXRlQWxwaGFudW1lcmljLnZhbGlkYXRlQWxwaGFudW1lcmljKHsgc3RyOiBhcGlVc2VyTmFtZSB9KTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUFscGhhbnVtZXJpYy52YWxpZGF0ZUFscGhhbnVtZXJpYyh7IHN0cjogbWVtYmVyIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbkVycm9yID0ge1xuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgIHJ0cENhcGFiaWxpdGllczogbnVsbCxcbiAgICAgICAgICByZWFzb246ICdJbnZhbGlkIHJvb21OYW1lIG9yIGFwaVVzZXJOYW1lIG9yIG1lbWJlcicsXG4gICAgICAgIH07XG4gICAgICAgIHJlamVjdCh2YWxpZGF0aW9uRXJyb3IpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFZhbGlkYXRlIHJvb21OYW1lIHN0YXJ0cyB3aXRoICdzJyBvciAncCdcbiAgICAgIGlmICghKHJvb21OYW1lLnN0YXJ0c1dpdGgoJ3MnKSB8fCByb29tTmFtZS5zdGFydHNXaXRoKCdwJykpKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25FcnJvciA9IHtcbiAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICBydHBDYXBhYmlsaXRpZXM6IG51bGwsXG4gICAgICAgICAgcmVhc29uOiAnSW52YWxpZCByb29tTmFtZSwgbXVzdCBzdGFydCB3aXRoIHMgb3IgcCcsXG4gICAgICAgIH07XG4gICAgICAgIHJlamVjdCh2YWxpZGF0aW9uRXJyb3IpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFZhbGlkYXRlIG90aGVyIGNvbmRpdGlvbnMgZm9yIHNlYywgcm9vbU5hbWUsIGlzbGV2ZWwsIGFwaVVzZXJOYW1lXG4gICAgICBpZiAoXG4gICAgICAgICEoXG4gICAgICAgICAgc2VjLmxlbmd0aCA9PT0gNjQgJiZcbiAgICAgICAgICByb29tTmFtZS5sZW5ndGggPj0gOCAmJlxuICAgICAgICAgIGlzbGV2ZWwubGVuZ3RoID09PSAxICYmXG4gICAgICAgICAgYXBpVXNlck5hbWUubGVuZ3RoID49IDYgJiZcbiAgICAgICAgICAoaXNsZXZlbCA9PT0gJzAnIHx8IGlzbGV2ZWwgPT09ICcxJyB8fCBpc2xldmVsID09PSAnMicpXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uRXJyb3IgPSB7XG4gICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgcnRwQ2FwYWJpbGl0aWVzOiBudWxsLFxuICAgICAgICAgIHJlYXNvbjogJ0ludmFsaWQgcm9vbU5hbWUgb3IgaXNsZXZlbCBvciBhcGlVc2VyTmFtZSBvciBzZWNyZXQnLFxuICAgICAgICB9O1xuICAgICAgICByZWplY3QodmFsaWRhdGlvbkVycm9yKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzb2NrZXQuZW1pdChcbiAgICAgICAgJ2pvaW5Sb29tJyxcbiAgICAgICAgeyByb29tTmFtZSwgaXNsZXZlbCwgbWVtYmVyLCBzZWMsIGFwaVVzZXJOYW1lIH0sXG4gICAgICAgIGFzeW5jIChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgcnRwQ2FwYWJpbGl0aWVzIGlzIG51bGxcbiAgICAgICAgICAgIGlmIChkYXRhLnJ0cENhcGFiaWxpdGllcyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAvLyBDaGVjayBpZiBiYW5uZWQsIHN1c3BlbmRlZCwgb3Igbm9BZG1pblxuICAgICAgICAgICAgICBpZiAoZGF0YS5iYW5uZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VzZXIgaXMgYmFubmVkLicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChkYXRhLnN1c3BlbmRlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVXNlciBpcyBzdXNwZW5kZWQuJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGRhdGEubm9BZG1pbikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSG9zdCBoYXMgbm90IGpvaW5lZCB0aGUgcm9vbSB5ZXQuJyk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBSZXNvbHZlIHdpdGggdGhlIGRhdGEgcmVjZWl2ZWQgZnJvbSB0aGUgJ2pvaW5Sb29tJyBldmVudFxuICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gUmVzb2x2ZSB3aXRoIHRoZSBkYXRhIHJlY2VpdmVkIGZyb20gdGhlICdqb2luUm9vbScgZXZlbnRcbiAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGVycm9ycyBkdXJpbmcgdGhlIGpvaW5Sb29tIHByb2Nlc3NcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBqb2luaW5nIHJvb206JywgZXJyb3IpO1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0pO1xuICB9XG59XG4iXX0=