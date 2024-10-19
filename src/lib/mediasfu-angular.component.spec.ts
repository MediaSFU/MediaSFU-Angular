import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediasfuAngularComponent } from './mediasfu-angular.component';

describe('MediasfuAngularComponent', () => {
  let component: MediasfuAngularComponent;
  let fixture: ComponentFixture<MediasfuAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediasfuAngularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediasfuAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
