import { ConnectIpsType, GetDomainsType, ConnectIpsParameters, GetDomainsParameters, AltDomains, Participant, ConsumeSocket } from '../../@types/types';
import * as i0 from "@angular/core";
export interface UpdateConsumingDomainsParameters extends ConnectIpsParameters, GetDomainsParameters {
    participants: Participant[];
    consume_sockets: ConsumeSocket[];
    connectIps: ConnectIpsType;
    getDomains: GetDomainsType;
    getUpdatedAllParams: () => UpdateConsumingDomainsParameters;
    [key: string]: any;
}
export interface UpdateConsumingDomainsOptions {
    domains: string[];
    alt_domains: AltDomains;
    apiUserName: string;
    apiKey: string;
    apiToken: string;
    parameters: UpdateConsumingDomainsParameters;
}
export type UpdateConsumingDomainsType = (options: UpdateConsumingDomainsOptions) => Promise<void>;
/**
 * Service to update consuming domains based on specified options and parameters.
 *
 * @class
 * @name UpdateConsumingDomains
 * @description Provides a method to update consuming domains and optionally connect IPs based on the domains provided.
 *
 * @method
 * updateConsumingDomains
 *
 * @param {UpdateConsumingDomainsOptions} options - Options for updating consuming domains:
 *   - `domains` {Array<string>}: The list of domains to be updated.
 *   - `alt_domains` {AltDomains}: Alternative domains for fallback scenarios.
 *   - `apiUserName` {string}: API username for authentication.
 *   - `apiKey` {string}: API key for access.
 *   - `apiToken` {string}: API token for additional security.
 *   - `parameters` {UpdateConsumingDomainsParameters}: The parameters needed for updating, including:
 *     - `participants` {Array<Participant>}: List of participants.
 *     - `consume_sockets` {Array<ConsumeSocket>}: Sockets to use for consuming domains.
 *     - `getDomains` {Function}: Function to retrieve current domain configurations.
 *     - `connectIps` {Function}: Function to initiate IP connections.
 *     - `getUpdatedAllParams` {Function}: Refreshes and returns the latest parameters.
 *
 * @returns {Promise<void>} Resolves when the consuming domains have been successfully updated.
 *
 * @example
 * const options = {
 *   domains: ['example.com', 'sample.org'],
 *   alt_domains: { primary: 'primary.com', backup: 'backup.com' },
 *   apiUserName: 'user123',
 *   apiKey: 'apikey123',
 *   apiToken: 'token123',
 *   parameters: {
 *     participants: [{ id: '1', name: 'John Doe' }],
 *     consume_sockets: [socket1, socket2],
 *     getDomains: (opts) => fetchDomains(opts),
 *     connectIps: (opts) => connectToIPs(opts),
 *     getUpdatedAllParams: () => refreshParams(),
 *   },
 * };
 * await updateConsumingDomainsService.updateConsumingDomains(options);
 */
export declare class UpdateConsumingDomains {
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
    updateConsumingDomains: ({ domains, alt_domains, parameters, apiUserName, apiKey, apiToken, }: UpdateConsumingDomainsOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpdateConsumingDomains, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UpdateConsumingDomains>;
}
