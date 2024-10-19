import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class MessageParticipants {
    /**
     * Sends a direct message to a participant if certain conditions are met.
     *s
     * @param coHostResponsibility - Array of responsibilities assigned to the co-host.
     * @param participant - The participant to whom the message is to be sent.
     * @param member - The current member attempting to send the message.
     * @param islevel - The level of the current member.
     * @param showAlert - Function to show an alert message.
     * @param coHost - The co-host member.
     * @param updateIsMessagesModalVisible - Function to update the visibility of the messages modal.
     * @param updateDirectMessageDetails - Function to update the details of the direct message.
     * @param updateStartDirectMessage - Function to start the direct message.
     *
     * @returns void
     */
    messageParticipants({ coHostResponsibility, participant, member, islevel, showAlert, coHost, updateIsMessagesModalVisible, updateDirectMessageDetails, updateStartDirectMessage, }) {
        let chatValue = false;
        try {
            chatValue = coHostResponsibility.find((item) => item.name === 'chat')?.value ?? false;
        }
        catch (error) {
            console.error(error);
        }
        if (islevel === '2' || (coHost === member && chatValue === true)) {
            if (participant.islevel !== '2') {
                updateDirectMessageDetails(participant);
                updateStartDirectMessage(true);
                updateIsMessagesModalVisible(true);
            }
        }
        else {
            showAlert?.({
                message: 'You are not allowed to send this message',
                type: 'danger',
                duration: 3000,
            });
            return;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MessageParticipants, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MessageParticipants, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MessageParticipants, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1wYXJ0aWNpcGFudHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3BhcnRpY2lwYW50cy1tZXRob2RzL21lc3NhZ2UtcGFydGljaXBhbnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFvQjNDLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUI7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxtQkFBbUIsQ0FBQyxFQUNsQixvQkFBb0IsRUFDcEIsV0FBVyxFQUNYLE1BQU0sRUFDTixPQUFPLEVBQ1AsU0FBUyxFQUNULE1BQU0sRUFDTiw0QkFBNEIsRUFDNUIsMEJBQTBCLEVBQzFCLHdCQUF3QixHQUNHO1FBQzNCLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztRQUV0QixJQUFJLENBQUM7WUFDSCxTQUFTLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxFQUFFLEtBQUssSUFBSSxLQUFLLENBQUM7UUFDeEYsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7UUFFRCxJQUFJLE9BQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLFNBQVMsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2pFLElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDaEMsMEJBQTBCLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3hDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvQiw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQyxDQUFDO1FBQ0gsQ0FBQzthQUFNLENBQUM7WUFDTixTQUFTLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsMENBQTBDO2dCQUNuRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztZQUVILE9BQU87UUFDVCxDQUFDO0lBQ0gsQ0FBQzt1R0FsRFUsbUJBQW1COzJHQUFuQixtQkFBbUIsY0FGbEIsTUFBTTs7MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhcnRpY2lwYW50LCBDb0hvc3RSZXNwb25zaWJpbGl0eSwgU2hvd0FsZXJ0IH0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZVBhcnRpY2lwYW50c09wdGlvbnMge1xuICBjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXTtcbiAgcGFydGljaXBhbnQ6IFBhcnRpY2lwYW50O1xuICBtZW1iZXI6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIGNvSG9zdDogc3RyaW5nO1xuICB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlsczogKHBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudCB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZTogKHN0YXJ0OiBib29sZWFuKSA9PiB2b2lkO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBNZXNzYWdlUGFydGljaXBhbnRzVHlwZSA9IChvcHRpb25zOiBNZXNzYWdlUGFydGljaXBhbnRzT3B0aW9ucykgPT4gdm9pZDtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VQYXJ0aWNpcGFudHMge1xuICAvKipcbiAgICogU2VuZHMgYSBkaXJlY3QgbWVzc2FnZSB0byBhIHBhcnRpY2lwYW50IGlmIGNlcnRhaW4gY29uZGl0aW9ucyBhcmUgbWV0LlxuICAgKnNcbiAgICogQHBhcmFtIGNvSG9zdFJlc3BvbnNpYmlsaXR5IC0gQXJyYXkgb2YgcmVzcG9uc2liaWxpdGllcyBhc3NpZ25lZCB0byB0aGUgY28taG9zdC5cbiAgICogQHBhcmFtIHBhcnRpY2lwYW50IC0gVGhlIHBhcnRpY2lwYW50IHRvIHdob20gdGhlIG1lc3NhZ2UgaXMgdG8gYmUgc2VudC5cbiAgICogQHBhcmFtIG1lbWJlciAtIFRoZSBjdXJyZW50IG1lbWJlciBhdHRlbXB0aW5nIHRvIHNlbmQgdGhlIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSBpc2xldmVsIC0gVGhlIGxldmVsIG9mIHRoZSBjdXJyZW50IG1lbWJlci5cbiAgICogQHBhcmFtIHNob3dBbGVydCAtIEZ1bmN0aW9uIHRvIHNob3cgYW4gYWxlcnQgbWVzc2FnZS5cbiAgICogQHBhcmFtIGNvSG9zdCAtIFRoZSBjby1ob3N0IG1lbWJlci5cbiAgICogQHBhcmFtIHVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgb2YgdGhlIG1lc3NhZ2VzIG1vZGFsLlxuICAgKiBAcGFyYW0gdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGRldGFpbHMgb2YgdGhlIGRpcmVjdCBtZXNzYWdlLlxuICAgKiBAcGFyYW0gdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlIC0gRnVuY3Rpb24gdG8gc3RhcnQgdGhlIGRpcmVjdCBtZXNzYWdlLlxuICAgKlxuICAgKiBAcmV0dXJucyB2b2lkXG4gICAqL1xuICBtZXNzYWdlUGFydGljaXBhbnRzKHtcbiAgICBjb0hvc3RSZXNwb25zaWJpbGl0eSxcbiAgICBwYXJ0aWNpcGFudCxcbiAgICBtZW1iZXIsXG4gICAgaXNsZXZlbCxcbiAgICBzaG93QWxlcnQsXG4gICAgY29Ib3N0LFxuICAgIHVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGUsXG4gICAgdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHMsXG4gICAgdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlLFxuICB9OiBNZXNzYWdlUGFydGljaXBhbnRzT3B0aW9ucyk6IHZvaWQge1xuICAgIGxldCBjaGF0VmFsdWUgPSBmYWxzZTtcblxuICAgIHRyeSB7XG4gICAgICBjaGF0VmFsdWUgPSBjb0hvc3RSZXNwb25zaWJpbGl0eS5maW5kKChpdGVtKSA9PiBpdGVtLm5hbWUgPT09ICdjaGF0Jyk/LnZhbHVlID8/IGZhbHNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9XG5cbiAgICBpZiAoaXNsZXZlbCA9PT0gJzInIHx8IChjb0hvc3QgPT09IG1lbWJlciAmJiBjaGF0VmFsdWUgPT09IHRydWUpKSB7XG4gICAgICBpZiAocGFydGljaXBhbnQuaXNsZXZlbCAhPT0gJzInKSB7XG4gICAgICAgIHVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzKHBhcnRpY2lwYW50KTtcbiAgICAgICAgdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlKHRydWUpO1xuICAgICAgICB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlKHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdZb3UgYXJlIG5vdCBhbGxvd2VkIHRvIHNlbmQgdGhpcyBtZXNzYWdlJyxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==