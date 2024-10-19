import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class StartShareScreen {
    /**
     * Starts the screen sharing process.
     *
     * @param {StartShareScreenOptions} options - The options for starting screen sharing.
     * @param {Object} options.parameters - The parameters for screen sharing.
     * @param {boolean} options.parameters.shared - Indicates if the screen is currently being shared.
     * @param {Function} options.parameters.showAlert - Function to show alert messages.
     * @param {Function} options.parameters.updateShared - Function to update the shared state.
     * @param {boolean} options.parameters.onWeb - Indicates if the application is running on a web platform.
     * @param {number} [options.parameters.targetWidth] - The target width for screen sharing.
     * @param {number} [options.parameters.targetHeight] - The target height for screen sharing.
     * @param {Function} options.parameters.streamSuccessScreen - Function to handle successful screen sharing.
     *
     * @returns {Promise<void>} A promise that resolves when the screen sharing process is complete.
     *
     * @throws Will log an error message if there is an issue starting the screen share.
     */
    startShareScreen = async ({ parameters }) => {
        // start screen share function
        // attempt to start screen share and return true if successful
        let { shared, showAlert, updateShared, onWeb, targetWidth = 1280, targetHeight = 720, streamSuccessScreen, } = parameters;
        try {
            if (!onWeb) {
                showAlert?.({
                    message: 'You cannot share screen while on mobile',
                    type: 'danger',
                    duration: 3000,
                });
                return;
            }
            if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
                shared = true;
                await navigator.mediaDevices
                    .getDisplayMedia({
                    video: {
                        width: targetWidth,
                        height: targetHeight,
                        frameRate: 30,
                    },
                    audio: false,
                })
                    .then(async (stream) => {
                    await streamSuccessScreen({ stream, parameters });
                })
                    .catch(async () => {
                    shared = false;
                    showAlert?.({
                        message: 'Could not share screen, check and retry',
                        type: 'danger',
                        duration: 3000,
                    });
                });
            }
            else {
                showAlert?.({
                    message: 'Could not share screen, check and retry',
                    type: 'danger',
                    duration: 3000,
                });
            }
            // update the shared variable
            updateShared(shared);
        }
        catch (error) {
            console.log('Error starting screen share', error);
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StartShareScreen, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StartShareScreen, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: StartShareScreen, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQtc2hhcmUtc2NyZWVuLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3N0YXJ0LXNoYXJlLXNjcmVlbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBeUIzQyxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsZ0JBQWdCLEdBQUcsS0FBSyxFQUFFLEVBQUUsVUFBVSxFQUEyQixFQUFpQixFQUFFO1FBQ2xGLDhCQUE4QjtRQUM5Qiw4REFBOEQ7UUFFOUQsSUFBSSxFQUNGLE1BQU0sRUFDTixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFDTCxXQUFXLEdBQUcsSUFBSSxFQUNsQixZQUFZLEdBQUcsR0FBRyxFQUNsQixtQkFBbUIsR0FDcEIsR0FBRyxVQUFVLENBQUM7UUFFZixJQUFJLENBQUM7WUFDSCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ1gsU0FBUyxFQUFFLENBQUM7b0JBQ1YsT0FBTyxFQUFFLHlDQUF5QztvQkFDbEQsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsUUFBUSxFQUFFLElBQUk7aUJBQ2YsQ0FBQyxDQUFDO2dCQUNILE9BQU87WUFDVCxDQUFDO1lBRUQsSUFBSSxTQUFTLENBQUMsWUFBWSxJQUFJLFNBQVMsQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3JFLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ2QsTUFBTSxTQUFTLENBQUMsWUFBWTtxQkFDekIsZUFBZSxDQUFDO29CQUNmLEtBQUssRUFBRTt3QkFDTCxLQUFLLEVBQUUsV0FBVzt3QkFDbEIsTUFBTSxFQUFFLFlBQVk7d0JBQ3BCLFNBQVMsRUFBRSxFQUFFO3FCQUNkO29CQUNELEtBQUssRUFBRSxLQUFLO2lCQUNiLENBQUM7cUJBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFtQixFQUFFLEVBQUU7b0JBQ2xDLE1BQU0sbUJBQW1CLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDcEQsQ0FBQyxDQUFDO3FCQUNELEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRTtvQkFDaEIsTUFBTSxHQUFHLEtBQUssQ0FBQztvQkFDZixTQUFTLEVBQUUsQ0FBQzt3QkFDVixPQUFPLEVBQUUseUNBQXlDO3dCQUNsRCxJQUFJLEVBQUUsUUFBUTt3QkFDZCxRQUFRLEVBQUUsSUFBSTtxQkFDZixDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sU0FBUyxFQUFFLENBQUM7b0JBQ1YsT0FBTyxFQUFFLHlDQUF5QztvQkFDbEQsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsUUFBUSxFQUFFLElBQUk7aUJBQ2YsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUVELDZCQUE2QjtZQUM3QixZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BELENBQUM7SUFDSCxDQUFDLENBQUM7dUdBN0VTLGdCQUFnQjsyR0FBaEIsZ0JBQWdCLGNBRmYsTUFBTTs7MkZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0cmVhbVN1Y2Nlc3NTY3JlZW5UeXBlLCBTdHJlYW1TdWNjZXNzU2NyZWVuUGFyYW1ldGVycywgU2hvd0FsZXJ0IH0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcbmV4cG9ydCBpbnRlcmZhY2UgU3RhcnRTaGFyZVNjcmVlblBhcmFtZXRlcnMgZXh0ZW5kcyBTdHJlYW1TdWNjZXNzU2NyZWVuUGFyYW1ldGVycyB7XG4gIHNoYXJlZDogYm9vbGVhbjtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICB1cGRhdGVTaGFyZWQ6IChzaGFyZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIG9uV2ViOiBib29sZWFuO1xuICB0YXJnZXRXaWR0aD86IG51bWJlcjtcbiAgdGFyZ2V0SGVpZ2h0PzogbnVtYmVyO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBzdHJlYW1TdWNjZXNzU2NyZWVuOiBTdHJlYW1TdWNjZXNzU2NyZWVuVHlwZTtcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXJ0U2hhcmVTY3JlZW5PcHRpb25zIHtcbiAgcGFyYW1ldGVyczogU3RhcnRTaGFyZVNjcmVlblBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFN0YXJ0U2hhcmVTY3JlZW5UeXBlID0gKG9wdGlvbnM6IFN0YXJ0U2hhcmVTY3JlZW5PcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU3RhcnRTaGFyZVNjcmVlbiB7XG4gIC8qKlxuICAgKiBTdGFydHMgdGhlIHNjcmVlbiBzaGFyaW5nIHByb2Nlc3MuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RhcnRTaGFyZVNjcmVlbk9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3Igc3RhcnRpbmcgc2NyZWVuIHNoYXJpbmcuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3Igc2NyZWVuIHNoYXJpbmcuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNoYXJlZCAtIEluZGljYXRlcyBpZiB0aGUgc2NyZWVuIGlzIGN1cnJlbnRseSBiZWluZyBzaGFyZWQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5zaG93QWxlcnQgLSBGdW5jdGlvbiB0byBzaG93IGFsZXJ0IG1lc3NhZ2VzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlU2hhcmVkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzaGFyZWQgc3RhdGUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLm9uV2ViIC0gSW5kaWNhdGVzIGlmIHRoZSBhcHBsaWNhdGlvbiBpcyBydW5uaW5nIG9uIGEgd2ViIHBsYXRmb3JtLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMucGFyYW1ldGVycy50YXJnZXRXaWR0aF0gLSBUaGUgdGFyZ2V0IHdpZHRoIGZvciBzY3JlZW4gc2hhcmluZy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnBhcmFtZXRlcnMudGFyZ2V0SGVpZ2h0XSAtIFRoZSB0YXJnZXQgaGVpZ2h0IGZvciBzY3JlZW4gc2hhcmluZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnN0cmVhbVN1Y2Nlc3NTY3JlZW4gLSBGdW5jdGlvbiB0byBoYW5kbGUgc3VjY2Vzc2Z1bCBzY3JlZW4gc2hhcmluZy5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNjcmVlbiBzaGFyaW5nIHByb2Nlc3MgaXMgY29tcGxldGUuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCBsb2cgYW4gZXJyb3IgbWVzc2FnZSBpZiB0aGVyZSBpcyBhbiBpc3N1ZSBzdGFydGluZyB0aGUgc2NyZWVuIHNoYXJlLlxuICAgKi9cbiAgc3RhcnRTaGFyZVNjcmVlbiA9IGFzeW5jICh7IHBhcmFtZXRlcnMgfTogU3RhcnRTaGFyZVNjcmVlbk9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAvLyBzdGFydCBzY3JlZW4gc2hhcmUgZnVuY3Rpb25cbiAgICAvLyBhdHRlbXB0IHRvIHN0YXJ0IHNjcmVlbiBzaGFyZSBhbmQgcmV0dXJuIHRydWUgaWYgc3VjY2Vzc2Z1bFxuXG4gICAgbGV0IHtcbiAgICAgIHNoYXJlZCxcbiAgICAgIHNob3dBbGVydCxcbiAgICAgIHVwZGF0ZVNoYXJlZCxcbiAgICAgIG9uV2ViLFxuICAgICAgdGFyZ2V0V2lkdGggPSAxMjgwLFxuICAgICAgdGFyZ2V0SGVpZ2h0ID0gNzIwLFxuICAgICAgc3RyZWFtU3VjY2Vzc1NjcmVlbixcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIHRyeSB7XG4gICAgICBpZiAoIW9uV2ViKSB7XG4gICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICBtZXNzYWdlOiAnWW91IGNhbm5vdCBzaGFyZSBzY3JlZW4gd2hpbGUgb24gbW9iaWxlJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXMgJiYgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXREaXNwbGF5TWVkaWEpIHtcbiAgICAgICAgc2hhcmVkID0gdHJ1ZTtcbiAgICAgICAgYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlc1xuICAgICAgICAgIC5nZXREaXNwbGF5TWVkaWEoe1xuICAgICAgICAgICAgdmlkZW86IHtcbiAgICAgICAgICAgICAgd2lkdGg6IHRhcmdldFdpZHRoLFxuICAgICAgICAgICAgICBoZWlnaHQ6IHRhcmdldEhlaWdodCxcbiAgICAgICAgICAgICAgZnJhbWVSYXRlOiAzMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdWRpbzogZmFsc2UsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbihhc3luYyAoc3RyZWFtOiBNZWRpYVN0cmVhbSkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgc3RyZWFtU3VjY2Vzc1NjcmVlbih7IHN0cmVhbSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBzaGFyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ0NvdWxkIG5vdCBzaGFyZSBzY3JlZW4sIGNoZWNrIGFuZCByZXRyeScsXG4gICAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdDb3VsZCBub3Qgc2hhcmUgc2NyZWVuLCBjaGVjayBhbmQgcmV0cnknLFxuICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gdXBkYXRlIHRoZSBzaGFyZWQgdmFyaWFibGVcbiAgICAgIHVwZGF0ZVNoYXJlZChzaGFyZWQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3Igc3RhcnRpbmcgc2NyZWVuIHNoYXJlJywgZXJyb3IpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==