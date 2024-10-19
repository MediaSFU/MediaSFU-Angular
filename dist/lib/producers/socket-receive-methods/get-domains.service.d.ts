import { ConnectIpsType, ConnectIpsParameters, AltDomains, ConsumeSocket } from '../../@types/types';
import { RtpCapabilities } from 'mediasoup-client/lib/types';
import * as i0 from "@angular/core";
export interface GetDomainsParameters extends ConnectIpsParameters {
    roomRecvIPs: string[];
    rtpCapabilities: RtpCapabilities | null;
    consume_sockets: ConsumeSocket[];
    connectIps: ConnectIpsType;
    getUpdatedAllParams: () => GetDomainsParameters;
    [key: string]: any;
}
export interface GetDomainsOptions {
    domains: string[];
    alt_domains: AltDomains;
    apiUserName: string;
    apiKey: string;
    apiToken: string;
    parameters: GetDomainsParameters;
}
export type GetDomainsType = (options: GetDomainsOptions) => Promise<void>;
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
export declare class GetDomains {
    getDomains: ({ domains, alt_domains, apiUserName, apiKey, apiToken, parameters, }: GetDomainsOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GetDomains, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GetDomains>;
}
