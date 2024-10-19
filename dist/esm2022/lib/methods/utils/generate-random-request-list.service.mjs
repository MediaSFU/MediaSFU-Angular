import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class GenerateRandomRequestList {
    /**
     * Generates a list of random requests for participants, excluding the host and co-host.
     *
     * @param {GenerateRandomRequestListOptions} options - The options for generating the request list.
     * @param {Participant[]} options.participants - The list of participants.
     * @param {string} options.hostName - The name of the host.
     * @param {string} options.coHostName - The name of the co-host.
     * @param {number} options.numberOfRequests - The number of requests to generate for each participant.
     * @returns {Request[]} The generated list of requests.
     */
    generateRandomRequestList({ participants, hostName, coHostName, numberOfRequests, }) {
        // Filter out the host and co-host from the participants
        const filteredParticipants = participants.filter((participant) => participant.name !== hostName && participant.name !== coHostName);
        // Create an array with three possible request icons
        const requestIcons = ['fa-video', 'fa-desktop', 'fa-microphone'];
        // Shuffle the request icons array to ensure unique icons for each participant and randomly select a minimum of 1 and a maximum of 3 icons
        for (let i = requestIcons.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [requestIcons[i], requestIcons[j]] = [requestIcons[j], requestIcons[i]];
        }
        // Generate unique requests for each participant with unique icons
        const requestList = filteredParticipants.flatMap((participant) => {
            const uniqueIcons = new Set(); // To ensure unique icons for each participant
            const requests = [];
            for (let i = 0; i < numberOfRequests; i++) {
                let randomIcon;
                do {
                    randomIcon = requestIcons[Math.floor(Math.random() * requestIcons.length)];
                } while (uniqueIcons.has(randomIcon));
                uniqueIcons.add(randomIcon);
                requests.push({
                    id: participant.id || '',
                    name: participant.name.toLowerCase().replace(/\s/g, '_'),
                    icon: randomIcon,
                    username: participant.name.toLowerCase().replace(/\s/g, '_'),
                });
            }
            return requests;
        });
        return requestList;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GenerateRandomRequestList, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GenerateRandomRequestList, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GenerateRandomRequestList, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtcmFuZG9tLXJlcXVlc3QtbGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvdXRpbHMvZ2VuZXJhdGUtcmFuZG9tLXJlcXVlc3QtbGlzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBa0IzQyxNQUFNLE9BQU8seUJBQXlCO0lBQ3BDOzs7Ozs7Ozs7T0FTRztJQUNILHlCQUF5QixDQUFDLEVBQ3hCLFlBQVksRUFDWixRQUFRLEVBQ1IsVUFBVSxFQUNWLGdCQUFnQixHQUNpQjtRQUNqQyx3REFBd0Q7UUFDeEQsTUFBTSxvQkFBb0IsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUM5QyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksV0FBVyxDQUFDLElBQUksS0FBSyxVQUFVLENBQ2xGLENBQUM7UUFFRixvREFBb0Q7UUFDcEQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBRWpFLDBJQUEwSTtRQUMxSSxLQUFLLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNqRCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFFLENBQUM7UUFFRCxrRUFBa0U7UUFDbEUsTUFBTSxXQUFXLEdBQUcsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDL0QsTUFBTSxXQUFXLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQyxDQUFDLDhDQUE4QztZQUVyRixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzFDLElBQUksVUFBVSxDQUFDO2dCQUNmLEdBQUcsQ0FBQztvQkFDRixVQUFVLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUM3RSxDQUFDLFFBQVEsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFFdEMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFFNUIsUUFBUSxDQUFDLElBQUksQ0FBQztvQkFDWixFQUFFLEVBQUUsV0FBVyxDQUFDLEVBQUUsSUFBSSxFQUFFO29CQUN4QixJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztvQkFDeEQsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLFFBQVEsRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO2lCQUM3RCxDQUFDLENBQUM7WUFDTCxDQUFDO1lBRUQsT0FBTyxRQUFRLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO3VHQXhEVSx5QkFBeUI7MkdBQXpCLHlCQUF5QixjQUZ4QixNQUFNOzsyRkFFUCx5QkFBeUI7a0JBSHJDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVxdWVzdCwgUGFydGljaXBhbnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdlbmVyYXRlUmFuZG9tUmVxdWVzdExpc3RPcHRpb25zIHtcbiAgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICBob3N0TmFtZTogc3RyaW5nO1xuICBjb0hvc3ROYW1lPzogc3RyaW5nO1xuICBudW1iZXJPZlJlcXVlc3RzOiBudW1iZXI7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIEdlbmVyYXRlUmFuZG9tUmVxdWVzdExpc3RUeXBlID0gKFxuICBvcHRpb25zOiBHZW5lcmF0ZVJhbmRvbVJlcXVlc3RMaXN0T3B0aW9ucyxcbikgPT4gUmVxdWVzdFtdO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgR2VuZXJhdGVSYW5kb21SZXF1ZXN0TGlzdCB7XG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSBsaXN0IG9mIHJhbmRvbSByZXF1ZXN0cyBmb3IgcGFydGljaXBhbnRzLCBleGNsdWRpbmcgdGhlIGhvc3QgYW5kIGNvLWhvc3QuXG4gICAqXG4gICAqIEBwYXJhbSB7R2VuZXJhdGVSYW5kb21SZXF1ZXN0TGlzdE9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgZ2VuZXJhdGluZyB0aGUgcmVxdWVzdCBsaXN0LlxuICAgKiBAcGFyYW0ge1BhcnRpY2lwYW50W119IG9wdGlvbnMucGFydGljaXBhbnRzIC0gVGhlIGxpc3Qgb2YgcGFydGljaXBhbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5ob3N0TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBob3N0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jb0hvc3ROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNvLWhvc3QuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLm51bWJlck9mUmVxdWVzdHMgLSBUaGUgbnVtYmVyIG9mIHJlcXVlc3RzIHRvIGdlbmVyYXRlIGZvciBlYWNoIHBhcnRpY2lwYW50LlxuICAgKiBAcmV0dXJucyB7UmVxdWVzdFtdfSBUaGUgZ2VuZXJhdGVkIGxpc3Qgb2YgcmVxdWVzdHMuXG4gICAqL1xuICBnZW5lcmF0ZVJhbmRvbVJlcXVlc3RMaXN0KHtcbiAgICBwYXJ0aWNpcGFudHMsXG4gICAgaG9zdE5hbWUsXG4gICAgY29Ib3N0TmFtZSxcbiAgICBudW1iZXJPZlJlcXVlc3RzLFxuICB9OiBHZW5lcmF0ZVJhbmRvbVJlcXVlc3RMaXN0T3B0aW9ucyk6IFJlcXVlc3RbXSB7XG4gICAgLy8gRmlsdGVyIG91dCB0aGUgaG9zdCBhbmQgY28taG9zdCBmcm9tIHRoZSBwYXJ0aWNpcGFudHNcbiAgICBjb25zdCBmaWx0ZXJlZFBhcnRpY2lwYW50cyA9IHBhcnRpY2lwYW50cy5maWx0ZXIoXG4gICAgICAocGFydGljaXBhbnQpID0+IHBhcnRpY2lwYW50Lm5hbWUgIT09IGhvc3ROYW1lICYmIHBhcnRpY2lwYW50Lm5hbWUgIT09IGNvSG9zdE5hbWUsXG4gICAgKTtcblxuICAgIC8vIENyZWF0ZSBhbiBhcnJheSB3aXRoIHRocmVlIHBvc3NpYmxlIHJlcXVlc3QgaWNvbnNcbiAgICBjb25zdCByZXF1ZXN0SWNvbnMgPSBbJ2ZhLXZpZGVvJywgJ2ZhLWRlc2t0b3AnLCAnZmEtbWljcm9waG9uZSddO1xuXG4gICAgLy8gU2h1ZmZsZSB0aGUgcmVxdWVzdCBpY29ucyBhcnJheSB0byBlbnN1cmUgdW5pcXVlIGljb25zIGZvciBlYWNoIHBhcnRpY2lwYW50IGFuZCByYW5kb21seSBzZWxlY3QgYSBtaW5pbXVtIG9mIDEgYW5kIGEgbWF4aW11bSBvZiAzIGljb25zXG4gICAgZm9yIChsZXQgaSA9IHJlcXVlc3RJY29ucy5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICBjb25zdCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgICBbcmVxdWVzdEljb25zW2ldLCByZXF1ZXN0SWNvbnNbal1dID0gW3JlcXVlc3RJY29uc1tqXSwgcmVxdWVzdEljb25zW2ldXTtcbiAgICB9XG5cbiAgICAvLyBHZW5lcmF0ZSB1bmlxdWUgcmVxdWVzdHMgZm9yIGVhY2ggcGFydGljaXBhbnQgd2l0aCB1bmlxdWUgaWNvbnNcbiAgICBjb25zdCByZXF1ZXN0TGlzdCA9IGZpbHRlcmVkUGFydGljaXBhbnRzLmZsYXRNYXAoKHBhcnRpY2lwYW50KSA9PiB7XG4gICAgICBjb25zdCB1bmlxdWVJY29ucyA9IG5ldyBTZXQ8c3RyaW5nPigpOyAvLyBUbyBlbnN1cmUgdW5pcXVlIGljb25zIGZvciBlYWNoIHBhcnRpY2lwYW50XG5cbiAgICAgIGNvbnN0IHJlcXVlc3RzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mUmVxdWVzdHM7IGkrKykge1xuICAgICAgICBsZXQgcmFuZG9tSWNvbjtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIHJhbmRvbUljb24gPSByZXF1ZXN0SWNvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcmVxdWVzdEljb25zLmxlbmd0aCldO1xuICAgICAgICB9IHdoaWxlICh1bmlxdWVJY29ucy5oYXMocmFuZG9tSWNvbikpO1xuXG4gICAgICAgIHVuaXF1ZUljb25zLmFkZChyYW5kb21JY29uKTtcblxuICAgICAgICByZXF1ZXN0cy5wdXNoKHtcbiAgICAgICAgICBpZDogcGFydGljaXBhbnQuaWQgfHwgJycsXG4gICAgICAgICAgbmFtZTogcGFydGljaXBhbnQubmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccy9nLCAnXycpLFxuICAgICAgICAgIGljb246IHJhbmRvbUljb24sXG4gICAgICAgICAgdXNlcm5hbWU6IHBhcnRpY2lwYW50Lm5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMvZywgJ18nKSxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXF1ZXN0cztcbiAgICB9KTtcblxuICAgIHJldHVybiByZXF1ZXN0TGlzdDtcbiAgfVxufVxuIl19