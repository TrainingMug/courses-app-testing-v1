import { Course } from './../models/course';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private USERS_BACKEND_URL = "http://localhost:3000/users";


  constructor(private httpClient : HttpClient) { }

  getAllUsers() : Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(this.USERS_BACKEND_URL);
  }

  getAllUsersPromise() : Promise<Array<User>> {
    const allUsersPromise =  this.getAllUsers().toPromise();
    return allUsersPromise.then(allUsers =>{
      return allUsers;
    })
  }

  validateUser(loginUser : Object) : Promise<User>{
    return this.getAllUsersPromise().then(allUsers =>{
      console.log('All Users ....', allUsers);    
      return allUsers.find(user => user.username === loginUser['username']);
    });

  }

  getUserById(userId : number) : Observable<User>{
    return this.httpClient.get<User>(`${this.USERS_BACKEND_URL}/${userId}`);
  }

  addCourseToFavourites(userId : number, courseToBeAddedToFavourites : Course ){
    this.getUserById(userId).subscribe(user =>{
      console.log(' User ...', user);
      let foundUser = user;
      let userFavouritesCoursesList = foundUser.favouriteCoursesList;
      console.log('userFavouritesCoursesList', userFavouritesCoursesList);    
      userFavouritesCoursesList.push(courseToBeAddedToFavourites);    
      foundUser.favouriteCoursesList = userFavouritesCoursesList;
      this.httpClient.put(`${this.USERS_BACKEND_URL}/${userId}`,foundUser).subscribe(userUpdatedWithFavCourse =>{
        console.log('Favourite Course is Added to the user', userUpdatedWithFavCourse);
      })    
    })
  }

  unFavouriteCourse(userId: number, courseToBeUnFavourited : Course){
    this.getUserById(userId).subscribe(user =>{
      console.log(' User ...', user);
      let foundUser = user;
      let userFavouritesCoursesList = foundUser.favouriteCoursesList;
      console.log('userFavouritesCoursesList', userFavouritesCoursesList);
      //update Favourite course list
      let courseToBeUnFavouriteIndex = userFavouritesCoursesList.findIndex(course => course.id === courseToBeUnFavourited.id)
      userFavouritesCoursesList.splice(courseToBeUnFavouriteIndex,1);
  
      this.httpClient.patch(`${this.USERS_BACKEND_URL}/${userId}`,{'favouriteCoursesList' : userFavouritesCoursesList}).subscribe(userUpdatedWithFavCourse =>{
        console.log('Favourite Course is removed to the user', userUpdatedWithFavCourse);
      })
    });
  }
}
