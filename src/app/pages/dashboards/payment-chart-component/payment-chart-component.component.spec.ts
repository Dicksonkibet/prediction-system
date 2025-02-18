import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentChartComponentComponent } from './payment-chart-component.component';

describe('PaymentChartComponentComponent', () => {
  let component: PaymentChartComponentComponent;
  let fixture: ComponentFixture<PaymentChartComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentChartComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentChartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
