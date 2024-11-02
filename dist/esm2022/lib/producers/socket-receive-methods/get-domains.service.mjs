import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service to handle domain-related operations, such as retrieving and processing domains for connection.
 *
 * @class
 * @name GetDomains
 * @description This service provides a method to retrieve and process domains by connecting IPs that are not currently present in the room.
 *
 * @method
 * getDomains
 * @async
 * @param {GetDomainsOptions} options - The options for retrieving and connecting domains.
 * @param {string[]} options.domains - The list of domains to process.
 * @param {AltDomains} options.alt_domains - An object mapping primary domains to alternative domains.
 * @param {string} options.apiUserName - The API username for authentication.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.apiToken - The API token for authentication.
 * @param {GetDomainsParameters} options.parameters - Additional parameters for the operation.
 * @param {string[]} options.parameters.roomRecvIPs - The list of IP addresses already connected in the room.
 * @param {Function} options.parameters.getUpdatedAllParams - A function to get updated parameters.
 * @param {Function} options.parameters.connectIps - A function to connect IPs that are not currently present.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 * @throws {Error} Throws an error if the domain retrieval or connection fails.
 *
 * @example
 * const options = {
 *   domains: ['example.com', 'example.org'],
 *   alt_domains: { 'example.com': 'alt-example.com' },
 *   apiUserName: 'user123',
 *   apiKey: 'key123',
 *   apiToken: 'token123',
 *   parameters: {
 *     roomRecvIPs: ['192.168.1.1'],
 *     getUpdatedAllParams: () => updatedParameters,
 *     connectIps: connectIpsFunction,
 *   }
 * };
 * getDomainsService.getDomains(options);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWRvbWFpbnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9nZXQtZG9tYWlucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBa0MzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFDRztBQUlILE1BQU0sT0FBTyxVQUFVO0lBQ3JCLFVBQVUsR0FBRyxLQUFLLEVBQUUsRUFDbEIsT0FBTyxFQUNQLFdBQVcsRUFDWCxXQUFXLEVBQ1gsTUFBTSxFQUNOLFFBQVEsRUFDUixVQUFVLEdBQ1EsRUFBaUIsRUFBRTtRQUNyQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUUvQyxNQUFNLFlBQVksR0FBYSxFQUFFLENBQUM7UUFFbEMsSUFBSSxxQkFBcUIsR0FBRyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxlQUFlLENBQUM7UUFFN0UsSUFBSSxDQUFDO1lBQ0gsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUUsQ0FBQztnQkFDN0IsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQztnQkFDaEQsNENBQTRDO2dCQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO29CQUNyQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMvQixDQUFDO1lBQ0gsQ0FBQztZQUVELE1BQU0sQ0FBQyxFQUFFLEdBQUcsTUFBTSxVQUFVLENBQUM7Z0JBQzNCLGVBQWUsRUFBRSxxQkFBcUI7Z0JBQ3RDLEtBQUssRUFBRSxZQUFZO2dCQUNuQixVQUFVO2dCQUNWLFdBQVc7Z0JBQ1gsTUFBTTtnQkFDTixRQUFRO2FBQ1QsQ0FBQyxDQUFDO1lBRUgscUNBQXFDO1FBQ3ZDLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM5QyxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDakQsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0F0Q1MsVUFBVTsyR0FBVixVQUFVLGNBRlQsTUFBTTs7MkZBRVAsVUFBVTtrQkFIdEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIENvbm5lY3RJcHNUeXBlLFxuICBDb25uZWN0SXBzUGFyYW1ldGVycyxcbiAgQWx0RG9tYWlucyxcbiAgQ29uc3VtZVNvY2tldCxcbn0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcbmltcG9ydCB7IFJ0cENhcGFiaWxpdGllcyB9IGZyb20gJ21lZGlhc291cC1jbGllbnQvbGliL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBHZXREb21haW5zUGFyYW1ldGVycyBleHRlbmRzIENvbm5lY3RJcHNQYXJhbWV0ZXJzIHtcbiAgcm9vbVJlY3ZJUHM6IHN0cmluZ1tdO1xuICBydHBDYXBhYmlsaXRpZXM6IFJ0cENhcGFiaWxpdGllcyB8IG51bGw7XG4gIGNvbnN1bWVfc29ja2V0czogQ29uc3VtZVNvY2tldFtdO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBjb25uZWN0SXBzOiBDb25uZWN0SXBzVHlwZTtcbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gR2V0RG9tYWluc1BhcmFtZXRlcnM7XG5cbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdldERvbWFpbnNPcHRpb25zIHtcbiAgZG9tYWluczogc3RyaW5nW107XG4gIGFsdF9kb21haW5zOiBBbHREb21haW5zO1xuICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICBhcGlLZXk6IHN0cmluZztcbiAgYXBpVG9rZW46IHN0cmluZztcbiAgcGFyYW1ldGVyczogR2V0RG9tYWluc1BhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIEdldERvbWFpbnNUeXBlID0gKG9wdGlvbnM6IEdldERvbWFpbnNPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIFNlcnZpY2UgdG8gaGFuZGxlIGRvbWFpbi1yZWxhdGVkIG9wZXJhdGlvbnMsIHN1Y2ggYXMgcmV0cmlldmluZyBhbmQgcHJvY2Vzc2luZyBkb21haW5zIGZvciBjb25uZWN0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQG5hbWUgR2V0RG9tYWluc1xuICogQGRlc2NyaXB0aW9uIFRoaXMgc2VydmljZSBwcm92aWRlcyBhIG1ldGhvZCB0byByZXRyaWV2ZSBhbmQgcHJvY2VzcyBkb21haW5zIGJ5IGNvbm5lY3RpbmcgSVBzIHRoYXQgYXJlIG5vdCBjdXJyZW50bHkgcHJlc2VudCBpbiB0aGUgcm9vbS5cbiAqXG4gKiBAbWV0aG9kXG4gKiBnZXREb21haW5zXG4gKiBAYXN5bmNcbiAqIEBwYXJhbSB7R2V0RG9tYWluc09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgcmV0cmlldmluZyBhbmQgY29ubmVjdGluZyBkb21haW5zLlxuICogQHBhcmFtIHtzdHJpbmdbXX0gb3B0aW9ucy5kb21haW5zIC0gVGhlIGxpc3Qgb2YgZG9tYWlucyB0byBwcm9jZXNzLlxuICogQHBhcmFtIHtBbHREb21haW5zfSBvcHRpb25zLmFsdF9kb21haW5zIC0gQW4gb2JqZWN0IG1hcHBpbmcgcHJpbWFyeSBkb21haW5zIHRvIGFsdGVybmF0aXZlIGRvbWFpbnMuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5hcGlVc2VyTmFtZSAtIFRoZSBBUEkgdXNlcm5hbWUgZm9yIGF1dGhlbnRpY2F0aW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuYXBpS2V5IC0gVGhlIEFQSSBrZXkgZm9yIGF1dGhlbnRpY2F0aW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuYXBpVG9rZW4gLSBUaGUgQVBJIHRva2VuIGZvciBhdXRoZW50aWNhdGlvbi5cbiAqIEBwYXJhbSB7R2V0RG9tYWluc1BhcmFtZXRlcnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIEFkZGl0aW9uYWwgcGFyYW1ldGVycyBmb3IgdGhlIG9wZXJhdGlvbi5cbiAqIEBwYXJhbSB7c3RyaW5nW119IG9wdGlvbnMucGFyYW1ldGVycy5yb29tUmVjdklQcyAtIFRoZSBsaXN0IG9mIElQIGFkZHJlc3NlcyBhbHJlYWR5IGNvbm5lY3RlZCBpbiB0aGUgcm9vbS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zIC0gQSBmdW5jdGlvbiB0byBnZXQgdXBkYXRlZCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNvbm5lY3RJcHMgLSBBIGZ1bmN0aW9uIHRvIGNvbm5lY3QgSVBzIHRoYXQgYXJlIG5vdCBjdXJyZW50bHkgcHJlc2VudC5cbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBvcGVyYXRpb24gaXMgY29tcGxldGUuXG4gKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBkb21haW4gcmV0cmlldmFsIG9yIGNvbm5lY3Rpb24gZmFpbHMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IG9wdGlvbnMgPSB7XG4gKiAgIGRvbWFpbnM6IFsnZXhhbXBsZS5jb20nLCAnZXhhbXBsZS5vcmcnXSxcbiAqICAgYWx0X2RvbWFpbnM6IHsgJ2V4YW1wbGUuY29tJzogJ2FsdC1leGFtcGxlLmNvbScgfSxcbiAqICAgYXBpVXNlck5hbWU6ICd1c2VyMTIzJyxcbiAqICAgYXBpS2V5OiAna2V5MTIzJyxcbiAqICAgYXBpVG9rZW46ICd0b2tlbjEyMycsXG4gKiAgIHBhcmFtZXRlcnM6IHtcbiAqICAgICByb29tUmVjdklQczogWycxOTIuMTY4LjEuMSddLFxuICogICAgIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IHVwZGF0ZWRQYXJhbWV0ZXJzLFxuICogICAgIGNvbm5lY3RJcHM6IGNvbm5lY3RJcHNGdW5jdGlvbixcbiAqICAgfVxuICogfTtcbiAqIGdldERvbWFpbnNTZXJ2aWNlLmdldERvbWFpbnMob3B0aW9ucyk7XG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBHZXREb21haW5zIHtcbiAgZ2V0RG9tYWlucyA9IGFzeW5jICh7XG4gICAgZG9tYWlucyxcbiAgICBhbHRfZG9tYWlucyxcbiAgICBhcGlVc2VyTmFtZSxcbiAgICBhcGlLZXksXG4gICAgYXBpVG9rZW4sXG4gICAgcGFyYW1ldGVycyxcbiAgfTogR2V0RG9tYWluc09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB7IHJvb21SZWN2SVBzLCBjb25uZWN0SXBzIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgY29uc3QgaXBzVG9Db25uZWN0OiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgbGV0IHVwZGF0ZWRDb25zdW1lU29ja2V0cyA9IHBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpLmNvbnN1bWVfc29ja2V0cztcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKGNvbnN0IGRvbWFpbiBvZiBkb21haW5zKSB7XG4gICAgICAgIGNvbnN0IGlwVG9DaGVjayA9IGFsdF9kb21haW5zW2RvbWFpbl0gfHwgZG9tYWluO1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgSVAgaXMgYWxyZWFkeSBpbiByb29tUmVjdklQc1xuICAgICAgICBpZiAoIXJvb21SZWN2SVBzLmluY2x1ZGVzKGlwVG9DaGVjaykpIHtcbiAgICAgICAgICBpcHNUb0Nvbm5lY3QucHVzaChpcFRvQ2hlY2spO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IFssXSA9IGF3YWl0IGNvbm5lY3RJcHMoe1xuICAgICAgICBjb25zdW1lX3NvY2tldHM6IHVwZGF0ZWRDb25zdW1lU29ja2V0cyxcbiAgICAgICAgcmVtSVA6IGlwc1RvQ29ubmVjdCxcbiAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgICAgYXBpVXNlck5hbWUsXG4gICAgICAgIGFwaUtleSxcbiAgICAgICAgYXBpVG9rZW4sXG4gICAgICB9KTtcblxuICAgICAgLy8gSGFuZGxlIHNvY2tldHNfIGFuZCBpcHNfIGlmIG5lZWRlZFxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbiBnZXREb21haW5zOiAnLCBlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byByZXRyaWV2ZSBkb21haW5zLicpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==