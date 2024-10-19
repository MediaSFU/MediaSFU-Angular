import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class GenerateRandomPolls {
    /**
     * Generates an array of random poll objects.
     *
     * @param {GenerateRandomPollsOptions} options - An object containing the number of polls to generate.
     * @param {number} options.numberOfPolls - The number of random polls to generate.
     * @returns {Poll[]} An array of random poll objects.
     */
    generateRandomPolls({ numberOfPolls }) {
        const pollTypes = ['trueFalse', 'yesNo', 'custom'];
        const polls = [];
        for (let i = 0; i < numberOfPolls; i++) {
            const type = pollTypes[Math.floor(Math.random() * pollTypes.length)];
            let options;
            switch (type) {
                case 'trueFalse':
                    options = ['True', 'False'];
                    break;
                case 'yesNo':
                    options = ['Yes', 'No'];
                    break;
                case 'custom':
                    options = Array.from({ length: Math.floor(Math.random() * 5) + 2 }, (_, idx) => `Option ${idx + 1}`);
                    break;
                default:
                    options = [];
            }
            const poll = {
                id: `${i + 1}`,
                question: `Random Question ${i + 1}`,
                type,
                options,
                votes: Array(options.length).fill(0),
                status: 'inactive', // or 'active'
                voters: {},
            };
            polls.push(poll);
        }
        return polls;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GenerateRandomPolls, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GenerateRandomPolls, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GenerateRandomPolls, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtcmFuZG9tLXBvbGxzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy91dGlscy9nZW5lcmF0ZS1yYW5kb20tcG9sbHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVkzQyxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCOzs7Ozs7T0FNRztJQUNILG1CQUFtQixDQUFDLEVBQUUsYUFBYSxFQUE4QjtRQUMvRCxNQUFNLFNBQVMsR0FBYSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDN0QsTUFBTSxLQUFLLEdBQVcsRUFBRSxDQUFDO1FBRXpCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN2QyxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDckUsSUFBSSxPQUFpQixDQUFDO1lBRXRCLFFBQVEsSUFBSSxFQUFFLENBQUM7Z0JBQ2IsS0FBSyxXQUFXO29CQUNkLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDNUIsTUFBTTtnQkFDUixLQUFLLE9BQU87b0JBQ1YsT0FBTyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUN4QixNQUFNO2dCQUNSLEtBQUssUUFBUTtvQkFDWCxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FDbEIsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQzdDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQ2hDLENBQUM7b0JBQ0YsTUFBTTtnQkFDUjtvQkFDRSxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLENBQUM7WUFFRCxNQUFNLElBQUksR0FBUztnQkFDakIsRUFBRSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDZCxRQUFRLEVBQUUsbUJBQW1CLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3BDLElBQUk7Z0JBQ0osT0FBTztnQkFDUCxLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWM7Z0JBQ2xDLE1BQU0sRUFBRSxFQUFFO2FBQ1gsQ0FBQztZQUVGLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsQ0FBQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzt1R0EvQ1UsbUJBQW1COzJHQUFuQixtQkFBbUIsY0FGbEIsTUFBTTs7MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBvbGwgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBHZW5lcmF0ZVJhbmRvbVBvbGxzT3B0aW9ucyB7XG4gIG51bWJlck9mUG9sbHM6IG51bWJlcjtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgR2VuZXJhdGVSYW5kb21Qb2xsc1R5cGUgPSAob3B0aW9uczogR2VuZXJhdGVSYW5kb21Qb2xsc09wdGlvbnMpID0+IFBvbGxbXTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEdlbmVyYXRlUmFuZG9tUG9sbHMge1xuICAvKipcbiAgICogR2VuZXJhdGVzIGFuIGFycmF5IG9mIHJhbmRvbSBwb2xsIG9iamVjdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7R2VuZXJhdGVSYW5kb21Qb2xsc09wdGlvbnN9IG9wdGlvbnMgLSBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgbnVtYmVyIG9mIHBvbGxzIHRvIGdlbmVyYXRlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5udW1iZXJPZlBvbGxzIC0gVGhlIG51bWJlciBvZiByYW5kb20gcG9sbHMgdG8gZ2VuZXJhdGUuXG4gICAqIEByZXR1cm5zIHtQb2xsW119IEFuIGFycmF5IG9mIHJhbmRvbSBwb2xsIG9iamVjdHMuXG4gICAqL1xuICBnZW5lcmF0ZVJhbmRvbVBvbGxzKHsgbnVtYmVyT2ZQb2xscyB9OiBHZW5lcmF0ZVJhbmRvbVBvbGxzT3B0aW9ucyk6IFBvbGxbXSB7XG4gICAgY29uc3QgcG9sbFR5cGVzOiBzdHJpbmdbXSA9IFsndHJ1ZUZhbHNlJywgJ3llc05vJywgJ2N1c3RvbSddO1xuICAgIGNvbnN0IHBvbGxzOiBQb2xsW10gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZQb2xsczsgaSsrKSB7XG4gICAgICBjb25zdCB0eXBlID0gcG9sbFR5cGVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvbGxUeXBlcy5sZW5ndGgpXTtcbiAgICAgIGxldCBvcHRpb25zOiBzdHJpbmdbXTtcblxuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ3RydWVGYWxzZSc6XG4gICAgICAgICAgb3B0aW9ucyA9IFsnVHJ1ZScsICdGYWxzZSddO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd5ZXNObyc6XG4gICAgICAgICAgb3B0aW9ucyA9IFsnWWVzJywgJ05vJ107XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2N1c3RvbSc6XG4gICAgICAgICAgb3B0aW9ucyA9IEFycmF5LmZyb20oXG4gICAgICAgICAgICB7IGxlbmd0aDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNSkgKyAyIH0sXG4gICAgICAgICAgICAoXywgaWR4KSA9PiBgT3B0aW9uICR7aWR4ICsgMX1gLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgb3B0aW9ucyA9IFtdO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwb2xsOiBQb2xsID0ge1xuICAgICAgICBpZDogYCR7aSArIDF9YCxcbiAgICAgICAgcXVlc3Rpb246IGBSYW5kb20gUXVlc3Rpb24gJHtpICsgMX1gLFxuICAgICAgICB0eXBlLFxuICAgICAgICBvcHRpb25zLFxuICAgICAgICB2b3RlczogQXJyYXkob3B0aW9ucy5sZW5ndGgpLmZpbGwoMCksXG4gICAgICAgIHN0YXR1czogJ2luYWN0aXZlJywgLy8gb3IgJ2FjdGl2ZSdcbiAgICAgICAgdm90ZXJzOiB7fSxcbiAgICAgIH07XG5cbiAgICAgIHBvbGxzLnB1c2gocG9sbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvbGxzO1xuICB9XG59XG4iXX0=