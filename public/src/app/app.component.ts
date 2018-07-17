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
  pokemon = {};
  constructor(private _httpService: HttpService){

  }
  ngOnInit(){
    //console.log(this._httpService.getTasks());
    this.findPoke();
  }
  findTask(id : String){
    this._httpService.getTaskById(id);
  }
  findPoke(){
    let pokeJson = this._httpService.getPokemon();
    pokeJson.subscribe(data =>{
      console.log("got poke: ",data);
      this.pokemon = data;
      console.log("data attr: ",this.pokemon);
    });
  }
  getTasksFromService(){
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
       console.log("Got our tasks!", data)
       // In this example, the array of tasks is assigned to the key 'tasks' in the data object. 
       // This may be different for you, depending on how you set up your Task API.
       this.tasks = data['tasks'];
    });
  }
}
