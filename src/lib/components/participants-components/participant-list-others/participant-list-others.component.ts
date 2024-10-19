import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantListOthersItem } from '../participant-list-others-item/participant-list-others-item.component';
import { Participant } from '../../../@types/types';

export interface ParticipantListOthersOptions {
  participants: Participant[];
  coHost: string;
  member: string;
}

export type ParticipantListOthersType = (options: ParticipantListOthersOptions) => HTMLElement;

@Component({
  selector: 'app-participant-list-others',
  standalone: true,
  imports: [CommonModule, ParticipantListOthersItem],
  templateUrl: './participant-list-others.component.html',
  styleUrls: ['./participant-list-others.component.css'],
})
export class ParticipantListOthers {
  @Input() participants: Participant[] = [];
  @Input() coHost = '';
  @Input() member = '';
}
