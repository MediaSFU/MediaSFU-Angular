import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtcmFuZG9tLXBhcnRpY2lwYW50cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvdXRpbHMvZ2VuZXJhdGUtcmFuZG9tLXBhcnRpY2lwYW50cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBaUIzQyxNQUFNLE9BQU8sMEJBQTBCO0lBQ3JDOzs7Ozs7Ozs7T0FTRztJQUNILDBCQUEwQixDQUFDLEVBQ3pCLE1BQU0sRUFDTixNQUFNLEdBQUcsRUFBRSxFQUNYLElBQUksRUFDSixnQkFBZ0IsR0FBRyxLQUFLLEdBQ1U7UUFDbEMsTUFBTSxZQUFZLEdBQWtCLEVBQUUsQ0FBQztRQUN2QyxJQUFJLEtBQUssR0FBRztZQUNWLE9BQU87WUFDUCxLQUFLO1lBQ0wsU0FBUztZQUNULE9BQU87WUFDUCxLQUFLO1lBQ0wsT0FBTztZQUNQLE9BQU87WUFDUCxNQUFNO1lBQ04sS0FBSztZQUNMLE1BQU07WUFDTixNQUFNO1lBQ04sTUFBTTtZQUNOLEtBQUs7WUFDTCxNQUFNO1lBQ04sUUFBUTtZQUNSLE1BQU07WUFDTixPQUFPO1lBQ1AsUUFBUTtZQUNSLE9BQU87WUFDUCxNQUFNO1lBQ04sUUFBUTtZQUNSLE9BQU87WUFDUCxPQUFPO1lBQ1AsUUFBUTtZQUNSLFFBQVE7WUFDUixNQUFNO1NBQ1AsQ0FBQztRQUVGLHNDQUFzQztRQUN0QyxJQUFJLGdCQUFnQixFQUFFLENBQUM7WUFDckIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixDQUFDO1FBRUQsMEVBQTBFO1FBQzFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDNUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ2pELEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixDQUFDO1FBRUQsc0NBQXNDO1FBQ3RDLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztZQUNyQixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLENBQUM7UUFFRCxtQ0FBbUM7UUFDbkMsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFaEQsc0VBQXNFO1FBQ3RFLE1BQU0sYUFBYSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNqQyxLQUFLLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNsRCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlFLENBQUM7UUFFRCxJQUFJLG9CQUFvQixHQUFHLEtBQUssQ0FBQztRQUVqQywrQkFBK0I7UUFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM5QyxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsTUFBTSxXQUFXLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQywrQkFBK0I7WUFDaEgsTUFBTSxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLHdDQUF3QztZQUUzRyxJQUFJLFdBQVcsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDeEIsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1lBQzlCLENBQUM7WUFFRCxZQUFZLENBQUMsSUFBSSxDQUFDO2dCQUNoQixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsT0FBTyxFQUFFLFdBQVc7Z0JBQ3BCLEtBQUssRUFBRSxXQUFXO2dCQUNsQixFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtnQkFDaEIsT0FBTyxFQUFFLFNBQVMsQ0FBQyxFQUFFO2dCQUNyQixPQUFPLEVBQUUsU0FBUyxDQUFDLEVBQUU7YUFDdEIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7dUdBckdVLDBCQUEwQjsyR0FBMUIsMEJBQTBCLGNBRnpCLE1BQU07OzJGQUVQLDBCQUEwQjtrQkFIdEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYXJ0aWNpcGFudCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIEdlbmVyYXRlUmFuZG9tUGFydGljaXBhbnRzT3B0aW9ucyB7XG4gIG1lbWJlcjogc3RyaW5nO1xuICBjb0hvc3Q/OiBzdHJpbmc7XG4gIGhvc3Q6IHN0cmluZztcbiAgZm9yQ2hhdEJyb2FkY2FzdD86IGJvb2xlYW47XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIEdlbmVyYXRlUmFuZG9tUGFydGljaXBhbnRzVHlwZSA9IChcbiAgb3B0aW9uczogR2VuZXJhdGVSYW5kb21QYXJ0aWNpcGFudHNPcHRpb25zLFxuKSA9PiBQYXJ0aWNpcGFudFtdO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgR2VuZXJhdGVSYW5kb21QYXJ0aWNpcGFudHMge1xuICAvKipcbiAgICogR2VuZXJhdGVzIGEgbGlzdCBvZiByYW5kb20gcGFydGljaXBhbnRzIHdpdGggc3BlY2lmaWVkIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGdlbmVyYXRpbmcgcGFydGljaXBhbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5tZW1iZXIgLSBUaGUgbWVtYmVyIHRvIGluY2x1ZGUgaW4gdGhlIHBhcnRpY2lwYW50cyBsaXN0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuY29Ib3N0PVwiXCJdIC0gVGhlIGNvLWhvc3QgdG8gaW5jbHVkZSBpbiB0aGUgcGFydGljaXBhbnRzIGxpc3QuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmhvc3QgLSBUaGUgaG9zdCB0byBpbmNsdWRlIGluIHRoZSBwYXJ0aWNpcGFudHMgbGlzdC5cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5mb3JDaGF0QnJvYWRjYXN0PWZhbHNlXSAtIFdoZXRoZXIgdGhlIHBhcnRpY2lwYW50cyBhcmUgZm9yIGEgY2hhdCBicm9hZGNhc3QuXG4gICAqIEByZXR1cm5zIHtQYXJ0aWNpcGFudFtdfSBBbiBhcnJheSBvZiBnZW5lcmF0ZWQgcGFydGljaXBhbnRzLlxuICAgKi9cbiAgZ2VuZXJhdGVSYW5kb21QYXJ0aWNpcGFudHMoe1xuICAgIG1lbWJlcixcbiAgICBjb0hvc3QgPSAnJyxcbiAgICBob3N0LFxuICAgIGZvckNoYXRCcm9hZGNhc3QgPSBmYWxzZSxcbiAgfTogR2VuZXJhdGVSYW5kb21QYXJ0aWNpcGFudHNPcHRpb25zKTogUGFydGljaXBhbnRbXSB7XG4gICAgY29uc3QgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdID0gW107XG4gICAgbGV0IG5hbWVzID0gW1xuICAgICAgJ0FsaWNlJyxcbiAgICAgICdCb2InLFxuICAgICAgJ0NoYXJsaWUnLFxuICAgICAgJ0RhdmlkJyxcbiAgICAgICdFdmUnLFxuICAgICAgJ0ZyYW5rJyxcbiAgICAgICdHcmFjZScsXG4gICAgICAnSGFuaycsXG4gICAgICAnSXZ5JyxcbiAgICAgICdKYWNrJyxcbiAgICAgICdLYXRlJyxcbiAgICAgICdMaWFtJyxcbiAgICAgICdNaWEnLFxuICAgICAgJ05pbmEnLFxuICAgICAgJ09saXZpYScsXG4gICAgICAnUGV0ZScsXG4gICAgICAnUXVpbm4nLFxuICAgICAgJ1JhY2hlbCcsXG4gICAgICAnU3RldmUnLFxuICAgICAgJ1RpbmEnLFxuICAgICAgJ1Vyc3VsYScsXG4gICAgICAnVmluY2UnLFxuICAgICAgJ1dlbmR5JyxcbiAgICAgICdYYW5kZXInLFxuICAgICAgJ1l2b25uZScsXG4gICAgICAnWmFjaycsXG4gICAgXTtcblxuICAgIC8vIExpbWl0IG5hbWVzIHRvIDIgZm9yIGNoYXQgYnJvYWRjYXN0XG4gICAgaWYgKGZvckNoYXRCcm9hZGNhc3QpIHtcbiAgICAgIG5hbWVzLnNwbGljZSgyKTtcbiAgICB9XG5cbiAgICAvLyBQbGFjZSBtZW1iZXIsIGNvSG9zdCwgYW5kIGhvc3QgYXQgdGhlIGJlZ2lubmluZyBpZiBub3QgYWxyZWFkeSBpbmNsdWRlZFxuICAgIGlmICghbmFtZXMuaW5jbHVkZXMobWVtYmVyKSkge1xuICAgICAgbmFtZXMudW5zaGlmdChtZW1iZXIpO1xuICAgIH1cbiAgICBpZiAoIW5hbWVzLmluY2x1ZGVzKGNvSG9zdCkgJiYgIWZvckNoYXRCcm9hZGNhc3QpIHtcbiAgICAgIG5hbWVzLnVuc2hpZnQoY29Ib3N0KTtcbiAgICB9XG4gICAgaWYgKCFuYW1lcy5pbmNsdWRlcyhob3N0KSkge1xuICAgICAgbmFtZXMudW5zaGlmdChob3N0KTtcbiAgICB9XG5cbiAgICAvLyBMaW1pdCBuYW1lcyB0byAyIGZvciBjaGF0IGJyb2FkY2FzdFxuICAgIGlmIChmb3JDaGF0QnJvYWRjYXN0KSB7XG4gICAgICBuYW1lcy5zcGxpY2UoMik7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIG5hbWVzIG9mIGxlbmd0aCAxIG9yIGxlc3NcbiAgICBuYW1lcyA9IG5hbWVzLmZpbHRlcigobmFtZSkgPT4gbmFtZS5sZW5ndGggPiAxKTtcblxuICAgIC8vIFNodWZmbGUgdGhlIG5hbWVzIGFycmF5IHRvIGVuc3VyZSB1bmlxdWUgbmFtZXMgZm9yIGVhY2ggcGFydGljaXBhbnRcbiAgICBjb25zdCBzaHVmZmxlZE5hbWVzID0gWy4uLm5hbWVzXTtcbiAgICBmb3IgKGxldCBpID0gc2h1ZmZsZWROYW1lcy5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICBjb25zdCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgICBbc2h1ZmZsZWROYW1lc1tpXSwgc2h1ZmZsZWROYW1lc1tqXV0gPSBbc2h1ZmZsZWROYW1lc1tqXSwgc2h1ZmZsZWROYW1lc1tpXV07XG4gICAgfVxuXG4gICAgbGV0IGhhc0xldmVsMlBhcnRpY2lwYW50ID0gZmFsc2U7XG5cbiAgICAvLyBHZW5lcmF0ZSBwYXJ0aWNpcGFudCBvYmplY3RzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaHVmZmxlZE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCByYW5kb21OYW1lID0gc2h1ZmZsZWROYW1lc1tpXTtcbiAgICAgIGNvbnN0IHJhbmRvbUxldmVsID0gaGFzTGV2ZWwyUGFydGljaXBhbnQgPyAnMScgOiByYW5kb21OYW1lID09IGhvc3QgPyAnMicgOiAnMSc7IC8vIFNldCBpc2xldmVsIHRvICcyJyBvbmx5IG9uY2VcbiAgICAgIGNvbnN0IHJhbmRvbU11dGVkID0gZm9yQ2hhdEJyb2FkY2FzdCA/IHRydWUgOiBNYXRoLnJhbmRvbSgpIDwgMC41OyAvLyBTZXQgbXV0ZWQgdG8gZmFsc2UgZm9yIGNoYXQgYnJvYWRjYXN0XG5cbiAgICAgIGlmIChyYW5kb21MZXZlbCA9PT0gJzInKSB7XG4gICAgICAgIGhhc0xldmVsMlBhcnRpY2lwYW50ID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcGFydGljaXBhbnRzLnB1c2goe1xuICAgICAgICBuYW1lOiByYW5kb21OYW1lLFxuICAgICAgICBpc2xldmVsOiByYW5kb21MZXZlbCxcbiAgICAgICAgbXV0ZWQ6IHJhbmRvbU11dGVkLFxuICAgICAgICBpZDogaS50b1N0cmluZygpLFxuICAgICAgICBhdWRpb0lEOiBgYXVkaW8tJHtpfWAsXG4gICAgICAgIHZpZGVvSUQ6IGB2aWRlby0ke2l9YCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJ0aWNpcGFudHM7XG4gIH1cbn1cbiJdfQ==