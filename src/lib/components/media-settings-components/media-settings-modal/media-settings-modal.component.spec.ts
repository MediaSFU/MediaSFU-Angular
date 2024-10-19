import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaSettingsModal } from './media-settings-modal.component';

describe('MediaSettingsModal', () => {
  let component: MediaSettingsModal;
  let fixture: ComponentFixture<MediaSettingsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaSettingsModal],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaSettingsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
