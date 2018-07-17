import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) { 
    this.getTasks();
  }
  getTasks(){
    // our http response is an Observable, store it in a variable
    //console.log("tasks");
    let tempObservable = this._http.get('/tasks');
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    //tempObservable.subscribe(data => console.log("Got our tasks!", data));
    return tempObservable; //not so temp
 }
 getTaskById(idToDelete : String){
  let route = '/tasks/' + idToDelete;
  let tempObservable = this._http.get(route);
  tempObservable.subscribe(data => console.log("Got one task: ", data));
 }
 getPokemon(){
  let route = 'https://pokeapi.co/api/v2/pokemon/208/';
  let tempObservable = this._http.get(route);
  //tempObservable.subscribe(data => console.log("Got one pokemon: ", data));
  return tempObservable;
 }

}
