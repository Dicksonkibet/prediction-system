import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
//import { environment } from '../environments/environment';

export interface PaymentData {
  month: string;
  totalPayments: number;
}

export interface ApiResponse {
  title: string;
  year: number;
  monthlyPayments: PaymentData[];
  summary: {
    totalPayments: number;
    averageMonthlyPayment: number;
    highestMonth: string;
    lowestMonth: string;
    monthsWithPayments: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl= `${environment.apiUrl}/TblAccounts/YearlyPaymentsSummary`;
  //private apiUrl = `http://localhost:5000/api/TblAccounts/YearlyPaymentsSummary`;

  constructor(private http: HttpClient) {}

  getYearlyPayments(year: number = new Date().getFullYear()): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}`);
  }
}