import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameModifyComponent } from './game-modify.component';

describe('GameModifyComponent', () => {
  let component: GameModifyComponent;
  let fixture: ComponentFixture<GameModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameModifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
