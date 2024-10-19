import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class HandleCreatePoll {
    /**
     * Handles the creation of a poll.
     *
     * @param {Object} options - The options for creating the poll.
     * @param {Poll} options.poll - The poll object containing the poll details.
     * @param {Object} options.parameters - Additional parameters for creating the poll.
     * @returns {Promise<void>} - A promise that resolves when the poll is created successfully.
     */
    async handleCreatePoll({ poll, socket, roomName, showAlert, updateIsPollModalVisible, }) {
        try {
            socket.emit('createPoll', { roomName, poll }, (response) => {
                if (response.success) {
                    showAlert?.({ message: 'Poll created successfully', type: 'success' });
                    updateIsPollModalVisible(false);
                }
                else {
                    showAlert?.({ message: response.reason || 'Failed to create poll', type: 'danger' });
                }
            });
        }
        catch {
            /* handle error */
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HandleCreatePoll, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HandleCreatePoll, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HandleCreatePoll, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlLWNyZWF0ZS1wb2xsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9wb2xscy1tZXRob2RzL2hhbmRsZS1jcmVhdGUtcG9sbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBaUIzQyxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCOzs7Ozs7O09BT0c7SUFFSCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFDckIsSUFBSSxFQUNKLE1BQU0sRUFDTixRQUFRLEVBQ1IsU0FBUyxFQUNULHdCQUF3QixHQUNBO1FBQ3hCLElBQUksQ0FBQztZQUNILE1BQU0sQ0FBQyxJQUFJLENBQ1QsWUFBWSxFQUNaLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUNsQixDQUFDLFFBQStDLEVBQUUsRUFBRTtnQkFDbEQsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ3JCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO29CQUN2RSx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEMsQ0FBQztxQkFBTSxDQUFDO29CQUNOLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLElBQUksdUJBQXVCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZGLENBQUM7WUFDSCxDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUM7UUFBQyxNQUFNLENBQUM7WUFDUCxrQkFBa0I7UUFDcEIsQ0FBQztJQUNILENBQUM7dUdBakNVLGdCQUFnQjsyR0FBaEIsZ0JBQWdCLGNBRmYsTUFBTTs7MkZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBvbGwsIFNob3dBbGVydCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmV4cG9ydCBpbnRlcmZhY2UgSGFuZGxlQ3JlYXRlUG9sbE9wdGlvbnMge1xuICBwb2xsOiBQb2xsO1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICB1cGRhdGVJc1BvbGxNb2RhbFZpc2libGU6ICh2aXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBIYW5kbGVDcmVhdGVQb2xsVHlwZSA9IChvcHRpb25zOiBIYW5kbGVDcmVhdGVQb2xsT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEhhbmRsZUNyZWF0ZVBvbGwge1xuICAvKipcbiAgICogSGFuZGxlcyB0aGUgY3JlYXRpb24gb2YgYSBwb2xsLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBjcmVhdGluZyB0aGUgcG9sbC5cbiAgICogQHBhcmFtIHtQb2xsfSBvcHRpb25zLnBvbGwgLSBUaGUgcG9sbCBvYmplY3QgY29udGFpbmluZyB0aGUgcG9sbCBkZXRhaWxzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gQWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciBjcmVhdGluZyB0aGUgcG9sbC5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgcG9sbCBpcyBjcmVhdGVkIHN1Y2Nlc3NmdWxseS5cbiAgICovXG5cbiAgYXN5bmMgaGFuZGxlQ3JlYXRlUG9sbCh7XG4gICAgcG9sbCxcbiAgICBzb2NrZXQsXG4gICAgcm9vbU5hbWUsXG4gICAgc2hvd0FsZXJ0LFxuICAgIHVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZSxcbiAgfTogSGFuZGxlQ3JlYXRlUG9sbE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgc29ja2V0LmVtaXQoXG4gICAgICAgICdjcmVhdGVQb2xsJyxcbiAgICAgICAgeyByb29tTmFtZSwgcG9sbCB9LFxuICAgICAgICAocmVzcG9uc2U6IHsgc3VjY2VzczogYm9vbGVhbjsgcmVhc29uPzogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAgICAgc2hvd0FsZXJ0Py4oeyBtZXNzYWdlOiAnUG9sbCBjcmVhdGVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6ICdzdWNjZXNzJyB9KTtcbiAgICAgICAgICAgIHVwZGF0ZUlzUG9sbE1vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNob3dBbGVydD8uKHsgbWVzc2FnZTogcmVzcG9uc2UucmVhc29uIHx8ICdGYWlsZWQgdG8gY3JlYXRlIHBvbGwnLCB0eXBlOiAnZGFuZ2VyJyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgfVxuICB9XG59XG4iXX0=