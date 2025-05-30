import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMainMenuComponent } from './staff-main-menu.component';

describe('StaffMainMenuComponent', () => {
  let component: StaffMainMenuComponent;
  let fixture: ComponentFixture<StaffMainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffMainMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
