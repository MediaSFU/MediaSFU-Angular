import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
  * Generates a random list of requests for participants, ensuring unique icons per participant
  * and excluding the host and co-host from the request list.
  *
  * @param {GenerateRandomRequestListOptions} options - Configuration options for generating requests.
  * @param {Participant[]} options.participants - Array of participant objects.
  * @param {string} options.hostName - Name of the host to be excluded.
  * @param {string} [options.coHostName] - Optional name of the co-host to be excluded.
  * @param {number} options.numberOfRequests - Number of requests to generate per participant.
  * @returns {Request[]} Array of requests, each uniquely associated with a participant.
  *
  * @example
  * ```typescript
  * const requestService = new GenerateRandomRequestList();
  * const participants = [
  *   { id: '1', name: 'Alice' },
  *   { id: '2', name: 'Bob' },
  *   { id: '3', name: 'Charlie' }
  * ];
  * const options = {
  *   participants,
  *   hostName: 'Alice',
  *   coHostName: 'Bob',
  *   numberOfRequests: 2
  * };
  *
  * const requests = requestService.generateRandomRequestList(options);
  *
  * console.log(requests);
  * // Output:
  * // [
  * //   { id: '3', name: 'charlie', icon: 'fa-microphone', username: 'charlie' },
  * //   { id: '3', name: 'charlie', icon: 'fa-desktop', username: 'charlie' }
  * // ]
  * ```
  */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtcmFuZG9tLXJlcXVlc3QtbGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvdXRpbHMvZ2VuZXJhdGUtcmFuZG9tLXJlcXVlc3QtbGlzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBZTFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW1DSTtBQUtMLE1BQU0sT0FBTyx5QkFBeUI7SUFDcEM7Ozs7Ozs7OztPQVNHO0lBQ0gseUJBQXlCLENBQUMsRUFDeEIsWUFBWSxFQUNaLFFBQVEsRUFDUixVQUFVLEVBQ1YsZ0JBQWdCLEdBQ2lCO1FBQ2pDLHdEQUF3RDtRQUN4RCxNQUFNLG9CQUFvQixHQUFHLFlBQVksQ0FBQyxNQUFNLENBQzlDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxXQUFXLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FDbEYsQ0FBQztRQUVGLG9EQUFvRDtRQUNwRCxNQUFNLFlBQVksR0FBRyxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFFakUsMElBQTBJO1FBQzFJLEtBQUssSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2pELE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUUsQ0FBQztRQUVELGtFQUFrRTtRQUNsRSxNQUFNLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUMvRCxNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDLENBQUMsOENBQThDO1lBRXJGLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDMUMsSUFBSSxVQUFVLENBQUM7Z0JBQ2YsR0FBRyxDQUFDO29CQUNGLFVBQVUsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzdFLENBQUMsUUFBUSxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUV0QyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUU1QixRQUFRLENBQUMsSUFBSSxDQUFDO29CQUNaLEVBQUUsRUFBRSxXQUFXLENBQUMsRUFBRSxJQUFJLEVBQUU7b0JBQ3hCLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO29CQUN4RCxJQUFJLEVBQUUsVUFBVTtvQkFDaEIsUUFBUSxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7aUJBQzdELENBQUMsQ0FBQztZQUNMLENBQUM7WUFFRCxPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7dUdBeERVLHlCQUF5QjsyR0FBekIseUJBQXlCLGNBRnhCLE1BQU07OzJGQUVQLHlCQUF5QjtrQkFIckMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXF1ZXN0LCBQYXJ0aWNpcGFudCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2VuZXJhdGVSYW5kb21SZXF1ZXN0TGlzdE9wdGlvbnMge1xuICBwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W107XG4gIGhvc3ROYW1lOiBzdHJpbmc7XG4gIGNvSG9zdE5hbWU/OiBzdHJpbmc7XG4gIG51bWJlck9mUmVxdWVzdHM6IG51bWJlcjtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgR2VuZXJhdGVSYW5kb21SZXF1ZXN0TGlzdFR5cGUgPSAoXG4gIG9wdGlvbnM6IEdlbmVyYXRlUmFuZG9tUmVxdWVzdExpc3RPcHRpb25zLFxuKSA9PiBSZXF1ZXN0W107XG5cbiAvKipcbiAgICogR2VuZXJhdGVzIGEgcmFuZG9tIGxpc3Qgb2YgcmVxdWVzdHMgZm9yIHBhcnRpY2lwYW50cywgZW5zdXJpbmcgdW5pcXVlIGljb25zIHBlciBwYXJ0aWNpcGFudFxuICAgKiBhbmQgZXhjbHVkaW5nIHRoZSBob3N0IGFuZCBjby1ob3N0IGZyb20gdGhlIHJlcXVlc3QgbGlzdC5cbiAgICpcbiAgICogQHBhcmFtIHtHZW5lcmF0ZVJhbmRvbVJlcXVlc3RMaXN0T3B0aW9uc30gb3B0aW9ucyAtIENvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgZ2VuZXJhdGluZyByZXF1ZXN0cy5cbiAgICogQHBhcmFtIHtQYXJ0aWNpcGFudFtdfSBvcHRpb25zLnBhcnRpY2lwYW50cyAtIEFycmF5IG9mIHBhcnRpY2lwYW50IG9iamVjdHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmhvc3ROYW1lIC0gTmFtZSBvZiB0aGUgaG9zdCB0byBiZSBleGNsdWRlZC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmNvSG9zdE5hbWVdIC0gT3B0aW9uYWwgbmFtZSBvZiB0aGUgY28taG9zdCB0byBiZSBleGNsdWRlZC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMubnVtYmVyT2ZSZXF1ZXN0cyAtIE51bWJlciBvZiByZXF1ZXN0cyB0byBnZW5lcmF0ZSBwZXIgcGFydGljaXBhbnQuXG4gICAqIEByZXR1cm5zIHtSZXF1ZXN0W119IEFycmF5IG9mIHJlcXVlc3RzLCBlYWNoIHVuaXF1ZWx5IGFzc29jaWF0ZWQgd2l0aCBhIHBhcnRpY2lwYW50LlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIGNvbnN0IHJlcXVlc3RTZXJ2aWNlID0gbmV3IEdlbmVyYXRlUmFuZG9tUmVxdWVzdExpc3QoKTtcbiAgICogY29uc3QgcGFydGljaXBhbnRzID0gW1xuICAgKiAgIHsgaWQ6ICcxJywgbmFtZTogJ0FsaWNlJyB9LFxuICAgKiAgIHsgaWQ6ICcyJywgbmFtZTogJ0JvYicgfSxcbiAgICogICB7IGlkOiAnMycsIG5hbWU6ICdDaGFybGllJyB9XG4gICAqIF07XG4gICAqIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAqICAgcGFydGljaXBhbnRzLFxuICAgKiAgIGhvc3ROYW1lOiAnQWxpY2UnLFxuICAgKiAgIGNvSG9zdE5hbWU6ICdCb2InLFxuICAgKiAgIG51bWJlck9mUmVxdWVzdHM6IDJcbiAgICogfTtcbiAgICpcbiAgICogY29uc3QgcmVxdWVzdHMgPSByZXF1ZXN0U2VydmljZS5nZW5lcmF0ZVJhbmRvbVJlcXVlc3RMaXN0KG9wdGlvbnMpO1xuICAgKlxuICAgKiBjb25zb2xlLmxvZyhyZXF1ZXN0cyk7XG4gICAqIC8vIE91dHB1dDpcbiAgICogLy8gW1xuICAgKiAvLyAgIHsgaWQ6ICczJywgbmFtZTogJ2NoYXJsaWUnLCBpY29uOiAnZmEtbWljcm9waG9uZScsIHVzZXJuYW1lOiAnY2hhcmxpZScgfSxcbiAgICogLy8gICB7IGlkOiAnMycsIG5hbWU6ICdjaGFybGllJywgaWNvbjogJ2ZhLWRlc2t0b3AnLCB1c2VybmFtZTogJ2NoYXJsaWUnIH1cbiAgICogLy8gXVxuICAgKiBgYGBcbiAgICovXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBHZW5lcmF0ZVJhbmRvbVJlcXVlc3RMaXN0IHtcbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIGxpc3Qgb2YgcmFuZG9tIHJlcXVlc3RzIGZvciBwYXJ0aWNpcGFudHMsIGV4Y2x1ZGluZyB0aGUgaG9zdCBhbmQgY28taG9zdC5cbiAgICpcbiAgICogQHBhcmFtIHtHZW5lcmF0ZVJhbmRvbVJlcXVlc3RMaXN0T3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBnZW5lcmF0aW5nIHRoZSByZXF1ZXN0IGxpc3QuXG4gICAqIEBwYXJhbSB7UGFydGljaXBhbnRbXX0gb3B0aW9ucy5wYXJ0aWNpcGFudHMgLSBUaGUgbGlzdCBvZiBwYXJ0aWNpcGFudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmhvc3ROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGhvc3QuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNvSG9zdE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgY28taG9zdC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMubnVtYmVyT2ZSZXF1ZXN0cyAtIFRoZSBudW1iZXIgb2YgcmVxdWVzdHMgdG8gZ2VuZXJhdGUgZm9yIGVhY2ggcGFydGljaXBhbnQuXG4gICAqIEByZXR1cm5zIHtSZXF1ZXN0W119IFRoZSBnZW5lcmF0ZWQgbGlzdCBvZiByZXF1ZXN0cy5cbiAgICovXG4gIGdlbmVyYXRlUmFuZG9tUmVxdWVzdExpc3Qoe1xuICAgIHBhcnRpY2lwYW50cyxcbiAgICBob3N0TmFtZSxcbiAgICBjb0hvc3ROYW1lLFxuICAgIG51bWJlck9mUmVxdWVzdHMsXG4gIH06IEdlbmVyYXRlUmFuZG9tUmVxdWVzdExpc3RPcHRpb25zKTogUmVxdWVzdFtdIHtcbiAgICAvLyBGaWx0ZXIgb3V0IHRoZSBob3N0IGFuZCBjby1ob3N0IGZyb20gdGhlIHBhcnRpY2lwYW50c1xuICAgIGNvbnN0IGZpbHRlcmVkUGFydGljaXBhbnRzID0gcGFydGljaXBhbnRzLmZpbHRlcihcbiAgICAgIChwYXJ0aWNpcGFudCkgPT4gcGFydGljaXBhbnQubmFtZSAhPT0gaG9zdE5hbWUgJiYgcGFydGljaXBhbnQubmFtZSAhPT0gY29Ib3N0TmFtZSxcbiAgICApO1xuXG4gICAgLy8gQ3JlYXRlIGFuIGFycmF5IHdpdGggdGhyZWUgcG9zc2libGUgcmVxdWVzdCBpY29uc1xuICAgIGNvbnN0IHJlcXVlc3RJY29ucyA9IFsnZmEtdmlkZW8nLCAnZmEtZGVza3RvcCcsICdmYS1taWNyb3Bob25lJ107XG5cbiAgICAvLyBTaHVmZmxlIHRoZSByZXF1ZXN0IGljb25zIGFycmF5IHRvIGVuc3VyZSB1bmlxdWUgaWNvbnMgZm9yIGVhY2ggcGFydGljaXBhbnQgYW5kIHJhbmRvbWx5IHNlbGVjdCBhIG1pbmltdW0gb2YgMSBhbmQgYSBtYXhpbXVtIG9mIDMgaWNvbnNcbiAgICBmb3IgKGxldCBpID0gcmVxdWVzdEljb25zLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICAgIFtyZXF1ZXN0SWNvbnNbaV0sIHJlcXVlc3RJY29uc1tqXV0gPSBbcmVxdWVzdEljb25zW2pdLCByZXF1ZXN0SWNvbnNbaV1dO1xuICAgIH1cblxuICAgIC8vIEdlbmVyYXRlIHVuaXF1ZSByZXF1ZXN0cyBmb3IgZWFjaCBwYXJ0aWNpcGFudCB3aXRoIHVuaXF1ZSBpY29uc1xuICAgIGNvbnN0IHJlcXVlc3RMaXN0ID0gZmlsdGVyZWRQYXJ0aWNpcGFudHMuZmxhdE1hcCgocGFydGljaXBhbnQpID0+IHtcbiAgICAgIGNvbnN0IHVuaXF1ZUljb25zID0gbmV3IFNldDxzdHJpbmc+KCk7IC8vIFRvIGVuc3VyZSB1bmlxdWUgaWNvbnMgZm9yIGVhY2ggcGFydGljaXBhbnRcblxuICAgICAgY29uc3QgcmVxdWVzdHMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZSZXF1ZXN0czsgaSsrKSB7XG4gICAgICAgIGxldCByYW5kb21JY29uO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgcmFuZG9tSWNvbiA9IHJlcXVlc3RJY29uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiByZXF1ZXN0SWNvbnMubGVuZ3RoKV07XG4gICAgICAgIH0gd2hpbGUgKHVuaXF1ZUljb25zLmhhcyhyYW5kb21JY29uKSk7XG5cbiAgICAgICAgdW5pcXVlSWNvbnMuYWRkKHJhbmRvbUljb24pO1xuXG4gICAgICAgIHJlcXVlc3RzLnB1c2goe1xuICAgICAgICAgIGlkOiBwYXJ0aWNpcGFudC5pZCB8fCAnJyxcbiAgICAgICAgICBuYW1lOiBwYXJ0aWNpcGFudC5uYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzL2csICdfJyksXG4gICAgICAgICAgaWNvbjogcmFuZG9tSWNvbixcbiAgICAgICAgICB1c2VybmFtZTogcGFydGljaXBhbnQubmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccy9nLCAnXycpLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlcXVlc3RzO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlcXVlc3RMaXN0O1xuICB9XG59XG4iXX0=