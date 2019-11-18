import { SessionStorageService } from 'src/app/services/session-storage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isUserLoggedInSubject : BehaviorSubject<boolean>;
  isUserLoggedIn : boolean
  
  constructor( private _sessionStorageService : SessionStorageService) { 
    this.isUserLoggedInSubject = new BehaviorSubject(false);    
  }

  userLoggedInStatus() : BehaviorSubject<boolean>{   
    let loggedInUser = this._sessionStorageService.getUserSessionInfo(); 
    if(loggedInUser['userId'] == null)
    this.isUserLoggedInSubject.next(false);
    else
    this.isUserLoggedInSubject.next(true);
    return this.isUserLoggedInSubject;
  }
  userLoggedOut(){
    this.isUserLoggedInSubject.next(false);
  }
  setUserLoggedInStatus(status : boolean){
    this.isUserLoggedInSubject.next(true);
  }
}
