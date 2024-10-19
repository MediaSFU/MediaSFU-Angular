import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../signal-new-consumer-transport.service";
export class NewPipeProducer {
    signalNewConsumerTransportService;
    constructor(signalNewConsumerTransportService) {
        this.signalNewConsumerTransportService = signalNewConsumerTransportService;
    }
    /**
     * Handles new pipe producer events and updates relevant states.
     * @param {Object} options - The options object containing necessary variables.
     * @param {string} options.producerId - The ID of the producer.
     * @param {string} options.islevel - The level of the producer.
     * @param {any} options.nsock - The socket object.
     * @param {any} options.parameters - Additional parameters required for the function.
     * @returns {Promise<void>}
     */
    newPipeProducer = async ({ producerId, islevel, nsock, parameters, }) => {
        let { first_round, shareScreenStarted, shared, landScaped, showAlert, isWideScreen, updateFirst_round, updateLandScaped, } = parameters;
        try {
            // Perform signaling for new consumer transport
            await this.signalNewConsumerTransportService.signalNewConsumerTransport({
                remoteProducerId: producerId,
                islevel: islevel,
                nsock: nsock,
                parameters: parameters,
            });
            first_round = false;
            if (shareScreenStarted || shared) {
                if (!isWideScreen) {
                    if (!landScaped) {
                        if (showAlert) {
                            showAlert({
                                message: 'Please rotate your device to landscape mode for better experience',
                                type: 'success',
                                duration: 3000,
                            });
                        }
                        landScaped = true;
                        updateLandScaped(landScaped);
                    }
                }
                first_round = true;
                updateFirst_round(first_round);
            }
        }
        catch (error) {
            console.error('Error in newPipeProducer:', error);
            throw new Error('Failed to handle new pipe producer event.');
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: NewPipeProducer, deps: [{ token: i1.SignalNewConsumerTransport }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: NewPipeProducer, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: NewPipeProducer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.SignalNewConsumerTransport }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LXBpcGUtcHJvZHVjZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9uZXctcGlwZS1wcm9kdWNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQWlEM0MsTUFBTSxPQUFPLGVBQWU7SUFDTjtJQUFwQixZQUFvQixpQ0FBNkQ7UUFBN0Qsc0NBQWlDLEdBQWpDLGlDQUFpQyxDQUE0QjtJQUFHLENBQUM7SUFFckY7Ozs7Ozs7O09BUUc7SUFDSCxlQUFlLEdBQUcsS0FBSyxFQUFFLEVBQ3ZCLFVBQVUsRUFDVixPQUFPLEVBQ1AsS0FBSyxFQUNMLFVBQVUsR0FDYSxFQUFpQixFQUFFO1FBQzFDLElBQUksRUFDRixXQUFXLEVBQ1gsa0JBQWtCLEVBQ2xCLE1BQU0sRUFDTixVQUFVLEVBQ1YsU0FBUyxFQUNULFlBQVksRUFDWixpQkFBaUIsRUFDakIsZ0JBQWdCLEdBQ2pCLEdBQUcsVUFBVSxDQUFDO1FBRWYsSUFBSSxDQUFDO1lBQ0gsK0NBQStDO1lBQy9DLE1BQU0sSUFBSSxDQUFDLGlDQUFpQyxDQUFDLDBCQUEwQixDQUFDO2dCQUN0RSxnQkFBZ0IsRUFBRSxVQUFVO2dCQUM1QixPQUFPLEVBQUUsT0FBTztnQkFDaEIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osVUFBVSxFQUFFLFVBQVU7YUFDdkIsQ0FBQyxDQUFDO1lBRUgsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLGtCQUFrQixJQUFJLE1BQU0sRUFBRSxDQUFDO2dCQUNqQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzt3QkFDaEIsSUFBSSxTQUFTLEVBQUUsQ0FBQzs0QkFDZCxTQUFTLENBQUM7Z0NBQ1IsT0FBTyxFQUFFLG1FQUFtRTtnQ0FDNUUsSUFBSSxFQUFFLFNBQVM7Z0NBQ2YsUUFBUSxFQUFFLElBQUk7NkJBQ2YsQ0FBQyxDQUFDO3dCQUNMLENBQUM7d0JBQ0QsVUFBVSxHQUFHLElBQUksQ0FBQzt3QkFDbEIsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQy9CLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNqQyxDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUEyQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xELE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQztRQUMvRCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO3VHQTdEUyxlQUFlOzJHQUFmLGVBQWUsY0FGZCxNQUFNOzsyRkFFUCxlQUFlO2tCQUgzQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0IH0gZnJvbSAnLi4vc2lnbmFsLW5ldy1jb25zdW1lci10cmFuc3BvcnQuc2VydmljZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7XG4gIFJlb3JkZXJTdHJlYW1zUGFyYW1ldGVycyxcbiAgUmVvcmRlclN0cmVhbXNUeXBlLFxuICBTaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydFBhcmFtZXRlcnMsXG4gIENvbm5lY3RSZWN2VHJhbnNwb3J0UGFyYW1ldGVycyxcbiAgQ29ubmVjdFJlY3ZUcmFuc3BvcnRUeXBlLFxuICBTaG93QWxlcnQsXG59IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5pbXBvcnQgeyBEZXZpY2UgfSBmcm9tICdtZWRpYXNvdXAtY2xpZW50L2xpYi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmV3UGlwZVByb2R1Y2VyUGFyYW1ldGVyc1xuICBleHRlbmRzIFJlb3JkZXJTdHJlYW1zUGFyYW1ldGVycyxcbiAgICBTaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydFBhcmFtZXRlcnMsXG4gICAgQ29ubmVjdFJlY3ZUcmFuc3BvcnRQYXJhbWV0ZXJzIHtcbiAgZmlyc3Rfcm91bmQ6IGJvb2xlYW47XG4gIHNoYXJlU2NyZWVuU3RhcnRlZDogYm9vbGVhbjtcbiAgc2hhcmVkOiBib29sZWFuO1xuICBsYW5kU2NhcGVkOiBib29sZWFuO1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIGlzV2lkZVNjcmVlbjogYm9vbGVhbjtcbiAgdXBkYXRlRmlyc3Rfcm91bmQ6IChmaXJzdFJvdW5kOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVMYW5kU2NhcGVkOiAobGFuZFNjYXBlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgZGV2aWNlOiBEZXZpY2UgfCBudWxsO1xuICBjb25zdW1pbmdUcmFuc3BvcnRzOiBzdHJpbmdbXTtcbiAgbG9ja19zY3JlZW46IGJvb2xlYW47XG4gIHVwZGF0ZUNvbnN1bWluZ1RyYW5zcG9ydHM6ICh0cmFuc3BvcnRzOiBzdHJpbmdbXSkgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgY29ubmVjdFJlY3ZUcmFuc3BvcnQ6IENvbm5lY3RSZWN2VHJhbnNwb3J0VHlwZTtcbiAgcmVvcmRlclN0cmVhbXM6IFJlb3JkZXJTdHJlYW1zVHlwZTtcbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gTmV3UGlwZVByb2R1Y2VyUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5ld1BpcGVQcm9kdWNlck9wdGlvbnMge1xuICBwcm9kdWNlcklkOiBzdHJpbmc7XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgbnNvY2s6IFNvY2tldDtcbiAgcGFyYW1ldGVyczogTmV3UGlwZVByb2R1Y2VyUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgTmV3UGlwZVByb2R1Y2VyVHlwZSA9IChvcHRpb25zOiBOZXdQaXBlUHJvZHVjZXJPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE5ld1BpcGVQcm9kdWNlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnRTZXJ2aWNlOiBTaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydCkge31cblxuICAvKipcbiAgICogSGFuZGxlcyBuZXcgcGlwZSBwcm9kdWNlciBldmVudHMgYW5kIHVwZGF0ZXMgcmVsZXZhbnQgc3RhdGVzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdCBjb250YWluaW5nIG5lY2Vzc2FyeSB2YXJpYWJsZXMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnByb2R1Y2VySWQgLSBUaGUgSUQgb2YgdGhlIHByb2R1Y2VyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5pc2xldmVsIC0gVGhlIGxldmVsIG9mIHRoZSBwcm9kdWNlci5cbiAgICogQHBhcmFtIHthbnl9IG9wdGlvbnMubnNvY2sgLSBUaGUgc29ja2V0IG9iamVjdC5cbiAgICogQHBhcmFtIHthbnl9IG9wdGlvbnMucGFyYW1ldGVycyAtIEFkZGl0aW9uYWwgcGFyYW1ldGVycyByZXF1aXJlZCBmb3IgdGhlIGZ1bmN0aW9uLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIG5ld1BpcGVQcm9kdWNlciA9IGFzeW5jICh7XG4gICAgcHJvZHVjZXJJZCxcbiAgICBpc2xldmVsLFxuICAgIG5zb2NrLFxuICAgIHBhcmFtZXRlcnMsXG4gIH06IE5ld1BpcGVQcm9kdWNlck9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBsZXQge1xuICAgICAgZmlyc3Rfcm91bmQsXG4gICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgICBzaGFyZWQsXG4gICAgICBsYW5kU2NhcGVkLFxuICAgICAgc2hvd0FsZXJ0LFxuICAgICAgaXNXaWRlU2NyZWVuLFxuICAgICAgdXBkYXRlRmlyc3Rfcm91bmQsXG4gICAgICB1cGRhdGVMYW5kU2NhcGVkLFxuICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIFBlcmZvcm0gc2lnbmFsaW5nIGZvciBuZXcgY29uc3VtZXIgdHJhbnNwb3J0XG4gICAgICBhd2FpdCB0aGlzLnNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0U2VydmljZS5zaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydCh7XG4gICAgICAgIHJlbW90ZVByb2R1Y2VySWQ6IHByb2R1Y2VySWQsXG4gICAgICAgIGlzbGV2ZWw6IGlzbGV2ZWwsXG4gICAgICAgIG5zb2NrOiBuc29jayxcbiAgICAgICAgcGFyYW1ldGVyczogcGFyYW1ldGVycyxcbiAgICAgIH0pO1xuXG4gICAgICBmaXJzdF9yb3VuZCA9IGZhbHNlO1xuICAgICAgaWYgKHNoYXJlU2NyZWVuU3RhcnRlZCB8fCBzaGFyZWQpIHtcbiAgICAgICAgaWYgKCFpc1dpZGVTY3JlZW4pIHtcbiAgICAgICAgICBpZiAoIWxhbmRTY2FwZWQpIHtcbiAgICAgICAgICAgIGlmIChzaG93QWxlcnQpIHtcbiAgICAgICAgICAgICAgc2hvd0FsZXJ0KHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnUGxlYXNlIHJvdGF0ZSB5b3VyIGRldmljZSB0byBsYW5kc2NhcGUgbW9kZSBmb3IgYmV0dGVyIGV4cGVyaWVuY2UnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYW5kU2NhcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHVwZGF0ZUxhbmRTY2FwZWQobGFuZFNjYXBlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZmlyc3Rfcm91bmQgPSB0cnVlO1xuICAgICAgICB1cGRhdGVGaXJzdF9yb3VuZChmaXJzdF9yb3VuZCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluIG5ld1BpcGVQcm9kdWNlcjonLCBlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBoYW5kbGUgbmV3IHBpcGUgcHJvZHVjZXIgZXZlbnQuJyk7XG4gICAgfVxuICB9O1xufVxuIl19