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
