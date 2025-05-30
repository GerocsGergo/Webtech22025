import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModifyComponent } from './admin-modify.component';

describe('AdminModifyComponent', () => {
  let component: AdminModifyComponent;
  let fixture: ComponentFixture<AdminModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminModifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
