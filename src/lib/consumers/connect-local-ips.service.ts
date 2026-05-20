import { Injectable } from '@angular/core';
import { NewPipeProducer } from './socket-receive-methods/new-pipe-producer.service';
import { ProducerClosed } from './socket-receive-methods/producer-closed.service';
import { connectLocalIps as sharedConnectLocalIps } from 'mediasfu-shared';

import {
  ReorderStreamsParameters,
  ReorderStreamsType,
  NewPipeProducerParameters,
  NewPipeProducerType,
  ProducerClosedType,
  ProducerClosedParameters,
  ReceiveAllPipedTransportsType,
  ReceiveAllPipedTransportsParameters,
} from '../@types/types';
import { Socket } from 'socket.io-client';

export interface ConnectLocalIpsParameters extends ReorderStreamsParameters, ProducerClosedParameters, NewPipeProducerParameters,
ReceiveAllPipedTransportsParameters {
  socket: Socket;

  // mediasfu functions
  reorderStreams: ReorderStreamsType;
  receiveAllPipedTransports: ReceiveAllPipedTransportsType;
  getUpdatedAllParams: () => ConnectLocalIpsParameters;
  [key: string]: any;
}

export interface ConnectLocalIpsOptions {
  socket: Socket;
  newProducerMethod?: NewPipeProducerType;
  closedProducerMethod?: ProducerClosedType;
  parameters: ConnectLocalIpsParameters;
}

// Export the type definition for the function
export type ConnectLocalIpsType = (options: ConnectLocalIpsOptions) => Promise<void>;


/**
 * Connects to remote IPs and manages socket connections.
 *
 * This method establishes connections to remote IPs for media streaming, handles new pipe producer events,
 * and manages producer closure events. It updates the necessary state in the application to reflect
 * the current connections and stream configurations.
 *
 * @param {ConnectLocalIpsOptions} options - The options for connecting IPs.
 * @param {Socket} options.socket - The socket connection to use for communication.
 * @param {Function} [options.newProducerMethod] - The method to handle new pipe producer events (default: newPipeProducer).
 * @param {Function} [options.closedProducerMethod] - The method to handle producer closed events (default: producerClosed).
 * @param {ConnectLocalIpsParameters} options.parameters - Additional parameters for the operation.
 *
 * @returns {Promise<void>} A promise that resolves when the connection is established.
 *
 * @throws Will throw an error if required parameters are missing or if there is an issue connecting to a remote IP.
 *
 * @example
 * ```typescript
 * const result = await connectLocalIps({
*     socket,
*     newProducerMethod: newPipeProducer,
*     closedProducerMethod: producerClosed,
*     parameters,
*   });
* ```
*/



@Injectable({
  providedIn: 'root',
})
export class ConnectLocalIps {
  constructor(
    private newPipeProducerService: NewPipeProducer,
    private producerClosedService: ProducerClosed,
  ) {}

  connectLocalIps: ConnectLocalIpsType = async ({
    socket,
    newProducerMethod,
    closedProducerMethod,
    parameters,
  }: ConnectLocalIpsOptions): Promise<void> => {
    const resolvedNewProducerMethod =
      newProducerMethod ??
      this.newPipeProducerService.newPipeProducer.bind(this.newPipeProducerService);
    const resolvedClosedProducerMethod =
      closedProducerMethod ??
      this.producerClosedService.producerClosed.bind(this.producerClosedService);

    return sharedConnectLocalIps({
      socket: socket as unknown as Parameters<typeof sharedConnectLocalIps>[0]['socket'],
      newProducerMethod:
        resolvedNewProducerMethod as unknown as Parameters<typeof sharedConnectLocalIps>[0]['newProducerMethod'],
      closedProducerMethod:
        resolvedClosedProducerMethod as unknown as Parameters<typeof sharedConnectLocalIps>[0]['closedProducerMethod'],
      parameters: parameters as unknown as Parameters<typeof sharedConnectLocalIps>[0]['parameters'],
    }) as Promise<void>;
  };
}
