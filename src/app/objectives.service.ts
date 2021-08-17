import { Injectable } from '@angular/core';
import { Objective, User } from './objectives';
import {HttpClient} from '@angular/common/http';

import {findIndex , find} from 'lodash';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class ObjectivesService {

  listOfTasks : Array<Objective> = [];
  taskDetails !: Objective;
  acces: boolean = false;
  ip!: string;

  constructor( private http: HttpClient ) {
  }

  addTasktoList(task: Objective): Objective {
    if (this.listOfTasks.length !== null){

      task.id = this.listOfTasks.length;
    }
    else {
      task.id = this.listOfTasks.length;
    }
    task.endDate =moment(task.endDate, "YYYY-MM-DD h:mm:ss").format("YYYY-MM-DD h:mm:ss").toString();
    task.state = true;
    this.listOfTasks.push(task);
    return task;
  }

  getList(): Array<Objective> {
    return this.listOfTasks;
  }

  setList(passedList : Array<Objective>): void {
    this.listOfTasks=[];
    for (let task of passedList) {
      this.listOfTasks.push(task);
    }
  }

  switchState(task: Objective): Objective {
    let aux =findIndex(this.listOfTasks, task);

    if(this.listOfTasks[aux].state === true){
      task.state= false;
      this.listOfTasks.splice(aux,1);

      this.listOfTasks.push(task);
    }
    else {
      task.state = true;
      let find=findIndex(this.listOfTasks, task => task.state === false);
      this.listOfTasks.splice(find , 0 , task);
      this.listOfTasks.splice(aux + 1 , 1);
    }
    this.listOfTasks = [... this.listOfTasks];
    return task;
  }

  getTask( id: number): Objective {
    this.taskDetails = <Objective>find(this.listOfTasks, obj => obj.id === id);
    return this.taskDetails;
  }

  setStateFalse(): void {
    this.acces = false;
  } 

  setState(): void{
    this.acces = true;
  }

  getState(): boolean {
    return this.acces;
  }

}

