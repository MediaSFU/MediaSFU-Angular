import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ReceiveRoomMessages {
    /**
     * Asynchronously retrieves and updates messages for a specified room from the server.
     *
     * @param {object} options - The function parameters.
     * @param {object} options.parameters - Additional parameters needed for the function.
     * @param {string} options.parameters.roomName - The name of the room to retrieve messages for.
     * @param {function} options.parameters.updateMessages - Function to update the messages array.
     */
    async receiveRoomMessages({ socket, roomName, updateMessages, }) {
        try {
            // Retrieve messages from the server
            await new Promise((resolve, reject) => {
                socket.emit('getMessage', { roomName }, async ({ messages_ }) => {
                    try {
                        const updatedMessages = messages_;
                        updateMessages(updatedMessages);
                        resolve();
                    }
                    catch (err) {
                        reject(err);
                    }
                });
            });
        }
        catch (error) {
            // Handle errors if any
            console.log('Error tuning messages:', error.message);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ReceiveRoomMessages, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ReceiveRoomMessages, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ReceiveRoomMessages, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjZWl2ZS1yb29tLW1lc3NhZ2VzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3JlY2VpdmUtcm9vbS1tZXNzYWdlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBZTNDLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUI7Ozs7Ozs7T0FPRztJQUNILEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxFQUN4QixNQUFNLEVBQ04sUUFBUSxFQUNSLGNBQWMsR0FDYTtRQUMzQixJQUFJLENBQUM7WUFDSCxvQ0FBb0M7WUFDcEMsTUFBTSxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQTRCLEVBQUUsRUFBRTtvQkFDeEYsSUFBSSxDQUFDO3dCQUNILE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQzt3QkFDbEMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO3dCQUNoQyxPQUFPLEVBQUUsQ0FBQztvQkFDWixDQUFDO29CQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7d0JBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNkLENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1lBQ3BCLHVCQUF1QjtZQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RCxDQUFDO0lBQ0gsQ0FBQzt1R0EvQlUsbUJBQW1COzJHQUFuQixtQkFBbUIsY0FGbEIsTUFBTTs7MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIFJlY2VpdmVSb29tTWVzc2FnZXNPcHRpb25zIHtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIHVwZGF0ZU1lc3NhZ2VzOiAobWVzc2FnZXM6IE1lc3NhZ2VbXSkgPT4gdm9pZDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgUmVjZWl2ZVJvb21NZXNzYWdlc1R5cGUgPSAob3B0aW9uczogUmVjZWl2ZVJvb21NZXNzYWdlc09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBSZWNlaXZlUm9vbU1lc3NhZ2VzIHtcbiAgLyoqXG4gICAqIEFzeW5jaHJvbm91c2x5IHJldHJpZXZlcyBhbmQgdXBkYXRlcyBtZXNzYWdlcyBmb3IgYSBzcGVjaWZpZWQgcm9vbSBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIGZ1bmN0aW9uIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBBZGRpdGlvbmFsIHBhcmFtZXRlcnMgbmVlZGVkIGZvciB0aGUgZnVuY3Rpb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbSB0byByZXRyaWV2ZSBtZXNzYWdlcyBmb3IuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVNZXNzYWdlcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWVzc2FnZXMgYXJyYXkuXG4gICAqL1xuICBhc3luYyByZWNlaXZlUm9vbU1lc3NhZ2VzKHtcbiAgICBzb2NrZXQsXG4gICAgcm9vbU5hbWUsXG4gICAgdXBkYXRlTWVzc2FnZXMsXG4gIH06IFJlY2VpdmVSb29tTWVzc2FnZXNPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFJldHJpZXZlIG1lc3NhZ2VzIGZyb20gdGhlIHNlcnZlclxuICAgICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBzb2NrZXQuZW1pdCgnZ2V0TWVzc2FnZScsIHsgcm9vbU5hbWUgfSwgYXN5bmMgKHsgbWVzc2FnZXNfIH06IHsgbWVzc2FnZXNfOiBNZXNzYWdlW10gfSkgPT4ge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkTWVzc2FnZXMgPSBtZXNzYWdlc187XG4gICAgICAgICAgICB1cGRhdGVNZXNzYWdlcyh1cGRhdGVkTWVzc2FnZXMpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIC8vIEhhbmRsZSBlcnJvcnMgaWYgYW55XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgdHVuaW5nIG1lc3NhZ2VzOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgIH1cbiAgfVxufVxuIl19