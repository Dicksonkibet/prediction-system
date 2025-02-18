import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentService } from './payment.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';

interface ChartDataPoint {
  month: string;
  value: number;
}

interface YAxisTick {
  value: number;
  yPosition: number;
  label: string;
}

@Component({
  selector: 'app-payment-chart',
  templateUrl: './payment-chart-component.component.html',
  styleUrls: ['./payment-chart-component.component.scss'],
  animations: [
    trigger('barAnimation', [
      transition(':enter', [
        style({ height: '0px' }), // Start from 0 height
        animate('1s ease-out', style({ height: '*' })) // Animate to full height
      ])
    ])
  ]
})
export class PaymentChartComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Chart data
  title = 'Payment Analysis';
  year = new Date().getFullYear();
  chartData: ChartDataPoint[] = [];
  yAxisTicks: YAxisTick[] = [];

  maxValue = 0;
  totalPayments = 0;
  averagePayment = 0;
  monthsWithPayments = 0;

  readonly chartWidth = 650;
  readonly chartHeight = 400;
  readonly marginLeft = 80;
  readonly marginRight = 40;
  readonly marginTop = 60;
  readonly marginBottom = 80;
  readonly barGap = 8;
  readonly arrowSize = 10; // Size of axis arrows

  tooltipVisible = false;
  tooltipValue = 0;
  tooltipX = 0;
  tooltipY = 0;

  readonly yAxisLabelFormat = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });



 

  get innerWidth(): number {
    return this.chartWidth - this.marginLeft - this.marginRight;
  }

  get innerHeight(): number {
    return this.chartHeight - this.marginTop - this.marginBottom;
  }

  get barWidth(): number {
    return this.chartData.length
      ? (this.innerWidth - (this.chartData.length - 1) * this.barGap) / this.chartData.length
      : 0;
  }

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.fetchPayments();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isLoading: boolean = false;

  private fetchPayments(): void {
    this.isLoading = true; // Set loading to true when the request starts
    
    this.paymentService.getYearlyPayments(this.year)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.prepareChartData(response.monthlyPayments);
          this.calculateMetrics();
          this.generateYAxisTicks();
          this.isLoading = false; // Set loading to false when the request is successful
        },
        error: (error) => {
          console.error('Error fetching payment data:', error);
          this.handleError();
          this.isLoading = false; // Set loading to false when there's an error
        }
      });
  }
  

// Helper method for arrows (X-Axis)
get xAxisArrowPath(): string {
  const startX = this.chartWidth - this.marginRight + 20;  // Extend the X-axis to the right
  const y = this.chartHeight - this.marginBottom;
  // Extend the X-axis line slightly and point the arrow to the right
  return `M ${startX} ${y} l ${-this.arrowSize} ${this.arrowSize / 2} v ${-this.arrowSize} z`;
}

// Helper method for arrows (Y-Axis)
get yAxisArrowPath(): string {
  const x = this.marginLeft;
  const startY = this.marginTop - 20;  // Extend the Y-axis upward
  // Extend the Y-axis line slightly and point the arrow upwards
  return `M ${x} ${startY} l ${-this.arrowSize / 2} ${this.arrowSize} h ${this.arrowSize} z`;
}


  private prepareChartData(monthlyPayments: any[]): void {
    this.chartData = monthlyPayments.map(payment => ({
      month: payment.month,
      value: parseFloat(payment.totalPayments) || 0
    }));
  }

  getYAxisLabelPosition(tick: YAxisTick): { x: number; y: number } {
    return {
      x: this.marginLeft - 15, // Adjust this value to move labels farther from the graph
      y: tick.yPosition + 5    // Slight vertical adjustment for better alignment
    };
  }
  

  private calculateMetrics(): void {
    const values = this.chartData.map(d => d.value);
    
    this.totalPayments = values.reduce((a, b) => a + b, 0);
    this.averagePayment = this.totalPayments / values.length;
    this.monthsWithPayments = values.filter(v => v > 0).length;

    const max = Math.max(...values);
    const magnitude = Math.pow(10, Math.floor(Math.log10(max)));
    const normalized = Math.ceil(max / magnitude);
    this.maxValue = normalized * magnitude;
  }

  private generateYAxisTicks(): void {
    const numTicks = 5;
    this.yAxisTicks = Array.from({ length: numTicks }, (_, i) => {
      const value = (i * this.maxValue) / (numTicks - 1);
      const yPosition = this.getBarY(value);
      return { value, yPosition, label: this.formatNumber(value) };
    });
  }

  getBarX(index: number): number {
    return this.marginLeft + index * (this.barWidth + this.barGap);
  }

  getBarY(value: number): number {
    const proportion = value / this.maxValue;
    return this.chartHeight - this.marginBottom - (this.innerHeight * proportion);
  }

  getBarHeight(value: number): number {
    const proportion = value / this.maxValue;
    return this.innerHeight * proportion;
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat().format(value);
  }

  showTooltip(value: number, event: MouseEvent): void {
    this.tooltipVisible = true;
    this.tooltipValue = value;
    const target = event.currentTarget as HTMLElement;
    this.tooltipX = event.clientX - target.getBoundingClientRect().left + 10;
    this.tooltipY = this.getBarY(value) - 8;
  }

  hideTooltip(): void {
    this.tooltipVisible = false;
  }

  handleError(): void {
    this.chartData = [];
    this.totalPayments = 0;
    this.averagePayment = 0;
    this.monthsWithPayments = 0;
    this.maxValue = 0;
  }
}
