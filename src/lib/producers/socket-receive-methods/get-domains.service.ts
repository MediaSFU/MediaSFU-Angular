import { Injectable } from '@angular/core';

import {
  ConnectIpsType,
  ConnectIpsParameters,
  AltDomains,
  ConsumeSocket,
} from '../../@types/types';
import { types } from 'mediasoup-client';
type RtpCapabilities = types.RtpCapabilities;

export interface GetDomainsParameters extends ConnectIpsParameters {
  roomRecvIPs: string[];
  rtpCapabilities: RtpCapabilities | null;
  consume_sockets: ConsumeSocket[];

  // mediasfu functions
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

// Export the type definition for the function
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
@Injectable({
  providedIn: 'root',
})
export class GetDomains {
  getDomains = async ({
    domains,
    alt_domains,
    apiUserName,
    apiKey,
    apiToken,
    parameters,
  }: GetDomainsOptions): Promise<void> => {
    const { roomRecvIPs, connectIps } = parameters;

    const ipsToConnect: string[] = [];

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
    } catch (error) {
      console.error('Error in getDomains: ', error);
      throw new Error('Failed to retrieve domains.');
    }
  };
}
