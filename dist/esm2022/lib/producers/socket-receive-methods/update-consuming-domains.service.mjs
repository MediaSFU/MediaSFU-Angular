import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class UpdateConsumingDomains {
    /**
     * Updates the consuming domains based on the provided options.
     *
     * @param {Object} options - The options for updating the consuming domains.
     * @param {Array<string>} options.domains - The consuming domains to update.
     * @param {Object} options.alt_domains - The alternative consuming domains to update.
     * @param {string} options.apiUserName - The API username for the consuming domains.
     * @param {string} options.apiKey - The API key for the consuming domains.
     * @param {string} options.apiToken - The API token for the consuming domains.
     * @param {Object} options.parameters - The parameters for updating the consuming domains.
     * @param {Array<Participant>} options.parameters.participants - The participants to update consuming domains for.
     * @param {Array<ConsumeSocket>} options.parameters.consume_sockets - The consume sockets to update consuming domains for.
     * @param {Function} options.parameters.getDomains - Function to get the consuming domains.
     * @param {Function} options.parameters.connectIps - Function to connect IPs.
     * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     *
     * @returns {Promise<void>} A promise that resolves when the consuming domains have been updated.
     *
     * @throws Will log an error message if an error occurs during the update process.
     */
    updateConsumingDomains = async ({ domains, alt_domains, parameters, apiUserName, apiKey, apiToken, }) => {
        let { participants, getDomains, consume_sockets, connectIps } = parameters;
        parameters = parameters.getUpdatedAllParams();
        consume_sockets = parameters.consume_sockets;
        console.log('Updating consuming domains...');
        try {
            // Check if participants array is not empty
            if (participants.length > 0) {
                // Check if alt_domains has keys and remove duplicates
                if (Object.keys(alt_domains).length > 0) {
                    console.log('Getting domains...');
                    await getDomains({ domains, alt_domains, apiUserName, apiKey, apiToken, parameters });
                }
                else {
                    await connectIps({
                        consume_sockets,
                        remIP: domains,
                        parameters,
                        apiUserName,
                        apiKey,
                        apiToken,
                    });
                }
            }
        }
        catch (error) {
            console.log('Error in updateConsumingDomains: ', error);
            // throw new Error('Failed to update consuming domains.');
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UpdateConsumingDomains, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UpdateConsumingDomains, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UpdateConsumingDomains, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWNvbnN1bWluZy1kb21haW5zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvdXBkYXRlLWNvbnN1bWluZy1kb21haW5zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUF3QzNDLE1BQU0sT0FBTyxzQkFBc0I7SUFDakM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFDSCxzQkFBc0IsR0FBRyxLQUFLLEVBQUUsRUFDOUIsT0FBTyxFQUNQLFdBQVcsRUFDWCxVQUFVLEVBQ1YsV0FBVyxFQUNYLE1BQU0sRUFDTixRQUFRLEdBQ3NCLEVBQWlCLEVBQUU7UUFDakQsSUFBSSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUUzRSxVQUFVLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDOUMsZUFBZSxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUM7UUFFN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQztZQUNILDJDQUEyQztZQUMzQyxJQUFJLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQzVCLHNEQUFzRDtnQkFDdEQsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO29CQUNsQyxNQUFNLFVBQVUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDeEYsQ0FBQztxQkFBTSxDQUFDO29CQUNOLE1BQU0sVUFBVSxDQUFDO3dCQUNmLGVBQWU7d0JBQ2YsS0FBSyxFQUFFLE9BQU87d0JBQ2QsVUFBVTt3QkFDVixXQUFXO3dCQUNYLE1BQU07d0JBQ04sUUFBUTtxQkFDVCxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDeEQsMERBQTBEO1FBQzVELENBQUM7SUFDSCxDQUFDLENBQUM7dUdBMURTLHNCQUFzQjsyR0FBdEIsc0JBQXNCLGNBRnJCLE1BQU07OzJGQUVQLHNCQUFzQjtrQkFIbEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb25uZWN0SXBzVHlwZSxcbiAgR2V0RG9tYWluc1R5cGUsXG4gIENvbm5lY3RJcHNQYXJhbWV0ZXJzLFxuICBHZXREb21haW5zUGFyYW1ldGVycyxcbiAgQWx0RG9tYWlucyxcbiAgUGFydGljaXBhbnQsXG4gIENvbnN1bWVTb2NrZXQsXG59IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBkYXRlQ29uc3VtaW5nRG9tYWluc1BhcmFtZXRlcnNcbiAgZXh0ZW5kcyBDb25uZWN0SXBzUGFyYW1ldGVycyxcbiAgICBHZXREb21haW5zUGFyYW1ldGVycyB7XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgY29uc3VtZV9zb2NrZXRzOiBDb25zdW1lU29ja2V0W107XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIGNvbm5lY3RJcHM6IENvbm5lY3RJcHNUeXBlO1xuICBnZXREb21haW5zOiBHZXREb21haW5zVHlwZTtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBVcGRhdGVDb25zdW1pbmdEb21haW5zUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVwZGF0ZUNvbnN1bWluZ0RvbWFpbnNPcHRpb25zIHtcbiAgZG9tYWluczogc3RyaW5nW107XG4gIGFsdF9kb21haW5zOiBBbHREb21haW5zO1xuICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICBhcGlLZXk6IHN0cmluZztcbiAgYXBpVG9rZW46IHN0cmluZztcbiAgcGFyYW1ldGVyczogVXBkYXRlQ29uc3VtaW5nRG9tYWluc1BhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFVwZGF0ZUNvbnN1bWluZ0RvbWFpbnNUeXBlID0gKG9wdGlvbnM6IFVwZGF0ZUNvbnN1bWluZ0RvbWFpbnNPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVXBkYXRlQ29uc3VtaW5nRG9tYWlucyB7XG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBjb25zdW1pbmcgZG9tYWlucyBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgb3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgdXBkYXRpbmcgdGhlIGNvbnN1bWluZyBkb21haW5zLlxuICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IG9wdGlvbnMuZG9tYWlucyAtIFRoZSBjb25zdW1pbmcgZG9tYWlucyB0byB1cGRhdGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLmFsdF9kb21haW5zIC0gVGhlIGFsdGVybmF0aXZlIGNvbnN1bWluZyBkb21haW5zIHRvIHVwZGF0ZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuYXBpVXNlck5hbWUgLSBUaGUgQVBJIHVzZXJuYW1lIGZvciB0aGUgY29uc3VtaW5nIGRvbWFpbnMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmFwaUtleSAtIFRoZSBBUEkga2V5IGZvciB0aGUgY29uc3VtaW5nIGRvbWFpbnMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmFwaVRva2VuIC0gVGhlIEFQSSB0b2tlbiBmb3IgdGhlIGNvbnN1bWluZyBkb21haW5zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHVwZGF0aW5nIHRoZSBjb25zdW1pbmcgZG9tYWlucy5cbiAgICogQHBhcmFtIHtBcnJheTxQYXJ0aWNpcGFudD59IG9wdGlvbnMucGFyYW1ldGVycy5wYXJ0aWNpcGFudHMgLSBUaGUgcGFydGljaXBhbnRzIHRvIHVwZGF0ZSBjb25zdW1pbmcgZG9tYWlucyBmb3IuXG4gICAqIEBwYXJhbSB7QXJyYXk8Q29uc3VtZVNvY2tldD59IG9wdGlvbnMucGFyYW1ldGVycy5jb25zdW1lX3NvY2tldHMgLSBUaGUgY29uc3VtZSBzb2NrZXRzIHRvIHVwZGF0ZSBjb25zdW1pbmcgZG9tYWlucyBmb3IuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5nZXREb21haW5zIC0gRnVuY3Rpb24gdG8gZ2V0IHRoZSBjb25zdW1pbmcgZG9tYWlucy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNvbm5lY3RJcHMgLSBGdW5jdGlvbiB0byBjb25uZWN0IElQcy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMgLSBGdW5jdGlvbiB0byBnZXQgdXBkYXRlZCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgY29uc3VtaW5nIGRvbWFpbnMgaGF2ZSBiZWVuIHVwZGF0ZWQuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCBsb2cgYW4gZXJyb3IgbWVzc2FnZSBpZiBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIHRoZSB1cGRhdGUgcHJvY2Vzcy5cbiAgICovXG4gIHVwZGF0ZUNvbnN1bWluZ0RvbWFpbnMgPSBhc3luYyAoe1xuICAgIGRvbWFpbnMsXG4gICAgYWx0X2RvbWFpbnMsXG4gICAgcGFyYW1ldGVycyxcbiAgICBhcGlVc2VyTmFtZSxcbiAgICBhcGlLZXksXG4gICAgYXBpVG9rZW4sXG4gIH06IFVwZGF0ZUNvbnN1bWluZ0RvbWFpbnNPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgbGV0IHsgcGFydGljaXBhbnRzLCBnZXREb21haW5zLCBjb25zdW1lX3NvY2tldHMsIGNvbm5lY3RJcHMgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICBwYXJhbWV0ZXJzID0gcGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG4gICAgY29uc3VtZV9zb2NrZXRzID0gcGFyYW1ldGVycy5jb25zdW1lX3NvY2tldHM7XG5cbiAgICBjb25zb2xlLmxvZygnVXBkYXRpbmcgY29uc3VtaW5nIGRvbWFpbnMuLi4nKTtcblxuICAgIHRyeSB7XG4gICAgICAvLyBDaGVjayBpZiBwYXJ0aWNpcGFudHMgYXJyYXkgaXMgbm90IGVtcHR5XG4gICAgICBpZiAocGFydGljaXBhbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgYWx0X2RvbWFpbnMgaGFzIGtleXMgYW5kIHJlbW92ZSBkdXBsaWNhdGVzXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhhbHRfZG9tYWlucykubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdHZXR0aW5nIGRvbWFpbnMuLi4nKTtcbiAgICAgICAgICBhd2FpdCBnZXREb21haW5zKHsgZG9tYWlucywgYWx0X2RvbWFpbnMsIGFwaVVzZXJOYW1lLCBhcGlLZXksIGFwaVRva2VuLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IGNvbm5lY3RJcHMoe1xuICAgICAgICAgICAgY29uc3VtZV9zb2NrZXRzLFxuICAgICAgICAgICAgcmVtSVA6IGRvbWFpbnMsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICAgICAgYXBpVXNlck5hbWUsXG4gICAgICAgICAgICBhcGlLZXksXG4gICAgICAgICAgICBhcGlUb2tlbixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgaW4gdXBkYXRlQ29uc3VtaW5nRG9tYWluczogJywgZXJyb3IpO1xuICAgICAgLy8gdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gdXBkYXRlIGNvbnN1bWluZyBkb21haW5zLicpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==