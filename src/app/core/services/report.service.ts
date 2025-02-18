import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private reports: any[] = [];
  private currentReport: any[] = [];
  private subjects: any[] = [];
  private classes: any[] = [];
  private periodYears: any[] = [];
  private exams: any[] = [];
  private streams: any[] = [];
  private gradeCounts: { [meanGrade: string]: { count: number } } = {}; 
  private currentStudentIndex: number = 0;
  

  
  // New properties for navigation state
  private selectedClass: string | null = null;
  private selectedTerm: string | null = null;
  private selectedExam: string | null = null;
  private selectedStream: string | null = null;

  // Method to set reports
  setReports(reports: any[]): void {
    this.reports = reports;
  }
  

  // Method to get reports
  getReports(): any[] {
    return this.reports;
  }

  // Method to set subjects
  setSubjects(subjects: any[]): void {
    this.subjects = subjects;
  }

  // Method to get subjects
   getSubjects(): Observable<any[]> {
    return of(this.subjects); }
  
  setGradeCounts(gradeCounts: { [meanGrade: string]: { count: number } }): void {
    this.gradeCounts = gradeCounts; // Store the grade counts
  }

  // Method to get grade counts
  getGradeCounts(): { [meanGrade: string]: { count: number } } {
    return this.gradeCounts; // Return the stored grade counts
  }
  
  // Methods to set navigation state
  setSelectedClass(selectedClass: string | null): void {
    this.selectedClass = selectedClass;
  }

  setSelectedTerm(selectedTerm: string | null): void {
    this.selectedTerm = selectedTerm;
  }

  setSelectedExam(selectedExam: string | null): void {
    this.selectedExam = selectedExam;
  }

  setSelectedStream(selectedStream: string | null): void {
    this.selectedStream = selectedStream;
  }

  // Methods to get navigation state
  getSelectedClass(): string | null {
    return this.selectedClass;
  }

  getSelectedTerm(): string | null {
    return this.selectedTerm;
  }

  getSelectedExam(): string | null {
    return this.selectedExam;
  }

  getSelectedStream(): string | null {
    return this.selectedStream;
  }


  setClasses(classes: any[]): void {
    this.classes = classes;
  }

  setPeriodYears(periodYears: any[]): void {
    this.periodYears = periodYears;
  }

  setExams(exams: any[]): void {
    this.exams = exams;
  }

  setStreams(streams: any[]): void {
    this.streams = streams;
  }


  getClassNameById(classId: number): string | null { 
    const foundClass = this.classes.find(c => c.classId === classId);
    return foundClass ? foundClass.className : null; // Adjust property names as needed
  }

  getPeriodYearAndTermById(termId: number): string | null {
    const foundTerm = this.periodYears.find(y => y.termId === termId); // Adjust this if necessary
    return foundTerm ? `${foundTerm.periodYear} - ${foundTerm.termName}` : null;
}



  getExamNameById(examId: number): string | null {
    const foundExam = this.exams.find(e => e.examId === examId);
    return foundExam ? foundExam.examName : null; // Adjust property names as needed
  }

  getStreamNameById(streamId: number): string | null {
    const foundStream = this.streams.find(s => s.streamId === streamId);
    return foundStream ? foundStream.streamName : null; // Adjust property names as needed
  }
  setCurrentReport(currentReport: any): void {
    this.currentReport = currentReport
  }
  
  
  getCurrentReport() {
    return this.currentReport;}

  setCurrentStudentIndex(index: number) {
    this.currentStudentIndex = index;
  }

  getCurrentStudentIndex() {
    return this.currentStudentIndex;
  }
  

  nextStudent() {
    if (this.currentStudentIndex < this.reports.length - 1) {
      this.currentStudentIndex++;
      return this.currentReport // This should return the correct next report
    }
    return null; // No more students
  }
  
  previousStudent() {
    if (this.currentStudentIndex > 0) {
      this.currentStudentIndex--;
      return this.reports[this.currentStudentIndex]; // This should return the correct previous report
    }
    return null; // No previous student
  }
  
  
}
