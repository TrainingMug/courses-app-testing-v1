import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { FavCoursesListComponent } from './components/favcourseslist/favcourseslist.component';


const routes: Routes = [{
  path:'login', component:LoginComponent
},{
  path:'courses-list',component:CoursesListComponent
},
{
  path:'fav-courses-list',component:FavCoursesListComponent
},

{
  path:'',redirectTo:'/courses-list',pathMatch:'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
