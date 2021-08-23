import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { STUDENT_URL } from '../app.constants';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(public httpClient: HttpClient,) { }


  public getStudentiGrupe(idGrupe: number) : Observable<any>{

    return this.httpClient.get(`${STUDENT_URL}Grupa/${idGrupe}`);
  }

  public addStudenti(student: Student):  Observable<any> {
    student.id = 0;
   // console.log('doslo do add');
    return this.httpClient.post(`${STUDENT_URL}`, student);
  }

  public updateStudenti(student: Student):  Observable<any> {

    return this.httpClient.put(`${STUDENT_URL}`, student);
  }

  public deleteStudenti(id: number):  Observable<any> {

    return this.httpClient.delete(`${STUDENT_URL}/${id}`);
  }

}
