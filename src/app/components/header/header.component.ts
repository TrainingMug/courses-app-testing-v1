import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RouterService } from 'src/app/services/router.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn : boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  

  constructor( private breakpointObserver: BreakpointObserver,
               private _routerService : RouterService,
               private _loginService : LoginService,
               private _sessionStorageService : SessionStorageService) { 
                this.isUserLoggedIn = false;
               }

  ngOnInit() {
    this._loginService.userLoggedInStatus().subscribe(res =>{      
      this.isUserLoggedIn = res;
      console.log('isUserLoggedIn', this.isUserLoggedIn);
      
    })
  }

  routeToLogin(){
    this._routerService.routeToLogin();
  }

  

  logout(){
    this.isUserLoggedIn = false;
    this._sessionStorageService.clearUserSessionInfo();
    this._loginService.userLoggedOut();
    this._routerService.routeToLogin();
  }


}
