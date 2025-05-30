import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaffModifyComponent } from './admin-staff-modify.component';

describe('AdminStaffModifyComponent', () => {
  let component: AdminStaffModifyComponent;
  let fixture: ComponentFixture<AdminStaffModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStaffModifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStaffModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
