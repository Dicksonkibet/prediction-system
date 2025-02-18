import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Register5Component } from './register5.component';

describe('Register5Component', () => {
  let component: Register5Component;
  let fixture: ComponentFixture<Register5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Register5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Register5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
