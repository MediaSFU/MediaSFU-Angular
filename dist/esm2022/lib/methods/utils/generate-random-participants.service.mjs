import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * GenerateRandomParticipants - Service to generate a list of random participants.
 *
 * This service creates a list of participants based on a set of specified options, with customization for chat broadcasts
 * and designation of specific roles like member, co-host, and host.
 *
 * @class
 * @name GenerateRandomParticipants
 * @example
 * ```typescript
 * const generateRandomParticipantsService = new GenerateRandomParticipants();
 * const participants = generateRandomParticipantsService.generateRandomParticipants({
 *   member: 'Alice',
 *   coHost: 'Bob',
 *   host: 'Charlie',
 *   forChatBroadcast: true
 * });
 * console.log(participants);
 * ```
 *
 * @param {Object} options - Options for generating participants.
 * @param {string} options.member - Primary member to include in the participants list.
 * @param {string} [options.coHost] - Optional co-host in the participants list.
 * @param {string} options.host - Host to include in the participants list.
 * @param {boolean} [options.forChatBroadcast=false] - Indicates if participants are for a chat broadcast.
 * @returns {Participant[]} Array of generated participants with randomized levels, muted states, and identifiers.
 */
export class GenerateRandomParticipants {
    /**
     * Generates a list of random participants with specified options.
     *
     * @param {Object} options - The options for generating participants.
     * @param {string} options.member - The member to include in the participants list.
     * @param {string} [options.coHost=""] - The co-host to include in the participants list.
     * @param {string} options.host - The host to include in the participants list.
     * @param {boolean} [options.forChatBroadcast=false] - Whether the participants are for a chat broadcast.
     * @returns {Participant[]} An array of generated participants.
     */
    generateRandomParticipants({ member, coHost = '', host, forChatBroadcast = false, }) {
        const participants = [];
        let names = [
            'Alice',
            'Bob',
            'Charlie',
            'David',
            'Eve',
            'Frank',
            'Grace',
            'Hank',
            'Ivy',
            'Jack',
            'Kate',
            'Liam',
            'Mia',
            'Nina',
            'Olivia',
            'Pete',
            'Quinn',
            'Rachel',
            'Steve',
            'Tina',
            'Ursula',
            'Vince',
            'Wendy',
            'Xander',
            'Yvonne',
            'Zack',
        ];
        // Limit names to 2 for chat broadcast
        if (forChatBroadcast) {
            names.splice(2);
        }
        // Place member, coHost, and host at the beginning if not already included
        if (!names.includes(member)) {
            names.unshift(member);
        }
        if (!names.includes(coHost) && !forChatBroadcast) {
            names.unshift(coHost);
        }
        if (!names.includes(host)) {
            names.unshift(host);
        }
        // Limit names to 2 for chat broadcast
        if (forChatBroadcast) {
            names.splice(2);
        }
        // Remove names of length 1 or less
        names = names.filter((name) => name.length > 1);
        // Shuffle the names array to ensure unique names for each participant
        const shuffledNames = [...names];
        for (let i = shuffledNames.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledNames[i], shuffledNames[j]] = [shuffledNames[j], shuffledNames[i]];
        }
        let hasLevel2Participant = false;
        // Generate participant objects
        for (let i = 0; i < shuffledNames.length; i++) {
            const randomName = shuffledNames[i];
            const randomLevel = hasLevel2Participant ? '1' : randomName == host ? '2' : '1'; // Set islevel to '2' only once
            const randomMuted = forChatBroadcast ? true : Math.random() < 0.5; // Set muted to false for chat broadcast
            if (randomLevel === '2') {
                hasLevel2Participant = true;
            }
            participants.push({
                name: randomName,
                islevel: randomLevel,
                muted: randomMuted,
                id: i.toString(),
                audioID: `audio-${i}`,
                videoID: `video-${i}`,
            });
        }
        return participants;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GenerateRandomParticipants, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GenerateRandomParticipants, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GenerateRandomParticipants, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtcmFuZG9tLXBhcnRpY2lwYW50cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvdXRpbHMvZ2VuZXJhdGUtcmFuZG9tLXBhcnRpY2lwYW50cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBYzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUtILE1BQU0sT0FBTywwQkFBMEI7SUFDckM7Ozs7Ozs7OztPQVNHO0lBQ0gsMEJBQTBCLENBQUMsRUFDekIsTUFBTSxFQUNOLE1BQU0sR0FBRyxFQUFFLEVBQ1gsSUFBSSxFQUNKLGdCQUFnQixHQUFHLEtBQUssR0FDVTtRQUNsQyxNQUFNLFlBQVksR0FBa0IsRUFBRSxDQUFDO1FBQ3ZDLElBQUksS0FBSyxHQUFHO1lBQ1YsT0FBTztZQUNQLEtBQUs7WUFDTCxTQUFTO1lBQ1QsT0FBTztZQUNQLEtBQUs7WUFDTCxPQUFPO1lBQ1AsT0FBTztZQUNQLE1BQU07WUFDTixLQUFLO1lBQ0wsTUFBTTtZQUNOLE1BQU07WUFDTixNQUFNO1lBQ04sS0FBSztZQUNMLE1BQU07WUFDTixRQUFRO1lBQ1IsTUFBTTtZQUNOLE9BQU87WUFDUCxRQUFRO1lBQ1IsT0FBTztZQUNQLE1BQU07WUFDTixRQUFRO1lBQ1IsT0FBTztZQUNQLE9BQU87WUFDUCxRQUFRO1lBQ1IsUUFBUTtZQUNSLE1BQU07U0FDUCxDQUFDO1FBRUYsc0NBQXNDO1FBQ3RDLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztZQUNyQixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLENBQUM7UUFFRCwwRUFBMEU7UUFDMUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUM1QixLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDakQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUMxQixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLENBQUM7UUFFRCxzQ0FBc0M7UUFDdEMsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3JCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsQ0FBQztRQUVELG1DQUFtQztRQUNuQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVoRCxzRUFBc0U7UUFDdEUsTUFBTSxhQUFhLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQUVELElBQUksb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1FBRWpDLCtCQUErQjtRQUMvQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzlDLE1BQU0sVUFBVSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxNQUFNLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLCtCQUErQjtZQUNoSCxNQUFNLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsd0NBQXdDO1lBRTNHLElBQUksV0FBVyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUN4QixvQkFBb0IsR0FBRyxJQUFJLENBQUM7WUFDOUIsQ0FBQztZQUVELFlBQVksQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUUsV0FBVztnQkFDcEIsS0FBSyxFQUFFLFdBQVc7Z0JBQ2xCLEVBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFO2dCQUNoQixPQUFPLEVBQUUsU0FBUyxDQUFDLEVBQUU7Z0JBQ3JCLE9BQU8sRUFBRSxTQUFTLENBQUMsRUFBRTthQUN0QixDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQzt1R0FyR1UsMEJBQTBCOzJHQUExQiwwQkFBMEIsY0FGekIsTUFBTTs7MkZBRVAsMEJBQTBCO2tCQUh0QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhcnRpY2lwYW50IH0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcbmV4cG9ydCBpbnRlcmZhY2UgR2VuZXJhdGVSYW5kb21QYXJ0aWNpcGFudHNPcHRpb25zIHtcbiAgbWVtYmVyOiBzdHJpbmc7XG4gIGNvSG9zdD86IHN0cmluZztcbiAgaG9zdDogc3RyaW5nO1xuICBmb3JDaGF0QnJvYWRjYXN0PzogYm9vbGVhbjtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgR2VuZXJhdGVSYW5kb21QYXJ0aWNpcGFudHNUeXBlID0gKFxuICBvcHRpb25zOiBHZW5lcmF0ZVJhbmRvbVBhcnRpY2lwYW50c09wdGlvbnMsXG4pID0+IFBhcnRpY2lwYW50W107XG5cbi8qKlxuICogR2VuZXJhdGVSYW5kb21QYXJ0aWNpcGFudHMgLSBTZXJ2aWNlIHRvIGdlbmVyYXRlIGEgbGlzdCBvZiByYW5kb20gcGFydGljaXBhbnRzLlxuICpcbiAqIFRoaXMgc2VydmljZSBjcmVhdGVzIGEgbGlzdCBvZiBwYXJ0aWNpcGFudHMgYmFzZWQgb24gYSBzZXQgb2Ygc3BlY2lmaWVkIG9wdGlvbnMsIHdpdGggY3VzdG9taXphdGlvbiBmb3IgY2hhdCBicm9hZGNhc3RzXG4gKiBhbmQgZGVzaWduYXRpb24gb2Ygc3BlY2lmaWMgcm9sZXMgbGlrZSBtZW1iZXIsIGNvLWhvc3QsIGFuZCBob3N0LlxuICpcbiAqIEBjbGFzc1xuICogQG5hbWUgR2VuZXJhdGVSYW5kb21QYXJ0aWNpcGFudHNcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBnZW5lcmF0ZVJhbmRvbVBhcnRpY2lwYW50c1NlcnZpY2UgPSBuZXcgR2VuZXJhdGVSYW5kb21QYXJ0aWNpcGFudHMoKTtcbiAqIGNvbnN0IHBhcnRpY2lwYW50cyA9IGdlbmVyYXRlUmFuZG9tUGFydGljaXBhbnRzU2VydmljZS5nZW5lcmF0ZVJhbmRvbVBhcnRpY2lwYW50cyh7XG4gKiAgIG1lbWJlcjogJ0FsaWNlJyxcbiAqICAgY29Ib3N0OiAnQm9iJyxcbiAqICAgaG9zdDogJ0NoYXJsaWUnLFxuICogICBmb3JDaGF0QnJvYWRjYXN0OiB0cnVlXG4gKiB9KTtcbiAqIGNvbnNvbGUubG9nKHBhcnRpY2lwYW50cyk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIGdlbmVyYXRpbmcgcGFydGljaXBhbnRzLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubWVtYmVyIC0gUHJpbWFyeSBtZW1iZXIgdG8gaW5jbHVkZSBpbiB0aGUgcGFydGljaXBhbnRzIGxpc3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuY29Ib3N0XSAtIE9wdGlvbmFsIGNvLWhvc3QgaW4gdGhlIHBhcnRpY2lwYW50cyBsaXN0LlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaG9zdCAtIEhvc3QgdG8gaW5jbHVkZSBpbiB0aGUgcGFydGljaXBhbnRzIGxpc3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmZvckNoYXRCcm9hZGNhc3Q9ZmFsc2VdIC0gSW5kaWNhdGVzIGlmIHBhcnRpY2lwYW50cyBhcmUgZm9yIGEgY2hhdCBicm9hZGNhc3QuXG4gKiBAcmV0dXJucyB7UGFydGljaXBhbnRbXX0gQXJyYXkgb2YgZ2VuZXJhdGVkIHBhcnRpY2lwYW50cyB3aXRoIHJhbmRvbWl6ZWQgbGV2ZWxzLCBtdXRlZCBzdGF0ZXMsIGFuZCBpZGVudGlmaWVycy5cbiAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgR2VuZXJhdGVSYW5kb21QYXJ0aWNpcGFudHMge1xuICAvKipcbiAgICogR2VuZXJhdGVzIGEgbGlzdCBvZiByYW5kb20gcGFydGljaXBhbnRzIHdpdGggc3BlY2lmaWVkIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGdlbmVyYXRpbmcgcGFydGljaXBhbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5tZW1iZXIgLSBUaGUgbWVtYmVyIHRvIGluY2x1ZGUgaW4gdGhlIHBhcnRpY2lwYW50cyBsaXN0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuY29Ib3N0PVwiXCJdIC0gVGhlIGNvLWhvc3QgdG8gaW5jbHVkZSBpbiB0aGUgcGFydGljaXBhbnRzIGxpc3QuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmhvc3QgLSBUaGUgaG9zdCB0byBpbmNsdWRlIGluIHRoZSBwYXJ0aWNpcGFudHMgbGlzdC5cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5mb3JDaGF0QnJvYWRjYXN0PWZhbHNlXSAtIFdoZXRoZXIgdGhlIHBhcnRpY2lwYW50cyBhcmUgZm9yIGEgY2hhdCBicm9hZGNhc3QuXG4gICAqIEByZXR1cm5zIHtQYXJ0aWNpcGFudFtdfSBBbiBhcnJheSBvZiBnZW5lcmF0ZWQgcGFydGljaXBhbnRzLlxuICAgKi9cbiAgZ2VuZXJhdGVSYW5kb21QYXJ0aWNpcGFudHMoe1xuICAgIG1lbWJlcixcbiAgICBjb0hvc3QgPSAnJyxcbiAgICBob3N0LFxuICAgIGZvckNoYXRCcm9hZGNhc3QgPSBmYWxzZSxcbiAgfTogR2VuZXJhdGVSYW5kb21QYXJ0aWNpcGFudHNPcHRpb25zKTogUGFydGljaXBhbnRbXSB7XG4gICAgY29uc3QgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdID0gW107XG4gICAgbGV0IG5hbWVzID0gW1xuICAgICAgJ0FsaWNlJyxcbiAgICAgICdCb2InLFxuICAgICAgJ0NoYXJsaWUnLFxuICAgICAgJ0RhdmlkJyxcbiAgICAgICdFdmUnLFxuICAgICAgJ0ZyYW5rJyxcbiAgICAgICdHcmFjZScsXG4gICAgICAnSGFuaycsXG4gICAgICAnSXZ5JyxcbiAgICAgICdKYWNrJyxcbiAgICAgICdLYXRlJyxcbiAgICAgICdMaWFtJyxcbiAgICAgICdNaWEnLFxuICAgICAgJ05pbmEnLFxuICAgICAgJ09saXZpYScsXG4gICAgICAnUGV0ZScsXG4gICAgICAnUXVpbm4nLFxuICAgICAgJ1JhY2hlbCcsXG4gICAgICAnU3RldmUnLFxuICAgICAgJ1RpbmEnLFxuICAgICAgJ1Vyc3VsYScsXG4gICAgICAnVmluY2UnLFxuICAgICAgJ1dlbmR5JyxcbiAgICAgICdYYW5kZXInLFxuICAgICAgJ1l2b25uZScsXG4gICAgICAnWmFjaycsXG4gICAgXTtcblxuICAgIC8vIExpbWl0IG5hbWVzIHRvIDIgZm9yIGNoYXQgYnJvYWRjYXN0XG4gICAgaWYgKGZvckNoYXRCcm9hZGNhc3QpIHtcbiAgICAgIG5hbWVzLnNwbGljZSgyKTtcbiAgICB9XG5cbiAgICAvLyBQbGFjZSBtZW1iZXIsIGNvSG9zdCwgYW5kIGhvc3QgYXQgdGhlIGJlZ2lubmluZyBpZiBub3QgYWxyZWFkeSBpbmNsdWRlZFxuICAgIGlmICghbmFtZXMuaW5jbHVkZXMobWVtYmVyKSkge1xuICAgICAgbmFtZXMudW5zaGlmdChtZW1iZXIpO1xuICAgIH1cbiAgICBpZiAoIW5hbWVzLmluY2x1ZGVzKGNvSG9zdCkgJiYgIWZvckNoYXRCcm9hZGNhc3QpIHtcbiAgICAgIG5hbWVzLnVuc2hpZnQoY29Ib3N0KTtcbiAgICB9XG4gICAgaWYgKCFuYW1lcy5pbmNsdWRlcyhob3N0KSkge1xuICAgICAgbmFtZXMudW5zaGlmdChob3N0KTtcbiAgICB9XG5cbiAgICAvLyBMaW1pdCBuYW1lcyB0byAyIGZvciBjaGF0IGJyb2FkY2FzdFxuICAgIGlmIChmb3JDaGF0QnJvYWRjYXN0KSB7XG4gICAgICBuYW1lcy5zcGxpY2UoMik7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIG5hbWVzIG9mIGxlbmd0aCAxIG9yIGxlc3NcbiAgICBuYW1lcyA9IG5hbWVzLmZpbHRlcigobmFtZSkgPT4gbmFtZS5sZW5ndGggPiAxKTtcblxuICAgIC8vIFNodWZmbGUgdGhlIG5hbWVzIGFycmF5IHRvIGVuc3VyZSB1bmlxdWUgbmFtZXMgZm9yIGVhY2ggcGFydGljaXBhbnRcbiAgICBjb25zdCBzaHVmZmxlZE5hbWVzID0gWy4uLm5hbWVzXTtcbiAgICBmb3IgKGxldCBpID0gc2h1ZmZsZWROYW1lcy5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICBjb25zdCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgICBbc2h1ZmZsZWROYW1lc1tpXSwgc2h1ZmZsZWROYW1lc1tqXV0gPSBbc2h1ZmZsZWROYW1lc1tqXSwgc2h1ZmZsZWROYW1lc1tpXV07XG4gICAgfVxuXG4gICAgbGV0IGhhc0xldmVsMlBhcnRpY2lwYW50ID0gZmFsc2U7XG5cbiAgICAvLyBHZW5lcmF0ZSBwYXJ0aWNpcGFudCBvYmplY3RzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaHVmZmxlZE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCByYW5kb21OYW1lID0gc2h1ZmZsZWROYW1lc1tpXTtcbiAgICAgIGNvbnN0IHJhbmRvbUxldmVsID0gaGFzTGV2ZWwyUGFydGljaXBhbnQgPyAnMScgOiByYW5kb21OYW1lID09IGhvc3QgPyAnMicgOiAnMSc7IC8vIFNldCBpc2xldmVsIHRvICcyJyBvbmx5IG9uY2VcbiAgICAgIGNvbnN0IHJhbmRvbU11dGVkID0gZm9yQ2hhdEJyb2FkY2FzdCA/IHRydWUgOiBNYXRoLnJhbmRvbSgpIDwgMC41OyAvLyBTZXQgbXV0ZWQgdG8gZmFsc2UgZm9yIGNoYXQgYnJvYWRjYXN0XG5cbiAgICAgIGlmIChyYW5kb21MZXZlbCA9PT0gJzInKSB7XG4gICAgICAgIGhhc0xldmVsMlBhcnRpY2lwYW50ID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcGFydGljaXBhbnRzLnB1c2goe1xuICAgICAgICBuYW1lOiByYW5kb21OYW1lLFxuICAgICAgICBpc2xldmVsOiByYW5kb21MZXZlbCxcbiAgICAgICAgbXV0ZWQ6IHJhbmRvbU11dGVkLFxuICAgICAgICBpZDogaS50b1N0cmluZygpLFxuICAgICAgICBhdWRpb0lEOiBgYXVkaW8tJHtpfWAsXG4gICAgICAgIHZpZGVvSUQ6IGB2aWRlby0ke2l9YCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJ0aWNpcGFudHM7XG4gIH1cbn1cbiJdfQ==