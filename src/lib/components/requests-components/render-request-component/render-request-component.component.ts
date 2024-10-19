import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMicrophone,
  faDesktop,
  faVideo,
  faComments,
  faCheck,
  faTimes,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { RespondToRequestsType, RespondToRequestsOptions, Request } from '../../../@types/types';
import { Socket } from 'socket.io-client';

export interface RenderRequestComponentOptions {
  request: Request;
  onRequestItemPress: RespondToRequestsType;
  requestList: Request[];
  updateRequestList: (newRequestList: Request[]) => void;
  roomName: string;
  socket: Socket;
}

export type RenderRequestComponentType = (options: RenderRequestComponentOptions) => HTMLElement;

@Component({
  selector: 'app-render-request-component',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './render-request-component.component.html',
  styleUrls: ['./render-request-component.component.css'],
})
export class RenderRequestComponent {
  @Input() request: Request = {} as Request;
  @Input() requestList: Request[] = [];
  @Input() roomName!: string;
  @Input() socket: Socket = {} as Socket;
  @Input() onRequestItemPress!: (options: RespondToRequestsOptions) => void;
  @Input() updateRequestList!: (newRequestList: Request[]) => void;

  faMicrophone = faMicrophone;
  faDesktop = faDesktop;
  faVideo = faVideo;
  faComments = faComments;
  faCheck = faCheck;
  faTimes = faTimes;

  keyMap: { [key: string]: IconDefinition } = {
    'fa-microphone': this.faMicrophone,
    'fa-desktop': this.faDesktop,
    'fa-video': this.faVideo,
    'fa-comments': this.faComments,
  };

  getIcon(iconName: string): IconDefinition {
    return this.keyMap[iconName];
  }

  handleRequestAction = (action: string) => {
    this.onRequestItemPress({
      request: this.request,
      updateRequestList: this.updateRequestList,
      requestList: this.requestList,
      action: action,
      roomName: this.roomName,
      socket: this.socket,
    });
  };
}
