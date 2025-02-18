import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User } from '../models/auth.models';
//import { Bank } from 'src/app/pages/Banks/bank.models';
//import { Dormitory, EditableBank } from 'src/app/pages/Banks/bank.models';

@Injectable({ providedIn: 'root' })
export class AuthfakeauthenticationService {
  
 
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    // login(email: string, password: string) {
    //     return this.http.post<any>(`/users/authenticate`, { email, password })
    //         .pipe(map(user => {
    //             // login successful if there's a jwt token in the response
    //             if (user && user.token) {
    //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('currentUser', JSON.stringify(user));
    //                 this.currentUserSubject.next(user);
    //             }
    //             return user;
    //         }));
    // }

    uploadStudentPhoto(studentId: number, formData: FormData) {
     
      // Use query parameter for studentId in the URL
      return this.http.post(`${environment.apiUrl}/TblStudentPhotos/api/student/photo/upload?studentId=${studentId}`, formData);
  }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    // Bank Details 

    getAllBanks(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/TblBank`)
    }

    // addBank(bank: Bank): Observable<any> {
    //     return this.http.post<any>(`${environment.apiUrl}/TblBank`, bank);
    //   }
      
      getBankByCode(bankCode: string): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/TblBank/${bankCode}`)
       
      }
    //   updateBank(bank: EditableBank): Observable<any> {
    //     return this.http.put<any>(`${environment.apiUrl}/TblBank/${bank.BankCode}`, bank);
    // }
    

    deleteBank(bankCode: string): Observable<any> {
        
        return this.http.delete<any>(`${environment.apiUrl}/TblBank/${bankCode}`)
            
        ;
    
    }  

    // DORM DETAILS

    getDormitories(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/TblDorms`)
    }

    // addDormitory(dormitory:Dormitory): Observable<any> {
    //     return this.http.post<any>(`${environment.apiUrl}/TblDorms`,dormitory);
    // }

    getDormitoryById(id: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/TblDorms/${id}`);
    }

    updateDormitory(id: number, dormdata: any): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/TblDorms/${id}`, dormdata);
    }

    deleteDormitory(id: number): Observable<any> {
        return this.http.delete<any>(`${environment.apiUrl}/TblDorms/${id}`);
    }  

   
      


      //CLASS DETAILS

 getClasses(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/TblSchoolClasses`)
    }
addClasses(classData: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/TblSchoolClasses`, classData);
      }
      getclassbyclassId(id: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/TblSchoolClasses/${id}`)
      }
      updateClasses(id: number, classData: any): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/TblSchoolClasses/${id}`, classData);
      }
      
      deleteClasses(id: number): Observable<any> {
        return this.http.delete<any>(`${environment.apiUrl}/TblSchoolClasses/${encodeURIComponent(id)}`);
    }
    

    //STUDENT DETAILS
    
    getStudents(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/tblCustomers/customers`)
}

addStudents(studentData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/tblCustomers/customers`, studentData);

   // http://localhost:5277/api/tblCustomers/customers
}

getstudentbyId(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/TblStudents/${id}`)
  }
  updateStudent(id: number, studentData: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/TblStudents/${id}`, studentData);
  }


deleteStudents(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/tblCustomers/customers/${id}`);
}


//MOVE STUDENTS
moveStudents(admNos: number[], targetStreamId: number, payload): Observable<any> {  
    return this.http.put<any>(`${environment.apiUrl}/TblStudents/move`, payload);
  }
    // STREAM DETAILS

getStreams(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/TblStreams`);
}

addStream(streamData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/TblStreams`, streamData);
}

getStreamById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/TblStreams/${id}`);
}

updateStream(id: number, streamData: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/TblStreams/${id}`, streamData);
}

deleteStream(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/TblStreams/${encodeURIComponent(id)}`);
}



   //GUARDIAN DETAILS
    
   getGuardians(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/TblGuardians`)
}

addGuardian(guardianData: any): Observable<any> {
return this.http.post<any>(`${environment.apiUrl}/TblGuardians`, guardianData);
}

getGuardianbyId(id: number): Observable<any> {
return this.http.get<any>(`${environment.apiUrl}/TblGuardians/${id}`)
}
updateGuardian(id: number, guardianData: any): Observable<any> {
return this.http.put<any>(`${environment.apiUrl}/TblGuardians/${id}`, guardianData);
}


deleteGuardian(id: number): Observable<any> {
return this.http.delete<any>(`${environment.apiUrl}/TblGuardians/${id}`);
}



// RELATIONSHIP DETAILS

 
getRelationships(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/TblRelations`)
}

addRelationship(relationData: any): Observable<any> {
return this.http.post<any>(`${environment.apiUrl}/TblRelations`, relationData);
}

getRelationshipbyName(id: string): Observable<any> {
return this.http.get<any>(`${environment.apiUrl}/TblRelations/${id}`)
}
updaterelationship(id: string, relationData: any): Observable<any> {
return this.http.put<any>(`${environment.apiUrl}/TblRelations/${id}`, relationData);
}


deleteRelationship(id: string): Observable<any> {
return this.http.delete<any>(`${environment.apiUrl}/TblRelations/${id}`);
}



//STUDENGUARDIAN DETAILS
 
getStudentGuardians(studentId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/TblStudentGuardians`)
}

addStudentGuardian(studentguardianData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/TblStudentGuardians`, studentguardianData);
}

//private api1 ="http://localhost:5277/api/TblGuardians"

getStudentGuardianbyId( guardianId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/TblGuardians/${guardianId}`)
   // return this.http.get<any>(`${environment.api1}/TblStudentGuardians/${guardianId}`)
    }
updateStudentGuardian(studentId: number, guardianId: number, studentguardianData: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/TblStudentGuardians/${studentId}/${guardianId}`, studentguardianData);
    }

deleteStudentGuardian(studentId: number, guardianId: number): Observable<void> {
    return this.http.delete<any>(`${environment.apiUrl}/TblStudentGuardians/${studentId}/${guardianId}`);
    }

//SUBJECT-GROUP DETAILS

    getSubjectGroups(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/TblSubjectGroups`)
    }
    
    addSubjectGroups(SubjectGroupsData: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/TblSubjectGroups`, SubjectGroupsData);
    }
    
    getSubjectGroupbyId(Id: string): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/TblSubjectGroups/${Id}`)
        }
    updateSubjectGroups(Id: string, SubjectGroupsData: any): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/TblSubjectGroups/${Id}`, SubjectGroupsData);
        }
    
    deleteSubjectGroups(Id: string): Observable<void> {
        return this.http.delete<any>(`${environment.apiUrl}/TblSubjectGroups/${Id}`);
        }


        //SUBJECT DETAILS

    getSubjects(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/TblSubjects`)
    }
    
    addSubjects(SubjectsData: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/TblSubjects`, SubjectsData);
    }
    
    getSubjectsbyId(Id: string): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/TblSubjects/${Id}`)
        }
    updateSubjects(Id: string, SubjectsData: any): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/TblSubjects/${Id}`, SubjectsData);
        }
    
    deleteSubjects(Id: string): Observable<void> {
        return this.http.delete<any>(`${environment.apiUrl}/TblSubjects/${Id}`);
        }


        //SUB-SUBJECTS
        
getSubSubjects(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/TblSubSubjects`);
  }
  
  getSubSubjectById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/TblSubSubjects/${id}`);
  }
  
  addSubSubject(subSubjectData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/TblSubSubjects`, subSubjectData);
  }
  
  updateSubSubject(id: string, subSubjectData: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/TblSubSubjects/${id}`, subSubjectData);
  }
  
  deleteSubSubject(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/TblSubSubjects/${id}`);
  }
  //TERMS 

  getTerms(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/TblTerms`);
  }
  
  getTermById(periodNumber: number, periodYear: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/TblTerms/${periodNumber}/${periodYear}`);
  }
  
  addTerm(termData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/TblTerms`, termData);
  }
  
  updateTerm(periodNumber: number, periodYear: number, termData: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/TblTerms/${periodNumber}/${periodYear}`, termData);
  }
  
  deleteTerm(periodNumber: number, periodYear: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/TblTerms/${periodNumber}/${periodYear}`);
  }

//TEACHER DETAILS
  getTeachers(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/TblTeachers`);
  }
  
  getTeacherById(idNo: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/TblTeachers/${idNo}`);
  }
  
  addTeacher(teacherData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/TblTeachers`, teacherData);
  }
  
  updateTeacher(idNo: number, teacherData: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/TblTeachers/${idNo}`, teacherData);
  }
  
  deleteTeacher(idNo: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/TblTeachers/${idNo}`);
  }
  

  //GRADES
  getGrades(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/TblGrades`);
  }
  
  getGradeById(gradeSchemeId: number, gradeName: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/TblGrades/${gradeSchemeId}/${gradeName}`);
  }
  
  addGrade(gradeData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/TblGrades`, gradeData);
  }
  
  updateGrade(gradeSchemeId: number, gradeName: string, gradeData: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/TblGrades/${gradeSchemeId}/${gradeName}`, gradeData);
  }
  
  deleteGrade(gradeSchemeId: number, gradeName: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/TblGrades/${gradeSchemeId}/${gradeName}`);
  }
  // CALCULATE GRADE 


  calculateGrade(gradeRequest: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/TblGrades/calculate-grade`, gradeRequest);
}

//CALCULATEMEANGRADE
calculateMeanGrade(gradeRequest: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/TblGrades/calculatemeangrade`, gradeRequest);
}
// GRADE-SCHEMES
getGradingSchemes(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/TblGradingSchemes`);
  }
  
  getGradingSchemeById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/TblGradingSchemes/${id}`);
  }
  
  addGradingScheme(gradingSchemeData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/TblGradingSchemes`, gradingSchemeData);
  }
  
  updateGradingScheme(id: string, gradingSchemeData: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/TblGradingSchemes/${id}`, gradingSchemeData);
  }
  
  deleteGradingScheme(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/TblGradingSchemes/${id}`);
  }
  
  
//STREAM SUB TEACHERS

getStreamSubjectTeachers(): Observable<any[]> {
    return this.http.get<any>(`${environment.apiUrl}/TblStreamSubjectTeachers`);
  }
  getStreamSubjectTeacherById(streamId: number, subjectId: number, teacherId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/TblStreamSubjectTeachers/${streamId}/${subjectId}/${teacherId}`);
  }
  addStreamSubjectTeacher(streamSubjectTeacherData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/TblStreamSubjectTeachers`, streamSubjectTeacherData);
  }
  updateStreamSubjectTeacher(streamId: number, subjectId: number, teacherId: number, streamSubjectTeacherData: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/TblStreamSubjectTeachers/${streamId}/${subjectId}/${teacherId}`, streamSubjectTeacherData);
  }
  deleteStreamSubjectTeacher(streamId: number, subjectId: number, teacherId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/TblStreamSubjectTeachers/${streamId}/${subjectId}/${teacherId}`);
  }

        //STUDENT SUBJECT DETAILS 
getStudentSubjects(): Observable<any> {
            return this.http.get<any>(`${environment.apiUrl}/TblStudentSubjects`)
        }
//GRADING SCHEME
        getGradingScheme(): Observable<any> {
            return this.http.get<any>(`${environment.apiUrl}/TblGradingSchemes`)
        }

        
//SAVE POSITIONS
savePositions(PositionData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/TblPositions`, PositionData);
}
getPositionsByExamTermAndClass(examId: number,termId: number, classId: number ) {
    return this.http.get<any>(`${environment.apiUrl}/TblPositions/GetPositionsByExamTermClass/${examId}/${termId}/${classId}`);
}

// RESULTS 
getResults(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/TblResults`)
}
 getResultsByExamTermClassAndStream(examId: number,termId: number, classId: number,streamId: number, ) {
    return this.http.get<any>(`${environment.apiUrl}/TblResults/GetResultsByExamTermClassStream/${examId}/${termId}/${classId}/${streamId}`);
}
getResultsByFilters(classId: number, streamId: number) {
    return this.http.get<any[]>(`${environment.apiUrl}/TblResults/${classId}/${streamId}`);
  }
  
saveStudentResults(ResultsData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/TblResults`, ResultsData);
}
deleteResult(Id: number): Observable<void> {
    return this.http.delete<any>(`${environment.apiUrl}/TblResults/${Id}`);
    }



//ACADEMIC YEAR
getPeriodYear(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/TblAcademicYears`)
}

//EXAMS DETAILS 
        getExams(): Observable<any> {
            return this.http.get<any>(`${environment.apiUrl}/TblExams`)
        }
        
        addExams(ExamsData: any): Observable<any> {
            return this.http.post<any>(`${environment.apiUrl}/TblExams`, ExamsData);
        }
        
        getExamById(Id: string): Observable<any> {
            return this.http.get<any>(`${environment.apiUrl}/TblExams/${Id}`)
            }
        updateExams(Id: string, ExamsData: any): Observable<any> {
            return this.http.put<any>(`${environment.apiUrl}/TblExams/${Id}`, ExamsData);
            }        
        deleteExams(Id: string): Observable<void> {
            return this.http.delete<any>(`${environment.apiUrl}/TblExams/${Id}`);
            } 
       
            
            //LOGIN DETAILS 
            login(systemUserName : string, userPwd: string): Observable<any> {
                return this.http.post<any>(`${environment.apiUrl}/TblPops/login`, { systemUserName , userPwd })
                  .pipe(map(response => {
                    return response;
                  }));
              }
        }                    