import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  storeUserSessionInfo(userId :string, username : string) : boolean{
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('username' , username);
    sessionStorage.setItem('role','user');
    return true;
    }

  getUserSessionInfo() : Object{
    let userSessionInfo = { 'userId' : sessionStorage.getItem('userId') , 'username' : sessionStorage.getItem('username'),'role':sessionStorage.getItem('role') };
    return userSessionInfo;
  }

  clearUserSessionInfo() : boolean{
    sessionStorage.clear();
    return true;
  }
}
