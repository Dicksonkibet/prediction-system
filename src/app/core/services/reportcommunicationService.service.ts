import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportCommunicationService {
  private currentStudentIndexSubject = new Subject<any>();
  
  // Observable that other components can subscribe to
  currentStudentIndex$ = this.currentStudentIndexSubject.asObservable();
  
  // Method to set the current report
  setCurrentStudentIndex(index: number) {
    this.currentStudentIndexSubject.next(index);
  }
  
}
