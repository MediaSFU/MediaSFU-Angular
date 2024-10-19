import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../producers/producer-emits/join-con-room.service";
export class JoinConsumeRoom {
    JoinConRoomService;
    constructor(JoinConRoomService) {
        this.JoinConRoomService = JoinConRoomService;
    }
    /**
     * Joins a consumption room by sending a request to the server and handles the necessary setup.
     * @param {Object} options - The options object containing necessary variables.
     * @param {any} options.remote_sock - The remote socket information.
     * @param {string} options.apiToken - The API token for authentication.
     * @param {string} options.apiUserName - The API username for authentication.
     * @param {any} options.parameters - Additional parameters required for the function.
     * @returns {Promise<any>} - A promise that resolves with data related to the success of joining the room.
     */
    joinConsumeRoom = async ({ remote_sock, apiToken, apiUserName, parameters, }) => {
        let { roomName, islevel, member, device, updateDevice, 
        //Mediasfu functions
        receiveAllPipedTransports, createDeviceClient, } = parameters;
        try {
            // Join the consumption room
            const data = await this.JoinConRoomService.joinConRoom({
                socket: remote_sock,
                roomName,
                islevel,
                member,
                sec: apiToken,
                apiUserName,
            });
            if (data && data.success) {
                // Setup media device if not already set
                if (!device) {
                    if (data.rtpCapabilities) {
                        const device_ = await createDeviceClient({
                            rtpCapabilities: data.rtpCapabilities,
                        });
                        if (device_) {
                            updateDevice(device_);
                        }
                    }
                }
                // Receive all piped transports
                await receiveAllPipedTransports({ nsock: remote_sock, parameters });
            }
            return data;
        }
        catch (error) {
            console.log('Error in joinConsumeRoom:', error);
            throw new Error('Failed to join the consumption room or set up necessary components.');
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: JoinConsumeRoom, deps: [{ token: i1.JoinConRoom }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: JoinConsumeRoom, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: JoinConsumeRoom, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.JoinConRoom }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pbi1jb25zdW1lLXJvb20uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9qb2luLWNvbnN1bWUtcm9vbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQTBDM0MsTUFBTSxPQUFPLGVBQWU7SUFDTjtJQUFwQixZQUFvQixrQkFBK0I7UUFBL0IsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFhO0lBQUcsQ0FBQztJQUV2RDs7Ozs7Ozs7T0FRRztJQUNILGVBQWUsR0FBRyxLQUFLLEVBQUUsRUFDdkIsV0FBVyxFQUNYLFFBQVEsRUFDUixXQUFXLEVBQ1gsVUFBVSxHQUNhLEVBQW9DLEVBQUU7UUFDN0QsSUFBSSxFQUNGLFFBQVEsRUFDUixPQUFPLEVBQ1AsTUFBTSxFQUNOLE1BQU0sRUFDTixZQUFZO1FBRVosb0JBQW9CO1FBQ3BCLHlCQUF5QixFQUN6QixrQkFBa0IsR0FDbkIsR0FBRyxVQUFVLENBQUM7UUFFZixJQUFJLENBQUM7WUFDSCw0QkFBNEI7WUFDNUIsTUFBTSxJQUFJLEdBQVEsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDO2dCQUMxRCxNQUFNLEVBQUUsV0FBVztnQkFDbkIsUUFBUTtnQkFDUixPQUFPO2dCQUNQLE1BQU07Z0JBQ04sR0FBRyxFQUFFLFFBQVE7Z0JBQ2IsV0FBVzthQUNaLENBQUMsQ0FBQztZQUVILElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDekIsd0NBQXdDO2dCQUN4QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ1osSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7d0JBQ3pCLE1BQU0sT0FBTyxHQUFHLE1BQU0sa0JBQWtCLENBQUM7NEJBQ3ZDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTt5QkFDdEMsQ0FBQyxDQUFDO3dCQUVILElBQUksT0FBTyxFQUFFLENBQUM7NEJBQ1osWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN4QixDQUFDO29CQUNILENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCwrQkFBK0I7Z0JBQy9CLE1BQU0seUJBQXlCLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDdEUsQ0FBQztZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMscUVBQXFFLENBQUMsQ0FBQztRQUN6RixDQUFDO0lBQ0gsQ0FBQyxDQUFDO3VHQWhFUyxlQUFlOzJHQUFmLGVBQWUsY0FGZCxNQUFNOzsyRkFFUCxlQUFlO2tCQUgzQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEpvaW5Db25Sb29tIH0gZnJvbSAnLi4vLi4vcHJvZHVjZXJzL3Byb2R1Y2VyLWVtaXRzL2pvaW4tY29uLXJvb20uc2VydmljZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7XG4gIFJlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHNUeXBlLFxuICBSZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzUGFyYW1ldGVycyxcbiAgQ3JlYXRlRGV2aWNlQ2xpZW50VHlwZSxcbn0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcbmltcG9ydCB7IERldmljZSwgUnRwQ2FwYWJpbGl0aWVzIH0gZnJvbSAnbWVkaWFzb3VwLWNsaWVudC9saWIvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEpvaW5Db25zdW1lUm9vbVBhcmFtZXRlcnMgZXh0ZW5kcyBSZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzUGFyYW1ldGVycyB7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgbWVtYmVyOiBzdHJpbmc7XG4gIGRldmljZTogRGV2aWNlIHwgbnVsbDtcbiAgdXBkYXRlRGV2aWNlOiAoZGV2aWNlOiBEZXZpY2UgfCBudWxsKSA9PiB2b2lkO1xuICByZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzOiBSZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzVHlwZTtcbiAgY3JlYXRlRGV2aWNlQ2xpZW50OiBDcmVhdGVEZXZpY2VDbGllbnRUeXBlO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5leHBvcnQgaW50ZXJmYWNlIEpvaW5Db25zdW1lUm9vbU9wdGlvbnMge1xuICByZW1vdGVfc29jazogU29ja2V0O1xuICBhcGlUb2tlbjogc3RyaW5nO1xuICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICBwYXJhbWV0ZXJzOiBKb2luQ29uc3VtZVJvb21QYXJhbWV0ZXJzO1xufVxuXG5pbnRlcmZhY2UgSm9pbkNvbnN1bWVSb29tUmVzcG9uc2Uge1xuICBzdWNjZXNzOiBib29sZWFuO1xuICBydHBDYXBhYmlsaXRpZXM/OiBSdHBDYXBhYmlsaXRpZXM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIEpvaW5Db25zdW1lUm9vbVR5cGUgPSAoXG4gIG9wdGlvbnM6IEpvaW5Db25zdW1lUm9vbU9wdGlvbnMsXG4pID0+IFByb21pc2U8Sm9pbkNvbnN1bWVSb29tUmVzcG9uc2U+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgSm9pbkNvbnN1bWVSb29tIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBKb2luQ29uUm9vbVNlcnZpY2U6IEpvaW5Db25Sb29tKSB7fVxuXG4gIC8qKlxuICAgKiBKb2lucyBhIGNvbnN1bXB0aW9uIHJvb20gYnkgc2VuZGluZyBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciBhbmQgaGFuZGxlcyB0aGUgbmVjZXNzYXJ5IHNldHVwLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdCBjb250YWluaW5nIG5lY2Vzc2FyeSB2YXJpYWJsZXMuXG4gICAqIEBwYXJhbSB7YW55fSBvcHRpb25zLnJlbW90ZV9zb2NrIC0gVGhlIHJlbW90ZSBzb2NrZXQgaW5mb3JtYXRpb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmFwaVRva2VuIC0gVGhlIEFQSSB0b2tlbiBmb3IgYXV0aGVudGljYXRpb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmFwaVVzZXJOYW1lIC0gVGhlIEFQSSB1c2VybmFtZSBmb3IgYXV0aGVudGljYXRpb24uXG4gICAqIEBwYXJhbSB7YW55fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBBZGRpdGlvbmFsIHBhcmFtZXRlcnMgcmVxdWlyZWQgZm9yIHRoZSBmdW5jdGlvbi5cbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIGRhdGEgcmVsYXRlZCB0byB0aGUgc3VjY2VzcyBvZiBqb2luaW5nIHRoZSByb29tLlxuICAgKi9cbiAgam9pbkNvbnN1bWVSb29tID0gYXN5bmMgKHtcbiAgICByZW1vdGVfc29jayxcbiAgICBhcGlUb2tlbixcbiAgICBhcGlVc2VyTmFtZSxcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBKb2luQ29uc3VtZVJvb21PcHRpb25zKTogUHJvbWlzZTxKb2luQ29uc3VtZVJvb21SZXNwb25zZT4gPT4ge1xuICAgIGxldCB7XG4gICAgICByb29tTmFtZSxcbiAgICAgIGlzbGV2ZWwsXG4gICAgICBtZW1iZXIsXG4gICAgICBkZXZpY2UsXG4gICAgICB1cGRhdGVEZXZpY2UsXG5cbiAgICAgIC8vTWVkaWFzZnUgZnVuY3Rpb25zXG4gICAgICByZWNlaXZlQWxsUGlwZWRUcmFuc3BvcnRzLFxuICAgICAgY3JlYXRlRGV2aWNlQ2xpZW50LFxuICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIEpvaW4gdGhlIGNvbnN1bXB0aW9uIHJvb21cbiAgICAgIGNvbnN0IGRhdGE6IGFueSA9IGF3YWl0IHRoaXMuSm9pbkNvblJvb21TZXJ2aWNlLmpvaW5Db25Sb29tKHtcbiAgICAgICAgc29ja2V0OiByZW1vdGVfc29jayxcbiAgICAgICAgcm9vbU5hbWUsXG4gICAgICAgIGlzbGV2ZWwsXG4gICAgICAgIG1lbWJlcixcbiAgICAgICAgc2VjOiBhcGlUb2tlbixcbiAgICAgICAgYXBpVXNlck5hbWUsXG4gICAgICB9KTtcblxuICAgICAgaWYgKGRhdGEgJiYgZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgIC8vIFNldHVwIG1lZGlhIGRldmljZSBpZiBub3QgYWxyZWFkeSBzZXRcbiAgICAgICAgaWYgKCFkZXZpY2UpIHtcbiAgICAgICAgICBpZiAoZGF0YS5ydHBDYXBhYmlsaXRpZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGRldmljZV8gPSBhd2FpdCBjcmVhdGVEZXZpY2VDbGllbnQoe1xuICAgICAgICAgICAgICBydHBDYXBhYmlsaXRpZXM6IGRhdGEucnRwQ2FwYWJpbGl0aWVzLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChkZXZpY2VfKSB7XG4gICAgICAgICAgICAgIHVwZGF0ZURldmljZShkZXZpY2VfKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZWNlaXZlIGFsbCBwaXBlZCB0cmFuc3BvcnRzXG4gICAgICAgIGF3YWl0IHJlY2VpdmVBbGxQaXBlZFRyYW5zcG9ydHMoeyBuc29jazogcmVtb3RlX3NvY2ssIHBhcmFtZXRlcnMgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgaW4gam9pbkNvbnN1bWVSb29tOicsIGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGpvaW4gdGhlIGNvbnN1bXB0aW9uIHJvb20gb3Igc2V0IHVwIG5lY2Vzc2FyeSBjb21wb25lbnRzLicpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==