import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaffCreateComponent } from './admin-staff-create.component';

describe('AdminStaffCreateComponent', () => {
  let component: AdminStaffCreateComponent;
  let fixture: ComponentFixture<AdminStaffCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStaffCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStaffCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
