import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router) { }

  routeToCoursesList() {
    this.router.navigate(['courses-list']);
  }

  
  routeToLogin() {
  	this.router.navigate(['login']);
  }
}
