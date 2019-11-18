import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UserService } from './../../services/user.service';
import { CourseService } from './../../services/course.service';
import { Course } from './../../models/course';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  coursesListFromBackend : Array<Course>;
  coursesList : Array<Course>;
  coursesListUpdatedWithFavourites : Array<Course>;
  userFavouriteCoursesList : Array<Course>;
  loggedInUser : Object;
  filterByCourseName : string;


  constructor( private _courseService : CourseService,
               private _userService  : UserService,
               private _sessionStorageService : SessionStorageService,
               private _activatedRoute : ActivatedRoute,
               private _routerService : RouterService) {
              
              this.coursesList = [];
              this.userFavouriteCoursesList = [];

              }

  ngOnInit() {
    this.loggedInUser = this._sessionStorageService.getUserSessionInfo();
    console.log('LoggedInUser -> CoursesListComponent --> NgOnInit' , this.loggedInUser);
    if(this.loggedInUser['userId'] == null){
      this._routerService.routeToLogin();
    }
    else{

      this._courseService.getCourses().
                          subscribe( coursesListResponse =>{
                            this.coursesListFromBackend = coursesListResponse;
                            this.coursesList = this.coursesListFromBackend;
                            console.log('courses list response --> ngOnInit --> CoursesComponent',  coursesListResponse);
                            if(this.loggedInUser['role'] === 'user'){
                            // Update the course list with the favourites
                            this._userService.getUserById(this.loggedInUser['userId']).subscribe(user =>{
                              this.userFavouriteCoursesList = user.favouriteCoursesList;
                              console.log('User FavCourses List --> ngOnInit --> CoursesComponent', this.userFavouriteCoursesList);
                              if(!(this.userFavouriteCoursesList === undefined)){
                              this.coursesListUpdatedWithFavourites = this.updateCoursesListWithUserFavourites(this.userFavouriteCoursesList, this.coursesListFromBackend);
                              this.coursesList = this.coursesListUpdatedWithFavourites;
                            }
                          });
                        }
                          });

    
                        this._activatedRoute.queryParams.subscribe( queryParams =>{
                            this.filterByCourseName = queryParams.course;
                            console.log('Filter By CourseName', this.filterByCourseName);
                            if(this.loggedInUser['role'] === 'user'){
                            this.coursesList = this.coursesListUpdatedWithFavourites;
                            }
                            else{
                              this.coursesList = this.coursesListFromBackend;
                            }
                            if(this.filterByCourseName !== undefined){
                              this.coursesList =  this.filterCoursesListByCourse(this.coursesList,this.filterByCourseName);
                              console.log('After filter CoursesList::' , this.coursesList);
                            }
                            
                          })
                           

    }

  }

  updateCoursesListWithUserFavourites(userFavouriteCourseList , coursesListFromBackend ){
    console.log('UserFavouriteCourseList :::' , userFavouriteCourseList);
    console.log('CoursesList :::', coursesListFromBackend);
    
    coursesListFromBackend.forEach((course : Course) => {
      let courseInList:Course = userFavouriteCourseList.find(courseInList => courseInList.id === course.id );
        if(courseInList != null){
        course.favourite = true;
      }
    });
    console.log('FilteredCoursesList:::afterupdate favourite', coursesListFromBackend);
    return coursesListFromBackend;
  }

   //Filter Courses By Course Name
   filterCoursesListByCourse(coursesList : Array<Course>, courseName : string){
    console.log('Courses List inside FiltercoursesListByCourse', coursesList);
    console.log('Course Name inside FiltercoursesListByCourse', courseName);
    return coursesList.filter(course => course.name.toLowerCase().includes(courseName));
  }

  addCourseToFavouriteBackend(courseToBeFavourited : Course){
    //console.log('Inside Favourite value::' , value);
    console.log('course to be favourited --> CoursesComponent', courseToBeFavourited);
    let userSessionInfo = this._sessionStorageService.getUserSessionInfo();
    let userId = parseInt(userSessionInfo['userId']);
    this._userService.addCourseToFavourites(userId,courseToBeFavourited);
    
    
  }
  removeCourseFromFavourites(courseToBeUnFavourited : Course){
   // console.log('Inside UnFavourite value::' , value);
    console.log('course to be unfavourited', courseToBeUnFavourited);
    let userSessionInfo = this._sessionStorageService.getUserSessionInfo();
    let userId = parseInt(userSessionInfo['userId']);
    this._userService.unFavouriteCourse(userId,courseToBeUnFavourited);
  }



}
  
