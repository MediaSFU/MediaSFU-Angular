import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmExitModal } from './confirm-exit-modal.component';

describe('ConfirmExitModal', () => {
  let component: ConfirmExitModal;
  let fixture: ComponentFixture<ConfirmExitModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmExitModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmExitModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
