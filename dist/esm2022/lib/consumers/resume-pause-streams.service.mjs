import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ResumePauseStreams {
    /**
     * Resumes or pauses streams based on the provided parameters.
     *
     * @param {ResumePauseStreamsOptions} options - The options for resuming or pausing streams.
     * @param {Object} options.parameters - The parameters for the function.
     * @param {Array} options.parameters.participants - The list of participants.
     * @param {Array} options.parameters.dispActiveNames - The list of active display names.
     * @param {Array} options.parameters.consumerTransports - The list of consumer transports.
     * @param {string} options.parameters.screenId - The screen producer ID.
     * @param {string} options.parameters.islevel - The level of the user.
     *
     * @returns {Promise<void>} A promise that resolves when the streams have been resumed or paused.
     *
     * @throws Will throw an error if there is an issue during the process of resuming or pausing streams.
     */
    resumePauseStreams = async ({ parameters }) => {
        try {
            // Destructure parameters
            parameters = parameters.getUpdatedAllParams();
            let { participants, dispActiveNames, consumerTransports, screenId, islevel } = parameters;
            // Get the videoID of the host (islevel=2)
            let host = participants.find((obj) => obj.islevel === '2');
            let hostVideoID = host ? host.videoID : null;
            // Get videoIDs of participants in dispActiveNames and screenproducerId
            let videosIDs = dispActiveNames.map((name) => {
                let participant = participants.find((obj) => obj.name === name);
                return participant ? participant.videoID : null;
            });
            // Add screenproducerId to allVideoIDs if it's not null or empty
            if (screenId) {
                videosIDs.push(screenId);
            }
            // Add hostVideoID to allVideoIDs if it's not null or empty (only if the user is not the host)
            if (islevel !== '2' && hostVideoID) {
                videosIDs.push(hostVideoID);
            }
            // Remove null or empty videoIDs
            let allVideoIDs = videosIDs.filter((videoID) => videoID !== null && videoID !== '');
            if (allVideoIDs.length > 0) {
                // Get consumer transports with producerId in allVideoIDs
                const consumerTransportsToResume = consumerTransports.filter((transport) => allVideoIDs.includes(transport.producerId) && transport.consumer.kind !== 'audio');
                // Resume all consumerTransportsToResume
                for (const transport of consumerTransportsToResume) {
                    transport.socket_.emit('consumer-resume', { serverConsumerId: transport.serverConsumerTransportId }, async ({ resumed }) => {
                        if (resumed) {
                            transport.consumer.resume();
                        }
                    });
                }
            }
        }
        catch (error) {
            console.log('Error during resuming or pausing streams: ', error);
            // Handle errors during the process of resuming or pausing streams
            // throw new Error(`Error during resuming or pausing streams: ${error.message}`);
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ResumePauseStreams, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ResumePauseStreams, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ResumePauseStreams, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdW1lLXBhdXNlLXN0cmVhbXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvcmVzdW1lLXBhdXNlLXN0cmVhbXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQTBCM0MsTUFBTSxPQUFPLGtCQUFrQjtJQUM3Qjs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILGtCQUFrQixHQUFHLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBNkIsRUFBaUIsRUFBRTtRQUN0RixJQUFJLENBQUM7WUFDSCx5QkFBeUI7WUFDekIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzlDLElBQUksRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFFMUYsMENBQTBDO1lBQzFDLElBQUksSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDaEUsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFFN0MsdUVBQXVFO1lBQ3ZFLElBQUksU0FBUyxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtnQkFDaEQsSUFBSSxXQUFXLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztnQkFDckUsT0FBTyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQztZQUVILGdFQUFnRTtZQUNoRSxJQUFJLFFBQVEsRUFBRSxDQUFDO2dCQUNiLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0IsQ0FBQztZQUVELDhGQUE4RjtZQUM5RixJQUFJLE9BQU8sS0FBSyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7Z0JBQ25DLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDOUIsQ0FBQztZQUVELGdDQUFnQztZQUNoQyxJQUFJLFdBQVcsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUNoQyxDQUFDLE9BQXNCLEVBQUUsRUFBRSxDQUFDLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLEVBQUUsQ0FDL0QsQ0FBQztZQUVGLElBQUksV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDM0IseURBQXlEO2dCQUN6RCxNQUFNLDBCQUEwQixHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FDMUQsQ0FBQyxTQUFjLEVBQUUsRUFBRSxDQUNqQixXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxPQUFPLENBQ3BGLENBQUM7Z0JBRUYsd0NBQXdDO2dCQUN4QyxLQUFLLE1BQU0sU0FBUyxJQUFJLDBCQUEwQixFQUFFLENBQUM7b0JBQ25ELFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNwQixpQkFBaUIsRUFDakIsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLENBQUMseUJBQXlCLEVBQUUsRUFDekQsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUF3QixFQUFFLEVBQUU7d0JBQzFDLElBQUksT0FBTyxFQUFFLENBQUM7NEJBQ1osU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDOUIsQ0FBQztvQkFDSCxDQUFDLENBQ0YsQ0FBQztnQkFDSixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNqRSxrRUFBa0U7WUFDbEUsaUZBQWlGO1FBQ25GLENBQUM7SUFDSCxDQUFDLENBQUM7dUdBeEVTLGtCQUFrQjsyR0FBbEIsa0JBQWtCLGNBRmpCLE1BQU07OzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYXJ0aWNpcGFudCwgVHJhbnNwb3J0LCBTdHJlYW0gfSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlc3VtZVBhdXNlU3RyZWFtc1BhcmFtZXRlcnMge1xuICBwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W107XG4gIGRpc3BBY3RpdmVOYW1lczogc3RyaW5nW107XG4gIHJlbW90ZVNjcmVlblN0cmVhbTogU3RyZWFtW107XG4gIGNvbnN1bWVyVHJhbnNwb3J0czogVHJhbnNwb3J0W107XG4gIHNjcmVlbklkPzogc3RyaW5nO1xuICBpc2xldmVsOiBzdHJpbmc7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFJlc3VtZVBhdXNlU3RyZWFtc1BhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXN1bWVQYXVzZVN0cmVhbXNPcHRpb25zIHtcbiAgcGFyYW1ldGVyczogUmVzdW1lUGF1c2VTdHJlYW1zUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgUmVzdW1lUGF1c2VTdHJlYW1zVHlwZSA9IChvcHRpb25zOiBSZXN1bWVQYXVzZVN0cmVhbXNPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUmVzdW1lUGF1c2VTdHJlYW1zIHtcbiAgLyoqXG4gICAqIFJlc3VtZXMgb3IgcGF1c2VzIHN0cmVhbXMgYmFzZWQgb24gdGhlIHByb3ZpZGVkIHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVzdW1lUGF1c2VTdHJlYW1zT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciByZXN1bWluZyBvciBwYXVzaW5nIHN0cmVhbXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3IgdGhlIGZ1bmN0aW9uLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnBhcmFtZXRlcnMucGFydGljaXBhbnRzIC0gVGhlIGxpc3Qgb2YgcGFydGljaXBhbnRzLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnBhcmFtZXRlcnMuZGlzcEFjdGl2ZU5hbWVzIC0gVGhlIGxpc3Qgb2YgYWN0aXZlIGRpc3BsYXkgbmFtZXMuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMucGFyYW1ldGVycy5jb25zdW1lclRyYW5zcG9ydHMgLSBUaGUgbGlzdCBvZiBjb25zdW1lciB0cmFuc3BvcnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnNjcmVlbklkIC0gVGhlIHNjcmVlbiBwcm9kdWNlciBJRC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5pc2xldmVsIC0gVGhlIGxldmVsIG9mIHRoZSB1c2VyLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgc3RyZWFtcyBoYXZlIGJlZW4gcmVzdW1lZCBvciBwYXVzZWQuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGVyZSBpcyBhbiBpc3N1ZSBkdXJpbmcgdGhlIHByb2Nlc3Mgb2YgcmVzdW1pbmcgb3IgcGF1c2luZyBzdHJlYW1zLlxuICAgKi9cbiAgcmVzdW1lUGF1c2VTdHJlYW1zID0gYXN5bmMgKHsgcGFyYW1ldGVycyB9OiBSZXN1bWVQYXVzZVN0cmVhbXNPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIERlc3RydWN0dXJlIHBhcmFtZXRlcnNcbiAgICAgIHBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcbiAgICAgIGxldCB7IHBhcnRpY2lwYW50cywgZGlzcEFjdGl2ZU5hbWVzLCBjb25zdW1lclRyYW5zcG9ydHMsIHNjcmVlbklkLCBpc2xldmVsIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgICAvLyBHZXQgdGhlIHZpZGVvSUQgb2YgdGhlIGhvc3QgKGlzbGV2ZWw9MilcbiAgICAgIGxldCBob3N0ID0gcGFydGljaXBhbnRzLmZpbmQoKG9iajogYW55KSA9PiBvYmouaXNsZXZlbCA9PT0gJzInKTtcbiAgICAgIGxldCBob3N0VmlkZW9JRCA9IGhvc3QgPyBob3N0LnZpZGVvSUQgOiBudWxsO1xuXG4gICAgICAvLyBHZXQgdmlkZW9JRHMgb2YgcGFydGljaXBhbnRzIGluIGRpc3BBY3RpdmVOYW1lcyBhbmQgc2NyZWVucHJvZHVjZXJJZFxuICAgICAgbGV0IHZpZGVvc0lEcyA9IGRpc3BBY3RpdmVOYW1lcy5tYXAoKG5hbWU6IGFueSkgPT4ge1xuICAgICAgICBsZXQgcGFydGljaXBhbnQgPSBwYXJ0aWNpcGFudHMuZmluZCgob2JqOiBhbnkpID0+IG9iai5uYW1lID09PSBuYW1lKTtcbiAgICAgICAgcmV0dXJuIHBhcnRpY2lwYW50ID8gcGFydGljaXBhbnQudmlkZW9JRCA6IG51bGw7XG4gICAgICB9KTtcblxuICAgICAgLy8gQWRkIHNjcmVlbnByb2R1Y2VySWQgdG8gYWxsVmlkZW9JRHMgaWYgaXQncyBub3QgbnVsbCBvciBlbXB0eVxuICAgICAgaWYgKHNjcmVlbklkKSB7XG4gICAgICAgIHZpZGVvc0lEcy5wdXNoKHNjcmVlbklkKTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIGhvc3RWaWRlb0lEIHRvIGFsbFZpZGVvSURzIGlmIGl0J3Mgbm90IG51bGwgb3IgZW1wdHkgKG9ubHkgaWYgdGhlIHVzZXIgaXMgbm90IHRoZSBob3N0KVxuICAgICAgaWYgKGlzbGV2ZWwgIT09ICcyJyAmJiBob3N0VmlkZW9JRCkge1xuICAgICAgICB2aWRlb3NJRHMucHVzaChob3N0VmlkZW9JRCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlbW92ZSBudWxsIG9yIGVtcHR5IHZpZGVvSURzXG4gICAgICBsZXQgYWxsVmlkZW9JRHMgPSB2aWRlb3NJRHMuZmlsdGVyKFxuICAgICAgICAodmlkZW9JRDogc3RyaW5nIHwgbnVsbCkgPT4gdmlkZW9JRCAhPT0gbnVsbCAmJiB2aWRlb0lEICE9PSAnJyxcbiAgICAgICk7XG5cbiAgICAgIGlmIChhbGxWaWRlb0lEcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIEdldCBjb25zdW1lciB0cmFuc3BvcnRzIHdpdGggcHJvZHVjZXJJZCBpbiBhbGxWaWRlb0lEc1xuICAgICAgICBjb25zdCBjb25zdW1lclRyYW5zcG9ydHNUb1Jlc3VtZSA9IGNvbnN1bWVyVHJhbnNwb3J0cy5maWx0ZXIoXG4gICAgICAgICAgKHRyYW5zcG9ydDogYW55KSA9PlxuICAgICAgICAgICAgYWxsVmlkZW9JRHMuaW5jbHVkZXModHJhbnNwb3J0LnByb2R1Y2VySWQpICYmIHRyYW5zcG9ydC5jb25zdW1lci5raW5kICE9PSAnYXVkaW8nLFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIFJlc3VtZSBhbGwgY29uc3VtZXJUcmFuc3BvcnRzVG9SZXN1bWVcbiAgICAgICAgZm9yIChjb25zdCB0cmFuc3BvcnQgb2YgY29uc3VtZXJUcmFuc3BvcnRzVG9SZXN1bWUpIHtcbiAgICAgICAgICB0cmFuc3BvcnQuc29ja2V0Xy5lbWl0KFxuICAgICAgICAgICAgJ2NvbnN1bWVyLXJlc3VtZScsXG4gICAgICAgICAgICB7IHNlcnZlckNvbnN1bWVySWQ6IHRyYW5zcG9ydC5zZXJ2ZXJDb25zdW1lclRyYW5zcG9ydElkIH0sXG4gICAgICAgICAgICBhc3luYyAoeyByZXN1bWVkIH06IHsgcmVzdW1lZDogYm9vbGVhbiB9KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXN1bWVkKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0LmNvbnN1bWVyLnJlc3VtZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGR1cmluZyByZXN1bWluZyBvciBwYXVzaW5nIHN0cmVhbXM6ICcsIGVycm9yKTtcbiAgICAgIC8vIEhhbmRsZSBlcnJvcnMgZHVyaW5nIHRoZSBwcm9jZXNzIG9mIHJlc3VtaW5nIG9yIHBhdXNpbmcgc3RyZWFtc1xuICAgICAgLy8gdGhyb3cgbmV3IEVycm9yKGBFcnJvciBkdXJpbmcgcmVzdW1pbmcgb3IgcGF1c2luZyBzdHJlYW1zOiAke2Vycm9yLm1lc3NhZ2V9YCk7XG4gICAgfVxuICB9O1xufVxuIl19