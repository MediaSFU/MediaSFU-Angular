import { SocketManager } from '../sockets/socket-manager.service';
import { NewPipeProducer } from './socket-receive-methods/new-pipe-producer.service';
import { ProducerClosed } from './socket-receive-methods/producer-closed.service';
import { JoinConsumeRoom } from './socket-receive-methods/join-consume-room.service';
import { Device } from 'mediasoup-client/lib/types';
import { ReorderStreamsParameters, ReorderStreamsType, NewPipeProducerParameters, NewPipeProducerType, ProducerClosedType, ProducerClosedParameters, JoinConsumeRoomType, JoinConsumeRoomParameters, ConsumeSocket } from '../@types/types';
import * as i0 from "@angular/core";
export interface ConnectIpsParameters extends ReorderStreamsParameters, JoinConsumeRoomParameters, ProducerClosedParameters, NewPipeProducerParameters {
    device: Device | null;
    roomRecvIPs: string[];
    updateRoomRecvIPs: (roomRecvIPs: string[]) => void;
    updateConsume_sockets: (consume_sockets: ConsumeSocket[]) => void;
    reorderStreams: ReorderStreamsType;
    getUpdatedAllParams: () => ConnectIpsParameters;
    [key: string]: any;
}
export interface ConnectIpsOptions {
    consume_sockets: ConsumeSocket[];
    remIP: string[];
    apiUserName: string;
    apiKey?: string;
    apiToken: string;
    newProducerMethod?: NewPipeProducerType;
    closedProducerMethod?: ProducerClosedType;
    joinConsumeRoomMethod?: JoinConsumeRoomType;
    parameters: ConnectIpsParameters;
}
export type ConnectIpsType = (options: ConnectIpsOptions) => Promise<[Record<string, any>[], string[]]>;
export declare class ConnectIps {
    private socketManagerService;
    private newPipeProducerService;
    private producerClosedService;
    private joinConsumeRoomService;
    constructor(socketManagerService: SocketManager, newPipeProducerService: NewPipeProducer, producerClosedService: ProducerClosed, joinConsumeRoomService: JoinConsumeRoom);
    /**
     * Connects to remote IPs and manages socket connections.
     *
     * @param {Object} options - The options for connecting IPs.
     * @param {Record<string, any>[]} options.consume_sockets - The array of current socket connections.
     * @param {string[]} options.remIP - The list of remote IPs to connect to.
     * @param {string} options.apiUserName - The API username for authentication.
     * @param {string} [options.apiKey] - The API key for authentication.
     * @param {string} [options.apiToken] - The API token for authentication.
     * @param {Function} [options.newProducerMethod=newPipeProducer] - The method to handle new pipe producer events.
     * @param {Function} [options.closedProducerMethod=producerClosed] - The method to handle producer closed events.
     * @param {Function} [options.joinConsumeRoomMethod=joinConsumeRoom] - The method to handle joining a consuming room.
     * @param {Object} options.parameters - Additional parameters.
     * @param {string[]} options.parameters.roomRecvIPs - The list of IPs that have been received in the room.
     * @param {Function} options.parameters.updateRoomRecvIPs - The function to update the room received IPs.
     * @param {Function} options.parameters.updateConsume_sockets - The function to update the consume sockets.
     *
     * @returns {Promise<[Record<string, any>[], string[]]>} A promise that resolves to an array containing the updated consume sockets and room received IPs.
     *
     * @throws Will throw an error if required parameters are missing or if there is an issue connecting to a remote IP.
     */
    connectIps: ({ consume_sockets, remIP, apiUserName, apiKey, apiToken, newProducerMethod, closedProducerMethod, joinConsumeRoomMethod, parameters, }: ConnectIpsOptions) => Promise<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConnectIps, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConnectIps>;
}
