export class Course{
    public id : number;
    public name : string;
    public description : string;
    public imageURL : string;
    public mentor : string;
    public favourite : boolean;

    constructor(){
        this.favourite = false;
    }
}