import { Course } from './../../models/course';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @Input()
  loggedInUser : Object;

  @Input()
  course : Course;

  @Output() 
  addCourseToFavourite : EventEmitter<Course> = new EventEmitter();

  @Output()
  removeCourseFromFavourite : EventEmitter<Course> = new EventEmitter();

  constructor() {}       
           

  ngOnInit() {
    console.log('From Parent -->', this.course);
    
  }

  unFavouriteCourse(courseToUnFavourite : Course){
    courseToUnFavourite.favourite = !courseToUnFavourite.favourite;
    console.log('Course To Be UnFavourite --> CourseComponent', courseToUnFavourite);
    this.removeCourseFromFavourite.emit(courseToUnFavourite);
  }

  favouriteCourse(courseToFavourite : Course){
    courseToFavourite.favourite = !courseToFavourite.favourite;
    console.log('Course To Be Favouriteted --> CourseComponent', courseToFavourite);
    this.addCourseToFavourite.emit(courseToFavourite);  
  
  }

}
