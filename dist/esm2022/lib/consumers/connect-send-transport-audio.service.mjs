import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ConnectSendTransportAudio {
    /**
     * Connects the send transport for audio by producing audio data and updating the audio producer and producer transport objects.
     *
     * @param {Object} params - The parameters for connecting the send transport.
     * @param {ProducerOptions} params.audioParams - The options for the audio producer.
     * @param {ConnectSendTransportAudioParameters} params.parameters - The parameters containing the audio producer, producer transport, and update functions.
     * @param {Producer} params.parameters.audioProducer - The current audio producer.
     * @param {Transport} params.parameters.producerTransport - The transport used to produce audio data.
     * @param {Function} params.parameters.updateAudioProducer - Function to update the audio producer.
     * @param {Function} params.parameters.updateProducerTransport - Function to update the producer transport.
     *
     * @returns {Promise<void>} A promise that resolves when the audio transport is successfully connected.
     *
     * @throws Will throw an error if the connection fails.
     */
    async connectSendTransportAudio({ audioParams, parameters, }) {
        try {
            let { audioProducer, producerTransport, updateAudioProducer, updateProducerTransport } = parameters;
            // Connect the send transport for audio by producing audio data
            if (producerTransport) {
                audioProducer = await producerTransport.produce(audioParams);
            }
            else {
                throw new Error('Producer transport is null');
            }
            // Update the audio producer and producer transport objects
            updateAudioProducer(audioProducer);
            updateProducerTransport(producerTransport);
        }
        catch (error) {
            console.log('connectSendTransportAudio error', error);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectSendTransportAudio, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectSendTransportAudio, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectSendTransportAudio, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1hdWRpby5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9jb25uZWN0LXNlbmQtdHJhbnNwb3J0LWF1ZGlvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFzQjNDLE1BQU0sT0FBTyx5QkFBeUI7SUFDcEM7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFFSCxLQUFLLENBQUMseUJBQXlCLENBQUMsRUFDOUIsV0FBVyxFQUNYLFVBQVUsR0FDdUI7UUFDakMsSUFBSSxDQUFDO1lBQ0gsSUFBSSxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsRUFBRSxHQUNwRixVQUFVLENBQUM7WUFFYiwrREFBK0Q7WUFDL0QsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO2dCQUN0QixhQUFhLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDL0QsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUNoRCxDQUFDO1lBRUQsMkRBQTJEO1lBQzNELG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ25DLHVCQUF1QixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hELENBQUM7SUFDSCxDQUFDO3VHQXRDVSx5QkFBeUI7MkdBQXpCLHlCQUF5QixjQUZ4QixNQUFNOzsyRkFFUCx5QkFBeUI7a0JBSHJDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBUcmFuc3BvcnQsIFByb2R1Y2VyLCBQcm9kdWNlck9wdGlvbnMgfSBmcm9tICdtZWRpYXNvdXAtY2xpZW50L2xpYi90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIENvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9QYXJhbWV0ZXJzIHtcbiAgYXVkaW9Qcm9kdWNlcjogUHJvZHVjZXIgfCBudWxsO1xuICBwcm9kdWNlclRyYW5zcG9ydDogVHJhbnNwb3J0IHwgbnVsbDtcbiAgdXBkYXRlQXVkaW9Qcm9kdWNlcjogKHByb2R1Y2VyOiBQcm9kdWNlciB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZVByb2R1Y2VyVHJhbnNwb3J0OiAodHJhbnNwb3J0OiBUcmFuc3BvcnQgfCBudWxsKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9PcHRpb25zIHtcbiAgYXVkaW9QYXJhbXM6IFByb2R1Y2VyT3B0aW9ucztcbiAgcGFyYW1ldGVyczogQ29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb1BhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9UeXBlID0gKFxuICBvcHRpb25zOiBDb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvT3B0aW9ucyxcbikgPT4gUHJvbWlzZTx2b2lkPjtcbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvIHtcbiAgLyoqXG4gICAqIENvbm5lY3RzIHRoZSBzZW5kIHRyYW5zcG9ydCBmb3IgYXVkaW8gYnkgcHJvZHVjaW5nIGF1ZGlvIGRhdGEgYW5kIHVwZGF0aW5nIHRoZSBhdWRpbyBwcm9kdWNlciBhbmQgcHJvZHVjZXIgdHJhbnNwb3J0IG9iamVjdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBUaGUgcGFyYW1ldGVycyBmb3IgY29ubmVjdGluZyB0aGUgc2VuZCB0cmFuc3BvcnQuXG4gICAqIEBwYXJhbSB7UHJvZHVjZXJPcHRpb25zfSBwYXJhbXMuYXVkaW9QYXJhbXMgLSBUaGUgb3B0aW9ucyBmb3IgdGhlIGF1ZGlvIHByb2R1Y2VyLlxuICAgKiBAcGFyYW0ge0Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9QYXJhbWV0ZXJzfSBwYXJhbXMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGNvbnRhaW5pbmcgdGhlIGF1ZGlvIHByb2R1Y2VyLCBwcm9kdWNlciB0cmFuc3BvcnQsIGFuZCB1cGRhdGUgZnVuY3Rpb25zLlxuICAgKiBAcGFyYW0ge1Byb2R1Y2VyfSBwYXJhbXMucGFyYW1ldGVycy5hdWRpb1Byb2R1Y2VyIC0gVGhlIGN1cnJlbnQgYXVkaW8gcHJvZHVjZXIuXG4gICAqIEBwYXJhbSB7VHJhbnNwb3J0fSBwYXJhbXMucGFyYW1ldGVycy5wcm9kdWNlclRyYW5zcG9ydCAtIFRoZSB0cmFuc3BvcnQgdXNlZCB0byBwcm9kdWNlIGF1ZGlvIGRhdGEuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHBhcmFtcy5wYXJhbWV0ZXJzLnVwZGF0ZUF1ZGlvUHJvZHVjZXIgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGF1ZGlvIHByb2R1Y2VyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwYXJhbXMucGFyYW1ldGVycy51cGRhdGVQcm9kdWNlclRyYW5zcG9ydCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcHJvZHVjZXIgdHJhbnNwb3J0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgYXVkaW8gdHJhbnNwb3J0IGlzIHN1Y2Nlc3NmdWxseSBjb25uZWN0ZWQuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgY29ubmVjdGlvbiBmYWlscy5cbiAgICovXG5cbiAgYXN5bmMgY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyh7XG4gICAgYXVkaW9QYXJhbXMsXG4gICAgcGFyYW1ldGVycyxcbiAgfTogQ29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IHsgYXVkaW9Qcm9kdWNlciwgcHJvZHVjZXJUcmFuc3BvcnQsIHVwZGF0ZUF1ZGlvUHJvZHVjZXIsIHVwZGF0ZVByb2R1Y2VyVHJhbnNwb3J0IH0gPVxuICAgICAgICBwYXJhbWV0ZXJzO1xuXG4gICAgICAvLyBDb25uZWN0IHRoZSBzZW5kIHRyYW5zcG9ydCBmb3IgYXVkaW8gYnkgcHJvZHVjaW5nIGF1ZGlvIGRhdGFcbiAgICAgIGlmIChwcm9kdWNlclRyYW5zcG9ydCkge1xuICAgICAgICBhdWRpb1Byb2R1Y2VyID0gYXdhaXQgcHJvZHVjZXJUcmFuc3BvcnQucHJvZHVjZShhdWRpb1BhcmFtcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2R1Y2VyIHRyYW5zcG9ydCBpcyBudWxsJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgYXVkaW8gcHJvZHVjZXIgYW5kIHByb2R1Y2VyIHRyYW5zcG9ydCBvYmplY3RzXG4gICAgICB1cGRhdGVBdWRpb1Byb2R1Y2VyKGF1ZGlvUHJvZHVjZXIpO1xuICAgICAgdXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQocHJvZHVjZXJUcmFuc3BvcnQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyBlcnJvcicsIGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==