import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoHostModal } from './co-host-modal.component';

describe('CoHostModal', () => {
  let component: CoHostModal;
  let fixture: ComponentFixture<CoHostModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoHostModal],
    }).compileComponents();

    fixture = TestBed.createComponent(CoHostModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
