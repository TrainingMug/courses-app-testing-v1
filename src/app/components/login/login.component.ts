

import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterService } from 'src/app/services/router.service';
import { UserService } from 'src/app/services/user.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;  
  serverErrorMessage : string;
  roles: Array<string>;
  selectedRole : string;

  
  
  @ViewChild(FormGroupDirective, {static:false})
  formGroupDirective : FormGroupDirective

  constructor(private _formBuilder : FormBuilder, 
              private _routerService : RouterService,
              private _userService : UserService,
              private _snackBar : MatSnackBar,
              private _sessionStorageService : SessionStorageService,
              private _loginService : LoginService) {
    
   // this.roles = ['user','admin'];

    this.loginForm = this._formBuilder.group({
      username : ['',Validators.compose([Validators.required,Validators.minLength(5)])],
      password : ['',Validators.compose([Validators.required,Validators.minLength(6)])]
      // role : ['', Validators.required]
    })

   }

  ngOnInit() {
  }

  validateLogin(loginForm : FormGroup){
    let loginUser = loginForm.value;
    //this.loginUser.role = this.selectedRole;
    console.log('login user -->', loginUser);
    
    const userExistsPromise = this._userService.validateUser(loginUser);
    userExistsPromise.then(user =>{
      console.log('User ..' , user);
      
      if(typeof user === "undefined"){
        this.serverErrorMessage = 'No User Exists With this details..';
      }
      else{
        this._snackBar.open('Login Successful..', '',{
          duration: 1000
        });
        this._sessionStorageService.storeUserSessionInfo(user.id.toString(8),user.username);
        
        //Setting the login success status in LoginService to display Nav Links
        this._loginService.setUserLoggedInStatus(true);
        
        setTimeout( () =>{
          console.log(' User Exists Login Successful...', user);
          this._routerService.routeToCoursesList();
        },100);
        
  
      }     
      
    }).catch(error =>{
      console.log(error);
      
      this.serverErrorMessage = "Some internal error occured..Please try again after some time.. ";
    })

  }

  

  clearErrorMessage(){
    this.serverErrorMessage = '';
  }
  

}
