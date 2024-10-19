import { Injectable } from '@angular/core';

import {
  ConnectIpsType,
  ConnectIpsParameters,
  AltDomains,
  ConsumeSocket,
} from '../../@types/types';
import { RtpCapabilities } from 'mediasoup-client/lib/types';

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