import { Course } from './../models/course';
import { Injectable, ErrorHandler } from '@angular/core';
import {  throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private COURSES_BACKEND_URL:string = "http://localhost:3000/courses";  


  constructor(private httpClient : HttpClient) { 
    
  }

  getCourses() : Observable<Array<Course>> { 
    console.log('getCourses -> CourseService');
      
    return this.httpClient.get<Array<Course>>(this.COURSES_BACKEND_URL).pipe(
      catchError(error =>{
        return this.handleError(error);
      })
    )
  }

  

  private handleError(error : HttpErrorResponse){
    console.log('error details -->', error);
    
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(error);
    
    
  };



}
