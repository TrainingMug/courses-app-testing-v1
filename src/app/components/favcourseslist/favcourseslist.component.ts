import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UserService } from 'src/app/services/user.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-favcourseslist',
  templateUrl: './favcourseslist.component.html',
  styleUrls: ['./favcourseslist.component.css']
})
export class FavCoursesListComponent implements OnInit {

  loggedInUser : Object;
  userFavouriteCoursesList : Array<Course>;

  constructor(
              private _userService : UserService,
              private _sessionStorageService : SessionStorageService,
              private _routerService : RouterService) { }

  ngOnInit() {
    this.loggedInUser = this._sessionStorageService.getUserSessionInfo();
    console.log('LoggedInUser -> FavcourseslistComponent --> NgOnInit' , this.loggedInUser);
    if(this.loggedInUser['userId'] == null){
      this._routerService.routeToLogin();
    }
    else{
      this._userService.getUserById(this.loggedInUser['userId']).subscribe(user =>{
        this.userFavouriteCoursesList = user.favouriteCoursesList;
      });
    }
  }

  /* addCourseToFavouriteBackend(courseToBeFavourited : Course){
    //console.log('Inside Favourite value::' , value);
    console.log('course to be favourited --> CoursesComponent', courseToBeFavourited);
    let userSessionInfo = this._sessionStorageService.getUserSessionInfo();
    let userId = parseInt(userSessionInfo['userId']);
    this._userService.addCourseToFavourites(userId,courseToBeFavourited);
    
    
  } */
  removeCourseFromFavourites(courseToBeUnFavourited : Course){
   // console.log('Inside UnFavourite value::' , value);
    console.log('course to be unfavourited', courseToBeUnFavourited);
    let userSessionInfo = this._sessionStorageService.getUserSessionInfo();
    let userId = parseInt(userSessionInfo['userId']);
    this._userService.unFavouriteCourse(userId,courseToBeUnFavourited);
    let unFavouriteCourseIndex = this.userFavouriteCoursesList.findIndex(course => course.id === courseToBeUnFavourited.id);
    this.userFavouriteCoursesList.splice(unFavouriteCourseIndex,1);
  }

}
