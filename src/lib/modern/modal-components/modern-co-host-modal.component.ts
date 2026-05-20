import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Socket } from 'socket.io-client';

import {
  CoHostResponsibility,
  Participant,
  ShowAlert,
} from '../../@types/types';
import {
  ModifyCoHostSettings,
  ModifyCoHostSettingsOptions,
} from '../../methods/co-host-methods/modify-co-host-settings.service';
import { ModernRenderMode, isEmbeddedRenderMode } from '../utils/render-mode.utils';

interface ResponsibilityKey {
  dedicateKey: string;
  label: string;
  manageKey: string;
}

@Component({
  selector: 'app-co-host-modal',
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  template: `
    <ng-container *ngIf="isVisible() && customTemplate">
      <ng-container
        *ngTemplateOutlet="
          customTemplate;
          context: {
            isCoHostModalVisible: isCoHostModalVisible,
            currentCohost: currentCohost,
            participants: participants,
            coHostResponsibility: coHostResponsibility,
            position: position,
            backgroundColor: backgroundColor,
            roomName: roomName,
            showAlert: showAlert,
            updateCoHostResponsibility: updateCoHostResponsibility,
            updateCoHost: updateCoHost,
            updateIsCoHostModalVisible: updateIsCoHostModalVisible,
            socket: socket,
            onCoHostClose: onCoHostClose,
            onModifyCoHost: onModifyCoHost
          }
        "
      ></ng-container>
    </ng-container>

    <div
      *ngIf="isVisible() && !customTemplate"
      class="ms-modern-cohost-overlay"
      [ngStyle]="resolvedOverlayStyle()"
    >
      <section class="ms-modern-cohost" [ngStyle]="resolvedContentStyle()">
        <header *ngIf="showHeader" class="ms-modern-cohost__header">
          <div class="ms-modern-cohost__heading">
            <span class="ms-modern-cohost__eyebrow">Role delegation</span>
            <h2 class="ms-modern-cohost__title">Manage co-host</h2>
            <p class="ms-modern-cohost__subtitle">
              Assign a co-host and decide which moderation responsibilities they can control.
            </p>
          </div>

          <button
            type="button"
            class="ms-modern-cohost__close"
            aria-label="Close co-host settings"
            (click)="handleClose()"
          >
            <fa-icon [icon]="faTimes"></fa-icon>
          </button>
        </header>

        <div class="ms-modern-cohost__body" [class.ms-modern-cohost__body--embedded]="isEmbedded()">
          <ng-container *ngIf="isEmbedded(); else modalBody">
            <section *ngIf="hasAssignedCohost()" class="ms-modern-cohost__section">
              <label class="ms-modern-cohost__section-label">Current Co-Host</label>
              <div class="ms-modern-cohost__current">{{ displayCurrentCohost() }}</div>
            </section>

            <section class="ms-modern-cohost__section">
              <label class="ms-modern-cohost__section-label" for="modern-cohost-select">
                Select Co-Host
              </label>
              <select
                id="modern-cohost-select"
                class="ms-modern-cohost__select ms-modern-cohost__select--embedded"
                [(ngModel)]="selectedCohost"
              >
                <option value="">Select a participant</option>
                <option *ngFor="let participant of filteredParticipants" [value]="participant.name">
                  {{ participant.name }}
                </option>
              </select>
            </section>

            <section class="ms-modern-cohost__section">
              <label class="ms-modern-cohost__section-label">Responsibilities</label>
              <div class="ms-modern-cohost__embedded-list">
                <article *ngFor="let item of responsibilityKeys" class="ms-modern-cohost__embedded-row">
                  <span class="ms-modern-cohost__embedded-name">{{ item.label }}</span>

                  <div class="ms-modern-cohost__embedded-controls">
                    <div class="ms-modern-cohost__embedded-control">
                      <span class="ms-modern-cohost__embedded-control-label">Enabled</span>
                      <button
                        type="button"
                        class="ms-modern-cohost__check"
                        [class.ms-modern-cohost__check--active]="responsibilities[item.manageKey]"
                        [attr.aria-pressed]="responsibilities[item.manageKey]"
                        (click)="handleToggleSwitch(item.manageKey)"
                      >
                        <fa-icon *ngIf="responsibilities[item.manageKey]" [icon]="faCheck"></fa-icon>
                      </button>
                    </div>

                    <div class="ms-modern-cohost__embedded-control">
                      <span class="ms-modern-cohost__embedded-control-label">Dedicated</span>
                      <button
                        type="button"
                        class="ms-modern-cohost__check"
                        [class.ms-modern-cohost__check--active]="
                          responsibilities[item.manageKey] && responsibilities[item.dedicateKey]
                        "
                        [class.ms-modern-cohost__check--disabled]="!responsibilities[item.manageKey]"
                        [disabled]="!responsibilities[item.manageKey]"
                        [attr.aria-pressed]="
                          responsibilities[item.manageKey] && responsibilities[item.dedicateKey]
                        "
                        (click)="handleToggleSwitch(item.dedicateKey)"
                      >
                        <fa-icon
                          *ngIf="responsibilities[item.manageKey] && responsibilities[item.dedicateKey]"
                          [icon]="faCheck"
                        ></fa-icon>
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            </section>
          </ng-container>

          <ng-template #modalBody>
            <section class="ms-modern-cohost__summary-grid">
              <article class="ms-modern-cohost__summary-card">
                <span class="ms-modern-cohost__summary-label">Current co-host</span>
                <strong class="ms-modern-cohost__summary-value">{{ currentCohost || 'No co-host' }}</strong>
              </article>

              <article class="ms-modern-cohost__summary-card">
                <label class="ms-modern-cohost__summary-label" for="modern-cohost-select-modal">
                  Select new co-host
                </label>
                <select
                  id="modern-cohost-select-modal"
                  class="ms-modern-cohost__select"
                  [(ngModel)]="selectedCohost"
                >
                  <option value="">Select a participant</option>
                  <option *ngFor="let participant of filteredParticipants" [value]="participant.name">
                    {{ participant.name }}
                  </option>
                </select>
              </article>
            </section>

            <section class="ms-modern-cohost__responsibilities">
              <header class="ms-modern-cohost__table-header">
                <span>Responsibility</span>
                <span>Enable</span>
                <span>Dedicated</span>
              </header>

              <article
                *ngFor="let item of responsibilityKeys"
                class="ms-modern-cohost__responsibility-row"
              >
                <div class="ms-modern-cohost__responsibility-copy">
                  <strong>{{ item.label }}</strong>
                  <p>Allow the co-host to manage {{ item.label.toLowerCase() }} controls.</p>
                </div>

                <label class="ms-modern-cohost__toggle" aria-label="Enable responsibility">
                  <input
                    type="checkbox"
                    [(ngModel)]="responsibilities[item.manageKey]"
                    (change)="handleToggleSwitch(item.manageKey)"
                  />
                  <span></span>
                </label>

                <label class="ms-modern-cohost__toggle" aria-label="Dedicated responsibility">
                  <input
                    type="checkbox"
                    [(ngModel)]="responsibilities[item.dedicateKey]"
                    (change)="handleToggleSwitch(item.dedicateKey)"
                    [disabled]="!responsibilities[item.manageKey]"
                  />
                  <span></span>
                </label>
              </article>
            </section>
          </ng-template>
        </div>

        <footer class="ms-modern-cohost__footer" [class.ms-modern-cohost__footer--embedded]="isEmbedded()">
          <ng-container *ngIf="isEmbedded(); else modalFooter">
            <button
              type="button"
              class="ms-modern-cohost__action ms-modern-cohost__action--primary ms-modern-cohost__action--embedded"
              (click)="handleSave()"
            >
              Save Changes
            </button>
          </ng-container>

          <ng-template #modalFooter>
            <button
              type="button"
              class="ms-modern-cohost__action ms-modern-cohost__action--secondary"
              (click)="handleClose()"
            >
              Cancel
            </button>
            <button
              type="button"
              class="ms-modern-cohost__action ms-modern-cohost__action--primary"
              (click)="handleSave()"
            >
              Save co-host
            </button>
          </ng-template>
        </footer>
      </section>
    </div>
  `,
  styles: [
    `
      .ms-modern-cohost-overlay {
        position: fixed;
        inset: 0;
        background: rgba(2, 8, 23, 0.66);
        backdrop-filter: blur(10px);
        z-index: 999;
      }

      .ms-modern-cohost {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border-radius: 28px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        background: linear-gradient(
          180deg,
          var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.96)) 0%,
          var(--ms-modern-panel-surface, rgba(248, 250, 252, 0.95)) 100%
        );
        box-shadow: 0 28px 70px rgba(15, 23, 42, 0.28);
        color: var(--ms-modern-text-primary, #10233f);
      }

      .ms-modern-cohost__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 22px 22px 16px;
        border-bottom: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
      }

      .ms-modern-cohost__eyebrow {
        display: block;
        color: var(--ms-modern-text-muted, rgba(59, 78, 104, 0.72));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.7rem;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .ms-modern-cohost__title {
        margin: 6px 0 0;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 1.34rem;
        font-weight: 800;
        line-height: 1.1;
      }

      .ms-modern-cohost__subtitle {
        margin: 8px 0 0;
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.9rem;
        line-height: 1.5;
      }

      .ms-modern-cohost__close {
        width: 40px;
        height: 40px;
        flex: 0 0 auto;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.4);
        color: var(--ms-modern-text-primary, #10233f);
        cursor: pointer;
      }

      .ms-modern-cohost__body {
        display: grid;
        gap: 18px;
        padding: 18px 22px;
      }

      .ms-modern-cohost__body--embedded {
        display: flex;
        flex-direction: column;
      }

      .ms-modern-cohost__section {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .ms-modern-cohost__section-label {
        color: var(--ms-modern-text-primary, #10233f);
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.9rem;
        font-weight: 800;
      }

      .ms-modern-cohost__current,
      .ms-modern-cohost__embedded-row {
        border-radius: 18px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        background: rgba(255, 255, 255, 0.72);
      }

      .ms-modern-cohost__current {
        padding: 14px 16px;
        color: var(--ms-modern-text-primary, #10233f);
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.95rem;
        font-weight: 700;
      }

      .ms-modern-cohost__summary-grid {
        display: grid;
        gap: 14px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .ms-modern-cohost__summary-card,
      .ms-modern-cohost__responsibility-row {
        border-radius: 20px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        background: rgba(255, 255, 255, 0.72);
      }

      .ms-modern-cohost__summary-card {
        display: grid;
        gap: 10px;
        padding: 16px;
      }

      .ms-modern-cohost__summary-label {
        color: var(--ms-modern-text-muted, rgba(59, 78, 104, 0.72));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.76rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .ms-modern-cohost__summary-value {
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 1rem;
        font-weight: 800;
      }

      .ms-modern-cohost__select {
        width: 100%;
        min-height: 46px;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        border-radius: 16px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(244, 248, 255, 0.96));
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M5 7.5L10 12.5L15 7.5' stroke='%233b4e68' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 14px center;
        background-size: 14px 14px;
        color: var(--ms-modern-text-primary, #10233f);
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.92rem;
        font-weight: 600;
        line-height: 1.35;
        padding: 0 42px 0 14px;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 10px 22px rgba(15, 23, 42, 0.05);
        transition:
          border-color 160ms ease,
          box-shadow 160ms ease,
          transform 160ms ease;
      }

      .ms-modern-cohost__select--embedded {
        background-color: rgba(255, 255, 255, 0.96);
      }

      .ms-modern-cohost__select:hover {
        border-color: rgba(79, 70, 229, 0.26);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.78), 0 14px 28px rgba(79, 70, 229, 0.08);
      }

      .ms-modern-cohost__select:focus {
        outline: none;
        border-color: rgba(79, 70, 229, 0.34);
        box-shadow:
          0 0 0 4px rgba(79, 70, 229, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.82),
          0 16px 32px rgba(79, 70, 229, 0.1);
      }

      .ms-modern-cohost__select option {
        color: var(--ms-modern-text-primary, #10233f);
        background: #ffffff;
      }

      .ms-modern-cohost__responsibilities {
        display: grid;
        gap: 12px;
      }

      .ms-modern-cohost__embedded-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .ms-modern-cohost__embedded-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        align-items: start;
        gap: 12px;
        padding: 14px 16px;
      }

      .ms-modern-cohost__embedded-name {
        min-width: 0;
        color: var(--ms-modern-text-primary, #10233f);
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.92rem;
        font-weight: 800;
        line-height: 1.25;
      }

      .ms-modern-cohost__embedded-controls {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
        width: 100%;
      }

      .ms-modern-cohost__embedded-control {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        min-width: 0;
        padding: 10px 12px;
        border-radius: 14px;
        border: 1px solid rgba(148, 163, 184, 0.18);
        background: rgba(255, 255, 255, 0.68);
      }

      .ms-modern-cohost__embedded-control-label {
        color: var(--ms-modern-text-muted, rgba(59, 78, 104, 0.72));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.74rem;
        font-weight: 800;
        line-height: 1.2;
      }

      .ms-modern-cohost__check {
        width: 20px;
        height: 20px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        border: 2px solid rgba(148, 163, 184, 0.5);
        background: transparent;
        color: #fff;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .ms-modern-cohost__check--active {
        border-color: transparent;
        background: #22c55e;
      }

      .ms-modern-cohost__check--disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .ms-modern-cohost__table-header,
      .ms-modern-cohost__responsibility-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 84px 84px;
        gap: 12px;
        align-items: center;
      }

      .ms-modern-cohost__table-header {
        padding: 0 8px;
        color: var(--ms-modern-text-muted, rgba(59, 78, 104, 0.72));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.76rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .ms-modern-cohost__responsibility-row {
        padding: 16px;
      }

      .ms-modern-cohost__responsibility-copy strong {
        display: block;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.95rem;
        font-weight: 800;
      }

      .ms-modern-cohost__responsibility-copy p {
        margin: 4px 0 0;
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.82rem;
        line-height: 1.45;
      }

      .ms-modern-cohost__toggle {
        display: inline-flex;
        justify-content: center;
      }

      .ms-modern-cohost__toggle input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
      }

      .ms-modern-cohost__toggle span {
        position: relative;
        width: 52px;
        height: 30px;
        display: inline-block;
        border-radius: 999px;
        background: rgba(148, 163, 184, 0.4);
        transition: background 0.2s ease;
      }

      .ms-modern-cohost__toggle span::after {
        content: '';
        position: absolute;
        top: 4px;
        left: 4px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 8px 18px rgba(15, 23, 42, 0.16);
        transition: transform 0.2s ease;
      }

      .ms-modern-cohost__toggle input:checked + span {
        background: linear-gradient(
          135deg,
          var(--ms-modern-brand-primary, #4f46e5) 0%,
          var(--ms-modern-brand-secondary, #14b8a6) 100%
        );
      }

      .ms-modern-cohost__toggle input:checked + span::after {
        transform: translateX(22px);
      }

      .ms-modern-cohost__toggle input:disabled + span {
        opacity: 0.45;
      }

      .ms-modern-cohost__footer {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        padding: 0 22px 22px;
      }

      .ms-modern-cohost__footer--embedded {
        grid-template-columns: 1fr;
      }

      .ms-modern-cohost__action {
        min-height: 46px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        padding: 0 16px;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.92rem;
        font-weight: 700;
        cursor: pointer;
      }

      .ms-modern-cohost__action--secondary {
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        background: rgba(255, 255, 255, 0.64);
        color: var(--ms-modern-text-primary, #10233f);
      }

      .ms-modern-cohost__action--primary {
        border: none;
        background: linear-gradient(
          135deg,
          var(--ms-modern-brand-primary, #4f46e5) 0%,
          var(--ms-modern-brand-secondary, #14b8a6) 55%,
          var(--ms-modern-accent, #f59e0b) 100%
        );
        color: #fff;
        box-shadow: 0 18px 34px rgba(79, 70, 229, 0.18);
      }

      .ms-modern-cohost__action--embedded {
        width: 100%;
      }

      @media (max-width: 640px) {
        .ms-modern-cohost__summary-grid,
        .ms-modern-cohost__footer {
          grid-template-columns: 1fr;
        }

        .ms-modern-cohost__embedded-controls {
          grid-template-columns: 1fr;
        }

        .ms-modern-cohost__table-header {
          display: none;
        }

        .ms-modern-cohost__responsibility-row {
          grid-template-columns: 1fr;
        }

        .ms-modern-cohost__toggle {
          justify-content: flex-start;
        }
      }
    `,
  ],
})
export class ModernCoHostModalComponent implements OnChanges, OnInit {
  @Input() isCoHostModalVisible = false;
  @Input() currentCohost = 'No coHost';
  @Input() participants: Participant[] = [];
  @Input() coHostResponsibility: CoHostResponsibility[] = [];
  @Input() position = 'topRight';
  @Input() backgroundColor = 'var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.96))';
  @Input() roomName = '';
  @Input() showAlert: ShowAlert = () => {};
  @Input() updateCoHostResponsibility: (coHostResponsibility: CoHostResponsibility[]) => void =
    () => {};
  @Input() updateCoHost: (coHost: string) => void = () => {};
  @Input() updateIsCoHostModalVisible: (isCoHostModalVisible: boolean) => void = () => {};
  @Input() socket: Socket = {} as Socket;
  @Input() onCoHostClose: () => void = () => {};
  @Input() onModifyCoHost?: (settings: ModifyCoHostSettingsOptions) => void;
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<unknown>;
  @Input() parameters?: unknown;
  @Input() renderMode: ModernRenderMode = 'modal';
  @Input() showHeader = true;

  readonly faCheck = faCheck;
  readonly faTimes = faTimes;

  selectedCohost = this.currentCohost;
  responsibilityKeys: ResponsibilityKey[] = [];
  responsibilities: Record<string, boolean> = {};

  private coHostResponsibilityCopy: CoHostResponsibility[] = [];
  private modalWidth = 400;

  constructor(private readonly modifyCoHostSettingsService: ModifyCoHostSettings) {}

  ngOnInit() {
    if (!this.onModifyCoHost) {
      this.onModifyCoHost = (settings) =>
        this.modifyCoHostSettingsService.modifyCoHostSettings(settings);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      this.isVisible() &&
      (changes['isCoHostModalVisible'] ||
        changes['coHostResponsibility'] ||
        changes['currentCohost'] ||
        changes['participants'])
    ) {
      this.initializeResponsibilities();
      this.calculateModalWidth();
    }
  }

  isVisible(): boolean {
    return this.isEmbedded() || this.isCoHostModalVisible;
  }

  isEmbedded(): boolean {
    return isEmbeddedRenderMode(this.renderMode);
  }

  get filteredParticipants(): Participant[] {
    return this.participants.filter(
      (participant) => participant.name !== this.currentCohost && participant.islevel !== '2',
    );
  }

  handleToggleSwitch(key: string) {
    if (key.startsWith('dedicateTo')) {
      const responsibilityName = key.replace('dedicateToManage', '').toLowerCase();
      const responsibility = this.findResponsibility(responsibilityName);
      if (!responsibility || !responsibility.value) {
        return;
      }

      responsibility.dedicated = !responsibility.dedicated;
      this.responsibilities[key] = responsibility.dedicated;
      return;
    }

    const responsibilityName = key.replace('manage', '').toLowerCase();
    const responsibility = this.findResponsibility(responsibilityName);
    if (!responsibility) {
      return;
    }

    responsibility.value = !responsibility.value;
    this.responsibilities[key] = responsibility.value;

    if (!responsibility.value) {
      responsibility.dedicated = false;
      const dedicateKey = `dedicateToManage${this.formatLabel(responsibility.name)}`;
      this.responsibilities[dedicateKey] = false;
    }
  }

  async handleSave() {
    await Promise.resolve(
      this.onModifyCoHost?.({
      roomName: this.roomName,
      showAlert: this.showAlert,
      selectedParticipant: this.selectedCohost,
      coHost: this.currentCohost,
      coHostResponsibility: this.coHostResponsibilityCopy,
      updateCoHostResponsibility: this.updateCoHostResponsibility,
      updateCoHost: this.updateCoHost,
      updateIsCoHostModalVisible: this.updateIsCoHostModalVisible,
      socket: this.socket,
      }),
    );

    if (this.isEmbedded()) {
      this.handleClose();
    }
  }

  handleClose() {
    this.onCoHostClose();
  }

  hasAssignedCohost(): boolean {
    return this.displayCurrentCohost().length > 0;
  }

  displayCurrentCohost(): string {
    const currentCohost = this.currentCohost?.trim() ?? '';
    const normalizedValue = currentCohost.replace(/[\s-]/g, '').toLowerCase();

    if (!currentCohost || normalizedValue === 'nocohost') {
      return '';
    }

    return currentCohost;
  }

  resolvedOverlayStyle(): Record<string, string | number> {
    const baseStyle: Record<string, string | number> = this.isEmbedded()
      ? {
          position: 'static',
          inset: 'auto',
          width: '100%',
          height: '100%',
          minHeight: 0,
          background: 'transparent',
          zIndex: 'auto',
        }
      : {
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(2, 8, 23, 0.66)',
          zIndex: 999,
        };

    return { ...baseStyle, ...this.normalizeStyle(this.overlayStyle) };
  }

  resolvedContentStyle(): Record<string, string | number> {
    const baseStyle: Record<string, string | number> = this.isEmbedded()
      ? {
          position: 'relative',
          inset: 'auto',
          width: '100%',
          maxWidth: 'none',
          height: '100%',
          maxHeight: 'none',
          margin: 0,
          overflowX: 'hidden',
          overflowY: 'auto',
          background: this.backgroundColor,
        }
      : {
          position: 'fixed',
          width: `${this.modalWidth}px`,
          maxHeight: 'min(82vh, 760px)',
          overflowX: 'hidden',
          overflowY: 'auto',
          background: this.backgroundColor,
          ...this.resolvePositionStyle(),
        };

    return { ...baseStyle, ...this.normalizeStyle(this.contentStyle) };
  }

  private calculateModalWidth() {
    const screenWidth = window.innerWidth;
    let nextWidth = 0.84 * screenWidth;
    if (nextWidth > 520) {
      nextWidth = 520;
    }
    this.modalWidth = nextWidth;
  }

  private findResponsibility(name: string): CoHostResponsibility | undefined {
    return this.coHostResponsibilityCopy.find((item) => item.name === name);
  }

  private formatLabel(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  private initializeResponsibilities() {
    this.selectedCohost = this.currentCohost;
    this.coHostResponsibilityCopy = this.coHostResponsibility.map((item) => ({ ...item }));
    this.responsibilityKeys = this.coHostResponsibilityCopy.map((item) => {
      const label = this.formatLabel(item.name);
      return {
        manageKey: `manage${label}`,
        dedicateKey: `dedicateToManage${label}`,
        label,
      };
    });

    this.responsibilities = this.coHostResponsibilityCopy.reduce<Record<string, boolean>>(
      (accumulator, item) => {
        const label = this.formatLabel(item.name);
        accumulator[`manage${label}`] = item.value;
        accumulator[`dedicateToManage${label}`] = item.dedicated;
        return accumulator;
      },
      {},
    );
  }

  private resolvePositionStyle(): Record<string, string> {
    const normalizedPosition = this.position.toLowerCase();

    if (normalizedPosition.includes('center')) {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }

    return {
      top: this.position.includes('top') ? '16px' : 'auto',
      bottom: this.position.includes('bottom') ? '16px' : 'auto',
      left: this.position.includes('Left') ? '16px' : 'auto',
      right: this.position.includes('Right') ? '16px' : 'auto',
    };
  }

  private normalizeStyle(style?: Partial<CSSStyleDeclaration>): Record<string, string | number> {
    return style ? ({ ...style } as Record<string, string | number>) : {};
  }
}