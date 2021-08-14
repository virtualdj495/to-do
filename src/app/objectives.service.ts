import { Injectable } from '@angular/core';
import { Objective } from './objectives';

import {findIndex , find} from 'lodash';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class ObjectivesService {

  listOfTasks : Array<Objective> = [];
  taskDetails !: Objective;

  constructor() {

  }

  addTasktoList(task: Objective): void {
    if (localStorage.getItem('list') !== '[]'){
      this.listOfTasks = JSON.parse(String(localStorage.getItem('list')));
      task.id = this.listOfTasks.length;
    }
    else {
      task.id = this.listOfTasks.length;
    }
    task.endDate =moment(task.endDate, "YYYY-MM-DD h:mm:ss").format("YYYY-MM-DD h:mm:ss").toString();
    task.state = true;
    this.listOfTasks.push(task);
    localStorage.setItem('list',JSON.stringify(this.listOfTasks));

  }

  getList(): Array<Objective> {
    return this.listOfTasks;
  }

  switchState(task: Objective): void {
    this.listOfTasks = JSON.parse(String(localStorage.getItem('list')));
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
    localStorage.setItem('list',JSON.stringify(this.listOfTasks));
  }

  clearMemory(): void {
      this.listOfTasks =[];
  }

  getTask( id: number): Objective {
    this.listOfTasks = JSON.parse(String(localStorage.getItem('list')));
    this.taskDetails = <Objective>find(this.listOfTasks, obj => obj.id === id);
    return this.taskDetails;
  }
}

