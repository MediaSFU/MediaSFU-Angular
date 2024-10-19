import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service to handle domain-related operations.
 *
 * @class
 * @name GetDomains
 * @description This service provides a method to retrieve and process domains.
 *
 * @method
 * @name getDomains
 * @async
 * @param {Object} options - The options for retrieving domains.
 * @param {string[]} options.domains - The list of domains to process.
 * @param {Object} options.alt_domains - An object mapping domains to alternative domains.
 * @param {string} options.apiUserName - The API username for authentication.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.apiToken - The API token for authentication.
 * @param {Object} options.parameters - Additional parameters for the operation.
 * @param {string[]} options.parameters.roomRecvIPs - The list of IPs currently in the room.
 * @param {Function} options.parameters.getUpdatedAllParams - A function to get updated parameters.
 * @param {Function} options.parameters.connectIps - A function to connect IPs.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 * @throws {Error} Throws an error if the domain retrieval fails.
 */
export class GetDomains {
    getDomains = async ({ domains, alt_domains, apiUserName, apiKey, apiToken, parameters, }) => {
        const { roomRecvIPs, connectIps } = parameters;
        const ipsToConnect = [];
        let updatedConsumeSockets = parameters.getUpdatedAllParams().consume_sockets;
        try {
            for (const domain of domains) {
                const ipToCheck = alt_domains[domain] || domain;
                // Check if the IP is already in roomRecvIPs
                if (!roomRecvIPs.includes(ipToCheck)) {
                    ipsToConnect.push(ipToCheck);
                }
            }
            const [,] = await connectIps({
                consume_sockets: updatedConsumeSockets,
                remIP: ipsToConnect,
                parameters,
                apiUserName,
                apiKey,
                apiToken,
            });
            // Handle sockets_ and ips_ if needed
        }
        catch (error) {
            console.error('Error in getDomains: ', error);
            throw new Error('Failed to retrieve domains.');
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GetDomains, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GetDomains, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GetDomains, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWRvbWFpbnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9nZXQtZG9tYWlucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBa0MzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUlILE1BQU0sT0FBTyxVQUFVO0lBQ3JCLFVBQVUsR0FBRyxLQUFLLEVBQUUsRUFDbEIsT0FBTyxFQUNQLFdBQVcsRUFDWCxXQUFXLEVBQ1gsTUFBTSxFQUNOLFFBQVEsRUFDUixVQUFVLEdBQ1EsRUFBaUIsRUFBRTtRQUNyQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUUvQyxNQUFNLFlBQVksR0FBYSxFQUFFLENBQUM7UUFFbEMsSUFBSSxxQkFBcUIsR0FBRyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxlQUFlLENBQUM7UUFFN0UsSUFBSSxDQUFDO1lBQ0gsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUUsQ0FBQztnQkFDN0IsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQztnQkFDaEQsNENBQTRDO2dCQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO29CQUNyQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMvQixDQUFDO1lBQ0gsQ0FBQztZQUVELE1BQU0sQ0FBQyxFQUFFLEdBQUcsTUFBTSxVQUFVLENBQUM7Z0JBQzNCLGVBQWUsRUFBRSxxQkFBcUI7Z0JBQ3RDLEtBQUssRUFBRSxZQUFZO2dCQUNuQixVQUFVO2dCQUNWLFdBQVc7Z0JBQ1gsTUFBTTtnQkFDTixRQUFRO2FBQ1QsQ0FBQyxDQUFDO1lBRUgscUNBQXFDO1FBQ3ZDLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM5QyxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDakQsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0F0Q1MsVUFBVTsyR0FBVixVQUFVLGNBRlQsTUFBTTs7MkZBRVAsVUFBVTtrQkFIdEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIENvbm5lY3RJcHNUeXBlLFxuICBDb25uZWN0SXBzUGFyYW1ldGVycyxcbiAgQWx0RG9tYWlucyxcbiAgQ29uc3VtZVNvY2tldCxcbn0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcbmltcG9ydCB7IFJ0cENhcGFiaWxpdGllcyB9IGZyb20gJ21lZGlhc291cC1jbGllbnQvbGliL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBHZXREb21haW5zUGFyYW1ldGVycyBleHRlbmRzIENvbm5lY3RJcHNQYXJhbWV0ZXJzIHtcbiAgcm9vbVJlY3ZJUHM6IHN0cmluZ1tdO1xuICBydHBDYXBhYmlsaXRpZXM6IFJ0cENhcGFiaWxpdGllcyB8IG51bGw7XG4gIGNvbnN1bWVfc29ja2V0czogQ29uc3VtZVNvY2tldFtdO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBjb25uZWN0SXBzOiBDb25uZWN0SXBzVHlwZTtcbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gR2V0RG9tYWluc1BhcmFtZXRlcnM7XG5cbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdldERvbWFpbnNPcHRpb25zIHtcbiAgZG9tYWluczogc3RyaW5nW107XG4gIGFsdF9kb21haW5zOiBBbHREb21haW5zO1xuICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICBhcGlLZXk6IHN0cmluZztcbiAgYXBpVG9rZW46IHN0cmluZztcbiAgcGFyYW1ldGVyczogR2V0RG9tYWluc1BhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIEdldERvbWFpbnNUeXBlID0gKG9wdGlvbnM6IEdldERvbWFpbnNPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIFNlcnZpY2UgdG8gaGFuZGxlIGRvbWFpbi1yZWxhdGVkIG9wZXJhdGlvbnMuXG4gKlxuICogQGNsYXNzXG4gKiBAbmFtZSBHZXREb21haW5zXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBzZXJ2aWNlIHByb3ZpZGVzIGEgbWV0aG9kIHRvIHJldHJpZXZlIGFuZCBwcm9jZXNzIGRvbWFpbnMuXG4gKlxuICogQG1ldGhvZFxuICogQG5hbWUgZ2V0RG9tYWluc1xuICogQGFzeW5jXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciByZXRyaWV2aW5nIGRvbWFpbnMuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBvcHRpb25zLmRvbWFpbnMgLSBUaGUgbGlzdCBvZiBkb21haW5zIHRvIHByb2Nlc3MuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5hbHRfZG9tYWlucyAtIEFuIG9iamVjdCBtYXBwaW5nIGRvbWFpbnMgdG8gYWx0ZXJuYXRpdmUgZG9tYWlucy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmFwaVVzZXJOYW1lIC0gVGhlIEFQSSB1c2VybmFtZSBmb3IgYXV0aGVudGljYXRpb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5hcGlLZXkgLSBUaGUgQVBJIGtleSBmb3IgYXV0aGVudGljYXRpb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5hcGlUb2tlbiAtIFRoZSBBUEkgdG9rZW4gZm9yIGF1dGhlbnRpY2F0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIEFkZGl0aW9uYWwgcGFyYW1ldGVycyBmb3IgdGhlIG9wZXJhdGlvbi5cbiAqIEBwYXJhbSB7c3RyaW5nW119IG9wdGlvbnMucGFyYW1ldGVycy5yb29tUmVjdklQcyAtIFRoZSBsaXN0IG9mIElQcyBjdXJyZW50bHkgaW4gdGhlIHJvb20uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcyAtIEEgZnVuY3Rpb24gdG8gZ2V0IHVwZGF0ZWQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jb25uZWN0SXBzIC0gQSBmdW5jdGlvbiB0byBjb25uZWN0IElQcy5cbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBvcGVyYXRpb24gaXMgY29tcGxldGUuXG4gKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBkb21haW4gcmV0cmlldmFsIGZhaWxzLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgR2V0RG9tYWlucyB7XG4gIGdldERvbWFpbnMgPSBhc3luYyAoe1xuICAgIGRvbWFpbnMsXG4gICAgYWx0X2RvbWFpbnMsXG4gICAgYXBpVXNlck5hbWUsXG4gICAgYXBpS2V5LFxuICAgIGFwaVRva2VuLFxuICAgIHBhcmFtZXRlcnMsXG4gIH06IEdldERvbWFpbnNPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyByb29tUmVjdklQcywgY29ubmVjdElwcyB9ID0gcGFyYW1ldGVycztcblxuICAgIGNvbnN0IGlwc1RvQ29ubmVjdDogc3RyaW5nW10gPSBbXTtcblxuICAgIGxldCB1cGRhdGVkQ29uc3VtZVNvY2tldHMgPSBwYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMoKS5jb25zdW1lX3NvY2tldHM7XG5cbiAgICB0cnkge1xuICAgICAgZm9yIChjb25zdCBkb21haW4gb2YgZG9tYWlucykge1xuICAgICAgICBjb25zdCBpcFRvQ2hlY2sgPSBhbHRfZG9tYWluc1tkb21haW5dIHx8IGRvbWFpbjtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIElQIGlzIGFscmVhZHkgaW4gcm9vbVJlY3ZJUHNcbiAgICAgICAgaWYgKCFyb29tUmVjdklQcy5pbmNsdWRlcyhpcFRvQ2hlY2spKSB7XG4gICAgICAgICAgaXBzVG9Db25uZWN0LnB1c2goaXBUb0NoZWNrKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBbLF0gPSBhd2FpdCBjb25uZWN0SXBzKHtcbiAgICAgICAgY29uc3VtZV9zb2NrZXRzOiB1cGRhdGVkQ29uc3VtZVNvY2tldHMsXG4gICAgICAgIHJlbUlQOiBpcHNUb0Nvbm5lY3QsXG4gICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgIGFwaVVzZXJOYW1lLFxuICAgICAgICBhcGlLZXksXG4gICAgICAgIGFwaVRva2VuLFxuICAgICAgfSk7XG5cbiAgICAgIC8vIEhhbmRsZSBzb2NrZXRzXyBhbmQgaXBzXyBpZiBuZWVkZWRcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW4gZ2V0RG9tYWluczogJywgZXJyb3IpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gcmV0cmlldmUgZG9tYWlucy4nKTtcbiAgICB9XG4gIH07XG59XG4iXX0=