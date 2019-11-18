import { Course } from './course';

export class User{
    public id : number;
    public username : string;
    public password : string;
    public email : string;    
    public favouriteCoursesList : Array<Course>;
}