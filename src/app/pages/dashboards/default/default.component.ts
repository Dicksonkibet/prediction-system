import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

// Services
import { EventService } from '../../../core/services/event.service';

//import { StudentsService } from '../../ecommerce/student-guardian/student.service';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AuthService } from 'src/app/account/auth/login/login.service';

// Interfaces
interface LoadingState {
  students: boolean;
  teachers: boolean;
  monthlySummary: boolean;
  userProfile: boolean;
}

interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  monthlyEarnings: number;
  percentageChange: number;
}

interface PaymentTrendChart {
  totalPayment: number;
  date: string;
}

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit, OnDestroy {
  // Loading states
  loading: LoadingState = {
    students: true,
    teachers: true,
    monthlySummary: true,
    userProfile: true
  };

  // Chart data
  chartPath: string = '';
  chartWidth: number = 800;
  chartHeight: number = 600;

  // Dashboard statistics
  dashboardStats: DashboardStats = {
    totalStudents: 0,
    totalTeachers: 0,
    monthlyEarnings: 0,
    percentageChange: 0
  };

  // User information
  profileImageUrl: string = 'https://micropointlive.com/t-school1/assets/images/users/avatar-8.jpg';
  userName: string = '';
  accountType: string = '';
  level: string = '';
  parent: string = '';
  name: string = '';

  // Component lifecycle
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthfakeauthenticationService,
    //private studentsService: StudentsService,
    private AuthService1: AuthService,
    private eventService: EventService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.initializeDashboard();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeDashboard(): void {
    this.loadStudentData();
    this.loadTeacherData();

    this.loadUserProfile();
  }

  private loadStudentData(): void {
    this.authService.getStudents()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading.students = false)
      )
      .subscribe({
        next: (students) => {
          this.dashboardStats.totalStudents = students.length;
        },
        error: (error) => {
          console.error('Error loading students:', error);
          // Implement error handling UI
        }
      });
  }

  private loadTeacherData(): void {
    this.authService.getTeachers()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading.teachers = false)
      )
      .subscribe({
        next: (teachers) => {
          this.dashboardStats.totalTeachers = teachers.length;
        },
        error: (error) => {
          console.error('Error loading teachers:', error);
          // Implement error handling UI
        }
      });
  }

  

  private loadUserProfile(): void {
    const user = this.AuthService1.getUser();
    if (user) {
      this.userName = localStorage.getItem('userName') || ''; // Retrieve username from localStorage
      this.loading.userProfile = false;
    } else {
      this.router.navigate(['/account/login']);
    }
  }
  

  private prepareGraphData(paymentTrendChart: PaymentTrendChart[]): void {
    if (!paymentTrendChart?.length) return;

    const maxPayment = Math.max(...paymentTrendChart.map(item => item.totalPayment));
    
    let path = `M 0 ${this.chartHeight}`;
    paymentTrendChart.forEach((item, index) => {
      const x = (index / (paymentTrendChart.length - 1)) * this.chartWidth;
      const y = this.chartHeight - ((item.totalPayment / maxPayment) * this.chartHeight);
      path += ` L ${x} ${y}`;
    });

    this.chartPath = path;
  }

  // Account type and level management
  onAccountTypeChange(selectedType: string): void {
    this.accountType = selectedType;
    this.updateParentAndName();
  }

  onLevelChange(selectedLevel: string): void {
    this.level = selectedLevel;
    this.updateParentAndName();
  }

  private updateParentAndName(): void {
    this.parent = this.accountType && this.level ? `${this.accountType} - ${this.level}` : '';
    this.name = this.accountType && this.level ? `${this.accountType} Account at Level ${this.level}` : '';
  }

  // Authentication actions
  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  // Helper method to check if all data is loaded
  get isFullyLoaded(): boolean {
    return !Object.values(this.loading).some(state => state === true);
  }
}