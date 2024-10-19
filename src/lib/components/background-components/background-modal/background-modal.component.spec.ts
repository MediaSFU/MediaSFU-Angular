/* eslint-disable prettier/prettier */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackgroundModal } from './background-modal.component';

describe('BackgroundModal', () => {
  let component: BackgroundModal;
  let fixture: ComponentFixture<BackgroundModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundModal],
    }).compileComponents();

    fixture = TestBed.createComponent(BackgroundModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
