import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Participant } from '../../../@types/types';

export interface ParticipantListOthersItemOptions {
  participant: Participant;
  member: string;
  coHost: string;
}

export type ParticipantListOthersItemType = (
  options: ParticipantListOthersItemOptions,
) => HTMLElement;

@Component({
  selector: 'app-participant-list-others-item',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './participant-list-others-item.component.html',
  styleUrls: ['./participant-list-others-item.component.css'],
})
export class ParticipantListOthersItem {
  @Input() participant!: Participant;
  @Input() member!: string;
  @Input() coHost!: string;

  faCircle = faCircle;

  getParticipantDisplayName(): string {
    if (this.participant.islevel === '2') {
      return this.participant.name === this.member
        ? `${this.participant.name} (you)`
        : `${this.participant.name} (host)`;
    } else {
      if (this.participant.name === this.member) {
        return `${this.participant.name} (you)`;
      } else if (this.coHost === this.participant.name) {
        return `${this.participant.name} (co-host)`;
      } else {
        return this.participant.name;
      }
    }
  }
}
