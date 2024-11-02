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
export declare class GetDomains {
    getDomains: ({ domains, alt_domains, apiUserName, apiKey, apiToken, parameters, }: GetDomainsOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GetDomains, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GetDomains>;
}
