import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { Objective } from '../objectives';
import { ObjectivesService } from '../objectives.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  currentTask !: Objective;

  constructor(
    private route: ActivatedRoute,
    private objectiveService: ObjectivesService
  ) { }

  ngOnInit(): void {
    console.log('click');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.currentTask = this.objectiveService.getTask(id);
  }

  addColor(task: Objective): string {
    let currentDate =moment(Date());
    let taskDate = moment(task.endDate);
    if ( task.state === false) {
      return '#8e8e8e';
    }
    if  (taskDate.diff(currentDate,'days') < 0 || taskDate.diff(currentDate,'hours') < 0) {
      return 'red';
    }
    if (taskDate.diff(currentDate,'days') <= 1 &&  taskDate.diff(currentDate,'hours') < 24 ) {
      return 'orange';
    }
    if (taskDate.diff(currentDate,'days')<= 2 &&  taskDate.diff(currentDate,'hours') < 48) {
      return 'yellow';
    }
    if (taskDate.diff(currentDate,'days') <= 3 &&  taskDate.diff(currentDate,'hours') < 72) {
      return 'green';
    }
    return '#37a5f5';
  }
}
