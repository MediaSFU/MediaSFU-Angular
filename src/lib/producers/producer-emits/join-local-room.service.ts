import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import {
  ResponseJoinLocalRoom,
  PreJoinPageParameters,
  JoinMediaSFURoomOptions,
} from '../../@types/types';
import { JoinRoomOnMediaSFU, JoinRoomOnMediaSFUType } from '../../methods/utils/join-room-on-media-sfu.service';
import {
  checkMediasfuURL as sharedCheckMediasfuURL,
  joinLocalRoom as sharedJoinLocalRoom,
} from 'mediasfu-shared';

export interface JoinLocalRoomOptions {
  socket: Socket;
  roomName: string;
  islevel: string;
  member: string;
  sec: string;
  apiUserName: string;
  parameters: PreJoinPageParameters;
  checkConnect?: boolean;
  joinMediaSFURoom?: JoinRoomOnMediaSFUType;
  localLink?: string;
}

export type JoinLocalRoomType = (
  options: JoinLocalRoomOptions,
) => Promise<ResponseJoinLocalRoom>;

export interface CheckMediasfuURLOptions {
  data: ResponseJoinLocalRoom;
  member: string;
  roomName: string;
  islevel: string;
  socket: Socket;
  parameters: PreJoinPageParameters;
  joinMediaSFURoom?: JoinRoomOnMediaSFUType;
  localLink?: string;
}

export type CheckMediasfuURLType = (options: CheckMediasfuURLOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class JoinLocalRoom {
  constructor(private joinRoomOnMediaSFU: JoinRoomOnMediaSFU) {}

  checkMediasfuURL: CheckMediasfuURLType = async (
    options: CheckMediasfuURLOptions,
  ): Promise<void> => {
    const resolvedJoinMediaSFURoom =
      options.joinMediaSFURoom ??
      this.joinRoomOnMediaSFU.joinRoomOnMediaSFU.bind(this.joinRoomOnMediaSFU);

    await sharedCheckMediasfuURL(
      {
        ...options,
        socket: options.socket,
        parameters: options.parameters,
        joinMediaSFURoom: resolvedJoinMediaSFURoom,
      } as unknown as Parameters<typeof sharedCheckMediasfuURL>[0],
    );
  };

  joinLocalRoom: JoinLocalRoomType = async (
    options: JoinLocalRoomOptions,
  ): Promise<ResponseJoinLocalRoom> => {
    const resolvedJoinMediaSFURoom =
      options.joinMediaSFURoom ??
      this.joinRoomOnMediaSFU.joinRoomOnMediaSFU.bind(this.joinRoomOnMediaSFU);

    return sharedJoinLocalRoom(
      {
        ...options,
        socket: options.socket,
        parameters: options.parameters,
        joinMediaSFURoom: resolvedJoinMediaSFURoom,
      } as unknown as Parameters<typeof sharedJoinLocalRoom>[0],
    ) as unknown as Promise<ResponseJoinLocalRoom>;
  };
}
