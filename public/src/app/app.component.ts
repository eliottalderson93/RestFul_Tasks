import { Component,OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  tasks = [];
  num: number;
  randNum: number;
  str: string;
  first_name: string;
  snacks: string[];
  loggedIn: boolean;
  getTasks : boolean;
  pokemon = {};
  details = {_id:""};
  newTask:any;
  taskToEdit:any;
  constructor(private _httpService: HttpService){

  }
  ngOnInit(){
    //console.log(this._httpService.getTasks());
    this.findPoke();
    this.getTasks = false;
    this.newTask = { title:"",description:""};
  }
  findTask(id : String){
    this._httpService.getTaskById(id);
  }
  findPoke(){
    let pokeJson = this._httpService.getPokemon();
    pokeJson.subscribe(data =>{
      //console.log("got poke: ",data);
      this.pokemon = data;
      //console.log("data attr: ",this.pokemon);
    });
  }
  getTasksFromService(){
    let observable = this._httpService.getTasks();
    observable.subscribe(tasks => {
      console.log("got data: ",tasks);

       // In this example, the array of tasks is assigned to the key 'tasks' in the data object. 
       // This may be different for you, depending on how you set up your Task API.
       this.tasks = tasks['data'];
       console.log("Storing: ", tasks['data']);
       console.log("Stored our tasks!", this.tasks)
    });
  }
  showTaskDetails(event){
    // console.log("you clicked the button!");
    //console.log(typeof(event.srcElement.value));
    let obs = this._httpService.getTaskById(event.srcElement.value);
    obs.subscribe(task =>{
      this.getTasks = true;
      this.details = task['data'];
      this.taskToEdit = this.details;
    });
  }
  onSubmit() {
    console.log("onSubmit: ",this.newTask);
    this._httpService.addTask(this.newTask)
    .subscribe(res =>{
      console.log("subscribe: ",res);
    });
    this.newTask = { title: "", description: "" };
  }
  editTask() {
    let curTask = this.details;
    console.log("editing: ", curTask);
    this._httpService.updateTask(curTask,curTask._id)
    .subscribe(res =>{
      console.log("sub edit: ",res);
    });

  } 
  delTask(event){
    let obs = this._httpService.deleteTask(event.srcElement.value);
    console.log("deleting: ",obs);
    obs.subscribe(task =>{
      console.log("deleting in component:",task);
    });
  }
  
  // onButtonClick(): void { 
  //   console.log(`Click event is working`);
  // }
  // onButtonClickParam(num: Number): void { 
  //     console.log(`Click event is working with num param: ${num}`);
  // }
  // onButtonClickParams(num: Number, str: String): void { 
  //     console.log(`Click event is working with num param: ${num} and str param: ${str}`);
  // }
  // onButtonClickEvent(event: any): void { 
  //     console.log(`Click event is working with event: ${event}`);
  //     console.log(event);
  // }

}
