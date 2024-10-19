import { Injectable } from '@angular/core';
// Socket manager for media socket.
import io from 'socket.io-client'; // Importing socket type
import * as i0 from "@angular/core";
export class SocketManager {
    socket;
    async validateApiKeyToken(value) {
        if (!/^[a-z0-9]{64}$/i.test(value)) {
            throw new Error('Invalid API key or token.');
        }
        return true;
    }
    connectSocket = async ({ apiUserName, apiKey, apiToken, link, }) => {
        if (!apiUserName) {
            throw new Error('API username required.');
        }
        if (!(apiKey || apiToken)) {
            throw new Error('API key or token required.');
        }
        if (!link) {
            throw new Error('Socket link required.');
        }
        let useKey = false;
        try {
            if (apiKey && apiKey.length === 64) {
                await this.validateApiKeyToken(apiKey);
                useKey = true;
            }
            else {
                if (apiToken) {
                    await this.validateApiKeyToken(apiToken);
                }
                else {
                    throw new Error('API token is required.');
                }
                useKey = false;
            }
        }
        catch (error) {
            throw new Error('Invalid API key or token.');
        }
        return new Promise((resolve, reject) => {
            const query = useKey ? { apiUserName, apiKey } : { apiUserName, apiToken };
            this.socket = io(`${link}/media`, {
                transports: ['websocket'],
                query,
            });
            this.socket.on('connect', () => {
                console.log('Connected to media socket.', this.socket.id);
                resolve(this.socket);
            });
            this.socket.on('connect_error', () => {
                reject(new Error('Error connecting to media socket.'));
            });
        });
    };
    disconnectSocket = async ({ socket }) => {
        if (socket) {
            socket.disconnect();
            return true;
        }
        return false;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SocketManager, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SocketManager, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SocketManager, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LW1hbmFnZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9zb2NrZXRzL3NvY2tldC1tYW5hZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxtQ0FBbUM7QUFDbkMsT0FBTyxFQUFjLE1BQU0sa0JBQWtCLENBQUMsQ0FBQyx3QkFBd0I7O0FBMEJ2RSxNQUFNLE9BQU8sYUFBYTtJQUNoQixNQUFNLENBQVU7SUFFeEIsS0FBSyxDQUFDLG1CQUFtQixDQUFDLEtBQWE7UUFDckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsYUFBYSxHQUFHLEtBQUssRUFBRSxFQUNyQixXQUFXLEVBQ1gsTUFBTSxFQUNOLFFBQVEsRUFDUixJQUFJLEdBQ2lCLEVBQW1CLEVBQUU7UUFDMUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUM7WUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFDRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDVixNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUVELElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUM7WUFDSCxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBRSxDQUFDO2dCQUNuQyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNoQixDQUFDO2lCQUFNLENBQUM7Z0JBQ04sSUFBSSxRQUFRLEVBQUUsQ0FBQztvQkFDYixNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDM0MsQ0FBQztxQkFBTSxDQUFDO29CQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztnQkFDNUMsQ0FBQztnQkFDRCxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ2pCLENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBRUQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsQ0FBQztZQUUzRSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksUUFBUSxFQUFFO2dCQUNoQyxVQUFVLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0JBQ3pCLEtBQUs7YUFDTixDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO2dCQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzFELE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO2dCQUNuQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxDQUFDO1lBQ3pELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7SUFFRixnQkFBZ0IsR0FBRyxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQTJCLEVBQW9CLEVBQUU7UUFDakYsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUNYLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNwQixPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUMsQ0FBQzt1R0FwRVMsYUFBYTsyR0FBYixhQUFhLGNBRlosTUFBTTs7MkZBRVAsYUFBYTtrQkFIekIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBTb2NrZXQgbWFuYWdlciBmb3IgbWVkaWEgc29ja2V0LlxuaW1wb3J0IGlvLCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnOyAvLyBJbXBvcnRpbmcgc29ja2V0IHR5cGVcblxuLyoqXG4gKiBWYWxpZGF0ZXMgdGhlIHByb3ZpZGVkIEFQSSBrZXkgb3IgdG9rZW4uXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSBUaGUgQVBJIGtleSBvciB0b2tlbiB0byB2YWxpZGF0ZS5cbiAqIEByZXR1cm5zIHtQcm9taXNlPEJvb2xlYW4+fSAtIFRydWUgaWYgdGhlIEFQSSBrZXkgb3IgdG9rZW4gaXMgdmFsaWQsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbm5lY3RTb2NrZXRPcHRpb25zIHtcbiAgYXBpVXNlck5hbWU6IHN0cmluZztcbiAgYXBpS2V5Pzogc3RyaW5nO1xuICBhcGlUb2tlbj86IHN0cmluZztcbiAgbGluazogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERpc2Nvbm5lY3RTb2NrZXRPcHRpb25zIHtcbiAgc29ja2V0OiBTb2NrZXQ7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENvbm5lY3RTb2NrZXRUeXBlID0gKG9wdGlvbnM6IENvbm5lY3RTb2NrZXRPcHRpb25zKSA9PiBQcm9taXNlPFNvY2tldD47XG5leHBvcnQgdHlwZSBEaXNjb25uZWN0U29ja2V0VHlwZSA9IChvcHRpb25zOiBEaXNjb25uZWN0U29ja2V0T3B0aW9ucykgPT4gUHJvbWlzZTxib29sZWFuPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFNvY2tldE1hbmFnZXIge1xuICBwcml2YXRlIHNvY2tldCE6IFNvY2tldDtcblxuICBhc3luYyB2YWxpZGF0ZUFwaUtleVRva2VuKHZhbHVlOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAoIS9eW2EtejAtOV17NjR9JC9pLnRlc3QodmFsdWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgQVBJIGtleSBvciB0b2tlbi4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb25uZWN0U29ja2V0ID0gYXN5bmMgKHtcbiAgICBhcGlVc2VyTmFtZSxcbiAgICBhcGlLZXksXG4gICAgYXBpVG9rZW4sXG4gICAgbGluayxcbiAgfTogQ29ubmVjdFNvY2tldE9wdGlvbnMpOiBQcm9taXNlPFNvY2tldD4gPT4ge1xuICAgIGlmICghYXBpVXNlck5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQVBJIHVzZXJuYW1lIHJlcXVpcmVkLicpO1xuICAgIH1cbiAgICBpZiAoIShhcGlLZXkgfHwgYXBpVG9rZW4pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FQSSBrZXkgb3IgdG9rZW4gcmVxdWlyZWQuJyk7XG4gICAgfVxuICAgIGlmICghbGluaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb2NrZXQgbGluayByZXF1aXJlZC4nKTtcbiAgICB9XG5cbiAgICBsZXQgdXNlS2V5ID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChhcGlLZXkgJiYgYXBpS2V5Lmxlbmd0aCA9PT0gNjQpIHtcbiAgICAgICAgYXdhaXQgdGhpcy52YWxpZGF0ZUFwaUtleVRva2VuKGFwaUtleSk7XG4gICAgICAgIHVzZUtleSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoYXBpVG9rZW4pIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnZhbGlkYXRlQXBpS2V5VG9rZW4oYXBpVG9rZW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQVBJIHRva2VuIGlzIHJlcXVpcmVkLicpO1xuICAgICAgICB9XG4gICAgICAgIHVzZUtleSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgQVBJIGtleSBvciB0b2tlbi4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcXVlcnkgPSB1c2VLZXkgPyB7IGFwaVVzZXJOYW1lLCBhcGlLZXkgfSA6IHsgYXBpVXNlck5hbWUsIGFwaVRva2VuIH07XG5cbiAgICAgIHRoaXMuc29ja2V0ID0gaW8oYCR7bGlua30vbWVkaWFgLCB7XG4gICAgICAgIHRyYW5zcG9ydHM6IFsnd2Vic29ja2V0J10sXG4gICAgICAgIHF1ZXJ5LFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0Lm9uKCdjb25uZWN0JywgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnQ29ubmVjdGVkIHRvIG1lZGlhIHNvY2tldC4nLCB0aGlzLnNvY2tldC5pZCk7XG4gICAgICAgIHJlc29sdmUodGhpcy5zb2NrZXQpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc29ja2V0Lm9uKCdjb25uZWN0X2Vycm9yJywgKCkgPT4ge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKCdFcnJvciBjb25uZWN0aW5nIHRvIG1lZGlhIHNvY2tldC4nKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBkaXNjb25uZWN0U29ja2V0ID0gYXN5bmMgKHsgc29ja2V0IH06IERpc2Nvbm5lY3RTb2NrZXRPcHRpb25zKTogUHJvbWlzZTxib29sZWFuPiA9PiB7XG4gICAgaWYgKHNvY2tldCkge1xuICAgICAgc29ja2V0LmRpc2Nvbm5lY3QoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG59XG4iXX0=