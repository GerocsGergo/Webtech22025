import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaffDeleteComponent } from './admin-staff-delete.component';

describe('AdminStaffDeleteComponent', () => {
  let component: AdminStaffDeleteComponent;
  let fixture: ComponentFixture<AdminStaffDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStaffDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStaffDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
