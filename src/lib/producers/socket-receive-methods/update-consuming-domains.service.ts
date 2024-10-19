import { Injectable } from '@angular/core';
import {
  ConnectIpsType,
  GetDomainsType,
  ConnectIpsParameters,
  GetDomainsParameters,
  AltDomains,
  Participant,
  ConsumeSocket,
} from '../../@types/types';

export interface UpdateConsumingDomainsParameters
  extends ConnectIpsParameters,
    GetDomainsParameters {
  participants: Participant[];
  consume_sockets: ConsumeSocket[];

  // mediasfu functions
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

// Export the type definition for the function
export type UpdateConsumingDomainsType = (options: UpdateConsumingDomainsOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
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
  updateConsumingDomains = async ({
    domains,
    alt_domains,
    parameters,
    apiUserName,
    apiKey,
    apiToken,
  }: UpdateConsumingDomainsOptions): Promise<void> => {
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
        } else {
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
    } catch (error) {
      console.log('Error in updateConsumingDomains: ', error);
      // throw new Error('Failed to update consuming domains.');
    }
  };
}
